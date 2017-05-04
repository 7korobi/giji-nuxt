_ = require "lodash"
Mem = require "./index"
Query = require "./query"

OBJ = ->
  new Object null

f_reset = (list, parent)->
  @all._finder.reset @all, list, parent

f_merge = (list, parent)->
  @all._finder.merge @all, list, parent

f_remove = (list)->
  @all._finder.remove @all, list

f_item = (cb)->
  (item, parent)->
    cb.call @, [item], parent

f_clear = ->
  @all._finder.clear_cach @all


module.exports = class Set extends Array
  @bless: (list)->
    ids = list.map (o)=> o.id
    list.__proto__ = @prototype
    list.all = @all
    list.query = new Query @all, ->
      @_all_ids = ids
      @_memory = OBJ()
    list

  @find: (id)->
    _memory[id].item

  @form: (id)->
    _memory[id].form ?= do ->
      # TODO
      o = _.cloneDeep @find id
      o.__proto__ = Form.prototype

  sort: (sortBy, orderBy)->
    o =
      if orderBy?
        _.orderBy @, sortBy, orderBy
      else
        _.sortBy @, sortBy
    o.__proto__ = @__proto__
    o

  where: (req)-> @query.where req
  in:    (req)-> @query.in    req

  update: (item, old)->
  create: (item)->
  delete: (old)->

  set:           f_reset
  reset:         f_reset

  merge:         f_merge
  add:    f_item f_merge
  append: f_item f_merge
  create: f_item f_merge

  reject:        f_remove
  del:    f_item f_remove
  remove: f_item f_remove

  clear_cache:   f_clear
  refresh:       f_clear
  rehash:        f_clear
