{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
require '~components/models/book'

module.exports =
  namespaced: true
  state:
    book_id: null
    part_id: null
    section_id: null
    chat_id: null
    book: {}
    part: {}
    section: {}
    chat: {}

  mutations:
    spot: (state, { book, part, section })->
      console.log { book, part, section }
      Collection.book.merge book
      Collection.part.merge part
      Collection.section.merge section
      state.book_id    = book._id
      state.part_id    = part._id
      state.section_id = section._id
      state.book    = book
      state.part    = part
      state.section = section
    see: (state, chat_id)->
      state.chat_id = chat_id
      state.chat = Query.chats.hash[chat_id]
    phases: (state, list)->
      Collection.phases.merge list
    potofs: (state, list)->
      Collection.potofs.merge list
    chats: (state, list)->
      Collection.chats.merge list