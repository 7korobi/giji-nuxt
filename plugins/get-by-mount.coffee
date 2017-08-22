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
    commit base.arg.commit, o
    if Date.now() - timeout < read_at[key]
      new Promise (ok)-> ok()
    else
      @$store.dispatch name, payload
      .then ->
        o.read_at[key] = Date.now()
        commit base.arg.commit, o

  computed:
    read_at: ->
      { key } = capture @
      @$store.state.read_at[key]

base.plugin = (@arg)->
  ({ commit, state })->
    { timer, read_at } = state
    base.root = { commit, timer, read_at }

module.exports = base
