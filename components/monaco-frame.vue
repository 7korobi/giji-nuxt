<script lang="coffee">

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        text: "(自由帳)"
      watch: (val, old, key)->
  ]

  data: ->
    {}

  methods:
    enterlog: ->
      console.log "enter", arguments
    leavelog: ->
      console.log "leave", arguments

  computed:
    texts: ->
      @text.split("\n\n")
</script>

<template lang="pug">
.editframe(@mouseenter="enterlog" @mouseleave="leavelog")
  .inframe
    .icons
      p テキスト
    .swipe
      monaco-editor(v-model="text" style="height: 90vh")

</template>
