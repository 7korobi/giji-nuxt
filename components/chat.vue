<script lang="coffee">
{ Query } = require "./models/memory-record"
module.exports =
  functional: true
  props:
    id:
      type: String
      required: true

  render: (m, ctx)->
    { id } = ctx.props
    chat = Query.chats.hash[id]
    attrs =
      id: id
      write_at: chat.write_at
      style:    chat.style
      log:      chat.log

    if o = chat.potof
      head = "#{o.job} #{o.name}" if o.name || o.job
      Object.assign attrs,
        face: o.face._id
        sign: o.sign
        head: head
    if o = chat.phase
      Object.assign attrs,
        handle: o.handle

    m chat.show, { attrs }

  component_class: ->
    props: ["id", "write_at", "handle", "style", "log", "face", "head", "sign"]
    data: -> {}
    computed:
      face_url: -> Query.faces.hash[@face]?.path
      log_html: -> @log?.replace /\n/, "<br>"
</script>