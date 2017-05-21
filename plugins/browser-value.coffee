

try
  test = '__vue-localstorage-test__'
  ls = window.localStorage
  ss = window.sessionStorage
  Cookie = require('tiny-cookie');
  ls.setItem(test, test)
  ls.removeItem(test)
  ss.setItem(test, test)
  ss.removeItem(test)
  Cookie.set test, test,
    expires: '1s'
  Cookie.get test
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
  switch val?.constructor
    when Number
      Number(ret ? val)
    when Array
      if Array == ret?.constructor
        ret ? val
      else
        if ret
          [ret]
        else
          val
    else
      ret ? val

get_by_json = (storage, val, cb)->
        if storage
          stored = cb()
          stored &&= JSON.parse stored
          type_as val, stored
        else
          val

class BrowserValue
  constructor: ->
    @_watch = {}
    @base = {}
    @_get =
      url:     (key, val)=> type_as val, @vue.$route[key]
      params:  (key, val)=> type_as val, @vue.$route.params[key]
      query:   (key, val)=> type_as val, @vue.$route.query[key]
      session: (key, val)-> get_by_json ss,     val, -> ss.getItem key
      local:   (key, val)-> get_by_json ls,     val, -> ls.getItem key
      cookie:  (key, val)-> get_by_json Cookie, val, -> Cookie.get key

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
    for type, base of @base
      for key, val of base
        cache[key] = @_get[type] key, val

    @vue.$nextTick =>
      for store, base of @base
        for key of base
          val = cache[key]
          @_event.call @vue, store, key, val

    Object.assign cache, data

module.exports = BrowserValue
