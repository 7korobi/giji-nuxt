webpackJsonp([4],{

/***/ "/TYz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("uyzt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b22755c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("Z8Dv");
function injectStyle (ssrContext) {
  __webpack_require__("rA4j")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4b22755c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b22755c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "GEaH":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".card[data-v-4b22755c]{padding:10px 0 10px 20px}", ""]);

// exports


/***/ }),

/***/ "MdO5":
/***/ (function(module, exports) {

var base;

base = function(timestr, name, calc) {
  var capture, time_num, time_tail, timeout;
  time_tail = timestr.slice(-1);
  time_num = timestr.slice(0, -1);
  timeout = (function() {
    switch (time_tail) {
      case "s":
        return 1000 * time_num;
      case "m":
        return 1000 * 60 * time_num;
      case "h":
        return 1000 * 3600 * time_num;
      case "d":
        return 1000 * 3600 * 24 * time_num;
    }
  })();
  capture = function(vue) {
    var key, payload, suffix;
    if (calc) {
      payload = calc.call(vue);
      suffix = JSON.stringify(payload);
    } else {
      payload = null;
      suffix = "";
    }
    key = name + suffix;
    return {payload, key, name};
  };
  return {
    mounted: function() {
      var key, o, payload, read_at, timer;
      ({timer, read_at} = this.$store.state);
      ({payload, key, name} = capture(this));
      o = {
        timer: {},
        read_at: {}
      };
      o.timer[key] = timeout;
      this.$store.commit("update", o);
      if (Date.now() - timeout < read_at[key]) {
        return new Promise(function(ok) {
          return ok();
        });
      } else {
        return this.$store.dispatch(name, payload).then(() => {
          o.read_at[key] = Date.now();
          return this.$store.commit("update", o);
        });
      }
    },
    computed: {
      read_at: function() {
        var key;
        ({key} = capture(this));
        return this.$store.state.read_at[key];
      }
    }
  };
};

base.plugin = function(arg) {
  this.arg = arg;
  return function({commit, state}) {
    var read_at, timer;
    ({timer, read_at} = state);
    return base.root = {commit, timer, read_at};
  };
};

module.exports = base;


/***/ }),

/***/ "Z8Dv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('br'),_c('c-post',{attrs:{"handle":"XSAY","write_at":1169852700003}},[_vm._v("祝！人狼議事10周年！")]),(_vm.mypage)?_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("ロビー")]):_vm._e(),(_vm.mypage)?_c('c-post',{staticClass:"form",attrs:{"handle":"TSAY"}},[_c('nuxt-link',{attrs:{"to":_vm.mypage}},[_vm._v("あなたの情報")])],1):_vm._e(),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("みんなの情報")]),_c('c-post',{staticClass:"form",attrs:{"handle":"SSAY"}},[_c('a',{attrs:{"href":"https://github.com/7korobi/giji-nuxt/commits/master"}},[_vm._v("総合トップ")]),_c('a',{attrs:{"href":"https://github.com/7korobi/sow-giji/commits/cabala"}},[_vm._v("ゲーム")]),_c('a',{attrs:{"href":"https://github.com/7korobi/sow-giji/commits/show-fix"}},[_vm._v("ゲーム（新）")]),_c('div',{staticClass:"card"},[_vm._v("人狼議事を構成するプログラムの、更新履歴はこちら。")])]),_c('c-post',{staticClass:"form",attrs:{"handle":"SSAY"}},[_c('nuxt-link',{attrs:{"to":"/rule-guide"}},[_vm._v("人狼議事のルール")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("人狼議事を遊ぶとき、従うべきルールはこちら。")])],1),_c('c-post',{staticClass:"form",attrs:{"handle":"VSAY"}},[_c('nuxt-link',{attrs:{"to":"/character-tag"}},[_vm._v("キャラクター一覧表")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("人狼議事で遊ぶことができるキャラクターはこちら。")])],1),_c('c-post',{staticClass:"form",attrs:{"handle":"VSAY"}},[_c('nuxt-link',{attrs:{"to":"/summary/faces"}},[_vm._v("キャラクター活躍記録")]),_c('br'),_c('div',{staticClass:"card"},[_vm._v("どこかの村で活躍したことのあるキャラクターはこちら。")])],1),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_vm._v("開始待ちの村／進行中の村")]),_vm._l((_vm.progress),function(o){return _c('c-post',{key:o._id,attrs:{"handle":"EVIL","head":o.name}},[_c('a',{attrs:{"href":o.folder.href}},[_vm._v(_vm._s(o.folder.nation)+_vm._s(o.vid))]),_vm._v("は、進行中だ。"),_c('div',{staticClass:"date"},[_c('timeago',{attrs:{"since":o.timer.nextcommitdt}})],1)])}),_vm._l((_vm.prologue),function(o){return _c('c-post',{key:o._id,attrs:{"handle":"MOB","head":o.name}},[_c('a',{attrs:{"href":o.folder.href}},[_vm._v(_vm._s(o.folder.nation)+_vm._s(o.vid))]),_vm._v("は、開始が楽しみだ。"),_c('div',{staticClass:"date"},[_c('timeago',{attrs:{"since":o.timer.nextcommitdt}})],1)])}),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_c('nuxt-link',{attrs:{"to":"/demo"}},[_vm._v("開発者用ページ")])],1)],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "rA4j":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("GEaH");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("3b793d5e", content, true);

/***/ }),

/***/ "uyzt":
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__("L78F"));

module.exports = {
  mixins: [__webpack_require__("MdO5")("1h", "story/progress")],
  computed: {
    user: function() {
      return this.$store.state.user;
    },
    mypage: function() {
      var ref;
      if (!((ref = this.user) != null ? ref._id : void 0)) {
        return null;
      }
      return "mypage";
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


/***/ })

});
//# sourceMappingURL=index.69be11f3e7f8c7412349.js.map