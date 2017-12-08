
module.exports =
  API: (cb)-> (req, res, next)->
    try
      res.json await cb req
    catch { name, message, stack, fileName, lineNumber }
      res.json { name, message, stack, fileName, lineNumber }
