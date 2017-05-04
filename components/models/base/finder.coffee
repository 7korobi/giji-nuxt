_ = require "lodash"
Mem = require "./index"
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

module.exports = class Finder
  constructor: (@name)->

  validates: (item)->
    validate item, Mem.validates[@name.base]

  calculate: (query, all)->
    @list query, all._memory
    if query._list.length && @model.do_map_reduce
      @reduce query
      if query._group?
        @group query, query._group
    @sort query
    return

  reduce: (query)->
    init = (map)=>
      o = OBJ()
      @map.bless o

      o.count = 0 if map.count
      o.all   = 0 if map.all
      if map.list
        o.list = []
        @set.bless o.list
      o.set_data = OBJ() if map.set
      o

    reduce = (item, o, map)=>
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
    query._reduce = base

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
        continue unless o = all[id]
        continue unless validate o.item, query._filters
        deploy id, o
    @set.bless query._list



  depends: ->
    for f in Mem.depends[@name.base]
      f()
    return

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
    @depends()

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
    @depends()

  merge: (all, from, parent)->
    { _memory } = all
    deploys = Mem.deploys[@name.base]
    do_map_reduce = false
    each from, (item)=>
      @model.bless item
      Object.assign item, parent
      for deploy in deploys
        deploy.call item, @model
      unless item.id
        throw new Error "detect bad data: #{JSON.stringify item}"

      if @validates item
        o = { item, emits: [] }
        @model.map_reduce item, (keys..., cmd)=>
          o.emits.push [keys, cmd]
          do_map_reduce = true

        old = _memory[item.id]
        if old?
          @model.update item, old.item
        else
          @model.create item
          @model.rowid++
        _memory[item.id] = o
      return
    @model.do_map_reduce = do_map_reduce
    @depends()

