mongo = require "mongodb-bluebird"
ObjectId = false

giji = {}

mongo.connect "mongodb://192.168.0.249/giji"
.then (db)->
  giji.base = db.collection("message_by_story_for_face", {ObjectId})
  giji.for_face_role = db.collection("potof_for_face_role", {ObjectId})
  giji.for_face_live  = db.collection("potof_for_face_live", {ObjectId})
  giji.for_face        = db.collection("message_for_face", {ObjectId})
  giji.for_face_mestype = db.collection("message_for_face_mestype", {ObjectId})
  giji.for_face_sow_auth = db.collection("message_for_face_sow_auth", {ObjectId})

  giji.aggregate = ->
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
          story_ids:
            $addToSet: "$_id.story_id"
      ,
        $out: out
      ], (err, o)->
        console.log [err, out]

    cmd "message_for_face",
      _id:
        face_id: "$_id.face_id"
    cmd "message_for_face_sow_auth",
      _id:
        face_id: "$_id.face_id"
        sow_auth_id: "$_id.sow_auth_id"
    cmd "message_for_face_mestype",
      _id:
        face_id: "$_id.face_id"
        mestype: "$_id.mestype"

    db.collection("potofs",{ObjectId}).aggregate [
      $unwind: "$role"
    ,
      $group:
        _id:
          role_id: "$role"
          face_id: "$face_id"
        role:
          $sum: 1 
        story_ids:
          $addToSet: "$story_id"
    ,
      $out: "potof_for_face_role"
    ], (err, o)->
      console.log [err, "potof_for_face_role"]

    db.collection("potofs",{ObjectId}).aggregate [
      $group:
        _id:
          live_id: "$live"
          face_id: "$face_id"
        live:
          $sum: 1 
        story_ids:
          $addToSet: "$story_id"
    ,
      $out: "potof_for_face_live"
    ], (err, o)->
      console.log [err, "potof_for_face_live"]

  giji.scan = ->
    giji.ignore (err, [o])->
      list = o?.story_ids ? []
      db.collection("stories",{ObjectId}).aggregate [
        $match:
          _id:
            $nin: list
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
        list = o?.story_ids ? []
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

  app.get '/api/aggregate/for_message', (req, res, next)->
    giji.aggregate()
    res.json
      started: true
    next()

  app.get '/api/aggregate/message/faces/:id', (req, res, next)->
    { id } = req.params
    q =
      "_id.face_id": id
      
    Promise.all [
      giji.for_face.find q
      giji.for_face_mestype.find q
      giji.for_face_sow_auth.find q
      giji.for_face_role.find q
      giji.for_face_live.find q
    ]
    .then ([all, mestype, sow_auth, role, live])->
      res.json { all, mestype, sow_auth, role, live }
      next()
  return





