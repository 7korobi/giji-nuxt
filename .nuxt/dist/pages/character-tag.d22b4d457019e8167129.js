webpackJsonp([9],{"Q+nk":function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("no-ssr",[s("div",{staticClass:"outframe"},[s("div",{staticClass:"contentframe"},[s("div",{staticClass:"inframe"},[s("c-post",{attrs:{handle:"footer"}},[s("bread-crumb")],1),s("c-report",{attrs:{handle:"header",deco:"center"}},[s("tags",{model:{value:t.tag_id,callback:function(e){t.tag_id=e},expression:"tag_id"}}),s("sub",{staticStyle:{width:"100%"}},[t._v(t._s(t.chrs.length)+"人の"+t._s(t.set.long)+"を表示しています。")])],1)],1)]),s("div",{staticClass:"fullframe"},[s("transition-group",{staticClass:"portrates",attrs:{name:"list",tag:"div"}},t._l(t.chrs,function(e){return s("portrate",{key:e._id,attrs:{face_id:e._id}},[s("p",[t._v(t._s(t.job(e._id)))]),s("p",[t._v(t._s(e.name))])])}))],1),s("div",{staticClass:"contentframe"},[s("div",{staticClass:"inframe"},[s("c-post",{attrs:{handle:"footer"}},[s("bread-crumb")],1)],1)])])])},staticRenderFns:[]};e.a=a},adUO:function(t,e,s){var a;({Query:a}=s("L78F")),t.exports={mixins:[s("nMnY")({replace:{tag_id:"giji"}})],computed:{set:function(){return a.tags.find(this.tag_id)},chrs:function(){return a.faces.tag(this.tag_id).list}},methods:{job:function(t){return this.set.chr_job(t).job}}}},ggZx:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".center-left,.center-right{display:none}",""])},jLAe:function(t,e,s){var a=s("ggZx");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("2c80e068",a,!0)},mVin:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("adUO"),n=s.n(a),r=s("Q+nk");var i=function(t){s("jLAe")},c=s("VU/8")(n.a,r.a,!1,i,null,null);e.default=c.exports}});
//# sourceMappingURL=character-tag.d22b4d457019e8167129.js.map