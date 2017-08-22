'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _f1048964 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _3a53eb0b = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _f63558c2 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _4b01ef72 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _95e722fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _6be40015 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _379d8e3a = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _09806650 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _67dc6458 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _1d9d7386 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _2a3129fe = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _5b5d93e6 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _494e8978 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages/sow-village-idx-anker" */)

const _ebdd3d22 = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages/sow-village-idx-mode" */)

const _80ef296a = () => import('D:\\Dropbox\\www\\giji-nuxt\\pages\\user\\_id.vue' /* webpackChunkName: "pages/user-id" */)



const scrollBehavior = function (to, from, savedPosition) {
      var basic, book, has_top;
      book = function(idx_limit, has_top, to, from) {
        [from, to] = [from, to].map(function(o) {
          var name, part, ref;
          name = o.params.mode || o.name;
          part = (ref = o.params.idx) != null ? ref.split("-").slice(0, +idx_limit + 1 || 9e9).join("-") : void 0;
          return `${name} ${part}`;
        });
        if (from !== to) {
          console.log(`scroll to TOP (${from} != ${to})`);
          return {
            x: 0,
            y: 0
          };
        }
      };
      basic = function(has_top, to) {
        console.log({to, from});
        switch (false) {
          case from.path === to.path:
            console.log(`scroll to TOP (${from.path} != ${to.path})`);
            return {
              x: 0,
              y: 0
            };
          case !has_top:
            console.log("scroll to TOP (has scrollToTop)");
            return {
              x: 0,
              y: 0
            };
        }
      };
      switch (false) {
        case !savedPosition:
          console.log("scroll restore", savedPosition);
          return savedPosition;
        case !to.hash:
          console.log("scroll to " + to.hash);
          return {
            selector: to.hash
          };
        default:
          has_top = to.matched.some(function(r) {
            return r.components.default.options.scrollToTop;
          });
          switch (to.name) {
            case "sow-village-idx-mode":
              return book(2, has_top, to, from);
            case "sow-village-idx-anker":
              return book(1, has_top, to, from);
            default:
              return basic(has_top, to, from);
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
			path: "/demo/names",
			component: _95e722fe,
			name: "demo-names"
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
			path: "/demo/oauth",
			component: _09806650,
			name: "demo-oauth"
		},
		{
			path: "/demo/chats",
			component: _67dc6458,
			name: "demo-chats"
		},
		{
			path: "/sow/village",
			component: _1d9d7386,
			name: "sow-village"
		},
		{
			path: "/summary/faces",
			component: _2a3129fe,
			name: "summary-faces"
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
		},
		{
			path: "/user/:id?",
			component: _80ef296a,
			name: "user-id"
		}
    ]
  })
}
