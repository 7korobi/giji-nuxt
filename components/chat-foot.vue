<template lang="pug">
.date
  abbr(v-if="anker") {{ anker }}
  timeago(v-if="write_at", :since="write_at")
</template>

<script lang="coffee">
module.exports =
  props: ["anker", "write_at"]
</script>
