webpackJsonp([17],{

/***/ "96r1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue__ = __webpack_require__("u0vE");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f8d2c57_hasScoped_false_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_anker_vue__ = __webpack_require__("y8Ij");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f8d2c57_hasScoped_false_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_anker_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "u0vE":
/***/ (function(module, exports, __webpack_require__) {

var Query, relative_to, uniq,
  _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

({Query} = __webpack_require__("L78F"));

({uniq, relative_to} = __webpack_require__("AFcV"));

module.exports = {
  mixins: [
    __webpack_require__("MdO5")("24h",
    "sow/story",
    function() {
      return this.book_id;
    }),
    __webpack_require__("K8Xp")
  ],
  mounted: function() {
    return this.menus = [...this.menus, "current"];
  },
  methods: {
    focus: function(idx) {
      var name, params, query;
      ({name, params, query} = this.$route);
      params = _extends({}, params, {idx});
      return this.$router.replace({name, params, query});
    },
    anker: function(book_id, a) {
      a = uniq(this.$route.query.a, a);
      return this.$router.replace(relative_to(this.$route, {a}));
    }
  },
  computed: {
    anker_chats: function() {
      var a;
      this.read_at;
      a = uniq(this.$route.query.a);
      return Query.chats.ankers(this.book_id, a).list;
    }
  }
};


/***/ }),

/***/ "y8Ij":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"sideframe"},[_c('div',{staticClass:"inframe"},[_c('div',{staticClass:"icons form"},[_c('nuxt-link',{staticClass:"item active",attrs:{"replace":"replace","to":_vm.back_url}},[_c('i',{staticClass:"fa fa-map-marker"})])],1)])]),_c('div',{key:"summary",staticClass:"summary",attrs:{"name":"list","tag":"div"}},[_c('mentions',{key:"1",on:{"anker":_vm.anker}})],1),_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('report',{key:"finder",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-mode')],1)],1),_c('div',{staticClass:"inframe"},_vm._l((_vm.anker_chats),function(o){return _c('chat',{key:o.id,attrs:{"id":o.id},on:{"anker":_vm.anker,"focus":_vm.focus}})})),_c('div',{staticClass:"inframe"},[_c('report',{key:"finder",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-mode')],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=anker.6c6c2a3e7ac8cc8387a9.js.map