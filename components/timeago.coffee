SECOND = 1000
MINUTE = SECOND * 60
HOUR = MINUTE * 60
DAY = HOUR * 24
WEEK = DAY * 7
MONTH = DAY * 30
YEAR = DAY * 365

locales = [
  " %s 年前"
  " %s ヶ月前"
  " %s 週間前"
  " %s 日前"
  " %s 時間前"
  " %s 分前"
  " %s 秒前"
  "今"
  " %s 秒後"
  " %s 分後"
  " %s 時間後"
  " %s 日後"
  " %s 週間後"
  " %s ヶ月後"
  " %s 年後"
]

times = [
  [    -YEAR,   YEAR]
  [   -MONTH,  MONTH]
  [    -WEEK,   WEEK]
  [     -DAY,    DAY]
  [    -HOUR,   HOUR]
  [  -MINUTE, MINUTE]
  [   -25000, SECOND]
  [    25000,  25000]
  [   MINUTE, SECOND]
  [     HOUR, MINUTE]
  [      DAY,   HOUR]
  [     WEEK,    DAY]
  [    MONTH,   WEEK]
  [     YEAR,  MONTH]
  [ Infinity,   YEAR]
]
for time, idx in times
  time[2] = locales[idx]

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
    now: null
    tick: Infinity
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
      @now = Date.now()
      @now - @sinceTime
    time: ->
      for [limit], idx in times when @msec < limit
        return times[idx]
      return times[-1...][0]
    timeago: ->
      if @maxTime && @msec > @maxTime
        clearInterval @interval
        @interval = null
        return format.date.format(@sinceTime) + "頃"

      [_, base, text] = @time
      count = Math.floor Math.abs (@msec + 100) / base # 八捨九入
      @tickTime
      text.replace '%s', count
    tickTime: ->
      return Infinity if @lock
      [_, base] = @time
      tick = base
      if Infinity == @tick
        tick = -@msec % base
        if tick < 0
          tick += base
      if @tick != tick
        if @interval
          clearInterval @interval
        @interval = setInterval =>
          @now = Date.now()
          @tickTime
        , @tick = tick
      @tick

  render: (m)->
    m 'time',
      attrs:
        datetime: new Date @since
    , @timeago

  beforeDestroy: ->
    return if @lock
    clearInterval @interval
    @interval = null
