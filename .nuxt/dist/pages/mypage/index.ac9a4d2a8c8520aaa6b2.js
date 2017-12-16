webpackJsonp([6],{

/***/ "9OMJ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "F4gW":
/***/ (function(module, exports) {

module.exports = {
  data: function() {
    return {
      sign: ""
    };
  },
  methods: {
    edit: function() {
      this.sign = this.user.sign;
      return this.$store.commit("update", {
        user: {
          sign: ""
        }
      });
    },
    commit: function() {
      return this.$store.dispatch("user", {sign: this.sign});
    }
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  }
};


/***/ }),

/***/ "FbZP":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9OMJ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("1b0c3a40", content, true);

/***/ }),

/***/ "yFLt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('no-ssr',[_c('div',{staticClass:"inframe"},[_c('br'),(_vm.user)?_c('c-talk',{attrs:{"handle":"VSAY","deco":"giji","head":_vm.user.nick,"sign":_vm.user.sign,"img_src":_vm.user.icon}},[_c('p',[_c('table',[_c('tbody',[(_vm.user.sign)?_c('tr',[_c('th',[_vm._v("署名")]),_c('td',[_vm._v(_vm._s(_vm.user.sign))]),_c('td',[_c('a',{staticClass:"btn",on:{"click":_vm.edit}},[_vm._v("編集")])])]):_vm._e(),(!_vm.user.sign)?_c('tr',[_c('th',[_vm._v("署名")]),_c('td',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sign),expression:"sign"}],attrs:{"type":"text"},domProps:{"value":(_vm.sign)},on:{"input":function($event){if($event.target.composing){ return; }_vm.sign=$event.target.value}}})]),_c('td',[_c('a',{staticClass:"btn",on:{"click":_vm.commit}},[_vm._v("決定")])])]):_vm._e(),(!_vm.user.sign)?_c('tr',[_c('th'),_c('th',{attrs:{"colspan":"2"}},[_vm._v("あなたのサインを決めてください。\n ※ ゲーム内で公開されます。\n")])]):_vm._e(),_c('tr',[_c('th',[_vm._v("ログイン")]),_c('td',[_vm._v(_vm._s(_vm.user.provider)+"から")])]),_c('tr',[_c('th',[_vm._v("OpenID")]),_c('td',[_vm._v(_vm._s(_vm.user.account))])])])])])]):_vm._e(),(_vm.user)?_c('c-post',{attrs:{"handle":"TSAY","deco":"giji","head":"秘密の情報","sign":_vm.user.sign,"write_at":_vm.user.write_at}},[_c('table',[_c('tbody',[_c('tr',[_c('th',[_vm._v("ニックネーム")]),_c('td',[_vm._v(_vm._s(_vm.user.nick))])]),_c('tr',[_c('th',[_vm._v("mail")]),_c('td',[(_vm.user.mail)?_c('a',{attrs:{"href":'mailto:' + _vm.user.mail}},[_vm._v(_vm._s(_vm.user.mail))]):_vm._e()])])])])]):_vm._e(),(_vm.user.sign)?_c('c-post',{attrs:{"handle":"SSAY","deco":"giji"}},[_c('nuxt-link',{attrs:{"to":"/book/edit"}},[_vm._v("新しい村を作成する。")])],1):_vm._e(),_c('c-post',{attrs:{"handle":"footer"}},[_c('bread-crumb')],1)],1)])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "yoqb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("F4gW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f1f9192c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("yFLt");
function injectStyle (ssrContext) {
  __webpack_require__("FbZP")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f1f9192c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f1f9192c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=index.ac9a4d2a8c8520aaa6b2.js.map