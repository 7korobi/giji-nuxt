base = require("./_base")

var webpack  = require('webpack');
module.exports = Object.assign(base, {
  target: "web",
  cache:  true,
});
