<template lang="pug">
no-ssr
  .outframe
    .contentframe
      .inframe
        br
        c-talk(v-if="user" handle="VSAY" deco="giji", :head="user.nick", :sign="user.sign", :img_src="user.icon")
          p
            table
              tbody
                tr(v-if="user.sign")
                  th 署名
                  td {{ user.sign }}
                  td
                    a.btn(@click="edit") 編集

                tr(v-if="!user.sign")
                  th 署名
                  td
                    input(type="text" v-model="sign")
                  td
                    a.btn(@click="commit") 決定

                tr(v-if="!user.sign")
                  th
                  th(colspan="2").
                    あなたのサインを決めてください。
                     ※ ゲーム内で公開されます。

                tr
                  th ログイン
                  td {{ user.provider }}から
                tr
                  th OpenID
                  td {{ user.account }}

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

        c-report(handle="header") 作成した物語 
        a-book(v-for="book in books", :key="book._id", :book="book")

        c-post(v-if="user.sign" handle="SSAY" deco="giji")
          nuxt-link(to="/book/new") 新しい村を作成する。

        c-post(handle="footer")
          bread-crumb

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
mount = require "~/plugins/get-by-mount"

module.exports =
  mixins: [
    mount "1h", "book/my_books"
  ]
  data: ->
    sign: ""

  methods:
    edit: ->
      @sign = @user.sign
      @$store.commit "update",
        user:
          sign: ""
    commit: ->
      @$store.dispatch "user", { @sign }

  computed:
    books: -> Query.books.list
    user: -> @$store.state.user
    
</script>

<style lang="stylus" scoped>
</style>
