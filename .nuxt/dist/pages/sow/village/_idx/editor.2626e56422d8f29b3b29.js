webpackJsonp([10],{FaDS:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("eAAX"),s=r.n(a),i=r("zhoD"),n=r("VU/8")(s.a,i.a,!1,null,null,null);e.default=n.exports},MdO5:function(t,e){var r;(r=function(t,e,r){var a,s,i,n;return i=t.slice(-1),s=t.slice(0,-1),n=function(){switch(i){case"s":return 1e3*s;case"m":return 6e4*s;case"h":return 36e5*s;case"d":return 864e5*s}}(),a=function(t){var a,s,i;return r?(s=r.call(t),i=JSON.stringify(s)):(s=null,i=""),a=e+i,{payload:s,key:a,name:e}},{mounted:function(){var t,r,s,i,o;return({timer:o,read_at:i}=this.$store.state),({payload:s,key:t,name:e}=a(this)),r={timer:{},read_at:{}},r.timer[t]=n,this.$store.commit("update",r),Date.now()-n<i[t]?new Promise(function(t){return t()}):this.$store.dispatch(e,s).then(()=>(r.read_at[t]=Date.now(),this.$store.commit("update",r)))},computed:{read_at:function(){var t;return({key:t}=a(this)),this.$store.state.read_at[t]}}}}).plugin=function(t){return this.arg=t,function({commit:t,state:e}){var a,s;return({timer:s,read_at:a}=e),r.root={commit:t,timer:s,read_at:a}}},t.exports=r},eAAX:function(t,e,r){var a,s,i;({Query:a}=r("L78F")),({uniq:i,relative_to:s}=r("AFcV")),t.exports={mixins:[r("MdO5")("24h","sow/story",function(){return this.book_id}),r("K8Xp")({loader:!0})],mounted:function(){return this.shows=[...this.shows,"current"]},methods:{anker:function(t,e){return e=i(this.$route.query.a,e),this.$router.replace(s(this.$route,{a:e}))}}}},zhoD:function(t,e,r){"use strict";var a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"sideframe"},[e("div",{staticClass:"inframe"},[e("div",{staticClass:"icons form"},[e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:this.back_url}},[e("i",{staticClass:"fa fa-map-marker"})])],1)])]),e("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[e("a-mentions",{key:"1",on:{anker:this.anker}})],1),e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("a-monaco")],1)])])},staticRenderFns:[]};e.a=a}});
//# sourceMappingURL=editor.2626e56422d8f29b3b29.js.map