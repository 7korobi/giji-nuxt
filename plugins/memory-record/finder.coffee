_ = require "lodash"
{ Query } = require "./index"

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
    @list query, memory
    if query._list.length && @model.do_map_reduce
      query._reduce = @reduce query, memory, query._list
      if query._group?
        @group query, query._group
    @sort query
    return

  list: (query, memory)->
    deploy = (id, o)->
      query._hash[id] = o.item
    query._hash = OBJ()
    query._list =
      for id in query._all_ids ? Object.keys memory
        continue unless o = memory[id]
        continue unless validate o.item, query._filters
        deploy id, o
    @set.bless query._list

  reduce: (query, memory, list)->
    init = (o, map)=>
      if map.count
        o.count ?= 0 
      if map.all
        o.all ?= 0 
      if map.list
        o.list ?= @set.bless([])
      if map.summary
        o.summary_data ?= OBJ()
      if map.set
        o.set_data ?= OBJ()
      if map._id
        o.id ?= map._id
      o

    reduce = (item, o, map)=>
      if map.belongs_to
        mdl = (id)->
          val = { id, length: 0 }
          val.__proto__ = Query[map.belongs_to].find id
          val
      else
        mdl = (id)-> { id, length: 0 }

      if map.count
        o.count += map.count
      if map.all
        o.all += map.all
      if map.list
        o.list.push map.list
      if map.set
        o.set_data[map.set] = true

      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min

      if map.summary
        id = map.summary
        val = o.summary_data[id]
        unless val
          return unless val = mdl id
          val.length = 0
          o.summary_data[id] = val
        val.length += map.count
        unless map.max <= val.max
          val.max_is = item
          val.max = map.max
        unless val.min <= map.min
          val.min_is = item
          val.min = map.min

    # map_reduce
    cache = OBJ()
    for { id } in list
      { item, emits } = memory[id]
      if emits
        for [path, map] in emits
          o = cache[path.join('.')] ?= @map.bless({})
          init o, map

    for { id } in list
      { item, emits } = memory[id]
      if emits
        for [path, map] in emits
          o = cache[path.join('.')]
          reduce item, o, map

    base = OBJ()
    for path, o of cache
      _.set base, path, o
    base

  sort: (query)->
    arg = query._sort
    query._list = query._list.sort(arg...) if arg.length

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

  clear_cache: (all)->
    delete all._reduce
    delete all._list
    delete all._hash
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
      o = @model.$deploy item, parent
      old = _memory[item.id]
      _memory[item.id] = o
      if old?
        @model.update item, old.item
      else
        @model.create item
        @model.rowid++
      return

