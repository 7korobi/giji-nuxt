webpackJsonp([8],{

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(459)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(412),
  /* template */
  __webpack_require__(442),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

var Query;

({Query} = __webpack_require__(1));

module.exports = {
  mixins: [
    __webpack_require__(38)({
      replace: {
        tag_id: "giji"
      }
    })
  ],
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

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".center-left,.center-right{display:none}", "", {"version":3,"sources":["D:/Dropbox/www/giji-nuxt/pages/character-tag.vue"],"names":[],"mappings":"AACA,2BAEE,YAAc,CACf","file":"character-tag.vue","sourcesContent":["\n.center-left,\n.center-right {\n  display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 442:
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

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(430);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2c69e8dc", content, true);

/***/ })

});
//# sourceMappingURL=8.nuxt.bundle.077cac05214fe5cfd654.js.map