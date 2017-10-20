path   = require 'path'
coffee = /\.coffee$/
vue    = /\.vue$/
current = process.cwd()
isServer = true

module.exports =
  target: 'node'
  devtool: 'source-map'
  entry:
    server: './api/index.coffee'
    # spec:   './spec/index.coffee'
  output:
    path: current
    filename: '[name].js'
  resolve:
    extensions: ['.js','.coffee']
    alias:
      '~':           current
      '~pages':      path.join current, '/pages'
      '~static':     path.join current, '/static'
      '~assets':     path.join current, '/assets'
      '~/plugins':    path.join current, '/plugins'
      '~/components': path.join current, '/components'

  module:
    loaders: [
      test: vue
      loader: 'vue-loader'
    ,
      test: coffee
      loader: 'coffee-loader'
    ]
  externals: (ctx, req, cb)->
    return cb() if coffee.test req
    return cb() if vue.test req
    cb null, 'commonjs2 ' + req
