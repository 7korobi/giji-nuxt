{ YAML, API } = require "./api"
{ nation, village } = YAML "yaml/rule.yml"

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
      type: [String]
      index: true
    phase_handle:
      type: String
      index: true 
    idx: String
    _id: String

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
    await model.findByIdAndUpdate o._id, o,
      new: true
      upsert: true

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

  up_chats_step_1 = (_id, npc_id)->
    [
      up_chat
        _id: "#{_id}-0-村題-welcome"
        idx: "welcome"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: "（この村をみんなに紹介しよう）"
      up_chat
        _id: "#{_id}-0-村題-nrule"
        idx: "nrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: nrules.join("\n")
      up_chat
        _id: "#{_id}-0-村題-vrule"
        idx: "vrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: vrules.join("\n")
    ]

  up_phases_step_1 = (_id)->
    [
      up_phase
        _id: "#{_id}-村題"
        idx: "村題"
        label: '情報'
        handle: 'MAKER'
        update: true
      up_phase
        _id: "#{_id}-独題"
        idx: "独題"
        label: '情報'
        handle: 'private'
        update: false
      up_phase
        _id: "#{_id}-独言"
        idx: "独言"
        label: '独り言'
        handle: 'TSAY'
        update: false
    ]

  up_phases_step_2 = (_id)->
    [
      up_phase
        _id: "#{_id}-発題"
        idx: "発題"
        label: '情報'
        handle: 'public'
        update: false
      up_phase
        _id: "#{_id}-発言"
        idx: "発言"
        label: '発言'
        handle: 'SSAY'
        update: false
      up_phase
        _id: "#{_id}-見言"
        idx: "見言"
        label: '発言'
        handle: 'VSAY'
        update: false
      up_phase
        _id: "#{_id}-内言"
        idx: "内言"
        label: "内緒話"
        handle: "AIM"
        update: false
    ]

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
    session:
      potof: potof
      passport: { user }
  })->
    _id =
      $regex: ///^#{book_id}-///
    potof_id =
      $in: [
        potof?._id
      ]
    phase_handle =
      $in: [
        'SSAY', 'VSAY'
        'GSAY', 'VGSAY'
        'public'
        'MAKER', 'ADMIN'  
      ]
    [ chats ] = await Promise.all [
      Chat.find
        _id: _id
        $or: [{ potof_id }, { phase_handle }]
    ]
    { chats }

  app.post '/api/books', API ({
    body: { book }
    session: { passport }
  })->
    must_signiture passport

    book = { _id } = await add_book book
    npc_id = "#{_id}-NPC"
    [potof, part, chats, phases] = await Promise.all [
      up_potof
        _id: npc_id
        idx: "NPC"
        passport_id: passport.user._id
        sign: passport.user.sign
      up_part
        _id: "#{_id}-0"
        idx: "0"
        label: 'プロローグ'
      Promise.all up_chats_step_1 "#{_id}-0", npc_id
      Promise.all up_phases_step_1 "#{_id}-0"
    ]
    passport.potof = potof

    potofs = [potof]
    parts  = [part]
    { book, potofs, parts, phases, chats }

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
    [potof, chat, phases] = await Promise.all [
      up_potof potof
      up_chat
        _id: "#{_id}-0-発言-0"
        idx: "0"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "text"
        log: "＠＠＠"

      Promise.all up_phases_step_2 "#{_id}-0"
    ]
    potofs = [potof]
    chats  = [chat]
    { book, potofs, chats, phases }


  app.post '/api/books/:book_id/part', API ({
    params: { book_id }
    body: { part }
    session: { passport }
  })->
    must_signiture passport
    can_admin passport

    [ part, ...phases ] = await Promise.all [
      up_part part
      ... up_phases_step_1 part._id
      ... up_phases_step_2 part._id
    ]
    { part, phases }

  app.post '/api/books/:book_id/potof', API ({
    params: { book_id }
    body: { potof, phase_id }
    session: { passport }
  })->
    must_signiture passport
    # can_player passport
    potof = { _id } = await add_potof book_id, potof
    args = await Promise.all [
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
    { potof, args }

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
