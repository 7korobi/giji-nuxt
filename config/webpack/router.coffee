module.exports =
  scrollBehavior: (to, from, savedPosition)->
    switch
      when savedPosition
        console.log "scroll to saved."
        savedPosition
      when to.hash
        console.log "scroll to hash : " + to.hash
        selector: to.hash
      else
        position = {}
        if to.matched.length < 1
          console.log "no match routes"
          { x: 0, y: 0 }
        else
          to.matched.some (r) =>
            { scrollFook, scrollToTop } = r.components.default.options
            switch
              when scrollToTop
                console.log "scrollToTop"
                { x: 0, y: 0 }
              when scrollFook
                scrollFook.call r.instances.default
