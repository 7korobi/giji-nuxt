
###
const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition は popState ナビゲーションでのみ利用できます
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // 子パスが見つからないとき
    if (to.matched.length < 2) {
      // ページのトップへスクロールする
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // 子パスのひとつが scrollToTop オプションが true にセットされているとき
      position = { x: 0, y: 0 }
    }
    // アンカーがあるときは、セレクタを返すことでアンカーまでスクロールする
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}
###

module.exports =
  scrollBehavior: (to, from, savedPosition)->
    book = (idx_limit, to, from)->
      [from, to] = [from, to].map (o)->
        name = o.params.mode || o.name
        part = o.params.idx?.split("-")[0..idx_limit].join("-")
        page = o.query.page
        page = undefined if 'back' == page
        "#{name} #{part} #{page}"

      if from != to
        console.log "scroll to TOP (#{from} != #{to})"
        x: 0
        y: 0

    basic = (has_top, to)->
      [from, to] = [from, to].map (o)->
        o.path
      switch
        when from != to
          console.log "scroll to TOP (#{from} != #{to})"
          x: 0
          y: 0
        when has_top
          console.log "scroll to TOP (has scrollToTop)"
          x: 0
          y: 0

    switch
      when savedPosition
        console.log "scroll restore", savedPosition
        savedPosition
      when to.hash
        console.log "scroll to " + to.hash
        selector: to.hash
      else
        switch to.name
          when "sow-village-idx-mode"
            book  2, to, from
          when "sow-village-idx-anker"
            book  1, to, from
          else
            has_top = to.matched.some (r)-> r.components.default.options.scrollToTop
            basic has_top, to, from
