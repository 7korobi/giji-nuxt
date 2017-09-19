Vue = require "vue"

if window?
  Vue = Vue.default

ctx = require.context "~/components", true, ///(.+)\.vue$///
for fname in ctx.keys()
  name = fname[2.. -(".vue".length + 1)]
  Vue.component name, ctx fname

ctx = require.context "~/components/filters", true, ///(.+)\.coffee$///
for fname in ctx.keys()
  name = fname[2.. -(".coffee".length + 1)]
  Vue.filter name, ctx fname


element = (module)->
  module = module.default
  Vue.component module.name, module

# ElementUI section #####
#
lang = require 'element-ui/lib/locale/lang/en'
locale = require 'element-ui/lib/locale'
locale.use lang

element require 'element-ui/lib/transitions/collapse-transition'
