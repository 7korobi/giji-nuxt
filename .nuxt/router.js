'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _f1048964 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _3a53eb0b = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _4b01ef72 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _f63558c2 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _67dc6458 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _2a3129fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _1d9d7386 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _95e722fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _09806650 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _379d8e3a = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _6be40015 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _5b5d93e6 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _494e8978 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages/sow-village-idx-anker" */)

const _ebdd3d22 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages/sow-village-idx-mode" */)



const scrollBehavior = function (to, from, savedPosition) {
      var basic, book;
      book = function(to, from) {
        var from_book, to_book;
        [from_book, to_book] = [from, to].map(function(o) {
          var ref;
          return (ref = o.params.idx) != null ? ref.split("-").slice(0, 2).join("-") : void 0;
        });
        if (from_book !== to_book) {
          return {
            x: 0,
            y: 0
          };
        }
      };
      basic = function(to) {
        switch (false) {
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
      };
      console.log({to, from});
      console.log(to.name);
      if (savedPosition) {
        console.log("scroll to saved.");
        return savedPosition;
      } else {
        switch (to.name) {
          case "sow-village-idx-mode":
          case "sow-village-idx-anker":
            return book(to, from);
          default:
            return basic(to, from);
        }
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
			path: "/character-tag",
			component: _4b01ef72,
			name: "character-tag"
		},
		{
			path: "/rule-guide",
			component: _f63558c2,
			name: "rule-guide"
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
			path: "/demo/books",
			component: _379d8e3a,
			name: "demo-books"
		},
		{
			path: "/demo/timeago",
			component: _6be40015,
			name: "demo-timeago"
		},
		{
			path: "/summary/faces/:id",
			component: _5b5d93e6,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:idx/anker",
			component: _494e8978,
			name: "sow-village-idx-anker"
		},
		{
			path: "/sow/village/:idx/:mode?",
			component: _ebdd3d22,
			name: "sow-village-idx-mode"
		}
    ]
  })
}
