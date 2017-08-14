webpackJsonp([5],{

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(440)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(404),
  /* template */
  __webpack_require__(423),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0cd08049",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

var Query, read_at;

({Query, read_at} = __webpack_require__(1));

module.exports = {
  data: function() {
    return {read_at};
  },
  mounted: function() {
    return this.$store.dispatch("story/progress");
  },
  computed: {
    prologue: function() {
      this.read_at.story_progress;
      return Query.sow_villages.prologue.list;
    },
    progress: function() {
      this.read_at.story_progress;
      return Query.sow_villages.progress.list;
    }
  }
};


/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".card[data-v-0cd08049]{padding:10px 0 10px 20px}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/pages/index.vue"],"names":[],"mappings":"AACA,uBACE,wBAA0B,CAC3B","file":"index.vue","sourcesContent":["\n.card[data-v-0cd08049] {\n  padding: 10px 0 10px 20px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 423:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('br'), _c('post', {
    attrs: {
      "handle": "XSAY",
      "write_at": 1169852700003
    }
  }, [_vm._v("祝！人狼議事10周年！")]), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_vm._v("みんなの情報")]), _c('post', {
    attrs: {
      "handle": "SSAY"
    }
  }, [_c('a', {
    attrs: {
      "href": "https://github.com/7korobi/giji-nuxt/commits/master"
    }
  }, [_vm._v("総合トップ")]), _c('a', {
    attrs: {
      "href": "https://github.com/7korobi/sow-giji/commits/cabala"
    }
  }, [_vm._v("ゲーム")]), _c('a', {
    attrs: {
      "href": "https://github.com/7korobi/sow-giji/commits/show-fix"
    }
  }, [_vm._v("ゲーム（新）")]), _c('div', {
    staticClass: "card"
  }, [_vm._v("人狼議事を構成するプログラムの、更新履歴はこちら。")])]), _c('post', {
    attrs: {
      "handle": "SSAY"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/rule-guide"
    }
  }, [_vm._v("人狼議事のルール")]), _c('br'), _c('div', {
    staticClass: "card"
  }, [_vm._v("人狼議事を遊ぶとき、従うべきルールはこちら。")])], 1), _c('post', {
    attrs: {
      "handle": "VSAY"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/character-tag"
    }
  }, [_vm._v("キャラクター一覧表")]), _c('br'), _c('div', {
    staticClass: "card"
  }, [_vm._v("人狼議事で遊ぶことができるキャラクターはこちら。")])], 1), _c('post', {
    attrs: {
      "handle": "VSAY"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/summary/faces"
    }
  }, [_vm._v("キャラクター活躍記録")]), _c('br'), _c('div', {
    staticClass: "card"
  }, [_vm._v("どこかの村で活躍したことのあるキャラクターはこちら。")])], 1), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_vm._v("開始待ちの村／進行中の村")]), _vm._l((_vm.progress), function(o) {
    return _c('post', {
      key: o._id,
      attrs: {
        "handle": "EVIL",
        "head": o.name
      }
    }, [_c('a', {
      attrs: {
        "href": o.folder.href
      }
    }, [_vm._v(_vm._s(o.folder.nation) + _vm._s(o.vid))]), _vm._v("は、進行中だ。"), _c('div', {
      staticClass: "date"
    }, [_c('timeago', {
      attrs: {
        "since": o.timer.nextcommitdt
      }
    })], 1)])
  }), _vm._l((_vm.prologue), function(o) {
    return _c('post', {
      key: o._id,
      attrs: {
        "handle": "MOB",
        "head": o.name
      }
    }, [_c('a', {
      attrs: {
        "href": o.folder.href
      }
    }, [_vm._v(_vm._s(o.folder.nation) + _vm._s(o.vid))]), _vm._v("は、開始が楽しみだ。"), _c('div', {
      staticClass: "date"
    }, [_c('timeago', {
      attrs: {
        "since": o.timer.nextcommitdt
      }
    })], 1)])
  }), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/demo"
    }
  }, [_vm._v("開発者用ページ")])], 1)], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(412);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("29075bcd", content, true);

/***/ })

});
//# sourceMappingURL=5.nuxt.bundle.3b00c16a8664c0d1437f.js.map