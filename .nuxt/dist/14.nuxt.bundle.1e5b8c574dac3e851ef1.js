webpackJsonp([14],{

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(447),
  /* template */
  __webpack_require__(475),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

var BrowserValue, Query, q;

({Query} = __webpack_require__(1));

BrowserValue = __webpack_require__(41);

q = new BrowserValue;

q.query({
  tag_id: "giji"
});

module.exports = {
  watch: q.watch(function() {}),
  data: function() {
    return q.data(this);
  },
  computed: {
    set: function() {
      return Query.tags.find(this.tag_id);
    },
    chrs: function() {
      return Query.faces.tag(this.tag_id).list;
    }
  },
  methods: {
    job: function(face_id) {
      var job;
      job = Query.chr_jobs.find(`${this.set.chr_set_ids.last}_${face_id}`);
      if (job == null) {
        job = Query.chr_jobs.find(`all_${face_id}`);
      }
      return job.job;
    }
  }
};


/***/ }),

/***/ 475:
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
  }), _c('sub', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(_vm._s(_vm.chrs.length) + "人の" + _vm._s(_vm.set.long) + "を表示しています。")])], 1)], 1)]), _c('div', {
    staticClass: "fullframe"
  }, [_c('transition-group', {
    staticClass: "portrates",
    attrs: {
      "name": "list",
      "tag": "div"
    }
  }, _vm._l((_vm.chrs), function(chr) {
    return _c('portrate', {
      key: chr._id,
      attrs: {
        "face_id": chr._id
      }
    }, [_c('p', [_vm._v(_vm._s(_vm.job(chr._id)))]), _c('p', [_vm._v(_vm._s(chr.name))])])
  }))], 1), _c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('report', {
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
//# sourceMappingURL=14.nuxt.bundle.1e5b8c574dac3e851ef1.js.map