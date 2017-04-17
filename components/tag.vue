<script lang="coffee">
{ Query } = require "./models/memory-record"

module.exports =
  functional: true
  props:
    id:
      required: true

    find_tag:
      default: -> (tag_id)->
        Query.tags.find tag_id

    faces:
      default: -> (tag_id)->
        Query.faces.tag tag_id

  render: (m, ctx)->
    { id } = p = ctx.props
    { list } = p.faces id
    { label = "- 全体 -" } = p.find_tag id

    attr =
      key: id
      props:
        as: id
        value: ctx.parent.value
      on:
        input: (as)->
          ctx.parent.$emit 'input', as
    if list.length
      m "btn", attr, [
        label
        m "sup", list.length
      ]
</script>

module.exports =
  default:
    data: ->
      tag_id = @$route.query.tag ? "giji"

    metaInfo: ->
      title: @set.long
      titleTemplate: '%s - 人狼議事'

    computed:
      set:  ->
        @$router.replace { @query }
        @find_tag @tag_id
      query: ->
        Object.assign @$route.query,
          tag: @tag_id
