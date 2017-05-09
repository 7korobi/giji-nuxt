<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      report(handle="GSAY", v-for="o in villages", :write_at="o.timer.updateddt", :id="o._id", :key="o._id")
        .name
          sup.pull-right {{ o.sow_auth_id }}
          | {{ o._id }}
          a(:href="o.href") {{ o.name }}
          kbd
            img(:src="o.rating_img")
        table
          tbody
            tr
              th 更新
              td {{ o.upd.range }}毎 {{ o.upd.at }}
            tr
              th 規模
              td {{ o.vpl[0] }}人　{{ o.type.say }}
            tr
              th ルール
              td

</template>
<script lang="coffee">
module.exports =
  data: ->
    a: 1

  mounted: ->
    @$store.dispatch "story/oldlog", @folder

  watch:
    folder: ->
      @$store.dispatch "story/oldlog", @folder

  computed:
    folder: ->
      @$route.params.folder
    villages: ->
      @$store.state.story.read_at
      @$store.state.story.oldlog[@folder]

</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>
