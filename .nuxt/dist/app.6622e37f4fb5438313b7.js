webpackJsonp([25],{

/***/ "+E39":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("S82l")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "+Y8d":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./test.coffee": "O4Dt"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "+Y8d";

/***/ }),

/***/ "+ZMJ":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("lOnJ");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "+tPU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("xGkn");
var global = __webpack_require__("7KvD");
var hide = __webpack_require__("hJx8");
var Iterators = __webpack_require__("/bQp");
var TO_STRING_TAG = __webpack_require__("dSzd")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "//Fk":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("U5ju"), __esModule: true };

/***/ }),

/***/ "/V62":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _nuxtChild = __webpack_require__("HBB+");

var _nuxtChild2 = _interopRequireDefault(_nuxtChild);

var _error = __webpack_require__("To1F");

var _error2 = _interopRequireDefault(_error);

var _utils = __webpack_require__("YLfZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//

exports.default = {
  name: 'nuxt',
  props: ['nuxtChildKey'],
  beforeCreate: function beforeCreate() {
    _vue2.default.util.defineReactive(this, 'nuxt', this.$root.$options._nuxt);
  },

  computed: {
    routerViewKey: function routerViewKey() {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || (0, _utils.compile)(this.$route.matched[0].path)(this.$route.params);
      }
      return this.$route.fullPath.split('#')[0];
    }
  },
  components: {
    NuxtChild: _nuxtChild2.default,
    NuxtError: _error2.default
  }
};

/***/ }),

/***/ "/bQp":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "/n6Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("+tPU");
module.exports = __webpack_require__("Kh4W").f('iterator');


/***/ }),

/***/ "06OY":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("3Eo+")('meta');
var isObject = __webpack_require__("EqjI");
var has = __webpack_require__("D2L2");
var setDesc = __webpack_require__("evD5").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("S82l")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "0F0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
** From https://github.com/egoist/vue-no-ssr
** With the authorization of @egoist
*/
exports.default = {
  name: 'no-ssr',
  props: ['placeholder'],
  data: function data() {
    return {
      canRender: false
    };
  },
  mounted: function mounted() {
    this.canRender = true;
  },
  render: function render(h) {
    if (this.canRender) {
      if (false) {
        throw new Error('<no-ssr> You cannot use multiple child components');
      }
      return this.$slots.default[0];
    }
    return h('div', { class: { 'no-ssr-placeholder': true } }, this.placeholder);
  }
};

/***/ }),

/***/ "19G2":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cs_all.yml": "OBeJ",
	"./cs_animal.yml": "1dd0",
	"./cs_changed.yml": "OpA2",
	"./cs_ger.yml": "A+H9",
	"./cs_mad.yml": "bTan",
	"./cs_ririnra.yml": "AYVu",
	"./cs_school.yml": "aM4n",
	"./cs_sf.yml": "CcAI",
	"./cs_time.yml": "FkjD",
	"./cs_wa.yml": "Gr6n"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "19G2";

/***/ }),

/***/ "1dd0":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"animal","admin":"大地の震動","maker":"草原のざわめき","label":"うきうきサバンナ"},"chr_npc":[{"label":"うきうきサバンナ","csid":"animal","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"こじか"},{"face_id":"c02","job":"よーくしゃーてりあ"},{"face_id":"c03","job":"かもすぞ"},{"face_id":"c04","job":"くろひょう"},{"face_id":"c05","job":"いとまきえい"},{"face_id":"c06","job":"へび"},{"face_id":"c07","job":"てのりぶんちょう"},{"face_id":"c08","job":"たぬき"},{"face_id":"c09","job":"にほんおおかみ"},{"face_id":"c10","job":"そまり"},{"face_id":"c11","job":"みけ"},{"face_id":"r12","job":"うえきばち"},{"face_id":"c13","job":"かたつむり"},{"face_id":"c14","job":"くらげ"},{"face_id":"c15","job":"しゃち"},{"face_id":"c16","job":"あふりかぞう"},{"face_id":"c17","job":"おらうーたん"},{"face_id":"c18","job":"かまきり"},{"face_id":"c19","job":"あげはちょう"},{"face_id":"c20","job":"とら"},{"face_id":"c21","job":"おおたこ"},{"face_id":"c22","job":"うちゅうせん"},{"face_id":"c23","job":"ぱんだ"},{"face_id":"c24","job":"ぶるどっぐ"},{"face_id":"c25","job":"うし"},{"face_id":"c26","job":"えりまきとかげ"},{"face_id":"c27","job":"ひつじ"},{"face_id":"c28","job":"うさぎ"},{"face_id":"c29","job":"しまうま"},{"face_id":"c30","job":"おうむ"},{"face_id":"c31","job":"かえる"},{"face_id":"c32","job":"きんぎょ"},{"face_id":"c33","job":"ねったいぎょ"},{"face_id":"c34","job":"すなねずみ"},{"face_id":"c35","job":"ごりら"},{"face_id":"c36","job":"さらぶれっど"},{"face_id":"c37","job":"ぺるしゃ"},{"face_id":"c38","job":"だいおういか"},{"face_id":"c39","job":"もみのき"},{"face_id":"c40","job":"らいおん"},{"face_id":"c41","job":"ろぶすたー"},{"face_id":"c42","job":"みつりょうしゃ"},{"face_id":"c43","job":"くまー"},{"face_id":"c44","job":"いわとびぺんぎん"},{"face_id":"c45","job":"はいえな"},{"face_id":"c46","job":"あらいぐま"},{"face_id":"c47","job":"しろまどうし"},{"face_id":"c48","job":"くじゃく"},{"face_id":"c49","job":"にほんざる"},{"face_id":"c50","job":"きつね"},{"face_id":"c51","job":"かげろう"},{"face_id":"c52","job":"ありじごく"},{"face_id":"c53","job":"やみふくろう"},{"face_id":"c54","job":"さめ"},{"face_id":"c55","job":"もるふぉちょう"},{"face_id":"c56","job":"ぶた"},{"face_id":"c57","job":"らくだ"},{"face_id":"c58","job":"ゆにこーん"},{"face_id":"c59","job":"れとりばー"},{"face_id":"c60","job":"はむすたー"},{"face_id":"c61","job":"すっぽん"},{"face_id":"c62","job":"きつねりす"},{"face_id":"c63","job":"おこじょ"},{"face_id":"c64","job":"やまあらし"},{"face_id":"c65","job":"ちすいこうもり"},{"face_id":"c66","job":"ばいにん"},{"face_id":"c67","job":"りす"},{"face_id":"c68","job":"なまこ"},{"face_id":"c69","job":"びーる"},{"face_id":"c70","job":"かんがるー"},{"face_id":"c71","job":"なまけもの"},{"face_id":"c72","job":"ほたる"},{"face_id":"c73","job":"くりおね"},{"face_id":"c74","job":"はいびすかす"},{"face_id":"c75","job":"いえてぃ"},{"face_id":"c76","job":"めがねざる"},{"face_id":"c77","job":"にんじん"},{"face_id":"c78","job":"かめれおん"},{"face_id":"c79","job":"わかめ"},{"face_id":"c80","job":"りかおん"},{"face_id":"c81","job":"ふぇねっく"},{"face_id":"c82","job":"どぶねずみ"},{"face_id":"c83","job":"いそぎんちゃく"},{"face_id":"c99","job":"しんかいぎょ"},{"face_id":"c86","job":"かも"},{"face_id":"c94","job":"あかまむし"},{"face_id":"c92","job":"さば"},{"face_id":"c90","job":"さい"},{"face_id":"c95","job":"やもり"},{"face_id":"c97","job":"しぇぱーど"},{"face_id":"c100","job":"びーばー"},{"face_id":"c106","job":"まんぼう"},{"face_id":"c89","job":"かば"},{"face_id":"c91","job":"あるぱか"},{"face_id":"c93","job":"わらいかわせみ"},{"face_id":"c107","job":"いぼいのしし"},{"face_id":"c85","job":"かみつきがめ"},{"face_id":"c105","job":"うみねこ"},{"face_id":"c96","job":"せあかごけぐも"},{"face_id":"c98","job":"はしびろこう"},{"face_id":"c101","job":"すずらん"},{"face_id":"c104","job":"みいら"},{"face_id":"c108","job":"ぶろっこりー"},{"face_id":"c88","job":"ゆでたまご"},{"face_id":"c84","job":"しろへび"},{"face_id":"c109","job":"しろちゃとら"},{"face_id":"c102","job":"さんた"},{"face_id":"c87","job":"りゅう"},{"face_id":"c103","job":"おうむがい"}]}

/***/ }),

/***/ "1kS7":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2KxR":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "2X3i":
/***/ (function(module, exports) {

module.exports = {"PERL_DEFAULT":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]}}},"PERL_NEW":{"config":{"trsid":["all","star","regend","heavy","complexx","secret"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"]}},"PERL_GAME":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"}}},"UNION":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"UNION","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"BRAID":{"story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"all":{"nation":"- すべて -"},"TEST":{"nation":"人狼議事テスト","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","say5x200","say5x300","wbbs","saving","euro","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../testbed/lib","DIR_HTML":"../testbed/html","DIR_RS":"../testbed/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":1,"TIMEOUT_SCRAP":1,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/testbed","BASEDIR_CGIERR":"http://utage.family.jp//testbed","NAME_HOME":"人狼議事 手元テスト","MAX_VILLAGES":9},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[0,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/testbed/config.pl"}},"PERJURY_OLD":{"folder":"PERJURY_OLD","nation":"人狼議事RP:Bp","vid_code":"Bp","server":"utage.family.jp","oldlog":"/perjury/sow.cgi?cmd=oldlog&rowall=on","livelog":"/perjury/sow.cgi?cmd=rss","info_url":"/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/perjury","BASEDIR_CGIERR":"http://utage.family.jp//perjury","NAME_HOME":"人狼議事 Role Play braid perjury","MAX_VILLAGES":0},"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/perjury/config.pl"}},"PRETENSE":{"folder":"PRETENSE","nation":"人狼議事RP:Advance","vid_code":"A","server":"utage.family.jp","oldlog":"/pretense/sow.cgi?cmd=oldlog&rowall=on","info_url":"/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"RP":{"folder":"RP","nation":"人狼議事RP:","vid_code":"","server":"utage.family.jp","oldlog":"/rp/sow.cgi?cmd=oldlog&rowall=on","info_url":"/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"CABALA_OLD":{"folder":"CABALA","nation":"人狼議事陰謀:","vid_code":"C","server":"utage.family.jp","oldlog":"/cabala/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cabala/sow.cgi?cmd=rss","info_url":"/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../cafe/data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/cabala","BASEDIR_CGIERR":"http://utage.family.jp//cabala","NAME_HOME":"人狼議事 陰謀の苑","MAX_VILLAGES":0},"pl":"/www/giji_log/cabala/config.pl"}},"ALLSTAR_OLD":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:A","vid_code":"A","server":"utage.family.jp","oldlog":"/allstar/sow.cgi?cmd=oldlog&rowall=on","livelog":"/allstar/sow.cgi?cmd=rss","info_url":"/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../jksy/data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/allstar","BASEDIR_CGIERR":"http://utage.family.jp//allstar","NAME_HOME":"人狼議事 大乱闘オールスター","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/allstar/config.pl"}},"ULTIMATE":{"folder":"ULTIMATE","nation":"人狼議事大乱闘:","vid_code":"","server":"utage.family.jp","oldlog":"/ultimate/sow.cgi?cmd=oldlog&rowall=on","info_url":"/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}},"WOLF":{"folder":"WOLF","nation":"人狼議事標準","vid_code":"","server":"utage.family.jp","oldlog":"/wolf/sow.cgi?cmd=oldlog&rowall=on","livelog":"/wolf/sow.cgi?cmd=rss","info_url":"/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false}},"PAN":{"folder":"PAN","nation":"似顔絵人狼","server":"soy-bean.sakura.ne.jp","oldlog":"/pan/sow.cgi?cmd=oldlog&rowall=on","livelog":"/pan/sow.cgi?cmd=rss","info_url":"/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false},"config":{"csid":["sow","juna","name","bloody","orange","15girls","tmmi","cat","bunmei"],"erb":"./asset/sow/pan.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"cfg":{"TYPE":"CABALA","RULE":"PAN","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/pan","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/pan//","NAME_HOME":"似顔絵人狼","MAX_VILLAGES":1},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[0,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/pan/config.pl","is_angular":"show-fix"}},"MORPHE":{"folder":"MORPHE","nation":"人狼議事 モルペウス","vid_code":"M","server":"morphe.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"MORPHE","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://morphe.sakura.ne.jp/morphe","BASEDIR_CGIERR":"http://morphe.sakura.ne.jp/morphe//","NAME_HOME":"人狼議事 夢の形","MAX_VILLAGES":0},"pl":"/www/giji_log/morphe/config.pl"}},"SOYBEAN":{"folder":"SOYBEAN","nation":"人狼議事鯖の味噌煮","vid_code":"Bs","server":"soy-bean.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[1,"1:事件正順の選択を有効にする。"],"ENABLED_TEST_ROLE":[1,"1:テスト中役職を有効にする。"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/soy-bean","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/soy-bean//","NAME_HOME":"人狼議事 鯖の味噌煮","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/soy-bean/config.pl","is_angular":"show-fix"}},"CIEL":{"folder":"CIEL","nation":"人狼議事RP:Cheat Ciel","vid_code":"Cc","server":"ciel.moo.jp","oldlog":"/cheat/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cheat/sow.cgi?cmd=rss","info_url":"/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CHEAT","RULE":"CIEL","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","BASEDIR_CGIERR":"http://ciel.moo.jp//cheat","URL_SW":"http://ciel.moo.jp/cheat","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 ciel\n- Role Play Cheat -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/ciel/config.pl","is_angular":"show-fix"}},"PERJURY":{"folder":"PERJURY","nation":"人狼議事RP:Braid Perjury","vid_code":"Bp","server":"perjury.rulez.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"PERJURY","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://perjury.rulez.jp","BASEDIR_CGIERR":"http://perjury.rulez.jp//","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 perjury rulez\n- Role Play braid -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/vage/config.pl"}},"XEBEC":{"folder":"XEBEC","nation":"人狼議事RP:Braid XEBEC","vid_code":"Bx","server":"xebec.x0.to","oldlog":"/xebec/sow.cgi?cmd=oldlog&rowall=on","livelog":"/xebec/sow.cgi?cmd=rss","info_url":"/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://xebec.x0.to/xebec","BASEDIR_CGIERR":"http://xebec.x0.to//xebec","NAME_HOME":"人狼議事 xebec\n- Role Play braid -","MAX_VILLAGES":3},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/xebec/config.pl"}},"CRAZY":{"folder":"CRAZY","nation":"人狼議事RP:Braid Crazy","vid_code":"Bc","server":"crazy-crazy.sakura.ne.jp","oldlog":"/crazy/sow.cgi?cmd=oldlog&rowall=on","livelog":"/crazy/sow.cgi?cmd=rss","info_url":"/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo","epi_url":"/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/crazy","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//crazy","NAME_HOME":"人狼議事 crazy\n- Role Play braid -","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/crazy/config.pl"}},"CABALA":{"folder":"CABALA","nation":"人狼議事CabalaCafe","vid_code":"C","server":"cabala.halfmoon.jp","oldlog":"/cafe/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cafe/sow.cgi?cmd=rss","info_url":"/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://cabala.halfmoon.jp/cafe","BASEDIR_CGIERR":"http://cabala.halfmoon.jp//cafe","NAME_HOME":"人狼議事 Cabala Cafe","MAX_VILLAGES":4},"pl":"/www/giji_log/cafe/config.pl"}},"ALLSTAR":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:AllStar","vid_code":"A","server":"jinro.jksy.org","oldlog":"/~nanakorobi?cmd=oldlog&rowall=on","livelog":"/~nanakorobi?cmd=rss","info_url":"/~nanakorobi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"BRAID","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://jinro.jksy.org/~nanakorobi","BASEDIR_CGIERR":"http://jinro.jksy.org//~nanakorobi","NAME_HOME":"人狼議事 大乱闘All☆Star","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/jksy/config.pl"}},"LOBBY_OLD":{"folder":"LOBBY_OLD","nation":"人狼議事旧ロビー","vid_code":"O"},"LOBBY":{"folder":"LOBBY","nation":"人狼議事ロビー","vid_code":"L","server":"crazy-crazy.sakura.ne.jp","oldlog":"/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on","livelog":"/giji_lobby/lobby/sow.cgi?cmd=rss","info_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["lobby"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../data/user"},"cfg":{"TYPE":"BRAID","RULE":"LOBBY","USERID_NPC":"master","USERID_ADMIN":"master","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":365,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//giji_lobby/lobby","NAME_HOME":"人狼議事 ロビー","MAX_VILLAGES":10,"MAX_LOG":750},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/lobby/config.pl","is_angular":"show-fix"}},"OFFPARTY":{"folder":"OFFPARTY","nation":"人狼議事オフ相談所","vid_code":"P","server":"party.ps.land.to","oldlog":"/kitchen/sow.cgi?cmd=oldlog&rowall=on","livelog":"/kitchen/sow.cgi?cmd=rss","info_url":"/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}}}

/***/ }),

/***/ "3Eo+":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "3fs2":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "4mcu":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "52gC":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "5PlU":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "5QVw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("BwfY"), __esModule: true };

/***/ }),

/***/ "6WIT":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, attrs;

({Model, Query, Rule} = __webpack_require__("L78F"));

attrs = {
  TITLE: {
    mark: 'T',
    label: '表題'
  },
  public: {
    label: '活動'
  },
  private: {
    label: '秘密'
  },
  SSAY: {
    mark: '',
    label: '会話'
  },
  TSAY: {
    mark: '-',
    label: '独言'
  },
  MAKER: {
    mark: '#',
    label: '村建'
  },
  ADMIN: {
    mark: '%',
    label: '管理'
  },
  VSSAY: {
    mark: '@',
    label: '見物'
  },
  WSAY: {
    mark: '*',
    label: '人狼'
  },
  GSAY: {
    mark: '+',
    label: '墓下'
  },
  SPSAY: {
    mark: '=',
    label: '共鳴'
  },
  XSAY: {
    mark: '!',
    label: '念波'
  },
  VGSAY: {
    mark: '@',
    label: '見物'
  }
};

new Rule("phase").schema(function() {
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function(all) {
    return {};
  });
  return this.model = class model extends this.model {
    static deploy() {
      var o;
      if (o = attrs[this.handle]) {
        Object.assign(this, o);
      }
      if (!this.guide) {
        return this.mark = null;
      }
    }

    static map_reduce(o, emit) {
      emit("group", o.group, {
        count: 1
      });
      return emit("handle", o.handle, {
        count: 1
      });
    }

    static order(o, emit) {
      emit("list", {
        sort: ["write_at"]
      });
      emit("group", {
        sort: ["count", "desc"]
      });
      return emit("handle", {
        sort: ["count", "desc"]
      });
    }

  };
});


/***/ }),

/***/ "77Pl":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "7KvD":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "7LDH":
/***/ (function(module, exports, __webpack_require__) {

var Finder, Mem, Model, Query, Rule, Set, axios;

({Model, Query, Rule, Set, Finder} = Mem = __webpack_require__("L78F"));

axios = __webpack_require__("mtWM");

module.exports = {
  namespaced: true,
  state: function() {
    return {};
  },
  mutations: {
    progress: function(state, data) {
      Set.sow_turn.merge(data.events);
      return Set.sow_village.merge(data.stories);
    },
    oldlog: function(state, data) {
      var _id, i, j, len, len1, ref, story_id, story_ids, vil;
      Set.sow_village.merge(data.stories);
      ref = data.faces;
      for (i = 0, len = ref.length; i < len; i++) {
        ({_id, story_ids} = ref[i]);
        for (j = 0, len1 = story_ids.length; j < len1; j++) {
          story_id = story_ids[j];
          if (vil = Query.sow_villages.find(story_id)) {
            vil.aggregate.face_ids.push(_id.face_id);
          }
        }
      }
      return Finder.sow_village.clear_cache();
    }
  },
  actions: {
    progress: async function({state, commit, rootState}) {
      var data, status;
      ({status, data} = (await axios.get(`${env.url.api}/story/progress`)));
      return commit("progress", data);
    },
    oldlog: async function({state, commit, rootState}) {
      var data, status;
      ({status, data} = (await axios.get(`${env.url.store}/sow/index.json`)));
      return commit("oldlog", data);
    }
  }
};


/***/ }),

/***/ "7UMu":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("R9M2");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "82Mu":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var macrotask = __webpack_require__("L42u").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("R9M2")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "880/":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hJx8");


/***/ }),

/***/ "8Mgz":
/***/ (function(module, exports) {

module.exports = {"editvilform":{"at":"around","cmd":"editvilform","btn":"村を編集する","change":"村の編集フォームを確認、修正します。","help":""},"muster":{"at":"prologue","cmd":"muster","btn":"点呼！","change":"全員を未発言状態にします。未発言者は１日そのまま発言がないと、自動退出します。","help":""},"update":{"at":"all","cmd":"update","btn":"更新！","change":"ただちに更新し、次の日を迎えます。お覚悟はよろしいですか？","help":""},"scrapvil":{"at":"all","cmd":"scrapvil","btn":"廃村！","change":"ただちに村を廃村にします。廃村になった村はエピローグになります。","help":""},"exit":{"at":"prologue","cmd":"exit","btn":"退出…","change":"村を立ち去ります。","help":""},"commit":{"at":"progress","cmd":"commit","sw":"時間を進める","pass":"（時間を進めない）","change":"時間を進めるかどうか、選択してください。","help":"全員が「時間を進める」を選ぶと前倒しで更新されます。\n最低一発言して確定しないと、時間を進める事ができません。"},"night":{"at":"main","sw":"夜遊びする","pass":"（夜遊びしない）","change":"夜遊びをして、深夜の囁きを聞いてしまうかどうか、選択してください。","help":"あなたは二日目以降、夜に出歩くことができます。\n人狼の囁き、民の念話、共鳴者の共鳴を誰のものとも判別せず聞いちゃうので、朝になって昨日を振り返ると思い出せることでしょう。\n顔や名前はわかりませんが。\nただしこのとき、もしあなたが人狼の、誰かひとりにでも襲撃される矛先に含まれていると、恐怖のあまり、実際に襲われる犠牲者とは別に死んでしまいます。\nこの死亡を護衛する方法はありません。また、息を引き取るあなたを尻目に、狼達は別の人物を襲撃するでしょう。"},"dish":{"at":"progress","sw":"跳ねる","pass":"（跳ねない）","change":"跳ねるアピールをするかどうか、選択してください。","help":"美味しく食べて貰うことを悦びとし、活き活きと跳ねることができます。わたしをたべて、わたしをたべて、とアピールしましょう。"},"cling":{"at":"main","sw":"飲薬する","pass":"（飲薬しない）","change":"あなたが殺害されたとしたら、犯人を道連れにするかどうか、選択してください。","help":"薬を服用した夜、もし処刑以外の要因で命を落とした場合、その犯人を道連れにします。人狼の襲撃の場合、襲撃実行者が対象となります。"},"guru":{"for":"live","at":"progress","targets":"誘う","pass":"（パス）","change":"誘い込む犠牲者を選択してください。","help":"毎晩ふたりずつ、好きな人物をひそかに誘い込むことができます。自分自身を誘うことはできません。\n誘い込まれた当人たちは夜な夜な踊り明かし、そのことを覚えています。しかし、彼らの能力や所属陣営などに変化はありません。"},"bitch":{"for":"live","at":"start","targets":"遊ぶ","change":"絆を結ぶ相手と、弄ぶ遊び相手を選択してください。","help":"一日目、一人目に選択した人物を本命の恋人として“運命の絆”を結びつけ、二人目は絆を結ぶふりをして手玉にとります。\n“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。もう一人はどうでもよいのですが、そう思わせないこまめなケアが大切です。"},"bonds":{"for":"live","at":"start","targets":"結ぶ","change":"絆で結ぶ二人を選択してください。","help":"一日目、好きな二人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。"},"bond":{"for":"live","at":"start","target":"結ぶ","change":"あなたとの絆を結ぶ相手を選択してください。","help":"一日目、あなたから好きな人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ相手が死亡すると、あなたは後を追って死亡します。"},"guard":{"for":"live","at":"main","target":"守る","pass":"（パス）","change":"守護する対象を選択してください。","help":"一人を狼の襲撃、もしくは付け狙う賞金稼の手から守ることが出来ます。\n自分自身を守ることは出来ません。"},"see":{"for":"live","at":"progress","target":"占う","pass":"（パス）","change":"正体を知りたい相手を選択してください。","help":"ひとりを占い対象に指定します。"},"sneak":{"for":"live","at":"progress","target":"狙う","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"hunt":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"人狼全員で多数決をし、一人だけ殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"kill":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"cure":{"for":"live","at":"main","target":"診察","pass":"（パス）","change":"診察する相手を選択してください。","help":"ひとりを診察し、人狼の牙に感染しているかを確認します。その場合は治療します。治療した人は生存者として数えますが、能力は取り戻しません。"},"tangle":{"for":"dead","at":"progress","target":"憑依","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"死者の埋葬地をうろつきまわっています。\n指定した故人の役職と勝利条件を写しとり、対象を蘇生させます。\nこのため、あなたは死亡しなくては、勝利がありません。"},"analeptic":{"for":"dead","at":"progress","require":"role1","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"死者に投薬して蘇生させます。\n蘇生は一度だけおこなうことができ、それっきり薬は失われます。"},"poison":{"for":"live","at":"progress","require":"role2","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"生きている者に投薬して毒殺します。\n毒殺は一度ずつだけおこなうことができ、それっきり薬は失われます。"},"scapegoat":{"for":"live","at":"main","target":"疑う","pass":"（パス）","change":"あなたが最後になったとしたら、指差す相手を選択してください。","help":"もし投票数が同数になり処刑する相手が定まらないと、混乱した村人達に処刑されてしまいます。\nあなたが最後に指差した人は、後悔する村人達に翌日、処刑されるでしょう。皆、そうするより他にないのです。"},"hike":{"for":"cast","at":"progress","target":"外出する","pass":"（パス）","change":"会いに行く相手を選択してください。","help":"特殊な能力があるかどうか自覚していません。夜は積極的に外出して、様子をさぐりましょう。"},"vote":{"for":"live","at":"main","cmd":"vote","target":"投票","pass":"（委任する）","change":"処刑する相手を選択してください。","help":"全員で多数決をし、一人だけ処刑します。"},"vote_role":{"for":"live","at":"main","target":"投票","pass":"（パス）","change":"処刑する相手を選択してください。","help":""},"entrust":{"for":"live","at":"main","cmd":"vote","target":"委任","pass":"（投票する）","change":"処刑を棄権し、一票を委ねる相手を選択してください。","help":"投票は棄権し、他人の投票と同じとすることができます。"},"jammer":{"for":"live","at":"progress","target":"邪魔","pass":"（パス）","change":"占いから保護する相手を選択してください。","help":"毎夜、一人をあらゆる占いから包み隠すことができます。\n自分自身を隠すことはできません。"},"snatch":{"for":"live","at":"progress","target":"換わる","pass":"（パス）","change":"顔と名前を簒奪する相手を選択してください。","help":"好きな人物の顔と名前を奪い、自身のそれと入れ替えることができます。この能力は非常に露顕しやすいので、行使には注意が必要です。\nもしも夜の間に屍体になった人を対象に選んだなら、旧いあなたは命を落とし、あなたとなったその屍体は息を吹き返すでしょう。\nまた、結ばれた絆や、笛吹きに誘われたことは姿とともにあり、姿を移し替えたときに引き継ぐことがあります。\n一度移し替えた姿は、永遠にあなたのものです。二度と元には戻りません。"},"gm_droop":{"for":"gm_live","at":"all","cmd":"gamemaster","target":"すぐに墓下へ","pass":"―――","change":"参加者として死なせる相手を選択してください。","help":""},"gm_live":{"for":"gm_dead","at":"all","cmd":"gamemaster","target":"すぐに表舞台へ","pass":"―――","change":"参加者として蘇生させる相手を選択してください。","help":""},"gm_disable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票から保護する","pass":"―――","change":"投票対象に選ぶことを認めない相手を選択してください。","help":""},"gm_enable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票を認可する","pass":"―――","change":"投票対象に選ぶこと許可する相手を選択してください。","help":""},"maker":{"for":"all","at":"all","cmd":"maker","target":"村を任せる","pass":"―――","change":"村の管理を任せる相手を選択してください。","help":""},"kick":{"for":"all","at":"prologue","cmd":"kick","target":"退去！","pass":"―――","change":"退去いただこう、かな…、と思った相手を選択してください。","help":""},"blind":{"help":"（サーバーは、この役職を保有していることを本人に通知しません。）"},"wolf":{"help":"あなたは人狼と判定されます。"},"pixi":{"help":"占いの対象となると死亡します。勝利判定では人間にも人狼にも数えられません。"},"human":{"help":"勝利判定では人間として数えられます。"},"evil":{"help":"人間でありながら、人外に協力する裏切り者です。場合によっては敢えて死ぬ必要があります。"},"circular":{"help":"この贈り物は、次に渡す相手を選び渡すことになっています。\n将来もしふたたびあなたの手に渡ったら、贈り物は消え去ってしまいます。"},"friend":{"help":"仲間に向けては能力を使いません。"},"once":{"help":"能力を持ちますが、その能力はたった一度しか使うことができません。"},"hate":{"help":"絆の運命は悲しい殺し合いを強いるでしょう。彼らは本来の勝利条件ではなく、ただ一人生き残ることが勝利条件となります。"},"love":{"help":"絆の運命は彼らを、愛で固く結ぶでしょう。彼らは本来の勝利条件ではなく、共存が勝利条件となります。"},"droop":{"help":"あなたは、生きた人狼の人数の二日後に、命を落とします。"},"curse":{"help":"あなたを占ってしまった占い師は死亡します。"},"aura":{"help":"あなたはオーラを持ちます。"},"rob":{"help":"誰もならなかった残り役職をすべて知ります。\n次の夜、その中から運命の導くままひとつの役職を選び、仮面の役職に成り代わるでしょう。\n運命は、あなたになにを課すでしょうか？"},"grave":{"help":"命を落とすと、能力を発揮することができます。"},"armor":{"help":"狼の襲撃や賞金稼の手により殺されることはありません。"},"medium":{"help":"処刑や突然死で死んだ全員を対象にします。\n無惨な死体について判断することは出来ません。"},"spy_role":{"help":"その人が持つ役職がわかります。恩恵は、役職とは別個のものです。このため半端者、悪鬼、妖精の子を直接見分けることはできません。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_win":{"help":"その人が持つ陣営（勝利条件）がわかります。多くは役職を思わせるものです。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_aura":{"help":"その人が能力を持つか判別出来ます。あなたにとって、村人、人狼、白狼は能力のオーラを持ちませんが、そうでない人物は能力のオーラを纏っていると感じられます。"},"spy_wolf":{"help":"その人が人間か人狼か判別できます。ただし狼血族は人狼と誤認し、白狼は人間と誤認してしまいます。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"stigma":{"help":"独特の印を持つため、あなたの正体は比較的信用されやすいでしょう。"},"fm":{"help":"結社員・共鳴者が誰なのか知っています。"},"fanatic":{"help":"人狼にはあなたの正体はわかりませんが、あなたは人狼が誰か知っています。また、新たに人狼となったものを知ることもできます。\nですが、あなたは狼血族や擬狼妖精も人狼であると誤認してしまいますし、一匹狼の正体を知ることはできません。"},"tafness":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると傷を負うものの、一日だけ生き長らえます。"},"hurt":{"label":"負傷","help":""},"sheep":{"help":"踊り狂ったおぼろげな記憶がある。"},"infected":{"label":"感染","help":""},"hide_for_vote":{"hide":["vote"],"label":"投票対象外","help":""},"hide_for_role":{"hide":["role"],"label":"能力対象外","help":""},"hide_for_gift":{"hide":["gift"],"label":"恩恵対象外","help":""},"disable_vote":{"disable":["vote"],"label":"<s>投票</s>","help":""},"disable_special":{"disable":["gift","role"],"label":"<s>全能力</s>","help":"あなたはもう特殊能力を使うことができません。"},"disable_gift":{"disable":["gift"],"label":"<s>恩恵</s>","help":"あなたはもう恩恵能力を使うことができません。"},"disable_role":{"disable":["role"],"label":"<s>能力</s>","help":"あなたはもう役職能力を使うことができません。"},"disable_poison":{"disable":["poison"],"label":"<s>毒薬</s>","help":"あなたはもう毒薬を使うことができません。"},"disable_analeptic":{"disable":["analeptic"],"label":"<s>蘇生薬</s>","help":"あなたはもう蘇生薬を使うことができません。"},"twolife":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされても、一度だけは命が助かります。"},"august":{"help":"あなたが処刑されることに決まると一度だけは、その処刑はとりやめになります。"},"revenge":{"help":"どんな理由であれ、あなたが命を落とすと、その夜のうちに能力を発揮します。"},"seal":{"help":"ひとりの犯人が特定できるのであれば、犯人はいっさいの能力を行使できなくなります。"},"grudge":{"help":"あなたが命を落とした翌日、人狼は二つの襲撃をおこない、二人を一度に殺害します。"},"riot":{"help":"あなたが死亡した翌日は、村人達が暴力的に二つの投票をおこない、二人を一度に処刑します。"},"wolfify":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると、あなたは人狼になります。"},"chkGSAY":{"help":"顔や名前はわかりませんが、あなたの耳には死者の声が届いちゃうことでしょう。"},"ENTRY":{"cmd":"entry","text":["talk"],"label":"導入","help":"キャラクターを選択し、エントリーしましょう。"},"MAKER":{"cmd":"write","text":["talk","memo","act"],"label":"村立て話","help":"あなたは村立て人です。"},"ADMIN":{"cmd":"write","text":["talk","memo","act"],"label":"管理者話","help":"あなたは管理人です。"},"SPSAY":{"cmd":"write","text":["talk","memo"],"label":"共鳴","help":"あなたは、共鳴者同士にしか聞こえない会話が可能です。"},"WSAY":{"cmd":"write","text":["talk","memo"],"label":"囁き","help":"あなたは、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話が可能です。"},"XSAY":{"cmd":"write","text":["talk","memo"],"label":"念話","help":"あなたは、念波星でしか聞こえない会話が可能です。"},"GSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":"あなたは、死者にしか聞こえない会話が可能です。"},"MSAY":{"cmd":"write","text":["talk","memo"],"label":"口借り","help":"あなたは<b>_NPC_</b>の口を借り、好きな言葉を伝えることができます。"},"AIM":{"for":"near","cmd":"write","text":["talk","memo"],"label":"内緒話","help":null},"TSAY":{"cmd":"write","text":["talk","memo"],"label":"独り言","help":null},"SSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VGSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null}}

/***/ }),

/***/ "94VQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("Yobk");
var descriptor = __webpack_require__("X8DO");
var setToStringTag = __webpack_require__("e6n0");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("hJx8")(IteratorPrototype, __webpack_require__("dSzd")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9bBU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("mClu");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "9br5":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("iWRh");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("078fb6cc", content, true);

/***/ }),

/***/ "A+H9":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ger","admin":"闇の呟き","maker":"馬頭琴の調","label":"エクスパンション・セット「大陸議事」"},"chr_npc":[{"label":"エクスパンション・セット「大陸議事」","csid":"ger","face_id":"g03","say_0":"まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","say_1":"飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"}],"chr_job":[{"face_id":"g01","job":"三元道士"},{"face_id":"g02","job":"白鶴拳"},{"face_id":"g03","job":"吹牛方士"},{"face_id":"gc61","job":"釣り師"},{"face_id":"g04","job":"心意六合拳"},{"face_id":"g05","job":"本草方士"},{"face_id":"g06","job":"宝飾交易"},{"face_id":"g07","job":"お針子"},{"face_id":"g08","job":"馬鹿"}]}

/***/ }),

/***/ "AYVu":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ririnra","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事"},"chr_npc":[{"label":"人狼議事（キャサリン）","csid":"ririnra_c05","face_id":"c05","say_0":"たいへん、たいへん、たいへん！","say_1":"大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"},{"label":"人狼議事（ベネット）","csid":"ririnra_c08","face_id":"c08","say_0":"壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","say_1":"足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"人狼議事（タバサ）","csid":"ririnra_c19","face_id":"c19","say_0":"ねぇ、遊んでかない？今夜はあなたが狼よ……","say_1":"人狼なんているわけないじゃん？みんな大げさなのさ。"},{"label":"人狼議事（ソフィア）","csid":"ririnra_c67","face_id":"c67","say_0":"こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","say_1":"まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"},{"label":"人狼議事（ヨアヒム）","csid":"ririnra_c68","face_id":"c68","say_0":"ふひ、ふひひ！人狼になど……くれてやるものかヨ！","say_1":"人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"},{"label":"人狼議事（ヴェスパタイン）","csid":"ririnra_c72","face_id":"c72","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"人狼議事（ヨーランダ）","csid":"ririnra_c51","face_id":"c51","say_0":"夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","say_1":"……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"},{"label":"人狼議事（グロリア）","csid":"ririnra_c20","face_id":"c20","say_0":"紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","say_1":"ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"},{"label":"人狼議事（オスカー）","csid":"ririnra_c32","face_id":"c32","say_0":"…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","say_1":"ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"},{"label":"人狼議事","csid":"ririnra","face_id":"c99","say_0":"嗚呼、聞こえ る。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"花売り"},{"face_id":"c02","job":"村長"},{"face_id":"c03","job":"見習い医師"},{"face_id":"c04","job":"女中"},{"face_id":"c05","job":"病人"},{"face_id":"c06","job":"紐"},{"face_id":"c07","job":"雑貨屋"},{"face_id":"c08","job":"本屋"},{"face_id":"c09","job":"刺客"},{"face_id":"c10","job":"小娘"},{"face_id":"c11","job":"小僧"},{"face_id":"c12","job":"御者"},{"face_id":"c13","job":"ベテラン医師"},{"face_id":"c14","job":"聖歌隊員"},{"face_id":"c15","job":"郵便屋"},{"face_id":"c16","job":"食いしん坊"},{"face_id":"c17","job":"詩人"},{"face_id":"c18","job":"ベテラン看護婦"},{"face_id":"c19","job":"水商売"},{"face_id":"c20","job":"良家の娘"},{"face_id":"c21","job":"肉屋"},{"face_id":"c22","job":"百姓"},{"face_id":"c23","job":"伝道師"},{"face_id":"c24","job":"長老"},{"face_id":"c25","job":"良家の息子"},{"face_id":"c26","job":"楽器職人"},{"face_id":"c27","job":"牧人"},{"face_id":"c28","job":"読書家"},{"face_id":"c29","job":"記者"},{"face_id":"c30","job":"鳥使い"},{"face_id":"c31","job":"童話作家"},{"face_id":"c32","job":"双生児"},{"face_id":"c33","job":"双生児"},{"face_id":"c34","job":"靴磨き"},{"face_id":"c35","job":"親方"},{"face_id":"c36","job":"飾り職"},{"face_id":"c37","job":"奏者"},{"face_id":"c38","job":"歌い手"},{"face_id":"c39","job":"仕立て屋"},{"face_id":"c40","job":"執事"},{"face_id":"c41","job":"さすらい人"},{"face_id":"c42","job":"掃除夫"},{"face_id":"c43","job":"森番"},{"face_id":"c44","job":"小悪党"},{"face_id":"c45","job":"博徒"},{"face_id":"c46","job":"助手"},{"face_id":"c47","job":"流浪者"},{"face_id":"c48","job":"宝石収集家"},{"face_id":"c49","job":"石工"},{"face_id":"c50","job":"会計士"},{"face_id":"c51","job":"墓守"},{"face_id":"c52","job":"墓堀"},{"face_id":"c53","job":"大地主"},{"face_id":"c54","job":"理髪師"},{"face_id":"c55","job":"寡婦"},{"face_id":"c56","job":"酒屋"},{"face_id":"c57","job":"修道女"},{"face_id":"c58","job":"司祭"},{"face_id":"c59","job":"修道士"},{"face_id":"c60","job":"良家の末娘"},{"face_id":"c61","job":"釣り師"},{"face_id":"c62","job":"風来坊"},{"face_id":"c63","job":"漂白工"},{"face_id":"c64","job":"墓荒らし"},{"face_id":"c65","job":"始末屋"},{"face_id":"c66","job":"紅茶屋"},{"face_id":"c67","job":"店番"},{"face_id":"c68","job":"賭場の主"},{"face_id":"c69","job":"美術家"},{"face_id":"c70","job":"子守り"},{"face_id":"c71","job":"道案内"},{"face_id":"c72","job":"ランタン職人"},{"face_id":"c73","job":"水商売"},{"face_id":"c74","job":"踊り手"},{"face_id":"c75","job":"奏者"},{"face_id":"c76","job":"留守番"},{"face_id":"c77","job":"馬飼い"},{"face_id":"c78","job":"道化師"},{"face_id":"c79","job":"長老の孫"},{"face_id":"c80","job":"若者"},{"face_id":"c81","job":"薬屋"},{"face_id":"c82","job":"執事見習い"},{"face_id":"c83","job":"受付"},{"face_id":"c84","job":"妻"},{"face_id":"c85","job":"お使い"},{"face_id":"c86","job":"放蕩者"},{"face_id":"c87","job":"病人"},{"face_id":"c88","job":"料理人"},{"face_id":"c99","job":"厭世家"},{"job":"新妻","face_id":"c89"},{"job":"粉ひき","face_id":"c90"},{"job":"洗濯婦","face_id":"c91"},{"job":"洗濯婦","face_id":"c92"},{"job":"洗濯婦","face_id":"c93"},{"face_id":"c94","job":"女主人"},{"face_id":"c95","job":"新聞配達"},{"face_id":"c96","job":"学者"},{"job":"捜査官","face_id":"c97"},{"job":"探偵","face_id":"c98"},{"job":"徒弟","face_id":"c100"},{"job":"手伝い","face_id":"c101"},{"face_id":"c102","job":"指揮者"},{"face_id":"c103","job":"厭世家"},{"face_id":"c104","job":"負傷兵"},{"face_id":"c105","job":"教え子"},{"face_id":"c106","job":"魚屋"},{"face_id":"c107","job":"成金"},{"face_id":"c108","job":"採集人"},{"face_id":"c109","job":"村娘"},{"face_id":"c110","job":"ろくでなし"},{"face_id":"c111","job":"愛人"},{"face_id":"c112","job":"許婚"},{"face_id":"c113","job":"紐"},{"face_id":"c114","job":"革命家"},{"face_id":"c115","job":"廃品回収"},{"face_id":"c116","job":"逃亡者"},{"face_id":"c117","job":"宿屋"},{"face_id":"c118","job":"渡し船"},{"face_id":"c119","job":"信徒"},{"face_id":"c120","job":"庭師"},{"face_id":"c121","job":"農薬売"}]}

/***/ }),

/***/ "BO1k":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("fxRn"), __esModule: true };

/***/ }),

/***/ "BwfY":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fWfb");
__webpack_require__("M6a0");
__webpack_require__("OYls");
__webpack_require__("QWe/");
module.exports = __webpack_require__("FeBl").Symbol;


/***/ }),

/***/ "C4MV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("9bBU"), __esModule: true };

/***/ }),

/***/ "CIhV":
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set, monthry, welcome, yeary;

({Set, Model, Query, Rule} = Mem = __webpack_require__("L78F"));

monthry = new Intl.DateTimeFormat('ja-JP', {
  year: "numeric",
  month: "2-digit"
});

yeary = new Intl.DateTimeFormat('ja-JP', {
  year: "numeric"
});

new Rule("sow_roletable").schema(function() {});

new Rule("sow_turn").schema(function() {
  this.order("turn", "asc");
  return this.belongs_to("village", {
    target: "sow_villages",
    key: "story_id"
  });
});

new Rule("sow_village").schema(function() {
  var cmd, sort;
  this.has_many("turns", {
    target: "sow_turns",
    key: "story_id"
  });
  this.habtm("option_datas", {
    target: "options",
    key: "options"
  });
  this.belongs_to("say", {
    target: "says",
    key: "q.say"
  });
  this.belongs_to("mob", {
    target: "roles",
    key: "q.mob"
  });
  this.belongs_to("game", {
    target: "games",
    key: "q.game"
  });
  this.scope(function(all) {
    return {
      prologue: all.where({
        mode: "prologue"
      }).sort("timer.nextcommitdt", "desc"),
      progress: all.where({
        mode: "progress"
      }).sort("timer.nextcommitdt", "desc"),
      mode: function(mode) {
        return all.where({mode});
      },
      search: function(mode, query_in, query_where, order, asc) {
        return all.where({mode}).in(query_in).where(query_where).order({
          sort: [order, asc],
          page_by: 25
        });
      }
    };
  });
  Object.assign(this.model_property, {
    roles: {
      get: function() {
        var ref;
        return (ref = this.query.reduce) != null ? ref : [];
      }
    },
    event_length: {
      get: function() {
        var ref, ref1;
        return (ref = (ref1 = this.query.reduce.event) != null ? ref1.length : void 0) != null ? ref : 0;
      }
    }
  });
  sort = ['count', 'desc'];
  cmd = {
    count: 1
  };
  return this.model = class model extends this.model {
    static deploy() {
      var hour, interval, list, minute, ref, ref1, ref2, ref3, updated_at;
      ({interval, hour, minute} = this.upd);
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      updated_at = new Date(this.timer.updateddt);
      this.write_at = updated_at;
      this.query = Query.sow_villages.where({id: this.id});
      this.q = {
        sow_auth_id: this.sow_auth_id.replace(/\./g, '&#2e'),
        folder_id: this.folder.toUpperCase(),
        size: "x" + this.vpl[0],
        say: this.type.say,
        mob: this.type.mob,
        game: this.type.game,
        upd_at: `${hour}:${minute}`,
        upd_range: `${interval * 24}h`,
        yeary: yeary.format(updated_at),
        monthry: monthry.format(updated_at),
        rating: this.rating
      };
      if ((ref = this.rating) === null || ref === 0 || ref === "0" || ref === "null" || ref === "view") {
        this.q.rating = "default";
      }
      if ((ref1 = this.rating) === "R15" || ref1 === "r15" || ref1 === "r18") {
        this.q.rating = "alert";
      }
      if ((ref2 = this.rating) === "gro") {
        this.q.rating = "violence";
      }
      list = (ref3 = Query.sow_roletables.find(this.type.roletable).role_ids_list) != null ? ref3[this.q.size] : void 0;
      if ((list != null ? list.length : void 0) && !this.card.config.length) {
        this.card.config = list;
      }
      this.card.option = this.options;
      this.folder = Query.folders.find(this.q.folder_id);
      if (this.is_epilogue && this.is_finish) {
        this.href = `${env.url.store}/stories/${this._id}`;
        this.mode = "oldlog";
      } else {
        if (this.turns.list.first) {
          this.mode = "progress";
        } else {
          this.mode = "prologue";
        }
      }
      return this.aggregate = {
        face_ids: []
      };
    }

    static order(o, emit) {
      emit("yeary", {sort});
      emit("monthry", {sort});
      emit("folder_id", {sort});
      emit("upd_range", {sort});
      emit("upd_at", {sort});
      emit("sow_auth_id", {sort});
      emit("rating", {sort});
      emit("size", {sort});
      emit("say", {
        sort,
        belongs_to: "says"
      });
      emit("game", {
        sort,
        belongs_to: "games"
      });
      emit("mob", {
        sort,
        belongs_to: "roles"
      });
      emit("option", {
        sort,
        belongs_to: "options"
      });
      emit("event", {
        sort,
        belongs_to: "roles"
      });
      emit("discard", {
        sort,
        belongs_to: "roles"
      });
      return emit("config", {
        sort,
        belongs_to: "roles"
      });
    }

    static map_reduce(o, emit) {
      var card_id, i, j, k, l, len, len1, len2, len3, opt_id, ref, ref1, ref2, ref3, results;
      emit("yeary", o.q.yeary, cmd);
      emit("monthry", o.q.monthry, cmd);
      emit("folder_id", o.q.folder_id, cmd);
      emit("upd_range", o.q.upd_range, cmd);
      emit("upd_at", o.q.upd_at, cmd);
      emit("sow_auth_id", o.q.sow_auth_id, cmd);
      emit("rating", o.q.rating, cmd);
      emit("size", o.q.size, cmd);
      emit("say", o.q.say, cmd);
      emit("game", o.q.game, cmd);
      emit("mob", o.q.mob, cmd);
      ref = o.card.option;
      for (i = 0, len = ref.length; i < len; i++) {
        opt_id = ref[i];
        emit("option", opt_id, cmd);
      }
      ref1 = o.card.event;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        card_id = ref1[j];
        emit("event", card_id, cmd);
      }
      ref2 = o.card.discard;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        card_id = ref2[k];
        emit("discard", card_id, cmd);
      }
      ref3 = o.card.config;
      results = [];
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        card_id = ref3[l];
        results.push(emit("config", card_id, cmd));
      }
      return results;
    }

  };
});

new Rule("folder").schema(function() {
  this.scope(function(all) {
    return {
      enable: all.where(function(o) {
        return !o.disabled;
      }),
      host: function(hostname) {
        return all.where({hostname});
      }
    };
  });
  return this.model = class model extends this.model {
    static deploy() {
      var _, hostname, o, path, path_dir, protocol, ref;
      if (o = (ref = this.config) != null ? ref.cfg : void 0) {
        this.rule = o.RULE;
        this.title = o.NAME_HOME;
        this.max_vils = o.MAX_VILLAGES;
        if (this.max_vils) {
          this.href = this.config.cfg.URL_SW + "/sow.cgi";
          [protocol, _, hostname, ...path_dir] = this.href.split("/");
          this.hostname = hostname;
          path = "/" + path_dir.join("/");
        }
      }
      switch (this.folder) {
        case "LOBBY":
          this.max_vils = 0;
      }
      if (this.disabled = !path) {
        return;
      }
      return this.route = {
        path,
        name: this._id
      };
    }

  };
});

Set.folder.set(__webpack_require__("2X3i"));

Set.sow_roletable.set(__webpack_require__("veq+"));

welcome = function(h) {
  var chats, face_id, key, phases, potofs;
  chats = {};
  phases = {};
  potofs = {};
  for (key in h) {
    face_id = h[key];
    potofs[key] = {
      write_at: 1484445101000,
      face_id: face_id,
      job: "ようこそ！",
      name: ""
    };
    phases[key] = {
      write_at: 1484445101000,
      name: "通常発言",
      handle: "SSAY"
    };
    chats[key + "-1"] = {
      write_at: 1169852700003,
      potof_id: key,
      show: "post",
      style: "plain",
      log: "祝！人狼議事１０周年！"
    };
  }
  Set.phase.merge(phases);
  Set.potof.merge(potofs);
  return Set.chat.merge(chats);
};

welcome({
  "LOBBY-top-0-0": "c20",
  "CIEL-top-0-0": "c24",
  "BRAID-top-0-0": "c24",
  "PERJURY-top-0-0": "c25",
  "CABALA-top-0-0": "c78",
  "top-top-0-0": "t31"
});

Set.chat.merge({
  "LOBBY-top-0-0-2": {
    write_at: 1370662886000,
    potof_id: "LOBBY-top-0-0",
    show: "talk",
    style: "plain",
    log: "みなさまの助けになるよう、ロビーを用意いたしました。\n相談や困りごと、ちょっとした疑問などをお持ちでしたら、どうぞ、ごゆっくりなさいませ。"
  },
  "CIEL-top-0-0-2": {
    write_at: 1379511895000,
    potof_id: "CIEL-top-0-0",
    show: "talk",
    style: "plain",
    log: "<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるよ。\n早い者勝ちがよいのだけれど、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\">企画村予定表</a>という便利なページも見てみましょうね。"
  },
  "BRAID-top-0-0-2": {
    write_at: 1484445101002,
    potof_id: "BRAID-top-0-0",
    show: "talk",
    style: "plain",
    log: "こちらのページは<b>（陣営勝利を求めない）完全RP村、勝利追求を含むRP村</b>用に調整してあるよ。\n早い者勝ちが原則だけれど、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\" ng-href=\"{{link.plan}}\">企画村予定表</a>という便利なページも見てみよう。\n\n以下がおおざっぱな、他州との相違点なんだ。\n<ul>\n<li><a href=\"sow.cgi?cmd=rule#mind\">参加者の心構え</a>。ガチとは違うのだよ。ガチとは。\n</li><li><a href=\"http://crazy-crazy.sakura.ne.jp/giji/?(List)SayCnt\">発言ptの量</a>。\n</li><li>村の説明は4000字まで記述できます。\n</li><li>他、細かい調整が入っています。<a href=\"http://crazy-crazy.sakura.ne.jp/giji/\">仕様変更</a>を参考にしましょう。\n</li></ul>"
  },
  "PERJURY-top-0-0-2": {
    write_at: 1393597313000,
    potof_id: "PERJURY-top-0-0",
    show: "talk",
    style: "plain",
    log: "<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるのだ。\n紳士淑女の諸君には、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\">企画村予定表</a>を参考に、譲り合いの精神で調整してほしい。"
  },
  "CABALA-top-0-0-2": {
    write_at: 1420047938191,
    potof_id: "CABALA-top-0-0",
    show: "talk",
    style: "plain",
    log: "こちらのページは<b>RP村も、勝負も楽しみたい村</b>用に調整してあるよ。\n早い者勝ちが原則だけれど、企画村予定表という便利なページも見てみよう。\nもし君がRPに没頭したいなら、専用の州でどっぷり楽しもう。きっとそのほうが楽しめる。"
  }
});


/***/ }),

/***/ "CXw9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("O4g8");
var global = __webpack_require__("7KvD");
var ctx = __webpack_require__("+ZMJ");
var classof = __webpack_require__("RY/4");
var $export = __webpack_require__("kM2E");
var isObject = __webpack_require__("EqjI");
var aFunction = __webpack_require__("lOnJ");
var anInstance = __webpack_require__("2KxR");
var forOf = __webpack_require__("NWt+");
var speciesConstructor = __webpack_require__("t8x9");
var task = __webpack_require__("L42u").set;
var microtask = __webpack_require__("82Mu")();
var newPromiseCapabilityModule = __webpack_require__("qARP");
var perform = __webpack_require__("dNDb");
var promiseResolve = __webpack_require__("fJUb");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("dSzd")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("xH/j")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("e6n0")($Promise, PROMISE);
__webpack_require__("bRrM")(PROMISE);
Wrapper = __webpack_require__("FeBl")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("dY0y")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "CYi5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'nuxt-loading',
  data: function data() {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
      height: '2px',
      color: '#3B8070',
      failedColor: 'red'
    };
  },

  methods: {
    start: function start() {
      var _this = this;

      this.show = true;
      this.canSuccess = true;
      if (this._timer) {
        clearInterval(this._timer);
        this.percent = 0;
      }
      this._cut = 10000 / Math.floor(this.duration);
      this._timer = setInterval(function () {
        _this.increase(_this._cut * Math.random());
        if (_this.percent > 95) {
          _this.finish();
        }
      }, 100);
      return this;
    },
    set: function set(num) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(num);
      return this;
    },
    get: function get() {
      return Math.floor(this.percent);
    },
    increase: function increase(num) {
      this.percent = this.percent + Math.floor(num);
      return this;
    },
    decrease: function decrease(num) {
      this.percent = this.percent - Math.floor(num);
      return this;
    },
    finish: function finish() {
      this.percent = 100;
      this.hide();
      return this;
    },
    pause: function pause() {
      clearInterval(this._timer);
      return this;
    },
    hide: function hide() {
      var _this2 = this;

      clearInterval(this._timer);
      this._timer = null;
      setTimeout(function () {
        _this2.show = false;
        _vue2.default.nextTick(function () {
          setTimeout(function () {
            _this2.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    },
    fail: function fail() {
      this.canSuccess = false;
      return this;
    }
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),

/***/ "CcAI":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"sf","admin":"黒体放射のエヴェレット解釈","maker":"重ね合せ猫のユニタリ変換","label":"明後日への道標"},"chr_npc":[{"label":"明後日への道標","csid":"SF","face_id":"sf04","say_0":"とたたたたんっ。\n\n<b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b>","say_1":"ちゅー！\n\n　ちゅー！\n\n<b>がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……</b>"},{"label":"明後日への道標（ナユタ）","csid":"SF_sf10","face_id":"sf10","say_0":"f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n<b>同日\n整備日誌\n　定期点検。ただちに健康に影響はないが、擦過痕…</b>","say_1":"よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n<b>ぷつん</b>\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"}],"chr_job":[{"face_id":"sf01","job":"通信士"},{"face_id":"sf02","job":"哲学者"},{"face_id":"sf03","job":"道案内"},{"face_id":"sf04","job":"お散歩隊長"},{"face_id":"sf05","job":"新製品"},{"face_id":"sf06","job":"士官"},{"face_id":"sf07","job":"遊泳員"},{"face_id":"sf08","job":"服飾商"},{"face_id":"sf09","job":"研修生"},{"face_id":"sf10","job":"保安技師"},{"face_id":"sf11","job":"艇長"},{"face_id":"sf12","job":"廃神"},{"face_id":"sf13","job":"消防隊長"},{"face_id":"sf14","job":"対面販売"},{"face_id":"sf15","job":"忍者隊"},{"face_id":"sf16","job":"保険調査"},{"face_id":"sf17","job":"幽閉児"},{"face_id":"sf18","job":"感性子"},{"face_id":"sf19","job":"理性子"},{"face_id":"sf20","job":"測量士"},{"face_id":"sf021","job":"星間帆走"},{"face_id":"sf022","job":"鉱滓地区"},{"face_id":"sf023","job":"地下軌道"},{"face_id":"sf024","job":"光彩楽団"},{"face_id":"sf025","job":"救星隊"},{"face_id":"sf026","job":"星先案内"},{"face_id":"sf027","job":"鉱滓皇帝"},{"face_id":"sf028","job":"溶接技師"},{"face_id":"sf029","job":"機巧忍軍"},{"face_id":"sf030","job":"閉鎖管理"},{"face_id":"sf031","job":"意匠造形"},{"face_id":"sf032","job":"鉱滓地区"},{"face_id":"sf033","job":"重層培養"},{"face_id":"sf034","job":"華美人"},{"face_id":"sf035","job":"銀河ギャル"},{"face_id":"sf036","job":"好奇診"},{"face_id":"sf037","job":"執行隊"},{"face_id":"sf038","job":"複眼レフ"}]}

/***/ }),

/***/ "Cdx3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("sB3e");
var $keys = __webpack_require__("lktj");

__webpack_require__("uqUo")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "D2L2":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "Dd8w":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "EGZi":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "EqBC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var global = __webpack_require__("7KvD");
var speciesConstructor = __webpack_require__("t8x9");
var promiseResolve = __webpack_require__("fJUb");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "EqjI":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "F88d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_loading_vue__ = __webpack_require__("CYi5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_loading_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_loading_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28f37d47_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nuxt_loading_vue__ = __webpack_require__("yv6g");
function injectStyle (ssrContext) {
  __webpack_require__("9br5")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_loading_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28f37d47_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nuxt_loading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "FeBl":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "FfaV":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Mem, Model, Query, Rule, Set, _, axios,
  _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__("SqN4");

_ = __webpack_require__("M4fF");

axios = __webpack_require__("mtWM");

({Model, Set, Query, Rule} = Mem = __webpack_require__("L78F"));

if (typeof window !== "undefined" && window !== null) {
  window.Mem = Mem;
}

module.exports = {
  state: function() {
    return {
      user: null,
      env: {},
      read_at: {},
      timer: {}
    };
  },
  actions: {
    nuxtServerInit: function({commit}, {isDev, req, env}) {
      var ref, ref1, user;
      global.env = env;
      commit("update", {env});
      if (isDev) {
        user = {
          _id: "local-test-user",
          provider: "local-test",
          icon: "https://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg",
          mail: "7korobi.sys@gmail.com",
          nick: "テスト中",
          write_at: new Date - 0,
          token: "DEADBEEF",
          account: "user"
        };
        _.set(req, "session.passport.user", user);
      }
      user = (ref = req.session) != null ? (ref1 = ref.passport) != null ? ref1.user : void 0 : void 0;
      if (user) {
        user = _.omit(user, ["token"]);
        return commit("update", {user});
      }
    },
    user: async function({commit}, user) {
      commit("update", {user});
      await axios.post(`${env.url.api}/user`, {user});
    }
  },
  mutations: {
    update: function(state, o) {
      var key, val;
      for (key in state) {
        val = state[key];
        if (!o[key]) {
          continue;
        }
        state[key] = _extends({}, val, o[key]);
        console.log(key, state[key]);
      }
    }
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "FkjD":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"time","admin":"第四の壁の深奥","maker":"次元X式コンピューター","label":"エクスパンション・セット「帰還者議事」"},"chr_npc":[{"label":"エクスパンション・セット「帰還者議事」","csid":"time","face_id":"c10","say_0":"M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","say_1":"やっぱさ、銃を持った善人がいないとさ。<br><br>ちょっと出かけてくる！プリン食べちゃダメだよ！"}],"chr_job":[{"face_id":"c10","job":"小銃協会"},{"face_id":"t01","job":"友愛組合"},{"face_id":"t02","job":"幸運の科学"},{"face_id":"t03","job":"FSM団"},{"face_id":"t04","job":"截拳道"},{"face_id":"t05","job":"開放的市民"},{"face_id":"c09","job":"暗殺教団"},{"face_id":"t06","job":"死ね死ね団"},{"face_id":"t07","job":"勧善懲悪委"},{"face_id":"t08","job":"覆面嫉妬団"},{"face_id":"t09","job":"匿名軍団"},{"face_id":"t10","job":"営利政府"},{"face_id":"t11","job":"鷹の爪団"},{"face_id":"t12","job":"地下鉄道"},{"face_id":"t13","job":"MNU機関"},{"face_id":"t14","job":"猫の集会"},{"face_id":"t15","job":"少年探偵団"},{"face_id":"t16","job":"安全保障局"},{"face_id":"t17","job":"薔薇∴十字"},{"face_id":"t18","job":"白銀∴秘星"},{"face_id":"t19","job":"聖戦士募集"},{"face_id":"t20","job":"MI:18"},{"face_id":"t21","job":"九未知会"},{"face_id":"t22","job":"学園特警"},{"face_id":"t23","job":"孤高天使連合"},{"face_id":"t24","job":"トレーサー"},{"face_id":"t25","job":"2.14革命機構"},{"face_id":"t26","job":"法隆寺"},{"face_id":"t27","job":"硯友社"},{"face_id":"t28","job":"樫の樹の子ら"},{"face_id":"t29","job":"透明女子会"},{"face_id":"t30","job":"旅団✡肘笠雨"},{"face_id":"t31","job":"呵呵老会"},{"face_id":"t32","job":"安全調査局"},{"face_id":"t33","job":"亡命同盟"},{"face_id":"t34","job":"大銃協会"},{"face_id":"t35","job":"紅客連盟"},{"face_id":"t36","job":"PPP"},{"face_id":"t37","job":"素顔連盟"},{"face_id":"t38","job":"北後家蜘蛛会"},{"face_id":"t39","job":"黄金∴黎明"}]}

/***/ }),

/***/ "Gr6n":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"wa","admin":"闇の呟き","maker":"稲荷のお告げ","label":"和の国てやんでえ"},"chr_npc":[{"label":"和の国てやんでえ","csid":"wa","face_id":"w17","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"和の国てやんでえ（仁右衛門）","csid":"wa_w23","face_id":"w23","say_0":"なんと、これは奇っ怪……分かったゾ！","say_1":"やっぱり人狼は実在するんだヨ！　うっひょひょーい！"}],"chr_job":[{"face_id":"w01","job":"役者"},{"face_id":"w02","job":"浪人"},{"face_id":"w03","job":"忍者"},{"face_id":"w04","job":"町娘"},{"face_id":"w05","job":"飴師"},{"face_id":"w06","job":"巫女"},{"face_id":"w07","job":"双子"},{"face_id":"w08","job":"双子"},{"face_id":"w09","job":"宣教師"},{"face_id":"w10","job":"刺客"},{"face_id":"w11","job":"釣り師"},{"face_id":"w12","job":"女中"},{"face_id":"w13","job":"団子屋"},{"face_id":"w14","job":"手妻師"},{"face_id":"w15","job":"山姥"},{"face_id":"w16","job":"髪結い"},{"face_id":"w17","job":"病人"},{"face_id":"w18","job":"後妻"},{"face_id":"w20","job":"呉服問屋"},{"face_id":"w21","job":"うどん職人"},{"face_id":"w22","job":"そば職人"},{"face_id":"w23","job":"弁士"},{"face_id":"w24","job":"喧嘩屋"},{"face_id":"w25","job":"説法師"},{"face_id":"w26","job":"餓鬼大将"},{"face_id":"w27","job":"発明家"},{"face_id":"w28","job":"飛脚"},{"face_id":"w29","job":"琴弾き"},{"face_id":"w30","job":"宗主"},{"face_id":"w31","job":"子守り"},{"face_id":"w32","job":"落胤"},{"face_id":"w33","job":"船大工"},{"face_id":"w34","job":"野伏り"},{"face_id":"w35","job":"神主"},{"face_id":"w36","job":"楽士"},{"face_id":"w37","job":"薬売り"},{"face_id":"w38","job":"門下生"},{"face_id":"w39","job":"武家の娘"},{"face_id":"w40","job":"懐刀"},{"face_id":"w41","job":"物乞い"},{"face_id":"w43","job":"丁稚"},{"face_id":"w44","job":"機織り"},{"face_id":"w45","job":"座敷守"},{"face_id":"w46","job":"屍漁り"},{"face_id":"w47","job":"肥代取り"},{"face_id":"w48","job":"和算家"},{"_id":"w49","face_id":"w49","job":"抜荷"},{"face_id":"w50","job":"半の目"},{"face_id":"w51","job":"真剣師"},{"face_id":"w52","job":"看板娘"},{"face_id":"w53","job":"旅籠"}]}

/***/ }),

/***/ "HBB+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transitionsKeys = ['name', 'mode', 'appear', 'css', 'type', 'duration', 'enterClass', 'leaveClass', 'appearClass', 'enterActiveClass', 'enterActiveClass', 'leaveActiveClass', 'appearActiveClass', 'enterToClass', 'leaveToClass', 'appearToClass'];
var listenersKeys = ['beforeEnter', 'enter', 'afterEnter', 'enterCancelled', 'beforeLeave', 'leave', 'afterLeave', 'leaveCancelled', 'beforeAppear', 'appear', 'afterAppear', 'appearCancelled'];

exports.default = {
  name: 'nuxt-child',
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent,
        data = _ref.data;

    data.nuxtChild = true;
    var _parent = parent;
    var transitions = parent.$nuxt.nuxt.transitions;
    var defaultTransition = parent.$nuxt.nuxt.defaultTransition;
    var depth = 0;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.nuxtChild) {
        depth++;
      }
      parent = parent.$parent;
    }
    data.nuxtChildDepth = depth;
    var transition = transitions[depth] || defaultTransition;
    var transitionProps = {};
    transitionsKeys.forEach(function (key) {
      if (typeof transition[key] !== 'undefined') {
        transitionProps[key] = transition[key];
      }
    });
    var listeners = {};
    listenersKeys.forEach(function (key) {
      if (typeof transition[key] === 'function') {
        listeners[key] = transition[key].bind(_parent);
      }
    });
    return h('transition', {
      props: transitionProps,
      on: listeners
    }, [h('router-view', data)]);
  }
};

/***/ }),

/***/ "IWnm":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".title[data-v-638dcaae]{margin-top:15px;font-size:5em}.info[data-v-638dcaae]{font-weight:300;color:#9aabb1;margin:0}.button[data-v-638dcaae]{margin-top:50px}", ""]);

// exports


/***/ }),

/***/ "Ibhu":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("D2L2");
var toIObject = __webpack_require__("TcQ7");
var arrayIndexOf = __webpack_require__("vFc/")(false);
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "J2Ti":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = __webpack_require__("BO1k");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__("NYxO");

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

// Recursive find files in {srcDir}/store
var files = __webpack_require__("W12m");
var filenames = files.keys();

// Store
var storeData = {};

// Check if store/index.js exists
var indexFilename = void 0;
filenames.forEach(function (filename) {
  if (filename.indexOf('./index.') !== -1) {
    indexFilename = filename;
  }
});
if (indexFilename) {
  storeData = getModule(indexFilename);
}

// If store is not an exported method = modules store
if (typeof storeData !== 'function') {

  // Store modules
  if (!storeData.modules) {
    storeData.modules = {};
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(filenames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var filename = _step.value;

      var name = filename.replace(/^\.\//, '').replace(/\.(js|ts|coffee)$/, '');
      if (name === 'index') continue;

      var namePath = name.split(/\//);
      var _module = getModuleNamespace(storeData, namePath);

      name = namePath.pop();
      _module[name] = getModule(filename);
      _module[name].namespaced = true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// createStore
var createStore = exports.createStore = storeData instanceof Function ? storeData : function () {
  return new _vuex2.default.Store((0, _assign2.default)({
    strict: "production" !== 'production'
  }, storeData, {
    state: storeData.state instanceof Function ? storeData.state() : {}
  }));
};

// Dynamically require module
function getModule(filename) {
  var file = files(filename);
  var module = file.default || file;
  if (module.commit) {
    throw new Error('[nuxt] store/' + filename.replace('./', '') + ' should export a method which returns a Vuex instance.');
  }
  if (module.state && typeof module.state !== 'function') {
    throw new Error('[nuxt] state should be a function in store/' + filename.replace('./', ''));
  }
  return module;
}

function getModuleNamespace(storeData, namePath) {
  if (namePath.length === 1) {
    return storeData.modules;
  }
  var namespace = namePath.shift();
  storeData.modules[namespace] = storeData.modules[namespace] || {};
  storeData.modules[namespace].namespaced = true;
  storeData.modules[namespace].modules = storeData.modules[namespace].modules || {};
  return getModuleNamespace(storeData.modules[namespace], namePath);
}

/***/ }),

/***/ "KL+4":
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set, _, axios, nation;

({Model, Query, Rule, Set} = Mem = __webpack_require__("L78F"));

({nation} = __webpack_require__("Qm8W"));

axios = __webpack_require__("mtWM");

_ = __webpack_require__("M4fF");

module.exports = {
  namespaced: true,
  state: function() {
    return {};
  },
  mutations: {
    join: function(state, data) {
      var book_id, chat_foot, chat_head, chats, csid, date, head, i, idx, job, len, n_rules, o, phases, potof_id, potof_idx, ref, ref1, ref2, ref3, ref4, ref5, sign, v_rules, welcome, write_at;
      book_id = data.stories[0]._id;
      potof_idx = 0;
      ref = data.potofs;
      for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
        o = ref[idx];
        csid = o.csid;
        if (csid === 'SF') {
          csid = 'sf';
        }
        potof_idx = idx;
        potof_id = `${o.event_id}-${potof_idx}`;
        Set.stat.add({
          _id: `${o.event_id}`
        });
        if (Query.roles.find(o.live)) {
          date = o.deathday;
          if (!(0 < o.deathday)) {
            date = void 0;
          }
          Set.card.add({
            _id: `${potof_id}-live`,
            role_id: o.live,
            date: date
          });
        }
        if (Query.roles.find(o.select)) {
          Set.card.add({
            _id: `${potof_id}-request`,
            role_id: o.select
          });
        }
        if (Query.roles.find(o.role[0])) {
          Set.card.add({
            _id: `${potof_id}-role`,
            role_id: o.role[0]
          });
        }
        if (Query.roles.find(o.role[1])) {
          Set.card.add({
            _id: `${potof_id}-gift`,
            role_id: o.role[1]
          });
        }
        Set.stat.merge([
          {
            _id: `${potof_id}-give`,
            give: o.point.actaddpt
          }
        ]);
        if (o.live === "live") {
          Set.stat.add({
            _id: `${potof_id}-commit`,
            sw: true
          });
        }
        if (o.zapcount) {
          job = ["IR", "R", "O", "Y", "G", "B", "I", "V", "UV"][o.clearance] + "-";
        } else {
          job = (ref1 = Query.chr_jobs.find(`${csid}_${o.face_id}`)) != null ? ref1.job : void 0;
        }
        Set.potof.add({
          _id: potof_id,
          job: job,
          pno: o.pno,
          face_id: o.face_id,
          sign: o.sow_auth_id
        });
      }
      phases = {
        [`${book_id}-0-mA`]: {
          handle: "MAKER",
          group: "A",
          update: false
        },
        [`${book_id}-0-mS`]: {
          handle: "MAKER",
          group: "A",
          update: false
        }
      };
      write_at = 0;
      data.messages.map(function(o) {
        var _id, deco, face_id, guide, handle, head, log, phase_group, phase_id, phase_idx, phase_type, ref2, ref3, ref4, ref5, show, to;
        ({face_id, to, log, date, csid} = o);
        write_at = new Date(date) - 0;
        if (csid === 'SF') {
          csid = 'sf';
        }
        if (face_id === "maker" || face_id === "admin" || face_id === "c06") {
          face_id = void 0;
        }
        if (o.event_id == null) {
          o.event_id = o._id.split("-").slice(0, 3).join("-");
        }
        if ("*CAST*" === log) {
          return;
        }
        guide = true;
        handle = o.mestype;
        phase_group = o.subid;
        phase_type = o.subid + o.mestype;
        phase_idx = o.logid.slice(0, 2);
        idx = Number(o.logid.slice(2));
        if (o.story_id && face_id) {
          potof_id = (ref2 = Query.potofs.where({
            sign: o.sow_auth_id,
            face_id: face_id,
            book_id: o.story_id
          }).list[0]) != null ? ref2.id : void 0;
          if (!potof_id) {
            potof_idx += 1;
            Set.card.add({
              _id: [o.event_id, potof_idx, "live"].join("-"),
              role_id: "leave",
              date: 0
            });
            Set.stat.add({
              _id: [o.event_id, potof_idx, "SSAY"].join("-"),
              said: 0
            });
            Set.potof.add({
              _id: [o.event_id, potof_idx].join("-"),
              face_id: o.face_id,
              job: (ref3 = Query.chr_jobs.find([csid, o.face_id].join("_"))) != null ? ref3.job : void 0,
              sign: o.sow_auth_id,
              pno: ""
            });
          }
        }
        switch (o.logid.slice(0, 2)) {
          case "-S":
            phase_idx = "iI";
            phase_group = "I";
        }
        switch (o.subid) {
          case "M":
            show = "report";
            break;
          case "S":
            show = "talk";
            break;
          case "I":
            potof_id = void 0;
            if ((log != null ? (ref4 = log.match(/。|、/g)) != null ? ref4.length : void 0 : void 0) > 3) {
              show = "report";
            } else {
              show = "post";
            }
            break;
          case "A":
          case "B":
            potof_id = void 0;
            show = "post";
            log = o.name + "は、" + log;
            guide = false;
        }
        switch (handle) {
          case "DELETED":
            return;
          case "MAKER":
          case "ADMIN":
            potof_id = void 0;
            if (show === "talk") {
              show = "report";
            }
            break;
          case "INFONOM":
            handle = "public";
            break;
          case "INFOSP":
            handle = "private";
            break;
          case "INFOWOLF":
            handle = "WSAY";
            break;
          case "VSAY":
            handle = "VSSAY";
            break;
          case "SAY":
            handle = "SSAY";
        }
        if (to) {
          phase_idx = "AIM";
          handle = "AIM";
        }
        if (!log) {
          log = "メモをはがした。";
          show = "post";
        }
        phase_id = `${o.event_id}-${phase_idx}`;
        _id = `${phase_id}-${idx}`;
        deco = (ref5 = o.style) != null ? ref5 : "sow";
        head = potof_id && o.name;
        if (phases[phase_id] == null) {
          phases[phase_id] = {
            handle: handle,
            guide: guide,
            type: phase_type,
            group: phase_group,
            update: false
          };
        }
        Set.chat.add({_id, potof_id, phase_id, write_at, to, show, deco, log, head, handle});
        return o;
      });
      Set.phase.merge(phases);
      Set.part.merge(data.events.map(function(o) {
        var ref2;
        return {
          _id: o._id,
          label: (ref2 = o.name) != null ? ref2 : `${o.turn}日目`
        };
      }));
      o = data.stories[0];
      sign = o.sow_auth_id.replace(/\./g, '&#2e');
      ref2 = chats = Query.chats.where({
        book_id: o._id
      }).list, (ref3 = ref2[0], chat_head = ref3[0]), (ref4 = ref2[ref2.length - 1], chat_foot = ref4[ref4.length - 1]);
      Set.book.add({
        _id: o._id,
        label: o.name,
        winner_id: (ref5 = data.events.slice(-1)[0].winner) != null ? ref5.slice(4) : void 0,
        potof_size: Query.potofs.where({book_id}).list.length,
        sign: sign,
        write_at: chat_head.write_at - 4
      });
      [welcome = "", v_rules] = o.comment.split(/■村のルール<br>/);
      Set.chat.add({
        _id: o._id + "-0-mS-welcome",
        phase_id: o._id + "-0-mS",
        write_at: chat_head.write_at - 3,
        handle: "MAKER",
        show: "report",
        deco: "head",
        sign: sign,
        head: `${o.vid}: ${o.name}`,
        log: welcome
      });
      if (v_rules) {
        Set.chat.add({
          _id: o._id + "-0-mS-vrule",
          phase_id: o._id + "-0-mS",
          write_at: chat_head.write_at - 2,
          handle: "MAKER",
          show: "report",
          deco: "giji",
          sign: sign,
          log: `### 村のルール\n${v_rules.split("<br>").join("\n")}`
        });
      }
      n_rules = (function() {
        var j, len1, ref6, results;
        ref6 = nation.list;
        results = [];
        for (idx = j = 0, len1 = ref6.length; j < len1; idx = ++j) {
          ({head} = ref6[idx]);
          results.push(`${idx + 1}. ${head}`);
        }
        return results;
      })();
      return Set.chat.add({
        _id: o._id + "-0-mS-nrule",
        phase_id: o._id + "-0-mS",
        write_at: chat_head.write_at - 1,
        handle: "MAKER",
        show: "report",
        deco: "giji",
        sign: sign,
        log: `### 国のルール\n${n_rules.join("\n")}`
      });
    }
  },
  actions: {
    story: async function({state, commit, rootState}, story_id) {
      var data, status;
      ({status, data} = (await axios.get(`${env.url.store}/sow/${story_id}.json`)));
      return commit("join", data);
    }
  }
};


/***/ }),

/***/ "Kh4W":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("dSzd");


/***/ }),

/***/ "L42u":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("+ZMJ");
var invoke = __webpack_require__("knuC");
var html = __webpack_require__("RPLV");
var cel = __webpack_require__("ON07");
var global = __webpack_require__("7KvD");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("R9M2")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "LKZe":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("NpIQ");
var createDesc = __webpack_require__("X8DO");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var has = __webpack_require__("D2L2");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("+E39") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "M6a0":
/***/ (function(module, exports) {



/***/ }),

/***/ "MU5D":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("R9M2");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "MU8w":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__("hKoQ").polyfill();


/***/ }),

/***/ "Mhyx":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("/bQp");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "MmMw":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("EqjI");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "NN5m":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, format;

({Model, Query, Rule} = __webpack_require__("L78F"));

format = {
  head: new Intl.DateTimeFormat('ja-JP', {
    weekday: "short",
    hour: "2-digit"
  }),
  tail: new Intl.DateTimeFormat('ja-JP', {
    hour: "2-digit"
  })
};

new Rule("section").schema(function() {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function(all) {
    return {};
  });
  Object.assign(this.model_property, {
    label: {
      get: function() {
        var begin, write;
        begin = format.head.format(this.begin_at);
        write = format.head.format(this.write_at);
        if (begin === write) {
          return begin;
        } else {
          write = format.tail.format(this.write_at);
          return begin.replace("時", "-" + write);
        }
      }
    }
  });
  return this.model = class model extends this.model {
    static deploy() {
      return this.label != null ? this.label : this.label = this.idx;
    }

  };
});


/***/ }),

/***/ "NWt+":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("+ZMJ");
var call = __webpack_require__("msXi");
var isArrayIter = __webpack_require__("Mhyx");
var anObject = __webpack_require__("77Pl");
var toLength = __webpack_require__("QRG4");
var getIterFn = __webpack_require__("3fs2");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "NpIQ":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "O4Dt":
/***/ (function(module, exports) {

module.exports = function(c) {
  return console.log(c);
};


/***/ }),

/***/ "O4g8":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "OBeJ":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"all","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事 ちゃんぷる"},"chr_npc":[{"label":"人狼議事 ちゃんぷる","csid":"all","face_id":"all","say_0":"ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","say_1":"皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"}],"chr_job":[{"face_id":"all","job":"かみさま"}]}

/***/ }),

/***/ "ON07":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
var document = __webpack_require__("7KvD").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "OYls":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('asyncIterator');


/***/ }),

/***/ "OmXk":
/***/ (function(module, exports) {

module.exports = {"select-role":{"label":"役職希望","help":"役職希望を受け付ける"},"random-target":{"label":"ランダム","help":"投票・能力の対象に「ランダム」を含める"},"seq-event":{"label":"整列事件","help":"事件が順序どおりに発生する"},"show-id":{"label":"ID公開","help":"ユーザーIDを公開する"},"entrust":{"label":"委任投票","help":"委任投票をする"},"undead-talk":{"label":"死後の会話","help":"狼・妖精と死者との間で、会話ができる"},"aiming-talk":{"label":"内緒話","help":"ふたりだけの内緒話をすることができる"}}

/***/ }),

/***/ "OpA2":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"changed","admin":"闇の呟き","maker":"広場のお告げ","label":"はおうの広場"},"chr_npc":[{"label":"とのさま広場","csid":"changed","face_id":"m08","say_0":"じんろう？\nそんななまえのこ、いたかしら……","say_1":"さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"},{"_id":"m05","label":"はおうの広場","csid":"changed_m05","face_id":"m05","say_0":"ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","say_1":"誰にも、腰抜けなんて…言わせないぞっ"}],"chr_job":[{"face_id":"b44","job":"こあくとう"},{"face_id":"b49","job":"いしく"},{"face_id":"m01","job":"ようせい"},{"face_id":"m02","job":"ようせい"},{"face_id":"m03","job":"しょうぐん"},{"face_id":"m04","job":"すくみず"},{"face_id":"m05","job":"はおう"},{"face_id":"m06","job":"きゅうていがか"},{"face_id":"m07","job":"こひつじ"},{"face_id":"m08","job":"おふくろのあじ"},{"face_id":"m09","job":"しーさー"},{"face_id":"m10","job":"ころぽっくる"},{"face_id":"m11","job":"神聖騎士"},{"face_id":"m12","job":"暗黒騎士"},{"face_id":"m13","job":"調律師"},{"face_id":"m14","job":"奇跡の子"},{"face_id":"m15","job":"びじん"},{"face_id":"m16","job":"りゅうきへい"},{"face_id":"m18","job":"記号の妖精"},{"face_id":"m19","job":"おひめさま"},{"face_id":"m20","job":"げぼく"},{"face_id":"m99","job":"かみさま"},{"face_id":"r30","job":"ひとづかい"}]}

/***/ }),

/***/ "PzxK":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("D2L2");
var toObject = __webpack_require__("sB3e");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "QRG4":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("UuGF");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "QWe/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('observable');


/***/ }),

/***/ "QtWo":
/***/ (function(module, exports) {

module.exports = {"blank":{"label":"普通の日","help":""},"nothing":{"label":"普通の日","cmd":"trap","help":"今日は、特別なことのない一日のようだ。さあ普段通り、誰かを処刑台にかけよう。"},"aprilfool":{"label":"四月馬鹿","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_APRIL_FOOL\" TARGET=\"_blank\">四月馬鹿</A></b>\n<br>\n大変、大変、大変なことになった。きみの役職は変化しているかもしれない。もしも誰かと絆を結んでいるなら、急に相手が憎くなってしまい、絆の相手だけにしか投票できない。\nそして悟ってしまった。今夜だけは、相方の後を追うことはないと……。\n<br>\n<table class=\"table\">\n<tr>\n<th colspan=3>役職の変貌\n<th rowspan=4>※一日で元に戻る\n<tr>\n<td>賢者\n<td>←→\n<td>魔女\n<tr>\n<td>守護者\n<td>←→\n<td>長老\n<tr>\n<td>賞金稼\n<td>←→\n<td>少女\n</table>"},"turnfink":{"label":"二重スパイ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FINK\" TARGET=\"_blank\">二重スパイ</A></b>\n<br>\nなんということだろう！一人が村側を裏切り、狼に与する半端者になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"turnfairy":{"label":"妖精の輪","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FAIRY\" TARGET=\"_blank\">妖精の輪</A></b>\n<br>\nなんということだろう！一人が森に立ち入り、妖精の養子になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"eclipse":{"label":"日蝕","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_ECLIPSE\" TARGET=\"_blank\">日蝕</A></b>\n<br>\n暗い日蝕が村中を覆い、お互い顔も名前も解らない。この闇夜は丸一日続くだろう。他人になりすまし、議論を混乱させることもできてしまうかもしれない。"},"cointoss":{"label":"Sir Cointoss","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_COINTOSS\" TARGET=\"_blank\">Sir Cointoss</A></b>\n<br>\nお控えなさい。お控えなさい。コイントス卿はこの村の投票結果に意見があるようでございます。\n卿の御意向によっては、投票結果に基づいた処刑を取り止めにすることもあります。\n五分五分くらいかな。"},"force":{"label":"影響力","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FORCE\" TARGET=\"_blank\">影響力</A></b>\n<br>\n今日の投票箱は無色透明だ。だれかが投票した瞬間にその内容はハッキリと見えるから、投票をセットするときは気を付けて！"},"miracle":{"label":"奇跡","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_MIRACLE\" TARGET=\"_blank\">奇跡</A></b>\n<br>\n帰ってきた！黄泉の国から、今日の襲撃で死んだ犠牲者がかえってきた！能力を失ったかもしれないけれど、それは些細なことだよ！ね！\n<br>\n人狼、一匹狼、賞金稼ぎなどに襲われた死者は生き返る。ただし、その能力は失われる。"},"prophecy":{"label":"聖者のお告げ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_PROPHECY\" TARGET=\"_blank\">聖者のお告げ</A></b>\n<br>\n聖者は民の夢枕に告げられました。今の任より、<b>決定者</b>にふさわしい人物がいると。\n旧き任務は解かれ、あたらしい<b>決定者</b>は皆に喝采で迎え入れられるだろう。"},"clamor":{"label":"不満","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_CLAMOR\" TARGET=\"_blank\">不満</A></b>\n<br>\n村には不満が鬱屈している。今夜の投票でまた人間を処刑してしまったら……悪夢が始まる。\nはじけた不満に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"fire":{"label":"熱意","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FIRE\" TARGET=\"_blank\">熱意</A></b>\n<br>\n村には期待に満ちた熱意が渦巻いている。今夜の投票がひとならぬものを処刑できたなら……悪夢が始まるのだ。\nはじけた熱意に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"nightmare":{"label":"悪夢","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_NIGHTMARE\" TARGET=\"_blank\">悪夢</A></b>\n<br>\n恐ろしい一日が始まる。今日は投票だけができる。発言も、能力も使えない。そして、突然死は発生しない。\n<br>\nさあ投票して、こんな日が早く過ぎ去ってしまうよう、ひとり祈りを捧げよう。"},"ghost":{"label":"亡霊","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_GHOST\" TARGET=\"_blank\">亡霊</A></b>\n<br>\n今夜、人狼に殺された人は人狼になる。また、襲撃を実行した人狼は命を落としてしまうだろう。人狼となった者は報復行動を行わない。ただし、命拾いをしたならば人狼にはならない。\n<br>\n一匹狼は亡霊を作らない。"},"escape":{"label":"逃亡","cmd":null,"help":"<b>逃亡</b>\n<br>\nせめて一人だけでも、なんとかして逃がそう。今夜の投票で逃亡者を一人決め、夜中の処刑のかわりに密かに逃がすのだ。\n<br>\nしかし逃亡者は一日のあいだ逃亡生活を続け、ついに村へと帰還してしまう。帰還者の票は通常の三倍尊重されるだろう。\n実装がめんどうだから、このまま未定義にしておこうかな。"},"seance":{"label":"降霊会","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_SEANSE\" TARGET=\"_blank\">降霊会</A></b>\n<br>\nこっくりさん、こっくりさん……<br>秘密の儀式で、墓場の霊魂がかえってきた。今日に限り、生者も姿の見えぬ死者も屋根を共にし、議論するだろう。"}}

/***/ }),

/***/ "R4wc":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("kM2E");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("To3L") });


/***/ }),

/***/ "R9M2":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "RPLV":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7KvD").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "RY/4":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("R9M2");
var TAG = __webpack_require__("dSzd")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "Rrel":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("TcQ7");
var gOPN = __webpack_require__("n0T6").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "S82l":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "SBjU":
/***/ (function(module, exports) {

module.exports = [{"_id":"c49","comment":"test","name":"ボリス","order":1,"tag_ids":["giji","guild","young"]},{"_id":"c38","order":2,"name":"コリーン","tag_ids":["giji","market","young"]},{"_id":"c77","order":3,"name":"キャロライナ","tag_ids":["giji","servant","road","farm","young"]},{"_id":"c35","order":4,"name":"ダン","tag_ids":["giji","guild","middle"]},{"_id":"c53","order":5,"name":"ゼルダ","tag_ids":["giji","government","farm","elegant","elder"]},{"_id":"c74","order":6,"name":"フランシスカ","tag_ids":["giji","market","young"]},{"_id":"c50","order":8,"name":"ディーン","tag_ids":["giji","government","guild","young"]},{"_id":"c36","order":8,"name":"ミッシェル","tag_ids":["giji","guild","servant","young"]},{"_id":"c26","order":8,"name":"モニカ","tag_ids":["giji","guild","young"]},{"_id":"c09","order":9,"name":"ヒロシ","tag_ids":["giji","immoral","travel","river","middle"]},{"_id":"c55","order":10,"name":"パピヨン","tag_ids":["giji","apartment","elegant","middle"]},{"_id":"c29","order":11,"name":"イアン","tag_ids":["giji","guild","young"]},{"_id":"c12","order":12,"name":"バーナバス","tag_ids":["giji","servant","road","middle"]},{"_id":"c16","order":127,"name":"マリアンヌ","tag_ids":["giji","apartment","market","medical","young"]},{"_id":"c34","order":14,"name":"トニー","tag_ids":["giji","road","servant","kid"]},{"_id":"c44","order":15,"name":"ドナルド","tag_ids":["giji","immoral","young"]},{"_id":"c11","order":16,"name":"カルヴィン","tag_ids":["giji","elegant","apartment","kid"]},{"_id":"c10","order":17,"name":"ゾーイ","tag_ids":["travel","giji","apartment","kid"]},{"_id":"c70","order":18,"name":"パティ","tag_ids":["giji","servant","apartment","young"]},{"_id":"c56","order":19,"name":"ゴドウィン","tag_ids":["giji","guild","market","middle"]},{"_id":"c07","order":20,"name":"ティモシー","tag_ids":["giji","guild","elder"]},{"_id":"c41","order":21,"name":"ヤニク","tag_ids":["giji","immoral","river","young"]},{"_id":"c58","order":22,"name":"ブルーノ","tag_ids":["giji","ecclesia","middle","elder"]},{"_id":"c17","order":23,"name":"ユリシーズ","tag_ids":["giji","market","middle"]},{"_id":"c39","order":24,"name":"シビル","tag_ids":["giji","servant","guild","middle"]},{"_id":"c40","order":25,"name":"ハワード","tag_ids":["giji","servant","elder"]},{"_id":"c65","order":26,"name":"ズリエル","tag_ids":["giji","immoral","middle"]},{"_id":"c59","order":27,"name":"ムパムピス","tag_ids":["giji","ecclesia","young"]},{"_id":"c57","order":28,"name":"ツェツィーリヤ","tag_ids":["giji","ecclesia","young","middle"]},{"_id":"c04","order":29,"name":"ノーリーン","tag_ids":["giji","servant","middle"]},{"_id":"c46","order":30,"name":"ゲイル","tag_ids":["giji","apartment","medical","young","middle"]},{"_id":"c14","order":31,"name":"レティーシャ","tag_ids":["giji","ecclesia","kid"]},{"_id":"c42","order":33,"name":"ラルフ","tag_ids":["giji","servant","young"]},{"_id":"c37","order":34,"name":"セシル","tag_ids":["giji","market","young"]},{"_id":"c75","order":35,"name":"ビリー","tag_ids":["giji","market","middle"]},{"_id":"c32","order":36,"name":"オスカー","tag_ids":["giji","apartment","kid"]},{"_id":"c33","order":37,"name":"ホリー","tag_ids":["giji","apartment","kid"]},{"_id":"c02","order":38,"name":"アルフレッド","tag_ids":["giji","government","middle"]},{"_id":"c66","order":39,"name":"クリストファー","tag_ids":["giji","servant","guild","farm","middle"]},{"_id":"c24","order":41,"name":"ナタリア","tag_ids":["giji","government","apartment","elder"]},{"_id":"c79","order":42,"name":"マーゴ","tag_ids":["giji","government","apartment","young"]},{"_id":"c61","order":43,"name":"ヌマタロウ","tag_ids":["giji","river","farm","elder"]},{"_id":"c23","order":44,"name":"チャールズ","tag_ids":["giji","ecclesia","middle"]},{"_id":"c28","comment":"","name":"ケイト","order":47,"tag_ids":["giji","apartment","young"]},{"_id":"c68","order":48,"name":"ヨアヒム","tag_ids":["giji","market","immoral","elegant","middle","elder"]},{"_id":"c30","order":49,"name":"フィリップ","tag_ids":["giji","road","river","market","young"]},{"_id":"c21","order":50,"name":"ニール","tag_ids":["giji","farm","guild","young","middle"]},{"_id":"c52","order":52,"name":"ギリアン","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c51","order":53,"name":"ヨーランダ","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c01","comment":"","name":"メアリー","order":55,"tag_ids":["giji","market","road","young"]},{"_id":"c69","order":56,"name":"ギネス","tag_ids":["giji","guild","market","middle"]},{"_id":"c63","order":57,"name":"ピッパ","tag_ids":["giji","guild","young"]},{"_id":"c05","order":59,"name":"キャサリン","tag_ids":["giji","medical","young"]},{"_id":"c22","order":60,"name":"ワット","tag_ids":["giji","farm","middle"]},{"_id":"c62","order":61,"name":"ヴェラ","tag_ids":["giji","immoral","river","middle"]},{"_id":"c13","order":62,"name":"ロミオ","tag_ids":["giji","medical","elder"]},{"_id":"c18","order":63,"name":"エマ","tag_ids":["giji","medical","elder"]},{"_id":"c27","order":65,"name":"リンダ","tag_ids":["giji","farm","young"]},{"_id":"c08","order":66,"name":"ベネット","tag_ids":["giji","guild","young"]},{"_id":"c19","order":67,"name":"タバサ","tag_ids":["giji","immoral","market","young"]},{"_id":"c71","order":70,"name":"ノックス","tag_ids":["giji","road","farm","young"]},{"_id":"c03","order":71,"name":"スティーブン","tag_ids":["giji","medical","middle"]},{"_id":"c43","order":72,"name":"ガストン","tag_ids":["giji","farm","middle"]},{"_id":"c15","order":73,"name":"ウェーズリー","tag_ids":["giji","government","road","middle"]},{"_id":"c54","order":75,"name":"ザック","tag_ids":["giji","guild","medical","young"]},{"_id":"c25","order":77,"name":"ルーカス","tag_ids":["giji","elegant","young"]},{"_id":"c20","order":79,"name":"グロリア","tag_ids":["giji","elegant","young"]},{"_id":"c72","order":81,"name":"ヴェスパタイン","tag_ids":["giji","guild","young"]},{"_id":"c73","order":83,"name":"ローズマリー","tag_ids":["giji","immoral","market","young"]},{"_id":"c47","order":85,"name":"ペラジー","tag_ids":["giji","ecclesia","river","young"]},{"_id":"c80","order":87,"name":"テッド","tag_ids":["giji","road","apartment","young"]},{"_id":"c96","name":"レオナルド","comment":"2011/12/11","order":89,"tag_ids":["giji","government","ecclesia","middle"]},{"_id":"c95","name":"モリス","comment":"2011/12/11","order":91,"tag_ids":["giji","guild","road","young"]},{"_id":"c97","name":"ジェフ","comment":"2011/12/14 超常現象はあるんだ…","order":93,"tag_ids":["giji","government","river","young","middle"]},{"_id":"c98","name":"オズワルド","comment":"2011/12/29 この髭はぜったいワックス使ってる。","order":95,"tag_ids":["giji","immoral","river","middle"]},{"_id":"c100","name":"グレッグ","comment":"2012/12/30 スポーツ系中学生くらいに見える","order":97,"tag_ids":["giji","guild","young"]},{"_id":"c101","name":"クラリッサ","comment":"2011/12/30 美人さん♪","order":99,"tag_ids":["giji","servant","apartment","young"]},{"_id":"c90","name":"ケヴィン","comment":"2011/12/06","order":125,"tag_ids":["giji","government","river","farm","young"]},{"_id":"c88","name":"ピエール","order":126,"comment":"2011/12/05","tag_ids":["giji","servant","market","middle"]},{"_id":"c89","name":"カトリーナ","comment":"2011/12/06","order":128,"tag_ids":["giji","apartment","young"]},{"_id":"c84","name":"ブレンダ","order":129,"comment":"2011/12/05","tag_ids":["giji","apartment","middle"]},{"_id":"c85","name":"ハナ","order":130,"comment":"2011/12/05","tag_ids":["giji","road","servant","kid"]},{"_id":"c91","comment":"2011/12/06 姦しい奥様♪","name":"ドロシー","order":143,"tag_ids":["giji","river","servant","middle"]},{"_id":"c92","comment":"2011/12/06 姦し娘ーず♪","name":"セレスト","order":144,"tag_ids":["giji","river","servant","young"]},{"_id":"c93","comment":"2011/12/06 えー○○が許されるのは小学生までだよねー♪","name":"ベッキー","order":145,"tag_ids":["giji","river","servant","young"]},{"_id":"c78","order":150,"name":"ネイサン","tag_ids":["giji","market","middle"]},{"_id":"c82","order":148,"name":"ロビン","tag_ids":["giji","servant","kid"]},{"_id":"c94","name":"ダーラ","comment":"2011/12/11","order":165,"tag_ids":["giji","elegant","immoral","market","middle"]},{"_id":"c64","order":180,"name":"ヘクター","tag_ids":["giji","immoral","middle"]},{"_id":"c81","order":190,"name":"サイラス","tag_ids":["giji","medical","guild","farm","young"]},{"_id":"c67","order":200,"name":"ソフィア","tag_ids":["giji","guild","young"]},{"_id":"c76","order":210,"name":"ジョージ","tag_ids":["giji","apartment","kid"]},{"_id":"c60","order":213,"name":"ポーチュラカ","tag_ids":["giji","elegant","kid"]},{"_id":"c87","name":"エリアス","order":217,"comment":"2011/12/05","tag_ids":["giji","elegant","medical","young"]},{"_id":"c45","order":220,"name":"プリシラ","tag_ids":["giji","immoral","young"]},{"_id":"c48","order":225,"name":"ビアンカ","tag_ids":["giji","elegant","middle","elder"]},{"_id":"c86","name":"ホレーショー","order":230,"comment":"2011/12/05","tag_ids":["giji","immoral","apartment","middle"]},{"_id":"c83","order":240,"name":"アイリス","tag_ids":["marchen","giji","road","medical","market","young"]},{"_id":"c31","order":250,"name":"ネル","tag_ids":["giji","guild","apartment","young"]},{"_id":"c99","order":999,"name":"サイモン","tag_ids":["giji","apartment","young","middle"]},{"order":10001,"name":"露蝶","comment":"中国女性名","_id":"g01","tag_ids":["asia"]},{"order":215,"name":"志偉","comment":"台湾男性名 越南の名前も探したかったが、見つからぬ…","_id":"g02","tag_ids":["asia"]},{"order":10003,"name":"芙蓉","comment":"里帰り","_id":"g03","tag_ids":["asia"]},{"order":10004,"name":"沼太郎","comment":"里帰り","_id":"gc61","tag_ids":["asia"]},{"name":"デメテル","comment":"阿片窟からきました","order":20001,"_id":"mad01","tag_ids":["marchen"]},{"name":"エルゴット","comment":"阿片窟からきました","order":245,"_id":"mad02","tag_ids":["marchen"]},{"name":"シーシャ","comment":"阿片窟からきました","order":223,"_id":"mad03","tag_ids":["marchen"]},{"name":"ドリベル","comment":"阿片窟からきました","order":20004,"_id":"mad04","tag_ids":["marchen"]},{"name":"ヤヘイ","comment":"阿片窟からきました","order":1010,"_id":"mad05","tag_ids":["marchen"]},{"name":"アヤワスカ","comment":"阿片窟からきました","order":236,"_id":"mad06","tag_ids":["marchen"]},{"name":"チアキ","comment":"時をかける少女","order":30001,"_id":"t01","tag_ids":["travel"]},{"name":"リッキィ","comment":"夏への扉","order":30002,"_id":"t02","tag_ids":["travel"]},{"name":"ミナカタ","comment":"ー仁ー","order":156,"_id":"t03","tag_ids":["travel"]},{"name":"カイル","comment":"サラ・コナー・クロニクルズ","order":30004,"_id":"t04","tag_ids":["travel"]},{"name":"ジェニファー","comment":"バック・トゥ・ザ・フューチャー","order":30005,"_id":"t05","tag_ids":["travel"]},{"_id":"m99","order":70001,"name":"パルック","tag_ids":["myth"]},{"_id":"m06","order":70002,"name":"リリンラ","tag_ids":["myth"]},{"_id":"m03","order":70003,"name":"トノサマ","tag_ids":["myth"]},{"_id":"m05","order":70004,"name":"ナナコロ","tag_ids":["myth"]},{"_id":"m15","order":70005,"name":"ミソチャ","tag_ids":["myth"]},{"_id":"m07","order":70006,"name":"アリス","tag_ids":["myth"]},{"_id":"r30","order":70006,"name":"トリ","tag_ids":["myth"]},{"_id":"m01","order":70007,"name":"ケムシ","tag_ids":["myth"]},{"_id":"m02","order":70008,"name":"ポプラ","tag_ids":["myth"]},{"_id":"m04","order":70009,"name":"アオイ","tag_ids":["myth"]},{"_id":"b44","comment":"","name":"ドナルド","order":70010,"tag_ids":["myth"]},{"_id":"m08","order":70011,"name":"おっぱい","tag_ids":["myth"]},{"_id":"m09","order":70012,"name":"カミジャー","tag_ids":["myth"]},{"_id":"r12","order":70012,"name":"バーナバス","tag_ids":["myth"]},{"_id":"b49","comment":"","name":"ボリス","order":70012,"tag_ids":["myth"]},{"_id":"m10","order":70013,"name":"アチャポ","tag_ids":["myth"]},{"_id":"m12","comment":"","name":"トルニトス","order":70014,"tag_ids":["myth"]},{"_id":"m11","order":70015,"name":"ライトニング","tag_ids":["myth"]},{"_id":"m13","order":70016,"name":"ミケ","tag_ids":["myth"]},{"_id":"m14","order":70017,"name":"カリュクス","tag_ids":["myth"]},{"_id":"sf01","order":80000,"name":"ラッシード","comment":"りしあさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf02","order":80001,"name":"エスペラント","comment":"ふらぅさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf03","order":80002,"name":"ピート","comment":"たるっとさん＆りちゃさん","tag_ids":["stratos"]},{"_id":"sf04","order":80003,"name":"アシモフ","comment":"あすたん＆りりんら","tag_ids":["stratos"]},{"_id":"sf05","order":80004,"name":"モナリザ","comment":"ななころび＆りりんら","tag_ids":["stratos"]},{"_id":"sf06","order":80005,"name":"ワレンチナ","comment":"まりもさん＆あずまさん","tag_ids":["stratos"]},{"_id":"sf07","order":80007,"name":"ヤンファ","comment":"りしあさん＆はむおくん","tag_ids":["stratos"]},{"_id":"sf08","order":80008,"name":"ＰＪ","comment":"りしあさん＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf09","order":80009,"name":"キリシマ","comment":"ななころび＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf10","order":80010,"name":"ナユタ","comment":"かれやなぎさん＆かいさん","tag_ids":["stratos"]},{"_id":"sf11","order":80011,"name":"イワノフ","comment":"かれやなぎさん＆りちゃさん","tag_ids":["stratos"]},{"order":80012,"name":"†ルシフェル†","comment":null,"_id":"sf12","tag_ids":["stratos"]},{"order":80013,"name":"トルドヴィン","comment":null,"_id":"sf13","tag_ids":["stratos"]},{"order":80014,"name":"玖休","comment":null,"_id":"sf18","tag_ids":["stratos"]},{"order":80015,"name":"参休","comment":null,"_id":"sf19","tag_ids":["stratos"]},{"order":80016,"name":"クリスマス","comment":null,"_id":"sf14","tag_ids":["stratos"]},{"order":80017,"name":"ジェームス","comment":null,"_id":"sf15","tag_ids":["stratos"]},{"order":80018,"name":"ライジ","comment":null,"_id":"sf16","tag_ids":["stratos"]},{"order":80019,"name":"ジャック","comment":null,"_id":"sf17","tag_ids":["stratos"]},{"_id":"w05","order":90001,"name":"定吉","comment":"ぷえるとりこの旅人　エージ―エー","tag_ids":["shoji"]},{"_id":"w21","order":90002,"name":"鉄平","comment":"日本の伝統　熊木彫","tag_ids":["shoji"]},{"_id":"w22","order":90003,"name":"竹三","comment":"雪国の風雅　熊木彫","tag_ids":["shoji"]},{"_id":"w36","order":90004,"name":"ウト","tag_ids":["shoji"]},{"_id":"w16","order":90005,"name":"勢","comment":"ぶたさん印の　あおいジンギスカン","tag_ids":["shoji"]},{"_id":"w18","order":90006,"name":"菊","tag_ids":["shoji"]},{"_id":"w26","order":90007,"name":"勝丸","tag_ids":["shoji"]},{"_id":"w35","comment":"","name":"奈須麿","order":90008,"tag_ids":["shoji"]},{"_id":"w24","order":90009,"name":"辰次","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w37","order":90010,"name":"芙蓉","tag_ids":["shoji"]},{"_id":"w29","order":90011,"name":"志乃","tag_ids":["shoji"]},{"_id":"w20","order":90012,"name":"藤之助","tag_ids":["shoji"]},{"_id":"w31","order":90013,"name":"日向","tag_ids":["shoji"]},{"_id":"w12","order":90014,"name":"おみつ","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w10","order":90015,"name":"博史","tag_ids":["shoji"]},{"_id":"w25","order":90016,"name":"法泉","tag_ids":["shoji"]},{"_id":"w09","order":90017,"name":"チャールズ","comment":"チャールズ派遣ならおまかせ　O-ririn","tag_ids":["shoji"]},{"_id":"w30","order":90018,"name":"雪代","tag_ids":["shoji"]},{"_id":"w14","order":90019,"name":"華月斎","comment":"めげないゼラチン作り　MEGEゼラチン","tag_ids":["shoji"]},{"_id":"w13","order":90020,"name":"たまこ","comment":"世界の道をつなぐ　議事国地図","tag_ids":["shoji"]},{"_id":"w11","order":90021,"name":"沼太郎","tag_ids":["shoji"]},{"_id":"w03","order":90022,"name":"朔","comment":"新しい議事をつくる　たき学会","tag_ids":["shoji"]},{"_id":"w34","order":90023,"name":"余四朗","tag_ids":["shoji"]},{"_id":"w27","order":90024,"name":"源蔵","tag_ids":["shoji"]},{"_id":"w28","order":90025,"name":"甚六","tag_ids":["shoji"]},{"_id":"w17","order":90026,"name":"雷門","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w39","comment":"","name":"沙耶","order":90027,"tag_ids":["shoji"]},{"_id":"w08","order":90028,"name":"朝顔","tag_ids":["shoji"]},{"_id":"w43","order":90029,"name":"春松","tag_ids":["shoji"]},{"_id":"w07","order":90030,"name":"夕顔","tag_ids":["shoji"]},{"_id":"w40","order":90031,"name":"朧","tag_ids":["shoji"]},{"_id":"w33","comment":"","name":"団十郎","order":90032,"tag_ids":["shoji"]},{"_id":"w23","order":90033,"name":"仁右衛門","tag_ids":["shoji"]},{"_id":"w04","order":90034,"name":"小鈴","comment":"お口の愛人　タルッティ・タルット","tag_ids":["shoji"]},{"_id":"w06","order":90035,"name":"ゆり","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w38","comment":"","name":"一平太","order":90037,"tag_ids":["shoji"]},{"_id":"w01","order":90038,"name":"鏡花","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w15","order":90039,"name":"八重","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w32","order":90040,"name":"明之進","tag_ids":["shoji"]},{"_id":"w02","order":90041,"name":"慶三郎","comment":"カメラのことなら　MISEKI","tag_ids":["shoji"]},{"_id":"w44","name":"雪客","comment":"りりんラハウス呑んだくれ大会","order":90042,"tag_ids":["shoji"]},{"_id":"w45","name":"亀吉","comment":"りりんラハウス呑んだくれ大会","order":90043,"tag_ids":["shoji"]},{"_id":"w46","name":"梅子","order":90044,"comment":"お誕生日記念☆","tag_ids":["shoji"]},{"face_id":"w47","name":"置壱","comment":"日本の美徳強化月間","order":90045,"_id":"w47","tag_ids":["shoji"]},{"face_id":"all","name":"パルック","order":99999,"_id":"all","tag_ids":["god"]},{"_id":"g04","name":"攻芸","comment":"台湾男性名","order":10005,"tag_ids":["asia"]},{"_id":"g05","name":"麻雀","comment":"中国女性名","order":170,"tag_ids":["asia"]},{"_id":"g06","name":"黍炉","comment":"ダリダイ・オッチギン","order":10007,"tag_ids":["asia"]},{"_id":"mad07","name":"ダイミ","comment":"阿片窟からきました","order":20007,"tag_ids":["marchen"]},{"_id":"mad08","name":"エフェドラ","comment":"阿片窟からきました","order":20008,"tag_ids":["marchen"]},{"_id":"t06","name":"サミュエル","comment":"トランスフォーマー","order":30006,"tag_ids":["travel"]},{"_id":"t07","name":"アカリ","comment":"時をかける少女","order":30019,"tag_ids":["travel"]},{"_id":"t08","name":"ミルフィ","comment":"海賊戦隊ゴーカイジャー","order":30020,"tag_ids":["travel"]},{"_id":"t09","name":"ゴロウ","comment":"時をかける少女","order":30009,"tag_ids":["travel"]},{"_id":"t10","name":"トレイル","comment":"ゼルダの伝説 ムジュラの仮面","order":30010,"tag_ids":["travel"]},{"_id":"t11","name":"マドカ","comment":"宇宙戦艦ヤマモト・ヨーコ","order":30019,"tag_ids":["travel"]},{"_id":"t12","name":"フランク","comment":"オーロラの彼方へ","order":30012,"tag_ids":["travel"]},{"_id":"t13","name":"ジャニス","comment":"フラッシュフォワード","order":30013,"tag_ids":["travel"]},{"_id":"c105","comment":"年末カウントダウン♪","name":"シメオン","order":82,"tag_ids":["giji","apartment","ecclesia","young"]},{"_id":"c104","comment":"年末カウントダウン♪","name":"ヒュー","order":89,"tag_ids":["giji","medical","young"]},{"_id":"c106","comment":"年末カウントダウン♪","name":"ワンダ","order":90,"tag_ids":["giji","river","guild","middle"]},{"_id":"c108","name":"ブローリン","comment":"年末カウントダウン♪","order":91,"tag_ids":["giji","farm","young","middle"]},{"_id":"c109","name":"ラディスラヴァ","comment":"年末カウントダウン♪","order":185,"tag_ids":["giji","apartment","young"]},{"_id":"c102","comment":"年末カウントダウン♪","name":"ウォーレン","order":155,"tag_ids":["giji","market","elder"]},{"_id":"c107","name":"イヴォン","comment":"年末カウントダウン♪","order":205,"tag_ids":["giji","elegant","middle","elder"]},{"_id":"c103","comment":"年末カウントダウン♪","name":"ナンシー","order":234,"tag_ids":["giji","apartment","young"]},{"_id":"t14","name":"クシャミ","comment":"吾輩は猫である。","order":30014,"tag_ids":["travel"]},{"_id":"t15","name":"ガーディ","comment":"ベイカー街少年探偵団","order":30015,"tag_ids":["travel"]},{"_id":"sf20","name":"ティソ","comment":null,"order":80020,"tag_ids":["stratos"]},{"_id":"g07","name":"ジリヤ","comment":"ロシア女性名","order":10008,"tag_ids":["asia"]},{"_id":"t16","name":"アラン","comment":"映画監督たちの共用偽名","order":30016,"tag_ids":["travel"]},{"_id":"w48","name":"直円","comment":"和算復活月間","order":90048,"tag_ids":["shoji"]},{"_id":"w49","name":"錠","comment":"ポルトガル人にジオゴっているんだぜ。へー。かっこいー。","order":90049,"tag_ids":["shoji"]},{"_id":"w50","name":"丁助","comment":"負けるたびに追い博打","order":90050,"tag_ids":["shoji"]},{"_id":"t17","name":"ススム","comment":"おもいっきり探偵団 覇悪怒組","order":30018,"tag_ids":["travel"]},{"_id":"t18","name":"マユミ","comment":"まんがはじめて物語（二代目）","order":30018,"tag_ids":["travel"]},{"_id":"c110","name":"リー","comment":"","order":92,"tag_ids":["giji","immoral","apartment","young"]},{"_id":"t19","name":"ハルカ","comment":"はるかリフレイン","order":30017,"tag_ids":["travel"]},{"_id":"w51","name":"鬼丞","comment":"リニューアル記念！","order":90051,"tag_ids":["shoji"]},{"_id":"w52","name":"櫻子","comment":"リニューアル記念！","order":90052,"tag_ids":["shoji"]},{"_id":"c111","name":"スージー","comment":"リニューアル記念！ 弟がいるという噂が…","order":160,"tag_ids":["giji","apartment","elegant","immoral","young"]},{"_id":"c113","name":"ジェレミー","comment":"リニューアル記念！","order":228,"tag_ids":["giji","apartment","immoral","young","middle"]},{"_id":"c112","name":"ニコラス","comment":"！？","order":128,"tag_ids":["giji","elegant","young"]},{"_id":"m16","name":"アーサー","comment":"円卓の騎士","order":70018,"tag_ids":["myth"]},{"_id":"t20","name":"エリ","comment":"英国情報局秘密組織チェラブ (CHERUB)","order":30022,"tag_ids":["travel"]},{"_id":"g08","name":"イワン","comment":"Иван-дурак","order":10009,"tag_ids":["asia"]},{"_id":"c114","name":"モンド","comment":"８８件のご応募、ありがとう。そして、ありがとう。","order":131,"tag_ids":["giji","government","immoral","middle"]},{"_id":"m18","name":"ミーム","comment":"インターネット・ミームから。 えんいー","order":70020,"tag_ids":["myth"]},{"_id":"m19","name":"タルト","comment":"https://twitter.com/7korobi/status/510069062974447617","order":70021,"tag_ids":["myth"]},{"_id":"m20","name":"ショコラ","comment":"https://twitter.com/noa_marimo/status/510100541536358400","order":70022,"tag_ids":["myth"]},{"_id":"c115","name":"マリオ","comment":"じつは、牧場育ちらしいよ。","order":132,"tag_ids":["giji","guild","road","kid"]},{"_id":"t21","name":"トシミ","comment":"代紋TAKE2","order":30019,"tag_ids":["travel"]},{"_id":"t22","name":"ケイイチ","comment":"ひぐらしのなく頃に","order":30021,"tag_ids":["travel"]},{"_id":"w53","name":"おもん","comment":"三拾糎程の「もふもふねこひよこ」　せんいち","order":90053,"tag_ids":["shoji"]},{"_id":"sf021","name":"アンタレス","comment":"","order":80022,"tag_ids":["stratos"]},{"_id":"sf023","name":"エフ","comment":"","order":80023,"tag_ids":["stratos"]},{"_id":"sf024","name":"アイライト","comment":"","order":80024,"tag_ids":["stratos"]},{"_id":"sf025","name":"アマルテア","comment":"","order":80006,"tag_ids":["stratos"]},{"_id":"sf026","name":"ポーラ","comment":"","order":80026,"tag_ids":["stratos"]},{"_id":"sf022","name":"チェビイ","comment":"","order":80027,"tag_ids":["stratos"]},{"_id":"sf027","name":"モスキート","comment":"","order":80028,"tag_ids":["stratos"]},{"_id":"sf032","name":"ワクラバ","comment":"","order":80029,"tag_ids":["stratos"]},{"_id":"sf028","name":"コータ","comment":"","order":80030,"tag_ids":["stratos"]},{"_id":"sf029","name":"ミツボシ","comment":"","order":80031,"tag_ids":["stratos"]},{"_id":"sf030","name":"クレパスキュール","comment":"","order":80032,"tag_ids":["stratos"]},{"_id":"sf031","name":"シルク","comment":"","order":80033,"tag_ids":["stratos"]},{"_id":"t23","name":"ナナオ","comment":"","order":30023,"tag_ids":["travel"]},{"_id":"t24","name":"キルロイ","comment":"「キルロイここに現る」","order":30024,"tag_ids":["travel"]},{"_id":"t25","name":"ミサキ","comment":"","order":30025,"tag_ids":["travel"]},{"_id":"t26","name":"アツタネ","comment":"平田篤胤","order":30026,"tag_ids":["travel"]},{"_id":"t27","name":"みょんこ","comment":"","order":30027,"tag_ids":["travel"]},{"_id":"t28","name":"リツ","comment":"","order":30028,"tag_ids":["travel"]},{"_id":"t29","name":"ヒナコ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"t30","name":"ワタヌキ","comment":"四月朔日","order":30030,"tag_ids":["travel"]},{"_id":"t31","name":"ホウイチ","comment":"","order":158,"tag_ids":["travel"]},{"_id":"t32","name":"トヨタ","comment":"洋画の日本人名","order":30032,"tag_ids":["travel"]},{"_id":"t33","name":"エツコ","comment":"","order":30033,"tag_ids":["travel"]},{"_id":"t34","name":"ドン","comment":"","order":17,"tag_ids":["travel"]},{"_id":"c116","name":"メルヤ","comment":"","order":116,"tag_ids":["giji","medical","immoral","young"]},{"_id":"c117","name":"ルパート","comment":"","order":135,"tag_ids":["giji","road","guild","elder"]},{"_id":"c118","name":"ユージン","comment":"","order":118,"tag_ids":["giji","river","young","middle"]},{"_id":"c119","name":"オーレリア","comment":"","order":119,"tag_ids":["giji","ecclesia","young"]},{"_id":"c120","name":"ノア","comment":"","order":120,"tag_ids":["giji","servant","young","middle"]},{"_id":"t35","name":"イスルギ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"c121","name":"ブッカ","comment":"ブッカ・ホワイト氏から。","order":121,"tag_ids":["giji","farm"]},{"_id":"mad09","name":"カナビス","comment":"ウパニシャッドの精神で","order":20009,"tag_ids":["marchen"]},{"_id":"mad10","name":"ルグレ","comment":"後悔あとをたたず","order":20010,"tag_ids":["marchen"]},{"_id":"mad11","name":"オルギア","comment":"ええじゃないかええじゃないかー！","order":20011,"tag_ids":["marchen"]},{"_id":"sf033","name":"イースター","comment":null,"order":80033,"tag_ids":["stratos"]},{"_id":"sf034","name":"アニュ","order":80034,"tag_ids":["stratos"]},{"_id":"sf035","name":"キャンディ","comment":null,"order":80035,"tag_ids":["stratos"]},{"_id":"sf036","name":"キカ","order":80036,"tag_ids":["stratos"]},{"_id":"sf037","name":"バンアレン","order":80037,"tag_ids":["stratos"]},{"_id":"sf038","name":"パラチーノ","order":80038,"tag_ids":["stratos"]},{"_id":"t36","name":"イルマ","comment":"KKKてきな何か。","order":30036,"tag_ids":["travel"]},{"_id":"t37","name":"シュンタロ","comment":"国語の教科書から。","order":30009,"tag_ids":["travel"]},{"_id":"t38","name":"スズキ","comment":"人の死なない推理小説『黒後家蜘蛛の会』のそばに","order":30038,"tag_ids":["travel"]},{"_id":"t39","name":"ガモウ","comment":"そろそろ聖戦士が欲しかった！","order":30018.1,"tag_ids":["travel"]}]

/***/ }),

/***/ "SfB7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("+E39") && !__webpack_require__("S82l")(function () {
  return Object.defineProperty(__webpack_require__("ON07")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "SldL":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "SqN4":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("TDbY");

__webpack_require__("a2dX");

__webpack_require__("aXYL");

__webpack_require__("uvw7");

__webpack_require__("wwh6");

__webpack_require__("6WIT");

__webpack_require__("NN5m");

__webpack_require__("mQke");

__webpack_require__("CIhV");


/***/ }),

/***/ "T23V":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__("exGp");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var loadAsyncComponents = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(to, from, next) {
    var fromPath, toPath, statusCode;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Check if route hash changed
            fromPath = from.fullPath.split('#')[0];
            toPath = to.fullPath.split('#')[0];

            this._hashChanged = fromPath === toPath;

            if (!this._hashChanged && this.$loading.start) {
              this.$loading.start();
            }

            _context.prev = 4;
            _context.next = 7;
            return _promise2.default.all((0, _utils.flatMapComponents)(to, function (Component, _, match, key) {
              // If component already resolved
              if (typeof Component !== 'function' || Component.options) {
                var _Component = (0, _utils.sanitizeComponent)(Component);
                match.components[key] = _Component;
                return _Component;
              }

              // Resolve component
              return Component().then(function (Component) {
                var _Component = (0, _utils.sanitizeComponent)(Component);
                match.components[key] = _Component;
                return _Component;
              });
            }));

          case 7:

            next();
            _context.next = 16;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](4);

            if (!_context.t0) _context.t0 = {};
            statusCode = _context.t0.statusCode || _context.t0.status || _context.t0.response && _context.t0.response.status || 500;

            this.error({ statusCode: statusCode, message: _context.t0.message });
            next(false);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 10]]);
  }));

  return function loadAsyncComponents(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var render = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(to, from, next) {
    var _this2 = this;

    var nextCalled, _next, context, Components, layout, _layout, isValid, _layout2;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!this._hashChanged) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', next());

          case 2:

            // nextCalled is true when redirected
            nextCalled = false;

            _next = function _next(path) {
              if (_this2.$loading.finish) _this2.$loading.finish();
              if (nextCalled) return;
              nextCalled = true;
              next(path);
            };

            // Update context


            context = (0, _utils.getContext)({
              to: to,
              from: from,
              store: store,
              isClient: true,
              next: _next.bind(this),
              error: this.error.bind(this)
            }, app);

            this._context = context;
            this._dateLastError = this.$options._nuxt.dateErr;
            this._hadError = !!this.$options._nuxt.err;

            // Get route's matched components
            Components = (0, _utils.getMatchedComponents)(to);

            // If no Components matched, generate 404

            if (Components.length) {
              _context2.next = 23;
              break;
            }

            _context2.next = 12;
            return callMiddleware.call(this, Components, context);

          case 12:
            if (!context._redirected) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return');

          case 14:
            _context2.next = 16;
            return this.loadLayout(typeof _index.NuxtError.layout === 'function' ? _index.NuxtError.layout(context) : _index.NuxtError.layout);

          case 16:
            layout = _context2.sent;
            _context2.next = 19;
            return callMiddleware.call(this, Components, context, layout);

          case 19:
            if (!context._redirected) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt('return');

          case 21:

            this.error({ statusCode: 404, message: 'This page could not be found' });
            return _context2.abrupt('return', next());

          case 23:

            // Update ._data and other properties if hot reloaded
            Components.forEach(function (Component) {
              if (Component._Ctor && Component._Ctor.options) {
                Component.options.asyncData = Component._Ctor.options.asyncData;
                Component.options.fetch = Component._Ctor.options.fetch;
              }
            });

            // Apply transitions
            this.setTransitions(mapTransitions(Components, to, from));

            _context2.prev = 25;
            _context2.next = 28;
            return callMiddleware.call(this, Components, context);

          case 28:
            if (!context._redirected) {
              _context2.next = 30;
              break;
            }

            return _context2.abrupt('return');

          case 30:

            // Set layout
            _layout = Components[0].options.layout;

            if (typeof _layout === 'function') {
              _layout = _layout(context);
            }
            _context2.next = 34;
            return this.loadLayout(_layout);

          case 34:
            _layout = _context2.sent;
            _context2.next = 37;
            return callMiddleware.call(this, Components, context, _layout);

          case 37:
            if (!context._redirected) {
              _context2.next = 39;
              break;
            }

            return _context2.abrupt('return');

          case 39:

            // Call .validate()
            isValid = true;

            Components.forEach(function (Component) {
              if (!isValid) return;
              if (typeof Component.options.validate !== 'function') return;
              isValid = Component.options.validate({
                params: to.params || {},
                query: to.query || {},
                store: context.store
              });
            });
            // ...If .validate() returned false

            if (isValid) {
              _context2.next = 44;
              break;
            }

            this.error({ statusCode: 404, message: 'This page could not be found' });
            return _context2.abrupt('return', next());

          case 44:
            _context2.next = 46;
            return _promise2.default.all(Components.map(function (Component, i) {
              // Check if only children route changed
              Component._path = (0, _utils.compile)(to.matched[i].path)(to.params);
              if (!_this2._hadError && _this2._isMounted && Component._path === _lastPaths[i] && i + 1 !== Components.length) {
                return _promise2.default.resolve();
              }

              var promises = [];

              var hasAsyncData = Component.options.asyncData && typeof Component.options.asyncData === 'function';
              var hasFetch = !!Component.options.fetch;
              var loadingIncrease = hasAsyncData && hasFetch ? 30 : 45;

              // Call asyncData(context)
              if (hasAsyncData) {
                var promise = (0, _utils.promisify)(Component.options.asyncData, context).then(function (asyncDataResult) {
                  (0, _utils.applyAsyncData)(Component, asyncDataResult);
                  if (_this2.$loading.increase) _this2.$loading.increase(loadingIncrease);
                });
                promises.push(promise);
              }

              // Call fetch(context)
              if (hasFetch) {
                var p = Component.options.fetch(context);
                if (!p || !(p instanceof _promise2.default) && typeof p.then !== 'function') {
                  p = _promise2.default.resolve(p);
                }
                p.then(function (fetchResult) {
                  if (_this2.$loading.increase) _this2.$loading.increase(loadingIncrease);
                });
                promises.push(p);
              }

              return _promise2.default.all(promises);
            }));

          case 46:

            _lastPaths = Components.map(function (Component, i) {
              return (0, _utils.compile)(to.matched[i].path)(to.params);
            });

            if (this.$loading.finish) this.$loading.finish();

            // If not redirected
            if (!nextCalled) next();

            _context2.next = 62;
            break;

          case 51:
            _context2.prev = 51;
            _context2.t0 = _context2['catch'](25);

            if (!_context2.t0) _context2.t0 = {};
            _lastPaths = [];
            _context2.t0.statusCode = _context2.t0.statusCode || _context2.t0.status || _context2.t0.response && _context2.t0.response.status || 500;

            // Load error layout
            _layout2 = _index.NuxtError.layout;

            if (typeof _layout2 === 'function') {
              _layout2 = _layout2(context);
            }
            _context2.next = 60;
            return this.loadLayout(_layout2);

          case 60:

            this.error(_context2.t0);
            next(false);

          case 62:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[25, 51]]);
  }));

  return function render(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// Fix components format in matched, it's due to code-splitting of vue-router


var mountApp = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(__app) {
    var Components, _app, layout, mountApp;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Set global variables
            app = __app.app;
            router = __app.router;
            store = __app.store;

            // Resolve route components
            _context3.next = 5;
            return _promise2.default.all(resolveComponents(router));

          case 5:
            Components = _context3.sent;


            // Create Vue instance
            _app = new _vue2.default(app);

            // Load layout

            layout = NUXT.layout || 'default';
            _context3.next = 10;
            return _app.loadLayout(layout);

          case 10:
            _app.setLayout(layout);

            // Mounts Vue app to DOM element

            mountApp = function mountApp() {
              _app.$mount('#__nuxt');

              // Listen for first Vue update
              _vue2.default.nextTick(function () {
                // Call window.onNuxtReady callbacks
                nuxtReady(_app);
              });
            };

            // Enable transitions


            _app.setTransitions = _app.$options._nuxt.setTransitions.bind(_app);
            if (Components.length) {
              _app.setTransitions(mapTransitions(Components, router.currentRoute));
              _lastPaths = router.currentRoute.matched.map(function (route) {
                return (0, _utils.compile)(route.path)(router.currentRoute.params);
              });
              _lastComponentsFiles = Components.map(function (Component) {
                return Component.options.__file;
              });
            }

            // Initialize error handler
            _app.error = _app.$options._nuxt.error.bind(_app);
            _app.$loading = {}; // To avoid error while _app.$nuxt does not exist
            if (NUXT.error) _app.error(NUXT.error);

            // Add router hooks
            router.beforeEach(loadAsyncComponents.bind(_app));
            router.beforeEach(render.bind(_app));
            router.afterEach(normalizeComponents);
            router.afterEach(fixPrepatch.bind(_app));

            // If page already is server rendered

            if (!NUXT.serverRendered) {
              _context3.next = 24;
              break;
            }

            mountApp();
            return _context3.abrupt('return');

          case 24:

            render.call(_app, router.currentRoute, router.currentRoute, function (path) {
              if (!path) {
                normalizeComponents(router.currentRoute, router.currentRoute);
                fixPrepatch.call(_app, router.currentRoute, router.currentRoute);
                mountApp();
                return;
              }

              // Push the path and then mount app
              var mounted = false;
              router.afterEach(function () {
                if (mounted) return;
                mounted = true;
                mountApp();
              });
              router.push(path);
            });

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function mountApp(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _middleware = __webpack_require__("unZF");

var _middleware2 = _interopRequireDefault(_middleware);

var _index = __webpack_require__("qcny");

var _utils = __webpack_require__("YLfZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noopData = function noopData() {
  return {};
};
var noopFetch = function noopFetch() {};

// Global shared references
var _lastPaths = [];
var _lastComponentsFiles = [];
var app = void 0;
var router = void 0;
var store = void 0;

// Try to rehydrate SSR data from window
var NUXT = window.__NUXT__ || {};

// Create and mount App
(0, _index.createApp)().then(mountApp).catch(function (err) {
  console.error('[nuxt] Error while initializing app', err);
});

function componentOption(component, key) {
  if (!component || !component.options || !component.options[key]) {
    return {};
  }
  var option = component.options[key];
  if (typeof option === 'function') {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return option.apply(undefined, args);
  }
  return option;
}

function mapTransitions(Components, to, from) {
  var componentTransitions = function componentTransitions(component) {
    var transition = componentOption(component, 'transition', to, from) || {};
    return typeof transition === 'string' ? { name: transition } : transition;
  };

  return Components.map(function (Component) {
    // Clone original object to prevent overrides
    var transitions = (0, _assign2.default)({}, componentTransitions(Component));

    // Combine transitions & prefer `leave` transitions of 'from' route
    if (from && from.matched.length && from.matched[0].components.default) {
      var from_transitions = componentTransitions(from.matched[0].components.default);
      (0, _keys2.default)(from_transitions).filter(function (key) {
        return from_transitions[key] && key.toLowerCase().indexOf('leave') !== -1;
      }).forEach(function (key) {
        transitions[key] = from_transitions[key];
      });
    }

    return transitions;
  });
}

function applySSRData(Component, ssrData) {
  if (NUXT.serverRendered && ssrData) {
    (0, _utils.applyAsyncData)(Component, ssrData);
  }
  Component._Ctor = Component;
  return Component;
}

// Get matched components
function resolveComponents(router) {
  var path = (0, _utils.getLocation)(router.options.base, router.options.mode);

  return (0, _utils.flatMapComponents)(router.match(path), function (Component, _, match, key, index) {
    // If component already resolved
    if (typeof Component !== 'function' || Component.options) {
      var _Component = applySSRData((0, _utils.sanitizeComponent)(Component), NUXT.data ? NUXT.data[index] : null);
      match.components[key] = _Component;
      return _Component;
    }

    // Resolve component
    return Component().then(function (Component) {
      var _Component = applySSRData((0, _utils.sanitizeComponent)(Component), NUXT.data ? NUXT.data[index] : null);
      match.components[key] = _Component;
      return _Component;
    });
  });
}

function callMiddleware(Components, context, layout) {
  var _this = this;

  var midd = [];
  var unknownMiddleware = false;

  // If layout is undefined, only call global middleware
  if (typeof layout !== 'undefined') {
    midd = []; // Exclude global middleware if layout defined (already called before)
    if (layout.middleware) {
      midd = midd.concat(layout.middleware);
    }
    Components.forEach(function (Component) {
      if (Component.options.middleware) {
        midd = midd.concat(Component.options.middleware);
      }
    });
  }

  midd = midd.map(function (name) {
    if (typeof _middleware2.default[name] !== 'function') {
      unknownMiddleware = true;
      _this.error({ statusCode: 500, message: 'Unknown middleware ' + name });
    }
    return _middleware2.default[name];
  });

  if (unknownMiddleware) return;
  return (0, _utils.middlewareSeries)(midd, context);
}

function normalizeComponents(to, ___) {
  (0, _utils.flatMapComponents)(to, function (Component, _, match, key) {
    if ((typeof Component === 'undefined' ? 'undefined' : (0, _typeof3.default)(Component)) === 'object' && !Component.options) {
      // Updated via vue-router resolveAsyncComponents()
      Component = _vue2.default.extend(Component);
      Component._Ctor = Component;
      match.components[key] = Component;
    }
    return Component;
  });
}

// When navigating on a different route but the same component is used, Vue.js
// Will not update the instance data, so we have to update $data ourselves
function fixPrepatch(to, ___) {
  var _this3 = this;

  if (this._hashChanged) return;

  _vue2.default.nextTick(function () {
    var instances = (0, _utils.getMatchedComponentsInstances)(to);

    _lastComponentsFiles = instances.map(function (instance, i) {
      if (!instance) return '';

      if (_lastPaths[i] === instance.constructor._path && typeof instance.constructor.options.data === 'function') {
        var newData = instance.constructor.options.data.call(instance);
        for (var key in newData) {
          _vue2.default.set(instance.$data, key, newData[key]);
        }
      }

      return instance.constructor.options.__file;
    });

    // Hide error component if no error
    if (_this3._hadError && _this3._dateLastError === _this3.$options._nuxt.dateErr) {
      _this3.error();
    }

    // Set layout
    var layout = _this3.$options._nuxt.err ? _index.NuxtError.layout : to.matched[0].components.default.options.layout;
    if (typeof layout === 'function') {
      layout = layout(_this3._context);
    }
    _this3.setLayout(layout);
  });
}

function nuxtReady(app) {
  window._nuxtReadyCbs.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(app);
    }
  });
  // Special JSDOM
  if (typeof window._onNuxtLoaded === 'function') {
    window._onNuxtLoaded(app);
  }
  // Add router hooks
  router.afterEach(function (to, from) {
    app.$nuxt.$emit('routeChanged', to, from);
  });
}

/***/ }),

/***/ "TDbY":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set, _, chr_set_id, cs_key, face, face_id, i, j, job, key, len, len1, list, o, order, ref, say;

({Set, Model, Query, Rule} = __webpack_require__("L78F"));

_ = __webpack_require__("M4fF");

order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school", "all"];

new Rule("tag").schema(function() {
  this.habtm("faces", {
    reverse: true
  });
  this.habtm("chr_sets");
  this.tree();
  return this.scope(function(all) {
    return {
      enable: function() {
        return all.where(function(o) {
          return !o.disabled;
        });
      }
    };
  });
});

new Rule("face").schema(function() {
  var map;
  this.habtm("tags");
  this.has_many("chr_jobs");
  this.has_many("chr_npcs");
  this.scope(function(all) {
    return {
      aggregate: function(tag_id, order) {
        var asc;
        asc = (function() {
          switch (order) {
            case "order":
            case "date_min":
              return "asc";
            default:
              return "desc";
          }
        })();
        return all.tag(tag_id).sort(order, asc);
      },
      tag: function(tag_id) {
        switch (tag_id) {
          case "all":
            return all;
          default:
            return all.in({
              tag_ids: tag_id
            });
        }
      },
      name_blank: function() {
        var i, idx, key, ref, ref1, results;
        results = [];
        for (idx = i = ref = "ア".charCodeAt(0), ref1 = "ン".charCodeAt(0); ref <= ref1 ? i <= ref1 : i >= ref1; idx = ref <= ref1 ? ++i : --i) {
          key = String.fromCharCode(idx);
          if (all.reduce.name_head.from[key]) {
            continue;
          }
          results.push(key);
        }
        return results;
      },
      name_head: function(tag_id = "all") {
        return all.tag(tag_id).reduce.name_head;
      }
    };
  });
  map = {
    count: 1
  };
  this.model = class model extends this.model {
    static order(o, emit) {
      emit("list", {
        sort: ["order"]
      });
      return emit("name_head", {
        sort: ["id"],
        index: "set.length"
      });
    }

    static map_reduce(o, emit) {
      var head, i, len, ref, results, tag;
      head = o.name[0];
      if (head === "†") {
        head = o.name[1];
      }
      emit("all", "all", map);
      emit("name_head", head, {
        set: o.name
      });
      ref = o.tag_ids;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        results.push(emit("tag", tag, map));
      }
      return results;
    }

    static deploy() {
      this.aggregate = {
        sow_auths: [],
        mestypes: [],
        folders: [],
        roles: [],
        lives: [],
        log: {
          date_min: 0xfffffffffffff,
          date_max: -0xfffffffffffff,
          story_ids: []
        },
        fav: {
          _id: {
            sow_auth_id: null
          },
          count: 0
        }
      };
      return this.summary_url = `/summary/faces/${this._id}`;
    }

  };
  return Object.assign(this.model_property, {
    roles: {
      get: function() {
        return this.aggregate.roles;
      }
    },
    lives: {
      get: function() {
        return this.aggregate.lives;
      }
    },
    sow_auths: {
      get: function() {
        return this.aggregate.sow_auths;
      }
    },
    mestypes: {
      get: function() {
        return this.aggregate.mestypes;
      }
    },
    folders: {
      get: function() {
        return this.aggregate.folders;
      }
    },
    story_length: {
      get: function() {
        return this.aggregate.log.story_ids.length;
      }
    },
    sow_auth_id: {
      get: function() {
        return this.aggregate.fav._id.sow_auth_id;
      }
    },
    fav_count: {
      get: function() {
        return this.aggregate.fav.count;
      }
    },
    date_max: {
      get: function() {
        return new Date(this.aggregate.log.date_max) - 0;
      }
    },
    date_min: {
      get: function() {
        return new Date(this.aggregate.log.date_min) - 0;
      }
    },
    date_range: {
      get: function() {
        return this.date_max - this.date_min;
      }
    },
    jobs: {
      get: function() {
        return _.uniq(this.chr_jobs.pluck("job"));
      }
    }
  });
});

new Rule("chr_set").schema(function() {
  this.order("label");
  this.has_many("chr_jobs");
  return this.has_many("chr_npcs");
});

new Rule("chr_npc").schema(function() {
  this.order("label");
  this.belongs_to("chr_set");
  this.belongs_to("face");
  return this.model = class model extends this.model {
    static deploy() {
      this._id = `${this.chr_set_id}_${this.face_id}`;
      return this.chr_set_idx = order.indexOf(this.chr_set_id);
    }

  };
});

new Rule("chr_job").schema(function() {
  this.order("face.order");
  this.belongs_to("chr_set");
  this.belongs_to("face");
  return this.model = class model extends this.model {
    static deploy() {
      this._id = `${this.chr_set_id}_${this.face_id}`;
      return this.chr_set_idx = order.indexOf(this.chr_set_id);
    }

  };
});

Set.tag.set(__webpack_require__("zD/G"));

Set.face.set(__webpack_require__("SBjU"));

ref = __webpack_require__("K9Q6");
for (i = 0, len = ref.length; i < len; i++) {
  ({face_id, say} = ref[i]);
  Query.faces.find(face_id).npc = {say};
}

for (j = 0, len1 = order.length; j < len1; j++) {
  key = order[j];
  o = __webpack_require__("19G2")(`./cs_${key}.yml`);
  Set.chr_set.merge([o.chr_set]);
  ({chr_set_id} = o.chr_set);
  cs_key = {chr_set_id};
  Set.chr_npc.merge(o.chr_npc, cs_key);
  Set.chr_job.merge(o.chr_job, cs_key);
}

list = (function() {
  var k, len2, ref1, ref2, results;
  ref1 = Query.faces.list;
  results = [];
  for (k = 0, len2 = ref1.length; k < len2; k++) {
    face = ref1[k];
    chr_set_id = "all";
    face_id = face._id;
    job = (ref2 = face.chr_jobs.list.sort("chr_set_idx")[0]) != null ? ref2.job : void 0;
    if (job == null) {
      continue;
    }
    results.push({chr_set_id, face_id, job});
  }
  return results;
})();

Set.chr_job.merge(list);


/***/ }),

/***/ "TcQ7":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("MU5D");
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "To1F":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_error_vue__ = __webpack_require__("jSQ8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_error_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_error_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_638dcaae_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_error_vue__ = __webpack_require__("Z+LT");
function injectStyle (ssrContext) {
  __webpack_require__("kVCx")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-638dcaae"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__coffee_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_script_index_0_error_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_638dcaae_hasScoped_true_preserveWhitespace_false_buble_transforms_pug_html_loader_appendTsSuffixTo_vue_node_modules_vue_loader_lib_selector_type_template_index_0_error_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "To3L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
var toObject = __webpack_require__("sB3e");
var IObject = __webpack_require__("MU5D");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("S82l")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "U5ju":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("M6a0");
__webpack_require__("zQR9");
__webpack_require__("+tPU");
__webpack_require__("CXw9");
__webpack_require__("EqBC");
__webpack_require__("jKW+");
module.exports = __webpack_require__("FeBl").Promise;


/***/ }),

/***/ "Un20":
/***/ (function(module, exports) {

module.exports = {"51":{"label":"?51?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"57":{"label":"?57?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"dyingpossess":{"label":"衰退狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":""},"aurawolf":{"label":"気狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_aura","vote","entrust","WSAY"],"cmd":"role","help":""},"nothing":{"label":"普通の日","win":null,"group":"EVENT","able_ids":[],"help":""},"aprilfool":{"label":"四月馬鹿","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfink":{"label":"二重スパイ","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfairy":{"label":"妖精の輪","win":null,"group":"EVENT","able_ids":[],"help":""},"eclipse":{"label":"日蝕","win":null,"group":"EVENT","able_ids":[],"help":""},"cointoss":{"label":"Sir Cointoss","win":null,"group":"EVENT","able_ids":[],"help":""},"force":{"label":"影響力","win":null,"group":"EVENT","able_ids":[],"help":""},"miracle":{"label":"奇跡","win":null,"group":"EVENT","able_ids":[],"help":""},"prophecy":{"label":"聖者のお告げ","win":null,"group":"EVENT","able_ids":[],"help":""},"clamor":{"label":"不満","win":null,"group":"EVENT","able_ids":[],"help":""},"fire":{"label":"熱意","win":null,"group":"EVENT","able_ids":[],"help":""},"nightmare":{"label":"悪夢","win":null,"group":"EVENT","able_ids":[],"help":""},"ghost":{"label":"亡霊","win":null,"group":"EVENT","able_ids":[],"help":""},"escape":{"label":"逃亡","win":null,"group":"EVENT","able_ids":[],"help":""},"seance":{"label":"降霊会","win":null,"group":"EVENT","able_ids":[],"help":""},"entry":{"label":"エントリー","win":null,"group":"TURN","able_ids":["ENTRY"],"help":""},"start":{"label":"初日","win":null,"group":"TURN","able_ids":[],"help":""},"main":{"label":"二日目以降","win":null,"group":"TURN","able_ids":[],"help":""},"prologue":{"label":"プロローグ","win":"NONE","group":"TURN","able_ids":["exit"],"help":""},"epilogue":{"label":"エピローグ","win":null,"group":"TURN","able_ids":[],"help":""},"live":{"label":"生存者","win":null,"group":"LIVE","able_ids":["SSAY","TSAY","AIM","commit"],"help":""},"executed":{"label":"処刑","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"victim":{"label":"襲撃","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"cursed":{"label":"呪詛","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"droop":{"label":"衰退","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suicide":{"label":"後追","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"feared":{"label":"恐怖","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suddendead":{"label":"突然死","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"leave":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"none":{"label":"","win":null,"group":null,"able_ids":[],"help":""},"bind":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"hide":{"label":"？？？","win":null,"group":null,"able_ids":["hike","vote","entrust"],"help":"あなたは正体不明です。"},"mob":{"label":"見物人","win":"MOB","group":null,"able_ids":[],"help":"見物人全般のための仮想役職です。"},"visiter":{"label":"客席","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は客席同士のみ"},"grave":{"label":"裏方","win":"MOB","group":"MOB","able_ids":["VGSAY","TSAY"],"help":"進行中会話は墓下と"},"alive":{"label":"舞台","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と"},"juror":{"label":"陪審","win":"HUMAN","group":"MOB","able_ids":["VSAY","TSAY","vote","entrust"],"help":"進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"},"gamemaster":{"label":"黒幕","win":"MOB","group":"MOB","able_ids":["gm_droop","gm_live","gm_disable_vote","gm_enable_vote","VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"},"master":{"label":"村立て人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","MAKER"]},"admin":{"label":"管理人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","scrapvil","ADMIN"]},"lost":{"label":"喪失","win":null,"group":"OTHER","able_ids":[],"cmd":"gift","help":"あなたは贈り物を<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_LOST\" TARGET=\"_blank\">喪失</A>しました。 もう二度と手にすることはないでしょう。もしまたあなたの手に贈り物があっても、消え去ってしまいます。そして、あなたがそれに気付くことはないでしょう。"},"shield":{"label":"光の輪","win":null,"group":"OTHER","able_ids":["circular","guard"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SHIELD\" TARGET=\"_blank\">光の輪</A>が取り巻きます。 あなたはもし昨夜、襲撃されていたとしても守られました。 光の輪はひとりを一度しか守りません。"},"glass":{"label":"魔鏡","win":null,"group":"OTHER","able_ids":["circular","see"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_GLASS\" TARGET=\"_blank\">魔鏡</A>が照らします。 あなたは、魔鏡を渡す相手を占います。 魔鏡はひとりを一度しか照らしません。"},"ogre":{"label":"悪鬼","win":"WOLF","group":"WOLF","able_ids":["wolf","hunt","friend","WSAY"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_OGRE\" TARGET=\"_blank\">悪鬼</A>です。 表向きは他の役目を帯びていますが、あなたは人を襲う悪い鬼なのです。"},"fairy":{"label":"妖精の子","win":"PIXI","group":"PIXI","able_ids":["pixi"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FAIRY\" TARGET=\"_blank\">妖精から生まれた子</A>です。 表向きは他の役目を帯びていますが、あなたは人ならぬ存在なのです。 占い師、霊能者にどう判別されるかは、もともとの役職によります。"},"fink":{"label":"半端者","win":"EVIL","group":"EVIL","able_ids":["evil"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FINK\" TARGET=\"_blank\">半端者</A>です。 表向きは他の役目を帯びていますが、あなたは人ともつかぬ、人狼ともつかぬ、半端な正体を隠しています。"},"decide":{"label":"決定者","win":null,"group":"OTHER","able":"投票","able_ids":["vote_role"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DECIDE\" TARGET=\"_blank\">決定者</A>です。 あなたは追加票を投じる権利を持ちつづけます。行使することで、健在を示すこともできるでしょう。"},"seeronce":{"label":"夢占師","win":null,"group":"OTHER","able":"占う","able_ids":["once","see","spy_wolf"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SEERONCE\" TARGET=\"_blank\">夢占師</A>です。"},"dipsy":{"label":"酔払い","win":null,"group":"OTHER","able_ids":null,"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DIPSY\" TARGET=\"_blank\">酔払い</A>です。 あなたが人外もしくは村人に相対するものであれば、自分の役割を見失うことはありません。 また、光の輪や魔鏡といった贈り物を受け取った場合、酔いが醒めることでしょう。"},"lover":{"label":"弟子","win":null,"group":"OTHER","able":"入門","able_ids":["aura","bond","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVER\" TARGET=\"_blank\">弟子</A>です。 好きな人物を師匠として選び、弟子入りします。次の朝、あなたは頭角をあらわし、絆の師匠と同じ役職になっています。"},"robber":{"label":"盗賊","win":null,"group":"OTHER","able_ids":["aura","rob","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ROBBER\" TARGET=\"_blank\">盗賊</A>です。"},"tangle":{"label":"怨念","win":null,"group":"OTHER","able_ids":["aura","revenge","tangle","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TANGLE\" TARGET=\"_blank\">怨念</A>です。"},"villager":{"label":"村人","win":"HUMAN","group":"HUMAN","able_ids":["human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。"},"stigma":{"label":"聖痕者","win":"HUMAN","group":"HUMAN","able_ids":["aura","stigma","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_STIGMA\" TARGET=\"_blank\">聖痕者</A>です。"},"fm":{"label":"結社員","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FM\" TARGET=\"_blank\">結社員</A>です。 独自の人脈を持つ秘密結社の一員です。"},"sympathy":{"label":"共鳴者","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust","SPSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SYMPATHY\" TARGET=\"_blank\">共鳴者</A>です。"},"seer":{"label":"占い師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEER\" TARGET=\"_blank\">占い師</A>です。"},"seerwin":{"label":"信仰占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERWIN\" TARGET=\"_blank\">信仰占師</A>です。"},"aura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"oura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"seerrole":{"label":"賢者","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERROLE\" TARGET=\"_blank\">賢者</A>です。"},"guard":{"label":"守護者","win":"HUMAN","group":"HUMAN","able_ids":["aura","guard","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GUARD\" TARGET=\"_blank\">守護者</A>です。"},"medium":{"label":"霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUM\" TARGET=\"_blank\">霊能者</A>です。"},"mediumwin":{"label":"信仰霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMWIN\" TARGET=\"_blank\">信仰霊能者</A>です。"},"mediumrole":{"label":"導師","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMROLE\" TARGET=\"_blank\">導師</A>です。"},"necromancer":{"label":"降霊者","win":"HUMAN","group":"HUMAN","able_ids":["aura","chkGSAY","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_NECROMANCER\" TARGET=\"_blank\">降霊者</A>です。"},"follow":{"label":"追従者","win":"HUMAN","group":"HUMAN","able_ids":["aura","human","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FOLLOW\" TARGET=\"_blank\">追従者</A>です。 だれかを信じ、委ねましょう。"},"fan":{"label":"煽動者","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","riot","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FAN\" TARGET=\"_blank\">煽動者</A>です。"},"hunter":{"label":"賞金稼","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","sneak","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HUNTER\" TARGET=\"_blank\">賞金稼</A>です。 毎夜、一人を付け狙います。"},"weredog":{"label":"人犬","win":"HUMAN","group":"HUMAN","able_ids":["aura","tafness","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WEREDOG\" TARGET=\"_blank\">人犬</A>です。"},"prince":{"label":"王子様","win":"HUMAN","group":"HUMAN","able_ids":["aura","august","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PRINCE\" TARGET=\"_blank\">王子様</A>です。"},"rightwolf":{"label":"狼血族","win":"HUMAN","group":"HUMAN","able_ids":["aura","blind","wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。\n狼血族のあなたは、占い師、霊能者に人狼と判定されます。ですが、あなたは村人で、勝利条件も変わりません。 勝利を目指して頑張りましょう。占われると、正体を自覚し表示が増えます。"},"doctor":{"label":"医師","win":"HUMAN","group":"HUMAN","able":"診察","able_ids":["aura","cure","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DOCTOR\" TARGET=\"_blank\">医師</A>です。"},"curse":{"label":"呪人","win":"HUMAN","group":"HUMAN","able_ids":["aura","curse","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSE\" TARGET=\"_blank\">呪人</A>です。"},"dying":{"label":"預言者","win":"HUMAN","group":"HUMAN","able_ids":["aura","droop","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYING\" TARGET=\"_blank\">預言者</A>です。"},"invalid":{"label":"病人","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INVALID\" TARGET=\"_blank\">病人</A>です。 あなたが命を落としたとき、犯人は病気に感染します。"},"alchemist":{"label":"錬金術師","win":"HUMAN","group":"HUMAN","able_ids":["aura","once","revenge","cling","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ALCHEMIST\" TARGET=\"_blank\">錬金術師</A>です。 あなたは一度だけ、薬を飲むことが出来ます。"},"witch":{"label":"魔女","win":"HUMAN","group":"HUMAN","able_ids":["aura","analeptic","poison","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WITCH\" TARGET=\"_blank\">魔女</A>です。 あなたは二日目に、毒薬と蘇生薬をひとつずつ完成させます。"},"girl":{"label":"少女","win":"HUMAN","group":"HUMAN","able_ids":["aura","night","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GIRL\" TARGET=\"_blank\">少女</A>です。"},"scapegoat":{"label":"生贄","win":"HUMAN","group":"HUMAN","able":"疑う","able_ids":["aura","scapegoat","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SCAPEGOAT\" TARGET=\"_blank\">生贄</A>です。"},"elder":{"label":"長老","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","twolife","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ELDER\" TARGET=\"_blank\">長老</A>です。 もしも命を落としたら、あなたの恨みは犯人を襲います。"},"jammer":{"label":"邪魔之民","win":"EVIL","group":"EVIL","able":"隠す","able_ids":["aura","jammer","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_JAMMER\" TARGET=\"_blank\">邪魔之民</A>です。"},"snatch":{"label":"宿借之民","win":"EVIL","group":"EVIL","able_ids":["aura","snatch","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SNATCH\" TARGET=\"_blank\">宿借之民</A>です。"},"bat":{"label":"念波之民","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">念波之民</A>です。"},"possess":{"label":"狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_POSSESS\" TARGET=\"_blank\">狂人</A>です。"},"fanatic":{"label":"狂信者","win":"EVIL","group":"EVIL","able_ids":["aura","fanatic","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FANATIC\" TARGET=\"_blank\">狂信者</A>です。"},"muppeting":{"label":"人形使い","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","MSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MUPPETER\" TARGET=\"_blank\">人形使い</A>です。"},"wisper":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"cpossess":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"semiwolf":{"label":"半狼","win":"EVIL","group":"EVIL","able_ids":["aura","wolfify","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEMIWOLF\" TARGET=\"_blank\">半狼</A>です。"},"oracle":{"label":"魔神官","win":"EVIL","group":"EVIL","able_ids":["aura","medium","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ORACLE\" TARGET=\"_blank\">魔神官</A>です。"},"sorcerer":{"label":"魔術師","win":"EVIL","group":"EVIL","able_ids":["aura","see","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SORCERER\" TARGET=\"_blank\">魔術師</A>です。"},"walpurgis":{"label":"魔法少年","win":"EVIL","group":"EVIL","able_ids":["aura","grave","analeptic","poison","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WALPURGIS\" TARGET=\"_blank\">魔法少年</A>です。 やがて命を落とすと魔女になると宿命付けられています。"},"headless":{"label":"首無騎士","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HEADLESS\" TARGET=\"_blank\">首のない騎士</A>です。 あなたは人狼仲間を斬り捨てることも厭いません。"},"wolf":{"label":"人狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WOLF\" TARGET=\"_blank\">人狼</A>です。"},"intwolf":{"label":"智狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_role","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INTWOLF\" TARGET=\"_blank\">智狼</A>です。特殊な能力を持つ人狼です。"},"cwolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"cursewolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"whitewolf":{"label":"白狼","win":"WOLF","group":"WOLF","able":"襲う","able_ids":["hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WHITEWOLF\" TARGET=\"_blank\">白狼</A>です。特殊な能力を持つ人狼です。 あなたを占った占い師は、あなたを人間とみなします。あなたは能力者特有のオーラを発しません。"},"childwolf":{"label":"仔狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","revenge","grudge","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CHILDWOLF\" TARGET=\"_blank\">仔狼</A>です。特殊な能力を持つ人狼です。"},"dyingwolf":{"label":"衰狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","droop","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGWOLF\" TARGET=\"_blank\">衰狼</A>です。特殊な能力を持つ人狼です。"},"silentwolf":{"label":"黙狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SILENTWOLF\" TARGET=\"_blank\">黙狼</A>です。 人狼の襲撃対象となることはありませんが、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話は、あなたには聞こえません。"},"hamster":{"label":"栗鼠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PIXI\" TARGET=\"_blank\">栗鼠妖精</A>です。"},"werebat":{"label":"蝙蝠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">蝙蝠妖精</A>です。 あなたは他の妖精が誰であるか知っていますし、新たに生まれた妖精を知ることもできます。ただし、姿を換えてしまった宿借妖精の行方はわかりません。 また、蝙蝠妖精同士にしか聞こえない会話が可能です。"},"mimicry":{"label":"擬狼妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MIMICRY\" TARGET=\"_blank\">擬狼妖精</A>です。"},"dyingpixi":{"label":"風花妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","droop","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGPIXI\" TARGET=\"_blank\">風花妖精</A>です。"},"trickster":{"label":"悪戯妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","bonds","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TRICKSTER\" TARGET=\"_blank\">悪戯妖精</A>です。 結ばれた人たちにとっては、単なるはた迷惑な悪戯にすぎません。"},"hatedevil":{"label":"邪気悪魔","win":"HATER","group":"OTHER","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">邪気悪魔</A>です。 結びつけた二人のうち、どちらか片方だけが生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"hate":{"label":"宿敵","win":"HATER","group":"BIND","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">宿敵</A>がいます。"},"love":{"label":"恋人","win":"LOVER","group":"BIND","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋人</A>がいます。"},"loveangel":{"label":"恋愛天使","win":"LOVER","group":"OTHER","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋愛天使</A>です。 結びつけた二人が生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"passion":{"label":"片思い","win":"LOVER","group":"OTHER","able_ids":["aura","bond","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PASSION\" TARGET=\"_blank\">片想い</A>です。 選んだ人が生き延び、あなたが生き延びれば、あなたの勝利となります。"},"lonewolf":{"label":"一匹狼","win":"LONEWOLF","group":"WOLF","able_ids":["aura","wolf","armor","kill","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LONEWOLF\" TARGET=\"_blank\">一匹狼</A>です。 襲撃先はあなた以外であれば誰でもかまいません。"},"guru":{"label":"笛吹き","win":"GURU","group":"OTHER","able_ids":["aura","human","guru","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GURU\" TARGET=\"_blank\">笛吹き</A>です。"},"dish":{"label":"鱗魚人","win":"DISH","group":"OTHER","able_ids":["aura","human","dish","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DISH\" TARGET=\"_blank\">鱗魚人</A>です。新鮮なふぃーっしゅ。です。"},"bitch":{"label":"遊び人","win":"LOVER","group":"OTHER","able_ids":["aura","human","bitch","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BITCH\" TARGET=\"_blank\">遊び人</A>です。 本命とあなたが生き延びれば、あなたの勝利です。"}}

/***/ }),

/***/ "UuGF":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "V3tA":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("R4wc");
module.exports = __webpack_require__("FeBl").Object.assign;


/***/ }),

/***/ "W/pl":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set, axios;

({Set, Model, Query, Rule} = __webpack_require__("L78F"));

axios = __webpack_require__("mtWM");

module.exports = {
  namespaced: true,
  state: function() {
    return {
      read_at: 0,
      hide_potof_ids: []
    };
  },
  mutations: {
    data: function(state, o) {
      state.read_at[_id] = o.read_at;
      Set.book.merge([o.book]);
      Set.book.merge(o.books);
      Set.part.merge(o.parts);
      Set.section.merge(o.sections);
      Set.phase.merge(o.phases);
      Set.stat.merge(o.stats);
      Set.card.merge(o.cards);
      Set.potof.merge(o.potofs);
      return Set.chat.merge(o.chats);
    },
    hide_potof_ids: function(state, ids) {
      return state.hide_potof_ids = ids;
    }
  },
  actions: {
    create: async function({commit}, book) {
      var data, status;
      return ({status, data} = (await axios.post(`${env.url.api}/book`, {book})));
    },
    books: async function({commit}) {
      var data, folder_id, status;
      ({folder_id} = env.game);
      ({status, data} = (await axios.get("/api/books", {folder_id})));
      return commit("data", data);
    },
    book: async function({commit, state}, _id) {
      var data, status, write_at;
      write_at = state.read_at[_id];
      ({status, data} = (await axios.get(`/api/books/${_id}`, {write_at})));
      return commit("data", data);
    },
    chats: async function({commit, state}) {
      var data, status, write_at;
      write_at = state.read_at[_id];
      ({status, data} = (await axios.get(`/api/books/${_id}/chars`, {write_at})));
      return commit("data", data);
    }
  }
};


/***/ }),

/***/ "W12m":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggregate.coffee": "vrxn",
	"./book.coffee": "W/pl",
	"./index.coffee": "FfaV",
	"./menu.coffee": "m9vt",
	"./sow.coffee": "KL+4",
	"./story.coffee": "7LDH"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "W12m";

/***/ }),

/***/ "WRRc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'nuxt-link',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    return h('router-link', data, children);
  }
};

/***/ }),

/***/ "X8DO":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "Xc4G":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "Xd32":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("5PlU");


/***/ }),

/***/ "Xxa5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("jyFz");


/***/ }),

/***/ "YLfZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

exports.applyAsyncData = applyAsyncData;
exports.sanitizeComponent = sanitizeComponent;
exports.getMatchedComponents = getMatchedComponents;
exports.getMatchedComponentsInstances = getMatchedComponentsInstances;
exports.flatMapComponents = flatMapComponents;
exports.getContext = getContext;
exports.middlewareSeries = middlewareSeries;
exports.promisify = promisify;
exports.getLocation = getLocation;
exports.urlJoin = urlJoin;
exports.compile = compile;

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noopData = function noopData() {
  return {};
};

// window.onNuxtReady(() => console.log('Ready')) hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)
if (true) {
  window._nuxtReadyCbs = [];
  window.onNuxtReady = function (cb) {
    window._nuxtReadyCbs.push(cb);
  };
}

function applyAsyncData(Component, asyncData) {
  var ComponentData = Component.options.data || noopData;
  // Prevent calling this method for each request on SSR context
  if (!asyncData && Component.options.hasAsyncData) {
    return;
  }
  Component.options.hasAsyncData = true;
  Component.options.data = function () {
    var data = ComponentData.call(this);
    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid];
    }
    return (0, _extends3.default)({}, data, asyncData);
  };
  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data;
  }
}

function sanitizeComponent(Component) {
  if (!Component.options) {
    Component = _vue2.default.extend(Component); // fix issue #6
    Component._Ctor = Component;
  } else {
    Component._Ctor = Component;
    Component.extendOptions = Component.options;
  }
  // For debugging purpose
  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file;
  }
  return Component;
}

function getMatchedComponents(route) {
  return [].concat.apply([], route.matched.map(function (m) {
    return (0, _keys2.default)(m.components).map(function (key) {
      return m.components[key];
    });
  }));
}

function getMatchedComponentsInstances(route) {
  return [].concat.apply([], route.matched.map(function (m) {
    return (0, _keys2.default)(m.instances).map(function (key) {
      return m.instances[key];
    });
  }));
}

function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return (0, _keys2.default)(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key, index);
    });
  }));
}

function getContext(context, app) {
  var ctx = {
    isServer: !!context.isServer,
    isClient: !!context.isClient,
    isStatic: false,
    isDev: false,
    isHMR: context.isHMR || false,
    app: app,
    store: context.store,
    route: context.to ? context.to : context.route,
    payload: context.payload,
    error: context.error,
    base: '/',
    env: { "url": { "web": "https://giji.f5.si", "api": "//giji.f5.si/api", "sow": "https://s3-ap-northeast-1.amazonaws.com/giji-assets/sow", "store": "https://s3-ap-northeast-1.amazonaws.com/giji-assets" }, "game": { "folder_id": "beta" } }
  };
  var next = context.next;
  ctx.params = ctx.route.params || {};
  ctx.query = ctx.route.query || {};
  ctx.redirect = function (status, path, query) {
    if (!status) return;
    ctx._redirected = true; // Used in middleware
    // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })
    if (typeof status === 'string' && (typeof path === 'undefined' || (typeof path === 'undefined' ? 'undefined' : (0, _typeof3.default)(path)) === 'object')) {
      query = path || {};
      path = status;
      status = 302;
    }
    next({
      path: path,
      query: query,
      status: status
    });
  };
  if (context.req) ctx.req = context.req;
  if (context.res) ctx.res = context.res;
  if (context.from) ctx.from = context.from;
  if (ctx.isServer && context.beforeRenderFns) {
    ctx.beforeNuxtRender = function (fn) {
      return context.beforeRenderFns.push(fn);
    };
  }
  if (ctx.isClient && window.__NUXT__) {
    ctx.nuxtState = window.__NUXT__;
  }
  return ctx;
}

function middlewareSeries(promises, context) {
  if (!promises.length || context._redirected) {
    return _promise2.default.resolve();
  }
  return promisify(promises[0], context).then(function () {
    return middlewareSeries(promises.slice(1), context);
  });
}

function promisify(fn, context) {
  var promise = void 0;
  if (fn.length === 2) {
    // fn(context, callback)
    promise = new _promise2.default(function (resolve) {
      fn(context, function (err, data) {
        if (err) {
          context.error(err);
        }
        data = data || {};
        resolve(data);
      });
    });
  } else {
    promise = fn(context);
  }
  if (!promise || !(promise instanceof _promise2.default) && typeof promise.then !== 'function') {
    promise = _promise2.default.resolve(promise);
  }
  return promise;
}

// Imported from vue-router
function getLocation(base, mode) {
  var path = window.location.pathname;
  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '');
  }
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

function urlJoin() {
  return [].slice.call(arguments).join('/').replace(/\/+/g, '/');
}

// Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if ((0, _typeof3.default)(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + (0, _stringify2.default)(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + (0, _stringify2.default)(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/***/ }),

/***/ "Yobk":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("77Pl");
var dPs = __webpack_require__("qio6");
var enumBugKeys = __webpack_require__("xnc9");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("ON07")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("RPLV").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "Z+LT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"container"},[_c('nuxt-link',{staticClass:"button",attrs:{"to":"/"}},[_vm._v("Homepage")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Zzip":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("/n6Q"), __esModule: true };

/***/ }),

/***/ "a2dX":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({Set, Model, Query, Rule} = __webpack_require__("L78F"));

new Rule("potof").schema(function() {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.belongs_to("face");
  this.belongs_to("winner");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  this.habtm("roles");
  this.habtm("ables");
  this.scope(function(all) {
    return {
      catalog: function(book_id, part_id, sort, order) {
        var a1, a2;
        [a1, a2] = sort.split(".");
        if ("say" === a1) {
          sort = function(o) {
            return o.say(part_id)[a2];
          };
        }
        return Query.books.find(book_id).potofs.sort(sort, order);
      }
    };
  });
  return this.model = class model extends this.model {
    say(part_id) {
      var i, idx, len, o, ref, ref1;
      ref = ["SS", "GS", "VS"];
      for (i = 0, len = ref.length; i < len; i++) {
        idx = ref[i];
        if (o = (ref1 = this.book.chats.reduce.potof[`${part_id}-${idx}`]) != null ? ref1[this.id] : void 0) {
          return o;
        }
      }
      return {
        count: 0,
        all: 0,
        max: null,
        min: null
      };
    }

    say_id(part_id) {
      var max_is, ref, ref1;
      ({max_is} = this.say(part_id));
      return (ref = max_is != null ? (ref1 = max_is.phase) != null ? ref1.handle : void 0 : void 0) != null ? ref : "TSAY";
    }

    find(q, keys, cb = function(o) {
        return o;
      }) {
      var i, key, len, o;
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        o = q.find(`${this._id}-${key}`);
        if (!o) {
          continue;
        }
        o = cb(o);
        if (!o) {
          continue;
        }
        return o;
      }
    }

    static deploy() {
      var _id, able_id_set, base, card, i, j, job, len, len1, name, ref, ref1, ref2, ref3, role_id_set;
      if (this.face != null) {
        ({job, name} = this.face);
      }
      this.head = [this.job || job, this.name || name].join(" ");
      role_id_set = {};
      able_id_set = {};
      ref = this.cards.list;
      for (i = 0, len = ref.length; i < len; i++) {
        card = ref[i];
        if (!card.role) {
          continue;
        }
        role_id_set[card.role_id] = true;
        switch (card.idx) {
          case "request":
            delete role_id_set[card.role_id];
        }
        ref1 = card.role.ables.list;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          ({_id} = ref1[j]);
          able_id_set[_id] = true;
        }
      }
      this.role_ids = Object.keys(role_id_set);
      this.able_ids = Object.keys(able_id_set);
      this.role_labels = this.roles.list.map((o) => {
        var head, ref2, stat;
        stat = this.stats.find(`${this._id}-${o._id}`);
        head = (ref2 = stat != null ? stat.label : void 0) != null ? ref2 : "";
        return `${head}${o.label}`;
      });
      this.live = (ref2 = this.cards.find(`${this._id}-live`)) != null ? ref2 : this.request = this.cards.find(`${this._id}-request`);
      this.commit = this.stats.find(`${this._id}-commit`);
      this.give = this.stats.find(`${this._id}-give`);
      this.winner_id = this.find(this.cards, ["bond", "gift", "role", "live"], function(o) {
        return o.role.win;
      });
      if (this.live) {
        this.live_class = this.live.role_id;
        if ((base = this.live).date == null) {
          base.date = 2e308;
        }
        switch (this.live.role_id) {
          case "suddendead":
          case "leave":
            this.win = "";
            break;
          default:
            if ((ref3 = this.book) != null ? ref3.winner_id : void 0) {
              if (this.book.winner_id === this.winner_id) {
                this.win = "勝利";
              } else {
                this.win = "敗北";
              }
            } else {
              this.win = "参加";
            }
        }
      }
      return this.winner_id != null ? this.winner_id : this.winner_id = "NONE";
    }

    static map_reduce(o, emit) {}

    static order(o, emit) {}

  };
});


/***/ }),

/***/ "a5dU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _nuxtLoading = __webpack_require__("F88d");

var _nuxtLoading2 = _interopRequireDefault(_nuxtLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//

var layouts = {

  "_default": function _default() {
    return __webpack_require__.e/* import() */(20).then(__webpack_require__.bind(null, "Ma2J")).then(function (m) {
      return m.default || m;
    });
  }

};

var resolvedLayouts = {};

exports.default = {
  head: { "title": "人狼議事", "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=0.5, shrink-to-fit=no" }, { "hid": "description", "content": "Nuxt.js project" }, { "href": "mailto:7korobi@gmail.com" }], "link": [{ "rel": "manifest", "href": "/manifest.json" }, { "rel": "icon", "type": "image/x-icon", "href": "/favicon.ico" }, { "href": "mailto:7korobi@gmail.com" }], "script": [{ "src": "//s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt/monaco-editor/vs/loader.js", "type": "text/javascript", "charset": "utf8" }], "style": [] },
  data: function data() {
    return {
      layout: null,
      layoutName: ''
    };
  },
  beforeCreate: function beforeCreate() {
    _vue2.default.util.defineReactive(this, 'nuxt', this.$options._nuxt);
  },
  created: function created() {
    // Add this.$nuxt in child instances
    _vue2.default.prototype.$nuxt = this;
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this;
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error;
  },
  mounted: function mounted() {
    this.$loading = this.$refs.loading;
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {
    errorChanged: function errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail();
        if (this.$loading.finish) this.$loading.finish();
      }
    },
    setLayout: function setLayout(layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default';
      this.layoutName = layout;
      var _layout = '_' + layout;
      this.layout = resolvedLayouts[_layout];
      return this.layout;
    },
    loadLayout: function loadLayout(layout) {
      var _this = this;

      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default';
      var _layout = '_' + layout;
      if (resolvedLayouts[_layout]) {
        return _promise2.default.resolve(resolvedLayouts[_layout]);
      }
      return layouts[_layout]().then(function (Component) {
        resolvedLayouts[_layout] = Component;
        delete layouts[_layout];
        return resolvedLayouts[_layout];
      }).catch(function (e) {
        if (_this.$nuxt) {
          return _this.$nuxt.error({ statusCode: 500, message: e.message });
        }
      });
    }
  },
  components: {
    NuxtLoading: _nuxtLoading2.default
  }
};

/***/ }),

/***/ "aM4n":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"school","admin":"校内放送","maker":"校内放送","label":"私立七転学園"},"chr_npc":[{"label":"私立七転学園","csid":"school","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"華道部"},{"face_id":"c02","job":"校長"},{"face_id":"c03","job":"化学教師"},{"face_id":"c04","job":"ＳＯＳ団"},{"face_id":"c05","job":"留年生"},{"face_id":"c06","job":"保健体育教師"},{"face_id":"c07","job":"歴史教師"},{"face_id":"c08","job":"図書委員"},{"face_id":"c09","job":"動く銅像"},{"face_id":"c10","job":"ミーハー"},{"face_id":"c11","job":"優等生"},{"face_id":"c12","job":"用務員"},{"face_id":"c13","job":"生物教師"},{"face_id":"c14","job":"コーラス部"},{"face_id":"c15","job":"地理教師"},{"face_id":"c16","job":"食堂のおねいさん"},{"face_id":"c17","job":"演劇部顧問"},{"face_id":"c18","job":"数学教師"},{"face_id":"c19","job":"チアリーダー"},{"face_id":"c20","job":"理事長の孫"},{"face_id":"c21","job":"球部顧問"},{"face_id":"c22","job":"農業科"},{"face_id":"c23","job":"現国教師"},{"face_id":"c24","job":"理事長"},{"face_id":"c25","job":"校長の孫"},{"face_id":"c26","job":"吹奏楽部"},{"face_id":"c27","job":"手芸部"},{"face_id":"c28","job":"文芸部"},{"face_id":"c29","job":"新聞部"},{"face_id":"c30","job":"飼育委員"},{"face_id":"c31","job":"漫画研究部"},{"face_id":"c32","job":"演劇部"},{"face_id":"c33","job":"演劇部"},{"face_id":"c34","job":"球児"},{"face_id":"c35","job":"体育教師"},{"face_id":"c36","job":"美術部"},{"face_id":"c37","job":"音楽教師"},{"face_id":"c38","job":"軽音楽部"},{"face_id":"c39","job":"家政科教師"},{"face_id":"c40","job":"教頭先生"},{"face_id":"c41","job":"登山部"},{"face_id":"c42","job":"生徒会執行部"},{"face_id":"c43","job":"番長"},{"face_id":"c44","job":"問題児"},{"face_id":"c45","job":"スケバン"},{"face_id":"c46","job":"保険医"},{"face_id":"c47","job":"転校生"},{"face_id":"c48","job":"美術教師"},{"face_id":"c49","job":"技術教師"},{"face_id":"c50","job":"風紀委員"},{"face_id":"c51","job":"幽霊部員"},{"face_id":"c52","job":"映画研究会"},{"face_id":"c53","job":"寮管理人"},{"face_id":"c54","job":"野球部"},{"face_id":"c55","job":"肖像画"},{"face_id":"c56","job":"世界史教師"},{"face_id":"c57","job":"修士"},{"face_id":"c58","job":"名誉教授"},{"face_id":"c59","job":"修士"},{"face_id":"c60","job":"ラクロス部"},{"face_id":"c61","job":"魚拓部"},{"face_id":"c62","job":"守衛"},{"face_id":"c63","job":"マネージャー"},{"face_id":"c64","job":"格闘技同好会"},{"face_id":"c65","job":"教育実習"},{"face_id":"c66","job":"茶道部顧問"},{"face_id":"c67","job":"購買部"},{"face_id":"c68","job":"後援者"},{"face_id":"c69","job":"陶芸部"},{"face_id":"c70","job":"先輩"},{"face_id":"c71","job":"帰宅部"},{"face_id":"c72","job":"ヴィジュアル系バンド部"},{"face_id":"c73","job":"チアガール"},{"face_id":"c74","job":"社交ダンス部"},{"face_id":"c75","job":"演奏講師"},{"face_id":"c76","job":"委員長"},{"face_id":"c77","job":"いきもの係"},{"face_id":"c78","job":"演劇部"},{"face_id":"c79","job":"水泳部"},{"face_id":"c80","job":"陸上部"},{"face_id":"c81","job":"科学部"},{"face_id":"c82","job":"ガリ勉"},{"face_id":"c83","job":"放送部"},{"face_id":"c99","job":"不登校児"},{"face_id":"c86","job":"柔道部"},{"face_id":"c94","job":"PTA会長"},{"face_id":"c92","job":"テニス部"},{"face_id":"c90","job":"ラグビー部"},{"face_id":"c95","job":"人体模型"},{"face_id":"c97","job":"駐在さん"},{"face_id":"c100","job":"サッカー部"},{"face_id":"c106","job":"水泳部顧問"},{"face_id":"c89","job":"新任教師"},{"face_id":"c91","job":"緑のおばさん"},{"face_id":"c93","job":"書道部"},{"face_id":"c107","job":"前理事長"},{"face_id":"c85","job":"おてんば"},{"face_id":"c105","job":"弓道部"},{"face_id":"c96","job":"助教授"},{"face_id":"c98","job":"教授"},{"face_id":"c101","job":"園芸部"},{"face_id":"c104","job":"剣道部"},{"face_id":"c108","job":"無線部"},{"face_id":"c88","job":"栄養士"},{"face_id":"c84","job":"講師"},{"face_id":"c109","job":"占い研究会"},{"face_id":"c102","job":"前校長"},{"face_id":"c87","job":"天文部"},{"face_id":"c103","job":"オカルト同好会"}]}

/***/ }),

/***/ "aXYL":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({Set, Model, Query, Rule} = __webpack_require__("L78F"));

new Rule("card").schema(function() {
  this.order("write_at");
  this.path("folder", "book", "part", "potof");
  this.belongs_to("role");
  Object.assign(this.model_property, {
    stat: {
      get: function() {
        return Query.stats.find(`${this.potof_id}-${this.idx}`);
      }
    }
  });
  return this.scope(function(all) {
    return {
      for_part: function(part_id) {
        return all.where({part_id});
      },
      for_phase: function(phase_id) {
        return all.where({phase_id});
      }
    };
  });
});

new Rule("stat").schema(function() {
  this.path("folder", "book", "part", "potof");
  this.belongs_to("able");
  Object.assign(this.model_property, {
    card: {
      get: function() {
        return Query.stats.find(`${this.potof_id}-${this.idx}`);
      }
    }
  });
  return this.model = class model extends this.model {
    static deploy() {
      return this.able_id = this.idx;
    }

  };
});

new Rule("role").schema(function() {
  this.habtm("ables");
  return this.model = class model extends this.model {
    static map_reduce(o, emit) {
      return emit("group", o.group, {
        list: o
      });
    }

  };
});

new Rule("trap").schema(function() {
  this.order("write_at");
  this.belongs_to("book");
  return this.belongs_to("potof");
});

new Rule("able").schema(function() {
  return this.scope(function(all) {});
});

Set.role.set(__webpack_require__("Un20"));

Set.trap.set(__webpack_require__("QtWo"));

Set.able.set(__webpack_require__("8Mgz"));


/***/ }),

/***/ "ax3d":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("e8AB")('keys');
var uid = __webpack_require__("3Eo+");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "bRrM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var dP = __webpack_require__("evD5");
var DESCRIPTORS = __webpack_require__("+E39");
var SPECIES = __webpack_require__("dSzd")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "bTan":
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"mad","admin":"闇の呟き","maker":"天上の調べ","label":"エクスパンション・セット「狂騒議事」"},"chr_npc":[{"label":"エクスパンション・セット「狂騒議事」","csid":"mad","face_id":"c83","say_0":"どうせ、殺されるわみんな。…みんな\n\n\n/* 死ねばいいのに */","say_1":"１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"エクスパンション・セット「狂騒議事」（ヤヘイ）","csid":"mad_mad05","face_id":"mad05","say_0":"…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","say_1":"…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"}],"chr_job":[{"face_id":"c103","job":"厭世家"},{"face_id":"c83","job":"虹追い"},{"face_id":"mad01","job":"青い鳥"},{"face_id":"mad02","job":"蟻塚崩し"},{"face_id":"mad03","job":"露店巡り"},{"face_id":"mad04","job":"酸味探し"},{"face_id":"mad05","job":"天井手繰り"},{"face_id":"mad06","job":"隠れん坊"},{"face_id":"mad07","job":"早口言葉"},{"face_id":"mad08","job":"妄執の誓い"},{"face_id":"mad09","job":"隣席座り"},{"face_id":"mad10","job":"追憶探り"},{"face_id":"mad11","job":"乱痴気"}]}

/***/ }),

/***/ "bWHa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.nuxt.err)?_c('nuxt-error',{attrs:{"error":_vm.nuxt.err}}):_c('nuxt-child',{key:_vm.routerViewKey})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "crlp":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var LIBRARY = __webpack_require__("O4g8");
var wksExt = __webpack_require__("Kh4W");
var defineProperty = __webpack_require__("evD5").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "cs8z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_vue__ = __webpack_require__("/V62");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_41498709_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nuxt_vue__ = __webpack_require__("bWHa");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_nuxt_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_41498709_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nuxt_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "d7EF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__("us/S");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__("BO1k");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "dNDb":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "dSzd":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("e8AB")('wks');
var uid = __webpack_require__("3Eo+");
var Symbol = __webpack_require__("7KvD").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "dY0y":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("dSzd")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "e6n0":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("evD5").f;
var has = __webpack_require__("D2L2");
var TAG = __webpack_require__("dSzd")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "e8AB":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "evD5":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var toPrimitive = __webpack_require__("MmMw");
var dP = Object.defineProperty;

exports.f = __webpack_require__("+E39") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "exGp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ "fJUb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var isObject = __webpack_require__("EqjI");
var newPromiseCapability = __webpack_require__("qARP");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "fWfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7KvD");
var has = __webpack_require__("D2L2");
var DESCRIPTORS = __webpack_require__("+E39");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var META = __webpack_require__("06OY").KEY;
var $fails = __webpack_require__("S82l");
var shared = __webpack_require__("e8AB");
var setToStringTag = __webpack_require__("e6n0");
var uid = __webpack_require__("3Eo+");
var wks = __webpack_require__("dSzd");
var wksExt = __webpack_require__("Kh4W");
var wksDefine = __webpack_require__("crlp");
var enumKeys = __webpack_require__("Xc4G");
var isArray = __webpack_require__("7UMu");
var anObject = __webpack_require__("77Pl");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var createDesc = __webpack_require__("X8DO");
var _create = __webpack_require__("Yobk");
var gOPNExt = __webpack_require__("Rrel");
var $GOPD = __webpack_require__("LKZe");
var $DP = __webpack_require__("evD5");
var $keys = __webpack_require__("lktj");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("n0T6").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("NpIQ").f = $propertyIsEnumerable;
  __webpack_require__("1kS7").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("O4g8")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("hJx8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "fZjL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("jFbC"), __esModule: true };

/***/ }),

/***/ "fkB2":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "fxRn":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("g8Ux");


/***/ }),

/***/ "g8Ux":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var get = __webpack_require__("3fs2");
module.exports = __webpack_require__("FeBl").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "gXG+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("a5dU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c734467_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("xp6K");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_presets_vue_app_env_targets_browsers_5_forceAllTransforms_true_babelrc_false_cacheDirectory_false_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c734467_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "h65t":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var defined = __webpack_require__("52gC");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "hJx8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var createDesc = __webpack_require__("X8DO");
module.exports = __webpack_require__("+E39") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "hKoQ":
/***/ (function(module, exports) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "iWRh":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".nuxt-progress{position:fixed;top:0;left:0;right:0;height:2px;width:0;-webkit-transition:width .2s,opacity .4s;transition:width .2s,opacity .4s;opacity:1;background-color:#efc14e;z-index:999999}", ""]);

// exports


/***/ }),

/***/ "jFbC":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Cdx3");
module.exports = __webpack_require__("FeBl").Object.keys;


/***/ }),

/***/ "jKW+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("kM2E");
var newPromiseCapability = __webpack_require__("qARP");
var perform = __webpack_require__("dNDb");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "jSQ8":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {module.export = {
  default: {
    props: ['error'],
    data: function() {}
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

/***/ }),

/***/ "jyFz":
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("SldL");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "kM2E":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var ctx = __webpack_require__("+ZMJ");
var hide = __webpack_require__("hJx8");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "kVCx":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("IWnm");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("6933c240", content, true);

/***/ }),

/***/ "knuC":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "lOnJ":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "lktj":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("Ibhu");
var enumBugKeys = __webpack_require__("xnc9");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "m9vt":
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = {
  namespaced: true,
  state: function() {
    return {
      top: 0,
      center: 0,
      bottom: 0,
      left: 0,
      right: 0,
      horizon: 0,
      height: 0,
      width: 0,
      potofs: {
        sort: "live",
        order: "asc"
      },
      shows: [],
      target: null
    };
  },
  mutations: {
    center: function(state, {top, left, height, width}) {
      state.height = parseInt(height);
      state.horizon = parseInt(height / 2);
      state.width = parseInt(width);
      state.top = parseInt(top);
      state.center = parseInt(top + height / 2);
      state.bottom = parseInt(top + height);
      state.left = parseInt(left);
      return state.right = parseInt(left + width);
    },
    focus: function(state, chat_id) {
      var el, rect, rect_center, top;
      if (typeof window === "undefined" || window === null) {
        return;
      }
      if (!(el = window[chat_id])) {
        return;
      }
      if (!(rect = el.getBoundingClientRect())) {
        return;
      }
      rect_center = rect.top + rect.height / 2;
      top = rect_center - state.horizon;
      // console.log " go to #{chat_id} as #{top}px"
      return window.scrollBy(0, top);
    },
    shows: function(state, a) {
      state.shows = a;
    },
    update: function(state, o) {
      var key, val;
      for (key in state) {
        val = state[key];
        if (o[key]) {
          state[key] = _extends({}, val, o[key]);
        }
      }
    }
  }
};


/***/ }),

/***/ "mClu":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("+E39"), 'Object', { defineProperty: __webpack_require__("evD5").f });


/***/ }),

/***/ "mQke":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule,
  indexOf = [].indexOf;

({Model, Query, Rule} = __webpack_require__("L78F"));

new Rule("chat").schema(function() {
  var anker, blank, pages;
  this.path("folder", "book", "part", "phase");
  this.belongs_to("section");
  this.belongs_to("potof");
  blank = [];
  blank.all = 0;
  pages = function(group, q) {
    return function(hides, part_id) {
      return q.where(function(o) {
        var ref, ref1;
        return part_id === o.part_id && !(ref = o.potof_id, indexOf.call(hides, ref) >= 0) && (ref1 = o.phase.group, indexOf.call(group, ref1) >= 0);
      });
    };
  };
  this.scope(function(all) {
    return {
      memo: pages('M', all),
      title: pages('SAI', all.where(function(o) {
        var ref;
        return (ref = o.phase.handle) === 'MAKER' || ref === 'ADMIN' || ref === 'public';
      })),
      full: pages('SAI', all),
      normal: pages('SAI', all.where(function(o) {
        var ref;
        return (ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'public' || ref === 'private';
      })),
      solo: pages('SAI', all.where(function(o) {
        var ref;
        return (ref = o.phase.handle) === 'TSAY' || ref === 'private';
      })),
      extra: pages('SAI', all.where(function(o) {
        var ref;
        return !((ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'dark' || ref === 'GSAY' || ref === 'TSAY' || ref === 'public');
      })),
      rest: pages('SAI', all.where(function(o) {
        var ref;
        return (ref = o.phase.handle) === 'GSAY';
      })),
      ankers: function(book_id, a) {
        var ids;
        ids = a.map(function(idx) {
          return book_id + idx;
        });
        return all.where({
          _id: ids
        }).sort("write_at", "desc");
      },
      now: function(hides) {
        return {
          memo: function(part_id) {
            var ref;
            return (ref = all.memo(hides, part_id).reduce.last) != null ? ref : blank;
          },
          memos: function(part_id) {
            var ref;
            return (ref = all.memo(hides, part_id).reduce.list) != null ? ref : blank;
          },
          title: function(part_id) {
            var ref;
            return (ref = all.title(hides, part_id).reduce.list) != null ? ref : blank;
          },
          full: function(part_id) {
            var ref;
            return (ref = all.full(hides, part_id).reduce.list) != null ? ref : blank;
          },
          normal: function(part_id) {
            var ref;
            return (ref = all.normal(hides, part_id).reduce.list) != null ? ref : blank;
          },
          solo: function(part_id) {
            var ref;
            return (ref = all.solo(hides, part_id).reduce.list) != null ? ref : blank;
          },
          extra: function(part_id) {
            var ref;
            return (ref = all.extra(hides, part_id).reduce.list) != null ? ref : blank;
          },
          rest: function(part_id) {
            var ref;
            return (ref = all.rest(hides, part_id).reduce.list) != null ? ref : blank;
          }
        };
      }
    };
  });
  anker = {
    belongs_to: 'chats',
    sort: ["count", "desc"]
  };
  return this.model = class model extends this.model {
    static deploy() {
      this.q = {
        mention_ids: []
      };
      return this.log = this.log.replace(/<mw +(..)(\d+),(\d+),(.+?)>/g, (str, phase_idx, $1, part_idx, code) => {
        var idx, mention_id;
        if (phase_idx === 'MM') {
          phase_idx = this.phase_id.slice(-2)[0] + 'M';
        }
        idx = Number($1);
        this.q.mention_ids.push(mention_id = [this.book_id, part_idx, phase_idx, idx].join("-"));
        return `<abbr chat_id="${mention_id}">&gt;&gt;${code}</abbr>`;
      });
    }

    static map_reduce(o, emit) {
      var i, len, mention_id, ref, results;
      emit("last", [o.potof_id, o.phase_id].join('+'), {
        max: o.write_at
      });
      emit("say", {
        max: o.write_at,
        min: o.write_at,
        count: 1,
        all: o.log.length
      });
      if (o.phase_id.match(/-[SGV]S$/)) {
        emit("potof", o.phase_id, o.potof_id, {
          count: 1,
          all: o.log.length,
          max: o.write_at,
          min: o.write_at
        });
      }
      ref = o.q.mention_ids;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        mention_id = ref[i];
        emit("mention", mention_id, {
          count: 1
        });
        results.push(emit("mention_to", mention_id, o.id, {
          count: 1
        }));
      }
      return results;
    }

    static order(o, emit) {
      var i, len, mention_id, ref, results;
      emit("last", {
        get: "max_is",
        sort: ["max_is.write_at", "desc"],
        page_by: 25
      });
      emit("list", {
        sort: ["write_at", "asc"],
        page_by: 25
      });
      emit("mention", anker);
      ref = o.q.mention_ids;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        mention_id = ref[i];
        results.push(emit("mention_to", mention_id, anker));
      }
      return results;
    }

  };
});


/***/ }),

/***/ "msXi":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("77Pl");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "mtxM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = __webpack_require__("d7EF");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.createRouter = createRouter;

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__("/ocq");

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var _26460e66 = function _26460e66() {
	return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, "/TYz")).then(function (m) {
		return m.default || m;
	});
};
var _d988a500 = function _d988a500() {
	return __webpack_require__.e/* import() */(13).then(__webpack_require__.bind(null, "sBOl")).then(function (m) {
		return m.default || m;
	});
};
var _20cded32 = function _20cded32() {
	return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, "yoqb")).then(function (m) {
		return m.default || m;
	});
};
var _8471841e = function _8471841e() {
	return __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, "mVin")).then(function (m) {
		return m.default || m;
	});
};
var _126e656c = function _126e656c() {
	return __webpack_require__.e/* import() */(18).then(__webpack_require__.bind(null, "t/2a")).then(function (m) {
		return m.default || m;
	});
};
var _58095ef8 = function _58095ef8() {
	return __webpack_require__.e/* import() */(22).then(__webpack_require__.bind(null, "Xlu5")).then(function (m) {
		return m.default || m;
	});
};
var _74156ee2 = function _74156ee2() {
	return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, "/lSi")).then(function (m) {
		return m.default || m;
	});
};
var _6fbb897d = function _6fbb897d() {
	return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "6fyr")).then(function (m) {
		return m.default || m;
	});
};
var _718150c0 = function _718150c0() {
	return __webpack_require__.e/* import() */(15).then(__webpack_require__.bind(null, "vnzY")).then(function (m) {
		return m.default || m;
	});
};
var _0bc1fc38 = function _0bc1fc38() {
	return __webpack_require__.e/* import() */(16).then(__webpack_require__.bind(null, "NCHk")).then(function (m) {
		return m.default || m;
	});
};
var _3f090d08 = function _3f090d08() {
	return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, "7bU7")).then(function (m) {
		return m.default || m;
	});
};
var _7012b248 = function _7012b248() {
	return __webpack_require__.e/* import() */(19).then(__webpack_require__.bind(null, "5P2d")).then(function (m) {
		return m.default || m;
	});
};
var _486a8927 = function _486a8927() {
	return __webpack_require__.e/* import() */(17).then(__webpack_require__.bind(null, "91pB")).then(function (m) {
		return m.default || m;
	});
};
var _42ad62d8 = function _42ad62d8() {
	return __webpack_require__.e/* import() */(14).then(__webpack_require__.bind(null, "0jBM")).then(function (m) {
		return m.default || m;
	});
};
var _eef29fda = function _eef29fda() {
	return __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, "dcAs")).then(function (m) {
		return m.default || m;
	});
};
var _beb3c9bc = function _beb3c9bc() {
	return __webpack_require__.e/* import() */(21).then(__webpack_require__.bind(null, "cf/Q")).then(function (m) {
		return m.default || m;
	});
};
var _4aa7c725 = function _4aa7c725() {
	return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, "ry+2")).then(function (m) {
		return m.default || m;
	});
};
var _75f2aa9e = function _75f2aa9e() {
	return __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, "FaDS")).then(function (m) {
		return m.default || m;
	});
};
var _08e1dd12 = function _08e1dd12() {
	return __webpack_require__.e/* import() */(11).then(__webpack_require__.bind(null, "vARB")).then(function (m) {
		return m.default || m;
	});
};
var _3c51e96e = function _3c51e96e() {
	return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, "99JJ")).then(function (m) {
		return m.default || m;
	});
};
var _10605aa9 = function _10605aa9() {
	return __webpack_require__.e/* import() */(23).then(__webpack_require__.bind(null, "BiXW")).then(function (m) {
		return m.default || m;
	});
};
var _16c3827f = function _16c3827f() {
	return __webpack_require__.e/* import() */(12).then(__webpack_require__.bind(null, "96r1")).then(function (m) {
		return m.default || m;
	});
};
var _57865a76 = function _57865a76() {
	return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "k/fJ")).then(function (m) {
		return m.default || m;
	});
};

var scrollBehavior = function scrollBehavior(to, from, savedPosition) {
	var basic, book, has_top;
	book = function book(idx_limit, to, from) {
		var _map = [from, to].map(function (o) {
			var name, page, part, ref;
			name = o.params.mode || o.name;
			part = (ref = o.params.idx) != null ? ref.split("-").slice(0, +idx_limit + 1 || 9e9).join("-") : void 0;
			page = o.query.page;
			if ('back' === page) {
				page = void 0;
			}
			return name + ' ' + part + ' ' + page;
		});

		var _map2 = (0, _slicedToArray3.default)(_map, 2);

		from = _map2[0];
		to = _map2[1];

		if (from !== to) {
			console.log('scroll to TOP (' + from + ' != ' + to + ')');
			return {
				x: 0,
				y: 0
			};
		}
	};
	basic = function basic(has_top, to) {
		var _map3 = [from, to].map(function (o) {
			return o.path;
		});

		var _map4 = (0, _slicedToArray3.default)(_map3, 2);

		from = _map4[0];
		to = _map4[1];

		switch (false) {
			case from === to:
				console.log('scroll to TOP (' + from + ' != ' + to + ')');
				return {
					x: 0,
					y: 0
				};
			case !has_top:
				console.log("scroll to TOP (has scrollToTop)");
				return {
					x: 0,
					y: 0
				};
		}
	};
	switch (false) {
		case !savedPosition:
			console.log("scroll restore", savedPosition);
			return savedPosition;
		case !to.hash:
			console.log("scroll to " + to.hash);
			return {
				selector: to.hash
			};
		default:
			switch (to.name) {
				case "sow-village-idx-mode":
					return book(2, to, from);
				case "sow-village-idx-anker":
					return book(1, to, from);
				default:
					has_top = to.matched.some(function (r) {
						return r.components.default.options.scrollToTop;
					});
					return basic(has_top, to, from);
			}
	}
};

function createRouter() {
	return new _vueRouter2.default({
		mode: 'history',
		base: '/',
		linkActiveClass: 'nuxt-link-active',
		linkExactActiveClass: 'nuxt-link-exact-active',
		scrollBehavior: scrollBehavior,
		routes: [{
			path: "/",
			component: _26460e66,
			name: "index"
		}, {
			path: "/rule-guide",
			component: _d988a500,
			name: "rule-guide"
		}, {
			path: "/mypage",
			component: _20cded32,
			name: "mypage"
		}, {
			path: "/character-tag",
			component: _8471841e,
			name: "character-tag"
		}, {
			path: "/demo",
			component: _126e656c,
			name: "demo"
		}, {
			path: "/book",
			component: _58095ef8,
			name: "book"
		}, {
			path: "/demo/oauth",
			component: _74156ee2,
			name: "demo-oauth"
		}, {
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
		}, {
			path: "/demo/names",
			component: _718150c0,
			name: "demo-names"
		}, {
			path: "/demo/marked",
			component: _0bc1fc38,
			name: "demo-marked"
		}, {
			path: "/sow/village",
			component: _3f090d08,
			name: "sow-village"
		}, {
			path: "/book/edit",
			component: _7012b248,
			name: "book-edit"
		}, {
			path: "/demo/markdown",
			component: _486a8927,
			name: "demo-markdown"
		}, {
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		}, {
			path: "/demo/chats",
			component: _eef29fda,
			name: "demo-chats"
		}, {
			path: "/demo/books",
			component: _beb3c9bc,
			name: "demo-books"
		}, {
			path: "/summary/faces/:id",
			component: _4aa7c725,
			name: "summary-faces-id"
		}, {
			path: "/sow/village/:idx/editor",
			component: _75f2aa9e,
			name: "sow-village-idx-editor"
		}, {
			path: "/sow/village/:idx/anker",
			component: _08e1dd12,
			name: "sow-village-idx-anker"
		}, {
			path: "/sow/village/:idx/:mode?",
			component: _3c51e96e,
			name: "sow-village-idx-mode"
		}, {
			path: "/book/:idx/editor",
			component: _10605aa9,
			name: "book-idx-editor"
		}, {
			path: "/book/:idx/anker",
			component: _16c3827f,
			name: "book-idx-anker"
		}, {
			path: "/book/:idx/:mode?",
			component: _57865a76,
			name: "book-idx-mode"
		}],
		fallback: false
	});
}

/***/ }),

/***/ "mvHQ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("qkKv"), __esModule: true };

/***/ }),

/***/ "n0T6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("Ibhu");
var hiddenKeys = __webpack_require__("xnc9").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "p3lE":
/***/ (function(module, exports) {

module.exports = {"HUMAN":{"label":"村人陣営","group":"村人陣営","order":1,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HUMAN\" TARGET=\"_blank\">村人陣営</A></b>\n<br>\n人間(妖精や人外の者を除く)の数が人狼以下になるまでに人狼と妖精が全滅すれば勝利です。\n<br>\nただし、狼を全滅させた時点で妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"EVIL":{"label":"裏切りの陣営","group":"敵側の人間","label_human":"敵側の人間","order":2,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_EVIL\" TARGET=\"_blank\">裏切りの陣営</A></b>\n<br>\n村人・恋人が敗北すれば勝利者の一員に加わります。\n<br>\nあなたは破滅を望んでいるのです。人狼や妖精やそれ以外の勝利、または、誰もいなくなることを目指しましょう。"},"WOLF":{"label":"人狼陣営","group":"人狼陣営","label_human":"人狼陣営の人間","order":3,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_WOLF\" TARGET=\"_blank\">人狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を人狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させれば勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"LONEWOLF":{"label":"一匹狼","group":"その他","order":4,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LONEWOLF\" TARGET=\"_blank\">一匹狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を一匹狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させ、かつ、人狼陣営の狼が生きていなければ勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも勝利を掻っ攫うもの達が存在します。"},"PIXI":{"label":"妖精","group":"妖精","order":5,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_PIXI\" TARGET=\"_blank\">妖精陣営</A></b>\n<br>\n人狼が全滅するか、人間(妖精や人外の者を除く)の数が人狼と同数以下まで減るまで「生き残れば」勝利です。\n<br>\nただし、恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"OTHER":{"label":"その他","group":"その他","order":6},"GURU":{"label":"笛吹き","group":"その他","order":7,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_GURU\" TARGET=\"_blank\">笛吹き</A></b>\n<br>\n笛吹き以外の生存者が勧誘された者だけになれば勝利となります。笛吹き自身は、最終的に生き残っていなくとも構いません。\n<br>\nただし、横から勝利を掻っ攫うもの達が存在します。"},"LOVER":{"label":"恋人陣営","group":"その他","order":8,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LOVER\" TARGET=\"_blank\">恋人陣営</A></b>\n<br>\n恋人達だけが生き残る、もしくはいずこかの陣営が勝利を手にしたとき、絆の恋人達が生存していれば勝利です。\n<br>\nただし、ひとりだけ蘇生したなどの不幸で、恋を成就できない恋人は、勝利しません。"},"HATER":{"label":"邪気陣営","group":"その他","order":9,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HATER\" TARGET=\"_blank\">邪気陣営</A></b>\n<br>\nいずこかの陣営が勝利を手にしたとき、運命に決着をつけていれば勝利します。決着とは、絆の天敵をすべて倒し、一人だけが生き残っていることです。\n殺し合いの絆を断ち切りましょう。絆の相手が死んでも、後を追うことはありません。\n<br>\n絆の天敵とは、たとえあなた自身には関係のなくとも、あらゆる絆を結んでいるもの全てを指します。"},"DISH":{"label":"据え膳","group":"その他","order":10,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_DISH\" TARGET=\"_blank\">据え膳</A></b>\n<br>\nすべてに決着がついたとき、あなたが狼の襲撃、もしくは賞金稼の道連れにより死亡していれば、勝利者の一員に加わります。"},"NONE":{"label":"―","group":"その他","order":98,"help":"あなたは勝負を眺めています。勝利したり、敗北したりといったことはありません。"},"MOB":{"label":"見物人","group":"その他","order":99,"help":"あなたは<b>_ROLE_の<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MOB\" TARGET=\"_blank\">見物人</A></b>です。いかなる陣営の人数にも含まれません。"},"LEAVE":{"label":"―","group":"その他","order":100,"help":"あなたは村を去りました。勝利したり、敗北したりといったことは、もうありません。"}}

/***/ }),

/***/ "pFYg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("Zzip");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("5QVw");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "qARP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("lOnJ");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "qcny":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NuxtError = exports.createApp = undefined;

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__("exGp");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createApp = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ssrContext) {
    var router, store, app, next, route, path, ctx, inject;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            router = (0, _router.createRouter)();
            store = (0, _store.createStore)();

            // Create Root instance
            // here we inject the router and store to all child components,
            // making them available everywhere as `this.$router` and `this.$store`.

            app = (0, _extends3.default)({
              router: router,
              store: store,
              _nuxt: {
                defaultTransition: defaultTransition,
                transitions: [defaultTransition],
                setTransitions: function setTransitions(transitions) {
                  if (!Array.isArray(transitions)) {
                    transitions = [transitions];
                  }
                  transitions = transitions.map(function (transition) {
                    if (!transition) {
                      transition = defaultTransition;
                    } else if (typeof transition === 'string') {
                      transition = (0, _assign2.default)({}, defaultTransition, { name: transition });
                    } else {
                      transition = (0, _assign2.default)({}, defaultTransition, transition);
                    }
                    return transition;
                  });
                  this.$options._nuxt.transitions = transitions;
                  return transitions;
                },

                err: null,
                dateErr: null,
                error: function error(err) {
                  err = err || null;
                  if (typeof err === 'string') {
                    err = { statusCode: 500, message: err };
                  }
                  var _nuxt = this._nuxt || this.$options._nuxt;
                  _nuxt.dateErr = Date.now();
                  _nuxt.err = err;
                  return err;
                }
              }
            }, _App2.default);

            // Make app available in store

            store.app = app;

            next = ssrContext ? ssrContext.next : function (location) {
              return app.router.push(location);
            };
            route = void 0;

            if (ssrContext) {
              route = router.resolve(ssrContext.url).route;
            } else {
              path = (0, _utils.getLocation)(router.options.base);

              route = router.resolve(path).route;
            }
            ctx = (0, _utils.getContext)({
              isServer: !!ssrContext,
              isClient: !ssrContext,
              route: route,
              next: next,
              error: app._nuxt.error.bind(app),
              store: store,
              req: ssrContext ? ssrContext.req : undefined,
              res: ssrContext ? ssrContext.res : undefined,
              beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined
            }, app);

            inject = function inject(key, value) {
              if (!key) throw new Error('inject(key, value) has no key provided');
              if (!value) throw new Error('inject(key, value) has no value provided');
              key = '$' + key;
              // Add into app
              app[key] = value;
              // Add into vm
              _vue2.default.use(function () {
                var installKey = '__nuxt_' + key + '_installed__';
                if (_vue2.default[installKey]) return;
                _vue2.default[installKey] = true;
                if (!_vue2.default.prototype.hasOwnProperty(key)) {
                  (0, _defineProperty2.default)(_vue2.default.prototype, key, {
                    get: function get() {
                      return this.$root.$options[key];
                    }
                  });
                }
              });

              // Add into store
              store[key] = app[key];
            };

            if (true) {
              // Replace store state before plugins execution
              if (window.__NUXT__ && window.__NUXT__.state) {
                store.replaceState(window.__NUXT__.state);
              }
            }

            if (true) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return new _promise2.default(function (resolve, reject) {
              router.push(ssrContext.url, resolve, reject);
            });

          case 13:
            return _context.abrupt('return', {
              app: app,
              router: router,
              store: store
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createApp(_x) {
    return _ref.apply(this, arguments);
  };
}();

__webpack_require__("MU8w");

var _vue = __webpack_require__("/5sW");

var _vue2 = _interopRequireDefault(_vue);

var _vueMeta = __webpack_require__("p3jY");

var _vueMeta2 = _interopRequireDefault(_vueMeta);

var _router = __webpack_require__("mtxM");

var _noSsr = __webpack_require__("0F0d");

var _noSsr2 = _interopRequireDefault(_noSsr);

var _nuxtChild = __webpack_require__("HBB+");

var _nuxtChild2 = _interopRequireDefault(_nuxtChild);

var _nuxtLink = __webpack_require__("WRRc");

var _nuxtLink2 = _interopRequireDefault(_nuxtLink);

var _error = __webpack_require__("To1F");

var _error2 = _interopRequireDefault(_error);

var _nuxt2 = __webpack_require__("cs8z");

var _nuxt3 = _interopRequireDefault(_nuxt2);

var _App = __webpack_require__("gXG+");

var _App2 = _interopRequireDefault(_App);

var _utils = __webpack_require__("YLfZ");

var _store = __webpack_require__("J2Ti");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component: <no-ssr>
_vue2.default.component(_noSsr2.default.name, _noSsr2.default);

// Component: <nuxt-child>
_vue2.default.component(_nuxtChild2.default.name, _nuxtChild2.default);

// Component: <nuxt-link>
_vue2.default.component(_nuxtLink2.default.name, _nuxtLink2.default);

// Component: <nuxt>`
_vue2.default.component(_nuxt3.default.name, _nuxt3.default);

// vue-meta configuration
_vue2.default.use(_vueMeta2.default, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

var defaultTransition = { "name": "page", "mode": "out-in", "appear": false, "appearClass": "appear", "appearActiveClass": "appear-active", "appearToClass": "appear-to" };

exports.createApp = createApp;
exports.NuxtError = _error2.default;

/***/ }),

/***/ "qio6":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var anObject = __webpack_require__("77Pl");
var getKeys = __webpack_require__("lktj");

module.exports = __webpack_require__("+E39") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "qkKv":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("FeBl");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "sB3e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "t8x9":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("77Pl");
var aFunction = __webpack_require__("lOnJ");
var SPECIES = __webpack_require__("dSzd")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "tBlR":
/***/ (function(module, exports) {

module.exports = {"TABULA":{"label":"タブラの人狼","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"MILLERHOLLOW":{"label":"ミラーズホロウ","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"LIVE_TABULA":{"label":"タブラの人狼（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"LIVE_MILLERHOLLOW":{"label":"ミラーズホロウ（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"TROUBLE":{"label":"Trouble☆Aliens","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"},"MISTERY":{"label":"深い霧の夜","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"VOV":{"disabled":true,"label":"狂犬病の谷","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"SECRET":{"label":"陰謀に集う胡蝶","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"}}

/***/ }),

/***/ "uh7V":
/***/ (function(module, exports) {

module.exports = {"sow":{"CAPTION":"人狼議事","disabled":true},"say5":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10},"point":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999},"count":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0},"lobby":{"CAPTION":"ロビー","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"say1":{"CAPTION":"静寂への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":1,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x1回/1act'","MAX_MESCNT":300},"say5x200":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 200字x5回/5act'","MAX_MESCNT":200},"say5x300":{"CAPTION":"小論文への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x5回/15act'","MAX_MESCNT":300},"saving":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"節約","HELP":"250字x20回/15act","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":10,"MAX_SPSAY":10,"MAX_WSAY":30,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":15,"MAX_MESCNT":250,"MAX_MESLINE":10},"wbbs":{"COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"人狼BBS","HELP":"200字x20回","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":5,"MAX_SPSAY":20,"MAX_WSAY":40,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":0,"MAX_MESCNT":200,"MAX_MESLINE":5},"euro":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"欧州","HELP":"（24h回復） 800字x30回/30act","RECOVERY":1,"MAX_SAY":30,"MAX_TSAY":999,"MAX_SPSAY":999,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":30,"MAX_ESAY":999,"MAX_SAY_ACT":30,"MAX_MESCNT":800,"MAX_MESLINE":20},"tiny":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"たりない","HELP":"（24h回復）（メモは20pt） 333pt/9act","RECOVERY":1,"MAX_SAY":333,"MAX_TSAY":999,"MAX_SPSAY":333,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":999,"MAX_SAY_ACT":9,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":300,"MAX_MESLINE":10},"weak":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 777pt/15act","RECOVERY":1,"MAX_SAY":777,"MAX_TSAY":777,"MAX_SPSAY":777,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 1200pt/24act","RECOVERY":1,"MAX_SAY":1200,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20,"for":["beta"]},"weak_braid":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 600pt++100pt/15act","RECOVERY":1,"MAX_SAY":600,"MAX_TSAY":600,"MAX_SPSAY":600,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":100,"MAX_ADDSAY":2,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 800pt++200pt/24act","RECOVERY":1,"MAX_SAY":800,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":200,"MAX_ADDSAY":2,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity_braid":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20}}

/***/ }),

/***/ "unZF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__("BO1k");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var files = __webpack_require__("+Y8d");
var filenames = files.keys();

function getModule(filename) {
  var file = files(filename);
  return file.default ? file.default : file;
}
var middleware = {};

// Generate the middleware
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = (0, _getIterator3.default)(filenames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var filename = _step.value;

    var name = filename.replace(/^\.\//, '').replace(/\.(js|ts|coffee)$/, '');
    middleware[name] = getModule(filename);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

exports.default = middleware;

/***/ }),

/***/ "uqUo":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var fails = __webpack_require__("S82l");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "us/S":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("Xd32"), __esModule: true };

/***/ }),

/***/ "uvw7":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({Model, Query, Rule, Set} = __webpack_require__("L78F"));

new Rule("book").schema(function() {
  this.order("write_at");
  this.path("folder");
  this.has_many("parts");
  this.has_many("phases");
  this.has_many("sections");
  this.has_many("chats");
  this.has_many("potofs");
  this.belongs_to("winner");
  Object.assign(this.model_property, {
    head: {
      get: function() {
        return `${this.idx}: ${this.label}`;
      }
    }
  });
  return this.scope(function(all) {
    return {};
  });
});

new Rule("winner").schema(function() {
  return this.scope(function(all) {});
});

new Rule("option").schema(function() {
  return this.scope(function(all) {});
});

new Rule("say").schema(function() {
  this.scope(function(all) {
    return {
      active: all.in({
        for: env.game.folder_id
      })
    };
  });
  return this.model = class model extends this.model {
    static deploy() {
      return this.for != null ? this.for : this.for = [];
    }

  };
});

new Rule("game").schema(function() {
  return this.scope(function(all) {});
});

Set.option.set(__webpack_require__("OmXk"));

Set.winner.set(__webpack_require__("p3lE"));

Set.say.set(__webpack_require__("uh7V"));

Set.game.set(__webpack_require__("tBlR"));


/***/ }),

/***/ "vFc/":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("TcQ7");
var toLength = __webpack_require__("QRG4");
var toAbsoluteIndex = __webpack_require__("fkB2");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "vIB/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("O4g8");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var hide = __webpack_require__("hJx8");
var has = __webpack_require__("D2L2");
var Iterators = __webpack_require__("/bQp");
var $iterCreate = __webpack_require__("94VQ");
var setToStringTag = __webpack_require__("e6n0");
var getPrototypeOf = __webpack_require__("PzxK");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "veq+":
/***/ (function(module, exports) {

module.exports = {"secret":{"label":"詳細は黒幕だけが知っています。","disabled":true,"role_ids_list":[]},"ultimate":{"label":"アルティメット","disabled":true,"role_ids_list":[]},"lover":{"label":"恋愛天使","disabled":true,"role_ids_list":[]},"hamster":{"label":"ハムスター","disabled":true,"role_ids_list":[]},"random":{"label":"ランダム","disabled":true,"role_ids_list":[]},"custom":{"label":"自由設定","role_ids_list":[]},"default":{"label":"標準","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","fanatic","medium","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","wisper","medium","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager","villager"]]},"mistery":{"label":"深い霧の夜","role_ids_list":[null,null,null,null,["villager","villager","seer","lonewolf"],["villager","villager","seer","lonewolf","alchemist"],["villager","villager","guard","lonewolf","alchemist","possess"],["villager","villager","guard","lonewolf","alchemist","decide","possess","fan"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","alchemist"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru","alchemist"]]},"test1st":{"label":"人狼審問試験壱型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess","villager"]]},"test2nd":{"label":"人狼審問試験弐型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_c":{"label":"人狼BBS-C国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_f":{"label":"人狼BBS-F国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_g":{"label":"人狼BBS-G国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager","villager"]]}}

/***/ }),

/***/ "vrxn":
/***/ (function(module, exports, __webpack_require__) {

var Finder, Mem, Model, Query, Rule, _, axios, titles;

({Model, Query, Rule, Finder} = Mem = __webpack_require__("L78F"));

axios = __webpack_require__("mtWM");

_ = __webpack_require__("M4fF");

titles = {
  SS: ["SSAY", "通常の発言"],
  SA: ["SSAY", "通常ACT"],
  VS: ["VSAY", "見物人発言"],
  VA: ["VSAY", "見物人のACT"],
  TS: ["TSAY", "独り言/内緒話"],
  TA: ["TSAY", "栞"],
  GS: ["GSAY", "墓下の発言"],
  GA: ["GSAY", "墓下のACT"],
  PS: ["SPSAY", "共鳴の会話"],
  PA: ["SPSAY", "共鳴のACT"],
  WS: ["WSAY", "人狼のささやき"],
  WA: ["WSAY", "人狼のACT"],
  XS: ["XSAY", "念話（念波の民）"],
  XA: ["XSAY", "念act（念波の民）"],
  BS: ["BSAY", "念話（蝙蝠人間）"],
  BA: ["BSAY", "念act（蝙蝠人間）"]
};

module.exports = {
  namespaced: true,
  state: function() {
    return {};
  },
  mutations: {
    faces: function(state, {data}) {
      var face, i, j, k, len, len1, len2, o, ref, ref1, ref2;
      ref = data.faces;
      for (i = 0, len = ref.length; i < len; i++) {
        o = ref[i];
        if (face = Query.faces.find(o._id.face_id)) {
          face.aggregate.log = o;
        }
      }
      ref1 = data.m_faces;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        o = ref1[j];
        if (face = Query.faces.find(o._id.face_id)) {
          face.aggregate.log.date_min = o.date_min;
        }
      }
      ref2 = data.sow_auths;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        o = ref2[k];
        if (face = Query.faces.find(o._id.face_id)) {
          face.aggregate.fav = o;
        }
      }
      return Mem.Finder.face.clear_cache();
    },
    face: function(state, {id, data}) {
      var face, folders, handle, key, keys, list, loghd, mestypes, o, per, sum, title;
      face = Query.faces.find(id);
      face.aggregate.log = data.faces[0];
      face.aggregate.log.date_min = data.m_faces[0].date_min;
      face.aggregate.sow_auths = _.sortBy(data.sow_auths, function(o) {
        return -o.story_ids.length;
      });
      face.aggregate.lives = _.sortBy(data.lives, function(o) {
        return -o.story_ids.length;
      });
      sum = 0;
      face.aggregate.lives = (function() {
        var i, len, ref, results;
        ref = face.aggregate.lives;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          o.role = Query.roles.find(o._id.live, "mob");
          if (o._id.live === "leave") {
            continue;
          }
          sum += o.story_ids.length;
          results.push(o);
        }
        return results;
      })();
      face.aggregate.lives.sum = sum;
      face.aggregate.roles = _.sortBy(data.roles, function(o) {
        return -o.story_ids.length;
      });
      sum = 0;
      face.aggregate.roles = (function() {
        var i, len, ref, results;
        ref = face.aggregate.roles;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          o.role = Query.roles.find(o._id.role_id, "mob");
          sum += o.story_ids.length;
          results.push(o);
        }
        return results;
      })();
      face.aggregate.roles.sum = sum;
      mestypes = _.keyBy(data.mestypes, '_id.mestype');
      sum = {
        handle: "dark",
        title: "－合計－",
        per: face.story_length,
        all: 0,
        max: 0,
        count: 0
      };
      face.aggregate.mestypes = (function() {
        var results;
        results = [];
        for (loghd in titles) {
          [handle, title] = titles[loghd];
          if (!(o = mestypes[loghd])) {
            continue;
          }
          sum.all += o.all;
          sum.count += o.count;
          if (sum.max < o.max) {
            sum.max = o.max;
          }
          per = o.story_ids.length;
          results.push(_.merge({handle, title, per}, o));
        }
        return results;
      })();
      face.aggregate.mestypes.push(sum);
      keys = face.aggregate.log.story_ids.map(function(key) {
        return key.split("-");
      });
      folders = _.groupBy(keys, function(o) {
        return o[0];
      });
      for (key in folders) {
        list = folders[key];
        folders[key] = _.sortBy(list, function(o) {
          return o[1] - 0;
        });
        folders[key].nation = Query.folders.find(key.toUpperCase()).nation;
      }
      face.aggregate.folders = _.sortBy(folders, function(list, key) {
        return -list.length;
      });
      return Mem.Finder.face.clear_cache();
    }
  },
  actions: {
    faces: async function({dispatch, state, commit, rootState}) {
      var data, status;
      ({status, data} = (await axios.get(`${env.url.store}/aggregate/faces/index.json`)));
      return commit("faces", {data});
    },
    face: async function({state, commit, rootState}, id) {
      var data, status;
      ({status, data} = (await axios.get(`${env.url.api}/aggregate/faces/${id}`)));
      return commit("face", {data, id});
    }
  }
};


/***/ }),

/***/ "woOf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("V3tA"), __esModule: true };

/***/ }),

/***/ "wwh6":
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule;

({Model, Query, Rule} = __webpack_require__("L78F"));

new Rule("part").schema(function() {
  this.order("chats.list.first.write_at");
  this.path("folder", "book");
  this.has_many("sections");
  this.has_many("phases");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  return this.scope(function(all) {
    return {};
  });
});


/***/ }),

/***/ "xGkn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("4mcu");
var step = __webpack_require__("EGZi");
var Iterators = __webpack_require__("/bQp");
var toIObject = __webpack_require__("TcQ7");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("vIB/")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "xH/j":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("hJx8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "xnc9":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "xp6K":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"__nuxt"}},[_c('nuxt-loading',{ref:"loading"}),(_vm.layout)?_c(_vm.nuxt.err ? 'nuxt' : _vm.layout,{tag:"component"}):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "yv6g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nuxt-progress",style:({
  'width': _vm.percent+'%',
  'height': _vm.height,
  'background-color': _vm.canSuccess? _vm.color : _vm.failedColor,
  'opacity': _vm.show ? 1 : 0
})})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "zD/G":
/***/ (function(module, exports) {

module.exports = {"all":{"label":"すべて","long":"「人狼議事 ちゃんぷる」のキャラクター","chr_set_ids":["all"]},"giji":{"label":"人狼議事","long":"「人狼議事」のキャラクター","tag_id":"all","chr_set_ids":["all","animal","school","ririnra"]},"shoji":{"label":"てやんでえ","long":"「和の国てやんでえ」のキャラクター","tag_id":"all","chr_set_ids":["all","wa"]},"travel":{"label":"帰還者議事","long":"「帰還者議事」のキャラクター","tag_id":"all","chr_set_ids":["all","time"]},"stratos":{"label":"明後日への道標","long":"「明後日への道標」のキャラクター","tag_id":"all","chr_set_ids":["all","SF"]},"myth":{"label":"はおうのひろば","long":"「はおうのひろば」のキャラクター","tag_id":"all","chr_set_ids":["all","changed"]},"asia":{"label":"大陸議事","long":"「大陸議事」のキャラクター","tag_id":"all","chr_set_ids":["all","ger"]},"marchen":{"label":"狂騒議事","long":"「狂騒議事」のキャラクター","tag_id":"all","chr_set_ids":["all","mad"]},"kid":{"label":"(児童)","long":"児童のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"young":{"label":"(若者)","long":"若者のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"middle":{"label":"(中年)","long":"中年のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"elder":{"label":"(老人)","long":"老人のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"river":{"label":"-運河-","long":"往く人来る人休む人","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"road":{"label":"-往来-","long":"往く人来る人休む人","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"immoral":{"label":"-裏道-","long":"街灯の裏の背徳達","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"guild":{"label":"-商工会-","long":"商人と職人の集うギルド","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"elegant":{"label":"-舞踏会-","long":"瀟洒な館の舞踏会","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"ecclesia":{"label":"-公教会-","long":"信仰と道徳と学識の源泉","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"medical":{"label":"-施療院-","long":"病苦毒霊と戦う砦","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"market":{"label":"-歌劇酒場-","long":"芸の極みに華が咲く","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"apartment":{"label":"-自室の窓-","long":"窓から外を眺めると","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"servant":{"label":"-使用人-","long":"良家を支えるスタッフ","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"farm":{"label":"-森の農場-","long":"森に接する田畑","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"government":{"label":"-統治公共-","long":"所領を治める権能者","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"god":{"label":"-かみさま-","long":"かみさま","tag_id":"all","chr_set_ids":["all"]}}

/***/ }),

/***/ "zQR9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("h65t")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("vIB/")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ })

},["T23V"]);
//# sourceMappingURL=app.6622e37f4fb5438313b7.js.map