_ = require "lodash"
{ types, relative_to } = require "~/plugins/struct"

browser_store = bs = (method)->
  db = bs[method]
  init: ({by_str}, key)-> by_str db.getItem key
  pack: (computed, {to_str}, key, val)->
    computed[key] =
      get: ->
        @$data.$browser[key]

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
        @$router[method] relative_to @$route,
          "#{key}": newVal


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
      return if _.isEqual newVal, oldVal
      cb?.call @, newVal, key

  for method, args2 of args1
    for key, val of args2
      pack method, key, val

  { data, watch, computed, methods, created }
