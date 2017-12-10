sh = require 'child_process'
{ API_URL } = process.env

module.exports =
  name: 'process'
  every: '2 minutes'
  define: (job, done)->
    sh.exec 'ps uafxS | grep -v ^root', (err, stdout, stderr)->
      if err
        console.error err
        console.error stderr
      else
        console.log stdout  
