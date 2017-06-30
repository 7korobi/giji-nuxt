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

  @deploy: (m)->
    @_id = @[m.id] unless @_id

  @update: (item, old)->
  @create: (item)->
  @delete: (old)->

  @aggregate: [
    (o, idx)->
  ]
  @map_reduce: (item, emit)->

  @order: (reduce, emit)->
    