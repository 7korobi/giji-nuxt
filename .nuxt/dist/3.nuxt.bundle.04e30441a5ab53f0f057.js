webpackJsonp([3],{

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(439)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(403),
  /* template */
  __webpack_require__(425),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40ef9a08",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, q, watch;

({Query} = __webpack_require__(1));

BrowserValue = __webpack_require__(36);

q = new BrowserValue;

q.params({
  book_id: ""
});

watch = q.watch(function(_, key, val) {});

watch.mode = function() {
  window.scrollTo(0, 0);
  return this.page_ids = [0];
};

module.exports = {
  default: {
    watch: watch,
    data: function() {
      return q.data(this, {
        hide_potof_ids: [],
        phase_ids: [],
        page_ids: [],
        menus: [],
        chat_id: "",
        part_id: "",
        mode: "full"
      });
    },
    mounted: function() {
      return this.$store.dispatch("sow/story", this.book_id).then(() => {
        var part;
        part = this.book.parts.list.first;
        this.part_id = part.id;
        return this.page_ids = [0];
      });
    },
    methods: {
      xxx: function() {}
    },
    computed: {
      book: function() {
        var read_at;
        this.$store.commit("menu/mode", this.menus);
        ({read_at} = this.$store.state.sow);
        return Query.books.find(this.book_id);
      },
      parts: function() {
        var ref, ref1;
        return (ref = (ref1 = this.book) != null ? ref1.parts.list : void 0) != null ? ref : [];
      }
    }
  }
};


/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"top.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 425:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "sideframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('div', {
    staticClass: "icons form"
  }, [_c('check', {
    staticClass: "item",
    attrs: {
      "as": "current"
    },
    model: {
      value: (_vm.menus),
      callback: function($$v) {
        _vm.menus = $$v
      },
      expression: "menus"
    }
  }, [_c('i', {
    staticClass: "fa fa-map-pin"
  })]), _c('check', {
    staticClass: "item",
    attrs: {
      "as": "toc"
    },
    model: {
      value: (_vm.menus),
      callback: function($$v) {
        _vm.menus = $$v
      },
      expression: "menus"
    }
  }, [_c('i', {
    staticClass: "fa fa-film"
  })]), _c('check', {
    staticClass: "item",
    attrs: {
      "as": "potof"
    },
    model: {
      value: (_vm.menus),
      callback: function($$v) {
        _vm.menus = $$v
      },
      expression: "menus"
    }
  }, [_c('i', {
    staticClass: "fa fa-users"
  })])], 1)])]), _c('div', {
    staticClass: "summary"
  }, [_c('mentions'), _c('toc', {
    attrs: {
      "chats": _vm.chats,
      "parts": _vm.parts
    }
  }), _c('potofs', {
    model: {
      value: (_vm.hide_potof_ids),
      callback: function($$v) {
        _vm.hide_potof_ids = $$v
      },
      expression: "hide_potof_ids"
    }
  })], 1), _c('div', {
    staticClass: "center-left"
  }), _c('div', {
    staticClass: "center-right"
  }), _c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    key: "finder",
    staticClass: "form",
    attrs: {
      "handle": "footer"
    }
  }, [_c('div', {
    staticClass: "center"
  }, [_c('span', [_c('btn', {
    attrs: {
      "as": "memo"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("メモ"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.memo.list.all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "title"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("タイトル"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.title.list.all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "full"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("バレ"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.full.list.all))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "normal"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("通常"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.normal.list.all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "solo"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("独り言"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.solo.list.all))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "extra"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("非日常"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.extra.list.all))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "rest"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_vm._v("墓休み"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.rest.list.all))]) : _vm._e()])], 1), _c('span')]), _c('div', {
    staticClass: "center"
  }, [_c('nuxt-link', {
    attrs: {
      "to": ".."
    }
  }, [_vm._v("ログ")])], 1)]), _c('transition-group', {
    staticClass: "inframe",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, _vm._l((_vm.chats_pages), function(chats, idx) {
    return _c('div', {
      key: idx
    }, _vm._l((chats), function(o) {
      return _c('chat', {
        key: o.id,
        attrs: {
          "id": o.id
        }
      })
    }))
  })), _c('report', {
    key: "limitup",
    attrs: {
      "handle": "footer"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": ".."
    }
  }, [_vm._v("ログ")])], 1)], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(411);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6c293449", content, true);

/***/ })

});
//# sourceMappingURL=3.nuxt.bundle.04e30441a5ab53f0f057.js.map