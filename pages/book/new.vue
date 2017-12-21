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
    create: ({ book })->
      {book} = await @$store.dispatch "book/create", { book }
      @$router.replace "./#{book._id}/edit"
</script>
