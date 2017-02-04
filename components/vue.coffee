Vue = require "vue"

if process.BROWSER_BUILD
  Vue.use require "vue-cookie"

[ "timeago"
  "chat"
].map (name)->
  Vue.component name, require "~components/#{name}.coffee"

[ "report"
  "post"
  "talk"
  "chrs"
  "btn"
].map (name)->
  Vue.component name, require "~components/#{name}.vue"
