
<template lang="pug">
div
  span
    btn(as="title", :value="value" @input="tap")
      | タイトル
      sup(v-if="part") {{ chats.title.list.all }}
    btn(as="memo", :value="value" @input="tap")
      | メモ
      sup(v-if="part") {{ chats.memo.list.all }}
  span
    btn(as="normal", :value="value" @input="tap")
      | 通常
      sup(v-if="part") {{ chats.normal.list.all }}
  span
    btn(as="solo", :value="value" @input="tap")
      | 独り言
      sup(v-if="part") {{ chats.solo.list.all }}
    btn(as="extra", :value="value" @input="tap")
      | 非日常
      sup(v-if="part") {{ chats.extra.list.all }}
    btn(as="rest", :value="value" @input="tap")
      | 墓休み
      sup(v-if="part") {{ chats.rest.list.all }}
  span
    btn(as="full", :value="value" @input="tap")
      | バレ
      sup(v-if="part") {{ chats.full.list.all }}

</template>

<script lang="coffee">

module.exports =
  default:
    props: ["value", "chats"]
    data: ->
      {}

    methods:
      tap: (value)->
        @$emit 'input', value

</script>
