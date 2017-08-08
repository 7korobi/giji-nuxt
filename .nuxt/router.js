'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _26460e66 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _d988a500 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _126e656c = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _45e54146 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\ankers.vue' /* webpackChunkName: "pages/ankers" */)

const _8471841e = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _eef29fda = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _6fbb897d = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _3f090d08 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _718150c0 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _beb3c9bc = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _42ad62d8 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _74156ee2 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _6b82fb4a = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_book_id\\index.vue' /* webpackChunkName: "pages/sow-village-book_id" */)

const _4aa7c725 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _79d75b66 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_book_id\\top.vue' /* webpackChunkName: "pages/sow-village-book_id-top" */)



const scrollBehavior = function (to, from, savedPosition) {
      console.log({to, from});
      switch (false) {
        case !savedPosition:
          console.log("scroll to saved.");
          return savedPosition;
        case !to.hash:
          console.log("scroll to " + to.hash);
          return {
            selector: to.hash
          };
        case to.path === from.path:
          return {
            x: 0,
            y: 0
          };
        default:
          return false;
      }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
  		{
			path: "/",
			component: _26460e66,
			name: "index"
		},
		{
			path: "/rule-guide",
			component: _d988a500,
			name: "rule-guide"
		},
		{
			path: "/demo",
			component: _126e656c,
			name: "demo"
		},
		{
			path: "/ankers",
			component: _45e54146,
			name: "ankers"
		},
		{
			path: "/character-tag",
			component: _8471841e,
			name: "character-tag"
		},
		{
			path: "/demo/chats",
			component: _eef29fda,
			name: "demo-chats"
		},
		{
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
		},
		{
			path: "/sow/village",
			component: _3f090d08,
			name: "sow-village"
		},
		{
			path: "/demo/names",
			component: _718150c0,
			name: "demo-names"
		},
		{
			path: "/demo/books",
			component: _beb3c9bc,
			name: "demo-books"
		},
		{
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		},
		{
			path: "/demo/oauth",
			component: _74156ee2,
			name: "demo-oauth"
		},
		{
			path: "/sow/village/:book_id",
			component: _6b82fb4a,
			name: "sow-village-book_id"
		},
		{
			path: "/summary/faces/:id",
			component: _4aa7c725,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:book_id/top",
			component: _79d75b66,
			name: "sow-village-book_id-top"
		}
    ]
  })
}
