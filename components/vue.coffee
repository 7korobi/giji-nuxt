Vue = require "vue"

if window?
  Vue = Vue.default
  Vue.use require "vue-cookie"
  Vue.use require "~plugins/vue-local-storage"

Vue.use require "vee-validate"

ctx = require.context "~components", true, ///(.+)\.vue$///
for fname in ctx.keys()
  name = fname[2..-5]
  Vue.component name, ctx fname
