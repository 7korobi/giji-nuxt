_ = require "lodash"
{ Query } = require "./index"

module.exports = class Map
  @bless: (o)->
    o.__proto__ = @prototype
    o

  @$deploy: (model, item, parent)->
    o = { item, emits: [] }
    emit = (keys..., cmd)=>
      keys.unshift "_reduce"
      path = keys.join('.')
      o.emits.push [path, cmd]
      format = @format[path] ?= @bless {}
      @init format, cmd

    emit
      list: item
      hash: item
    model.$deploy item, parent
    model.map_reduce item, emit
    o

  @init: (o, map)->
    if map._id
      o.id ?= map._id
    if map.length
      o.length ?= 0 
    if map.count
      o.count ?= 0 
    if map.all
      o.all ?= 0 

    if map.list
      o.list ?= []
    if map.set
      o.set_data ?= {}
    if map.hash
      o.hash ?= {}

    if map.summary
      o.summary_data ?= {}
    if map.belongs_to
      o.belongs_to = map.belongs_to

    o

  @finish: (o, query, set)->
    if o.list
      set.bless o.list
      o.list = o.list.sort(o.sort...) if o.sort
      o.list = o.list.page(o.page...) if o.page

    if o.summary_data && o.belongs_to
      for id, val of o.summary_data
        val.__proto__ = Query[o.belongs_to].find id

  @reduce: (item, o, map)->
    if map.count
      o.count += map.count
    if map.all
      o.all += map.all
    if map.list
      o.list.push map.list
    if map.hash
      o.hash[map.hash.id] = map.hash
    if map.set
      o.set_data[map.set] = true

    if map.max
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
    if map.min
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min

    if id = map.summary
      if o.summary_data
        val = o.summary_data[id] ?= { id, count: 0 }
        @reduce item, val, map
