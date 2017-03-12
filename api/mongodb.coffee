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

  giji.base = (story_id, res, next)->
    db.collection("messages",{ObjectId}).aggregate [
      $match:
        story_id: story_id
        face_id:
          $exists: 1
          $ne: null
        logid:
          $exists: 1
          $ne: null
        log:
          $exists: 1
          $ne: null
    ,
      $project:
        story_id: 1
        face_id: 1
        logid: 1
        date: 1
        size:
          $strLenCP: "$log"
    ,
      $group:
        _id:
          face_id: "$face_id"
          story_id: "$story_id"
          mestype:
            $substr: ["$logid", 0, 2]
        date_min:
          $min: "$date"
        date_max:
          $max: "$date"
        max:
          $max: "$size"
        all:
          $sum: "$size"
        count:
          $sum: 1
    ], (err, data)->
      db.collection("message_by_story_for_face").insert data
      res.json data
      next()

.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/by_message', (req, res, next)->
    db.collection("message_by_story_for_face",{ObjectId}).aggregate [
      $group:
        _id: null
        story_ids:
          $addToSet: "$_id.story_id"
    ], (err, [o])->
      db.collection("stories",{ObjectId}).aggregate [
        $match:
          _id:
            $nin: o.story_ids
          is_finish:
            $eq: true
      ,
        $project:
          _id: 1
      ,
        $group:
          _id: null
          story_ids:
            $addToSet: "$_id"
      ], (err, [o])->
        for id in o.story_ids
          giji.base id, res, next

  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    Promise.all( c.findOne() for k, c of giji )
    .then (values)->
      data = {}
      for key, idx in Object.keys giji
        data[key] = values[idx]
      res.json data
      next()
  return





