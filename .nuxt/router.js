'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _26460e66 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */)

const _d988a500 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\rule-guide.vue' /* webpackChunkName: "pages/rule-guide" */)

const _58095ef8 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\book\\index.vue' /* webpackChunkName: "pages/book" */)

const _8471841e = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\character-tag.vue' /* webpackChunkName: "pages/character-tag" */)

const _126e656c = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\index.vue' /* webpackChunkName: "pages/demo" */)

const _42ad62d8 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages/demo-timeago" */)

const _486a8927 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\markdown.vue' /* webpackChunkName: "pages/demo-markdown" */)

const _6fbb897d = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages/summary-faces" */)

const _718150c0 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\names.vue' /* webpackChunkName: "pages/demo-names" */)

const _74156ee2 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages/demo-oauth" */)

const _eef29fda = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\chats.vue' /* webpackChunkName: "pages/demo-chats" */)

const _beb3c9bc = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\demo\\books.vue' /* webpackChunkName: "pages/demo-books" */)

const _3f090d08 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages/sow-village" */)

const _4aa7c725 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages/summary-faces-id" */)

const _08e1dd12 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages/sow-village-idx-anker" */)

const _3c51e96e = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages/sow-village-idx-mode" */)

const _80025d6c = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\user\\_id.vue' /* webpackChunkName: "pages/user-id" */)

const _16c3827f = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\book\\_idx\\anker.vue' /* webpackChunkName: "pages/book-idx-anker" */)

const _57865a76 = () => import('C:\\Dropbox\\www\\giji-nuxt\\pages\\book\\_idx\\_mode.vue' /* webpackChunkName: "pages/book-idx-mode" */)



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
			component: _26460e66,
			name: "index"
		},
		{
			path: "/rule-guide",
			component: _d988a500,
			name: "rule-guide"
		},
		{
			path: "/book",
			component: _58095ef8,
			name: "book"
		},
		{
			path: "/character-tag",
			component: _8471841e,
			name: "character-tag"
		},
		{
			path: "/demo",
			component: _126e656c,
			name: "demo"
		},
		{
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		},
		{
			path: "/demo/markdown",
			component: _486a8927,
			name: "demo-markdown"
		},
		{
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
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
			path: "/demo/chats",
			component: _eef29fda,
			name: "demo-chats"
		},
		{
			path: "/demo/books",
			component: _beb3c9bc,
			name: "demo-books"
		},
		{
			path: "/sow/village",
			component: _3f090d08,
			name: "sow-village"
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
		},
		{
			path: "/user/:id?",
			component: _80025d6c,
			name: "user-id"
		},
		{
			path: "/book/:idx/anker",
			component: _16c3827f,
			name: "book-idx-anker"
		},
		{
			path: "/book/:idx/:mode?",
			component: _57865a76,
			name: "book-idx-mode"
		}
    ]
  })
}
