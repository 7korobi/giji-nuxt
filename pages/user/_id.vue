<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-talk(v-if="user" handle="VSAY" deco="center", :head="user.nick", :sign="user.provider", :write_at="user.write_at", :img_src="user.icon")
        nuxt-link(to="/user/edit")
          | 編集
          sup(v-if="! user.sign") no sign
        a(v-if="user.mail", :href="'mailto:' + user.mail") mail

      c-post(v-if="user.sign" handle="SSAY" deco="giji")
        nuxt-link(to="/book/edit") 新しい村を作成する。

      c-post(handle="footer")
        bread-crumb

</template>
<script lang="coffee">

module.exports =
  data: -> {}

  computed:
    user: -> @$store.state.user
    
</script>

<style lang="stylus" scoped>
</style>
