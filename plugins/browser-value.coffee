

try
  test = '__vue-localstorage-test__'
  ls = window?.localStorage
  ss = window?.sessionStorage
  if document?
    Cookie = require('tiny-cookie');
  ls.setItem(test, test)
  ls.removeItem(test)
  ss.setItem(test, test)
  ss.removeItem(test)
catch e
  console.error 'Local storage not supported by this browser'

deploy = (name, cb)->
  (base)->
    @base[name] = base
    emit = @emit name
    cache = {}
    for to of base
      @_watch[to] = cb base, cache, to, emit

location = (mode)->
  (base, url, to, emit)->
    (val)->
      for key, base_value of base
        url[key] = type_as base_value, @$route[mode][key]
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

type_as = (val, ret)->
  if Array == val?.constructor
    if Array == ret?.constructor
      ret ? val
    else
      if ret
        [ret]
      else
        val
  else
    ret ? val

class BrowserValue
  constructor: ->
    @_watch = {}
    @base = {}

  watch: (@_event)->
    @_watch

  emit: (store)->
    (key, val)=>
      @_event.call @vue, store, key, val

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
      cache[key] = type_as val, @vue.$route[key]

    for key, val of @base.params
      cache[key] = type_as val, @vue.$route.params[key]

    for key, val of @base.query
      cache[key] = type_as val, @vue.$route.query[key]

    if ss
      for key, val of @base.session
        stored = ss.getItem key
        stored &&= JSON.parse stored
        cache[key] = type_as val, stored

    if ls
      for key, val of @base.local
        stored = ls.getItem key
        stored &&= JSON.parse stored
        cache[key] = type_as val, stored

    if Cookie
      for key, val of @base.cookie
        stored = Cookie.get key
        stored &&= JSON.parse stored
        cache[key] = type_as val, stored

    @vue.$nextTick =>
      for store, base of @base
        for key of base
          val = cache[key]
          @_event.call @vue, store, key, val

    Object.assign cache, data

module.exports = BrowserValue
