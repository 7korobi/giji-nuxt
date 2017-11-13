ExtractTextPlugin = require 'extract-text-webpack-plugin'

module.exports =
  extend: (config, { isDev, isClient })->

  publicPath: '//s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt/dist'

  babel:
    presets: [
      "vue-app"
      [ "env"
        targets:
          browsers: [
            "> 5%"
          ]
        forceAllTransforms: true
      ]
    ]

  vendor: [
    'd3'
    'axios'
    'lodash'
    'vee-validate'
    '~/components/vue.coffee'
    '~/plugins/memory-record.coffee'
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
  ]
