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
  gulp.watch ["config/**", "api/**"], ["test", "api"]
  gulp.start ["api", "cp", "stylus"], $.shell.task [
    "node server.js"
  ]



gulp.task "prod", ["api", "build", "cp:dist", "cp", "stylus"], $.shell.task [
  "gzip -9rf static/nuxt"
]
gulp.task "dev", ["api"], $.shell.task [
  "node server.js"
]
gulp.task "test", $.shell.task [
  "yarn test"
]
gulp.task "api", $.shell.task [
  "yarn run api"
]
gulp.task "build", ["del"], $.shell.task [
  "yarn run build"
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
    ]


gulp.task "del", [], ->
  del [
    "static/nuxt/dist/*"
    "static/nuxt/monaco-editor/*"
    "static/nuxt/css/*.gz"
  ]


gulp.task "cp", ["del", "cp:monaco", "cp:portrate"]
gulp.task "cp:portrate", ->
  cp
    src: "../../人狼議事 チーム フォルダ/web_work/images/portrate/*"
    dst: "static/images/portrate/."
gulp.task "cp:monaco", ["del"], ->
  cp
    src: "node_modules/monaco-editor/min/**"
    dst: "static/nuxt/monaco-editor/."
gulp.task "cp:dist", ["del", "build"], ->
  cp
    src: ".nuxt/dist/**"
    dst: "static/nuxt/dist/."


gulp.task "amazon", ["amazon:gz", "amazon:face"]
gulp.task "amazon:gz", [], ->
  amazon
    src: 'static/**/*.gz'
    headers:
      'Cache-Control': 'max-age=43200, no-transform, public'
      'Content-Encoding': 'gzip'
    pipe: [
      $.rename extname: ""
    ]

gulp.task "amazon:face", ["cp:portrate"], ->
  amazon
    src: 'static/{images}/**/*'
    headers:
      'Cache-Control': 'max-age=315360000, no-transform, public'

