<script lang="coffee">
module.exports = require("~vue/_chat.coffee").component_class()
</script>
<style lang="stylus" scoped>

.report
  border-style: dashed none dashed none;
  border-width: 3px 0 3px 0

.wa-theme
  .report
    border-style: double none double none;
    border-width: 3px 0 3px 0
    border-color: #720

</style>

<template lang="pug">
.chat.report(:key="id", :class="handle")
  p.name(v-if="head")
    | {{ head }}
    sup.pull-right(v-if="sign") {{ sign }}
  p.text(:class="style", v-html="log_html")
  p.date
    timeago(:since="write_at")

</template>
