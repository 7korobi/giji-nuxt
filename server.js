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

module.exports = require("child_process");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("./api");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var app, conf, express, host, pm_id, port;

express = __webpack_require__(6);

app = express();

conf = __webpack_require__(1);

({pm_id} = process.env);

Object.assign(conf, {pm_id});

process.on('unhandledRejection', console.dir);

__webpack_require__(7)(app, conf);

if (conf.use_api) {
  __webpack_require__(9)(app, conf);
  __webpack_require__(12)(app, conf);
  __webpack_require__(18)(app, conf);
  // for only legacy jinrogiji
  __webpack_require__(31)(app, conf);
}

__webpack_require__(33)(app, conf);

host = conf.host || '127.0.0.1';

port = (conf.port || 4000) + (pm_id - 0 || 0);

app.listen(port, host);

console.log(`Server is listening on http://${host}:${port}`);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var bodyParser;

bodyParser = __webpack_require__(8);

module.exports = function(app, conf) {
  app.use(bodyParser.json());
  return app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
  });
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var MongoStore, day, interval, session;

session = __webpack_require__(10);

MongoStore = __webpack_require__(11)(session);

interval = 7 * 24 * 3600;

day = 24 * 3600;

module.exports = function(app, {session_key, db}) {
  app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: db.mongo,
      ttl: interval,
      autoRemove: 'native',
      collection: 'sessions',
      touchAfter: day,
      stringify: false
    }),
    cookie: {
      maxAge: interval * 1000
    }
  }));
  return console.log(`session use ${db.mongo}`);
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Agenda, Agendash, jobs;

Agenda = __webpack_require__(13);

Agendash = __webpack_require__(14);

jobs = function(cb) {
  var ctx, fname, i, len, name, ref, results;
  ctx = __webpack_require__(15);
  ref = ctx.keys();
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    fname = ref[i];
    name = fname.slice(2, -7);
    results.push(cb(name, ctx(fname)));
  }
  return results;
};

module.exports = function(app, {pm_id, db}) {
  var agenda, pno;
  pno = pm_id - 1 || 0;
  agenda = new Agenda({
    db: {
      address: db.mongo,
      collection: "jobCollectionName",
      options: {
        server: {
          auto_reconnect: true
        }
      }
    }
  });
  jobs(function(name, ctx) {
    return agenda.define(name, ctx.define);
  });
  agenda.on('ready', function() {
    if (!pno) {
      jobs(function(name, ctx) {
        if (ctx.every) {
          return agenda.every(ctx.every, name);
        }
      });
    }
    return agenda.start();
  });
  app.use('/agendash', Agendash(agenda));
  return console.log(`agenda use ${db.mongo}`);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("agendash");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggregate.coffee": 16,
	"./process.coffee": 17
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
webpackContext.id = 15;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var API_URL, sh;

sh = __webpack_require__(0);

({API_URL} = process.env);

module.exports = {
  every: '12 hours',
  define: function(job, done) {
    return sh.exec(`curl http:${API_URL}/aggregate/job`, function(err, stdout, stderr) {
      return sh.exec("./static/sow.sh", function(err, stdout, stderr) {
        if (err) {
          return console.error(err);
        } else {
          return console.log(stderr);
        }
      });
    });
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var API_URL, sh;

sh = __webpack_require__(0);

({API_URL} = process.env);

module.exports = {
  every: '2 minutes',
  define: function(job, done) {
    return sh.exec('ps uafxS | grep -v ^root', function(err, stdout, stderr) {
      if (err) {
        console.error(err);
        return console.error(stderr);
      } else {
        return console.log(stdout);
      }
    });
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose;

mongoose = __webpack_require__(19);

module.exports = function(app, conf) {
  var ctx, fname, i, len, ref;
  mongoose.connect(conf.db.mongo, {
    config: {
      autoIndex: false
    }
  }, function(err) {
    if (err) {
      return console.error(`no ${conf.db.mongo}. disabled (passport, session)`);
    } else {
      return console.log("mongoose connected.");
    }
  });
  ctx = __webpack_require__(20);
  ref = ctx.keys();
  for (i = 0, len = ref.length; i < len; i++) {
    fname = ref[i];
    ctx(fname)(app, mongoose, conf);
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api.coffee": 21,
	"./book.coffee": 23,
	"./passport.coffee": 24
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
webpackContext.id = 20;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var YAML, fs;

YAML = __webpack_require__(22);

fs = __webpack_require__(2);

module.exports = {
  YAML: function(path) {
    return YAML.load(fs.readFileSync(path, 'utf8'));
  },
  API: function(cb) {
    return async function(req, res, next) {
      var fileName, lineNumber, message, name, stack;
      try {
        return res.json((await cb(req)));
      } catch (error) {
        ({name, message, stack, fileName, lineNumber} = error);
        return res.json({name, message, stack, fileName, lineNumber});
      }
    };
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var API, YAML, head, idx, nation, nrules, village, vrules;

({YAML, API} = __webpack_require__(3));

({nation, village} = YAML("yaml/rule.yml"));

nrules = (function() {
  var i, len, ref, results;
  ref = nation.list;
  results = [];
  for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
    ({head} = ref[idx]);
    results.push(`${idx + 1}. ${head}`);
  }
  return results;
})();

vrules = (function() {
  var i, len, ref, results;
  ref = village.list;
  results = [];
  for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
    ({head} = ref[idx]);
    results.push(`${idx + 1}. ${head}`);
  }
  return results;
})();

module.exports = function(app, m, {
    game: {folder_id}
  }) {
  var Book, Card, Chat, IdxCount, Part, Phase, Potof, Schema, Stat, add_book, add_chat, add_for_tree, add_part, add_phase, add_potof, can_admin, chk_book, must_signiture, up_book, up_chat, up_chats_step_1, up_for_tree, up_part, up_phase, up_phases_step_1, up_phases_step_2, up_potof, up_stat;
  ({Schema} = m);
  Card = m.model('Card', new Schema({
    write_at: Number,
    book_id: {
      type: String,
      index: true
    },
    part_id: String,
    role_id: String,
    idx: String,
    _id: String
  }, {
    versionKey: false
  }));
  Stat = m.model('Stat', new Schema({
    write_at: Number,
    book_id: {
      type: String,
      index: true
    },
    role_id: String,
    idx: String,
    _id: String,
    sw: Boolean,
    give: Number
  }, {
    versionKey: false
  }));
  Potof = m.model('Potof', new Schema({
    write_at: Number,
    open_at: Number,
    book_id: {
      type: String,
      index: true
    },
    passport_id: String,
    face_id: String,
    idx: String,
    _id: String,
    sign: String,
    job: String
  }, {
    versionKey: false
  }));
  IdxCount = m.model('IdxCount', new Schema({
    idx: Number,
    _id: String
  }, {
    versionKey: false
  }));
  Book = m.model('Book', new Schema({
    write_at: Number,
    open_at: Number,
    passport_id: String,
    folder_id: String,
    idx: String,
    _id: String,
    chat: {
      interval: Number,
      night: Number,
      player: Number,
      mob: Number
    },
    game: {
      vote: String,
      vote_by: [String]
    },
    tags: [String],
    option: [String],
    label: String
  }, {
    versionKey: false
  }));
  Part = m.model('Part', new Schema({
    write_at: Number,
    open_at: Number,
    book_id: {
      type: String,
      index: true
    },
    idx: String,
    _id: String,
    label: String
  }, {
    versionKey: false
  }));
  Phase = m.model('Phase', new Schema({
    write_at: Number,
    book_id: {
      type: String,
      index: true
    },
    idx: String,
    _id: String,
    label: String,
    handle: String,
    group: String,
    update: false
  }, {
    versionKey: false
  }));
  Chat = m.model('Chat', new Schema({
    write_at: Number,
    book_id: {
      type: String,
      index: true
    },
    potof_id: {
      type: [String],
      index: true
    },
    phase_handle: {
      type: String,
      index: true
    },
    idx: String,
    _id: String,
    show: String,
    deco: String,
    log: String
  }, {
    versionKey: false
  }));
  must_signiture = function({user}) {
    if ((user != null ? user.sign : void 0) == null) {
      throw new Error("ログインしてください。");
    }
  };
  can_admin = function({user, potof}) {
    if ((potof != null ? potof.idx : void 0) !== "NPC") {
      throw new Error("ログインしてください。");
    }
  };
  up_for_tree = async function(model, o) {
    var write_at;
    write_at = new Date() - 0;
    if (o.open_at == null) {
      o.open_at = write_at;
    }
    Object.assign(o, {write_at});
    if (!o._id) {
      console.log(o);
    }
    return (await model.findByIdAndUpdate(o._id, o, {
      new: true,
      upsert: true
    }));
  };
  add_for_tree = async function(_id, model, o) {
    ({idx} = (await IdxCount.findByIdAndUpdate(_id, {
      $inc: {
        idx: 1
      }
    }, {
      new: true,
      upsert: true
    })));
    _id = `${_id}-${idx}`;
    Object.assign(o, {idx, _id});
    return up_for_tree(model, o);
  };
  chk_book = function({label}) {
    return require_uniq(Book, _id, {label, folder_id});
  };
  add_book = function(book) {
    return add_for_tree(folder_id, Book, book);
  };
  add_potof = function(book_id, potof) {
    return add_for_tree(book_id, Potof, potof);
  };
  add_part = function(book_id, part) {
    return add_for_tree(book_id, Part, part);
  };
  add_phase = function(part_id, phase) {
    return add_for_tree(part_id, Phase, phase);
  };
  add_chat = function(phase_id, chat) {
    return add_for_tree(phase_id, Chat, chat);
  };
  up_potof = function(potof) {
    return up_for_tree(Potof, potof);
  };
  up_stat = function(stat) {
    return up_for_tree(Stat, stat);
  };
  up_book = function(book) {
    return up_for_tree(Book, book);
  };
  up_part = function(part) {
    return up_for_tree(Part, part);
  };
  up_phase = function(phase) {
    return up_for_tree(Phase, phase);
  };
  up_chat = function(chat) {
    return up_for_tree(Chat, chat);
  };
  up_chats_step_1 = function(_id, npc_id) {
    return [
      up_chat({
        _id: `${_id}-0-村題-welcome`,
        idx: "welcome",
        book_id: _id,
        potof_id: npc_id,
        deco: "giji",
        show: "report",
        log: "（この村をみんなに紹介しよう）"
      }),
      up_chat({
        _id: `${_id}-0-村題-nrule`,
        idx: "nrule",
        book_id: _id,
        potof_id: npc_id,
        deco: "giji",
        show: "report",
        log: nrules.join("\n")
      }),
      up_chat({
        _id: `${_id}-0-村題-vrule`,
        idx: "vrule",
        book_id: _id,
        potof_id: npc_id,
        deco: "giji",
        show: "report",
        log: vrules.join("\n")
      })
    ];
  };
  up_phases_step_1 = function(_id) {
    return [
      up_phase({
        _id: `${_id}-村題`,
        idx: "村題",
        label: '情報',
        handle: 'MAKER',
        update: true
      }),
      up_phase({
        _id: `${_id}-独題`,
        idx: "独題",
        label: '情報',
        handle: 'private',
        update: false
      }),
      up_phase({
        _id: `${_id}-独言`,
        idx: "独言",
        label: '独り言',
        handle: 'TSAY',
        update: false
      })
    ];
  };
  up_phases_step_2 = function(_id) {
    return [
      up_phase({
        _id: `${_id}-発題`,
        idx: "発題",
        label: '情報',
        handle: 'public',
        update: false
      }),
      up_phase({
        _id: `${_id}-発言`,
        idx: "発言",
        label: '発言',
        handle: 'SSAY',
        update: false
      }),
      up_phase({
        _id: `${_id}-見言`,
        idx: "見言",
        label: '発言',
        handle: 'VSAY',
        update: false
      }),
      up_phase({
        _id: `${_id}-内言`,
        idx: "内言",
        label: "内緒話",
        handle: "AIM",
        update: false
      })
    ];
  };
  app.get('/api/books', API(async function() {
    var books;
    books = (await Book.find({
      _id: RegExp(`^${folder_id}-`)
    }));
    return {books};
  }));
  app.get('/api/books/:book_id', API(async function({
      params: {book_id},
      query: {write_at},
      session: {passport}
    }) {
    var _id, book, cards, i, len, parts, phases, potof, potofs, stats;
    _id = {
      $regex: RegExp(`^${book_id}-`)
    };
    [book, potofs, stats, cards, parts, phases] = (await Promise.all([Book.findById(book_id), Potof.find({_id}), Stat.find({_id}), Card.find({_id}), Part.find({_id}), Phase.find({_id})]));
    for (i = 0, len = potofs.length; i < len; i++) {
      potof = potofs[i];
      if (potof.passport_id === passport.user._id) {
        passport.potof = potof;
      }
    }
    return {book, potofs, stats, cards, parts, phases};
  }));
  app.get('/api/books/:book_id/chats', API(async function({
      params: {book_id},
      query: {write_at},
      session: {
        potof: potof,
        passport: {user}
      }
    }) {
    var _id, chats, phase_handle, potof_id;
    _id = {
      $regex: RegExp(`^${book_id}-`)
    };
    potof_id = {
      $in: [potof != null ? potof._id : void 0]
    };
    phase_handle = {
      $in: ['SSAY', 'VSAY', 'GSAY', 'VGSAY', 'public', 'MAKER', 'ADMIN']
    };
    [chats] = (await Promise.all([
      Chat.find({
        _id: _id,
        $or: [{potof_id},
      {phase_handle}]
      })
    ]));
    return {chats};
  }));
  app.post('/api/books', API(async function({
      body: {book},
      session: {passport}
    }) {
    var _id, chats, npc_id, part, parts, phases, potof, potofs;
    must_signiture(passport);
    book = ({_id} = (await add_book(book)));
    npc_id = `${_id}-NPC`;
    [potof, part, chats, phases] = (await Promise.all([
      up_potof({
        _id: npc_id,
        idx: "NPC",
        passport_id: passport.user._id,
        sign: passport.user.sign
      }),
      up_part({
        _id: `${_id}-0`,
        idx: "0",
        label: 'プロローグ'
      }),
      Promise.all(up_chats_step_1(`${_id}-0`,
      npc_id)),
      Promise.all(up_phases_step_1(`${_id}-0`))
    ]));
    passport.potof = potof;
    potofs = [potof];
    parts = [part];
    return {book, potofs, parts, phases, chats};
  }));
  app.post('/api/books/:book_id', API(async function({
      params: {book_id},
      body: {book, potof},
      session: {passport}
    }) {
    var _id, chat, chats, npc_id, passport_id, phases, potofs;
    must_signiture(passport);
    can_admin(passport);
    book._id = book_id;
    book = ({_id, passport_id} = (await up_book(book)));
    npc_id = `${_id}-NPC`;
    Object.assign(potof, {
      _id: `${_id}-NPC`,
      idx: "NPC",
      sign: passport.user.sign,
      passport_id: passport.user._id
    });
    [potof, chat, phases] = (await Promise.all([
      up_potof(potof),
      up_chat({
        _id: `${_id}-0-発言-0`,
        idx: "0",
        book_id: _id,
        potof_id: npc_id,
        deco: "giji",
        show: "text",
        log: "＠＠＠"
      }),
      Promise.all(up_phases_step_2(`${_id}-0`))
    ]));
    potofs = [potof];
    chats = [chat];
    return {book, potofs, chats, phases};
  }));
  app.post('/api/books/:book_id/part', API(async function({
      params: {book_id},
      body: {part},
      session: {passport}
    }) {
    var phases;
    must_signiture(passport);
    can_admin(passport);
    [part, ...phases] = (await Promise.all([up_part(part), ...up_phases_step_1(part._id), ...up_phases_step_2(part._id)]));
    return {part, phases};
  }));
  app.post('/api/books/:book_id/potof', API(async function({
      params: {book_id},
      body: {potof, phase_id},
      session: {passport}
    }) {
    var _id, args;
    must_signiture(passport);
    // can_player passport
    potof = ({_id} = (await add_potof(book_id, potof)));
    args = (await Promise.all([
      up_stat({
        _id: `${_id}-SSAY`,
        idx: "SSAY",
        sw: false,
        give: 0
      }),
      up_card({
        _id: `${_id}-request`,
        idx: "request",
        role_id: null
      }),
      add_chat(phase_id,
      {
        sign: potof.sign
      })
    ]));
    return {potof, args};
  }));
  app.delete('/api/book/:book_id', API(async function({
      params: {book_id},
      session: {
        passport: {user}
      }
    }) {
    var book;
    book = (await del_book(book_id));
    return {book};
  }));
  app.delete('/api/potof/:potof_id', API(async function({
      params: {potof_id},
      session: {
        passport: {user}
      }
    }) {
    var potof;
    potof = (await del_potof(potof_id));
    return {potof};
  }));
  app.post('/api/gm/muster', API(async function({
      session: {
        passport: {user}
      }
    }) {
    var args;
    args = (await Promise.all([]));
    return {args};
  }));
  app.put('/api/potof/:book_id', API(function({
      params: {book_id},
      body: {potof},
      session: {
        passport: {user}
      }
    }) {}));
  app.put('/api/card', API(function({
      body: {card},
      session: {
        passport: {user}
      }
    }) {}));
  return app.post('/api/gm/scrap', API(async function({
      session: {
        passport: {user}
      }
    }) {
    var args;
    args = (await Promise.all([]));
    return {args};
  }));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var API, _, passport, plugins;

_ = __webpack_require__(4);

passport = __webpack_require__(25);

plugins = {
  facebook: __webpack_require__(26),
  twitter: __webpack_require__(27),
  slack: __webpack_require__(28),
  github: __webpack_require__(29),
  google: __webpack_require__(30)
};

({API} = __webpack_require__(3));

module.exports = function(app, m, {auth, url}) {
  var Passport, Schema, Strategy, attr, provider;
  ({Schema} = m);
  Passport = m.model('Passport', new Schema({
    _id: String,
    nick: String,
    icon: String,
    mail: String,
    sign: String,
    write_at: Number,
    provider: String,
    account: String,
    token: String
  }));
  passport.serializeUser(function(o, done) {
    var ref;
    o._id = [o.provider, o.account].join("-");
    return Passport.findByIdAndUpdate(o._id, o, {
      $setOnInsert: {
        sign: (ref = o.mail) != null ? ref : o.nick
      },
      new: false,
      upsert: true
    }).exec(function(err, o) {
      return done(err, o);
    });
  });
  passport.deserializeUser(function(o, done) {
    return done(null, o);
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.post("/api/user", API(async function({
      body,
      session: {
        passport: {user}
      }
    }) {
    if (!(user != null ? user._id : void 0)) {
      return {
        message: "ログインしていません。"
      };
    }
    Object.assign(user, body.user);
    user = (await Passport.findByIdAndUpdate(user._id, user, {
      new: true,
      upsert: false
    }));
    return {user};
  }));
  app.get("/logout", function(req, res) {
    req.logout();
    return res.redirect('/');
  });
  for (provider in auth) {
    ({attr, Strategy} = auth[provider]);
    ({Strategy} = plugins[provider]);
    attr.callbackURL = `${url.web}/auth/${provider}/callback`;
    passport.use(new Strategy(attr, function(accessToken, refreshToken, {provider, id, displayName, emails, photos}, done) {
      var profile;
      profile = {
        icon: photos != null ? photos[0].value : void 0,
        mail: emails != null ? emails[0].value : void 0,
        nick: displayName,
        write_at: new Date - 0,
        provider: provider,
        account: id,
        token: accessToken
      };
      done(null, profile);
      return console.log("passport-profile", profile);
    }));
    app.get(`/auth/${provider}`, passport.authenticate(provider));
    app.get(`/auth/${provider}/callback`, passport.authenticate(provider, {
      failureRedirect: '/',
      successRedirect: '/'
    }));
    console.log(`${provider} authenticate set.`);
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("passport-slack");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth2");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectId, _, fs, giji, mongo, sh;

mongo = __webpack_require__(32);

sh = __webpack_require__(0);

fs = __webpack_require__(2);

_ = __webpack_require__(4);

ObjectId = false;

giji = {};

module.exports = function(app, {url, db}) {
  mongo.connect(db.mongo_sow).then(function(db) {
    var end;
    end = function(err, o) {
      return console.log(err, o);
    };
    giji.find = function(id, query, projection) {
      return db.collection(id, {ObjectId}).find(query, projection);
    };
    giji.aggregate_message = function() {
      var cmd;
      cmd = function(out, keys, ...ext) {
        return db.collection("message_by_story_for_face", {ObjectId}).aggregate([
          ...ext,
          {
            $group: {
              _id: keys,
              date_min: {
                $min: "$date_min"
              },
              date_max: {
                $max: "$date_max"
              },
              max: {
                $max: "$max"
              },
              all: {
                $sum: "$all"
              },
              count: {
                $sum: "$count"
              },
              story_ids: {
                $addToSet: "$_id.story_id"
              }
            }
          },
          {
            $out: out
          }
        ], {ObjectId});
      };
      return Promise.all([
        cmd("message_for_face",
        {
          face_id: "$_id.face_id"
        }),
        cmd("message_for_face_sow_auth",
        {
          face_id: "$_id.face_id",
          sow_auth_id: "$_id.sow_auth_id"
        }),
        cmd("message_for_face_mestype",
        {
          face_id: "$_id.face_id",
          mestype: "$_id.mestype"
        })
      ]);
    };
    giji.aggregate_potof = function() {
      var cmd;
      cmd = function(out, keys, ...ext) {
        return db.collection("potofs", {ObjectId}).aggregate([
          ...ext,
          {
            $match: {
              sow_auth_id: {
                $exists: 1,
                $nin: [null,
          "master",
          "admin"]
              },
              face_id: {
                $exists: 1,
                $ne: null
              }
            }
          },
          {
            $group: {
              _id: keys,
              date_min: {
                $min: "$timer.entrieddt"
              },
              date_max: {
                $max: "$timer.entrieddt"
              },
              story_ids: {
                $addToSet: "$story_id"
              }
            }
          },
          {
            $out: out
          }
        ], {ObjectId});
      };
      return Promise.all([
        cmd("potof_for_face",
        {
          face_id: "$face_id"
        }),
        cmd("potof_for_face_live",
        {
          face_id: "$face_id",
          live: "$live"
        }),
        cmd("potof_for_face_sow_auth",
        {
          face_id: "$face_id",
          sow_auth_id: "$sow_auth_id"
        }),
        cmd("potof_for_face_role",
        {
          face_id: "$face_id",
          role_id: "$role"
        },
        {
          $unwind: "$role"
        })
      ]);
    };
    giji.aggregate_max = function() {
      return db.collection("potof_for_face_sow_auth_max", {ObjectId}).remove({}).then(function() {
        return db.collection("potof_for_face_sow_auth", {ObjectId}).aggregate([
          {
            $project: {
              _id: 1,
              count: {
                $size: "$story_ids"
              }
            }
          },
          {
            $group: {
              _id: {
                face_id: "$_id.face_id"
              },
              count: {
                $max: "$count"
              }
            }
          }
        ], {ObjectId});
      }).then(function(data) {
        return Promise.all(data.map(function(o) {
          return giji.find("potof_for_face_sow_auth", {
            "_id.face_id": o._id.face_id,
            story_ids: {
              $size: o.count
            }
          }).then(function(list) {
            var top;
            [top] = _.sortBy(list, function(a) {
              return a.date_min;
            });
            o.date_min = top.date_min;
            o.date_max = top.date_max;
            o._id = top._id;
            return o;
          });
        }));
      }).then(function(data) {
        return db.collection("potof_for_face_sow_auth_max", {ObjectId}).insert(data);
      });
    };
    giji.oldlog = function() {
      return db.collection("stories", {ObjectId}).aggregate([
        {
          $match: {
            is_finish: {
              $eq: true
            }
          }
        },
        {
          $project: {
            _id: 1
          }
        },
        {
          $group: {
            _id: null,
            story_ids: {
              $addToSet: "$_id"
            }
          }
        }
      ], {ObjectId}).then(function([o]) {
        var data, dst, id, src;
        data = (function() {
          var i, len, ref, results;
          ref = o.story_ids;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            id = ref[i];
            dst = `./static/sow/${id}.json.gz`;
            src = `http:${url.api}/story/oldlog/${id}`;
            results.push(`  ls "${dst}" || curl "${src}" | gzip --stdout --best > "${dst}"  `);
          }
          return results;
        })();
        dst = "./static/sow/index.json.gz";
        src = `http:${url.api}/story/oldlog`;
        data.push(` curl "${src}" | gzip --stdout --best > "${dst}"  `);
        dst = "./static/aggregate/faces/index.json.gz";
        src = `http:${url.api}/aggregate/faces`;
        data.push(` curl "${src}" | gzip --stdout --best > "${dst}"  `);
        data.push(" gulp amazon:gz ");
        fs.writeFile('./static/sow.sh', data.join("\n"), function(err) {
          return console.log(err);
        });
        return false;
      });
    };
    giji.scan = function() {
      return db.collection("message_by_story_for_face", {ObjectId}).aggregate([
        {
          $group: {
            _id: null,
            story_ids: {
              $addToSet: "$_id.story_id"
            }
          }
        }
      ], {ObjectId}).then(function([o]) {
        var list, ref;
        list = (ref = o != null ? o.story_ids : void 0) != null ? ref : [];
        return db.collection("stories", {ObjectId}).aggregate([
          {
            $match: {
              _id: {
                $nin: list
              },
              is_finish: {
                $eq: true
              }
            }
          },
          {
            $project: {
              _id: 1
            }
          },
          {
            $group: {
              _id: null,
              story_ids: {
                $addToSet: "$_id"
              }
            }
          }
        ], {ObjectId});
      }).then(function([o]) {
        var id, list, ref, set_bases;
        list = (ref = o != null ? o.story_ids : void 0) != null ? ref : [];
        console.log("step B");
        console.log(list);
        set_bases = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = list.length; i < len; i++) {
            id = list[i];
            results.push(giji.set_base(id));
          }
          return results;
        })();
        return Promise.all(set_bases);
      });
    };
    return giji.set_base = function(story_id) {
      return db.collection("messages", {ObjectId}).aggregate([
        {
          $match: {
            story_id: story_id,
            sow_auth_id: {
              $exists: 1,
              $ne: null
            },
            face_id: {
              $exists: 1,
              $ne: null
            },
            logid: {
              $exists: 1,
              $ne: null
            },
            log: {
              $exists: 1,
              $ne: null
            }
          }
        },
        {
          $project: {
            sow_auth_id: 1,
            story_id: 1,
            face_id: 1,
            logid: 1,
            date: 1,
            size: {
              $strLenCP: "$log"
            }
          }
        },
        {
          $group: {
            _id: {
              sow_auth_id: "$sow_auth_id",
              story_id: "$story_id",
              face_id: "$face_id",
              mestype: {
                $substr: ["$logid",
        0,
        2]
              }
            },
            date_min: {
              $min: "$date"
            },
            date_max: {
              $max: "$date"
            },
            max: {
              $max: "$size"
            },
            all: {
              $sum: "$size"
            },
            count: {
              $sum: 1
            }
          }
        }
      ], {ObjectId}).then(function(data) {
        return db.collection("message_by_story_for_face").insert(data);
      });
    };
  }).catch(function() {
    return console.log("!!! mongodb connect error !!!");
  });
  app.get('/api/aggregate/job', function(req, res, next) {
    return giji.scan().then(function() {
      return giji.aggregate_message();
    }).then(function() {
      return giji.aggregate_potof();
    }).then(function() {
      return giji.aggregate_max();
    }).then(function() {
      return giji.oldlog();
    }).then(function() {
      res.json({
        started: true
      });
      return next();
    }).catch(function(e) {
      res.json(e);
      return next();
    });
  });
  app.get('/api/aggregate/faces', function(req, res, next) {
    var q;
    q = {};
    return Promise.all([giji.find("message_for_face", q), giji.find("potof_for_face", q), giji.find("potof_for_face_sow_auth_max", q)]).then(function([m_faces, faces, sow_auths]) {
      res.json({m_faces, faces, sow_auths});
      return next();
    }).catch(function(e) {
      console.error(req, e);
      return next();
    });
  });
  app.get('/api/aggregate/faces/:id', function(req, res, next) {
    var id, q;
    ({id} = req.params);
    q = {
      "_id.face_id": id
    };
    return Promise.all([giji.find("message_for_face", q), giji.find("message_for_face_mestype", q), giji.find("message_for_face_sow_auth", q), giji.find("potof_for_face", q), giji.find("potof_for_face_role", q), giji.find("potof_for_face_live", q)]).then(function([m_faces, mestypes, sow_auths, faces, roles, lives]) {
      res.json({m_faces, mestypes, sow_auths, faces, roles, lives});
      return next();
    }).catch(function(e) {
      console.error(req, e);
      return next();
    });
  });
  app.get('/api/story/progress', function(req, res, next) {
    var fields, json, q;
    q = {
      is_epilogue: false,
      is_finish: false
    };
    fields = {
      comment: 0,
      password: 0
    };
    json = {};
    return giji.find("stories", q, fields).then(function(data) {
      json.stories = data;
      return data.map(function(o) {
        return `${o._id}-0`;
      });
    }).then(function(ids) {
      return giji.find("events", {
        _id: {
          $in: ids
        }
      });
    }).then(function(data) {
      return json.events = data;
    }).then(function() {
      res.json(json);
      return next();
    }).catch(function(e) {
      console.error(req, e);
      return next();
    });
  });
  app.get('/api/story/oldlog', function(req, res, next) {
    var fields, q;
    q = {
      is_epilogue: true,
      is_finish: true
    };
    fields = {
      comment: 0,
      password: 0
    };
    return Promise.all([giji.find("stories", q, fields), giji.find("potof_for_face", {})]).then(function([stories, faces]) {
      res.json({stories, faces});
      return next();
    }).catch(function(e) {
      console.error(req, e);
      return next();
    });
  });
  app.get('/api/story/oldlog/:story_id', function(req, res, next) {
    var fields, story_id;
    ({story_id} = req.params);
    fields = {
      password: 0
    };
    return Promise.all([
      giji.find("stories",
      {
        _id: story_id,
        is_epilogue: true,
        is_finish: true
      },
      fields),
      giji.find("messages",
      {story_id}),
      giji.find("events",
      {story_id}),
      giji.find("potofs",
      {story_id})
    ]).then(function([stories, messages, events, potofs]) {
      if (!stories.length) {
        messages = events = potofs = [];
      }
      res.json({stories, messages, events, potofs});
      return next();
    }).catch(function(e) {
      console.error(req, e);
      return next();
    });
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("mongodb-bluebird");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Builder, Nuxt, builder, config, err, nuxt;

config = __webpack_require__(34);

// { Nuxt, Module, Renderer, Utils, Builder, Generator, Options } = require 'nuxt'
({Nuxt, Builder} = __webpack_require__(41));

nuxt = new Nuxt(config);

if (config.dev) {
  try {
    builder = new Builder(nuxt);
    // builder = nuxt
    builder.build();
  } catch (error) {
    err = error;
    console.error(err);
    process.exit(1);
  }
}

module.exports = function(app) {
  return app.use(nuxt.render);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  render: __webpack_require__(35),
  router: __webpack_require__(36),
  build: __webpack_require__(37),
  head: __webpack_require__(39),
  env: __webpack_require__(40),
  plugins: [],
  css: ['element-ui/lib/theme-default/index.css'],
  //####
  // Customize the progress-bar color

  loading: {
    color: '#3B8070'
  },
  modules: ['~/modules/coffeescript.js']
};


/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports) {

/*
const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition は popState ナビゲーションでのみ利用できます
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // 子パスが見つからないとき
    if (to.matched.length < 2) {
      // ページのトップへスクロールする
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // 子パスのひとつが scrollToTop オプションが true にセットされているとき
      position = { x: 0, y: 0 }
    }
    // アンカーがあるときは、セレクタを返すことでアンカーまでスクロールする
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}
*/
module.exports = {
  scrollBehavior: function(to, from, savedPosition) {
    var basic, book, has_top;
    book = function(idx_limit, to, from) {
      [from, to] = [from, to].map(function(o) {
        var name, page, part, ref;
        name = o.params.mode || o.name;
        part = (ref = o.params.idx) != null ? ref.split("-").slice(0, +idx_limit + 1 || 9e9).join("-") : void 0;
        page = o.query.page;
        if ('back' === page) {
          page = void 0;
        }
        return `${name} ${part} ${page}`;
      });
      if (from !== to) {
        console.log(`scroll to TOP (${from} != ${to})`);
        return {
          x: 0,
          y: 0
        };
      }
    };
    basic = function(has_top, to) {
      [from, to] = [from, to].map(function(o) {
        return o.path;
      });
      switch (false) {
        case from === to:
          console.log(`scroll to TOP (${from} != ${to})`);
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
            has_top = to.matched.some(function(r) {
              return r.components.default.options.scrollToTop;
            });
            return basic(has_top, to, from);
        }
    }
  }
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var ExtractTextPlugin;

ExtractTextPlugin = __webpack_require__(38);

module.exports = {
  extend: function(config, {isDev, isClient}) {},
  publicPath: '//s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt/dist/',
  babel: {
    presets: [
      "vue-app",
      [
        "env",
        {
          targets: {
            browsers: ["> 5%"]
          },
          forceAllTransforms: true
        }
      ]
    ]
  },
  vendor: ['d3', 'axios', 'lodash', 'vee-validate', '~/components/vue.coffee', '~/plugins/memory-record.coffee'],
  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1KO
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1KO
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
  ]
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

//####
// Headers of the page

var host;

host = "//s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt";

module.exports = {
  title: '人狼議事',
  meta: [
    {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=0.5, shrink-to-fit=no'
    },
    {
      hid: 'description',
      content: "Nuxt.js project"
    },
    {
      href: "mailto:7korobi@gmail.com"
    }
  ],
  link: [
    {
      rel: 'manifest',
      href: '/manifest.json'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      href: "mailto:7korobi@gmail.com"
    }
  ],
  script: [
    {
      src: host + '/monaco-editor/vs/loader.js',
      type: 'text/javascript',
      charset: 'utf8'
    }
  ]
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var game, url;

({url, game} = __webpack_require__(1));

module.exports = {url, game};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map