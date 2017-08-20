_ = require "lodash"

browser_store = bs = (method)->
  db = bs[method]
  init: ({by_str}, key)-> by_str db.getItem key
  pack: (computed, {to_str}, key, val)->
    computed[key] =
      get: ->
        value = @$data.$browser[key]
        value ? val

      set: (newVal)->
        if newVal?
          db.setItem key, to_str newVal
        else
          db.removeItem key
        o = {}
        o[key] = newVal
        @$data.$browser = { @$data.$browser..., o... }


router = (method)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: ->
        value = @$route.params[key] || @$route.query[key]
        if value
          by_url value
        else
          val

      set: (newVal)->
        o = {}
        o[key] = newVal
        { name, params, query, hash } = @$route
        to = { name, params, query, hash }
        if params[key]
          to.params = { to.params..., o... }
        else
          to.query = { to.query..., o... }
        @$router[method] to


try
  test = '__vue-localstorage-test__'
  Cookie = require 'tiny-cookie'

  bs.cookie =
    getItem:    (key)->    Cookie.get(key) ? null
    setItem:    (key, s)-> Cookie.set key, s, expires: '1M'
    removeItem: (key)->    Cookie.remove key
  bs.cookie.setItem test, test
  bs.cookie.removeItem test

  bs.local = window.localStorage
  bs.local.setItem test, test
  bs.local.removeItem test

  bs.session = window.sessionStorage
  bs.session.setItem test, test
  bs.session.removeItem test
catch e
  console.error 'Local storage not supported by this browser'
  bs.cookie = bs.local = bs.session =
    _data: {}
    getItem:    (key)->    @_data[key] ? null
    setItem:    (key, s)-> @_data[key] = s
    removeItem: (key)->    delete @_data[key]


types =
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

module.exports = (args1)->
  $browser = {}
  computed = {}
  methods = {}
  watch = {}

  cb = args1.watch

  created = ->
    for method, args2 of args1
      for key, val of args2
        cb?.call @, @[key], key
  data = ->
    { $browser }

  pack = (method, key, value)->
    type = types[value.constructor]

    switch method
      when "replace", "push"
        setter = router(method)

      when "cookie", "local", "session"
        setter = browser_store(method)
        value = setter.init(type, key) ? value
        $browser[key] = value

    setter.pack computed, type, key, value
    watch[key] = (newVal, oldVal)->
      console.log arguments...
      return if _.isEqual newVal, oldVal
      cb?.call @, newVal, key

  for method, args2 of args1
    for key, val of args2
      pack method, key, val

  { data, watch, computed, methods, created }
