<script lang="coffee">
require "~components/vue.coffee"

module.exports =
  default:
    data: ->
      {}

</script>
<template lang="pug">
div
  layout-header
  .outframe
    .center-left
    .center-right
  nuxt
  layout-footer

</template>
