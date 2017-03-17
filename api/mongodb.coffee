mongo = require "mongodb-bluebird"
ObjectId = false

giji = {}

mongo.connect "mongodb://192.168.0.249/giji"
.then (db)->
  giji.find = (id, q)->
    db.collection id, {ObjectId}
    .find q

  giji.aggregate = ->
    end = (err, o)->
    cmd = (out, keys, ext..., cb)->
      db.collection("message_by_story_for_face",{ObjectId}).aggregate [
        ext...
      ,
        $group:
          _id: keys
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
      ], cb ? end

    cmd "message_for_face",
      face_id: "$_id.face_id"
    cmd "message_for_face_sow_auth",
      face_id:     "$_id.face_id"
      sow_auth_id: "$_id.sow_auth_id"
    cmd "message_for_face_mestype",
      face_id: "$_id.face_id"
      mestype: "$_id.mestype"


    cmd = (out, keys, ext..., cb)->
      db.collection("potofs",{ObjectId}).aggregate [
        ext...
      ,
        $match:
          sow_auth_id:
            $exists: 1
            $nin: [null, "master", "admin"]
          face_id:
            $exists: 1
            $ne: null
          role_id:
            $exists: 1
            $ne: null
      ,
        $group:
          _id: keys
          story_ids:
            $addToSet: "$story_id"
      ,
        $out: out
      ], cb ? end

    cmd "potof_for_face",
      face_id: "$face_id"
    cmd "potof_for_face_live",
      face_id: "$face_id"
      live: "$live"
    cmd "potof_for_face_role",
      face_id: "$face_id"
      role_id: "$role"
    ,
      $unwind: "$role"
    cmd "potof_for_face_sow_auth",
      face_id:     "$face_id"
      sow_auth_id: "$sow_auth_id"
    , (err, o)->
      db.collection("potof_for_face_sow_auth",{ObjectId}).aggregate [
        $group:
          _id: "$_id"
          count:
            $max:
              $count: "$story_ids"
      ,
        $out: "potof_for_face_sow_auth_max"
      ], (err, o)->


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

.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/step/1', (req, res, next)->
    giji.scan()
    res.json
      started: true
    next()

  app.get '/api/aggregate/step/2', (req, res, next)->
    giji.aggregate()
    res.json
      started: true
    next()

  app.get '/api/aggregate/faces', (req, res, next)->
    q = {}
    Promise.all [
      giji.find "potof_for_face", q
      giji.find "potof_for_face_sow_auth", q
      giji.find "potof_for_face_role", q
      giji.find "potof_for_face_live", q
    ]
    .then ([all, sow_auth, role, live])->
      res.json { all, sow_auth, role, live }
      next()

  app.get '/api/aggregate/faces/:id', (req, res, next)->
    { id } = req.params
    q =
      "_id.face_id": id
    Promise.all [
      giji.find "message_for_face", q
      giji.find "message_for_face_mestype", q
      giji.find "message_for_face_sow_auth", q
      giji.find "potof_for_face_role", q
      giji.find "potof_for_face_live", q
    ]
    .then ([all, mestype, sow_auth, role, live])->
      res.json { all, mestype, sow_auth, role, live }
      next()
  return





