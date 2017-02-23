<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      br
      report(handle="TSAY" deco="center")
        nuxt-link(to="/") 戻る
      chrs
      report(handle="TSAY" deco="center")
        nuxt-link(to="/") 戻る
</template>
<script lang="coffee">
module.exports =
  scrollToTop: false
</script>
