webpackJsonp([8],{

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(456)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(403),
  /* template */
  __webpack_require__(445),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a44f5ec6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);

module.exports = {
  default: {
    data: function() {
      "menu/set";
      [
        {
          name: "comment"
        },
        {
          name: "cog",
          ext: "spin"
        },
        {
          name: "circle-o-notch",
          ext: "spin"
        },
        {
          name: "refresh",
          ext: "spin"
        },
        {
          name: "spinner"
        },
        {
          name: "user"
        },
        {
          name: "sitemap"
        }
      ];
      return {};
    }
  }
};


/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"book.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('layout-header'), _c('nuxt'), _c('layout-footer')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(429);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("606df778", content, true);

/***/ })

});
//# sourceMappingURL=8.nuxt.bundle.02bd34cc44185d651994.js.map