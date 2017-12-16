webpackJsonp([1],{

/***/ "JAFg":
/***/ (function(module, exports, __webpack_require__) {

var Query, _, folder_handle;

({Query} = __webpack_require__("L78F"));

_ = __webpack_require__("M4fF");

folder_handle = {
  offparty: 'ELSE',
  lobby: 'ELSE',
  test: 'ELSE',
  pan: 'ELSE',
  wolf: 'PSAY',
  allstar: 'PSAY',
  ultimate: 'PSAY',
  cabala: 'SSAY',
  morphe: 'SSAY',
  rp: 'VSAY',
  pretense: 'VSAY',
  soybean: 'VSAY',
  crazy: 'VSAY',
  perjury: 'VSAY',
  xebec: 'VSAY',
  ciel: 'VSAY'
};

module.exports = {
  mixins: [
    __webpack_require__("MdO5")("12h",
    "aggregate/face",
    function() {
      return this.id;
    }),
    __webpack_require__("nMnY")({
      push: {
        id: "c41",
        order: "story_ids.length"
      }
    })
  ],
  methods: {
    folder_handle: function(folder_id) {
      return folder_handle[folder_id];
    },
    log_url: function(book_id) {
      return {
        name: "sow-village-idx-mode",
        params: {
          mode: "title",
          idx: [...book_id, 0].join("-")
        }
      };
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

/***/ "MdO5":
/***/ (function(module, exports) {

var base;

base = function(timestr, name, calc) {
  var capture, time_num, time_tail, timeout;
  time_tail = timestr.slice(-1);
  time_num = timestr.slice(0, -1);
  timeout = (function() {
    switch (time_tail) {
      case "s":
        return 1000 * time_num;
      case "m":
        return 1000 * 60 * time_num;
      case "h":
        return 1000 * 3600 * time_num;
      case "d":
        return 1000 * 3600 * 24 * time_num;
    }
  })();
  capture = function(vue) {
    var key, payload, suffix;
    if (calc) {
      payload = calc.call(vue);
      suffix = JSON.stringify(payload);
    } else {
      payload = null;
      suffix = "";
    }
    key = name + suffix;
    return {payload, key, name};
  };
  return {
    mounted: function() {
      var key, o, payload, read_at, timer;
      ({timer, read_at} = this.$store.state);
      ({payload, key, name} = capture(this));
      o = {
        timer: {},
        read_at: {}
      };
      o.timer[key] = timeout;
      this.$store.commit("update", o);
      if (Date.now() - timeout < read_at[key]) {
        return new Promise(function(ok) {
          return ok();
        });
      } else {
        return this.$store.dispatch(name, payload).then(() => {
          o.read_at[key] = Date.now();
          return this.$store.commit("update", o);
        });
      }
    },
    computed: {
      read_at: function() {
        var key;
        ({key} = capture(this));
        return this.$store.state.read_at[key];
      }
    }
  };
};

base.plugin = function(arg) {
  this.arg = arg;
  return function({commit, state}) {
    var read_at, timer;
    ({timer, read_at} = state);
    return base.root = {commit, timer, read_at};
  };
};

module.exports = base;


/***/ }),

/***/ "bqp1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"outframe"},[_c('div',{staticClass:"contentframe"},[(_vm.face.story_length)?_c('div',{staticClass:"inframe"},[_c('c-post',{attrs:{"handle":"footer"}},[_c('bread-crumb',[_c('li',[_c('nuxt-link',{attrs:{"to":"/summary/faces"}},[_vm._v("キャラクター活躍記録")])],1)])],1),_c('c-report',{attrs:{"handle":"footer","deco":"center"}},[_c('h1',[_vm._v(_vm._s(_vm.face.name)+"の活躍")]),_c('div',{staticClass:"date"},[_c('timeago',{attrs:{"since":_vm.face.date_min}}),_vm._v(" ～ "),_c('timeago',{attrs:{"since":_vm.face.date_max}})],1)]),_c('c-talk',{attrs:{"handle":"TSAY","deco":"","face_id":_vm.face.id,"head":_vm.face.name}},[_c('b',[_vm._v(_vm._s(_vm.face.lives.sum))]),_vm._v("人が村にいました。"),_c('div',{staticClass:"flex"},_vm._l((_vm.face.lives),function(o){return _c('a',{staticClass:"label3",class:o._id.live},[_c('div',{staticClass:"label"},[_vm._v(_vm._s(o.role.label))]),_c('div',{staticClass:"count"},[_vm._v(_vm._s(o.story_ids.length)+"回")])])})),_vm._v("全部で"),_c('b',[_vm._v(_vm._s(_vm.face.roles.length))]),_vm._v("種類、のべ"),_c('b',[_vm._v(_vm._s(_vm.face.roles.sum))]),_vm._v("の能力を持ちました。"),_c('div',{staticClass:"flex"},_vm._l((_vm.face.roles),function(o){return _c('a',{staticClass:"label3",class:o.role.win},[_c('div',{staticClass:"label"},[_vm._v(_vm._s(o.role.label))]),_c('div',{staticClass:"count"},[_vm._v(_vm._s(o.story_ids.length)+"回")])])}))]),_c('c-report',{attrs:{"handle":"footer"}},[_c('table',[_c('thead',[_c('tr',[_c('th',[_vm._v("総合値")]),_c('th',[_vm._v("一番長い発言")]),_c('th',[_vm._v("総文字数")]),_c('th',[_vm._v("総発言回数")])])]),_vm._l((_vm.face.mestypes),function(o){return _c('tbody',{staticClass:"calc"},[_c('tr',{class:o.handle},[_c('th',[_vm._v(_vm._s(o.title))]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.max))+" 字")]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.all))+" 字")]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.count))+" 回")])])])})],2)]),_c('c-report',{attrs:{"handle":"footer"}},[_c('table',[_c('thead',[_c('tr',[_c('th',[_vm._v("平均値")]),_c('th',[_vm._v("/村数")]),_c('th',[_vm._v("文字数")]),_c('th',[_vm._v("発言回数")])])]),_vm._l((_vm.face.mestypes),function(o){return _c('tbody',{staticClass:"calc"},[_c('tr',{class:o.handle},[_c('th',[_vm._v(_vm._s(o.title))]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.per))+" 村")]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.all / o.per))+" 字")]),_c('td',[_vm._v(_vm._s(_vm._f("currency")(o.count / o.per))+" 回")])])])})],2)]),_vm._l((_vm.face.folders),function(folder){return _c('c-talk',{key:folder[0][0],staticClass:"form",attrs:{"handle":_vm.folder_handle(folder[0][0]),"face_id":_vm.face.id,"head":folder.nation}},[_vm._v(_vm._s(folder.length)+"回登場しました"),_c('div',{staticClass:"flex"},_vm._l((folder),function(id){return _c('nuxt-link',{key:id.join('-'),staticClass:"label-mini",attrs:{"to":_vm.log_url(id)}},[_vm._v(_vm._s(id[1]))])}))])}),_c('c-report',{staticClass:"form",attrs:{"handle":"VGSAY","deco":"center","head":_vm.face.name + 'で活躍した人達'}},[_c('btn',{attrs:{"as":"story_ids.length"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("参加村数")]),_c('btn',{attrs:{"as":"count"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("総発言回数")]),_c('btn',{attrs:{"as":"all"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("総発言文字数")]),_c('btn',{attrs:{"as":"date_min"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("古参度")]),_c('btn',{attrs:{"as":"date_max"},model:{value:(_vm.order),callback:function ($$v) {_vm.order=$$v},expression:"order"}},[_vm._v("新着度")]),_c('table',[_c('transition-group',{staticClass:"tlist",attrs:{"name":"list","tag":"tbody"}},_vm._l((_vm.sow_auths),function(o){return _c('tr',{key:o._id.sow_auth_id},[_c('th',[_c('div',{staticClass:"sow_auth_id"},[_vm._v(_vm._s(o._id.sow_auth_id))])]),_c('td',{staticClass:"r count"},[_vm._v(_vm._s(_vm._f("currency")(o.story_ids.length))+"村")]),_c('td',{staticClass:"r count"},[_vm._v(_vm._s(_vm._f("currency")(o.count))+"回")]),_c('td',{staticClass:"r count"},[_vm._v(_vm._s(_vm._f("currency")(o.all))+"文字")]),_c('td',{staticClass:"timer"},[_c('timeago',{staticClass:"count",attrs:{"since":o.date_min}})],1),_c('th',[_c('div',{staticClass:"pad"},[_vm._v("～")])]),_c('td',{staticClass:"timer"},[_c('timeago',{staticClass:"count",attrs:{"since":o.date_max}})],1)])}))],1)],1),_c('c-post',{attrs:{"handle":"footer"}},[_c('bread-crumb',[_c('li',[_c('nuxt-link',{attrs:{"to":"/summary/faces"}},[_vm._v("キャラクター活躍記録")])],1)])],1)],2):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ry+2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue__ = __webpack_require__("JAFg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_162a0357_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_id_vue__ = __webpack_require__("bqp1");
function injectStyle (ssrContext) {
  __webpack_require__("sEDy")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-162a0357"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_id_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_162a0357_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_id_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "sEDy":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("zgOG");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("684902aa", content, true);

/***/ }),

/***/ "zgOG":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "table[data-v-162a0357]{width:100%}td[data-v-162a0357],th[data-v-162a0357]{border-radius:3px;padding:2px 4px}.timer[data-v-162a0357]{white-space:nowrap;width:17ex}.r[data-v-162a0357]{white-space:nowrap;text-align:right}.sow_auth_id[data-v-162a0357]{text-align:center;margin:0 -2ex 0 0}.pad[data-v-162a0357]{text-align:left;font-size:.8em;margin:0 -4ex 0 -1ex}.chat .text a .count[data-v-162a0357],.chat .text td.count[data-v-162a0357],.chat .text td .count[data-v-162a0357]{font-size:.8em;padding:0}.calc td[data-v-162a0357]{font-weight:700;text-align:right}.flex[data-v-162a0357]{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex a[data-v-162a0357]{white-space:nowrap;display:block;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0}.flex a .label[data-v-162a0357]{margin:0 2.5ex 0 0;text-align:center;display:block}.flex a .count[data-v-162a0357]{margin:-1.4em -2px -2px;text-align:right;display:block}.label-mini[data-v-162a0357]{width:4ex;text-align:right}.label2[data-v-162a0357]{width:calc(16% - 4px)}.label3[data-v-162a0357]{width:calc(24% - 4px)}.label4[data-v-162a0357]{width:calc(32% - 4px)}.label5[data-v-162a0357]{width:calc(40% - 4px)}.label6[data-v-162a0357]{width:calc(48% - 4px)}.list[data-v-162a0357]{background:#000;padding:2px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.list-move[data-v-162a0357]{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.list-enter-to[data-v-162a0357]{-webkit-transition:all .2s ease .1s;transition:all .2s ease .1s}.list-leave-to[data-v-162a0357]{position:absolute}.list-enter[data-v-162a0357],.list-leave-to[data-v-162a0357]{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px)}", ""]);

// exports


/***/ })

});
//# sourceMappingURL=_id.9c78dd006856cfa795ad.js.map