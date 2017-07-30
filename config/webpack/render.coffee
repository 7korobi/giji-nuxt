module.exports =
  static:
    extensions: ["gz"]
    setHeaders: (res, path, stat)->
      console.log path
      # res.setHeader

  gzip:
    threshold: 0
  etag:
    weak: true

