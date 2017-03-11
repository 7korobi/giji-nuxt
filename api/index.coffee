session = require 'express-session'
bodyParser = require 'body-parser'

module.exports = (app)->
  app.use bodyParser.json()

  app.get '/api/test', (req, res)->
    res.json
      a: 1
    res.status(401).json
      error: "bad credentials"

  app.use session
    secret: process.env.SECRET_KEY_BASE
    resave: false
    saveUninitialized: false
    cookie: { maxAge: 60000 }

  require("./mongodb.coffee")(app)
  require("./mongoose.coffee")(app)
  require("./passport.coffee")(app)
  require("./test-data.coffee")(app)
  return