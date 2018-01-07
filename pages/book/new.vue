<template lang="pug">
no-ssr
  .outframe
    .contentframe
      book-editor(@input="create") 新しい村を作成

</template>
<script lang="coffee">
axios = require "axios"

module.exports =
  methods:
    create: (data)->
      { book } = await @$store.dispatch "book/create", data
      @$router.replace "./#{book._id}/edit"
</script>
