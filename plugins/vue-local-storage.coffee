ls = window?.localStorage
ss = window?.sessionStorage

try
  test = '__vue-localstorage-test__'
  ls.setItem(test, test)
  ls.removeItem(test)
catch e
  console.error 'Local storage not supported by this browser'

setter = ({ data, watch }, o)->
  return false unless o
  for key, v of o
    stored = ls.getItem key

    data[key] = if stored?
      JSON.parse stored
    else
      v.default

    watch[key] = (val)->
      if val?
        ls.setItem key, JSON.stringify val
      else
        ls.removeItem key
      @[key]
  return true

module.exports =
  install: (Vue, options)->
    Vue.mixin
      created: ->
        store =
          data: {}
          watch: {}
        ok1 = setter store, @$options.sessionStorage
        ok2 = setter store, @$options.localStorage
        if ok1 || ok2
          @$storage = new Vue store
        return