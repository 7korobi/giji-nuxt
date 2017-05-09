<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      report(handle="MAKER", v-for="o in villages", :write_at="o.timer.updateddt", :id="o._id", :key="o._id")
        .name
          sup.pull-right {{ o.sow_auth_id }}
          kbd
            img(:src="o.rating_img")
          a(:href="o.href") {{ o.name }}
        .cards
          table.btns.card
            tbody
              tr
                td(colspan="2") {{ o._id }}

              tr
                th 更新
                td {{ o.upd.range }}毎 {{ o.upd.at }}
              tr
                th 規模
                td {{ o.vpl[0] }}人　{{ o.type.say }}
              tr
                th ルール
                td
          .card(style="width: 26em")
            p
              a(v-for="option in o.options")
               .label {{ option }}
            p
              a(v-for="role in roles(o, 'event')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}
            p
              a(v-for="role in roles(o, 'config')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}
            p
              a(v-for="role in roles(o, 'discard')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}

</template>
<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  data: ->
    a: 1

  mounted: ->
    @$store.dispatch "story/oldlog", @folder

  watch:
    folder: ->
      @$store.dispatch "story/oldlog", @folder

  methods:
    roles: ({ id }, key)->
      base = Query.sow_villages.where({id}).reduce[key]?.summary ? []
      base.map (o)->
        { id,  length } = o
        to = Query.roles.find(id)
        if to
          { win, label } = to
        else
          label = id
        suffix = if 1 < length then "x#{length}" else ""

        { label, win, length, suffix }

  computed:
    folder: ->
      @$route.params.folder
    villages: ->
      @$store.state.story.read_at
      @$store.state.story.oldlog[@folder]

</script>
<style lang="stylus" scoped>
.cards
  display: flex
  flex-direction:  row
  flex-wrap:       wrap
  align-content:   space-around
  align-items:     flex-start
  justify-content: flex-start

.card
  padding: 2px
</style>
