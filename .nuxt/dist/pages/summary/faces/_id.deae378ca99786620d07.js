webpackJsonp([3],{"1ukY":function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"table[data-v-4b5ea6a2]{width:100%}td[data-v-4b5ea6a2],th[data-v-4b5ea6a2]{border-radius:3px;padding:2px 4px}.timer[data-v-4b5ea6a2]{white-space:nowrap;width:17ex}.r[data-v-4b5ea6a2]{white-space:nowrap;text-align:right}.sow_auth_id[data-v-4b5ea6a2]{text-align:center;margin:0 -2ex 0 0}.pad[data-v-4b5ea6a2]{text-align:left;font-size:.8em;margin:0 -4ex 0 -1ex}.chat .text a .count[data-v-4b5ea6a2],.chat .text td.count[data-v-4b5ea6a2],.chat .text td .count[data-v-4b5ea6a2]{font-size:.8em;padding:0}.calc td[data-v-4b5ea6a2]{font-weight:700;text-align:right}.flex[data-v-4b5ea6a2]{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex a[data-v-4b5ea6a2]{white-space:nowrap;display:block;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0}.flex a .label[data-v-4b5ea6a2]{margin:0 2.5ex 0 0;text-align:center;display:block}.flex a .count[data-v-4b5ea6a2]{margin:-1.4em -2px -2px;text-align:right;display:block}.label-mini[data-v-4b5ea6a2]{width:4ex;text-align:right}.label2[data-v-4b5ea6a2]{width:calc(16% - 4px)}.label3[data-v-4b5ea6a2]{width:calc(24% - 4px)}.label4[data-v-4b5ea6a2]{width:calc(32% - 4px)}.label5[data-v-4b5ea6a2]{width:calc(40% - 4px)}.label6[data-v-4b5ea6a2]{width:calc(48% - 4px)}.list[data-v-4b5ea6a2]{background:#000;padding:2px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:distribute;align-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.list-move[data-v-4b5ea6a2]{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.list-enter-to[data-v-4b5ea6a2]{-webkit-transition:all .2s ease .1s;transition:all .2s ease .1s}.list-leave-to[data-v-4b5ea6a2]{position:absolute}.list-enter[data-v-4b5ea6a2],.list-leave-to[data-v-4b5ea6a2]{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px)}",""])},JAFg:function(t,a,e){var s,r,l;({Query:s}=e("L78F")),r=e("M4fF"),l={offparty:"ELSE",lobby:"ELSE",test:"ELSE",pan:"ELSE",wolf:"PSAY",allstar:"PSAY",ultimate:"PSAY",cabala:"SSAY",morphe:"SSAY",rp:"VSAY",pretense:"VSAY",soybean:"VSAY",crazy:"VSAY",perjury:"VSAY",xebec:"VSAY",ciel:"VSAY"},t.exports={mixins:[e("MdO5")("12h","aggregate/face",function(){return this.id}),e("nMnY")({push:{id:"c41",order:"story_ids.length"}})],methods:{folder_handle:function(t){return l[t]},log_url:function(t){return{name:"sow-village-idx-mode",params:{mode:"title",idx:[...t,0].join("-")}}},label_size:function(t){var a,e,s,r,l;switch(l=.8*(null!=(a=t.match(/[iIjl]/g))?a:[]).length,l+=1*(null!=(e=t.match(/[0-9a-hkm-z]/g))?e:[]).length,l+=1.3*(null!=(s=t.match(/[A-HJ-Z]/g))?s:[]).length,l+=2*(null!=(r=t.match(/[^0-9a-zA-Z]/g))?r:[]).length,!1){case!(l<6.5):return"label2";case!(l<20.5):return"label4";default:return"label6"}}},computed:{sow_auths:function(){var t;return t=function(){switch(this.order){case"date_min":return"asc";default:return"desc"}}.call(this),r.orderBy(this.face.sow_auths,this.order,t)},face:function(){return this.read_at,s.faces.find(this.id)}}}},VQBr:function(t,a,e){var s=e("1ukY");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("1b8bdcdf",s,!0)},c5fr:function(t,a,e){"use strict";var s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"contentframe"},[t.face.story_length?e("div",{staticClass:"inframe"},[e("report",{attrs:{handle:"footer",deco:"center"}},[e("h1",[t._v(t._s(t.face.name)+"の活躍")]),e("div",{staticClass:"date"},[e("timeago",{attrs:{since:t.face.date_min}}),t._v(" ～ "),e("timeago",{attrs:{since:t.face.date_max}})],1)]),e("talk",{attrs:{handle:"TSAY",deco:"",face_id:t.face.id,head:t.face.name}},[e("b",[t._v(t._s(t.face.lives.sum))]),t._v("人が村にいました。"),e("div",{staticClass:"flex"},t._l(t.face.lives,function(a){return e("a",{staticClass:"label3",class:a._id.live},[e("div",{staticClass:"label"},[t._v(t._s(a.role.label))]),e("div",{staticClass:"count"},[t._v(t._s(a.story_ids.length)+"回")])])})),t._v("全部で"),e("b",[t._v(t._s(t.face.roles.length))]),t._v("種類、のべ"),e("b",[t._v(t._s(t.face.roles.sum))]),t._v("の能力を持ちました。"),e("div",{staticClass:"flex"},t._l(t.face.roles,function(a){return e("a",{staticClass:"label3",class:a.role.win},[e("div",{staticClass:"label"},[t._v(t._s(a.role.label))]),e("div",{staticClass:"count"},[t._v(t._s(a.story_ids.length)+"回")])])}))]),e("report",{attrs:{handle:"footer"}},[e("table",[e("thead",[e("tr",[e("th",[t._v("総合値")]),e("th",[t._v("一番長い発言")]),e("th",[t._v("総文字数")]),e("th",[t._v("総発言回数")])])]),t._l(t.face.mestypes,function(a){return e("tbody",{staticClass:"calc"},[e("tr",{class:a.handle},[e("th",[t._v(t._s(a.title))]),e("td",[t._v(t._s(t._f("currency")(a.max))+" 字")]),e("td",[t._v(t._s(t._f("currency")(a.all))+" 字")]),e("td",[t._v(t._s(t._f("currency")(a.count))+" 回")])])])})],2)]),e("report",{attrs:{handle:"footer"}},[e("table",[e("thead",[e("tr",[e("th",[t._v("平均値")]),e("th",[t._v("/村数")]),e("th",[t._v("文字数")]),e("th",[t._v("発言回数")])])]),t._l(t.face.mestypes,function(a){return e("tbody",{staticClass:"calc"},[e("tr",{class:a.handle},[e("th",[t._v(t._s(a.title))]),e("td",[t._v(t._s(t._f("currency")(a.per))+" 村")]),e("td",[t._v(t._s(t._f("currency")(a.all/a.per))+" 字")]),e("td",[t._v(t._s(t._f("currency")(a.count/a.per))+" 回")])])])})],2)]),t._l(t.face.folders,function(a){return e("talk",{key:a[0][0],staticClass:"form",attrs:{handle:t.folder_handle(a[0][0]),face_id:t.face.id,head:a.nation}},[t._v(t._s(a.length)+"回登場しました"),e("div",{staticClass:"flex"},t._l(a,function(a){return e("nuxt-link",{key:a.join("-"),staticClass:"label-mini",attrs:{to:t.log_url(a)}},[t._v(t._s(a[1]))])}))])}),e("report",{staticClass:"form",attrs:{handle:"VGSAY",deco:"center",head:t.face.name+"で活躍した人達"}},[e("btn",{attrs:{as:"story_ids.length"},model:{value:t.order,callback:function(a){t.order=a},expression:"order"}},[t._v("参加村数")]),e("btn",{attrs:{as:"count"},model:{value:t.order,callback:function(a){t.order=a},expression:"order"}},[t._v("総発言回数")]),e("btn",{attrs:{as:"all"},model:{value:t.order,callback:function(a){t.order=a},expression:"order"}},[t._v("総発言文字数")]),e("btn",{attrs:{as:"date_min"},model:{value:t.order,callback:function(a){t.order=a},expression:"order"}},[t._v("古参度")]),e("btn",{attrs:{as:"date_max"},model:{value:t.order,callback:function(a){t.order=a},expression:"order"}},[t._v("新着度")]),e("table",[e("transition-group",{staticClass:"tlist",attrs:{name:"list",tag:"tbody"}},t._l(t.sow_auths,function(a){return e("tr",{key:a._id.sow_auth_id},[e("th",[e("div",{staticClass:"sow_auth_id"},[t._v(t._s(a._id.sow_auth_id))])]),e("td",{staticClass:"r count"},[t._v(t._s(t._f("currency")(a.story_ids.length))+"村")]),e("td",{staticClass:"r count"},[t._v(t._s(t._f("currency")(a.count))+"回")]),e("td",{staticClass:"r count"},[t._v(t._s(t._f("currency")(a.all))+"文字")]),e("td",{staticClass:"timer"},[e("timeago",{staticClass:"count",attrs:{since:a.date_min}})],1),e("th",[e("div",{staticClass:"pad"},[t._v("～")])]),e("td",{staticClass:"timer"},[e("timeago",{staticClass:"count",attrs:{since:a.date_max}})],1)])}))],1)],1),e("report",{attrs:{handle:"footer",deco:"center"}},[e("nuxt-link",{attrs:{to:"."}},[t._v("戻る")])],1)],2):t._e()])])},staticRenderFns:[]};a.a=s},"ry+2":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("JAFg"),r=e.n(s),l=e("c5fr"),i=e("VU/8")(r.a,l.a,!1,function(t){e("VQBr")},"data-v-4b5ea6a2",null);a.default=i.exports}});
//# sourceMappingURL=_id.deae378ca99786620d07.js.map