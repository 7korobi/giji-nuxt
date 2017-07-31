'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _f1048964 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _3a53eb0b = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _f63558c2 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _4b01ef72 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _67dc6458 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _2a3129fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _1d9d7386 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _6be40015 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _379d8e3a = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _95e722fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _09806650 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _5cd48acb = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_book_id\\index.vue' /* webpackChunkName: "pages/sow-village-book_id" */)

const _5b5d93e6 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _6c080d1f = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_book_id\\ankers.vue' /* webpackChunkName: "pages/sow-village-book_id-ankers" */)

const _c25463e4 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_book_id\\top.vue' /* webpackChunkName: "pages/sow-village-book_id-top" */)



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
			component: _f1048964,
			name: "index"
		},
		{
			path: "/demo",
			component: _3a53eb0b,
			name: "demo"
		},
		{
			path: "/rule-guide",
			component: _f63558c2,
			name: "rule-guide"
		},
		{
			path: "/character-tag",
			component: _4b01ef72,
			name: "character-tag"
		},
		{
			path: "/demo/chats",
			component: _67dc6458,
			name: "demo-chats"
		},
		{
			path: "/summary/faces",
			component: _2a3129fe,
			name: "summary-faces"
		},
		{
			path: "/sow/village",
			component: _1d9d7386,
			name: "sow-village"
		},
		{
			path: "/demo/timeago",
			component: _6be40015,
			name: "demo-timeago"
		},
		{
			path: "/demo/books",
			component: _379d8e3a,
			name: "demo-books"
		},
		{
			path: "/demo/names",
			component: _95e722fe,
			name: "demo-names"
		},
		{
			path: "/demo/oauth",
			component: _09806650,
			name: "demo-oauth"
		},
		{
			path: "/sow/village/:book_id",
			component: _5cd48acb,
			name: "sow-village-book_id"
		},
		{
			path: "/summary/faces/:id",
			component: _5b5d93e6,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:book_id/ankers",
			component: _6c080d1f,
			name: "sow-village-book_id-ankers"
		},
		{
			path: "/sow/village/:book_id/top",
			component: _c25463e4,
			name: "sow-village-book_id-top"
		}
    ]
  })
}
