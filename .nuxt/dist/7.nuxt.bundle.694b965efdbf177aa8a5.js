webpackJsonp([7],{371:function(t,e,s){var a=s(0)(s(391),s(416),function(t){s(436)},"data-v-013f7d88",null);t.exports=a.exports},391:function(t,e,s){var a;({Query:a}=s(1)),t.exports={layout:"book",mixins:[s(37)({replace:{chat_id:"",part_id:"",self_id:""}})],mounted:function(){return this.$store.dispatch("book/book","demo-0").then(()=>this.$store.dispatch("book/part","demo-0-0")).then(()=>this.$store.dispatch("book/section","demo-0-0-1")).then(()=>(this.self_id="demo-0-0-8",this.part_id=this.$store.state.book.part_id))},computed:{now:function(){return Date.now()},show_sitemap:function(){return"sitemap"===this.$store.state.menu.target},show_write:function(){return"comment"===this.$store.state.menu.target},chats:function(){var t,e,s;return({read_at:s,chat_id:this.chat_id,book_id:e}=this.$store.state.book),(t=a.books.find(e))?t.chats.list:[]},says:function(){return"N08 N09 SPORT P09 P08 P07 P06 P05 P04 P03 P02 P01 WSAY N01 N02 N03 N04 N05 N06 N07 N08 N09".split(/\s/)},sepia:function(){return"SN08 SN09 TSAY SP09 SP08 SP07 SP06 SP05 SP04 SP03 SP02 SP01 S000 SN01 SN02 SN03 SN04 SN05 SN06 SN07 SN08 SN09".split(/\s/)},world:function(){return"WN08 WN09 Wsport WP09 WP08 WP07 WP06 WP05 WP04 WP03 WP02 WP01 W000 WN01 WN02 WN03 WN04 WN05 WN06 WN07 WN08 WN09".split(/\s/)},metal:function(){return"MN08 MN09 Msport MP09 MP08 MP07 MP06 MP05 MP04 MP03 MP02 MP01 M000 MN01 MN02 MN03 MN04 MN05 MN06 MN07 MN08 MN09".split(/\s/)},infos:function(){return"HATER PIXI EVIL HUMAN WOLF LOVER NONE executed leave footer btns welcome-btns icons".split(/\s/)},handles:function(){return[...this.says,...this.sepia,...this.world,...this.metal,...this.infos]}}}},405:function(t,e,s){(t.exports=s(2)(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"chats.vue",sourceRoot:""}])},416:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"outframe"},[t.show_sitemap?s("div",{staticClass:"summary"},[t._m(0),s("div",{staticClass:"inframe hover"},[s("potofs")],1)]):t._e(),s("div",{staticClass:"contentframe"},[s("div",{staticClass:"inframe"},[s("br"),t._l(t.handles,function(e){return s("report",{key:"A"+e,attrs:{handle:e,deco:"center"}},[t._v("二日目"),s("div",{staticClass:"date"},[s("abbr",[t._v(t._s(e))])])])}),t._l(t.handles,function(e){return s("post",{key:"C"+e,attrs:{handle:e,deco:"giji"}},[s("div",{staticClass:"name"},[s("abbr",[t._v(t._s(e))])]),s("hr"),t._v("アクション、ト書きサンプル")])}),t._l(t.handles,function(e,a){return s("talk",{key:"E"+e,attrs:{face_id:"c"+(10+a),write_at:t.now-36e5,to:"おきる",sign:"ななころび",head:e,handle:e}},[s("sup",[t._v("霜草蒼蒼")]),s("a",{attrs:{title:"Hello World"}},[t._v("人絶獨出")]),s("sub",[t._v("門前望野")]),s("strong",[t._v("蟲切切村")]),t._v("南村北行"),s("em",[t._v("霜草蒼蒼")]),t._v("蟲切切村南村北行"),s("b",[t._v("人絶獨出")]),s("del",[t._v("/*門前望野*/")]),t._v("田月出"),s("a",{attrs:{title:"Hello World"}},[t._v("蕎麥花"),s("sup",[t._v("如")]),s("sub",[t._v("雪")])]),s("h1",[t._v("h1")]),s("h2",[t._v("h2")]),s("h3",[t._v("h3")]),s("h4",[t._v("h4")]),s("h5",[t._v("h5")]),s("h6",[t._v("h6")]),s("hr"),s("blockquote",[t._v("ABCDEFGHIJKL "),s("code",[t._v("MNOPQRSTUVWXYZ")]),t._v("abcdefghijklmnopqrstuvwxyz"),s("blockquote",[t._v("ABCDEFGHIJKL MNOPQRSTUVWXYZ")])],1),s("pre",[s("code",[t._v("ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")])]),s("div",{staticClass:"date"},[s("abbr",[t._v("anker")])])],1)}),s("br"),t._l(t.chats,function(t){return s("chat",{key:t._id,attrs:{id:t._id}})}),s("talk",{attrs:{write_at:t.now-2e4,face_id:"t10",head:"ねるねるねるね ねる",sign:"ななころび",handle:"VSAY",deco:""}},[t._v("モブのセリフがちょっとなやむ。")]),s("post",{attrs:{write_at:t.now-36e5,head:"ねるねるねるね ねる",sign:"ななころび",handle:"VSAY"}},[s("nuxt-link",{attrs:{to:"/demo/timeago"}},[t._v("About page")])],1),s("talk",{attrs:{write_at:t.now-2e4,head:"ねるねるねるね ねる",sign:"ななころび",handle:"GSAY",face_id:"c31"}},[t._v("ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")]),s("post",{attrs:{write_at:t.now-864e5,head:"ねるねる",sign:"ななころび",handle:"SPSAY",deco:"head"}},[t._v("ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")]),s("post",{attrs:{write_at:t.now-36e5,head:"ねるねるねるね ねる",to:"おきる",sign:"ななころび",handle:"AIM"}},[s("nuxt-link",{attrs:{to:"/timeago"}},[t._v("About page")])],1),s("report",{attrs:{handle:"GSAY",deco:"center"}},[t._v("一日目")]),s("post",{attrs:{write_at:t.now-36e5,head:"ねるねるねるね ねる",sign:"ななころび",handle:"WSAY",deco:"mono"}},[s("nuxt-link",{attrs:{to:"/timeago"}},[t._v("About page")])],1),s("talk",{attrs:{write_at:t.now-2e4,head:"ねるねるねるね ねる",sign:"ななころび",handle:"WSAY",face_id:"c32",log:"ねろねろねろねろ"}}),s("talk",{attrs:{write_at:t.now-864e5,sign:"ななころび",handle:"XSAY",deco:"mono",face_id:"c91"}},[t._v("123456789012345678901234567890123456789012345678901234567890\n123456789012345678901234567890123456789012345678901234567890")]),s("talk",{attrs:{write_at:t.now-864e5,sign:"ななころび",handle:"SPSAY",face_id:"c101"}},[t._v("ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")]),s("talk",{attrs:{write_at:t.now-864e5,sign:"ななころび",handle:"GSAY",face_id:"c111"}},[t._v("あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ\nあいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ")]),s("talk",{attrs:{write_at:t.now-864e5,sign:"ななころび",handle:"VSAY",face_id:"w30"}},[t._v("アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ\nアイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ")]),s("post",{attrs:{write_at:t.now-36e5,head:"ねるねるねるね ねる",to:"おきる",sign:"ななころび",handle:"AIM"}},[t._v("～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～\n")]),t.show_write?t._e():s("myself",{attrs:{self_id:t.self_id}}),s("report",{attrs:{handle:"footer",deco:"center"}},[s("nuxt-link",{attrs:{to:"/"}},[t._v("戻る")])],1)],2)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"inframe"},[s("h6",[t._v("参照されている"),s("i",{staticClass:"fa fa-pin"})]),s("h6",[t._v("よく見ていた"),s("i",{staticClass:"fa fa-pin"})]),s("h6",[t._v("一日目の参加者")])])}]}},436:function(t,e,s){var a=s(405);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(3)("f094c6e2",a,!0)}});
//# sourceMappingURL=7.nuxt.bundle.694b965efdbf177aa8a5.js.map