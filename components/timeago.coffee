SECOND = 1000
MINUTE = SECOND * 60
HOUR = MINUTE * 60
DAY = HOUR * 24
WEEK = DAY * 7
MONTH = DAY * 30
YEAR = DAY * 365

times = [
  [   25000, Infinity,      25000]
  [  MINUTE,   SECOND, 2 * SECOND]
  [    HOUR,   MINUTE, 2 * MINUTE]
  [     DAY,     HOUR, 2 *   HOUR]
  [    WEEK,      DAY, 2 *    DAY]
  [   MONTH,     WEEK, 2 *   WEEK]
  [    YEAR,    MONTH, 2 *  MONTH]
  [Infinity,     YEAR, 2 *   YEAR]
]

locales = [
    "たった今"
    " %s 秒前"
    " %s 分前"
    " %s 時間前"
    " %s 日前"
    " %s 週間前"
    " %s ヶ月前"
    " %s 年前"
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
    msec: ->
      @now - @sinceTime
    baseTime: ->
      [limit ,msec, first] = times[@idx]
      if Infinity == @period
        first - @msec
      else
        msec
    idx: ->
      for [limit, base], idx in times when @msec < limit
        return idx
      return times.length - 1
    timeago: ->
      if @maxTime && @msec > @maxTime
        clearInterval @interval
        @interval = null
        return format.date.format(@sinceTime) + "頃"

      locales[@idx].replace '%s', Math.floor @msec / @baseTime
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
