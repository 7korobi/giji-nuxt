webpackJsonp([12],{kJvc:function(t,e,r){var a,s,n,i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t};({Query:a}=r("L78F")),({uniq:n,relative_to:s}=r("AFcV")),t.exports={mixins:[r("MdO5")("24h","sow/story",function(){return this.book_id}),r("K8Xp")({loader:!0})],mounted:function(){return this.menus=[...this.menus,"current"]},methods:{focus:function(t){var e,r,a;return({name:e,params:r,query:a}=this.$route),r=i({},r,{idx:t}),this.$router.replace({name:e,params:r,query:a})},anker:function(t,e){return e=n(this.$route.query.a,e),this.$router.replace(s(this.$route,{a:e}))}},computed:{anker_chats:function(){var t;return this.read_at,t=n(this.$route.query.a),a.chats.ankers(this.book_id,t).list}}}},rtsZ:function(t,e,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"outframe"},[r("div",{staticClass:"sideframe"},[r("div",{staticClass:"inframe"},[r("div",{staticClass:"icons form"},[r("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.back_url}},[r("i",{staticClass:"fa fa-map-marker"})])],1)])]),r("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[r("mentions",{key:"1",on:{anker:t.anker}})],1),r("div",{staticClass:"contentframe"},[r("div",{staticClass:"inframe"},[r("report",{key:"finder",staticClass:"form",attrs:{handle:"footer"}},[r("page-mode")],1)],1),r("div",{staticClass:"inframe"},t._l(t.anker_chats,function(e){return r("chat",{key:e.id,attrs:{id:e.id},on:{anker:t.anker,focus:t.focus}})})),r("div",{staticClass:"inframe"},[r("report",{key:"finder",staticClass:"form",attrs:{handle:"footer"}},[r("page-mode")],1)],1)])])},staticRenderFns:[]};e.a=a},vARB:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("kJvc"),s=r.n(a),n=r("rtsZ"),i=r("VU/8")(s.a,n.a,!1,null,null,null);e.default=i.exports}});
//# sourceMappingURL=anker.f8611a9e2f5f1d01db03.js.map