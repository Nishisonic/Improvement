//Ver:1.4.6.2
//Author:Nishisonic
//LastUpdate:2016/04/27

load("script/utils.js");
Calendar = Java.type("java.util.Calendar");

/* 定数リスト */
var DEFAULT       = "デフォルト";
var SEP           = ",";
var NONE          = "";
var ERROR         = "ERROR";
var UNKNOWN       = "不明";
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
var MUTSUKI         = "睦月";            //ID:1
var KISARAGI        = "如月";            //ID:2
//var NULL          = "NULL";            //ID:3
//var NULL          = "NULL";            //ID:4
//var NULL          = "NULL";            //ID:5
var NAGATSUKI       = "長月";            //ID:6
var MIKADUKI        = "三日月";          //ID:7
//var NULL          = "NULL";            //ID:8
var FUBUKI          = "吹雪";            //ID:9
var SHIRAYUKI       = "白雪";            //ID:10
var MIYUKI          = "深雪";            //ID:11
var ISONAMI         = "磯波";            //ID:12
var AYANAMI         = "綾波";            //ID:13
var SHIKINAMI       = "敷波";            //ID:14
var AKEBONO         = "曙";              //ID:15
var USHIO           = "潮";              //ID:16
var KAGERO          = "陽炎";            //ID:17
var SHIRANUI        = "不知火";          //ID:18
var KUROSHIO        = "黒潮";            //ID:19
var YUKIKAZE        = "雪風";            //ID:20
var NAGARA          = "長良";            //ID:21
var ISUZU           = "五十鈴";          //ID:22
var YURA            = "由良";            //ID:23
var OI              = "大井";            //ID:24
var KITAKAMI        = "北上";            //ID:25
var FUSO            = "扶桑";            //ID:26
var YAMASHIRO       = "山城";            //ID:27
var SATSUKI         = "皐月";            //ID:28
var FUMIDUKI        = "文月";            //ID:29
var KIKUDUKI        = "菊月";            //ID:30
var MOCHIDUKI       = "望月";            //ID:31
var HATSUYUKI       = "初雪";            //ID:32
var MURAKUMO        = "叢雲";            //ID:33
var AKATSUKI        = "暁";              //ID:34
var HIBIKI          = "響";              //ID:35
var IKADUCHI        = "雷";              //ID:36
var INADUMA         = "電";              //ID:37
var HATSUHARU       = "初春";            //ID:38
var NENOHI          = "子日";            //ID:39
var WAKABA          = "若葉";            //ID:40
var HATSUSHIMO      = "初霜";            //ID:41
var SHIRATSUYU      = "白露";            //ID:42
var SHIGURE         = "時雨";            //ID:43
var MURASAME        = "村雨";            //ID:44
var YUDACHI         = "夕立";            //ID:45
var SAMIDARE        = "五月雨";          //ID:46
var SUZUKAZE        = "涼風";            //ID:47
var ARARE           = "霰";              //ID:48
var KASUMI          = "霞";              //ID:49
var SHIMAKAZE       = "島風";            //ID:50
var TENRYU          = "天龍";            //ID:51
var TATSUTA         = "龍田";            //ID:52
var NATORI          = "名取";            //ID:53
var SENDAI          = "川内";            //ID:54
var JINTSU          = "神通";            //ID:55
var NAKA            = "那珂";            //ID:56
var OI_R            = "大井改";          //ID:57
var KITAKAMI_R      = "北上改";          //ID:58
var FURUTAKA        = "古鷹";            //ID:59
var KAKO            = "加古";            //ID:60
var AOBA            = "青葉";            //ID:61
var MYOKO           = "妙高";            //ID:62
var NACHI           = "那智";            //ID:63
var ASHIGARA        = "足柄";            //ID:64
var HAGURO          = "羽黒";            //ID:65
var TAKAO           = "高雄";            //ID:66
var ATAGO           = "愛宕";            //ID:67
var MAYA            = "摩耶";            //ID:68
var CHOKAI          = "鳥海";            //ID:69
var MOGAMI          = "最上";            //ID:70
var TONE            = "利根";            //ID:71
var CHIKUMA         = "筑摩";            //ID:72
var MOGAMI_R        = "最上改";          //ID:73
var SHOHO           = "祥鳳";            //ID:74
var HIYO            = "飛鷹";            //ID:75
var RYUJO           = "龍驤";            //ID:76
var ISE             = "伊勢";            //ID:77
var KONGO           = "金剛";            //ID:78
var HARUNA          = "榛名";            //ID:79
var NAGATO          = "長門";            //ID:80
var MUTSU           = "陸奥";            //ID:81
var ISE_R           = "伊勢改";          //ID:82
var AKAGI           = "赤城";            //ID:83
var KAGA            = "加賀";            //ID:84
var KIRISHIMA       = "霧島";            //ID:85
var HIEI            = "比叡";            //ID:86
var HYUGA           = "日向";            //ID:87
var HYUGA_R         = "日向改";          //ID:88
var HOSYO           = "鳳翔";            //ID:89
var SORYU           = "蒼龍";            //ID:90
var HIRYU           = "飛龍";            //ID:91
var JUNYO           = "隼鷹";            //ID:92
var OBORO           = "朧";              //ID:93
var SAZANAMI        = "漣";              //ID:94
var ASASHIO         = "朝潮";            //ID:95
var OSHIO           = "大潮";            //ID:96
var MICHISHIO       = "満潮";            //ID:97
var ARASHIO         = "荒潮";            //ID:98
var KUMA            = "球磨";            //ID:99
var TAMA            = "多摩";            //ID:100
var KISO            = "木曾";            //ID:101
var CHITOSE         = "千歳";            //ID:102
var CHIYODA         = "千代田";          //ID:103
var CHITOSE_R       = "千歳改";          //ID:104
var CHIYODA_R       = "千代田改";        //ID:105
var CHITOSE_K       = "千歳甲";          //ID:106
var CHIYODA_K       = "千代田甲";        //ID:107
var CHITOSE_F       = "千歳航";          //ID:108
var CHIYODA_F       = "千代田航";        //ID:109
var SHOKAKU         = "翔鶴";            //ID:110
var ZUIKAKU         = "瑞鶴";            //ID:111
var ZUIKAKU_R       = "瑞鶴改";          //ID:112
var KINU            = "鬼怒";            //ID:113
var ABUKUMA         = "阿武隈";          //ID:114
var YUBARI          = "夕張";            //ID:115
var ZUIHO           = "瑞鳳";            //ID:116
var ZUIHO_R         = "瑞鳳改";          //ID:117
var OI_R2           = "大井改二";        //ID:118
var KITAKAMI_R2     = "北上改二";        //ID:119
var MIKUMA          = "三隈";            //ID:120
var MIKUMA_R        = "三隈改";          //ID:121
var MAIKAZE         = "舞風";            //ID:122
var KINUGASA        = "衣笠";            //ID:123
var SUZUYA          = "鈴谷";            //ID:124
var KUMANO          = "熊野";            //ID:125
var I168            = "伊168";           //ID:126
var I58             = "伊58";            //ID:127
var I8              = "伊8";             //ID:128
var SUZUYA_R        = "鈴谷改";          //ID:129
var KUMANO_R        = "熊野改";          //ID:130
var YAMATO          = "大和";            //ID:131
var AKIGUMO         = "秋雲";            //ID:132
var YUGUMO          = "夕雲";            //ID:133
var MAKIGUMO        = "巻雲";            //ID:134
var NAGANAMI        = "長波";            //ID:135
var YAMATO_R        = "大和改";          //ID:136
var AGANO           = "阿賀野";          //ID:137
var NOSHIRO         = "能代";            //ID:138
var YAHAGI          = "矢矧";            //ID:139
var SAKAWA          = "酒匂";            //ID:140
var ISUZU_R2        = "五十鈴改二";      //ID:141
var KINUGASA_R2     = "衣笠改二";        //ID:142
var MUSASHI         = "武蔵";            //ID:143
var YUDACHI_R2      = "夕立改二";        //ID:144
var SHIGURE_R2      = "時雨改二";        //ID:145
var KISO_R2         = "木曾改二";        //ID:146
var VERUNUI         = "Верный";          //ID:147
var MUSASHI_R       = "武蔵改";          //ID:148
var KONGO_R2        = "金剛改二";        //ID:149
var HIEI_R2         = "比叡改二";        //ID:150
var HARUNA_R2       = "榛名改二";        //ID:151
var KIRISHIMA_R2    = "霧島改二";        //ID:152
var TAIHO           = "大鳳";            //ID:153
var KATORI          = "香取";            //ID:154
var I401            = "伊401";           //ID:155
var TAIHO_R         = "大鳳改";          //ID:156
var RYUJO_R2        = "龍驤改二";        //ID:157
var SENDAI_R2       = "川内改二";        //ID:158
var JINTSU_R2       = "神通改二";        //ID:159
var NAKA_R2         = "那珂改二";        //ID:160
var AKITSUMARU      = "あきつ丸";        //ID:161
//var NULL          = "NULL";            //ID:162
var MARUYU          = "まるゆ";          //ID:163
var YAYOI           = "弥生";            //ID:164
var UDUKI           = "卯月";            //ID:165
var AKITSUMARU_R    = "あきつ丸改";      //ID:166
var ISOKAZE         = "磯風";            //ID:167
var URAKAZE         = "浦風";            //ID:168
var TANIKAZE        = "谷風";            //ID:169
var HAMAKAZE        = "浜風";            //ID:170
var BISMARCK        = "Bismarck";        //ID:171
var BISMARCK_R      = "Bismarck改";      //ID:172
var BISMARCK_R2     = "Bismarck zwei";   //ID:173
var Z1              = "Z1";              //ID;174
var Z3              = "Z3";              //ID:175
var PRINZ_EUGEN     = "Prinz Eugen";     //ID:176
var PRINZ_EUGEN_R   = "Prinz Eugen改";   //ID:177
var BISMARCK_R3     = "Bismarck drei";   //ID:178
var Z1_R2           = "Z1 zwei";         //ID:179
var Z3_R2           = "Z3 zwei";         //ID:180
var AMATSUKAZE      = "天津風";          //ID:181
var AKASHI          = "明石";            //ID:182
var OYODO           = "大淀";            //ID:183
var TAIGEI          = "大鯨";            //ID:184
var RYUHO           = "龍鳳";            //ID:185
var TOKITSUKAZE     = "時津風";          //ID:186
var AKASHI_R        = "明石改";          //ID:187
var TONE_R2         = "利根改二";        //ID:188
var CHIKUMA_R2      = "筑摩改二";        //ID:189
var HATSUKAZE       = "初風";            //ID:190
var I19             = "伊19";            //ID:191
var NACHI_R2        = "那智改二";        //ID:192
var ASHIGARA_R2     = "足柄改二";        //ID:193
var HAGURO_R2       = "羽黒改二";        //ID:194
var AYANAMI_R2      = "綾波改二";        //ID:195
var HIRYU_R2        = "飛龍改二";        //ID:196
var SORYU_R2        = "蒼龍改二";        //ID:197
var OSHIO_R2        = "大潮改二";        //ID:199
var ABUKUMA_R2      = "阿武隈改二";      //ID:200
var FUBUKI_R        = "吹雪改";          //ID:201
var SHIRAYUKI_R     = "白雪改";          //ID:202
var HATUYUKI_R      = "初雪改";          //ID:203
var MIYUKI_R        = "深雪改";          //ID:204
var MURAKUMO_R      = "叢雲改";          //ID:205
var ISONAMI_R       = "磯波改";          //ID:206
var AYANAMI_R       = "綾波改";          //ID:207
var SHIKINAMI_R     = "敷波改";          //ID:208
var KONGO_R         = "金剛改";          //ID:209
var HIEI_R          = "比叡改";          //ID:210
var HARUNA_R        = "榛名改";          //ID:211
var KIRISHIMA_R     = "霧島改";          //ID:212
var TENRYU_R        = "天龍改";          //ID:213
var TATSUTA_R       = "龍田改";          //ID:214
var KUMA_R          = "球磨改";          //ID:215
var TAMA_R          = "多摩改";          //ID:216
var KISO_R          = "木曾改";          //ID:217
var NAGARA_R        = "長良改";          //ID:218
var ISUZU_R         = "五十鈴改";        //ID:219
var YURA_R          = "由良改";          //ID:220
var NATORI_R        = "名取改";          //ID:221
var SENDAI_R        = "川内改";          //ID:222
var JINTSU_R        = "神通改";          //ID:223
var NAKA_R          = "那珂改";          //ID:224
var KAGERO_R        = "陽炎改";          //ID:225
var SHIRANUI_R      = "不知火改";        //ID:226
var KUROSHIO_R      = "黒潮改";          //ID:227
var YUKIKAZE_R      = "雪風改";          //ID:228
var SHIMAKAZE_R     = "島風改";          //ID:229
var OBORO_R         = "朧改";            //ID:230
var AKEBONO_R       = "曙改";            //ID:231
var SAZANAMI_R      = "漣改";            //ID:232
var USHIO_R         = "潮改";            //ID:233
var AKATSUKI_R      = "暁改";            //ID:234
var HIBIKI_R        = "響改";            //ID:235
var IKADUCHI_R      = "雷改";            //ID:236
var INADUMA_R       = "電改";            //ID:237
var HATSUHARU_R     = "初春改";          //ID:238
var NENOHI_R        = "子日改";          //ID:239
var WAKABA_R        = "若葉改";          //ID:240
var HATSUSHIMO_R    = "初霜改";          //ID:241
var SHIRATSHUYU_R   = "白露改";          //ID:242
var SHIGURE_R       = "時雨改";          //ID:243
var MURASAME_R      = "村雨改";          //ID:244
var YUDACHI_R       = "夕立改";          //ID:245
var SAMIDARE_R      = "五月雨改";        //ID:246
var SUZUKAZE_R      = "涼風改";          //ID:247
var ASASHIO_R       = "朝潮改";          //ID:248
var OSHIO_R         = "大潮改";          //ID:249
var MICHISHIO_R     = "満潮改";          //ID:250
var ARASHIO_R       = "荒潮改";          //ID:251
var ARARE_R         = "霰改";            //ID:252
var KASUMI_R        = "霞改";            //ID:253
var MUTSUKI_R       = "睦月改";          //ID:254
var KISARAGI_R      = "如月改";          //ID:255
var SATSUKI_R       = "皐月改";          //ID:256
var FUMIDUKI_R      = "文月改";          //ID:257
var NAGATSUKI_R     = "長月改";          //ID:258
var KIKUDUKI_R      = "菊月改";          //ID:259
var MIKADUKI_R      = "三日月改";        //ID:260
var MOCHIDUKI_R     = "望月改";          //ID:261
var FURUTAKA_R      = "古鷹改";          //ID:262
var KAKO_R          = "加古改";          //ID:263
var AOBA_R          = "青葉改";          //ID:264
var MYOKO_R         = "妙高改";          //ID:265
var NACHI_R         = "那智改";          //ID:266
var ASHIGARA_R      = "足柄改";          //ID:267
var HAGURO_R        = "羽黒改";          //ID:268
var TAKAO_R         = "高雄改";          //ID:269
var ATAGO_R         = "愛宕改";          //ID:270
var MAYA_R          = "摩耶改";          //ID:271
var CHOKAI_R        = "鳥海改";          //ID:272
var TONE_R          = "利根改";          //ID:273
var CHIKUMA_R       = "筑摩改";          //ID:274
var NAGATO_R        = "長門改";          //ID:275
var MUTSU_R         = "陸奥改";          //ID:276
var AKAGI_R         = "赤城改";          //ID:277
var KAGA_R          = "加賀改";          //ID:278
var SORYU_R         = "蒼龍改";          //ID:279
var HIRYU_R         = "飛龍改";          //ID:280
var RYUJO_R         = "龍驤改";          //ID:281
var SHOHO_R         = "祥鳳改";          //ID:282
var HIYO_R          = "飛鷹改";          //ID:283
var JUNYO_R         = "隼鷹改";          //ID:284
var HOSHO_R         = "鳳翔改";          //ID:285
var FUSO_R          = "扶桑改";          //ID:286
var YAMASHIRO_R     = "山城改";          //ID:287
var SHOKAKU_R       = "翔鶴改";          //ID:288
var KINU_R          = "鬼怒改";          //ID:289
var ABUKUMA_R       = "阿武隈改";        //ID:290
var CHITOSE_FR      = "千歳航改";        //ID:291
var CHIYODA_FR      = "千代田航改";      //ID:292
var YUBARI_R        = "夕張改";          //ID:293
var MAIKAZE_R       = "舞風改";          //ID:294
var KINUGASA_R      = "衣笠改";          //ID:295
var CHITOSE_FR2     = "千歳航改二";      //ID:296
var CHIYODA_FR2     = "千代田航改二";    //ID:297
var HATSUKAZE_R     = "初風改";          //ID:300
var AKIGUMO_R       = "秋雲改";          //ID:301
var YUGUMO_R        = "夕雲改";          //ID:302
var MAKIGUMO_R      = "巻雲改";          //ID:303
var NAGANAMI_R      = "長波改";          //ID:304
var AGANO_R         = "阿賀野改";        //ID:305
var NOSHIRO_R       = "能代改";          //ID:306
var YAHAGI_R        = "矢矧改";          //ID:307
var YAYOI_R         = "弥生改";          //ID:308
var UDUKI_R         = "卯月改";          //ID:309
var Z1_R            = "Z1改";            //ID:310
var Z3_R            = "Z3改";            //ID:311
var HAMAKAZE_R      = "浜風改";          //ID:312
var TANIKAZE_R      = "谷風改";          //ID:313
var SAKAWA_R        = "酒匂改";          //ID:314
//var NULL          = "NULL";            //ID:315
var AMATSUKAZE_R    = "天津風改";        //ID:316
var URAKAZE_R       = "浦風改";          //ID:317
var RYUHO_R         = "龍鳳改";          //ID:318
var MYOKO_R2        = "妙高改二";        //ID:319
var ISOKAZE_R       = "磯風改";          //ID:320
var OYODO_R         = "大淀改";          //ID:321
var TOKITSUKAZE_R   = "時津風改";        //ID:322
var HARUSAME_R      = "春雨改";          //ID:323
var HAYASHIMO_R     = "早霜改";          //ID:324
var KIYOSHIMO_R     = "清霜改";          //ID:325
var HATSUHARU_R2    = "初春改二";        //ID:326
var ASAGUMO_R       = "朝雲改";          //ID:327
var YAMAGUMO_R      = "山雲改";          //ID:328
var NOWAKI_R        = "野分改";          //ID:329
var AKIDUKI_R       = "秋月改";          //ID:330
var AMAGI           = "天城";            //ID:331
var KATSURAGI       = "葛城";            //ID:332
//var NULL          = "NULL";            //ID:333
var U511_R          = "U-511改";         //ID:334
//var NULL          = "NULL";            //ID:335
//var NULL          = "NULL";            //ID:336
//var NULL          = "NULL";            //ID:337
//var NULL          = "NULL";            //ID:338
//var NULL          = "NULL";            //ID:339
//var NULL          = "NULL";            //ID:340
//var NULL          = "NULL";            //ID:341
//var NULL          = "NULL";            //ID:342
var KATORI_R        = "香取改";          //ID:343
var ASASHIMO_R      = "朝霜改";          //ID:344
var TAKANAMI_R      = "高波改";          //ID:345
var TERUDUKI_R      = "照月改";          //ID:346
var LIBECCIO_R      = "Libeccio改";      //ID:347
var MIZUHO_R        = "瑞穂改";          //ID:348
var KAZAGUMO_R      = "風雲改";          //ID:349
var UMIKAZE_R       = "海風改";          //ID:350
var KAWAKAZE_R      = "江風改";          //ID:351
var HAYASUI_R       = "速吸改";          //ID:352
var GRAF_ZEPPELIN_R = "Graf Zeppelin改"; //ID:353
var ARASHI_R        = "嵐改";            //ID:354
var HAGIKAZE_R      = "萩風改";          //ID:355
var KASHIMA_R       = "鹿島改";          //ID:356
var HATSUDUKI_R     = "初月改";          //ID:357
var ZARA_R          = "Zara改";          //ID:358
var OKINAMI_R       = "沖波改";          //ID:359
var I168_R          = "伊168改";         //ID:398
var I58_R           = "伊58改";          //ID:399
var I8_R            = "伊8改";           //ID:400
var I19_R           = "伊19改";          //ID:401
var MARUYU_R        = "まるゆ改"         //ID:402
var I401_R          = "伊401改";         //ID:403
var UNRYU           = "雲龍";            //ID:404
var HARUSAME        = "春雨";            //ID:405
var UNRYU_R         = "雲龍改";          //ID:406
var USHIO_R2        = "潮改二";          //ID:407
var JUNYO_R2        = "隼鷹改二";        //ID:408
var HAYASHIMO       = "早霜";            //ID:409
var KIYOSHIMO       = "清霜";            //ID:410
var FUSO_R2         = "扶桑改二";        //ID:411
var YAMASHIRO_R2    = "山城改二";        //ID:412
var ASAGUMO         = "朝雲";            //ID:413
var YAMAGUMO        = "山雲";            //ID:414
var NOWAKI          = "野分";            //ID:415
var FURUTAKA_R2     = "古鷹改二";        //ID:416
var KAKO_R2         = "加古改二";        //ID:417
var SATSUKI_R2      = "皐月改二";        //ID:418
var HATSUSHIMO_R2   = "初霜改二";        //ID:419
var MURAKUMO_R2     = "叢雲改二";        //ID:420
var AKIDUKI         = "秋月";            //ID:421
var TERUDUKI        = "照月";            //ID:422
var HATSUDUKI       = "初月";            //ID:423
var TAKANAMI        = "高波";            //ID:424
var ASASHIMO        = "朝霜";            //ID:425
var FUBUKI_R2       = "吹雪改二";        //ID:426
var CHOKAI_R2       = "鳥海改二";        //ID:427
var MAYA_R2         = "摩耶改二";        //ID:428
var AMAGI_R         = "天城改";          //ID:429
var KATSURAGI_R     = "葛城改";          //ID:430
var U511            = "U-511";           //ID:431
var GRAF_ZEPPELIN   = "Graf Zeppelin";   //ID:432
//var NULL          = "NULL";            //ID:433
var MUTSUKI_R2      = "睦月改二";        //ID:434
var KISARAGI_R2     = "如月改二";        //ID:435
var RO500           = "呂500";           //ID:436
var AKATSUKI_R2     = "暁改二";          //ID:437
//var NULL          = "NULL";            //ID:438
//var NULL          = "NULL";            //ID:439
//var NULL          = "NULL";            //ID:440
var LITTORIO        = "Littorio";        //ID:441
var ROMA            = "Roma";            //ID:442
var LIBECCIO        = "Libeccio";        //ID:443
//var NULL          = "NULL";            //ID:444
var AKITSUSHIMA     = "秋津洲";          //ID:445
var ITALIA          = "Italia";          //ID:446
var ROMA_R          = "Roma";            //ID:447
var ZARA            = "Zara";            //ID:448
//var NULL          = "NULL";            //ID:449
var AKITSUSHIMA_R   = "秋津洲改";        //ID:450
var MIZUHO          = "瑞穂";            //ID:451
var OKINAMI         = "沖波";            //ID:452
var KAZAGUMO        = "風雲";            //ID:453
var ARASHI          = "嵐";              //ID:454
var HAGIKAZE        = "萩風";            //ID:455
//var NULL          = "NULL";            //ID:456
//var NULL          = "NULL";            //ID:457
var UMIKAZE         = "海風";            //ID:458
var KAWAKAZE        = "江風";            //ID:459
var HAYASUI         = "速吸";            //ID:460
var SHOKAKU_R2      = "翔鶴改二";        //ID:461
var ZUIKAKU_R2      = "瑞鶴改二";        //ID:462
//var NULL          = "NULL";            //ID:463
var KASUMI_R2       = "霞改二";          //ID:464
var KASHIMA         = "鹿島";            //ID:465
var SHOKAKU_R2K     = "翔鶴改二甲";      //ID:466
var ZUIKAKU_R2K     = "瑞鶴改二甲";      //ID:467
//var NULL          = "NULL";            //ID:468
var KAWAKAZE_R2     = "江風改二";        //ID:469
var KASUMI_R2O      = "霞改二乙";        //ID:470

var word = "id_";
var func_item = [];

function header(){
    return [ "二番艦" ];
}

function begin(){ }

function body(data){
    var dayOfWeek = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
    return toComparable([ getSecondShip( dayOfWeek, data.getInfo().getId()) ]);
}

function end(){ }

//2番艦を取得します
function getSecondShip(dayOfWeek, itemId){
    try{
        return func_item[word + itemId](dayOfWeek).join(SEP);
    }catch(e){
        return NONE;
    }
}

/* 小口径主砲 */

//12.7cm単装砲
func_item.id_2 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [DEFAULT];
        case Calendar.MONDAY:    return [DEFAULT];
        case Calendar.TUESDAY:   return [DEFAULT];
        case Calendar.WEDNESDAY: return [DEFAULT];
        case Calendar.THURSDAY:  return [DEFAULT];
        case Calendar.FRIDAY:    return [DEFAULT];
        case Calendar.SATURDAY:  return [DEFAULT];
        default :                return [ERROR];
    }
}

//12.7cm連装砲B型改二
func_item.id_63 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [YUDACHI_R2,AYANAMI_R2];
        case Calendar.TUESDAY:   return [YUDACHI_R2,AYANAMI_R2];
        case Calendar.WEDNESDAY: return [YUDACHI_R2,AYANAMI_R2];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//10cm高角砲+高射装置
func_item.id_122 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [TERUDUKI];
        case Calendar.MONDAY:    return [AKIDUKI,HATSUDUKI];
        case Calendar.TUESDAY:   return [AKIDUKI,HATSUDUKI];
        case Calendar.WEDNESDAY: return [AKIDUKI,HATSUDUKI];
        case Calendar.THURSDAY:  return [AKIDUKI,TERUDUKI,HATSUDUKI];
        case Calendar.FRIDAY:    return [TERUDUKI];
        case Calendar.SATURDAY:  return [TERUDUKI];
        default :                return [ERROR];
    }
}

/* 中口径主砲 */

//14cm単装砲
func_item.id_4 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [DEFAULT];
        case Calendar.MONDAY:    return [DEFAULT];
        case Calendar.TUESDAY:   return [DEFAULT];
        case Calendar.WEDNESDAY: return [DEFAULT];
        case Calendar.THURSDAY:  return [DEFAULT];
        case Calendar.FRIDAY:    return [DEFAULT];
        case Calendar.SATURDAY:  return [DEFAULT];
        default :                return [ERROR];
    }
}

//14cm連装砲
func_item.id_119 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [YUBARI];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [YUBARI];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//15.2cm連装砲
func_item.id_65 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NOSHIRO];
        case Calendar.MONDAY:    return [NOSHIRO,YAHAGI];
        case Calendar.TUESDAY:   return [YAHAGI];
        case Calendar.WEDNESDAY: return [YAHAGI];
        case Calendar.THURSDAY:  return [AGANO,YAHAGI];
        case Calendar.FRIDAY:    return [AGANO,NOSHIRO];
        case Calendar.SATURDAY:  return [AGANO,NOSHIRO];
        default :                return [ERROR];
    }
}

//15.2cm連装砲改
func_item.id_139 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [SAKAWA];
        case Calendar.MONDAY:    return [SAKAWA];
        case Calendar.TUESDAY:   return [SAKAWA];
        case Calendar.WEDNESDAY: return [YAHAGI];
        case Calendar.THURSDAY:  return [YAHAGI];
        case Calendar.FRIDAY:    return [YAHAGI];
        case Calendar.SATURDAY:  return [YAHAGI,SAKAWA];
        default :                return [ERROR];
    }
}

//15.5cm三連装砲
func_item.id_5 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [OYODO];
        case Calendar.MONDAY:    return [OYODO];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [MOGAMI];
        case Calendar.SATURDAY:  return [MOGAMI];
        default :                return [ERROR];
    }
}

//20.3cm連装砲
func_item.id_6 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AOBA,KINUGASA];
        case Calendar.MONDAY:    return [KINUGASA];
        case Calendar.TUESDAY:   return [KINUGASA];
        case Calendar.WEDNESDAY: return [KINUGASA];
        case Calendar.THURSDAY:  return [AOBA,KINUGASA];
        case Calendar.FRIDAY:    return [AOBA,KINUGASA];
        case Calendar.SATURDAY:  return [AOBA,KINUGASA];
        default :                return [ERROR];
    }
}

//20.3cm(2号)連装砲
func_item.id_90 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MYOKO];
        case Calendar.MONDAY:    return [MYOKO];
        case Calendar.TUESDAY:   return [MYOKO];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//20.3cm(3号)連装砲
func_item.id_50 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [MIKUMA];
        case Calendar.WEDNESDAY: return [MIKUMA];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

/* 大口径主砲 */

//35.6cm連装砲
func_item.id_7 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [FUSO];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [FUSO];
        case Calendar.SATURDAY:  return [FUSO];
        default :                return [ERROR];
    }
}

//試製35.6cm三連装砲
func_item.id_103 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [YAMASHIRO_R2];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [KONGO_R2,FUSO_R2];
        case Calendar.THURSDAY:  return [KONGO_R2,HARUNA_R2,FUSO_R2,YAMASHIRO_R2];
        case Calendar.FRIDAY:    return [HARUNA_R2,FUSO_R2,YAMASHIRO_R2];
        case Calendar.SATURDAY:  return [FUSO_R2,YAMASHIRO_R2];
        default :                return [ERROR];
    }
}

//35.6cm連装砲(ダズル迷彩)
func_item.id_104 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [HARUNA_R2];
        case Calendar.MONDAY:    return [HARUNA_R2];
        case Calendar.TUESDAY:   return [HARUNA_R2];
        case Calendar.WEDNESDAY: return [HARUNA_R2];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [HARUNA_R2];
        default :                return [ERROR];
    }
}

//38cm連装砲
func_item.id_76 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [BISMARCK];
        case Calendar.FRIDAY:    return [BISMARCK];
        case Calendar.SATURDAY:  return [BISMARCK];
        default :                return [ERROR];
    }
}

//38cm連装砲改
func_item.id_114 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [BISMARCK];
        case Calendar.MONDAY:    return [BISMARCK];
        case Calendar.TUESDAY:   return [BISMARCK];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//381mm/50 三連装砲
func_item.id_133 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ROMA];
        case Calendar.MONDAY:    return [ROMA];
        case Calendar.TUESDAY:   return [LITTORIO];
        case Calendar.WEDNESDAY: return [LITTORIO];
        case Calendar.THURSDAY:  return [LITTORIO];
        case Calendar.FRIDAY:    return [LITTORIO];
        case Calendar.SATURDAY:  return [ROMA];
        default :                return [ERROR];
    }
}

//381mm/50 三連装砲改
func_item.id_137 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [LITTORIO];
        case Calendar.MONDAY:    return [LITTORIO];
        case Calendar.TUESDAY:   return [ROMA];
        case Calendar.WEDNESDAY: return [ROMA];
        case Calendar.THURSDAY:  return [ROMA];
        case Calendar.FRIDAY:    return [ROMA];
        case Calendar.SATURDAY:  return [LITTORIO];
        default :                return [ERROR];
    }
}

//41cm連装砲
func_item.id_8 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MUTSU];
        case Calendar.MONDAY:    return [MUTSU];
        case Calendar.TUESDAY:   return [NAGATO];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [MUTSU];
        case Calendar.FRIDAY:    return [NAGATO];
        case Calendar.SATURDAY:  return [NAGATO];
        default :                return [ERROR];
    }
}

//試製41cm三連装砲
func_item.id_105 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NAGATO_R];
        case Calendar.MONDAY:    return [NAGATO_R];
        case Calendar.TUESDAY:   return [MUTSU_R];
        case Calendar.WEDNESDAY: return [NAGATO_R,MUTSU_R];
        case Calendar.THURSDAY:  return [NAGATO_R];
        case Calendar.FRIDAY:    return [MUTSU_R];
        case Calendar.SATURDAY:  return [MUTSU_R];
        default :                return [ERROR];
    }
}

//試製46cm連装砲
func_item.id_117 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [YAMATO];
        case Calendar.MONDAY:    return [YAMATO];
        case Calendar.TUESDAY:   return [MUSASHI];
        case Calendar.WEDNESDAY: return [MUSASHI];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//46cm三連装砲
func_item.id_9 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MUSASHI];
        case Calendar.MONDAY:    return [MUSASHI];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [YAMATO];
        case Calendar.SATURDAY:  return [YAMATO];
        default :                return [ERROR];
    }
}

//試製51cm連装砲
func_item.id_128 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [YAMATO_R,MUSASHI_R];
        case Calendar.TUESDAY:   return [YAMATO_R];
        case Calendar.WEDNESDAY: return [MUSASHI_R];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

/* 副砲 */

//90mm単装高角砲
func_item.id_135 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ROMA];
        case Calendar.MONDAY:    return [LITTORIO];
        case Calendar.TUESDAY:   return [LITTORIO];
        case Calendar.WEDNESDAY: return [LITTORIO];
        case Calendar.THURSDAY:  return [LITTORIO,ROMA];
        case Calendar.FRIDAY:    return [ROMA];
        case Calendar.SATURDAY:  return [ROMA];
        default :                return [ERROR];
    }
}

//15.2cm単装砲
func_item.id_11 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AGANO,KONGO];
        case Calendar.MONDAY:    return [AGANO,KONGO,YAMASHIRO];
        case Calendar.TUESDAY:   return [AGANO,YAMASHIRO];
        case Calendar.WEDNESDAY: return [YAMASHIRO];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [KONGO];
        default :                return [ERROR];
    }
}

//OTO 152mm三連装速射砲
func_item.id_134 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [LITTORIO,ROMA];
        case Calendar.MONDAY:    return [ROMA];
        case Calendar.TUESDAY:   return [LITTORIO];
        case Calendar.WEDNESDAY: return [LITTORIO];
        case Calendar.THURSDAY:  return [ROMA];
        case Calendar.FRIDAY:    return [ROMA];
        case Calendar.SATURDAY:  return [LITTORIO];
        default :                return [ERROR];
    }
}

/* 魚雷 */

//61cm三連装魚雷
func_item.id_13 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MURAKUMO];
        case Calendar.MONDAY:    return [MURAKUMO];
        case Calendar.TUESDAY:   return [MURAKUMO];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [FUBUKI];
        case Calendar.FRIDAY:    return [FUBUKI];
        case Calendar.SATURDAY:  return [FUBUKI];
        default :                return [ERROR];
    }
}

//61cm三連装(酸素)魚雷
func_item.id_125 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [FUBUKI_R2];
        case Calendar.FRIDAY:    return [FUBUKI_R2];
        case Calendar.SATURDAY:  return [FUBUKI_R2];
        default :                return [ERROR];
    }
}

//61cm四連装魚雷
func_item.id_14 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [DEFAULT];
        case Calendar.MONDAY:    return [DEFAULT];
        case Calendar.TUESDAY:   return [DEFAULT];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [DEFAULT];
        case Calendar.SATURDAY:  return [DEFAULT];
        default :                return [ERROR];
    }
}

//61cm四連装(酸素)魚雷
func_item.id_15 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [OI,KITAKAMI];
        case Calendar.MONDAY:    return [OI,KITAKAMI];
        case Calendar.TUESDAY:   return [OI,KITAKAMI];
        case Calendar.WEDNESDAY: return [OI,KITAKAMI];
        case Calendar.THURSDAY:  return [OI,KITAKAMI];
        case Calendar.FRIDAY:    return [OI,KITAKAMI];
        case Calendar.SATURDAY:  return [OI,KITAKAMI];
        default :                return [ERROR];
    }
}

//61cm五連装(酸素)魚雷
func_item.id_58 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [SHIMAKAZE];
        case Calendar.THURSDAY:  return [SHIMAKAZE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

/* 水上偵察機 */

//零式水上偵察機
func_item.id_25 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AKITSUSHIMA_R,MIZUHO];
        case Calendar.MONDAY:    return [MIZUHO];
        case Calendar.TUESDAY:   return [MIZUHO];
        case Calendar.WEDNESDAY: return [CHIYODA_K];
        case Calendar.THURSDAY:  return [CHIYODA_K,AKITSUSHIMA_R];
        case Calendar.FRIDAY:    return [CHITOSE_K,AKITSUSHIMA_R,MIZUHO];
        case Calendar.SATURDAY:  return [CHITOSE_K,AKITSUSHIMA_R,MIZUHO];
        default :                return [ERROR];
    }
}

//零式水上観測機
func_item.id_59 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MIZUHO];
        case Calendar.MONDAY:    return [MIZUHO];
        case Calendar.TUESDAY:   return [MIZUHO];
        case Calendar.WEDNESDAY: return [MIZUHO];
        case Calendar.THURSDAY:  return [MUSASHI];
        case Calendar.FRIDAY:    return [MUSASHI];
        case Calendar.SATURDAY:  return [MIZUHO,MUSASHI];
        default :                return [ERROR];
    }
}

//九八式水上偵察機(夜偵)
func_item.id_102 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [SENDAI_R2];
        case Calendar.MONDAY:    return [SENDAI_R2];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [UNKNOWN];
        case Calendar.FRIDAY:    return [SENDAI_R2];
        case Calendar.SATURDAY:  return [SENDAI_R2];
        default :                return [ERROR];
    }
}

//Ro.43水偵
func_item.id_163 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ITALIA];
        case Calendar.MONDAY:    return [ZARA_R];
        case Calendar.TUESDAY:   return [ZARA_R,ROMA_R];
        case Calendar.WEDNESDAY: return [ZARA_R,ROMA_R];
        case Calendar.THURSDAY:  return [ZARA_R];
        case Calendar.FRIDAY:    return [ZARA_R];
        case Calendar.SATURDAY:  return [ITALIA];
        default :                return [ERROR];
    }
}

/* 電探 */

//13号対空電探
func_item.id_27 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [SHIGURE_R2,ISUZU_R2];
        case Calendar.MONDAY:    return [ISUZU_R2,TERUDUKI];
        case Calendar.TUESDAY:   return [AKIDUKI,TERUDUKI];
        case Calendar.WEDNESDAY: return [AKIDUKI,TERUDUKI];
        case Calendar.THURSDAY:  return [SHIGURE_R2,AKIDUKI];
        case Calendar.FRIDAY:    return [SHIGURE_R2,ISUZU_R2];
        case Calendar.SATURDAY:  return [SHIGURE_R2,ISUZU_R2];
        default :                return [ERROR];
    }
}

//13号対空電探改
func_item.id_106 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [HATSUSHIMO_R2,YUKIKAZE];
        case Calendar.MONDAY:    return [YUKIKAZE];
        case Calendar.TUESDAY:   return [YUKIKAZE];
        case Calendar.WEDNESDAY: return [YUKIKAZE];
        case Calendar.THURSDAY:  return [ISOKAZE_R];
        case Calendar.FRIDAY:    return [ISOKAZE_R,HATSUSHIMO_R2];
        case Calendar.SATURDAY:  return [ISOKAZE_R,HATSUSHIMO_R2];
        default :                return [ERROR];
    }
}

//22号対水上電探
func_item.id_28 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [HYUGA];
        case Calendar.MONDAY:    return [HYUGA,YUGUMO];
        case Calendar.TUESDAY:   return [YUGUMO];
        case Calendar.WEDNESDAY: return [SHIMAKAZE];
        case Calendar.THURSDAY:  return [SHIMAKAZE];
        case Calendar.FRIDAY:    return [HYUGA,YUGUMO,SHIMAKAZE];
        case Calendar.SATURDAY:  return [HYUGA,YUGUMO,SHIMAKAZE];
        default :                return [ERROR];
    }
}

//22号対水上電探改四
func_item.id_88 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MYOKO_R2,HAGURO_R2];
        case Calendar.MONDAY:    return [HAGURO_R2];
        case Calendar.TUESDAY:   return [KONGO_R2];
        case Calendar.WEDNESDAY: return [KONGO_R2];
        case Calendar.THURSDAY:  return [MYOKO_R2,KONGO_R2];
        case Calendar.FRIDAY:    return [MYOKO_R2,HAGURO_R2,KONGO_R2];
        case Calendar.SATURDAY:  return [MYOKO_R2,HAGURO_R2];
        default :                return [ERROR];
    }
}

//21号対空電探
func_item.id_30 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ISE];
        case Calendar.MONDAY:    return [ISE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [HYUGA];
        case Calendar.THURSDAY:  return [HYUGA];
        case Calendar.FRIDAY:    return [ISE,HYUGA];
        case Calendar.SATURDAY:  return [ISE,HYUGA];
        default :                return [ERROR];
    }
}

//21号対空電探改
func_item.id_89 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [YAMATO];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [MUSASHI];
        case Calendar.WEDNESDAY: return [MUSASHI];
        case Calendar.THURSDAY:  return [YAMATO,MUSASHI];
        case Calendar.FRIDAY:    return [YAMATO,MUSASHI];
        case Calendar.SATURDAY:  return [YAMATO];
        default :                return [ERROR];
    }
}

//32号対水上電探
func_item.id_31 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [HYUGA];
        case Calendar.MONDAY:    return [HYUGA];
        case Calendar.TUESDAY:   return [HYUGA];
        case Calendar.WEDNESDAY: return [ISE];
        case Calendar.THURSDAY:  return [ISE];
        case Calendar.FRIDAY:    return [ISE];
        case Calendar.SATURDAY:  return [ISE];
        default :                return [ERROR];
    }
}

//32号対水上電探改
func_item.id_141 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ISE];
        case Calendar.MONDAY:    return [ISE];
        case Calendar.TUESDAY:   return [ISE];
        case Calendar.WEDNESDAY: return [HYUGA];
        case Calendar.THURSDAY:  return [HYUGA];
        case Calendar.FRIDAY:    return [HYUGA];
        case Calendar.SATURDAY:  return [HYUGA];
        default :                return [ERROR];
    }
}

/* ソナー */

//九三式水中聴音機
func_item.id_46 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [YUBARI,SHIGURE_R2,KATORI_R];
        case Calendar.MONDAY:    return [ISUZU_R2];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [SHIGURE_R2,ISUZU_R2];
        case Calendar.FRIDAY:    return [YUBARI,SHIGURE_R2,ISUZU_R2,KATORI_R];
        case Calendar.SATURDAY:  return [YUBARI,SHIGURE_R2,KATORI_R];
        default :                return [ERROR];
    }
}

//三式水中探信儀
func_item.id_47 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ISUZU_R2];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [YUBARI,ISUZU_R2];
        case Calendar.WEDNESDAY: return [YUBARI,ISUZU_R2];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//四式水中聴音機
func_item.id_149 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AKIDUKI];
        case Calendar.MONDAY:    return [KATORI_R];
        case Calendar.TUESDAY:   return [KATORI_R];
        case Calendar.WEDNESDAY: return [TERUDUKI];
        case Calendar.THURSDAY:  return [ISUZU_R2];
        case Calendar.FRIDAY:    return [ISUZU_R2];
        case Calendar.SATURDAY:  return [ISUZU_R2];
        default :                return [ERROR];
    }
}

/* 爆雷 */

//九四式爆雷投射機
func_item.id_44 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [DEFAULT];
        case Calendar.THURSDAY:  return [DEFAULT];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

//三式爆雷投射機
func_item.id_45 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [NONE];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [ISUZU_R2];
        case Calendar.THURSDAY:  return [ISUZU_R2];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [NONE];
        default :                return [ERROR];
    }
}

/* 対艦強化弾 */

//九一式徹甲弾
func_item.id_36 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [KIRISHIMA];
        case Calendar.MONDAY:    return [KIRISHIMA];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [HIEI];
        case Calendar.THURSDAY:  return [HIEI];
        case Calendar.FRIDAY:    return [HIEI,KIRISHIMA];
        case Calendar.SATURDAY:  return [HIEI,KIRISHIMA];
        default :                return [ERROR];
    }
}

//一式徹甲弾
func_item.id_116 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [KONGO];
        case Calendar.MONDAY:    return [HARUNA];
        case Calendar.TUESDAY:   return [HARUNA];
        case Calendar.WEDNESDAY: return [HARUNA];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [KONGO];
        case Calendar.SATURDAY:  return [KONGO];
        default :                return [ERROR];
    }
}

/* 対空機銃 */

//25mm単装機銃
func_item.id_49 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [SATSUKI];
        case Calendar.MONDAY:    return [NONE];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [FUMIDUKI];
        case Calendar.THURSDAY:  return [FUMIDUKI];
        case Calendar.FRIDAY:    return [SATSUKI,FUMIDUKI];
        case Calendar.SATURDAY:  return [SATSUKI,FUMIDUKI];
        default :                return [ERROR];
    }
}

//25mm連装機銃
func_item.id_39 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [ISUZU_R2,FUMIDUKI];
        case Calendar.MONDAY:    return [SATSUKI,FUMIDUKI];
        case Calendar.TUESDAY:   return [SATSUKI,FUMIDUKI];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [NONE];
        case Calendar.FRIDAY:    return [NONE];
        case Calendar.SATURDAY:  return [ISUZU_R2];
        default :                return [ERROR];
    }
}

//25mm三連装機銃
func_item.id_40 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MAYA_R2];
        case Calendar.MONDAY:    return [ISUZU_R2,MAYA_R2];
        case Calendar.TUESDAY:   return [ISUZU_R2,MAYA];
        case Calendar.WEDNESDAY: return [ISUZU_R2,MAYA,SATSUKI_R2];
        case Calendar.THURSDAY:  return [MAYA,SATSUKI_R2];
        case Calendar.FRIDAY:    return [MAYA_R2];
        case Calendar.SATURDAY:  return [MAYA_R2];
        default :                return [ERROR];
    }
}

/* 高射装置 */

//91式高射装置
func_item.id_120 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [MAYA,AKIDUKI,TERUDUKI];
        case Calendar.MONDAY:    return [MAYA,AKIDUKI];
        case Calendar.TUESDAY:   return [NONE];
        case Calendar.WEDNESDAY: return [NONE];
        case Calendar.THURSDAY:  return [TERUDUKI];
        case Calendar.FRIDAY:    return [MAYA,AKIDUKI,TERUDUKI];
        case Calendar.SATURDAY:  return [MAYA,AKIDUKI,TERUDUKI];
        default :                return [ERROR];
    }
}

//94式高射装置
func_item.id_121 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AKIDUKI,TERUDUKI,HATSUDUKI,FUBUKI_R2,MAYA_R2];
        case Calendar.MONDAY:    return [AKIDUKI,TERUDUKI];
        case Calendar.TUESDAY:   return [AKIDUKI,TERUDUKI];
        case Calendar.WEDNESDAY: return [AKIDUKI,TERUDUKI];
        case Calendar.THURSDAY:  return [AKIDUKI,TERUDUKI,FUBUKI_R2,MAYA_R2];
        case Calendar.FRIDAY:    return [AKIDUKI,TERUDUKI,HATSUDUKI,FUBUKI_R2,MAYA_R2];
        case Calendar.SATURDAY:  return [AKIDUKI,TERUDUKI,HATSUDUKI,FUBUKI_R2,MAYA_R2];
        default :                return [ERROR];
    }
}

/* 上陸用舟艇 */

//大発動艇
func_item.id_68 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2];
        case Calendar.MONDAY:    return [AKITSUMARU,SATSUKI_R2,ABUKUMA_R2];
        case Calendar.TUESDAY:   return [AKITSUMARU,SATSUKI_R2];
        case Calendar.WEDNESDAY: return [AKITSUMARU,SATSUKI_R2];
        case Calendar.THURSDAY:  return [AKITSUMARU];
        case Calendar.FRIDAY:    return [AKITSUMARU,ABUKUMA_R2];
        case Calendar.SATURDAY:  return [AKITSUMARU,ABUKUMA_R2];
        default :                return [ERROR];
    }
}

//大発動艇(八九式中戦車＆陸戦隊)
func_item.id_166 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [AKITSUMARU];
        case Calendar.MONDAY:    return [AKITSUMARU];
        case Calendar.TUESDAY:   return [ABUKUMA_R2];
        case Calendar.WEDNESDAY: return [ABUKUMA_R2];
        case Calendar.THURSDAY:  return [SATSUKI_R2,ABUKUMA_R2];
        case Calendar.FRIDAY:    return [AKITSUMARU,SATSUKI_R2];
        case Calendar.SATURDAY:  return [AKITSUMARU,SATSUKI_R2];
        default :                return [ERROR];
    }
}

//特二式内火艇
func_item.id_167 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [I58];
        case Calendar.MONDAY:    return [I58,I401];
        case Calendar.TUESDAY:   return [I401];
        case Calendar.WEDNESDAY: return [I8,I401];
        case Calendar.THURSDAY:  return [I8,I401];
        case Calendar.FRIDAY:    return [I58,I8];
        case Calendar.SATURDAY:  return [I58,I8];
        default :                return [ERROR];
    }
}

/* 探照灯 */

//探照灯
func_item.id_74 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [JINTSU];
        case Calendar.MONDAY:    return [AOBA,AYANAMI];
        case Calendar.TUESDAY:   return [AOBA,AYANAMI];
        case Calendar.WEDNESDAY: return [AOBA,AYANAMI];
        case Calendar.THURSDAY:  return [AKATSUKI];
        case Calendar.FRIDAY:    return [AKATSUKI,JINTSU];
        case Calendar.SATURDAY:  return [AKATSUKI,JINTSU];
        default :                return [ERROR];
    }
}

//96式150cm探照灯
func_item.id_140 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return [HIEI];
        case Calendar.MONDAY:    return [HIEI];
        case Calendar.TUESDAY:   return [KIRISHIMA];
        case Calendar.WEDNESDAY: return [KIRISHIMA];
        case Calendar.THURSDAY:  return [KIRISHIMA];
        case Calendar.FRIDAY:    return [HIEI,KIRISHIMA];
        case Calendar.SATURDAY:  return [HIEI];
        default :                return [ERROR];
    }
}