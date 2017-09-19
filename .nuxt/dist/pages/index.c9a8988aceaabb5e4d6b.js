webpackJsonp([5],{

/***/ "/TYz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("0a4o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0cd08049_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("jID0");
function injectStyle (ssrContext) {
  __webpack_require__("7Kpe")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0cd08049"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0cd08049_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "0a4o":
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__("L78F"));

module.exports = {
  mixins: [__webpack_require__("MdO5")("1h", "story/progress")],
  computed: {
    user_url: function() {
      var account, provider;
      ({provider, account} = this.$store.state.profile);
      return provider && account && `user/${provider}-${account}`;
    },
    prologue: function() {
      this.read_at;
      return Query.sow_villages.prologue.list;
    },
    progress: function() {
      this.read_at;
      return Query.sow_villages.progress.list;
    }
  }
};


/***/ }),

/***/ "70Va":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".card[data-v-0cd08049]{padding:10px 0 10px 20px}", ""]);

// exports


/***/ }),

/***/ "7Kpe":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("70Va");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("10b42d22", content, true);

/***/ }),

/***/ "jID0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('br'),_c('post',{attrs:{"handle":"XSAY","write_at":1169852700003}},[_vm._v("祝！人狼議事10周年！")]),(_vm.user_url)?_c('report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("ロビー")]):_vm._e(),(_vm.user_url)?_c('post',{attrs:{"handle":"TSAY"}},[_c('nuxt-link',{attrs:{"to":_vm.user_url}},[_vm._v("あなたの情報")])],1):_vm._e(),_c('report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("みんなの情報")]),_c('post',{attrs:{"handle":"SSAY"}},[_c('a',{attrs:{"href":"https://github.com/7korobi/giji-nuxt/commits/master"}},[_vm._v("総合トップ")]),_c('a',{attrs:{"href":"https://github.com/7korobi/sow-giji/commits/cabala"}},[_vm._v("ゲーム")]),_c('a',{attrs:{"href":"https://github.com/7korobi/sow-giji/commits/show-fix"}},[_vm._v("ゲーム（新）")]),_c('div',{staticClass:"card"},[_vm._v("人狼議事を構成するプログラムの、更新履歴はこちら。")])]),_c('post',{attrs:{"handle":"SSAY"}},[_c('nuxt-link',{attrs:{"to":"/rule-guide"}},[_vm._v("人狼議事のルール")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("人狼議事を遊ぶとき、従うべきルールはこちら。")])],1),_c('post',{attrs:{"handle":"VSAY"}},[_c('nuxt-link',{attrs:{"to":"/character-tag"}},[_vm._v("キャラクター一覧表")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("人狼議事で遊ぶことができるキャラクターはこちら。")])],1),_c('post',{attrs:{"handle":"VSAY"}},[_c('nuxt-link',{attrs:{"to":"/summary/faces"}},[_vm._v("キャラクター活躍記録")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("どこかの村で活躍したことのあるキャラクターはこちら。")])],1),_c('report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("開始待ちの村／進行中の村")]),_vm._l((_vm.progress),function(o){return _c('post',{key:o._id,attrs:{"handle":"EVIL","head":o.name}},[_c('a',{attrs:{"href":o.folder.href}},[_vm._v(_vm._s(o.folder.nation)+_vm._s(o.vid))]),_vm._v("は、進行中だ。"),_c('div',{staticClass:"date"},[_c('timeago',{attrs:{"since":o.timer.nextcommitdt}})],1)])}),_vm._l((_vm.prologue),function(o){return _c('post',{key:o._id,attrs:{"handle":"MOB","head":o.name}},[_c('a',{attrs:{"href":o.folder.href}},[_vm._v(_vm._s(o.folder.nation)+_vm._s(o.vid))]),_vm._v("は、開始が楽しみだ。"),_c('div',{staticClass:"date"},[_c('timeago',{attrs:{"since":o.timer.nextcommitdt}})],1)])}),_c('report',{attrs:{"handle":"footer","deco":"center"}},[_c('nuxt-link',{attrs:{"to":"/demo"}},[_vm._v("開発者用ページ")])],1)],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=index.c9a8988aceaabb5e4d6b.js.map