<template lang="pug">
.outframe
  .contentframe
    .inframe
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
</template>
<script lang="coffee">
module.exports =
  default:
    layout: "book"
</script>
