webpackJsonp([11],{

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

/***/ "kJvc":
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
    __webpack_require__("K8Xp")({
      loader: true
    })
  ],
  mounted: function() {
    return this.shows = [...this.shows, "current"];
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
    anker_chats: function() {
      var a;
      this.read_at;
      a = uniq(this.$route.query.a);
      return Query.chats.ankers(this.book_id, a).list;
    }
  }
};


/***/ }),

/***/ "sL+M":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"sideframe"},[_c('div',{staticClass:"inframe"},[_c('div',{staticClass:"icons form"},[_c('nuxt-link',{staticClass:"item active",attrs:{"replace":"replace","to":_vm.editor_url}},[_c('i',{staticClass:"fa fa-file-text"})]),_c('nuxt-link',{staticClass:"item active",attrs:{"replace":"replace","to":_vm.back_url}},[_c('i',{staticClass:"fa fa-map-marker"})])],1)])]),_c('div',{key:"summary",staticClass:"summary",attrs:{"name":"list","tag":"div"}},[_c('a-mentions',{key:"1",on:{"anker":_vm.anker}})],1),_c('div',{staticClass:"contentframe"},[_c('div',{staticClass:"inframe"},[_c('c-report',{key:"finder",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-mode')],1)],1),_c('div',{staticClass:"inframe"},_vm._l((_vm.anker_chats),function(o){return _c('chat',{key:o.id,attrs:{"id":o.id},on:{"anker":_vm.anker,"focus":_vm.focus}})})),_c('div',{staticClass:"inframe"},[_c('c-report',{key:"finder",staticClass:"form",attrs:{"handle":"footer"}},[_c('page-mode')],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "vARB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue__ = __webpack_require__("kJvc");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6102944a_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_anker_vue__ = __webpack_require__("sL+M");
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
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_anker_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6102944a_hasScoped_false_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_anker_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=anker.22df42b5babb78fa001c.js.map