<script lang="coffee">
require "~/components/vue.coffee"

module.exports =
  default:
    data: -> {}

</script>
<template lang="pug">
div
  a-header
  .outframe
    .center-left
    .center-right
  nuxt.page-active
  .outframe
    .contentframe
      .inframe
        c-report(handle="footer", :write_at="854319600000")
          a-footer
</template>
