<script lang="coffee">
require "~/components/vue.coffee"

module.exports =
  default:
    props: ['error']
    data: -> {}

</script>
<template lang="pug">
no-ssl
  a-header
  .outframe.page-active
    .center-left
    .center-right
    .contentframe
      .inframe
        c-post(handle="footer")
          bread-crumb
        c-post(handle="footer")
          p {{ error.message }}
  .outframe
    .contentframe
      .inframe
        c-report(handle="footer", :write_at="854319600000")
          a-footer
</template>
