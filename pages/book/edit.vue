<template lang="pug">
.outframe
  .contentframe
    no-ssr
      book-editor(@input="create") 新しい村を作成

</template>
<script lang="coffee">
axios = require "axios"

module.exports =
  methods:
    create: (data)->
      @$store.dispatch "book/create", data

</script>
