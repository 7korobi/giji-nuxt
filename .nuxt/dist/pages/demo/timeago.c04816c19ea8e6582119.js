webpackJsonp([14],{

/***/ "/VyF":
/***/ (function(module, exports) {

module.exports = {
  default: {
    middleware: 'test',
    data: function(req) {
      var now;
      now = new Date() - 0;
      return {
        clicks: 0,
        name: req ? 'server' : 'client',
        times: [...[-3610, -3609, -3608, -3607, -3606, -3605, -3604, -3603, -3602, -3601, -3600, -3599, -3598, -3597, -3596, -3595, -3594, -3593, -3592, -3591, -3590], 2e308, ...[-70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50], 2e308, ...[50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], 2e308, ...[3590, 3591, 3592, 3593, 3594, 3595, 3596, 3597, 3598, 3599, 3600, 3601, 3602, 3603, 3604, 3605, 3606, 3607, 3608, 3609, 3610]].map(function(t) {
          return {
            at: now - t * 1000
          };
        })
      };
    },
    head: function() {
      return {
        title: `About Page (${this.name}-side)`
      };
    },
    methods: {
      reset: function(idx) {
        this.clicks++;
        return this.times[idx].at = new Date() - -62000;
      }
    }
  }
};


/***/ }),

/***/ "0jBM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_timeago_vue__ = __webpack_require__("/VyF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_timeago_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_timeago_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b1436a9c_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_timeago_vue__ = __webpack_require__("8H1X");
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
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_timeago_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b1436a9c_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_timeago_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "8H1X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-report',{attrs:{"head":"リアルクロックテスト","sign":"ななころび","handle":"SSAY"}},_vm._l((_vm.times),function(time,idx){return _c('timeago',{key:idx,attrs:{"since":time.at}})})),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_c('nuxt-link',{attrs:{"to":"/"}},[_vm._v("戻る")])],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=timeago.c04816c19ea8e6582119.js.map