{ Query } = require "~plugins/memory-record"

module.exports = ({watch})->
  store = require("~plugins/browser-store")
    push:
      pages: "1"
  store.watch.page_head_id = watch if watch

  Object.assign store.methods,
    page_add: (tail)->
      head = @page_idxs[0]
      @page_idxs = [head, tail]

    pages_calc: ([head, ..., tail])->
      if head == tail
        "#{1 + head}"
      else
        [1 + head, 1 + tail].join("-")
    
  Object.assign store.computed,
    page_idxs:
      get: ->
        [head, tail] = "#{@pages}".split("-").map (o)-> Number(o) - 1
        [Number(head) .. Number(tail ? head)]

      set: (idxs)->
        @pages = @pages_calc idxs

    page_ids: ->
      @page_idxs.map (idx)=>
        "#{@part_id}-#{idx}"

    page_head_id: ->
      [head, ...] = @page_idxs
      head

    page_tail_id: ->
      [..., last] = @page_idxs
      last

    page_next_id: ->
      all = @page_all_contents ? [[]]
      if @page_tail_id? && @page_tail_id + 1 < all.length
        @page_tail_id + 1

    page_contents: ->
      all = @page_all_contents ? [[]]
      @page_idxs.map (page)-> all[page]

    all_contents: ->
      @page_all_contentes?.from ? []

  store
