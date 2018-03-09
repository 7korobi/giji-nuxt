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
  } = require("./_model")({ folder_id })

###
  getter API
###

###
  posting API
###

  app.post '/api/books/:book_id/potof', API ({
    params: { book_id }
    body: { potof, phase_id }
    session: { passport }
  })->
    must_signiture passport
    # can_player passport
    potof = { _id } = await add_potof book_id, potof
    [ stat, card, chat ] = await Promise.all [
      up_stat
        _id: "#{_id}-SSAY"
        idx: "SSAY"
        sw: false
        give: 0
      up_card
        _id: "#{_id}-request"
        idx: "request"
        role_id: null
      add_chat phase_id,
        sign: potof.sign
    ]
    { potof, stat, card, chat }

  app.delete '/api/potof/:potof_id', API ({
    params: { potof_id }
    session:
      passport: { user }
  })->
    potof = await del_potof potof_id
    { potof }

  app.post '/api/gm/muster', API ({
    session:
      passport: { user }
  })->
    args = await Promise.all [
    ]
    { args }

  app.put '/api/potof/:book_id', API ({
    params: { book_id }
    body: { potof }
    session:
      passport: { user }
  })->

  app.put '/api/card',  API ({
    body: { card }
    session:
      passport: { user }
  })->

  app.post '/api/gm/scrap', API ({
    session:
      passport: { user }
  })->
    args = await Promise.all [
    ]
    { args }
