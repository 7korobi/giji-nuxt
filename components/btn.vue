<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value"]
  methods:
    tap: ->
      if _.isEqual @as, @value
        @$emit 'toggle', @as
      else
        @$emit 'input',  @as


  computed:
    btn: ->
      if _.isEqual @as, @value
        ["active"]
      else
        []
</script>

<template lang="pug">
a(:class="btn", @click="tap()")
  slot
</template>
