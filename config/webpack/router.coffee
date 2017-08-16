
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
    book = (has_top, to, from)->
      [from_part, to_part] = [from, to].map (o)-> o.params.idx?.split("-")[0..2].join("-")
      from_name = from.params.mode || from.name
      to_name   =   to.params.mode ||   to.name
      if from_part + from_name != to_part + to_name
        console.log "scroll to TOP (#{from_name} != #{to_name})"
        x: 0
        y: 0

    basic = (has_top, to)->
      switch
        when from.path != to.path
          console.log "scroll to TOP (#{from.path} != #{to.path})"
          x: 0
          y: 0
        when has_top
          console.log "scroll to TOP (has scrollToTop)"
          x: 0
          y: 0

    console.log { to, from }

    switch
      when savedPosition
        console.log "scroll restore", savedPosition
        savedPosition
      when to.hash
        console.log "scroll to " + to.hash
        selector: to.hash
      else
        has_top = to.matched.some (r)-> r.components.default.options.scrollToTop
        switch to.name
          when "sow-village-idx-mode", "sow-village-idx-anker"
            book  has_top, to, from
          else
            basic has_top, to, from
