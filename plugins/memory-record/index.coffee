module.exports = index =
  Set:   {}
  Map:   {}
  Form:  {}
  Model: {}

  Name:  {}

  Finder: {}
  Format: {}
  Store:  {}
  Query:  {}

  set_deploy: (key, cb)-> @Name[key].deploys.push cb
  set_depend: (key, cb)-> @Name[key].depends.push cb
