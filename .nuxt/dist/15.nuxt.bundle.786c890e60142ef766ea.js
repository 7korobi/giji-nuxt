webpackJsonp([15],{

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(446),
  /* template */
  __webpack_require__(484),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

var Query, read_at;

({Query, read_at} = __webpack_require__(1));

module.exports = {
  default: {
    data: function() {
      return {
        menus: []
      };
    },
    methods: {
      back: function() {
        var chat, ids;
        ({ids} = this.$route.query);
        chat = Query.chats.find(ids[0]);
        return console.log(chat.book_id, chat.part_id, chat.id);
      },
      anker: function(ids) {
        var i, id, j, len, len1, ref, set;
        set = {};
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          set[id] = true;
        }
        ref = this.$route.query.ids;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          id = ref[j];
          set[id] = true;
        }
        ids = Object.keys(set);
        return this.$router.push({
          path: "/ankers",
          query: {ids}
        });
      }
    },
    computed: {
      chat_pages: function() {
        var ids;
        ({ids} = this.$route.query);
        return Query.chats.ankers(ids);
      }
    }
  }
};


/***/ }),

/***/ 484:
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
  }, [_c('a', {
    staticClass: "item active",
    on: {
      "click": _vm.back
    }
  }, [_c('i', {
    staticClass: "fa fa-map-pin"
  })])])])]), _c('div', {
    staticClass: "summary"
  }, [_c('mentions', {
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
  }, _vm._l((_vm.chat_pages.list), function(chats, idx) {
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
  }))], 1)])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=15.nuxt.bundle.786c890e60142ef766ea.js.map