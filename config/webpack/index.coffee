module.exports =
  dev: (process.env.NODE_ENV != 'production')
  render: require("./render.coffee")
  router: require("./router.coffee")
  build:  require("./build.coffee")
  head: require("./head.coffee")
  env: require("./env.coffee")

  plugins: [
    'node_modules/element-ui'
  ]
  css: [
    'element-ui/lib/theme-default/index.css'
  ]
  #####
  # Customize the progress-bar color
  #
  loading: { color: '#3B8070' }

