_ = require "lodash"
Mem = require "./index"

module.exports = class Model
  @rowid = 0

  @bless: (o)->
    o.__proto__ = @prototype
    o

  @$deploy: (item, parent)->
    @bless item
    Object.assign item, parent
    for deploy in @$name.deploys
      deploy.call item, @
    @deploy.call item, @
    unless item.id
      throw new Error "detect bad data: #{JSON.stringify item}"

    o = { item, emits: [] }
    @map_reduce item, (keys..., cmd)=>
      o.emits.push [keys, cmd]
      @do_map_reduce = true
    o

  @deploy: (m)->
    @_id = @[m.id] unless @_id

  @update: (item, old)->
  @create: (item)->
  @delete: (old)->
  @map_reduce: (item, emit)->

