
ls = window?.localStorage
ss = window?.sessionStorage

try
  test = '__vue-localstorage-test__'
  ls.setItem(test, test)
  ls.removeItem(test)
  Cookie = require('tiny-cookie');
catch e
  console.error 'Local storage not supported by this browser'
  Cookie =
    get: ->
    set: ->


deploy = (name, cb)->
  (base)->
    @base[name] = base
    emit = @emit name
    cache = {}
    for to of base
      @watch[to] = cb base, cache, to, emit


location = (mode)->
  (base, url, to, emit)->
    (val)->
      for key of base
        url[key] = @$route[mode][key]
      url[to] = val
      o = {}
      o[mode] = url
      @$nextTick =>
        @$router.replace o
      emit to, val

storage = (store)->
  (base, session, to, emit)->
    (val)->
      if val?
        store.setItem to, JSON.stringify val
      else
        store.removeItem to
      emit to, val

class BrowserValue
  constructor: (@_event = {})->
    @base = {}
    @watch = {}

  event: (events)->
    Object.assign @_event, events

  emit: (store)->
    (key, val)=>
      @_event[store]?.call @vue, key, val

  # name, path, hash
  url: deploy "url", (base, url, to, emit)->
    (val)->
      for key of base
        url[key] = @$route[key]
      url[key] = val
      @$router.replace url
      emit to, val

  cookie: deploy "cookie", (base, cookie, to, emit)->
    (val)->
      if val?
        Cookie.set to, JSON.stringify(val),
          expires: '1M'
      else
        Cookie.remove to
      emit to, val

  params:  deploy "params", location "params"
  query:   deploy "query",  location "query"
  local:   deploy "local",   storage ls
  session: deploy "session", storage ss

  data: (@vue, data)->
    cache = {}
    for key, val of @base.url
      cache[key] = @vue.$route[key] ? val

    for key, val of @base.params
      cache[key] = @vue.$route.params[key] ? val

    for key, val of @base.query
      cache[key] = @vue.$route.query[key] ? val

    for key, val of @base.session
      stored = ss.getItem key
      stored &&= JSON.parse stored
      cache[key] = stored ? val

    for key, val of @base.local
      stored = ls.getItem key
      stored &&= JSON.parse stored
      cache[key] = stored ? val

    for key, val of @base.cookie
      stored = Cookie.get key
      stored &&= JSON.parse stored
      cache[key] = stored ? val

    @vue.$nextTick =>
      for store, cb of @_event
        for key of @base[store]
          val = cache[key]
          cb.call @vue, key, val

    Object.assign cache, data

module.exports = BrowserValue
