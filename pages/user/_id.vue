<template lang="pug">
.outframe
  .contentframe
    no-ssr
      .inframe
        br
        c-talk(v-if="user" handle="VSAY" deco="giji", :head="user.nick", :sign="user.sign", :img_src="user.icon")
          p(v-if="user.sign")
            table
              tbody
                tr
                  th
                    | 署名
                    btn(v-model="user.sign" as="") 編集
                  td {{ user.sign }}
                tr
                  th ログイン
                  td {{ user.provider }}から
                tr
                  th OpenID
                  td {{ user.account }}
          p(v-else)
            | ゲーム内で使うため、署名をしてください。
            input(type="text" v-model="user.sign")
            a.btn(@click="commit") 決定

        c-post(v-if="user" handle="TSAY" deco="giji", head="秘密の情報", :sign="user.sign", :write_at="user.write_at")
            table
              tbody
                tr
                  th ニックネーム
                  td {{ user.nick }}
                tr
                  th mail
                  td
                    a(v-if="user.mail", :href="'mailto:' + user.mail") {{ user.mail }}

        c-post(v-if="user.sign" handle="SSAY" deco="giji")
          nuxt-link(to="/book/edit") 新しい村を作成する。

        c-post(handle="footer")
          bread-crumb

</template>
<script lang="coffee">

module.exports =
  data: -> {}

  methods:
    commit: ->
      { sign } = @user
      @$store.dispatch "user/update", { sign }

  computed:
    user: -> @$store.state.user
    
</script>

<style lang="stylus" scoped>
</style>
