conf = require 'config'
gulp = require 'gulp'
$ = require('gulp-load-plugins')()

src =
  amazon:
    face:  'static/{images}/**/*'
    gz:    'static/**/*.gz'

amazon = (headers, cb)->
  giji = $.awspublish.create conf.aws
  options = {}

  cb()
  .pipe giji.publish headers, options
  .pipe giji.cache()
  .pipe $.awspublish.reporter
    states: [
      'create'
      'update'
      'delete'
#        'cache'
#        'skip'
    ]

# "amazon": "cp -r static/css static/monaco-editor ../giji_assets_chr_add/public/nuxt/. && gzip -9rf ../giji_assets_chr_add/public/nuxt",

gulp.task "default", [], ->
  gulp.watch "assets/styl/*.styl.use", ["stylus"]
  gulp.start []

gulp.task "stylus", [], ->
  console.log "changed."

gulp.task "amazon", ["amazon:gz", "amazon:face"], ->

gulp.task "amazon:gz", [], ->
  headers =
    'Cache-Control': 'max-age=43200, no-transform, public'
    'Content-Encoding': 'gzip'
  amazon headers, ->
    gulp
    .src [src.amazon.gz]
    .pipe $.rename extname: ""

gulp.task "amazon:face", [], ->
  headers =
    'Cache-Control': 'max-age=315360000, no-transform, public'
  amazon headers, ->
    gulp
    .src [src.amazon.face]
