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

    return [] unless chat
    attrs =
      id: id
      write_at: chat.write_at
      deco:     chat.deco
      log:      chat.log

    if o = chat.potof
      Object.assign attrs,
        face_id: o.face_id
        sign: o.sign
        head: o.head

    if o = chat.phase
      Object.assign attrs,
        handle: o.handle

    m chat.show, { attrs }

  component_class: ->
    props: ["id", "write_at", "handle", "deco", "log", "face_id", "head", "to", "sign"]

    computed:
      face_url: -> Query.faces.hash[@face_id]?.path
      anker: ->
        if @id
          chat = Query.chats.hash[@id]
          "SS#{chat.idx}"

      log_html: ->
        return "" unless @log
        @log
        .replace /\n/g, "<br>"
      classname: ->
        if process.BROWSER_BUILD &&  @$el?
          top = @$el.offsetTop
          btm = @$el.clientHeight + top + 6
          center = @$store.state.menu.center
          if btm < center
            return [@handle, "old"]
          if top < center < btm
            @$store.commit "book/see", @id
            return [@handle, "focus"]
          if btm < center
            return [@handle, "future"]
        [@handle]
</script>