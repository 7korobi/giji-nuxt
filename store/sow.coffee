{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()

  mutations:
    join: (state, data)->
      book_id = data.stories[0]._id
      for o, idx in data.potofs
        potof_id = "#{o.event_id}-#{idx}"
        Set.stat.add
          _id: "#{o.event_id}"

        if Query.roles.find o.live
          date = o.deathday
          date = undefined unless 0 < o.deathday
          Set.card.add
            _id: "#{potof_id}-live"
            role_id: o.live
            date: date

        if Query.roles.find o.select
          Set.card.add
            _id: "#{potof_id}-request"
            role_id: o.select

        if Query.roles.find o.role[0]
          Set.card.add
            _id: "#{potof_id}-role"
            role_id: o.role[0]

        if Query.roles.find o.role[1]
          Set.card.add
            _id: "#{potof_id}-gift"
            role_id: o.role[1]

        Set.stat.merge [
          _id: "#{potof_id}-give"
          give: o.point.actaddpt
        ]
        if o.live == "live"
          Set.stat.add
            _id: "#{potof_id}-commit"
            sw: true

        if o.zapcount
          job = ["IR","R","O","Y","G","B","I","V","UV"][o.clearance] + "-"
        else
          job = Query.chr_jobs.find("#{o.csid}_#{o.face_id}").job

        Set.potof.add
          _id:       potof_id
          job:            job
          pno:          o.pno
          face_id:  o.face_id
          sign: o.sow_auth_id

      phases =
        "#{book_id}-0-mA":
          handle: "MAKER"
          group:  "A"
          update: false

      write_at = 0
      chat = null

      _.sortBy data.messages, (o)-> o.write_at = new Date o.date
      .map (o)->
        { face_id, to, log, write_at } = o
        face_id = undefined if face_id in ["maker", "admin","c06"]
        return if "*CAST*" == log
        log ?= "メモをはがした。"

        handle = o.mestype
        phase_group = o.subid
        phase_type = o.subid + o.mestype
        phase_idx = o.logid[0..1]
        idx = Number o.logid[2..-1]
        if o.story_id && face_id
          potof_id = Query.potofs.where(sign: o.sow_auth_id, face_id: face_id, book_id: o.story_id).list.first?.id
          unless potof_id
            Set.card.add
              _id: [o.event_id, o.face_id, "live"].join("-")
              role_id: "leave"
              date: 0
            Set.stat.add
              _id: [o.event_id, o.face_id, "SSAY"].join("-")
              said: 0
            Set.potof.add
              _id: [o.event_id, o.face_id].join("-")
              face_id:  o.face_id
              job: Query.chr_jobs.find([o.csid, o.face_id].join("_"))?.job
              sign: o.sow_auth_id
              pno:  ""
            

        switch o.logid[0..1]
          when "-S"
            phase_idx  = "iI"
            phase_group = "I"

        switch o.subid
          when "M"
            show = "report"
          when "S"
            show = "talk"
          when "I"
            potof_id = undefined
            show = "report"
          when "A", "B"
            potof_id = undefined
            show = "post"
            log = o.name + "は、" + log

        switch handle
          when "DELETED"
            return
          when "MAKER", "ADMIN"
            potof_id = undefined
            show = "report"
          when "INFONOM"
            handle = "dark"
          when "INFOSP"
            handle = "header"
          when "VSAY"
            handle = "VSSAY"
          when "SAY"
            handle = "SSAY"
        if to
          phase_idx = "AIM"
          handle = "AIM"

        phase_id = "#{o.event_id}-#{phase_idx}"
        _id = "#{phase_id}-#{idx}"
        deco = o.style

        phases[phase_id] ?=
          handle: handle
          type:  phase_type
          group: phase_group
          update: false
        Set.chat.add { _id, potof_id, phase_id, write_at, to, show, deco, log, handle }
        chat_at = write_at
        chat = o

      Set.phase.merge phases

      Set.part.merge data.events.map (o)->
        _id: o._id
        label: o.name ? "#{o.turn}日目"

      o = data.stories[0]
      Set.book.add
        _id: o._id
        label: o.name
        winner_id: data.events[-1..][0].winner[4..]
        potof_size: Query.potofs.where({book_id}).list.length
        write_at: chat.write_at
      state.read_at = Date.now()

  actions:
    story: ({commit}, story_id)->
      axios.get "http://giji.check.jp/api/story/oldlog/#{story_id}"
      .then ({ status, data })->
        commit "join", data
