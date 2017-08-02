sh = require 'child_process'
{ API_URL } = process.env

module.exports =
  every: '12 hours'
  define: (job, done)->
    sh.exec "curl #{API_URL}/aggregate/job", (err, stdout, stderr)->
      sh.exec "./static/sow.sh", (err, stdout, stderr)->
        if err
          console.error err
        else
          console.log stderr

