<script lang="coffee">
require "~/components/vue.coffee"

module.exports =
  default:
    data: -> {}

</script>
<template lang="pug">
no-ssl
  layout-header
  .outframe
    .center-left
    .center-right
    monaco-frame
  keep-alive
    nuxt.page-active
  .outframe
    .contentframe
      .inframe
        report(handle="footer", :write_at="854319600000")
          layout-footer
</template>
