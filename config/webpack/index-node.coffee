UglifyEsPlugin = require('uglifyjs-webpack-plugin')

path   = require 'path'
coffee = /\.coffee$/
yml    = /\.yml$/
current = process.cwd()
isServer = true

module.exports =
  target: 'node'
  devtool: 'source-map'
  entry:
    server: './api/index.coffee'
    spec:   './spec/index.coffee'
  output:
    path: current
    filename: '[name].js'
  resolve:
    extensions: [
      '.coffee'
      '.js'
    ]
    alias:
      '~':  current
      '~~': current
      '@':  current
      '@@': current
 
  module:
    rules: [
      test: coffee
      loader: 'coffee-loader'
    ,
      test: yml
      loader: 'json-loader!yaml-loader'
    ]

  plugins: [
    new UglifyEsPlugin
      sourceMap: true
      uglifyOptions:
        ie8: false
        ecma: 8
        warnings: true
  ]

  externals: (ctx, req, cb)->
    return cb() if /\//.test req
    return cb() if yml.test req
    cb null, 'commonjs2 ' + req
