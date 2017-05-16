<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value", "type"]
  methods:
    tap: ->
      switch @type
        when "check"
          idx = @value.indexOf(@as)
          if idx < 0
            @value.push @as
          else
            @value.splice idx, 1
          @$emit 'input', @value
        else
          if _.isEqual @as, @value
            @$emit 'toggle', @as
          else
            @$emit 'input',  @as


  computed:
    btn: ->
      bool =
        switch @type
          when "check"
            idx = @value.indexOf(@as)
            ! idx < 0
          else
            _.isEqual @as, @value
      if bool
        ["active"]
      else
        []
</script>

<template lang="pug">
a(:class="btn", @click="tap")
  slot
</template>
