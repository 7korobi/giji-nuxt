agenda = require "agenda"
sh = require 'child_process'

{ pm_id, WEB_URL } = process.env
pno = (pm_id - 1 || 0)

agenda = new agenda
  db:
    address: process.env.MONGO_URL
    collection: "jobCollectionName"
    options:
      server:
        auto_reconnect: true

agenda.define "aggregate", (job, done)->
  sh.exec "curl #{WEB_URL}/api/aggregate/job", (err, stdout, stderr)->
    sh.exec "./static/sow.sh", (err, stdout, stderr)->
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
