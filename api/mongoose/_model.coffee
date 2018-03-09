m = require "mongoose"
{ Schema } = m

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

module.exports = ({ folder_id })->
  m = {
    Card
    Stat
    Potof
    Book
    Part
    Phase
    Chat
    # chk_book: ({ label })-> require_uniq Book, _id, { label, folder_id }
    add_book:   (book)->           add_for_tree folder_id, Book,  book
    add_potof:  (book_id, potof)-> add_for_tree book_id,   Potof, potof
    add_part:   (book_id, part)->  add_for_tree book_id,   Part,  part
    add_phase:  (part_id, phase)-> add_for_tree part_id,   Phase, phase
    add_chat:   (phase_id, chat)-> add_for_tree phase_id,  Chat,  chat

    up_potof:   (potof)-> up_for_tree Potof, potof
    up_stat:    (stat)->  up_for_tree Stat,  stat
    up_card:    (card)->  up_for_tree Card,  card

    up_book:    (book)->  up_for_tree Book,  book
    up_part:    (part)->  up_for_tree Part,  part
    up_phase:   (phase)-> up_for_tree Phase, phase
    up_chat:    (chat)->  up_for_tree Chat,  chat
  }
  m.up_chats_step_book = (_id, idx = 0)->
    head = "#{_id}-#{idx}"
    npc_id = "#{_id}-NPC"
    [
      m.up_chat
        _id: "#{head}-BM-welcome"
        idx: "welcome"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: "（この村をみんなに紹介しよう）"
      m.up_chat
        _id: "#{head}-BM-nrule"
        idx: "nrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: nrules.join("\n")
      m.up_chat
        _id: "#{head}-BM-vrule"
        idx: "vrule"
        book_id: _id
        potof_id: npc_id
        deco: "giji"
        show: "report"
        log: vrules.join("\n")
    ]

  m.up_chats_step_part = (_id, idx, face_id)->
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
    [ m.up_chat chat ]

  m.up_phases_step_book = (_id, idx = 0)->
    head = "#{_id}-#{idx}"
    [
      m.up_phase
        _id: "#{head}-BM"
        idx: "BM"
        label: '情報'
        handle: 'MAKER'
        update: true
      m.up_phase
        _id: "#{head}-MM"
        idx: "MM"
        label: '情報'
        handle: 'SSAY'
        update: true
    ]

  m.up_phases_step_part = (_id, idx)->
    head = "#{_id}-#{idx}"
    [
      m.up_phase
        _id: "#{head}-TM"
        idx: "TM"
        label: '情報'
        handle: 'private'
        update: false
      m.up_phase
        _id: "#{head}-SM"
        idx: "SM"
        label: '情報'
        handle: 'public'
        update: false
      m.up_phase
        _id: "#{head}-TS"
        idx: "TS"
        label: '独り言'
        handle: 'TSAY'
        update: false
      m.up_phase
        _id: "#{head}-Aim"
        idx: "Aim"
        label: "内緒話"
        handle: "AIM"
        update: false
      m.up_phase
        _id: "#{head}-SS"
        idx: "SS"
        label: '会話'
        handle: 'SSAY'
        update: false
      m.up_phase
        _id: "#{head}-VS"
        idx: "VS"
        label: '会話'
        handle: 'VSAY'
        update: false
    ]
  m
