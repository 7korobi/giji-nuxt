<template lang="pug">
section.container
  nuxt-link.button(to="/" ).
    Homepage
</template>

<script lang="coffee">
module.export =
  default:
    props: ['error']
    data: ->
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
