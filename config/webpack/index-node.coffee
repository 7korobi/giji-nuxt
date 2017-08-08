coffee = /\.coffee$/
vue    = /\.vue$/
isServer = true

module.exports =
  target: 'node'
  devtool: 'source-map'
  entry:
    server: './api/index.coffee'
    # spec:   './spec/index.coffee'
  output:
    path: process.cwd()
    filename: '[name].js'
  resolve:
    extensions: ['.js']

    ###
    alias:
      '~':           process.cwd()
      '~pages':      process.cwd() + '/pages'
      '~static':     process.cwd() + '/static'
      '~assets':     process.cwd() + '/assets'
      '~plugins':    process.cwd() + '/plugins'
      '~components': process.cwd() + '/components'
    ###
            
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

