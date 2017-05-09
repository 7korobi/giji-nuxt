module.exports = index =
  Set:   {}
  Map:   {}
  Form:  {}
  Model: {}

  Query: {}
  Name:  {}

  Finder: {}
  Store:  {}

  set_deploy: (key, cb)-> @Name[key].deploys.push cb
  set_depend: (key, cb)-> @Name[key].depends.push cb
