webpackJsonp([10],{

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(406),
  /* template */
  __webpack_require__(439),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  default: {
    data: function() {
      return __webpack_require__(98);
    }
  }
};


/***/ }),

/***/ 439:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outframe"
  }, [_c('div', {
    staticClass: "contentframe"
  }, [_c('div', {
    staticClass: "inframe"
  }, [_c('post', {
    attrs: {
      "handle": "TSAY"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "#nation"
    }
  }, [_vm._v("国のルール")]), _c('nuxt-link', {
    attrs: {
      "to": "#village"
    }
  }, [_vm._v("村のルール")]), _c('nuxt-link', {
    attrs: {
      "to": "#player"
    }
  }, [_vm._v("プレーヤー")]), _c('nuxt-link', {
    attrs: {
      "to": "#maker"
    }
  }, [_vm._v("村建て")])], 1), _c('br'), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_vm._v("準備はいいかな？")]), _c('talk', {
    attrs: {
      "handle": "ELSE",
      "face_id": "c96",
      "head": "学者 レオナルド",
      "write_at": 1370662886001
    }
  }, [_vm._v("ようこそ。ここにはこのサイトを楽しむためのルールや心構えを綴ってある。\n暖炉のそばが開いているから、腰を下ろして熟読しよう。楽しいゲームは全員が対等で、全員が読んで理解しているルールがあって成り立つんだ。\n\nただし、やむを得ず、ルール違反をすることもあるだろうね。違反してしまった事実は覆らないけれど、ルールを破らざるをえなかった事情は、落ち着いて聞いてあげよう。\n"), _c('a', {
    attrs: {
      "href": "http://www.nihonjiten.com/data/763.html"
    }
  }, [_vm._v("罪を憎んで、人を憎まず")]), _vm._v("。\nこれは話し合いをするゲームなんだ。\n\n"), _c('span', {
    staticClass: "tooltip-top",
    attrs: {
      "data-tooltip": "法案や、企業の自主規制に従う必要はない。逆らう必要もない。\nそれよりもきみのそばの十数人のためを思おう。"
    }
  }, [_vm._v("このサイトは日本国の法律に従っている。")]), _vm._v("\n特にここで、六法全書を引き写して退屈な思いをするつもりはないけれど、不正アクセス禁止法、個人情報保護法は関わりが深いはずだ。\n")]), _c('report', {
    attrs: {
      "handle": "MAKER"
    }
  }, [_vm._v("ルール")]), _c('report', {
    attrs: {
      "handle": "footer",
      "id": "nation"
    }
  }, [_vm._v(_vm._s(_vm.nation.head))]), _vm._l((_vm.nation.list), function(o, idx) {
    return _c('report', {
      key: idx,
      attrs: {
        "handle": "P01",
        "head": o.head,
        "log": o.log
      }
    })
  }), _c('report', {
    attrs: {
      "handle": "footer",
      "id": "village"
    }
  }, [_vm._v(_vm._s(_vm.village.head))]), _vm._l((_vm.village.list), function(o, idx) {
    return _c('report', {
      key: idx,
      attrs: {
        "handle": "VSAY",
        "head": o.head,
        "log": o.log
      }
    })
  }), _c('report', {
    attrs: {
      "handle": "MAKER"
    }
  }, [_vm._v("ルール違反があったら？")]), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_vm._v("はじめに")]), _c('talk', {
    attrs: {
      "handle": "ELSE",
      "face_id": "c96",
      "head": "学者 レオナルド",
      "write_at": 1370662886002
    }
  }, [_vm._v("もし、ルールに違反してしまったとしたら？とても残念なことだけれど、まだ絶望しなくていい。\n\nきみには全員に釈明する、貴重な機会が残されているんだ。遊びに集まった皆が笑い合って解散するために、勇気を奮ってエピローグに顔を出してごらん。\n\n真剣な話し合いが必要なときは、協力してそのための時間をなんとか捻り出してほしい。\n家に帰るまでが遠足なのと同じで、エピローグが済むまでがその村なんだ。")]), _c('talk', {
    attrs: {
      "handle": "ELSE",
      "face_id": "c96",
      "head": "学者 レオナルド",
      "write_at": 1370662886003
    }
  }, [_vm._v("エピローグでは全員が一同に介し、墓下と地上にわかれることなく、勝つための嘘もなく、より率直な話ができる。\nこの特性から、人狼議事ではエピローグでの話し合いを推奨しているよ。\n古い時代にサムライは、どのような事情にも沈黙して咎を一身に引き受けることを美徳としていたそうだ。\n起こったことを水に流すにはそれもいいだろうけれど、残念ながらみんなの気持ちはこのことに残ってしまうので、あまりよくない。\n\n解散するときに心残りなく、さっぱりとお別れができるよう、エピローグを活用してほしい。もやもやと蟠りが残るのは、だめだね。\n")]), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_vm._v("突然死")]), _c('talk', {
    attrs: {
      "handle": "GSAY",
      "face_id": "t07",
      "head": "勧善懲悪委 アカリ",
      "deco": "head",
      "write_at": 1437461000000
    }
  }, [_vm._v("突然死は悪！そうですよね先生！\n\nみんな一生懸命がんばっているのに、そんなことで汚されるの、悔しいです！\n")]), _c('talk', {
    attrs: {
      "handle": "ELSE",
      "face_id": "c96",
      "head": "学者 レオナルド",
      "write_at": 1437461000000
    }
  }, [_vm._v("正解、国のルールだね。\nただ、人狼議事では、１日間発言しない場合には２つの措置をとっている。\n\nひとつ、突然死とする措置。\nふたつ、ゲーム不参加扱いとする措置。\n\nこれらの罰則を超えて重大なことなのか、冷静に考えて行動しよう。また、事故的な、やむを得ない事情があるかもしれないよ。もし事情があれば、考慮して考えてみよう。\n僕らはここに遊びに来ているんだ。最後には笑い合って解散できることを目指そうね。\n")]), _c('report', {
    attrs: {
      "handle": "footer"
    }
  }, [_vm._v("どうすればいいの？")]), _c('talk', {
    attrs: {
      "handle": "ELSE",
      "face_id": "c96",
      "head": "学者 レオナルド",
      "write_at": 1437461000000
    }
  }, [_vm._v("ここでは、ルール違反についてとるべき対応を話そう。\n\nさきの項目でアカリくんが嘆いていたように、真剣なゲームをしていれば、ルール違反を許したくないという強い情動もあるものなんだ。\nいっぽう、粗相があったらコップ一杯の日本酒を一気飲みして、ちょっといいところを見せればよい、という考え方もあるものだよ。\n\nこうした考え方が村の中でずれていると、いざ何かがあったときに困ったり、不満が溜まったりしてしまう。\n開始前に、あなたの村ではどう対応する、という方針を明らかにしておくと、志向の合わない人と衝突してしまうことも減るはずだよ。\nどう対応するとよいのかを宿題にします、みなさんの良心にしたがって考えてみよう。")]), _c('talk', {
    attrs: {
      "handle": "GSAY",
      "face_id": "g02",
      "head": "白鶴拳 志偉",
      "write_at": 1437461000000
    }
  }, [_vm._v("うちの道場じゃ、気の抜けた奴は師範代が叩き出してるぜ！リアルがヤバそうだったり、難しくてわかんないなら控えとけよってことよ。\n\nよーし、俺の建てる村は違反なんて許さん。アカリや†ルシフェル†みたいに、きちんと参加できるやつら誘ってガンガンいくのだあ！")]), _c('talk', {
    attrs: {
      "handle": "GSAY",
      "face_id": "t01",
      "head": "友愛組合 チアキ",
      "write_at": 1437461000000
    }
  }, [_vm._v("道場みたいな処だと窮屈だな。僕は自分で、別の村を建てるよ。僕の村は忙しい人もフォローするし、ルール違反（突然死とか）があっても、厳しく責め立てたくはないんだ。\n\n…村に書いちゃうの勇気いるなあ。違反してもOKみたいに聞かれてしまいそうだ。ゴクリ。\n"), _c('em', [_vm._v("せっかく集まった仲間を責めたくないだけなんだけれど…どう伝えよう…")])]), _c('talk', {
    attrs: {
      "handle": "GSAY",
      "face_id": "c24",
      "head": "長老 ナタリア",
      "write_at": 1437461000000
    }
  }, [_vm._v("あたしは難しいことを考えるのが苦手でねえ。あんまり上手に勝とうとできていなくても、厳しくしてほしくないねえ。\n\nそうだわ、ヌマタロウさんをお誘いして、そういう村を建ててみようかしらねえ。お茶受けは拳骨煎餅かしらねえ。\n")]), _c('report', {
    attrs: {
      "handle": "MAKER"
    }
  }, [_vm._v("心構え")]), _c('post', {
    attrs: {
      "handle": "VSAY"
    }
  }, [_vm._v("心構えを守って、楽しく、強く遊ぼう。")]), _c('report', {
    attrs: {
      "handle": "footer",
      "id": "player"
    }
  }, [_vm._v("遊びにきたかたへ")]), _vm._l((_vm.player.list), function(o, idx) {
    return _c('report', {
      key: idx,
      attrs: {
        "handle": "SSAY",
        "head": o.head,
        "log": o.log
      }
    })
  }), _c('report', {
    attrs: {
      "handle": "footer",
      "id": "maker"
    }
  }, [_vm._v(_vm._s(_vm.maker.head))]), _c('talk', {
    attrs: {
      "handle": "WSAY",
      "face_id": "t10",
      "head": "営利政府 トレイル",
      "write_at": 1437461000000
    }
  }, [_vm._v("村建てフォームには、村のルールが既に記入してあります。\n賛同できる内容はそのまま残して、不足なら筆を加え、余分と判断する事項は削除して村を建ててください。\n\n村を建てるとき気をつけると良いことを心構えに纏めました。\nぜひご覧ください。")]), _vm._l((_vm.maker.list), function(o, idx) {
    return _c('report', {
      key: idx,
      attrs: {
        "handle": "P01",
        "head": o.head,
        "log": o.log
      }
    })
  }), _c('report', {
    attrs: {
      "handle": "footer",
      "deco": "center"
    }
  }, [_c('nuxt-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("戻る")])], 1)], 2)])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=10.nuxt.bundle.0bee091d65b904d00ac7.js.map