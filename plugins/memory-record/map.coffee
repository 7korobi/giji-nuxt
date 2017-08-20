_ = require "lodash"
{ Query } = require "./index.coffee"

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

    emit = (keys..., cmd)->
      path = ["_reduce", keys...].join('.')
      all.$sort[path] = cmd
    model.order item, emit
    o

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

  @order: (from, map, set)->
    o = from
    if Object == from.constructor
      if map.belongs_to
        for id, val of from
          val.__proto__ = Query[map.belongs_to].find id
      else
        for id, val of from
          val.id = id

    else
      if map.belongs_to
        o = from.map (val)->
          Query[map.belongs_to].find val.id

    if map.sort
      o = _.orderBy o, map.sort...
    
    if map.get
      o = o.map (val)->
        _.get val, map.get

    if per = map.page_by
      idx = 0
      from = o
      groups = Object.values _.groupBy o, (o)->
        Math.floor(idx++ / per)
      groups.all = idx
      o = groups
      o.page = (item)->
        at = @from?.indexOf(item) 
        at = null if at < 0
        at && Math.floor(at / per) + 1
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
