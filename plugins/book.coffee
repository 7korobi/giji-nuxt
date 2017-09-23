_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"

focus = (chat_id)->
  if chat_id? && window?
    @$nextTick =>
      if window[chat_id]
        @$store.commit "menu/focus", chat_id
      else
        console.log chat_id

store = require("~/plugins/browser-store")
  push:
    mode: "full"
  replace:
    idx: []
  watch: (val, key)->
    switch key
      when "mode"
        @page_reset()

path store, "folder", "book", "part", "phase", "chat"

_.merge store,
  computed:
    page_all_contents: ->
      @chats(@part_id)
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0
    page_tmp: ->
      @$route.query.page


    mentions: ->
      @read_at
      Query.chats.reduce?.mention_to?[@chat_id]

    now: ->
      @read_at
      Query.chats.now(@hide_potof_ids)

    chats: ->
      @now[@mode]

    back: ->
      [ @chat_id || @part_id, @mode, @$route.name ].join(",")

    back_url: ->
      [ idx, mode, name ] = (@$route.query.back ? @back).split(",")
      name: name
      params: { idx, mode }
      query: { page: 'back' }

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

  methods:
    page_reset: ->
      focus.call @, @chat_id
      @page_idxs = [ @page_idx ]

    page_url: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)
      idx = part_id
      params: { idx }
      query: { page: page_idx + 1 }

  watch:
    read_at: ->
      @page_reset()

    page_tmp: (page, old)->
      if page
        if Number(page)
          @page_idxs = [page - 1]
        else
          @page_reset()
        query = { @$route.query..., page: undefined }
        @$router.replace { query }

module.exports = (o)->
  if o?.loader
    store
  else
    Object.assign {}, store,
      created: undefined
      watch:   undefined
