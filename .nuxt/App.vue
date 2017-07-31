<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
import NuxtLoading from './components/nuxt-loading.vue'


let layouts = {

  "_book": () => import('D:\\Dropbox\\www\\giji-nuxt\\layouts\\book.vue'  /* webpackChunkName: "layouts/book" */),

  "_default": () => import('D:\\Dropbox\\www\\giji-nuxt\\layouts\\default.vue'  /* webpackChunkName: "layouts/default" */),

  "_sow-log": () => import('D:\\Dropbox\\www\\giji-nuxt\\layouts\\sow-log.vue'  /* webpackChunkName: "layouts/sow-log" */)

}

export default {
  head: {"title":"人狼議事","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=0.5, shrink-to-fit=no"},{"hid":"description","content":"Nuxt.js project"},{"href":"mailto:7korobi@gmail.com"}],"link":[{"rel":"stylesheet","type":"text/css","href":"https://use.fontawesome.com/6348868528.css"},{"rel":"stylesheet","type":"text/css","href":"/css/index.css"},{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"href":"mailto:7korobi@gmail.com"}],"script":[{"src":"/monaco-editor/vs/loader.js","type":"text/javascript","charset":"utf8"}],"style":[]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  
  mounted () {
    this.$loading = this.$refs.loading
    this.$nuxt.$loading = this.$loading
  },
  
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = layouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      let _layout = '_' + layout
      if (typeof layouts[_layout] !== 'function') {
        return Promise.resolve(layouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        return layouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>

