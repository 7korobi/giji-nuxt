
<template lang="pug">
.text-editor
  textarea(@input="update($event)", :value="value", :rows="areaRow")
  i.fa(:class="mark")
    | {{size}}/
    span.per {{maxSize}}字
    | {{row}}/
    span.per {{maxRow}}行
</template>

<style lang="stylus" scoped>
.per
  vertical-align: -0.2em
  font-size:       0.7em
  margin:  0 0 0  -0.2em
  padding: 0
  display: inline

.fa-check
  color: #060
.fa-warning
  color: #660
.fa-ban
  color: #600
</style>

<script lang="coffee">

module.exports =
  default:
    props:
      value:
        type: String
        required: true
      maxSize:
        type: Number
        default: 100
      maxRow:
        type: Number
        default: 1
      minRow:
        type: Number
        default: 1
    methods:
      update: (e)->
        @$emit 'input', e.target.value

    computed:
      ban: ->
        ban = false
        ban ||= @maxSize < @size
        ban ||= @row < @minRow
        ban ||= @maxRow < @row
        ban
      warn: ->
        ok = true
        ok &&= ! @value.match ///>>///
        ! ok
      mark: ->
        m = "fa-check"
        m = "fa-warning" if @warn
        m = "fa-ban"     if @ban
        [m]

      size: ->
        @value.length
      row: ->
        @value.split("\n").length
      areaRow: ->
        return @minRow if @row < @minRow
        return @maxRow if @maxRow < @row
        return @row

</script>