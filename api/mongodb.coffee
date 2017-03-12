mongo = require "mongodb-bluebird"
ObjectId = false

giji = {}

mongo.connect "mongodb://192.168.0.249/giji"
.then (db)->
  giji.base = db.collection("message_by_story_for_face", {ObjectId})
  giji.for_face = db.collection("message_for_face", {ObjectId})

  giji.aggregate = (cb)->
    cmd = (out, group)->
      db.collection("message_by_story_for_face",{ObjectId}).aggregate [
        $group: Object.assign group,
          date_min:
            $min: "$date_min"
          date_max:
            $max: "$date_max"
          max:
            $max: "$max"
          all:
            $sum: "$all"
          count:
            $sum: "$count"
      ,
        $out: out
      ], (err, o)->
        console.log [err, out]

    cmd "message_for_face",
      _id:
        face_id: "$_id.face_id"
      story_ids:
        $addToSet: "$_id.story_id"
      sow_auth_ids:
        $addToSet: "$_id.sow_auth_id"
    cmd "message_for_face_mestype",
      _id:
        face_id: "$_id.face_id"
        mestype: "$_id.mestype"


    group.mestype = "$_id.mestype"
    db.collection("message_by_story_for_face",{ObjectId}).aggregate [
      $group: group
    ,
      $out: "message_for_face_mestype"
    ], (err, o)->
      console.log [err, "message_for_face"]

  giji.scan = ->
    giji.ignore (err, [o])->
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
        if o
          for id in o.story_ids
            giji.set_base id

  giji.ignore = (cb)->
    db.collection("message_by_story_for_face",{ObjectId}).aggregate [
      $group:
        _id: null
        story_ids:
          $addToSet: "$_id.story_id"
    ], cb

  giji.set_base = (story_id)->
    db.collection("messages",{ObjectId}).aggregate [
      $match:
        story_id: story_id
        sow_auth_id:
          $exists: 1
          $ne: null
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
        sow_auth_id: 1
        story_id: 1
        face_id: 1
        logid: 1
        date: 1
        size:
          $strLenCP: "$log"
    ,
      $group:
        _id:
          sow_auth_id: "$sow_auth_id"
          story_id: "$story_id"
          face_id: "$face_id"
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
      console.log "aggregate  #{story_id}"

.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/by_message', (req, res, next)->
    giji.scan()
    res.json
      started: true
    next()

  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    { id } = req.params
    giji.base.find
      "_id.face_id": id
    .then (data)->
      res.json data
      next()
  return





