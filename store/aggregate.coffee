{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    faces: []
    face: {}
    titles:
      SSAY: "通常の発言"
      VSAY: "見物人発言"
      GSAY: "墓下の発言"
      TSAY: "独り言/内緒話"
      WSAY: "人狼のささやき"
      XSAY: "念話での会話"

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
      _.merge state, data
      state.face = data.faces[0]
      state.mestypes = _.keyBy data.mestypes, '_id.mestype'
      for key, title of state.titles
        state.mestypes[key].title = title

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

