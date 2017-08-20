webpackJsonp([0],{

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(445)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(413),
  /* template */
  __webpack_require__(432),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-65b4c6cf",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 413:
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

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"_id.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 432:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('br'), _c('talk', {
    attrs: {
      "handle": "VSAY",
      "deco": "center",
      "head": _vm.profile.nick,
      "sign": _vm.profile.provider,
      "write_at": _vm.profile.write_at,
      "img_src": _vm.profile.icon
    }
  }, [(_vm.profile.mail) ? _c('a', {
    attrs: {
      "href": 'mailto:' + _vm.profile.mail
    }
  }, [_vm._v("mail")]) : _vm._e(), _c('a', {
    attrs: {
      "href": _vm.profile.token
    }
  }, [_vm._v("token")])])], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(418);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e5ecb16c", content, true);

/***/ })

});
//# sourceMappingURL=0.nuxt.bundle.530d9d7acb504b9bb7b7.js.map