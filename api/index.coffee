bodyParser = require 'body-parser'

module.exports = (app)->
  app.use bodyParser.json()
  app.use (req,res,next)->
    res.header "Access-Control-Allow-Origin", "*"
    res.header "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    next()

  require("./agenda.coffee")(app)
  require("./mongodb.coffee")(app)
  require("./mongoose.coffee")(app)
  require("./session.coffee")(app)
  require("./passport.coffee")(app)
  require("./test-data.coffee")(app)
  return
  
