_ = require "lodash"
{ Query } = require "./index"

module.exports = class Map
  @bless: (o)->
    o.__proto__ = @prototype
    o

  @$deploy: (model, format, all, item, parent)->
    o = { item, $group: [] }

    model.$deploy item, parent

    emit = (keys..., cmd)=>
      path = ["_reduce", keys...].join('.')
      o.$group.push [path, cmd]
      map = format[path] ?= @bless {}
      @init map, cmd
    emit
      list: item
      set:  item.id
    model.map_reduce item, emit

    emit = (keys..., cmd)=>
      path = ["_reduce", keys...].join('.')
      all.$sort[path] = cmd
    model.order item, emit
    o


  ###
  query.map_reduce [
    (o)->
      @ "list",
        list: o
        all: o.log.length
        count: 1
      for id in o.q.mention_ids
        @ "mention",
          list: query.find id
          count: 1
        @ "mention_to", id,
          list: o
          count: 1

    (o, idx)->
      @ "list", "page",
        page_by: 50
        index: idx
        min: idx
        max: idx

      page_by = 50
      page = Math.floor(idx / page_by)
      @ "list", "page", page,
        list: o
        assign: { page }
        min: idx
        max: idx

      @ "list", "page", ["no", "asc"]

    (reduce)->
      @ "list",
        sort: ["write_at",  "asc"]
        page_by: 50

      @ "reverse",
        sort: ["write_at", "desc"]
      @ "mention", ["count", "desc"]
      for id of reduce.mention_to
        @ "mention_to", id,
          sort: ["count", "desc"]
  ]
  ###

  @init: (o, map)->
    if map.id
      o.id = map.id
    if map.list
      o.list = []
    if map.count
      o.count = 0 
    if map.all
      o.all = 0 
    if map.set
      o.hash = {}

  @order: (o, map, set)->
    from = o
    if Object == from.constructor
      for id, val of from
        val.id = id

    if map.sort
      o = _.orderBy o, map.sort...

    if per = map.page_by
      idx = 0
      groups = Object.values _.groupBy o, (o)->
        Math.floor(idx++ / per)
      o = groups
      for a in groups
        a.__proto__ = set.prototype
        
    if map.index
      counts = []
      for key, oo of o
        idx = _.get oo, map.index
        counts[idx] ?= []
        counts[idx].push oo
      o = counts
      for a in o when a
        a.__proto__ = set.prototype

    o.from = from
    o.__proto__ = set.prototype
    o

  @finish: (o, query, set)->
    if o.hash
      o.set = Object.keys o.hash
    if o.list
      set.bless o.list
    if o.all? && o.count
      o.avg = o.all / o.count

  @reduce: (item, o, map)->
    if map.count
      o.count += map.count
    if map.all
      o.all += map.all

    if map.list
      o.list.push map.list

    if map.set
      o.hash[map.set] = item

    if map.max
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
    if map.min
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min

