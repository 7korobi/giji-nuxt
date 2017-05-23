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
    chat = Query.chats.hash[id]
    return [] unless chat

    attrs =
      id: id
      show: show ? chat.show
      write_at:   chat.write_at
      deco:      chat.deco
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

    m attrs.show, { attrs, key: id }

  component_class: ->
    props: ["id", "write_at", "handle", "deco", "log", "face_id", "head", "to", "sign"]

    methods:
      click: ({ target })->
        { chat_id, href } = target.attributes
        if chat_id
          chat = Query.chats.find chat_id.value
          console.log chat
        if href
          url = href.value
          console.log url

      phase: (args...)->
        Query.phases.hash[args.join "-"]
      chat: (args...)->
        Query.chats.hash[args.join "-"]

    computed:
      el_adjust: el.adjust

      full: ->
        ! @$store.state.menu.set.current

      anker: ->
        { read_at, chat_id } = @$store.state.book
        current = Query.chats.hash[chat_id]
        chat = Query.chats.hash[@id]
        if chat
          console.log chat unless chat.phase
          { mark } = chat.phase
          if mark?
            prefix =
              if current && current.part_id == chat.part_id
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
        @$store.state.book.read_at
        @log
        .replace ///[a-z]+\:\/\/[^"\s<>]+///g, (url, idx, src)->
          return url if '<a href="' == src[idx - 9...idx].toLowerCase()
          suffix = ""
          url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
            suffix = last
            ""
          [protocol, hostname] = url.split(///\://|/|\?|\#///g)
          title = [protocol, hostname].join("\n")
          """<b href="#{url}" title="#{title}">#{protocol}</b>#{suffix}"""
        .replace ///(\/\*).*(\*\/|$)///g, "<em>$&</em>"
        .replace ///(^|\/\*).*(\*\/)///g, "<em>$&</em>"

      classname: ->
        if "focus" == @el_adjust
          @$store.commit "book/see", @id
        [@handle, @el_adjust]
</script>