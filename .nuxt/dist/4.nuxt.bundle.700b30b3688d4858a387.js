webpackJsonp([4],{497:function(t,s,a){var e=a(1)(a(517),a(545),function(t){a(560)},"data-v-6e7c2c01",null);t.exports=e.exports},517:function(t,s,a){t.exports={mixins:[a(215)("24h","sow/story",function(){return this.book_id}),a(26),a(216)({watch:function(t,s){var a;if(({chat_id:a}=this),a)return this.$nextTick(function(){return this.$store.commit("menu/focus",a)})}})],methods:{focus:function(t){this.idx=t},anker:function(t,s){return this.$router.push({path:`../${this.part_id}/anker`,query:{a:s,back:this.back}})}},computed:{page_all_contents:function(){return this.chats(this.part_id)}}}},529:function(t,s,a){(t.exports=a(3)(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"_mode.vue",sourceRoot:""}])},545:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"outframe"},[a("div",{staticClass:"sideframe"},[a("div",{staticClass:"inframe"},[a("div",{staticClass:"icons form"},[a("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.back_url}},[a("i",{staticClass:"fa fa-map-marker"})]),a("check",{staticClass:"item",attrs:{as:"current"},model:{value:t.menus,callback:function(s){t.menus=s},expression:"menus"}},[a("i",{staticClass:"fa fa-map-pin"})]),a("check",{staticClass:"item",attrs:{as:"toc"},model:{value:t.menus,callback:function(s){t.menus=s},expression:"menus"}},[a("i",{staticClass:"fa fa-film"})]),a("check",{staticClass:"item",attrs:{as:"potof"},model:{value:t.menus,callback:function(s){t.menus=s},expression:"menus"}},[a("i",{staticClass:"fa fa-users"})])],1)])]),a("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[a("mentions",{key:"1",on:{anker:t.anker}}),a("toc",{key:"2"}),a("potofs",{key:"3"})],1),a("div",{staticClass:"contentframe"},[a("div",{staticClass:"inframe"},[a("report",{key:"finder",staticClass:"form",attrs:{handle:"footer"}},[a("page-mode"),a("page-part")],1)],1),"title"==t.mode&&t.book?a("div",{staticClass:"inframe"},[a("report",{key:t.part_id,staticClass:"form",attrs:{handle:"MAKER",deco:"head",id:t.part_id,head:t.book.head,sign:t.book.sign,log:t.book.log}})],1):t._e(),"memo"==t.mode?a("div",{staticClass:"inframe"},[a("report",{staticClass:"form",attrs:{handle:"footer"}},[a("span",[a("btn",{attrs:{as:"memos"},model:{value:t.mode,callback:function(s){t.mode=s},expression:"mode"}},[a("i",{staticClass:"fa fa-expand"})])],1),a("span",[t._v("最新のメモを表示しています。")])])],1):t._e(),"memos"==t.mode?a("div",{staticClass:"inframe"},[a("report",{staticClass:"form",attrs:{handle:"footer"}},[a("span",[a("btn",{attrs:{as:"memo"},model:{value:t.mode,callback:function(s){t.mode=s},expression:"mode"}},[a("i",{staticClass:"fa fa-compress"})])],1),a("span",[t._v("メモ掲載の一覧を表示しています。")])])],1):t._e(),t._l(t.page_contents,function(s,e){return a("div",{key:e,staticClass:"inframe"},t._l(s,function(s){return a("chat",{key:s.id,attrs:{id:s.id},on:{anker:t.anker,focus:t.focus}})}))}),a("div",{staticClass:"inframe"},[t.page_next_id?a("report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[a("div",{staticClass:"center"},[a("scroll-mine",{attrs:{as:t.page_next_id},on:{input:t.page_add}},[t._v("次頁")])],1)]):a("report",{key:"limitup",staticClass:"form",attrs:{handle:"footer"}},[a("page-part"),a("page-mode")],1)],1)],2)])},staticRenderFns:[]}},560:function(t,s,a){var e=a(529);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a(4)("30e87388",e,!0)}});
//# sourceMappingURL=4.nuxt.bundle.700b30b3688d4858a387.js.map