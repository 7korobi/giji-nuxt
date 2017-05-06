<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      chat(v-for="o in chats", :id="o._id", :key="o._id")
</template>
<script lang="coffee">
module.exports =
  data: ->
    a: 1
  mounted: ->
    @$store.dispatch "story/oldlog", @folder

  computed:
    folder: ->
      @$route.params.folder

</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>
