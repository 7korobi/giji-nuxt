webpackJsonp([12],{

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(403),
  /* template */
  __webpack_require__(428),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__(1));

module.exports = {
  mixins: [
    __webpack_require__(37)({
      replace: {
        tag_id: "all"
      }
    })
  ],
  computed: {
    name_blanks: function() {
      return Query.faces.name_blank();
    },
    name_counts: function() {
      return Query.faces.name_head(this.tag_id);
    }
  }
};


/***/ }),

/***/ 428:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('report', {
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
  }, [_vm._v("0人")]), _c('post', {
    attrs: {
      "handle": "TSAY"
    }
  }, _vm._l((_vm.name_blanks), function(name) {
    return _c('span', [_vm._v("<" + _vm._s(name) + ">")])
  })), _vm._l((_vm.name_counts), function(group, count) {
    return (0 < count) ? _c('div', {
      key: count
    }, [_c('transition-group', {
      staticClass: "posts",
      attrs: {
        "name": "list",
        "tag": "div"
      }
    }, [_c('report', {
      key: 'h' + count,
      attrs: {
        "handle": "header",
        "deco": "center"
      }
    }, [_vm._v(_vm._s(count) + "人")]), _vm._l((group), function(map) {
      return _c('post', {
        key: map.id,
        attrs: {
          "handle": "SSAY"
        }
      }, [_vm._v("<" + _vm._s(map.id) + "> " + _vm._s(map.set.join("、")))])
    })], 2)], 1) : _vm._e()
  }), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("戻る")])], 1)], 2)])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=12.nuxt.bundle.91a6edcea2a5744b9719.js.map