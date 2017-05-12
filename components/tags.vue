<template lang="pug">
p.form
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
</template>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
_ = require "lodash"

module.exports =
  default: _.merge {}, require("./tag.vue").parent, {}

</script>
