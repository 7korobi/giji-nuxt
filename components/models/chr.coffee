{ Collection, Model, Query, Rule } = require "memory-record"

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
  @has_many "chr_sets", by: "ids"
  @scope (all)->
    enable: ->
      all.where (o)->
        ! o.disabled

  class @model extends @model
    constructor: ->
      @tag_id = @_id

new Rule("face").schema ->
  @has_many "tags", by: "ids"
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

    name_head: ->
      counts = []
      for idx in ["ア".charCodeAt(0) .. "ン".charCodeAt(0)]
        key = String.fromCharCode idx
        names = all.where(name:///^#{key}///).pluck "name"
        counts[names.length] ?= []
        counts[names.length].push "<#{key}>#{names.join(" ")}"
      counts

  map =
    count: 1
  class @model extends @model
    @map_reduce: (o, emit)->
      emit "all", "all", map
      for tag in o.tags.list
        emit "tag", tag, map

    constructor: ->
      @face_id = @_id
      @path = "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/portrate/#{ @_id }.jpg"


new Rule("chr_set").schema ->
  @order "label"
  @has_many "chr_jobs"
  @has_many "chr_npcs"
  class @model extends @model
    constructor: ->
      @chr_set_id = @_id

new Rule("chr_npc").schema ->
  @order "label"
  @belongs_to "chr_set", dependent: true
  @belongs_to "face",    dependent: true
  class @model extends @model
    constructor: ->
      @_id = "#{@chr_set_id}_#{@face_id}"
      @chr_npc_id = @_id
      @chr_set_idx = order.indexOf @chr_set_id

new Rule("chr_job").schema ->
  @order "face.order"
  @belongs_to "chr_set", dependent: true
  @belongs_to "face",    dependent: true

  @scope (all)->
    face: (face_id)-> all.where({ face_id }).sort "chr_set_idx"

  class @model extends @model
    constructor: ->
      @_id = "#{@chr_set_id}_#{@face_id}"
      @chr_job_id = @_id
      @chr_set_idx = order.indexOf @chr_set_id


Collection.tag.set  require "~components/yaml/chr_tag.yml"
Collection.face.set require "~components/yaml/chr_face.yml"
for key in order
  o = require "~components/yaml/cs_#{key}.yml"

  Collection.chr_set.merge [o.chr_set]
  { chr_set_id } = o.chr_set
  cs_key = { chr_set_id }

  Collection.chr_npc.merge o.chr_npc, cs_key
  Collection.chr_job.merge o.chr_job, cs_key

list =
  for face in Query.faces.list
    chr_set_id = "all"
    face_id = face._id
    job = Query.chr_jobs.face(face_id).list.first?.job
    continue unless job?
    { chr_set_id, face_id, job }

Collection.chr_job.merge list
