import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _d988a500 = () => import('..\\pages\\rule-guide.vue' /* webpackChunkName: "pages_rule-guide" */).then(m => m.default || m)
const _20cded32 = () => import('..\\pages\\mypage\\index.vue' /* webpackChunkName: "pages_mypage_index" */).then(m => m.default || m)
const _126e656c = () => import('..\\pages\\demo\\index.vue' /* webpackChunkName: "pages_demo_index" */).then(m => m.default || m)
const _8471841e = () => import('..\\pages\\character-tag.vue' /* webpackChunkName: "pages_character-tag" */).then(m => m.default || m)
const _58095ef8 = () => import('..\\pages\\book\\index.vue' /* webpackChunkName: "pages_book_index" */).then(m => m.default || m)
const _74156ee2 = () => import('..\\pages\\demo\\oauth.vue' /* webpackChunkName: "pages_demo_oauth" */).then(m => m.default || m)
const _6fbb897d = () => import('..\\pages\\summary\\faces\\index.vue' /* webpackChunkName: "pages_summary_faces_index" */).then(m => m.default || m)
const _42ad62d8 = () => import('..\\pages\\demo\\timeago.vue' /* webpackChunkName: "pages_demo_timeago" */).then(m => m.default || m)
const _0bc1fc38 = () => import('..\\pages\\demo\\marked.vue' /* webpackChunkName: "pages_demo_marked" */).then(m => m.default || m)
const _beb3c9bc = () => import('..\\pages\\demo\\books.vue' /* webpackChunkName: "pages_demo_books" */).then(m => m.default || m)
const _3f090d08 = () => import('..\\pages\\sow\\village\\index.vue' /* webpackChunkName: "pages_sow_village_index" */).then(m => m.default || m)
const _718150c0 = () => import('..\\pages\\demo\\names.vue' /* webpackChunkName: "pages_demo_names" */).then(m => m.default || m)
const _242178d2 = () => import('..\\pages\\book\\new.vue' /* webpackChunkName: "pages_book_new" */).then(m => m.default || m)
const _486a8927 = () => import('..\\pages\\demo\\markdown.vue' /* webpackChunkName: "pages_demo_markdown" */).then(m => m.default || m)
const _eef29fda = () => import('..\\pages\\demo\\chats.vue' /* webpackChunkName: "pages_demo_chats" */).then(m => m.default || m)
const _4aa7c725 = () => import('..\\pages\\summary\\faces\\_id.vue' /* webpackChunkName: "pages_summary_faces__id" */).then(m => m.default || m)
const _08e1dd12 = () => import('..\\pages\\sow\\village\\_idx\\anker.vue' /* webpackChunkName: "pages_sow_village__idx_anker" */).then(m => m.default || m)
const _75f2aa9e = () => import('..\\pages\\sow\\village\\_idx\\editor.vue' /* webpackChunkName: "pages_sow_village__idx_editor" */).then(m => m.default || m)
const _3c51e96e = () => import('..\\pages\\sow\\village\\_idx\\_mode.vue' /* webpackChunkName: "pages_sow_village__idx__mode" */).then(m => m.default || m)
const _16c3827f = () => import('..\\pages\\book\\_idx\\anker.vue' /* webpackChunkName: "pages_book__idx_anker" */).then(m => m.default || m)
const _102dec74 = () => import('..\\pages\\book\\_idx\\edit.vue' /* webpackChunkName: "pages_book__idx_edit" */).then(m => m.default || m)
const _10605aa9 = () => import('..\\pages\\book\\_idx\\editor.vue' /* webpackChunkName: "pages_book__idx_editor" */).then(m => m.default || m)
const _57865a76 = () => import('..\\pages\\book\\_idx\\_mode.vue' /* webpackChunkName: "pages_book__idx__mode" */).then(m => m.default || m)
const _26460e66 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



const scrollBehavior = function (e,a,i){var r;switch(r=function(e,i){switch([a,i]=[a,i].map(function(e){return e.path}),!1){case a===i:return console.log(`scroll to TOP (${a} != ${i})`),{x:0,y:0};case!e:return console.log("scroll to TOP (has scrollToTop)"),{x:0,y:0}}},!1){case!i:return console.log("scroll restore",i),i;case!e.hash:return console.log("scroll to "+e.hash),{selector:e.hash};default:switch(e.name){case"sow-village-idx-mode":case"sow-village-idx-anker":case"book-idx-mode":case"book-idx-anker":case"book-idx-edit":return{};default:return r(e.matched.some(function(e){return e.components.default.options.scrollToTop}),e)}}}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
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
			path: "/book",
			component: _58095ef8,
			name: "book"
		},
		{
			path: "/demo/oauth",
			component: _74156ee2,
			name: "demo-oauth"
		},
		{
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
		},
		{
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		},
		{
			path: "/demo/marked",
			component: _0bc1fc38,
			name: "demo-marked"
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
			path: "/demo/markdown",
			component: _486a8927,
			name: "demo-markdown"
		},
		{
			path: "/demo/chats",
			component: _eef29fda,
			name: "demo-chats"
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
			path: "/sow/village/:idx/editor",
			component: _75f2aa9e,
			name: "sow-village-idx-editor"
		},
		{
			path: "/sow/village/:idx/:mode?",
			component: _3c51e96e,
			name: "sow-village-idx-mode"
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
			path: "/book/:idx/editor",
			component: _10605aa9,
			name: "book-idx-editor"
		},
		{
			path: "/book/:idx/:mode?",
			component: _57865a76,
			name: "book-idx-mode"
		},
		{
			path: "/",
			component: _26460e66,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
