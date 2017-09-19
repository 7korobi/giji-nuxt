webpackJsonp([1],{

/***/ "6fyr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("VHsr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8e7d96f2_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("D8uU");
function injectStyle (ssrContext) {
  __webpack_require__("EQje")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8e7d96f2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8e7d96f2_hasScoped_true_preserveWhitespace_false_pug_html_loader_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "D8uU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('post',{attrs:{"handle":"SSAY"}},[_vm._v(_vm._s(_vm.faces.list.length)+"人を表示しています。"),_c('ul',[_c('li',[_vm._v("人気度")]),_c('li',[_c('a',[_vm._v("キャラクター名（詳細へリンク）")])]),_c('li',[_vm._v("♥ いちばん沢山、そのキャラクターで遊んだプレイヤー")])])]),_c('report',{attrs:{"handle":"header","deco":"center"}},[_c('tags',{model:{value:(_vm.tag_id),callback:function ($$v) {_vm.tag_id=$$v},expression:"tag_id"}})],1),_c('report',{attrs:{"handle":"header","deco":"center"}},[_c('btn',{attrs:{"as":"order"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("基本")]),_c('btn',{attrs:{"as":"story_length"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("登場回数")]),_c('btn',{attrs:{"as":"fav_count"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("偏愛度")]),_c('btn',{attrs:{"as":"date_max"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("新着度")]),_c('btn',{attrs:{"as":"date_min"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("古参度")])],1)],1)]),_c('div',{staticClass:"fullframe"},[_c('transition-group',{staticClass:"portrates",attrs:{"name":"list","tag":"div"}},_vm._l((_vm.faces.list),function(face){return _c('portrate',{key:face.id,attrs:{"face_id":face.id}},[('fav_count' == _vm.order)?_c('p',[_vm._v("♥"+_vm._s(face.fav_count)+"回")]):_c('p',[_vm._v("登場"+_vm._s(face.story_length)+"回")]),('date_max' == _vm.order)?_c('p',[_c('timeago',{attrs:{"format":"short","since":face.date_max}})],1):_vm._e(),('date_min' == _vm.order)?_c('p',[_c('timeago',{attrs:{"format":"short","since":face.date_min}})],1):_vm._e(),_c('nuxt-link',{attrs:{"to":face.summary_url}},[_c('p',[_vm._v(_vm._s(face.chr_jobs.list[0].job))]),_c('p',[_vm._v(_vm._s(face.name))])]),_c('p',[_vm._v("♥"+_vm._s(face.sow_auth_id))])],1)}))],1),_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('report',{attrs:{"handle":"footer","deco":"center"}},[_c('nuxt-link',{attrs:{"to":"/"}},[_vm._v("戻る")])],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "EQje":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Umro");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("470b67b0", content, true);

/***/ }),

/***/ "Umro":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".chrblank a[data-v-8e7d96f2]{display:block}", ""]);

// exports


/***/ }),

/***/ "VHsr":
/***/ (function(module, exports, __webpack_require__) {

var Query, _;

({Query} = __webpack_require__("L78F"));

_ = __webpack_require__("M4fF");

module.exports = {
  mixins: [
    __webpack_require__("MdO5")("12h",
    "aggregate/faces"),
    __webpack_require__("nMnY")({
      push: {
        order: "date_max",
        tag_id: "all"
      }
    })
  ],
  computed: {
    faces: function() {
      this.read_at;
      return Query.faces.aggregate(this.tag_id, this.order);
    }
  }
};


/***/ })

});
//# sourceMappingURL=index.6b95caa0b09390a1f37a.js.map