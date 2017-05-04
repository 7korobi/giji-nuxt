module.exports = index = {
  Set:   {}
  Map:   {}
  Form:  {}
  Model: {}

  Query: {}
  Name:  {}

  Finder: {}
  Store:  {}
}

composite_field = (o, field)->
  list = "#{field}s"
  o[list] = {}
  o["set_#{field}"] = (key, cb)->
    o[list][key] ?= []
    o[list][key].push cb

composite_field index, "deploy"
composite_field index, "depend"
composite_field index, "validate"
