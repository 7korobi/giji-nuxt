{ Set, Model, Query, Rule } = require "~plugins/memory-record"

order = [
  "ririnra"
  "wa"
  "time"
  "sf"
  "mad"
  "ger"
  "changed"
  "animal"
  "school"
  "all"
]


new Rule("tag").schema ->
  @habtm "chr_sets"
  @scope (all)->
    enable: ->
      all.where (o)->
        ! o.disabled

new Rule("face").schema ->
  @habtm "tags"
  @has_many "chr_jobs"
  @has_many "chr_npcs"

  @order "order"
  @scope (all)->
    tag: (tag_id)->
      switch tag_id
        when "all"
          all
        else
          all.in tag_ids: tag_id

    name_blank: ->
      for idx in ["ア".charCodeAt(0) .. "ン".charCodeAt(0)]
        key = String.fromCharCode idx
        continue if all.reduce.name_head[key]
        key

    name_head: (tag_id = "all")->
      counts = []
      for key, mr of all.tag(tag_id).reduce.name_head
        counts[mr.set.length] ?= []
        counts[mr.set.length].push mr
      counts

  map =
    count: 1
  class @model extends @model
    @map_reduce: (o, emit)->
      head = o.name[0]
      head = o.name[1] if head in ["†"]
      emit "all", "all", map
      emit "name_head", head,
        _id: head
        count: 1
        set: o.name
      for tag in o.tag_ids
        emit "tag", tag, map

    @deploy: ->
      @path = "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/portrate/#{ @_id }.jpg"


new Rule("chr_set").schema ->
  @order "label"
  @has_many "chr_jobs"
  @has_many "chr_npcs"

new Rule("chr_npc").schema ->
  @order "label"
  @belongs_to "chr_set"
  @belongs_to "face"
  class @model extends @model
    @deploy: ->
      @_id = "#{@chr_set_id}_#{@face_id}"
      @chr_set_idx = order.indexOf @chr_set_id

new Rule("chr_job").schema ->
  @order "face.order"
  @belongs_to "chr_set"
  @belongs_to "face"

  @scope (all)->
    face: (face_id)-> all.where({ face_id }).sort "chr_set_idx"

  class @model extends @model
    @deploy: ->
      @_id = "#{@chr_set_id}_#{@face_id}"
      @chr_set_idx = order.indexOf @chr_set_id


Set.tag.set  require "~components/yaml/chr_tag.yml"
Set.face.set require "~components/yaml/chr_face.yml"
for key in order
  o = require "~components/yaml/cs_#{key}.yml"

  Set.chr_set.merge [o.chr_set]
  { chr_set_id } = o.chr_set
  cs_key = { chr_set_id }

  Set.chr_npc.merge o.chr_npc, cs_key
  Set.chr_job.merge o.chr_job, cs_key

list =
  for face in Query.faces.list
    chr_set_id = "all"
    face_id = face._id
    job = Query.chr_jobs.face(face_id).list.first?.job
    continue unless job?
    { chr_set_id, face_id, job }

Set.chr_job.merge list
