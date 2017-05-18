{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()

  mutations:
    join: (state, data, book_id)->
      for o in data.potofs
        Set.stat.add
          _id: "#{o.event_id}"

        Set.card.merge [
          _id: "#{o.event_id}-request"
          role_id: o.select
        ,
          _id: "#{o.event_id}-live"
          role_id: o.live
          date: o.deathday || Infinity
        ,
          _id: "#{o.event_id}-role"
          role_id: o.role[0]
        ]
        if o.role[1]
          Set.card.add
            _id: "#{o.event_id}-gift"
            role_id: o.role[1]
        
        Set.stat.merge [
          _id: "#{o.event_id}-give"
          give: o.point.actaddpt
        ,
          _id: "#{o.event_id}-SSAY"
          pt: o.say.say
        ,
          _id: "#{o.event_id}-GSAY"
          pt: o.say.gsay
        ]
        if o.zapcount
          job = ["IR","R","O","Y","G","B","I","V","UV"][o.clearance] + "-"
        else
          job = Query.chr_jobs.find("#{o.csid}_#{o.face_id}").job

        Set.potof.add
          _id:     o.event_id
          job:            job
          pno:          o.pno
          face_id:  o.face_id
          side:         "NONE"
          sign: o.sow_auth_id

      phases =
        "#{book_id}-0":
          handle: "TITLE"
          update: false

      Set.chat.merge data.messages.map (o)->
        _id = "#{o.event_id}-#{o.mestype}-#{o.logid[2..-1]}"
        phase_id = "#{o.event_id}-#{o.mestype}"
        phases[phase_id] ?=
          handle: o.mestype
          update: false

        potof_id = Query.where(face_id: o.face_id, part_id: o.event_id).list.first?.id
        deco = o.style
        log = o.log
        show =
          switch o.subid
            when "S"
              "talk"
            when "A"
              log = o.name + "は、" + log
              "post"
            when "I"
              "post"
        { _id, potof_id, show, deco, log }
      Set.phase.merge phases

      Set.event.merge data.events.map (o)->
        _id: o._id
        label: o.name ? "#{o.turn}日目"

      o = data.stories[0]
      Set.book.add
        _id: o._id
        label: o.name
        winner: data.events[-1..][0].winner
        potof_size: Query.potofs.where({book_id}).list.length

      state.read_at = Date.now()

  actions:
    story: ({commit}, story_id)->
      axios.get "http://utage.family.jp:4000/api/story/oldlog/#{story_id}"
      .then ({ status, data })->
        commit "join", data, story_id
