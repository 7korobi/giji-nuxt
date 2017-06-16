_ = require "lodash"
{ Query, Format } = require "./index"

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

module.exports = class Finder
  constructor: (@name)->
  calculate: (query, memory)->
    cache = _.cloneDeep Format[@name.base]
    @reduce @map, cache, query, memory
    return

  reduce: (map, cache, query, memory)->
    for id in query._all_ids ? Object.keys memory
      continue unless o = memory[id]
      { item, emits } = o
      continue unless validate item, query._filters
      for [path, a] in emits
        map.reduce item, cache[path], a

    if cache._reduce
      cache._reduce.sort = query._sort if query._sort
      cache._reduce.page = query._page if query._page
    for path, o of cache
      map.finish o, query, @set
      _.set query, path, o

  clear_cache: (all)->
    delete all._reduce
    all.cache = {}
    all._write_at = Date.now()

    return

  remove: (all, from)->
    { _memory } = all
    each from, (item)=>
      old = _memory[item.id]
      if old?
        @model.delete old.item
        delete _memory[item.id]
      return

  reset: (all, from, parent)->
    { _memory } = all
    all._memory = news = OBJ()
    @merge all, from, parent

    for key, old of _memory
      item = news[key]
      if item?
        @model.update item, old.item
      else
        @model.delete old

  merge: (all, from, parent)->
    { _memory } = all
    each from, (item)=>
      o = @map.$deploy @model, item, parent
      old = _memory[item.id]
      _memory[item.id] = o
      if old?
        @model.update item, old.item
      else
        @model.create item
        @model.rowid++
      return

