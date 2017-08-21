{ Query } = require "~plugins/memory-record"

to_x = (type, sp, nil)-> (u)->
  switch u?.constructor
    when null, undefined, sp
      nil
    when type
      u
    else
      type u

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
      to_str: to_x String, NaN, ""
      by_str: to_x Number, "", NaN
      by_url: to_x Number, "", NaN
    "#{String}":
      to_str: to_x String, null, ""
      by_str: to_x String, "", null
      by_url: to_x String, "", null
    "#{Array}":
      to_str: JSON.stringify
      by_str: JSON.parse
      by_url: to_x Array, null, null
    "#{Object}":
      to_str: JSON.stringify
      by_str: JSON.parse

  path: (store, keys...)->
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
