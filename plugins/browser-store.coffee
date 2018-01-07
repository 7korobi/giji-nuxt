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
        @$data.$browser = { ...@$data.$browser, ...o }

get_value_by_route = (src, by_url, key, val)->
  value = src.params[key] || src.query[key]
  if value
    by_url value
  else
    val

router = (method)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: -> get_value_by_route @$route, by_url, key, val
      set: (newVal)->
        @$router[method] relative_to @$route,
          "#{key}": newVal

watcher = (method)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: ->
        @$data.$browser[key]
      set: (newVal)->
        o = {}
        o[key] = newVal
        { location, href } = @$router.resolve relative_to @$route, o
        @$data.$browser = { ...@$data.$browser, ...o }
        history["#{method}State"] null, null, href
        @$route = { ...@$route, ...location }

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

  watchs = []
  routes = []
  beforeRouteUpdate = (newRoute, oldRoute, next)->
    console.log "beforeRouteUpdate", arguments
    next()
    for key, { by_url, value } of routes
      newVal = get_value_by_route newRoute, by_url, key, value
      oldVal = get_value_by_route oldRoute, by_url, key, value
      unless newVal == oldVal
        cb?.call @, newVal, oldVal, key

  beforeMount = ->
    console.log "beforeMount"
    for key, { by_url, value } of watchs
      @$data.$browser[key] = get_value_by_route @$route, by_url, key, value
    for key, val of @$data.$browser
      cb?.call @, @[key], val, key

  data = ->
    { $browser }

  pack = (method, key, value)->
    type = types[value.constructor]

    switch method
      when "push"
        setter = router(method)
        routes[key] =
          by_url: type.by_url
          value:  value

      when "replace"
        setter = watcher(method)
        $browser[key] = value
        watchs[key] =
          by_url: type.by_url
          value:  value

      when "cookie", "local", "session"
        setter = browser_store(method)
        value = setter.init(type, key) ? value
        $browser[key] = value

    setter.pack computed, type, key, value
    if cb?
      watch[key] = (newVal, oldVal)->
        return if _.isEqual newVal, oldVal
        cb.call @, newVal, oldVal, key

  for method, args2 of args1
    for key, val of args2
      pack method, key, val

  { data, watch, computed, methods, beforeMount, beforeRouteUpdate }
