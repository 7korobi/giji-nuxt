{ Query } = require "memory-record"


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
