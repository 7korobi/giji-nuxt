webpackJsonp([10],{FaDS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("v9/3"),i=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);var s=a("hY4y"),o=a("VU/8")(i.a,s.a,!1,null,null,null);e.default=o.exports},MdO5:function(t,e,a){var r,i,n;({to_msec:n}=a("AFcV")),({State:r}=a("L78F")),(i=function(t,e,a={}){var i,s;return s=n(t),i=function(t){var r,i;return a.call?(r=a.call(t),i=JSON.stringify(r)):(r=null,i=""),{payload:r,key:e+i,name:e}},{data:function(){return{step:r.step}},mounted:function(){var t,a,r,n,o;return({timer:o,read_at:n}=this.$store.state),({payload:r,key:t,name:e}=i(this)),(a={timer:{},read_at:{}}).timer[t]=s,this.$store.commit("update",a),Date.now()-s<n[t]?new Promise(function(t){return t()}):this.$store.dispatch(e,r).then(()=>(a.read_at[t]=Date.now(),this.$store.commit("update",a)))}}}).plugin=function(t){return this.arg=t,function({commit:t,state:e}){var a,r;return({timer:r,read_at:a}=e),i.root={commit:t,timer:r,read_at:a}}},t.exports=i},hY4y:function(t,e,a){"use strict";var r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"sideframe"},[e("div",{staticClass:"inframe"},[e("div",{staticClass:"icons form"},[e("nuxt-link",{staticClass:"item active",attrs:{replace:"replace",to:this.back_url}},[e("i",{staticClass:"mdi mdi-map-marker"})])],1)])]),e("div",{key:"summary",staticClass:"summary",attrs:{name:"list",tag:"div"}},[e("a-mentions",{key:"1",on:{anker:this.anker}})],1),e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("a-monaco")],1)])])},staticRenderFns:[]};e.a=r},"v9/3":function(t,e,a){var r,i,n;({Query:r}=a("L78F")),({uniq:n,relative_to:i}=a("AFcV")),t.exports={mixins:[a("MdO5")("24h","sow/story",function(){return this.book_id}),a("K8Xp")({loader:!0})],mounted:function(){return this.shows=[...this.shows,"current"]},methods:{anker:function(t,e){return e=n(this.$route.query.a,e),this.$router.replace(i(this.$route,{a:e}))}}}}});