webpackJsonp([9],{

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(410),
  /* template */
  __webpack_require__(430),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

var Query, relative_to, uniq;

({Query} = __webpack_require__(1));

({uniq, relative_to} = __webpack_require__(64));

module.exports = {
  mixins: [__webpack_require__(38)],
  mounted: function() {
    return this.menus = [...this.menus, "current"];
  },
  methods: {
    focus: function(idx) {
      var name, params, query;
      ({name, params, query} = this.$route);
      params = Object.assign({}, params, {idx});
      return this.$router.replace({name, params, query});
    },
    anker: function(book_id, a) {
      a = uniq(this.$route.query.a, a);
      return this.$router.replace(relative_to(this.$route, {a}));
    }
  },
  computed: {
    chat_pages: function() {
      var a;
      this.read_at;
      a = uniq(this.$route.query.a);
      return Query.chats.ankers(this.book_id, a).list;
    }
  }
};


/***/ }),

/***/ 430:
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
  }, _vm._l((_vm.chat_pages), function(chats, idx) {
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
  }))])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=9.nuxt.bundle.99c2d7f09c89080ea122.js.map