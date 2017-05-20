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

      anker: ->
        @$store.state.book.read_at
        chat = Query.chats.hash[@id]
        if chat
          console.log chat unless chat.phase
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
          .replace ///<mw\ +(..)(\d+),(\d+),([^>]+)>///g, (str, phase_idx, $1, part_idx, code)=>
            idx = Number($1)
            target = @chat chat.book.id, part_idx, phase_idx, idx
            if target
              """<abbr chat_id="#{target.id}">&gt;&gt;#{code}</abbr>"""
            else
              """<abbr>&gt;&gt;#{code}</abbr>"""
        log
        .replace ///[a-z]+\:\/\/[^\s<>]+///g, (url)->
          suffix = ""
          url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
            suffix = last
            ""
          console.log url
          console.log url.split(///(\://|/|\?|\#)///g)
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