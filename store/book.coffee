{ Set, Model, Query, Rule } = require "~plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state: ->
    folder_id: ""
    book_id: ""
    part_id: ""
    section_id: ""
    phase_id: ""
    chat_id: ""
    page_idxs: []
    hide_potof_ids: []

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

    folder: (state, folder_id)->
      state.folder_id = folder_id

    book: (state, book_id)->
      state.phase_id = "#{book_id}-0-0"
      state.book_id = book_id

    part: (state, part_id)->
      part = Query.parts.find(part_id)
      book = Query.books.find(part.book.id)
      state.part_id = part_id
      state.book_id = part.book.id
      state.section_id = section_id =
        if part_id == book.parts.list.last.id
          book.sections.list.last.id
        else
          book.sections.list.first.id

    section: (state, section_id)->
      section = Query.sections.find section_id
      state.section_id = section_id

    hide_potof_ids: (state, ids)->
      state.hide_potof_ids = ids

    reset: (state, { page_idxs, part_id, part, mode })->
      part ?= Query.parts.find part_id
      return unless part
      if mode
        window.scrollTo 0,0
      unless state.part_id == part.id && state.page_idxs[0]== page_idxs[0]
        window.scrollTo 0,0
      state.part_id = part.id
      state.page_idxs = page_idxs

    see: (state, chat_id)->
      return unless chat_id
      return unless chat = Query.chats.find(chat_id)
      for key, val of state when chat[key]
        state[key] = chat[key]
      state.chat_id    = chat_id

  actions:
    books: ({commit}, folder)->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "/api/books", { folder }
      .then ({ status, data })->
        commit "data",  data
        commit "folder", folder

    book: ({commit}, id)->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "/api/books/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/books/#{id}"
        commit "data", data
        commit "book", id

    part: ({commit}, id)->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "/api/parts/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/parts/#{id}"
        commit "data", data
        commit "part", id

    section: ({commit}, id)->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "/api/sections/#{id}"
      .then ({ status, data })->
        console.log "HTTP :: /api/sections/#{id}"
        commit "data", data
        commit "section", id
