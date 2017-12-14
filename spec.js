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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var index;

module.exports = index = {
  Set: {},
  Map: {},
  Name: {},
  Finder: {},
  Query: {},
  set_deploy: function(key, cb) {
    return this.Name[key].deploys.push(cb);
  },
  set_depend: function(key, cb) {
    return this.Name[key].depends.push(cb);
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Mem;

module.exports = Mem = __webpack_require__(1);

Mem.Rule = __webpack_require__(21);

Mem.Base = {
  Query: __webpack_require__(3),
  Set: __webpack_require__(9),
  Map: __webpack_require__(10),
  Model: __webpack_require__(8),
  Finder: __webpack_require__(7)
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Mem, OBJ, Query, _, query_parser, set_for;

_ = __webpack_require__(0);

Mem = __webpack_require__(1);

OBJ = function() {
  return new Object(null);
};

set_for = function(list) {
  var i, key, len, set;
  set = OBJ();
  for (i = 0, len = list.length; i < len; i++) {
    key = list[i];
    set[key] = true;
  }
  return set;
};

query_parser = function(base, req, cb) {
  if (!req) {
    return base;
  }
  return new Query(base, function() {
    var key, results, val;
    this._filters = base._filters.concat();
    switch (req && req.constructor) {
      case Object:
        results = [];
        for (key in req) {
          val = req[key];
          results.push(cb(this, key, val, _.property(key)));
        }
        return results;
        break;
      case Function:
      case Array:
      case String:
        return cb(this, null, req, function(o) {
          return o;
        });
      default:
        return console.log({req});
    }
  });
};

//throw Error 'unimplemented'
module.exports = Query = (function() {
  class Query {
    static build() {
      var $sort, _all_ids, _filters, _group;
      _all_ids = _group = null;
      _filters = [];
      $sort = {};
      return new Query({_all_ids, _group, _filters, $sort}, function() {
        this.all = this;
        return this._memory = OBJ();
      });
    }

    constructor(base, tap) {
      this._step = 0;
      this._copy(base);
      tap.call(this);
    }

    _copy({
        all: all,
        _all_ids: _all_ids1,
        _group: _group1,
        _filters: _filters1,
        $sort: $sort1
      }) {
      this.all = all;
      this._all_ids = _all_ids1;
      this._group = _group1;
      this._filters = _filters1;
      this.$sort = $sort1;
    }

    in(req) {
      return query_parser(this, req, function(q, target, req, path) {
        var add, set;
        add = function(f) {
          return q._filters.push(f);
        };
        switch (req && req.constructor) {
          case Array:
            set = set_for(req);
            return add(function(o) {
              var i, key, len, ref;
              ref = path(o);
              for (i = 0, len = ref.length; i < len; i++) {
                key = ref[i];
                if (set[key]) {
                  return true;
                }
              }
              return false;
            });
          case RegExp:
            return add(function(o) {
              var i, len, ref, val;
              ref = path(o);
              for (i = 0, len = ref.length; i < len; i++) {
                val = ref[i];
                if (req.test(val)) {
                  return true;
                }
              }
              return false;
            });
          case null:
          case 0:
          case Boolean:
          case String:
          case Number:
            return add(function(o) {
              var ref;
              return -1 < ((ref = path(o)) != null ? ref.indexOf(req) : void 0);
            });
          default:
            console.log({target, req, path});
            throw Error('unimplemented');
        }
      });
    }

    where(req) {
      return query_parser(this, req, function(q, target, req, path) {
        var add, set;
        add = function(f) {
          return q._filters.push(f);
        };
        switch (req && req.constructor) {
          case Function:
            return add(req);
          case Array:
            if ("_id" === target) {
              return q._all_ids = req;
            } else {
              set = set_for(req);
              return add(function(o) {
                return set[path(o)];
              });
            }
            break;
          case RegExp:
            return add(function(o) {
              return req.test(path(o));
            });
          case null:
          case 0:
          case Boolean:
          case String:
          case Number:
            if ("_id" === target) {
              return q._all_ids = [req];
            } else {
              return add(function(o) {
                return req === path(o);
              });
            }
            break;
          default:
            console.log({target, req, path});
            throw Error('unimplemented');
        }
      });
    }

    search(text) {
      var item, list, regexp;
      if (!text) {
        return this;
      }
      list = (function() {
        var i, len, ref, results;
        ref = text.split(/\s+/);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          if (!item.length) {
            continue;
          }
          results.push(`(${item})`);
        }
        return results;
      })();
      if (!list.length) {
        return this;
      }
      regexp = new RegExp(list.join("|"), "ig");
      return this.where(function(o) {
        return (!o.search_words) || regexp.test(o.search_words);
      });
    }

    shuffle() {
      return this.sort(Math.random);
    }

    order(order) {
      if (_.isEqual(order, this.$sort['_reduce.list'])) {
        return this;
      }
      return new Query(this, function() {
        this.$sort = _.cloneDeep(this.$sort);
        return this.$sort['_reduce.list'] = order;
      });
    }

    sort(...sort) {
      return this.order({sort});
    }

    page(page_by) {
      return this.order({page_by});
    }

    find(...ids) {
      var i, id, len, o;
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        if (o = this.hash[id]) {
          if (o) {
            return o;
          }
        }
      }
      return null;
    }

    finds(ids) {
      var i, id, len, o, results;
      results = [];
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        if (o = this.hash[id]) {
          results.push(o);
        }
      }
      return results;
    }

    pluck() {
      return this.list.pluck(...arguments);
    }

  };

  Object.defineProperties(Query.prototype, {
    reduce: {
      get: function() {
        if (this._step < this.all._finder.step) {
          this.all._finder.calculate(this, this.all._memory);
        }
        return this._reduce;
      }
    },
    list: {
      get: function() {
        return this.reduce.list;
      }
    },
    hash: {
      get: function() {
        return this.reduce.hash;
      }
    },
    memory: {
      get: function() {
        return this.all._memory;
      }
    },
    ids: {
      get: function() {
        return Object.keys(this.hash);
      }
    }
  });

  return Query;

})();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var YAML, fs;

YAML = __webpack_require__(20);

fs = __webpack_require__(6);

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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $step, Finder, Format, OBJ, Query, _, each, validate;

_ = __webpack_require__(0);

({Query, Format} = __webpack_require__(1));

OBJ = function() {
  return new Object(null);
};

each = function(from, process) {
  var i, id, item, len;
  switch (from != null ? from.constructor : void 0) {
    case Array:
      for (i = 0, len = from.length; i < len; i++) {
        item = from[i];
        process(item);
      }
      break;
    case Object:
      for (id in from) {
        item = from[id];
        item._id = id;
        process(item);
      }
  }
};

validate = function(item, chklist) {
  var chk, i, len;
  if (!(item && chklist)) {
    return false;
  }
  for (i = 0, len = chklist.length; i < len; i++) {
    chk = chklist[i];
    if (!chk(item)) {
      return false;
    }
  }
  return true;
};

$step = 0;

module.exports = Finder = class Finder {
  constructor(name) {
    this.name = name;
    this.step = ++$step;
  }

  calculate(query, memory) {
    var cache;
    cache = _.cloneDeep(this.format);
    this.reduce(this.map, cache, query, memory);
  }

  reduce(map, cache, query, memory) {
    var $group, a, cmd, i, id, item, j, len, len1, o, path, paths, ref, ref1, ref2, results;
    query._step = ++$step;
    paths = {
      _reduce: {
        list: [],
        hash: {}
      }
    };
    delete query._reduce;
    ref1 = (ref = query._all_ids) != null ? ref : Object.keys(memory);
    for (i = 0, len = ref1.length; i < len; i++) {
      id = ref1[i];
      if (!(o = memory[id])) {
        continue;
      }
      ({item, $group} = o);
      if (!validate(item, query._filters)) {
        continue;
      }
      for (j = 0, len1 = $group.length; j < len1; j++) {
        [path, a] = $group[j];
        o = paths[path] = cache[path];
        map.reduce(item, o, a);
      }
    }
    for (path in paths) {
      o = paths[path];
      map.finish(o, query, this.set);
      _.set(query, path, o);
    }
    ref2 = query.$sort;
    results = [];
    for (path in ref2) {
      cmd = ref2[path];
      if (!(o = _.get(query, path))) {
        continue;
      }
      o = map.order(o, cmd, this.set);
      results.push(_.set(query, path, o));
    }
    return results;
  }

  clear_cache(all) {
    this.step = ++$step;
  }

  remove(all, from) {
    var _memory;
    ({_memory} = all);
    return each(from, (item) => {
      var old;
      old = _memory[item.id];
      if (old != null) {
        this.model.delete(old.item);
        delete _memory[item.id];
      }
    });
  }

  reset(all, from, parent) {
    var _memory, item, key, news, old, results;
    ({_memory} = all);
    all._memory = news = OBJ();
    this.merge(all, from, parent);
    results = [];
    for (key in _memory) {
      old = _memory[key];
      item = news[key];
      if (item != null) {
        results.push(this.model.update(item, old.item));
      } else {
        results.push(this.model.delete(old));
      }
    }
    return results;
  }

  merge(all, from, parent) {
    var _memory;
    ({_memory} = all);
    return each(from, (item) => {
      var o, old;
      o = this.map.$deploy(this.model, this.format, all, item, parent);
      old = _memory[item.id];
      _memory[item.id] = o;
      if (old != null) {
        this.model.update(item, old.item);
      } else {
        this.model.create(item);
        this.model.rowid++;
      }
    });
  }

};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, _;

_ = __webpack_require__(0);

Mem = __webpack_require__(1);

module.exports = Model = (function() {
  class Model {
    static bless(o) {
      o.__proto__ = this.prototype;
      return o;
    }

    static $deploy(item, parent) {
      var deploy, i, len, ref;
      this.bless(item);
      Object.assign(item, parent);
      ref = this.$name.deploys;
      for (i = 0, len = ref.length; i < len; i++) {
        deploy = ref[i];
        deploy.call(item, this);
      }
      this.deploy.call(item, this);
      if (!item.id) {
        throw new Error(`detect bad data: ${JSON.stringify(item)}`);
      }
    }

    static deploy(m) {
      if (!this._id) {
        return this._id = this[m.id];
      }
    }

    static update(item, old) {}

    static create(item) {}

    static delete(old) {}

    static map_reduce(item, emit) {
      return void 0;
    }

    static order(reduce, emit) {
      return void 0;
    }

  };

  Model.rowid = 0;

  Model.aggregate = [function(o, idx) {}];

  return Model;

})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Mem, OBJ, Query, Set, _, depends, f_clear, f_item, f_merge, f_remove, f_reset;

_ = __webpack_require__(0);

Mem = __webpack_require__(1);

Query = __webpack_require__(3);

OBJ = function() {
  return new Object(null);
};

f_reset = function(list, parent) {
  depends(this.$name);
  return this.all._finder.reset(this.all, list, parent);
};

f_merge = function(list, parent) {
  depends(this.$name);
  return this.all._finder.merge(this.all, list, parent);
};

f_remove = function(list) {
  depends(this.$name);
  return this.all._finder.remove(this.all, list);
};

f_item = function(cb) {
  return function(item, parent) {
    return cb.call(this, [item], parent);
  };
};

f_clear = function() {
  return this.all._finder.clear_cach(this.all);
};

depends = function(name) {
  var f, i, len, ref;
  ref = name.depends;
  for (i = 0, len = ref.length; i < len; i++) {
    f = ref[i];
    f();
  }
};

module.exports = Set = (function() {
  class Set extends Array {
    static $deploy(map, model, item, parent) {}

    static bless(list) {
      var ids;
      ids = list.map(function(o) {
        return o.id;
      });
      list.__proto__ = this.prototype;
      list.all = this.all;
      list.$name = this.$name;
      list.query = new Query(this.all, function() {
        this._all_ids = ids;
        return this._memory = OBJ();
      });
      return list;
    }

    static find(id) {
      return _memory[id].item;
    }

    static form(id) {
      var base;
      return (base = _memory[id]).form != null ? base.form : base.form = (function() {
        var o;
        // TODO
        o = _.cloneDeep(this.find(id));
        return o.__proto__ = Form.prototype;
      })();
    }

    sort(...sort) {
      var o;
      o = _.orderBy(this, ...sort);
      o.__proto__ = this.__proto__;
      return o;
    }

    group_by(cb) {
      var key, o, oo;
      o = _.groupBy(this, cb);
      for (key in o) {
        oo = o[key];
        oo.__proto__ = this.__proto__;
      }
      return o;
    }

    page_by(per) {
      var idx;
      idx = 0;
      return Object.values(this.group_by(function(o) {
        return Math.floor(idx++ / per);
      }));
    }

    where(req) {
      return this.query.where(req);
    }

    in(req) {
      return this.query.in(req);
    }

    update(item, old) {}

    create(item) {}

    delete(old) {}

  };

  Set.prototype.set = f_reset;

  Set.prototype.reset = f_reset;

  Set.prototype.merge = f_merge;

  Set.prototype.add = f_item(f_merge);

  Set.prototype.append = f_item(f_merge);

  Set.prototype.reject = f_remove;

  Set.prototype.del = f_item(f_remove);

  Set.prototype.remove = f_item(f_remove);

  Set.prototype.clear_cache = f_clear;

  Set.prototype.refresh = f_clear;

  Set.prototype.rehash = f_clear;

  return Set;

})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Map, Query, _,
  slice = [].slice,
  indexOf = [].indexOf;

_ = __webpack_require__(0);

({Query} = __webpack_require__(1));

module.exports = Map = class Map {
  static bless(o) {
    o.__proto__ = this.prototype;
    return o;
  }

  static $deploy(model, format, all, item, parent) {
    var emit, o;
    o = {
      item,
      $group: []
    };
    model.$deploy(item, parent);
    emit = (...keys) => {
      var cmd, i, map, path, ref;
      ref = keys, keys = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), cmd = ref[i++];
      path = ["_reduce", ...keys].join('.');
      o.$group.push([path, cmd]);
      map = format[path] != null ? format[path] : format[path] = this.bless({});
      return this.init(map, cmd);
    };
    emit({
      list: item,
      set: item.id
    });
    model.map_reduce(item, emit);
    emit = function(...keys) {
      var cmd, i, path, ref;
      ref = keys, keys = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), cmd = ref[i++];
      path = ["_reduce", ...keys].join('.');
      return all.$sort[path] = cmd;
    };
    model.order(item, emit);
    return o;
  }

  static init(o, map) {
    if (map.id) {
      o.id = map.id;
    }
    if (map.list) {
      o.list = [];
    }
    if (map.count) {
      o.count = 0;
    }
    if (map.all) {
      o.all = 0;
    }
    if (map.set) {
      return o.hash = {};
    }
  }

  static order(from, map, set) {
    var a, counts, groups, i, id, idx, j, key, len, len1, o, oo, per, val;
    o = from;
    if (Object === from.constructor) {
      if (map.belongs_to) {
        for (id in from) {
          val = from[id];
          val.__proto__ = Query[map.belongs_to].find(id);
        }
      } else {
        for (id in from) {
          val = from[id];
          val.id = id;
        }
      }
    } else {
      if (map.belongs_to) {
        o = from.map(function(val) {
          return Query[map.belongs_to].find(val.id);
        });
      }
    }
    if (map.sort) {
      o = _.orderBy(o, ...map.sort);
    }
    if (map.get) {
      o = o.map(function(val) {
        return _.get(val, map.get);
      });
    }
    if (per = map.page_by) {
      idx = 0;
      from = o;
      groups = Object.values(_.groupBy(o, function(o) {
        return Math.floor(idx++ / per);
      }));
      groups.all = idx;
      o = groups;
      o.page_idx = function(item) {
        var a, i, len, page_idx, ref;
        ref = this;
        for (page_idx = i = 0, len = ref.length; i < len; page_idx = ++i) {
          a = ref[page_idx];
          if (indexOf.call(a, item) >= 0) {
            return page_idx;
          }
        }
        return null;
      };
      for (i = 0, len = groups.length; i < len; i++) {
        a = groups[i];
        a.__proto__ = set.prototype;
      }
    }
    if (map.index) {
      counts = [];
      for (key in o) {
        oo = o[key];
        idx = _.get(oo, map.index);
        if (counts[idx] == null) {
          counts[idx] = [];
        }
        counts[idx].push(oo);
      }
      o = counts;
      for (j = 0, len1 = o.length; j < len1; j++) {
        a = o[j];
        if (a) {
          a.__proto__ = set.prototype;
        }
      }
    }
    o.from = from;
    o.__proto__ = set.prototype;
    return o;
  }

  static finish(o, query, set) {
    if (o.hash) {
      o.set = Object.keys(o.hash);
    }
    if ((o.all != null) && o.count) {
      return o.avg = o.all / o.count;
    }
  }

  static reduce(item, o, map) {
    if (map.count) {
      o.count += map.count;
    }
    if (map.all) {
      o.all += map.all;
    }
    if (map.list) {
      o.list.push(map.list);
    }
    if (map.set) {
      o.hash[map.set] = item;
    }
    if (map.max) {
      if (!(map.max <= o.max)) {
        o.max_is = item;
        o.max = map.max;
      }
    }
    if (map.min) {
      if (!(o.min <= map.min)) {
        o.min_is = item;
        return o.min = map.min;
      }
    }
  }

};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var bodyParser;

bodyParser = __webpack_require__(14);

module.exports = function(app, conf) {
  app.use(bodyParser.json());
  return app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
  });
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var MongoStore, day, interval, session;

session = __webpack_require__(16);

MongoStore = __webpack_require__(17)(session);

interval = 7 * 24 * 3600;

day = 24 * 3600;

module.exports = function(app, {session_key, db}) {
  return app.use(session({
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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var ctxs, mongoose;

mongoose = __webpack_require__(11);

mongoose.Promise = global.Promise;

ctxs = [__webpack_require__(19), __webpack_require__(45)];

module.exports = function(app, conf) {
  var ctx, i, len;
  if (!conf.db.mongo) {
    return;
  }
  mongoose.connect(conf.db.mongo, {
    useMongoClient: true,
    config: {
      autoIndex: false
    }
  }, function(err) {
    if (err) {
      return console.log(`no ${conf.db.mongo}. disabled (passport, session)`);
    }
  });
  for (i = 0, len = ctxs.length; i < len; i++) {
    ctx = ctxs[i];
    ctx(app, mongoose, conf);
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var API, Mem, Model, Query, Rule, Set, YAML, head, idx, nation, nrules, village, vrules;

({YAML, API} = __webpack_require__(5));

({nation, village} = YAML("yaml/rule.yml"));

({Model, Set, Query, Rule} = Mem = __webpack_require__(2));

__webpack_require__(22);

__webpack_require__(27);

__webpack_require__(31);

console.log(Query.chr_npcs.list);

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
    var _id, chats, npc_id, passport_id, phases, potofs;
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
    [potof, chats, phases] = (await Promise.all([
      up_potof(potof),
      Promise.all([
        up_chat({
          _id: `${_id}-0-発言-0`,
          idx: "0",
          book_id: _id,
          potof_id: npc_id,
          deco: "giji",
          show: "text",
          log: "＠＠＠"
        }),
        up_chat({
          _id: `${_id}-1-発言-0`,
          idx: "0",
          book_id: _id,
          potof_id: npc_id,
          deco: "giji",
          show: "text",
          log: "＠＠＠"
        })
      ]),
      Promise.all(up_phases_step_2(`${_id}-0`))
    ]));
    potofs = [potof];
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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Finder, Map, Mem, Model, Query, Rule, Set, _, rename;

_ = __webpack_require__(0);

Mem = __webpack_require__(1);

Finder = __webpack_require__(7);

Query = __webpack_require__(3);

Model = __webpack_require__(8);

Set = __webpack_require__(9);

Map = __webpack_require__(10);

Mem.Name = {};

rename = function(base) {
  var depends, deploys, id, ids, list, name;
  name = Mem.Name[base];
  if (name) {
    return name;
  }
  id = `${base}_id`;
  ids = `${base}_ids`;
  list = `${base}s`;
  deploys = [];
  depends = [];
  return Mem.Name[base] = {id, ids, list, base, deploys, depends};
};

module.exports = Rule = class Rule {
  constructor(base, cb) {
    this.$name = rename(base);
    this.model = Model;
    this.set = Set;
    this.map = Map;
    this.all = Query.build();
    this.all.cache = {};
    this.all._finder = new Finder(this.$name);
    this.depend_on(base);
    this.map_property = {};
    this.model_property = {
      $form: {
        enumerable: false,
        get: function() {
          // TODO
          return Mem.Set[this.$name.base].form(this.id);
        }
      },
      id: {
        enumerable: true,
        get: function() {
          return this._id;
        }
      },
      [`${this.$name.id}`]: {
        enumerable: true,
        get: function() {
          return this._id;
        }
      }
    };
    this.form_property = {
      $model: {
        enumerable: false,
        get: function() {
          // TODO
          return Mem.Set[this.$name.base].find(this.id);
        }
      },
      changes: {
        enumerable: true,
        value: function(key) {
          if (_.isEqual(this[key], this.find[key])) {
            return null;
          } else {
            return this.$model[key];
          }
        }
      },
      isChanged: {
        enumerable: true,
        get: function() {
          var i, key, keys, len;
          keys = Object.keys(this);
          for (i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            if (!_.isEqual(this[key], this.$model[key])) {
              return true;
            }
          }
          return false;
        }
      }
    };
    this.set_property = {
      first: {
        enumerable: false,
        get: function() {
          return this[0];
        }
      },
      last: {
        enumerable: false,
        get: function() {
          return this[this.length - 1];
        }
      },
      pluck: {
        enumerable: false,
        value: function(...keys) {
          cb = (function() {
            switch (keys.length) {
              case 0:
                return function() {
                  return null;
                };
              case 1:
                return _.property(keys[0]);
              default:
                return function(o) {
                  return _.at(o, ...keys);
                };
            }
          })();
          return this.map(cb);
        }
      }
    };
    if (cb) {
      this.schema(cb);
    }
    return;
  }

  schema(cb) {
    var finder;
    cb.call(this);
    if (this.model === Model) {
      this.model = class model extends this.model {};
    }
    Object.defineProperties(this.model.prototype, this.model_property);
    this.form = class form extends this.model {};
    Object.defineProperties(this.form.prototype, this.form_property);
    if (this.set === Set) {
      this.set = class set extends this.set {};
    }
    Object.defineProperties(this.set.prototype, this.set_property);
    if (this.map === Map) {
      this.map = class map extends this.map {};
    }
    Object.defineProperties(this.map.prototype, this.map_property);
    this.model.$name = this.form.$name = this.set.$name = this.map.$name = this.$name;
    Mem.Query[this.$name.list] = this.set.all = this.all;
    Mem.Set[this.$name.base] = this.set.bless([]);
    Mem.Finder[this.$name.base] = finder = this.all._finder;
    finder.set = this.set;
    finder.map = this.map;
    finder.form = this.form;
    finder.model = this.model;
    finder.format = {};
    return this;
  }

  key_by(keys) {
    var cb;
    cb = (function() {
      switch (keys != null ? keys.constructor : void 0) {
        case void 0:
          return function(o) {
            return o;
          };
        case Function:
          return keys;
        case String:
        case Array:
          return _.property(keys);
        default:
          throw Error(`unimplemented ${keys}`);
      }
    })();
    return this.model_property.id = {
      enumerable: true,
      get: cb
    };
  }

  deploy(cb) {
    return Mem.set_deploy(this.$name.base, cb);
  }

  depend_on(parent) {
    var all;
    ({all} = this);
    return Mem.set_depend(parent, function() {
      return all._finder.clear_cache(all);
    });
  }

  scope(cb) {
    var key, ref, results, val;
    ref = cb(this.all);
    results = [];
    for (key in ref) {
      val = ref[key];
      results.push(this.use_cache(key, val));
    }
    return results;
  }

  default_scope(scope) {
    return this.all._copy(scope(this.all));
  }

  shuffle() {
    return this.default_scope(function(all) {
      return all.shuffle();
    });
  }

  order(...sort) {
    return this.default_scope(function(all) {
      return all.sort(...sort);
    });
  }

  relation_to_one(key, target, ik, else_id) {
    return this.model_property[key] = {
      enumerable: true,
      get: function() {
        var id;
        id = _.get(this, ik);
        return Mem.Query[target].find(id, else_id);
      }
    };
  }

  relation_to_many(key, target, ik, qk) {
    var all;
    all = this.all;
    this.use_cache(key, function(id) {
      return Mem.Query[target].where({
        [`${qk}`]: id
      });
    });
    return this.model_property[key] = {
      enumerable: true,
      get: function() {
        return all[key](this[ik]);
      }
    };
  }

  relation_tree(key, ik) {
    var all;
    all = this.all;
    this.use_cache(key, function(_id, n) {
      var q;
      if (n) {
        q = all.where({
          [`${ik}`]: _id
        });
        return all[key](q.ids, n - 1);
      } else {
        return all.where({
          _id: _id
        });
      }
    });
    return this.model_property[key] = {
      enumerable: true,
      value: function(n) {
        return all[key]([this._id], n);
      }
    };
  }

  relation_graph(key, ik) {
    var all;
    all = this.all;
    this.use_cache(key, function(_id, n) {
      var a, i, j, k, len, len1, q, ref;
      q = all.where({
        _id: _id
      });
      if (n) {
        _id = [];
        ref = q.pluck(ik);
        for (i = 0, len = ref.length; i < len; i++) {
          a = ref[i];
          if (a != null) {
            for (j = 0, len1 = a.length; j < len1; j++) {
              k = a[j];
              if (k != null) {
                _id.push(k);
              }
            }
          }
        }
        return all[key](_.uniq(_id), n - 1);
      } else {
        return q;
      }
    });
    return this.model_property[key] = {
      enumerable: true,
      value: function(n) {
        return all[key]([this._id], n);
      }
    };
  }

  use_cache(key, val) {
    switch (val != null ? val.constructor : void 0) {
      case Function:
        return this.all[key] = (...args) => {
          var base1, name1;
          return (base1 = this.all.cache)[name1 = `${key}:${JSON.stringify(args)}`] != null ? base1[name1] : base1[name1] = val(...args);
        };
      default:
        return this.all[key] = val;
    }
  }

  path(...keys) {
    var all, i, key, len, pk;
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      this.belongs_to(key);
    }
    this.deploy(function() {
      var idx, j, len1, results, subids;
      subids = this._id.split("-");
      this.idx = subids[keys.length];
      results = [];
      for (idx = j = 0, len1 = keys.length; j < len1; idx = ++j) {
        key = keys[idx];
        results.push(this[`${key}_id`] = subids.slice(0, +idx + 1 || 9e9).join('-'));
      }
      return results;
    });
    ({all} = this);
    pk = keys.slice(-1)[0] + "_id";
    return this.model_property.siblings = {
      get: function() {
        var q;
        q = {};
        q[pk] = this[pk];
        return all.where(q);
      }
    };
  }

  belongs_to(to, option = {}) {
    var key, miss, name, target;
    name = rename(to);
    ({key = name.id, target = name.list, miss} = option);
    return this.relation_to_one(name.base, target, key, miss);
  }

  habtm(to, option = {}) {
    var key, name, target;
    name = rename(to.replace(/s$/, ""));
    ({key = name.ids, target = name.list} = option);
    return this.relation_to_many(name.list, target, key, "_id");
  }

  has_many(to, option = {}) {
    var key, name, target;
    name = rename(to.replace(/s$/, ""));
    ({key = this.$name.id, target = name.list} = option);
    return this.relation_to_many(name.list, target, "_id", key);
  }

  tree(option = {}) {
    this.relation_tree("nodes", this.$name.id);
    return this.belongs_to(this.$name.base, option);
  }

  graph(option = {}) {
    var cost, directed, ik;
    ({directed, cost} = option);
    ik = this.$name.ids;
    this.relation_to_many(this.$name.list, this.$name.list, ik, "_id");
    this.relation_graph("path", ik);
    if (!directed) {
      return true; // todo
    }
  }

};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({Model, Query, Rule, Set} = __webpack_require__(2));

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
  return this.scope(function(all) {});
});

new Rule("game").schema(function() {
  return this.scope(function(all) {});
});

Set.option.set(__webpack_require__(23));

Set.winner.set(__webpack_require__(24));

Set.say.set(__webpack_require__(25));

Set.game.set(__webpack_require__(26));


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {"select-role":{"label":"役職希望","help":"役職希望を受け付ける"},"random-target":{"label":"ランダム","help":"投票・能力の対象に「ランダム」を含める"},"seq-event":{"label":"整列事件","help":"事件が順序どおりに発生する"},"show-id":{"label":"ID公開","help":"ユーザーIDを公開する"},"entrust":{"label":"委任投票","help":"委任投票をする"},"undead-talk":{"label":"死後の会話","help":"狼・妖精と死者との間で、会話ができる"},"aiming-talk":{"label":"内緒話","help":"ふたりだけの内緒話をすることができる"}}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {"HUMAN":{"label":"村人陣営","group":"村人陣営","order":1,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HUMAN\" TARGET=\"_blank\">村人陣営</A></b>\n<br>\n人間(妖精や人外の者を除く)の数が人狼以下になるまでに人狼と妖精が全滅すれば勝利です。\n<br>\nただし、狼を全滅させた時点で妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"EVIL":{"label":"裏切りの陣営","group":"敵側の人間","label_human":"敵側の人間","order":2,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_EVIL\" TARGET=\"_blank\">裏切りの陣営</A></b>\n<br>\n村人・恋人が敗北すれば勝利者の一員に加わります。\n<br>\nあなたは破滅を望んでいるのです。人狼や妖精やそれ以外の勝利、または、誰もいなくなることを目指しましょう。"},"WOLF":{"label":"人狼陣営","group":"人狼陣営","label_human":"人狼陣営の人間","order":3,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_WOLF\" TARGET=\"_blank\">人狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を人狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させれば勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"LONEWOLF":{"label":"一匹狼","group":"その他","order":4,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LONEWOLF\" TARGET=\"_blank\">一匹狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を一匹狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させ、かつ、人狼陣営の狼が生きていなければ勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも勝利を掻っ攫うもの達が存在します。"},"PIXI":{"label":"妖精","group":"妖精","order":5,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_PIXI\" TARGET=\"_blank\">妖精陣営</A></b>\n<br>\n人狼が全滅するか、人間(妖精や人外の者を除く)の数が人狼と同数以下まで減るまで「生き残れば」勝利です。\n<br>\nただし、恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"OTHER":{"label":"その他","group":"その他","order":6},"GURU":{"label":"笛吹き","group":"その他","order":7,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_GURU\" TARGET=\"_blank\">笛吹き</A></b>\n<br>\n笛吹き以外の生存者が勧誘された者だけになれば勝利となります。笛吹き自身は、最終的に生き残っていなくとも構いません。\n<br>\nただし、横から勝利を掻っ攫うもの達が存在します。"},"LOVER":{"label":"恋人陣営","group":"その他","order":8,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LOVER\" TARGET=\"_blank\">恋人陣営</A></b>\n<br>\n恋人達だけが生き残る、もしくはいずこかの陣営が勝利を手にしたとき、絆の恋人達が生存していれば勝利です。\n<br>\nただし、ひとりだけ蘇生したなどの不幸で、恋を成就できない恋人は、勝利しません。"},"HATER":{"label":"邪気陣営","group":"その他","order":9,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HATER\" TARGET=\"_blank\">邪気陣営</A></b>\n<br>\nいずこかの陣営が勝利を手にしたとき、運命に決着をつけていれば勝利します。決着とは、絆の天敵をすべて倒し、一人だけが生き残っていることです。\n殺し合いの絆を断ち切りましょう。絆の相手が死んでも、後を追うことはありません。\n<br>\n絆の天敵とは、たとえあなた自身には関係のなくとも、あらゆる絆を結んでいるもの全てを指します。"},"DISH":{"label":"据え膳","group":"その他","order":10,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_DISH\" TARGET=\"_blank\">据え膳</A></b>\n<br>\nすべてに決着がついたとき、あなたが狼の襲撃、もしくは賞金稼の道連れにより死亡していれば、勝利者の一員に加わります。"},"NONE":{"label":"―","group":"その他","order":98,"help":"あなたは勝負を眺めています。勝利したり、敗北したりといったことはありません。"},"MOB":{"label":"見物人","group":"その他","order":99,"help":"あなたは<b>_ROLE_の<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MOB\" TARGET=\"_blank\">見物人</A></b>です。いかなる陣営の人数にも含まれません。"},"LEAVE":{"label":"―","group":"その他","order":100,"help":"あなたは村を去りました。勝利したり、敗北したりといったことは、もうありません。"}}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {"sow":{"CAPTION":"人狼議事","disabled":true},"say5":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10},"point":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999},"count":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0},"lobby":{"CAPTION":"ロビー","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"say1":{"CAPTION":"静寂への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":1,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x1回/1act'","MAX_MESCNT":300},"say5x200":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 200字x5回/5act'","MAX_MESCNT":200},"say5x300":{"CAPTION":"小論文への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x5回/15act'","MAX_MESCNT":300},"saving":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"節約","HELP":"250字x20回/15act","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":10,"MAX_SPSAY":10,"MAX_WSAY":30,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":15,"MAX_MESCNT":250,"MAX_MESLINE":10},"wbbs":{"COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"人狼BBS","HELP":"200字x20回","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":5,"MAX_SPSAY":20,"MAX_WSAY":40,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":0,"MAX_MESCNT":200,"MAX_MESLINE":5},"euro":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"欧州","HELP":"（24h回復） 800字x30回/30act","RECOVERY":1,"MAX_SAY":30,"MAX_TSAY":999,"MAX_SPSAY":999,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":30,"MAX_ESAY":999,"MAX_SAY_ACT":30,"MAX_MESCNT":800,"MAX_MESLINE":20},"tiny":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"たりない","HELP":"（24h回復）（メモは20pt） 333pt/9act","RECOVERY":1,"MAX_SAY":333,"MAX_TSAY":999,"MAX_SPSAY":333,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":999,"MAX_SAY_ACT":9,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":300,"MAX_MESLINE":10},"weak":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 777pt/15act","RECOVERY":1,"MAX_SAY":777,"MAX_TSAY":777,"MAX_SPSAY":777,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 1200pt/24act","RECOVERY":1,"MAX_SAY":1200,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"weak_braid":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 600pt++100pt/15act","RECOVERY":1,"MAX_SAY":600,"MAX_TSAY":600,"MAX_SPSAY":600,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":100,"MAX_ADDSAY":2,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 800pt++200pt/24act","RECOVERY":1,"MAX_SAY":800,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":200,"MAX_ADDSAY":2,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity_braid":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20}}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {"TABULA":{"label":"タブラの人狼","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"MILLERHOLLOW":{"label":"ミラーズホロウ","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"LIVE_TABULA":{"label":"タブラの人狼（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"LIVE_MILLERHOLLOW":{"label":"ミラーズホロウ（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"TROUBLE":{"label":"Trouble☆Aliens","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"},"MISTERY":{"label":"深い霧の夜","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"VOV":{"disabled":true,"label":"狂犬病の谷","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"SECRET":{"label":"陰謀に集う胡蝶","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"}}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({Set, Model, Query, Rule} = __webpack_require__(2));

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
  return this.habtm("ables");
});

new Rule("trap").schema(function() {
  this.order("write_at");
  this.belongs_to("book");
  return this.belongs_to("potof");
});

new Rule("able").schema(function() {
  return this.scope(function(all) {});
});

Set.role.set(__webpack_require__(28));

Set.trap.set(__webpack_require__(29));

Set.able.set(__webpack_require__(30));


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {"51":{"label":"?51?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"57":{"label":"?57?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"dyingpossess":{"label":"衰退狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":""},"aurawolf":{"label":"気狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_aura","vote","entrust","WSAY"],"cmd":"role","help":""},"nothing":{"label":"普通の日","win":null,"group":"EVENT","able_ids":[],"help":""},"aprilfool":{"label":"四月馬鹿","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfink":{"label":"二重スパイ","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfairy":{"label":"妖精の輪","win":null,"group":"EVENT","able_ids":[],"help":""},"eclipse":{"label":"日蝕","win":null,"group":"EVENT","able_ids":[],"help":""},"cointoss":{"label":"Sir Cointoss","win":null,"group":"EVENT","able_ids":[],"help":""},"force":{"label":"影響力","win":null,"group":"EVENT","able_ids":[],"help":""},"miracle":{"label":"奇跡","win":null,"group":"EVENT","able_ids":[],"help":""},"prophecy":{"label":"聖者のお告げ","win":null,"group":"EVENT","able_ids":[],"help":""},"clamor":{"label":"不満","win":null,"group":"EVENT","able_ids":[],"help":""},"fire":{"label":"熱意","win":null,"group":"EVENT","able_ids":[],"help":""},"nightmare":{"label":"悪夢","win":null,"group":"EVENT","able_ids":[],"help":""},"ghost":{"label":"亡霊","win":null,"group":"EVENT","able_ids":[],"help":""},"escape":{"label":"逃亡","win":null,"group":"EVENT","able_ids":[],"help":""},"seance":{"label":"降霊会","win":null,"group":"EVENT","able_ids":[],"help":""},"entry":{"label":"エントリー","win":null,"group":"TURN","able_ids":["ENTRY"],"help":""},"start":{"label":"初日","win":null,"group":"TURN","able_ids":[],"help":""},"main":{"label":"二日目以降","win":null,"group":"TURN","able_ids":[],"help":""},"prologue":{"label":"プロローグ","win":"NONE","group":"TURN","able_ids":["exit"],"help":""},"epilogue":{"label":"エピローグ","win":null,"group":"TURN","able_ids":[],"help":""},"live":{"label":"生存者","win":null,"group":"LIVE","able_ids":["SSAY","TSAY","AIM","commit"],"help":""},"executed":{"label":"処刑","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"victim":{"label":"襲撃","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"cursed":{"label":"呪詛","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"droop":{"label":"衰退","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suicide":{"label":"後追","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"feared":{"label":"恐怖","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suddendead":{"label":"突然死","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"leave":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"none":{"label":"","win":null,"group":null,"able_ids":[],"help":""},"bind":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"hide":{"label":"？？？","win":null,"group":null,"able_ids":["hike","vote","entrust"],"help":"あなたは正体不明です。"},"mob":{"label":"見物人","win":"MOB","group":null,"able_ids":[],"help":"見物人全般のための仮想役職です。"},"visiter":{"label":"客席","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は客席同士のみ"},"grave":{"label":"裏方","win":"MOB","group":"MOB","able_ids":["VGSAY","TSAY"],"help":"進行中会話は墓下と"},"alive":{"label":"舞台","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と"},"juror":{"label":"陪審","win":"HUMAN","group":"MOB","able_ids":["VSAY","TSAY","vote","entrust"],"help":"進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"},"gamemaster":{"label":"黒幕","win":"MOB","group":"MOB","able_ids":["gm_droop","gm_live","gm_disable_vote","gm_enable_vote","VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"},"master":{"label":"村立て人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","MAKER"]},"admin":{"label":"管理人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","scrapvil","ADMIN"]},"lost":{"label":"喪失","win":null,"group":"OTHER","able_ids":[],"cmd":"gift","help":"あなたは贈り物を<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_LOST\" TARGET=\"_blank\">喪失</A>しました。 もう二度と手にすることはないでしょう。もしまたあなたの手に贈り物があっても、消え去ってしまいます。そして、あなたがそれに気付くことはないでしょう。"},"shield":{"label":"光の輪","win":null,"group":"OTHER","able_ids":["circular","guard"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SHIELD\" TARGET=\"_blank\">光の輪</A>が取り巻きます。 あなたはもし昨夜、襲撃されていたとしても守られました。 光の輪はひとりを一度しか守りません。"},"glass":{"label":"魔鏡","win":null,"group":"OTHER","able_ids":["circular","see"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_GLASS\" TARGET=\"_blank\">魔鏡</A>が照らします。 あなたは、魔鏡を渡す相手を占います。 魔鏡はひとりを一度しか照らしません。"},"ogre":{"label":"悪鬼","win":"WOLF","group":"WOLF","able_ids":["wolf","hunt","friend","WSAY"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_OGRE\" TARGET=\"_blank\">悪鬼</A>です。 表向きは他の役目を帯びていますが、あなたは人を襲う悪い鬼なのです。"},"fairy":{"label":"妖精の子","win":"PIXI","group":"PIXI","able_ids":["pixi"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FAIRY\" TARGET=\"_blank\">妖精から生まれた子</A>です。 表向きは他の役目を帯びていますが、あなたは人ならぬ存在なのです。 占い師、霊能者にどう判別されるかは、もともとの役職によります。"},"fink":{"label":"半端者","win":"EVIL","group":"EVIL","able_ids":["evil"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FINK\" TARGET=\"_blank\">半端者</A>です。 表向きは他の役目を帯びていますが、あなたは人ともつかぬ、人狼ともつかぬ、半端な正体を隠しています。"},"decide":{"label":"決定者","win":null,"group":"OTHER","able":"投票","able_ids":["vote_role"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DECIDE\" TARGET=\"_blank\">決定者</A>です。 あなたは追加票を投じる権利を持ちつづけます。行使することで、健在を示すこともできるでしょう。"},"seeronce":{"label":"夢占師","win":null,"group":"OTHER","able":"占う","able_ids":["once","see","spy_wolf"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SEERONCE\" TARGET=\"_blank\">夢占師</A>です。"},"dipsy":{"label":"酔払い","win":null,"group":"OTHER","able_ids":null,"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DIPSY\" TARGET=\"_blank\">酔払い</A>です。 あなたが人外もしくは村人に相対するものであれば、自分の役割を見失うことはありません。 また、光の輪や魔鏡といった贈り物を受け取った場合、酔いが醒めることでしょう。"},"lover":{"label":"弟子","win":null,"group":"OTHER","able":"入門","able_ids":["aura","bond","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVER\" TARGET=\"_blank\">弟子</A>です。 好きな人物を師匠として選び、弟子入りします。次の朝、あなたは頭角をあらわし、絆の師匠と同じ役職になっています。"},"robber":{"label":"盗賊","win":null,"group":"OTHER","able_ids":["aura","rob","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ROBBER\" TARGET=\"_blank\">盗賊</A>です。"},"tangle":{"label":"怨念","win":null,"group":"OTHER","able_ids":["aura","revenge","tangle","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TANGLE\" TARGET=\"_blank\">怨念</A>です。"},"villager":{"label":"村人","win":"HUMAN","group":"HUMAN","able_ids":["human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。"},"stigma":{"label":"聖痕者","win":"HUMAN","group":"HUMAN","able_ids":["aura","stigma","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_STIGMA\" TARGET=\"_blank\">聖痕者</A>です。"},"fm":{"label":"結社員","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FM\" TARGET=\"_blank\">結社員</A>です。 独自の人脈を持つ秘密結社の一員です。"},"sympathy":{"label":"共鳴者","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust","SPSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SYMPATHY\" TARGET=\"_blank\">共鳴者</A>です。"},"seer":{"label":"占い師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEER\" TARGET=\"_blank\">占い師</A>です。"},"seerwin":{"label":"信仰占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERWIN\" TARGET=\"_blank\">信仰占師</A>です。"},"aura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"oura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"seerrole":{"label":"賢者","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERROLE\" TARGET=\"_blank\">賢者</A>です。"},"guard":{"label":"守護者","win":"HUMAN","group":"HUMAN","able_ids":["aura","guard","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GUARD\" TARGET=\"_blank\">守護者</A>です。"},"medium":{"label":"霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUM\" TARGET=\"_blank\">霊能者</A>です。"},"mediumwin":{"label":"信仰霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMWIN\" TARGET=\"_blank\">信仰霊能者</A>です。"},"mediumrole":{"label":"導師","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMROLE\" TARGET=\"_blank\">導師</A>です。"},"necromancer":{"label":"降霊者","win":"HUMAN","group":"HUMAN","able_ids":["aura","chkGSAY","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_NECROMANCER\" TARGET=\"_blank\">降霊者</A>です。"},"follow":{"label":"追従者","win":"HUMAN","group":"HUMAN","able_ids":["aura","human","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FOLLOW\" TARGET=\"_blank\">追従者</A>です。 だれかを信じ、委ねましょう。"},"fan":{"label":"煽動者","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","riot","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FAN\" TARGET=\"_blank\">煽動者</A>です。"},"hunter":{"label":"賞金稼","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","sneak","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HUNTER\" TARGET=\"_blank\">賞金稼</A>です。 毎夜、一人を付け狙います。"},"weredog":{"label":"人犬","win":"HUMAN","group":"HUMAN","able_ids":["aura","tafness","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WEREDOG\" TARGET=\"_blank\">人犬</A>です。"},"prince":{"label":"王子様","win":"HUMAN","group":"HUMAN","able_ids":["aura","august","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PRINCE\" TARGET=\"_blank\">王子様</A>です。"},"rightwolf":{"label":"狼血族","win":"HUMAN","group":"HUMAN","able_ids":["aura","blind","wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。\n狼血族のあなたは、占い師、霊能者に人狼と判定されます。ですが、あなたは村人で、勝利条件も変わりません。 勝利を目指して頑張りましょう。占われると、正体を自覚し表示が増えます。"},"doctor":{"label":"医師","win":"HUMAN","group":"HUMAN","able":"診察","able_ids":["aura","cure","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DOCTOR\" TARGET=\"_blank\">医師</A>です。"},"curse":{"label":"呪人","win":"HUMAN","group":"HUMAN","able_ids":["aura","curse","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSE\" TARGET=\"_blank\">呪人</A>です。"},"dying":{"label":"預言者","win":"HUMAN","group":"HUMAN","able_ids":["aura","droop","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYING\" TARGET=\"_blank\">預言者</A>です。"},"invalid":{"label":"病人","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INVALID\" TARGET=\"_blank\">病人</A>です。 あなたが命を落としたとき、犯人は病気に感染します。"},"alchemist":{"label":"錬金術師","win":"HUMAN","group":"HUMAN","able_ids":["aura","once","revenge","cling","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ALCHEMIST\" TARGET=\"_blank\">錬金術師</A>です。 あなたは一度だけ、薬を飲むことが出来ます。"},"witch":{"label":"魔女","win":"HUMAN","group":"HUMAN","able_ids":["aura","analeptic","poison","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WITCH\" TARGET=\"_blank\">魔女</A>です。 あなたは二日目に、毒薬と蘇生薬をひとつずつ完成させます。"},"girl":{"label":"少女","win":"HUMAN","group":"HUMAN","able_ids":["aura","night","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GIRL\" TARGET=\"_blank\">少女</A>です。"},"scapegoat":{"label":"生贄","win":"HUMAN","group":"HUMAN","able":"疑う","able_ids":["aura","scapegoat","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SCAPEGOAT\" TARGET=\"_blank\">生贄</A>です。"},"elder":{"label":"長老","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","twolife","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ELDER\" TARGET=\"_blank\">長老</A>です。 もしも命を落としたら、あなたの恨みは犯人を襲います。"},"jammer":{"label":"邪魔之民","win":"EVIL","group":"EVIL","able":"隠す","able_ids":["aura","jammer","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_JAMMER\" TARGET=\"_blank\">邪魔之民</A>です。"},"snatch":{"label":"宿借之民","win":"EVIL","group":"EVIL","able_ids":["aura","snatch","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SNATCH\" TARGET=\"_blank\">宿借之民</A>です。"},"bat":{"label":"念波之民","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">念波之民</A>です。"},"possess":{"label":"狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_POSSESS\" TARGET=\"_blank\">狂人</A>です。"},"fanatic":{"label":"狂信者","win":"EVIL","group":"EVIL","able_ids":["aura","fanatic","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FANATIC\" TARGET=\"_blank\">狂信者</A>です。"},"muppeting":{"label":"人形使い","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","MSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MUPPETER\" TARGET=\"_blank\">人形使い</A>です。"},"wisper":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"cpossess":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"semiwolf":{"label":"半狼","win":"EVIL","group":"EVIL","able_ids":["aura","wolfify","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEMIWOLF\" TARGET=\"_blank\">半狼</A>です。"},"oracle":{"label":"魔神官","win":"EVIL","group":"EVIL","able_ids":["aura","medium","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ORACLE\" TARGET=\"_blank\">魔神官</A>です。"},"sorcerer":{"label":"魔術師","win":"EVIL","group":"EVIL","able_ids":["aura","see","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SORCERER\" TARGET=\"_blank\">魔術師</A>です。"},"walpurgis":{"label":"魔法少年","win":"EVIL","group":"EVIL","able_ids":["aura","grave","analeptic","poison","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WALPURGIS\" TARGET=\"_blank\">魔法少年</A>です。 やがて命を落とすと魔女になると宿命付けられています。"},"headless":{"label":"首無騎士","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HEADLESS\" TARGET=\"_blank\">首のない騎士</A>です。 あなたは人狼仲間を斬り捨てることも厭いません。"},"wolf":{"label":"人狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WOLF\" TARGET=\"_blank\">人狼</A>です。"},"intwolf":{"label":"智狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_role","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INTWOLF\" TARGET=\"_blank\">智狼</A>です。特殊な能力を持つ人狼です。"},"cwolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"cursewolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"whitewolf":{"label":"白狼","win":"WOLF","group":"WOLF","able":"襲う","able_ids":["hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WHITEWOLF\" TARGET=\"_blank\">白狼</A>です。特殊な能力を持つ人狼です。 あなたを占った占い師は、あなたを人間とみなします。あなたは能力者特有のオーラを発しません。"},"childwolf":{"label":"仔狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","revenge","grudge","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CHILDWOLF\" TARGET=\"_blank\">仔狼</A>です。特殊な能力を持つ人狼です。"},"dyingwolf":{"label":"衰狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","droop","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGWOLF\" TARGET=\"_blank\">衰狼</A>です。特殊な能力を持つ人狼です。"},"silentwolf":{"label":"黙狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SILENTWOLF\" TARGET=\"_blank\">黙狼</A>です。 人狼の襲撃対象となることはありませんが、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話は、あなたには聞こえません。"},"hamster":{"label":"栗鼠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PIXI\" TARGET=\"_blank\">栗鼠妖精</A>です。"},"werebat":{"label":"蝙蝠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">蝙蝠妖精</A>です。 あなたは他の妖精が誰であるか知っていますし、新たに生まれた妖精を知ることもできます。ただし、姿を換えてしまった宿借妖精の行方はわかりません。 また、蝙蝠妖精同士にしか聞こえない会話が可能です。"},"mimicry":{"label":"擬狼妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MIMICRY\" TARGET=\"_blank\">擬狼妖精</A>です。"},"dyingpixi":{"label":"風花妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","droop","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGPIXI\" TARGET=\"_blank\">風花妖精</A>です。"},"trickster":{"label":"悪戯妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","bonds","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TRICKSTER\" TARGET=\"_blank\">悪戯妖精</A>です。 結ばれた人たちにとっては、単なるはた迷惑な悪戯にすぎません。"},"hatedevil":{"label":"邪気悪魔","win":"HATER","group":"OTHER","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">邪気悪魔</A>です。 結びつけた二人のうち、どちらか片方だけが生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"hate":{"label":"宿敵","win":"HATER","group":"BIND","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">宿敵</A>がいます。"},"love":{"label":"恋人","win":"LOVER","group":"BIND","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋人</A>がいます。"},"loveangel":{"label":"恋愛天使","win":"LOVER","group":"OTHER","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋愛天使</A>です。 結びつけた二人が生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"passion":{"label":"片思い","win":"LOVER","group":"OTHER","able_ids":["aura","bond","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PASSION\" TARGET=\"_blank\">片想い</A>です。 選んだ人が生き延び、あなたが生き延びれば、あなたの勝利となります。"},"lonewolf":{"label":"一匹狼","win":"LONEWOLF","group":"WOLF","able_ids":["aura","wolf","armor","kill","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LONEWOLF\" TARGET=\"_blank\">一匹狼</A>です。 襲撃先はあなた以外であれば誰でもかまいません。"},"guru":{"label":"笛吹き","win":"GURU","group":"OTHER","able_ids":["aura","human","guru","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GURU\" TARGET=\"_blank\">笛吹き</A>です。"},"dish":{"label":"鱗魚人","win":"DISH","group":"OTHER","able_ids":["aura","human","dish","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DISH\" TARGET=\"_blank\">鱗魚人</A>です。新鮮なふぃーっしゅ。です。"},"bitch":{"label":"遊び人","win":"LOVER","group":"OTHER","able_ids":["aura","human","bitch","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BITCH\" TARGET=\"_blank\">遊び人</A>です。 本命とあなたが生き延びれば、あなたの勝利です。"}}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {"blank":{"label":"普通の日","help":""},"nothing":{"label":"普通の日","cmd":"trap","help":"今日は、特別なことのない一日のようだ。さあ普段通り、誰かを処刑台にかけよう。"},"aprilfool":{"label":"四月馬鹿","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_APRIL_FOOL\" TARGET=\"_blank\">四月馬鹿</A></b>\n<br>\n大変、大変、大変なことになった。きみの役職は変化しているかもしれない。もしも誰かと絆を結んでいるなら、急に相手が憎くなってしまい、絆の相手だけにしか投票できない。\nそして悟ってしまった。今夜だけは、相方の後を追うことはないと……。\n<br>\n<table class=\"table\">\n<tr>\n<th colspan=3>役職の変貌\n<th rowspan=4>※一日で元に戻る\n<tr>\n<td>賢者\n<td>←→\n<td>魔女\n<tr>\n<td>守護者\n<td>←→\n<td>長老\n<tr>\n<td>賞金稼\n<td>←→\n<td>少女\n</table>"},"turnfink":{"label":"二重スパイ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FINK\" TARGET=\"_blank\">二重スパイ</A></b>\n<br>\nなんということだろう！一人が村側を裏切り、狼に与する半端者になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"turnfairy":{"label":"妖精の輪","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FAIRY\" TARGET=\"_blank\">妖精の輪</A></b>\n<br>\nなんということだろう！一人が森に立ち入り、妖精の養子になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"eclipse":{"label":"日蝕","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_ECLIPSE\" TARGET=\"_blank\">日蝕</A></b>\n<br>\n暗い日蝕が村中を覆い、お互い顔も名前も解らない。この闇夜は丸一日続くだろう。他人になりすまし、議論を混乱させることもできてしまうかもしれない。"},"cointoss":{"label":"Sir Cointoss","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_COINTOSS\" TARGET=\"_blank\">Sir Cointoss</A></b>\n<br>\nお控えなさい。お控えなさい。コイントス卿はこの村の投票結果に意見があるようでございます。\n卿の御意向によっては、投票結果に基づいた処刑を取り止めにすることもあります。\n五分五分くらいかな。"},"force":{"label":"影響力","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FORCE\" TARGET=\"_blank\">影響力</A></b>\n<br>\n今日の投票箱は無色透明だ。だれかが投票した瞬間にその内容はハッキリと見えるから、投票をセットするときは気を付けて！"},"miracle":{"label":"奇跡","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_MIRACLE\" TARGET=\"_blank\">奇跡</A></b>\n<br>\n帰ってきた！黄泉の国から、今日の襲撃で死んだ犠牲者がかえってきた！能力を失ったかもしれないけれど、それは些細なことだよ！ね！\n<br>\n人狼、一匹狼、賞金稼ぎなどに襲われた死者は生き返る。ただし、その能力は失われる。"},"prophecy":{"label":"聖者のお告げ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_PROPHECY\" TARGET=\"_blank\">聖者のお告げ</A></b>\n<br>\n聖者は民の夢枕に告げられました。今の任より、<b>決定者</b>にふさわしい人物がいると。\n旧き任務は解かれ、あたらしい<b>決定者</b>は皆に喝采で迎え入れられるだろう。"},"clamor":{"label":"不満","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_CLAMOR\" TARGET=\"_blank\">不満</A></b>\n<br>\n村には不満が鬱屈している。今夜の投票でまた人間を処刑してしまったら……悪夢が始まる。\nはじけた不満に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"fire":{"label":"熱意","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FIRE\" TARGET=\"_blank\">熱意</A></b>\n<br>\n村には期待に満ちた熱意が渦巻いている。今夜の投票がひとならぬものを処刑できたなら……悪夢が始まるのだ。\nはじけた熱意に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"nightmare":{"label":"悪夢","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_NIGHTMARE\" TARGET=\"_blank\">悪夢</A></b>\n<br>\n恐ろしい一日が始まる。今日は投票だけができる。発言も、能力も使えない。そして、突然死は発生しない。\n<br>\nさあ投票して、こんな日が早く過ぎ去ってしまうよう、ひとり祈りを捧げよう。"},"ghost":{"label":"亡霊","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_GHOST\" TARGET=\"_blank\">亡霊</A></b>\n<br>\n今夜、人狼に殺された人は人狼になる。また、襲撃を実行した人狼は命を落としてしまうだろう。人狼となった者は報復行動を行わない。ただし、命拾いをしたならば人狼にはならない。\n<br>\n一匹狼は亡霊を作らない。"},"escape":{"label":"逃亡","cmd":null,"help":"<b>逃亡</b>\n<br>\nせめて一人だけでも、なんとかして逃がそう。今夜の投票で逃亡者を一人決め、夜中の処刑のかわりに密かに逃がすのだ。\n<br>\nしかし逃亡者は一日のあいだ逃亡生活を続け、ついに村へと帰還してしまう。帰還者の票は通常の三倍尊重されるだろう。\n実装がめんどうだから、このまま未定義にしておこうかな。"},"seance":{"label":"降霊会","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_SEANSE\" TARGET=\"_blank\">降霊会</A></b>\n<br>\nこっくりさん、こっくりさん……<br>秘密の儀式で、墓場の霊魂がかえってきた。今日に限り、生者も姿の見えぬ死者も屋根を共にし、議論するだろう。"}}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {"editvilform":{"at":"around","cmd":"editvilform","btn":"村を編集する","change":"村の編集フォームを確認、修正します。","help":""},"muster":{"at":"prologue","cmd":"muster","btn":"点呼！","change":"全員を未発言状態にします。未発言者は１日そのまま発言がないと、自動退出します。","help":""},"update":{"at":"all","cmd":"update","btn":"更新！","change":"ただちに更新し、次の日を迎えます。お覚悟はよろしいですか？","help":""},"scrapvil":{"at":"all","cmd":"scrapvil","btn":"廃村！","change":"ただちに村を廃村にします。廃村になった村はエピローグになります。","help":""},"exit":{"at":"prologue","cmd":"exit","btn":"退出…","change":"村を立ち去ります。","help":""},"commit":{"at":"progress","cmd":"commit","sw":"時間を進める","pass":"（時間を進めない）","change":"時間を進めるかどうか、選択してください。","help":"全員が「時間を進める」を選ぶと前倒しで更新されます。\n最低一発言して確定しないと、時間を進める事ができません。"},"night":{"at":"main","sw":"夜遊びする","pass":"（夜遊びしない）","change":"夜遊びをして、深夜の囁きを聞いてしまうかどうか、選択してください。","help":"あなたは二日目以降、夜に出歩くことができます。\n人狼の囁き、民の念話、共鳴者の共鳴を誰のものとも判別せず聞いちゃうので、朝になって昨日を振り返ると思い出せることでしょう。\n顔や名前はわかりませんが。\nただしこのとき、もしあなたが人狼の、誰かひとりにでも襲撃される矛先に含まれていると、恐怖のあまり、実際に襲われる犠牲者とは別に死んでしまいます。\nこの死亡を護衛する方法はありません。また、息を引き取るあなたを尻目に、狼達は別の人物を襲撃するでしょう。"},"dish":{"at":"progress","sw":"跳ねる","pass":"（跳ねない）","change":"跳ねるアピールをするかどうか、選択してください。","help":"美味しく食べて貰うことを悦びとし、活き活きと跳ねることができます。わたしをたべて、わたしをたべて、とアピールしましょう。"},"cling":{"at":"main","sw":"飲薬する","pass":"（飲薬しない）","change":"あなたが殺害されたとしたら、犯人を道連れにするかどうか、選択してください。","help":"薬を服用した夜、もし処刑以外の要因で命を落とした場合、その犯人を道連れにします。人狼の襲撃の場合、襲撃実行者が対象となります。"},"guru":{"for":"live","at":"progress","targets":"誘う","pass":"（パス）","change":"誘い込む犠牲者を選択してください。","help":"毎晩ふたりずつ、好きな人物をひそかに誘い込むことができます。自分自身を誘うことはできません。\n誘い込まれた当人たちは夜な夜な踊り明かし、そのことを覚えています。しかし、彼らの能力や所属陣営などに変化はありません。"},"bitch":{"for":"live","at":"start","targets":"遊ぶ","change":"絆を結ぶ相手と、弄ぶ遊び相手を選択してください。","help":"一日目、一人目に選択した人物を本命の恋人として“運命の絆”を結びつけ、二人目は絆を結ぶふりをして手玉にとります。\n“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。もう一人はどうでもよいのですが、そう思わせないこまめなケアが大切です。"},"bonds":{"for":"live","at":"start","targets":"結ぶ","change":"絆で結ぶ二人を選択してください。","help":"一日目、好きな二人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。"},"bond":{"for":"live","at":"start","target":"結ぶ","change":"あなたとの絆を結ぶ相手を選択してください。","help":"一日目、あなたから好きな人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ相手が死亡すると、あなたは後を追って死亡します。"},"guard":{"for":"live","at":"main","target":"守る","pass":"（パス）","change":"守護する対象を選択してください。","help":"一人を狼の襲撃、もしくは付け狙う賞金稼の手から守ることが出来ます。\n自分自身を守ることは出来ません。"},"see":{"for":"live","at":"progress","target":"占う","pass":"（パス）","change":"正体を知りたい相手を選択してください。","help":"ひとりを占い対象に指定します。"},"sneak":{"for":"live","at":"progress","target":"狙う","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"hunt":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"人狼全員で多数決をし、一人だけ殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"kill":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"cure":{"for":"live","at":"main","target":"診察","pass":"（パス）","change":"診察する相手を選択してください。","help":"ひとりを診察し、人狼の牙に感染しているかを確認します。その場合は治療します。治療した人は生存者として数えますが、能力は取り戻しません。"},"tangle":{"for":"dead","at":"progress","target":"憑依","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"死者の埋葬地をうろつきまわっています。\n指定した故人の役職と勝利条件を写しとり、対象を蘇生させます。\nこのため、あなたは死亡しなくては、勝利がありません。"},"analeptic":{"for":"dead","at":"progress","require":"role1","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"死者に投薬して蘇生させます。\n蘇生は一度だけおこなうことができ、それっきり薬は失われます。"},"poison":{"for":"live","at":"progress","require":"role2","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"生きている者に投薬して毒殺します。\n毒殺は一度ずつだけおこなうことができ、それっきり薬は失われます。"},"scapegoat":{"for":"live","at":"main","target":"疑う","pass":"（パス）","change":"あなたが最後になったとしたら、指差す相手を選択してください。","help":"もし投票数が同数になり処刑する相手が定まらないと、混乱した村人達に処刑されてしまいます。\nあなたが最後に指差した人は、後悔する村人達に翌日、処刑されるでしょう。皆、そうするより他にないのです。"},"hike":{"for":"cast","at":"progress","target":"外出する","pass":"（パス）","change":"会いに行く相手を選択してください。","help":"特殊な能力があるかどうか自覚していません。夜は積極的に外出して、様子をさぐりましょう。"},"vote":{"for":"live","at":"main","cmd":"vote","target":"投票","pass":"（委任する）","change":"処刑する相手を選択してください。","help":"全員で多数決をし、一人だけ処刑します。"},"vote_role":{"for":"live","at":"main","target":"投票","pass":"（パス）","change":"処刑する相手を選択してください。","help":""},"entrust":{"for":"live","at":"main","cmd":"vote","target":"委任","pass":"（投票する）","change":"処刑を棄権し、一票を委ねる相手を選択してください。","help":"投票は棄権し、他人の投票と同じとすることができます。"},"jammer":{"for":"live","at":"progress","target":"邪魔","pass":"（パス）","change":"占いから保護する相手を選択してください。","help":"毎夜、一人をあらゆる占いから包み隠すことができます。\n自分自身を隠すことはできません。"},"snatch":{"for":"live","at":"progress","target":"換わる","pass":"（パス）","change":"顔と名前を簒奪する相手を選択してください。","help":"好きな人物の顔と名前を奪い、自身のそれと入れ替えることができます。この能力は非常に露顕しやすいので、行使には注意が必要です。\nもしも夜の間に屍体になった人を対象に選んだなら、旧いあなたは命を落とし、あなたとなったその屍体は息を吹き返すでしょう。\nまた、結ばれた絆や、笛吹きに誘われたことは姿とともにあり、姿を移し替えたときに引き継ぐことがあります。\n一度移し替えた姿は、永遠にあなたのものです。二度と元には戻りません。"},"gm_droop":{"for":"gm_live","at":"all","cmd":"gamemaster","target":"すぐに墓下へ","pass":"―――","change":"参加者として死なせる相手を選択してください。","help":""},"gm_live":{"for":"gm_dead","at":"all","cmd":"gamemaster","target":"すぐに表舞台へ","pass":"―――","change":"参加者として蘇生させる相手を選択してください。","help":""},"gm_disable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票から保護する","pass":"―――","change":"投票対象に選ぶことを認めない相手を選択してください。","help":""},"gm_enable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票を認可する","pass":"―――","change":"投票対象に選ぶこと許可する相手を選択してください。","help":""},"maker":{"for":"all","at":"all","cmd":"maker","target":"村を任せる","pass":"―――","change":"村の管理を任せる相手を選択してください。","help":""},"kick":{"for":"all","at":"prologue","cmd":"kick","target":"退去！","pass":"―――","change":"退去いただこう、かな…、と思った相手を選択してください。","help":""},"blind":{"help":"（サーバーは、この役職を保有していることを本人に通知しません。）"},"wolf":{"help":"あなたは人狼と判定されます。"},"pixi":{"help":"占いの対象となると死亡します。勝利判定では人間にも人狼にも数えられません。"},"human":{"help":"勝利判定では人間として数えられます。"},"evil":{"help":"人間でありながら、人外に協力する裏切り者です。場合によっては敢えて死ぬ必要があります。"},"circular":{"help":"この贈り物は、次に渡す相手を選び渡すことになっています。\n将来もしふたたびあなたの手に渡ったら、贈り物は消え去ってしまいます。"},"friend":{"help":"仲間に向けては能力を使いません。"},"once":{"help":"能力を持ちますが、その能力はたった一度しか使うことができません。"},"hate":{"help":"絆の運命は悲しい殺し合いを強いるでしょう。彼らは本来の勝利条件ではなく、ただ一人生き残ることが勝利条件となります。"},"love":{"help":"絆の運命は彼らを、愛で固く結ぶでしょう。彼らは本来の勝利条件ではなく、共存が勝利条件となります。"},"droop":{"help":"あなたは、生きた人狼の人数の二日後に、命を落とします。"},"curse":{"help":"あなたを占ってしまった占い師は死亡します。"},"aura":{"help":"あなたはオーラを持ちます。"},"rob":{"help":"誰もならなかった残り役職をすべて知ります。\n次の夜、その中から運命の導くままひとつの役職を選び、仮面の役職に成り代わるでしょう。\n運命は、あなたになにを課すでしょうか？"},"grave":{"help":"命を落とすと、能力を発揮することができます。"},"armor":{"help":"狼の襲撃や賞金稼の手により殺されることはありません。"},"medium":{"help":"処刑や突然死で死んだ全員を対象にします。\n無惨な死体について判断することは出来ません。"},"spy_role":{"help":"その人が持つ役職がわかります。恩恵は、役職とは別個のものです。このため半端者、悪鬼、妖精の子を直接見分けることはできません。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_win":{"help":"その人が持つ陣営（勝利条件）がわかります。多くは役職を思わせるものです。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_aura":{"help":"その人が能力を持つか判別出来ます。あなたにとって、村人、人狼、白狼は能力のオーラを持ちませんが、そうでない人物は能力のオーラを纏っていると感じられます。"},"spy_wolf":{"help":"その人が人間か人狼か判別できます。ただし狼血族は人狼と誤認し、白狼は人間と誤認してしまいます。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"stigma":{"help":"独特の印を持つため、あなたの正体は比較的信用されやすいでしょう。"},"fm":{"help":"結社員・共鳴者が誰なのか知っています。"},"fanatic":{"help":"人狼にはあなたの正体はわかりませんが、あなたは人狼が誰か知っています。また、新たに人狼となったものを知ることもできます。\nですが、あなたは狼血族や擬狼妖精も人狼であると誤認してしまいますし、一匹狼の正体を知ることはできません。"},"tafness":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると傷を負うものの、一日だけ生き長らえます。"},"hurt":{"label":"負傷","help":""},"sheep":{"help":"踊り狂ったおぼろげな記憶がある。"},"infected":{"label":"感染","help":""},"hide_for_vote":{"hide":["vote"],"label":"投票対象外","help":""},"hide_for_role":{"hide":["role"],"label":"能力対象外","help":""},"hide_for_gift":{"hide":["gift"],"label":"恩恵対象外","help":""},"disable_vote":{"disable":["vote"],"label":"<s>投票</s>","help":""},"disable_special":{"disable":["gift","role"],"label":"<s>全能力</s>","help":"あなたはもう特殊能力を使うことができません。"},"disable_gift":{"disable":["gift"],"label":"<s>恩恵</s>","help":"あなたはもう恩恵能力を使うことができません。"},"disable_role":{"disable":["role"],"label":"<s>能力</s>","help":"あなたはもう役職能力を使うことができません。"},"disable_poison":{"disable":["poison"],"label":"<s>毒薬</s>","help":"あなたはもう毒薬を使うことができません。"},"disable_analeptic":{"disable":["analeptic"],"label":"<s>蘇生薬</s>","help":"あなたはもう蘇生薬を使うことができません。"},"twolife":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされても、一度だけは命が助かります。"},"august":{"help":"あなたが処刑されることに決まると一度だけは、その処刑はとりやめになります。"},"revenge":{"help":"どんな理由であれ、あなたが命を落とすと、その夜のうちに能力を発揮します。"},"seal":{"help":"ひとりの犯人が特定できるのであれば、犯人はいっさいの能力を行使できなくなります。"},"grudge":{"help":"あなたが命を落とした翌日、人狼は二つの襲撃をおこない、二人を一度に殺害します。"},"riot":{"help":"あなたが死亡した翌日は、村人達が暴力的に二つの投票をおこない、二人を一度に処刑します。"},"wolfify":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると、あなたは人狼になります。"},"chkGSAY":{"help":"顔や名前はわかりませんが、あなたの耳には死者の声が届いちゃうことでしょう。"},"ENTRY":{"cmd":"entry","text":["talk"],"label":"導入","help":"キャラクターを選択し、エントリーしましょう。"},"MAKER":{"cmd":"write","text":["talk","memo","act"],"label":"村立て話","help":"あなたは村立て人です。"},"ADMIN":{"cmd":"write","text":["talk","memo","act"],"label":"管理者話","help":"あなたは管理人です。"},"SPSAY":{"cmd":"write","text":["talk","memo"],"label":"共鳴","help":"あなたは、共鳴者同士にしか聞こえない会話が可能です。"},"WSAY":{"cmd":"write","text":["talk","memo"],"label":"囁き","help":"あなたは、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話が可能です。"},"XSAY":{"cmd":"write","text":["talk","memo"],"label":"念話","help":"あなたは、念波星でしか聞こえない会話が可能です。"},"GSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":"あなたは、死者にしか聞こえない会話が可能です。"},"MSAY":{"cmd":"write","text":["talk","memo"],"label":"口借り","help":"あなたは<b>_NPC_</b>の口を借り、好きな言葉を伝えることができます。"},"AIM":{"for":"near","cmd":"write","text":["talk","memo"],"label":"内緒話","help":null},"TSAY":{"cmd":"write","text":["talk","memo"],"label":"独り言","help":null},"SSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VGSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null}}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set, chr_set_id, cs_key, face, face_id, i, job, key, len, list, o, order;

({Set, Model, Query, Rule} = __webpack_require__(2));

order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school", "all"];

new Rule("tag").schema(function() {
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

Set.tag.set(__webpack_require__(32));

Set.face.set(__webpack_require__(33));

for (i = 0, len = order.length; i < len; i++) {
  key = order[i];
  o = __webpack_require__(34)(`./cs_${key}.yml`);
  Set.chr_set.merge([o.chr_set]);
  ({chr_set_id} = o.chr_set);
  cs_key = {chr_set_id};
  Set.chr_npc.merge(o.chr_npc, cs_key);
  Set.chr_job.merge(o.chr_job, cs_key);
}

list = (function() {
  var j, len1, ref, ref1, results;
  ref = Query.faces.list;
  results = [];
  for (j = 0, len1 = ref.length; j < len1; j++) {
    face = ref[j];
    chr_set_id = "all";
    face_id = face._id;
    job = (ref1 = face.chr_jobs.list.sort("chr_set_idx")[0]) != null ? ref1.job : void 0;
    if (job == null) {
      continue;
    }
    results.push({chr_set_id, face_id, job});
  }
  return results;
})();

Set.chr_job.merge(list);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {"all":{"label":"すべて","long":"「人狼議事 ちゃんぷる」のキャラクター","chr_set_ids":["all"]},"giji":{"label":"人狼議事","long":"「人狼議事」のキャラクター","tag_id":"all","chr_set_ids":["all","animal","school","ririnra"]},"shoji":{"label":"てやんでえ","long":"「和の国てやんでえ」のキャラクター","tag_id":"all","chr_set_ids":["all","wa"]},"travel":{"label":"帰還者議事","long":"「帰還者議事」のキャラクター","tag_id":"all","chr_set_ids":["all","time"]},"stratos":{"label":"明後日への道標","long":"「明後日への道標」のキャラクター","tag_id":"all","chr_set_ids":["all","SF"]},"myth":{"label":"はおうのひろば","long":"「はおうのひろば」のキャラクター","tag_id":"all","chr_set_ids":["all","changed"]},"asia":{"label":"大陸議事","long":"「大陸議事」のキャラクター","tag_id":"all","chr_set_ids":["all","ger"]},"marchen":{"label":"狂騒議事","long":"「狂騒議事」のキャラクター","tag_id":"all","chr_set_ids":["all","mad"]},"kid":{"label":"(児童)","long":"児童のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"young":{"label":"(若者)","long":"若者のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"middle":{"label":"(中年)","long":"中年のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"elder":{"label":"(老人)","long":"老人のキャラクター","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"river":{"label":"-運河-","long":"往く人来る人休む人","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"road":{"label":"-往来-","long":"往く人来る人休む人","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"immoral":{"label":"-裏道-","long":"街灯の裏の背徳達","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"guild":{"label":"-商工会-","long":"商人と職人の集うギルド","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"elegant":{"label":"-舞踏会-","long":"瀟洒な館の舞踏会","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"ecclesia":{"label":"-公教会-","long":"信仰と道徳と学識の源泉","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"medical":{"label":"-施療院-","long":"病苦毒霊と戦う砦","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"market":{"label":"-歌劇酒場-","long":"芸の極みに華が咲く","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"apartment":{"label":"-自室の窓-","long":"窓から外を眺めると","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"servant":{"label":"-使用人-","long":"良家を支えるスタッフ","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"farm":{"label":"-森の農場-","long":"森に接する田畑","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"government":{"label":"-統治公共-","long":"所領を治める権能者","tag_id":"giji","chr_set_ids":["all","animal","school","ririnra"]},"god":{"label":"-かみさま-","long":"かみさま","tag_id":"all","chr_set_ids":["all"]}}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = [{"_id":"c49","comment":"test","name":"ボリス","order":1,"tag_ids":["giji","guild","young"]},{"_id":"c38","order":2,"name":"コリーン","tag_ids":["giji","market","young"]},{"_id":"c77","order":3,"name":"キャロライナ","tag_ids":["giji","servant","road","farm","young"]},{"_id":"c35","order":4,"name":"ダン","tag_ids":["giji","guild","middle"]},{"_id":"c53","order":5,"name":"ゼルダ","tag_ids":["giji","government","farm","elegant","elder"]},{"_id":"c74","order":6,"name":"フランシスカ","tag_ids":["giji","market","young"]},{"_id":"c50","order":8,"name":"ディーン","tag_ids":["giji","government","guild","young"]},{"_id":"c36","order":8,"name":"ミッシェル","tag_ids":["giji","guild","servant","young"]},{"_id":"c26","order":8,"name":"モニカ","tag_ids":["giji","guild","young"]},{"_id":"c09","order":9,"name":"ヒロシ","tag_ids":["giji","immoral","travel","river","middle"]},{"_id":"c55","order":10,"name":"パピヨン","tag_ids":["giji","apartment","elegant","middle"]},{"_id":"c29","order":11,"name":"イアン","tag_ids":["giji","guild","young"]},{"_id":"c12","order":12,"name":"バーナバス","tag_ids":["giji","servant","road","middle"]},{"_id":"c16","order":127,"name":"マリアンヌ","tag_ids":["giji","apartment","market","medical","young"]},{"_id":"c34","order":14,"name":"トニー","tag_ids":["giji","road","servant","kid"]},{"_id":"c44","order":15,"name":"ドナルド","tag_ids":["giji","immoral","young"]},{"_id":"c11","order":16,"name":"カルヴィン","tag_ids":["giji","elegant","apartment","kid"]},{"_id":"c10","order":17,"name":"ゾーイ","tag_ids":["travel","giji","apartment","kid"]},{"_id":"c70","order":18,"name":"パティ","tag_ids":["giji","servant","apartment","young"]},{"_id":"c56","order":19,"name":"ゴドウィン","tag_ids":["giji","guild","market","middle"]},{"_id":"c07","order":20,"name":"ティモシー","tag_ids":["giji","guild","elder"]},{"_id":"c41","order":21,"name":"ヤニク","tag_ids":["giji","immoral","river","young"]},{"_id":"c58","order":22,"name":"ブルーノ","tag_ids":["giji","ecclesia","middle","elder"]},{"_id":"c17","order":23,"name":"ユリシーズ","tag_ids":["giji","market","middle"]},{"_id":"c39","order":24,"name":"シビル","tag_ids":["giji","servant","guild","middle"]},{"_id":"c40","order":25,"name":"ハワード","tag_ids":["giji","servant","elder"]},{"_id":"c65","order":26,"name":"ズリエル","tag_ids":["giji","immoral","middle"]},{"_id":"c59","order":27,"name":"ムパムピス","tag_ids":["giji","ecclesia","young"]},{"_id":"c57","order":28,"name":"ツェツィーリヤ","tag_ids":["giji","ecclesia","young","middle"]},{"_id":"c04","order":29,"name":"ノーリーン","tag_ids":["giji","servant","middle"]},{"_id":"c46","order":30,"name":"ゲイル","tag_ids":["giji","apartment","medical","young","middle"]},{"_id":"c14","order":31,"name":"レティーシャ","tag_ids":["giji","ecclesia","kid"]},{"_id":"c42","order":33,"name":"ラルフ","tag_ids":["giji","servant","young"]},{"_id":"c37","order":34,"name":"セシル","tag_ids":["giji","market","young"]},{"_id":"c75","order":35,"name":"ビリー","tag_ids":["giji","market","middle"]},{"_id":"c32","order":36,"name":"オスカー","tag_ids":["giji","apartment","kid"]},{"_id":"c33","order":37,"name":"ホリー","tag_ids":["giji","apartment","kid"]},{"_id":"c02","order":38,"name":"アルフレッド","tag_ids":["giji","government","middle"]},{"_id":"c66","order":39,"name":"クリストファー","tag_ids":["giji","servant","guild","farm","middle"]},{"_id":"c24","order":41,"name":"ナタリア","tag_ids":["giji","government","apartment","elder"]},{"_id":"c79","order":42,"name":"マーゴ","tag_ids":["giji","government","apartment","young"]},{"_id":"c61","order":43,"name":"ヌマタロウ","tag_ids":["giji","river","farm","elder"]},{"_id":"c23","order":44,"name":"チャールズ","tag_ids":["giji","ecclesia","middle"]},{"_id":"c28","comment":"","name":"ケイト","order":47,"tag_ids":["giji","apartment","young"]},{"_id":"c68","order":48,"name":"ヨアヒム","tag_ids":["giji","market","immoral","elegant","middle","elder"]},{"_id":"c30","order":49,"name":"フィリップ","tag_ids":["giji","road","river","market","young"]},{"_id":"c21","order":50,"name":"ニール","tag_ids":["giji","farm","guild","young","middle"]},{"_id":"c52","order":52,"name":"ギリアン","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c51","order":53,"name":"ヨーランダ","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c01","comment":"","name":"メアリー","order":55,"tag_ids":["giji","market","road","young"]},{"_id":"c69","order":56,"name":"ギネス","tag_ids":["giji","guild","market","middle"]},{"_id":"c63","order":57,"name":"ピッパ","tag_ids":["giji","guild","young"]},{"_id":"c05","order":59,"name":"キャサリン","tag_ids":["giji","medical","young"]},{"_id":"c22","order":60,"name":"ワット","tag_ids":["giji","farm","middle"]},{"_id":"c62","order":61,"name":"ヴェラ","tag_ids":["giji","immoral","river","middle"]},{"_id":"c13","order":62,"name":"ロミオ","tag_ids":["giji","medical","elder"]},{"_id":"c18","order":63,"name":"エマ","tag_ids":["giji","medical","elder"]},{"_id":"c27","order":65,"name":"リンダ","tag_ids":["giji","farm","young"]},{"_id":"c08","order":66,"name":"ベネット","tag_ids":["giji","guild","young"]},{"_id":"c19","order":67,"name":"タバサ","tag_ids":["giji","immoral","market","young"]},{"_id":"c71","order":70,"name":"ノックス","tag_ids":["giji","road","farm","young"]},{"_id":"c03","order":71,"name":"スティーブン","tag_ids":["giji","medical","middle"]},{"_id":"c43","order":72,"name":"ガストン","tag_ids":["giji","farm","middle"]},{"_id":"c15","order":73,"name":"ウェーズリー","tag_ids":["giji","government","road","middle"]},{"_id":"c54","order":75,"name":"ザック","tag_ids":["giji","guild","medical","young"]},{"_id":"c25","order":77,"name":"ルーカス","tag_ids":["giji","elegant","young"]},{"_id":"c20","order":79,"name":"グロリア","tag_ids":["giji","elegant","young"]},{"_id":"c72","order":81,"name":"ヴェスパタイン","tag_ids":["giji","guild","young"]},{"_id":"c73","order":83,"name":"ローズマリー","tag_ids":["giji","immoral","market","young"]},{"_id":"c47","order":85,"name":"ペラジー","tag_ids":["giji","ecclesia","river","young"]},{"_id":"c80","order":87,"name":"テッド","tag_ids":["giji","road","apartment","young"]},{"_id":"c96","name":"レオナルド","comment":"2011/12/11","order":89,"tag_ids":["giji","government","ecclesia","middle"]},{"_id":"c95","name":"モリス","comment":"2011/12/11","order":91,"tag_ids":["giji","guild","road","young"]},{"_id":"c97","name":"ジェフ","comment":"2011/12/14 超常現象はあるんだ…","order":93,"tag_ids":["giji","government","river","young","middle"]},{"_id":"c98","name":"オズワルド","comment":"2011/12/29 この髭はぜったいワックス使ってる。","order":95,"tag_ids":["giji","immoral","river","middle"]},{"_id":"c100","name":"グレッグ","comment":"2012/12/30 スポーツ系中学生くらいに見える","order":97,"tag_ids":["giji","guild","young"]},{"_id":"c101","name":"クラリッサ","comment":"2011/12/30 美人さん♪","order":99,"tag_ids":["giji","servant","apartment","young"]},{"_id":"c90","name":"ケヴィン","comment":"2011/12/06","order":125,"tag_ids":["giji","government","river","farm","young"]},{"_id":"c88","name":"ピエール","order":126,"comment":"2011/12/05","tag_ids":["giji","servant","market","middle"]},{"_id":"c89","name":"カトリーナ","comment":"2011/12/06","order":128,"tag_ids":["giji","apartment","young"]},{"_id":"c84","name":"ブレンダ","order":129,"comment":"2011/12/05","tag_ids":["giji","apartment","middle"]},{"_id":"c85","name":"ハナ","order":130,"comment":"2011/12/05","tag_ids":["giji","road","servant","kid"]},{"_id":"c91","comment":"2011/12/06 姦しい奥様♪","name":"ドロシー","order":143,"tag_ids":["giji","river","servant","middle"]},{"_id":"c92","comment":"2011/12/06 姦し娘ーず♪","name":"セレスト","order":144,"tag_ids":["giji","river","servant","young"]},{"_id":"c93","comment":"2011/12/06 えー○○が許されるのは小学生までだよねー♪","name":"ベッキー","order":145,"tag_ids":["giji","river","servant","young"]},{"_id":"c78","order":150,"name":"ネイサン","tag_ids":["giji","market","middle"]},{"_id":"c82","order":148,"name":"ロビン","tag_ids":["giji","servant","kid"]},{"_id":"c94","name":"ダーラ","comment":"2011/12/11","order":165,"tag_ids":["giji","elegant","immoral","market","middle"]},{"_id":"c64","order":180,"name":"ヘクター","tag_ids":["giji","immoral","middle"]},{"_id":"c81","order":190,"name":"サイラス","tag_ids":["giji","medical","guild","farm","young"]},{"_id":"c67","order":200,"name":"ソフィア","tag_ids":["giji","guild","young"]},{"_id":"c76","order":210,"name":"ジョージ","tag_ids":["giji","apartment","kid"]},{"_id":"c60","order":213,"name":"ポーチュラカ","tag_ids":["giji","elegant","kid"]},{"_id":"c87","name":"エリアス","order":217,"comment":"2011/12/05","tag_ids":["giji","elegant","medical","young"]},{"_id":"c45","order":220,"name":"プリシラ","tag_ids":["giji","immoral","young"]},{"_id":"c48","order":225,"name":"ビアンカ","tag_ids":["giji","elegant","middle","elder"]},{"_id":"c86","name":"ホレーショー","order":230,"comment":"2011/12/05","tag_ids":["giji","immoral","apartment","middle"]},{"_id":"c83","order":240,"name":"アイリス","tag_ids":["marchen","giji","road","medical","market","young"]},{"_id":"c31","order":250,"name":"ネル","tag_ids":["giji","guild","apartment","young"]},{"_id":"c99","order":999,"name":"サイモン","tag_ids":["giji","apartment","young","middle"]},{"order":10001,"name":"露蝶","comment":"中国女性名","_id":"g01","tag_ids":["asia"]},{"order":215,"name":"志偉","comment":"台湾男性名 越南の名前も探したかったが、見つからぬ…","_id":"g02","tag_ids":["asia"]},{"order":10003,"name":"芙蓉","comment":"里帰り","_id":"g03","tag_ids":["asia"]},{"order":10004,"name":"沼太郎","comment":"里帰り","_id":"gc61","tag_ids":["asia"]},{"name":"デメテル","comment":"阿片窟からきました","order":20001,"_id":"mad01","tag_ids":["marchen"]},{"name":"エルゴット","comment":"阿片窟からきました","order":245,"_id":"mad02","tag_ids":["marchen"]},{"name":"シーシャ","comment":"阿片窟からきました","order":223,"_id":"mad03","tag_ids":["marchen"]},{"name":"ドリベル","comment":"阿片窟からきました","order":20004,"_id":"mad04","tag_ids":["marchen"]},{"name":"ヤヘイ","comment":"阿片窟からきました","order":1010,"_id":"mad05","tag_ids":["marchen"]},{"name":"アヤワスカ","comment":"阿片窟からきました","order":236,"_id":"mad06","tag_ids":["marchen"]},{"name":"チアキ","comment":"時をかける少女","order":30001,"_id":"t01","tag_ids":["travel"]},{"name":"リッキィ","comment":"夏への扉","order":30002,"_id":"t02","tag_ids":["travel"]},{"name":"ミナカタ","comment":"ー仁ー","order":156,"_id":"t03","tag_ids":["travel"]},{"name":"カイル","comment":"サラ・コナー・クロニクルズ","order":30004,"_id":"t04","tag_ids":["travel"]},{"name":"ジェニファー","comment":"バック・トゥ・ザ・フューチャー","order":30005,"_id":"t05","tag_ids":["travel"]},{"_id":"m99","order":70001,"name":"パルック","tag_ids":["myth"]},{"_id":"m06","order":70002,"name":"リリンラ","tag_ids":["myth"]},{"_id":"m03","order":70003,"name":"トノサマ","tag_ids":["myth"]},{"_id":"m05","order":70004,"name":"ナナコロ","tag_ids":["myth"]},{"_id":"m15","order":70005,"name":"ミソチャ","tag_ids":["myth"]},{"_id":"m07","order":70006,"name":"アリス","tag_ids":["myth"]},{"_id":"r30","order":70006,"name":"トリ","tag_ids":["myth"]},{"_id":"m01","order":70007,"name":"ケムシ","tag_ids":["myth"]},{"_id":"m02","order":70008,"name":"ポプラ","tag_ids":["myth"]},{"_id":"m04","order":70009,"name":"アオイ","tag_ids":["myth"]},{"_id":"b44","comment":"","name":"ドナルド","order":70010,"tag_ids":["myth"]},{"_id":"m08","order":70011,"name":"おっぱい","tag_ids":["myth"]},{"_id":"m09","order":70012,"name":"カミジャー","tag_ids":["myth"]},{"_id":"r12","order":70012,"name":"バーナバス","tag_ids":["myth"]},{"_id":"b49","comment":"","name":"ボリス","order":70012,"tag_ids":["myth"]},{"_id":"m10","order":70013,"name":"アチャポ","tag_ids":["myth"]},{"_id":"m12","comment":"","name":"トルニトス","order":70014,"tag_ids":["myth"]},{"_id":"m11","order":70015,"name":"ライトニング","tag_ids":["myth"]},{"_id":"m13","order":70016,"name":"ミケ","tag_ids":["myth"]},{"_id":"m14","order":70017,"name":"カリュクス","tag_ids":["myth"]},{"_id":"sf01","order":80000,"name":"ラッシード","comment":"りしあさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf02","order":80001,"name":"エスペラント","comment":"ふらぅさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf03","order":80002,"name":"ピート","comment":"たるっとさん＆りちゃさん","tag_ids":["stratos"]},{"_id":"sf04","order":80003,"name":"アシモフ","comment":"あすたん＆りりんら","tag_ids":["stratos"]},{"_id":"sf05","order":80004,"name":"モナリザ","comment":"ななころび＆りりんら","tag_ids":["stratos"]},{"_id":"sf06","order":80005,"name":"ワレンチナ","comment":"まりもさん＆あずまさん","tag_ids":["stratos"]},{"_id":"sf07","order":80007,"name":"ヤンファ","comment":"りしあさん＆はむおくん","tag_ids":["stratos"]},{"_id":"sf08","order":80008,"name":"ＰＪ","comment":"りしあさん＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf09","order":80009,"name":"キリシマ","comment":"ななころび＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf10","order":80010,"name":"ナユタ","comment":"かれやなぎさん＆かいさん","tag_ids":["stratos"]},{"_id":"sf11","order":80011,"name":"イワノフ","comment":"かれやなぎさん＆りちゃさん","tag_ids":["stratos"]},{"order":80012,"name":"†ルシフェル†","comment":null,"_id":"sf12","tag_ids":["stratos"]},{"order":80013,"name":"トルドヴィン","comment":null,"_id":"sf13","tag_ids":["stratos"]},{"order":80014,"name":"玖休","comment":null,"_id":"sf18","tag_ids":["stratos"]},{"order":80015,"name":"参休","comment":null,"_id":"sf19","tag_ids":["stratos"]},{"order":80016,"name":"クリスマス","comment":null,"_id":"sf14","tag_ids":["stratos"]},{"order":80017,"name":"ジェームス","comment":null,"_id":"sf15","tag_ids":["stratos"]},{"order":80018,"name":"ライジ","comment":null,"_id":"sf16","tag_ids":["stratos"]},{"order":80019,"name":"ジャック","comment":null,"_id":"sf17","tag_ids":["stratos"]},{"_id":"w05","order":90001,"name":"定吉","comment":"ぷえるとりこの旅人　エージ―エー","tag_ids":["shoji"]},{"_id":"w21","order":90002,"name":"鉄平","comment":"日本の伝統　熊木彫","tag_ids":["shoji"]},{"_id":"w22","order":90003,"name":"竹三","comment":"雪国の風雅　熊木彫","tag_ids":["shoji"]},{"_id":"w36","order":90004,"name":"ウト","tag_ids":["shoji"]},{"_id":"w16","order":90005,"name":"勢","comment":"ぶたさん印の　あおいジンギスカン","tag_ids":["shoji"]},{"_id":"w18","order":90006,"name":"菊","tag_ids":["shoji"]},{"_id":"w26","order":90007,"name":"勝丸","tag_ids":["shoji"]},{"_id":"w35","comment":"","name":"奈須麿","order":90008,"tag_ids":["shoji"]},{"_id":"w24","order":90009,"name":"辰次","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w37","order":90010,"name":"芙蓉","tag_ids":["shoji"]},{"_id":"w29","order":90011,"name":"志乃","tag_ids":["shoji"]},{"_id":"w20","order":90012,"name":"藤之助","tag_ids":["shoji"]},{"_id":"w31","order":90013,"name":"日向","tag_ids":["shoji"]},{"_id":"w12","order":90014,"name":"おみつ","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w10","order":90015,"name":"博史","tag_ids":["shoji"]},{"_id":"w25","order":90016,"name":"法泉","tag_ids":["shoji"]},{"_id":"w09","order":90017,"name":"チャールズ","comment":"チャールズ派遣ならおまかせ　O-ririn","tag_ids":["shoji"]},{"_id":"w30","order":90018,"name":"雪代","tag_ids":["shoji"]},{"_id":"w14","order":90019,"name":"華月斎","comment":"めげないゼラチン作り　MEGEゼラチン","tag_ids":["shoji"]},{"_id":"w13","order":90020,"name":"たまこ","comment":"世界の道をつなぐ　議事国地図","tag_ids":["shoji"]},{"_id":"w11","order":90021,"name":"沼太郎","tag_ids":["shoji"]},{"_id":"w03","order":90022,"name":"朔","comment":"新しい議事をつくる　たき学会","tag_ids":["shoji"]},{"_id":"w34","order":90023,"name":"余四朗","tag_ids":["shoji"]},{"_id":"w27","order":90024,"name":"源蔵","tag_ids":["shoji"]},{"_id":"w28","order":90025,"name":"甚六","tag_ids":["shoji"]},{"_id":"w17","order":90026,"name":"雷門","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w39","comment":"","name":"沙耶","order":90027,"tag_ids":["shoji"]},{"_id":"w08","order":90028,"name":"朝顔","tag_ids":["shoji"]},{"_id":"w43","order":90029,"name":"春松","tag_ids":["shoji"]},{"_id":"w07","order":90030,"name":"夕顔","tag_ids":["shoji"]},{"_id":"w40","order":90031,"name":"朧","tag_ids":["shoji"]},{"_id":"w33","comment":"","name":"団十郎","order":90032,"tag_ids":["shoji"]},{"_id":"w23","order":90033,"name":"仁右衛門","tag_ids":["shoji"]},{"_id":"w04","order":90034,"name":"小鈴","comment":"お口の愛人　タルッティ・タルット","tag_ids":["shoji"]},{"_id":"w06","order":90035,"name":"ゆり","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w38","comment":"","name":"一平太","order":90037,"tag_ids":["shoji"]},{"_id":"w01","order":90038,"name":"鏡花","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w15","order":90039,"name":"八重","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w32","order":90040,"name":"明之進","tag_ids":["shoji"]},{"_id":"w02","order":90041,"name":"慶三郎","comment":"カメラのことなら　MISEKI","tag_ids":["shoji"]},{"_id":"w44","name":"雪客","comment":"りりんラハウス呑んだくれ大会","order":90042,"tag_ids":["shoji"]},{"_id":"w45","name":"亀吉","comment":"りりんラハウス呑んだくれ大会","order":90043,"tag_ids":["shoji"]},{"_id":"w46","name":"梅子","order":90044,"comment":"お誕生日記念☆","tag_ids":["shoji"]},{"face_id":"w47","name":"置壱","comment":"日本の美徳強化月間","order":90045,"_id":"w47","tag_ids":["shoji"]},{"face_id":"all","name":"パルック","order":99999,"_id":"all","tag_ids":["god"]},{"_id":"g04","name":"攻芸","comment":"台湾男性名","order":10005,"tag_ids":["asia"]},{"_id":"g05","name":"麻雀","comment":"中国女性名","order":170,"tag_ids":["asia"]},{"_id":"g06","name":"黍炉","comment":"ダリダイ・オッチギン","order":10007,"tag_ids":["asia"]},{"_id":"mad07","name":"ダイミ","comment":"阿片窟からきました","order":20007,"tag_ids":["marchen"]},{"_id":"mad08","name":"エフェドラ","comment":"阿片窟からきました","order":20008,"tag_ids":["marchen"]},{"_id":"t06","name":"サミュエル","comment":"トランスフォーマー","order":30006,"tag_ids":["travel"]},{"_id":"t07","name":"アカリ","comment":"時をかける少女","order":30019,"tag_ids":["travel"]},{"_id":"t08","name":"ミルフィ","comment":"海賊戦隊ゴーカイジャー","order":30020,"tag_ids":["travel"]},{"_id":"t09","name":"ゴロウ","comment":"時をかける少女","order":30009,"tag_ids":["travel"]},{"_id":"t10","name":"トレイル","comment":"ゼルダの伝説 ムジュラの仮面","order":30010,"tag_ids":["travel"]},{"_id":"t11","name":"マドカ","comment":"宇宙戦艦ヤマモト・ヨーコ","order":30019,"tag_ids":["travel"]},{"_id":"t12","name":"フランク","comment":"オーロラの彼方へ","order":30012,"tag_ids":["travel"]},{"_id":"t13","name":"ジャニス","comment":"フラッシュフォワード","order":30013,"tag_ids":["travel"]},{"_id":"c105","comment":"年末カウントダウン♪","name":"シメオン","order":82,"tag_ids":["giji","apartment","ecclesia","young"]},{"_id":"c104","comment":"年末カウントダウン♪","name":"ヒュー","order":89,"tag_ids":["giji","medical","young"]},{"_id":"c106","comment":"年末カウントダウン♪","name":"ワンダ","order":90,"tag_ids":["giji","river","guild","middle"]},{"_id":"c108","name":"ブローリン","comment":"年末カウントダウン♪","order":91,"tag_ids":["giji","farm","young","middle"]},{"_id":"c109","name":"ラディスラヴァ","comment":"年末カウントダウン♪","order":185,"tag_ids":["giji","apartment","young"]},{"_id":"c102","comment":"年末カウントダウン♪","name":"ウォーレン","order":155,"tag_ids":["giji","market","elder"]},{"_id":"c107","name":"イヴォン","comment":"年末カウントダウン♪","order":205,"tag_ids":["giji","elegant","middle","elder"]},{"_id":"c103","comment":"年末カウントダウン♪","name":"ナンシー","order":234,"tag_ids":["giji","apartment","young"]},{"_id":"t14","name":"クシャミ","comment":"吾輩は猫である。","order":30014,"tag_ids":["travel"]},{"_id":"t15","name":"ガーディ","comment":"ベイカー街少年探偵団","order":30015,"tag_ids":["travel"]},{"_id":"sf20","name":"ティソ","comment":null,"order":80020,"tag_ids":["stratos"]},{"_id":"g07","name":"ジリヤ","comment":"ロシア女性名","order":10008,"tag_ids":["asia"]},{"_id":"t16","name":"アラン","comment":"映画監督たちの共用偽名","order":30016,"tag_ids":["travel"]},{"_id":"w48","name":"直円","comment":"和算復活月間","order":90048,"tag_ids":["shoji"]},{"_id":"w49","name":"錠","comment":"ポルトガル人にジオゴっているんだぜ。へー。かっこいー。","order":90049,"tag_ids":["shoji"]},{"_id":"w50","name":"丁助","comment":"負けるたびに追い博打","order":90050,"tag_ids":["shoji"]},{"_id":"t17","name":"ススム","comment":"おもいっきり探偵団 覇悪怒組","order":30018,"tag_ids":["travel"]},{"_id":"t18","name":"マユミ","comment":"まんがはじめて物語（二代目）","order":30018,"tag_ids":["travel"]},{"_id":"c110","name":"リー","comment":"","order":92,"tag_ids":["giji","immoral","apartment","young"]},{"_id":"t19","name":"ハルカ","comment":"はるかリフレイン","order":30017,"tag_ids":["travel"]},{"_id":"w51","name":"鬼丞","comment":"リニューアル記念！","order":90051,"tag_ids":["shoji"]},{"_id":"w52","name":"櫻子","comment":"リニューアル記念！","order":90052,"tag_ids":["shoji"]},{"_id":"c111","name":"スージー","comment":"リニューアル記念！ 弟がいるという噂が…","order":160,"tag_ids":["giji","apartment","elegant","immoral","young"]},{"_id":"c113","name":"ジェレミー","comment":"リニューアル記念！","order":228,"tag_ids":["giji","apartment","immoral","young","middle"]},{"_id":"c112","name":"ニコラス","comment":"！？","order":128,"tag_ids":["giji","elegant","young"]},{"_id":"m16","name":"アーサー","comment":"円卓の騎士","order":70018,"tag_ids":["myth"]},{"_id":"t20","name":"エリ","comment":"英国情報局秘密組織チェラブ (CHERUB)","order":30022,"tag_ids":["travel"]},{"_id":"g08","name":"イワン","comment":"Иван-дурак","order":10009,"tag_ids":["asia"]},{"_id":"c114","name":"モンド","comment":"８８件のご応募、ありがとう。そして、ありがとう。","order":131,"tag_ids":["giji","government","immoral","middle"]},{"_id":"m18","name":"ミーム","comment":"インターネット・ミームから。 えんいー","order":70020,"tag_ids":["myth"]},{"_id":"m19","name":"タルト","comment":"https://twitter.com/7korobi/status/510069062974447617","order":70021,"tag_ids":["myth"]},{"_id":"m20","name":"ショコラ","comment":"https://twitter.com/noa_marimo/status/510100541536358400","order":70022,"tag_ids":["myth"]},{"_id":"c115","name":"マリオ","comment":"じつは、牧場育ちらしいよ。","order":132,"tag_ids":["giji","guild","road","kid"]},{"_id":"t21","name":"トシミ","comment":"代紋TAKE2","order":30019,"tag_ids":["travel"]},{"_id":"t22","name":"ケイイチ","comment":"ひぐらしのなく頃に","order":30021,"tag_ids":["travel"]},{"_id":"w53","name":"おもん","comment":"三拾糎程の「もふもふねこひよこ」　せんいち","order":90053,"tag_ids":["shoji"]},{"_id":"sf021","name":"アンタレス","comment":"","order":80022,"tag_ids":["stratos"]},{"_id":"sf023","name":"エフ","comment":"","order":80023,"tag_ids":["stratos"]},{"_id":"sf024","name":"アイライト","comment":"","order":80024,"tag_ids":["stratos"]},{"_id":"sf025","name":"アマルテア","comment":"","order":80006,"tag_ids":["stratos"]},{"_id":"sf026","name":"ポーラ","comment":"","order":80026,"tag_ids":["stratos"]},{"_id":"sf022","name":"チェビイ","comment":"","order":80027,"tag_ids":["stratos"]},{"_id":"sf027","name":"モスキート","comment":"","order":80028,"tag_ids":["stratos"]},{"_id":"sf032","name":"ワクラバ","comment":"","order":80029,"tag_ids":["stratos"]},{"_id":"sf028","name":"コータ","comment":"","order":80030,"tag_ids":["stratos"]},{"_id":"sf029","name":"ミツボシ","comment":"","order":80031,"tag_ids":["stratos"]},{"_id":"sf030","name":"クレパスキュール","comment":"","order":80032,"tag_ids":["stratos"]},{"_id":"sf031","name":"シルク","comment":"","order":80033,"tag_ids":["stratos"]},{"_id":"t23","name":"ナナオ","comment":"","order":30023,"tag_ids":["travel"]},{"_id":"t24","name":"キルロイ","comment":"「キルロイここに現る」","order":30024,"tag_ids":["travel"]},{"_id":"t25","name":"ミサキ","comment":"","order":30025,"tag_ids":["travel"]},{"_id":"t26","name":"アツタネ","comment":"平田篤胤","order":30026,"tag_ids":["travel"]},{"_id":"t27","name":"みょんこ","comment":"","order":30027,"tag_ids":["travel"]},{"_id":"t28","name":"リツ","comment":"","order":30028,"tag_ids":["travel"]},{"_id":"t29","name":"ヒナコ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"t30","name":"ワタヌキ","comment":"四月朔日","order":30030,"tag_ids":["travel"]},{"_id":"t31","name":"ホウイチ","comment":"","order":158,"tag_ids":["travel"]},{"_id":"t32","name":"トヨタ","comment":"洋画の日本人名","order":30032,"tag_ids":["travel"]},{"_id":"t33","name":"エツコ","comment":"","order":30033,"tag_ids":["travel"]},{"_id":"t34","name":"ドン","comment":"","order":17,"tag_ids":["travel"]},{"_id":"c116","name":"メルヤ","comment":"","order":116,"tag_ids":["giji","medical","immoral","young"]},{"_id":"c117","name":"ルパート","comment":"","order":135,"tag_ids":["giji","road","guild","elder"]},{"_id":"c118","name":"ユージン","comment":"","order":118,"tag_ids":["giji","river","young","middle"]},{"_id":"c119","name":"オーレリア","comment":"","order":119,"tag_ids":["giji","ecclesia","young"]},{"_id":"c120","name":"ノア","comment":"","order":120,"tag_ids":["giji","servant","young","middle"]},{"_id":"t35","name":"イスルギ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"c121","name":"ブッカ","comment":"ブッカ・ホワイト氏から。","order":121,"tag_ids":["giji","farm"]},{"_id":"mad09","name":"カナビス","comment":"ウパニシャッドの精神で","order":20009,"tag_ids":["marchen"]},{"_id":"mad10","name":"ルグレ","comment":"後悔あとをたたず","order":20010,"tag_ids":["marchen"]},{"_id":"mad11","name":"オルギア","comment":"ええじゃないかええじゃないかー！","order":20011,"tag_ids":["marchen"]},{"_id":"sf033","name":"イースター","comment":null,"order":80033,"tag_ids":["stratos"]},{"_id":"sf034","name":"アニュ","order":80034,"tag_ids":["stratos"]},{"_id":"sf035","name":"キャンディ","comment":null,"order":80035,"tag_ids":["stratos"]},{"_id":"sf036","name":"キカ","order":80036,"tag_ids":["stratos"]},{"_id":"sf037","name":"バンアレン","order":80037,"tag_ids":["stratos"]},{"_id":"sf038","name":"パラチーノ","order":80038,"tag_ids":["stratos"]},{"_id":"t36","name":"イルマ","comment":"KKKてきな何か。","order":30036,"tag_ids":["travel"]},{"_id":"t37","name":"シュンタロ","comment":"国語の教科書から。","order":30009,"tag_ids":["travel"]},{"_id":"t38","name":"スズキ","comment":"人の死なない推理小説『黒後家蜘蛛の会』のそばに","order":30038,"tag_ids":["travel"]},{"_id":"t39","name":"ガモウ","comment":"そろそろ聖戦士が欲しかった！","order":30018.1,"tag_ids":["travel"]}]

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cs_all.yml": 35,
	"./cs_animal.yml": 36,
	"./cs_changed.yml": 37,
	"./cs_ger.yml": 38,
	"./cs_mad.yml": 39,
	"./cs_ririnra.yml": 40,
	"./cs_school.yml": 41,
	"./cs_sf.yml": 42,
	"./cs_time.yml": 43,
	"./cs_wa.yml": 44
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
webpackContext.id = 34;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"all","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事 ちゃんぷる"},"chr_npc":[{"label":"人狼議事 ちゃんぷる","csid":"all","face_id":"all","say_0":"ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","say_1":"皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"}],"chr_job":[{"face_id":"all","job":"かみさま"}]}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"animal","admin":"大地の震動","maker":"草原のざわめき","label":"うきうきサバンナ"},"chr_npc":[{"label":"うきうきサバンナ","csid":"animal","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"こじか"},{"face_id":"c02","job":"よーくしゃーてりあ"},{"face_id":"c03","job":"かもすぞ"},{"face_id":"c04","job":"くろひょう"},{"face_id":"c05","job":"いとまきえい"},{"face_id":"c06","job":"へび"},{"face_id":"c07","job":"てのりぶんちょう"},{"face_id":"c08","job":"たぬき"},{"face_id":"c09","job":"にほんおおかみ"},{"face_id":"c10","job":"そまり"},{"face_id":"c11","job":"みけ"},{"face_id":"r12","job":"うえきばち"},{"face_id":"c13","job":"かたつむり"},{"face_id":"c14","job":"くらげ"},{"face_id":"c15","job":"しゃち"},{"face_id":"c16","job":"あふりかぞう"},{"face_id":"c17","job":"おらうーたん"},{"face_id":"c18","job":"かまきり"},{"face_id":"c19","job":"あげはちょう"},{"face_id":"c20","job":"とら"},{"face_id":"c21","job":"おおたこ"},{"face_id":"c22","job":"うちゅうせん"},{"face_id":"c23","job":"ぱんだ"},{"face_id":"c24","job":"ぶるどっぐ"},{"face_id":"c25","job":"うし"},{"face_id":"c26","job":"えりまきとかげ"},{"face_id":"c27","job":"ひつじ"},{"face_id":"c28","job":"うさぎ"},{"face_id":"c29","job":"しまうま"},{"face_id":"c30","job":"おうむ"},{"face_id":"c31","job":"かえる"},{"face_id":"c32","job":"きんぎょ"},{"face_id":"c33","job":"ねったいぎょ"},{"face_id":"c34","job":"すなねずみ"},{"face_id":"c35","job":"ごりら"},{"face_id":"c36","job":"さらぶれっど"},{"face_id":"c37","job":"ぺるしゃ"},{"face_id":"c38","job":"だいおういか"},{"face_id":"c39","job":"もみのき"},{"face_id":"c40","job":"らいおん"},{"face_id":"c41","job":"ろぶすたー"},{"face_id":"c42","job":"みつりょうしゃ"},{"face_id":"c43","job":"くまー"},{"face_id":"c44","job":"いわとびぺんぎん"},{"face_id":"c45","job":"はいえな"},{"face_id":"c46","job":"あらいぐま"},{"face_id":"c47","job":"しろまどうし"},{"face_id":"c48","job":"くじゃく"},{"face_id":"c49","job":"にほんざる"},{"face_id":"c50","job":"きつね"},{"face_id":"c51","job":"かげろう"},{"face_id":"c52","job":"ありじごく"},{"face_id":"c53","job":"やみふくろう"},{"face_id":"c54","job":"さめ"},{"face_id":"c55","job":"もるふぉちょう"},{"face_id":"c56","job":"ぶた"},{"face_id":"c57","job":"らくだ"},{"face_id":"c58","job":"ゆにこーん"},{"face_id":"c59","job":"れとりばー"},{"face_id":"c60","job":"はむすたー"},{"face_id":"c61","job":"すっぽん"},{"face_id":"c62","job":"きつねりす"},{"face_id":"c63","job":"おこじょ"},{"face_id":"c64","job":"やまあらし"},{"face_id":"c65","job":"ちすいこうもり"},{"face_id":"c66","job":"ばいにん"},{"face_id":"c67","job":"りす"},{"face_id":"c68","job":"なまこ"},{"face_id":"c69","job":"びーる"},{"face_id":"c70","job":"かんがるー"},{"face_id":"c71","job":"なまけもの"},{"face_id":"c72","job":"ほたる"},{"face_id":"c73","job":"くりおね"},{"face_id":"c74","job":"はいびすかす"},{"face_id":"c75","job":"いえてぃ"},{"face_id":"c76","job":"めがねざる"},{"face_id":"c77","job":"にんじん"},{"face_id":"c78","job":"かめれおん"},{"face_id":"c79","job":"わかめ"},{"face_id":"c80","job":"りかおん"},{"face_id":"c81","job":"ふぇねっく"},{"face_id":"c82","job":"どぶねずみ"},{"face_id":"c83","job":"いそぎんちゃく"},{"face_id":"c99","job":"しんかいぎょ"},{"face_id":"c86","job":"かも"},{"face_id":"c94","job":"あかまむし"},{"face_id":"c92","job":"さば"},{"face_id":"c90","job":"さい"},{"face_id":"c95","job":"やもり"},{"face_id":"c97","job":"しぇぱーど"},{"face_id":"c100","job":"びーばー"},{"face_id":"c106","job":"まんぼう"},{"face_id":"c89","job":"かば"},{"face_id":"c91","job":"あるぱか"},{"face_id":"c93","job":"わらいかわせみ"},{"face_id":"c107","job":"いぼいのしし"},{"face_id":"c85","job":"かみつきがめ"},{"face_id":"c105","job":"うみねこ"},{"face_id":"c96","job":"せあかごけぐも"},{"face_id":"c98","job":"はしびろこう"},{"face_id":"c101","job":"すずらん"},{"face_id":"c104","job":"みいら"},{"face_id":"c108","job":"ぶろっこりー"},{"face_id":"c88","job":"ゆでたまご"},{"face_id":"c84","job":"しろへび"},{"face_id":"c109","job":"しろちゃとら"},{"face_id":"c102","job":"さんた"},{"face_id":"c87","job":"りゅう"},{"face_id":"c103","job":"おうむがい"}]}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"changed","admin":"闇の呟き","maker":"広場のお告げ","label":"はおうの広場"},"chr_npc":[{"label":"とのさま広場","csid":"changed","face_id":"m08","say_0":"じんろう？\nそんななまえのこ、いたかしら……","say_1":"さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"},{"_id":"m05","label":"はおうの広場","csid":"changed_m05","face_id":"m05","say_0":"ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","say_1":"誰にも、腰抜けなんて…言わせないぞっ"}],"chr_job":[{"face_id":"b44","job":"こあくとう"},{"face_id":"b49","job":"いしく"},{"face_id":"m01","job":"ようせい"},{"face_id":"m02","job":"ようせい"},{"face_id":"m03","job":"しょうぐん"},{"face_id":"m04","job":"すくみず"},{"face_id":"m05","job":"はおう"},{"face_id":"m06","job":"きゅうていがか"},{"face_id":"m07","job":"こひつじ"},{"face_id":"m08","job":"おふくろのあじ"},{"face_id":"m09","job":"しーさー"},{"face_id":"m10","job":"ころぽっくる"},{"face_id":"m11","job":"神聖騎士"},{"face_id":"m12","job":"暗黒騎士"},{"face_id":"m13","job":"調律師"},{"face_id":"m14","job":"奇跡の子"},{"face_id":"m15","job":"びじん"},{"face_id":"m16","job":"りゅうきへい"},{"face_id":"m18","job":"記号の妖精"},{"face_id":"m19","job":"おひめさま"},{"face_id":"m20","job":"げぼく"},{"face_id":"m99","job":"かみさま"},{"face_id":"r30","job":"ひとづかい"}]}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ger","admin":"闇の呟き","maker":"馬頭琴の調","label":"エクスパンション・セット「大陸議事」"},"chr_npc":[{"label":"エクスパンション・セット「大陸議事」","csid":"ger","face_id":"g03","say_0":"まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","say_1":"飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"}],"chr_job":[{"face_id":"g01","job":"三元道士"},{"face_id":"g02","job":"白鶴拳"},{"face_id":"g03","job":"吹牛方士"},{"face_id":"gc61","job":"釣り師"},{"face_id":"g04","job":"心意六合拳"},{"face_id":"g05","job":"本草方士"},{"face_id":"g06","job":"宝飾交易"},{"face_id":"g07","job":"お針子"},{"face_id":"g08","job":"馬鹿"}]}

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"mad","admin":"闇の呟き","maker":"天上の調べ","label":"エクスパンション・セット「狂騒議事」"},"chr_npc":[{"label":"エクスパンション・セット「狂騒議事」","csid":"mad","face_id":"c83","say_0":"どうせ、殺されるわみんな。…みんな\n\n\n/* 死ねばいいのに */","say_1":"１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"エクスパンション・セット「狂騒議事」（ヤヘイ）","csid":"mad_mad05","face_id":"mad05","say_0":"…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","say_1":"…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"}],"chr_job":[{"face_id":"c103","job":"厭世家"},{"face_id":"c83","job":"虹追い"},{"face_id":"mad01","job":"青い鳥"},{"face_id":"mad02","job":"蟻塚崩し"},{"face_id":"mad03","job":"露店巡り"},{"face_id":"mad04","job":"酸味探し"},{"face_id":"mad05","job":"天井手繰り"},{"face_id":"mad06","job":"隠れん坊"},{"face_id":"mad07","job":"早口言葉"},{"face_id":"mad08","job":"妄執の誓い"},{"face_id":"mad09","job":"隣席座り"},{"face_id":"mad10","job":"追憶探り"},{"face_id":"mad11","job":"乱痴気"}]}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ririnra","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事"},"chr_npc":[{"label":"人狼議事（キャサリン）","csid":"ririnra_c05","face_id":"c05","say_0":"たいへん、たいへん、たいへん！","say_1":"大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"},{"label":"人狼議事（ベネット）","csid":"ririnra_c08","face_id":"c08","say_0":"壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","say_1":"足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"人狼議事（タバサ）","csid":"ririnra_c19","face_id":"c19","say_0":"ねぇ、遊んでかない？今夜はあなたが狼よ……","say_1":"人狼なんているわけないじゃん？みんな大げさなのさ。"},{"label":"人狼議事（ソフィア）","csid":"ririnra_c67","face_id":"c67","say_0":"こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","say_1":"まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"},{"label":"人狼議事（ヨアヒム）","csid":"ririnra_c68","face_id":"c68","say_0":"ふひ、ふひひ！人狼になど……くれてやるものかヨ！","say_1":"人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"},{"label":"人狼議事（ヴェスパタイン）","csid":"ririnra_c72","face_id":"c72","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"人狼議事（ヨーランダ）","csid":"ririnra_c51","face_id":"c51","say_0":"夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","say_1":"……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"},{"label":"人狼議事（グロリア）","csid":"ririnra_c20","face_id":"c20","say_0":"紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","say_1":"ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"},{"label":"人狼議事（オスカー）","csid":"ririnra_c32","face_id":"c32","say_0":"…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","say_1":"ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"},{"label":"人狼議事","csid":"ririnra","face_id":"c99","say_0":"嗚呼、聞こえ る。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"花売り"},{"face_id":"c02","job":"村長"},{"face_id":"c03","job":"見習い医師"},{"face_id":"c04","job":"女中"},{"face_id":"c05","job":"病人"},{"face_id":"c06","job":"紐"},{"face_id":"c07","job":"雑貨屋"},{"face_id":"c08","job":"本屋"},{"face_id":"c09","job":"刺客"},{"face_id":"c10","job":"小娘"},{"face_id":"c11","job":"小僧"},{"face_id":"c12","job":"御者"},{"face_id":"c13","job":"ベテラン医師"},{"face_id":"c14","job":"聖歌隊員"},{"face_id":"c15","job":"郵便屋"},{"face_id":"c16","job":"食いしん坊"},{"face_id":"c17","job":"詩人"},{"face_id":"c18","job":"ベテラン看護婦"},{"face_id":"c19","job":"水商売"},{"face_id":"c20","job":"良家の娘"},{"face_id":"c21","job":"肉屋"},{"face_id":"c22","job":"百姓"},{"face_id":"c23","job":"伝道師"},{"face_id":"c24","job":"長老"},{"face_id":"c25","job":"良家の息子"},{"face_id":"c26","job":"楽器職人"},{"face_id":"c27","job":"牧人"},{"face_id":"c28","job":"読書家"},{"face_id":"c29","job":"記者"},{"face_id":"c30","job":"鳥使い"},{"face_id":"c31","job":"童話作家"},{"face_id":"c32","job":"双生児"},{"face_id":"c33","job":"双生児"},{"face_id":"c34","job":"靴磨き"},{"face_id":"c35","job":"親方"},{"face_id":"c36","job":"飾り職"},{"face_id":"c37","job":"奏者"},{"face_id":"c38","job":"歌い手"},{"face_id":"c39","job":"仕立て屋"},{"face_id":"c40","job":"執事"},{"face_id":"c41","job":"さすらい人"},{"face_id":"c42","job":"掃除夫"},{"face_id":"c43","job":"森番"},{"face_id":"c44","job":"小悪党"},{"face_id":"c45","job":"博徒"},{"face_id":"c46","job":"助手"},{"face_id":"c47","job":"流浪者"},{"face_id":"c48","job":"宝石収集家"},{"face_id":"c49","job":"石工"},{"face_id":"c50","job":"会計士"},{"face_id":"c51","job":"墓守"},{"face_id":"c52","job":"墓堀"},{"face_id":"c53","job":"大地主"},{"face_id":"c54","job":"理髪師"},{"face_id":"c55","job":"寡婦"},{"face_id":"c56","job":"酒屋"},{"face_id":"c57","job":"修道女"},{"face_id":"c58","job":"司祭"},{"face_id":"c59","job":"修道士"},{"face_id":"c60","job":"良家の末娘"},{"face_id":"c61","job":"釣り師"},{"face_id":"c62","job":"風来坊"},{"face_id":"c63","job":"漂白工"},{"face_id":"c64","job":"墓荒らし"},{"face_id":"c65","job":"始末屋"},{"face_id":"c66","job":"紅茶屋"},{"face_id":"c67","job":"店番"},{"face_id":"c68","job":"賭場の主"},{"face_id":"c69","job":"美術家"},{"face_id":"c70","job":"子守り"},{"face_id":"c71","job":"道案内"},{"face_id":"c72","job":"ランタン職人"},{"face_id":"c73","job":"水商売"},{"face_id":"c74","job":"踊り手"},{"face_id":"c75","job":"奏者"},{"face_id":"c76","job":"留守番"},{"face_id":"c77","job":"馬飼い"},{"face_id":"c78","job":"道化師"},{"face_id":"c79","job":"長老の孫"},{"face_id":"c80","job":"若者"},{"face_id":"c81","job":"薬屋"},{"face_id":"c82","job":"執事見習い"},{"face_id":"c83","job":"受付"},{"face_id":"c84","job":"妻"},{"face_id":"c85","job":"お使い"},{"face_id":"c86","job":"放蕩者"},{"face_id":"c87","job":"病人"},{"face_id":"c88","job":"料理人"},{"face_id":"c99","job":"厭世家"},{"job":"新妻","face_id":"c89"},{"job":"粉ひき","face_id":"c90"},{"job":"洗濯婦","face_id":"c91"},{"job":"洗濯婦","face_id":"c92"},{"job":"洗濯婦","face_id":"c93"},{"face_id":"c94","job":"女主人"},{"face_id":"c95","job":"新聞配達"},{"face_id":"c96","job":"学者"},{"job":"捜査官","face_id":"c97"},{"job":"探偵","face_id":"c98"},{"job":"徒弟","face_id":"c100"},{"job":"手伝い","face_id":"c101"},{"face_id":"c102","job":"指揮者"},{"face_id":"c103","job":"厭世家"},{"face_id":"c104","job":"負傷兵"},{"face_id":"c105","job":"教え子"},{"face_id":"c106","job":"魚屋"},{"face_id":"c107","job":"成金"},{"face_id":"c108","job":"採集人"},{"face_id":"c109","job":"村娘"},{"face_id":"c110","job":"ろくでなし"},{"face_id":"c111","job":"愛人"},{"face_id":"c112","job":"許婚"},{"face_id":"c113","job":"紐"},{"face_id":"c114","job":"革命家"},{"face_id":"c115","job":"廃品回収"},{"face_id":"c116","job":"逃亡者"},{"face_id":"c117","job":"宿屋"},{"face_id":"c118","job":"渡し船"},{"face_id":"c119","job":"信徒"},{"face_id":"c120","job":"庭師"},{"face_id":"c121","job":"農薬売"}]}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"school","admin":"校内放送","maker":"校内放送","label":"私立七転学園"},"chr_npc":[{"label":"私立七転学園","csid":"school","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"華道部"},{"face_id":"c02","job":"校長"},{"face_id":"c03","job":"化学教師"},{"face_id":"c04","job":"ＳＯＳ団"},{"face_id":"c05","job":"留年生"},{"face_id":"c06","job":"保健体育教師"},{"face_id":"c07","job":"歴史教師"},{"face_id":"c08","job":"図書委員"},{"face_id":"c09","job":"動く銅像"},{"face_id":"c10","job":"ミーハー"},{"face_id":"c11","job":"優等生"},{"face_id":"c12","job":"用務員"},{"face_id":"c13","job":"生物教師"},{"face_id":"c14","job":"コーラス部"},{"face_id":"c15","job":"地理教師"},{"face_id":"c16","job":"食堂のおねいさん"},{"face_id":"c17","job":"演劇部顧問"},{"face_id":"c18","job":"数学教師"},{"face_id":"c19","job":"チアリーダー"},{"face_id":"c20","job":"理事長の孫"},{"face_id":"c21","job":"球部顧問"},{"face_id":"c22","job":"農業科"},{"face_id":"c23","job":"現国教師"},{"face_id":"c24","job":"理事長"},{"face_id":"c25","job":"校長の孫"},{"face_id":"c26","job":"吹奏楽部"},{"face_id":"c27","job":"手芸部"},{"face_id":"c28","job":"文芸部"},{"face_id":"c29","job":"新聞部"},{"face_id":"c30","job":"飼育委員"},{"face_id":"c31","job":"漫画研究部"},{"face_id":"c32","job":"演劇部"},{"face_id":"c33","job":"演劇部"},{"face_id":"c34","job":"球児"},{"face_id":"c35","job":"体育教師"},{"face_id":"c36","job":"美術部"},{"face_id":"c37","job":"音楽教師"},{"face_id":"c38","job":"軽音楽部"},{"face_id":"c39","job":"家政科教師"},{"face_id":"c40","job":"教頭先生"},{"face_id":"c41","job":"登山部"},{"face_id":"c42","job":"生徒会執行部"},{"face_id":"c43","job":"番長"},{"face_id":"c44","job":"問題児"},{"face_id":"c45","job":"スケバン"},{"face_id":"c46","job":"保険医"},{"face_id":"c47","job":"転校生"},{"face_id":"c48","job":"美術教師"},{"face_id":"c49","job":"技術教師"},{"face_id":"c50","job":"風紀委員"},{"face_id":"c51","job":"幽霊部員"},{"face_id":"c52","job":"映画研究会"},{"face_id":"c53","job":"寮管理人"},{"face_id":"c54","job":"野球部"},{"face_id":"c55","job":"肖像画"},{"face_id":"c56","job":"世界史教師"},{"face_id":"c57","job":"修士"},{"face_id":"c58","job":"名誉教授"},{"face_id":"c59","job":"修士"},{"face_id":"c60","job":"ラクロス部"},{"face_id":"c61","job":"魚拓部"},{"face_id":"c62","job":"守衛"},{"face_id":"c63","job":"マネージャー"},{"face_id":"c64","job":"格闘技同好会"},{"face_id":"c65","job":"教育実習"},{"face_id":"c66","job":"茶道部顧問"},{"face_id":"c67","job":"購買部"},{"face_id":"c68","job":"後援者"},{"face_id":"c69","job":"陶芸部"},{"face_id":"c70","job":"先輩"},{"face_id":"c71","job":"帰宅部"},{"face_id":"c72","job":"ヴィジュアル系バンド部"},{"face_id":"c73","job":"チアガール"},{"face_id":"c74","job":"社交ダンス部"},{"face_id":"c75","job":"演奏講師"},{"face_id":"c76","job":"委員長"},{"face_id":"c77","job":"いきもの係"},{"face_id":"c78","job":"演劇部"},{"face_id":"c79","job":"水泳部"},{"face_id":"c80","job":"陸上部"},{"face_id":"c81","job":"科学部"},{"face_id":"c82","job":"ガリ勉"},{"face_id":"c83","job":"放送部"},{"face_id":"c99","job":"不登校児"},{"face_id":"c86","job":"柔道部"},{"face_id":"c94","job":"PTA会長"},{"face_id":"c92","job":"テニス部"},{"face_id":"c90","job":"ラグビー部"},{"face_id":"c95","job":"人体模型"},{"face_id":"c97","job":"駐在さん"},{"face_id":"c100","job":"サッカー部"},{"face_id":"c106","job":"水泳部顧問"},{"face_id":"c89","job":"新任教師"},{"face_id":"c91","job":"緑のおばさん"},{"face_id":"c93","job":"書道部"},{"face_id":"c107","job":"前理事長"},{"face_id":"c85","job":"おてんば"},{"face_id":"c105","job":"弓道部"},{"face_id":"c96","job":"助教授"},{"face_id":"c98","job":"教授"},{"face_id":"c101","job":"園芸部"},{"face_id":"c104","job":"剣道部"},{"face_id":"c108","job":"無線部"},{"face_id":"c88","job":"栄養士"},{"face_id":"c84","job":"講師"},{"face_id":"c109","job":"占い研究会"},{"face_id":"c102","job":"前校長"},{"face_id":"c87","job":"天文部"},{"face_id":"c103","job":"オカルト同好会"}]}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"sf","admin":"黒体放射のエヴェレット解釈","maker":"重ね合せ猫のユニタリ変換","label":"明後日への道標"},"chr_npc":[{"label":"明後日への道標","csid":"SF","face_id":"sf04","say_0":"とたたたたんっ。\n\n<b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b>","say_1":"ちゅー！\n\n　ちゅー！\n\n<b>がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……</b>"},{"label":"明後日への道標（ナユタ）","csid":"SF_sf10","face_id":"sf10","say_0":"f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n<b>同日\n整備日誌\n　定期点検。ただちに健康に影響はないが、擦過痕…</b>","say_1":"よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n<b>ぷつん</b>\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"}],"chr_job":[{"face_id":"sf01","job":"通信士"},{"face_id":"sf02","job":"哲学者"},{"face_id":"sf03","job":"道案内"},{"face_id":"sf04","job":"お散歩隊長"},{"face_id":"sf05","job":"新製品"},{"face_id":"sf06","job":"士官"},{"face_id":"sf07","job":"遊泳員"},{"face_id":"sf08","job":"服飾商"},{"face_id":"sf09","job":"研修生"},{"face_id":"sf10","job":"保安技師"},{"face_id":"sf11","job":"艇長"},{"face_id":"sf12","job":"廃神"},{"face_id":"sf13","job":"消防隊長"},{"face_id":"sf14","job":"対面販売"},{"face_id":"sf15","job":"忍者隊"},{"face_id":"sf16","job":"保険調査"},{"face_id":"sf17","job":"幽閉児"},{"face_id":"sf18","job":"感性子"},{"face_id":"sf19","job":"理性子"},{"face_id":"sf20","job":"測量士"},{"face_id":"sf021","job":"星間帆走"},{"face_id":"sf022","job":"鉱滓地区"},{"face_id":"sf023","job":"地下軌道"},{"face_id":"sf024","job":"光彩楽団"},{"face_id":"sf025","job":"救星隊"},{"face_id":"sf026","job":"星先案内"},{"face_id":"sf027","job":"鉱滓皇帝"},{"face_id":"sf028","job":"溶接技師"},{"face_id":"sf029","job":"機巧忍軍"},{"face_id":"sf030","job":"閉鎖管理"},{"face_id":"sf031","job":"意匠造形"},{"face_id":"sf032","job":"鉱滓地区"},{"face_id":"sf033","job":"重層培養"},{"face_id":"sf034","job":"華美人"},{"face_id":"sf035","job":"銀河ギャル"},{"face_id":"sf036","job":"好奇診"},{"face_id":"sf037","job":"執行隊"},{"face_id":"sf038","job":"複眼レフ"}]}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"time","admin":"第四の壁の深奥","maker":"次元X式コンピューター","label":"エクスパンション・セット「帰還者議事」"},"chr_npc":[{"label":"エクスパンション・セット「帰還者議事」","csid":"time","face_id":"c10","say_0":"M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","say_1":"やっぱさ、銃を持った善人がいないとさ。<br><br>ちょっと出かけてくる！プリン食べちゃダメだよ！"}],"chr_job":[{"face_id":"c10","job":"小銃協会"},{"face_id":"t01","job":"友愛組合"},{"face_id":"t02","job":"幸運の科学"},{"face_id":"t03","job":"FSM団"},{"face_id":"t04","job":"截拳道"},{"face_id":"t05","job":"開放的市民"},{"face_id":"c09","job":"暗殺教団"},{"face_id":"t06","job":"死ね死ね団"},{"face_id":"t07","job":"勧善懲悪委"},{"face_id":"t08","job":"覆面嫉妬団"},{"face_id":"t09","job":"匿名軍団"},{"face_id":"t10","job":"営利政府"},{"face_id":"t11","job":"鷹の爪団"},{"face_id":"t12","job":"地下鉄道"},{"face_id":"t13","job":"MNU機関"},{"face_id":"t14","job":"猫の集会"},{"face_id":"t15","job":"少年探偵団"},{"face_id":"t16","job":"安全保障局"},{"face_id":"t17","job":"薔薇∴十字"},{"face_id":"t18","job":"白銀∴秘星"},{"face_id":"t19","job":"聖戦士募集"},{"face_id":"t20","job":"MI:18"},{"face_id":"t21","job":"九未知会"},{"face_id":"t22","job":"学園特警"},{"face_id":"t23","job":"孤高天使連合"},{"face_id":"t24","job":"トレーサー"},{"face_id":"t25","job":"2.14革命機構"},{"face_id":"t26","job":"法隆寺"},{"face_id":"t27","job":"硯友社"},{"face_id":"t28","job":"樫の樹の子ら"},{"face_id":"t29","job":"透明女子会"},{"face_id":"t30","job":"旅団✡肘笠雨"},{"face_id":"t31","job":"呵呵老会"},{"face_id":"t32","job":"安全調査局"},{"face_id":"t33","job":"亡命同盟"},{"face_id":"t34","job":"大銃協会"},{"face_id":"t35","job":"紅客連盟"},{"face_id":"t36","job":"PPP"},{"face_id":"t37","job":"素顔連盟"},{"face_id":"t38","job":"北後家蜘蛛会"},{"face_id":"t39","job":"黄金∴黎明"}]}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"wa","admin":"闇の呟き","maker":"稲荷のお告げ","label":"和の国てやんでえ"},"chr_npc":[{"label":"和の国てやんでえ","csid":"wa","face_id":"w17","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"和の国てやんでえ（仁右衛門）","csid":"wa_w23","face_id":"w23","say_0":"なんと、これは奇っ怪……分かったゾ！","say_1":"やっぱり人狼は実在するんだヨ！　うっひょひょーい！"}],"chr_job":[{"face_id":"w01","job":"役者"},{"face_id":"w02","job":"浪人"},{"face_id":"w03","job":"忍者"},{"face_id":"w04","job":"町娘"},{"face_id":"w05","job":"飴師"},{"face_id":"w06","job":"巫女"},{"face_id":"w07","job":"双子"},{"face_id":"w08","job":"双子"},{"face_id":"w09","job":"宣教師"},{"face_id":"w10","job":"刺客"},{"face_id":"w11","job":"釣り師"},{"face_id":"w12","job":"女中"},{"face_id":"w13","job":"団子屋"},{"face_id":"w14","job":"手妻師"},{"face_id":"w15","job":"山姥"},{"face_id":"w16","job":"髪結い"},{"face_id":"w17","job":"病人"},{"face_id":"w18","job":"後妻"},{"face_id":"w20","job":"呉服問屋"},{"face_id":"w21","job":"うどん職人"},{"face_id":"w22","job":"そば職人"},{"face_id":"w23","job":"弁士"},{"face_id":"w24","job":"喧嘩屋"},{"face_id":"w25","job":"説法師"},{"face_id":"w26","job":"餓鬼大将"},{"face_id":"w27","job":"発明家"},{"face_id":"w28","job":"飛脚"},{"face_id":"w29","job":"琴弾き"},{"face_id":"w30","job":"宗主"},{"face_id":"w31","job":"子守り"},{"face_id":"w32","job":"落胤"},{"face_id":"w33","job":"船大工"},{"face_id":"w34","job":"野伏り"},{"face_id":"w35","job":"神主"},{"face_id":"w36","job":"楽士"},{"face_id":"w37","job":"薬売り"},{"face_id":"w38","job":"門下生"},{"face_id":"w39","job":"武家の娘"},{"face_id":"w40","job":"懐刀"},{"face_id":"w41","job":"物乞い"},{"face_id":"w43","job":"丁稚"},{"face_id":"w44","job":"機織り"},{"face_id":"w45","job":"座敷守"},{"face_id":"w46","job":"屍漁り"},{"face_id":"w47","job":"肥代取り"},{"face_id":"w48","job":"和算家"},{"_id":"w49","face_id":"w49","job":"抜荷"},{"face_id":"w50","job":"半の目"},{"face_id":"w51","job":"真剣師"},{"face_id":"w52","job":"看板娘"},{"face_id":"w53","job":"旅籠"}]}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var API, YAML, _, passport, plugins;

_ = __webpack_require__(0);

passport = __webpack_require__(46);

plugins = {
  facebook: __webpack_require__(47),
  twitter: __webpack_require__(48),
  slack: __webpack_require__(49),
  github: __webpack_require__(50),
  google: __webpack_require__(51)
};

({YAML, API} = __webpack_require__(5));

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
/* 46 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("passport-twitter");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("passport-slack");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("passport-github2");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth2");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectId, _, fs, giji, mongo, sh;

mongo = __webpack_require__(53);

sh = __webpack_require__(4);

fs = __webpack_require__(6);

_ = __webpack_require__(0);

ObjectId = false;

giji = {};

module.exports = function(app, {url, db}) {
  if (!db.mongo_sow) {
    return;
  }
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
/* 53 */
/***/ (function(module, exports) {

module.exports = require("mongodb-bluebird");

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var _, app, bless, conf, express, http, mongoose, supertest, test, user;

test = __webpack_require__(71);

express = __webpack_require__(12);

mongoose = __webpack_require__(11);

supertest = __webpack_require__(72);

conf = {
  session_key: "SECRET_SESSION_SECRET",
  game: {
    folder_id: "test"
  },
  db: {
    mongo: "mongodb://localhost/giji",
    mongo_sow: "mongodb://localhost/giji"
  },
  url: {},
  auth: {}
};

user = {
  _id: "local-test-user",
  provider: "local-test",
  icon: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg",
  mail: "7korobi.sys@gmail.com",
  nick: "テスト中",
  sign: "SIGN.SPEC",
  write_at: new Date - 0,
  token: "DEADBEEF",
  account: "user"
};

_ = __webpack_require__(0);

bless = function(t) {
  return t.deepContain = function(tgt, chk) {
    chk = _.mergeWith(chk, tgt, function(c, o) {
      switch (c != null ? c.constructor : void 0) {
        case null:
        case void 0:
          return o;
        case Array:
        case Object:
          return void 0;
        default:
          return c;
      }
    });
    return this.deepEqual(tgt, chk);
  };
};

app = express();

__webpack_require__(13)(app, conf);

__webpack_require__(15)(app, conf);

__webpack_require__(52)(app, conf);

__webpack_require__(18)(app, conf);

app.post('/test/session', function(req, res, next) {
  var base, base1;
  if ((base = req.session).passport == null) {
    base.passport = {};
  }
  if ((base1 = req.session.passport).user == null) {
    base1.user = user;
  }
  return res.json(req.session.passport);
});

http = supertest.agent(app);

__webpack_require__(73)(app, {test, bless, http});

__webpack_require__(74)(app, {test, bless, http});


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("ava");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("supertest");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var user;

user = {
  sign: "公開サイン"
};

module.exports = function(app, {test, http, bless}) {
  test.serial('post api/user fail.', async function(t) {
    var text;
    await http.post("/logout");
    ({text} = (await http.post("/api/user").send({
      user: {
        sign: "公開サイン"
      }
    })));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      message: "ログインしていません。"
    });
  });
  return test.serial('post api/user', async function(t) {
    var text;
    await http.post("/test/session");
    ({text} = (await http.post("/api/user").send({user})));
    bless(t);
    return t.deepContain(JSON.parse(text), {user});
  });
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

var check;

check = function() {
  return {
    book: {
      label: "testcase",
      chat: {
        interval: 1,
        night: 0,
        player: 4,
        mob: 0
      },
      game: {
        vote: "sign",
        vote_by: ["live"]
      },
      tags: ["god", "travel"],
      option: ["vote_by_live"]
    },
    potof: {
      _id: "test-1-NPC",
      face_id: "t29",
      job: "透明女子会",
      chr_job_id: "ririnra",
      passport_id: 'local-test-user'
    },
    chats: [
      {
        idx: "welcome"
      },
      {
        idx: "vrule",
        log: "1. 多重ログインをしない。\n2. システムの出力内容を、そのまま書き写さない。\n3. エピローグまで秘密を守る。参加中の村の内容は秘密だ。\n4. エピローグまで秘密を守る。希望した能力、画面を見ているきみが何者なのかは秘密だ。"
      }
    ],
    part: {
      _id: "test-1-1",
      idx: "1",
      label: "一日目"
    }
  };
};

module.exports = function(app, {test, http, bless}) {
  test.serial('post api/books', async function(t) {
    var book, text;
    await http.post("/test/session");
    ({book} = check());
    ({text} = (await http.post("/api/books").type('json').send({book})));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      book: check().book,
      parts: [
        {
          idx: "0",
          label: "プロローグ"
        }
      ],
      potofs: [
        {
          idx: "NPC",
          passport_id: "local-test-user"
        }
      ],
      phases: [
        {
          idx: "村題",
          handle: "MAKER",
          update: true
        },
        {
          idx: "独題",
          handle: "private",
          update: false
        },
        {
          idx: "独言",
          handle: "TSAY",
          update: false
        }
      ],
      chats: [
        {
          idx: "welcome"
        },
        {
          idx: "nrule"
        },
        {
          idx: "vrule"
        }
      ]
    });
  });
  test('post api/books/:book_id', async function(t) {
    var book, potof, text;
    ({book, potof} = check());
    ({text} = (await http.post("/api/books/test-1").type('json').send({book, potof})));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      book: check().book,
      potofs: check().potof,
      phases: [
        {
          _id: "test-1-0-発題",
          idx: "発題"
        },
        {
          _id: "test-1-0-発言",
          idx: "発言"
        },
        {
          _id: "test-1-0-見言",
          idx: "見言"
        },
        {
          _id: "test-1-0-内言",
          idx: "内言"
        }
      ],
      chats: [
        {
          _id: "test-1-0-発言-0",
          idx: "0"
        },
        {
          _id: "test-1-1-発言-0",
          idx: "0"
        }
      ]
    });
  });
  test('post api/books/:book_id/part', async function(t) {
    var part, text;
    ({part} = check());
    ({text} = (await http.post("/api/books/test-1/part").type('json').send({part})));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      part: check().part
    });
  });
  test('get api/books', async function(t) {
    var book, i, len, ref, results, text;
    ({text} = (await http.get("/api/books")));
    bless(t);
    ref = JSON.parse(text).books;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      book = ref[i];
      results.push(t.deepContain(book, check().book));
    }
    return results;
  });
  test('get api/books/:book_id', async function(t) {
    var text;
    ({text} = (await http.get("/api/books/test-1")));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      book: check().book,
      potofs: [],
      stats: [],
      cards: [],
      parts: [],
      phases: []
    });
  });
  return test('get api/books/:book_id/chats', async function(t) {
    var text;
    ({text} = (await http.get("/api/books/test-1/chats")));
    bless(t);
    return t.deepContain(JSON.parse(text), {
      chats: []
    });
  });
};


/***/ })
/******/ ]);
//# sourceMappingURL=spec.js.map