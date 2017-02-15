<script lang="coffee">
module.exports =
  props: ["list"]
  methods:
    item_class: ({_id})->
      if @$store.state.menu.target == _id
        ["active"]
      else
        []
    menu_class: ({name, ext})->
      ary = ["fa-#{name}"]
      if ext
        ary.push "fa-#{ext}"
      ary
    menu_tap: ({_id})->
      @$store.commit "menu/target", _id
</script>

<template lang="pug">
.icons
  .item(:class="item_class(menu)", v-for="menu in list")
    i.fa(:class="menu_class(menu)", @click="menu_tap(menu)")
</template>

<style lang="stylus">
.icons
  color: rgba(200, 210, 200, 0.5)
  width: 40px
  font-size: 35px
  margin: 0 0 0 auto
  overflow: hidden
  display: flex
  flex-direction: column-reverse
  flex-wrap:       nowrap
  align-items:     center
  align-content:   space-around
  justify-content: space-around

  .item
    flex-basis: auto
    text-align: center
    width:        40px
    border-radius: 5px
  .item.active
    box-shadow:
      0 0 20px 3px rgba(0,0,0,0.5) inset
  .fa
    margin: 2px auto

.icons-move
  transition: transform 0.3s

.icons-enter-to
  transition: all 0.2s ease 0.1s

.icons-leave-to
  position: absolute

.icons-enter,
.icons-leave-to
  opacity: 0
  transform: translateX(60px)
</style>