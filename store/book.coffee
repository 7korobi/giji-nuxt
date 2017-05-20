{ Set, Model, Query, Rule } = require "~plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()

    folder_id: ""
    book_id: ""
    part_id: ""
    section_id: ""
    phase_id: ""
    
    chat_id: ""

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

    see: (state, chat_id)->
      return unless chat_id
      state.chat_id = chat_id
      return unless chat = Query.chats.find(chat_id)
      state.folder_id = chat.folder_id
      state.book_id = chat.book_id
      state.part_id = chat.part_id
      state.phase_id = chat.phase_id
      state.section_id = chat.section_id

  actions:
    books: ({commit}, folder)->
      axios.get "/api/books", { folder }
      .then ({ status, data })->
        commit "data",  data
        commit "folder", folder

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


