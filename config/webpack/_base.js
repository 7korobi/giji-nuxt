require('coffeescript/register')

import webpack from 'webpack'
import copy    from 'copy-webpack-plugin'
import path    from 'path'

const dir = (str) => (path.resolve(__dirname, "../..", str))

export {
  entry: {
    "rails": "~assets/js/rails.coffee",
    "sow":   "~assets/js/sow.coffee"
  },

  module: {
    loaders: require("./build.coffee").loaders
  },

  plugins: [
    new copy([
      { from: dir("../../web_work/images/portrate"), to: "static/images/portrate" }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "base",
      filename: "base.js",
      minChunks: 2
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      entryChunkMultiplicator: 10,
      moveToParents: true
    })
  ],

  devtool: 'source-map',
  // source-map cheap-source-map
  target: "web",
  // web webworker node async-node node-webkit electron electron-renderer

  context: dir("assets/js"),
  profile: true,
  cache: false,
  stats: {
    modules: true,
    reasons: true
  },
  output: {
    pathinfo: true,
    jsonpFunction: "gijiP",
    libraryTarget: "var", // var, this, umd
    path: dir('.nuxt/dist/js/'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json', '.coffee'],
    alias: {
      static: dir('./static'),
      assets: dir('./assets'),
      '~':           dir('.'),
      '~static':     dir('./static'),
      '~assets':     dir('./assets'),
      '~plugins':    dir('./plugins'),
      '~router':     dir('./.nuxt/router'),
      '~pages':      dir('./pages'),
      '~components': dir('./components')
    }
  }
};
