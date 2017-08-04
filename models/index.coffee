Vue = require "vue"
if window?
  Vue = Vue.default

Mem = require "~plugins/memory-record"
Mem.vm = new Vue
  data:
    read_at: Mem.read_at = {}

Mem.read_at_gate = (name, cb)->
  return if Date.now() - 10 * 60 * 1000 < Mem.read_at[name]
  cb().then ->
    Vue.set Mem.read_at, name, Date.now()

require "./chr"
require "./potof"
require "./card"

require "./book"
require "./part"
require "./phase"
require "./section"
require "./chat"

require "./sow"
