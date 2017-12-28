YAML = require "js-yaml"
fs = require "fs"

module.exports =
  YAML: (path)-> YAML.load fs.readFileSync path, 'utf8'
  API: (cb)-> (req, res, next)->
    now = new Date - 0
    try
      o = await cb req
      o.read_at ?= now
      res.json o
    catch { name, message, stack, fileName, lineNumber }
      res.json { name, message, stack, fileName, lineNumber }
