bodyParser = require 'body-parser'

module.exports = (app, conf)->
  app.use bodyParser.json()
  app.use (req, res, next)->
    res.header "Access-Control-Allow-Origin", "*"
    res.header "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    next()

