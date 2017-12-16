webpackJsonp([9],{

/***/ "2Un8":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("AlPA");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("03ee5b18", content, true);

/***/ }),

/***/ "AlPA":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".center-left,.center-right{display:none}", ""]);

// exports


/***/ }),

/***/ "HjK+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-post',{attrs:{"handle":"footer"}},[_c('bread-crumb')],1),_c('c-report',{attrs:{"handle":"header","deco":"center"}},[_c('tags',{model:{value:(_vm.tag_id),callback:function ($$v) {_vm.tag_id=$$v},expression:"tag_id"}}),_c('sub',{staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.chrs.length)+"人の"+_vm._s(_vm.set.long)+"を表示しています。")])],1)],1)]),_c('div',{staticClass:"fullframe"},[_c('transition-group',{staticClass:"portrates",attrs:{"name":"list","tag":"div"}},_vm._l((_vm.chrs),function(chr){return _c('portrate',{key:chr._id,attrs:{"face_id":chr._id}},[_c('p',[_vm._v(_vm._s(_vm.job(chr._id)))]),_c('p',[_vm._v(_vm._s(chr.name))])])}))],1),_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-post',{attrs:{"handle":"footer"}},[_c('bread-crumb')],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "adUO":
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__("L78F"));

module.exports = {
  mixins: [
    __webpack_require__("nMnY")({
      replace: {
        tag_id: "giji"
      }
    })
  ],
  computed: {
    set: function() {
      return Query.tags.find(this.tag_id);
    },
    chrs: function() {
      return Query.faces.tag(this.tag_id).list;
    }
  },
  methods: {
    job: function(face_id) {
      var job;
      job = Query.chr_jobs.find(`${this.set.chr_set_ids.last}_${face_id}`);
      if (job == null) {
        job = Query.chr_jobs.find(`all_${face_id}`);
      }
      return job.job;
    }
  }
};


/***/ }),

/***/ "mVin":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_character_tag_vue__ = __webpack_require__("adUO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_character_tag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_character_tag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99db8480_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_character_tag_vue__ = __webpack_require__("HjK+");
function injectStyle (ssrContext) {
  __webpack_require__("2Un8")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_character_tag_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99db8480_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_character_tag_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=character-tag.0b1fe4a7b390d9faf37e.js.map