const webpack = require('webpack')
const copy = require('copy-webpack-plugin')
var path = require("path");
var dir = (str) => {
  return path.resolve(__dirname, str);
};

module.exports = {
  build: {
    vendor:[
      'axios',
      '~components/models/memory-record'
    ],
    extend (config, { isDev, isClient }) {
      config.resolve.extensions.push(".coffee");
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
    loaders: [
      { test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      { test:       /\.pug$/, loader: "pug-html", query: {pretty: true } },
      { test:      /\.styl$/, loader: "style-loader!css-loader!stylus-loader?resolve url"},
      { test: /\.styl\.use$/, loader: "style-loader/useable!css-loader!stylus-loader?resolve url"},
      { test:       /\.yml$/, loader: 'json-loader!yaml-loader' },
      { test:    /\.coffee$/, loader: "coffee-loader" }
    ]
  },
  /*
  ** Headers of the page
  */
  head: {},
  /*
  ** Global CSS
  */
  css: [
    { src: "~assets/styl/_base.styl", lang: 'styl' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
