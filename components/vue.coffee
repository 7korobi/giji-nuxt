Vue = require "vue"

if process.BROWSER_BUILD
  Vue.use require "vue-cookie"

ctx = require.context "~components", true, ///(.+)\.vue$///
for fname in ctx.keys()
  name = fname[2..-5]
  Vue.component name, ctx fname
