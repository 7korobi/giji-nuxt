module.exports =
  extend: (config, { isDev, isClient })->
    if isClient
      config.devtool = 'source-map'

  vendor: [
    'axios'
    'vee-validate'
    '~plugins/memory-record.coffee'
    '~plugins/browser-value'
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
      limit: 1000 # 1KO
      name: 'fonts/[name].[hash:7].[ext]'
  ,
    test: /\.styl\.use$/
    loader: 'style-loader/useable!css-loader!stylus-loader?resolve url'
  ]
