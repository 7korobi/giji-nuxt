pno = process.env.NODE_APP_INSTANCE
sh = require 'child_process'

agenda = new require("agenda")
  db:
    address: "mongodb://localhost/giji"
    collection: "jobCollectionName"
    options:
      server:
        auto_reconnect: true

agenda.define "aggregate", (job, done)->
  sh.exec 'curl http://giji.check.jp/api/aggregate/job', (err, stdout, stderr)->
    if err
      console.error err
      console.error stderr
    else
      console.log stdout  

agenda.on 'ready', ->
  unless pno 
    agenda.every '12 hours', 'aggregate'
  agenda.start()

agenda_ui = require "agenda-ui"

module.exports = (app)->
  app.use '/agenda-ui', agenda_ui agenda,
    poll: 5000
  return
