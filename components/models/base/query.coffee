_ = require "lodash"

OBJ = ->
  new Object null

set_for = (list)->
  set = OBJ()
  for key in list
    set[key] = true
  set

query_parser = (base, req, cb)->
  return base unless req

  new Query base, ->
    @_filters = base._filters.concat()
    switch req && req.constructor
      when Object
        for key, val of req
          cb @, key, val, _.property key

      when Function, Array, String
        cb @, null, req, (o)-> o
      else
        console.log { req }
        throw Error 'unimplemented'


module.exports = class Query
  @build: (_finder)->
    _all_ids = _group = null
    _filters = []
    _sort = []
    new Query { _finder, _all_ids, _group, _filters, _sort }, ->
      @_memory = OBJ()

  constructor: (base, tap)->
    @_copy base
    tap.call @

  _copy: ({ @_finder, @_all_ids, @_group, @_filters, @_sort })->

  in: (req)->
    query_parser @, req, (q, target, req, path)->
      add = (f)-> q._filters.push f
      switch req && req.constructor
        when Array
          set = set_for req
          add (o)->
            for key in path o
              return true if set[key]
            false
        when RegExp
          add (o)->
            for val in path o
              return true if req.test val
            false
        when null, Boolean, String, Number
          add (o)->
            -1 < path(o)?.indexOf req
        else
          console.log { target, req, path }
          throw Error 'unimplemented'

  where: (req)->
    query_parser @, req, (q, target, req, path)->
      add = (f)-> q._filters.push f
      switch req && req.constructor
        when Function
          add req
        when Array
          if "_id" == target
            q._all_ids = req
          else
            set = set_for req
            add (o)-> set[ path o ]
        when RegExp
          add (o)-> req.test path o
        when null, Boolean, String, Number
          if "_id" == target
            q._all_ids = [req]
          else
            add (o)-> req == path o
        else
          console.log { target, req, path }
          throw Error 'unimplemented'

  search: (text)->
    return @ unless text
    list =
      for item in text.split(/\s+/)
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        continue unless item.length
        "(#{item})"
    return @ unless list.length
    regexp = (new RegExp list.join("|"), "ig")
    @where (o)-> (! o.search_words) || regexp.test o.search_words

  distinct: (reduce, target)->
    group = {reduce, target}
    return @ if _.isEqual group, @_group
    new Query @, -> @_group = group

  sort: (sort...)->
    return @ if _.isEqual sort, @_sort
    new Query @, -> @_sort = sort

  shuffle: ->
    new Query @, -> @_sort = [Math.random]

  save: ->
    @_finder.save(@)

  find: (id)->
    @hash[id]

  finds: (ids)->
    for id in ids when o = @hash[id]
      o

  pluck: -> @list.pluck arguments...

  Object.defineProperties @prototype,
    reduce:
      get: ->
        @_finder.calculate(@) unless @_reduce?
        @_reduce

    list:
      get: ->
        @_finder.calculate(@) unless @_list?
        @_list

    hash:
      get: ->
        @_finder.calculate(@) unless @_hash?
        @_hash

    memory:
      get: ->
        @_finder.calculate(@) unless @_memory?
        @_memory

    ids:
      get: ->
        Object.keys @memory


