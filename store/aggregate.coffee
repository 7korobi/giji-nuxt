{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    alls:     []
    books:    []
    parts:    []
    sections: []

    phases:   []
    cards:    []
    stats:    []
    chats:    []

  mutations:
    data: (state, o)->
      Collection.aggregate.merge o.all
      Collection.aggregate.merge o.mestype
      Collection.aggregate.merge o.sow_auth
      Collection.aggregate.merge o.role
      Collection.aggregate.merge o.live
      state.read_at = Date.now()

    faces: (state)->
      q = Query.aggregates
      role_id = sow_auth_id = mestype = live = null
      state.alls = q.where({role_id, sow_auth_id, mestype, live}).list
      state.sow_auths = q.where((o)-> o.group.sow_auth_id).list
      state.roles = q.where((o)-> o.group.role_id).list
      state.lives = q.where((o)-> o.group.live).list

    face: (state, face_id)->
      q = Query.aggregates.where({face_id})
      role_id = sow_auth_id = mestype = live = null
      state.all = q.where({role_id, sow_auth_id, mestype, live}).list.first
      state.mestypes = q.where((o)-> o.group.mestype).list
      state.sow_auths = q.where((o)-> o.group.sow_auth_id).list
      state.roles = q.where((o)-> o.group.role_id).list
      state.lives = q.where((o)-> o.group.live).list

  actions:
    faces: ({commit})->
      axios.get "http://utage.family.jp:4000/api/aggregate/faces"
      .then ({ status, data })->
        commit "data",  data
        commit "faces"

    face: ({commit}, id)->
      axios.get "http://utage.family.jp:4000/api/aggregate/faces/#{id}"
      .then ({ status, data })->
        commit "data",  data
        commit "face", id

