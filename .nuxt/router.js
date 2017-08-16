'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _26460e66 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _126e656c = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _8471841e = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _d988a500 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _eef29fda = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _6fbb897d = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _3f090d08 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _718150c0 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _74156ee2 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _beb3c9bc = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _42ad62d8 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _4aa7c725 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _08e1dd12 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages/sow-village-idx-anker" */)

const _3c51e96e = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages/sow-village-idx-mode" */)



const scrollBehavior = function (to, from, savedPosition) {
      var basic, book, has_top;
      book = function(idx_limit, has_top, to, from) {
        var from_name, from_part, to_name, to_part;
        [from_part, to_part] = [from, to].map(function(o) {
          var ref;
          return (ref = o.params.idx) != null ? ref.split("-").slice(0, +idx_limit + 1 || 9e9).join("-") : void 0;
        });
        from_name = from.params.mode || from.name;
        to_name = to.params.mode || to.name;
        if (from_part + from_name !== to_part + to_name) {
          console.log(`scroll to TOP (${from_name} != ${to_name})`);
          return {
            x: 0,
            y: 0
          };
        }
      };
      basic = function(has_top, to) {
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
      console.log({to, from});
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
			component: _26460e66,
			name: "index"
		},
		{
			path: "/demo",
			component: _126e656c,
			name: "demo"
		},
		{
			path: "/character-tag",
			component: _8471841e,
			name: "character-tag"
		},
		{
			path: "/rule-guide",
			component: _d988a500,
			name: "rule-guide"
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
			path: "/demo/oauth",
			component: _74156ee2,
			name: "demo-oauth"
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
			path: "/summary/faces/:id",
			component: _4aa7c725,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:idx/anker",
			component: _08e1dd12,
			name: "sow-village-idx-anker"
		},
		{
			path: "/sow/village/:idx/:mode?",
			component: _3c51e96e,
			name: "sow-village-idx-mode"
		}
    ]
  })
}
