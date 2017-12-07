express = require 'express'
app = express()
conf = require 'config'

{ pm_id } = process.env
Object.assign conf, { pm_id }
process.on 'unhandledRejection', console.dir


require("./base.coffee")(app, conf)
if conf.use_api
  require("./session.coffee" )(app, conf)
  require("./agenda.coffee"  )(app, conf)
  require("./mongoose.coffee")(app, conf)

  # for only legacy jinrogiji
  require("./mongodb.coffee" )(app, conf)

require("./nuxt.coffee")(app, conf)

host = ( conf.host || '127.0.0.1' )
port = ( conf.port || 4000 ) + (pm_id - 0 || 0)

app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
