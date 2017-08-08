webpackJsonp([10],{

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(381),
  /* template */
  __webpack_require__(400),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 381:
/***/ (function(module, exports) {

module.exports = {
  default: {
    middleware: 'test',
    data: function(req) {
      var now;
      now = new Date() - 0;
      return {
        clicks: 0,
        name: req ? 'server' : 'client',
        times: [...[-3610, -3609, -3608, -3607, -3606, -3605, -3604, -3603, -3602, -3601, -3600, -3599, -3598, -3597, -3596, -3595, -3594, -3593, -3592, -3591, -3590], 2e308, ...[-70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50], 2e308, ...[50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], 2e308, ...[3590, 3591, 3592, 3593, 3594, 3595, 3596, 3597, 3598, 3599, 3600, 3601, 3602, 3603, 3604, 3605, 3606, 3607, 3608, 3609, 3610]].map(function(t) {
          return {
            at: now - t * 1000
          };
        })
      };
    },
    head: function() {
      return {
        title: `About Page (${this.name}-side)`
      };
    },
    methods: {
      reset: function(idx) {
        this.clicks++;
        return this.times[idx].at = new Date() - -62000;
      }
    }
  }
};


/***/ }),

/***/ 400:
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
      "head": "リアルクロックテスト",
      "sign": "ななころび",
      "handle": "SSAY"
    }
  }, _vm._l((_vm.times), function(time, idx) {
    return _c('timeago', {
      key: idx,
      attrs: {
        "since": time.at
      }
    })
  })), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("戻る")])], 1)], 1)])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=10.nuxt.bundle.7fd9d70deda0f8ab77c1.js.map