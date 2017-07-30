module.exports =
  static:
    maxAge: '1y'
    setHeaders: (res, path, stat)->
      console.log stat
      if /\.json\.gz$/.test path
        res.setHeader 'Content-Type', 'application/javascript'
        res.setHeader 'Content-Encoding', 'gzip'

  gzip:
    threshold: 0
  etag:
    weak: true

