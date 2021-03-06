module.exports = moment = require "moment"

moment.defineLocale 'ja',
  months:      '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_')
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_')
  weekdays:      '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_')
  weekdaysShort: '日_月_火_水_木_金_土'.split('_')
  weekdaysMin:   '日_月_火_水_木_金_土'.split('_')
  longDateFormat:
    LT: 'HH:mm'
    LTS: 'HH:mm:ss'
    L: 'YYYY/MM/DD'
    LL: 'YYYY年M月D日'
    LLL: 'YYYY年M月D日 HH:mm'
    LLLL: 'YYYY年M月D日 HH:mm dddd'
    l: 'YYYY/MM/DD'
    ll: 'YYYY/MM/DD(ddd)'
    lll: 'YYYY年M月D日 HH:mm'
    llll: 'YYYY年M月D日 HH:mm dddd'

  meridiemParse: /午前|午後/i
  isPM: (input)-> input == '午後'
  meridiem: (hour, minute, isLower)->
    if hour < 12
      '午前'
    else
      '午後'

  calendar:
    sameDay:  '[今日] LT'
    nextDay:  '[明日] LT'
    nextWeek: '[来週]dddd LT'
    lastDay:  '[昨日] LT'
    lastWeek: '[前週]dddd LT'
    sameElse: 'L'

  dayOfMonthOrdinalParse: /\d{1,2}日/
  ordinal: (number, period)->
    switch period
      when 'd', 'D', 'DDD'
        number + '日'
      else
        number

  relativeTime: 
    future: '%s後'
    past:   '%s前'

    s:  '今'
    m:  '1分'
    h:  '1時間'
    d:  '1日'
    M:  '1ヶ月'
    y:  '1年'

    mm: '%d分'
    hh: '%d時間'
    dd: '%d日'
    MM: '%dヶ月'
    yy: '%d年'
