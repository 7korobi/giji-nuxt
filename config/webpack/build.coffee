module.exports =
  extend: (config, { isDev, isClient })->
    if config.plugins[7]
      console.log config.plugins.pop()

    config.resolve.extensions = ['.vue', '.coffee', '.js', '.json']
    if isClient
      config.devtool = 'source-map'

  vendor: [
    'axios'
    '~plugins/memory-record.coffee'
  ]

  loaders: [
    test: /\.(png|jpe?g|gif|svg)$/
    loader: 'url-loader'
    query:
      limit: 1000 # 1KO
      name: 'img/[name].[hash:7].[ext]'
  ,
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
    loader: 'url-loader'
    query:
      limit: 1000 # 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
  ,
    test: /\.pug$/
    loader: 'pug-html'
    query:
      pretty: true
  ,
    test: /\.css$/
    loader: 'style-loader!css-loader?resolve url'
  ,
    test: /\.styl\.css$/
    loader: 'style-loader/useable!css-loader?resolve url'
  ,
    test: /\.styl$/
    loader: 'style-loader!css-loader!stylus-loader?resolve url'
  ,
    test: /\.styl\.use$/
    loader: 'style-loader/useable!css-loader!stylus-loader?resolve url'
  ,
    test: /\.yml$/
    loader: 'json-loader!yaml-loader'
  ,
    test: /\.coffee$/
    loader: 'coffee-loader'
  ]
