pno = process.env.NODE_APP_INSTANCE
sh = require 'child_process'

agenda = new require("agenda")
  db:
    address: "mongodb://localhost/giji"
    collection: "jobCollectionName"
    options:
      server:
        auto_reconnect: true

agenda.define "reload", (job, done)->
  sh.exec 'pm2 reload giji', (err, stdout, stderr)->
    if err
      console.error err
      console.error stderr
    else
      console.log stdout  

agenda.define "ping pong", (job, done)->
  console.log "ping pong"
  console.log job
  done()

agenda.on 'ready', ->
  unless pno 
    agenda.every '1 days', 'reload'
    agenda.every '15 minutes', 'ping pong'
  agenda.start()

agenda_ui = require "agenda-ui"

module.exports = (app)->
  app.use '/agenda-ui', agenda_ui agenda,
    poll: 5000
  return
