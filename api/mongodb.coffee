mongo = require "mongodb-bluebird"
ObjectId = false

aggregate_message = {}

mongo.connect "mongodb://192.168.0.249/giji"
.then (db)->
  aggregate_message.by_faces = db.collection('aggregate_message_by_faces', {ObjectId})
  aggregate_message.by_face_by_stories = db.collection('aggregate_message_by_face_by_stories', {ObjectId})
.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    aggregate_message.by_faces.find()
    .then (@by_faces)=>
      aggregate_message.by_face_by_stories.find()
    .then (@by_face_by_stories)=>
      res.json @
      next()
  return

###
aggregate_message_by_face_by_stories
aggregate_message_by_faces
aggregate_message_by_sow_auth
aggregate_message_by_sow_auth_by_stories
aggregate_message_by_sow_auths
aggregate_message_by_stories
aggregate_message_by_story
###
