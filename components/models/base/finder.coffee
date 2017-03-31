_ = require "lodash"
Query = require "./query"

OBJ = ->
  new Object null

each = (from, process)->
  switch from?.constructor
    when Array
      for item in from
        process(item)
    when Object
      for id, item of from
        item._id = id
        process(item)
  return

validate = (item, chklist)->
  return false unless item and chklist
  for chk in chklist when ! chk item
    return false
  true

composite_field = (o, field)->
  list = "#{field}s"
  o[list] = {}
  o["set_#{field}"] = (key, cb)->
    o[list][key] ?= []
    o[list][key].push cb

module.exports = class Finder
  composite_field @, "deploy"
  composite_field @, "depend"
  composite_field @, "validate"

  constructor: (@name)->
    @all = Query.build @
    @all.cache = {}
    @scope = {}
    @property =
      first:
        enumerable: false
        get: -> @[0]
      last:
        enumerable: false
        get: -> @[@length - 1]
      pluck:
        enumerable: false
        value: ->
          keys = arguments
          switch keys.length
            when 0
              @map -> null
            when 1
              @map (o)-> _.at(o, keys[0])[0]
            else
              @map (o)-> _.at(o, keys...)

  depends: ->
    for f in Finder.depends[@name.base]
      f @
    return

  validates: (item)->
    validate item, Finder.validates[@name.base]

  use_cache: (key, val)->
    @scope[key] = val
    switch val?.constructor
      when Function
        @all[key] = (args...)=>
          @all.cache["#{key}:#{JSON.stringify args}"] ?= val args...
      else
        @all[key] = val

  clear_cache: ->
    delete @all._reduce
    delete @all._list
    delete @all._hash
    @all.cache = {}

    return

  save: (query)->
    for item in query.list
      if @validates item
        @model.save item

  calculate: (query)->
    @list query, @all._memory
    if query._list.length && @model.do_map_reduce
      @reduce query
      if query._group?
        @group query, query._group
    @sort query
    Object.defineProperties query._list, @property
    return

  reduce: (query)->
    init = (map)->
      o = OBJ()
      o.count = 0 if map.count
      o.all   = 0 if map.all
      o.list = [] if map.list
      o.set  = OBJ() if map.set
      o

    reduce = (item, o, map)->
      if map.list
        o.list.push map.list
      if map.set
        o.set[map.set] = true
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min
      o.count += map.count if map.count
      o.all += map.all if map.all

    calc = (o)->
      o.avg = o.all / o.count if o.all && o.count

    # map_reduce
    base = OBJ()
    paths = OBJ()
    for id, {item, emits} of query._memory
      for [path, map] in emits
        o = _.get base, path
        unless o
          o = paths[path.join(".")] = init map
          _.set base, path, o
          o
        reduce item, o, map
    for path, o of paths
      calc o
    query._reduce = base

  sort: (query)->
    [sortBy, orderBy] = query._sort
    if sortBy?
      query._list =
        if orderBy?
          _.orderBy query._list, sortBy, orderBy
        else
          _.sortBy query._list, sortBy


  group: (query)->
    { reduce, target } = query._group
    reduce_path = _.property reduce
    target_path = _.property target

    deploy = (id, o)->
      query._memory[id] = o
      query._hash[id] = o.item
    query._memory = OBJ()
    query._hash = OBJ()
    query._list =
      for id, reduced of reduce_path query._reduce
        o = target_path reduced
        deploy o._id, o

  list: (query, all)->
    if query._memory == all
      deploy = (id, o)->
        query._hash[id] = o.item
    else
      query._memory = OBJ()
      deploy = (id, o)->
        query._memory[id] = o
        query._hash[id] = o.item

    query._hash = OBJ()
    query._list =
      for id in query._all_ids ? Object.keys all
        o = all[id]
        continue unless o
        continue unless validate o.item, query._filters
        deploy id, o


  remove: (from)->
    { _memory } = @all
    each from, (item)=>
      old = _memory[item._id]
      if old?
        @model.delete old.item
        delete _memory[item._id]
      return
    @depends()

  reset: (from, parent)->
    { _memory } = @all
    @all._memory = news = OBJ()
    @merge from, parent

    for key, old of _memory
      item = news[key]
      if item?
        @model.update item, old.item
      else
        @model.delete old
    @depends()

  merge: (from, parent)->
    { _memory } = @all
    deploys = Finder.deploys[@name.base]

    @model.do_map_reduce = false
    each from, (item)=>
      item.__proto__ = @model.prototype
      Object.assign item, parent
      for deploy in deploys
        deploy.call item
      unless item._id
        throw new Error "detect bad data: #{JSON.stringify item}"

      if @validates item
        o = { item, emits: [] }
        @model.map_reduce item, (keys..., cmd)=>
          o.emits.push [keys, cmd]
          @model.do_map_reduce = true

        old = _memory[item._id]
        if old?
          @model.update item, old.item
        else
          @model.create item
          @model.rowid++
        _memory[item._id] = o
      return
    @depends()

