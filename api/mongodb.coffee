mongo = require "mongodb-bluebird"
ObjectId = false

keys = [
  "aggregate_message_by_face_by_stories"
  "aggregate_message_by_faces"
  "aggregate_message_by_sow_auth"
  "aggregate_message_by_sow_auth_by_stories"
  "aggregate_message_by_sow_auths"
  "aggregate_message_by_stories"
  "aggregate_message_by_story"
]
giji = {}

mongo.connect "mongodb://192.168.0.249/giji"
.then (db)->
  for key in keys
    giji[key[18..]] = db.collection(key, {ObjectId})
.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    Promise.all( c.findOne() for k, c of giji )
    .then (values)->
      data = {}
      for key, idx in Object.keys giji
        data[key] = values[idx]
      res.json data
      next()
  return

