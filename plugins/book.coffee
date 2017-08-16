Vuex = require "vuex"
Vuex = Vuex.default if window?

{ Query } = require "~plugins/memory-record"


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
          @read_at["book.#{@book_id}"]
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
  { chat_id } = @
  @$store.dispatch "sow/story", @book_id
  .then =>
    if chat_id
      @$nextTick =>
        @$store.commit "menu/focus", chat_id

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
    @read_at?["book.#{@book_id}"]
    Query.chats.reduce?.mention_to?[@chat_id]
  back: ->
    [ @chat_id, @mode, @pages ].join(",")

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
