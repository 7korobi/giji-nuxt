<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      br
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/about") About page
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo") Demo page
</template>
