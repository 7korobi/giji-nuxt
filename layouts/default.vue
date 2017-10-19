<script lang="coffee">
require "~/components/vue.coffee"

module.exports =
  default:
    data: -> {}

</script>
<template lang="pug">
div
  layout-header
  .outframe
    .center-left
    .center-right
    monaco-frame
  nuxt.page-active
  .outframe
    .contentframe
      .inframe
        report(handle="footer", :write_at="854319600000")
          layout-footer
</template>
