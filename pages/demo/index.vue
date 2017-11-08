<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link(to="/demo/marked") Markdown Talk
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link(to="/demo/markdown") Markdown vue
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/oauth") OpenID
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/timeago") 時計 page
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/names") names
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/chats") chats sample
      c-post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/sow/village/allstar-2-0/full") 村ログ(allstar-2)
</template>
<script lang="coffee">

module.exports =
  data: ->
    a: 1

</script>
