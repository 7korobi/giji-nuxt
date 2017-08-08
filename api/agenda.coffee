Agenda = require "agenda"
Agendash = require 'agendash'

{ pm_id, WEB_URL, MONGO_URL } = process.env
pno = (pm_id - 1 || 0)

jobs = (cb)->
  ctx = require.context "./jobs", true, ///(.+)\.coffee$///
  for fname in ctx.keys()
    name = fname[2..-8]
    cb name, ctx fname

agenda = new Agenda
  db:
    address: MONGO_URL
    collection: "jobCollectionName"
    options:
      server:
        auto_reconnect: true

jobs (name, ctx)->
  agenda.define name, ctx.define

agenda.on 'ready', ->
  unless pno 
    jobs (name, ctx)->
      if ctx.every
        agenda.every ctx.every, name
  agenda.start()

module.exports = (app)->
  app.use '/agendash', Agendash agenda
  return
