webpackJsonp([8],{371:function(t,e,s){var n=s(0)(s(391),s(422),function(t){s(440)},null,null);t.exports=n.exports},391:function(t,e,s){var n;({Query:n}=s(1)),t.exports={mixins:[s(37)({replace:{tag_id:"giji"}})],computed:{set:function(){return n.tags.find(this.tag_id)},chrs:function(){return n.faces.tag(this.tag_id).list}},methods:{job:function(t){var e;return null==(e=n.chr_jobs.find(`${this.set.chr_set_ids.last}_${t}`))&&(e=n.chr_jobs.find(`all_${t}`)),e.job}}}},409:function(t,e,s){(t.exports=s(2)(!0)).push([t.i,".center-left,.center-right{display:none}","",{version:3,sources:["C:/Dropbox/www/giji-nuxt/pages/character-tag.vue"],names:[],mappings:"AACA,2BAEE,YAAc,CACf",file:"character-tag.vue",sourcesContent:["\n.center-left,\n.center-right {\n  display: none;\n}\n"],sourceRoot:""}])},422:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"outframe"},[s("div",{staticClass:"contentframe"},[s("div",{staticClass:"inframe"},[s("report",{attrs:{handle:"header",deco:"center"}},[s("tags",{model:{value:t.tag_id,callback:function(e){t.tag_id=e},expression:"tag_id"}}),s("sub",{staticStyle:{width:"100%"}},[t._v(t._s(t.chrs.length)+"人の"+t._s(t.set.long)+"を表示しています。")])],1)],1)]),s("div",{staticClass:"fullframe"},[s("transition-group",{staticClass:"portrates",attrs:{name:"list",tag:"div"}},t._l(t.chrs,function(e){return s("portrate",{key:e._id,attrs:{face_id:e._id}},[s("p",[t._v(t._s(t.job(e._id)))]),s("p",[t._v(t._s(e.name))])])}))],1),s("div",{staticClass:"contentframe"},[s("div",{staticClass:"inframe"},[s("report",{attrs:{handle:"footer",deco:"center"}},[s("nuxt-link",{attrs:{to:"/"}},[t._v("戻る")])],1)],1)])])},staticRenderFns:[]}},440:function(t,e,s){var n=s(409);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s(3)("2c69e8dc",n,!0)}});
//# sourceMappingURL=8.nuxt.bundle.7609713ff8093191bbe5.js.map