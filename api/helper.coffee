YAML = require "js-yaml"
fs = require "fs"

module.exports =
  YAML: (path)-> YAML.load fs.readFileSync path, 'utf8'
  API: (cb)-> (req, res, next)->
    try
      o = await cb req
      o.read_at ?= new Date - 0
      res.json o
    catch { name, message, stack, fileName, lineNumber }
      res.json { name, message, stack, fileName, lineNumber }
