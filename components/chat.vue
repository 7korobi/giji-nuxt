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
        @$store.state.book.read_at
        chat = Query.chats.hash[@id]
        if chat
          { mark } = chat.phase
          if mark?
            "#{mark}#{chat.idx}"
          else
            ""

      log_html: ->
        return "" unless @log
        @$store.state.book.read_at
        chat = Query.chats.hash[@id]

        log = @log
        if chat
          log = log
          .replace ///<mw\ +(..)(\d+),(\d+),(\d+)>///g, (str, $1, _, part_idx, chat_idx)->
            phase_idx = $1.toUpperCase() + "AY"
            phase_idx = "VSSAY" if phase_idx == "VSAY"
            phase_idx = "SSAY"  if phase_idx == "SAY"
            phase_id = "#{chat.book.id}-#{part_idx}-#{phase_idx}"
            phase = Query.phases.hash[phase_id]
            if chat.part.idx == part_idx
              head = ""
            else
              head = "#{part_idx}:"
            """<b>&gt;&gt;#{head}#{phase.mark}#{chat_idx}</b>"""
        log
        .replace ///[a-z]+\:\/\/([^ ]*)+///g, (url)->
          """<a href="#{url}" target="blank">URL</a>"""
        .replace ///(\/\*).*(\*\/|$)///g, "<em>$&</em>"
        .replace ///(^|\/\*).*(\*\/)///g, "<em>$&</em>"

      classname: ->
        if "focus" == @el_adjust
          @$store.commit "book/see", @id
        [@handle, @el_adjust]
</script>