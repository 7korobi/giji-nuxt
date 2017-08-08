{ Model, Query, Rule, Finder } = Mem = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

titles =
  SS: ["SSAY", "通常の発言"]
  SA: ["SSAY", "通常ACT"]
  VS: ["VSAY", "見物人発言"]
  VA: ["VSAY", "見物人のACT"]
  TS: ["TSAY", "独り言/内緒話"]
  TA: ["TSAY", "栞"]
  GS: ["GSAY", "墓下の発言"]
  GA: ["GSAY", "墓下のACT"]
  PS: ["SPSAY", "共鳴の会話"]
  PA: ["SPSAY", "共鳴のACT"]
  WS: ["WSAY", "人狼のささやき"]
  WA: ["WSAY", "人狼のACT"]
  XS: ["XSAY", "念話（念波の民）"]
  XA: ["XSAY", "念act（念波の民）"]
  BS: ["BSAY", "念話（蝙蝠人間）"]
  BA: ["BSAY", "念act（蝙蝠人間）"]

module.exports =
  namespaced: true
  state: ->
    {}
  mutations:
    faces: (state,{ data })->
      for o in data.faces when face = Query.faces.find o._id.face_id
        face.aggregate.log = o
      for o in data.m_faces when face = Query.faces.find o._id.face_id
        face.aggregate.log.date_min = o.date_min
      for o in data.sow_auths when face = Query.faces.find o._id.face_id
        face.aggregate.fav = o
      Mem.Finder.face.clear_cache()

    face: (state,{ id, data })->
      face = Query.faces.find id
      face.aggregate.log = data.faces[0]
      face.aggregate.log.date_min = data.m_faces[0].date_min
      face.aggregate.sow_auths = _.sortBy data.sow_auths, (o)-> - o.story_ids.length

      face.aggregate.lives = _.sortBy data.lives, (o)-> - o.story_ids.length
      sum = 0
      face.aggregate.lives = for o in face.aggregate.lives
        o.role = Query.roles.find(o._id.live, "mob")
        continue if o._id.live == "leave"
        sum += o.story_ids.length
        o
      face.aggregate.lives.sum = sum

      face.aggregate.roles = _.sortBy data.roles, (o)-> - o.story_ids.length
      sum = 0
      face.aggregate.roles = for o in face.aggregate.roles
        o.role = Query.roles.find(o._id.role_id, "mob")
        sum += o.story_ids.length
        o
      face.aggregate.roles.sum = sum

      mestypes = _.keyBy data.mestypes, '_id.mestype'
      sum =
        handle: "dark"
        title: "－合計－"
        per: face.story_length
        all: 0
        max: 0
        count: 0
      face.aggregate.mestypes =
        for loghd, [handle, title] of titles when o = mestypes[loghd]
          sum.all   += o.all
          sum.count += o.count
          sum.max    = o.max if sum.max < o.max
          per = o.story_ids.length
          _.merge { handle, title, per }, o
      face.aggregate.mestypes.push sum

      keys = face.aggregate.log.story_ids.map (key)-> key.split("-")
      folders = _.groupBy keys, (o)-> o[0]
      for key, list of folders
        folders[key] = _.sortBy list, (o)-> o[1] - 0
        folders[key].nation = Query.folders.find(key.toUpperCase()).nation
      face.aggregate.folders = _.sortBy folders, (list, key)-> - list.length
      Mem.Finder.face.clear_cache()

  actions:
    faces: ({ dispatch, state, commit, rootState })->
      Mem.read_at_gate "aggregate_faces", ->
        axios.get "#{env.API_URL}/aggregate/faces"
        .then ({ status, data })->
          commit "faces", { data }
        .catch (err)->
          console.log err

    face: ({ state, commit, rootState }, id)->
      Mem.read_at_gate "aggregate_face.#{id}", ->
        axios.get "#{env.API_URL}/aggregate/faces/#{id}"
        .then ({ status, data })->
          commit "face", { data, id }
        .catch (err)->
          console.log err

