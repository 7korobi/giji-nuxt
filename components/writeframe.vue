<style lang="stylus" scoped>
.writeframe
  box-sizing: content-box
  .contentframe
    background-attachment: scroll
</style>

<script lang="coffee">

module.exports =
  default:
    props: ["top"]
    data: ->
      @$store.commit "menu",
        name: "comment"
      text: ""

    computed:
      text_rows: ->
        rows = @text.split("\n").length
        if 2 < rows
          rows
        else
          3

      show: ->
        @$store.state.target == 'comment'
      style: ->
        position: "absolute"
        transform: "translateY(#{@top}px)"

</script>

<template lang="pug">
.writeframe(v-if="show", :style="style")
  .contentframe
    .inframe
      talk(sign="ななころび" handle="SSAY" face="c71")
        textarea(v-model="text", :rows="text_rows")
      br
</template>
