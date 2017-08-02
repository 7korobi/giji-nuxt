mongo = require "mongodb-bluebird"
sh = require 'child_process'
fs = require 'fs'
_ = require "lodash"
{ MONGO_URL_SOW, API_URL } = process.env

ObjectId = false

giji = {}

mongo.connect MONGO_URL_SOW
.then (db)->
  end = (err, o)->
    console.log err, o
  giji.find = (id, query, projection)->
    db.collection id, {ObjectId}
    .find query, projection

  giji.aggregate_message = ->
    cmd = (out, keys, ext...)->
      db.collection("message_by_story_for_face", {ObjectId}).aggregate [
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
      ], {ObjectId}

    Promise.all [
      cmd "message_for_face",
        face_id: "$_id.face_id"
      cmd "message_for_face_sow_auth",
        face_id:     "$_id.face_id"
        sow_auth_id: "$_id.sow_auth_id"
      cmd "message_for_face_mestype",
        face_id: "$_id.face_id"
        mestype: "$_id.mestype"
    ]


  giji.aggregate_potof = ->
    cmd = (out, keys, ext...)->
      db.collection("potofs", {ObjectId}).aggregate [
        ext...
      ,
        $match:
          sow_auth_id:
            $exists: 1
            $nin: [null, "master", "admin"]
          face_id:
            $exists: 1
            $ne: null
      ,
        $group:
          _id: keys
          date_min:
            $min: "$timer.entrieddt"
          date_max:
            $max: "$timer.entrieddt"
          story_ids:
            $addToSet: "$story_id"

      ,
        $out: out
      ], {ObjectId}

    Promise.all [
      cmd "potof_for_face",
        face_id: "$face_id"
      cmd "potof_for_face_live",
        face_id: "$face_id"
        live: "$live"
      cmd "potof_for_face_sow_auth",
        face_id:     "$face_id"
        sow_auth_id: "$sow_auth_id"
      cmd "potof_for_face_role",
        face_id: "$face_id"
        role_id: "$role"
      ,
        $unwind: "$role"
    ]

  giji.aggregate_max = ->
    db.collection("potof_for_face_sow_auth_max",{ObjectId}).remove({})
    .then ->
      db.collection("potof_for_face_sow_auth",{ObjectId}).aggregate [
        $project:
          _id: 1
          count:
            $size: "$story_ids"
      ,
        $group:
          _id:
            face_id: "$_id.face_id"
          count:
            $max: "$count"
      ], {ObjectId}
    .then (data)->
      Promise.all data.map (o)->
        giji.find "potof_for_face_sow_auth",
          "_id.face_id": o._id.face_id
          story_ids:
            $size: o.count
        .then (list)->
          [top] = _.sortBy list, (a)-> a.date_min
          o.date_min = top.date_min
          o.date_max = top.date_max
          o._id      = top._id
          o
    .then (data)->
      db.collection("potof_for_face_sow_auth_max",{ObjectId}).insert data

  giji.oldlog = ->
    db.collection("stories",{ObjectId}).aggregate [
      $match:
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
    ], {ObjectId}
    .then ([o])->
      data = for id in o.story_ids
        path = "./static/sow/#{id}.json.gz"
        url = "#{API_URL}/story/oldlog/#{id}"
        """  ls "#{path}" || curl "#{url}" | gzip --stdout --best > "#{path}"  """

      path = "./static/sow/index.json.gz"
      url = "#{API_URL}/story/oldlog"
      data.push """ curl "#{url}" | gzip --stdout --best > "#{path}"  """
      fs.writeFile './static/sow.sh', data.join("\n") , (err)->
        console.log err
      false

  giji.scan = ->
    db.collection("message_by_story_for_face",{ObjectId}).aggregate [
      $group:
        _id: null
        story_ids:
          $addToSet: "$_id.story_id"
    ], {ObjectId}
    .then ([o])->
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
      ], {ObjectId}
    .then ([o])->
      list = o?.story_ids ? []
      console.log "step B"
      console.log list
      set_bases = for id in list
        giji.set_base id
      Promise.all set_bases

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
    ], {ObjectId}
    .then (data)->
      db.collection("message_by_story_for_face").insert data

.catch ->
  console.log "!!! mongodb connect error !!!"

module.exports = (app)->
  app.get '/api/aggregate/job', (req, res, next)->
    giji.scan()
    .then ->
      giji.aggregate_message()
    .then ->
      giji.aggregate_potof()
    .then ->
      giji.aggregate_max()
    .then ->
      giji.oldlog()
    .then ->
      res.json
        started: true
      next()
    .catch (e)->
      res.json e
      next()

  app.get '/api/aggregate/faces', (req, res, next)->
    q = {}
    Promise.all [
      giji.find "potof_for_face", q
      giji.find "potof_for_face_sow_auth_max", q
    ]
    .then ([faces, sow_auths])->
      res.json { faces, sow_auths }
      next()
    .catch (e)->
      console.error req, e
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
    .then ([faces, mestypes, sow_auths, roles, lives])->
      res.json { faces, mestypes, sow_auths, roles, lives }
      next()
    .catch (e)->
      console.error req, e
      next()

  app.get '/api/story/progress', (req, res, next)->
    q =
      is_epilogue: false
      is_finish: false
    fields =
      comment:  0
      password: 0
    json = {}
    giji.find "stories", q, fields
    .then (data)->
      json.stories = data
      data.map (o)-> "#{o._id}-0"
    .then (ids)->
      giji.find "events",
        _id:
          $in: ids
    .then (data)->
      json.events = data
    .then ->
      res.json json
      next()
    .catch (e)->
      console.error req, e
      next()

  app.get '/api/story/oldlog', (req, res, next)->
    q =
      is_epilogue: true
      is_finish:   true
    fields =
      comment:  0
      password: 0
    giji.find "stories", q, fields
    .then (data)->
      res.json
        stories: data
      next()
    .catch (e)->
      console.error req, e
      next()

  app.get '/api/story/oldlog/:story_id', (req, res, next)->
    { story_id } = req.params
    fields =
      comment:  0
      password: 0
    Promise.all [
      giji.find "stories",  { _id: story_id, is_epilogue: true, is_finish: true}, fields
      giji.find "messages", { story_id }
      giji.find "events",   { story_id }
      giji.find "potofs",   { story_id }
    ]
    .then ([stories, messages, events, potofs])->
      unless stories.length
        messages = events = potofs = []
      res.json { stories, messages, events, potofs }
      next()
    .catch (e)->
      console.error req, e
      next()

  return





