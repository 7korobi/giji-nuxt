coffee = /\.coffee$/

module.exports =
  target: 'node'
  devtool: 'source-map'
  entry:
    server: './api/index.coffee'
  output:
    path: process.cwd()
    filename: '[name].js'
  resolve:
    extensions: ['.js']
  module:
    loaders: [
      test: coffee
      loader: 'coffee-loader'
    ]
  externals: (ctx, req, cb)->
    if coffee.test req
      cb()
    else
      cb null, 'commonjs2 ' + req

