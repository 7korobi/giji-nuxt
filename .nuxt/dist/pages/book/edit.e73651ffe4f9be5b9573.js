webpackJsonp([0],{"4LwE":function(a,t,e){var s,l,n;({Query:s}=e("L78F")),({nation:l,village:n}=e("Qm8W")),e("K9Q6"),a.exports={data:function(){var a,t,e;return e="（村のルールは、自由に編集できるよ！）\n",e+=function(){var e,s,l,c;for(l=n.list,c=[],t=e=0,s=l.length;e<s;t=++e)({head:a}=l[t]),c.push(`${t+1}. ${a}`);return c}().join("\n"),{npc:{face_id:null,chr_job_id:null,say:["",""]},size:{player:4,mob:0},maker:["",e,""],interval:1,night:5,vote:"sign",vote_by:["live"],option:["vote_by_live"],tags:["god"]}},methods:{tag:function(a){return s.tags.find(a)},create:function(){return console.log(this)}},computed:{faces:function(){return s.faces.tag(this.tags)},npc_jobs:function(){var a,t;return null!=(a=null!=(t=s.faces.find(this.npc.face_id))?t.chr_jobs:void 0)?a:[]},npc_name:function(){var a;if(a=s.chr_jobs.find(this.npc.chr_job_id))return`${a.job} ${a.face.name}`},profile:function(){return this.$store.state.profile},user:function(){return this.$store.state.user},n_rules:function(){return l.list},tags_all:function(){return s.tags.ids},tags_giji:function(){return s.tags.nodes("giji",1).ids}}}},"5P2d":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("4LwE"),l=e.n(s),n=e("Pedo"),c=e("VU/8")(l.a,n.a,!1,function(a){e("rII0")},"data-v-145abe67",null);t.default=c.exports},K9Q6:function(a,t){a.exports=[{label:"和の国てやんでえ",face_id:"w17",say:["嗚呼、聞こえる。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{label:"和の国てやんでえ（仁右衛門）",face_id:"w23",say:["なんと、これは奇っ怪……分かったゾ！","やっぱり人狼は実在するんだヨ！　うっひょひょーい！"]},{label:"エクスパンション・セット「帰還者議事」",face_id:"c10",say:["M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","やっぱさ、銃を持った善人がいないとさ。\n\nちょっと出かけてくる！プリン食べちゃダメだよ！"]},{label:"明後日への道標",face_id:"sf04",say:["とたたたたんっ。\n\n```\nめざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。\n```","ちゅー！\n\n　ちゅー！\n\n```\nがりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……\n```"]},{label:"明後日への道標（ナユタ）",face_id:"sf10",say:["f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n```\n同日\n整備日誌\n　定期点検。ただちに健康に影響はないが、擦過痕…\n```","よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n**ぷつん**\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"]},{label:"人狼議事（キャサリン）",face_id:"c05",say:["たいへん、たいへん、たいへん！","大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"]},{label:"人狼議事（ベネット）",face_id:"c08",say:["壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n```\n日記はそこで途切れ、発見されるまで打ち捨てられていた。\n```"]},{label:"人狼議事（タバサ）",face_id:"c19",say:["ねぇ、遊んでかない？今夜はあなたが狼よ……","人狼なんているわけないじゃん？みんな大げさなのさ。"]},{label:"人狼議事（ソフィア）",face_id:"c67",say:["こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"]},{label:"人狼議事（ヨアヒム）",face_id:"c68",say:["ふひ、ふひひ！人狼になど……くれてやるものかヨ！","人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"]},{label:"人狼議事（ヴェスパタイン）",face_id:"c72",say:["嗚呼、聞こえる。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{label:"人狼議事（ヨーランダ）",face_id:"c51",say:["夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"]},{label:"人狼議事（グロリア）",face_id:"c20",say:["紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"]},{label:"人狼議事（オスカー）",face_id:"c32",say:["…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"]},{label:"人狼議事",face_id:"c99",say:["嗚呼、聞こえ る。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{label:"エクスパンション・セット「狂騒議事」",face_id:"c83",say:["どうせ、殺されるわみんな。…みんな\n\n\n/* 死ねばいいのに */","１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n```\n日記はそこで途切れ、発見されるまで打ち捨てられていた。\n```"]},{label:"エクスパンション・セット「狂騒議事」（ヤヘイ）",face_id:"mad05",say:["…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"]},{label:"エクスパンション・セット「大陸議事」",face_id:"g03",say:["まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"]},{label:"とのさま広場",face_id:"m08",say:["じんろう？\nそんななまえのこ、いたかしら……","さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"]},{_id:"m05",label:"はおうの広場",face_id:"m05",say:["ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","誰にも、腰抜けなんて…言わせないぞっ"]},{label:"人狼議事 ちゃんぷる",face_id:"all",say:["ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"]}]},Pedo:function(a,t,e){"use strict";var s={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"outframe"},[e("div",{staticClass:"contentframe"},[e("div",{staticClass:"inframe"},[e("br"),a.profile?e("talk",{attrs:{handle:"VSAY",deco:"center",head:a.profile.nick,sign:a.profile.provider,write_at:a.profile.write_at,img_src:a.profile.icon}},[a.profile.mail?e("a",{attrs:{href:"mailto:"+a.profile.mail}},[a._v("mail")]):a._e(),e("a",{attrs:{href:a.profile.token}},[a._v("token")])]):a._e(),e("report",{staticClass:"form",attrs:{handle:"MAKER",deco:"giji"}},[e("input",{attrs:{placeholder:"わかりやすく名前をつけよう！"}}),e("select"),e("hr"),e("text-editor",{attrs:{maxSize:500,maxRow:30},model:{value:a.maker[0],callback:function(t){a.$set(a.maker,0,t)},expression:"maker[0]"}})],1),e("post",{staticClass:"form",attrs:{handle:"public",deco:"giji"}},[e("h4",[a._v("設定-基本")]),e("table",[e("tbody",[e("tr",[e("th",{staticClass:"r"},[e("label",{attrs:{for:"players"}},[a._v("参加者")])]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:a.size.player,expression:"size.player"}],attrs:{id:"players",type:"number",min:"4",max:"50"},domProps:{value:a.size.player},on:{input:function(t){t.target.composing||(a.size.player=t.target.value)}}}),a._v("名")])]),e("tr",[e("th",{staticClass:"r"},[e("label",{attrs:{for:"mobs"}},[a._v("見物人")])]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:a.size.mob,expression:"size.mob"}],attrs:{id:"mobs",type:"number",min:"0",max:"20"},domProps:{value:a.size.mob},on:{input:function(t){t.target.composing||(a.size.mob=t.target.value)}}}),a._v("名")])]),e("tr",[e("th",{staticClass:"r"},[e("label",{attrs:{for:"update_at"}},[a._v("更新時刻")])]),e("td",[e("input",{attrs:{id:"update_at",type:"time"}})])]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("更新間隔")])]),e("td",[e("span",[e("btn",{attrs:{as:1},model:{value:a.interval,callback:function(t){a.interval=t},expression:"interval"}},[a._v("一日")]),e("btn",{attrs:{as:2},model:{value:a.interval,callback:function(t){a.interval=t},expression:"interval"}},[a._v("二日")]),e("btn",{attrs:{as:3},model:{value:a.interval,callback:function(t){a.interval=t},expression:"interval"}},[a._v("三日")])],1)])]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("夜")])]),e("td",[e("span",[e("btn",{attrs:{as:0},model:{value:a.night,callback:function(t){a.night=t},expression:"night"}},[a._v("なし")]),e("btn",{attrs:{as:5},model:{value:a.night,callback:function(t){a.night=t},expression:"night"}},[a._v(" 5分")]),e("btn",{attrs:{as:20},model:{value:a.night,callback:function(t){a.night=t},expression:"night"}},[a._v("20分")]),e("btn",{attrs:{as:60},model:{value:a.night,callback:function(t){a.night=t},expression:"night"}},[a._v("60分")])],1)])])])])]),e("post",{staticClass:"form",attrs:{handle:"SSAY",deco:"giji"}},[e("h4",[a._v("設定-会話")]),e("table",[e("tbody",[e("tr",[e("th",{staticClass:"r"},[e("label",{attrs:{for:"password"}},[a._v("合言葉")])]),e("td",[e("span",{attrs:{title:"指定すると、秘密のパスワードを入力した人だけが参加できます。"}},[e("input",{attrs:{id:"password",size:"20",placeholder:"誰でも参加できる"}})])])]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("発言制限")])]),e("td",[e("select")])]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("プレイヤー")])]),e("td",[e("check",{attrs:{as:"sign_show"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("ID公開")])],1)]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("仲間との会話")])]),e("td",[e("span",[e("check",{staticClass:"AIM",attrs:{as:"talk_aim",title:"個人的な耳打ちができる。"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("内緒話")]),e("check",{staticClass:"WSAY",attrs:{as:"talk_secret_grave",title:"狼・妖精と死者との間で会話ができる。"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("幽界トーク")])],1),e("span",[e("check",{staticClass:"VSAY",attrs:{as:"talk_mob_grave",title:"見物人と死者との間で会話ができる。"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("裏方見物人")]),e("check",{staticClass:"VSAY",attrs:{as:"talk_mob_alive",title:"見物人と生存者、死者との間で会話ができる。"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("舞台見物人")])],1)])]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("キャラクター")])]),e("td",[a._v(a._s(a.faces.list.length)+"名を選択中")])]),e("tr",[e("td",{attrs:{colspan:"2"}},[e("span",[e("check",{attrs:{set:"set",as:a.tags_all},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("all").label))]),e("check",{attrs:{set:"set",as:a.tags_giji},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("giji").label))]),e("check",{attrs:{set:"set",as:[]},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v("なし")])],1),e("span",[e("check",{attrs:{as:"shoji"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("shoji").label))]),e("check",{attrs:{as:"travel"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("travel").label))]),e("check",{attrs:{as:"stratos"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("stratos").label))]),e("check",{attrs:{as:"myth"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("myth").label))]),e("check",{attrs:{as:"asia"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("asia").label))]),e("check",{attrs:{as:"marchen"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("marchen").label))])],1),e("span",[e("check",{attrs:{as:"kid"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("kid").label))]),e("check",{attrs:{as:"young"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("young").label))]),e("check",{attrs:{as:"middle"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("middle").label))]),e("check",{attrs:{as:"elder"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("elder").label))])],1),e("span",[e("check",{attrs:{as:"river"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("river").label))]),e("check",{attrs:{as:"road"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("road").label))]),e("check",{attrs:{as:"immoral"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("immoral").label))])],1),e("span",[e("check",{attrs:{as:"guild"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("guild").label))]),e("check",{attrs:{as:"elegant"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("elegant").label))]),e("check",{attrs:{as:"ecclesia"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("ecclesia").label))])],1),e("span",[e("check",{attrs:{as:"medical"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("medical").label))]),e("check",{attrs:{as:"market"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("market").label))])],1),e("span",[e("check",{attrs:{as:"apartment"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("apartment").label))]),e("check",{attrs:{as:"servant"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("servant").label))]),e("check",{attrs:{as:"farm"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("farm").label))]),e("check",{attrs:{as:"government"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("government").label))])],1),e("span",[e("check",{attrs:{as:"god"},model:{value:a.tags,callback:function(t){a.tags=t},expression:"tags"}},[a._v(a._s(a.tag("god").label))])],1)])])])])]),e("post",{staticClass:"form",attrs:{handle:"SSAY",deco:"giji"}},[e("h4",[a._v("設定-会話")]),e("table",[e("tbody",[e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("最初の犠牲者")])]),e("td",[e("select",{directives:[{name:"model",rawName:"v-model",value:a.npc.face_id,expression:"npc.face_id"}],on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,function(a){return a.selected}).map(function(a){return"_value"in a?a._value:a.value});a.npc.face_id=t.target.multiple?e:e[0]}}},a._l(a.faces.list,function(t){return e("option",{domProps:{value:t.id}},[a._v(a._s(t.name))])})),e("select",{directives:[{name:"model",rawName:"v-model",value:a.npc.chr_job_id,expression:"npc.chr_job_id"}],on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,function(a){return a.selected}).map(function(a){return"_value"in a?a._value:a.value});a.npc.chr_job_id=t.target.multiple?e:e[0]}}},a._l(a.npc_jobs.list,function(t){return e("option",{domProps:{value:t.id}},[a._v(a._s(t.job))])}))])])])])]),e("talk",{staticClass:"form",attrs:{handle:"SSAY",deco:"giji",head:a.npc_name,face_id:a.npc.face_id}},[e("text-editor",{attrs:{placeholder:"冒頭の発言"},model:{value:a.npc.say[0],callback:function(t){a.$set(a.npc.say,0,t)},expression:"npc.say[0]"}})],1),e("talk",{staticClass:"form",attrs:{handle:"SSAY",deco:"giji",head:a.npc_name,face_id:a.npc.face_id}},[e("text-editor",{attrs:{placeholder:"１日目の発言"},model:{value:a.npc.say[1],callback:function(t){a.$set(a.npc.say,1,t)},expression:"npc.say[1]"}})],1),e("post",{staticClass:"form",attrs:{handle:"public",deco:"giji"}},[e("h4",[a._v("村のルール")]),e("hr"),e("text-editor",{attrs:{maxSize:500,maxRow:30},model:{value:a.maker[1],callback:function(t){a.$set(a.maker,1,t)},expression:"maker[1]"}})],1),e("post",{staticClass:"form",attrs:{handle:"public",deco:"giji"}},[e("h4",[a._v("国のルール")]),e("hr"),e("ul",a._l(a.n_rules,function(t){return e("li",[a._v(a._s(t.head))])}))]),e("post",{staticClass:"form",attrs:{handle:"private",deco:"giji"}},[e("h4",[a._v("設定-ゲーム")]),e("table",[e("tbody",[e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("投票")])]),e("td",[e("btn",{attrs:{as:"sign"},model:{value:a.vote,callback:function(t){a.vote=t},expression:"vote"}},[a._v("記名")]),e("btn",{attrs:{as:"hide"},model:{value:a.vote,callback:function(t){a.vote=t},expression:"vote"}},[a._v("匿名")]),e("check",{attrs:{as:"vote_entrust"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("委任")])],1)]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("投票権")])]),e("td",[e("check",{attrs:{as:"live"},model:{value:a.vote_by,callback:function(t){a.vote_by=t},expression:"vote_by"}},[a._v("生存者")]),e("check",{attrs:{as:"mob"},model:{value:a.vote_by,callback:function(t){a.vote_by=t},expression:"vote_by"}},[a._v("見物陪審員")]),e("check",{attrs:{as:"grave"},model:{value:a.vote_by,callback:function(t){a.vote_by=t},expression:"vote_by"}},[a._v("墓下陪審員")])],1)]),e("tr",[e("th",{staticClass:"r"},[e("label",[a._v("役職")])]),e("td",[e("check",{attrs:{as:"role_select"},model:{value:a.option,callback:function(t){a.option=t},expression:"option"}},[a._v("希望を募る")])],1)])])])]),e("report",{staticClass:"form",attrs:{handle:"MAKER",deco:"giji"}},[e("h4",[a._v("カード配分")])]),e("report",{staticClass:"form",attrs:{handle:"MAKER",deco:"giji"}},[e("a",{staticClass:"btn",on:{click:a.create}},[a._v("新しい村を作成")])])],1)])])},staticRenderFns:[]};t.a=s},chvM:function(a,t,e){(a.exports=e("FZ+f")(!1)).push([a.i,"th.t[data-v-145abe67]{vertical-align:top}label[data-v-145abe67]{white-space:nowrap}",""])},rII0:function(a,t,e){var s=e("chvM");"string"==typeof s&&(s=[[a.i,s,""]]),s.locals&&(a.exports=s.locals);e("rjj0")("0fbea674",s,!0)}});
//# sourceMappingURL=edit.e73651ffe4f9be5b9573.js.map