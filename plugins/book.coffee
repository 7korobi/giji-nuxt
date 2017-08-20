{ Query } = require "~plugins/memory-record"
{ tree, relative_to } = require "~plugins/struct"

store = require("~plugins/browser-store")
  push:
    mode: "full"
  replace:
    idx: []
  watch: (val, key)->
    switch key
      when "mode"
        focus.call @, @chat_id
        @page_idxs = [ @page_all_contents?.page_idx?(@chat) ? 0 ]

focus = (chat_id)->
  if chat_id? && window?
    @$nextTick =>
      console.log window[chat_id]
      @$store.commit "menu/focus", chat_id

tree store, "folder", "book", "part", "phase", "chat"
store.computed.book.set = ({ page_idxs, chat_id, part_id, part })->
  if part_id
    part ?= Query.parts.find part_id
  if part
    idx = part.id
  if chat_id
    chat = Query.chats.find chat_id
    part = chat.part
    idx  = chat_id
  return unless part

  pages = @pages_calc page_idxs
  @$router.replace relative_to @$route, { idx, pages }

Object.assign store.computed,
  page_all_contents: ->
    @chats(@part_id)

  mentions: ->
    @read_at
    Query.chats.reduce?.mention_to?[@chat_id]

  now: ->
    @read_at
    Query.chats.now(@hide_potof_ids)

  chats: ->
    @now[@mode]

  back: ->
    pages = 1 + @page_all_contents?.page_idx?(@chat) ? 0
    [ @chat_id || @part_id, pages, @mode, @$route.name ].join(",")

  back_url: ->
    [ idx, pages, mode, name ] = (@$route.query.back ? @back).split(",")
    name: name
    params: { idx, mode }
    query: { pages }

  hide_potof_ids:
    get: ->
      @$store.state.book.hide_potof_ids
    set: (ids)->
      @$store.commit "book/hide_potof_ids", ids

  menus:
    get: ->
      key for key, val of @$store.state.menu.set when val
    set: (menus)->
      @$store.commit "menu/mode", menus

store.watch.read_at = ->
  focus.call @, @chat_id
  @page_idxs = [ @page_all_contents?.page_idx?(@chat) ? 0 ]
  

module.exports = store
