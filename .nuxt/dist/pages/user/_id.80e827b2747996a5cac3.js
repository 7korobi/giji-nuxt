webpackJsonp([0],{

/***/ "DFiB":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("EJKI");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("63e231e8", content, true);

/***/ }),

/***/ "EJKI":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "LHrw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue__ = __webpack_require__("k/rr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65b4c6cf_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_id_vue__ = __webpack_require__("f8RZ");
function injectStyle (ssrContext) {
  __webpack_require__("DFiB")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-65b4c6cf"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65b4c6cf_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_id_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "f8RZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('br'),_c('talk',{attrs:{"handle":"VSAY","deco":"center","head":_vm.profile.nick,"sign":_vm.profile.provider,"write_at":_vm.profile.write_at,"img_src":_vm.profile.icon}},[(_vm.profile.mail)?_c('a',{attrs:{"href":'mailto:' + _vm.profile.mail}},[_vm._v("mail")]):_vm._e(),_c('a',{attrs:{"href":_vm.profile.token}},[_vm._v("token")])])],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "k/rr":
/***/ (function(module, exports) {

module.exports = {
  data: function() {
    return {};
  },
  computed: {
    profile: function() {
      return this.$store.state.profile;
    },
    user: function() {
      return this.$store.state.user;
    }
  }
};


/***/ })

});
//# sourceMappingURL=_id.80e827b2747996a5cac3.js.map