{ Model, Query, Rule } = require "~plugins/memory-record"
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

state =
  read_at: 0
  faces: []

face_state = ->
  read_at: 0
  sow_auths: []
  mestypes: []
  folders: []
  roles: []
  lives: []
  face: {}

for { _id } in Query.faces.list
  state[_id] = face_state()

module.exports =
  namespaced: true
  state: ->
    state
  mutations:
    join: (state,{ id, data })->
      state.read_at = Date.now()
      for o in data.faces when face = Query.faces.find o._id.face_id
        face.aggregate.log = o

    faces: (state,{ id, data })->
      state.read_at = Date.now()
      for o in data.sow_auths when face = Query.faces.find o._id.face_id
        face.aggregate.fav = o

    face: (state,{ id, data })->
      state[id].read_at = Date.now()
      state[id].face = data.faces[0]
      state[id].sow_auths = _.sortBy data.sow_auths, (o)-> - o.story_ids.length

      state[id].lives = _.sortBy data.lives, (o)-> - o.story_ids.length
      sum = 0
      state[id].lives = for o in state[id].lives
        o.role = Query.roles.find(o._id.live, "mob")
        continue if o._id.live == "leave"
        sum += o.story_ids.length
        o
      state[id].lives.sum = sum

      state[id].roles = _.sortBy data.roles, (o)-> - o.story_ids.length
      sum = 0
      state[id].roles = for o in state[id].roles
        o.role = Query.roles.find(o._id.role_id, "mob")
        sum += o.story_ids.length
        o
      state[id].roles.sum = sum

      mestypes = _.keyBy data.mestypes, '_id.mestype'
      sum =
        handle: "dark"
        title: "－合計－"
        per: state[id].face.story_ids.length
        all: 0
        max: 0
        count: 0
      state[id].mestypes =
        for loghd, [handle, title] of titles when o = mestypes[loghd]
          sum.all   += o.all
          sum.count += o.count
          sum.max    = o.max if sum.max < o.max
          per = o.story_ids.length
          _.merge { handle, title, per }, o
      state[id].mestypes.push sum

      keys = state[id].face.story_ids.map (key)-> key.split("-")
      folders = _.groupBy keys, (o)-> o[0]
      for key, list of folders
        folders[key] = _.sortBy list, (o)-> o[1] - 0
        folders[key].nation = Query.folders.find(key.toUpperCase()).nation
      state[id].folders = _.sortBy folders, (list, key)-> - list.length

  actions:
    faces: ({dispatch, state, commit})->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "http://giji.f5.si/api/aggregate/faces"
      .then ({ status, data })->
        commit "join",  { data, id: null }
        commit "faces", { data, id: null }
      .catch (err)->
        console.log err

    face: ({state, commit}, id)->
      return if Date.now() - 10 * 60 * 1000 < state[id].read_at 
      axios.get "http://giji.f5.si/api/aggregate/faces/#{id}"
      .then ({ status, data })->
        commit "join", { data, id }
        commit "face", { data, id }
      .catch (err)->
        console.log err

