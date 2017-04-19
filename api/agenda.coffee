agenda    = new require("agenda")
  db:
    address: "mongodb://localhost/giji"
    collection: "jobCollectionName"
    options:
      server:
        auto_reconnect: true

agenda.define "ping pong", (job, done)->
  console.log "ping pong"
  console.log job
  done()

agenda.on 'ready', ->
  agenda.every '15 minutes', 'ping pong'
  agenda.start()

agenda_ui = require "agenda-ui"

module.exports = (app)->
  app.use '/agenda-ui', agenda_ui agenda,
    poll: 5000
  return
