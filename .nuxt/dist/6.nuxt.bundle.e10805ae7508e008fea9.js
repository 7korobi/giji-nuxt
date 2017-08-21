webpackJsonp([6],{

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(444)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(405),
  /* template */
  __webpack_require__(431),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3eae1604",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 405:
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

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".talk[data-v-3eae1604]{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0;margin:0 0 6px}.talk tbody[data-v-3eae1604],.talk td[data-v-3eae1604],.talk tfoot[data-v-3eae1604],.talk th[data-v-3eae1604],.talk thead[data-v-3eae1604]{border:0;padding:0;background:transparent}.talk td[data-v-3eae1604]{vertical-align:middle;position:relative}.talk th[data-v-3eae1604]{width:125px;vertical-align:top}.talk th .portrate[data-v-3eae1604]{margin:0 19px 0 16px}.contentframe .baloon[data-v-3eae1604]{position:absolute;content:\"\";width:0;height:0;top:60px;left:-6px;border-style:solid;border-width:6px;border-radius:6px 0 0 6px}", "", {"version":3,"sources":["D:/Dropbox/www/giji-nuxt/pages/demo/oauth.vue"],"names":[],"mappings":"AACA,uBACE,WAAY,AACZ,mBAAoB,AACpB,yBAA0B,AAC1B,iBAAkB,AAClB,cAAkB,CACnB,AACD,2IAKE,SAAU,AACV,UAAW,AACX,sBAAwB,CACzB,AACD,0BACE,sBAAuB,AACvB,iBAAmB,CACpB,AACD,0BACE,YAAa,AACb,kBAAoB,CACrB,AACD,oCACE,oBAAsB,CACvB,AACD,uCACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,SAAU,AACV,SAAU,AACV,UAAW,AACX,mBAAoB,AACpB,iBAAkB,AAClB,yBAA2B,CAC5B","file":"oauth.vue","sourcesContent":["\n.talk[data-v-3eae1604] {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n  border-spacing: 0;\n  margin: 0 0 6px 0;\n}\n.talk thead[data-v-3eae1604],\n.talk tfoot[data-v-3eae1604],\n.talk tbody[data-v-3eae1604],\n.talk th[data-v-3eae1604],\n.talk td[data-v-3eae1604] {\n  border: 0;\n  padding: 0;\n  background: transparent;\n}\n.talk td[data-v-3eae1604] {\n  vertical-align: middle;\n  position: relative;\n}\n.talk th[data-v-3eae1604] {\n  width: 125px;\n  vertical-align: top;\n}\n.talk th .portrate[data-v-3eae1604] {\n  margin: 0 19px 0 16px;\n}\n.contentframe .baloon[data-v-3eae1604] {\n  position: absolute;\n  content: '';\n  width: 0;\n  height: 0;\n  top: 60px;\n  left: -6px;\n  border-style: solid;\n  border-width: 6px;\n  border-radius: 6px 0 0 6px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 431:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('br'), (_vm.profile) ? _c('table', {
    staticClass: "talk"
  }, [_c('tbody', [_c('tr', [_c('th', [(_vm.profile.icon) ? _c('img', {
    staticClass: "portrate",
    attrs: {
      "width": "90",
      "src": _vm.profile.icon
    }
  }) : _vm._e()]), _c('td', [_c('div', {
    staticClass: "baloon VSAY"
  }), _c('div', {
    staticClass: "chat VSAY"
  }, [_c('chat-head', {
    attrs: {
      "head": _vm.profile.nick,
      "sign": _vm.profile.provider
    }
  }), _c('div', {
    staticClass: "text center"
  }, [(_vm.profile.mail) ? _c('a', {
    attrs: {
      "href": 'mailto:' + _vm.profile.mail
    }
  }, [_vm._v("mail")]) : _vm._e(), _c('a', {
    attrs: {
      "href": _vm.profile.token
    }
  }, [_vm._v("token")])]), _c('chat-foot', {
    attrs: {
      "write_at": _vm.profile.write_at
    }
  })], 1)])])])]) : _vm._e(), _c('br'), _c('post', {
    attrs: {
      "write_at": Date.now(),
      "handle": "SSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "/auth/facebook"
    }
  }, [_vm._v("facebook")])]), _c('post', {
    attrs: {
      "write_at": Date.now(),
      "handle": "SSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "/auth/twitter"
    }
  }, [_vm._v("twitter")])]), _c('post', {
    attrs: {
      "write_at": Date.now(),
      "handle": "SSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "/auth/slack"
    }
  }, [_vm._v("slack")])]), _c('br'), _c('post', {
    attrs: {
      "write_at": Date.now(),
      "handle": "TSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "/auth/github"
    }
  }, [_vm._v("github")])]), _c('post', {
    attrs: {
      "write_at": Date.now(),
      "handle": "TSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "/auth/google"
    }
  }, [_vm._v("google")])])], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(417);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("390bdd55", content, true);

/***/ })

});
//# sourceMappingURL=6.nuxt.bundle.e10805ae7508e008fea9.js.map