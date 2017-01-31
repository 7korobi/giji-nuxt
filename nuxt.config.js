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
    ],
    extend (config, { isDev, isClient }) {
      if (isClient) {
        config.devtool = 'source-map'
        console.log(config);
      }
    },
    plugins: [
      new copy([
        { from: dir("../../web_work/images/portrate"), to: "static/images/portrate" }
      ])
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "Nuxt.js project" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
