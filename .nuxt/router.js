import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _26460e66 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _d988a500 = () => import('..\\pages\\rule-guide.vue' /* webpackChunkName: "pages\\rule-guide" */).then(m => m.default || m)
const _20cded32 = () => import('..\\pages\\mypage\\index.vue' /* webpackChunkName: "pages\\mypage\\index" */).then(m => m.default || m)
const _58095ef8 = () => import('..\\pages\\book\\index.vue' /* webpackChunkName: "pages\\book\\index" */).then(m => m.default || m)
const _126e656c = () => import('..\\pages\\demo\\index.vue' /* webpackChunkName: "pages\\demo\\index" */).then(m => m.default || m)
const _8471841e = () => import('..\\pages\\character-tag.vue' /* webpackChunkName: "pages\\character-tag" */).then(m => m.default || m)
const _42ad62d8 = () => import('..\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages\\demo\\timeago" */).then(m => m.default || m)
const _6fbb897d = () => import('..\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages\\summary\\faces\\index" */).then(m => m.default || m)
const _0bc1fc38 = () => import('..\\pages\\demo\\marked.vue' /* webpackChunkName: "pages\\demo\\marked" */).then(m => m.default || m)
const _74156ee2 = () => import('..\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages\\demo\\oauth" */).then(m => m.default || m)
const _eef29fda = () => import('..\\pages\\demo\\chats.vue' /* webpackChunkName: "pages\\demo\\chats" */).then(m => m.default || m)
const _3f090d08 = () => import('..\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages\\sow\\village\\index" */).then(m => m.default || m)
const _486a8927 = () => import('..\\pages\\demo\\markdown.vue' /* webpackChunkName: "pages\\demo\\markdown" */).then(m => m.default || m)
const _718150c0 = () => import('..\\pages\\demo\\names.vue' /* webpackChunkName: "pages\\demo\\names" */).then(m => m.default || m)
const _242178d2 = () => import('..\\pages\\book\\new.vue' /* webpackChunkName: "pages\\book\\new" */).then(m => m.default || m)
const _beb3c9bc = () => import('..\\pages\\demo\\books.vue' /* webpackChunkName: "pages\\demo\\books" */).then(m => m.default || m)
const _4aa7c725 = () => import('..\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages\\summary\\faces\\_id" */).then(m => m.default || m)
const _75f2aa9e = () => import('..\\pages\\sow\\village\\_idx\\editor.vue' /* webpackChunkName: "pages\\sow\\village\\_idx\\editor" */).then(m => m.default || m)
const _08e1dd12 = () => import('..\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages\\sow\\village\\_idx\\anker" */).then(m => m.default || m)
const _3c51e96e = () => import('..\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages\\sow\\village\\_idx\\_mode" */).then(m => m.default || m)
const _10605aa9 = () => import('..\\pages\\book\\_idx\\editor.vue' /* webpackChunkName: "pages\\book\\_idx\\editor" */).then(m => m.default || m)
const _16c3827f = () => import('..\\pages\\book\\_idx\\anker.vue' /* webpackChunkName: "pages\\book\\_idx\\anker" */).then(m => m.default || m)
const _102dec74 = () => import('..\\pages\\book\\_idx\\edit.vue' /* webpackChunkName: "pages\\book\\_idx\\edit" */).then(m => m.default || m)
const _57865a76 = () => import('..\\pages\\book\\_idx\\_mode.vue' /* webpackChunkName: "pages\\book\\_idx\\_mode" */).then(m => m.default || m)



const scrollBehavior = function (to, from, savedPosition) {
      var basic, has_top;
      basic = function(has_top, to) {
        [from, to] = [from, to].map(function(o) {
          return o.path;
        });
        switch (false) {
          case from === to:
            console.log(`scroll to TOP (${from} != ${to})`);
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
          switch (to.name) {
            case "sow-village-idx-mode":
            case "sow-village-idx-anker":
            case "book-idx-mode":
            case "book-idx-anker":
            case "book-idx-edit":
              return {};
            default:
              has_top = to.matched.some(function(r) {
                return r.components.default.options.scrollToTop;
              });
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
			path: "/mypage",
			component: _20cded32,
			name: "mypage"
		},
		{
			path: "/book",
			component: _58095ef8,
			name: "book"
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
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		},
		{
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
		},
		{
			path: "/demo/marked",
			component: _0bc1fc38,
			name: "demo-marked"
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
			path: "/sow/village",
			component: _3f090d08,
			name: "sow-village"
		},
		{
			path: "/demo/markdown",
			component: _486a8927,
			name: "demo-markdown"
		},
		{
			path: "/demo/names",
			component: _718150c0,
			name: "demo-names"
		},
		{
			path: "/book/new",
			component: _242178d2,
			name: "book-new"
		},
		{
			path: "/demo/books",
			component: _beb3c9bc,
			name: "demo-books"
		},
		{
			path: "/summary/faces/:id",
			component: _4aa7c725,
			name: "summary-faces-id"
		},
		{
			path: "/sow/village/:idx/editor",
			component: _75f2aa9e,
			name: "sow-village-idx-editor"
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
			path: "/book/:idx/editor",
			component: _10605aa9,
			name: "book-idx-editor"
		},
		{
			path: "/book/:idx/anker",
			component: _16c3827f,
			name: "book-idx-anker"
		},
		{
			path: "/book/:idx/edit",
			component: _102dec74,
			name: "book-idx-edit"
		},
		{
			path: "/book/:idx/:mode?",
			component: _57865a76,
			name: "book-idx-mode"
		}
    ],
    fallback: false
  })
}
