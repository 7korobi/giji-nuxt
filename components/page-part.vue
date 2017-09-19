<script lang="coffee">
module.exports =
  mixins: [
    require '~/plugins/book'
  ]
  methods:
    part_to: (part_id)->
      return unless part_id && data = @chats(part_id)

      path: "../#{part_id}/#{@mode}"

  computed:
    part_prev: ->
      @part_to @part_prev_id
    part_prev_id: ->
      ids = @book.parts.pluck('id')
      idx = ids.indexOf @part_id
      ids[idx - 1]

    part_next: ->
      @part_to @part_next_id
    part_next_id: ->
      ids = @book.parts.pluck('id')
      idx = ids.indexOf @part_id
      ids[idx + 1]

    show: ->
      @part_id && @book && @chats && @mode

</script>

<template lang="pug">
.center(v-if="show")
  nuxt-link(v-if="part_prev_id" :to="part_prev") 前の日へ
  nuxt-link(v-if="part_next_id" :to="part_next") 次の日へ
</template>

