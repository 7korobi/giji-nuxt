module.exports =
  scrollBehavior: (to, from, savedPosition)->
    console.log { to, from }
    switch
      when savedPosition
        console.log "scroll to saved."
        savedPosition
      when to.hash
        console.log "scroll to " + to.hash
        selector: to.hash
      when to.path != from.path
        x: 0
        y: 0
      else
        false
