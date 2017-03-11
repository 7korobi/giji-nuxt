{ Schema } = mongoose = require "mongoose"
mongoose.connect "mongodb://localhost/giji"

module.exports = (app)->
  app.get '/api/test', (req, res)->
    res.json
      a: 1
    res.status(401).json
      error: "bad credentials"
  return