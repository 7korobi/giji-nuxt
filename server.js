/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var book, folder, part, section;

folder = {
  books: [
    {
      _id: "demo-0",
      label: "デモブック",
      winner_id: "WOLF",
      potof_size: 10
    }
  ]
};

book = {
  books: [
    {
      _id: "demo-0",
      label: "デモページ",
      winner_id: "WOLF",
      potof_size: 10
    }
  ],
  parts: [
    {
      _id: "demo-0-0",
      label: "プロローグ"
    }, {
      _id: "demo-0-1",
      label: "一日目"
    }, {
      _id: "demo-0-2",
      label: "エピローグ"
    }
  ],
  sections: [
    {
      _id: "demo-0-0-1"
    }, {
      _id: "demo-0-0-2"
    }, {
      _id: "demo-0-1-1"
    }, {
      _id: "demo-0-2-1"
    }
  ]
};

part = {
  phases: [
    {
      _id: "demo-0-0-0",
      handle: "TITLE",
      idx: 2,
      guide: true,
      update: true
    }, {
      _id: "demo-0-0-1",
      handle: "SSAY",
      idx: 26,
      guide: true,
      update: false
    }, {
      _id: "demo-0-0-2",
      handle: "TSAY",
      idx: 2,
      guide: true,
      update: false
    }, {
      _id: "demo-0-0-3",
      handle: "MAKER",
      idx: 2,
      guide: true,
      update: false
    }, {
      _id: "demo-0-0-4",
      handle: "ADMIN",
      idx: 2,
      guide: true,
      update: false
    }, {
      _id: "demo-0-0-5",
      handle: "VSSAY",
      idx: 3,
      guide: true,
      update: false
    }, {
      _id: "demo-0-0-6",
      handle: "WSAY",
      idx: 3,
      guide: true,
      update: false
    }
  ],
  cards: [
    {
      _id: "demo-0-0-1-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-2-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-3-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-4-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-5-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-6-request",
      role_id: "headless"
    }, {
      _id: "demo-0-0-7-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-8-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-9-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-10-request",
      role_id: "villager"
    }, {
      _id: "demo-0-0-1-live",
      role_id: "juror",
      date: 2e308
    }, {
      _id: "demo-0-0-1-role",
      role_id: "juror"
    }, {
      _id: "demo-0-0-2-live",
      role_id: "suddendead",
      date: 3
    }, {
      _id: "demo-0-0-2-role",
      role_id: "stigma"
    }, {
      _id: "demo-0-0-3-live",
      role_id: "executed",
      date: 4
    }, {
      _id: "demo-0-0-3-role",
      role_id: "possess"
    }, {
      _id: "demo-0-0-4-live",
      role_id: "live",
      date: 2e308
    }, {
      _id: "demo-0-0-4-role",
      role_id: "villager"
    }, {
      _id: "demo-0-0-5-live",
      role_id: "victim",
      date: 6
    }, {
      _id: "demo-0-0-5-role",
      role_id: "villager"
    }, {
      _id: "demo-0-0-6-live",
      role_id: "executed",
      date: 5
    }, {
      _id: "demo-0-0-6-role",
      role_id: "headless"
    }, {
      _id: "demo-0-0-7-live",
      role_id: "live",
      date: 2e308
    }, {
      _id: "demo-0-0-7-role",
      role_id: "villager"
    }, {
      _id: "demo-0-0-8-live",
      role_id: "live",
      date: 2e308
    }, {
      _id: "demo-0-0-8-role",
      role_id: "villager"
    }, {
      _id: "demo-0-0-8-gift",
      role_id: "ogre"
    }, {
      _id: "demo-0-0-8-bond",
      role_id: "hate"
    }, {
      _id: "demo-0-0-8-book",
      role_id: "master"
    }, {
      _id: "demo-0-0-9-live",
      role_id: "live",
      date: 2e308
    }, {
      _id: "demo-0-0-9-role",
      role_id: "guru"
    }, {
      _id: "demo-0-0-10-live",
      role_id: "executed",
      date: 2
    }, {
      _id: "demo-0-0-10-role",
      role_id: "villager"
    }, {
      _id: "demo-0-0-10-bond",
      role_id: "love"
    }
  ],
  stats: [
    {
      _id: "demo-0-0-1-give",
      give: 1
    }, {
      _id: "demo-0-0-1-VSSAY",
      pt: 2e308,
      said: 13
    }, {
      _id: "demo-0-0-1-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-1-vote",
      cmd: "vote",
      target: "demo-0-0-1"
    }, {
      _id: "demo-0-0-1-entrust",
      target: null
    }, {
      _id: "demo-0-0-2-give",
      give: 1
    }, {
      _id: "demo-0-0-2-GSAY",
      pt: 2e308,
      said: 14
    }, {
      _id: "demo-0-0-2-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-2-aura"
    }, {
      _id: "demo-0-0-2-stigma",
      label: "青い"
    }, {
      _id: "demo-0-0-2-human"
    }, {
      _id: "demo-0-0-3-give",
      give: 1
    }, {
      _id: "demo-0-0-3-GSAY",
      pt: 2e308,
      said: 15
    }, {
      _id: "demo-0-0-3-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-3-aura"
    }, {
      _id: "demo-0-0-3-human"
    }, {
      _id: "demo-0-0-3-evil"
    }, {
      _id: "demo-0-0-4-give",
      give: 0
    }, {
      _id: "demo-0-0-4-SSAY",
      pt: 2e308,
      said: 16
    }, {
      _id: "demo-0-0-4-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-4-AIM",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-4-human"
    }, {
      _id: "demo-0-0-4-commit",
      sw: true
    }, {
      _id: "demo-0-0-4-vote",
      cmd: "vote",
      target: "demo-0-0-4"
    }, {
      _id: "demo-0-0-4-entrust",
      cmd: "entrust",
      target: null
    }, {
      _id: "demo-0-0-5-give",
      give: 1
    }, {
      _id: "demo-0-0-5-GSAY",
      pt: 2e308,
      said: 17
    }, {
      _id: "demo-0-0-5-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-5-human"
    }, {
      _id: "demo-0-0-6-give",
      give: 1
    }, {
      _id: "demo-0-0-6-GSAY",
      pt: 2e308,
      said: 18
    }, {
      _id: "demo-0-0-6-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-6-aura"
    }, {
      _id: "demo-0-0-6-wolf"
    }, {
      _id: "demo-0-0-6-hunt",
      cmd: "role",
      target: null
    }, {
      _id: "demo-0-0-7-give",
      give: 0
    }, {
      _id: "demo-0-0-7-SSAY",
      pt: 2000,
      said: 19
    }, {
      _id: "demo-0-0-7-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-7-AIM",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-7-human"
    }, {
      _id: "demo-0-0-7-commit",
      sw: true
    }, {
      _id: "demo-0-0-7-vote",
      cmd: "vote",
      target: "demo-0-0-7"
    }, {
      _id: "demo-0-0-7-entrust",
      cmd: "entrust",
      target: null
    }, {
      _id: "demo-0-0-8-give",
      give: 0
    }, {
      _id: "demo-0-0-8-SSAY",
      pt: 2e308,
      said: 20
    }, {
      _id: "demo-0-0-8-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-8-AIM",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-8-human"
    }, {
      _id: "demo-0-0-8-commit",
      sw: true
    }, {
      _id: "demo-0-0-8-vote",
      cmd: "vote",
      target: "demo-0-0-8"
    }, {
      _id: "demo-0-0-8-entrust",
      cmd: "entrust",
      target: null
    }, {
      _id: "demo-0-0-8-hate",
      cmd: "bond",
      target: "demo-0-10"
    }, {
      _id: "demo-0-0-8-wolf"
    }, {
      _id: "demo-0-0-8-hunt",
      cmd: "role",
      target: null
    }, {
      _id: "demo-0-0-8-friend"
    }, {
      _id: "demo-0-0-8-WSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-9-give",
      give: 0
    }, {
      _id: "demo-0-0-9-SSAY",
      pt: 2e308,
      said: 21
    }, {
      _id: "demo-0-0-9-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-9-AIM",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-9-aura"
    }, {
      _id: "demo-0-0-9-human"
    }, {
      _id: "demo-0-0-9-guru"
    }, {
      _id: "demo-0-0-9-commit",
      sw: true
    }, {
      _id: "demo-0-0-9-vote",
      cmd: "vote",
      target: "demo-0-0-9"
    }, {
      _id: "demo-0-0-9-entrust",
      cmd: "entrust",
      target: null
    }, {
      _id: "demo-0-0-10-give",
      give: 1
    }, {
      _id: "demo-0-0-10-GSAY",
      pt: 2e308,
      said: 22
    }, {
      _id: "demo-0-0-10-TSAY",
      pt: 2e308,
      said: 1
    }, {
      _id: "demo-0-0-10-human"
    }, {
      _id: "demo-0-0-10-love",
      cmd: "bond",
      target: "demo-0-0-10"
    }
  ],
  potofs: [
    {
      _id: "demo-0-0-10",
      face_id: "c30",
      winner_id: "HATER",
      job: "R-",
      sign: "七転び"
    }, {
      _id: "demo-0-0-9",
      face_id: "c40",
      winner_id: "GURU",
      job: "R-",
      sign: "七転び"
    }, {
      _id: "demo-0-0-8",
      face_id: "c50",
      winner_id: "LOVER",
      job: "R-",
      sign: "ななころ"
    }, {
      _id: "demo-0-0-7",
      face_id: "c87",
      winner_id: "HUMAN",
      job: "病人",
      sign: "七転び"
    }, {
      _id: "demo-0-0-6",
      face_id: "t05",
      winner_id: "HUMAN",
      job: "開放的市民",
      sign: "noko"
    }, {
      _id: "demo-0-0-5",
      face_id: "c29",
      winner_id: "HUMAN",
      job: "記者",
      sign: "うに"
    }, {
      _id: "demo-0-0-4",
      face_id: "c90",
      winner_id: "WOLF",
      job: "粉ひき",
      sign: "魚屋"
    }, {
      _id: "demo-0-0-3",
      face_id: "c70",
      winner_id: "EVIL",
      job: "腐女子",
      sign: "namba"
    }, {
      _id: "demo-0-0-2",
      face_id: "c80",
      winner_id: "HUMAN",
      job: "少年",
      sign: "ななころ"
    }, {
      _id: "demo-0-0-1",
      face_id: "c60",
      winner_id: "NONE",
      job: "両家の末娘",
      sign: "ななころ"
    }
  ]
};

section = {
  chats: {
    "demo-0-0-0-0": {
      section_id: "demo-0-0-1",
      show: "report",
      deco: "center",
      log: "プロローグ"
    },
    "demo-0-0-0-1": {
      section_id: "demo-0-0-1",
      show: "report",
      deco: null,
      log: "この村にも恐るべき“人狼”の噂が流れてきた。\nひそかに人間と入れ替わり、夜になると人間を襲うという魔物。不安に駆られた村人たちは、集会所へと集まるのだった……。"
    },
    "demo-0-0-3-1": {
      section_id: "demo-0-0-1",
      show: "report",
      log: "【業務連絡】【RP】\n今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。\nまた/*PC向けの情報は【RP】とつけます。*/よろしくお願いいたします。\n\nただいま、入村準備中のため、いましばらくお待ちください。"
    },
    "demo-0-0-3-2": {
      section_id: "demo-0-0-1",
      show: "talk",
      log: "【業務連絡】【RP】\n今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。\nまた/*PC向けの情報は【RP】とつけます。*/よろしくお願いいたします。\n\nただいま、入村準備中のため、いましばらくお待ちください。"
    },
    "demo-0-0-4-1": {
      section_id: "demo-0-0-1",
      show: "report",
      log: "【業務連絡】【RP】*/\n今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。\nまたPC向けの情報は【RP】とつけます。よろしくお願いいたします。\n\nただいま、入村準備中のため、いま/*しばらくお待ちください。"
    },
    "demo-0-0-4-2": {
      section_id: "demo-0-0-1",
      show: "talk",
      log: "【業務連絡】【RP】\n今後、村建てからのお知らせや、/*PL向けの情報*/は【業務連絡】と書きます。\nまたPC向けの情報は【RP】とつけます。よろしくお願いいたします。\n\nただいま、入村準備中のため、いましばらくお待ちください。"
    },
    "demo-0-0-2-2": {
      section_id: "demo-0-0-1",
      show: "post",
      log: "病人 エリアスが参加しました。"
    },
    "demo-0-0-1-1": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-7",
      show: "talk",
      deco: "repo",
      log: "― 美術室 ―\n\n　……あ。\n\n[キャンバスに向き合っていた視線を、左の手首へと落とした。銀色の小さな腕時計は、こちこちと始業の数分前を刻んでいる]\n\n　そろそろ、行かなくちゃ。\n\n[手早く道具を片付けると、美術室を後にする。\n向かうのはもちろん、2年3組の教室]"
    },
    "demo-0-0-1-24": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-6",
      write_at: Date.now(),
      show: "talk",
      deco: null,
      log: "ねっ、ねっ、これって降るかな？\nやっぱ、降っちゃうやつかな、これ？\nやった～、今度こそ３段いこうよ、３段！\nまっててね～わたしのオ○フ～\n\n[仰ぐように空に手をかざすと、雪が待ちきれないと言った表情で、少し前の流行歌を口ずさみはじめた]\n\nすこ～しもさむくないわぁ～♪"
    },
    "demo-0-0-1-25": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-6",
      write_at: Date.now() - 80000,
      show: "talk",
      deco: "head",
      log: "さむいにきまってんだろ！！"
    },
    "demo-0-0-5-1": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-1",
      write_at: Date.now() - 60000,
      show: "report",
      deco: "mono",
      log: ".　＿＿＿＿＿＿＿\n／／[ゲリラ豪雨]＼＼\n|◎|　　 ^＿^　　 |◎|\n|◎|　　 (´･ω･) 　|◎|\n＼＼ 　⊂　　⊃　／／\n　(⌒(⌒(⌒)⌒)⌒)\n(⌒＿(⌒)(⌒)＿⌒)\n(_(＿＿)(＿)(＿＿)_)\n⚡//////⚡⚡\\\\\\⚡"
    },
    "demo-0-0-5-2": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-1",
      write_at: Date.now() - 40000,
      show: "talk",
      deco: "mono",
      log: ".　＿＿＿＿＿＿＿\n／／[ゲリラ豪雨]＼＼\n|◎|　　 ^＿^　　 |◎|\n|◎|　　 (´･ω･) 　|◎|\n＼＼ 　⊂　　⊃　／／\n　(⌒(⌒(⌒)⌒)⌒)\n(⌒＿(⌒)(⌒)＿⌒)\n(_(＿＿)(＿)(＿＿)_)\n⚡//////⚡⚡\\\\\\⚡"
    },
    "demo-0-0-5-3": {
      section_id: "demo-0-0-1",
      potof_id: "demo-0-0-1",
      write_at: Date.now() - 20000,
      show: "post",
      deco: "mono",
      log: ".　＿＿＿＿＿＿＿\n／／[ゲリラ豪雨]＼＼\n|◎|　　 ^＿^　　 |◎|\n|◎|　　 (´･ω･) 　|◎|\n＼＼ 　⊂　　⊃　／／\n　(⌒(⌒(⌒)⌒)⌒)\n(⌒＿(⌒)(⌒)＿⌒)\n(_(＿＿)(＿)(＿＿)_)\n⚡//////⚡⚡\\\\\\⚡"
    }
  }
};

module.exports = function(app) {
  app.get('/api/books', function(req, res) {
    return res.json(folder);
  });
  app.get('/api/books/demo-0', function(req, res) {
    return res.json(book);
  });
  app.get('/api/parts/demo-0-0', function(req, res) {
    return res.json(part);
  });
  return app.get('/api/sections/demo-0-0-1', function(req, res) {
    return res.json(section);
  });
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  render: __webpack_require__(9),
  router: __webpack_require__(10),
  build: __webpack_require__(6),
  head: __webpack_require__(8),
  env: __webpack_require__(7),
  css: [],
  loading: {
    color: '#3B8070'
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var HOST, Nuxt, app, bodyParser, config, express, host, pm_id, port;

bodyParser = __webpack_require__(2);

express = __webpack_require__(3);

config = __webpack_require__(1);

Nuxt = __webpack_require__(4);

({pm_id, HOST} = process.env);

process.on('unhandledRejection', console.dir);

host = HOST || '127.0.0.1';

port = 4000 + (pm_id - 0 || 0);

app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
});

__webpack_require__(0)(app);

(async function() {
  var err, nuxt;
  nuxt = (await new Nuxt(config));
  app.use(nuxt.render);
  app.listen(port, host);
  console.log(process.env);
  console.log(`Server is listening on http://${host}:${port}`);
  if (config.dev) {
    try {
      return (await nuxt.build());
    } catch (error) {
      err = error;
      console.error(err);
      return process.exit(1);
    }
  }
})();


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
  extend: function(config, {isDev, isClient}) {
    if (isClient) {
      return config.devtool = 'source-map';
    }
  },
  babel: {
    presets: [
      "vue-app", [
        "env", {
          targets: {
            browsers: ["> 5%"]
          },
          forceAllTransforms: true
        }
      ]
    ]
  },
  vendor: ['axios', 'vee-validate', '~components/vue.coffee', '~plugins/memory-record.coffee', '~plugins/browser-value'],
  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.styl\.use$/,
      loader: 'style-loader/useable!css-loader!stylus-loader?resolve url'
    }
  ]
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var API_URL, SOW_URL, STORE_URL, WEB_URL;

({WEB_URL, API_URL, SOW_URL, STORE_URL} = process.env);

module.exports = {WEB_URL, API_URL, SOW_URL, STORE_URL};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  title: '人狼議事',
  meta: [
    {
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=0.5, shrink-to-fit=no'
    }, {
      hid: 'description',
      content: "Nuxt.js project"
    }, {
      href: "mailto:7korobi@gmail.com"
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: "https://use.fontawesome.com/6348868528.css"
    }, {
      rel: 'stylesheet',
      type: 'text/css',
      href: "/css/index.css"
    }, {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      href: "mailto:7korobi@gmail.com"
    }
  ],
  script: [
    {
      src: '/monaco-editor/vs/loader.js',
      type: 'text/javascript',
      charset: 'utf8'
    }
  ]
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  static: {
    maxAge: '1y',
    setHeaders: function(res, path, stat) {
      var atime, ctime, mtime, size;
      if (/\.json\.gz$/.test(path)) {
        ({atime, mtime, ctime, size} = stat);
        console.log({mtime, size, path});
        res.setHeader('Content-Type', 'application/javascript');
        return res.setHeader('Content-Encoding', 'gzip');
      }
    }
  },
  gzip: {
    threshold: 0
  },
  etag: {
    weak: true
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  scrollBehavior: function(to, from, savedPosition) {
    console.log({to, from});
    switch (false) {
      case !savedPosition:
        console.log("scroll to saved.");
        return savedPosition;
      case !to.hash:
        console.log("scroll to " + to.hash);
        return {
          selector: to.hash
        };
      case to.path === from.path:
        return {
          x: 0,
          y: 0
        };
      default:
        return false;
    }
  }
};


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map