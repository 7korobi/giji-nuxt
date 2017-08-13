webpackJsonp([4],{

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(438)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(402),
  /* template */
  __webpack_require__(424),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40a97f76",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

var Query, read_at, see;

({Query, read_at} = __webpack_require__(1));

({see} = __webpack_require__(37));

module.exports = {
  default: {
    watch: {
      mode: function() {
        return this.book = {
          mode: this.mode,
          part_id: this.part_id,
          page_idxs: [0]
        };
      }
    },
    data: function() {
      return {
        menus: [],
        mode: "full",
        read_at: read_at
      };
    },
    mounted: function() {
      return this.$store.dispatch("sow/story", this.book_id).then(() => {
        return this.book = {
          part: this.book.parts.list[0],
          page_idxs: [0]
        };
      });
    },
    methods: {
      anker: function(ids) {
        return this.$router.push({
          path: "/ankers",
          query: {ids}
        });
      },
      page_add: function(id) {
        var page_idxs;
        page_idxs = [id, ...this.page_idxs].sort(function(a, b) {
          return a - b;
        });
        return this.book = {part_id: this.part_id, page_idxs};
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
    computed: Object.assign({}, see, {
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
      page_here_id: function() {
        var last, ref;
        ref = this.page_idxs, last = ref[ref.length - 1];
        return last;
      },
      page_next_id: function() {
        if ((this.page_here_id != null) && this.page_here_id + 1 < this.chats_here.length) {
          return this.page_here_id + 1;
        }
      },
      now: function() {
        this.$store.commit("menu/mode", this.menus);
        return Query.chats.now(this.hide_potof_ids);
      },
      chats: function() {
        return this.now[this.mode];
      },
      chats_here: function() {
        return this.chats(this.part_id);
      },
      chats_pages: function() {
        return this.page_idxs.map((page) => {
          return this.chats_here[page];
        });
      }
    })
  }
};


/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 424:
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
    key: "2",
    attrs: {
      "chats": _vm.chats
    }
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
  })])], 1), _c('span', [_c('btn', {
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
  }, [_vm._v("次の日へ")]) : _vm._e()])]), _vm._l((_vm.chats_pages), function(chats, idx) {
    return _c('transition-group', {
      key: idx,
      staticClass: "inframe",
      attrs: {
        "name": "list",
        "tag": "div"
      }
    }, _vm._l((chats), function(o) {
      return _c('chat', {
        key: o.id,
        attrs: {
          "id": o.id
        },
        on: {
          "!anker": function($event) {
            _vm.anker($event)
          }
        }
      })
    }))
  }), _c('report', {
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
  }, [_vm._v("次の日へ")]) : _vm._e()])], 1)], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(410);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("bf78b852", content, true);

/***/ })

});
//# sourceMappingURL=4.nuxt.bundle.1dcaf0a1fa66457c9dc7.js.map