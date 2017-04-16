
module.exports = class Model
  @rowid = 0

  @save: (item)->
  @update: (item, old)->
  @create: (item)->
  @delete: (old)->
  @validate: (item)-> true
  @map_reduce: (item, emit)->
  @deploy: (m)->
    @_id = @[m.id] unless @_id

