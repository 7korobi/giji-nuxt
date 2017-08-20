<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value"]
  methods:
    tap: ->
      idx = @value.indexOf(@as)
      newVal =
        if idx < 0
          [@as, @value...]
        else
          head = @value[...idx]
          tail = @value[idx + 1 ..]
          [head..., tail...]
      @$emit 'input', newVal


  computed:
    btn: ->
      idx = @value.indexOf(@as)
      bool = !(idx < 0)
      if bool
        ["active"]
      else
        []
</script>

<template lang="pug">
a(:class="btn", @click="tap")
  slot
</template>
