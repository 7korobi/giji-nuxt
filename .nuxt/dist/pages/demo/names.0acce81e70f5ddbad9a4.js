webpackJsonp([15],{

/***/ "agE1":
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__("L78F"));

module.exports = {
  mixins: [
    __webpack_require__("nMnY")({
      replace: {
        tag_id: "all"
      }
    })
  ],
  computed: {
    name_blanks: function() {
      return Query.faces.name_blank();
    },
    name_counts: function() {
      return Query.faces.name_head(this.tag_id);
    }
  }
};


/***/ }),

/***/ "uTai":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-report',{attrs:{"handle":"header","deco":"center"}},[_c('tags',{model:{value:(_vm.tag_id),callback:function ($$v) {_vm.tag_id=$$v},expression:"tag_id"}})],1),_c('c-report',{attrs:{"handle":"header","deco":"center"}},[_vm._v("0人")]),_c('c-post',{attrs:{"handle":"TSAY"}},_vm._l((_vm.name_blanks),function(name){return _c('span',[_vm._v("<"+_vm._s(name)+">")])})),_vm._l((_vm.name_counts),function(group, count){return (0 < count)?_c('div',{key:count},[_c('transition-group',{staticClass:"posts",attrs:{"name":"list","tag":"div"}},[_c('c-report',{key:'h'+count,attrs:{"handle":"header","deco":"center"}},[_vm._v(_vm._s(count)+"人")]),_vm._l((group),function(map){return _c('c-post',{key:map.id,attrs:{"handle":"SSAY"}},[_vm._v("<"+_vm._s(map.id)+"> "+_vm._s(map.set.join("、")))])})],2)],1):_vm._e()}),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_c('nuxt-link',{attrs:{"to":"/"}},[_vm._v("戻る")])],1)],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "vnzY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_names_vue__ = __webpack_require__("agE1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_names_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_names_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5ebc17_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_names_vue__ = __webpack_require__("uTai");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_names_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5ebc17_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_names_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=names.0acce81e70f5ddbad9a4.js.map