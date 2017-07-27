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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./nuxt.config.js");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var agenda, agenda_ui, pno, sh;

agenda = __webpack_require__(12);

sh = __webpack_require__(14);

pno = process.env.NODE_APP_INSTANCE;

agenda = new agenda({
  db: {
    address: "mongodb://localhost/giji",
    collection: "jobCollectionName",
    options: {
      server: {
        auto_reconnect: true
      }
    }
  }
});

agenda.define("aggregate", function(job, done) {
  return sh.exec('curl http://giji.check.jp/api/aggregate/job', function(err, stdout, stderr) {
    if (err) {
      console.error(err);
      return console.error(stderr);
    } else {
      return console.log(stdout);
    }
  });
});

agenda.on('ready', function() {
  if (!pno) {
    agenda.every('12 hours', 'aggregate');
  }
  return agenda.start();
});

agenda_ui = __webpack_require__(13);

module.exports = function(app) {
  app.use('/agenda-ui', agenda_ui(agenda, {
    poll: 5000
  }));
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectId, _, giji, mongo;

mongo = __webpack_require__(18);

_ = __webpack_require__(17);

ObjectId = false;

giji = {};

mongo.connect("mongodb://192.168.0.249/giji").then(function(db) {
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
        ...ext, {
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
        }, {
          $out: out
        }
      ], {ObjectId});
    };
    return Promise.all([
      cmd("message_for_face", {
        face_id: "$_id.face_id"
      }), cmd("message_for_face_sow_auth", {
        face_id: "$_id.face_id",
        sow_auth_id: "$_id.sow_auth_id"
      }), cmd("message_for_face_mestype", {
        face_id: "$_id.face_id",
        mestype: "$_id.mestype"
      })
    ]);
  };
  giji.aggregate_potof = function() {
    var cmd;
    cmd = function(out, keys, ...ext) {
      return db.collection("potofs", {ObjectId}).aggregate([
        ...ext, {
          $match: {
            sow_auth_id: {
              $exists: 1,
              $nin: [null, "master", "admin"]
            },
            face_id: {
              $exists: 1,
              $ne: null
            }
          }
        }, {
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
        }, {
          $out: out
        }
      ], {ObjectId});
    };
    return Promise.all([
      cmd("potof_for_face", {
        face_id: "$face_id"
      }), cmd("potof_for_face_live", {
        face_id: "$face_id",
        live: "$live"
      }), cmd("potof_for_face_sow_auth", {
        face_id: "$face_id",
        sow_auth_id: "$sow_auth_id"
      }), cmd("potof_for_face_role", {
        face_id: "$face_id",
        role_id: "$role"
      }, {
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
        }, {
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
        }, {
          $project: {
            _id: 1
          }
        }, {
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
      }, {
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
      }, {
        $group: {
          _id: {
            sow_auth_id: "$sow_auth_id",
            story_id: "$story_id",
            face_id: "$face_id",
            mestype: {
              $substr: ["$logid", 0, 2]
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

module.exports = function(app) {
  app.get('/api/aggregate/job', function(req, res, next) {
    return giji.scan().then(function() {
      return giji.aggregate_message();
    }).then(function() {
      return giji.aggregate_potof();
    }).then(function() {
      return giji.aggregate_max();
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
    return Promise.all([giji.find("potof_for_face", q), giji.find("potof_for_face_sow_auth_max", q)]).then(function([faces, sow_auths]) {
      res.json({faces, sow_auths});
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
    return Promise.all([giji.find("message_for_face", q), giji.find("message_for_face_mestype", q), giji.find("message_for_face_sow_auth", q), giji.find("potof_for_face_role", q), giji.find("potof_for_face_live", q)]).then(function([faces, mestypes, sow_auths, roles, lives]) {
      res.json({faces, mestypes, sow_auths, roles, lives});
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
    return giji.find("stories", q, fields).then(function(data) {
      res.json({
        stories: data
      });
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
      comment: 0,
      password: 0
    };
    return Promise.all([
      giji.find("stories", {
        _id: story_id,
        is_epilogue: true,
        is_finish: true
      }, fields), giji.find("messages", {story_id}), giji.find("events", {story_id}), giji.find("potofs", {story_id})
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Passport, Schema, mongoose, passport;

({Schema} = mongoose = __webpack_require__(19));

mongoose.connect("mongodb://localhost/giji");

Passport = mongoose.model('Passport', new Schema({
  _id: String,
  nick: String,
  icon: String,
  mail: String,
  write_at: Number,
  provider: String,
  account: String,
  token: String
}));

passport = __webpack_require__(1);

passport.serializeUser(function(o, done) {
  var id;
  id = [o.provider, o.account].join("-");
  return Passport.findByIdAndUpdate(id, o, {
    upsert: true
  }).exec(function(err, doc) {
    if (err) {
      console.error(err);
    }
    return done(err, id);
  });
});

passport.deserializeUser(function(id, done) {
  return done(null, id);
});

module.exports = function(app) {
  app.get('/api/user/:id', function(req, res, next) {
    var id;
    ({id} = req.params);
    return Passport.findById(id, function(err, doc) {
      res.json(doc);
      return next();
    });
  });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var auth, config, passport;

config = __webpack_require__(0);

passport = __webpack_require__(1);

auth = {
  slack: {
    module: __webpack_require__(23).Strategy,
    attr: {
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET
    }
  },
  google: {
    module: __webpack_require__(22).Strategy,
    attr: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true
    }
  },
  facebook: {
    module: __webpack_require__(20).Strategy,
    attr: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    }
  },
  github: {
    module: __webpack_require__(21).Strategy,
    attr: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  twitter: {
    module: __webpack_require__(24).Strategy,
    attr: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    }
  }
};

module.exports = function(app) {
  var attr, module, provider;
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/logout", function(req, res) {
    req.logout();
    return res.redirect('/');
  });
  for (provider in auth) {
    ({attr, module} = auth[provider]);
    if (config.dev) {
      attr.callbackURL = `http://lvh.me:4000/auth/${provider}/callback`;
    } else {
      attr.callbackURL = `http://giji.check.jp/auth/${provider}/callback`;
    }
    passport.use(new module(attr, function(accessToken, refreshToken, {provider, id, displayName, emails, photos}, done) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var MongoStore, day, interval, session;

session = __webpack_require__(16);

MongoStore = __webpack_require__(15)(session);

interval = 7 * 24 * 3600;

day = 24 * 3600;

module.exports = function(app) {
  app.use(session({
    secret: process.env.SECRET_KEY_BASE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: 'mongodb://localhost/giji',
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Nuxt, app, bodyParser, config, express, host, port, ref;

bodyParser = __webpack_require__(8);

express = __webpack_require__(9);

config = __webpack_require__(0);

Nuxt = __webpack_require__(10);

host = process.env.HOST || '127.0.0.1';

port = 4000 + parseInt((ref = process.env.pm_id) != null ? ref : 0);

app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
});

__webpack_require__(2)(app);

__webpack_require__(3)(app);

__webpack_require__(4)(app);

__webpack_require__(6)(app);

__webpack_require__(5)(app);

__webpack_require__(7)(app);

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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("agenda-ui");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("mongodb-bluebird");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth2");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("passport-slack");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ })
/******/ ]);