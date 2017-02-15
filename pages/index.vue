<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      br
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/timeago") 時計 page
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo") Demo page
</template>
<script lang="coffee">
module.exports =
  data: ({ store, req, res })->
    a: 1
</script>
