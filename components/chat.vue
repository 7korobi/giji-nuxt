<script lang="coffee">
{ Query, Collection } = require "./models/memory-record"
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
      deco:     chat.deco
      log:      chat.log

    if o = chat.potof
      head = "#{o.job} #{o.name}" if o.name || o.job
      Object.assign attrs,
        face: o.face_id
        sign: o.sign
        head: head
    if o = chat.phase
      Object.assign attrs,
        handle: o.handle

    m chat.show, { attrs }

  component_class: ->
    props: ["id", "write_at", "handle", "deco", "log", "face", "head", "to", "sign"]

    computed:
      chat: -> Query.chats.hash[id] ? {}
      face_url: -> Query.faces.hash[@face]?.path
      anker: ->
        if @id
          [@book_id, part_idx, phase_idx, chat_idx] = @id.split("-")
          @part_id = "#{@book_id}-#{part_idx}"
          @phase_id = "#{@part_id}-#{phase_idx}"
          "SS#{chat_idx}"

      log_html: ->
        return "" unless @log
        @log
        .replace /\n/, "<br>"
      classname: ->
        if process.BROWSER_BUILD && @$el?
          top = @$el.offsetTop
          btm = @$el.clientHeight + top + 6
          center = @$store.state.center
          if btm < center
            return [@handle, "old"]
          if top < center < btm
            @$store.commit "chat", @id
            return [@handle, "focus"]
          if btm < center
            return [@handle, "future"]
        [@handle]
</script>