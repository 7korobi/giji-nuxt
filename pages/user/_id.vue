<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-talk(v-if="passport" handle="VSAY" deco="center", :head="passport.nick", :sign="passport.provider", :write_at="passport.write_at", :img_src="passport.icon")
        a(v-if="passport.mail", :href="'mailto:' + passport.mail") mail
        a(:href="passport.token") token
      
      c-post(v-if="passport" handle="SSAY" deco="giji")
        nuxt-link(to="/book/edit") 新しい村を作成する。

      c-post(handle="footer")
        bread-crumb

</template>
<script lang="coffee">

module.exports =
  data: -> {}

  computed:
    passport: -> @$store.state.passport
    
</script>

<style lang="stylus" scoped>
</style>
