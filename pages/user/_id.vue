<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      talk(handle="VSAY" deco="center", :head="profile.nick", :sign="profile.provider", :write_at="profile.write_at", :img_src="profile.icon")
        a(v-if="profile.mail", :href="'mailto:' + profile.mail") mail
        a(:href="profile.token") token

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
