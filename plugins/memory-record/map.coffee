_ = require "lodash"
Mem = require "./index"

module.exports = class Map
  @bless: (o)->
    o.__proto__ = @prototype
    o


