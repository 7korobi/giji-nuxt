
module.exports = (app, { model, Schema })->
  Card = model 'Card', new Schema
    write_at: Number

    role_id: String
    date: Number

    idx: String
    _id: String

  Stat = model 'Stat', new Schema
    write_at: Number

    role_id: String
    sw: Boolean
    give: Number

    idx: String
    _id: String

  Potof = model 'Potof', new Schema
    write_at: Number
    open_at: Number

    face_id: String

    sign: String
    job: String

    idx: Number
    _id: String

  Book = model 'Book', new Schema
    write_at: Number
    open_at: Number

    label: String
    sign: String

    idx: Number
    _id: String

  Part = model 'Part', new Schema
    write_at: Number
    open_at: Number

    label: String

    idx: Number
    _id: String

  Phase = model 'Phase', new Schema
    write_at: Number
    
    label: String
    handle: String
    group: String
    update: false

    chat_idx: Number
    idx: Number
    _id: String

  Chat = model 'Chat', new Schema
    write_at: Number

    potof_id: String

    show: String
    deco: String
    log: String

    idx: Number
    _id: String


  app.post '/api/book', (req, res, next)->
    at = new Date() - 0

    { book } = req.body
    book.write_at = at
    book.open_at ?= at

    part =
      _id: "#{book._id}-0"
      idx: 0
      label: "プロローグ"
      open_at: book.open_at
      write_at: book.write_at

    Promise.all [
      Book.findByIdAndUpdate(book._id, book, { upsert: true }).exec()
      Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
    ]
    .then (book, part)->
      res.json { book, part }
      next()
    .catch (err)->
      console.error err
      res.json { err }
      next()


  app.post '/api/part', (req, res, next)->
    at = new Date() - 0

    { part } = req.body
    part.write_at = at
    part.open_at ?= at

    idx = 0
    phases = [
      label: "公開情報"
      handle: "public"
      group: "I"
      update: false
    ,
      label: "秘密情報"
      handle: "private"
      group: "I"
      update: false
    ,
      label: "管理"
      handle: "MAKER"
      group: "S"
      update: true
    ,
      label: "発言"
      handle: "SSAY"
      group: "S"
      update: false
    ,
      label: "発言"
      handle: "VSSAY"
      group: "S"
      update: false
    ,
      label: "内緒話"
      handle: "AIM"
      group: "S"
      update: false
    ,
      label: "独り言"
      handle: "TSAY"
      group: "S"
      update: false
    ].map (o)->
      o.idx = idx
      o._id = "#{part._id}-#{idx++}"
      o.write_at = at
      Phase.findByIdAndUpdate(o._id, o, { upsert: true }).exec()

    Promise.all [
      Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
      phases...
    ]
    .then (part, phase)->
      res.json { part, phase }
      next()
    .catch (err)->
      console.error err
      res.json { err }
      next()

  app.post '/api/potof', (req, res, next)->
    at = new Date() - 0

    { potof, stat } = req.body
    potof.write_at = at
    potof.open_at ?= at

    stats = [ stat,
      idx: "give"
      give: 1
    ].map (o)->
      o._id = "#{potof._id}-#{o.idx}"
      o.write_at = at
      Stat.findByIdAndUpdate(o._id, o, { upsert: true }).exec()

    cards = [
      idx: "request"
      role_id: null
    ].map (o)->
      o._id = "#{potof._id}-#{o.idx}"
      o.write_at = at
      Card.findByIdAndUpdate(o._id, o, { upsert: true }).exec()

    Promise.all [
      Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
      stats...
      cards...
    ]
    .then (part, phase)->
      res.json { part, phase }
      next()
    .catch (err)->
      console.error err
      res.json { err }
      next()
