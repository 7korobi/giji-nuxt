<template lang="pug">
section.container
  img(src="../assets/images/logo.png")
  h1.title {{ error.statusCode }}
  h2.info  {{ error.message    }}
  nuxt-link.button(to="/" v-if="404 === error.statusCode").
    Homepage
</template>

<script lang="coffee">
module.export =
  default:
    props: ['error']
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
