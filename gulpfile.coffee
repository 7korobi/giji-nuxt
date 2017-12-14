conf = require 'config'
gulp = require 'gulp'
del  = require 'del'
$ = require('gulp-load-plugins')()

pipes = (src, list)->
  o = gulp.src src
  for item in list
    o = o.pipe item
  o

cp = ({ src, dst, pipe = [] })->
  pipes src, [
    $.newer dst
    ...pipe
    gulp.dest dst
  ]

amazon = ({ src, headers, pipe = [], options = {} })->
  giji = $.awspublish.create conf.aws

  pipes src, [
    ...pipe
    giji.publish headers, options
    giji.cache()
    $.awspublish.reporter
      states: [
        'create'
        'update'
        'delete'
#        'cache'
#        'skip'
      ]
  ]  


gulp.task "default", [], ->
  gulp.watch ["assets/styl/**"], ["stylus"]
  gulp.watch ["config/**", "api/**"], ["api"]
  gulp.start ["api", "cp", "stylus"], $.shell.task [
    "node server.js"
  ]



gulp.task "prod", ["api", "stylus", "cp"], ->
  src = "static/nuxt/**/*.{js,map,svg}"
  dst = "static/nuxt/"

  pipes src, [
    $.gzip gzipOptions: level: 9
    gulp.dest dst
  ]

gulp.task "dev", ["api"], $.shell.task [
  "node server.js"
]
gulp.task "api", $.shell.task [
  "webpack --config config/webpack/index-node.coffee"
]

gulp.task "del", ->
  del [
    "static/nuxt/dist/*"
    "static/nuxt/css/*.{gz,br}"
    "static/nuxt/monaco-editor/*"
  ]

gulp.task "stylus", ->
  cp
    src: "assets/styl/*.styl.use"
    dst: 'static/nuxt/css/.'
    pipe: [
      $.sourcemaps.init()
      $.stylus
        compress: true
      $.sourcemaps.write "."
      $.brotli.compress quality: 11
    ]

gulp.task "cp", ["del"], ->
  cp
    src: "../../人狼議事 チーム フォルダ/web_work/images/portrate/*"
    dst: "static/images/portrate/."
  cp
    src: "node_modules/monaco-editor/min/**"
    dst: "static/nuxt/monaco-editor/."
  cp
    src: ".nuxt/dist/**"
    dst: "static/nuxt/dist/."


gulp.task "amazon", ["amazon:br", "amazon:gz", "amazon:face"]

gulp.task "amazon:gz", [], ->
  amazon
    src: 'static/**/*.gz'
    headers:
      'Cache-Control': 'max-age=43200, no-transform, public'
      'Content-Encoding': 'gzip'
    pipe: [
      $.rename extname: ""
    ]

gulp.task "amazon:br", [], ->
  amazon
    src: 'static/**/*.br'
    headers:
      'Cache-Control': 'max-age=43200, no-transform, public'
      'Content-Encoding': 'br'
    pipe: [
      $.rename extname: ""
    ]

gulp.task "amazon:face", [], ->
  amazon
    src: 'static/**/*.{jpg,png,zip}'
    headers:
      'Cache-Control': 'max-age=315360000, no-transform, public'

