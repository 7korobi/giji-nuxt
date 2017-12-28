{ State, Set, Model, Query, Rule, merge } = require "~/plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state: ->
    type: "OK"
    message: null
    read_at: {}
    hide_potof_ids: []

  mutations:
    data: (state, o)->
      if o.name && o.message
        state.type = o.name
        state.message = o.message

      if o.book?
        state.read_at[o.book._id] = o.read_at
      merge o

    hide_potof_ids: (state, ids)->
      state.hide_potof_ids = ids

  actions:
    create: ({commit}, { book })->
      { status, data } = await axios.post "#{env.url.api}/books", { book }
      commit "data",  data
      data

    update: ({commit}, { book, potof })->
      { status, data } = await axios.post "#{env.url.api}/books/#{book._id}", { book, potof }
      commit "data",  data
      data

    books: ({commit})->
      { folder_id } = env.game
      { status, data } = await axios.get "#{env.url.api}/books", { folder_id }
      commit "data",  data

    book: ({commit, state}, _id)->
      write_at = state.read_at[_id]
      { status, data } = await axios.get "#{env.url.api}/books/#{_id}", { write_at }
      commit "data", data

    chats: ({commit, state}, _id)->
      write_at = state.read_at[_id]
      { status, data } = await axios.get "#{env.url.api}/books/#{_id}/chats", { write_at }
      commit "data", data
