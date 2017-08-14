Vuex = require "vuex"
Vuex = Vuex.default if window?

{ Query, read_at } = require "~plugins/memory-record"


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
          read_at["book.#{@book_id}"]
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

    unless @part_id == part.id && @page_idxs[0] == page_idxs[0]
      window.scrollTo 0,0

    [head, ..., tail] = page_idxs
    pages =
      if head == tail
        "#{1 + head}"
      else
        [1 + head, 1 + tail].join("-")
    { name, params, query } = @$route
    params = { params..., idx }
    query = { query..., pages }
    @$router.replace { name, params, query }
  o

base =
  idx: -> @$route.params.idx.split("-")

mounted = ->
  if @chat_id
    el = document.querySelector '#' + @chat_id
    if el
      unless el.className.match "focus"
        @$store.dispatch "menu/focus", el

computed = {
  base...
  tree("folder","book","part","phase","chat")...
  pages: ->
    @$route.query.pages || "1"
  page_idxs: ->
    [head, tail] = "#{@pages}".split("-").map (o)-> Number(o) - 1
    [head .. tail ? head]
  page_ids: ->
    @page_idxs.map (idx)=>
      "#{@part_id}-#{idx}"
  mentions: ->
    read_at?["book.#{@book_id}"]
    Query.chats.reduce?.mention_to?[@chat_id]
  hide_potof_ids: ->
    @$store.state.book.hide_potof_ids

  menus:
    get: ->
      key for key, val of @$store.state.menu.set when val
    set: (menus)->
      @$store.commit "menu/mode", menus
  
  mode:
    get: ->
      @$route.params.mode || "full"
    set: (mode)->
      window.scrollTo 0,0
      { name, params, query } = @$route
      params = { params..., mode }
      @$router.replace { name, params, query }
}

module.exports = { computed, mounted }
