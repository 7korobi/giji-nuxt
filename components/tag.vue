<script lang="coffee">
{ Query } = require "./models/memory-record"
_ = require "lodash"

module.exports =
  ancestor:
    created: ->
      tag_id = @$route.query?.tag
      console.log tag_id
      if tag_id && tag_id != @value
        @$emit 'input', tag_id

    computed:
      query: ->
        query = Object.assign {}, @$route.query,
          tag: @value
        @$router.replace { query }

  parent:
    props:
      value:
        default: -> "all"

    methods:
      find_tag: (tag_id)->
        Query.tags.find tag_id

      faces: (tag_id)->
        Query.faces.tag tag_id

  functional: true
  props:
    id:
      required: true

  render: (m, ctx)->
    p = ctx.parent
    # p.query
    { id } = ctx.props
    { list } = p.faces id
    { label = "- 全体 -" } = p.find_tag id

    attr =
      key: id
      props:
        as: id
        value: p.value
      on:
        input: (as)->
          p.$emit 'input', as

    if list.length
      m "btn", attr, [
        label
        m "sup", list.length
      ]
</script>

