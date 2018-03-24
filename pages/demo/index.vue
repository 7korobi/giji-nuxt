<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-post(handle="TSAY")
        nuxt-link(to="/demo/marked") Markdown Talk
      c-post(handle="TSAY")
        nuxt-link(to="/demo/markdown") Markdown vue
      c-post(handle="TSAY")
        nuxt-link.button(to="/demo/oauth") OpenID
      c-post(handle="TSAY")
        nuxt-link.button(to="/demo/timeago") 時計 page
      c-post(handle="TSAY")
        nuxt-link.button(to="/demo/names") names
      c-post(handle="TSAY")
        nuxt-link.button(to="/demo/chats") chats sample
      c-post(handle="TSAY")
        nuxt-link.button(to="/sow/village/allstar-2-0/full") 村ログ(allstar-2)
</template>
<script lang="coffee">

firebase = require "firebase"

module.exports =
  data: ->
    auth_info: {}
    a: 1

</script>
