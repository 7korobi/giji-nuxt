marked = require 'marked'
mermaid = require 'mermaid'

mermaidAPI = mermaid.mermaidAPI
mermaidAPI.initialize
  startOnLoad: false

nop = (text)-> text
block = (tag)-> (text)-> "<#{tag}>#{text}</#{tag}>"

link = (href, title, text)->
  if text && href != text
    title ?= text
  else
    [text, hostname] = href.split(///\://|/|\?|\#///g)
    title = [text, hostname].join("\n")
  switch href
    when null, undefined, "", "#"
      if title == text
        """<b>#{text}</b>"""
      else
        """<b title="#{title}">#{text}</b>"""
    else
      if href.match  ///(#{text}|:\/\/|^\/)///g
        if title == text
          """<b chk="confirm" href="#{href}">#{text}</b>"""
        else
          """<b chk="confirm" href="#{href}" title="#{title}">#{text}</b>"""
      else
        if title == text
          """<ruby>#{text}<rp>《</rp><rt>#{href}</rt><rp>》</rp></ruby>"""
        else
          """<ruby title="#{title}">#{text}<rp>《</rp><rt>#{href}</rt><rp>》</rp></ruby>"""

giji_renderer = Object.assign new marked.Renderer(),
  link: link
  #heading: (text, level, raw)->

  code: ->

  table: (head, body)->
    """<table><thead>#{head}</thead>#{body}<tbody></tbody></table>"""

  list: (body, ordered)->
    tag = if ordered then 'ol' else 'ul'
    block(tag)(body)

  hr: -> "<hr>"
  listitem: block "li"
  paragraph: block "p"
  blockquote: block "blockquote"


giji_options =
  renderer: giji_renderer
  tag: 'article'
  gfm: true
  tables: true
  breaks: true
  pedantic: false
  sanitize: true
  smartLists: true
  smartypants: true

idx = 0
mermaid = (text, el)->
  console.log text
  mermaidAPI.render "mermaid-#{idx++}", text, (svg)->
    console.log svg
    el.innerHTML = svg

center = giji = (text, el)->
  lexer = new marked.Lexer giji_options
  tokens = lexer.lex text
  el.innerHTML = marked text, giji_options

sow = head = mono = (text, el)->
  el.innerHTML = text
  .replace ///<br>///g, "\n"

  .replace ///<strong>([^<]*?)<\/strong><sup>([^<]*?)</sup>///g, (tag, item, title, idx, src)->
    """<abbr title="#{title}">#{item}</abbr>"""
  .replace ///<a\ title="([^"]*?)"><strong>([^<]*?)</strong></a>///g, (tag, title, item, idx, src)->
    """<abbr title="#{title}">#{item}</abbr>"""

  .replace ///[a-z]+://[^\s<]+[^<.,:;"')\]\s]///g, (url, idx, src)->
    return url if '<a href="' == src[idx - 9 ... idx].toLowerCase()
    suffix = ""
    url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
      suffix = last
      ""
    link(url) + suffix

  .replace /// ((\/\*) ([\s\S]*?) (\*\/|$)) ///g, (human)->
    """<del>#{human}</del>"""

module.exports = { sow, head, mono, giji, center, mermaid }
