webpackJsonp([3],{"99JJ":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("C8DY"),r=e.n(s),i=e("IHl6"),o=function(t){e("W4wp")},n=e("VU/8")(r.a,i.a,!1,o,"data-v-e6798f7c",null);a.default=n.exports},C8DY:function(t,a,e){t.exports={mixins:[e("MdO5")("30d","sow/story",function(){return this.book_id}),e("moW1"),e("K8Xp")({loader:!0})],head:function(){var t;return(t=[this.part,this.book].map(function(t){return null!=t?t.label:void 0})).push("人狼議事"),{title:t.join(" ")}},methods:{focus:function(t){this.idx=t},anker:function(t,a){return this.$router.push({path:`../${this.part_id}/anker`,query:{a,back:this.back}})}},computed:{editor_url:function(){var t;return null==(t=this.$route.query.back)&&(t=this.back),{path:"./editor",query:{back:t}}},folder_url:function(){return`/sow/village?folder_id=${this.folder_id.toUpperCase()}`},page_all_contents:function(){return this.chats(this.part_id)}}}},IHl6:function(t,a,e){"use strict";var s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"sideframe"},[e("div",{staticClass:"inframe"},[e("div",{staticClass:"icons form"},[e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.editor_url}},[e("i",{staticClass:"fa fa-file-text"})]),e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.back_url}},[e("i",{staticClass:"fa fa-map-marker"})]),e("check",{staticClass:"item",attrs:{as:"mentions"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"fa fa-map-pin"})]),e("check",{staticClass:"item",attrs:{as:"toc"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"fa fa-film"})]),e("check",{staticClass:"item",attrs:{as:"potof"},model:{value:t.shows,callback:function(a){t.shows=a},expression:"shows"}},[e("i",{staticClass:"fa fa-users"})])],1)])]),e("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[e("a-mentions",{key:"1",on:{anker:t.anker}}),e("a-toc",{key:"2"}),e("a-potofs",{key:"3"})],1),e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("c-post",{key:"breadcrumb",attrs:{handle:"footer"}},[e("bread-crumb",[e("li",[e("nuxt-link",{attrs:{to:t.folder_url}},[t._v("終了した村一覧")])],1)])],1),e("c-report",{key:"finder",staticClass:"form",attrs:{handle:"footer"}},[e("page-mode"),e("page-part")],1)],1),"memo"==t.mode?e("div",{staticClass:"inframe"},[e("c-report",{staticClass:"form",attrs:{handle:"footer"}},[e("span",[e("btn",{attrs:{as:"memos"},model:{value:t.mode,callback:function(a){t.mode=a},expression:"mode"}},[e("i",{staticClass:"fa fa-expand"})])],1),e("span",[t._v("最新のメモを表示しています。")])])],1):t._e(),"memos"==t.mode?e("div",{staticClass:"inframe"},[e("c-report",{staticClass:"form",attrs:{handle:"footer"}},[e("span",[e("btn",{attrs:{as:"memo"},model:{value:t.mode,callback:function(a){t.mode=a},expression:"mode"}},[e("i",{staticClass:"fa fa-compress"})])],1),e("span",[t._v("メモ掲載の一覧を表示しています。")])])],1):t._e(),t._l(t.page_contents,function(a,s){return e("div",{key:s,staticClass:"inframe"},t._l(a,function(a){return e("chat",{key:a.id,attrs:{id:a.id},on:{anker:t.anker,focus:t.focus}})}))}),e("div",{staticClass:"inframe"},[t.page_next_idx?e("c-report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[e("div",{staticClass:"center"},[e("scroll-mine",{attrs:{as:t.page_next_idx},on:{input:t.page_add}},[t._v("次頁")])],1)]):e("c-report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[e("page-part"),e("page-mode")],1),e("c-post",{key:"breadcrumb",attrs:{handle:"footer"}},[e("bread-crumb",[e("li",[e("nuxt-link",{attrs:{to:t.folder_url}},[t._v("終了した村一覧")])],1)])],1)],1)],2)])},staticRenderFns:[]};a.a=s},MdO5:function(t,a){var e;(e=function(t,a,e={}){var s,r,i,o;return i=t.slice(-1),r=t.slice(0,-1),o=function(){switch(i){case"s":return 1e3*r;case"m":return 6e4*r;case"h":return 36e5*r;case"d":return 864e5*r}}(),s=function(t){var s,r,i;return e.call?(r=e.call(t),i=JSON.stringify(r)):(r=null,i=""),s=a+i,{payload:r,key:s,name:a}},{mounted:function(){var t,e,r,i,n;return({timer:n,read_at:i}=this.$store.state),({payload:r,key:t,name:a}=s(this)),e={timer:{},read_at:{}},e.timer[t]=o,this.$store.commit("update",e),Date.now()-o<i[t]?new Promise(function(t){return t()}):this.$store.dispatch(a,r).then(()=>(e.read_at[t]=Date.now(),this.$store.commit("update",e)))},computed:{read_at:function(){var t;return({key:t}=s(this)),this.$store.state.read_at[t]}}}}).plugin=function(t){return this.arg=t,function({commit:t,state:a}){var s,r;return({timer:r,read_at:s}=a),e.root={commit:t,timer:r,read_at:s}}},t.exports=e},W4wp:function(t,a,e){var s=e("j/mX");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("2905e70c",s,!0)},"j/mX":function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"",""])}});
//# sourceMappingURL=_mode.d69a774dbf990bd2e781.js.map