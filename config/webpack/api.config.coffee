coffee = /\.coffee$/

module.exports =
  externals: (ctx, req, cb)->
    if coffee.test req
      cb()
    else
      cb null, 'commonjs2 ' + req

  entry:
    server: './api/index.coffee'
  #  "nuxt.config": './config/webpack/index.coffee'

  target: 'node'

  # 出力の設定
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

