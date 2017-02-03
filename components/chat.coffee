
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

    if chat.potof
      Object.assign attrs,
        face: chat.potof.face._id
        job:  chat.potof.job
        name: chat.potof.name
        sign: chat.potof.sign
    if chat.phase
      Object.assign attrs,
        handle: chat.phase.handle

    m chat.show, { attrs }

  component_class: ->
    props: ["id", "write_at", "handle", "style", "log", "face", "job", "name", "sign"]
    data: -> {}
    computed:
      face_url: -> Query.faces.hash[@face].path

      head: ->
        if @name || @job
          "#{@job} #{@name}"
        else
          null

      log_html: ->
        @log
        .replace /\n/, "<br>"
