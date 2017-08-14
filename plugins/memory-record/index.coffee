module.exports = index =
  Set:   {}
  Map:   {}

  Name:  {}

  Finder: {}
  Query:  {}

  read_at: {}

  set_deploy: (key, cb)-> @Name[key].deploys.push cb
  set_depend: (key, cb)-> @Name[key].depends.push cb
