webpackJsonp([16],{

/***/ "A76W":
/***/ (function(module, exports) {

module.exports = {
  data: function() {
    var now;
    now = Date.now();
    return {
      talks: [
        {
          head: "発言レンダーてすと",
          deco: "giji",
          handle: "SSAY",
          face_id: "c100",
          write_at: now - 1000000,
          log: "## ヘッドライン\n\n大きなテーブルも作れます。\n\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |"
        },
        {
          head: "発言レンダーてすと",
          deco: "giji",
          handle: "GSAY",
          face_id: "c101",
          write_at: now - 2000000,
          log: "―電脳都市―\n===\n―電脳都市―\n---\n\n### ―電脳都市―\n\n\n#### ―[電脳都市](《ｴﾚｸﾄﾛ・ｼﾃｨ》)―\n##### ―電脳都市―\n###### ―電脳都市―\n[振り仮名](ふりがな)はあったほうが[嬉](うれ)しいと[思](おも)う。\n[沢山](たくさん)[使](つか)うと[幅](はば)をとってしまうし、"
        },
        {
          head: "発言レンダーてすと",
          deco: "giji",
          handle: "WSAY",
          face_id: "c102",
          write_at: now - 3000000,
          log: "[ｷﾞﾀｰ]: 《ｷﾞﾀｰ》 \"五弦や四弦ではいかんのである。\"\n[アンカー](http://google.com)と[紛](まぎ)らわしいかもしれないけれど。\nなどと。\n<auto@test>\n<ftp://test>\n****\n````\n\n\n鞭打つように唸る[六弦][ｷﾞﾀｰ]に　熱狂の声は暫しの沈黙\n従順にも従う小悪魔達の顔を　一瞥　見渡して\n\n覚醒の時を待つ[低音太鼓](《ﾊﾞｽﾄﾞﾗﾑ》)の　重低音に酔わされ\n\n\n唄の寵愛を受けし罪人は　[拡声器](《ﾏｲｸ》)を握る……\n````"
        },
        {
          head: "発言レンダーてすと",
          deco: "giji",
          handle: "PSAY",
          face_id: "c103",
          write_at: now - 4000000,
          log: "あとさ、\n1. [x] HTMLかくのは**禁止** <hr>\n2.[ ] ~~検閲により削除~~したら`strikeout`するほうがいいかしら。"
        },
        {
          head: "発言レンダーてすと",
          deco: "mermaid",
          handle: "TSAY",
          face_id: "c104",
          write_at: now - 5000000,
          log: "graph LR\n  A[Square Rect] -- Link text --> B((Circle))\n  A --> C(Round Rect)\n  B --> D{Rhombus}\n  C --> D"
        }
      ]
    };
  },
  computed: {
    now: function() {
      return Date.now();
    }
  }
};


/***/ }),

/***/ "NCHk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_marked_vue__ = __webpack_require__("A76W");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_marked_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_marked_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_81e2522c_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_marked_vue__ = __webpack_require__("Wuk4");
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
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_marked_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_81e2522c_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_marked_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Wuk4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('no-ssr',[_c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('br'),_vm._l((_vm.talks),function(o){return _c('div',[_c('c-talk',{attrs:{"head":o.head,"deco":o.deco,"handle":o.handle,"face_id":o.face_id,"write_at":o.write_at,"log":o.log}}),_c('c-report',{attrs:{"head":o.deco,"deco":o.deco,"handle":o.handle,"write_at":o.write_at}},[_vm._v(_vm._s(o.log))])],1)})],2)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=marked.4ac48ae1eef13a5ee164.js.map