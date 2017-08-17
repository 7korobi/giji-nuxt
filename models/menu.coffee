{ Set, Model, Query, Rule } = require "~plugins/memory-record"

new Rule("site").schema ->
  @order "rowid"
  class @model extends @model
    @create: (o)->
      o.rowid = @rowid
    constructor: ->



new Rule("width").schema ->
  @order "rowid"
  class @model extends @model
    @create: (o)->
      o.rowid = @rowid
    constructor: ->



new Rule("font").schema ->
  @order "rowid"
  class @model extends @model
    @create: (o)->
      o.rowid = @rowid
    constructor: ->



new Rule("theme").schema ->
  @order "rowid"
  class @model extends @model
    @create: (o)->
      o.rowid = @rowid
    item: "speech"
    constructor: ->
      @width =
        770: ["morning.png", @bg]
        580: ["b.jpg", "w.jpg"]
        458: ["b.jpg", "w.jpg"]



new Rule("menu").schema ->
  @order "rowid"
  @tree()

  @scope (all)->
    all.icons = ({menu, site, width}, options)->
      { list } = all.show menu, site, width
      list.push all.find menu
      list.map ({_id})-> Model.menu.menu.item _id, options

    show: (menu, site, width)->
      all.find(menu).nodes(1).in({ site, width }).where (o)-> ! o.disabled

  class @model extends @model
    @set_tie: (@tie)->
      { params } = @tie
      @tie.stay = (id, value)->
        params.pop = ! params.pop

      @tie.change = (id, value, old)->
        { params } = Model.menu.tie
        if "menu" == id
          params.pop = true
          menu = Query.menus.find(value)
          menu.onselect? params
      @tie.action = ->
        console.log ["action"]

      @pop = @tie.bundle
        _id: "pop"
        attr:
          type: "checkbox"
        current: false
      @menu = @tie.bundle
        _id: "menu"
        attr:
          type: "icon"
        current: "menu"
        options: Query.menus.hash
        option_default:
          label: "icon default"
      @site = @tie.bundle
        _id: "site"
        attr:
          type: "hidden"
        current: "top"
        options: Query.sites.hash
      @width = @tie.bundle
        _id: "width"
        attr:
          type: "hidden"
        current: "full"
        options: Query.widths.hash
      @theme = @tie.bundle
        _id: "theme"
        attr:
          type: "btns"
        current: "cinema"
        options: Query.themes.hash
      @font = @tie.bundle
        _id: "font"
        attr:
          type: "btns"
        current: "std"
        options: Query.fonts.hash

    @create: (o)->
      o.rowid = @rowid
    @map_reduce: (o, emit)->
    constructor: ->
      [menu_id..., @icon] = @_id.split(",")
      @menu_id = menu_id.join(",")
      @width ?= Query.widths.ids
      @site ?= Query.sites.ids

Set.site.set
  top:  {}
  user: {}
  book: {}

Set.font.set
  large:
    label: "大判"
  novel:
    label: "明朝"
  std:
    label: "ゴシック"
  small:
    label: "繊細"

Set.width.set
  full:
    label: "最大"
  wide:
    label: "広域"
  std:
    label: "狭域"

Set.theme.set
  cinema:
    label: "煉瓦"
    bg: "lupino.png"
  star:
    label: "蒼穹"
    bg: "lupino.png"
  night:
    label: "闇夜"
    bg: "moon.png"
  moon:
    label: "月夜"
    bg: "moon.png"
  wa:
    label: "和の国"
    bg: "moon.png"

Set.menu.set
  "menu,calc,cog":
    label: "画面表示を調整します。"

  "menu,calc,bike":
    disabled: true
    site: ["top"]
    label: "便利ツール。"

  "menu,calc,clock":
    disabled: true
    site: ["user"]
    label: ""

  "menu,calc,search":
    site: ["user", "book"]
    label: "発言中の言葉を検索します。"


  "menu,resize-full":
    site: ["top", "user"]
    width: ["wide", "std"]
    label: "詳細表示。"
    onselect: (params)->
      params.menu = @menu._id
      params.width = "full"

  "menu,resize-normal":
    site: ["top", "user"]
    width: ["full", "wide"]
    label: "概要表示。"
    onselect: (params)->
      params.menu = @menu._id
      params.width = "std"

  "menu,calc":
    label: "便利ツール。"

  "menu,pin":
    site: ["book"]
    label: "ピン止めを表示します。"
    badge: ->
      # doc.messages.pins(Url.prop).list.length - Mem.Query.events.list.length
      0

  "menu,home":
    site: ["user", "book"]
    label: "村の設定、ルール、メモを表示します。"
    badge: ->
      # Mem.Query.messages.home("announce").list.length - Mem.Query.events.list.length
      0

  "menu,mail":
    disabled: true
    site: ["user", "book"]
    label: "秘密の発言、私信を表示します。"
    badge: -> 0

  "menu,chat-alt":
    site: ["book"]
    label: "発言を表示します。"
    badge: ->
      prop = _.merge {}, Url.prop,
        talk: -> "all"
        open: -> true
        search: -> ""
      # doc.messages.talk(prop).list.length - Mem.Query.events.list.length
      0

  "menu,pin,comment":
    site: ["book"]
    label: "公開発言します。"

  "menu,home,comment":
    site: ["book"]
    label: "メモを更新します。"

  "menu,mail,comment":
    site: ["book"]
    label: "内緒話をします。"

  "menu,chat-alt,comment":
    site: ["book"]
    label: "公開発言します。"


  "menu":
    order: 99999
    label: ""
    badge: -> 0
