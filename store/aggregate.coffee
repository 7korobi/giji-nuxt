{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    sow_auths: []
    mestypes: []
    folders: []
    roles: []
    lives: []
    faces: []
    face: {}
    titles:
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

  mutations:
    join: (state, data)->
      for o in data.faces
        o.face = Query.faces.find o._id.face_id
      data.read_at = Date.now()

    faces: (state, data)->
      sow_auths = _.keyBy data.sow_auths, "_id.face_id"
      for o in data.faces
        o.sow_auth = sow_auths[o._id.face_id]
      state.faces = _.chain data.faces
      .orderBy "story_ids.length", "desc"
      .filter "face"
      .value()

    face: (state, data)->
      state.face = data.faces[0]
      state.sow_auths = _.sortBy data.sow_auths, (o)-> - o.story_ids.length

      state.lives = _.sortBy data.lives, (o)-> - o.story_ids.length
      sum = 0
      state.lives = for o in state.lives when o._id.live != "leave"
        o.role = Query.roles.hash[o._id.live ? 'mob']
        sum += o.story_ids.length
        o
      state.lives.sum = sum

      state.roles = _.sortBy data.roles, (o)-> - o.story_ids.length
      sum = 0
      state.roles = for o in state.roles
        o.role = Query.roles.hash[o._id.role_id ? 'mob']
        sum += o.story_ids.length
        o
      state.roles.sum = sum

      mestypes = _.keyBy data.mestypes, '_id.mestype'
      sum =
        handle: "dark"
        title: "ー合計ー"
        per: state.face.story_ids.length
        all: 0
        max: 0
        count: 0
      state.mestypes =
        for loghd, [handle, title] of state.titles when o = mestypes[loghd]
          sum.all   += o.all
          sum.count += o.count
          sum.max    = o.max if sum.max < o.max
          per = o.story_ids.length
          _.merge { handle, title, per }, o
      state.mestypes.push sum

      keys = state.face.story_ids.map (key)-> key.split("-")
      folders = _.groupBy keys, (o)-> o[0]
      for key, list of folders
        folders[key] = _.sortBy list, (o)-> o[1] - 0
        folders[key].nation = Query.folders.hash[key.toUpperCase()].nation
      state.folders = _.sortBy folders, (list, key)-> - list.length

  actions:
    faces: ({commit})->
      axios.get "http://utage.family.jp:4000/api/aggregate/faces"
      .then ({ status, data })->
        commit "join",  data
        commit "faces", data

    face: ({commit}, id)->
      axios.get "http://utage.family.jp:4000/api/aggregate/faces/#{id}"
      .then ({ status, data })->
        commit "join", data
        commit "face", data

