<style lang="stylus" scoped>
</style>
<template lang="pug">
.fullframe
  tags(v-model="tag_id")
  h6
    | {{ chrs.length }}人の{{ set.long }}を表示しています。
  transition-group.portrates(name="list" tag="div")
    portrate(v-for="chr in chrs", :face_id="chr._id", :key="chr._id")
      p {{ job(chr._id) }}
      p {{ chr.name }}
</template>
<script lang="coffee">
{ Query } = require "./models/memory-record"


module.exports =
  data: ->
    { tag_id: "giji" }

  computed:
    set: ->
      Query.tags.find @tag_id
    chrs: ->
      Query.faces.tag(@tag_id).list

  methods:
    job: (face_id)->
      job =  Query.chr_jobs.find("#{@set.chr_set_ids.last}_#{face_id}")
      job ?= Query.chr_jobs.find("all_#{face_id}")
      job.job
</script>