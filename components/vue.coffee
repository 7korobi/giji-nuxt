Vue = require "vue"

if process.BROWSER_BUILD
  Vue = Vue.default
  Vue.use require "vue-cookie"
  Vue.use require "~plugins/vue-local-storage"

ctx = require.context "~components", true, ///(.+)\.vue$///
for fname in ctx.keys()
  name = fname[2..-5]
  Vue.component name, ctx fname
