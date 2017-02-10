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
<script lang="coffee">
module.exports =
	fetch: ({ store, params })->
		console.log { store, params }
	data: ({ store, req, res })->
    a: 1
</script>