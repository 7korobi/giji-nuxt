<style lang="stylus" scoped>
.expand-transition
  transition: all .3s ease

.expand-enter, .expand-leave
  height: 0
  padding: 0 10px
  opacity: 0

.list
  background: #000
  padding: 2px
  display: flex
  flex-direction:  row
  flex-wrap:       wrap
  align-items:     center
  align-content:   space-around
  justify-content: space-around

.list-move
  transition: transform 0.3s

.list-enter-to
  transition: all 0.2s ease 0.1s

.list-leave-to
  position: absolute

.list-enter,
.list-leave-to
  opacity: 0
  transform: translateY(30px)

.portrate
  flex-basis: auto
</style>
<template lang="pug">
.top
  .btns
    span.tag
      tag#all
      tag#giji
      tag#shoji
      tag#travel
      tag#stratos
      tag#myth
      tag#asia
      tag#marchen

    span.tag
      tag#kid
      tag#young
      tag#middle
      tag#elder

    span.tag
      tag#river
      tag#road
      tag#immoral

    span.tag
      tag#guild
      tag#elegant
      tag#ecclesia

    span.tag
      tag#medical
      tag#market

    span.tag
      tag#apartment
      tag#servant
      tag#farm
      tag#government

    span.tag
      tag#god

    h6
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  transition-group.list(name="list" tag="div")
    portrate(v-for="chr in chrs", :face_id="chr._id", :key="chr._id")
      p {{ job(chr._id) }}
      p {{ chr.name }}
</template>
<script lang="coffee">
require "./models/chr.coffee"
{ Query } = require "./models/memory-record"


module.exports =
  metaInfo: ->
    title: @set.long
    titleTemplate: '%s - 人狼議事'

  data: ->
    tag = @$route.query.tag ? "giji"
    { tag }

  computed:
    chrs: ->
      @faces @tag
    set:  ->
      @$router.replace { @query }
      @find_tag @tag
    query: ->
      query = {}
      for key, val of @$route.query
        query[key] = val
      query.tag = @tag
      query

  methods:
    find_tag: (tag_id)-> Query.tags.find tag_id
    faces: (tag_id)-> Query.faces.tag(tag_id).list

    job: (face_id)->
      job =  Query.chr_jobs.find("#{@set.chr_set_ids.last}_#{face_id}")
      job ?= Query.chr_jobs.find("all_#{face_id}")
      job.job

  components:
    tag:
      functional: true
      props: ["id"]
      render: (m, ctx)->
        { id } = ctx.props
        { label = "- 全体 -" } = ctx.parent.find_tag id
        size = ctx.parent.faces(id).length

        attr =
          key: id
          on:
            click: ->
              ctx.parent.tag = id
          #staticClass: "btn"

        m "a", attr, [
          label
          m "sup", size
        ]
</script>