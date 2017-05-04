_ = require "lodash"
Mem = require "./index"

module.exports = class Model
  @rowid = 0

  @bless: (o)->
    o.__proto__ = @prototype
    o

  @deploy: (m)->
    @_id = @[m.id] unless @_id

  @update: (item, old)->
  @create: (item)->
  @delete: (old)->
  @validate: (item)-> true
  @map_reduce: (item, emit)->

