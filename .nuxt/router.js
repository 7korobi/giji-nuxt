'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _0bc4c6a4 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _90dbd578 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/index.vue' /* webpackChunkName: "pages/demo" */)

const _25e423ee = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _580b44c8 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _494ff80d = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _6cc1bfa2 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/summary/faces/index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _edd81ae6 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/sow/village/index.vue' /* webpackChunkName: "pages/sow-village" */)

const _db7effe4 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _616f631c = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/books.vue' /* webpackChunkName: "pages/demo-books" */)

const _324a98ba = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/names.vue' /* webpackChunkName: "pages/demo-names" */)

const _f282deee = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/demo/oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _386fde6c = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/sow/village/_book_id/index.vue' /* webpackChunkName: "pages/sow-village-book_id" */)

const _b0c17aec = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/summary/faces/_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _78f57200 = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/sow/village/_book_id/ankers.vue' /* webpackChunkName: "pages/sow-village-book_id-ankers" */)

const _6ca0c7cd = () => import('/Users/7korobi/Dropbox/www/giji-nuxt/pages/sow/village/_book_id/top.vue' /* webpackChunkName: "pages/sow-village-book_id-top" */)



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
			component: _0bc4c6a4,
			name: "index"
		},
		{
			path: "/demo",
			component: _90dbd578,
			name: "demo"
		},
		{
			path: "/rule-guide",
			component: _25e423ee,
			name: "rule-guide"
		},
		{
			path: "/character-tag",
			component: _580b44c8,
			name: "character-tag"
		},
		{
			path: "/demo/chats",
			component: _494ff80d,
			name: "demo-chats"
		},
		{
			path: "/summary/faces",
			component: _6cc1bfa2,
			name: "summary-faces"
		},
		{
			path: "/sow/village",
			component: _edd81ae6,
			name: "sow-village"
		},
		{
			path: "/demo/timeago",
			component: _db7effe4,
			name: "demo-timeago"
		},
		{
			path: "/demo/books",
			component: _616f631c,
			name: "demo-books"
		},
		{
			path: "/demo/names",
			component: _324a98ba,
			name: "demo-names"
		},
		{
			path: "/demo/oauth",
			component: _f282deee,
			name: "demo-oauth"
		},
		{
			path: "/sow/village/:book_id",
			component: _386fde6c,
			name: "sow-village-book_id"
		},
		{
			path: "/summary/faces/:id",
			component: _b0c17aec,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:book_id/ankers",
			component: _78f57200,
			name: "sow-village-book_id-ankers"
		},
		{
			path: "/sow/village/:book_id/top",
			component: _6ca0c7cd,
			name: "sow-village-book_id-top"
		}
    ]
  })
}
