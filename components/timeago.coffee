SECOND = 1000
MINUTE = SECOND * 60
HOUR = MINUTE * 60
DAY = HOUR * 24
WEEK = DAY * 7
MONTH = DAY * 30
YEAR = DAY * 365

times = [
  [   25000, Infinity]
  [  MINUTE,   SECOND]
  [    HOUR,   MINUTE]
  [     DAY,     HOUR]
  [    WEEK,      DAY]
  [   MONTH,     WEEK]
  [    YEAR,    MONTH]
  [Infinity,     YEAR]
]

locales = [
    "たった今"
    "%s 秒前"
    "%s 分前"
    "%s 時間前"
    "%s 日前"
    "%s 週間前"
    "%s ヶ月前"
    "%s 年前"
  ]

format =
  date: new Intl.DateTimeFormat 'ja-JP',
    year:  "numeric"
    month: "2-digit"
    day:   "2-digit"
    weekday: "short"
    hour:    "2-digit"

  num: new Intl.NumberFormat 'ja-JP',
    style: 'decimal'
    useGrouping: true
    minimumIntegerDigits: 1
    minimumSignificantDigits:  1
    maximumSignificantDigits: 21
    minimumFractionDigits: 0
    maximumFractionDigits: 2


module.exports =
  data: ->
    now: Date.now()
    period: Infinity
    interval: null

  props:
    since:
      required: true
    maxTime:
      type: Number
      default: 1 * YEAR
    lock:
      type: Boolean
      default: false

  computed:
    sinceTime: ->
      new Date(@since).getTime()
    msecs: ->
      @now - @sinceTime
    baseTime: ->
      [limit ,msec] = times[@idx]
      if Infinity == msec
        limit - @msecs
      else
        msec
    idx: ->
      for [limit, base], idx in times when @msecs < limit
        return idx
      return times.length - 1
    timeago: ->
      if @maxTime && @msecs > @maxTime
        clearInterval @interval
        @interval = null
        return format.date.format(@sinceTime) + "頃"

      locales[@idx].replace '%s', Math.round @msecs / @baseTime
    tick: ->
      if @period != @baseTime
        if @interval
          clearInterval @interval
        if Infinity > @baseTime
          @interval = setInterval =>
            @now = Date.now()
            @tick
          , @period = @baseTime
      @period

  render: (m)->
    m 'time',
      attrs:
        datetime: new Date @since
    , @timeago

  mounted: ->
    return if @lock
    @tick

  beforeDestroy: ->
    return if @lock
    clearInterval @interval
    @interval = null
