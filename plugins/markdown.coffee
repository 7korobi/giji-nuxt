marked = require 'marked'

nop = (text)-> text
link = (href, title, text)->
  if text && href != text
    title ?= text
  else
    [text, hostname] = href.split(///\://|/|\?|\#///g)
    title = [text, hostname].join("\n")
  switch href
    when null, undefined, "", "#"
      """<b title="#{title}">#{text}</b>"""
    else
      """<b chk="confirm" href="#{href}" title="#{title}">#{text}</b>"""

giji_renderer = Object.assign new marked.Renderer(), { link }

giji_options =
  renderer: giji_renderer
  tag: 'article'
  gfm: true
  tables: true
  breaks: true
  pedantic: false
  sanitize: false
  smartLists: true
  smartypants: true

giji = (text)->
  lexer = new marked.Lexer giji_options
  tokens = lexer.lex text
  marked text, giji_options


sow = head = mono = (text)->
  text
  .replace ///<br>///g, "\n"

  .replace ///<a\ title="(.*?)"><strong>(.*?)</strong></a>///g, (tag, title, item, idx, src)->
    """<strong title="#{title}">#{item}</strong>"""

  .replace ///[a-z]+://[^\s<]+[^<.,:;"')\]\s]///g, (url, idx, src)->
    return url if '<a href="' == src[idx - 9 ... idx].toLowerCase()
    suffix = ""
    url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
      suffix = last
      ""
    link(url) + suffix

  .replace /// ((\/\*) ([\s\S]*?) (\*\/|$)) ///g, (human)->
    """<del>#{human}</del>"""

module.exports = { sow, head, mono, giji }
