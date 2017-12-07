Agenda = require "agenda"
Agendash = require 'agendash'

jobs = (cb)->
  ctx = require.context "./jobs", true, ///(.+)\.coffee$///
  for fname in ctx.keys()
    name = fname[2..-8]
    cb name, ctx fname

module.exports = (app, { pm_id, db })->
  pno = (pm_id - 1 || 0)
  agenda = new Agenda
    db:
      address: db.mongo
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

  app.use '/agendash', Agendash agenda
  console.log "agenda use #{db.mongo}"
