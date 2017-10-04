endpoint = "http://s3-ap-northeast-1.amazonaws.com"
watchDir = "./static/"
topPrefix = ""

StorageClass = "REDUCED_REDUNDANCY"
Bucket   = "giji-assets"


watch = require 'node-watch'
AWS = require 'aws-sdk'
mime = require 'mime'

fs = require 'fs'
path = require 'path'
glob = require 'glob'
moment = require 'moment'

util = require 'util'

cluster = require 'cluster'
numCPUs = require('os').cpus().length

AWS.config = new AWS.Config

s3 = new AWS.S3()
s3sync = new AWS.S3 { endpoint }


file_worker = (idx)->
  worker = cluster.fork()
  recursive = true
  filter = (path)->
    return false if path.basename(path).charAt(0) == "."
    return true
  watch watchDir, { recursive, filter }, (action, path)->
    worker.send { path, action }

file_entry = (o)->
  glob o.path, {}, (err, paths)->
    for path in paths
      fs.stat path, (err, stats)->
        if stats
          return unless stats.size
          return if stats.isDirectory()
          o.mtime = stats.mtime
        file_upload o

file_upload = (o)->
  fs.readFile o.path, (err, Body)->
    mtime = moment.utc o.mtime
    stamp = mtime.format "ddd, DD MMM YYYY HH:mm:ss [GMT]"

    Key = topPrefix + o.path
    ContentType = mime.lookup o.path
    Metadata =
      mtime: stamp
      'Cache-Control': 'max-age=315360000, no-transform, public'
    #  'Content-Encoding': 'gzip'

    params = { Bucket, Key, Body, ContentType, Metadata, StorageClass }
    switch o.action
      when "update"
        s3.putObject params, (err, res)->
          return if err
      when "remove"
        s3.deleteObject params, (err, res)->
          return if err


if cluster.isMaster
  for idx in [0..numCPUs]
    file_worker idx

else
  process.on 'message', file_entry
