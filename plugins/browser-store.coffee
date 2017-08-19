browser_store = bs = (method)->
  db = bs[method]
  init: (key)-> JSON.parse db.getItem key
  pack: (computed, key, val)->
    computed[key] =
      get: ->
        @$data.$browser[key].value || val
      set: (val)->
        if val?
          db.setItem key, JSON.stringify(val)
        else
          db.removeItem key
        @$data.$browser[key].value = val


router = (method)->
  init: (key)-> null
  pack: (computed, key, val)->
    computed[key] =
      get: ->
        @$route.params[key] || @$route.query[key] || val
      set: (val)->
        o = {}
        o[key] = val
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


module.exports = (args1)->
  $browser = {}
  computed = {}
  watch = {}
  cb = args1.watch

  created = ->
    if cb
      for key, val of @$data.$browser
        cb.call @, @[key], key
  data = ->
    { $browser }

  pack = (setter, key, value)->
    type = value.constructor
    value = setter.init(key) ? value
    setter.pack computed, key, value

    $browser[key] = { value, type }
    if cb
      watch[key] = (newVal, oldVal)->
        @$nextTick ->
          cb.call(@, newVal, key)

  for method, args2 of args1
    switch method
      when "replace", "push"
        for key, val of args2
          pack router(method), key, val

      when "cookie", "local", "session"
        for key, val of args2
          pack browser_store(method), key, val

  { data, watch, computed, created }
