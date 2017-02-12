<script lang="coffee">
module.exports =
  props: ["as", "value"]
  methods:
    tap: ->
      if @as == @value
        @$emit 'toggle', @as
      else
        @$emit 'input',  @as


  computed:
    btn: ->
      if @as == @value
        ["active"]
      else
        []
</script>

<template lang="pug">
a(:class="btn", @click="tap()")
  slot
</template>
