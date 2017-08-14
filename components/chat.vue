<script lang="coffee">
{ Query } = require "~plugins/memory-record"
el = require "~plugins/dom"

module.exports =
  functional: true
  props:
    id:
      type: String
      required: true
    show:
      type: String

  render: (m, ctx)->
    { id, show } = ctx.props
    chat = Query.chats.find id
    return [] unless chat

    key = id
    attrs =
      id: id
      write_at: chat.write_at
      handle: chat.handle
      show: show ? chat.show
      deco: chat.deco
      log: chat.log
      to: chat.to

    if o = chat.potof
      if o.hide
        attrs.show = "hide"
      Object.assign attrs,
        face_id: o.face_id
        sign: o.sign
        head: o.head

    if o = chat.phase
      Object.assign attrs,
        handle: chat.handle ? o.handle

    m attrs.show, { attrs, key, on: ctx.data.on }

  component_class: ->
    props: ["id", "write_at", "handle", "deco", "log", "face_id", "head", "to", "sign"]

    methods:
      click: ({ target })->
        { chat_id, href, chk } = target.attributes
        if chat_id && chat = Query.chats.find chat_id.value
          { book_id } = chat
          ids = Array.from new Set [@id, chat.id]
          @$emit "anker", book_id, ids.map (id)-> id[book_id.length ..]
          
        if url = href?.value
          if chk?.value == "confirm" && confirm "open?\n#{url}"
            open url, "_blank"

    computed: {
      el_adjust: el.adjust

      full: ->
        ! @$store.state.menu.set.current

      anker: ->
        if chat = @chat
          console.log chat unless chat.phase
          { mark } = chat.phase
          if mark?
            prefix =
              if (current = @current) && current.part_id == chat.part_id
                ""
              else
                "#{chat.part.idx}:"
            "#{prefix}#{mark}#{chat.idx}"
          else
            ""

      log_mention: ->
        @log_html.replace ///<br>///g, " "

      log_html: ->
        return "" unless @log
        @log
        .replace ///[a-z]+\:\/\/[^"\s<>]+///g, (url, idx, src)->
          return url if '<a href="' == src[idx - 9...idx].toLowerCase()
          suffix = ""
          url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
            suffix = last
            ""
          [protocol, hostname] = url.split(///\://|/|\?|\#///g)
          title = [protocol, hostname].join("\n")
          """<b chk="confirm" href="#{url}" title="#{title}">#{protocol}</b>#{suffix}"""
        .replace ///(\/\*).*(\*\/|$)///g, "<em>$&</em>"
        .replace ///(^|\/\*).*(\*\/)///g, "<em>$&</em>"

      current: ->
        { idx } = @$route.params
        if idx
          Query.chats.find idx
      chat: ->
        if @id
          Query.chats.find @id

      classname: ->
        { id } = @
        if id && "focus" == @el_adjust
          # console.log "focus", id
          @$emit "focus", id
        [@handle, @el_adjust]
    }
</script>