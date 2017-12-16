webpackJsonp([3],{

/***/ "99JJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_mode_vue__ = __webpack_require__("C8DY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_mode_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_mode_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e6798f7c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_mode_vue__ = __webpack_require__("IHl6");
function injectStyle (ssrContext) {
  __webpack_require__("W4wp")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e6798f7c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_mode_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e6798f7c_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_mode_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "C8DY":
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  mixins: [
    __webpack_require__("MdO5")("30d",
    "sow/story",
    function() {
      return this.book_id;
    }),
    __webpack_require__("moW1"),
    __webpack_require__("K8Xp")({
      loader: true
    })
  ],
  head: function() {
    var labels;
    labels = [this.part, this.book].map(function(o) {
      return o != null ? o.label : void 0;
    });
    labels.push("人狼議事");
    return {
      title: labels.join(' ')
    };
  },
  methods: {
    focus: function(idx) {
      this.idx = idx;
    },
    anker: function(book_id, a) {
      return this.$router.push({
        path: `../${this.part_id}/anker`,
        query: {a, back: this.back}
      });
    }
  },
  computed: {
    editor_url: function() {
      var back;
      back = this.$route.query.back;
      if (back == null) {
        back = this.back;
      }
      return {
        path: "./editor",
        query: {back}
      };
    },
    folder_url: function() {
      return `/sow/village?folder_id=${this.folder_id.toUpperCase()}`;
    },
    page_all_contents: function() {
      return this.chats(this.part_id);
    }
  }
};


/***/ }),

/***/ "IHl6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"sideframe"},[_c('div',{staticClass:"inframe"},[_c('div',{staticClass:"icons form"},[_c('nuxt-link',{staticClass:"item active",attrs:{"replace":"replace","to":_vm.editor_url}},[_c('i',{staticClass:"fa fa-file-text"})]),_c('nuxt-link',{staticClass:"item active",attrs:{"replace":"replace","to":_vm.back_url}},[_c('i',{staticClass:"fa fa-map-marker"})]),_c('check',{staticClass:"item",attrs:{"as":"mentions"},model:{value:(_vm.shows),callback:function ($$v) {_vm.shows=$$v},expression:"shows"}},[_c('i',{staticClass:"fa fa-map-pin"})]),_c('check',{staticClass:"item",attrs:{"as":"toc"},model:{value:(_vm.shows),callback:function ($$v) {_vm.shows=$$v},expression:"shows"}},[_c('i',{staticClass:"fa fa-film"})]),_c('check',{staticClass:"item",attrs:{"as":"potof"},model:{value:(_vm.shows),callback:function ($$v) {_vm.shows=$$v},expression:"shows"}},[_c('i',{staticClass:"fa fa-users"})])],1)])]),_c('div',{key:"summary",staticClass:"summary",attrs:{"name":"list","tag":"div"}},[_c('a-mentions',{key:"1",on:{"anker":_vm.anker}}),_c('a-toc',{key:"2"}),_c('a-potofs',{key:"3"})],1),_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-post',{key:"breadcrumb",attrs:{"handle":"footer"}},[_c('bread-crumb',[_c('li',[_c('nuxt-link',{attrs:{"to":_vm.folder_url}},[_vm._v("終了した村一覧")])],1)])],1),_c('c-report',{key:"finder",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-mode'),_c('page-part')],1)],1),(_vm.mode == 'memo')?_c('div',{staticClass:"inframe"},[_c('c-report',{staticClass:"form",attrs:{"handle":"footer"}},[_c('span',[_c('btn',{attrs:{"as":"memos"},model:{value:(_vm.mode),callback:function ($$v) {_vm.mode=$$v},expression:"mode"}},[_c('i',{staticClass:"fa fa-expand"})])],1),_c('span',[_vm._v("最新のメモを表示しています。")])])],1):_vm._e(),(_vm.mode == 'memos')?_c('div',{staticClass:"inframe"},[_c('c-report',{staticClass:"form",attrs:{"handle":"footer"}},[_c('span',[_c('btn',{attrs:{"as":"memo"},model:{value:(_vm.mode),callback:function ($$v) {_vm.mode=$$v},expression:"mode"}},[_c('i',{staticClass:"fa fa-compress"})])],1),_c('span',[_vm._v("メモ掲載の一覧を表示しています。")])])],1):_vm._e(),_vm._l((_vm.page_contents),function(chats,idx){return _c('div',{key:idx,staticClass:"inframe"},_vm._l((chats),function(o){return _c('chat',{key:o.id,attrs:{"id":o.id},on:{"anker":_vm.anker,"focus":_vm.focus}})}))}),_c('div',{staticClass:"inframe"},[(_vm.page_next_idx)?_c('c-report',{key:"limitup",staticClass:"form",attrs:{"handle":"footer"}},[_c('div',{staticClass:"center"},[_c('scroll-mine',{attrs:{"as":_vm.page_next_idx},on:{"input":_vm.page_add}},[_vm._v("次頁")])],1)]):_c('c-report',{key:"limitup",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-part'),_c('page-mode')],1),_c('c-post',{key:"breadcrumb",attrs:{"handle":"footer"}},[_c('bread-crumb',[_c('li',[_c('nuxt-link',{attrs:{"to":_vm.folder_url}},[_vm._v("終了した村一覧")])],1)])],1)],1)],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

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

/***/ "W4wp":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("j/mX");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("2905e70c", content, true);

/***/ }),

/***/ "j/mX":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ })

});
//# sourceMappingURL=_mode.e76f0ce0b62083e13db5.js.map