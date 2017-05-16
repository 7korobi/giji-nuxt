<script lang="coffee">
{ Query } = require "~plugins/memory-record"
el = require "~plugins/dom"

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
      show:     chat.show
      deco:     chat.deco
      log:      chat.log

    if o = chat.potof
      if o.hide
        attrs.show = "hide"
      Object.assign attrs,
        face_id: o.face_id
        sign: o.sign
        head: o.head

    if o = chat.phase
      Object.assign attrs,
        handle: o.handle

    m attrs.show, { attrs }

  component_class: ->
    props: ["id", "write_at", "handle", "deco", "log", "face_id", "head", "to", "sign"]

    computed:
      el_adjust: el.adjust
      anker: ->
        if @id
          @$store.state.book.read_at
          chat = Query.chats.hash[@id]
          if chat && chat.phase
            "#{chat.phase.mark}#{chat.idx}"

      log_html: ->
        return "" unless @log
        @log
        .replace ///(\/\*).*(\*\/|$)///g, "<em>$&</em>"
        .replace ///(^|\/\*).*(\*\/)///g, "<em>$&</em>"

      classname: ->
        if "focus" == @el_adjust
          @$store.commit "book/see", @id
        [@handle, @el_adjust]
</script>