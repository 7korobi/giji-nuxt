{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

format =
  hour: new Intl.DateTimeFormat 'ja-JP',
    weekday: "short"
    hour:    "2-digit"

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

        ssay_pt = o.say.say
        ssay_pt = undefined if 10000 < ssay_pt
        gsay_pt = undefined if 10000 < gsay_pt
        Set.stat.merge [
          _id: "#{potof_id}-give"
          give: o.point.actaddpt
        ,
          _id: "#{potof_id}-SSAY"
          pt: ssay_pt
          said: 0
        ,
          _id: "#{potof_id}-GSAY"
          pt: gsay_pt
          said: 0
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
          handle: "TITLE"
          update: false
      sections = {}

      data.messages.map (o)->
        { face_id, log } = o
        face_id = undefined if face_id in ["maker", "admin","c06"]
        return if "*CAST*" == log
        log ?= "メモをはがした。"
        handle = o.mestype
        phase_idx = o.logid[0..1]
        phase_group = o.subid
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
            

        switch phase_idx
          when "-S"
            phase_idx = "wS"

        switch o.subid
          when "S"
            show = "talk"
          when "M"
            show = "report"
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
            show = "report"
          when "INFONOM"
            handle = "TITLE"
          when "INFOSP"
            handle = "header"
          when "VSAY"
            handle = "VSSAY"
          when "SAY"
            handle = "SSAY"

        write_at = new Date(o.date)
        write_clock = Math.floor(write_at / (60 * 60 * 1000)).toString(36)
        _id = "#{o.event_id}-#{phase_idx}-#{idx}"
        phase_id = "#{o.event_id}-#{phase_idx}"
        section_id = "#{o.event_id}-#{write_clock}"
        deco = o.style

        sections[section_id] ?=
          _id: section_id
          label: format.hour.format write_at
        phases[phase_id] ?=
          handle: handle
          group: phase_group
          update: false
        Set.chat.add { _id, potof_id, phase_id, section_id, write_at, show, deco, log, phase_group, phase_handle: handle }
      Set.phase.merge phases
      Set.section.merge sections

      Set.part.merge data.events.map (o)->
        _id: o._id
        label: o.name ? "#{o.turn}日目"

      o = data.stories[0]
      Set.book.add
        _id: o._id
        label: o.name
        winner_id: data.events[-1..][0].winner[4..]
        potof_size: Query.potofs.where({book_id}).list.length
      state.read_at = Date.now()

  actions:
    story: ({commit}, story_id)->
      axios.get "http://utage.family.jp:4000/api/story/oldlog/#{story_id}"
      .then ({ status, data })->
        commit "join", data
