<script lang="coffee">
module.exports =
  props: ["as", "value"]
  computed:
    btn: ->
      if @as == @value
        ["active"]
      else
        []
</script>

<template lang="pug">
a(:class="btn", @click="$emit('input', as)")
  slot
</template>
