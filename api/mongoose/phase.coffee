{ YAML, API } = require "../helper.coffee"
{
  must_signiture
  can_admin
} = require "./_validate"

module.exports = (app, { game: { folder_id }})->
  {
    up_phase
    add_phase
  } = require("./_model")({ folder_id })

###
  getter API
###

###
  posting API
###

  app.post '/api/books/:book_id/phase', API ({
    params: { book_id }
    body: { phase }
    session: { passport }
  })->
    must_signiture passport
    phase = { _id } = await add_phase book_id, phase
