webpackJsonp([4],{

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(447)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(409),
  /* template */
  __webpack_require__(434),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6e7c2c01",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  mixins: [
    __webpack_require__(98)("24h",
    "sow/story",
    function() {
      return this.book_id;
    }),
    __webpack_require__(38),
    __webpack_require__(99)({
      watch: function(val,
    key) {
        var chat_id;
        ({chat_id} = this);
        if (chat_id) {
          return this.$nextTick(function() {
            return this.$store.commit("menu/focus",
    chat_id);
          });
        }
      }
    })
  ],
  methods: {
    focus: function(idx1) {
      this.idx = idx1;
    },
    anker: function(book_id, a) {
      return this.$router.push({
        path: `../${this.part_id}/anker`,
        query: {a, back: this.back}
      });
    },
    part_prev: function() {
      var ref;
      return this.book = {
        part_id: (ref = this.part_prev_id) != null ? ref : this.part_id,
        page_idxs: [0]
      };
    },
    part_next: function() {
      var ref;
      return this.book = {
        part_id: (ref = this.part_next_id) != null ? ref : this.part_id,
        page_idxs: [0]
      };
    }
  },
  computed: {
    part_prev_id: function() {
      var ids, idx;
      if (this.part && this.book) {
        ids = this.book.parts.pluck('id');
        idx = ids.indexOf(this.part_id);
        return ids[idx - 1];
      }
    },
    part_next_id: function() {
      var ids, idx;
      if (this.part && this.book) {
        ids = this.book.parts.pluck('id');
        idx = ids.indexOf(this.part_id);
        return ids[idx + 1];
      }
    },
    page_all_contents: function() {
      return this.chats(this.part_id);
    }
  }
};


/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"_mode.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 434:
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
  }, [_c('nuxt-link', {
    staticClass: "item active",
    attrs: {
      "replace": "replace",
      "to": _vm.back_url
    }
  }, [_c('i', {
    staticClass: "fa fa-map-marker"
  })]), _c('check', {
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
    key: "summary",
    staticClass: "summary",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, [_c('mentions', {
    key: "1",
    on: {
      "anker": _vm.anker
    }
  }), _c('toc', {
    key: "2"
  }), _c('potofs', {
    key: "3"
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
  }, [_vm._v("メモ"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.memo(_vm.part_id).all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
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
  }, [_vm._v("タイトル"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.title(_vm.part_id).all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
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
  }, [_vm._v("バレ"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.full(_vm.part_id).all))]) : _vm._e()]), _c('btn', {
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
  }, [_vm._v("通常"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.normal(_vm.part_id).all))]) : _vm._e()])], 1), _c('span', [_c('btn', {
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
  }, [_vm._v("独り言"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.solo(_vm.part_id).all))]) : _vm._e()]), _c('btn', {
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
  }, [_vm._v("非日常"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.extra(_vm.part_id).all))]) : _vm._e()]), _c('btn', {
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
  }, [_vm._v("墓休み"), (_vm.part) ? _c('sup', [_vm._v(_vm._s(_vm.now.rest(_vm.part_id).all))]) : _vm._e()])], 1), _c('span')]), _c('div', {
    staticClass: "center"
  }, [(_vm.part_prev_id) ? _c('a', {
    on: {
      "click": _vm.part_prev
    }
  }, [_vm._v("前の日へ")]) : _vm._e(), (_vm.part_next_id) ? _c('a', {
    on: {
      "click": _vm.part_next
    }
  }, [_vm._v("次の日へ")]) : _vm._e()])])], 1), (_vm.mode == 'title' && _vm.book) ? _c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    staticClass: "form",
    attrs: {
      "handle": "MAKER",
      "deco": "head",
      "write_at": _vm.book.write_at,
      "head": _vm.book.head,
      "sign": _vm.book.sign,
      "log": _vm.book.log
    }
  })], 1) : _vm._e(), (_vm.mode == 'memo') ? _c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    staticClass: "form",
    attrs: {
      "handle": "footer"
    }
  }, [_c('span', [_c('btn', {
    attrs: {
      "as": "memos"
    },
    model: {
      value: (_vm.mode),
      callback: function($$v) {
        _vm.mode = $$v
      },
      expression: "mode"
    }
  }, [_c('i', {
    staticClass: "fa fa-expand"
  })])], 1), _c('span', [_vm._v("最新のメモを表示しています。")])])], 1) : _vm._e(), (_vm.mode == 'memos') ? _c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    staticClass: "form",
    attrs: {
      "handle": "footer"
    }
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
  }, [_c('i', {
    staticClass: "fa fa-compress"
  })])], 1), _c('span', [_vm._v("メモ掲載の一覧を表示しています。")])])], 1) : _vm._e(), _vm._l((_vm.page_contents), function(chats, idx) {
    return _c('div', {
      key: idx,
      staticClass: "inframe"
    }, _vm._l((chats), function(o) {
      return _c('chat', {
        key: o.id,
        attrs: {
          "id": o.id
        },
        on: {
          "anker": _vm.anker,
          "focus": _vm.focus
        }
      })
    }))
  }), _c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    key: "limitup",
    attrs: {
      "handle": "footer"
    }
  }, [(_vm.page_next_id) ? _c('scroll-mine', {
    attrs: {
      "as": _vm.page_next_id
    },
    on: {
      "input": _vm.page_add
    }
  }, [_vm._v("次頁")]) : _c('div', {
    staticClass: "center"
  }, [(_vm.part_prev_id) ? _c('a', {
    on: {
      "click": _vm.part_prev
    }
  }, [_vm._v("前の日へ")]) : _vm._e(), (_vm.part_next_id) ? _c('a', {
    on: {
      "click": _vm.part_next
    }
  }, [_vm._v("次の日へ")]) : _vm._e()])], 1)], 1)], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(420);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("30e87388", content, true);

/***/ })

});
//# sourceMappingURL=4.nuxt.bundle.a9d2277a59142c253e68.js.map