YAML = require "js-yaml"
fs = require "fs"

module.exports =
  YAML: (path)-> YAML.load fs.readFileSync path, 'utf8'
  API: (cb)-> (req, res, next)->
    try
      res.json await cb req
    catch { name, message, stack, fileName, lineNumber }
      res.json { name, message, stack, fileName, lineNumber }