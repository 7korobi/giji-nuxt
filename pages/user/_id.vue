<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-talk(v-if="profile" handle="VSAY" deco="center", :head="profile.nick", :sign="profile.provider", :write_at="profile.write_at", :img_src="profile.icon")
        a(v-if="profile.mail", :href="'mailto:' + profile.mail") mail
        a(:href="profile.token") token
      
      c-post(v-if="user" handle="SSAY" deco="giji")
        nuxt-link(to="/book/edit") 新しい村を作成する。


</template>
<script lang="coffee">

module.exports =
  data: -> {}

  computed:
    profile: -> @$store.state.profile
    user:    -> @$store.state.user
    
</script>

<style lang="stylus" scoped>
</style>
