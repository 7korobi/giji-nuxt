const webpack = require('webpack')
const copy = require('copy-webpack-plugin')
var path = require("path");
var dir = (str) => {
  return path.resolve(process.cwd(), str);
};

module.exports = {
  dev: (process.env.NODE_ENV != 'production'),
  router: {
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        console.log("scroll to saved.");
        return savedPosition
      } else if (to.hash) {
        console.log("scroll to hash : " + to.hash);
        return { selector: to.hash };
      } else {
        let position = {}
        if (to.matched.length < 1) {
          console.log("no match routes");
          return { x: 0, y: 0 };
        } else {
          return to.matched.some((r) => {
            let self = r.instances.default;
            let fook = r.components.default.options.scrollFook;
            if (r.components.default.options.scrollToTop) {
              console.log("scrollToTop");
              return { x: 0, y: 0 };
            }
            if (fook) {
              return fook.call(self);
            }
          });
        }
      }
    }
  },
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
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', content: "Nuxt.js project" },
      { href: "mailto:7korobi@gmail.com" }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: "https://use.fontawesome.com/6348868528.css" },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "mailto:7korobi@gmail.com" }
    ],
    title: '人狼議事'
  },
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
