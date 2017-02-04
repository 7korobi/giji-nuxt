var webpack  = require('webpack');
var copy = require("copy-webpack-plugin");

var path = require("path");
var dir = (str) => {
  return path.resolve(__dirname, "../..", str);
};


module.exports = {
  entry: {
    "rails": "~assets/js/rails.coffee",
    "sow":   "~assets/js/sow.coffee"
  },

  module: {
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
      { test:    /\.coffee$/, loader: "coffee-loader" },
      { test:       /\.vue$/, loader: 'vue-loader' },
      { test:        /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
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
      '~store':      dir('./store'),
      '~router':     dir('./.nuxt/router'),
      '~pages':      dir('./pages'),
      '~components': dir('./components')
    }
  }
};
