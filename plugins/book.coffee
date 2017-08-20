{ Query } = require "~plugins/memory-record"
ajax = require("~plugins/get-by-mount") "24h", "sow/story", -> @book_id
store = require("~plugins/browser-store")
  push:
    mode: "full"
  replace:
    idx: []
  watch: ->
    console.log "book watch", arguments
store.computed.idx.get = ->
  @$route.params.idx.split("-")

tree = (keys...)->
  o = {}
  make = (name, at)->
    key = "#{name}_id"
    list = "#{name}s"
    state =
      "#{key}":
        get: ->
          (at < @idx.length) && @idx[0..at].join("-")
      "#{name}":
        get: ->
          @read_at
          Query[list].find @[key]

    o = { o..., state... }
  for name, idx in keys
    make name, idx

  o.book.set = ({ page_idxs, chat_id, part_id, part })->
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
    { name, params, query, hash } = @$route
    params = { params..., idx }
    query = { query..., pages }
    @$router.replace { name, params, query, hash }
  o

mounted = ->
  { chat_id } = @
  ajax.mounted.call @
  .then =>
    if chat_id
      @$nextTick =>
        @$store.commit "menu/focus", chat_id

computed = {
  tree("folder", "book", "part", "phase", "chat")...
  store.computed...
  ajax.computed...

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
    pages = @page_all_contents?.page?(@chat) ? 1
    [ @chat_id || @part_id, @mode, pages ].join(",")

  back_url: ->
    [ chat_id, mode, pages ] = (@$route.query.back ? @back).split(",")
    path: "../#{chat_id}/#{mode}"
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
}

module.exports = { computed, mounted }
