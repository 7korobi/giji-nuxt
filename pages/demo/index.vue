<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/oauth") OpenID
      post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/timeago") 時計 page
      post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/names") names
      post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/demo/chats") chats sample
      post(:write_at="Date.now()", handle="TSAY")
        nuxt-link.button(to="/sow/village/allstar-2-0/full") 村ログ(allstar-2)
</template>
<script lang="coffee">

module.exports =
  data: ->
    a: 1

</script>
