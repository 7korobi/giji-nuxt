webpackJsonp([0],{

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(422)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(387),
  /* template */
  __webpack_require__(411),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8e7d96f2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, _, q;

({Query} = __webpack_require__(1));

BrowserValue = __webpack_require__(34);

_ = __webpack_require__(4);

q = new BrowserValue;

q.query({
  order: "story_length",
  tag_id: "all"
});

module.exports = {
  default: {
    watch: q.watch(function() {}),
    data: function() {
      return q.data(this);
    },
    mounted: function() {
      return this.$store.dispatch("aggregate/faces");
    },
    computed: {
      faces: function() {
        var asc, read_at;
        asc = (function() {
          switch (this.order) {
            case "order":
            case "date_min":
              return "asc";
            default:
              return "desc";
          }
        }).call(this);
        ({read_at} = this.$store.state.aggregate);
        return Query.faces.tag(this.tag_id).sort(this.order, asc);
      }
    }
  }
};


/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".chrblank a[data-v-8e7d96f2]{display:block}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/pages/summary/faces/index.vue"],"names":[],"mappings":"AACA,6BACE,aAAe,CAChB","file":"index.vue","sourcesContent":["\n.chrblank a[data-v-8e7d96f2] {\n  display: block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 411:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('post', {
    attrs: {
      "handle": "SSAY"
    }
  }, [_vm._v(_vm._s(_vm.faces.list.length) + "人を表示しています。"), _c('ul', [_c('li', [_vm._v("人気度")]), _c('li', [_c('a', [_vm._v("キャラクター名（詳細へリンク）")])]), _c('li', [_vm._v("♥ いちばん沢山、そのキャラクターで遊んだプレイヤー")])])]), _c('report', {
    attrs: {
      "handle": "header",
      "deco": "center"
    }
  }, [_c('tags', {
    model: {
      value: (_vm.tag_id),
      callback: function($$v) {
        _vm.tag_id = $$v
      },
      expression: "tag_id"
    }
  })], 1), _c('report', {
    attrs: {
      "handle": "header",
      "deco": "center"
    }
  }, [_c('btn', {
    attrs: {
      "as": "order"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("基本")]), _c('btn', {
    attrs: {
      "as": "story_length"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("登場回数")]), _c('btn', {
    attrs: {
      "as": "fav_count"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("偏愛度")]), _c('btn', {
    attrs: {
      "as": "date_max"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("新着度")]), _c('btn', {
    attrs: {
      "as": "date_min"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("古参度")])], 1)], 1)]), _c('div', {
    staticClass: "fullframe"
  }, [_c('transition-group', {
    staticClass: "portrates",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, _vm._l((_vm.faces.list), function(face) {
    return _c('portrate', {
      key: face.id,
      attrs: {
        "face_id": face.id
      }
    }, [('fav_count' == _vm.order) ? _c('p', [_vm._v("♥" + _vm._s(face.fav_count) + "回")]) : _c('p', [_vm._v("登場" + _vm._s(face.story_length) + "回")]), ('date_max' == _vm.order) ? _c('p', [_c('timeago', {
      attrs: {
        "format": "short",
        "since": face.date_max
      }
    })], 1) : _vm._e(), ('date_min' == _vm.order) ? _c('p', [_c('timeago', {
      attrs: {
        "format": "short",
        "since": face.date_min
      }
    })], 1) : _vm._e(), _c('nuxt-link', {
      attrs: {
        "to": face.summary_url
      }
    }, [_c('p', [_vm._v(_vm._s(face.chr_jobs.list[0].job))]), _c('p', [_vm._v(_vm._s(face.name))])]), _c('p', [_vm._v("♥" + _vm._s(face.sow_auth_id))])], 1)
  }))], 1), _c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("戻る")])], 1)], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(395);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("03836546", content, true);

/***/ })

});
//# sourceMappingURL=0.nuxt.bundle.7e66b1d37a642f905d06.js.map