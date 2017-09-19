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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Agenda, Agendash, MONGO_URL, WEB_URL, agenda, jobs, pm_id, pno;

Agenda = __webpack_require__(25);

Agendash = __webpack_require__(26);

({pm_id, WEB_URL, MONGO_URL} = process.env);

pno = pm_id - 1 || 0;

jobs = function(cb) {
  var ctx, fname, i, len, name, ref, results;
  ctx = __webpack_require__(12);
  ref = ctx.keys();
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    fname = ref[i];
    name = fname.slice(2, -7);
    results.push(cb(name, ctx(fname)));
  }
  return results;
};

agenda = new Agenda({
  db: {
    address: MONGO_URL,
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

module.exports = function(app) {
  app.use('/agendash', Agendash(agenda));
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var API_URL, BACKUP, MONGO_URL_SOW, ObjectId, _, fs, giji, mongo, sh;

mongo = __webpack_require__(32);

sh = __webpack_require__(0);

fs = __webpack_require__(30);

_ = __webpack_require__(31);

({MONGO_URL_SOW, API_URL, BACKUP} = process.env);

ObjectId = false;

giji = {};

mongo.connect(MONGO_URL_SOW).then(function(db) {
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
      var data, id, path, url;
      data = (function() {
        var i, len, ref, results;
        ref = o.story_ids;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          id = ref[i];
          path = `./static/sow/${id}.json.gz`;
          url = `${API_URL}/story/oldlog/${id}`;
          results.push(`  ls "${path}" || curl "${url}" | gzip --stdout --best > "${path}"  `);
        }
        return results;
      })();
      path = "./static/sow/index.json.gz";
      url = `${API_URL}/story/oldlog`;
      data.push(` curl "${url}" | gzip --stdout --best > "${path}"  `);
      data.push(`rsync -a --delete ./static/sow/ ${BACKUP}/static/sow/`);
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

module.exports = function(app) {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var MONGO_URL, mongoose;

mongoose = __webpack_require__(33);

({MONGO_URL} = process.env);

mongoose.connect(MONGO_URL, function(err) {
  if (err) {
    return console.error(`no ${MONGO_URL}. disabled (passport, session)`);
  } else {
    return console.log("mongoose connected.");
  }
});

module.exports = function(app) {
  var ctx, fname, i, len, ref;
  ctx = __webpack_require__(13);
  ref = ctx.keys();
  for (i = 0, len = ref.length; i < len; i++) {
    fname = ref[i];
    ctx(fname)(app, mongoose);
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var WEB_URL, auth, config, passport;

config = __webpack_require__(24);

passport = __webpack_require__(1);

({WEB_URL} = process.env);

auth = {
  slack: {
    module: __webpack_require__(37).Strategy,
    attr: {
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET
    }
  },
  google: {
    module: __webpack_require__(36).Strategy,
    attr: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true
    }
  },
  facebook: {
    module: __webpack_require__(34).Strategy,
    attr: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    }
  },
  github: {
    module: __webpack_require__(35).Strategy,
    attr: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  twitter: {
    module: __webpack_require__(38).Strategy,
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
    attr.callbackURL = `${WEB_URL}/auth/${provider}/callback`;
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

var MONGO_URL, MongoStore, SECRET_KEY_BASE, day, interval, session;

session = __webpack_require__(28);

MongoStore = __webpack_require__(27)(session);

({MONGO_URL, SECRET_KEY_BASE} = process.env);

interval = 7 * 24 * 3600;

day = 24 * 3600;

module.exports = function(app) {
  app.use(session({
    secret: SECRET_KEY_BASE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: MONGO_URL,
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  render: __webpack_require__(22),
  router: __webpack_require__(23),
  build: __webpack_require__(19),
  head: __webpack_require__(21),
  env: __webpack_require__(20),
  plugins: [],
  css: ['element-ui/lib/theme-default/index.css'],
  //####
  // Customize the progress-bar color

  loading: {
    color: '#3B8070'
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggregate.coffee": 15,
	"./process.coffee": 16
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
webpackContext.id = 12;

/***/ }),
/* 13 */
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
webpackContext.id = 13;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var HOST, Nuxt, ONLY_VUE, app, bodyParser, builder, config, err, express, host, nuxt, pm_id, port;

bodyParser = __webpack_require__(9);

express = __webpack_require__(10);

config = __webpack_require__(8);

// { Nuxt, Module, Renderer, Utils, Builder, Generator, Options } = require 'nuxt'
Nuxt = __webpack_require__(11);

({pm_id, HOST, ONLY_VUE} = process.env);

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

if (!ONLY_VUE) {
  __webpack_require__(2)(app);
  __webpack_require__(3)(app);
  __webpack_require__(4)(app);
  __webpack_require__(6)(app);
  __webpack_require__(5)(app);
}

__webpack_require__(7)(app);

console.log(process.env);

nuxt = new Nuxt(config);

if (config.dev) {
  try {
    // builder = new Builder nuxt
    builder = nuxt;
    builder.build();
  } catch (error) {
    err = error;
    console.error(err);
    process.exit(1);
  }
}

app.use(nuxt.render);

app.listen(port, host);

console.log(`Server is listening on http://${host}:${port}`);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var API_URL, sh;

sh = __webpack_require__(0);

({API_URL} = process.env);

module.exports = {
  every: '12 hours',
  define: function(job, done) {
    return sh.exec(`curl ${API_URL}/aggregate/job`, function(err, stdout, stderr) {
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

module.exports = function(app, m) {
  var Book, Card, Chat, Part, Phase, Potof, Schema, Stat;
  ({Schema} = m);
  Card = m.model('Card', new Schema({
    write_at: Number,
    role_id: String,
    date: Number,
    idx: String,
    _id: String
  }));
  Stat = m.model('Stat', new Schema({
    write_at: Number,
    role_id: String,
    sw: Boolean,
    give: Number,
    idx: String,
    _id: String
  }));
  Potof = m.model('Potof', new Schema({
    write_at: Number,
    open_at: Number,
    face_id: String,
    sign: String,
    job: String,
    idx: Number,
    _id: String
  }));
  Book = m.model('Book', new Schema({
    write_at: Number,
    open_at: Number,
    label: String,
    sign: String,
    idx: Number,
    _id: String
  }));
  Part = m.model('Part', new Schema({
    write_at: Number,
    open_at: Number,
    label: String,
    idx: Number,
    _id: String
  }));
  Phase = m.model('Phase', new Schema({
    write_at: Number,
    label: String,
    handle: String,
    group: String,
    update: false,
    chat_idx: Number,
    idx: Number,
    _id: String
  }));
  Chat = m.model('Chat', new Schema({
    write_at: Number,
    potof_id: String,
    show: String,
    deco: String,
    log: String,
    idx: Number,
    _id: String
  }));
  app.post('/api/book', function(req, res, next) {
    var at, book, part;
    at = new Date() - 0;
    ({book} = req.body);
    book.write_at = at;
    if (book.open_at == null) {
      book.open_at = at;
    }
    part = {
      _id: `${book._id}-0`,
      idx: 0,
      label: "プロローグ",
      open_at: book.open_at,
      write_at: book.write_at
    };
    return Promise.all([
      Book.findByIdAndUpdate(book._id,
      book,
      {
        upsert: true
      }).exec(),
      Part.findByIdAndUpdate(part._id,
      part,
      {
        upsert: true
      }).exec()
    ]).then(function(book, part) {
      res.json({book, part});
      return next();
    }).catch(function(err) {
      console.error(err);
      res.json({err});
      return next();
    });
  });
  app.post('/api/part', function(req, res, next) {
    var at, idx, part, phases;
    at = new Date() - 0;
    ({part} = req.body);
    part.write_at = at;
    if (part.open_at == null) {
      part.open_at = at;
    }
    idx = 0;
    phases = [
      {
        label: "公開情報",
        handle: "public",
        group: "I",
        update: false
      },
      {
        label: "秘密情報",
        handle: "private",
        group: "I",
        update: false
      },
      {
        label: "管理",
        handle: "MAKER",
        group: "S",
        update: true
      },
      {
        label: "発言",
        handle: "SSAY",
        group: "S",
        update: false
      },
      {
        label: "発言",
        handle: "VSSAY",
        group: "S",
        update: false
      },
      {
        label: "内緒話",
        handle: "AIM",
        group: "S",
        update: false
      },
      {
        label: "独り言",
        handle: "TSAY",
        group: "S",
        update: false
      }
    ].map(function(o) {
      o.idx = idx;
      o._id = `${part._id}-${idx++}`;
      o.write_at = at;
      return Phase.findByIdAndUpdate(o._id, o, {
        upsert: true
      }).exec();
    });
    return Promise.all([
      Part.findByIdAndUpdate(part._id,
      part,
      {
        upsert: true
      }).exec(),
      ...phases
    ]).then(function(part, phase) {
      res.json({part, phase});
      return next();
    }).catch(function(err) {
      console.error(err);
      res.json({err});
      return next();
    });
  });
  return app.post('/api/potof', function(req, res, next) {
    var at, cards, potof, stat, stats;
    at = new Date() - 0;
    ({potof, stat} = req.body);
    potof.write_at = at;
    if (potof.open_at == null) {
      potof.open_at = at;
    }
    stats = [
      stat,
      {
        idx: "give",
        give: 1
      }
    ].map(function(o) {
      o._id = `${potof._id}-${o.idx}`;
      o.write_at = at;
      return Stat.findByIdAndUpdate(o._id, o, {
        upsert: true
      }).exec();
    });
    cards = [
      {
        idx: "request",
        role_id: null
      }
    ].map(function(o) {
      o._id = `${potof._id}-${o.idx}`;
      o.write_at = at;
      return Card.findByIdAndUpdate(o._id, o, {
        upsert: true
      }).exec();
    });
    return Promise.all([
      Part.findByIdAndUpdate(part._id,
      part,
      {
        upsert: true
      }).exec(),
      ...stats,
      ...cards
    ]).then(function(part, phase) {
      res.json({part, phase});
      return next();
    }).catch(function(err) {
      console.error(err);
      res.json({err});
      return next();
    });
  });
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(app, m) {
  var Passport, Schema, passport;
  ({Schema} = m);
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
  Passport = m.model('Passport', new Schema({
    _id: String,
    nick: String,
    icon: String,
    mail: String,
    write_at: Number,
    provider: String,
    account: String,
    token: String
  }));
  return app.get('/api/user/:id', function(req, res, next) {
    var id;
    ({id} = req.params);
    return Passport.findById(id, function(err, doc) {
      res.json(doc);
      return next();
    });
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var ExtractTextPlugin;

ExtractTextPlugin = __webpack_require__(29);

module.exports = {
  extend: function(config, {isDev, isClient}) {},
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
  vendor: ['axios', 'vee-validate', '~/components/vue.coffee', '~/plugins/memory-record.coffee'],
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
/* 20 */
/***/ (function(module, exports) {

var API_URL, BACKUP, SOW_URL, STORE_URL, WEB_URL;

({WEB_URL, API_URL, SOW_URL, STORE_URL, BACKUP} = process.env);

module.exports = {WEB_URL, API_URL, SOW_URL, STORE_URL, BACKUP};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

//####
// Headers of the page

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
      src: '/monaco-editor/vs/loader.js',
      type: 'text/javascript',
      charset: 'utf8'
    }
  ]
};


/***/ }),
/* 22 */
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
/* 23 */
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
    book = function(idx_limit, has_top, to, from) {
      [from, to] = [from, to].map(function(o) {
        var name, part, ref;
        name = o.params.mode || o.name;
        part = (ref = o.params.idx) != null ? ref.split("-").slice(0, +idx_limit + 1 || 9e9).join("-") : void 0;
        return `${name} ${part}`;
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
      console.log({to, from});
      switch (false) {
        case from.path === to.path:
          console.log(`scroll to TOP (${from.path} != ${to.path})`);
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
        has_top = to.matched.some(function(r) {
          return r.components.default.options.scrollToTop;
        });
        switch (to.name) {
          case "sow-village-idx-mode":
            return book(2, has_top, to, from);
          case "sow-village-idx-anker":
            return book(1, has_top, to, from);
          default:
            return basic(has_top, to, from);
        }
    }
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("./nuxt.config.js");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("agendash");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("mongodb-bluebird");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth2");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("passport-slack");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map