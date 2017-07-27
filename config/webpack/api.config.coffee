coffee = /\.coffee$/

module.exports =
  externals: (ctx, req, cb)->
    if coffee.test req
      cb()
    else
      cb null, 'commonjs2 ' + req

  target: 'node'
  entry: './api/index.coffee'

  # 出力の設定
  output:
    # 出力するファイル名
    path: process.cwd()
    filename: 'server.js'
  resolve:
    extensions: ['.js']
  module:
    loaders: [
      test: coffee
      loader: 'coffee-loader'
    ]

