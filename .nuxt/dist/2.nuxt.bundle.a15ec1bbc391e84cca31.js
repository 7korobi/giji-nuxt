webpackJsonp([2],{

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(451)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(418),
  /* template */
  __webpack_require__(438),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4b5ea6a2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

var Query, _;

({Query} = __webpack_require__(1));

_ = __webpack_require__(5);

module.exports = {
  mixins: [
    __webpack_require__(98)("12h",
    "aggregate/face",
    function() {
      return this.id;
    }),
    __webpack_require__(38)({
      push: {
        id: "c41",
        order: "story_ids.length"
      }
    })
  ],
  filters: {
    currency: function(num) {
      var str;
      str = String(Math.ceil(num));
      while (str !== (str = str.replace(/^(-?\d+)(\d{3})/, "$1,$2"))) {
        true;
      }
      return str;
    }
  },
  methods: {
    log_url: function([folder, id]) {
      return `${env.STORE_URL}/stories/${folder}-${id}`;
    },
    label_size: function(str) {
      var ref, ref1, ref2, ref3, width;
      width = 0.8 * ((ref = str.match(/[iIjl]/g)) != null ? ref : []).length;
      width += 1.0 * ((ref1 = str.match(/[0-9a-hkm-z]/g)) != null ? ref1 : []).length;
      width += 1.3 * ((ref2 = str.match(/[A-HJ-Z]/g)) != null ? ref2 : []).length;
      width += 2.0 * ((ref3 = str.match(/[^0-9a-zA-Z]/g)) != null ? ref3 : []).length;
      switch (false) {
        case !(width < 6.5):
          return "label2";
        // when width < 13
        //   "label3"
        case !(width < 20.5):
          return "label4";
        default:
          // when width < 28
          //   "label5"
          return "label6";
      }
    }
  },
  computed: {
    sow_auths: function() {
      var asc;
      asc = (function() {
        switch (this.order) {
          case "date_min":
            return "asc";
          default:
            return "desc";
        }
      }).call(this);
      return _.orderBy(this.face.sow_auths, this.order, asc);
    },
    face: function() {
      this.read_at;
      return Query.faces.find(this.id);
    }
  }
};


/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "table[data-v-4b5ea6a2]{width:100%}td[data-v-4b5ea6a2],th[data-v-4b5ea6a2]{border-radius:3px;padding:2px 4px}.timer[data-v-4b5ea6a2]{white-space:nowrap;width:17ex}.r[data-v-4b5ea6a2]{white-space:nowrap;text-align:right}.sow_auth_id[data-v-4b5ea6a2]{text-align:center;margin:0 -2ex 0 0}.pad[data-v-4b5ea6a2]{text-align:left;font-size:.8em;margin:0 -4ex 0 -1ex}.chat .text a .count[data-v-4b5ea6a2],.chat .text td.count[data-v-4b5ea6a2],.chat .text td .count[data-v-4b5ea6a2]{font-size:.8em;padding:0}.calc td[data-v-4b5ea6a2]{font-weight:700;text-align:right}.flex[data-v-4b5ea6a2]{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex a[data-v-4b5ea6a2]{white-space:nowrap;display:block;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0}.flex a .label[data-v-4b5ea6a2]{margin:0 2.5ex 0 0;text-align:center;display:block}.flex a .count[data-v-4b5ea6a2]{margin:-1.4em -2px -2px;text-align:right;display:block}.label-mini[data-v-4b5ea6a2]{width:4ex;text-align:right}.label2[data-v-4b5ea6a2]{width:calc(16% - 4px)}.label3[data-v-4b5ea6a2]{width:calc(24% - 4px)}.label4[data-v-4b5ea6a2]{width:calc(32% - 4px)}.label5[data-v-4b5ea6a2]{width:calc(40% - 4px)}.label6[data-v-4b5ea6a2]{width:calc(48% - 4px)}.list[data-v-4b5ea6a2]{background:#000;padding:2px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.list-move[data-v-4b5ea6a2]{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.list-enter-to[data-v-4b5ea6a2]{-webkit-transition:all .2s ease .1s;-o-transition:all .2s ease .1s;transition:all .2s ease .1s}.list-leave-to[data-v-4b5ea6a2]{position:absolute}.list-enter[data-v-4b5ea6a2],.list-leave-to[data-v-4b5ea6a2]{opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px)}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/pages/summary/faces/_id.vue"],"names":[],"mappings":"AACA,uBACE,UAAY,CACb,AACD,wCAEE,kBAAmB,AACnB,eAAiB,CAClB,AACD,wBACE,mBAAoB,AACpB,UAAY,CACb,AACD,oBACE,mBAAoB,AACpB,gBAAkB,CACnB,AACD,8BACE,kBAAmB,AACnB,iBAAmB,CACpB,AACD,sBACE,gBAAiB,AACjB,eAAiB,AACjB,oBAAsB,CACvB,AACD,mHAGE,eAAiB,AACjB,SAAW,CACZ,AACD,0BACE,gBAAkB,AAClB,gBAAkB,CACnB,AACD,uBACE,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,8BAA+B,AAC3B,2BAA4B,AAChC,qBAAsB,AAClB,kBAAmB,AACf,yBAA0B,AAClC,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,mBAAoB,AAChB,cAAgB,CACrB,AACD,yBACE,mBAAoB,AACpB,cAAe,AACf,mBAAoB,AAChB,oBAAqB,AACjB,WAAa,CACtB,AACD,gCACE,mBAAoB,AACpB,kBAAmB,AACnB,aAAe,CAChB,AACD,gCACE,wBAA8B,AAC9B,iBAAkB,AAClB,aAAe,CAChB,AACD,6BACE,UAAW,AACX,gBAAkB,CACnB,AACD,yBACE,qBAA0B,CAC3B,AACD,yBACE,qBAA0B,CAC3B,AACD,yBACE,qBAA0B,CAC3B,AACD,yBACE,qBAA0B,CAC3B,AACD,yBACE,qBAA0B,CAC3B,AACD,uBACE,gBAAiB,AACjB,YAAa,AACb,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,mBAAoB,AAChB,eAAgB,AACpB,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,8BAA+B,AAC3B,2BAA4B,AAChC,yBAA0B,AACtB,4BAA8B,CACnC,AACD,4BACE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,gCACE,oCAAuC,AACvC,+BAAkC,AAClC,2BAA+B,CAChC,AACD,gCACE,iBAAmB,CACpB,AACD,6DAEE,UAAW,AACX,mCAAoC,AAChC,+BAAgC,AAC5B,0BAA4B,CACrC","file":"_id.vue","sourcesContent":["\ntable[data-v-4b5ea6a2] {\n  width: 100%;\n}\nth[data-v-4b5ea6a2],\ntd[data-v-4b5ea6a2] {\n  border-radius: 3px;\n  padding: 2px 4px;\n}\n.timer[data-v-4b5ea6a2] {\n  white-space: nowrap;\n  width: 17ex;\n}\n.r[data-v-4b5ea6a2] {\n  white-space: nowrap;\n  text-align: right;\n}\n.sow_auth_id[data-v-4b5ea6a2] {\n  text-align: center;\n  margin: 0 -2ex 0 0;\n}\n.pad[data-v-4b5ea6a2] {\n  text-align: left;\n  font-size: 0.8em;\n  margin: 0 -4ex 0 -1ex;\n}\n.chat .text td.count[data-v-4b5ea6a2],\n.chat .text td .count[data-v-4b5ea6a2],\n.chat .text a .count[data-v-4b5ea6a2] {\n  font-size: 0.8em;\n  padding: 0;\n}\n.calc td[data-v-4b5ea6a2] {\n  font-weight: bold;\n  text-align: right;\n}\n.flex[data-v-4b5ea6a2] {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-line-pack: distribute;\n      align-content: space-around;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex a[data-v-4b5ea6a2] {\n  white-space: nowrap;\n  display: block;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n}\n.flex a .label[data-v-4b5ea6a2] {\n  margin: 0 2.5ex 0 0;\n  text-align: center;\n  display: block;\n}\n.flex a .count[data-v-4b5ea6a2] {\n  margin: -1.4em -2px -2px -2px;\n  text-align: right;\n  display: block;\n}\n.label-mini[data-v-4b5ea6a2] {\n  width: 4ex;\n  text-align: right;\n}\n.label2[data-v-4b5ea6a2] {\n  width: calc( 16% -  4px );\n}\n.label3[data-v-4b5ea6a2] {\n  width: calc( 24% -  4px );\n}\n.label4[data-v-4b5ea6a2] {\n  width: calc( 32% -  4px );\n}\n.label5[data-v-4b5ea6a2] {\n  width: calc( 40% -  4px );\n}\n.label6[data-v-4b5ea6a2] {\n  width: calc( 48% -  4px );\n}\n.list[data-v-4b5ea6a2] {\n  background: #000;\n  padding: 2px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-line-pack: distribute;\n      align-content: space-around;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.list-move[data-v-4b5ea6a2] {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.list-enter-to[data-v-4b5ea6a2] {\n  -webkit-transition: all 0.2s ease 0.1s;\n  -o-transition: all 0.2s ease 0.1s;\n  transition: all 0.2s ease 0.1s;\n}\n.list-leave-to[data-v-4b5ea6a2] {\n  position: absolute;\n}\n.list-enter[data-v-4b5ea6a2],\n.list-leave-to[data-v-4b5ea6a2] {\n  opacity: 0;\n  -webkit-transform: translateY(30px);\n      -ms-transform: translateY(30px);\n          transform: translateY(30px);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 438:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [(_vm.face.story_length) ? _c('div', {
    staticClass: "inframe"
  }, [_c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('h1', [_vm._v(_vm._s(_vm.face.name) + "の活躍")]), _c('div', {
    staticClass: "date"
  }, [_c('timeago', {
    attrs: {
      "since": _vm.face.date_min
    }
  }), _vm._v(" ～ "), _c('timeago', {
    attrs: {
      "since": _vm.face.date_max
    }
  })], 1)]), _c('talk', {
    attrs: {
      "handle": "TSAY",
      "deco": "",
      "face_id": _vm.face.id,
      "head": _vm.face.name
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.face.lives.sum))]), _vm._v("人が村にいました。"), _c('div', {
    staticClass: "flex"
  }, _vm._l((_vm.face.lives), function(o) {
    return _c('a', {
      staticClass: "label3",
      class: o._id.live
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v(_vm._s(o.role.label))]), _c('div', {
      staticClass: "count"
    }, [_vm._v(_vm._s(o.story_ids.length) + "回")])])
  })), _vm._v("全部で"), _c('b', [_vm._v(_vm._s(_vm.face.roles.length))]), _vm._v("種類、のべ"), _c('b', [_vm._v(_vm._s(_vm.face.roles.sum))]), _vm._v("の能力を持ちました。"), _c('div', {
    staticClass: "flex"
  }, _vm._l((_vm.face.roles), function(o) {
    return _c('a', {
      staticClass: "label3",
      class: o.role.win
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v(_vm._s(o.role.label))]), _c('div', {
      staticClass: "count"
    }, [_vm._v(_vm._s(o.story_ids.length) + "回")])])
  }))]), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_c('table', [_c('thead', [_c('tr', {
    staticClass: "dark"
  }, [_c('th', [_vm._v("総合値")]), _c('th', [_vm._v("一番長い発言")]), _c('th', [_vm._v("総文字数")]), _c('th', [_vm._v("総発言回数")])])]), _vm._l((_vm.face.mestypes), function(o) {
    return _c('tbody', {
      staticClass: "calc"
    }, [_c('tr', {
      key: o.handle,
      class: o.handle
    }, [_c('th', [_vm._v(_vm._s(o.title))]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.max)) + " 字")]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.all)) + " 字")]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.count)) + " 回")])])])
  })], 2)]), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_c('table', [_c('thead', [_c('tr', {
    staticClass: "dark"
  }, [_c('th', [_vm._v("平均値")]), _c('th', [_vm._v("/村数")]), _c('th', [_vm._v("文字数")]), _c('th', [_vm._v("発言回数")])])]), _vm._l((_vm.face.mestypes), function(o) {
    return _c('tbody', {
      staticClass: "calc"
    }, [_c('tr', {
      key: o.handle,
      class: o.handle
    }, [_c('th', [_vm._v(_vm._s(o.title))]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.per)) + " 村")]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.all / o.per)) + " 字")]), _c('td', [_vm._v(_vm._s(_vm._f("currency")(o.count / o.per)) + " 回")])])])
  })], 2)]), _vm._l((_vm.face.folders), function(folder) {
    return _c('talk', {
      key: folder.nation,
      attrs: {
        "handle": "VSAY",
        "face_id": _vm.face.id,
        "head": folder.nation
      }
    }, [_vm._v(_vm._s(folder.length) + "回登場しました"), _c('div', {
      staticClass: "flex"
    }, _vm._l((folder), function(id) {
      return _c('a', {
        staticClass: "label-mini",
        attrs: {
          "href": _vm.log_url(id)
        }
      }, [_vm._v(_vm._s(id[1]))])
    }))])
  }), _c('report', {
    attrs: {
      "handle": "VGSAY",
      "deco": "center",
      "head": _vm.face.name + 'で活躍した人達'
    }
  }, [_c('btn', {
    attrs: {
      "as": "story_ids.length"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("参加村数")]), _c('btn', {
    attrs: {
      "as": "count"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("総発言回数")]), _c('btn', {
    attrs: {
      "as": "all"
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("総発言文字数")]), _c('btn', {
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
  }, [_vm._v("古参度")]), _c('btn', {
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
  }, [_vm._v("新着度")]), _c('table', [_c('transition-group', {
    staticClass: "tlist",
    attrs: {
      "name": "list",
      "tag": "tbody"
    }
  }, _vm._l((_vm.sow_auths), function(o) {
    return _c('tr', {
      key: o._id.sow_auth_id
    }, [_c('td', [_c('div', {
      staticClass: "sow_auth_id"
    }, [_vm._v(_vm._s(o._id.sow_auth_id))])]), _c('td', {
      staticClass: "r"
    }, [_vm._v(_vm._s(o.story_ids.length) + "村")]), _c('td', {
      staticClass: "r"
    }, [_vm._v(_vm._s(o.count) + "回")]), _c('td', {
      staticClass: "r"
    }, [_vm._v(_vm._s(o.all) + "文字")]), _c('td', {
      staticClass: "timer"
    }, [_c('timeago', {
      staticClass: "count",
      attrs: {
        "since": o.date_min
      }
    })], 1), _c('td', [_c('div', {
      staticClass: "pad"
    }, [_vm._v("～")])]), _c('td', {
      staticClass: "timer"
    }, [_c('timeago', {
      staticClass: "count",
      attrs: {
        "since": o.date_max
      }
    })], 1)])
  }))], 1)], 1), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "."
    }
  }, [_vm._v("戻る")])], 1)], 2) : _vm._e()])])
},staticRenderFns: []}

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(424);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("c3a83286", content, true);

/***/ })

});
//# sourceMappingURL=2.nuxt.bundle.a15ec1bbc391e84cca31.js.map