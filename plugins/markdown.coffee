marked = require 'marked-pre'
mermaid = require 'mermaid'

mermaidAPI = mermaid.mermaidAPI
mermaidAPI.initialize
  startOnLoad: false

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
          """<span class="btn" title="#{title}"><ruby>#{text}<rp>《</rp><rt>#{href}</rt><rp>》</rp></ruby></span>"""

giji_renderer = Object.assign new marked.Renderer(),
  link: link

giji_options =
  renderer: giji_renderer
  tag: 'article'
  gfm: true
  tables: true
  indentCode: false
  taskLists: true
  breaks: true
  pedantic: false
  sanitize: true
  smartLists: true
  smartypants: true


idx = 0
mermaid = (text, cb)->
  mermaidAPI.render "mermaid-#{idx++}", text, cb

center = giji = (text, cb)->
  cb marked text, giji_options

sow = head = mono = (text, cb)->
  text = text
  .replace ///<br>///g, "\n"

  .replace ///^\s*([~=＝…ー－―‐-])\1{4,}\s*$///gm, "<hr>"

  .replace ///<strong>([^<]*?)<\/strong><sup>([^<]*?)</sup>///g, (tag, item, title, idx, src)->
    """<abbr title="#{title}">#{item}</abbr>"""

  .replace ///<a\ title="([^"]*?)"><strong>([^<]*?)</strong></a>///g, (tag, title, item, idx, src)->
    """<abbr title="#{title}">#{item}</abbr>"""

  .replace /// ((\/\*) ([\s\S]*?) (\*\/|$)) ///g, (human)->
    """<del>#{human}</del>"""

  .replace ///[a-z]+://[^\s<]+[^<.,:;"')\]\s]///g, (url, idx, src)->
    return url if '<a href="' == src[idx - 9 ... idx].toLowerCase()
    suffix = ""
    url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
      suffix = last
      ""
    link(url) + suffix

  cb """<article>#{text}</article>"""
  return

module.exports = { sow, head, mono, giji, center, mermaid }
