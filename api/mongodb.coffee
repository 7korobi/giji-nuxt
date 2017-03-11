mongo = require "mongodb-bluebird"
ObjectId = false

routes = (db)->
  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    { id } = req.params
    db.collection('aggregate_message_by_faces', {ObjectId}).find()
    .then (@by_faces)=>
      db.collection('aggregate_message_by_face_by_stories', {ObjectId}).find()
    .then (@by_face_by_stories)=>
      res.json @

module.exports = (app)->
  mongo.connect "mongodb://192.168.0.249/giji"
  .then routes
  .catch ->


###
aggregate_message_by_face_by_stories
aggregate_message_by_faces
aggregate_message_by_sow_auth
aggregate_message_by_sow_auth_by_stories
aggregate_message_by_sow_auths
aggregate_message_by_stories
aggregate_message_by_story
###
