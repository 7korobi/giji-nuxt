<template lang="pug">
div(v-once :style="style", key="ace-editor")
</template>
 
<script lang="coffee">

module.exports =
  default:
    props:
      value: String
      minRow:
        type: Number
        default: 1
      maxRow:
        type: Number
        default: 1

    data: ->
      value_past: ""
      editor: null

    mounted: ->
      return unless window?
      # see https://github.com/ajaxorg/ace/wiki/Configuring-Ace

      @editor = window.ace.edit @$el
      # @editor.session.setMode "ace/mode/markdown"
      # @editor.setTheme "ace/theme/chrome"
      @editor.$blockScrolling = Infinity

      @editor.setOptions
        wrap: "free"
        readOnly: false
        cursorStyle: "wide"
        selectionStyle: "line"
        mergeUndoDeltas: true
        autoScrollEditorIntoView: true

        behavioursEnabled: true
        wrapBehavioursEnabled: true
        highlightActiveLine: true
        highlightSelectedWord: true

      @editor.renderer.setOptions 
        fontSize: 16
        scrollPastEnd: false
        showInvisibles: true
        showLineNumbers: true
        displayIndentGuides: true

        maxLines: @maxRow
        minLines: @minRow
        showGutter: true
        # fixedWidthGutter:
        fadeFoldWidgets: false
        showFoldWidgets: "markbeginend"
        showPrintMargin: true
        # printMarginColumn: 
        # printMargin: 
        hScrollBarAlwaysVisible: false
        vScrollBarAlwaysVisible: true
      
      s = @editor.getSession()
      s.setOptions
        overwrite: false
        newLineMode: false
        useWrapMode: true
        useSoftTabs: false
        # NavigateWithinSoftTabs true
        # firstLineNumber:

      @editor.setValue @value, 1
      s.on 'change', =>
        console.log "c", @value_past = @editor.getValue()
        @$emit "input", @value_past

      ###
      s.selection.on 'changeSelection', (e)=>
        @$emit "changeSelection", e
      s.selection.on 'changeCursor', (e)=>
        @$emit "changeCursor", e

      @editor.$mouseHandler.setOptions
        scrollSpeed: number
        dragDelay:  number
        dragEnabled:
        focusTimout: number
        tooltipFollowsMouse:
      ###

      { session, renderer, $mouseHandler } = @editor
      console.log { @editor, session, renderer, $mouseHandler }
 
    watch:
      value: (newStr, oldStr)->
        return unless window?
        return if newStr == @value_past
        console.log "w", @value_past

        @editor.setValue newStr, 1

    computed:
      style: ->
        width: "100%"

</script>


