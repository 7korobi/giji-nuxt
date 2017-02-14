<script lang="coffee">
module.exports =
  props: ["list"]
  methods:
    menu_class: ({name, ext})->
      ary = ["fa-#{name}"]
      if ext
        ary.push "fa-#{ext}"
      if @$store.state.target == name
        ary.push "active"
      ary
    menu_tap: ({name})->
      @$store.commit "menu_toggle", name
</script>

<template lang="pug">
.icons
  i.fa(:class="menu_class(menu)", @click="menu_tap(menu)" v-for="menu in list")
</template>
