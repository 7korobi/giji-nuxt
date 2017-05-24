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
          handle: "TITLE"
          update: false
      sections = {}

      gap_time = 10 * 60 * 1000 # 10分
      log_length = 0
      section_idx = 1
      last_at = -Infinity
      last_event_id = section_id = null

      write_at = 0

      _.sortBy data.messages, (o)-> o.write_at = new Date o.date
      .map (o)->
        { face_id, to, log, write_at } = o
        face_id = undefined if face_id in ["maker", "admin","c06"]
        return if "*CAST*" == log
        log ?= "メモをはがした。"
        if o.event_id != last_event_id
          section_idx = 1
          last_at = -Infinity
        silent = write_at - last_at

        handle = o.mestype
        phase_group = o.subid
        phase_idx = o.subid + o.mestype
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
          handle = "AIM"

        _id = "#{o.event_id}-#{phase_idx}-#{idx}"
        phase_id = "#{o.event_id}-#{phase_idx}"
        deco = o.style

        if silent > gap_time
          if silent == Infinity || 10000 < log_length
            if last = sections[section_id]
              last.log_length = log_length
              last.label = "#{last.label} ～ #{format.hour.format write_at}"

            write_clock = Math.floor(write_at / gap_time).toString(36)
            section_id = "#{o.event_id}-#{write_clock}"
            sections[section_id] =
              _id: section_id
              label: format.hour.format write_at
              write_at: write_at
            log_length = 0

        phases[phase_id] ?=
          handle: handle
          group: phase_group
          update: false
        Set.chat.add oo = { _id, potof_id, phase_id, section_id, write_at, to, show, deco, log, phase_group, phase_handle: handle }
        last_at = write_at
        last_event_id = o.event_id
        if o.subid in ["S","A","I"]
          log_length += log.length
      if last = sections[section_id]
        last.log_length = log_length
        last.label = "#{last.label} ～ #{format.hour.format write_at}"

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
