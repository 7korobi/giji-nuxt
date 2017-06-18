<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      post(:write_at="Date.now()", handle="SSAY")
        ul
          li(v-for="(val, key) in profile")
            kbd {{ key }}
            span {{ val }}

      post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/slack") slack
      post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/google") google
      post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/facebook") facebook
      post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/github") github
      post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/twitter") twitter
</template>
<script lang="coffee">

module.exports =
  data: -> {}

  computed:
    profile: -> @$store.state.profile
    
</script>
