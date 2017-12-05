express = require 'express'
app = express()

{ pm_id, HOST, ONLY_VUE } = process.env
process.on 'unhandledRejection', console.dir


require("./base.coffee")(app, process.env)
unless ONLY_VUE
  require("./agenda.coffee"  )(app, process.env)
  require("./mongoose.coffee")(app, process.env)
  require("./session.coffee" )(app, process.env)
  require("./passport.coffee")(app, process.env)

  # for only legacy jinrogiji
  require("./mongodb.coffee" )(app)
require("./test-data.coffee" )(app, process.env)

console.log process.env
require("./nuxt.coffee")(app, process.env)

host = HOST || '127.0.0.1'
port = 4000 + (pm_id - 0 || 0)

app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
