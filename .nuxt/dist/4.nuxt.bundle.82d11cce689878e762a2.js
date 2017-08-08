webpackJsonp([4],{

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(420)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(384),
  /* template */
  __webpack_require__(406),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40a97f76",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, q, read_at, watch;

({Query, read_at} = __webpack_require__(1));

BrowserValue = __webpack_require__(34);

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
        mode: "full",
        read_at: read_at
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
      anker: function(ids) {
        return this.$router.push({
          path: "/ankers",
          query: {ids}
        });
      },
      page_add: function(id) {
        return this.page_ids = [id, ...this.page_ids].sort(function(a, b) {
          return a - b;
        });
      },
      part_prev: function() {
        var ref;
        window.scrollTo(0, 0);
        this.part_id = (ref = this.part_prev_id) != null ? ref : this.part_id;
        return this.page_ids = [0];
      },
      part_next: function() {
        var ref;
        window.scrollTo(0, 0);
        this.part_id = (ref = this.part_next_id) != null ? ref : this.part_id;
        return this.page_ids = [0];
      }
    },
    computed: {
      book: function() {
        this.$store.commit("menu/mode", this.menus);
        this.read_at[`sow_story.${this.book_id}`];
        return Query.books.find(this.book_id);
      },
      part: function() {
        this.read_at[`sow_story.${this.book_id}`];
        return Query.parts.find(this.part_id);
      },
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
        ref = this.page_ids, last = ref[ref.length - 1];
        return last;
      },
      page_next_id: function() {
        if ((this.page_here_id != null) && this.page_here_id + 1 < this.chats_here.length) {
          return this.page_here_id + 1;
        }
      },
      chat: function() {
        var o;
        this.read_at[`sow_story.${this.book_id}`];
        o = this.$store.state.book;
        this.chat_id = o.chat_id;
        this.part_id = o.part_id;
        return Query.chats.find(this.chat_id);
      },
      parts: function() {
        var ref, ref1;
        return (ref = (ref1 = this.book) != null ? ref1.parts.list : void 0) != null ? ref : [];
      },
      now: function() {
        return Query.chats.now(this.hide_potof_ids);
      },
      chats: function() {
        return this.now[this.mode];
      },
      chats_here: function() {
        return this.chats(this.part_id);
      },
      chats_pages: function() {
        return this.page_ids.map((page) => {
          return this.chats_here[page];
        });
      }
    }
  }
};


/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 406:
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
  }, [_c('mentions', {
    on: {
      "anker": _vm.anker
    }
  }), _c('toc', {
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

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(392);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("bf78b852", content, true);

/***/ })

});
//# sourceMappingURL=4.nuxt.bundle.82d11cce689878e762a2.js.map