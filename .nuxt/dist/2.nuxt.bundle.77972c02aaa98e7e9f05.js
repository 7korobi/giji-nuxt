webpackJsonp([2],{

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(495)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(458),
  /* template */
  __webpack_require__(483),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8875469c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, _, el, q, read_at;

_ = __webpack_require__(7);

({Query, read_at} = __webpack_require__(1));

BrowserValue = __webpack_require__(41);

el = __webpack_require__(74);

q = new BrowserValue;

q.query({
  order: "vid",
  folder_id: [],
  yeary: [],
  monthry: [],
  upd_range: [],
  upd_at: [],
  sow_auth_id: [],
  rating: [],
  size: [],
  say: [],
  game: [],
  option: [],
  event: [],
  discard: [],
  config: []
});

module.exports = {
  watch: q.watch(function(_, key, val) {
    this.limit = 25;
    return this.drill = true;
  }),
  data: function() {
    return q.data(this, {
      mode: "oldlog",
      limit: 25,
      asc: "desc",
      drill: false,
      read_at: read_at
    });
  },
  mounted: function() {
    return this.$store.dispatch("story/oldlog");
  },
  methods: {
    reset: function() {
      this.$router.replace({
        query: {}
      });
      return Object.assign(this, q.base.query);
    },
    rating_img: function(rating) {
      return `${env.STORE_URL}/images/icon/cd_${rating}.png`;
    },
    submenu: function(as) {
      return this.drill = !this.drill;
    },
    summary: function(key) {
      var ref;
      return (ref = this.all.reduce) != null ? ref[key] : void 0;
    }
  },
  computed: {
    query_in: function() {
      var i, key, len, obj, ref;
      obj = {};
      ref = ["option", "event", "discard", "config"];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        if (!this[key].length) {
          continue;
        }
        obj["card." + key] = this[key];
      }
      return obj;
    },
    query_where: function() {
      var i, key, len, obj, ref;
      obj = {};
      ref = ["folder_id", "yeary", "monthry", "upd_range", "upd_at", "sow_auth_id", "rating", "size", "say", "game"];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        if (!this[key].length) {
          continue;
        }
        obj["q." + key] = this[key];
      }
      return obj;
    },
    limit_next: function() {
      this.read_at.story_oldlog;
      return Math.min(this.villages_all.list.length, this.limit + 25);
    },
    all: function() {
      this.read_at.story_oldlog;
      return Query.sow_villages.mode(this.mode);
    },
    villages_all: function() {
      this.read_at.story_oldlog;
      return Query.sow_villages.search(this.mode, this.query_in, this.query_where, this.order, this.asc);
    },
    villages: function() {
      return this.villages_all.list.slice(0, this.limit);
    }
  }
};


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".cards[data-v-8875469c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-line-pack:distribute;align-content:space-around;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.card[data-v-8875469c]{padding:2px}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/pages/sow/village/index.vue"],"names":[],"mappings":"AACA,wBACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,qBAAsB,AAClB,iBAAkB,AACtB,8BAA+B,AAC3B,2BAA4B,AAChC,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,uBAAwB,AACpB,oBAAqB,AACjB,0BAA4B,CACrC,AACD,uBACE,WAAa,CACd","file":"index.vue","sourcesContent":["\n.cards[data-v-8875469c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -ms-flex-line-pack: distribute;\n      align-content: space-around;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.card[data-v-8875469c] {\n  padding: 2px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 483:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('transition-group', {
    staticClass: "inframe",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, [_c('post', {
    key: "form",
    staticClass: "form",
    attrs: {
      "handle": "btns"
    }
  }, [_c('span', [_c('btn', {
    attrs: {
      "as": "",
      "value": "order"
    },
    on: {
      "input": function($event) {
        _vm.reset()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-eraser"
  })])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "vid"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("州"), (_vm.folder_id.length) ? _c('sup', [_vm._v(_vm._s(_vm.folder_id.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "rating"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("レーティング"), (_vm.rating.length) ? _c('sup', [_vm._v(_vm._s(_vm.rating.length))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "timer.updateddt"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("日時"), (_vm.yeary.length + _vm.monthry.length) ? _c('sup', [_vm._v(_vm._s(_vm.yeary.length + _vm.monthry.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "upd_range"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("更新間隔"), (_vm.upd_range.length) ? _c('sup', [_vm._v(_vm._s(_vm.upd_range.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "upd_at"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("更新時刻"), (_vm.upd_at.length) ? _c('sup', [_vm._v(_vm._s(_vm.upd_at.length))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "vpl.0"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("人数"), (_vm.size.length) ? _c('sup', [_vm._v(_vm._s(_vm.size.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "say.CAPTION"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("発言ルール"), (_vm.say.length) ? _c('sup', [_vm._v(_vm._s(_vm.say.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "game.label"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("ゲーム"), (_vm.game.length) ? _c('sup', [_vm._v(_vm._s(_vm.game.length))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "sow_auth_id"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("村建て人"), (_vm.sow_auth_id.length) ? _c('sup', [_vm._v(_vm._s(_vm.sow_auth_id.length))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "card.option"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("村設定"), (_vm.option.length) ? _c('sup', [_vm._v(_vm._s(_vm.option.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "card.config"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("参加役職"), (_vm.config.length) ? _c('sup', [_vm._v(_vm._s(_vm.config.length))]) : _vm._e()])], 1), _c('span', [_c('btn', {
    attrs: {
      "as": "card.event"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("破棄事件"), (_vm.event.length) ? _c('sup', [_vm._v(_vm._s(_vm.event.length))]) : _vm._e()]), _c('btn', {
    attrs: {
      "as": "card.discard"
    },
    on: {
      "toggle": _vm.submenu
    },
    model: {
      value: (_vm.order),
      callback: function($$v) {
        _vm.order = $$v
      },
      expression: "order"
    }
  }, [_vm._v("破棄役職"), (_vm.discard.length) ? _c('sup', [_vm._v(_vm._s(_vm.discard.length))]) : _vm._e()])], 1), _c('sub', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(_vm._s(_vm.villages_all.list.length) + "村があてはまります。")])]), (_vm.drill) ? _c('post', {
    key: "subform",
    staticClass: "form",
    attrs: {
      "handle": "btns"
    }
  }, [(_vm.order === 'vid') ? _c('p', _vm._l((_vm.summary('folder_id')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.folder_id),
        callback: function($$v) {
          _vm.folder_id = $$v
        },
        expression: "folder_id"
      }
    }, [_vm._v(_vm._s(o.id)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'timer.updateddt') ? _c('p', _vm._l((_vm.summary('yeary')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.yeary),
        callback: function($$v) {
          _vm.yeary = $$v
        },
        expression: "yeary"
      }
    }, [_vm._v(_vm._s(o.id)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'timer.updateddt') ? _c('p', _vm._l((_vm.summary('monthry')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.monthry),
        callback: function($$v) {
          _vm.monthry = $$v
        },
        expression: "monthry"
      }
    }, [_vm._v(_vm._s(o.id)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'upd_range') ? _c('p', _vm._l((_vm.summary('upd_range')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.upd_range),
        callback: function($$v) {
          _vm.upd_range = $$v
        },
        expression: "upd_range"
      }
    }, [_vm._v(_vm._s(o.id)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'upd_at') ? _c('p', _vm._l((_vm.summary('upd_at')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.upd_at),
        callback: function($$v) {
          _vm.upd_at = $$v
        },
        expression: "upd_at"
      }
    }, [_vm._v(_vm._s(o.id)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'sow_auth_id') ? _c('p', _vm._l((_vm.summary('sow_auth_id')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.sow_auth_id),
        callback: function($$v) {
          _vm.sow_auth_id = $$v
        },
        expression: "sow_auth_id"
      }
    }, [_vm._v(_vm._s(o.id.replace(/\&\#2e/ig, '.'))), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'rating') ? _c('p', _vm._l((_vm.summary('rating')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.rating),
        callback: function($$v) {
          _vm.rating = $$v
        },
        expression: "rating"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.rating_img(o.id)
      }
    }), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'vpl.0') ? _c('p', _vm._l((_vm.summary('size')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.size),
        callback: function($$v) {
          _vm.size = $$v
        },
        expression: "size"
      }
    }, [_vm._v(_vm._s(o.id) + "人"), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'card.option') ? _c('p', _vm._l((_vm.summary('option')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.option),
        callback: function($$v) {
          _vm.option = $$v
        },
        expression: "option"
      }
    }, [_vm._v(_vm._s(o.label)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'card.event') ? _c('p', _vm._l((_vm.summary('event')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.event),
        callback: function($$v) {
          _vm.event = $$v
        },
        expression: "event"
      }
    }, [_vm._v(_vm._s(o.label)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'card.config') ? _c('p', _vm._l((_vm.summary('config')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.config),
        callback: function($$v) {
          _vm.config = $$v
        },
        expression: "config"
      }
    }, [_vm._v(_vm._s(o.label)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'card.discard') ? _c('p', _vm._l((_vm.summary('discard')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.discard),
        callback: function($$v) {
          _vm.discard = $$v
        },
        expression: "discard"
      }
    }, [_vm._v(_vm._s(o.label)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'say.CAPTION') ? _c('p', _vm._l((_vm.summary('say')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.say),
        callback: function($$v) {
          _vm.say = $$v
        },
        expression: "say"
      }
    }, [_vm._v(_vm._s(o.CAPTION)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e(), (_vm.order === 'game.label') ? _c('p', _vm._l((_vm.summary('game')), function(o) {
    return _c('check', {
      key: o.id,
      attrs: {
        "as": o.id
      },
      model: {
        value: (_vm.game),
        callback: function($$v) {
          _vm.game = $$v
        },
        expression: "game"
      }
    }, [_vm._v(_vm._s(o.label)), (1 < o.count) ? _c('sup', [_vm._v(_vm._s(o.count))]) : _vm._e()])
  })) : _vm._e()]) : _vm._e(), _vm._l((_vm.villages), function(o) {
    return _c('report', {
      key: o._id,
      attrs: {
        "handle": "MAKER",
        "write_at": o.timer.updateddt,
        "id": o._id
      }
    }, [_c('div', {
      staticClass: "name"
    }, [_c('sup', {
      staticClass: "pull-right"
    }, [_vm._v(_vm._s(o.sow_auth_id))]), _c('a', {
      attrs: {
        "href": o.href
      }
    }, [_vm._v(_vm._s(o.name))])]), _c('div', {
      staticClass: "cards"
    }, [_c('table', {
      staticClass: "btns card",
      staticStyle: {
        "width": "33%"
      }
    }, [_c('tbody', [_c('tr', [_c('td', {
      staticStyle: {
        "text-align": "right"
      },
      attrs: {
        "colspan": "2"
      }
    }, [_c('nuxt-link', {
      attrs: {
        "to": 'village/' + o.id
      }
    }, [_vm._v(_vm._s(o.id))]), _c('kbd', {
      staticStyle: {
        "width": "40px"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.rating_img(o.q.rating)
      }
    })])], 1)]), _c('tr', [_c('th', [_vm._v("更新")]), _c('td', [_vm._v(_vm._s(o.q.upd_range) + "毎 " + _vm._s(o.q.upd_at))])]), _c('tr', [_c('th', [_vm._v("規模")]), _c('td', [_vm._v(_vm._s(o.q.size) + "人 " + _vm._s(o.say.CAPTION))])])])]), _c('div', {
      staticClass: "card",
      staticStyle: {
        "width": "66%"
      }
    }, [_c('p', [(o.mob) ? _c('a', {
      staticClass: "label",
      class: o.mob.win
    }, [_vm._v(_vm._s(o.mob.label))]) : _vm._e(), (o.game) ? _c('a', {
      staticClass: "label"
    }, [_vm._v(_vm._s(o.game.label))]) : _vm._e(), _vm._l((o.option_datas.list), function(opt) {
      return _c('a', [_c('div', {
        staticClass: "label"
      }, [_vm._v(_vm._s(opt.label))])])
    })], 2), _c('p', _vm._l((o.roles.config), function(role) {
      return _c('a', {
        class: role.win
      }, [_c('div', {
        staticClass: "label"
      }, [_vm._v(_vm._s(role.label)), (1 < role.count) ? _c('sup', [_vm._v(_vm._s(role.count))]) : _vm._e()])])
    })), _c('hr'), _c('p', _vm._l((o.roles.event), function(role) {
      return _c('a', {
        class: role.win
      }, [_c('div', {
        staticClass: "label"
      }, [_vm._v(_vm._s(role.label)), (1 < role.count) ? _c('sup', [_vm._v(_vm._s(role.count))]) : _vm._e()])])
    })), _c('p', _vm._l((o.roles.discard), function(role) {
      return _c('a', {
        class: role.win
      }, [_c('div', {
        staticClass: "label"
      }, [_vm._v(_vm._s(role.label)), (1 < role.count) ? _c('sup', [_vm._v(_vm._s(role.count))]) : _vm._e()])])
    }))])])])
  }), _c('report', {
    key: "limitup",
    attrs: {
      "handle": "btns"
    }
  }, [_c('scroll-mine', {
    key: "add",
    attrs: {
      "as": _vm.limit + 25
    },
    model: {
      value: (_vm.limit),
      callback: function($$v) {
        _vm.limit = $$v
      },
      expression: "limit"
    }
  }, [_vm._v(_vm._s(_vm.limit_next) + "件")])], 1)], 2)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(467);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("6b02251f", content, true);

/***/ })

});
//# sourceMappingURL=2.nuxt.bundle.77972c02aaa98e7e9f05.js.map