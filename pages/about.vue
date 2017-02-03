<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>
    <span v-for="(time, idx) in times">
      <a @click="reset(idx)">
      <timeago :key="idx" :since="time.at"></timeago>
      </a>
    </span>
    <br>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
  </section>
</template>

<script lang="coffee">
module.exports =
  default:
    data: (req)->
      now = new Date() - 0
      clicks: 0
      name: if req then 'server' else 'client'
      times: [[-3610..-3590]...,Infinity,[-70..-50]...,Infinity,[50..70]...,Infinity,[3590..3610]...].map (t)->
        at: now - t * 1000
    head: ->
      title: "About Page (#{this.name}-side)"
    methods:
      reset: (idx)->
        @clicks++
        @times[idx].at = new Date() - -62000
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
