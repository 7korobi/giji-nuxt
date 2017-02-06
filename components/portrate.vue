<script lang="coffee">
{ Query } = require "./models/memory-record"
module.exports =
  props:
    face:
      type: String
      required: true
  data: -> {}
  computed:
    face_url: -> Query.faces.hash[@face]?.path

</script>
<style lang="stylus" scoped>

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
      margin: -4px 1px 3px 1px
      padding: 0

    .chrblank
      margin: 0 auto
      p
        height:       15px
        font-size:    11px
        text-align:  center
        white-space: nowrap

      .line2
        min-height: 34.5px
        height:     34.5px

</style>

<template lang="pug">
.portrate
  img(:src="face_url" width="90" height="130")
  .chrblank(v-if="$slots")
    slot
</template>