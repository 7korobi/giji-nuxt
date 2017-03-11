<script lang="coffee">
{ Query } = require "./models/memory-record"
require "./models/chr"

module.exports =
  props:
    face_id:
      type: String
      required: true
    hide:
      type: Boolean
  computed:
    image_class: ->
      if @hide
        ["hide"]
      else
        []
    has_html: ->
      !! @$slots.default
    face_url: ->
      Query.faces.hash[@face_id ? "all"]?.path
  methods:
    click: ->
      @$emit 'click', @face_id


</script>

<template lang="pug">
.portrate(@click="click")
  img(:src="face_url", :class="image_class")
  .chrblank(v-if="has_html")
    slot
</template>

<style lang="stylus">

IMG
  display: block

IMG.hide
  filter: sepia(60%) hue-rotate(180deg);

.chrblank
  background: #444844
  color:      #CCF
  margin: 0 auto
  p
    text-align:  center
    white-space: nowrap

.swipe
  .portrate
    max-width: 45px
    width:     45px
    background-color: black

    IMG
      max-height: 65px
      height:     65px
      max-width: 45px
      width:     45px
    IMG + .chrblank
      margin: 0.5px 0.5px 2px 0.5px
      padding: 0

    .chrblank
      max-width:    44px
      width:        44px
      border-radius: 4px

.fullframe,
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
      margin: 1px 1px 3px 1px
      padding: 0

    .chrblank
      max-width:    88px
      width:        88px
      border-radius: 9px


</style>

