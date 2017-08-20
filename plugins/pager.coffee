{ Query } = require "~plugins/memory-record"

store = require("~plugins/browser-store")
  push:
    pages: "1"

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

  page_here_id: ->
    [..., last] = @page_idxs
    last

  page_next_id: ->
    all = @page_all_contents ? [[]]
    if @page_here_id? && @page_here_id + 1 < all.length
      @page_here_id + 1

  page_contents: ->
    all = @page_all_contents ? [[]]
    @page_idxs.map (page)=> all[page]

  all_contents: ->
    @page_all_contentes?.from ? []

module.exports = store
