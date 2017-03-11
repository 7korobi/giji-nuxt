{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
require '~components/models/book'
axios = require "axios"

if process.BROWSER_BUILD
  window.Query = Query
  window.Collection = Collection

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    books:    []
    parts:    []
    sections: []

    phases:   []
    cards:    []
    stats:    []
    chats:    []

  mutations:
    data: (state, o)->
      Collection.book.merge    o.books

      Collection.part.merge    o.parts
      Collection.section.merge o.sections
      Collection.phase.merge   o.phases

      Collection.stat.merge    o.stats
      Collection.card.merge    o.cards
      Collection.potof.merge   o.potofs

      Collection.chat.merge    o.chats
      state.read_at = Date.now()

    books: (state, folder)->
      state.books = Query.books.where {folder}

    book: (state, book_id)->
      phase_id = "#{book_id}-0-0"
      state.book_id = book_id
      state.book = Query.books.find book_id

      state.books    = Query.books.where(   {book_id}).list
      state.parts    = Query.parts.where(   {book_id}).list
      state.sections = Query.sections.where({book_id}).list

      state.potofs   = Query.potofs.where(  {book_id}).list

      state.chats    = Query.chats.where(  {phase_id}).list

    part: (state, part_id)->
      state.part_id = part_id
      state.part = Query.parts.find part_id

      state.phases = Query.phases.where(  {part_id}).list
      state.cards  = Query.cards.where(   {part_id}).list
      state.stats  = Query.stats.where(   {part_id}).list

      state.section =
        if part_id == state.parts.last
          state.sections.last
        else
          state.sections.first
      section_id = state.section_id = state.section._id
      state.chats  = Query.chats.where({section_id}).list

    section: (state, section_id, data)->
      state.section_id = section_id
      state.section = Query.sections.find section_id

      state.chats = Query.chats.where({section_id}).list

    see: (state, chat_id)->
      return unless chat_id
      state.chat_id = chat_id

  actions:
    books: ({commit}, folder)->
      axios.get "/api/books", { folder }
      .then ({ status, data })->
        console.log "HTTP :: /api/books {folder: #{folder}}"
        commit "data",  data
        commit "books", folder

    book: ({commit}, id)->
      axios.get "/api/books/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/books/#{id}"
        commit "data", data
        commit "book", id

    part: ({commit}, id)->
      axios.get "/api/parts/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/parts/#{id}"
        commit "data", data
        commit "part", id

    section: ({commit}, id)->
      axios.get "/api/sections/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/sections/#{id}"
        commit "data", data
        commit "section", id


