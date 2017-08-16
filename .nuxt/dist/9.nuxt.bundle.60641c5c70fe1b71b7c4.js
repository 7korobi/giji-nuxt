webpackJsonp([9],{

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(405),
  /* template */
  __webpack_require__(424),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

var Query, computed, mounted, read_at;

({Query, read_at} = __webpack_require__(1));

({computed, mounted} = __webpack_require__(39));

module.exports = {
  scrollToTop: true,
  data: function() {
    return {read_at};
  },
  mounted: function() {
    this.menus = [...this.menus, "current"];
    return mounted();
  },
  methods: {
    focus: function(idx) {
      var name, params, query;
      ({name, params, query} = this.$route);
      params = Object.assign({}, params, {idx});
      return this.$router.replace({name, params, query});
    },
    anker: function(book_id, a) {
      var name, params, query;
      a = Array.from(new Set([...a, ...this.$route.query.a]));
      ({name, params, query} = this.$route);
      query = Object.assign({}, query, {a});
      return this.$router.replace({name, params, query});
    }
  },
  computed: Object.assign({}, computed, {
    chat_pages: function() {
      var a;
      this.read_at[`book.${this.book_id}`];
      a = Array.from(new Set([...this.$route.query.a]));
      return Query.chats.ankers(this.book_id, a).list;
    },
    back_url: function() {
      var chat_id, mode, pages;
      [chat_id, mode, pages] = this.$route.query.back.split(",");
      return {
        path: `../${chat_id}/${mode}`,
        query: {pages}
      };
    }
  })
};


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
  }, [_c('nuxt-link', {
    staticClass: "item active",
    attrs: {
      "replace": "replace",
      "to": _vm.back_url
    }
  }, [_c('i', {
    staticClass: "fa fa-map-pin"
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
  })], 1), _c('div', {
    staticClass: "center-left"
  }), _c('div', {
    staticClass: "center-right"
  }), _c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('transition-group', {
    staticClass: "inframe",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, _vm._l((_vm.chat_pages), function(chats, idx) {
    return _c('div', {
      key: idx
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
  }))], 1)])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=9.nuxt.bundle.60641c5c70fe1b71b7c4.js.map