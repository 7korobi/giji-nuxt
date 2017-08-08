webpackJsonp([19],{

/***/ 112:
/***/ (function(module, exports) {

module.exports = function (c) {
  return console.log(c);
};

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({ Model, Query, Rule, Set } = __webpack_require__(1));

new Rule("book").schema(function () {
  this.order("write_at");
  this.path("folder");
  this.has_many("parts");
  this.has_many("phases");
  this.has_many("sections");
  this.has_many("chats");
  this.has_many("potofs");
  this.belongs_to("winner");
  return this.scope(function (all) {
    return {};
  });
});

new Rule("winner").schema(function () {
  return this.scope(function (all) {});
});

new Rule("option").schema(function () {
  return this.scope(function (all) {});
});

new Rule("say").schema(function () {
  return this.scope(function (all) {});
});

new Rule("game").schema(function () {
  return this.scope(function (all) {});
});

Set.option.set(__webpack_require__(251));

Set.winner.set(__webpack_require__(255));

Set.say.set(__webpack_require__(253));

Set.game.set(__webpack_require__(257));

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({ Set, Model, Query, Rule } = __webpack_require__(1));

new Rule("card").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "part", "potof");
  this.belongs_to("role");
  Object.assign(this.model_property, {
    stat: {
      get: function () {
        return Query.stats.find(`${this.potof_id}-${this.idx}`);
      }
    }
  });
  return this.scope(function (all) {
    return {
      for_part: function (part_id) {
        return all.where({ part_id });
      },
      for_phase: function (phase_id) {
        return all.where({ phase_id });
      }
    };
  });
});

new Rule("stat").schema(function () {
  this.path("folder", "book", "part", "potof");
  this.belongs_to("able");
  Object.assign(this.model_property, {
    card: {
      get: function () {
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

new Rule("role").schema(function () {
  return this.habtm("ables");
});

new Rule("trap").schema(function () {
  this.order("write_at");
  this.belongs_to("book");
  return this.belongs_to("potof");
});

new Rule("able").schema(function () {
  return this.scope(function (all) {});
});

Set.role.set(__webpack_require__(252));

Set.trap.set(__webpack_require__(254));

Set.able.set(__webpack_require__(250));

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

var Model,
    Query,
    Rule,
    indexOf = [].indexOf;

({ Model, Query, Rule } = __webpack_require__(1));

new Rule("chat").schema(function () {
  var anker, blank, pages;
  this.path("folder", "book", "part", "phase");
  this.belongs_to("section");
  this.belongs_to("potof");
  blank = [];
  blank.all = 0;
  pages = function (group, q) {
    return function (hides, part_id) {
      return q.where(o => {
        var ref, ref1;
        return part_id === o.part_id && !(ref = o.potof_id, indexOf.call(hides, ref) >= 0) && (ref1 = o.phase.group, indexOf.call(group, ref1) >= 0);
      });
    };
  };
  this.scope(function (all) {
    return {
      memo: pages('M', all),
      title: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'MAKER' || ref === 'ADMIN' || ref === 'public';
      })),
      full: pages('SAI', all),
      normal: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'public' || ref === 'private';
      })),
      solo: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'TSAY' || ref === 'private';
      })),
      extra: pages('SAI', all.where(function (o) {
        var ref;
        return !((ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'dark' || ref === 'GSAY' || ref === 'TSAY' || ref === 'public');
      })),
      rest: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'GSAY';
      })),
      ankers: function (ids) {
        return all.where({
          _id: ids
        }).sort("write_at", "desc").list;
      },
      now: function (hides) {
        return {
          memo: function (part_id) {
            var ref;
            return (ref = all.memo(hides, part_id).reduce.last) != null ? ref : blank;
          },
          memos: function (part_id) {
            var ref;
            return (ref = all.memo(hides, part_id).reduce.list) != null ? ref : blank;
          },
          title: function (part_id) {
            var ref;
            return (ref = all.title(hides, part_id).reduce.list) != null ? ref : blank;
          },
          full: function (part_id) {
            var ref;
            return (ref = all.full(hides, part_id).reduce.list) != null ? ref : blank;
          },
          normal: function (part_id) {
            var ref;
            return (ref = all.normal(hides, part_id).reduce.list) != null ? ref : blank;
          },
          solo: function (part_id) {
            var ref;
            return (ref = all.solo(hides, part_id).reduce.list) != null ? ref : blank;
          },
          extra: function (part_id) {
            var ref;
            return (ref = all.extra(hides, part_id).reduce.list) != null ? ref : blank;
          },
          rest: function (part_id) {
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
      return this.log = this.log.replace(/<mw +(..)(\d+),(\d+),([^>]+)>/g, (str, phase_idx, $1, part_idx, code) => {
        var idx, mention_id;
        if (phase_idx === 'MM') {
          phase_idx = this.phase_id.slice(-2)[0] + 'M';
        }
        idx = Number($1);
        this.q.mention_ids.push(mention_id = [this.book_id, part_idx, phase_idx, idx].join("-"));
        return `<abbr chat_id=\"${mention_id}\">&gt;&gt;${code}</abbr>`;
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
        page_by: 50
      });
      emit("list", {
        sort: ["write_at"],
        page_by: 50
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

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set, chr_set_id, cs_key, face, face_id, i, job, key, len, list, o, order;

({ Set, Model, Query, Rule } = __webpack_require__(1));

order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school", "all"];

new Rule("tag").schema(function () {
  this.habtm("chr_sets");
  return this.scope(function (all) {
    return {
      enable: function () {
        return all.where(function (o) {
          return !o.disabled;
        });
      }
    };
  });
});

new Rule("face").schema(function () {
  var map;
  this.habtm("tags");
  this.has_many("chr_jobs");
  this.has_many("chr_npcs");
  this.scope(function (all) {
    return {
      aggregate: function (tag_id, order) {
        var asc;
        asc = function () {
          switch (order) {
            case "order":
            case "date_min":
              return "asc";
            default:
              return "desc";
          }
        }();
        return all.tag(tag_id).sort(order, asc);
      },
      tag: function (tag_id) {
        switch (tag_id) {
          case "all":
            return all;
          default:
            return all.in({
              tag_ids: tag_id
            });
        }
      },
      name_blank: function () {
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
      name_head: function (tag_id = "all") {
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
      get: function () {
        return this.aggregate.roles;
      }
    },
    lives: {
      get: function () {
        return this.aggregate.lives;
      }
    },
    sow_auths: {
      get: function () {
        return this.aggregate.sow_auths;
      }
    },
    mestypes: {
      get: function () {
        return this.aggregate.mestypes;
      }
    },
    folders: {
      get: function () {
        return this.aggregate.folders;
      }
    },
    story_length: {
      get: function () {
        return this.aggregate.log.story_ids.length;
      }
    },
    sow_auth_id: {
      get: function () {
        return this.aggregate.fav._id.sow_auth_id;
      }
    },
    fav_count: {
      get: function () {
        return this.aggregate.fav.count;
      }
    },
    date_max: {
      get: function () {
        return new Date(this.aggregate.log.date_max) - 0;
      }
    },
    date_min: {
      get: function () {
        return new Date(this.aggregate.log.date_min) - 0;
      }
    },
    date_range: {
      get: function () {
        return this.date_max - this.date_min;
      }
    }
  });
});

new Rule("chr_set").schema(function () {
  this.order("label");
  this.has_many("chr_jobs");
  return this.has_many("chr_npcs");
});

new Rule("chr_npc").schema(function () {
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

new Rule("chr_job").schema(function () {
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

Set.tag.set(__webpack_require__(239));

Set.face.set(__webpack_require__(238));

for (i = 0, len = order.length; i < len; i++) {
  key = order[i];
  o = __webpack_require__(351)(`./cs_${key}.yml`);
  Set.chr_set.merge([o.chr_set]);
  ({ chr_set_id } = o.chr_set);
  cs_key = { chr_set_id };
  Set.chr_npc.merge(o.chr_npc, cs_key);
  Set.chr_job.merge(o.chr_job, cs_key);
}

list = function () {
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
    results.push({ chr_set_id, face_id, job });
  }
  return results;
}();

Set.chr_job.merge(list);

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var Mem, Vue;

Vue = __webpack_require__(5);

if (typeof window !== "undefined" && window !== null) {
  Vue = Vue.default;
}

Mem = __webpack_require__(1);

Mem.vm = new Vue({
  data: {
    read_at: Mem.read_at = {}
  }
});

Mem.read_at_gate = function (name, cb) {
  if (Date.now() - 10 * 60 * 1000 < Mem.read_at[name]) {
    return;
  }
  return cb().then(function () {
    return Vue.set(Mem.read_at, name, Date.now());
  });
};

__webpack_require__(116);

__webpack_require__(120);

__webpack_require__(114);

__webpack_require__(113);

__webpack_require__(118);

__webpack_require__(119);

__webpack_require__(121);

__webpack_require__(115);

__webpack_require__(122);

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule;

({ Model, Query, Rule } = __webpack_require__(1));

new Rule("part").schema(function () {
  this.order("chats.list.first.write_at");
  this.path("folder", "book");
  this.has_many("sections");
  this.has_many("phases");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  return this.scope(function (all) {
    return {};
  });
});

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, attrs;

({ Model, Query, Rule } = __webpack_require__(1));

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

new Rule("phase").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function (all) {
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

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set;

({ Set, Model, Query, Rule } = __webpack_require__(1));

new Rule("potof").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.belongs_to("face");
  this.belongs_to("winner");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  this.habtm("roles");
  this.habtm("ables");
  this.scope(function (all) {
    return {
      catalog: function (book_id, part_id, sort, order) {
        switch (sort) {
          case "say.count":
            sort = o => {
              return o.say(part_id).count;
            };
            break;
          case "say.all":
            sort = o => {
              return o.say(part_id).all;
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

    find(q, keys, cb = function (o) {
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
        ({ job, name } = this.face);
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
          ({ _id } = ref1[j]);
          able_id_set[_id] = true;
        }
      }
      this.role_ids = Object.keys(role_id_set);
      this.able_ids = Object.keys(able_id_set);
      this.role_labels = this.roles.list.map(o => {
        var head, ref2, stat;
        stat = this.stats.find(`${this._id}-${o._id}`);
        head = (ref2 = stat != null ? stat.label : void 0) != null ? ref2 : "";
        return `${head}${o.label}`;
      });
      this.live = (ref2 = this.cards.find(`${this._id}-live`)) != null ? ref2 : this.request = this.cards.find(`${this._id}-request`);
      this.commit = this.stats.find(`${this._id}-commit`);
      this.give = this.stats.find(`${this._id}-give`);
      this.winner_id = this.find(this.cards, ["bond", "gift", "role", "live"], o => {
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

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, format;

({ Model, Query, Rule } = __webpack_require__(1));

format = {
  head: new Intl.DateTimeFormat('ja-JP', {
    weekday: "short",
    hour: "2-digit"
  }),
  tail: new Intl.DateTimeFormat('ja-JP', {
    hour: "2-digit"
  })
};

new Rule("section").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function (all) {
    return {};
  });
  Object.assign(this.model_property, {
    label: {
      get: function () {
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

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set, monthry, welcome, yeary;

({ Set, Model, Query, Rule } = Mem = __webpack_require__(1));

monthry = new Intl.DateTimeFormat('ja-JP', {
  year: "numeric",
  month: "2-digit"
});

yeary = new Intl.DateTimeFormat('ja-JP', {
  year: "numeric"
});

new Rule("sow_roletable").schema(function () {});

new Rule("sow_turn").schema(function () {
  this.order("turn", "asc");
  return this.belongs_to("village", {
    target: "sow_villages",
    key: "story_id"
  });
});

new Rule("sow_village").schema(function () {
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
  this.scope(function (all) {
    return {
      prologue: all.where({
        mode: "prologue"
      }).sort("timer.nextcommitdt", "desc"),
      progress: all.where({
        mode: "progress"
      }).sort("timer.nextcommitdt", "desc"),
      mode: function (mode) {
        return all.where({ mode });
      },
      search: function (mode, query_in, query_where, order, asc) {
        return all.where({ mode }).in(query_in).where(query_where).sort(order, asc);
      }
    };
  });
  Object.assign(this.model_property, {
    roles: {
      get: function () {
        var ref;
        return (ref = this.query.reduce) != null ? ref : [];
      }
    },
    event_length: {
      get: function () {
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
      ({ interval, hour, minute } = this.upd);
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      updated_at = new Date(this.timer.updateddt);
      this.query = Query.sow_villages.where({ id: this.id });
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
        this.href = `${env.STORE_URL}/stories/${this._id}`;
        return this.mode = "oldlog";
      } else {
        if (this.turns.list.first) {
          return this.mode = "progress";
        } else {
          return this.mode = "prologue";
        }
      }
    }

    static order(o, emit) {
      emit("yeary", { sort });
      emit("monthry", { sort });
      emit("folder_id", { sort });
      emit("upd_range", { sort });
      emit("upd_at", { sort });
      emit("sow_auth_id", { sort });
      emit("rating", { sort });
      emit("size", { sort });
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

new Rule("folder").schema(function () {
  this.scope(function (all) {
    return {
      enable: all.where(function (o) {
        return !o.disabled;
      }),
      host: function (hostname) {
        return all.where({ hostname });
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

Set.folder.set(__webpack_require__(256));

Set.sow_roletable.set(__webpack_require__(258));

welcome = function (h) {
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

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var Finder, Mem, Model, Query, Rule, _, axios, titles;

({ Model, Query, Rule, Finder } = Mem = __webpack_require__(1));

axios = __webpack_require__(19);

_ = __webpack_require__(4);

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
  state: function () {
    return {};
  },
  mutations: {
    faces: function (state, { data }) {
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
    face: function (state, { id, data }) {
      var face, folders, handle, key, keys, list, loghd, mestypes, o, per, sum, title;
      face = Query.faces.find(id);
      face.aggregate.log = data.faces[0];
      face.aggregate.log.date_min = data.m_faces[0].date_min;
      face.aggregate.sow_auths = _.sortBy(data.sow_auths, function (o) {
        return -o.story_ids.length;
      });
      face.aggregate.lives = _.sortBy(data.lives, function (o) {
        return -o.story_ids.length;
      });
      sum = 0;
      face.aggregate.lives = function () {
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
      }();
      face.aggregate.lives.sum = sum;
      face.aggregate.roles = _.sortBy(data.roles, function (o) {
        return -o.story_ids.length;
      });
      sum = 0;
      face.aggregate.roles = function () {
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
      }();
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
      face.aggregate.mestypes = function () {
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
          results.push(_.merge({ handle, title, per }, o));
        }
        return results;
      }();
      face.aggregate.mestypes.push(sum);
      keys = face.aggregate.log.story_ids.map(function (key) {
        return key.split("-");
      });
      folders = _.groupBy(keys, function (o) {
        return o[0];
      });
      for (key in folders) {
        list = folders[key];
        folders[key] = _.sortBy(list, function (o) {
          return o[1] - 0;
        });
        folders[key].nation = Query.folders.find(key.toUpperCase()).nation;
      }
      face.aggregate.folders = _.sortBy(folders, function (list, key) {
        return -list.length;
      });
      return Mem.Finder.face.clear_cache();
    }
  },
  actions: {
    faces: function ({ dispatch, state, commit, rootState }) {
      return Mem.read_at_gate("aggregate_faces", function () {
        return axios.get(`${env.API_URL}/aggregate/faces`).then(function ({ status, data }) {
          return commit("faces", { data });
        }).catch(function (err) {
          return console.log(err);
        });
      });
    },
    face: function ({ state, commit, rootState }, id) {
      return Mem.read_at_gate(`aggregate_face.${id}`, function () {
        return axios.get(`${env.API_URL}/aggregate/faces/${id}`).then(function ({ status, data }) {
          return commit("face", { data, id });
        }).catch(function (err) {
          return console.log(err);
        });
      });
    }
  }
};

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

var Model, Query, Rule, Set, axios;

({ Set, Model, Query, Rule } = __webpack_require__(1));

axios = __webpack_require__(19);

module.exports = {
  namespaced: true,
  state: function () {
    return {
      folder_id: "",
      book_id: "",
      part_id: "",
      section_id: "",
      phase_id: "",
      chat_id: ""
    };
  },
  mutations: {
    data: function (state, o) {
      Set.book.merge(o.books);
      Set.part.merge(o.parts);
      Set.section.merge(o.sections);
      Set.phase.merge(o.phases);
      Set.stat.merge(o.stats);
      Set.card.merge(o.cards);
      Set.potof.merge(o.potofs);
      return Set.chat.merge(o.chats);
    },
    folder: function (state, folder_id) {
      return state.folder_id = folder_id;
    },
    book: function (state, book_id) {
      state.phase_id = `${book_id}-0-0`;
      return state.book_id = book_id;
    },
    part: function (state, part_id) {
      var book, part, section_id;
      part = Query.parts.find(part_id);
      book = Query.books.find(part.book.id);
      state.part_id = part_id;
      state.book_id = part.book.id;
      return state.section_id = section_id = part_id === book.parts.list.last.id ? book.sections.list.last.id : book.sections.list.first.id;
    },
    section: function (state, section_id) {
      var section;
      section = Query.sections.find(section_id);
      return state.section_id = section_id;
    },
    see: function (state, chat_id) {
      var chat;
      if (!chat_id) {
        return;
      }
      state.chat_id = chat_id;
      if (!(chat = Query.chats.find(chat_id))) {
        return;
      }
      state.folder_id = chat.folder_id;
      state.book_id = chat.book_id;
      state.part_id = chat.part_id;
      state.phase_id = chat.phase_id;
      return state.section_id = chat.section_id;
    }
  },
  actions: {
    books: function ({ commit }, folder) {
      if (Date.now() - 10 * 60 * 1000 < state.read_at) {
        return;
      }
      return axios.get("/api/books", { folder }).then(function ({ status, data }) {
        commit("data", data);
        return commit("folder", folder);
      });
    },
    book: function ({ commit }, id) {
      if (Date.now() - 10 * 60 * 1000 < state.read_at) {
        return;
      }
      return axios.get(`/api/books/${id}`).then(function ({ status, data }) {
        console.log(`HTTP :: /api/books/${id}`);
        commit("data", data);
        return commit("book", id);
      });
    },
    part: function ({ commit }, id) {
      if (Date.now() - 10 * 60 * 1000 < state.read_at) {
        return;
      }
      return axios.get(`/api/parts/${id}`).then(function ({ status, data }) {
        console.log(`HTTP :: /api/parts/${id}`);
        commit("data", data);
        return commit("part", id);
      });
    },
    section: function ({ commit }, id) {
      if (Date.now() - 10 * 60 * 1000 < state.read_at) {
        return;
      }
      return axios.get(`/api/sections/${id}`).then(function ({ status, data }) {
        console.log(`HTTP :: /api/sections/${id}`);
        commit("data", data);
        return commit("section", id);
      });
    }
  }
};

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Mem, axios;

__webpack_require__(117);

axios = __webpack_require__(19);

Mem = __webpack_require__(1);

module.exports = {
  default: {
    state: function () {
      var read_at;
      read_at = Mem.read_at;
      return {
        user: null,
        profile: {},
        env: {}
      };
    },
    actions: {
      nuxtServerInit: function ({ commit }, { req, env }) {
        var id, ref, ref1;
        global.env = env;
        commit("public_env", env);
        if (id = (ref = req.session) != null ? (ref1 = ref.passport) != null ? ref1.user : void 0 : void 0) {
          commit("login", id);
          return axios.get(`${env.API_URL}/user/${id}`).then(function ({ status, data }) {
            console.log(`HTTP :: /api/books/${id}`);
            return commit("profile", data);
          });
        }
      }
    },
    mutations: {
      public_env: function (state, public_env) {
        return state.env = public_env;
      },
      login: function (state, id) {
        return state.user = id;
      },
      profile: function (state, data) {
        return state.profile = data;
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set;

({ Model, Set, Query, Rule } = Mem = __webpack_require__(1));

if (typeof window !== "undefined" && window !== null) {
  window.Mem = Mem;
}

new Rule("menu").schema(function () {
  return this.model = class model extends this.model {
    static deploy() {
      return this._id != null ? this._id : this._id = this.name;
    }

  };
});

module.exports = {
  namespaced: true,
  state: function () {
    return {
      top: 0,
      center: 0,
      bottom: 0,
      left: 0,
      right: 0,
      horizon: 0,
      height: 0,
      width: 0,
      set: {
        pin: false,
        toc: false,
        potof: false,
        current: false
      },
      target: null
    };
  },
  mutations: {
    target: function (state, name) {
      if (state.target === name) {
        return state.target = null;
      } else {
        return state.target = name;
      }
    },
    pulse: function (state, ext) {
      var i, len, o, ref, results;
      ref = state.list;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        o = ref[i];
        if (o.name === "spinner") {
          results.push(o.ext = ext);
        }
      }
      return results;
    },
    mode: function (state, list) {
      var i, id, len, results;
      for (id in state.set) {
        state.set[id] = false;
      }
      results = [];
      for (i = 0, len = list.length; i < len; i++) {
        id = list[i];
        results.push(state.set[id] = true);
      }
      return results;
    },
    center: function (state, { top, left, height, width }) {
      state.height = height;
      state.horizon = height / 2;
      state.width = width;
      state.top = top;
      state.center = top + height / 2;
      state.bottom = top + height;
      state.left = left;
      return state.right = left + width;
    }
  }
};

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set, _, axios;

({ Model, Query, Rule, Set } = Mem = __webpack_require__(1));

axios = __webpack_require__(19);

_ = __webpack_require__(4);

module.exports = {
  namespaced: true,
  state: function () {
    return {};
  },
  mutations: {
    join: function (state, data) {
      var book_id, chat, csid, date, i, idx, job, len, o, phases, potof_id, ref, ref1, write_at;
      book_id = data.stories[0]._id;
      ref = data.potofs;
      for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
        o = ref[idx];
        csid = o.csid;
        if (csid === 'SF') {
          csid = 'sf';
        }
        potof_id = `${o.event_id}-${idx}`;
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
        Set.stat.merge([{
          _id: `${potof_id}-give`,
          give: o.point.actaddpt
        }]);
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
        }
      };
      write_at = 0;
      chat = null;
      _.sortBy(data.messages, function (o) {
        return o.write_at = new Date(o.date);
      }).map(function (o) {
        var _id, chat_at, deco, face_id, guide, handle, log, phase_group, phase_id, phase_idx, phase_type, ref2, ref3, show, to;
        ({ face_id, to, log, write_at, csid } = o);
        if (csid === 'SF') {
          csid = 'sf';
        }
        if (face_id === "maker" || face_id === "admin" || face_id === "c06") {
          face_id = void 0;
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
          }).list.first) != null ? ref2.id : void 0;
          if (!potof_id) {
            Set.card.add({
              _id: [o.event_id, o.face_id, "live"].join("-"),
              role_id: "leave",
              date: 0
            });
            Set.stat.add({
              _id: [o.event_id, o.face_id, "SSAY"].join("-"),
              said: 0
            });
            Set.potof.add({
              _id: [o.event_id, o.face_id].join("-"),
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
            show = "report";
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
            show = "report";
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
        deco = o.style;
        if (phases[phase_id] == null) {
          phases[phase_id] = {
            handle: handle,
            guide: guide,
            type: phase_type,
            group: phase_group,
            update: false
          };
        }
        Set.chat.add({ _id, potof_id, phase_id, write_at, to, show, deco, log, handle });
        chat_at = write_at;
        return chat = o;
      });
      Set.phase.merge(phases);
      Set.part.merge(data.events.map(function (o) {
        var ref2;
        return {
          _id: o._id,
          label: (ref2 = o.name) != null ? ref2 : `${o.turn}日目`
        };
      }));
      o = data.stories[0];
      return Set.book.add({
        _id: o._id,
        label: o.name,
        winner_id: data.events.slice(-1)[0].winner.slice(4),
        potof_size: Query.potofs.where({ book_id }).list.length,
        write_at: chat.write_at
      });
    }
  },
  actions: {
    story: function ({ state, commit, rootState }, story_id) {
      return Mem.read_at_gate(`sow_story.${story_id}`, function () {
        return axios.get(`${env.SOW_URL}/${story_id}.json.gz`).then(function ({ status, data }) {
          return commit("join", data);
        });
      });
    }
  }
};

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

var Mem, Model, Query, Rule, Set, _, axios;

({ Model, Query, Rule, Set } = Mem = __webpack_require__(1));

axios = __webpack_require__(19);

_ = __webpack_require__(4);

module.exports = {
  namespaced: true,
  state: function () {
    return {};
  },
  mutations: {
    progress: function (state, data) {
      Set.sow_turn.merge(data.events);
      return Set.sow_village.merge(data.stories);
    },
    oldlog: function (state, data) {
      return Set.sow_village.merge(data.stories);
    }
  },
  actions: {
    progress: function ({ state, commit, rootState }) {
      return Mem.read_at_gate("story_progress", function () {
        return axios.get(`${env.API_URL}/story/progress`).then(function ({ status, data }) {
          return commit("progress", data);
        });
      });
    },
    oldlog: function ({ state, commit, rootState }) {
      return Mem.read_at_gate("story_oldlog", function () {
        return axios.get(`${env.SOW_URL}/index.json.gz`).then(function ({ status, data }) {
          return commit("oldlog", data);
        });
      });
    }
  }
};

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = __webpack_require__(55);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(53);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var render = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(to, from, next) {
    var _this3 = this;

    var layout, nextCalled, _next, context, Components, isValid, _layout;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this._hashChanged) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', next());

          case 2:
            layout = void 0;
            nextCalled = false;

            _next = function _next(path) {
              this.$loading.finish && this.$loading.finish();
              if (nextCalled) return;
              nextCalled = true;
              next(path);
            };

            context = (0, _utils.getContext)({ to: to, store: store, isClient: true, next: _next.bind(this), error: this.error.bind(this) }, app);
            Components = (0, _utils.getMatchedComponents)(to);

            this._context = context;
            this._dateLastError = this.$options._nuxt.dateErr;
            this._hadError = !!this.$options._nuxt.err;

            if (Components.length) {
              _context.next = 24;
              break;
            }

            _context.next = 13;
            return callMiddleware.call(this, Components, context);

          case 13:
            if (!context._redirected) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return');

          case 15:
            _context.next = 17;
            return this.loadLayout(typeof _index.NuxtError.layout === 'function' ? _index.NuxtError.layout(context) : _index.NuxtError.layout);

          case 17:
            layout = _context.sent;
            _context.next = 20;
            return callMiddleware.call(this, Components, context, layout);

          case 20:
            if (!context._redirected) {
              _context.next = 22;
              break;
            }

            return _context.abrupt('return');

          case 22:
            this.error({ statusCode: 404, message: 'This page could not be found.' });
            return _context.abrupt('return', next());

          case 24:
            // Update ._data and other properties if hot reloaded
            Components.forEach(function (Component) {
              if (Component._Ctor && Component._Ctor.options) {
                Component.options.asyncData = Component._Ctor.options.asyncData;
                Component.options.fetch = Component._Ctor.options.fetch;
              }
            });
            this.setTransitions(mapTransitions(Components, to, from));
            _context.prev = 26;
            _context.next = 29;
            return callMiddleware.call(this, Components, context);

          case 29:
            if (!context._redirected) {
              _context.next = 31;
              break;
            }

            return _context.abrupt('return');

          case 31:
            layout = Components[0].options.layout;
            if (typeof layout === 'function') {
              layout = layout(context);
            }
            _context.next = 35;
            return this.loadLayout(layout);

          case 35:
            layout = _context.sent;
            _context.next = 38;
            return callMiddleware.call(this, Components, context, layout);

          case 38:
            if (!context._redirected) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('return');

          case 40:
            // Pass validation?
            isValid = true;

            Components.forEach(function (Component) {
              if (!isValid) return;
              if (typeof Component.options.validate !== 'function') return;
              isValid = Component.options.validate({
                params: to.params || {},
                query: to.query || {}, store: context.store
              });
            });

            if (isValid) {
              _context.next = 45;
              break;
            }

            this.error({ statusCode: 404, message: 'This page could not be found.' });
            return _context.abrupt('return', next());

          case 45:
            _context.next = 47;
            return _promise2.default.all(Components.map(function (Component, i) {
              // Check if only children route changed
              Component._path = (0, _utils.compile)(to.matched[i].path)(to.params);
              if (!_this3._hadError && Component._path === _lastPaths[i] && i + 1 !== Components.length) {
                return _promise2.default.resolve();
              }
              var promises = [];
              // asyncData method
              if (Component.options.asyncData && typeof Component.options.asyncData === 'function') {
                var promise = (0, _utils.promisify)(Component.options.asyncData, context);
                promise.then(function (asyncDataResult) {
                  (0, _utils.applyAsyncData)(Component, asyncDataResult);
                  _this3.$loading.increase && _this3.$loading.increase(30);
                });
                promises.push(promise);
              }
              if (Component.options.fetch) {
                var p = Component.options.fetch(context);
                if (!p || !(p instanceof _promise2.default) && typeof p.then !== 'function') {
                  p = _promise2.default.resolve(p);
                }
                p.then(function () {
                  return _this3.$loading.increase && _this3.$loading.increase(30);
                });
                promises.push(p);
              }
              return _promise2.default.all(promises);
            }));

          case 47:
            _lastPaths = Components.map(function (Component, i) {
              return (0, _utils.compile)(to.matched[i].path)(to.params);
            });
            this.$loading.finish && this.$loading.finish();
            // If not redirected
            if (!nextCalled) {
              next();
            }
            _context.next = 59;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context['catch'](26);

            _lastPaths = [];
            _context.t0.statusCode = _context.t0.statusCode || _context.t0.status || _context.t0.response && _context.t0.response.status || 500;
            _layout = _index.NuxtError.layout;

            if (typeof _layout === 'function') {
              _layout = _layout(context);
            }
            this.loadLayout(_layout).then(function () {
              _this3.error(_context.t0);
              next(false);
            });

          case 59:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[26, 52]]);
  }));

  return function render(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Fix components format in matched, it's due to code-splitting of vue-router


var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _middleware = __webpack_require__(90);

var _middleware2 = _interopRequireDefault(_middleware);

var _index = __webpack_require__(89);

var _utils = __webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noopData = function noopData() {
  return {};
};
var noopFetch = function noopFetch() {};
var _lastPaths = [];
var _lastComponentsFiles = [];

var app = void 0;
var router = void 0;
var store = void 0;

function mapTransitions(Components, to, from) {
  return Components.map(function (Component) {
    var transition = Component.options.transition;
    if (typeof transition === 'function') {
      return transition(to, from);
    }
    return transition;
  });
}

function loadAsyncComponents(to, from, next) {
  var _this = this;

  var resolveComponents = (0, _utils.flatMapComponents)(to, function (Component, _, match, key) {
    if (typeof Component === 'function' && !Component.options) {
      return new _promise2.default(function (resolve, reject) {
        var _resolve = function _resolve(Component) {
          Component = (0, _utils.sanitizeComponent)(Component);
          match.components[key] = Component;
          resolve(Component);
        };
        Component().then(_resolve).catch(reject);
      });
    }
    Component = (0, _utils.sanitizeComponent)(Component);
    match.components[key] = Component;
    return match.components[key];
  });
  var fromPath = from.fullPath.split('#')[0];
  var toPath = to.fullPath.split('#')[0];
  this._hashChanged = fromPath === toPath;
  if (!this._hashChanged) {
    this.$loading.start && this.$loading.start();
  }
  _promise2.default.all(resolveComponents).then(function () {
    return next();
  }).catch(function (err) {
    var statusCode = err.statusCode || err.status || err.response && err.response.status || 500;
    _this.error({ statusCode: statusCode, message: err.message });
    next(false);
  });
}

function callMiddleware(Components, context, layout) {
  var _this2 = this;

  // if layout is undefined, only call global middleware
  var midd = [];
  var unknownMiddleware = false;
  if (typeof layout !== 'undefined') {
    midd = []; // exclude global middleware if layout defined (already called before)
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
      _this2.error({ statusCode: 500, message: 'Unknown middleware ' + name });
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
// will not update the instance data, so we have to update $data ourselves
function fixPrepatch(to, ___) {
  var _this4 = this;

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
    // hide error component if no error
    if (_this4._hadError && _this4._dateLastError === _this4.$options._nuxt.dateErr) {
      _this4.error();
    }
    // Set layout
    var layout = _this4.$options._nuxt.err ? _index.NuxtError.layout : to.matched[0].components.default.options.layout;
    if (typeof layout === 'function') {
      layout = layout(_this4._context);
    }
    _this4.setLayout(layout);
    // hot reloading
    setTimeout(function () {
      return hotReloadAPI(_this4);
    }, 100);
  });
}

// Special hot reload with asyncData(context)
function hotReloadAPI(_app) {
  if (true) return;
  var $components = [];
  var $nuxt = _app.$nuxt;
  while ($nuxt && $nuxt.$children && $nuxt.$children.length) {
    $nuxt.$children.forEach(function (child, i) {
      if (child.$vnode.data.nuxtChild) {
        var hasAlready = false;
        $components.forEach(function (component) {
          if (component.$options.__file === child.$options.__file) {
            hasAlready = true;
          }
        });
        if (!hasAlready) {
          $components.push(child);
        }
      }
      $nuxt = child;
    });
  }
  $components.forEach(addHotReload.bind(_app));
}

function addHotReload($component, depth) {
  var _this5 = this;

  if ($component.$vnode.data._hasHotReload) return;
  $component.$vnode.data._hasHotReload = true;
  var _forceUpdate = $component.$forceUpdate.bind($component.$parent);
  $component.$vnode.context.$forceUpdate = function () {
    var Components = (0, _utils.getMatchedComponents)(router.currentRoute);
    var Component = Components[depth];
    if (!Component) return _forceUpdate();
    if ((typeof Component === 'undefined' ? 'undefined' : (0, _typeof3.default)(Component)) === 'object' && !Component.options) {
      // Updated via vue-router resolveAsyncComponents()
      Component = _vue2.default.extend(Component);
      Component._Ctor = Component;
    }
    _this5.error();
    var promises = [];
    var next = function next(path) {
      this.$loading.finish && this.$loading.finish();
      router.push(path);
    };
    var context = (0, _utils.getContext)({ route: router.currentRoute, store: store, isClient: true, hotReload: true, next: next.bind(_this5), error: _this5.error }, app);
    _this5.$loading.start && _this5.$loading.start();
    callMiddleware.call(_this5, Components, context).then(function () {
      // If layout changed
      if (depth !== 0) return _promise2.default.resolve();
      var layout = Component.options.layout || 'default';
      if (typeof layout === 'function') {
        layout = layout(context);
      }
      if (_this5.layoutName === layout) return _promise2.default.resolve();
      var promise = _this5.loadLayout(layout);
      promise.then(function () {
        _this5.setLayout(layout);
        _vue2.default.nextTick(function () {
          return hotReloadAPI(_this5);
        });
      });
      return promise;
    }).then(function () {
      return callMiddleware.call(_this5, Components, context, _this5.layout);
    }).then(function () {
      // Call asyncData(context)
      var pAsyncData = (0, _utils.promisify)(Component.options.asyncData || noopData, context);
      pAsyncData.then(function (asyncDataResult) {
        (0, _utils.applyAsyncData)(Component, asyncDataResult);
        _this5.$loading.increase && _this5.$loading.increase(30);
      });
      promises.push(pAsyncData);
      // Call fetch()
      Component.options.fetch = Component.options.fetch || noopFetch;
      var pFetch = Component.options.fetch(context);
      if (!pFetch || !(pFetch instanceof _promise2.default) && typeof pFetch.then !== 'function') {
        pFetch = _promise2.default.resolve(pFetch);
      }
      pFetch.then(function () {
        return _this5.$loading.increase && _this5.$loading.increase(30);
      });
      promises.push(pFetch);
      return _promise2.default.all(promises);
    }).then(function () {
      _this5.$loading.finish && _this5.$loading.finish();
      _forceUpdate();
      setTimeout(function () {
        return hotReloadAPI(_this5);
      }, 100);
    });
  };
}

// Load vue app
var NUXT = window.__NUXT__ || {};
if (!NUXT) {
  throw new Error('[nuxt.js] cannot find the global variable __NUXT__, make sure the server is working.');
}
// Get matched components
var resolveComponents = function resolveComponents(router) {
  var path = (0, _utils.getLocation)(router.options.base);
  return (0, _utils.flatMapComponents)(router.match(path), function (Component, _, match, key, index) {
    if (typeof Component === 'function' && !Component.options) {
      return new _promise2.default(function (resolve, reject) {
        var _resolve = function _resolve(Component) {
          Component = (0, _utils.sanitizeComponent)(Component);
          if (NUXT.serverRendered) {
            (0, _utils.applyAsyncData)(Component, NUXT.data[index]);
          }
          match.components[key] = Component;
          resolve(Component);
        };
        Component().then(_resolve).catch(reject);
      });
    }
    Component = (0, _utils.sanitizeComponent)(Component);
    match.components[key] = Component;
    return Component;
  });
};

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

(0, _index.createApp)().then(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(__app) {
    var Components, _app, layout, mountApp;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            app = __app.app;
            router = __app.router;
            store = __app.store;
            _context2.next = 5;
            return _promise2.default.all(resolveComponents(router));

          case 5:
            Components = _context2.sent;
            _app = new _vue2.default(app);
            layout = NUXT.layout || 'default';
            _context2.next = 10;
            return _app.loadLayout(layout);

          case 10:
            _app.setLayout(layout);

            mountApp = function mountApp() {
              _app.$mount('#__nuxt');
              _vue2.default.nextTick(function () {
                // Hot reloading
                hotReloadAPI(_app);
                // Call window.onNuxtReady callbacks
                nuxtReady(_app);
              });
            };

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
            _app.error = _app.$options._nuxt.error.bind(_app);
            _app.$loading = {}; // to avoid error while _app.$nuxt does not exist
            if (NUXT.error) _app.error(NUXT.error);
            // Add router hooks
            router.beforeEach(loadAsyncComponents.bind(_app));
            router.beforeEach(render.bind(_app));
            router.afterEach(normalizeComponents);
            router.afterEach(fixPrepatch.bind(_app));

            if (!NUXT.serverRendered) {
              _context2.next = 24;
              break;
            }

            mountApp();
            return _context2.abrupt('return');

          case 24:
            render.call(_app, router.currentRoute, router.currentRoute, function (path) {
              if (path) {
                var mounted = false;
                router.afterEach(function () {
                  if (mounted) return;
                  mounted = true;
                  mountApp();
                });
                router.push(path);
                return;
              }
              normalizeComponents(router.currentRoute, router.currentRoute);
              fixPrepatch.call(_app, router.currentRoute, router.currentRoute);
              mountApp();
            });

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4) {
    return _ref2.apply(this, arguments);
  };
}()).catch(function (err) {
  console.error('[nuxt.js] Cannot load components', err); // eslint-disable-line no-console
});

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(5);

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

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRouter = createRouter;

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(57);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var _26460e66 = function _26460e66() {
	return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 364));
};

var _d988a500 = function _d988a500() {
	return __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, 365));
};

var _126e656c = function _126e656c() {
	return __webpack_require__.e/* import() */(12).then(__webpack_require__.bind(null, 360));
};

var _45e54146 = function _45e54146() {
	return __webpack_require__.e/* import() */(15).then(__webpack_require__.bind(null, 356));
};

var _8471841e = function _8471841e() {
	return __webpack_require__.e/* import() */(14).then(__webpack_require__.bind(null, 357));
};

var _eef29fda = function _eef29fda() {
	return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 359));
};

var _6fbb897d = function _6fbb897d() {
	return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 370));
};

var _3f090d08 = function _3f090d08() {
	return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 368));
};

var _718150c0 = function _718150c0() {
	return __webpack_require__.e/* import() */(11).then(__webpack_require__.bind(null, 361));
};

var _beb3c9bc = function _beb3c9bc() {
	return __webpack_require__.e/* import() */(13).then(__webpack_require__.bind(null, 358));
};

var _42ad62d8 = function _42ad62d8() {
	return __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, 363));
};

var _74156ee2 = function _74156ee2() {
	return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 362));
};

var _6b82fb4a = function _6b82fb4a() {
	return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 366));
};

var _4aa7c725 = function _4aa7c725() {
	return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 369));
};

var _79d75b66 = function _79d75b66() {
	return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 367));
};

var scrollBehavior = function scrollBehavior(to, from, savedPosition) {
	console.log({ to: to, from: from });
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
			path: "/demo",
			component: _126e656c,
			name: "demo"
		}, {
			path: "/ankers",
			component: _45e54146,
			name: "ankers"
		}, {
			path: "/character-tag",
			component: _8471841e,
			name: "character-tag"
		}, {
			path: "/demo/chats",
			component: _eef29fda,
			name: "demo-chats"
		}, {
			path: "/summary/faces",
			component: _6fbb897d,
			name: "summary-faces"
		}, {
			path: "/sow/village",
			component: _3f090d08,
			name: "sow-village"
		}, {
			path: "/demo/names",
			component: _718150c0,
			name: "demo-names"
		}, {
			path: "/demo/books",
			component: _beb3c9bc,
			name: "demo-books"
		}, {
			path: "/demo/timeago",
			component: _42ad62d8,
			name: "demo-timeago"
		}, {
			path: "/demo/oauth",
			component: _74156ee2,
			name: "demo-oauth"
		}, {
			path: "/sow/village/:book_id",
			component: _6b82fb4a,
			name: "sow-village-book_id"
		}, {
			path: "/summary/faces/:id",
			component: _4aa7c725,
			name: "summary-faces-id"
		}, {
			path: "/sow/village/:book_id/top",
			component: _79d75b66,
			name: "sow-village-book_id-top"
		}]
	});
}

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _assign = __webpack_require__(37);

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = __webpack_require__(71);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(58);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

// Recursive find files in ~/store
var files = __webpack_require__(350);
var filenames = files.keys();

// Store
var storeData = {};

// Check if store/index.js exists
var indexFilename = filenames.find(function (filename) {
  return filename.includes('./index.');
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
  return new _vuex2.default.Store((0, _assign2.default)({}, storeData, {
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

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _nuxtLoading = __webpack_require__(275);

var _nuxtLoading2 = _interopRequireDefault(_nuxtLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var layouts = {

  "_book": function _book() {
    return __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, 353));
  },

  "_default": function _default() {
    return __webpack_require__.e/* import() */(17).then(__webpack_require__.bind(null, 354));
  },

  "_sow-log": function _sowLog() {
    return __webpack_require__.e/* import() */(16).then(__webpack_require__.bind(null, 355));
  }

}; //
//
//
//
//
//
//

exports.default = {
  head: { "title": "人狼議事", "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=0.5, shrink-to-fit=no" }, { "hid": "description", "content": "Nuxt.js project" }, { "href": "mailto:7korobi@gmail.com" }], "link": [{ "rel": "stylesheet", "type": "text/css", "href": "https://use.fontawesome.com/6348868528.css" }, { "rel": "stylesheet", "type": "text/css", "href": "/css/index.css" }, { "rel": "icon", "type": "image/x-icon", "href": "/favicon.ico" }, { "href": "mailto:7korobi@gmail.com" }], "script": [{ "src": "/monaco-editor/vs/loader.js", "type": "text/javascript", "charset": "utf8" }], "style": [] },
  data: function data() {
    return {
      layout: null,
      layoutName: ''
    };
  },

  mounted: function mounted() {
    this.$loading = this.$refs.loading;
    this.$nuxt.$loading = this.$loading;
  },


  methods: {
    setLayout: function setLayout(layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default';
      this.layoutName = layout;
      var _layout = '_' + layout;
      this.layout = layouts[_layout];
      return this.layout;
    },
    loadLayout: function loadLayout(layout) {
      var _this = this;

      if (!layout || !layouts['_' + layout]) layout = 'default';
      var _layout = '_' + layout;
      if (typeof layouts[_layout] !== 'function') {
        return _promise2.default.resolve(layouts[_layout]);
      }
      return layouts[_layout]().then(function (Component) {
        layouts[_layout] = Component;
        return layouts[_layout];
      }).catch(function (e) {
        if (_this.$nuxt) {
          return _this.$nuxt.error({ statusCode: 500, message: e.message });
        }
        console.error(e);
      });
    }
  },
  components: {
    NuxtLoading: _nuxtLoading2.default
  }
};

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(5);

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

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _nuxtChild = __webpack_require__(70);

var _nuxtChild2 = _interopRequireDefault(_nuxtChild);

var _error = __webpack_require__(87);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'nuxt',
  beforeCreate: function beforeCreate() {
    _vue2.default.util.defineReactive(this, 'nuxt', this.$root.$options._nuxt);
  },
  created: function created() {
    // Add this.$nuxt in child instances
    _vue2.default.prototype.$nuxt = this;
    // Add this.$root.$nuxt
    this.$root.$nuxt = this;
    // Bind $nuxt.setLayout(layout) to $root.setLayout
    this.setLayout = this.$root.setLayout.bind(this.$root);
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this;
    }
    // Add $nuxt.error()
    this.error = this.$root.error;
  },
  mounted: function mounted() {
    if (this.$root.$loading && this.$root.$loading.start) {
      this.$loading = this.$root.$loading;
    }
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
    }
  },

  components: {
    NuxtChild: _nuxtChild2.default,
    NuxtError: _error2.default
  }
}; //
//
//
//
//

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {module.export = {
  default: {
    props: ['error'],
    data: function() {}
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88)(module)))

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".title[data-v-aa7396f8]{margin-top:15px;font-size:5em}.info[data-v-aa7396f8]{font-weight:300;color:#9aabb1;margin:0}.button[data-v-aa7396f8]{margin-top:50px}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/layouts/error.vue"],"names":[],"mappings":"AACA,wBAEE,gBAAiB,AACjB,aAAe,CAChB,AACD,uBAEE,gBAAiB,AACjB,cAAe,AACf,QAAU,CACX,AACD,yBAEE,eAAiB,CAClB","file":"error.vue","sourcesContent":["\n.title[data-v-aa7396f8]\n{\n  margin-top: 15px;\n  font-size: 5em;\n}\n.info[data-v-aa7396f8]\n{\n  font-weight: 300;\n  color: #9aabb1;\n  margin: 0;\n}\n.button[data-v-aa7396f8]\n{\n  margin-top: 50px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".progress[data-v-efc4a222]{position:fixed;top:0;left:0;right:0;height:2px;width:0;-webkit-transition:width .2s,opacity .4s;-o-transition:width .2s,opacity .4s;transition:width .2s,opacity .4s;opacity:1;background-color:#efc14e;z-index:999999}", "", {"version":3,"sources":["C:/Dropbox/www/giji-nuxt/.nuxt/components/nuxt-loading.vue"],"names":[],"mappings":"AACA,2BACE,eAAgB,AAChB,MAAS,AACT,OAAU,AACV,QAAW,AACX,WAAY,AACZ,QAAU,AACV,yCAA6C,AAC7C,oCAAwC,AACxC,iCAAqC,AACrC,UAAW,AACX,yBAA0B,AAC1B,cAAgB,CACjB","file":"nuxt-loading.vue","sourcesContent":["\n.progress[data-v-efc4a222] {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 2px;\n  width: 0%;\n  -webkit-transition: width 0.2s, opacity 0.4s;\n  -o-transition: width 0.2s, opacity 0.4s;\n  transition: width 0.2s, opacity 0.4s;\n  opacity: 1;\n  background-color: #efc14e;\n  z-index: 999999;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 238:
/***/ (function(module, exports) {

module.exports = [{"_id":"c49","comment":"test","name":"ボリス","order":1,"tag_ids":["giji","guild","young"]},{"_id":"c38","order":2,"name":"コリーン","tag_ids":["giji","market","young"]},{"_id":"c77","order":3,"name":"キャロライナ","tag_ids":["giji","servant","road","farm","young"]},{"_id":"c35","order":4,"name":"ダン","tag_ids":["giji","guild","middle"]},{"_id":"c53","order":5,"name":"ゼルダ","tag_ids":["giji","government","farm","elegant","elder"]},{"_id":"c74","order":6,"name":"フランシスカ","tag_ids":["giji","market","young"]},{"_id":"c50","order":8,"name":"ディーン","tag_ids":["giji","government","guild","young"]},{"_id":"c36","order":8,"name":"ミッシェル","tag_ids":["giji","guild","servant","young"]},{"_id":"c26","order":8,"name":"モニカ","tag_ids":["giji","guild","young"]},{"_id":"c09","order":9,"name":"ヒロシ","tag_ids":["giji","immoral","travel","river","middle"]},{"_id":"c55","order":10,"name":"パピヨン","tag_ids":["giji","apartment","elegant","middle"]},{"_id":"c29","order":11,"name":"イアン","tag_ids":["giji","guild","young"]},{"_id":"c12","order":12,"name":"バーナバス","tag_ids":["giji","servant","road","middle"]},{"_id":"c16","order":127,"name":"マリアンヌ","tag_ids":["giji","apartment","market","medical","young"]},{"_id":"c34","order":14,"name":"トニー","tag_ids":["giji","road","servant","kid"]},{"_id":"c44","order":15,"name":"ドナルド","tag_ids":["giji","immoral","young"]},{"_id":"c11","order":16,"name":"カルヴィン","tag_ids":["giji","elegant","apartment","kid"]},{"_id":"c10","order":17,"name":"ゾーイ","tag_ids":["travel","giji","apartment","kid"]},{"_id":"c70","order":18,"name":"パティ","tag_ids":["giji","servant","apartment","young"]},{"_id":"c56","order":19,"name":"ゴドウィン","tag_ids":["giji","guild","market","middle"]},{"_id":"c07","order":20,"name":"ティモシー","tag_ids":["giji","guild","elder"]},{"_id":"c41","order":21,"name":"ヤニク","tag_ids":["giji","immoral","river","young"]},{"_id":"c58","order":22,"name":"ブルーノ","tag_ids":["giji","ecclesia","middle","elder"]},{"_id":"c17","order":23,"name":"ユリシーズ","tag_ids":["giji","market","middle"]},{"_id":"c39","order":24,"name":"シビル","tag_ids":["giji","servant","guild","middle"]},{"_id":"c40","order":25,"name":"ハワード","tag_ids":["giji","servant","elder"]},{"_id":"c65","order":26,"name":"ズリエル","tag_ids":["giji","immoral","middle"]},{"_id":"c59","order":27,"name":"ムパムピス","tag_ids":["giji","ecclesia","young"]},{"_id":"c57","order":28,"name":"ツェツィーリヤ","tag_ids":["giji","ecclesia","young","middle"]},{"_id":"c04","order":29,"name":"ノーリーン","tag_ids":["giji","servant","middle"]},{"_id":"c46","order":30,"name":"ゲイル","tag_ids":["giji","apartment","medical","young","middle"]},{"_id":"c14","order":31,"name":"レティーシャ","tag_ids":["giji","ecclesia","kid"]},{"_id":"c42","order":33,"name":"ラルフ","tag_ids":["giji","servant","young"]},{"_id":"c37","order":34,"name":"セシル","tag_ids":["giji","market","young"]},{"_id":"c75","order":35,"name":"ビリー","tag_ids":["giji","market","middle"]},{"_id":"c32","order":36,"name":"オスカー","tag_ids":["giji","apartment","kid"]},{"_id":"c33","order":37,"name":"ホリー","tag_ids":["giji","apartment","kid"]},{"_id":"c02","order":38,"name":"アルフレッド","tag_ids":["giji","government","middle"]},{"_id":"c66","order":39,"name":"クリストファー","tag_ids":["giji","servant","guild","farm","middle"]},{"_id":"c24","order":41,"name":"ナタリア","tag_ids":["giji","government","apartment","elder"]},{"_id":"c79","order":42,"name":"マーゴ","tag_ids":["giji","government","apartment","young"]},{"_id":"c61","order":43,"name":"ヌマタロウ","tag_ids":["giji","river","farm","elder"]},{"_id":"c23","order":44,"name":"チャールズ","tag_ids":["giji","ecclesia","middle"]},{"_id":"c28","comment":"","name":"ケイト","order":47,"tag_ids":["giji","apartment","young"]},{"_id":"c68","order":48,"name":"ヨアヒム","tag_ids":["giji","market","immoral","elegant","middle","elder"]},{"_id":"c30","order":49,"name":"フィリップ","tag_ids":["giji","road","river","market","young"]},{"_id":"c21","order":50,"name":"ニール","tag_ids":["giji","farm","guild","young","middle"]},{"_id":"c52","order":52,"name":"ギリアン","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c51","order":53,"name":"ヨーランダ","tag_ids":["giji","medical","ecclesia","young"]},{"_id":"c01","comment":"","name":"メアリー","order":55,"tag_ids":["giji","market","road","young"]},{"_id":"c69","order":56,"name":"ギネス","tag_ids":["giji","guild","market","middle"]},{"_id":"c63","order":57,"name":"ピッパ","tag_ids":["giji","guild","young"]},{"_id":"c05","order":59,"name":"キャサリン","tag_ids":["giji","medical","young"]},{"_id":"c22","order":60,"name":"ワット","tag_ids":["giji","farm","middle"]},{"_id":"c62","order":61,"name":"ヴェラ","tag_ids":["giji","immoral","river","middle"]},{"_id":"c13","order":62,"name":"ロミオ","tag_ids":["giji","medical","elder"]},{"_id":"c18","order":63,"name":"エマ","tag_ids":["giji","medical","elder"]},{"_id":"c27","order":65,"name":"リンダ","tag_ids":["giji","farm","young"]},{"_id":"c08","order":66,"name":"ベネット","tag_ids":["giji","guild","young"]},{"_id":"c19","order":67,"name":"タバサ","tag_ids":["giji","immoral","market","young"]},{"_id":"c71","order":70,"name":"ノックス","tag_ids":["giji","road","farm","young"]},{"_id":"c03","order":71,"name":"スティーブン","tag_ids":["giji","medical","middle"]},{"_id":"c43","order":72,"name":"ガストン","tag_ids":["giji","farm","middle"]},{"_id":"c15","order":73,"name":"ウェーズリー","tag_ids":["giji","government","road","middle"]},{"_id":"c54","order":75,"name":"ザック","tag_ids":["giji","guild","medical","young"]},{"_id":"c25","order":77,"name":"ルーカス","tag_ids":["giji","elegant","young"]},{"_id":"c20","order":79,"name":"グロリア","tag_ids":["giji","elegant","young"]},{"_id":"c72","order":81,"name":"ヴェスパタイン","tag_ids":["giji","guild","young"]},{"_id":"c73","order":83,"name":"ローズマリー","tag_ids":["giji","immoral","market","young"]},{"_id":"c47","order":85,"name":"ペラジー","tag_ids":["giji","ecclesia","river","young"]},{"_id":"c80","order":87,"name":"テッド","tag_ids":["giji","road","apartment","young"]},{"_id":"c96","name":"レオナルド","comment":"2011/12/11","order":89,"tag_ids":["giji","government","ecclesia","middle"]},{"_id":"c95","name":"モリス","comment":"2011/12/11","order":91,"tag_ids":["giji","guild","road","young"]},{"_id":"c97","name":"ジェフ","comment":"2011/12/14 超常現象はあるんだ…","order":93,"tag_ids":["giji","government","river","young","middle"]},{"_id":"c98","name":"オズワルド","comment":"2011/12/29 この髭はぜったいワックス使ってる。","order":95,"tag_ids":["giji","immoral","river","middle"]},{"_id":"c100","name":"グレッグ","comment":"2012/12/30 スポーツ系中学生くらいに見える","order":97,"tag_ids":["giji","guild","young"]},{"_id":"c101","name":"クラリッサ","comment":"2011/12/30 美人さん♪","order":99,"tag_ids":["giji","servant","apartment","young"]},{"_id":"c90","name":"ケヴィン","comment":"2011/12/06","order":125,"tag_ids":["giji","government","river","farm","young"]},{"_id":"c88","name":"ピエール","order":126,"comment":"2011/12/05","tag_ids":["giji","servant","market","middle"]},{"_id":"c89","name":"カトリーナ","comment":"2011/12/06","order":128,"tag_ids":["giji","apartment","young"]},{"_id":"c84","name":"ブレンダ","order":129,"comment":"2011/12/05","tag_ids":["giji","apartment","middle"]},{"_id":"c85","name":"ハナ","order":130,"comment":"2011/12/05","tag_ids":["giji","road","servant","kid"]},{"_id":"c91","comment":"2011/12/06 姦しい奥様♪","name":"ドロシー","order":143,"tag_ids":["giji","river","servant","middle"]},{"_id":"c92","comment":"2011/12/06 姦し娘ーず♪","name":"セレスト","order":144,"tag_ids":["giji","river","servant","young"]},{"_id":"c93","comment":"2011/12/06 えー○○が許されるのは小学生までだよねー♪","name":"ベッキー","order":145,"tag_ids":["giji","river","servant","young"]},{"_id":"c78","order":150,"name":"ネイサン","tag_ids":["giji","market","middle"]},{"_id":"c82","order":148,"name":"ロビン","tag_ids":["giji","servant","kid"]},{"_id":"c94","name":"ダーラ","comment":"2011/12/11","order":165,"tag_ids":["giji","elegant","immoral","market","middle"]},{"_id":"c64","order":180,"name":"ヘクター","tag_ids":["giji","immoral","middle"]},{"_id":"c81","order":190,"name":"サイラス","tag_ids":["giji","medical","guild","farm","young"]},{"_id":"c67","order":200,"name":"ソフィア","tag_ids":["giji","guild","young"]},{"_id":"c76","order":210,"name":"ジョージ","tag_ids":["giji","apartment","kid"]},{"_id":"c60","order":213,"name":"ポーチュラカ","tag_ids":["giji","elegant","kid"]},{"_id":"c87","name":"エリアス","order":217,"comment":"2011/12/05","tag_ids":["giji","elegant","medical","young"]},{"_id":"c45","order":220,"name":"プリシラ","tag_ids":["giji","immoral","young"]},{"_id":"c48","order":225,"name":"ビアンカ","tag_ids":["giji","elegant","middle","elder"]},{"_id":"c86","name":"ホレーショー","order":230,"comment":"2011/12/05","tag_ids":["giji","immoral","apartment","middle"]},{"_id":"c83","order":240,"name":"アイリス","tag_ids":["marchen","giji","road","medical","market","young"]},{"_id":"c31","order":250,"name":"ネル","tag_ids":["giji","guild","apartment","young"]},{"_id":"c99","order":999,"name":"サイモン","tag_ids":["giji","apartment","young","middle"]},{"order":10001,"name":"露蝶","comment":"中国女性名","_id":"g01","tag_ids":["asia"]},{"order":215,"name":"志偉","comment":"台湾男性名 越南の名前も探したかったが、見つからぬ…","_id":"g02","tag_ids":["asia"]},{"order":10003,"name":"芙蓉","comment":"里帰り","_id":"g03","tag_ids":["asia"]},{"order":10004,"name":"沼太郎","comment":"里帰り","_id":"gc61","tag_ids":["asia"]},{"name":"デメテル","comment":"阿片窟からきました","order":20001,"_id":"mad01","tag_ids":["marchen"]},{"name":"エルゴット","comment":"阿片窟からきました","order":245,"_id":"mad02","tag_ids":["marchen"]},{"name":"シーシャ","comment":"阿片窟からきました","order":223,"_id":"mad03","tag_ids":["marchen"]},{"name":"ドリベル","comment":"阿片窟からきました","order":20004,"_id":"mad04","tag_ids":["marchen"]},{"name":"ヤヘイ","comment":"阿片窟からきました","order":1010,"_id":"mad05","tag_ids":["marchen"]},{"name":"アヤワスカ","comment":"阿片窟からきました","order":236,"_id":"mad06","tag_ids":["marchen"]},{"name":"チアキ","comment":"時をかける少女","order":30001,"_id":"t01","tag_ids":["travel"]},{"name":"リッキィ","comment":"夏への扉","order":30002,"_id":"t02","tag_ids":["travel"]},{"name":"ミナカタ","comment":"ー仁ー","order":156,"_id":"t03","tag_ids":["travel"]},{"name":"カイル","comment":"サラ・コナー・クロニクルズ","order":30004,"_id":"t04","tag_ids":["travel"]},{"name":"ジェニファー","comment":"バック・トゥ・ザ・フューチャー","order":30005,"_id":"t05","tag_ids":["travel"]},{"_id":"m99","order":70001,"name":"パルック","tag_ids":["myth"]},{"_id":"m06","order":70002,"name":"リリンラ","tag_ids":["myth"]},{"_id":"m03","order":70003,"name":"トノサマ","tag_ids":["myth"]},{"_id":"m05","order":70004,"name":"ナナコロ","tag_ids":["myth"]},{"_id":"m15","order":70005,"name":"ミソチャ","tag_ids":["myth"]},{"_id":"m07","order":70006,"name":"アリス","tag_ids":["myth"]},{"_id":"r30","order":70006,"name":"トリ","tag_ids":["myth"]},{"_id":"m01","order":70007,"name":"ケムシ","tag_ids":["myth"]},{"_id":"m02","order":70008,"name":"ポプラ","tag_ids":["myth"]},{"_id":"m04","order":70009,"name":"アオイ","tag_ids":["myth"]},{"_id":"b44","comment":"","name":"ドナルド","order":70010,"tag_ids":["myth"]},{"_id":"m08","order":70011,"name":"おっぱい","tag_ids":["myth"]},{"_id":"m09","order":70012,"name":"カミジャー","tag_ids":["myth"]},{"_id":"r12","order":70012,"name":"バーナバス","tag_ids":["myth"]},{"_id":"b49","comment":"","name":"ボリス","order":70012,"tag_ids":["myth"]},{"_id":"m10","order":70013,"name":"アチャポ","tag_ids":["myth"]},{"_id":"m12","comment":"","name":"トルニトス","order":70014,"tag_ids":["myth"]},{"_id":"m11","order":70015,"name":"ライトニング","tag_ids":["myth"]},{"_id":"m13","order":70016,"name":"ミケ","tag_ids":["myth"]},{"_id":"m14","order":70017,"name":"カリュクス","tag_ids":["myth"]},{"_id":"sf01","order":80000,"name":"ラッシード","comment":"りしあさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf02","order":80001,"name":"エスペラント","comment":"ふらぅさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf03","order":80002,"name":"ピート","comment":"たるっとさん＆りちゃさん","tag_ids":["stratos"]},{"_id":"sf04","order":80003,"name":"アシモフ","comment":"あすたん＆りりんら","tag_ids":["stratos"]},{"_id":"sf05","order":80004,"name":"モナリザ","comment":"ななころび＆りりんら","tag_ids":["stratos"]},{"_id":"sf06","order":80005,"name":"ワレンチナ","comment":"まりもさん＆あずまさん","tag_ids":["stratos"]},{"_id":"sf07","order":80007,"name":"ヤンファ","comment":"りしあさん＆はむおくん","tag_ids":["stratos"]},{"_id":"sf08","order":80008,"name":"ＰＪ","comment":"りしあさん＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf09","order":80009,"name":"キリシマ","comment":"ななころび＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf10","order":80010,"name":"ナユタ","comment":"かれやなぎさん＆かいさん","tag_ids":["stratos"]},{"_id":"sf11","order":80011,"name":"イワノフ","comment":"かれやなぎさん＆りちゃさん","tag_ids":["stratos"]},{"order":80012,"name":"†ルシフェル†","comment":null,"_id":"sf12","tag_ids":["stratos"]},{"order":80013,"name":"トルドヴィン","comment":null,"_id":"sf13","tag_ids":["stratos"]},{"order":80014,"name":"玖休","comment":null,"_id":"sf18","tag_ids":["stratos"]},{"order":80015,"name":"参休","comment":null,"_id":"sf19","tag_ids":["stratos"]},{"order":80016,"name":"クリスマス","comment":null,"_id":"sf14","tag_ids":["stratos"]},{"order":80017,"name":"ジェームス","comment":null,"_id":"sf15","tag_ids":["stratos"]},{"order":80018,"name":"ライジ","comment":null,"_id":"sf16","tag_ids":["stratos"]},{"order":80019,"name":"ジャック","comment":null,"_id":"sf17","tag_ids":["stratos"]},{"_id":"w05","order":90001,"name":"定吉","comment":"ぷえるとりこの旅人　エージ―エー","tag_ids":["shoji"]},{"_id":"w21","order":90002,"name":"鉄平","comment":"日本の伝統　熊木彫","tag_ids":["shoji"]},{"_id":"w22","order":90003,"name":"竹三","comment":"雪国の風雅　熊木彫","tag_ids":["shoji"]},{"_id":"w36","order":90004,"name":"ウト","tag_ids":["shoji"]},{"_id":"w16","order":90005,"name":"勢","comment":"ぶたさん印の　あおいジンギスカン","tag_ids":["shoji"]},{"_id":"w18","order":90006,"name":"菊","tag_ids":["shoji"]},{"_id":"w26","order":90007,"name":"勝丸","tag_ids":["shoji"]},{"_id":"w35","comment":"","name":"奈須麿","order":90008,"tag_ids":["shoji"]},{"_id":"w24","order":90009,"name":"辰次","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w37","order":90010,"name":"芙蓉","tag_ids":["shoji"]},{"_id":"w29","order":90011,"name":"志乃","tag_ids":["shoji"]},{"_id":"w20","order":90012,"name":"藤之助","tag_ids":["shoji"]},{"_id":"w31","order":90013,"name":"日向","tag_ids":["shoji"]},{"_id":"w12","order":90014,"name":"おみつ","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w10","order":90015,"name":"博史","tag_ids":["shoji"]},{"_id":"w25","order":90016,"name":"法泉","tag_ids":["shoji"]},{"_id":"w09","order":90017,"name":"チャールズ","comment":"チャールズ派遣ならおまかせ　O-ririn","tag_ids":["shoji"]},{"_id":"w30","order":90018,"name":"雪代","tag_ids":["shoji"]},{"_id":"w14","order":90019,"name":"華月斎","comment":"めげないゼラチン作り　MEGEゼラチン","tag_ids":["shoji"]},{"_id":"w13","order":90020,"name":"たまこ","comment":"世界の道をつなぐ　議事国地図","tag_ids":["shoji"]},{"_id":"w11","order":90021,"name":"沼太郎","tag_ids":["shoji"]},{"_id":"w03","order":90022,"name":"朔","comment":"新しい議事をつくる　たき学会","tag_ids":["shoji"]},{"_id":"w34","order":90023,"name":"余四朗","tag_ids":["shoji"]},{"_id":"w27","order":90024,"name":"源蔵","tag_ids":["shoji"]},{"_id":"w28","order":90025,"name":"甚六","tag_ids":["shoji"]},{"_id":"w17","order":90026,"name":"雷門","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w39","comment":"","name":"沙耶","order":90027,"tag_ids":["shoji"]},{"_id":"w08","order":90028,"name":"朝顔","tag_ids":["shoji"]},{"_id":"w43","order":90029,"name":"春松","tag_ids":["shoji"]},{"_id":"w07","order":90030,"name":"夕顔","tag_ids":["shoji"]},{"_id":"w40","order":90031,"name":"朧","tag_ids":["shoji"]},{"_id":"w33","comment":"","name":"団十郎","order":90032,"tag_ids":["shoji"]},{"_id":"w23","order":90033,"name":"仁右衛門","tag_ids":["shoji"]},{"_id":"w04","order":90034,"name":"小鈴","comment":"お口の愛人　タルッティ・タルット","tag_ids":["shoji"]},{"_id":"w06","order":90035,"name":"ゆり","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w38","comment":"","name":"一平太","order":90037,"tag_ids":["shoji"]},{"_id":"w01","order":90038,"name":"鏡花","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w15","order":90039,"name":"八重","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w32","order":90040,"name":"明之進","tag_ids":["shoji"]},{"_id":"w02","order":90041,"name":"慶三郎","comment":"カメラのことなら　MISEKI","tag_ids":["shoji"]},{"_id":"w44","name":"雪客","comment":"りりんラハウス呑んだくれ大会","order":90042,"tag_ids":["shoji"]},{"_id":"w45","name":"亀吉","comment":"りりんラハウス呑んだくれ大会","order":90043,"tag_ids":["shoji"]},{"_id":"w46","name":"梅子","order":90044,"comment":"お誕生日記念☆","tag_ids":["shoji"]},{"face_id":"w47","name":"置壱","comment":"日本の美徳強化月間","order":90045,"_id":"w47","tag_ids":["shoji"]},{"face_id":"all","name":"パルック","order":99999,"_id":"all","tag_ids":["god"]},{"_id":"g04","name":"攻芸","comment":"台湾男性名","order":10005,"tag_ids":["asia"]},{"_id":"g05","name":"麻雀","comment":"中国女性名","order":170,"tag_ids":["asia"]},{"_id":"g06","name":"黍炉","comment":"ダリダイ・オッチギン","order":10007,"tag_ids":["asia"]},{"_id":"mad07","name":"ダイミ","comment":"阿片窟からきました","order":20007,"tag_ids":["marchen"]},{"_id":"mad08","name":"エフェドラ","comment":"阿片窟からきました","order":20008,"tag_ids":["marchen"]},{"_id":"t06","name":"サミュエル","comment":"トランスフォーマー","order":30006,"tag_ids":["travel"]},{"_id":"t07","name":"アカリ","comment":"時をかける少女","order":30019,"tag_ids":["travel"]},{"_id":"t08","name":"ミルフィ","comment":"海賊戦隊ゴーカイジャー","order":30020,"tag_ids":["travel"]},{"_id":"t09","name":"ゴロウ","comment":"時をかける少女","order":30009,"tag_ids":["travel"]},{"_id":"t10","name":"トレイル","comment":"ゼルダの伝説 ムジュラの仮面","order":30010,"tag_ids":["travel"]},{"_id":"t11","name":"マドカ","comment":"宇宙戦艦ヤマモト・ヨーコ","order":30019,"tag_ids":["travel"]},{"_id":"t12","name":"フランク","comment":"オーロラの彼方へ","order":30012,"tag_ids":["travel"]},{"_id":"t13","name":"ジャニス","comment":"フラッシュフォワード","order":30013,"tag_ids":["travel"]},{"_id":"c105","comment":"年末カウントダウン♪","name":"シメオン","order":82,"tag_ids":["giji","apartment","ecclesia","young"]},{"_id":"c104","comment":"年末カウントダウン♪","name":"ヒュー","order":89,"tag_ids":["giji","medical","young"]},{"_id":"c106","comment":"年末カウントダウン♪","name":"ワンダ","order":90,"tag_ids":["giji","river","guild","middle"]},{"_id":"c108","name":"ブローリン","comment":"年末カウントダウン♪","order":91,"tag_ids":["giji","farm","young","middle"]},{"_id":"c109","name":"ラディスラヴァ","comment":"年末カウントダウン♪","order":185,"tag_ids":["giji","apartment","young"]},{"_id":"c102","comment":"年末カウントダウン♪","name":"ウォーレン","order":155,"tag_ids":["giji","market","elder"]},{"_id":"c107","name":"イヴォン","comment":"年末カウントダウン♪","order":205,"tag_ids":["giji","elegant","middle","elder"]},{"_id":"c103","comment":"年末カウントダウン♪","name":"ナンシー","order":234,"tag_ids":["giji","apartment","young"]},{"_id":"t14","name":"クシャミ","comment":"吾輩は猫である。","order":30014,"tag_ids":["travel"]},{"_id":"t15","name":"ガーディ","comment":"ベイカー街少年探偵団","order":30015,"tag_ids":["travel"]},{"_id":"sf20","name":"ティソ","comment":null,"order":80020,"tag_ids":["stratos"]},{"_id":"g07","name":"ジリヤ","comment":"ロシア女性名","order":10008,"tag_ids":["asia"]},{"_id":"t16","name":"アラン","comment":"映画監督たちの共用偽名","order":30016,"tag_ids":["travel"]},{"_id":"w48","name":"直円","comment":"和算復活月間","order":90048,"tag_ids":["shoji"]},{"_id":"w49","name":"錠","comment":"ポルトガル人にジオゴっているんだぜ。へー。かっこいー。","order":90049,"tag_ids":["shoji"]},{"_id":"w50","name":"丁助","comment":"負けるたびに追い博打","order":90050,"tag_ids":["shoji"]},{"_id":"t17","name":"ススム","comment":"おもいっきり探偵団 覇悪怒組","order":30018,"tag_ids":["travel"]},{"_id":"t18","name":"マユミ","comment":"まんがはじめて物語（二代目）","order":30018,"tag_ids":["travel"]},{"_id":"c110","name":"リー","comment":"","order":92,"tag_ids":["giji","immoral","apartment","young"]},{"_id":"t19","name":"ハルカ","comment":"はるかリフレイン","order":30017,"tag_ids":["travel"]},{"_id":"w51","name":"鬼丞","comment":"リニューアル記念！","order":90051,"tag_ids":["shoji"]},{"_id":"w52","name":"櫻子","comment":"リニューアル記念！","order":90052,"tag_ids":["shoji"]},{"_id":"c111","name":"スージー","comment":"リニューアル記念！ 弟がいるという噂が…","order":160,"tag_ids":["giji","apartment","elegant","immoral","young"]},{"_id":"c113","name":"ジェレミー","comment":"リニューアル記念！","order":228,"tag_ids":["giji","apartment","immoral","young","middle"]},{"_id":"c112","name":"ニコラス","comment":"！？","order":128,"tag_ids":["giji","elegant","young"]},{"_id":"m16","name":"アーサー","comment":"円卓の騎士","order":70018,"tag_ids":["myth"]},{"_id":"t20","name":"エリ","comment":"英国情報局秘密組織チェラブ (CHERUB)","order":30022,"tag_ids":["travel"]},{"_id":"g08","name":"イワン","comment":"Иван-дурак","order":10009,"tag_ids":["asia"]},{"_id":"c114","name":"モンド","comment":"８８件のご応募、ありがとう。そして、ありがとう。","order":131,"tag_ids":["giji","government","immoral","middle"]},{"_id":"m18","name":"ミーム","comment":"インターネット・ミームから。 えんいー","order":70020,"tag_ids":["myth"]},{"_id":"m19","name":"タルト","comment":"https://twitter.com/7korobi/status/510069062974447617","order":70021,"tag_ids":["myth"]},{"_id":"m20","name":"ショコラ","comment":"https://twitter.com/noa_marimo/status/510100541536358400","order":70022,"tag_ids":["myth"]},{"_id":"c115","name":"マリオ","comment":"じつは、牧場育ちらしいよ。","order":132,"tag_ids":["giji","guild","road","kid"]},{"_id":"t21","name":"トシミ","comment":"代紋TAKE2","order":30019,"tag_ids":["travel"]},{"_id":"t22","name":"ケイイチ","comment":"ひぐらしのなく頃に","order":30021,"tag_ids":["travel"]},{"_id":"w53","name":"おもん","comment":"三拾糎程の「もふもふねこひよこ」　せんいち","order":90053,"tag_ids":["shoji"]},{"_id":"sf021","name":"アンタレス","comment":"","order":80022,"tag_ids":["stratos"]},{"_id":"sf023","name":"エフ","comment":"","order":80023,"tag_ids":["stratos"]},{"_id":"sf024","name":"アイライト","comment":"","order":80024,"tag_ids":["stratos"]},{"_id":"sf025","name":"アマルテア","comment":"","order":80006,"tag_ids":["stratos"]},{"_id":"sf026","name":"ポーラ","comment":"","order":80026,"tag_ids":["stratos"]},{"_id":"sf022","name":"チェビイ","comment":"","order":80027,"tag_ids":["stratos"]},{"_id":"sf027","name":"モスキート","comment":"","order":80028,"tag_ids":["stratos"]},{"_id":"sf032","name":"ワクラバ","comment":"","order":80029,"tag_ids":["stratos"]},{"_id":"sf028","name":"コータ","comment":"","order":80030,"tag_ids":["stratos"]},{"_id":"sf029","name":"ミツボシ","comment":"","order":80031,"tag_ids":["stratos"]},{"_id":"sf030","name":"クレパスキュール","comment":"","order":80032,"tag_ids":["stratos"]},{"_id":"sf031","name":"シルク","comment":"","order":80033,"tag_ids":["stratos"]},{"_id":"t23","name":"ナナオ","comment":"","order":30023,"tag_ids":["travel"]},{"_id":"t24","name":"キルロイ","comment":"「キルロイここに現る」","order":30024,"tag_ids":["travel"]},{"_id":"t25","name":"ミサキ","comment":"","order":30025,"tag_ids":["travel"]},{"_id":"t26","name":"アツタネ","comment":"平田篤胤","order":30026,"tag_ids":["travel"]},{"_id":"t27","name":"みょんこ","comment":"","order":30027,"tag_ids":["travel"]},{"_id":"t28","name":"リツ","comment":"","order":30028,"tag_ids":["travel"]},{"_id":"t29","name":"ヒナコ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"t30","name":"ワタヌキ","comment":"四月朔日","order":30030,"tag_ids":["travel"]},{"_id":"t31","name":"ホウイチ","comment":"","order":158,"tag_ids":["travel"]},{"_id":"t32","name":"トヨタ","comment":"洋画の日本人名","order":30032,"tag_ids":["travel"]},{"_id":"t33","name":"エツコ","comment":"","order":30033,"tag_ids":["travel"]},{"_id":"t34","name":"ドン","comment":"","order":17,"tag_ids":["travel"]},{"_id":"c116","name":"メルヤ","comment":"","order":116,"tag_ids":["giji","medical","immoral","young"]},{"_id":"c117","name":"ルパート","comment":"","order":135,"tag_ids":["giji","road","guild","elder"]},{"_id":"c118","name":"ユージン","comment":"","order":118,"tag_ids":["giji","river","young","middle"]},{"_id":"c119","name":"オーレリア","comment":"","order":119,"tag_ids":["giji","ecclesia","young"]},{"_id":"c120","name":"ノア","comment":"","order":120,"tag_ids":["giji","servant","young","middle"]},{"_id":"t35","name":"イスルギ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"c121","name":"ブッカ","comment":"ブッカ・ホワイト氏から。","order":121,"tag_ids":["giji","farm"]},{"_id":"mad09","name":"カナビス","comment":"ウパニシャッドの精神で","order":20009,"tag_ids":["marchen"]},{"_id":"mad10","name":"ルグレ","comment":"後悔あとをたたず","order":20010,"tag_ids":["marchen"]},{"_id":"mad11","name":"オルギア","comment":"ええじゃないかええじゃないかー！","order":20011,"tag_ids":["marchen"]},{"_id":"sf033","name":"イースター","comment":null,"order":80033,"tag_ids":["stratos"]},{"_id":"sf034","name":"アニュ","order":80034,"tag_ids":["stratos"]},{"_id":"sf035","name":"キャンディ","comment":null,"order":80035,"tag_ids":["stratos"]},{"_id":"sf036","name":"キカ","order":80036,"tag_ids":["stratos"]},{"_id":"sf037","name":"バンアレン","order":80037,"tag_ids":["stratos"]},{"_id":"sf038","name":"パラチーノ","order":80038,"tag_ids":["stratos"]},{"_id":"t36","name":"イルマ","comment":"KKKてきな何か。","order":30036,"tag_ids":["travel"]},{"_id":"t37","name":"シュンタロ","comment":"国語の教科書から。","order":30009,"tag_ids":["travel"]},{"_id":"t38","name":"スズキ","comment":"人の死なない推理小説『黒後家蜘蛛の会』のそばに","order":30038,"tag_ids":["travel"]},{"_id":"t39","name":"ガモウ","comment":"そろそろ聖戦士が欲しかった！","order":30018.1,"tag_ids":["travel"]}]

/***/ }),

/***/ 239:
/***/ (function(module, exports) {

module.exports = {"all":{"label":"すべて","long":"「人狼議事 ちゃんぷる」のキャラクター","chr_set_ids":["all"]},"giji":{"label":"人狼議事","long":"「人狼議事」のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"shoji":{"label":"てやんでえ","long":"「和の国てやんでえ」のキャラクター","chr_set_ids":["all","wa"]},"travel":{"label":"帰還者議事","long":"「帰還者議事」のキャラクター","chr_set_ids":["all","time"]},"stratos":{"label":"明後日への道標","long":"「明後日への道標」のキャラクター","chr_set_ids":["all","SF"]},"myth":{"label":"はおうのひろば","long":"「はおうのひろば」のキャラクター","chr_set_ids":["all","changed"]},"asia":{"label":"大陸議事","long":"「大陸議事」のキャラクター","chr_set_ids":["all","ger"]},"marchen":{"label":"狂騒議事","long":"「狂騒議事」のキャラクター","chr_set_ids":["all","mad"]},"kid":{"label":"(児童)","long":"児童のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"young":{"label":"(若者)","long":"若者のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"middle":{"label":"(中年)","long":"中年のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"elder":{"label":"(老人)","long":"老人のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"river":{"label":"-運河-","long":"往く人来る人休む人","chr_set_ids":["all","animal","school","ririnra"]},"road":{"label":"-往来-","long":"往く人来る人休む人","chr_set_ids":["all","animal","school","ririnra"]},"immoral":{"label":"-裏道-","long":"街灯の裏の背徳達","chr_set_ids":["all","animal","school","ririnra"]},"guild":{"label":"-商工会-","long":"商人と職人の集うギルド","chr_set_ids":["all","animal","school","ririnra"]},"elegant":{"label":"-舞踏会-","long":"瀟洒な館の舞踏会","chr_set_ids":["all","animal","school","ririnra"]},"ecclesia":{"label":"-公教会-","long":"信仰と道徳と学識の源泉","chr_set_ids":["all","animal","school","ririnra"]},"medical":{"label":"-施療院-","long":"病苦毒霊と戦う砦","chr_set_ids":["all","animal","school","ririnra"]},"market":{"label":"-歌劇酒場-","long":"芸の極みに華が咲く","chr_set_ids":["all","animal","school","ririnra"]},"apartment":{"label":"-自室の窓-","long":"窓から外を眺めると","chr_set_ids":["all","animal","school","ririnra"]},"servant":{"label":"-使用人-","long":"良家を支えるスタッフ","chr_set_ids":["all","animal","school","ririnra"]},"farm":{"label":"-森の農場-","long":"森に接する田畑","chr_set_ids":["all","animal","school","ririnra"]},"government":{"label":"-統治公共-","long":"所領を治める権能者","chr_set_ids":["all","animal","school","ririnra"]},"god":{"label":"-かみさま-","long":"かみさま","chr_set_ids":["all"]}}

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"all","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事 ちゃんぷる"},"chr_npc":[{"label":"人狼議事 ちゃんぷる","csid":"all","face_id":"all","say_0":"ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","say_1":"皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"}],"chr_job":[{"face_id":"all","job":"かみさま"}]}

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"animal","admin":"大地の震動","maker":"草原のざわめき","label":"うきうきサバンナ"},"chr_npc":[{"label":"うきうきサバンナ","csid":"animal","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"こじか"},{"face_id":"c02","job":"よーくしゃーてりあ"},{"face_id":"c03","job":"かもすぞ"},{"face_id":"c04","job":"くろひょう"},{"face_id":"c05","job":"いとまきえい"},{"face_id":"c06","job":"へび"},{"face_id":"c07","job":"てのりぶんちょう"},{"face_id":"c08","job":"たぬき"},{"face_id":"c09","job":"にほんおおかみ"},{"face_id":"c10","job":"そまり"},{"face_id":"c11","job":"みけ"},{"face_id":"r12","job":"うえきばち"},{"face_id":"c13","job":"かたつむり"},{"face_id":"c14","job":"くらげ"},{"face_id":"c15","job":"しゃち"},{"face_id":"c16","job":"あふりかぞう"},{"face_id":"c17","job":"おらうーたん"},{"face_id":"c18","job":"かまきり"},{"face_id":"c19","job":"あげはちょう"},{"face_id":"c20","job":"とら"},{"face_id":"c21","job":"おおたこ"},{"face_id":"c22","job":"うちゅうせん"},{"face_id":"c23","job":"ぱんだ"},{"face_id":"c24","job":"ぶるどっぐ"},{"face_id":"c25","job":"うし"},{"face_id":"c26","job":"えりまきとかげ"},{"face_id":"c27","job":"ひつじ"},{"face_id":"c28","job":"うさぎ"},{"face_id":"c29","job":"しまうま"},{"face_id":"c30","job":"おうむ"},{"face_id":"c31","job":"かえる"},{"face_id":"c32","job":"きんぎょ"},{"face_id":"c33","job":"ねったいぎょ"},{"face_id":"c34","job":"すなねずみ"},{"face_id":"c35","job":"ごりら"},{"face_id":"c36","job":"さらぶれっど"},{"face_id":"c37","job":"ぺるしゃ"},{"face_id":"c38","job":"だいおういか"},{"face_id":"c39","job":"もみのき"},{"face_id":"c40","job":"らいおん"},{"face_id":"c41","job":"ろぶすたー"},{"face_id":"c42","job":"みつりょうしゃ"},{"face_id":"c43","job":"くまー"},{"face_id":"c44","job":"いわとびぺんぎん"},{"face_id":"c45","job":"はいえな"},{"face_id":"c46","job":"あらいぐま"},{"face_id":"c47","job":"しろまどうし"},{"face_id":"c48","job":"くじゃく"},{"face_id":"c49","job":"にほんざる"},{"face_id":"c50","job":"きつね"},{"face_id":"c51","job":"かげろう"},{"face_id":"c52","job":"ありじごく"},{"face_id":"c53","job":"やみふくろう"},{"face_id":"c54","job":"さめ"},{"face_id":"c55","job":"もるふぉちょう"},{"face_id":"c56","job":"ぶた"},{"face_id":"c57","job":"らくだ"},{"face_id":"c58","job":"ゆにこーん"},{"face_id":"c59","job":"れとりばー"},{"face_id":"c60","job":"はむすたー"},{"face_id":"c61","job":"すっぽん"},{"face_id":"c62","job":"きつねりす"},{"face_id":"c63","job":"おこじょ"},{"face_id":"c64","job":"やまあらし"},{"face_id":"c65","job":"ちすいこうもり"},{"face_id":"c66","job":"ばいにん"},{"face_id":"c67","job":"りす"},{"face_id":"c68","job":"なまこ"},{"face_id":"c69","job":"びーる"},{"face_id":"c70","job":"かんがるー"},{"face_id":"c71","job":"なまけもの"},{"face_id":"c72","job":"ほたる"},{"face_id":"c73","job":"くりおね"},{"face_id":"c74","job":"はいびすかす"},{"face_id":"c75","job":"いえてぃ"},{"face_id":"c76","job":"めがねざる"},{"face_id":"c77","job":"にんじん"},{"face_id":"c78","job":"かめれおん"},{"face_id":"c79","job":"わかめ"},{"face_id":"c80","job":"りかおん"},{"face_id":"c81","job":"ふぇねっく"},{"face_id":"c82","job":"どぶねずみ"},{"face_id":"c83","job":"いそぎんちゃく"},{"face_id":"c99","job":"しんかいぎょ"},{"face_id":"c86","job":"かも"},{"face_id":"c94","job":"あかまむし"},{"face_id":"c92","job":"さば"},{"face_id":"c90","job":"さい"},{"face_id":"c95","job":"やもり"},{"face_id":"c97","job":"しぇぱーど"},{"face_id":"c100","job":"びーばー"},{"face_id":"c106","job":"まんぼう"},{"face_id":"c89","job":"かば"},{"face_id":"c91","job":"あるぱか"},{"face_id":"c93","job":"わらいかわせみ"},{"face_id":"c107","job":"いぼいのしし"},{"face_id":"c85","job":"かみつきがめ"},{"face_id":"c105","job":"うみねこ"},{"face_id":"c96","job":"せあかごけぐも"},{"face_id":"c98","job":"はしびろこう"},{"face_id":"c101","job":"すずらん"},{"face_id":"c104","job":"みいら"},{"face_id":"c108","job":"ぶろっこりー"},{"face_id":"c88","job":"ゆでたまご"},{"face_id":"c84","job":"しろへび"},{"face_id":"c109","job":"しろちゃとら"},{"face_id":"c102","job":"さんた"},{"face_id":"c87","job":"りゅう"},{"face_id":"c103","job":"おうむがい"}]}

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"changed","admin":"闇の呟き","maker":"広場のお告げ","label":"はおうの広場"},"chr_npc":[{"label":"とのさま広場","csid":"changed","face_id":"m08","say_0":"じんろう？\nそんななまえのこ、いたかしら……","say_1":"さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"},{"_id":"m05","label":"はおうの広場","csid":"changed_m05","face_id":"m05","say_0":"ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","say_1":"誰にも、腰抜けなんて…言わせないぞっ"}],"chr_job":[{"face_id":"b44","job":"こあくとう"},{"face_id":"b49","job":"いしく"},{"face_id":"m01","job":"ようせい"},{"face_id":"m02","job":"ようせい"},{"face_id":"m03","job":"しょうぐん"},{"face_id":"m04","job":"すくみず"},{"face_id":"m05","job":"はおう"},{"face_id":"m06","job":"きゅうていがか"},{"face_id":"m07","job":"こひつじ"},{"face_id":"m08","job":"おふくろのあじ"},{"face_id":"m09","job":"しーさー"},{"face_id":"m10","job":"ころぽっくる"},{"face_id":"m11","job":"神聖騎士"},{"face_id":"m12","job":"暗黒騎士"},{"face_id":"m13","job":"調律師"},{"face_id":"m14","job":"奇跡の子"},{"face_id":"m15","job":"びじん"},{"face_id":"m16","job":"りゅうきへい"},{"face_id":"m18","job":"記号の妖精"},{"face_id":"m19","job":"おひめさま"},{"face_id":"m20","job":"げぼく"},{"face_id":"m99","job":"かみさま"},{"face_id":"r30","job":"ひとづかい"}]}

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ger","admin":"闇の呟き","maker":"馬頭琴の調","label":"エクスパンション・セット「大陸議事」"},"chr_npc":[{"label":"エクスパンション・セット「大陸議事」","csid":"ger","face_id":"g03","say_0":"まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","say_1":"飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"}],"chr_job":[{"face_id":"g01","job":"三元道士"},{"face_id":"g02","job":"白鶴拳"},{"face_id":"g03","job":"吹牛方士"},{"face_id":"gc61","job":"釣り師"},{"face_id":"g04","job":"心意六合拳"},{"face_id":"g05","job":"本草方士"},{"face_id":"g06","job":"宝飾交易"},{"face_id":"g07","job":"お針子"},{"face_id":"g08","job":"馬鹿"}]}

/***/ }),

/***/ 244:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"mad","admin":"闇の呟き","maker":"天上の調べ","label":"エクスパンション・セット「狂騒議事」"},"chr_npc":[{"label":"エクスパンション・セット「狂騒議事」","csid":"mad","face_id":"c83","say_0":"どうせ、殺されるわみんな。…みんな\n\n\n/* 死ねばいいのに */","say_1":"１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"エクスパンション・セット「狂騒議事」（ヤヘイ）","csid":"mad_mad05","face_id":"mad05","say_0":"…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","say_1":"…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"}],"chr_job":[{"face_id":"c103","job":"厭世家"},{"face_id":"c83","job":"虹追い"},{"face_id":"mad01","job":"青い鳥"},{"face_id":"mad02","job":"蟻塚崩し"},{"face_id":"mad03","job":"露店巡り"},{"face_id":"mad04","job":"酸味探し"},{"face_id":"mad05","job":"天井手繰り"},{"face_id":"mad06","job":"隠れん坊"},{"face_id":"mad07","job":"早口言葉"},{"face_id":"mad08","job":"妄執の誓い"},{"face_id":"mad09","job":"隣席座り"},{"face_id":"mad10","job":"追憶探り"},{"face_id":"mad11","job":"乱痴気"}]}

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ririnra","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事"},"chr_npc":[{"label":"人狼議事（キャサリン）","csid":"ririnra_c05","face_id":"c05","say_0":"たいへん、たいへん、たいへん！","say_1":"大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"},{"label":"人狼議事（ベネット）","csid":"ririnra_c08","face_id":"c08","say_0":"壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","say_1":"足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>"},{"label":"人狼議事（タバサ）","csid":"ririnra_c19","face_id":"c19","say_0":"ねぇ、遊んでかない？今夜はあなたが狼よ……","say_1":"人狼なんているわけないじゃん？みんな大げさなのさ。"},{"label":"人狼議事（ソフィア）","csid":"ririnra_c67","face_id":"c67","say_0":"こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","say_1":"まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"},{"label":"人狼議事（ヨアヒム）","csid":"ririnra_c68","face_id":"c68","say_0":"ふひ、ふひひ！人狼になど……くれてやるものかヨ！","say_1":"人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"},{"label":"人狼議事（ヴェスパタイン）","csid":"ririnra_c72","face_id":"c72","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"人狼議事（ヨーランダ）","csid":"ririnra_c51","face_id":"c51","say_0":"夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","say_1":"……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"},{"label":"人狼議事（グロリア）","csid":"ririnra_c20","face_id":"c20","say_0":"紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","say_1":"ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"},{"label":"人狼議事（オスカー）","csid":"ririnra_c32","face_id":"c32","say_0":"…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","say_1":"ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"},{"label":"人狼議事","csid":"ririnra","face_id":"c99","say_0":"嗚呼、聞こえ る。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"花売り"},{"face_id":"c02","job":"村長"},{"face_id":"c03","job":"見習い医師"},{"face_id":"c04","job":"女中"},{"face_id":"c05","job":"病人"},{"face_id":"c06","job":"紐"},{"face_id":"c07","job":"雑貨屋"},{"face_id":"c08","job":"本屋"},{"face_id":"c09","job":"刺客"},{"face_id":"c10","job":"小娘"},{"face_id":"c11","job":"小僧"},{"face_id":"c12","job":"御者"},{"face_id":"c13","job":"ベテラン医師"},{"face_id":"c14","job":"聖歌隊員"},{"face_id":"c15","job":"郵便屋"},{"face_id":"c16","job":"食いしん坊"},{"face_id":"c17","job":"詩人"},{"face_id":"c18","job":"ベテラン看護婦"},{"face_id":"c19","job":"水商売"},{"face_id":"c20","job":"良家の娘"},{"face_id":"c21","job":"肉屋"},{"face_id":"c22","job":"百姓"},{"face_id":"c23","job":"伝道師"},{"face_id":"c24","job":"長老"},{"face_id":"c25","job":"良家の息子"},{"face_id":"c26","job":"楽器職人"},{"face_id":"c27","job":"牧人"},{"face_id":"c28","job":"読書家"},{"face_id":"c29","job":"記者"},{"face_id":"c30","job":"鳥使い"},{"face_id":"c31","job":"童話作家"},{"face_id":"c32","job":"双生児"},{"face_id":"c33","job":"双生児"},{"face_id":"c34","job":"靴磨き"},{"face_id":"c35","job":"親方"},{"face_id":"c36","job":"飾り職"},{"face_id":"c37","job":"奏者"},{"face_id":"c38","job":"歌い手"},{"face_id":"c39","job":"仕立て屋"},{"face_id":"c40","job":"執事"},{"face_id":"c41","job":"さすらい人"},{"face_id":"c42","job":"掃除夫"},{"face_id":"c43","job":"森番"},{"face_id":"c44","job":"小悪党"},{"face_id":"c45","job":"博徒"},{"face_id":"c46","job":"助手"},{"face_id":"c47","job":"流浪者"},{"face_id":"c48","job":"宝石収集家"},{"face_id":"c49","job":"石工"},{"face_id":"c50","job":"会計士"},{"face_id":"c51","job":"墓守"},{"face_id":"c52","job":"墓堀"},{"face_id":"c53","job":"大地主"},{"face_id":"c54","job":"理髪師"},{"face_id":"c55","job":"寡婦"},{"face_id":"c56","job":"酒屋"},{"face_id":"c57","job":"修道女"},{"face_id":"c58","job":"司祭"},{"face_id":"c59","job":"修道士"},{"face_id":"c60","job":"良家の末娘"},{"face_id":"c61","job":"釣り師"},{"face_id":"c62","job":"風来坊"},{"face_id":"c63","job":"漂白工"},{"face_id":"c64","job":"墓荒らし"},{"face_id":"c65","job":"始末屋"},{"face_id":"c66","job":"紅茶屋"},{"face_id":"c67","job":"店番"},{"face_id":"c68","job":"賭場の主"},{"face_id":"c69","job":"美術家"},{"face_id":"c70","job":"子守り"},{"face_id":"c71","job":"道案内"},{"face_id":"c72","job":"ランタン職人"},{"face_id":"c73","job":"水商売"},{"face_id":"c74","job":"踊り手"},{"face_id":"c75","job":"奏者"},{"face_id":"c76","job":"留守番"},{"face_id":"c77","job":"馬飼い"},{"face_id":"c78","job":"道化師"},{"face_id":"c79","job":"長老の孫"},{"face_id":"c80","job":"若者"},{"face_id":"c81","job":"薬屋"},{"face_id":"c82","job":"執事見習い"},{"face_id":"c83","job":"受付"},{"face_id":"c84","job":"妻"},{"face_id":"c85","job":"お使い"},{"face_id":"c86","job":"放蕩者"},{"face_id":"c87","job":"病人"},{"face_id":"c88","job":"料理人"},{"face_id":"c99","job":"厭世家"},{"job":"新妻","face_id":"c89"},{"job":"粉ひき","face_id":"c90"},{"job":"洗濯婦","face_id":"c91"},{"job":"洗濯婦","face_id":"c92"},{"job":"洗濯婦","face_id":"c93"},{"face_id":"c94","job":"女主人"},{"face_id":"c95","job":"新聞配達"},{"face_id":"c96","job":"学者"},{"job":"捜査官","face_id":"c97"},{"job":"探偵","face_id":"c98"},{"job":"徒弟","face_id":"c100"},{"job":"手伝い","face_id":"c101"},{"face_id":"c102","job":"指揮者"},{"face_id":"c103","job":"厭世家"},{"face_id":"c104","job":"負傷兵"},{"face_id":"c105","job":"教え子"},{"face_id":"c106","job":"魚屋"},{"face_id":"c107","job":"成金"},{"face_id":"c108","job":"採集人"},{"face_id":"c109","job":"村娘"},{"face_id":"c110","job":"ろくでなし"},{"face_id":"c111","job":"愛人"},{"face_id":"c112","job":"許婚"},{"face_id":"c113","job":"紐"},{"face_id":"c114","job":"革命家"},{"face_id":"c115","job":"廃品回収"},{"face_id":"c116","job":"逃亡者"},{"face_id":"c117","job":"宿屋"},{"face_id":"c118","job":"渡し船"},{"face_id":"c119","job":"信徒"},{"face_id":"c120","job":"庭師"},{"face_id":"c121","job":"農薬売"}]}

/***/ }),

/***/ 246:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"school","admin":"校内放送","maker":"校内放送","label":"私立七転学園"},"chr_npc":[{"label":"私立七転学園","csid":"school","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"華道部"},{"face_id":"c02","job":"校長"},{"face_id":"c03","job":"化学教師"},{"face_id":"c04","job":"ＳＯＳ団"},{"face_id":"c05","job":"留年生"},{"face_id":"c06","job":"保健体育教師"},{"face_id":"c07","job":"歴史教師"},{"face_id":"c08","job":"図書委員"},{"face_id":"c09","job":"動く銅像"},{"face_id":"c10","job":"ミーハー"},{"face_id":"c11","job":"優等生"},{"face_id":"c12","job":"用務員"},{"face_id":"c13","job":"生物教師"},{"face_id":"c14","job":"コーラス部"},{"face_id":"c15","job":"地理教師"},{"face_id":"c16","job":"食堂のおねいさん"},{"face_id":"c17","job":"演劇部顧問"},{"face_id":"c18","job":"数学教師"},{"face_id":"c19","job":"チアリーダー"},{"face_id":"c20","job":"理事長の孫"},{"face_id":"c21","job":"球部顧問"},{"face_id":"c22","job":"農業科"},{"face_id":"c23","job":"現国教師"},{"face_id":"c24","job":"理事長"},{"face_id":"c25","job":"校長の孫"},{"face_id":"c26","job":"吹奏楽部"},{"face_id":"c27","job":"手芸部"},{"face_id":"c28","job":"文芸部"},{"face_id":"c29","job":"新聞部"},{"face_id":"c30","job":"飼育委員"},{"face_id":"c31","job":"漫画研究部"},{"face_id":"c32","job":"演劇部"},{"face_id":"c33","job":"演劇部"},{"face_id":"c34","job":"球児"},{"face_id":"c35","job":"体育教師"},{"face_id":"c36","job":"美術部"},{"face_id":"c37","job":"音楽教師"},{"face_id":"c38","job":"軽音楽部"},{"face_id":"c39","job":"家政科教師"},{"face_id":"c40","job":"教頭先生"},{"face_id":"c41","job":"登山部"},{"face_id":"c42","job":"生徒会執行部"},{"face_id":"c43","job":"番長"},{"face_id":"c44","job":"問題児"},{"face_id":"c45","job":"スケバン"},{"face_id":"c46","job":"保険医"},{"face_id":"c47","job":"転校生"},{"face_id":"c48","job":"美術教師"},{"face_id":"c49","job":"技術教師"},{"face_id":"c50","job":"風紀委員"},{"face_id":"c51","job":"幽霊部員"},{"face_id":"c52","job":"映画研究会"},{"face_id":"c53","job":"寮管理人"},{"face_id":"c54","job":"野球部"},{"face_id":"c55","job":"肖像画"},{"face_id":"c56","job":"世界史教師"},{"face_id":"c57","job":"修士"},{"face_id":"c58","job":"名誉教授"},{"face_id":"c59","job":"修士"},{"face_id":"c60","job":"ラクロス部"},{"face_id":"c61","job":"魚拓部"},{"face_id":"c62","job":"守衛"},{"face_id":"c63","job":"マネージャー"},{"face_id":"c64","job":"格闘技同好会"},{"face_id":"c65","job":"教育実習"},{"face_id":"c66","job":"茶道部顧問"},{"face_id":"c67","job":"購買部"},{"face_id":"c68","job":"後援者"},{"face_id":"c69","job":"陶芸部"},{"face_id":"c70","job":"先輩"},{"face_id":"c71","job":"帰宅部"},{"face_id":"c72","job":"ヴィジュアル系バンド部"},{"face_id":"c73","job":"チアガール"},{"face_id":"c74","job":"社交ダンス部"},{"face_id":"c75","job":"演奏講師"},{"face_id":"c76","job":"委員長"},{"face_id":"c77","job":"いきもの係"},{"face_id":"c78","job":"演劇部"},{"face_id":"c79","job":"水泳部"},{"face_id":"c80","job":"陸上部"},{"face_id":"c81","job":"科学部"},{"face_id":"c82","job":"ガリ勉"},{"face_id":"c83","job":"放送部"},{"face_id":"c99","job":"不登校児"},{"face_id":"c86","job":"柔道部"},{"face_id":"c94","job":"PTA会長"},{"face_id":"c92","job":"テニス部"},{"face_id":"c90","job":"ラグビー部"},{"face_id":"c95","job":"人体模型"},{"face_id":"c97","job":"駐在さん"},{"face_id":"c100","job":"サッカー部"},{"face_id":"c106","job":"水泳部顧問"},{"face_id":"c89","job":"新任教師"},{"face_id":"c91","job":"緑のおばさん"},{"face_id":"c93","job":"書道部"},{"face_id":"c107","job":"前理事長"},{"face_id":"c85","job":"おてんば"},{"face_id":"c105","job":"弓道部"},{"face_id":"c96","job":"助教授"},{"face_id":"c98","job":"教授"},{"face_id":"c101","job":"園芸部"},{"face_id":"c104","job":"剣道部"},{"face_id":"c108","job":"無線部"},{"face_id":"c88","job":"栄養士"},{"face_id":"c84","job":"講師"},{"face_id":"c109","job":"占い研究会"},{"face_id":"c102","job":"前校長"},{"face_id":"c87","job":"天文部"},{"face_id":"c103","job":"オカルト同好会"}]}

/***/ }),

/***/ 247:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"sf","admin":"黒体放射のエヴェレット解釈","maker":"重ね合せ猫のユニタリ変換","label":"明後日への道標"},"chr_npc":[{"label":"明後日への道標","csid":"SF","face_id":"sf04","say_0":"とたたたたんっ。\n\n<b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b>","say_1":"ちゅー！\n\n　ちゅー！\n\n<b>がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……</b>"},{"label":"明後日への道標（ナユタ）","csid":"SF_sf10","face_id":"sf10","say_0":"f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n<b>同日\n整備日誌\n　定期点検。ただちに健康に影響はないが、擦過痕…</b>","say_1":"よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n<b>ぷつん</b>\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"}],"chr_job":[{"face_id":"sf01","job":"通信士"},{"face_id":"sf02","job":"哲学者"},{"face_id":"sf03","job":"道案内"},{"face_id":"sf04","job":"お散歩隊長"},{"face_id":"sf05","job":"新製品"},{"face_id":"sf06","job":"士官"},{"face_id":"sf07","job":"遊泳員"},{"face_id":"sf08","job":"服飾商"},{"face_id":"sf09","job":"研修生"},{"face_id":"sf10","job":"保安技師"},{"face_id":"sf11","job":"艇長"},{"face_id":"sf12","job":"廃神"},{"face_id":"sf13","job":"消防隊長"},{"face_id":"sf14","job":"対面販売"},{"face_id":"sf15","job":"忍者隊"},{"face_id":"sf16","job":"保険調査"},{"face_id":"sf17","job":"幽閉児"},{"face_id":"sf18","job":"感性子"},{"face_id":"sf19","job":"理性子"},{"face_id":"sf20","job":"測量士"},{"face_id":"sf021","job":"星間帆走"},{"face_id":"sf022","job":"鉱滓地区"},{"face_id":"sf023","job":"地下軌道"},{"face_id":"sf024","job":"光彩楽団"},{"face_id":"sf025","job":"救星隊"},{"face_id":"sf026","job":"星先案内"},{"face_id":"sf027","job":"鉱滓皇帝"},{"face_id":"sf028","job":"溶接技師"},{"face_id":"sf029","job":"機巧忍軍"},{"face_id":"sf030","job":"閉鎖管理"},{"face_id":"sf031","job":"意匠造形"},{"face_id":"sf032","job":"鉱滓地区"},{"face_id":"sf033","job":"重層培養"},{"face_id":"sf034","job":"華美人"},{"face_id":"sf035","job":"銀河ギャル"},{"face_id":"sf036","job":"好奇診"},{"face_id":"sf037","job":"執行隊"},{"face_id":"sf038","job":"複眼レフ"}]}

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"time","admin":"第四の壁の深奥","maker":"次元X式コンピューター","label":"エクスパンション・セット「帰還者議事」"},"chr_npc":[{"label":"エクスパンション・セット「帰還者議事」","csid":"time","face_id":"c10","say_0":"M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","say_1":"やっぱさ、銃を持った善人がいないとさ。<br><br>ちょっと出かけてくる！プリン食べちゃダメだよ！"}],"chr_job":[{"face_id":"c10","job":"小銃協会"},{"face_id":"t01","job":"友愛組合"},{"face_id":"t02","job":"幸運の科学"},{"face_id":"t03","job":"FSM団"},{"face_id":"t04","job":"截拳道"},{"face_id":"t05","job":"開放的市民"},{"face_id":"c09","job":"暗殺教団"},{"face_id":"t06","job":"死ね死ね団"},{"face_id":"t07","job":"勧善懲悪委"},{"face_id":"t08","job":"覆面嫉妬団"},{"face_id":"t09","job":"匿名軍団"},{"face_id":"t10","job":"営利政府"},{"face_id":"t11","job":"鷹の爪団"},{"face_id":"t12","job":"地下鉄道"},{"face_id":"t13","job":"MNU機関"},{"face_id":"t14","job":"猫の集会"},{"face_id":"t15","job":"少年探偵団"},{"face_id":"t16","job":"安全保障局"},{"face_id":"t17","job":"薔薇∴十字"},{"face_id":"t18","job":"白銀∴秘星"},{"face_id":"t19","job":"聖戦士募集"},{"face_id":"t20","job":"MI:18"},{"face_id":"t21","job":"九未知会"},{"face_id":"t22","job":"学園特警"},{"face_id":"t23","job":"孤高天使連合"},{"face_id":"t24","job":"トレーサー"},{"face_id":"t25","job":"2.14革命機構"},{"face_id":"t26","job":"法隆寺"},{"face_id":"t27","job":"硯友社"},{"face_id":"t28","job":"樫の樹の子ら"},{"face_id":"t29","job":"透明女子会"},{"face_id":"t30","job":"旅団✡肘笠雨"},{"face_id":"t31","job":"呵呵老会"},{"face_id":"t32","job":"安全調査局"},{"face_id":"t33","job":"亡命同盟"},{"face_id":"t34","job":"大銃協会"},{"face_id":"t35","job":"紅客連盟"},{"face_id":"t36","job":"PPP"},{"face_id":"t37","job":"素顔連盟"},{"face_id":"t38","job":"北後家蜘蛛会"},{"face_id":"t39","job":"黄金∴黎明"}]}

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"wa","admin":"闇の呟き","maker":"稲荷のお告げ","label":"和の国てやんでえ"},"chr_npc":[{"label":"和の国てやんでえ","csid":"wa","face_id":"w17","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"和の国てやんでえ（仁右衛門）","csid":"wa_w23","face_id":"w23","say_0":"なんと、これは奇っ怪……分かったゾ！","say_1":"やっぱり人狼は実在するんだヨ！　うっひょひょーい！"}],"chr_job":[{"face_id":"w01","job":"役者"},{"face_id":"w02","job":"浪人"},{"face_id":"w03","job":"忍者"},{"face_id":"w04","job":"町娘"},{"face_id":"w05","job":"飴師"},{"face_id":"w06","job":"巫女"},{"face_id":"w07","job":"双子"},{"face_id":"w08","job":"双子"},{"face_id":"w09","job":"宣教師"},{"face_id":"w10","job":"刺客"},{"face_id":"w11","job":"釣り師"},{"face_id":"w12","job":"女中"},{"face_id":"w13","job":"団子屋"},{"face_id":"w14","job":"手妻師"},{"face_id":"w15","job":"山姥"},{"face_id":"w16","job":"髪結い"},{"face_id":"w17","job":"病人"},{"face_id":"w18","job":"後妻"},{"face_id":"w20","job":"呉服問屋"},{"face_id":"w21","job":"うどん職人"},{"face_id":"w22","job":"そば職人"},{"face_id":"w23","job":"弁士"},{"face_id":"w24","job":"喧嘩屋"},{"face_id":"w25","job":"説法師"},{"face_id":"w26","job":"餓鬼大将"},{"face_id":"w27","job":"発明家"},{"face_id":"w28","job":"飛脚"},{"face_id":"w29","job":"琴弾き"},{"face_id":"w30","job":"宗主"},{"face_id":"w31","job":"子守り"},{"face_id":"w32","job":"落胤"},{"face_id":"w33","job":"船大工"},{"face_id":"w34","job":"野伏り"},{"face_id":"w35","job":"神主"},{"face_id":"w36","job":"楽士"},{"face_id":"w37","job":"薬売り"},{"face_id":"w38","job":"門下生"},{"face_id":"w39","job":"武家の娘"},{"face_id":"w40","job":"懐刀"},{"face_id":"w41","job":"物乞い"},{"face_id":"w43","job":"丁稚"},{"face_id":"w44","job":"機織り"},{"face_id":"w45","job":"座敷守"},{"face_id":"w46","job":"屍漁り"},{"face_id":"w47","job":"肥代取り"},{"face_id":"w48","job":"和算家"},{"_id":"w49","face_id":"w49","job":"抜荷"},{"face_id":"w50","job":"半の目"},{"face_id":"w51","job":"真剣師"},{"face_id":"w52","job":"看板娘"},{"face_id":"w53","job":"旅籠"}]}

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = {"editvilform":{"at":"around","cmd":"editvilform","btn":"村を編集する","change":"村の編集フォームを確認、修正します。","help":""},"muster":{"at":"prologue","cmd":"muster","btn":"点呼！","change":"全員を未発言状態にします。未発言者は１日そのまま発言がないと、自動退出します。","help":""},"update":{"at":"all","cmd":"update","btn":"更新！","change":"ただちに更新し、次の日を迎えます。お覚悟はよろしいですか？","help":""},"scrapvil":{"at":"all","cmd":"scrapvil","btn":"廃村！","change":"ただちに村を廃村にします。廃村になった村はエピローグになります。","help":""},"exit":{"at":"prologue","cmd":"exit","btn":"退出…","change":"村を立ち去ります。","help":""},"commit":{"at":"progress","cmd":"commit","sw":"時間を進める","pass":"（時間を進めない）","change":"時間を進めるかどうか、選択してください。","help":"全員が「時間を進める」を選ぶと前倒しで更新されます。\n最低一発言して確定しないと、時間を進める事ができません。"},"night":{"at":"main","sw":"夜遊びする","pass":"（夜遊びしない）","change":"夜遊びをして、深夜の囁きを聞いてしまうかどうか、選択してください。","help":"あなたは二日目以降、夜に出歩くことができます。\n人狼の囁き、民の念話、共鳴者の共鳴を誰のものとも判別せず聞いちゃうので、朝になって昨日を振り返ると思い出せることでしょう。\n顔や名前はわかりませんが。\nただしこのとき、もしあなたが人狼の、誰かひとりにでも襲撃される矛先に含まれていると、恐怖のあまり、実際に襲われる犠牲者とは別に死んでしまいます。\nこの死亡を護衛する方法はありません。また、息を引き取るあなたを尻目に、狼達は別の人物を襲撃するでしょう。"},"dish":{"at":"progress","sw":"跳ねる","pass":"（跳ねない）","change":"跳ねるアピールをするかどうか、選択してください。","help":"美味しく食べて貰うことを悦びとし、活き活きと跳ねることができます。わたしをたべて、わたしをたべて、とアピールしましょう。"},"cling":{"at":"main","sw":"飲薬する","pass":"（飲薬しない）","change":"あなたが殺害されたとしたら、犯人を道連れにするかどうか、選択してください。","help":"薬を服用した夜、もし処刑以外の要因で命を落とした場合、その犯人を道連れにします。人狼の襲撃の場合、襲撃実行者が対象となります。"},"guru":{"for":"live","at":"progress","targets":"誘う","pass":"（パス）","change":"誘い込む犠牲者を選択してください。","help":"毎晩ふたりずつ、好きな人物をひそかに誘い込むことができます。自分自身を誘うことはできません。\n誘い込まれた当人たちは夜な夜な踊り明かし、そのことを覚えています。しかし、彼らの能力や所属陣営などに変化はありません。"},"bitch":{"for":"live","at":"start","targets":"遊ぶ","change":"絆を結ぶ相手と、弄ぶ遊び相手を選択してください。","help":"一日目、一人目に選択した人物を本命の恋人として“運命の絆”を結びつけ、二人目は絆を結ぶふりをして手玉にとります。\n“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。もう一人はどうでもよいのですが、そう思わせないこまめなケアが大切です。"},"bonds":{"for":"live","at":"start","targets":"結ぶ","change":"絆で結ぶ二人を選択してください。","help":"一日目、好きな二人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。"},"bond":{"for":"live","at":"start","target":"結ぶ","change":"あなたとの絆を結ぶ相手を選択してください。","help":"一日目、あなたから好きな人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ相手が死亡すると、あなたは後を追って死亡します。"},"guard":{"for":"live","at":"main","target":"守る","pass":"（パス）","change":"守護する対象を選択してください。","help":"一人を狼の襲撃、もしくは付け狙う賞金稼の手から守ることが出来ます。\n自分自身を守ることは出来ません。"},"see":{"for":"live","at":"progress","target":"占う","pass":"（パス）","change":"正体を知りたい相手を選択してください。","help":"ひとりを占い対象に指定します。"},"sneak":{"for":"live","at":"progress","target":"狙う","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"hunt":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"人狼全員で多数決をし、一人だけ殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"kill":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"cure":{"for":"live","at":"main","target":"診察","pass":"（パス）","change":"診察する相手を選択してください。","help":"ひとりを診察し、人狼の牙に感染しているかを確認します。その場合は治療します。治療した人は生存者として数えますが、能力は取り戻しません。"},"tangle":{"for":"dead","at":"progress","target":"憑依","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"死者の埋葬地をうろつきまわっています。\n指定した故人の役職と勝利条件を写しとり、対象を蘇生させます。\nこのため、あなたは死亡しなくては、勝利がありません。"},"analeptic":{"for":"dead","at":"progress","require":"role1","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"死者に投薬して蘇生させます。\n蘇生は一度だけおこなうことができ、それっきり薬は失われます。"},"poison":{"for":"live","at":"progress","require":"role2","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"生きている者に投薬して毒殺します。\n毒殺は一度ずつだけおこなうことができ、それっきり薬は失われます。"},"scapegoat":{"for":"live","at":"main","target":"疑う","pass":"（パス）","change":"あなたが最後になったとしたら、指差す相手を選択してください。","help":"もし投票数が同数になり処刑する相手が定まらないと、混乱した村人達に処刑されてしまいます。\nあなたが最後に指差した人は、後悔する村人達に翌日、処刑されるでしょう。皆、そうするより他にないのです。"},"hike":{"for":"cast","at":"progress","target":"外出する","pass":"（パス）","change":"会いに行く相手を選択してください。","help":"特殊な能力があるかどうか自覚していません。夜は積極的に外出して、様子をさぐりましょう。"},"vote":{"for":"live","at":"main","cmd":"vote","target":"投票","pass":"（委任する）","change":"処刑する相手を選択してください。","help":"全員で多数決をし、一人だけ処刑します。"},"vote_role":{"for":"live","at":"main","target":"投票","pass":"（パス）","change":"処刑する相手を選択してください。","help":""},"entrust":{"for":"live","at":"main","cmd":"vote","target":"委任","pass":"（投票する）","change":"処刑を棄権し、一票を委ねる相手を選択してください。","help":"投票は棄権し、他人の投票と同じとすることができます。"},"jammer":{"for":"live","at":"progress","target":"邪魔","pass":"（パス）","change":"占いから保護する相手を選択してください。","help":"毎夜、一人をあらゆる占いから包み隠すことができます。\n自分自身を隠すことはできません。"},"snatch":{"for":"live","at":"progress","target":"換わる","pass":"（パス）","change":"顔と名前を簒奪する相手を選択してください。","help":"好きな人物の顔と名前を奪い、自身のそれと入れ替えることができます。この能力は非常に露顕しやすいので、行使には注意が必要です。\nもしも夜の間に屍体になった人を対象に選んだなら、旧いあなたは命を落とし、あなたとなったその屍体は息を吹き返すでしょう。\nまた、結ばれた絆や、笛吹きに誘われたことは姿とともにあり、姿を移し替えたときに引き継ぐことがあります。\n一度移し替えた姿は、永遠にあなたのものです。二度と元には戻りません。"},"gm_droop":{"for":"gm_live","at":"all","cmd":"gamemaster","target":"すぐに墓下へ","pass":"―――","change":"参加者として死なせる相手を選択してください。","help":""},"gm_live":{"for":"gm_dead","at":"all","cmd":"gamemaster","target":"すぐに表舞台へ","pass":"―――","change":"参加者として蘇生させる相手を選択してください。","help":""},"gm_disable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票から保護する","pass":"―――","change":"投票対象に選ぶことを認めない相手を選択してください。","help":""},"gm_enable_vote":{"for":"live","at":"all","cmd":"gamemaster","target":"投票を認可する","pass":"―――","change":"投票対象に選ぶこと許可する相手を選択してください。","help":""},"maker":{"for":"all","at":"all","cmd":"maker","target":"村を任せる","pass":"―――","change":"村の管理を任せる相手を選択してください。","help":""},"kick":{"for":"all","at":"prologue","cmd":"kick","target":"退去！","pass":"―――","change":"退去いただこう、かな…、と思った相手を選択してください。","help":""},"blind":{"help":"（サーバーは、この役職を保有していることを本人に通知しません。）"},"wolf":{"help":"あなたは人狼と判定されます。"},"pixi":{"help":"占いの対象となると死亡します。勝利判定では人間にも人狼にも数えられません。"},"human":{"help":"勝利判定では人間として数えられます。"},"evil":{"help":"人間でありながら、人外に協力する裏切り者です。場合によっては敢えて死ぬ必要があります。"},"circular":{"help":"この贈り物は、次に渡す相手を選び渡すことになっています。\n将来もしふたたびあなたの手に渡ったら、贈り物は消え去ってしまいます。"},"friend":{"help":"仲間に向けては能力を使いません。"},"once":{"help":"能力を持ちますが、その能力はたった一度しか使うことができません。"},"hate":{"help":"絆の運命は悲しい殺し合いを強いるでしょう。彼らは本来の勝利条件ではなく、ただ一人生き残ることが勝利条件となります。"},"love":{"help":"絆の運命は彼らを、愛で固く結ぶでしょう。彼らは本来の勝利条件ではなく、共存が勝利条件となります。"},"droop":{"help":"あなたは、生きた人狼の人数の二日後に、命を落とします。"},"curse":{"help":"あなたを占ってしまった占い師は死亡します。"},"aura":{"help":"あなたはオーラを持ちます。"},"rob":{"help":"誰もならなかった残り役職をすべて知ります。\n次の夜、その中から運命の導くままひとつの役職を選び、仮面の役職に成り代わるでしょう。\n運命は、あなたになにを課すでしょうか？"},"grave":{"help":"命を落とすと、能力を発揮することができます。"},"armor":{"help":"狼の襲撃や賞金稼の手により殺されることはありません。"},"medium":{"help":"処刑や突然死で死んだ全員を対象にします。\n無惨な死体について判断することは出来ません。"},"spy_role":{"help":"その人が持つ役職がわかります。恩恵は、役職とは別個のものです。このため半端者、悪鬼、妖精の子を直接見分けることはできません。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_win":{"help":"その人が持つ陣営（勝利条件）がわかります。多くは役職を思わせるものです。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_aura":{"help":"その人が能力を持つか判別出来ます。あなたにとって、村人、人狼、白狼は能力のオーラを持ちませんが、そうでない人物は能力のオーラを纏っていると感じられます。"},"spy_wolf":{"help":"その人が人間か人狼か判別できます。ただし狼血族は人狼と誤認し、白狼は人間と誤認してしまいます。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"stigma":{"help":"独特の印を持つため、あなたの正体は比較的信用されやすいでしょう。"},"fm":{"help":"結社員・共鳴者が誰なのか知っています。"},"fanatic":{"help":"人狼にはあなたの正体はわかりませんが、あなたは人狼が誰か知っています。また、新たに人狼となったものを知ることもできます。\nですが、あなたは狼血族や擬狼妖精も人狼であると誤認してしまいますし、一匹狼の正体を知ることはできません。"},"tafness":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると傷を負うものの、一日だけ生き長らえます。"},"hurt":{"label":"負傷","help":""},"sheep":{"help":"踊り狂ったおぼろげな記憶がある。"},"infected":{"label":"感染","help":""},"hide_for_vote":{"hide":["vote"],"label":"投票対象外","help":""},"hide_for_role":{"hide":["role"],"label":"能力対象外","help":""},"hide_for_gift":{"hide":["gift"],"label":"恩恵対象外","help":""},"disable_vote":{"disable":["vote"],"label":"<s>投票</s>","help":""},"disable_special":{"disable":["gift","role"],"label":"<s>全能力</s>","help":"あなたはもう特殊能力を使うことができません。"},"disable_gift":{"disable":["gift"],"label":"<s>恩恵</s>","help":"あなたはもう恩恵能力を使うことができません。"},"disable_role":{"disable":["role"],"label":"<s>能力</s>","help":"あなたはもう役職能力を使うことができません。"},"disable_poison":{"disable":["poison"],"label":"<s>毒薬</s>","help":"あなたはもう毒薬を使うことができません。"},"disable_analeptic":{"disable":["analeptic"],"label":"<s>蘇生薬</s>","help":"あなたはもう蘇生薬を使うことができません。"},"twolife":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされても、一度だけは命が助かります。"},"august":{"help":"あなたが処刑されることに決まると一度だけは、その処刑はとりやめになります。"},"revenge":{"help":"どんな理由であれ、あなたが命を落とすと、その夜のうちに能力を発揮します。"},"seal":{"help":"ひとりの犯人が特定できるのであれば、犯人はいっさいの能力を行使できなくなります。"},"grudge":{"help":"あなたが命を落とした翌日、人狼は二つの襲撃をおこない、二人を一度に殺害します。"},"riot":{"help":"あなたが死亡した翌日は、村人達が暴力的に二つの投票をおこない、二人を一度に処刑します。"},"wolfify":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると、あなたは人狼になります。"},"chkGSAY":{"help":"顔や名前はわかりませんが、あなたの耳には死者の声が届いちゃうことでしょう。"},"ENTRY":{"cmd":"entry","text":["talk"],"label":"導入","help":"キャラクターを選択し、エントリーしましょう。"},"MAKER":{"cmd":"write","text":["talk","memo","act"],"label":"村立て話","help":"あなたは村立て人です。"},"ADMIN":{"cmd":"write","text":["talk","memo","act"],"label":"管理者話","help":"あなたは管理人です。"},"SPSAY":{"cmd":"write","text":["talk","memo"],"label":"共鳴","help":"あなたは、共鳴者同士にしか聞こえない会話が可能です。"},"WSAY":{"cmd":"write","text":["talk","memo"],"label":"囁き","help":"あなたは、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話が可能です。"},"XSAY":{"cmd":"write","text":["talk","memo"],"label":"念話","help":"あなたは、念波星でしか聞こえない会話が可能です。"},"GSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":"あなたは、死者にしか聞こえない会話が可能です。"},"MSAY":{"cmd":"write","text":["talk","memo"],"label":"口借り","help":"あなたは<b>_NPC_</b>の口を借り、好きな言葉を伝えることができます。"},"AIM":{"for":"near","cmd":"write","text":["talk","memo"],"label":"内緒話","help":null},"TSAY":{"cmd":"write","text":["talk","memo"],"label":"独り言","help":null},"SSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VGSAY":{"cmd":"write","text":["talk","memo","act"],"label":"会話","help":null}}

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

module.exports = {"select-role":{"label":"役職希望","help":"役職希望を受け付ける"},"random-target":{"label":"ランダム","help":"投票・能力の対象に「ランダム」を含める"},"seq-event":{"label":"整列事件","help":"事件が順序どおりに発生する"},"show-id":{"label":"ID公開","help":"ユーザーIDを公開する"},"entrust":{"label":"委任投票","help":"委任投票をする"},"undead-talk":{"label":"死後の会話","help":"狼・妖精と死者との間で、会話ができる"},"aiming-talk":{"label":"内緒話","help":"ふたりだけの内緒話をすることができる"}}

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

module.exports = {"51":{"label":"?51?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"57":{"label":"?57?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"dyingpossess":{"label":"衰退狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":""},"aurawolf":{"label":"気狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_aura","vote","entrust","WSAY"],"cmd":"role","help":""},"nothing":{"label":"普通の日","win":null,"group":"EVENT","able_ids":[],"help":""},"aprilfool":{"label":"四月馬鹿","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfink":{"label":"二重スパイ","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfairy":{"label":"妖精の輪","win":null,"group":"EVENT","able_ids":[],"help":""},"eclipse":{"label":"日蝕","win":null,"group":"EVENT","able_ids":[],"help":""},"cointoss":{"label":"Sir Cointoss","win":null,"group":"EVENT","able_ids":[],"help":""},"force":{"label":"影響力","win":null,"group":"EVENT","able_ids":[],"help":""},"miracle":{"label":"奇跡","win":null,"group":"EVENT","able_ids":[],"help":""},"prophecy":{"label":"聖者のお告げ","win":null,"group":"EVENT","able_ids":[],"help":""},"clamor":{"label":"不満","win":null,"group":"EVENT","able_ids":[],"help":""},"fire":{"label":"熱意","win":null,"group":"EVENT","able_ids":[],"help":""},"nightmare":{"label":"悪夢","win":null,"group":"EVENT","able_ids":[],"help":""},"ghost":{"label":"亡霊","win":null,"group":"EVENT","able_ids":[],"help":""},"escape":{"label":"逃亡","win":null,"group":"EVENT","able_ids":[],"help":""},"seance":{"label":"降霊会","win":null,"group":"EVENT","able_ids":[],"help":""},"entry":{"label":"エントリー","win":null,"group":"TURN","able_ids":["ENTRY"],"help":""},"start":{"label":"初日","win":null,"group":"TURN","able_ids":[],"help":""},"main":{"label":"二日目以降","win":null,"group":"TURN","able_ids":[],"help":""},"prologue":{"label":"プロローグ","win":"NONE","group":"TURN","able_ids":["exit"],"help":""},"epilogue":{"label":"エピローグ","win":null,"group":"TURN","able_ids":[],"help":""},"live":{"label":"生存者","win":null,"group":"LIVE","able_ids":["SSAY","TSAY","AIM","commit"],"help":""},"executed":{"label":"処刑","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"victim":{"label":"襲撃","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"cursed":{"label":"呪詛","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"droop":{"label":"衰退","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suicide":{"label":"後追","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"feared":{"label":"恐怖","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suddendead":{"label":"突然死","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"leave":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"none":{"label":"","win":null,"group":null,"able_ids":[],"help":""},"bind":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"hide":{"label":"？？？","win":null,"group":null,"able_ids":["hike","vote","entrust"],"help":"あなたは正体不明です。"},"mob":{"label":"見物人","win":"MOB","group":null,"able_ids":[],"help":"見物人全般のための仮想役職です。"},"visiter":{"label":"客席","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は客席同士のみ"},"grave":{"label":"裏方","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は墓下と"},"alive":{"label":"舞台","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と"},"juror":{"label":"陪審","win":"HUMAN","group":"MOB","able_ids":["VSAY","TSAY","vote","entrust"],"help":"進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"},"gamemaster":{"label":"黒幕","win":"MOB","group":"MOB","able_ids":["gm_droop","gm_live","gm_disable_vote","gm_enable_vote","VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"},"master":{"label":"村立て人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","MAKER"]},"admin":{"label":"管理人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","scrapvil","ADMIN"]},"lost":{"label":"喪失","win":null,"group":"OTHER","able_ids":[],"cmd":"gift","help":"あなたは贈り物を<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_LOST\" TARGET=\"_blank\">喪失</A>しました。 もう二度と手にすることはないでしょう。もしまたあなたの手に贈り物があっても、消え去ってしまいます。そして、あなたがそれに気付くことはないでしょう。"},"shield":{"label":"光の輪","win":null,"group":"OTHER","able_ids":["circular","guard"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SHIELD\" TARGET=\"_blank\">光の輪</A>が取り巻きます。 あなたはもし昨夜、襲撃されていたとしても守られました。 光の輪はひとりを一度しか守りません。"},"glass":{"label":"魔鏡","win":null,"group":"OTHER","able_ids":["circular","see"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_GLASS\" TARGET=\"_blank\">魔鏡</A>が照らします。 あなたは、魔鏡を渡す相手を占います。 魔鏡はひとりを一度しか照らしません。"},"ogre":{"label":"悪鬼","win":"WOLF","group":"WOLF","able_ids":["wolf","hunt","friend","WSAY"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_OGRE\" TARGET=\"_blank\">悪鬼</A>です。 表向きは他の役目を帯びていますが、あなたは人を襲う悪い鬼なのです。"},"fairy":{"label":"妖精の子","win":"PIXI","group":"PIXI","able_ids":["pixi"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FAIRY\" TARGET=\"_blank\">妖精から生まれた子</A>です。 表向きは他の役目を帯びていますが、あなたは人ならぬ存在なのです。 占い師、霊能者にどう判別されるかは、もともとの役職によります。"},"fink":{"label":"半端者","win":"EVIL","group":"EVIL","able_ids":["evil"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FINK\" TARGET=\"_blank\">半端者</A>です。 表向きは他の役目を帯びていますが、あなたは人ともつかぬ、人狼ともつかぬ、半端な正体を隠しています。"},"decide":{"label":"決定者","win":null,"group":"OTHER","able":"投票","able_ids":["vote_role"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DECIDE\" TARGET=\"_blank\">決定者</A>です。 あなたは追加票を投じる権利を持ちつづけます。行使することで、健在を示すこともできるでしょう。"},"seeronce":{"label":"夢占師","win":null,"group":"OTHER","able":"占う","able_ids":["once","see","spy_wolf"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SEERONCE\" TARGET=\"_blank\">夢占師</A>です。"},"dipsy":{"label":"酔払い","win":null,"group":"OTHER","able_ids":null,"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DIPSY\" TARGET=\"_blank\">酔払い</A>です。 あなたが人外もしくは村人に相対するものであれば、自分の役割を見失うことはありません。 また、光の輪や魔鏡といった贈り物を受け取った場合、酔いが醒めることでしょう。"},"lover":{"label":"弟子","win":null,"group":"OTHER","able":"入門","able_ids":["aura","bond","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVER\" TARGET=\"_blank\">弟子</A>です。 好きな人物を師匠として選び、弟子入りします。次の朝、あなたは頭角をあらわし、絆の師匠と同じ役職になっています。"},"robber":{"label":"盗賊","win":null,"group":"OTHER","able_ids":["aura","rob","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ROBBER\" TARGET=\"_blank\">盗賊</A>です。"},"tangle":{"label":"怨念","win":null,"group":"OTHER","able_ids":["aura","revenge","tangle","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TANGLE\" TARGET=\"_blank\">怨念</A>です。"},"villager":{"label":"村人","win":"HUMAN","group":"HUMAN","able_ids":["human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。"},"stigma":{"label":"聖痕者","win":"HUMAN","group":"HUMAN","able_ids":["aura","stigma","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_STIGMA\" TARGET=\"_blank\">聖痕者</A>です。"},"fm":{"label":"結社員","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FM\" TARGET=\"_blank\">結社員</A>です。 独自の人脈を持つ秘密結社の一員です。"},"sympathy":{"label":"共鳴者","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust","SPSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SYMPATHY\" TARGET=\"_blank\">共鳴者</A>です。"},"seer":{"label":"占い師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEER\" TARGET=\"_blank\">占い師</A>です。"},"seerwin":{"label":"信仰占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERWIN\" TARGET=\"_blank\">信仰占師</A>です。"},"aura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"oura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"seerrole":{"label":"賢者","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERROLE\" TARGET=\"_blank\">賢者</A>です。"},"guard":{"label":"守護者","win":"HUMAN","group":"HUMAN","able_ids":["aura","guard","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GUARD\" TARGET=\"_blank\">守護者</A>です。"},"medium":{"label":"霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUM\" TARGET=\"_blank\">霊能者</A>です。"},"mediumwin":{"label":"信仰霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMWIN\" TARGET=\"_blank\">信仰霊能者</A>です。"},"mediumrole":{"label":"導師","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMROLE\" TARGET=\"_blank\">導師</A>です。"},"necromancer":{"label":"降霊者","win":"HUMAN","group":"HUMAN","able_ids":["aura","chkGSAY","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_NECROMANCER\" TARGET=\"_blank\">降霊者</A>です。"},"follow":{"label":"追従者","win":"HUMAN","group":"HUMAN","able_ids":["aura","human","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FOLLOW\" TARGET=\"_blank\">追従者</A>です。 だれかを信じ、委ねましょう。"},"fan":{"label":"煽動者","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","riot","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FAN\" TARGET=\"_blank\">煽動者</A>です。"},"hunter":{"label":"賞金稼","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","sneak","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HUNTER\" TARGET=\"_blank\">賞金稼</A>です。 毎夜、一人を付け狙います。"},"weredog":{"label":"人犬","win":"HUMAN","group":"HUMAN","able_ids":["aura","tafness","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WEREDOG\" TARGET=\"_blank\">人犬</A>です。"},"prince":{"label":"王子様","win":"HUMAN","group":"HUMAN","able_ids":["aura","august","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PRINCE\" TARGET=\"_blank\">王子様</A>です。"},"rightwolf":{"label":"狼血族","win":"HUMAN","group":"HUMAN","able_ids":["aura","blind","wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。\n狼血族のあなたは、占い師、霊能者に人狼と判定されます。ですが、あなたは村人で、勝利条件も変わりません。 勝利を目指して頑張りましょう。占われると、正体を自覚し表示が増えます。"},"doctor":{"label":"医師","win":"HUMAN","group":"HUMAN","able":"診察","able_ids":["aura","cure","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DOCTOR\" TARGET=\"_blank\">医師</A>です。"},"curse":{"label":"呪人","win":"HUMAN","group":"HUMAN","able_ids":["aura","curse","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSE\" TARGET=\"_blank\">呪人</A>です。"},"dying":{"label":"預言者","win":"HUMAN","group":"HUMAN","able_ids":["aura","droop","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYING\" TARGET=\"_blank\">預言者</A>です。"},"invalid":{"label":"病人","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INVALID\" TARGET=\"_blank\">病人</A>です。 あなたが命を落としたとき、犯人は病気に感染します。"},"alchemist":{"label":"錬金術師","win":"HUMAN","group":"HUMAN","able_ids":["aura","once","revenge","cling","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ALCHEMIST\" TARGET=\"_blank\">錬金術師</A>です。 あなたは一度だけ、薬を飲むことが出来ます。"},"witch":{"label":"魔女","win":"HUMAN","group":"HUMAN","able_ids":["aura","analeptic","poison","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WITCH\" TARGET=\"_blank\">魔女</A>です。 あなたは二日目に、毒薬と蘇生薬をひとつずつ完成させます。"},"girl":{"label":"少女","win":"HUMAN","group":"HUMAN","able_ids":["aura","night","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GIRL\" TARGET=\"_blank\">少女</A>です。"},"scapegoat":{"label":"生贄","win":"HUMAN","group":"HUMAN","able":"疑う","able_ids":["aura","scapegoat","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SCAPEGOAT\" TARGET=\"_blank\">生贄</A>です。"},"elder":{"label":"長老","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","twolife","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ELDER\" TARGET=\"_blank\">長老</A>です。 もしも命を落としたら、あなたの恨みは犯人を襲います。"},"jammer":{"label":"邪魔之民","win":"EVIL","group":"EVIL","able":"隠す","able_ids":["aura","jammer","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_JAMMER\" TARGET=\"_blank\">邪魔之民</A>です。"},"snatch":{"label":"宿借之民","win":"EVIL","group":"EVIL","able_ids":["aura","snatch","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SNATCH\" TARGET=\"_blank\">宿借之民</A>です。"},"bat":{"label":"念波之民","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">念波之民</A>です。"},"possess":{"label":"狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_POSSESS\" TARGET=\"_blank\">狂人</A>です。"},"fanatic":{"label":"狂信者","win":"EVIL","group":"EVIL","able_ids":["aura","fanatic","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FANATIC\" TARGET=\"_blank\">狂信者</A>です。"},"muppeting":{"label":"人形使い","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","MSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MUPPETER\" TARGET=\"_blank\">人形使い</A>です。"},"wisper":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"cpossess":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"semiwolf":{"label":"半狼","win":"EVIL","group":"EVIL","able_ids":["aura","wolfify","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEMIWOLF\" TARGET=\"_blank\">半狼</A>です。"},"oracle":{"label":"魔神官","win":"EVIL","group":"EVIL","able_ids":["aura","medium","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ORACLE\" TARGET=\"_blank\">魔神官</A>です。"},"sorcerer":{"label":"魔術師","win":"EVIL","group":"EVIL","able_ids":["aura","see","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SORCERER\" TARGET=\"_blank\">魔術師</A>です。"},"walpurgis":{"label":"魔法少年","win":"EVIL","group":"EVIL","able_ids":["aura","grave","analeptic","poison","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WALPURGIS\" TARGET=\"_blank\">魔法少年</A>です。 やがて命を落とすと魔女になると宿命付けられています。"},"headless":{"label":"首無騎士","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HEADLESS\" TARGET=\"_blank\">首のない騎士</A>です。 あなたは人狼仲間を斬り捨てることも厭いません。"},"wolf":{"label":"人狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WOLF\" TARGET=\"_blank\">人狼</A>です。"},"intwolf":{"label":"智狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_role","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INTWOLF\" TARGET=\"_blank\">智狼</A>です。特殊な能力を持つ人狼です。"},"cwolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"cursewolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"whitewolf":{"label":"白狼","win":"WOLF","group":"WOLF","able":"襲う","able_ids":["hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WHITEWOLF\" TARGET=\"_blank\">白狼</A>です。特殊な能力を持つ人狼です。 あなたを占った占い師は、あなたを人間とみなします。あなたは能力者特有のオーラを発しません。"},"childwolf":{"label":"仔狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","revenge","grudge","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CHILDWOLF\" TARGET=\"_blank\">仔狼</A>です。特殊な能力を持つ人狼です。"},"dyingwolf":{"label":"衰狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","droop","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGWOLF\" TARGET=\"_blank\">衰狼</A>です。特殊な能力を持つ人狼です。"},"silentwolf":{"label":"黙狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SILENTWOLF\" TARGET=\"_blank\">黙狼</A>です。 人狼の襲撃対象となることはありませんが、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話は、あなたには聞こえません。"},"hamster":{"label":"栗鼠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PIXI\" TARGET=\"_blank\">栗鼠妖精</A>です。"},"werebat":{"label":"蝙蝠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">蝙蝠妖精</A>です。 あなたは他の妖精が誰であるか知っていますし、新たに生まれた妖精を知ることもできます。ただし、姿を換えてしまった宿借妖精の行方はわかりません。 また、蝙蝠妖精同士にしか聞こえない会話が可能です。"},"mimicry":{"label":"擬狼妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MIMICRY\" TARGET=\"_blank\">擬狼妖精</A>です。"},"dyingpixi":{"label":"風花妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","droop","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGPIXI\" TARGET=\"_blank\">風花妖精</A>です。"},"trickster":{"label":"悪戯妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","bonds","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TRICKSTER\" TARGET=\"_blank\">悪戯妖精</A>です。 結ばれた人たちにとっては、単なるはた迷惑な悪戯にすぎません。"},"hatedevil":{"label":"邪気悪魔","win":"HATER","group":"OTHER","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">邪気悪魔</A>です。 結びつけた二人のうち、どちらか片方だけが生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"hate":{"label":"宿敵","win":"HATER","group":"BIND","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">宿敵</A>がいます。"},"love":{"label":"恋人","win":"LOVER","group":"BIND","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋人</A>がいます。"},"loveangel":{"label":"恋愛天使","win":"LOVER","group":"OTHER","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋愛天使</A>です。 結びつけた二人が生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"passion":{"label":"片思い","win":"LOVER","group":"OTHER","able_ids":["aura","bond","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PASSION\" TARGET=\"_blank\">片想い</A>です。 選んだ人が生き延び、あなたが生き延びれば、あなたの勝利となります。"},"lonewolf":{"label":"一匹狼","win":"LONEWOLF","group":"WOLF","able_ids":["aura","wolf","armor","kill","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LONEWOLF\" TARGET=\"_blank\">一匹狼</A>です。 襲撃先はあなた以外であれば誰でもかまいません。"},"guru":{"label":"笛吹き","win":"GURU","group":"OTHER","able_ids":["aura","human","guru","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GURU\" TARGET=\"_blank\">笛吹き</A>です。"},"dish":{"label":"鱗魚人","win":"DISH","group":"OTHER","able_ids":["aura","human","dish","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DISH\" TARGET=\"_blank\">鱗魚人</A>です。新鮮なふぃーっしゅ。です。"},"bitch":{"label":"遊び人","win":"LOVER","group":"OTHER","able_ids":["aura","human","bitch","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BITCH\" TARGET=\"_blank\">遊び人</A>です。 本命とあなたが生き延びれば、あなたの勝利です。"}}

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

module.exports = {"sow":{"CAPTION":"人狼議事","disabled":true},"say5":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10},"point":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999},"count":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0},"lobby":{"CAPTION":"ロビー","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"say1":{"CAPTION":"静寂への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":1,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x1回/1act'","MAX_MESCNT":300},"say5x200":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 200字x5回/5act'","MAX_MESCNT":200},"say5x300":{"CAPTION":"小論文への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x5回/15act'","MAX_MESCNT":300},"saving":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"節約","HELP":"250字x20回/15act","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":10,"MAX_SPSAY":10,"MAX_WSAY":30,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":15,"MAX_MESCNT":250,"MAX_MESLINE":10},"wbbs":{"COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"人狼BBS","HELP":"200字x20回","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":5,"MAX_SPSAY":20,"MAX_WSAY":40,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":0,"MAX_MESCNT":200,"MAX_MESLINE":5},"euro":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"欧州","HELP":"（24h回復） 800字x30回/30act","RECOVERY":1,"MAX_SAY":30,"MAX_TSAY":999,"MAX_SPSAY":999,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":30,"MAX_ESAY":999,"MAX_SAY_ACT":30,"MAX_MESCNT":800,"MAX_MESLINE":20},"tiny":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"たりない","HELP":"（24h回復）（メモは20pt） 333pt/9act","RECOVERY":1,"MAX_SAY":333,"MAX_TSAY":999,"MAX_SPSAY":333,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":999,"MAX_SAY_ACT":9,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":300,"MAX_MESLINE":10},"weak":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 777pt/15act","RECOVERY":1,"MAX_SAY":777,"MAX_TSAY":777,"MAX_SPSAY":777,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 1200pt/24act","RECOVERY":1,"MAX_SAY":1200,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"weak_braid":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 600pt++100pt/15act","RECOVERY":1,"MAX_SAY":600,"MAX_TSAY":600,"MAX_SPSAY":600,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":100,"MAX_ADDSAY":2,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 800pt++200pt/24act","RECOVERY":1,"MAX_SAY":800,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":200,"MAX_ADDSAY":2,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity_braid":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20}}

/***/ }),

/***/ 254:
/***/ (function(module, exports) {

module.exports = {"blank":{"label":"普通の日","help":""},"nothing":{"label":"普通の日","cmd":"trap","help":"今日は、特別なことのない一日のようだ。さあ普段通り、誰かを処刑台にかけよう。"},"aprilfool":{"label":"四月馬鹿","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_APRIL_FOOL\" TARGET=\"_blank\">四月馬鹿</A></b>\n<br>\n大変、大変、大変なことになった。きみの役職は変化しているかもしれない。もしも誰かと絆を結んでいるなら、急に相手が憎くなってしまい、絆の相手だけにしか投票できない。\nそして悟ってしまった。今夜だけは、相方の後を追うことはないと……。\n<br>\n<table class=\"table\">\n<tr>\n<th colspan=3>役職の変貌\n<th rowspan=4>※一日で元に戻る\n<tr>\n<td>賢者\n<td>←→\n<td>魔女\n<tr>\n<td>守護者\n<td>←→\n<td>長老\n<tr>\n<td>賞金稼\n<td>←→\n<td>少女\n</table>"},"turnfink":{"label":"二重スパイ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FINK\" TARGET=\"_blank\">二重スパイ</A></b>\n<br>\nなんということだろう！一人が村側を裏切り、狼に与する半端者になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"turnfairy":{"label":"妖精の輪","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FAIRY\" TARGET=\"_blank\">妖精の輪</A></b>\n<br>\nなんということだろう！一人が森に立ち入り、妖精の養子になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"eclipse":{"label":"日蝕","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_ECLIPSE\" TARGET=\"_blank\">日蝕</A></b>\n<br>\n暗い日蝕が村中を覆い、お互い顔も名前も解らない。この闇夜は丸一日続くだろう。他人になりすまし、議論を混乱させることもできてしまうかもしれない。"},"cointoss":{"label":"Sir Cointoss","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_COINTOSS\" TARGET=\"_blank\">Sir Cointoss</A></b>\n<br>\nお控えなさい。お控えなさい。コイントス卿はこの村の投票結果に意見があるようでございます。\n卿の御意向によっては、投票結果に基づいた処刑を取り止めにすることもあります。\n五分五分くらいかな。"},"force":{"label":"影響力","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FORCE\" TARGET=\"_blank\">影響力</A></b>\n<br>\n今日の投票箱は無色透明だ。だれかが投票した瞬間にその内容はハッキリと見えるから、投票をセットするときは気を付けて！"},"miracle":{"label":"奇跡","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_MIRACLE\" TARGET=\"_blank\">奇跡</A></b>\n<br>\n帰ってきた！黄泉の国から、今日の襲撃で死んだ犠牲者がかえってきた！能力を失ったかもしれないけれど、それは些細なことだよ！ね！\n<br>\n人狼、一匹狼、賞金稼ぎなどに襲われた死者は生き返る。ただし、その能力は失われる。"},"prophecy":{"label":"聖者のお告げ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_PROPHECY\" TARGET=\"_blank\">聖者のお告げ</A></b>\n<br>\n聖者は民の夢枕に告げられました。今の任より、<b>決定者</b>にふさわしい人物がいると。\n旧き任務は解かれ、あたらしい<b>決定者</b>は皆に喝采で迎え入れられるだろう。"},"clamor":{"label":"不満","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_CLAMOR\" TARGET=\"_blank\">不満</A></b>\n<br>\n村には不満が鬱屈している。今夜の投票でまた人間を処刑してしまったら……悪夢が始まる。\nはじけた不満に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"fire":{"label":"熱意","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FIRE\" TARGET=\"_blank\">熱意</A></b>\n<br>\n村には期待に満ちた熱意が渦巻いている。今夜の投票がひとならぬものを処刑できたなら……悪夢が始まるのだ。\nはじけた熱意に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"nightmare":{"label":"悪夢","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_NIGHTMARE\" TARGET=\"_blank\">悪夢</A></b>\n<br>\n恐ろしい一日が始まる。今日は投票だけができる。発言も、能力も使えない。そして、突然死は発生しない。\n<br>\nさあ投票して、こんな日が早く過ぎ去ってしまうよう、ひとり祈りを捧げよう。"},"ghost":{"label":"亡霊","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_GHOST\" TARGET=\"_blank\">亡霊</A></b>\n<br>\n今夜、人狼に殺された人は人狼になる。また、襲撃を実行した人狼は命を落としてしまうだろう。人狼となった者は報復行動を行わない。ただし、命拾いをしたならば人狼にはならない。\n<br>\n一匹狼は亡霊を作らない。"},"escape":{"label":"逃亡","cmd":null,"help":"<b>逃亡</b>\n<br>\nせめて一人だけでも、なんとかして逃がそう。今夜の投票で逃亡者を一人決め、夜中の処刑のかわりに密かに逃がすのだ。\n<br>\nしかし逃亡者は一日のあいだ逃亡生活を続け、ついに村へと帰還してしまう。帰還者の票は通常の三倍尊重されるだろう。\n実装がめんどうだから、このまま未定義にしておこうかな。"},"seance":{"label":"降霊会","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_SEANSE\" TARGET=\"_blank\">降霊会</A></b>\n<br>\nこっくりさん、こっくりさん……<br>秘密の儀式で、墓場の霊魂がかえってきた。今日に限り、生者も姿の見えぬ死者も屋根を共にし、議論するだろう。"}}

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

module.exports = {"HUMAN":{"label":"村人陣営","group":"村人陣営","order":1,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HUMAN\" TARGET=\"_blank\">村人陣営</A></b>\n<br>\n人間(妖精や人外の者を除く)の数が人狼以下になるまでに人狼と妖精が全滅すれば勝利です。\n<br>\nただし、狼を全滅させた時点で妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"EVIL":{"label":"裏切りの陣営","group":"敵側の人間","label_human":"敵側の人間","order":2,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_EVIL\" TARGET=\"_blank\">裏切りの陣営</A></b>\n<br>\n村人・恋人が敗北すれば勝利者の一員に加わります。\n<br>\nあなたは破滅を望んでいるのです。人狼や妖精やそれ以外の勝利、または、誰もいなくなることを目指しましょう。"},"WOLF":{"label":"人狼陣営","group":"人狼陣営","label_human":"人狼陣営の人間","order":3,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_WOLF\" TARGET=\"_blank\">人狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を人狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させれば勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"LONEWOLF":{"label":"一匹狼","group":"その他","order":4,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LONEWOLF\" TARGET=\"_blank\">一匹狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を一匹狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させ、かつ、人狼陣営の狼が生きていなければ勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも勝利を掻っ攫うもの達が存在します。"},"PIXI":{"label":"妖精","group":"妖精","order":5,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_PIXI\" TARGET=\"_blank\">妖精陣営</A></b>\n<br>\n人狼が全滅するか、人間(妖精や人外の者を除く)の数が人狼と同数以下まで減るまで「生き残れば」勝利です。\n<br>\nただし、恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"OTHER":{"label":"その他","group":"その他","order":6},"GURU":{"label":"笛吹き","group":"その他","order":7,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_GURU\" TARGET=\"_blank\">笛吹き</A></b>\n<br>\n笛吹き以外の生存者が勧誘された者だけになれば勝利となります。笛吹き自身は、最終的に生き残っていなくとも構いません。\n<br>\nただし、横から勝利を掻っ攫うもの達が存在します。"},"LOVER":{"label":"恋人陣営","group":"その他","order":8,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LOVER\" TARGET=\"_blank\">恋人陣営</A></b>\n<br>\n恋人達だけが生き残る、もしくはいずこかの陣営が勝利を手にしたとき、絆の恋人達が生存していれば勝利です。\n<br>\nただし、ひとりだけ蘇生したなどの不幸で、恋を成就できない恋人は、勝利しません。"},"HATER":{"label":"邪気陣営","group":"その他","order":9,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HATER\" TARGET=\"_blank\">邪気陣営</A></b>\n<br>\nいずこかの陣営が勝利を手にしたとき、運命に決着をつけていれば勝利します。決着とは、絆の天敵をすべて倒し、一人だけが生き残っていることです。\n殺し合いの絆を断ち切りましょう。絆の相手が死んでも、後を追うことはありません。\n<br>\n絆の天敵とは、たとえあなた自身には関係のなくとも、あらゆる絆を結んでいるもの全てを指します。"},"DISH":{"label":"据え膳","group":"その他","order":10,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_DISH\" TARGET=\"_blank\">据え膳</A></b>\n<br>\nすべてに決着がついたとき、あなたが狼の襲撃、もしくは賞金稼の道連れにより死亡していれば、勝利者の一員に加わります。"},"NONE":{"label":"―","group":"その他","order":98,"help":"あなたは勝負を眺めています。勝利したり、敗北したりといったことはありません。"},"MOB":{"label":"見物人","group":"その他","order":99,"help":"あなたは<b>_ROLE_の<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MOB\" TARGET=\"_blank\">見物人</A></b>です。いかなる陣営の人数にも含まれません。"},"LEAVE":{"label":"―","group":"その他","order":100,"help":"あなたは村を去りました。勝利したり、敗北したりといったことは、もうありません。"}}

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports = {"PERL_DEFAULT":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]}}},"PERL_NEW":{"config":{"trsid":["all","star","regend","heavy","complexx","secret"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"]}},"PERL_GAME":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"}}},"UNION":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"UNION","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"BRAID":{"story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"all":{"nation":"- すべて -"},"TEST":{"nation":"人狼議事テスト","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","say5x200","say5x300","wbbs","saving","euro","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../testbed/lib","DIR_HTML":"../testbed/html","DIR_RS":"../testbed/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":1,"TIMEOUT_SCRAP":1,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/testbed","BASEDIR_CGIERR":"http://utage.family.jp//testbed","NAME_HOME":"人狼議事 手元テスト","MAX_VILLAGES":9},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[0,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/testbed/config.pl"}},"PERJURY_OLD":{"folder":"PERJURY_OLD","nation":"人狼議事RP:Bp","vid_code":"Bp","server":"utage.family.jp","oldlog":"/perjury/sow.cgi?cmd=oldlog&rowall=on","livelog":"/perjury/sow.cgi?cmd=rss","info_url":"/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/perjury","BASEDIR_CGIERR":"http://utage.family.jp//perjury","NAME_HOME":"人狼議事 Role Play braid perjury","MAX_VILLAGES":0},"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/perjury/config.pl"}},"PRETENSE":{"folder":"PRETENSE","nation":"人狼議事RP:Advance","vid_code":"A","server":"utage.family.jp","oldlog":"/pretense/sow.cgi?cmd=oldlog&rowall=on","info_url":"/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"RP":{"folder":"RP","nation":"人狼議事RP:","vid_code":"","server":"utage.family.jp","oldlog":"/rp/sow.cgi?cmd=oldlog&rowall=on","info_url":"/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"CABALA_OLD":{"folder":"CABALA","nation":"人狼議事陰謀:","vid_code":"C","server":"utage.family.jp","oldlog":"/cabala/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cabala/sow.cgi?cmd=rss","info_url":"/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../cafe/data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/cabala","BASEDIR_CGIERR":"http://utage.family.jp//cabala","NAME_HOME":"人狼議事 陰謀の苑","MAX_VILLAGES":0},"pl":"/www/giji_log/cabala/config.pl"}},"ALLSTAR_OLD":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:A","vid_code":"A","server":"utage.family.jp","oldlog":"/allstar/sow.cgi?cmd=oldlog&rowall=on","livelog":"/allstar/sow.cgi?cmd=rss","info_url":"/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../jksy/data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/allstar","BASEDIR_CGIERR":"http://utage.family.jp//allstar","NAME_HOME":"人狼議事 大乱闘オールスター","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/allstar/config.pl"}},"ULTIMATE":{"folder":"ULTIMATE","nation":"人狼議事大乱闘:","vid_code":"","server":"utage.family.jp","oldlog":"/ultimate/sow.cgi?cmd=oldlog&rowall=on","info_url":"/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}},"WOLF":{"folder":"WOLF","nation":"人狼議事標準","vid_code":"","server":"utage.family.jp","oldlog":"/wolf/sow.cgi?cmd=oldlog&rowall=on","livelog":"/wolf/sow.cgi?cmd=rss","info_url":"/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false}},"PAN":{"folder":"PAN","nation":"似顔絵人狼","server":"soy-bean.sakura.ne.jp","oldlog":"/pan/sow.cgi?cmd=oldlog&rowall=on","livelog":"/pan/sow.cgi?cmd=rss","info_url":"/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false},"config":{"csid":["sow","juna","name","bloody","orange","15girls","tmmi","cat","bunmei"],"erb":"./asset/sow/pan.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"cfg":{"TYPE":"CABALA","RULE":"PAN","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/pan","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/pan//","NAME_HOME":"似顔絵人狼","MAX_VILLAGES":1},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[0,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/pan/config.pl","is_angular":"show-fix"}},"MORPHE":{"folder":"MORPHE","nation":"人狼議事 モルペウス","vid_code":"M","server":"morphe.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"MORPHE","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://morphe.sakura.ne.jp/morphe","BASEDIR_CGIERR":"http://morphe.sakura.ne.jp/morphe//","NAME_HOME":"人狼議事 夢の形","MAX_VILLAGES":0},"pl":"/www/giji_log/morphe/config.pl"}},"SOYBEAN":{"folder":"SOYBEAN","nation":"人狼議事鯖の味噌煮","vid_code":"Bs","server":"soy-bean.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[1,"1:事件正順の選択を有効にする。"],"ENABLED_TEST_ROLE":[1,"1:テスト中役職を有効にする。"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/soy-bean","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/soy-bean//","NAME_HOME":"人狼議事 鯖の味噌煮","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/soy-bean/config.pl","is_angular":"show-fix"}},"CIEL":{"folder":"CIEL","nation":"人狼議事RP:Cheat Ciel","vid_code":"Cc","server":"ciel.moo.jp","oldlog":"/cheat/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cheat/sow.cgi?cmd=rss","info_url":"/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CHEAT","RULE":"CIEL","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","BASEDIR_CGIERR":"http://ciel.moo.jp//cheat","URL_SW":"http://ciel.moo.jp/cheat","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 ciel\n- Role Play Cheat -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/ciel/config.pl","is_angular":"show-fix"}},"PERJURY":{"folder":"PERJURY","nation":"人狼議事RP:Braid Perjury","vid_code":"Bp","server":"perjury.rulez.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"PERJURY","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://perjury.rulez.jp","BASEDIR_CGIERR":"http://perjury.rulez.jp//","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 perjury rulez\n- Role Play braid -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/vage/config.pl"}},"XEBEC":{"folder":"XEBEC","nation":"人狼議事RP:Braid XEBEC","vid_code":"Bx","server":"xebec.x0.to","oldlog":"/xebec/sow.cgi?cmd=oldlog&rowall=on","livelog":"/xebec/sow.cgi?cmd=rss","info_url":"/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://xebec.x0.to/xebec","BASEDIR_CGIERR":"http://xebec.x0.to//xebec","NAME_HOME":"人狼議事 xebec\n- Role Play braid -","MAX_VILLAGES":3},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/xebec/config.pl"}},"CRAZY":{"folder":"CRAZY","nation":"人狼議事RP:Braid Crazy","vid_code":"Bc","server":"crazy-crazy.sakura.ne.jp","oldlog":"/crazy/sow.cgi?cmd=oldlog&rowall=on","livelog":"/crazy/sow.cgi?cmd=rss","info_url":"/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo","epi_url":"/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/crazy","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//crazy","NAME_HOME":"人狼議事 crazy\n- Role Play braid -","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/crazy/config.pl"}},"CABALA":{"folder":"CABALA","nation":"人狼議事CabalaCafe","vid_code":"C","server":"cabala.halfmoon.jp","oldlog":"/cafe/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cafe/sow.cgi?cmd=rss","info_url":"/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://cabala.halfmoon.jp/cafe","BASEDIR_CGIERR":"http://cabala.halfmoon.jp//cafe","NAME_HOME":"人狼議事 Cabala Cafe","MAX_VILLAGES":4},"pl":"/www/giji_log/cafe/config.pl"}},"ALLSTAR":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:AllStar","vid_code":"A","server":"jinro.jksy.org","oldlog":"/~nanakorobi?cmd=oldlog&rowall=on","livelog":"/~nanakorobi?cmd=rss","info_url":"/~nanakorobi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"BRAID","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://jinro.jksy.org/~nanakorobi","BASEDIR_CGIERR":"http://jinro.jksy.org//~nanakorobi","NAME_HOME":"人狼議事 大乱闘All☆Star","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/jksy/config.pl"}},"LOBBY_OLD":{"folder":"LOBBY_OLD","nation":"人狼議事旧ロビー","vid_code":"O"},"LOBBY":{"folder":"LOBBY","nation":"人狼議事ロビー","vid_code":"L","server":"crazy-crazy.sakura.ne.jp","oldlog":"/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on","livelog":"/giji_lobby/lobby/sow.cgi?cmd=rss","info_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["lobby"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../data/user"},"cfg":{"TYPE":"BRAID","RULE":"LOBBY","USERID_NPC":"master","USERID_ADMIN":"master","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":365,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//giji_lobby/lobby","NAME_HOME":"人狼議事 ロビー","MAX_VILLAGES":10,"MAX_LOG":750},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/lobby/config.pl","is_angular":"show-fix"}},"OFFPARTY":{"folder":"OFFPARTY","nation":"人狼議事オフ相談所","vid_code":"P","server":"party.ps.land.to","oldlog":"/kitchen/sow.cgi?cmd=oldlog&rowall=on","livelog":"/kitchen/sow.cgi?cmd=rss","info_url":"/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}}}

/***/ }),

/***/ 257:
/***/ (function(module, exports) {

module.exports = {"TABULA":{"label":"タブラの人狼","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"MILLERHOLLOW":{"label":"ミラーズホロウ","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"LIVE_TABULA":{"label":"タブラの人狼（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"LIVE_MILLERHOLLOW":{"label":"ミラーズホロウ（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"TROUBLE":{"label":"Trouble☆Aliens","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"},"MISTERY":{"label":"深い霧の夜","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"VOV":{"disabled":true,"label":"狂犬病の谷","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"SECRET":{"label":"陰謀に集う胡蝶","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"}}

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

module.exports = {"secret":{"label":"詳細は黒幕だけが知っています。","disabled":true,"role_ids_list":[]},"ultimate":{"label":"アルティメット","disabled":true,"role_ids_list":[]},"lover":{"label":"恋愛天使","disabled":true,"role_ids_list":[]},"hamster":{"label":"ハムスター","disabled":true,"role_ids_list":[]},"random":{"label":"ランダム","disabled":true,"role_ids_list":[]},"custom":{"label":"自由設定","role_ids_list":[]},"default":{"label":"標準","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","fanatic","medium","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","wisper","medium","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager","villager"]]},"mistery":{"label":"深い霧の夜","role_ids_list":[null,null,null,null,["villager","villager","seer","lonewolf"],["villager","villager","seer","lonewolf","alchemist"],["villager","villager","guard","lonewolf","alchemist","possess"],["villager","villager","guard","lonewolf","alchemist","decide","possess","fan"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","alchemist"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru","alchemist"]]},"test1st":{"label":"人狼審問試験壱型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess","villager"]]},"test2nd":{"label":"人狼審問試験弐型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_c":{"label":"人狼BBS-C国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_f":{"label":"人狼BBS-F国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_g":{"label":"人狼BBS-G国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager","villager"]]}}

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(318),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(347)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(331),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-efc4a222",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(306),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 306:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.nuxt.err) ? _c('nuxt-error', {
    attrs: {
      "error": _vm.nuxt.err
    }
  }) : _c('nuxt-child')
},staticRenderFns: []}

/***/ }),

/***/ 318:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "__nuxt"
    }
  }, [_c('nuxt-loading', {
    ref: "loading"
  }), (_vm.layout) ? _c(_vm.layout, {
    tag: "component"
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 329:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "container"
  }, [_c('nuxt-link', {
    staticClass: "button",
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Homepage")])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 331:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress",
    style: ({
      'width': _vm.percent + '%',
      'height': _vm.height,
      'background-color': _vm.canSuccess ? _vm.color : _vm.failedColor,
      'opacity': _vm.show ? 1 : 0
    })
  })
},staticRenderFns: []}

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(234);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("eee3101a", content, true);

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(235);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("ed2bce60", content, true);

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggregate.coffee": 124,
	"./book.coffee": 125,
	"./index.coffee": 126,
	"./menu.coffee": 127,
	"./sow.coffee": 128,
	"./story.coffee": 129
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
webpackContext.id = 350;

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cs_all.yml": 240,
	"./cs_animal.yml": 241,
	"./cs_changed.yml": 242,
	"./cs_ger.yml": 243,
	"./cs_mad.yml": 244,
	"./cs_ririnra.yml": 245,
	"./cs_school.yml": 246,
	"./cs_sf.yml": 247,
	"./cs_time.yml": 248,
	"./cs_wa.yml": 249
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
webpackContext.id = 351;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(137);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(138);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(72);

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

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noopData = function noopData() {
  return {};
};

function applyAsyncData(Component) {
  var asyncData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ComponentData = Component.options.data || noopData;
  Component.options.data = function () {
    var data = ComponentData.call(this);
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
    isDev: false,
    app: app,
    store: context.store,
    route: context.to ? context.to : context.route,
    payload: context.payload,
    error: context.error,
    base: '/',
    env: { "WEB_URL": "http://giji.f5.si", "API_URL": "http://giji.f5.si/api", "SOW_URL": "http://giji.f5.si/sow", "STORE_URL": "http://s3-ap-northeast-1.amazonaws.com/giji-assets" },
    hotReload: context.hotReload || false
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
function getLocation(base) {
  var path = window.location.pathname;
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transitionsKeys = ['name', 'mode', 'css', 'type', 'duration', 'enterClass', 'leaveClass', 'enterActiveClass', 'enterActiveClass', 'leaveActiveClass', 'enterToClass', 'leaveToClass'];
var listenersKeys = ['beforeEnter', 'enter', 'afterEnter', 'enterCancelled', 'beforeLeave', 'leave', 'afterLeave', 'leaveCancelled'];

exports.default = {
  name: 'nuxt-child',
  functional: true,
  render: function render(h, _ref) {
    var parent = _ref.parent,
        data = _ref.data;

    data.nuxtChild = true;

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
        listeners[key] = transition[key];
      }
    });
    return h('transition', {
      props: transitionProps,
      on: listeners
    }, [h('router-view', data)]);
  }
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(346)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(329),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-aa7396f8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NuxtError = exports.createApp = undefined;

var _regenerator = __webpack_require__(55);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(37);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(72);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(53);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createApp = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ssrContext) {
    var store, router, app, ctx;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = (0, _store.createStore)();
            router = (0, _router.createRouter)();

            if (!(true && ssrContext && ssrContext.url)) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return new _promise2.default(function (resolve, reject) {
              router.push(ssrContext.url, resolve, reject);
            });

          case 5:

            if (true) {

              // Replace store state before calling plugins
              if (window.__NUXT__ && window.__NUXT__.state) {
                store.replaceState(window.__NUXT__.state);
              }
            }

            // root instance
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
                  this.$options._nuxt.dateErr = Date.now();
                  this.$options._nuxt.err = err;
                  return err;
                }
              }
            }, _App2.default);
            ctx = (0, _utils.getContext)({
              isServer: !!ssrContext,
              isClient: !ssrContext,
              route: router.currentRoute,
              store: store,
              req: ssrContext ? ssrContext.req : undefined,
              res: ssrContext ? ssrContext.res : undefined
            }, app);

            delete ctx.redirect;
            delete ctx.error;

            // Inject external plugins


            return _context.abrupt('return', { app: app, router: router, store: store });

          case 11:
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

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vueMeta = __webpack_require__(56);

var _vueMeta2 = _interopRequireDefault(_vueMeta);

var _router = __webpack_require__(132);

var _store = __webpack_require__(133);

var _nuxtChild = __webpack_require__(70);

var _nuxtChild2 = _interopRequireDefault(_nuxtChild);

var _nuxtLink = __webpack_require__(131);

var _nuxtLink2 = _interopRequireDefault(_nuxtLink);

var _error = __webpack_require__(87);

var _error2 = _interopRequireDefault(_error);

var _nuxt = __webpack_require__(276);

var _nuxt2 = _interopRequireDefault(_nuxt);

var _App = __webpack_require__(274);

var _App2 = _interopRequireDefault(_App);

var _utils = __webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (true) {
  // window.onNuxtReady(() => console.log('Ready')) hook
  // Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)
  window._nuxtReadyCbs = [];
  window.onNuxtReady = function (cb) {
    window._nuxtReadyCbs.push(cb);
  };
}

// Import SSR plugins


// Component: <nuxt-child>
_vue2.default.component(_nuxtChild2.default.name, _nuxtChild2.default);
// Component: <nuxt-link>
_vue2.default.component(_nuxtLink2.default.name, _nuxtLink2.default);
// Component: <nuxt>
_vue2.default.component(_nuxt2.default.name, _nuxt2.default);

// vue-meta configuration
_vue2.default.use(_vueMeta2.default, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

var defaultTransition = { "name": "page", "mode": "out-in" };

exports.createApp = createApp;
exports.NuxtError = _error2.default;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(71);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var files = __webpack_require__(94);
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

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./test.coffee": 112
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
webpackContext.id = 94;

/***/ })

},[130]);
//# sourceMappingURL=nuxt.bundle.a76bafe610322c148230.js.map