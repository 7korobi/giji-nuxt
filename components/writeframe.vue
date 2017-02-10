<style lang="stylus" scoped>
.writeframe
  box-sizing: content-box
  .contentframe
    background-attachment: scroll
</style>

<script lang="coffee">

module.exports =
  default:
    props: ["top", "show"]
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

      frame_style: ->
        if @show
          position: "absolute"
          transform: "translateY(#{@top}px)"
        else
          position: "fixed"
          transform: ""
      show_class: ->
        { @show }
    methods:
      toggle_show: ->
        @show = ! @show

</script>

<template lang="pug">
.writeframe(v-if=" $store.state.target == 'comment' ", :style="frame_style")
  .contentframe
    .inframe
      talk(sign="ななころび" handle="SSAY" face="c71")
        textarea(v-model="text", :rows="text_rows")
      br
</template>
