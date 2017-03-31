_ = require "lodash"
module.exports = Mem = {
  Base:
    Query:      require "./base/query"
    Model:      require "./base/model"
    Finder:     require "./base/finder"
    Collection: require "./base/collection"
  Query: {}
  Model: {}
  Collection: {}
  Composite: {}
}

_rename = {}
rename = (base)->
  name = _rename[base]
  return name if name

  id =   "#{base}_id"
  ids =  "#{base}_ids"
  list = "#{base}s"
  _rename[base] = { id, ids, list, base }

class Mem.Rule
  constructor: (base, cb)->
    @name = rename base
    @depend_on base

    @finder = new Mem.Base.Finder @name
    @model = Mem.Base.Model

    @dml = new Mem.Base.Collection @
    @property = {}
    @schema cb if cb
    return

  schema: (cb)->
    cb.call @, @dml

    if @model == Mem.Base.Model
      class @model extends @model
    @model.id   = @name.id
    @model.ids  = @name.ids
    @model.list = @name.list
    Object.defineProperties @model.prototype, @property

    @deploy   @model.deploy   if @model.deploy
    @validate @model.validate if @model.validate
    Mem.Collection[@name.base] = @dml
    Mem.Model[@name.base] = @finder.model = @model
    Mem.Query[@name.list] = @finder.all
    @

  deploy: (cb)->
    Mem.Base.Finder.set_deploy @name.base, cb

  validate: (cb)->
    Mem.Base.Finder.set_validate @name.base, cb

  depend_on: (parent)->
    Mem.Base.Finder.set_depend parent, (finder)->
      finder.clear_cache()

  scope: (cb)->
    for key, val of cb @finder.all
      @finder.use_cache key, val

  default_scope: (scope)->
    { all } = @finder
    all._copy scope all

  shuffle: ->
    @default_scope (all)-> all.shuffle()
  order: (sortBy, orderBy)->
    @default_scope (all)-> all.sort sortBy, orderBy
  sort: (sortBy)->
    @default_scope (all)-> all.sort sortBy

  relation_to_one: (key, target, ik)->
    @property[key] =
      enumerable: true
      get: ->
        Mem.Query[target].find(@[ik])

  relation_to_many: (key, target, ik, qk)->
    all = @finder.all
    @finder.use_cache key, (id)->
      Mem.Query[target].where "#{qk}": id

    @property[key] =
      enumerable: true
      get: ->
        all[key](@[ik])

  relation_tree: (key, ik)->
    all = @finder.all
    @finder.use_cache key, (_id, n)->
      if n
        q = all.where "#{ik}": _id
        all[key] q.ids, n - 1
      else
        all.where _id: _id

    @property[key] =
      enumerable: true
      value: (n)->
        all[key] [@_id], n

  relation_graph: (key, ik)->
    all = @finder.all
    @finder.use_cache key, (_id, n)->
      q = all.where _id: _id
      if n
        _id = []
        for a in q.pluck(ik) when a?
          for k in a when k?
            _id.push k

        all[key] _.uniq(_id), n - 1
      else
        q

    @property[key] =
      enumerable: true
      value: (n)->
        all[key] [@_id], n

  path: (keys...)->
    for key in keys
      @belongs_to key
    @deploy ->
      subids = @_id.split("-")
      @idx = subids[keys.length]
      for key, idx in keys
        @["#{key}_id"] = subids[0..idx].join '-'

  belongs_to: (to, option = {})->
    name = rename to
    { key = name.id, target = name.list, dependent } = option
    @relation_to_one name.base, target, key

    if dependent
      @depend_on name.base
      @validate _.property name.base

  has_many: (to, option = {})->
    name = rename to.replace /s$/, ""
    { key, target = name.list } = option
    switch option.by
      when "ids"
        ik = key ? name.ids
        qk = "_id"
      else
        ik = "_id"
        qk = key ? @name.id
    @relation_to_many name.list, target, ik, qk

  tree: (option={})->
    @relation_tree "nodes", @name.id
    @belongs_to @name.base, option

  graph: (option={})->
    { directed, cost } = option
    ik = @name.ids
    @relation_to_many @name.list, @name.list, ik, "_id"
    @relation_graph "path", ik
    unless directed
      true # todo
