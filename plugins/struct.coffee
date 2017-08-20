{ Query } = require "~plugins/memory-record"

module.exports =
  relative_to: ({ name, params, query, hash }, o)->
    to = { name, params, query, hash }
    for key, val of o
      ext = {}
      ext[key] = val
      if params[key]
        to.params = { to.params..., ext... }
      else
        to.query = { to.query..., ext... }
    to

  uniq: (args...)->
    a = []
    for arg in args
      a.push arg...
    Array.from new Set a

  types:
    "#{Number}":
      to_str: String
      by_str: Number
      by_url: Number
    "#{String}":
      to_str: String
      by_str: String
      by_url: String
    "#{Array}":
      to_str: JSON.stringify
      by_str: JSON.parse
      by_url: (u)->
        switch u?.constructor
          when null, undefined
            null
          when Array
            u
          else
            [u]
    "#{Object}":
      to_str: JSON.stringify
      by_str: JSON.parse

  tree: (store, keys...)->
    o = store.computed
    make = (name, at)->
      key = "#{name}_id"
      list = "#{name}s"
      o[key] =
        get: ->
          (at < @idx.length) && @idx[0..at].join("-")
      o[name] =
        get: ->
          @read_at
          Query[list].find @[key]

    for name, idx in keys
      make name, idx

    o.idx.get = ->
      @$route.params.idx.split("-")
    o
