module.exports =
  dev: (process.env.NODE_ENV != 'production')
  render: require("./render.coffee")
  router: require("./router.coffee")
  build:  require("./build.coffee")
  head: require("./head.coffee")
  env: require("./env.coffee")

  plugins: []
  css: []
  #####
  # Customize the progress-bar color
  #
  loading:
    color: '#3B8070'

  modules: ['~/modules/coffeescript.js']
