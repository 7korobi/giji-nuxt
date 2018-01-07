sh = require 'child_process'

module.exports =
  name: 'aggregate'
  every: '12 hours'
  define: (job, done)->
    sh.exec "curl http:#{env.url.api}/aggregate/job", (err, stdout, stderr)->
      sh.exec "./static/sow.sh", (err, stdout, stderr)->
        if err
          console.error err
        else
          console.log stderr
