Agenda = require "agenda"
Agendash = require 'agendash'

ctxs = [
  require "./jobs/aggregate.coffee"
  require "./jobs/process.coffee"
]

module.exports = (app, { pm_id, db })->
  pno = (pm_id - 1 || 0)
  agenda = new Agenda
    db:
      address: db.mongo
      collection: "jobCollectionName"
      options:
        server:
          auto_reconnect: true

  for { define } in ctxs
    agenda.define name, define

  agenda.on 'ready', ->
    unless pno
      for { every, name } in ctxs
        if every
          agenda.every every, name
    agenda.start()

  app.use '/agendash', Agendash agenda
  console.log "agenda use #{db.mongo}"
