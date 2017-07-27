agenda = require "agenda"
sh = require 'child_process'
pno = (process.env.pm_id - 1)

agenda = new agenda
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

agenda.define "process", (job, done)->
  sh.exec 'ps uafxS | grep -v ^root', (err, stdout, stderr)->
    if err
      console.error err
      console.error stderr
    else
      console.log stdout  

agenda.on 'ready', ->
  unless pno 
    agenda.every '12 hours', 'aggregate'
    agenda.every '2 minutes', 'process'
  agenda.start()

agenda_ui = require "agenda-ui"

module.exports = (app)->
  app.use '/agenda-ui', agenda_ui agenda,
    poll: 5000
  return
