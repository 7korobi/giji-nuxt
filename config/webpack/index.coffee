module.exports =
  head: require("./head.coffee")

  loading:
    color: '#3B8070'
  css: []
  plugins: []
  modules: ['~/modules/extention.js']

  build:  require("./build.coffee")
  env: require("./env.coffee")

  render: require("./render.coffee")
  router: require("./router.coffee")
