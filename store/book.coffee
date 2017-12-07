{ Set, Model, Query, Rule } = require "~/plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state: ->
    read_at: 0

  mutations:
    data: (state, o)->
      state.read_at[_id] = o.read_at

      Set.book.merge   [o.book]
      Set.book.merge    o.books

      Set.part.merge    o.parts
      Set.section.merge o.sections
      Set.phase.merge   o.phases

      Set.stat.merge    o.stats
      Set.card.merge    o.cards
      Set.potof.merge   o.potofs

      Set.chat.merge    o.chats

    hide_potof_ids: (state, ids)->
      state.hide_potof_ids = ids

  actions:
    create: ({commit}, book)->
      { status, data } = await axios.post "#{env.url.api}/book", { book }

    books: ({commit})->
      { folder_id } = env.game
      { status, data } = await axios.get "/api/books", { folder_id }
      commit "data",  data

    book: ({commit, state}, _id)->
      write_at = state.read_at[_id]
      { status, data } = await axios.get "/api/books/#{_id}", { write_at }
      commit "data", data

    chats: ({commit, state})->
      write_at = state.read_at[_id]
      { status, data } = await axios.get "/api/books/#{_id}/chars", { write_at }
      commit "data", data
