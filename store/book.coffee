{ Set, Model, Query, Rule } = require "~components/models/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    section: {}
    part: {}
    book: {}

    books:    []
    parts:    []
    sections: []

    phases:   []
    potofs:   []
    cards:    []
    stats:    []
    chats:    []

  mutations:
    data: (state, o)->
      Set.book.merge    o.books

      Set.part.merge    o.parts
      Set.section.merge o.sections
      Set.phase.merge   o.phases

      Set.stat.merge    o.stats
      Set.card.merge    o.cards
      Set.potof.merge   o.potofs

      Set.chat.merge    o.chats
      state.read_at = Date.now()

    books: (state, folder)->
      state.books = Query.books.where {folder}

    book: (state, book_id)->
      phase_id = "#{book_id}-0-0"
      state.book_id = book_id
      state.book = Query.books.find book_id

      state.books    = Query.books.list
      state.parts    = state.book.parts.list
      state.sections = state.book.sections.list
      state.potofs   = state.book.potofs.list
      state.chats    = state.book.chats.list

    part: (state, part_id)->
      state.part_id = part_id
      state.part = Query.parts.find part_id
      state.book = state.part.book

      state.phases = state.part.phases.list
      state.cards  = state.part.cards.list
      state.stats  = state.part.stats.list

      state.potofs = state.part.potofs
      state.section =
        if part_id == state.book.parts.list.last._id
          state.book.sections.list.last
        else
          state.book.sections.list.first
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


