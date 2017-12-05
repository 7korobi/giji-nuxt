<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      table.talk(v-if="passport")
        tbody
          tr
            th
              img.portrate(width="90", v-if="passport.icon", :src="passport.icon")
            td
              .baloon.VSAY
              .chat.VSAY
                chat-head(:head="passport.nick", :sign="passport.provider")
                .text.center
                  a(v-if="passport.mail", :href="'mailto:' + passport.mail") mail
                  a(:href="passport.token") token
                chat-foot(:write_at="passport.write_at")


      br
      c-post(:write_at="Date.now()", handle="SSAY")
        a(href="/auth/facebook") facebook
      c-post(:write_at="Date.now()", handle="SSAY")
        a(href="/auth/twitter") twitter
      c-post(:write_at="Date.now()", handle="SSAY")
        a(href="/auth/slack") slack
      br
      c-post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/github") github
      c-post(:write_at="Date.now()", handle="TSAY")
        a(href="/auth/google") google
</template>
<script lang="coffee">

module.exports =
  data: -> {}

  computed:
    passport: -> @$store.state.passport
    
</script>

<style lang="stylus" scoped>

.talk
  width: 100%
  table-layout: fixed
  border-collapse: collapse
  border-spacing:  0
  margin: 0 0 6px 0
  thead, tfoot, tbody, th, td
    border:  0
    padding: 0
    background: transparent
  td
    vertical-align: middle
    position: relative
  th
    width: 125px
    vertical-align: top
    .portrate
      margin:  0 19px 0 16px

.contentframe
  .baloon
    position: absolute
    content: ''
    width:  0
    height: 0
    top:   60px
    left:  -6px
    border-style: solid
    border-width:  6px
    border-radius: 6px 0 0 6px

</style>
