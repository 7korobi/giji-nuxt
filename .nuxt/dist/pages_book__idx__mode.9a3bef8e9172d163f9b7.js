webpackJsonp([6],{K3DN:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"",""])},MdO5:function(t,a,e){var s,i,r;({to_msec:r}=e("AFcV")),({State:s}=e("L78F")),(i=function(t,a,e={}){var i,o;return o=r(t),i=function(t){var s,i;return e.call?(s=e.call(t),i=JSON.stringify(s)):(s=null,i=""),{payload:s,key:a+i,name:a}},{data:function(){return{step:s.step}},mounted:function(){var t,e,s,r,n;return({timer:n,read_at:r}=this.$store.state),({payload:s,key:t,name:a}=i(this)),(e={timer:{},read_at:{}}).timer[t]=o,this.$store.commit("update",e),Date.now()-o<r[t]?new Promise(function(t){return t()}):this.$store.dispatch(a,s).then(()=>(e.read_at[t]=Date.now(),this.$store.commit("update",e)))}}}).plugin=function(t){return this.arg=t,function({commit:t,state:a}){var e,s;return({timer:s,read_at:e}=a),i.root={commit:t,timer:s,read_at:e}}},t.exports=i},MlNV:function(t,a,e){t.exports={mixins:[e("MdO5")("24h","book/book",function(){return this.book_id}),e("MdO5")("5m","book/chats",function(){return this.book_id}),e("moW1"),e("K8Xp")({loader:!0})],head:function(){var t;return(t=[this.part,this.book].map(function(t){return null!=t?t.label:void 0})).push("人狼議事"),{title:t.join(" ")}},methods:{focus:function(t){this.idx=t},anker:function(t,a){return this.$router.push({path:`../${this.part_id}/anker`,query:{a:a,back:this.back}})}},computed:{editor_url:function(){var t;return null==(t=this.$route.query.back)&&(t=this.back),{path:"./editor",query:{back:t}}},folder_url:function(){return`/sow/village?folder_id=${this.folder_id.toUpperCase()}`},page_all_contents:function(){return this.chats(this.part_id)}}}},"k/fJ":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("MlNV"),i=e.n(s);for(var r in s)"default"!==r&&function(t){e.d(a,t,function(){return s[t]})}(r);var o=e("seX9");var n=function(t){e("zDmU")},c=e("VU/8")(i.a,o.a,!1,n,"data-v-211a9b40",null);a.default=c.exports},seX9:function(t,a,e){"use strict";var s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"sideframe"},[e("div",{staticClass:"inframe"},[e("div",{staticClass:"icons form"},[e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.editor_url}},[e("i",{staticClass:"mdi mdi-file-text"})]),e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.back_url}},[e("i",{staticClass:"mdi mdi-map-marker"})]),e("check",{staticClass:"item",attrs:{as:"mentions"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"mdi mdi-map-pin"})]),e("check",{staticClass:"item",attrs:{as:"toc"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"mdi mdi-film"})]),e("check",{staticClass:"item",attrs:{as:"potof"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"mdi mdi-users"})])],1)])]),e("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[e("a-mentions",{key:"1",on:{anker:t.anker}}),e("a-toc",{key:"2"}),e("a-potofs",{key:"3"})],1),e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("c-post",{key:"breadcrumb",attrs:{handle:"footer"}},[e("bread-crumb",[e("li",[e("nuxt-link",{attrs:{to:t.folder_url}},[t._v("終了した村一覧")])],1)])],1),e("c-report",{key:"finder",staticClass:"form",attrs:{handle:"footer"}},[e("page-mode"),e("page-part")],1)],1),"memo"==t.mode?e("div",{staticClass:"inframe"},[e("c-report",{staticClass:"form",attrs:{handle:"footer"}},[e("span",[e("btn",{attrs:{as:"memos"},model:{value:t.mode,callback:function(a){t.mode=a},expression:"mode"}},[e("i",{staticClass:"mdi mdi-expand"})])],1),e("span",[t._v("最新のメモを表示しています。")])])],1):t._e(),"memos"==t.mode?e("div",{staticClass:"inframe"},[e("c-report",{staticClass:"form",attrs:{handle:"footer"}},[e("span",[e("btn",{attrs:{as:"memo"},model:{value:t.mode,callback:function(a){t.mode=a},expression:"mode"}},[e("i",{staticClass:"mdi mdi-compress"})])],1),e("span",[t._v("メモ掲載の一覧を表示しています。")])])],1):t._e(),t._l(t.page_contents,function(a,s){return e("div",{key:s,staticClass:"inframe"},t._l(a,function(a){return e("chat",{key:a.id,attrs:{id:a.id},on:{anker:t.anker,focus:t.focus}})}))}),e("div",{staticClass:"inframe"},[t.page_next_idx?e("c-report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[e("div",{staticClass:"center"},[e("scroll-mine",{attrs:{as:t.page_next_idx},on:{input:t.page_add}},[t._v("次頁")])],1)]):e("c-report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[e("page-part"),e("page-mode")],1),e("c-post",{key:"breadcrumb",attrs:{handle:"footer"}},[e("bread-crumb",[e("li",[e("nuxt-link",{attrs:{to:t.folder_url}},[t._v("終了した村一覧")])],1)])],1)],1)],2)])},staticRenderFns:[]};a.a=s},zDmU:function(t,a,e){var s=e("K3DN");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("5e8ca0a7",s,!0)}});