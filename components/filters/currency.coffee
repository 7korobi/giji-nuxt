module.exports = (num)->
  str = String Math.ceil num
  while str != str = str.replace /^(-?\d+)(\d{3})/, "$1,$2"
    true
  str
