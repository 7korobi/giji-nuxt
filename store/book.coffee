{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
require '~components/models/book'
axios = require "axios"

if process.BROWSER_BUILD
  window.Query = Query
  window.Collection = Collection

module.exports =
  namespaced: true
  state:
    book_id: null
    part_id: null
    section_id: null
    chat_id: null
    data: {}

  mutations:
    see: (state, chat_id)->
      return unless chat_id
      state.chat_id = chat_id

    server: (state, o)->
      state.data = o
      state.book_id = o.books[0]._id
      state.part_id = o.parts[0]._id
      state.section_id = o.sections[0]._id

    client: (state)->
      Collection.book.merge    state.data.books
      Collection.part.merge    state.data.parts
      Collection.section.merge state.data.sections
      Collection.phase.merge   state.data.phases
      Collection.chat.merge    state.data.chats

      Collection.stat.merge    state.data.stats
      Collection.card.merge    state.data.cards
      Collection.potof.merge   state.data.potofs

  actions:
    server: ({commit}, id)->
      axios.get "/api/books/#{id}/0"
      .then ({ status, data })->
        console.log "HTTP :: /api/books/#{id}/0"
        commit "server", data
        commit "client"

