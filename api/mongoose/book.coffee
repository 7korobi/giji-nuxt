{ YAML, API } = require "../helper"
{
  must_signiture
  can_admin
} = require "./_validate"

module.exports = (app, { game: { folder_id }})->
  {
    Stat
    Card
    Potof

    Book
    Part
    Phase
    Chat

    up_stat
    up_card
    up_potof

    up_book
    up_part
    add_book

    up_chats_step_book
    up_phases_step_book

    up_chats_step_part
    up_phases_step_part
  } = require("./_model")({ folder_id })

###
  getter API
###

  app.get '/api/books', API ({
    query: { self }
    session: { passport }
  })->
    books =
      if self
        await Book.find { passport_id: passport.user._id }
      else
        await Book.find { _id: ///^#{folder_id}-/// }
    { books }

  app.get '/api/books/:book_id', API ({
    params: { book_id }
    query: { write_at }
    session: { passport }
  })->
    _id =
      $regex: ///^#{book_id}-///
    [ book, potofs, stats, cards, parts, phases ] = await Promise.all [
      Book.findById book_id

      Potof.find { _id }
      Stat.find  { _id }
      Card.find  { _id }

      Part.find  { _id }
      Phase.find { _id }
    ]
    for potof in potofs when potof.passport_id == passport.user._id
      passport.potof = potof

    { book, potofs, stats, cards, parts, phases }

###
  posting API
###

  app.post '/api/books', API ({
    body: { book, potof }
    session: { passport }
  })->
    must_signiture passport

    book.passport_id = passport.user._id
    book = { _id } = await add_book book

    npc_id = "#{_id}-NPC"
    [potof, part, phases, chats] = await Promise.all [
      up_potof
        _id: npc_id
        idx: "NPC"
        face_id: potof.face_id
        book_id: _id
        passport_id: passport.user._id

        sign: passport.user.sign
        job: potof.job

      up_part
        _id: "#{_id}-0"
        idx: "0"
        label: 'プロローグ'
      Promise.all [
        ... up_phases_step_book _id, 0
        ... up_phases_step_part _id, 0
      ]
      Promise.all [
        ... up_chats_step_book _id, 0
        ... up_chats_step_part _id, 0, potof.face_id
      ]
    ]
    passport.potof = potof
    { book, potof, part, phases, chats }

  app.post '/api/books/:book_id', API ({
    params: { book_id }
    body: { book, potof }
    session: { passport }
  })->
    must_signiture passport
    can_admin passport

    book._id = book_id
    book = { _id, passport_id } = await up_book book
    npc_id = "#{_id}-NPC"

    Object.assign potof,
      _id: "#{_id}-NPC"
      idx: "NPC"
      sign: passport.user.sign
      passport_id: passport.user._id
    [potof, phases, chats] = await Promise.all [
      up_potof potof
      Promise.all up_phases_step_book _id, 0
      Promise.all [
        ... up_chats_step_book _id, 0
        ... up_chats_step_part _id, 0, potof.face_id
      ]
    ]
    { book, potof, phases, chats }

  app.delete '/api/book/:book_id', API ({
    params: { book_id }
    session:
      passport: { user }
  })->
    book = await del_book book_id
    { book }

  app.post '/api/gm/scrap', API ({
    session: { passport }
  })->
    must_signiture passport
    can_admin passport

    args = await Promise.all [
    ]
    { args }
