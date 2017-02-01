<script lang="coffee" src="~vue/_chrs.coffee"></script>
<style lang="stylus" scoped>

hr
  border-color: transparent
  margin: 2px

.expand-transition
  transition: all .3s ease

.expand-enter, .expand-leave
  height: 0
  padding: 0 10px
  opacity: 0

.list
  background: #000
  padding: 2px
  display: flex
  flex-direction:  row
  flex-wrap:       wrap
  align-items:     center
  align-content:   space-around
  justify-content: space-around


.list-move
  transition: transform 0.3s

.list-enter-to
  transition: all 0.2s ease 0.1s

.list-leave-to
  position: absolute

.list-enter,
.list-leave-to
  opacity: 0
  transform: translateY(30px)

.item
  flex-basis: auto
  max-width: 90px
  width:     90px
  IMG
    max-height: 130px
    height:     130px
    max-width: 90px
    width:     90px

IMG + .chrblank
    margin: -4px 1px 3px 1px
    padding: 0

.chrblank
  background: #444844
  color:      #CCF

  max-width:    88px
  width:        88px
  border-radius: 9px

  margin: 0 auto
  p
    height:       15px
    font-size:    11px
    text-align:  center
    white-space: nowrap

  .line2
    min-height: 34.5px
    height:     34.5px

</style>

<template lang="pug">
.top
  .btns
    span.tag
      tag#all
      tag#giji
      tag#shoji
      tag#travel
      tag#stratos
      tag#myth
      tag#asia
      tag#marchen

    span.tag
      tag#kid
      tag#young
      tag#middle
      tag#elder

    span.tag
      tag#river
      tag#road
      tag#immoral

    span.tag
      tag#guild
      tag#elegant
      tag#ecclesia

    span.tag
      tag#medical
      tag#market

    span.tag
      tag#apartment
      tag#servant
      tag#farm
      tag#government

    span.tag
      tag#god

    h6
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  transition-group.list(name="list" tag="div")
    .item(:id="chr._id", :key="chr._id", v-for="chr in chrs")
      img(:src="chr.path")
      .chrblank.line2
        p {{ job(chr._id) }}
        p {{ chr.name }}
</template>
