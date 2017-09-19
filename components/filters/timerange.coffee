moment = require "~/plugins/moment"

module.exports = ({ min, max })->
  span = max - min
  min_str = moment(min).format('ddd HH時')
  max_str = moment(max).format('ddd HH時')
  if min_str == max_str
    min_str
  else
    if span < 12 * 3600 * 1000
      max_str = moment(max).format('-HH時')
      min_str.replace "時", max_str
    else
      min_str + " - " + max_str
