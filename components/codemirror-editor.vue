<template lang="pug">
div(v-once)
</template>

<script lang="coffee">

if window?
  window.CodeMirror = require('codemirror')
  require 'codemirror/mode/meta'
  require 'codemirror/mode/markdown/markdown.js'

require 'codemirror/lib/codemirror.css'
require 'codemirror/theme/elegant.css'


module.exports =
  default:
    props:
      value: String
      maxRow:
        type: Number
        default: 1

    data: ->
      value_past: ""
      editor: null

    mounted: ->
      return unless window?

      @editor = CodeMirror @$el,
        mode: "markdown"
        theme: "elegant"

        indentUnit: 2
        tabSize:    4

        readOnly:    false
        lineNumbers:  true
        lineWrapping: true
        addModeClass: false

        inputStyle: "contenteditable"
        scrollbarStyle: "null"
        showCursorWhenSelecting: true
        resetSelectionOnContextMenu: true

        lineWiseCopyCut:       false
        pasteLinesPerSelection: true

      @editor.setExtending false
      @editor.setValue @value
      @editor.on 'change', =>
        @value_past = @editor.getValue()
        @$emit 'input', @value_past

      [ 'changes',
        'beforeChange',
        'cursorActivity',
        'keyHandled',
        'inputRead',
        'electricInput',
        'beforeSelectionChange',
        'viewportChange',
        'swapDoc',
        'gutterClick',
        'gutterContextMenu',
        'focus',
        'blur',
        'refresh',
        'optionChange',
        'scrollCursorIntoView',
        'update'
      ].map (event)=>
        @editor.on event, (args...)=>
          @$emit event, args...

    beforeDestroy: ->
      return unless window?
      # garbage cleanup
      @editor.doc.cm.getWrapperElement().remove()

    watch:
      value: (newStr, oldStr)->
        @value_past = @editor.getValue()
        return if newStr == @value_past

        { left, top } = scroll = @editor.getScrollInfo()
        console.log scroll

        @editor.setValue newStr
        @editor.scrollTo x: left, y: top
    
</script>