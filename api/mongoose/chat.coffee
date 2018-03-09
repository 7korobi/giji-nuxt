{ YAML, API } = require "../helper.coffee"
{
  must_signiture
  can_admin
} = require "./_validate"

module.exports = (app, { game: { folder_id }})->
  {
    Chat

    up_stat
    up_card
    up_potof

    up_chat
    add_chat
  } = require("./_model")({ folder_id })

###
  getter API
###

  app.get '/api/books/:book_id/chats', API ({
    params: { book_id }
    query: { write_at }
    session: { passport }
  })->
    _id =
      $regex: ///^#{book_id}-\d+-[BSV].-///
    finder =
      if passport?.potof?
        potof_id =
          $in: [
            passport.potof._id
          ]
        Chat.find
          _id:
            $regex: ///^#{book_id}-///
          $or: [{ potof_id }, { _id }]
      else
        Chat.find { _id }

    [ chats ] = await Promise.all [finder]
    { chats }

###
  posting API
###
