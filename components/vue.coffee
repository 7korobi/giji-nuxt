Vue = require "vue"

if window?
  Vue = Vue.default

ctx = require.context "~components", true, ///(.+)\.vue$///
for fname in ctx.keys()
  name = fname[2..-5]
  Vue.component name, ctx fname
