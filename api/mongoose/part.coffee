{ YAML, API } = require "../helper.coffee"
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
    up_phase
    up_chat
    add_potof
    add_book
    add_phase
    add_chat

    up_chats_step_part
    up_phases_step_part
  } = require("./_model")({ folder_id })

###
  posting API
###

  app.post '/api/books/:book_id/part', API ({
    params: { book_id }
    body: { part }
    session: { passport }
  })->
    must_signiture passport
    can_admin passport
    { potof } = passport

    [ part, phases, chats ] = await Promise.all [
      up_part part
      Promise.all up_phases_step_part book_id, part.idx
      Promise.all up_chats_step_part  book_id, part.idx, potof.face_id
    ]
    { part, phases, chats }
