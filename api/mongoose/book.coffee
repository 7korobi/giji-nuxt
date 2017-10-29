
module.exports = (app, m)->
  { Schema } = m
  Card = m.model 'Card', new Schema
    write_at: Number

    part_id: String
    role_id: String
    idx: String
    _id: String


  Stat = m.model 'Stat', new Schema
    write_at: Number

    role_id: String
    idx: String
    _id: String

    sw: Boolean
    give: Number


  Potof = m.model 'Potof', new Schema
    write_at: Number
    open_at: Number

    face_id: String
    idx: Number
    _id: String

    sign: String
    job: String


  Book = m.model 'Book', new Schema
    write_at: Number
    open_at: Number
    part_idx: Number

    passport_id: String
    folder_id: String
    idx: Number
    _id: String

    chat:
      interval: Number
      night: Number
      player: Number
      mob: Number
    game:
      vote: String
      vote_by: [String]
    tags: [String]
    option: [String]
    label: String


  Part = m.model 'Part', new Schema
    write_at: Number
    open_at: Number
    phase_idx: Number

    book_id: String
    idx: Number
    _id: String

    label: String


  Phase = m.model 'Phase', new Schema
    write_at: Number
    chat_idx: Number

    part_id: String
    idx: Number
    _id: String

    label: String
    handle: String
    group: String
    update: false


  Chat = m.model 'Chat', new Schema
    write_at: Number

    potof_id: String
    phase_id: String
    idx: Number
    _id: String

    show: String
    deco: String
    log: String


  app.post '/api/book', (req, res, next)->
    { book, profile } = req.body
    at = new Date() - 0
    folder_id = "test"
    { label, idx } = book

    book.part_idx ?= 0
    book.open_at ?= at
    book.write_at = at
    book.folder_id   = folder_id
    book.passport_id = profile._id

    try
      old_book = await Book.findOne({ label, folder_id }).exec()


      if old_book
        book.idx = idx = old_book.idx
        book._id = old_book._id
      ###
      if old_book && idx != old_book.idx
        console.log "duplicated"
        throw new Error "#{old_book._id} #{old_book.label} は作成済みです。"
      ###

      unless idx
        idx = await Book.count({ folder_id }).exec()
        book.idx = idx
        book._id = "#{folder_id}-#{idx}"

      part =
        _id: "#{book._id}-0"
        idx: 0
        label: "プロローグ"
        open_at: book.open_at
        write_at: book.write_at

      debug = { book, part, profile }
      [ book, part ] = await Promise.all [
        Book.findByIdAndUpdate(book._id, book, { upsert: true }).exec()
        Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
      ]
      res.json { book, part, debug }
    catch { message }
      console.error message
      res.json { message }


  app.post '/api/part', (req, res, next)->
    at = new Date() - 0

    { part } = req.body
    part.write_at = at
    part.open_at ?= at

    idx = 0
    try
      phase = [
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

      [ part, phase... ] = await Promise.all [
        Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
        phase...
      ]
      res.json { part, phase }
    catch err
      console.error err
      res.json { err }


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

    try
      [ part, potof ] = await Promise.all [
        Part.findByIdAndUpdate(part._id, part, { upsert: true }).exec()
        stats...
        cards...
      ]
      res.json { part, potof }
    catch err
      console.error err
      res.json { err }

