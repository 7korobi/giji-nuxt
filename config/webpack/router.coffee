
module.exports =
  scrollBehavior: (to, from, savedPosition)->
    book = (to, from)->
      [from_id, to_id] = [from, to].map (o)-> o.params.idx?.split("-")[0..1].join("-")
      unless from_id == to_id
        x: 0
        y: 0

    basic = (to)->
      switch
        when to.hash
          console.log "scroll to " + to.hash
          selector: to.hash
        when to.path != from.path
          x: 0
          y: 0
        else
          false

    console.log { to, from }
    console.log to.name
    if savedPosition
      console.log "scroll to saved."
      savedPosition
    else
      switch to.name
        when "sow-village-idx-mode"
          book  to, from
        else
          basic to, from
