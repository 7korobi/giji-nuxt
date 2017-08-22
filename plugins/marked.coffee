module.exports = marked = require 'marked'

renderer = new marked.Renderer()

renderer.paragraph = (text)->
  text

renderer.em = (text)->
  text

renderer.link = (href, title, text)->
  console.log [href, title, text]
  if text && href != text
    title ?= text
  else
    [text, hostname] = href.split(///\://|/|\?|\#///g)
    title = [text, hostname].join("\n")
  """<b chk="confirm" href="#{href}" title="#{title}">#{text}</b>"""

marked.setOptions
  renderer: renderer
  gfm: true
  tables: true
  breaks: true
  pedantic: false
  sanitize: false
  smartLists: true
  smartypants: true

