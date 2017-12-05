{ Set, Model, Query, Rule } = require "~/plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state: ->
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

  actions:
    create: ({ commit, rootState }, book)->
      { profile } = rootState
      book.passport_id = profile._id
      { status, data } = await axios.post "#{env.url.api}/book", { book }
      console.log data

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
