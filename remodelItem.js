//Ver:2.1.5.5
//Author:Nishisonic
//LastUpdate:2016/12/14

Calendar = Java.type("java.util.Calendar");

/* 定数リスト */
var DEFAULT         = "デフォルト";
var SEP             = ",";
var NONE            = "\n本日の改修は出来ません";
var ERROR           = "ERROR";
var UNKNOWN         = "不明";
var NOT_R           = function(name){ return name + "(改は不可)"; };
var NOT_R2          = function(name){ return name + "(改二は除く)"; };
var NOT_F           = function(name){ return name + "(航以降は不可)"; };
var NOT_UPGRADE     = function(name){ return name + "(ただし更新不可)"; };
var ONLY_R2_UPGRADE = function(name){ return name + "(改二のみ更新可)"; };
var NOT_R2_UPGRADE  = function(name){ return name + "(改二は除く、また更新不可)"; };
var UNDEFINED       = "    ";
var NO_DATA         = [UNDEFINED,UNDEFINED];
var C_NO_DATA       = {ID:UNKNOWN,NUM:"?"};
var NE_ENGINE       = -9999;
/* 
 * 【艦娘リスト】
 * 艦これ内部IDに合わせています。
 * IDだけでも良かったですが、物凄く可読性が落ちるのでこの形にしています。
 * 
 * 【仕様】
 * 日本艦…ローマ字
 * 外国艦…そのまま(アルファベット)
 * ※ただし、Верныйは日本艦と同じようにする
 * 
 * 無改造                  …そのまま
 * 艦娘名 + 改             …定数名に「_R」を付与(艦娘名 + _R)
 * 艦娘名 + (改二 or zwei) …定数名に「_R2」を付与(艦娘名 + _R2)
 * 艦娘名 + (改三 or drei) …定数名に「_R3」を付与(艦娘名 + _R3)
 * 
 * ※空白(Grafなど)は、アンダーバーで代用
 * ※マイナス(U-511)は、削る
 * ※千歳、千代田の場合は特例
 *   例：千歳
 *       千歳　　　…CHITOSE
 *       千歳改　　…CHITOSE_R
 *       千歳甲　　…CHITOSE_K
 *       千歳航　　…CHITOSE_F
 *       千歳航改　…CHITOSE_FR
 *       千歳航改二…CHITOSE_FR2
 * ※艦娘名 + 甲 …定数名に「K」を付与(艦娘名 + K)
 * 　艦娘名 + 乙 …定数名に「O」を付与(艦娘名 + O)
 * 　艦娘名 + 丙 …定数名に「H」を付与(艦娘名 + H)
 * 　艦娘名 + 丁 …定数名に「T」を付与(艦娘名 + T)
 */
var MUTSUKI            = "睦月";               //ID:1
var KISARAGI           = "如月";               //ID:2
//var NULL             = "NULL";               //ID:3
//var NULL             = "NULL";               //ID:4
//var NULL             = "NULL";               //ID:5
var NAGATSUKI          = "長月";               //ID:6
var MIKAZUKI           = "三日月";             //ID:7
//var NULL             = "NULL";               //ID:8
var FUBUKI             = "吹雪";               //ID:9
var SHIRAYUKI          = "白雪";               //ID:10
var MIYUKI             = "深雪";               //ID:11
var ISONAMI            = "磯波";               //ID:12
var AYANAMI            = "綾波";               //ID:13
var SHIKINAMI          = "敷波";               //ID:14
var AKEBONO            = "曙";                 //ID:15
var USHIO              = "潮";                 //ID:16
var KAGERO             = "陽炎";               //ID:17
var SHIRANUI           = "不知火";             //ID:18
var KUROSHIO           = "黒潮";               //ID:19
var YUKIKAZE           = "雪風";               //ID:20
var NAGARA             = "長良";               //ID:21
var ISUZU              = "五十鈴";             //ID:22
var YURA               = "由良";               //ID:23
var OI                 = "大井";               //ID:24
var KITAKAMI           = "北上";               //ID:25
var FUSO               = "扶桑";               //ID:26
var YAMASHIRO          = "山城";               //ID:27
var SATSUKI            = "皐月";               //ID:28
var FUMIZUKI           = "文月";               //ID:29
var KIKUZUKI           = "菊月";               //ID:30
var MOCHIZUKI          = "望月";               //ID:31
var HATSUYUKI          = "初雪";               //ID:32
var MURAKUMO           = "叢雲";               //ID:33
var AKATSUKI           = "暁";                 //ID:34
var HIBIKI             = "響";                 //ID:35
var IKADUCHI           = "雷";                 //ID:36
var INADUMA            = "電";                 //ID:37
var HATSUHARU          = "初春";               //ID:38
var NENOHI             = "子日";               //ID:39
var WAKABA             = "若葉";               //ID:40
var HATSUSHIMO         = "初霜";               //ID:41
var SHIRATSUYU         = "白露";               //ID:42
var SHIGURE            = "時雨";               //ID:43
var MURASAME           = "村雨";               //ID:44
var YUDACHI            = "夕立";               //ID:45
var SAMIDARE           = "五月雨";             //ID:46
var SUZUKAZE           = "涼風";               //ID:47
var ARARE              = "霰";                 //ID:48
var KASUMI             = "霞";                 //ID:49
var SHIMAKAZE          = "島風";               //ID:50
var TENRYU             = "天龍";               //ID:51
var TATSUTA            = "龍田";               //ID:52
var NATORI             = "名取";               //ID:53
var SENDAI             = "川内";               //ID:54
var JINTSU             = "神通";               //ID:55
var NAKA               = "那珂";               //ID:56
var OI_R               = "大井改";             //ID:57
var KITAKAMI_R         = "北上改";             //ID:58
var FURUTAKA           = "古鷹";               //ID:59
var KAKO               = "加古";               //ID:60
var AOBA               = "青葉";               //ID:61
var MYOKO              = "妙高";               //ID:62
var NACHI              = "那智";               //ID:63
var ASHIGARA           = "足柄";               //ID:64
var HAGURO             = "羽黒";               //ID:65
var TAKAO              = "高雄";               //ID:66
var ATAGO              = "愛宕";               //ID:67
var MAYA               = "摩耶";               //ID:68
var CHOKAI             = "鳥海";               //ID:69
var MOGAMI             = "最上";               //ID:70
var TONE               = "利根";               //ID:71
var CHIKUMA            = "筑摩";               //ID:72
var MOGAMI_R           = "最上改";             //ID:73
var SHOHO              = "祥鳳";               //ID:74
var HIYO               = "飛鷹";               //ID:75
var RYUJO              = "龍驤";               //ID:76
var ISE                = "伊勢";               //ID:77
var KONGO              = "金剛";               //ID:78
var HARUNA             = "榛名";               //ID:79
var NAGATO             = "長門";               //ID:80
var MUTSU              = "陸奥";               //ID:81
var ISE_R              = "伊勢改";             //ID:82
var AKAGI              = "赤城";               //ID:83
var KAGA               = "加賀";               //ID:84
var KIRISHIMA          = "霧島";               //ID:85
var HIEI               = "比叡";               //ID:86
var HYUGA              = "日向";               //ID:87
var HYUGA_R            = "日向改";             //ID:88
var HOSHO              = "鳳翔";               //ID:89
var SORYU              = "蒼龍";               //ID:90
var HIRYU              = "飛龍";               //ID:91
var JUNYO              = "隼鷹";               //ID:92
var OBORO              = "朧";                 //ID:93
var SAZANAMI           = "漣";                 //ID:94
var ASASHIO            = "朝潮";               //ID:95
var OSHIO              = "大潮";               //ID:96
var MICHISHIO          = "満潮";               //ID:97
var ARASHIO            = "荒潮";               //ID:98
var KUMA               = "球磨";               //ID:99
var TAMA               = "多摩";               //ID:100
var KISO               = "木曾";               //ID:101
var CHITOSE            = "千歳";               //ID:102
var CHIYODA            = "千代田";             //ID:103
var CHITOSE_R          = "千歳改";             //ID:104
var CHIYODA_R          = "千代田改";           //ID:105
var CHITOSE_K          = "千歳甲";             //ID:106
var CHIYODA_K          = "千代田甲";           //ID:107
var CHITOSE_F          = "千歳航";             //ID:108
var CHIYODA_F          = "千代田航";           //ID:109
var SHOKAKU            = "翔鶴";               //ID:110
var ZUIKAKU            = "瑞鶴";               //ID:111
var ZUIKAKU_R          = "瑞鶴改";             //ID:112
var KINU               = "鬼怒";               //ID:113
var ABUKUMA            = "阿武隈";             //ID:114
var YUBARI             = "夕張";               //ID:115
var ZUIHO              = "瑞鳳";               //ID:116
var ZUIHO_R            = "瑞鳳改";             //ID:117
var OI_R2              = "大井改二";           //ID:118
var KITAKAMI_R2        = "北上改二";           //ID:119
var MIKUMA             = "三隈";               //ID:120
var MIKUMA_R           = "三隈改";             //ID:121
var MAIKAZE            = "舞風";               //ID:122
var KINUGASA           = "衣笠";               //ID:123
var SUZUYA             = "鈴谷";               //ID:124
var KUMANO             = "熊野";               //ID:125
var I168               = "伊168";              //ID:126
var I58                = "伊58";               //ID:127
var I8                 = "伊8";                //ID:128
var SUZUYA_R           = "鈴谷改";             //ID:129
var KUMANO_R           = "熊野改";             //ID:130
var YAMATO             = "大和";               //ID:131
var AKIGUMO            = "秋雲";               //ID:132
var YUGUMO             = "夕雲";               //ID:133
var MAKIGUMO           = "巻雲";               //ID:134
var NAGANAMI           = "長波";               //ID:135
var YAMATO_R           = "大和改";             //ID:136
var AGANO              = "阿賀野";             //ID:137
var NOSHIRO            = "能代";               //ID:138
var YAHAGI             = "矢矧";               //ID:139
var SAKAWA             = "酒匂";               //ID:140
var ISUZU_R2           = "五十鈴改二";         //ID:141
var KINUGASA_R2        = "衣笠改二";           //ID:142
var MUSASHI            = "武蔵";               //ID:143
var YUDACHI_R2         = "夕立改二";           //ID:144
var SHIGURE_R2         = "時雨改二";           //ID:145
var KISO_R2            = "木曾改二";           //ID:146
var VERUNUI            = "Верный";             //ID:147
var MUSASHI_R          = "武蔵改";             //ID:148
var KONGO_R2           = "金剛改二";           //ID:149
var HIEI_R2            = "比叡改二";           //ID:150
var HARUNA_R2          = "榛名改二";           //ID:151
var KIRISHIMA_R2       = "霧島改二";           //ID:152
var TAIHO              = "大鳳";               //ID:153
var KATORI             = "香取";               //ID:154
var I401               = "伊401";              //ID:155
var TAIHO_R            = "大鳳改";             //ID:156
var RYUJO_R2           = "龍驤改二";           //ID:157
var SENDAI_R2          = "川内改二";           //ID:158
var JINTSU_R2          = "神通改二";           //ID:159
var NAKA_R2            = "那珂改二";           //ID:160
var AKITSUMARU         = "あきつ丸";           //ID:161
//var NULL             = "NULL";               //ID:162
var MARUYU             = "まるゆ";             //ID:163
var YAYOI              = "弥生";               //ID:164
var UZUKI              = "卯月";               //ID:165
var AKITSUMARU_R       = "あきつ丸改";         //ID:166
var ISOKAZE            = "磯風";               //ID:167
var URAKAZE            = "浦風";               //ID:168
var TANIKAZE           = "谷風";               //ID:169
var HAMAKAZE           = "浜風";               //ID:170
var BISMARCK           = "Bismarck";           //ID:171
var BISMARCK_R         = "Bismarck改";         //ID:172
var BISMARCK_R2        = "Bismarck zwei";      //ID:173
var Z1                 = "Z1";                 //ID;174
var Z3                 = "Z3";                 //ID:175
var PRINZ_EUGEN        = "Prinz Eugen";        //ID:176
var PRINZ_EUGEN_R      = "Prinz Eugen改";      //ID:177
var BISMARCK_R3        = "Bismarck drei";      //ID:178
var Z1_R2              = "Z1 zwei";            //ID:179
var Z3_R2              = "Z3 zwei";            //ID:180
var AMATSUKAZE         = "天津風";             //ID:181
var AKASHI             = "明石";               //ID:182
var OYODO              = "大淀";               //ID:183
var TAIGEI             = "大鯨";               //ID:184
var RYUHO              = "龍鳳";               //ID:185
var TOKITSUKAZE        = "時津風";             //ID:186
var AKASHI_R           = "明石改";             //ID:187
var TONE_R2            = "利根改二";           //ID:188
var CHIKUMA_R2         = "筑摩改二";           //ID:189
var HATSUKAZE          = "初風";               //ID:190
var I19                = "伊19";               //ID:191
var NACHI_R2           = "那智改二";           //ID:192
var ASHIGARA_R2        = "足柄改二";           //ID:193
var HAGURO_R2          = "羽黒改二";           //ID:194
var AYANAMI_R2         = "綾波改二";           //ID:195
var HIRYU_R2           = "飛龍改二";           //ID:196
var SORYU_R2           = "蒼龍改二";           //ID:197
var OSHIO_R2           = "大潮改二";           //ID:199
var ABUKUMA_R2         = "阿武隈改二";         //ID:200
var FUBUKI_R           = "吹雪改";             //ID:201
var SHIRAYUKI_R        = "白雪改";             //ID:202
var HATUYUKI_R         = "初雪改";             //ID:203
var MIYUKI_R           = "深雪改";             //ID:204
var MURAKUMO_R         = "叢雲改";             //ID:205
var ISONAMI_R          = "磯波改";             //ID:206
var AYANAMI_R          = "綾波改";             //ID:207
var SHIKINAMI_R        = "敷波改";             //ID:208
var KONGO_R            = "金剛改";             //ID:209
var HIEI_R             = "比叡改";             //ID:210
var HARUNA_R           = "榛名改";             //ID:211
var KIRISHIMA_R        = "霧島改";             //ID:212
var TENRYU_R           = "天龍改";             //ID:213
var TATSUTA_R          = "龍田改";             //ID:214
var KUMA_R             = "球磨改";             //ID:215
var TAMA_R             = "多摩改";             //ID:216
var KISO_R             = "木曾改";             //ID:217
var NAGARA_R           = "長良改";             //ID:218
var ISUZU_R            = "五十鈴改";           //ID:219
var YURA_R             = "由良改";             //ID:220
var NATORI_R           = "名取改";             //ID:221
var SENDAI_R           = "川内改";             //ID:222
var JINTSU_R           = "神通改";             //ID:223
var NAKA_R             = "那珂改";             //ID:224
var KAGERO_R           = "陽炎改";             //ID:225
var SHIRANUI_R         = "不知火改";           //ID:226
var KUROSHIO_R         = "黒潮改";             //ID:227
var YUKIKAZE_R         = "雪風改";             //ID:228
var SHIMAKAZE_R        = "島風改";             //ID:229
var OBORO_R            = "朧改";               //ID:230
var AKEBONO_R          = "曙改";               //ID:231
var SAZANAMI_R         = "漣改";               //ID:232
var USHIO_R            = "潮改";               //ID:233
var AKATSUKI_R         = "暁改";               //ID:234
var HIBIKI_R           = "響改";               //ID:235
var IKADUCHI_R         = "雷改";               //ID:236
var INADUMA_R          = "電改";               //ID:237
var HATSUHARU_R        = "初春改";             //ID:238
var NENOHI_R           = "子日改";             //ID:239
var WAKABA_R           = "若葉改";             //ID:240
var HATSUSHIMO_R       = "初霜改";             //ID:241
var SHIRATSHUYU_R      = "白露改";             //ID:242
var SHIGURE_R          = "時雨改";             //ID:243
var MURASAME_R         = "村雨改";             //ID:244
var YUDACHI_R          = "夕立改";             //ID:245
var SAMIDARE_R         = "五月雨改";           //ID:246
var SUZUKAZE_R         = "涼風改";             //ID:247
var ASASHIO_R          = "朝潮改";             //ID:248
var OSHIO_R            = "大潮改";             //ID:249
var MICHISHIO_R        = "満潮改";             //ID:250
var ARASHIO_R          = "荒潮改";             //ID:251
var ARARE_R            = "霰改";               //ID:252
var KASUMI_R           = "霞改";               //ID:253
var MUTSUKI_R          = "睦月改";             //ID:254
var KISARAGI_R         = "如月改";             //ID:255
var SATSUKI_R          = "皐月改";             //ID:256
var FUMIZUKI_R         = "文月改";             //ID:257
var NAGATSUKI_R        = "長月改";             //ID:258
var KIKUZUKI_R         = "菊月改";             //ID:259
var MIKAZUKI_R         = "三日月改";           //ID:260
var MOCHIZUKI_R        = "望月改";             //ID:261
var FURUTAKA_R         = "古鷹改";             //ID:262
var KAKO_R             = "加古改";             //ID:263
var AOBA_R             = "青葉改";             //ID:264
var MYOKO_R            = "妙高改";             //ID:265
var NACHI_R            = "那智改";             //ID:266
var ASHIGARA_R         = "足柄改";             //ID:267
var HAGURO_R           = "羽黒改";             //ID:268
var TAKAO_R            = "高雄改";             //ID:269
var ATAGO_R            = "愛宕改";             //ID:270
var MAYA_R             = "摩耶改";             //ID:271
var CHOKAI_R           = "鳥海改";             //ID:272
var TONE_R             = "利根改";             //ID:273
var CHIKUMA_R          = "筑摩改";             //ID:274
var NAGATO_R           = "長門改";             //ID:275
var MUTSU_R            = "陸奥改";             //ID:276
var AKAGI_R            = "赤城改";             //ID:277
var KAGA_R             = "加賀改";             //ID:278
var SORYU_R            = "蒼龍改";             //ID:279
var HIRYU_R            = "飛龍改";             //ID:280
var RYUJO_R            = "龍驤改";             //ID:281
var SHOHO_R            = "祥鳳改";             //ID:282
var HIYO_R             = "飛鷹改";             //ID:283
var JUNYO_R            = "隼鷹改";             //ID:284
var HOSHO_R            = "鳳翔改";             //ID:285
var FUSO_R             = "扶桑改";             //ID:286
var YAMASHIRO_R        = "山城改";             //ID:287
var SHOKAKU_R          = "翔鶴改";             //ID:288
var KINU_R             = "鬼怒改";             //ID:289
var ABUKUMA_R          = "阿武隈改";           //ID:290
var CHITOSE_FR         = "千歳航改";           //ID:291
var CHIYODA_FR         = "千代田航改";         //ID:292
var YUBARI_R           = "夕張改";             //ID:293
var MAIKAZE_R          = "舞風改";             //ID:294
var KINUGASA_R         = "衣笠改";             //ID:295
var CHITOSE_FR2        = "千歳航改二";         //ID:296
var CHIYODA_FR2        = "千代田航改二";       //ID:297
var HATSUKAZE_R        = "初風改";             //ID:300
var AKIGUMO_R          = "秋雲改";             //ID:301
var YUGUMO_R           = "夕雲改";             //ID:302
var MAKIGUMO_R         = "巻雲改";             //ID:303
var NAGANAMI_R         = "長波改";             //ID:304
var AGANO_R            = "阿賀野改";           //ID:305
var NOSHIRO_R          = "能代改";             //ID:306
var YAHAGI_R           = "矢矧改";             //ID:307
var YAYOI_R            = "弥生改";             //ID:308
var UZUKI_R            = "卯月改";             //ID:309
var Z1_R               = "Z1改";               //ID:310
var Z3_R               = "Z3改";               //ID:311
var HAMAKAZE_R         = "浜風改";             //ID:312
var TANIKAZE_R         = "谷風改";             //ID:313
var SAKAWA_R           = "酒匂改";             //ID:314
//var NULL             = "NULL";               //ID:315
var AMATSUKAZE_R       = "天津風改";           //ID:316
var URAKAZE_R          = "浦風改";             //ID:317
var RYUHO_R            = "龍鳳改";             //ID:318
var MYOKO_R2           = "妙高改二";           //ID:319
var ISOKAZE_R          = "磯風改";             //ID:320
var OYODO_R            = "大淀改";             //ID:321
var TOKITSUKAZE_R      = "時津風改";           //ID:322
var HARUSAME_R         = "春雨改";             //ID:323
var HAYASHIMO_R        = "早霜改";             //ID:324
var KIYOSHIMO_R        = "清霜改";             //ID:325
var HATSUHARU_R2       = "初春改二";           //ID:326
var ASAGUMO_R          = "朝雲改";             //ID:327
var YAMAGUMO_R         = "山雲改";             //ID:328
var NOWAKI_R           = "野分改";             //ID:329
var AKIZUKI_R          = "秋月改";             //ID:330
var AMAGI              = "天城";               //ID:331
var KATSURAGI          = "葛城";               //ID:332
//var NULL             = "NULL";               //ID:333
var U511_R             = "U-511改";            //ID:334
//var NULL             = "NULL";               //ID:335
//var NULL             = "NULL";               //ID:336
//var NULL             = "NULL";               //ID:337
//var NULL             = "NULL";               //ID:338
//var NULL             = "NULL";               //ID:339
//var NULL             = "NULL";               //ID:340
//var NULL             = "NULL";               //ID:341
//var NULL             = "NULL";               //ID:342
var KATORI_R           = "香取改";             //ID:343
var ASASHIMO_R         = "朝霜改";             //ID:344
var TAKANAMI_R         = "高波改";             //ID:345
var TERUZUKI_R         = "照月改";             //ID:346
var LIBECCIO_R         = "Libeccio改";         //ID:347
var MIZUHO_R           = "瑞穂改";             //ID:348
var KAZAGUMO_R         = "風雲改";             //ID:349
var UMIKAZE_R          = "海風改";             //ID:350
var KAWAKAZE_R         = "江風改";             //ID:351
var HAYASUI_R          = "速吸改";             //ID:352
var GRAF_ZEPPELIN_R    = "Graf Zeppelin改";    //ID:353
var ARASHI_R           = "嵐改";               //ID:354
var HAGIKAZE_R         = "萩風改";             //ID:355
var KASHIMA_R          = "鹿島改";             //ID:356
var HATSUZUKI_R        = "初月改";             //ID:357
var ZARA_R             = "Zara改";             //ID:358
var OKINAMI_R          = "沖波改";             //ID:359
var IOWA_R             = "Iowa改";             //ID:360
var POLA_R             = "Pola改";             //ID:361
var OYASHIO_R          = "親潮改";             //ID:362
var HARUKAZE_R         = "春風改";             //ID:363
var WARSPITE_R         = "Warspite改";         //ID:364
var AQUILA_R           = "Aquila改";           //ID:365
var MINAZUKI_R         = "水無月改";           //ID:366
var I26_R              = "伊26改";             //ID:367
var URANAMI_R          = "浦波改";             //ID:368
var YAMAKAZE_R         = "山風改";             //ID:369
var ASAKAZE_R          = "朝風改";             //ID:370
//var NULL             = "NULL";               //ID:371
var COMMANDANT_TASTE_R = "Commandant Taste改"; //ID:372
var I168_R             = "伊168改";            //ID:398
var I58_R              = "伊58改";             //ID:399
var I8_R               = "伊8改";              //ID:400
var I19_R              = "伊19改";             //ID:401
var MARUYU_R           = "まるゆ改"            //ID:402
var I401_R             = "伊401改";            //ID:403
var UNRYU              = "雲龍";               //ID:404
var HARUSAME           = "春雨";               //ID:405
var UNRYU_R            = "雲龍改";             //ID:406
var USHIO_R2           = "潮改二";             //ID:407
var JUNYO_R2           = "隼鷹改二";           //ID:408
var HAYASHIMO          = "早霜";               //ID:409
var KIYOSHIMO          = "清霜";               //ID:410
var FUSO_R2            = "扶桑改二";           //ID:411
var YAMASHIRO_R2       = "山城改二";           //ID:412
var ASAGUMO            = "朝雲";               //ID:413
var YAMAGUMO           = "山雲";               //ID:414
var NOWAKI             = "野分";               //ID:415
var FURUTAKA_R2        = "古鷹改二";           //ID:416
var KAKO_R2            = "加古改二";           //ID:417
var SATSUKI_R2         = "皐月改二";           //ID:418
var HATSUSHIMO_R2      = "初霜改二";           //ID:419
var MURAKUMO_R2        = "叢雲改二";           //ID:420
var AKIZUKI            = "秋月";               //ID:421
var TERUZUKI           = "照月";               //ID:422
var HATSUZUKI          = "初月";               //ID:423
var TAKANAMI           = "高波";               //ID:424
var ASASHIMO           = "朝霜";               //ID:425
var FUBUKI_R2          = "吹雪改二";           //ID:426
var CHOKAI_R2          = "鳥海改二";           //ID:427
var MAYA_R2            = "摩耶改二";           //ID:428
var AMAGI_R            = "天城改";             //ID:429
var KATSURAGI_R        = "葛城改";             //ID:430
var U511               = "U-511";              //ID:431
var GRAF_ZEPPELIN      = "Graf Zeppelin";      //ID:432
var SARATOGA           = "Saratoga";           //ID:433
var MUTSUKI_R2         = "睦月改二";           //ID:434
var KISARAGI_R2        = "如月改二";           //ID:435
var RO500              = "呂500";              //ID:436
var AKATSUKI_R2        = "暁改二";             //ID:437
var SARATOGA_R         = "Saratoga改";         //ID:438
var WARSPITE           = "Warspite";           //ID:439
var IOWA               = "Iowa";               //ID:440
var LITTORIO           = "Littorio";           //ID:441
var ROMA               = "Roma";               //ID:442
var LIBECCIO           = "Libeccio";           //ID:443
var AQUILA             = "Aquila";             //ID:444
var AKITSUSHIMA        = "秋津洲";             //ID:445
var ITALIA             = "Italia";             //ID:446
var ROMA_R             = "Roma";               //ID:447
var ZARA               = "Zara";               //ID:448
var POLA               = "Pola";               //ID:449
var AKITSUSHIMA_R      = "秋津洲改";           //ID:450
var MIZUHO             = "瑞穂";               //ID:451
var OKINAMI            = "沖波";               //ID:452
var KAZAGUMO           = "風雲";               //ID:453
var ARASHI             = "嵐";                 //ID:454
var HAGIKAZE           = "萩風";               //ID:455
var OYASHIO            = "親潮";               //ID:456
var YAMAKAZE           = "山風";               //ID:457
var UMIKAZE            = "海風";               //ID:458
var KAWAKAZE           = "江風";               //ID:459
var HAYASUI            = "速吸";               //ID:460
var SHOKAKU_R2         = "翔鶴改二";           //ID:461
var ZUIKAKU_R2         = "瑞鶴改二";           //ID:462
var ASASHIO_R2         = "朝潮改二";           //ID:463
var KASUMI_R2          = "霞改二";             //ID:464
var KASHIMA            = "鹿島";               //ID:465
var SHOKAKU_R2K        = "翔鶴改二甲";         //ID:466
var ZUIKAKU_R2K        = "瑞鶴改二甲";         //ID:467
var ASASHIO_R2T        = "朝潮改二丁";         //ID:468
var KAWAKAZE_R2        = "江風改二";           //ID:469
var KASUMI_R2O         = "霞改二乙";           //ID:470
var KAMIKAZE           = "神風";               //ID:471
var ASAKAZE            = "朝風";               //ID:472
var HARUKAZE           = "春風";               //ID:473
//var NULL             = "NULL";               //ID:474
//var NULL             = "NULL";               //ID:475
var KAMIKAZE_R         = "神風改";             //ID:476
//var NULL             = "NULL";               //ID:477
//var NULL             = "NULL";               //ID:478
//var NULL             = "NULL";               //ID:479
//var NULL             = "NULL";               //ID:480
var MINAZUKI           = "水無月";             //ID:481
//var NULL             = "NULL";               //ID:482
var I26                = "伊26";               //ID:483
//var NULL             = "NULL";               //ID:484
//var NULL             = "NULL";               //ID:485
var URANAMI            = "浦波";               //ID:486
var KINU_R2            = "鬼怒改二";           //ID:487
//var NULL             = "NULL";               //ID:488
//var NULL             = "NULL";               //ID:489
//var NULL             = "NULL";               //ID:490
var COMMANDANT_TASTE   = "Commandant Taste";   //ID:491

var word = "id_";


var remodelItemData = {
    /* 小口径主砲 */
    /** 12.7cm連装砲 */
    id_2:{
        ID:2,
        MATERIAL:[ 10, 30, 60,  0],
        helperShip:{
            SUNDAY:   [DEFAULT],
            MONDAY:   [DEFAULT],
            TUESDAY:  [DEFAULT],
            WEDNESDAY:[DEFAULT],
            THURSDAY: [DEFAULT],
            FRIDAY:   [DEFAULT],
            SATURDAY: [DEFAULT],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:{ID:  2,NUM:1}, //12.7cm連装砲*1
        },
        upgrade:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 3, 6],
            consumes:{ID:  2,NUM:2}, //12.7cm連装砲*2
            ID:63, //12.7cm連装砲B型改二
            STAR:0,
        },
    },
    /** 12.7cm連装砲B型改二 */
    id_63:{
        ID:63,
        MATERIAL:[ 10, 40, 70,  0],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [YUDACHI_R2,AYANAMI_R2],
            TUESDAY:  [YUDACHI_R2,AYANAMI_R2],
            WEDNESDAY:[YUDACHI_R2,AYANAMI_R2],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 2, 2],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 4],
            consumes:{ID: 63,NUM:1}, //12.7cm連装砲B型改二*1
        },
        upgrade:null,
    },
    /** 10cm高角砲+高射装置 */
    id_122:{
        ID:122,
        MATERIAL:[ 10, 60,150, 50],
        helperShip:{
            SUNDAY:   [TERUZUKI],
            MONDAY:   [AKIZUKI,HATSUZUKI],
            TUESDAY:  [AKIZUKI,HATSUZUKI],
            WEDNESDAY:[AKIZUKI,HATSUZUKI],
            THURSDAY: [AKIZUKI,TERUZUKI,HATSUZUKI],
            FRIDAY:   [TERUZUKI],
            SATURDAY: [TERUZUKI],
        },
        star0to6:{
            RESEARCH:[ 6, 7],
            SCREW:   [ 3, 4],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 4, 7],
            consumes:{ID:  3,NUM:2}, //10cm連装高角砲*2
        },
        upgrade:null,
    },
    /* 中口径主砲 */
    /** 14cm単装砲 */
    id_4:{
        ID:4,
        MATERIAL:[ 10, 50, 80,  0],
        helperShip:{
            SUNDAY:   [DEFAULT],
            MONDAY:   [DEFAULT],
            TUESDAY:  [DEFAULT],
            WEDNESDAY:[DEFAULT],
            THURSDAY: [DEFAULT],
            FRIDAY:   [DEFAULT],
            SATURDAY: [DEFAULT],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:{ID:  4,NUM:1}, //14cm単装砲*1
        },
        upgrade:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 3, 6],
            consumes:{ID:  4,NUM:2}, //14cm単装砲*2
            ID:119, //14cm連装砲
            STAR:0,
        },
    },
    /** 14cm連装砲 */
    id_119:{
        ID:119,
        MATERIAL:[ 10, 60,100,  0],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [YUBARI],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [YUBARI],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 2, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 4],
            SCREW:   [ 2, 3],
            consumes:{ID:119,NUM:1}, //14cm連装砲*1
        },
        upgrade:null,
    },
    /** 15.2cm連装砲 */
    id_65:{
        ID:65,
        MATERIAL:[ 10, 70,100,  0],
        helperShip:{
            SUNDAY:   [NOSHIRO],
            MONDAY:   [NOSHIRO,YAHAGI],
            TUESDAY:  [YAHAGI],
            WEDNESDAY:[YAHAGI],
            THURSDAY: [AGANO,YAHAGI],
            FRIDAY:   [AGANO,NOSHIRO],
            SATURDAY: [AGANO,NOSHIRO],
        },
        star0to6:{
            RESEARCH:[ 2, 2],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 4],
            consumes:{ID: 65,NUM:1}, //15.2cm連装砲*1
        },
        upgrade:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 4,10],
            consumes:{ID: 28,NUM:1}, //22号対水上電探*1
            ID:139, //15.2cm連装砲改
            STAR:0,
        },
    },
    /** 15.2cm連装砲改 */
    id_139:{
        ID:139,
        MATERIAL:[ 20, 80,100, 30],
        helperShip:{
            SUNDAY:   [SAKAWA],
            MONDAY:   [SAKAWA],
            TUESDAY:  [SAKAWA],
            WEDNESDAY:[YAHAGI],
            THURSDAY: [YAHAGI],
            FRIDAY:   [YAHAGI],
            SATURDAY: [YAHAGI,SAKAWA],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 2, 3],
            consumes:{ID: 65,NUM:1}, //15.2cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 6],
            consumes:{ID: 65,NUM:1}, //15.2cm連装砲*1
        },
        upgrade:null,
    },
    /** 15.5cm三連装砲 */
    id_5:{
        ID:5,
        MATERIAL:[ 10, 90,120,  0],
        helperShip:{
            SUNDAY:   [OYODO],
            MONDAY:   [OYODO],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [MOGAMI],
            SATURDAY: [MOGAMI],
        },
        star0to6:{
            RESEARCH:[ 2, 2],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 4],
            consumes:{ID:  5,NUM:1}, //15.5cm三連装砲*1
        },
        upgrade:null,
    },
    /** 20.3cm連装砲 */
    id_6:{
        ID:6,
        MATERIAL:[ 10, 90,120,  0],
        helperShip:{
            SUNDAY:   [AOBA,KINUGASA],
            MONDAY:   [KINUGASA],
            TUESDAY:  [KINUGASA],
            WEDNESDAY:[KINUGASA],
            THURSDAY: [AOBA,KINUGASA],
            FRIDAY:   [AOBA,KINUGASA],
            SATURDAY: [AOBA,KINUGASA],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 3],
            consumes:{ID:  6,NUM:1}, //20.3cm連装砲*1
        },
        upgrade:{
            RESEARCH:[ 2, 5],
            SCREW:   [ 4,10],
            consumes:{ID:  6,NUM:2}, //20.3cm連装砲*2
            ID:90, //20.3cm(2号)連装砲
            STAR:0,
        },
    },
    /** 20.3cm(2号)連装砲 */
    id_90:{
        ID:90,
        MATERIAL:[ 10,100,130,  0],
        helperShip:{
            SUNDAY:   [MYOKO],
            MONDAY:   [MYOKO],
            TUESDAY:  [MYOKO],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 4],
            SCREW:   [ 2, 4],
            consumes:{ID: 90,NUM:1}, //20.3cm(2号)連装砲*1
        },
        upgrade:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 4,11],
            consumes:{ID: 90,NUM:1}, //20.3cm(2号)連装砲*1
            ID:50, //20.3cm(3号)連装砲
            STAR:0,
        },
    },
    /** 20.3cm(3号)連装砲 */
    id_50:{
        ID:50,
        MATERIAL:[ 10,110,140,  0],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [MIKUMA],
            WEDNESDAY:[MIKUMA],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 3, 5],
            consumes:{ID: 50,NUM:1}, //20.3cm(3号)連装砲*1
        },
        upgrade:null,
    },
    /* 大口径主砲 */
    /** 35.6cm連装砲 */
    id_7:{
        ID:7,
        MATERIAL:[ 20,240,300,  0],
        helperShip:{
            SUNDAY:   [FUSO],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [FUSO],
            SATURDAY: [FUSO],
        },
        star0to6:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 2, 4],
            consumes:{ID:  7,NUM:1}, //35.6cm連装砲*1
        },
        upgrade:{
            RESEARCH:[ 6,12],
            SCREW:   [ 5,12],
            consumes:{ID:  7,NUM:3}, //35.6cm連装砲*3
            ID:103, //試製35.6cm三連装砲
            STAR:0,
        },
    },
    /** 35.6cm連装砲(ダズル迷彩) */
    id_104:{
        ID:104,
        MATERIAL:[ 30,250,300, 30],
        helperShip:{
            SUNDAY:   [HARUNA_R2],
            MONDAY:   [HARUNA_R2],
            TUESDAY:  [HARUNA_R2],
            WEDNESDAY:[HARUNA_R2],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [HARUNA_R2],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 2, 3],
            consumes:{ID:  7,NUM:1}, //35.6cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 3, 5],
            consumes:{ID:  7,NUM:2}, //35.6cm連装砲*2
        },
        upgrade:null,
    },
    /** 試製35.6cm三連装砲 */
    id_103:{
        ID:103,
        MATERIAL:[ 30,330,390, 30],
        helperShip:{
            SUNDAY:   [YAMASHIRO_R2],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[KONGO_R2,FUSO_R2],
            THURSDAY: [KONGO_R2,HARUNA_R2,FUSO_R2,YAMASHIRO_R2],
            FRIDAY:   [HARUNA_R2,FUSO_R2,YAMASHIRO_R2],
            SATURDAY: [FUSO_R2,YAMASHIRO_R2],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 4],
            consumes:{ID:  7,NUM:2}, //35.6cm連装砲*2
        },
        star6toMax:{
            RESEARCH:[ 6, 9],
            SCREW:   [ 4, 7],
            consumes:{ID:  7,NUM:3}, //35.6cm連装砲*3
        },
        upgrade:null,
    },
    /** 38cm連装砲 */
    id_76:{
        ID:76,
        MATERIAL:[ 20,380,450, 20],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [BISMARCK],
            FRIDAY:   [BISMARCK],
            SATURDAY: [BISMARCK],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 2, 3],
            consumes:{ID:  7,NUM:1}, //35.6cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 5],
            consumes:{ID:  7,NUM:1}, //35.6cm連装砲*2
        },
        upgrade:{
            RESEARCH:[10,20],
            SCREW:   [ 6,13],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
            ID:114, //38cm連装砲改★+3
            STAR:3,
        },
    },
    /** 38cm連装砲改 */
    id_114:{
        ID:114,
        MATERIAL:[ 30,390,470, 30],
        helperShip:{
            SUNDAY:   [BISMARCK],
            MONDAY:   [BISMARCK],
            TUESDAY:  [BISMARCK],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 4],
            consumes:{ID:  8,NUM:1}, //41cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 6, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        upgrade:null,
    },
    /** 38.1cm Mk.I連装砲 */
    id_190:{
        ID:190,
        MATERIAL:[ 24,280,380,  0],
        helperShip:{
            SUNDAY:   [WARSPITE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [WARSPITE],
            FRIDAY:   [WARSPITE],
            SATURDAY: [WARSPITE],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 3, 4],
            consumes:{ID:  7,NUM:2}, //35.6cm連装砲*2
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        upgrade:{
            RESEARCH:[ 8,15],
            SCREW:   [ 6,12],
            consumes:{ID: 49,NUM:2}, //25mm単装機銃*2
            ID:192, //38.1cm Mk.I／N連装砲改
            STAR:0,
        },
    },
    /** 38.1cm Mk.I／N連装砲改 */
    id_192:{
        ID:192,
        MATERIAL:[ 28,320,420, 40],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [WARSPITE],
            WEDNESDAY:[WARSPITE],
            THURSDAY: [WARSPITE],
            FRIDAY:   [WARSPITE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:  8,NUM:1}, //41cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 4, 7],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        upgrade:null,
    },
    /** 381mm/50 三連装砲 */
    id_133:{
        ID:133,
        MATERIAL:[ 30,400,480, 20],
        helperShip:{
            SUNDAY:   [ROMA],
            MONDAY:   [ROMA],
            TUESDAY:  [LITTORIO],
            WEDNESDAY:[LITTORIO],
            THURSDAY: [LITTORIO],
            FRIDAY:   [LITTORIO],
            SATURDAY: [ROMA],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 2, 3],
            consumes:{ID:  7,NUM:1}, //35.6cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 5],
            consumes:{ID:  7,NUM:2}, //35.6cm連装砲*2
        },
        upgrade:{
            RESEARCH:[12,22],
            SCREW:   [ 7,14],
            consumes:{ID: 39,NUM:2}, //25mm連装機銃*2
            ID:137, //381mm/50 三連装砲改★+3
            STAR:3,
        },
    },
    /** 381mm/50 三連装砲改 */
    id_137:{
        ID:137,
        MATERIAL:[ 40,440,500, 40],
        helperShip:{
            SUNDAY:   [LITTORIO],
            MONDAY:   [LITTORIO],
            TUESDAY:  [ROMA],
            WEDNESDAY:[ROMA],
            THURSDAY: [ROMA],
            FRIDAY:   [ROMA],
            SATURDAY: [LITTORIO],
        },
        star0to6:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 4],
            consumes:{ID:  8,NUM:1}, //41cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 7,10],
            SCREW:   [ 4, 6],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        upgrade:null,
    },
    /** 41cm連装砲 */
    id_8:{
        ID:8,
        MATERIAL:[ 30,350,480,  0],
        helperShip:{
            SUNDAY:   [MUTSU],
            MONDAY:   [MUTSU],
            TUESDAY:  [NAGATO],
            WEDNESDAY:[NONE],
            THURSDAY: [MUTSU],
            FRIDAY:   [NAGATO],
            SATURDAY: [NAGATO],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 2, 3],
            consumes:{ID:  8,NUM:1}, //41cm連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 4, 7],
            SCREW:   [ 3, 6],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        upgrade:null,
    },
    /** 試製41cm三連装砲 */
    id_105:{
        ID:105,
        MATERIAL:[ 40,440,620, 40],
        helperShip:{
            SUNDAY:   [NAGATO_R],
            MONDAY:   [NAGATO_R],
            TUESDAY:  [MUTSU_R],
            WEDNESDAY:[NAGATO_R,MUTSU_R],
            THURSDAY: [NAGATO_R],
            FRIDAY:   [MUTSU_R],
            SATURDAY: [MUTSU_R],
        },
        star0to6:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 4, 6],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        star6toMax:{
            RESEARCH:[ 8,10],
            SCREW:   [ 5, 8],
            consumes:{ID:  8,NUM:3}, //41cm連装砲*3
        },
        upgrade:null,
    },
    /** 試製46cm連装砲 */
    id_117:{
        ID:117,
        MATERIAL:[ 40,420,650, 40],
        helperShip:{
            SUNDAY:   [YAMATO],
            MONDAY:   [YAMATO],
            TUESDAY:  [MUSASHI],
            WEDNESDAY:[MUSASHI],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 5, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:  8,NUM:2}, //41cm連装砲*2
        },
        star6toMax:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 4, 7],
            consumes:{ID:  8,NUM:3}, //41cm連装砲*3
        },
        upgrade:{
            RESEARCH:[12,18],
            SCREW:   [ 8,14],
            consumes:{ID:  8,NUM:4}, //41cm連装砲*4
            ID:9, //46cm三連装砲★+5
            STAR:5,
        },
    },
    /** 46cm三連装砲 */
    id_9:{
        ID:9,
        MATERIAL:[ 50,480,800, 50],
        helperShip:{
            SUNDAY:   [MUSASHI],
            MONDAY:   [MUSASHI],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [YAMATO],
            SATURDAY: [YAMATO],
        },
        star0to6:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 4, 6],
            consumes:{ID:  9,NUM:1}, //46cm三連装砲*1
        },
        star6toMax:{
            RESEARCH:[ 8,10],
            SCREW:   [ 5, 8],
            consumes:{ID:  9,NUM:2}, //46cm三連装砲*2
        },
        upgrade:null,
    },
    /** 試製51cm連装砲 */
    id_128:{
        ID:128,
        MATERIAL:[ 50,550,950, 80],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [YAMATO_R,MUSASHI_R],
            TUESDAY:  [YAMATO_R],
            WEDNESDAY:[MUSASHI_R],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 7, 9],
            SCREW:   [ 5, 7],
            consumes:{ID:  9,NUM:2}, //46cm三連装砲*2
        },
        star6toMax:{
            RESEARCH:[10,15],
            SCREW:   [ 7,10],
            consumes:{ID:  9,NUM:3}, //46cm三連装砲*3
        },
        upgrade:null,
    },
    /** 16inch三連装砲 Mk.7 */
    id_161:{
        ID:161,
        MATERIAL:[ 45,450,750,100],
        helperShip:{
            SUNDAY:   [IOWA],
            MONDAY:   [IOWA],
            TUESDAY:  [IOWA],
            WEDNESDAY:[IOWA],
            THURSDAY: [IOWA],
            FRIDAY:   [IOWA],
            SATURDAY: [IOWA],
        },
        star0to6:{
            RESEARCH:[10,15],
            SCREW:   [ 6, 8],
            consumes:{ID:  8,NUM:3}, //41cm連装砲*3
        },
        star6toMax:{
            RESEARCH:[16,24],
            SCREW:   [ 8,12],
            consumes:{ID:  9,NUM:3}, //46cm三連装砲*3
        },
        upgrade:{
            RESEARCH:[20,28],
            SCREW:   [12,20],
            consumes:{ID: 31,NUM:2}, //32号対水上電探*2
            ID:183, //16inch三連装砲 Mk.7＋GFCS
            STAR:0,
        },
    },
    /** 16inch三連装砲Mk.7+GFCS */
    id_183:{
        ID:183,
        MATERIAL:[ 45,500,770,500],
        helperShip:{
            SUNDAY:   [IOWA],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [IOWA],
            FRIDAY:   [IOWA],
            SATURDAY: [IOWA],
        },
        star0to6:{
            RESEARCH:[16,24],
            SCREW:   [ 8,12],
            consumes:{ID: 28,NUM:2}, //22号対水上電探*2
        },
        star6toMax:{
            RESEARCH:[16,24],
            SCREW:   [ 8,16],
            consumes:{ID: 31,NUM:2}, //32号対水上電探*2
        },
        upgrade:null,
    },
    /* 副砲 */
    /** 90mm単装高角砲 */
    id_135:{
        ID:135,
        MATERIAL:[ 10, 20, 70, 10],
        helperShip:{
            SUNDAY:   [ROMA],
            MONDAY:   [LITTORIO],
            TUESDAY:  [LITTORIO],
            WEDNESDAY:[LITTORIO],
            THURSDAY: [LITTORIO,ROMA],
            FRIDAY:   [ROMA],
            SATURDAY: [ROMA],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:{ID:  3,NUM:1}, //10cm連装高角砲*1
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:{ID:  3,NUM:2}, //10cm連装高角砲*2
        },
        upgrade:null,
    },
    /** 15.2cm単装砲 */
    id_11:{
        ID:11,
        MATERIAL:[ 10, 60, 90,  0],
        helperShip:{
            SUNDAY:   [AGANO,KONGO],
            MONDAY:   [AGANO,KONGO,YAMASHIRO],
            TUESDAY:  [AGANO,YAMASHIRO],
            WEDNESDAY:[YAMASHIRO],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [KONGO],
        },
        star0to6:{
            RESEARCH:[ 2, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 3],
            consumes:{ID: 11,NUM:1}, //15.2cm単装砲*1
        },
        upgrade:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 3, 5],
            consumes:{ID: 11,NUM:2}, //15.2cm単装砲*2
            ID:65, //15.2cm連装砲
            STAR:0,
        },
    },
    /** OTO 152mm三連装速射砲 */
    id_134:{
        ID:134,
        MATERIAL:[ 10, 90,120,  0],
        helperShip:{
            SUNDAY:   [LITTORIO,ROMA],
            MONDAY:   [ROMA],
            TUESDAY:  [LITTORIO],
            WEDNESDAY:[LITTORIO],
            THURSDAY: [ROMA],
            FRIDAY:   [ROMA],
            SATURDAY: [LITTORIO],
        },
        star0to6:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 3, 5],
            consumes:{ID:  5,NUM:1}, //15.5cm三連装砲*1
        },
        upgrade:null,
    },
    /* 魚雷 */
    /** 61cm三連装魚雷 */
    id_13:{
        ID:13,
        MATERIAL:[ 50, 70, 60, 20],
        helperShip:{
            SUNDAY:   [MURAKUMO],
            MONDAY:   [MURAKUMO],
            TUESDAY:  [MURAKUMO],
            WEDNESDAY:[NONE],
            THURSDAY: [NOT_R2(FUBUKI)],
            FRIDAY:   [NOT_R2(FUBUKI)],
            SATURDAY: [NOT_R2(FUBUKI)],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 13,NUM:1}, //61cm三連装魚雷*1
        },
        upgrade:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 4],
            consumes:{ID: 13,NUM:2}, //61cm三連装魚雷*2
            ID:125, //61cm三連装(酸素)魚雷
            STAR:0,
        },
    },
    /** 61cm三連装(酸素)魚雷 */
    id_125:{
        ID:125,
        MATERIAL:[ 60, 90, 60, 20],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [FUBUKI_R2],
            FRIDAY:   [FUBUKI_R2],
            SATURDAY: [FUBUKI_R2],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 1, 3],
            consumes:{ID: 13,NUM:1}, //61cm三連装魚雷*1
        },
        upgrade:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 3, 6],
            consumes:{ID: 13,NUM:2}, //61cm三連装魚雷*2
            ID:15, //61cm四連装(酸素)魚雷★+5
            STAR:5,
        },
    },
    /** 61cm四連装魚雷 */
    id_14:{
        ID:14,
        MATERIAL:[ 70,100, 70, 20],
        helperShip:{
            SUNDAY:   [DEFAULT],
            MONDAY:   [DEFAULT],
            TUESDAY:  [DEFAULT],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [DEFAULT],
            SATURDAY: [DEFAULT],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 14,NUM:1}, //61cm四連装魚雷*1
        },
        upgrade:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 3, 6],
            consumes:{ID: 14,NUM:2}, //61cm四連装魚雷*2
            ID:15, //61cm四連装(酸素)魚雷★+3
            STAR:3,
        },
    },
    /** 61cm四連装(酸素)魚雷 */
    id_15:{
        ID:15,
        MATERIAL:[ 80,120, 80, 20],
        helperShip:{
            SUNDAY:   [OI,KITAKAMI],
            MONDAY:   [OI,KITAKAMI],
            TUESDAY:  [OI,KITAKAMI],
            WEDNESDAY:[OI,KITAKAMI],
            THURSDAY: [OI,KITAKAMI],
            FRIDAY:   [OI,KITAKAMI],
            SATURDAY: [OI,KITAKAMI],
        },
        star0to6:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 2, 4],
            consumes:{ID: 15,NUM:1}, //61cm四連装(酸素)魚雷*1
        },
        upgrade:{
            RESEARCH:[ 5,10],
            SCREW:   [ 5,11],
            consumes:{ID: 15,NUM:3}, //61cm四連装(酸素)魚雷*3
            ID:58, //61cm五連装(酸素)魚雷
            STAR:0,
        },
    },
    /** 61cm五連装(酸素)魚雷 */
    id_58:{
        ID:58,
        MATERIAL:[100,150, 90, 30],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[SHIMAKAZE],
            THURSDAY: [SHIMAKAZE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 3, 5],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 3, 7],
            consumes:{ID: 58,NUM:1}, //61cm五連装(酸素)魚雷*1
        },
        upgrade:null,
    },
    /** 試製61cm六連装(酸素)魚雷 */
    id_179:{
        ID:179,
        MATERIAL:[120,180,120, 40],
        helperShip:{
            SUNDAY:   [SHIMAKAZE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[HATSUZUKI],
            THURSDAY: [HATSUZUKI],
            FRIDAY:   [HATSUZUKI],
            SATURDAY: [HATSUZUKI,SHIMAKAZE],
        },
        star0to6:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 5, 6],
            consumes:{ID: 15,NUM:2}, //61cm四連装(酸素)魚雷*2
        },
        star6toMax:{
            RESEARCH:[ 9,12],
            SCREW:   [ 6,12],
            consumes:{ID: 58,NUM:1}, //61cm五連装(酸素)魚雷*1
        },
        upgrade:null,
    },
    /* 艦上戦闘機 */
    /** 九六式艦戦 */
    id_19:{
        ID:19,
        MATERIAL:[ 70, 50,  0,170],
        helperShip:{
            SUNDAY:   [HOSHO],
            MONDAY:   [HOSHO],
            TUESDAY:  [HOSHO],
            WEDNESDAY:[HOSHO],
            THURSDAY: [HOSHO],
            FRIDAY:   [HOSHO],
            SATURDAY: [HOSHO],
        },
        star0to6:{
            RESEARCH:[ 1, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 19,NUM:1}, //九六式艦戦*1
        },
        star6toMax:{
            RESEARCH:[ 2, 4],
            SCREW:   [ 1, 3],
            consumes:{ID: 37,NUM:1}, //7.7mm機銃*1
        },
        upgrade:{
            RESEARCH:[ 3, 6],
            SCREW:   [ 2, 4],
            consumes:{ID: 19,NUM:2}, //九六式艦戦*2
            ID:20, //零式艦戦21型★+3
            STAR:3,
        },
    },
    /** 零式艦戦21型 */
    id_20:{
        ID:20,
        MATERIAL:[100, 80,  0,250],
        helperShip:{
            SUNDAY:   [KAGA],
            MONDAY:   [KAGA],
            TUESDAY:  [KAGA],
            WEDNESDAY:[NONE],
            THURSDAY: [AKAGI],
            FRIDAY:   [AKAGI],
            SATURDAY: [AKAGI],
        },
        star0to6:{
            RESEARCH:[ 2, 4],
            SCREW:   [ 2, 3],
            consumes:{ID: 20,NUM:1}, //零式艦戦21型*1
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 4],
            consumes:{ID: 20,NUM:2}, //零式艦戦21型*2
        },
        upgrade:{
            RESEARCH:[ 4, 7],
            SCREW:   [ 3, 5],
            consumes:{ID: 37,NUM:2}, //7.7mm機銃*2
            ID:181, //零式艦戦32型★+3
            STAR:3,
        },
    },
    /** 零式艦戦21型(熟練) */
    id_96:{
        ID:96,
        MATERIAL:[100, 80,  0,250],
        helperShip:{
            SUNDAY:   [KAGA],
            MONDAY:   [KAGA],
            TUESDAY:  [KAGA],
            WEDNESDAY:[NONE],
            THURSDAY: [AKAGI],
            FRIDAY:   [AKAGI],
            SATURDAY: [AKAGI],
        },
        star0to6:{
            RESEARCH:[ 2, 4],
            SCREW:   [ 2, 3],
            consumes:{ID: 20,NUM:2}, //零式艦戦21型*2
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 5],
            consumes:{ID: 20,NUM:3}, //零式艦戦21型*3
        },
        upgrade:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 3, 5],
            consumes:{ID: 37,NUM:3}, //7.7mm機銃*3
            ID:182, //零式艦戦32型(熟練)★+3
            STAR:3,
        },
    },
    /** 零式艦戦32型 */
    id_181:{
        ID:181,
        MATERIAL:[ 90,100,  0,260],
        helperShip:{
            SUNDAY:   [AKAGI],
            MONDAY:   [AKAGI],
            TUESDAY:  [NONE],
            WEDNESDAY:[KAGA],
            THURSDAY: [KAGA],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 3],
            consumes:{ID: 20,NUM:1}, //零式艦戦21型*1
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 4],
            consumes:{ID: 20,NUM:2}, //零式艦戦21型*2
        },
        upgrade:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 4, 6],
            consumes:{ID:181,NUM:1}, //零式艦戦32型*1
            ID:21, //零式艦戦52型★+3
            STAR:3,
        },
    },
    /** 零式艦戦32型(熟練) */
    id_182:{
        ID:182,
        MATERIAL:[ 90,100,  0,260],
        helperShip:{
            SUNDAY:   [AKAGI],
            MONDAY:   [AKAGI],
            TUESDAY:  [NONE],
            WEDNESDAY:[KAGA],
            THURSDAY: [KAGA],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 3],
            consumes:{ID: 20,NUM:2}, //零式艦戦21型*2
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID: 20,NUM:3}, //零式艦戦21型*3
        },
        upgrade:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 4, 6],
            consumes:{ID:181,NUM:2}, //零式艦戦32型*2
            ID:152, //零式艦戦52型(熟練)★+3
            STAR:3,
        },
    },
    /** 零式艦戦52型 */
    id_21:{
        ID:21,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [ZUIKAKU],
            MONDAY:   [ZUIKAKU],
            TUESDAY:  [NONE],
            WEDNESDAY:[ZUIKAKU],
            THURSDAY: [SHOKAKU],
            FRIDAY:   [SHOKAKU],
            SATURDAY: [SHOKAKU],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 3, 4],
            consumes:{ID:21,NUM:1}, //零式艦戦52型*1
        },
        star6toMax:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        upgrade:null,
    },
    /** 零式艦戦52型(熟練) */
    id_152:{
        ID:152,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [ZUIKAKU],
            MONDAY:   [ZUIKAKU],
            TUESDAY:  [NONE],
            WEDNESDAY:[ZUIKAKU],
            THURSDAY: [SHOKAKU],
            FRIDAY:   [SHOKAKU],
            SATURDAY: [SHOKAKU],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:21,NUM:3}, //零式艦戦52型*3
        },
        upgrade:null,
    },
    /** 零戦52型丙(六〇一空) */
    id_109:{
        ID:109,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [TAIHO],
            MONDAY:   [TAIHO],
            TUESDAY:  [TAIHO],
            WEDNESDAY:[TAIHO],
            THURSDAY: [TAIHO,UNRYU],
            FRIDAY:   [TAIHO,UNRYU],
            SATURDAY: [TAIHO,UNRYU],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:17,NUM:2}, //天山*2
        },
        upgrade:null,
    },
    /** 零戦52型丙(付岩井小隊) */
    id_153:{
        ID:153,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [ZUIKAKU],
            WEDNESDAY:[NONE],
            THURSDAY: [ZUIKAKU],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:21,NUM:3}, //零式艦戦52型*3
        },
        upgrade:null,
    },
    /** 零戦52型甲(付岩本小隊) */
    id_156:{
        ID:156,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [ZUIKAKU],
            SATURDAY: [ZUIKAKU],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:21,NUM:3}, //零式艦戦52型*3
        },
        upgrade:null,
    },
    /** 零式艦戦53型(岩本隊) */
    id_157:{
        ID:157,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [ZUIKAKU],
            SATURDAY: [ZUIKAKU],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:21,NUM:3}, //零式艦戦52型*3
        },
        upgrade:null,
    },
    /** F4F-3 */
    id_197:{
        ID:197,
        MATERIAL:[ 90, 90,  0,270],
        helperShip:{
            SUNDAY:   [NOT_R(SARATOGA)],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NOT_R(SARATOGA)],
            THURSDAY: [UNKNOWN],
            FRIDAY:   [NOT_R(SARATOGA)],
            SATURDAY: [NOT_R(SARATOGA)],
        },
        star0to6:{
            RESEARCH:[ 2, 5],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 6],
            SCREW:   [ 2, 4],
            consumes:{ID:19,NUM:1}, //九六式艦戦*1
        },
        upgrade:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 3, 5],
            consumes:{ID:38,NUM:2}, //12.7mm単装機銃*2
            ID:198, //F4F-4
            STAR:0,
        },
    },
    /** F4F-4 */
    id_198:{
        ID:198,
        MATERIAL:[100,120,  0,300],
        helperShip:{
            SUNDAY:   [SARATOGA_R],
            MONDAY:   [SARATOGA],
            TUESDAY:  [SARATOGA],
            WEDNESDAY:[NONE],
            THURSDAY: [UNKNOWN],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 6],
            SCREW:   [ 3, 4],
            consumes:{ID:21,NUM:1}, //零式艦戦21型*1
        },
        star6toMax:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 3, 6],
            consumes:{ID:181,NUM:1}, //零式艦戦32型*1
        },
        upgrade:null,
    },
    /* 艦上爆撃機 */
    /** 零式艦戦62型(爆戦) */
    id_60:{
        ID:60,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [JUNYO,SHOKAKU],
            MONDAY:   [SHOKAKU],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [NONE],
            FRIDAY:   [JUNYO],
            SATURDAY: [JUNYO],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:24,NUM:2}, //彗星*2
        },
        upgrade:null,
    },
    /** 零戦62型(爆戦/岩井隊) */
    id_154:{
        ID:154,
        MATERIAL:[120,120,  0,280],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [ZUIKAKU],
            WEDNESDAY:[NONE],
            THURSDAY: [ZUIKAKU],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID:21,NUM:2}, //零式艦戦52型*2
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 6],
            consumes:{ID:24,NUM:2}, //彗星*2
        },
        upgrade:null,
    },
    /* 艦上偵察機 */
    /** 試製景雲(艦偵型) */
    id_151:{
        ID:151,
        MATERIAL:[250,100,700,650],
        helperShip:{
            SUNDAY:   [SHOKAKU_R2K,ZUIKAKU_R2K],
            MONDAY:   [ZUIKAKU_R2K],
            TUESDAY:  [ZUIKAKU_R2K],
            WEDNESDAY:[NONE],
            THURSDAY: [UNKNOWN],
            FRIDAY:   [SHOKAKU_R2K],
            SATURDAY: [SHOKAKU_R2K],
        },
        star0to6:{
            RESEARCH:[ 8,10],
            SCREW:   [ 6, 8],
            consumes:{ID:18,NUM:2}, //流星*1
        },
        star6toMax:{
            RESEARCH:[10,15],
            SCREW:   [ 7,10],
            consumes:{ID:22,NUM:1}, //烈風*1
        },
        upgrade:{
            RESEARCH:[20,30],
            SCREW:   [10,13],
            consumes:{ID:NE_ENGINE,NUM:1}, //ネ式エンジン*1
            ID:199, //噴式景雲改
            STAR:0,
        },
    },
    /* 水上偵察機 */
    /** 零式水上偵察機 */
    id_25:{
        ID:25,
        MATERIAL:[ 90, 20,  0,300],
        helperShip:{
            SUNDAY:   [AKITSUSHIMA_R,MIZUHO],
            MONDAY:   [MIZUHO],
            TUESDAY:  [MIZUHO],
            WEDNESDAY:[NOT_F(CHIYODA_K)],
            THURSDAY: [NOT_F(CHIYODA_K),AKITSUSHIMA_R],
            FRIDAY:   [NOT_F(CHITOSE_K),AKITSUSHIMA_R,MIZUHO],
            SATURDAY: [NOT_F(CHITOSE_K),AKITSUSHIMA_R,MIZUHO],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 2, 3],
            consumes:{ID: 25,NUM:1}, //零式水上偵察機*1
        },
        star6toMax:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 5],
            consumes:{ID: 25,NUM:2}, //零式水上偵察機*2
        },
        upgrade:{
            RESEARCH:[ 9,15],
            SCREW:   [ 5,10],
            consumes:{ID: 20,NUM:3}, //零式艦戦21型*3
            ID:165, //二式水戦改
            STAR:0,
        },
    },
    /** 零式水上観測機 */
    id_59:{
        ID:59,
        MATERIAL:[ 90, 40,  0,270],
        helperShip:{
            SUNDAY:   [MIZUHO],
            MONDAY:   [MIZUHO],
            TUESDAY:  [MIZUHO],
            WEDNESDAY:[MIZUHO],
            THURSDAY: [MUSASHI],
            FRIDAY:   [MUSASHI],
            SATURDAY: [MIZUHO,MUSASHI],
        },
        star0to6:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 3, 5],
            consumes:{ID: 26,NUM:1}, //瑞雲*1
        },
        star6toMax:{
            RESEARCH:[ 6, 9],
            SCREW:   [ 4, 7],
            consumes:{ID: 59,NUM:1}, //零式水上観測機*1
        },
        upgrade:null,
    },
    /** 九八式水上偵察機(夜偵) */
    id_102:{
        ID:102,
        MATERIAL:[100, 30,  0,480],
        helperShip:{
            SUNDAY:   [SENDAI_R2],
            MONDAY:   [SENDAI_R2],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [SENDAI_R2],
            FRIDAY:   [SENDAI_R2],
            SATURDAY: [SENDAI_R2],
        },
        star0to6:{
            RESEARCH:[ 4, 7],
            SCREW:   [ 3, 4],
            consumes:{ID: 25,NUM:1}, //零式水上偵察機*1
        },
        star6toMax:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 4, 8],
            consumes:{ID: 25,NUM:2}, //零式水上偵察機*2
        },
        upgrade:null,
    },
    /** Ro.43水偵 */
    id_163:{
        ID:163,
        MATERIAL:[ 60, 30,  0,180],
        helperShip:{
            SUNDAY:   [ITALIA],
            MONDAY:   [ZARA_R],
            TUESDAY:  [ZARA_R],
            WEDNESDAY:[ZARA_R,ROMA_R],
            THURSDAY: [ZARA_R,ROMA_R],
            FRIDAY:   [ZARA_R],
            SATURDAY: [ZARA_R],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 1, 2],
            consumes:{ID: 25,NUM:1}, //零式水上偵察機*1
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 2, 4],
            consumes:{ID: 26,NUM:1}, //瑞雲*1
        },
        upgrade:{
            RESEARCH:[ 5,10],
            SCREW:   [ 3, 5],
            consumes:{ID: 25,NUM:2}, //零式水上偵察機*2
            ID:164, //Ro.44水上戦闘機
            STAR:0,
        },
    },
    /* 電探 */
    /** 13号対空電探 */
    id_27:{
        ID:27,
        MATERIAL:[ 10,  0, 20, 30],
        helperShip:{
            SUNDAY:   [SHIGURE_R2,ISUZU_R2],
            MONDAY:   [ISUZU_R2,TERUZUKI],
            TUESDAY:  [AKIZUKI,TERUZUKI],
            WEDNESDAY:[AKIZUKI,TERUZUKI],
            THURSDAY: [SHIGURE_R2,AKIZUKI],
            FRIDAY:   [SHIGURE_R2,ISUZU_R2],
            SATURDAY: [SHIGURE_R2,ISUZU_R2],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 5],
            consumes:{ID: 27,NUM:1}, //13号対空電探*1
        },
        upgrade:{
            RESEARCH:[10,15],
            SCREW:   [ 5,12],
            consumes:{ID: 30,NUM:1}, //21号対空電探*1
            ID:106, //13号対空電探改
            STAR:0,
        },
    },
    /** 13号対空電探改 */
    id_106:{
        ID:106,
        MATERIAL:[ 10,  0, 30, 40],
        helperShip:{
            SUNDAY:   [HATSUSHIMO_R2,YUKIKAZE],
            MONDAY:   [YUKIKAZE],
            TUESDAY:  [YUKIKAZE],
            WEDNESDAY:[YUKIKAZE],
            THURSDAY: [ISOKAZE_R],
            FRIDAY:   [ISOKAZE_R,HATSUSHIMO_R2],
            SATURDAY: [ISOKAZE_R,HATSUSHIMO_R2],
        },
        star0to6:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 4],
            consumes:{ID: 27,NUM:1}, //13号対空電探*1
        },
        star6toMax:{
            RESEARCH:[ 7, 9],
            SCREW:   [ 4, 8],
            consumes:{ID: 27,NUM:2}, //13号対空電探*2
        },
        upgrade:null,
    },
    /** 22号対水上電探 */
    id_28:{
        ID:28,
        MATERIAL:[ 10,  0, 30, 30],
        helperShip:{
            SUNDAY:   [HYUGA],
            MONDAY:   [HYUGA,YUGUMO],
            TUESDAY:  [YUGUMO],
            WEDNESDAY:[SHIMAKAZE],
            THURSDAY: [SHIMAKAZE],
            FRIDAY:   [HYUGA,YUGUMO,SHIMAKAZE],
            SATURDAY: [HYUGA,YUGUMO,SHIMAKAZE],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 2, 3],
            consumes:{ID: 28,NUM:1}, //22号対水上電探*1
        },
        star6toMax:{
            RESEARCH:[ 7,10],
            SCREW:   [ 3, 5],
            consumes:{ID: 28,NUM:2}, //22号対水上電探*1
        },
        upgrade:{
            RESEARCH:[10,20],
            SCREW:   [ 8,14],
            consumes:{ID: 28,NUM:3}, //22号対水上電探*1
            ID:88, //22号対水上電探改四
            STAR:0,
        },
    },
    /** 22号対水上電探改四 */
    id_88:{
        ID:88,
        MATERIAL:[ 10,  0, 40, 40],
        helperShip:{
            SUNDAY:   [MYOKO_R2,HAGURO_R2],
            MONDAY:   [HAGURO_R2],
            TUESDAY:  [KONGO_R2],
            WEDNESDAY:[KONGO_R2],
            THURSDAY: [MYOKO_R2,KONGO_R2],
            FRIDAY:   [MYOKO_R2,HAGURO_R2,KONGO_R2],
            SATURDAY: [MYOKO_R2,HAGURO_R2],
        },
        star0to6:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 4],
            consumes:{ID: 28,NUM:1}, //22号対水上電探*1
        },
        star6toMax:{
            RESEARCH:[ 8,10],
            SCREW:   [ 4, 8],
            consumes:{ID: 88,NUM:1}, //22号対水上電探改四*1
        },
        upgrade:null,
    },
    /** 21号対空電探 */
    id_30:{
        ID:30,
        MATERIAL:[ 10,  0, 40, 50],
        helperShip:{
            SUNDAY:   [ISE],
            MONDAY:   [ISE],
            TUESDAY:  [NONE],
            WEDNESDAY:[HYUGA],
            THURSDAY: [HYUGA],
            FRIDAY:   [ISE,HYUGA],
            SATURDAY: [ISE,HYUGA],
        },
        star0to6:{
            RESEARCH:[ 5, 6],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 3, 5],
            consumes:{ID: 30,NUM:1}, //21号対空電探*1
        },
        upgrade:{
            RESEARCH:[12,16],
            SCREW:   [ 5,13],
            consumes:{ID: 30,NUM:2}, //21号対空電探*2
            ID:89, //21号対空電探改
            STAR:0,
        },
    },
    /** 21号対空電探改 */
    id_89:{
        ID:89,
        MATERIAL:[ 10,  0, 60, 70],
        helperShip:{
            SUNDAY:   [YAMATO],
            MONDAY:   [NONE],
            TUESDAY:  [MUSASHI],
            WEDNESDAY:[MUSASHI],
            THURSDAY: [YAMATO,MUSASHI],
            FRIDAY:   [YAMATO,MUSASHI],
            SATURDAY: [YAMATO],
        },
        star0to6:{
            RESEARCH:[ 6, 8],
            SCREW:   [ 2, 3],
            consumes:{ID: 30,NUM:1}, //21号対空電探*1
        },
        star6toMax:{
            RESEARCH:[10,12],
            SCREW:   [ 4, 8],
            consumes:{ID: 30,NUM:2}, //21号対空電探*2
        },
        upgrade:null,
    },
    /** 32号対水上電探 */
    id_31:{
        ID:31,
        MATERIAL:[ 10,  0, 60, 50],
        helperShip:{
            SUNDAY:   [HYUGA],
            MONDAY:   [HYUGA],
            TUESDAY:  [HYUGA],
            WEDNESDAY:[ISE],
            THURSDAY: [ISE],
            FRIDAY:   [ISE],
            SATURDAY: [ISE],
        },
        star0to6:{
            RESEARCH:[ 6,10],
            SCREW:   [ 3, 4],
            consumes:{ID: 28,NUM:1}, //22号対水上電探*1
        },
        star6toMax:{
            RESEARCH:[12,15],
            SCREW:   [ 4, 7],
            consumes:{ID: 28,NUM:2}, //22号対水上電探*2
        },
        upgrade:{
            RESEARCH:[15,22],
            SCREW:   [10,15],
            consumes:{ID: 31,NUM:1}, //32号対空電探*1
            ID:141, //32号対水上電探改
            STAR:0,
        },
    },
    /** 32号対水上電探改 */
    id_141:{
        ID:141,
        MATERIAL:[ 10,  0,100, 80],
        helperShip:{
            SUNDAY:   [ISE],
            MONDAY:   [ISE],
            TUESDAY:  [ISE],
            WEDNESDAY:[HYUGA],
            THURSDAY: [HYUGA],
            FRIDAY:   [HYUGA],
            SATURDAY: [HYUGA],
        },
        star0to6:{
            RESEARCH:[10,15],
            SCREW:   [ 5, 6],
            consumes:{ID: 28,NUM:3}, //22号対水上電探*3
        },
        star6toMax:{
            RESEARCH:[14,18],
            SCREW:   [ 7,10],
            consumes:{ID: 31,NUM:1}, //32号対水上電探*1
        },
        upgrade:null,
    },
    /* ソナー */
    /** 九三式水中聴音機 */
    id_46:{
        ID:46,
        helperShip:{
            SUNDAY:   [YUBARI,SHIGURE_R2,KATORI_R],
            MONDAY:   [ISUZU_R2],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [SHIGURE_R2,ISUZU_R2],
            FRIDAY:   [YUBARI,SHIGURE_R2,ISUZU_R2,KATORI_R],
            SATURDAY: [YUBARI,SHIGURE_R2,KATORI_R],
        },
        upgrade:[{
            ID:46,
            MATERIAL:[ 10,  0, 30, 30],
            helperShip:{
                SUNDAY:   [YUBARI],
                MONDAY:   [ISUZU_R2],
                TUESDAY:  [NONE],
                WEDNESDAY:[NONE],
                THURSDAY: [NONE],
                FRIDAY:   [YUBARI],
                SATURDAY: [YUBARI],
            },
            star0to6:{
                RESEARCH:[ 2, 2],
                SCREW:   [ 1, 2],
                consumes:null,
            },
            star6toMax:{
                RESEARCH:[ 3, 4],
                SCREW:   [ 2, 3],
                consumes:{ID: 46,NUM:1}, //九三式水中聴音機*1
            },
            upgrade:{
                RESEARCH:[ 6, 9],
                SCREW:   [ 3, 5],
                consumes:{ID: 46,NUM:2}, //九三式水中聴音機*2
                ID:47, //三式水中探信儀
                STAR:3,
            },
        },
        {
            ID:46,
            MATERIAL:[ 10,  0, 30, 30],
            helperShip:{
                SUNDAY:   [SHIGURE_R2,KATORI_R],
                MONDAY:   [NONE],
                TUESDAY:  [NONE],
                WEDNESDAY:[NONE],
                THURSDAY: [SHIGURE_R2,ISUZU_R2],
                FRIDAY:   [SHIGURE_R2,ISUZU_R2,KATORI_R],
                SATURDAY: [SHIGURE_R2,KATORI_R],
            },
            star0to6:{
                RESEARCH:[ 2, 2],
                SCREW:   [ 1, 2],
                consumes:null,
            },
            star6toMax:{
                RESEARCH:[ 3, 4],
                SCREW:   [ 2, 3],
                consumes:{ID: 46,NUM:1}, //九三式水中聴音機*1
            },
            upgrade:{
                RESEARCH:[10,20],
                SCREW:   [ 6,12],
                consumes:{ID: 47,NUM:2}, //三式水中探信儀*2
                ID:149, //四式水中聴音機
                STAR:0,
            },
        }],
    },
    /** 三式水中探信儀 */
    id_47:{
        ID:47,
        MATERIAL:[ 10,  0, 30, 50],
        helperShip:{
            SUNDAY:   [ISUZU_R2],
            MONDAY:   [NONE],
            TUESDAY:  [YUBARI,ISUZU_R2],
            WEDNESDAY:[YUBARI,ISUZU_R2],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 5],
            consumes:{ID: 47,NUM:1}, //三式水中探信儀*1
        },
        upgrade:null,
    },
    /** 四式水中聴音機 */
    id_149:{
        ID:149,
        MATERIAL:[ 10,  0, 50, 60],
        helperShip:{
            SUNDAY:   [AKIZUKI],
            MONDAY:   [KATORI_R],
            TUESDAY:  [KATORI_R],
            WEDNESDAY:[TERUZUKI],
            THURSDAY: [ISUZU_R2],
            FRIDAY:   [ISUZU_R2],
            SATURDAY: [ISUZU_R2],
        },
        star0to6:{
            RESEARCH:[ 5, 7],
            SCREW:   [ 3, 5],
            consumes:{ID: 46,NUM:2}, //九三式水中聴音機*2
        },
        star6toMax:{
            RESEARCH:[ 6,10],
            SCREW:   [ 4, 6],
            consumes:{ID:149,NUM:1}, //四式水中聴音機*1
        },
        upgrade:null,
    },
    /* 爆雷 */
    /** 九四式爆雷投射機 */
    id_44:{
        ID:44,
        MATERIAL:[ 10, 60, 20, 20],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[DEFAULT],
            THURSDAY: [DEFAULT],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 3],
            consumes:{ID: 44,NUM:1}, //九四式爆雷投射機*1
        },
        upgrade:{
            RESEARCH:[ 3, 6],
            SCREW:   [ 3, 8],
            consumes:{ID: 44,NUM:2}, //九四式爆雷投射機*2
            ID:45, //三式爆雷投射機
            STAR:3,
        },
    },
    /** 三式爆雷投射機 */
    id_45:{
        ID:45,
        MATERIAL:[ 10, 80, 20, 30],
        helperShip:{
            SUNDAY:   [NONE],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[ISUZU_R2],
            THURSDAY: [ISUZU_R2],
            FRIDAY:   [NONE],
            SATURDAY: [NONE],
        },
        star0to6:{
            RESEARCH:[ 3, 3],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 4],
            consumes:{ID: 45,NUM:1}, //三式爆雷投射機*2
        },
        upgrade:null,
    },
    /* 対艦強化弾 */
    /** 九一式徹甲弾 */
    id_36:{
        ID:36,
        MATERIAL:[ 30,150,310, 10],
        helperShip:{
            SUNDAY:   [KIRISHIMA],
            MONDAY:   [KIRISHIMA],
            TUESDAY:  [NONE],
            WEDNESDAY:[HIEI],
            THURSDAY: [HIEI],
            FRIDAY:   [HIEI,KIRISHIMA],
            SATURDAY: [HIEI,KIRISHIMA],
        },
        star0to6:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 1, 2],
            consumes:{ID: 36,NUM:1}, //九一式徹甲弾*1
        },
        upgrade:{
            RESEARCH:[ 6, 9],
            SCREW:   [ 4, 9],
            consumes:{ID: 36,NUM:3}, //九一式徹甲弾*3
            ID:116, //一式徹甲弾
            STAR:0,
        },
    },
    /** 一式徹甲弾 */
    id_116:{
        ID:116,
        MATERIAL:[ 30,170,330, 20],
        helperShip:{
            SUNDAY:   [KONGO],
            MONDAY:   [HARUNA],
            TUESDAY:  [HARUNA],
            WEDNESDAY:[HARUNA],
            THURSDAY: [NONE],
            FRIDAY:   [KONGO],
            SATURDAY: [KONGO],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 1, 1],
            consumes:{ID: 36,NUM:2}, //九一式徹甲弾*2
        },
        star6toMax:{
            RESEARCH:[ 4, 6],
            SCREW:   [ 2, 4],
            consumes:{ID:116,NUM:1}, //一式徹甲弾*1
        },
        upgrade:null,
    },
    /* 対空機銃 */
    /** 25mm単装機銃 */
    id_49:{
        ID:49,
        MATERIAL:[  0, 10, 10, 10],
        helperShip:{
            SUNDAY:   [SATSUKI],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[FUMIZUKI],
            THURSDAY: [FUMIZUKI,KINU_R2],
            FRIDAY:   [SATSUKI,FUMIZUKI],
            SATURDAY: [SATSUKI,FUMIZUKI],
        },
        star0to6:{
            RESEARCH:[ 0, 1],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 1],
            consumes:{ID: 49,NUM:1}, //25mm単装機銃*1
        },
        upgrade:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 49,NUM:1}, //25mm単装機銃*1
            ID:39, //25mm連装機銃
            STAR:5,
        },
    },
    /** 25mm連装機銃 */
    id_39:{
        ID:39,
        MATERIAL:[  0, 20, 10, 10],
        helperShip:{
            SUNDAY:   [ISUZU_R2,FUMIZUKI],
            MONDAY:   [SATSUKI,FUMIZUKI],
            TUESDAY:  [SATSUKI,FUMIZUKI],
            WEDNESDAY:[KINU_R2],
            THURSDAY: [NONE],
            FRIDAY:   [NONE],
            SATURDAY: [ISUZU_R2],
        },
        star0to6:{
            RESEARCH:[ 0, 1],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 2],
            consumes:{ID: 39,NUM:1}, //25mm連装機銃*1
        },
        upgrade:{
            RESEARCH:[ 2, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 39,NUM:1}, //25mm連装機銃*1
            ID:40, //25mm三連装機銃
            STAR:3,
        },
    },
    /** 25mm三連装機銃 */
    id_40:{
        ID:40,
        MATERIAL:[  0, 30, 20, 10],
        helperShip:{
            SUNDAY:   [MAYA_R2],
            MONDAY:   [ISUZU_R2,MAYA_R2,KINU_R2],
            TUESDAY:  [ISUZU_R2,ONLY_R2_UPGRADE(MAYA),KINU_R2], // 摩耶改二じゃ無い方は詳細不明
            WEDNESDAY:[ISUZU_R2,ONLY_R2_UPGRADE(MAYA),SATSUKI_R2],
            THURSDAY: [NOT_R2_UPGRADE(MAYA),SATSUKI_R2],
            FRIDAY:   [NONE], //11/04 21:03
            SATURDAY: [NONE], //11/05 0:22
        },
        star0to6:{
            RESEARCH:[ 1, 2],
            SCREW:   [ 1, 1],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 1, 3],
            SCREW:   [ 1, 2],
            consumes:{ID: 40,NUM:1}, //25mm三連装機銃*1
        },
        upgrade:{
            RESEARCH:[ 5, 9],
            SCREW:   [ 3, 7],
            consumes:{ID: 40,NUM:5}, //25mm三連装機銃*5
            ID:131, //25mm三連装機銃 集中配備
            STAR:0,
        },
    },
    /** 25mm三連装機銃 集中配備 */
    id_131:{
        ID:131,
        MATERIAL:[  0, 90, 90,150],
        helperShip:{
            SUNDAY:   [KINU_R2],
            MONDAY:   [NONE],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [MAYA_R2],
            FRIDAY:   [MAYA_R2,KINU_R2],
            SATURDAY: [MAYA_R2,KINU_R2],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 3, 5],
            consumes:{ID: 40,NUM:3}, //25mm三連装機銃*3
        },
        star6toMax:{
            RESEARCH:[ 6, 9],
            SCREW:   [ 6, 9],
            consumes:{ID: 40,NUM:5}, //25mm三連装機銃*5
        },
        upgrade:null,
    },
    /* 高射装置 */
    /** 91式高射装置 */
    id_120:{
        ID:120,
        MATERIAL:[  0,  0, 60, 40],
        helperShip:{
            SUNDAY:   [MAYA,AKIZUKI,TERUZUKI],
            MONDAY:   [MAYA,AKIZUKI],
            TUESDAY:  [NONE],
            WEDNESDAY:[NONE],
            THURSDAY: [TERUZUKI],
            FRIDAY:   [MAYA,AKIZUKI,TERUZUKI],
            SATURDAY: [MAYA,AKIZUKI,TERUZUKI],
        },
        star0to6:{
            RESEARCH:[ 3, 4],
            SCREW:   [ 1, 2],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 4],
            consumes:{ID: 10,NUM:1}, //12.7cm連装高角砲*1
        },
        upgrade:{
            RESEARCH:[ 4, 9],
            SCREW:   [ 4, 7],
            consumes:{ID:  3,NUM:2}, //10cm連装高角砲*2
            ID:121, //94式高射装置
            STAR:0,
        },
    },
    /** 94式高射装置 */
    id_121:{
        ID:121,
        helperShip:{
            SUNDAY:   [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2,MAYA_R2],
            MONDAY:   [AKIZUKI,TERUZUKI],
            TUESDAY:  [AKIZUKI,TERUZUKI],
            WEDNESDAY:[AKIZUKI,TERUZUKI],
            THURSDAY: [AKIZUKI,TERUZUKI,FUBUKI_R2,MAYA_R2],
            FRIDAY:   [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2,MAYA_R2],
            SATURDAY: [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2,MAYA_R2],
        },
        upgrade:[{
            ID:121,
            MATERIAL:[  0,  0, 80, 70],
            helperShip:{
                SUNDAY:   [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2],
                MONDAY:   [AKIZUKI,TERUZUKI],
                TUESDAY:  [AKIZUKI,TERUZUKI],
                WEDNESDAY:[AKIZUKI,TERUZUKI],
                THURSDAY: [AKIZUKI,TERUZUKI,FUBUKI_R2],
                FRIDAY:   [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2],
                SATURDAY: [AKIZUKI,TERUZUKI,HATSUZUKI,FUBUKI_R2],
            },
            star0to6:{
                RESEARCH:[ 4, 5],
                SCREW:   [ 2, 3],
                consumes:null,
            },
            star6toMax:{
                RESEARCH:[ 4, 6],
                SCREW:   [ 3, 5],
                consumes:{ID:  3,NUM:1}, //10cm連装高角砲*1
            },
            upgrade:{
                RESEARCH:[ 8,10],
                SCREW:   [ 5,10],
                consumes:{ID:  3,NUM:2}, //10cm連装高角砲*2
                ID:122, //10cm高角砲＋高射装置
                STAR:0,
            },
        },
        {
            ID:121,
            MATERIAL:[  0,  0, 80, 70],
            helperShip:{
                SUNDAY:   [MAYA_R2],
                MONDAY:   [NONE],
                TUESDAY:  [NONE],
                WEDNESDAY:[NONE],
                THURSDAY: [MAYA_R2],
                FRIDAY:   [MAYA_R2],
                SATURDAY: [MAYA_R2],
            },
            star0to6:{
                RESEARCH:[ 4, 5],
                SCREW:   [ 2, 3],
                consumes:null,
            },
            star6toMax:{
                RESEARCH:[ 4, 6],
                SCREW:   [ 3, 5],
                consumes:{ID: 10,NUM:1}, //12.7cm高角砲*1
            },
            upgrade:{
                RESEARCH:[ 7, 9],
                SCREW:   [ 5, 9],
                consumes:{ID: 10,NUM:2}, //12.7cm高角砲*2
                ID:130, //12.7cm高角砲＋高射装置
                STAR:0,
            },
        }],
    },
    /* 上陸用舟艇 */
    /** 大発動艇 */
    id_68:{
        ID:68,
        helperShip:{
            SUNDAY:   [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2,KINU_R2],
            MONDAY:   [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2],
            TUESDAY:  [AKITSUMARU,SATSUKI_R2],
            WEDNESDAY:[AKITSUMARU,SATSUKI_R2],
            THURSDAY: [AKITSUMARU],
            FRIDAY:   [AKITSUMARU,ABUKUMA_R2,KINU_R2], //11/04 21:04
            SATURDAY: [AKITSUMARU,ABUKUMA_R2,KINU_R2], //11/05 0:23
        },
        upgrade:[{
            ID:68,
            MATERIAL:[ 50, 30, 30, 10],
            helperShip:{
                SUNDAY:   [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2],
                MONDAY:   [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2],
                TUESDAY:  [AKITSUMARU,SATSUKI_R2],
                WEDNESDAY:[AKITSUMARU,SATSUKI_R2],
                THURSDAY: [AKITSUMARU],
                FRIDAY:   [AKITSUMARU,ABUKUMA_R2],
                SATURDAY: [AKITSUMARU,ABUKUMA_R2],
            },
            star0to6:{
                RESEARCH:[ 1, 2],
                SCREW:   [ 1, 2],
                consumes:{ID: 75,NUM:1}, //ドラム缶(輸送用)*1
            },
            star6toMax:{
                RESEARCH:[ 1, 4],
                SCREW:   [ 2, 3],
                consumes:{ID: 37,NUM:1}, //7.7mm機銃*1
            },
            upgrade:{
                RESEARCH:[ 4, 8],
                SCREW:   [ 3, 7],
                consumes:{ID: 38,NUM:3}, //12.7mm単装機銃*3
                ID:166, //大発動艇(八九式中戦車＆陸戦隊)
                STAR:0,
            },
        },
        { //後日再反映
            ID:68,
            MATERIAL:[ 50, 30, 30, 10],
            helperShip:{
                SUNDAY:   [KINU_R2],
                MONDAY:   [NONE],
                TUESDAY:  [NONE],
                WEDNESDAY:[NONE],
                THURSDAY: [NONE],
                FRIDAY:   [KINU_R2],
                SATURDAY: [KINU_R2],
            },
            star0to6:{
                RESEARCH:[ 1, 2],
                SCREW:   [ 1, 2],
                consumes:{ID: 75,NUM:1}, //ドラム缶(輸送用)*1
            },
            star6toMax:{
                RESEARCH:[ 1, 4],
                SCREW:   [ 2, 3],
                consumes:{ID: 37,NUM:1}, //7.7mm機銃*1
            },
            upgrade:{
                RESEARCH:[ 8,16],
                SCREW:   [ 6,12],
                consumes:{ID: 68,NUM:4}, //大発動艇*4
                ID:193, //特大発動艇
                STAR:0,
            },
        }],
    },
    /** 大発動艇(八九式中戦車＆陸戦隊) */
    id_166:{
        ID:166,
        MATERIAL:[ 70, 80,120, 30],
        helperShip:{
            SUNDAY:   [AKITSUMARU],
            MONDAY:   [AKITSUMARU],
            TUESDAY:  [ABUKUMA_R2],
            WEDNESDAY:[ABUKUMA_R2],
            THURSDAY: [SATSUKI_R2,ABUKUMA_R2],
            FRIDAY:   [AKITSUMARU,SATSUKI_R2],
            SATURDAY: [AKITSUMARU,SATSUKI_R2],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 3],
            consumes:{ID: 49,NUM:1}, //25mm単装機銃*1
        },
        star6toMax:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 3, 5],
            consumes:{ID: 51,NUM:2}, //12cm30連装噴進砲*1
        },
        upgrade:{
            RESEARCH:[10,18],
            SCREW:   [ 5, 9],
            consumes:{ID: 37,NUM:3}, //7.7mm機銃*3
            ID:167, //特二式内火艇
            STAR:0,
        },
    },
    /** 特二式内火艇 */
    id_167:{
        ID:167,
        MATERIAL:[ 80, 90,100, 70],
        helperShip:{
            SUNDAY:   [I58],
            MONDAY:   [I58,I401],
            TUESDAY:  [I401],
            WEDNESDAY:[I8,I401],
            THURSDAY: [I8,I401],
            FRIDAY:   [I58,I8],
            SATURDAY: [I58,I8],
        },
        star0to6:{
            RESEARCH:[ 5, 8],
            SCREW:   [ 3, 4],
            consumes:{ID: 37,NUM:2}, //7.7mm機銃*2
        },
        star6toMax:{
            RESEARCH:[ 8,12],
            SCREW:   [ 4, 6],
            consumes:{ID: 38,NUM:3}, //12.7mm単装機銃*3
        },
        upgrade:null,
    },
    /** 特大発動艇 */
    id_193:{
        ID:193,
        MATERIAL:[ 70, 80,120, 30],
        helperShip:{
            SUNDAY:   [KINU_R2],
            MONDAY:   [KINU_R2],
            TUESDAY:  [AKITSUMARU],
            WEDNESDAY:[AKITSUMARU],
            THURSDAY: [AKITSUMARU],
            FRIDAY:   [KINU_R2],
            SATURDAY: [KINU_R2],
        },
        star0to6:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 3],
            consumes:{ID: 75,NUM:2}, //ドラム缶(輸送用)*2
        },
        star6toMax:{
            RESEARCH:[ 4, 8],
            SCREW:   [ 4, 6],
            consumes:{ID: 68,NUM:1}, //大発動艇*1
        },
        upgrade:null,
    },
    /* 探照灯 */
    /** 探照灯 */
    id_74:{
        ID:74,
        MATERIAL:[ 10,  0, 30, 20],
        helperShip:{
            SUNDAY:   [JINTSU],
            MONDAY:   [AOBA,AYANAMI],
            TUESDAY:  [AOBA,AYANAMI],
            WEDNESDAY:[AOBA,AYANAMI],
            THURSDAY: [AKATSUKI],
            FRIDAY:   [AKATSUKI,JINTSU],
            SATURDAY: [AKATSUKI,JINTSU],
        },
        star0to6:{
            RESEARCH:[ 3, 3],
            SCREW:   [ 2, 3],
            consumes:null,
        },
        star6toMax:{
            RESEARCH:[ 3, 5],
            SCREW:   [ 2, 4],
            consumes:{ID: 74,NUM:1}, //探照灯*1
        },
        upgrade:{
            RESEARCH:[ 5,10],
            SCREW:   [ 3, 7],
            consumes:{ID:129,NUM:1}, //熟練見張員*1
            ID:140, //96式150cm探照灯
            STAR:0,
        },
    },
    /** 96式150cm探照灯 */
    id_140:{
        ID:140,
        MATERIAL:[ 20,  0, 70, 30],
        helperShip:{
            SUNDAY:   [HIEI],
            MONDAY:   [HIEI],
            TUESDAY:  [KIRISHIMA],
            WEDNESDAY:[KIRISHIMA],
            THURSDAY: [KIRISHIMA],
            FRIDAY:   [HIEI,KIRISHIMA],
            SATURDAY: [HIEI],
        },
        star0to6:{
            RESEARCH:[ 4, 5],
            SCREW:   [ 3, 4],
            consumes:{ID: 74,NUM:1}, //探照灯*1
        },
        star6toMax:{
            RESEARCH:[ 5,10],
            SCREW:   [ 3, 7],
            consumes:{ID: 74,NUM:1}, //探照灯*1
        },
        upgrade:null,
    },
}

function getDayOfWeek(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return "SUNDAY";
        case Calendar.MONDAY:    return "MONDAY";
        case Calendar.TUESDAY:   return "TUESDAY";
        case Calendar.WEDNESDAY: return "WEDNESDAY";
        case Calendar.THURSDAY:  return "THURSDAY";
        case Calendar.FRIDAY:    return "FRIDAY";
        case Calendar.SATURDAY:  return "SATURDAY";
    }
}