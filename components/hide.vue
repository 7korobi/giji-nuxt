<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.hide
  height: 2px
  margin -3px 8px 2px 125px

</style>

<template lang="pug">
.chat.hide(:key="id", :class="classname")
</template>
