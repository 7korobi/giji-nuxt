{ YAML, API } = require "../helper.coffee"
{ nation, village } = YAML "yaml/rule.yml"

{ Model, Set, Query, Rule } = Mem = require "~/plugins/memory-record"
require "~/models/book"
require "~/models/card"
require "~/models/chr"

nrules = for { head }, idx in nation.list
  "#{idx + 1}. #{head}"

vrules = for { head }, idx in village.list
  "#{idx + 1}. #{head}"

module.exports = (app, m, { game: { folder_id }})->
  { Schema } = m
  Card = m.model 'Card', new Schema
    write_at: Number

    book_id:
      type: String
      index: true
    part_id: String
    role_id: String
    idx: String
    _id: String
  ,
    versionKey: false


  Stat = m.model 'Stat', new Schema
    write_at: Number

    book_id:
      type: String
      index: true
    role_id: String
    idx: String
    _id: String

    sw: Boolean
    give: Number
  ,
    versionKey: false


  Potof = m.model 'Potof', new Schema
    write_at: Number
    open_at: Number

    book_id:
      type: String
      index: true
    passport_id: String
    face_id: String
    idx: String
    _id: String

    sign: String
    job: String
  ,
    versionKey: false


  IdxCount = m.model 'IdxCount', new Schema
    idx: Number
    _id: String
  ,
    versionKey: false


  Book = m.model 'Book', new Schema
    write_at: Number
    open_at: Number

    passport_id: String
    folder_id: String
    idx: String
    _id: String

    chat:
      limit: String
      next_at: String
      password: String
      interval: String
      night: String
      player: Number
      mob: Number
    game:
      vote: String
      vote_by: [String]
    tag_ids: [String]
    option: [String]
    label: String
  ,
    versionKey: false


  Part = m.model 'Part', new Schema
    write_at: Number
    open_at: Number

    book_id:
      type: String
      index: true
    idx: String
    _id: String

    label: String
  ,
    versionKey: false

  

  Phase = m.model 'Phase', new Schema
    write_at: Number

    book_id:
      type: String
      index: true
    idx: String
    _id: String

    label: String
    handle: String
    group: String
    update: false
  ,
    versionKey: false


  Chat = m.model 'Chat', new Schema
    write_at: Number

    book_id:
      type: String
      index: true
    potof_id:
      type: String
      index: true
    phase_handle:
      type: String
      index: true 
    idx: String
    _id: String

    head: String
    to: String

    show: String
    deco: String
    log: String
  ,
    versionKey: false

  must_signiture = ({ user })->
    unless user?.sign?
      throw new Error "ログインしてください。"

  can_admin = ({ user, potof })->
    unless potof?.idx == "NPC"
      throw new Error "ログインしてください。"

  up_for_tree = (model, o)->
    write_at = new Date() - 0
    o.open_at ?= write_at
    Object.assign o, { write_at }
    unless o._id
      console.log o 
    o = await model.findByIdAndUpdate o._id, o,
      new: true
      upsert: true
    o.passport_id = undefined
    o

  add_for_tree = (_id, model, o)->
    { idx } = await IdxCount.findByIdAndUpdate _id,
      $inc:
        idx: 1
    ,
      new: true
      upsert: true
    _id = "#{_id}-#{idx}"

    Object.assign o, { idx, _id }
    up_for_tree model, o

  chk_book = ({ label })-> require_uniq Book, _id, { label, folder_id }

  add_book  = (book)->           add_for_tree folder_id, Book,  book
  add_potof = (book_id, potof)-> add_for_tree book_id,   Potof, potof
  add_part  = (book_id, part)->  add_for_tree book_id,   Part,  part
  add_phase = (part_id, phase)-> add_for_tree part_id,   Phase, phase
  add_chat  = (phase_id, chat)-> add_for_tree phase_id,  Chat,  chat

  up_potof = (potof)-> up_for_tree Potof, potof
  up_stat  = (stat)->  up_for_tree Stat,  stat

  up_book  = (book)->  up_for_tree Book,  book
  up_part  = (part)->  up_for_tree Part,  part
  up_phase = (phase)-> up_for_tree Phase, phase
  up_chat  = (chat)->  up_for_tree Chat,  chat

  up_chats_step_book = (_id, idx = 0)->
    head = "#{_id}-#{idx}"
    npc_id = "#{_id}-NPC"
    [
      up_chat
        _id: "#{head}-BM-welcome"
        idx: "welcome"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: "（この村をみんなに紹介しよう）"
      up_chat
        _id: "#{head}-BM-nrule"
        idx: "nrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: nrules.join("\n")
      up_chat
        _id: "#{head}-BM-vrule"
        idx: "vrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: vrules.join("\n")
    ]

  up_chats_step_part = (_id, idx, face_id)->
    face = Query.faces.find face_id
    log = face?.npc?.say?[idx]

    head = "#{_id}-#{idx}"
    npc_id = "#{_id}-NPC"
    chat =
      _id: "#{head}-SS-0"
      idx: "0"
      book_id: _id
      potof_id: npc_id
      deco: "giji"
      show: "talk"
      log: log ? "＠＠＠"
    [ up_chat chat ]

  up_phases_step_book = (_id, idx = 0)->
    head = "#{_id}-#{idx}"
    [
      up_phase
        _id: "#{head}-BM"
        idx: "BM"
        label: '情報'
        handle: 'MAKER'
        update: true
      up_phase
        _id: "#{head}-MM"
        idx: "MM"
        label: '情報'
        handle: 'SSAY'
        update: true
    ]
  up_phases_step_part = (_id, idx)->
    head = "#{_id}-#{idx}"
    [
      up_phase
        _id: "#{head}-TM"
        idx: "TM"
        label: '情報'
        handle: 'private'
        update: false
      up_phase
        _id: "#{head}-SM"
        idx: "SM"
        label: '情報'
        handle: 'public'
        update: false
      up_phase
        _id: "#{head}-TS"
        idx: "TS"
        label: '独り言'
        handle: 'TSAY'
        update: false
      up_phase
        _id: "#{head}-Aim"
        idx: "Aim"
        label: "内緒話"
        handle: "AIM"
        update: false
      up_phase
        _id: "#{head}-SS"
        idx: "SS"
        label: '会話'
        handle: 'SSAY'
        update: false
      up_phase
        _id: "#{head}-VS"
        idx: "VS"
        label: '会話'
        handle: 'VSAY'
        update: false
    ]


###
  getter API
###

  app.get '/api/books', API ->
    books = await Book.find { _id: ///^#{folder_id}-/// }
    { books }

  app.get '/api/books/:book_id', API ({
    params: { book_id }
    query: { write_at }
    session: { passport }
  })->
    _id =
      $regex: ///^#{book_id}-///
    [ book, potofs, stats, cards, parts, phases ] = await Promise.all [
      Book.findById book_id

      Potof.find { _id }
      Stat.find  { _id }
      Card.find  { _id }

      Part.find  { _id }
      Phase.find { _id }
    ]
    for potof in potofs when potof.passport_id == passport.user._id
      passport.potof = potof

    { book, potofs, stats, cards, parts, phases }

  app.get '/api/books/:book_id/chats', API ({
    params: { book_id }
    query: { write_at }
    session: { passport }
  })->
    _id =
      $regex: ///^#{book_id}-\d+-[BSV].-///
    finder =
      if passport?.potof?
        potof_id =
          $in: [
            passport.potof._id
          ]
        Chat.find
          _id:
            $regex: ///^#{book_id}-///
          $or: [{ potof_id }, { _id }]
      else
        Chat.find { _id }

    [ chats ] = await Promise.all [finder]
    { chats }

###
  posting API
###

  app.post '/api/books', API ({
    body: { book, potof }
    session: { passport }
  })->
    must_signiture passport

    book = { _id } = await add_book book
    npc_id = "#{_id}-NPC"
    [potof, part, phases, chats] = await Promise.all [
      up_potof
        _id: npc_id
        idx: "NPC"
        face_id: potof.face_id
        book_id: _id
        passport_id: passport.user._id

        sign: passport.user.sign
        job: potof.job

      up_part
        _id: "#{_id}-0"
        idx: "0"
        label: 'プロローグ'
      Promise.all [
        ... up_phases_step_book _id, 0
        ... up_phases_step_part _id, 0
      ]
      Promise.all [
        ... up_chats_step_book _id, 0
        ... up_chats_step_part _id, 0, potof.face_id
      ]
    ]
    passport.potof = potof
    { book, potof, part, phases, chats }

  app.post '/api/books/:book_id', API ({
    params: { book_id }
    body: { book, potof }
    session: { passport }
  })->
    must_signiture passport
    can_admin passport

    book._id = book_id
    book = { _id, passport_id } = await up_book book
    npc_id = "#{_id}-NPC"

    Object.assign potof,
      _id: "#{_id}-NPC"
      idx: "NPC"
      sign: passport.user.sign
      passport_id: passport.user._id
    [potof, phases, chats] = await Promise.all [
      up_potof potof
      Promise.all up_phases_step_book _id, 0
      Promise.all [
        ... up_chats_step_book _id, 0
        ... up_chats_step_part _id, 0, potof.face_id
      ]
    ]
    { book, potof, phases, chats }


  app.post '/api/books/:book_id/part', API ({
    params: { book_id }
    body: { part }
    session: { passport }
  })->
    must_signiture passport
    can_admin passport
    { potof } = passport

    [ part, phases, chats ] = await Promise.all [
      up_part part
      Promise.all up_phases_step_part book_id, part.idx
      Promise.all up_chats_step_part  book_id, part.idx, potof.face_id
    ]
    { part, phases, chats }

  app.post '/api/books/:book_id/phase', API ({
    params: { book_id }
    body: { phase }
    session: { passport }
  })->
    must_signiture passport
    phase = { _id } = await add_phase book_id, phase

  app.post '/api/books/:book_id/potof', API ({
    params: { book_id }
    body: { potof, phase_id }
    session: { passport }
  })->
    must_signiture passport
    # can_player passport
    potof = { _id } = await add_potof book_id, potof
    [ stat, card, chat ] = await Promise.all [
      up_stat
        _id: "#{_id}-SSAY"
        idx: "SSAY"
        sw: false
        give: 0
      up_card
        _id: "#{_id}-request"
        idx: "request"
        role_id: null
      add_chat phase_id,
        sign: potof.sign
    ]
    { potof, stat, card, chat }

  app.delete '/api/book/:book_id', API ({
    params: { book_id }
    session:
      passport: { user }
  })->
    book = await del_book book_id
    { book }
  
  app.delete '/api/potof/:potof_id', API ({
    params: { potof_id }
    session:
      passport: { user }
  })->
    potof = await del_potof potof_id
    { potof }

  app.post '/api/gm/muster', API ({
    session:
      passport: { user }
  })->
    args = await Promise.all [
    ]
    { args }

  app.put '/api/potof/:book_id', API ({
    params: { book_id }
    body: { potof }
    session:
      passport: { user }
  })->

  app.put '/api/card',  API ({
    body: { card }
    session:
      passport: { user }
  })->

  app.post '/api/gm/scrap', API ({
    session:
      passport: { user }
  })->
    args = await Promise.all [
    ]
    { args }
