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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

module.exports = require("passport");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var app, conf, express, host, pm_id, port;

express = __webpack_require__(5);

app = express();

conf = __webpack_require__(1);

({pm_id} = process.env);

Object.assign(conf, {pm_id});

process.on('unhandledRejection', console.dir);

__webpack_require__(6)(app, conf);

if (conf.use_api) {
  __webpack_require__(8)(app, conf);
  __webpack_require__(14)(app, conf);
  __webpack_require__(19)(app, conf);
  __webpack_require__(22)(app, conf);
  // for only legacy jinrogiji
  __webpack_require__(28)(app, conf);
}

__webpack_require__(31)(app, conf);

__webpack_require__(32)(app, conf);

host = conf.host || '127.0.0.1';

port = (conf.port || 4000) + (pm_id - 0 || 0);

app.listen(port, host);

console.log(`Server is listening on http://${host}:${port}`);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var bodyParser;

bodyParser = __webpack_require__(7);

module.exports = function(app) {
  app.use(bodyParser.json());
  return app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Agenda, Agendash, jobs;

Agenda = __webpack_require__(9);

Agendash = __webpack_require__(10);

jobs = function(cb) {
  var ctx, fname, i, len, name, ref, results;
  ctx = __webpack_require__(11);
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
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("agendash");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggregate.coffee": 12,
	"./process.coffee": 13
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
webpackContext.id = 11;

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose;

mongoose = __webpack_require__(15);

module.exports = function(app, {db}) {
  var ctx, fname, i, len, ref;
  mongoose.connect(db.mongo, {
    config: {
      autoIndex: false
    }
  }, function(err) {
    if (err) {
      return console.error(`no ${db.mongo}. disabled (passport, session)`);
    } else {
      return console.log("mongoose connected.");
    }
  });
  ctx = __webpack_require__(16);
  ref = ctx.keys();
  for (i = 0, len = ref.length; i < len; i++) {
    fname = ref[i];
    ctx(fname)(app, mongoose);
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./book.coffee": 17,
	"./passport.coffee": 18
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
webpackContext.id = 16;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var folder_id;

folder_id = "test";

module.exports = function(app, m) {
  var API, Book, Card, Chat, NodeIdx, Part, Phase, Potof, Schema, Stat, add_book, add_chat, add_for_tree, add_part, add_phase, add_potof, chk_book, require_uniq, up_book, up_chat, up_for_tree, up_part, up_phase, up_phases_step_1, up_phases_step_2, up_potof, up_stat;
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
    idx: Number,
    _id: String,
    sign: String,
    job: String
  }, {
    versionKey: false
  }));
  NodeIdx = m.model('NodeIdx', new Schema({
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
    idx: Number,
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
    idx: Number,
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
    idx: Number,
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
    idx: Number,
    _id: String,
    show: String,
    deco: String,
    log: String
  }, {
    versionKey: false
  }));
  API = function(cb) {
    return async function(req, res, next) {
      var fileName, lineNumber, message, name, stack;
      try {
        return res.json((await cb(req)));
      } catch (error) {
        ({name, message, stack, fileName, lineNumber} = error);
        return res.json({name, message, stack, fileName, lineNumber});
      }
    };
  };
  require_uniq = async function(model, _id, query) {
    var old;
    old = (await model.findOne(query).exec());
    if (old) {
      if (!(_id && _id === old._id)) {
        throw new Error(`${old._id} が作成済みです。`);
      }
    }
    return old;
  };
  up_for_tree = function(model, o) {
    var write_at;
    write_at = new Date() - 0;
    if (o.open_at == null) {
      o.open_at = write_at;
    }
    Object.assign(o, {write_at});
    return model.findByIdAndUpdate(o._id, o, {
      upsert: true
    }).exec();
  };
  add_for_tree = async function(_id, model, o) {
    var idx;
    ({idx} = (await NodeIdx.findByIdAndUpdate(_id, {
      $setOnInsert: {
        idx: 1
      },
      $inc: {
        idx: 1
      }
    }, {
      upsert: true,
      returnNewDocument: true
    }).exec()));
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
  up_phases_step_1 = function(_id) {
    return [
      up_phase({
        _id: `${_id}-mT`,
        idx: "mT",
        label: '情報',
        handle: 'MAKER',
        group: 'T',
        update: true
      }),
      up_phase({
        _id: `${_id}-TS`,
        idx: "TS",
        label: '独り言',
        handle: 'TSAY',
        group: 'S',
        update: false
      }),
      up_phase({
        _id: `${_id}-TT`,
        idx: "TT",
        label: '情報',
        handle: 'private',
        group: 'T',
        update: false
      })
    ];
  };
  up_phases_step_2 = function(_id) {
    return [
      up_phase({
        _id: `${_id}-ST`,
        idx: "ST",
        label: '情報',
        handle: 'public',
        group: 'T',
        update: false
      }),
      up_phase({
        _id: `${_id}-SS`,
        idx: "SS",
        label: '発言',
        handle: 'SSAY',
        group: 'S',
        update: false
      }),
      up_phase({
        _id: `${_id}-VS`,
        idx: "VS",
        label: '発言',
        handle: 'VSAY',
        group: 'S',
        update: false
      }),
      up_phase({
        _id: `${_id}-AS`,
        idx: "AS",
        label: "内緒話",
        handle: "AIM",
        group: "S",
        update: false
      })
    ];
  };
  app.get('/api/book', API(async function() {
    var books;
    books = (await Book.find(books));
    return {books};
  }));
  app.get('/api/book/:book_id', API(async function({
      params: {book_id},
      query: {write_at},
      session: {
        passport: {user}
      }
    }) {
    var _id, book, cards, i, is_master, is_player, len, parts, phases, potof, potofs, stats;
    _id = {
      $regex: RegExp(`^${book_id}-`)
    };
    [book, potofs, stats, cards, parts, phases] = (await Promise.all([Book.findById(book_id), Potof.find({_id}), Stat.find({_id}), Card.find({_id}), Part.find({_id}), Phase.find({_id})]));
    for (i = 0, len = potofs.length; i < len; i++) {
      potof = potofs[i];
      if (!(potof.passport_id === user._id)) {
        continue;
      }
      session.potof = potof;
      is_player = true;
    }
    is_master = book.passport_id === user._id;
    session.book = {is_master, is_player};
    return {book, potofs, stats, cards, parts, phases};
  }));
  app.get('/api/book/:book_id/chats', API(async function({
      params: {book_id},
      query: {write_at},
      session: {
        potof: potof,
        passport: {user}
      }
    }) {
    var _id, chats;
    _id = {
      $regex: RegExp(`^${book_id}-`)
    };
    ({
      potof_id: {
        $in: [potof._id]
      },
      phase_handle: {
        $in: [...phase_handle, 'SSAY', 'VSAY', 'GSAY', 'VGSAY', 'public', 'MAKER', 'ADMIN']
      }
    });
    return [chats] = (await Promise.all([
      Chat.find({
        _id: _id,
        $or: [{potof_id},
      {phase_handle}]
      })
    ]));
  }));
  app.post('/api/book/create', API(async function({
      body: {book},
      session: {
        passport: {user}
      }
    }) {
    var _id, args;
    book = ({_id} = (await add_book(book)));
    args = (await Promise.all([
      up_part({
        _id: `${_id}-0`,
        idx: "0",
        label: 'プロローグ'
      }),
      up_chat({
        _id: `${_id}-0-mT-welcome`,
        idx: "welcome",
        sign: user.sign
      }),
      up_chat({
        _id: `${_id}-0-mT-nrule`,
        idx: "nrule",
        sign: user.sign
      }),
      up_chat({
        _id: `${_id}-0-mT-vrule`,
        idx: "vrule",
        sign: user.sign
      }),
      ...up_phases_step_1(`${_id}-0`)
    ]));
    return {book, args};
  }));
  app.post('/api/book', API(async function({
      body: {book},
      session: {
        passport: {user}
      }
    }) {
    var _id, args, npc_id, passport_id;
    book = ({_id, passport_id} = (await up_book(book)));
    npc_id = `${_id}-NPC`;
    args = (await Promise.all([
      up_potof({
        _id: npc_id,
        idx: "NPC",
        passport_id: passport_id,
        sign: user.sign
      }),
      // face_id:
      // job:
      up_chat({
        _id: `${_id}-0-SS-0`,
        idx: "0",
        potof_id: npc_id
      }),
      ...up_phases_step_2(`${_id}-0`)
    ]));
    return {book, args};
  }));
  app.post('/api/part/:book_id', API(async function({
      params: {book_id},
      body: {part}
    }) {
    var _id, args;
    part = ({_id} = (await add_part(book_id, part)));
    args = (await Promise.all([...up_phases_step_1(_id), ...up_phases_step_2(_id)]));
    ({part, args});
    return {
      params: {book_id},
      query: {write_at},
      body: {book},
      session: {
        passport: {user}
      }
    };
  }));
  app.post('/api/potof/:book_id', API(async function({
      params: {book_id},
      body: {potof, phase_id}
    }) {
    var _id, args;
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(app, m) {
  var Passport, Schema, passport;
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
  passport = __webpack_require__(2);
  passport.serializeUser(function(o, done) {
    var _id, ref;
    _id = [o.provider, o.account].join("-");
    return Passport.findByIdAndUpdate(_id, o, {
      $setOnInsert: {
        sign: (ref = o.mail) != null ? ref : o.nick
      },
      upsert: true
    }).exec(function(err) {
      return done(err, o);
    });
  });
  return passport.deserializeUser(function(o, done) {
    return done(null, o);
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var MongoStore, day, interval, session;

session = __webpack_require__(20);

MongoStore = __webpack_require__(21)(session);

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
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var _, passport, plugins;

_ = __webpack_require__(3);

passport = __webpack_require__(2);

plugins = {
  facebook: __webpack_require__(23),
  twitter: __webpack_require__(24),
  slack: __webpack_require__(25),
  github: __webpack_require__(26),
  google: __webpack_require__(27)
};

module.exports = function(app, {auth, url}) {
  var Strategy, attr, provider;
  app.use(passport.initialize());
  app.use(passport.session());
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
      return process.nextTick(function() {
        console.log("profile", profile);
        return done(null, profile);
      });
    }));
    console.log(`${provider} authenticate set.`);
    app.get(`/auth/${provider}`, passport.authenticate(provider));
    app.get(`/auth/${provider}/callback`, passport.authenticate(provider, {
      failureRedirect: '/',
      successRedirect: '/'
    }));
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("passport-slack");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth2");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectId, _, fs, giji, mongo, sh;

mongo = __webpack_require__(29);

sh = __webpack_require__(0);

fs = __webpack_require__(30);

_ = __webpack_require__(3);

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
/* 29 */
/***/ (function(module, exports) {

module.exports = require("mongodb-bluebird");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 31 */
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
    },
    {
      _id: "demo-0-1",
      label: "一日目"
    },
    {
      _id: "demo-0-2",
      label: "エピローグ"
    }
  ],
  sections: [
    {
      _id: "demo-0-0-1"
    },
    {
      _id: "demo-0-0-2"
    },
    {
      _id: "demo-0-1-1"
    },
    {
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
    },
    {
      _id: "demo-0-0-1",
      handle: "SSAY",
      idx: 26,
      guide: true,
      update: false
    },
    {
      _id: "demo-0-0-2",
      handle: "TSAY",
      idx: 2,
      guide: true,
      update: false
    },
    {
      _id: "demo-0-0-3",
      handle: "MAKER",
      idx: 2,
      guide: true,
      update: false
    },
    {
      _id: "demo-0-0-4",
      handle: "ADMIN",
      idx: 2,
      guide: true,
      update: false
    },
    {
      _id: "demo-0-0-5",
      handle: "VSSAY",
      idx: 3,
      guide: true,
      update: false
    },
    {
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
    },
    {
      _id: "demo-0-0-2-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-3-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-4-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-5-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-6-request",
      role_id: "headless"
    },
    {
      _id: "demo-0-0-7-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-8-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-9-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-10-request",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-1-live",
      role_id: "juror",
      date: 2e308
    },
    {
      _id: "demo-0-0-1-role",
      role_id: "juror"
    },
    {
      _id: "demo-0-0-2-live",
      role_id: "suddendead",
      date: 3
    },
    {
      _id: "demo-0-0-2-role",
      role_id: "stigma"
    },
    {
      _id: "demo-0-0-3-live",
      role_id: "executed",
      date: 4
    },
    {
      _id: "demo-0-0-3-role",
      role_id: "possess"
    },
    {
      _id: "demo-0-0-4-live",
      role_id: "live",
      date: 2e308
    },
    {
      _id: "demo-0-0-4-role",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-5-live",
      role_id: "victim",
      date: 6
    },
    {
      _id: "demo-0-0-5-role",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-6-live",
      role_id: "executed",
      date: 5
    },
    {
      _id: "demo-0-0-6-role",
      role_id: "headless"
    },
    {
      _id: "demo-0-0-7-live",
      role_id: "live",
      date: 2e308
    },
    {
      _id: "demo-0-0-7-role",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-8-live",
      role_id: "live",
      date: 2e308
    },
    {
      _id: "demo-0-0-8-role",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-8-gift",
      role_id: "ogre"
    },
    {
      _id: "demo-0-0-8-bond",
      role_id: "hate"
    },
    {
      _id: "demo-0-0-8-book",
      role_id: "master"
    },
    {
      _id: "demo-0-0-9-live",
      role_id: "live",
      date: 2e308
    },
    {
      _id: "demo-0-0-9-role",
      role_id: "guru"
    },
    {
      _id: "demo-0-0-10-live",
      role_id: "executed",
      date: 2
    },
    {
      _id: "demo-0-0-10-role",
      role_id: "villager"
    },
    {
      _id: "demo-0-0-10-bond",
      role_id: "love"
    }
  ],
  stats: [
    {
      _id: "demo-0-0-1-give",
      give: 1
    },
    {
      _id: "demo-0-0-1-VSSAY",
      pt: 2e308,
      said: 13
    },
    {
      _id: "demo-0-0-1-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-1-vote",
      cmd: "vote",
      target: "demo-0-0-1"
    },
    {
      _id: "demo-0-0-1-entrust",
      target: null
    },
    {
      // { _id: "demo-0-0-1-commit", sw: true }
      _id: "demo-0-0-2-give",
      give: 1
    },
    {
      _id: "demo-0-0-2-GSAY",
      pt: 2e308,
      said: 14
    },
    {
      _id: "demo-0-0-2-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-2-aura"
    },
    {
      _id: "demo-0-0-2-stigma",
      label: "青い"
    },
    {
      _id: "demo-0-0-2-human"
    },
    {
      // { _id: "demo-0-0-2-commit", sw: true }
      _id: "demo-0-0-3-give",
      give: 1
    },
    {
      _id: "demo-0-0-3-GSAY",
      pt: 2e308,
      said: 15
    },
    {
      _id: "demo-0-0-3-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-3-aura"
    },
    {
      _id: "demo-0-0-3-human"
    },
    {
      _id: "demo-0-0-3-evil"
    },
    {
      // { _id: "demo-0-0-3-commit", sw: true }
      _id: "demo-0-0-4-give",
      give: 0
    },
    {
      _id: "demo-0-0-4-SSAY",
      pt: 2e308,
      said: 16
    },
    {
      _id: "demo-0-0-4-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-4-AIM",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-4-human"
    },
    {
      _id: "demo-0-0-4-commit",
      sw: true
    },
    {
      _id: "demo-0-0-4-vote",
      cmd: "vote",
      target: "demo-0-0-4"
    },
    {
      _id: "demo-0-0-4-entrust",
      cmd: "entrust",
      target: null
    },
    {
      _id: "demo-0-0-5-give",
      give: 1
    },
    {
      _id: "demo-0-0-5-GSAY",
      pt: 2e308,
      said: 17
    },
    {
      _id: "demo-0-0-5-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-5-human"
    },
    {
      // { _id: "demo-0-0-5-commit", sw: true }
      _id: "demo-0-0-6-give",
      give: 1
    },
    {
      _id: "demo-0-0-6-GSAY",
      pt: 2e308,
      said: 18
    },
    {
      _id: "demo-0-0-6-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-6-aura"
    },
    {
      _id: "demo-0-0-6-wolf"
    },
    {
      _id: "demo-0-0-6-hunt",
      cmd: "role",
      target: null
    },
    {
      // { _id: "demo-0-0-6-commit", sw: true }
      // { _id: "demo-0-0-6-WSAY", pt: Infinity, said: 1 }
      _id: "demo-0-0-7-give",
      give: 0
    },
    {
      _id: "demo-0-0-7-SSAY",
      pt: 2000,
      said: 19
    },
    {
      _id: "demo-0-0-7-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-7-AIM",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-7-human"
    },
    {
      _id: "demo-0-0-7-commit",
      sw: true
    },
    {
      _id: "demo-0-0-7-vote",
      cmd: "vote",
      target: "demo-0-0-7"
    },
    {
      _id: "demo-0-0-7-entrust",
      cmd: "entrust",
      target: null
    },
    {
      _id: "demo-0-0-8-give",
      give: 0
    },
    {
      _id: "demo-0-0-8-SSAY",
      pt: 2e308,
      said: 20
    },
    {
      _id: "demo-0-0-8-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-8-AIM",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-8-human"
    },
    {
      _id: "demo-0-0-8-commit",
      sw: true
    },
    {
      _id: "demo-0-0-8-vote",
      cmd: "vote",
      target: "demo-0-0-8"
    },
    {
      _id: "demo-0-0-8-entrust",
      cmd: "entrust",
      target: null
    },
    {
      _id: "demo-0-0-8-hate",
      cmd: "bond",
      target: "demo-0-10"
    },
    {
      _id: "demo-0-0-8-wolf"
    },
    {
      _id: "demo-0-0-8-hunt",
      cmd: "role",
      target: null
    },
    {
      _id: "demo-0-0-8-friend"
    },
    {
      _id: "demo-0-0-8-WSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-9-give",
      give: 0
    },
    {
      _id: "demo-0-0-9-SSAY",
      pt: 2e308,
      said: 21
    },
    {
      _id: "demo-0-0-9-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-9-AIM",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-9-aura"
    },
    {
      _id: "demo-0-0-9-human"
    },
    {
      _id: "demo-0-0-9-guru"
    },
    {
      _id: "demo-0-0-9-commit",
      sw: true
    },
    {
      _id: "demo-0-0-9-vote",
      cmd: "vote",
      target: "demo-0-0-9"
    },
    {
      _id: "demo-0-0-9-entrust",
      cmd: "entrust",
      target: null
    },
    {
      _id: "demo-0-0-10-give",
      give: 1
    },
    {
      _id: "demo-0-0-10-GSAY",
      pt: 2e308,
      said: 22
    },
    {
      _id: "demo-0-0-10-TSAY",
      pt: 2e308,
      said: 1
    },
    {
      _id: "demo-0-0-10-human"
    },
    {
      // { _id: "demo-0-0-10-commit", sw: true }
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
    },
    {
      _id: "demo-0-0-9",
      face_id: "c40",
      winner_id: "GURU",
      job: "R-",
      sign: "七転び"
    },
    {
      _id: "demo-0-0-8",
      face_id: "c50",
      winner_id: "LOVER",
      job: "R-",
      sign: "ななころ"
    },
    {
      _id: "demo-0-0-7",
      face_id: "c87",
      winner_id: "HUMAN",
      job: "病人",
      sign: "七転び"
    },
    {
      _id: "demo-0-0-6",
      face_id: "t05",
      winner_id: "HUMAN",
      job: "開放的市民",
      sign: "noko"
    },
    {
      _id: "demo-0-0-5",
      face_id: "c29",
      winner_id: "HUMAN",
      job: "記者",
      sign: "うに"
    },
    {
      _id: "demo-0-0-4",
      face_id: "c90",
      winner_id: "WOLF",
      job: "粉ひき",
      sign: "魚屋"
    },
    {
      _id: "demo-0-0-3",
      face_id: "c70",
      winner_id: "EVIL",
      job: "腐女子",
      sign: "namba"
    },
    {
      _id: "demo-0-0-2",
      face_id: "c80",
      winner_id: "HUMAN",
      job: "少年",
      sign: "ななころ"
    },
    {
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Builder, Nuxt, builder, config, err, nuxt;

config = __webpack_require__(33);

// { Nuxt, Module, Renderer, Utils, Builder, Generator, Options } = require 'nuxt'
({Nuxt, Builder} = __webpack_require__(40));

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  render: __webpack_require__(34),
  router: __webpack_require__(35),
  build: __webpack_require__(36),
  head: __webpack_require__(38),
  env: __webpack_require__(39),
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
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var ExtractTextPlugin;

ExtractTextPlugin = __webpack_require__(37);

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
/* 37 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var url;

({url} = __webpack_require__(1));

module.exports = {url};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map