
HrefQuery = (base)->
  watch = {}
  Object.keys(base).map (key)->
    watch[key] = ->
      query = Object.assign {}, @$route.query
      query[key] = @[key]
      @$router.replace { query }

  data = (vue, data)->
    query = Object.assign {}, base, vue.$route.query
    Object.assign {}, query, data

  { data, watch }

module.exports = HrefQuery
