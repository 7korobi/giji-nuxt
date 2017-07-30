webpackJsonp([7],{

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(430)
}
var Component = __webpack_require__(23)(
  /* script */
  __webpack_require__(395),
  /* template */
  __webpack_require__(417),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40a97f76",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, q, watch;

({Query} = __webpack_require__(0));

BrowserValue = __webpack_require__(56);

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
        var read_at;
        this.$store.commit("menu/mode", this.menus);
        ({read_at} = this.$store.state.sow);
        return Query.books.find(this.book_id);
      },
      part: function() {
        var read_at;
        ({read_at} = this.$store.state.sow);
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
        var read_at;
        ({read_at} = this.$store.state.sow);
        ({chat_id: this.chat_id, part_id: this.part_id} = this.$store.state.book);
        return Query.chats.find(this.chat_id);
      },
      parts: function() {
        var ref, ref1;
        return (ref = (ref1 = this.book) != null ? ref1.parts.list : void 0) != null ? ref : [];
      },
      chats: function() {
        return Query.chats.parts(this.hide_potof_ids, this.mode);
      },
      chats_here: function() {
        return this.now[this.mode].list;
      },
      chats_pages: function() {
        return this.page_ids.map((page) => {
          return this.chats_here[page];
        });
      },
      all: function() {
        return Query.chats;
      },
      now: function() {
        if (this.part) {
          return {
            memo: this.all.pages(this.hide_potof_ids, 'memo', this.part_id),
            title: this.all.pages(this.hide_potof_ids, 'title', this.part_id),
            full: this.all.pages(this.hide_potof_ids, 'full', this.part_id),
            normal: this.all.pages(this.hide_potof_ids, 'normal', this.part_id),
            solo: this.all.pages(this.hide_potof_ids, 'solo', this.part_id),
            extra: this.all.pages(this.hide_potof_ids, 'extra', this.part_id),
            rest: this.all.pages(this.hide_potof_ids, 'rest', this.part_id)
          };
        } else {
          return this.all;
        }
      }
    }
  }
};


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(54)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 417:
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
  }, [(_vm.part_prev_id) ? _c('a', {
    on: {
      "click": _vm.part_prev
    }
  }, [_vm._v("前の日へ")]) : _vm._e(), (_vm.part_next_id) ? _c('a', {
    on: {
      "click": _vm.part_next
    }
  }, [_vm._v("次の日へ")]) : _vm._e()])]), _c('transition-group', {
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
        },
        on: {
          "!anker": function($event) {
            _vm.anker($event)
          }
        }
      })
    }))
  })), _c('report', {
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
  }, [_vm._v("次の日へ")]) : _vm._e()])], 1)], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(403);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("bf78b852", content, true);

/***/ })

});
//# sourceMappingURL=7.nuxt.bundle.81c62a886cfbe388ac4f.js.map