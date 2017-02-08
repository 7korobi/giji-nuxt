dir = require "path"
{ spawn } = require "child_process"

class deploy
  constructor: ({ @source, @target, @ssh })->
  apply: (compiler)->
    path = @source ? compiler.options.output.path.replace process.cwd(), "."
    compiler.plugin "emit", (compilation, cb)=>
      for chunk in compilation.chunks
        for module in chunk.modules
          for filepath in module.fileDependencies
            filepath
        for filename in chunk.files
          dir.resolve path, filename

      cmd = """rsync -az --partial -e "ssh -i #{@ssh.key}" #{path} #{@target}"""
      attr =
        env: process.env
        cwd: process.cwd()
        stdio: "pipe"
      console.log cmd
      if "win32" == process.platform
        attr.windowsVerbatimArguments = true
      proc = spawn "bash", [cmd], attr
      proc.stdout.on "data", (data)-> console.log data.toString()
      proc.stderr.on "data", (data)-> console.log data.toString()
      proc.stderr.on "close", (code)->
        if code
          console.log "ERROR: #{code}"
      cb()

module.exports = deploy

