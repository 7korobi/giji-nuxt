webpackJsonp([10],{FaDS:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("eAAX"),s=r.n(a),n=r("smEy"),i=r("VU/8")(s.a,n.a,!1,null,null,null);e.default=i.exports},MdO5:function(t,e){var r;(r=function(t,e,r){var a,s,n,i;return n=t.slice(-1),s=t.slice(0,-1),i=function(){switch(n){case"s":return 1e3*s;case"m":return 6e4*s;case"h":return 36e5*s;case"d":return 864e5*s}}(),a=function(t){var a,s,n;return r?(s=r.call(t),n=JSON.stringify(s)):(s=null,n=""),a=e+n,{payload:s,key:a,name:e}},{mounted:function(){var t,r,s,n,o;return({timer:o,read_at:n}=this.$store.state),({payload:s,key:t,name:e}=a(this)),r={timer:{},read_at:{}},r.timer[t]=i,this.$store.commit("update",r),Date.now()-i<n[t]?new Promise(function(t){return t()}):this.$store.dispatch(e,s).then(()=>(r.read_at[t]=Date.now(),this.$store.commit("update",r)))},computed:{read_at:function(){var t;return({key:t}=a(this)),this.$store.state.read_at[t]}}}}).plugin=function(t){return this.arg=t,function({commit:t,state:e}){var a,s;return({timer:s,read_at:a}=e),r.root={commit:t,timer:s,read_at:a}}},t.exports=r},eAAX:function(t,e,r){var a,s,n;({Query:a}=r("L78F")),({uniq:n,relative_to:s}=r("AFcV")),t.exports={mixins:[r("MdO5")("24h","sow/story",function(){return this.book_id}),r("K8Xp")({loader:!0})],mounted:function(){return this.shows=[...this.shows,"current"]},methods:{anker:function(t,e){return e=n(this.$route.query.a,e),this.$router.replace(s(this.$route,{a:e}))}}}},smEy:function(t,e,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"outframe"},[r("div",{staticClass:"sideframe"},[r("div",{staticClass:"inframe"},[r("div",{staticClass:"icons form"},[r("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:t.back_url}},[r("i",{staticClass:"fa fa-map-marker"})])],1)])]),r("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[r("a-mentions",{key:"1",on:{anker:t.anker}})],1),r("div",{staticClass:"contentframe"},[r("div",{staticClass:"inframe"},[r("a-monaco")],1)])])},staticRenderFns:[]};e.a=a}});
//# sourceMappingURL=editor.55a3f57a30b555dc5db6.js.map