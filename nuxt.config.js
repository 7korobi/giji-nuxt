require('coffeescript/register')

module.exports = {
  dev: (process.env.NODE_ENV != 'production'),
  router: require("./config/webpack/router.coffee"),
  build:  require("./config/webpack/build.coffee"),
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.5, shrink-to-fit=no' },
      { hid: 'description', content: "Nuxt.js project" },
      { href: "mailto:7korobi@gmail.com" }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: "https://use.fontawesome.com/6348868528.css" },
      { rel: 'stylesheet', type: 'text/css', href: "/css/index.css" },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "mailto:7korobi@gmail.com" }
    ],
    script: [
      // { src: '/ace/ace.js', type: 'text/javascript', charset: 'utf8' }
      { src: '/monaco-editor/vs/loader.js', type: 'text/javascript', charset: 'utf8' }
    ],
    title: '人狼議事'
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
