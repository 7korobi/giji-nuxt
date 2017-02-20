<script lang="coffee">
{ Query } = require "./models/memory-record"
module.exports =
  props:
    face_id:
      type: String
      required: true
  data: -> {}
  computed:
    has_html: ->
      !! @$slots.default
    face_url: ->
      Query.faces.hash[@face_id ? "all"]?.path

</script>
<style lang="stylus" scoped>

IMG
  display: block

.contentframe
  .portrate
    max-width: 90px
    width:     90px
    background-color: black

    IMG
      max-height: 130px
      height:     130px
      max-width: 90px
      width:     90px

    IMG + .chrblank
      margin: 0 1px 3px 1px
      padding: 0

    .chrblank
      margin: 0 auto
      p
        text-align:  center
        white-space: nowrap

</style>

<template lang="pug">
.portrate
  img(:src="face_url" width="90" height="130")
  .chrblank(v-if="has_html")
    slot
</template>