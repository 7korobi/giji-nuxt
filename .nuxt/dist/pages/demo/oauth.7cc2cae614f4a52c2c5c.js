webpackJsonp([6],{

/***/ "/lSi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_oauth_vue__ = __webpack_require__("Rwsg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_oauth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_oauth_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3eae1604_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_oauth_vue__ = __webpack_require__("NL8E");
function injectStyle (ssrContext) {
  __webpack_require__("bCir")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3eae1604"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_oauth_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3eae1604_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_oauth_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "NL8E":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('br'),(_vm.profile.provider)?_c('table',{staticClass:"talk"},[_c('tbody',[_c('tr',[_c('th',[(_vm.profile.icon)?_c('img',{staticClass:"portrate",attrs:{"width":"90","src":_vm.profile.icon}}):_vm._e()]),_c('td',[_c('div',{staticClass:"baloon VSAY"}),_c('div',{staticClass:"chat VSAY"},[_c('chat-head',{attrs:{"head":_vm.profile.nick,"sign":_vm.profile.provider}}),_c('div',{staticClass:"text center"},[(_vm.profile.mail)?_c('a',{attrs:{"href":'mailto:' + _vm.profile.mail}},[_vm._v("mail")]):_vm._e(),_c('a',{attrs:{"href":_vm.profile.token}},[_vm._v("token")])]),_c('chat-foot',{attrs:{"write_at":_vm.profile.write_at}})],1)])])])]):_vm._e(),_c('br'),_c('post',{attrs:{"write_at":Date.now(),"handle":"SSAY"}},[_c('a',{attrs:{"href":"/auth/facebook"}},[_vm._v("facebook")])]),_c('post',{attrs:{"write_at":Date.now(),"handle":"SSAY"}},[_c('a',{attrs:{"href":"/auth/twitter"}},[_vm._v("twitter")])]),_c('post',{attrs:{"write_at":Date.now(),"handle":"SSAY"}},[_c('a',{attrs:{"href":"/auth/slack"}},[_vm._v("slack")])]),_c('br'),_c('post',{attrs:{"write_at":Date.now(),"handle":"TSAY"}},[_c('a',{attrs:{"href":"/auth/github"}},[_vm._v("github")])]),_c('post',{attrs:{"write_at":Date.now(),"handle":"TSAY"}},[_c('a',{attrs:{"href":"/auth/google"}},[_vm._v("google")])])],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Rwsg":
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


/***/ }),

/***/ "bCir":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("vLLF");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("08c7db1a", content, true);

/***/ }),

/***/ "vLLF":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".talk[data-v-3eae1604]{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0;margin:0 0 6px}.talk tbody[data-v-3eae1604],.talk td[data-v-3eae1604],.talk tfoot[data-v-3eae1604],.talk th[data-v-3eae1604],.talk thead[data-v-3eae1604]{border:0;padding:0;background:transparent}.talk td[data-v-3eae1604]{vertical-align:middle;position:relative}.talk th[data-v-3eae1604]{width:125px;vertical-align:top}.talk th .portrate[data-v-3eae1604]{margin:0 19px 0 16px}.contentframe .baloon[data-v-3eae1604]{position:absolute;content:\"\";width:0;height:0;top:60px;left:-6px;border-style:solid;border-width:6px;border-radius:6px 0 0 6px}", ""]);

// exports


/***/ })

});
//# sourceMappingURL=oauth.7cc2cae614f4a52c2c5c.js.map