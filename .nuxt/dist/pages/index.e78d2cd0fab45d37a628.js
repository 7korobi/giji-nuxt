webpackJsonp([4],{"/TYz":function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("uyzt"),a=e.n(s),o=e("v890"),i=function(t){e("NTr8")},n=e("VU/8")(a.a,o.a,!1,i,"data-v-07997763",null);r.default=n.exports},MdO5:function(t,r){var e;(e=function(t,r,e){var s,a,o,i;return o=t.slice(-1),a=t.slice(0,-1),i=function(){switch(o){case"s":return 1e3*a;case"m":return 6e4*a;case"h":return 36e5*a;case"d":return 864e5*a}}(),s=function(t){var s,a,o;return e?(a=e.call(t),o=JSON.stringify(a)):(a=null,o=""),s=r+o,{payload:a,key:s,name:r}},{mounted:function(){var t,e,a,o,n;return({timer:n,read_at:o}=this.$store.state),({payload:a,key:t,name:r}=s(this)),e={timer:{},read_at:{}},e.timer[t]=i,this.$store.commit("update",e),Date.now()-i<o[t]?new Promise(function(t){return t()}):this.$store.dispatch(r,a).then(()=>(e.read_at[t]=Date.now(),this.$store.commit("update",e)))},computed:{read_at:function(){var t;return({key:t}=s(this)),this.$store.state.read_at[t]}}}}).plugin=function(t){return this.arg=t,function({commit:t,state:r}){var s,a;return({timer:a,read_at:s}=r),e.root={commit:t,timer:a,read_at:s}}},t.exports=e},NTr8:function(t,r,e){var s=e("RtT4");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("77a862b2",s,!0)},RtT4:function(t,r,e){(t.exports=e("FZ+f")(!1)).push([t.i,".card[data-v-07997763]{padding:10px 0 10px 20px}",""])},uyzt:function(t,r,e){var s;({Query:s}=e("L78F")),t.exports={mixins:[e("MdO5")("1h","story/progress")],computed:{user:function(){return this.$store.state.user},user_url:function(){var t,r;return this.user?(({provider:r,account:t}=this.user),r&&t&&`user/${r}-${t}`):null},prologue:function(){return this.read_at,s.sow_villages.prologue.list},progress:function(){return this.read_at,s.sow_villages.progress.list}}}},v890:function(t,r,e){"use strict";var s={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("br"),e("c-post",{attrs:{handle:"XSAY",write_at:1169852700003}},[t._v("祝！人狼議事10周年！")]),t.user_url?e("c-report",{attrs:{handle:"footer",deco:"center"}},[t._v("ロビー")]):t._e(),t.user_url?e("c-post",{staticClass:"form",attrs:{handle:"TSAY"}},[e("nuxt-link",{attrs:{to:t.user_url}},[t._v("あなたの情報")])],1):t._e(),e("c-report",{attrs:{handle:"footer",deco:"center"}},[t._v("みんなの情報")]),e("c-post",{staticClass:"form",attrs:{handle:"SSAY"}},[e("a",{attrs:{href:"https://github.com/7korobi/giji-nuxt/commits/master"}},[t._v("総合トップ")]),e("a",{attrs:{href:"https://github.com/7korobi/sow-giji/commits/cabala"}},[t._v("ゲーム")]),e("a",{attrs:{href:"https://github.com/7korobi/sow-giji/commits/show-fix"}},[t._v("ゲーム（新）")]),e("div",{staticClass:"card"},[t._v("人狼議事を構成するプログラムの、更新履歴はこちら。")])]),e("c-post",{staticClass:"form",attrs:{handle:"SSAY"}},[e("nuxt-link",{attrs:{to:"/rule-guide"}},[t._v("人狼議事のルール")]),e("br"),e("div",{staticClass:"card"},[t._v("人狼議事を遊ぶとき、従うべきルールはこちら。")])],1),e("c-post",{staticClass:"form",attrs:{handle:"VSAY"}},[e("nuxt-link",{attrs:{to:"/character-tag"}},[t._v("キャラクター一覧表")]),e("br"),e("div",{staticClass:"card"},[t._v("人狼議事で遊ぶことができるキャラクターはこちら。")])],1),e("c-post",{staticClass:"form",attrs:{handle:"VSAY"}},[e("nuxt-link",{attrs:{to:"/summary/faces"}},[t._v("キャラクター活躍記録")]),e("br"),e("div",{staticClass:"card"},[t._v("どこかの村で活躍したことのあるキャラクターはこちら。")])],1),e("c-report",{attrs:{handle:"footer",deco:"center"}},[t._v("開始待ちの村／進行中の村")]),t._l(t.progress,function(r){return e("c-post",{key:r._id,attrs:{handle:"EVIL",head:r.name}},[e("a",{attrs:{href:r.folder.href}},[t._v(t._s(r.folder.nation)+t._s(r.vid))]),t._v("は、進行中だ。"),e("div",{staticClass:"date"},[e("timeago",{attrs:{since:r.timer.nextcommitdt}})],1)])}),t._l(t.prologue,function(r){return e("c-post",{key:r._id,attrs:{handle:"MOB",head:r.name}},[e("a",{attrs:{href:r.folder.href}},[t._v(t._s(r.folder.nation)+t._s(r.vid))]),t._v("は、開始が楽しみだ。"),e("div",{staticClass:"date"},[e("timeago",{attrs:{since:r.timer.nextcommitdt}})],1)])}),e("c-report",{attrs:{handle:"footer",deco:"center"}},[e("nuxt-link",{attrs:{to:"/demo"}},[t._v("開発者用ページ")])],1)],2)])])},staticRenderFns:[]};r.a=s}});
//# sourceMappingURL=index.e78d2cd0fab45d37a628.js.map