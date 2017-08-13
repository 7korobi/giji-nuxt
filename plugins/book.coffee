Vuex = require "vuex"
Vuex = Vuex.default if window?

{ Query } = require "~plugins/memory-record"

finds = (keys...)->
  o = {}
  keys.map (name)->
    key = "#{name}_id"
    list = "#{name}s"
    state =
      "#{key}":
        get: ->
          @$store.state.book[key] || @$route.params[key]
      "#{name}":
        get: ->
          @read_at?["book.#{@book_id}"]
          Query[list].find @[key]
          
    o = { o..., state... }
  o.book.set = (cmd)-> @$store.commit "book/reset", cmd
  o



module.exports =
  see: {
    finds("folder","book","part","section","phase","chat")...
    page_idxs: ->
      @$store.state.book.page_idxs
    page_ids: ->
      @page_idxs.map (id)=>
        "#{@part_id}-#{id}"
    hide_potof_ids:
      get: ->
        @$store.state.book.hide_potof_ids
      set: (ids)->
        @$store.commit "book/hide_potof_ids", ids
    mentions: ->
      Query.chats.reduce?.mention_to?[@chat_id]
  }
