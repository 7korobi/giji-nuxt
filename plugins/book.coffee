{ Query } = require "~plugins/memory-record"
{ path, relative_to } = require "~plugins/struct"

store = require("~plugins/browser-store")
  push:
    mode: "full"
  replace:
    idx: []
  watch: (val, key)->
    switch key
      when "mode"
        focus.call @, @chat_id
        @page_idxs = [ @page_idx ]

focus = (chat_id)->
  if chat_id? && window?
    @$nextTick =>
      if window[chat_id]
        @$store.commit "menu/focus", chat_id
      else
        console.log chat_id

path store, "folder", "book", "part", "phase", "chat"
Object.assign store.computed,
  page_all_contents: ->
    @chats(@part_id)
  page_idx: ->
    @page_all_contents?.page_idx?(@chat) ? 0

  mentions: ->
    @read_at
    Query.chats.reduce?.mention_to?[@chat_id]

  now: ->
    @read_at
    Query.chats.now(@hide_potof_ids)

  chats: ->
    @now[@mode]

  back: ->
    pages = 1 + @page_idx
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
  @page_idxs = [ @page_idx ]
  

module.exports = store
