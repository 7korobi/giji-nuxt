base = ([time_num..., time_tail], name, calc)->
  timeout =
    switch time_tail
      when "s"
        1000 * time_num
      when "m"
        1000 * 60 * time_num
      when "h"
        1000 * 3600 * time_num
      when "d"
        1000 * 3600 * 24 * time_num

  capture = (vue)->
    if calc
      payload = calc.call vue
      suffix = JSON.stringify payload
    else
      payload = null
      suffix = ""
    key = name + suffix
    { payload, key, name }

  mounted: ->
    { commit, timer, read_at } = base.root
    { payload, key, name } = capture @
    o =
      timer: {}
      read_at: {}
    o.timer[key] = timeout
    base.root.commit base.arg.commit, o
    if Date.now() - timer[key] < read_at[key]
      new Promise (ok)-> ok()
    else
      ret = @$store.dispatch name, payload
      if ret.then?
        ret
        .then ->
          o.read_at[key] = Date.now()
          base.root.commit base.arg.commit, o
      else
        ret

  computed:
    read_at: ->
      { key } = capture @
      @$store.state.read_at[key]

base.plugin = (@arg)->
    ({ commit, state })->
      { timer, read_at } = state
      base.root = { commit, timer, read_at }

module.exports = base
