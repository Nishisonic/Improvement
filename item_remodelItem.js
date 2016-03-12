//Ver:1.1.3
//Author:Nishisonic
//LastUpdate:2015/10/07

/* ソースコードを大幅に書換（前のソースコード見辛かった）
 * wikiの改修表と同じように変更
 */

load("script/utils.js");
Calendar = Java.type("java.util.Calendar");

var DEFAULT       = "デフォルト";
var SEP           = ",";
var NONE          = "";
var ERROR         = "ERROR";
var YUDACHI_R2    = "夕立改二";
var AYANAMI_R2    = "綾波改二";
var AKIDUKI       = "秋月";
var YUBARI        = "夕張";
var AGANO         = "阿賀野";
var NOSHIRO       = "能代";
var YAHAGI        = "矢矧";
var SAKAWA        = "酒匂";
var OYODO         = "大淀";
var MOGAMI        = "最上";
var AOBA          = "青葉";
var KINUGASA      = "衣笠";
var MYOKO         = "妙高";
var MIKUMA        = "三隈";
var FUSO          = "扶桑";
var BISMARCK      = "Bismarck";
var LITTORIO      = "Littorio";
var ROMA          = "Roma";
var NAGATO        = "長門";
var MUTSU         = "陸奥";
var YAMATO        = "大和";
var MUSASHI       = "武蔵";
var YAMATO_R      = "大和改";
var MUSASHI_R     = "武蔵改";
var KONGO         = "金剛";
var YAMASHIRO     = "山城";
var FUBUKI        = "吹雪";
var FUBUKI_R      = "吹雪改";
var MURAKUMO      = "叢雲";
var FUBUKI_R2     = "吹雪改二";
var OI            = "大井";
var KITAKAMI      = "北上";
var SHIMAKAZE     = "島風";
var SHIGURE_R2    = "時雨改二";
var ISUZU_R2      = "五十鈴改二";
var ISOKAZE_R     = "磯風改";
var HATSUSHIMO_R2 = "初霜改二";
var YUKIKAZE      = "雪風";
var HYUGA         = "日向";
var YUGUMO        = "夕雲";
var MYOKO_R2      = "妙高改二";
var HAGURO_R2     = "羽黒改二";
var KONGO_R2      = "金剛改二";
var ISE           = "伊勢";
var YUBARI        = "夕張";
var HIEI          = "比叡";
var KIRISHIMA     = "霧島";
var HARUNA        = "榛名";
var MAYA          = "摩耶";
var MAYA_R        = "摩耶改";
var MAYA_R2       = "摩耶改二";
var AKATSUKI      = "暁";
var JINTSU        = "神通";
var AYANAMI       = "綾波";
var TERUDUKI      = "照月";
var KATORI_R      = "香取改";
var AKIDUKI_R     = "秋月改";
var TERUDUKI_R    = "照月改";

var word = "id_";
var func_obj = [];
var ID_LIST = [
              /* 小口径主砲 */
                 2 //12.7cm単装砲
              , 63 //12.7cm連装砲B型改二
              ,122 //10cm高角砲＋高射装置
              /* 中口径主砲 */
              ,  4 //14cm単装砲
              ,119 //14cm連装砲
              , 65 //15.2cm連装砲
              ,139 //15.2cm連装砲改
              ,  5 //15.5cm三連装砲
              ,  6 //20.3cm連装砲
              , 90 //20.3cm(2号)連装砲
              , 50 //20.3cm(3号)連装砲
              /* 大口径主砲 */
              ,  7 //35.6cm連装砲
              , 76 //38cm連装砲
              ,114 //38cm連装砲改
              ,133 //381mm/50 三連装砲
              ,137 //381mm/50 三連装砲改
              ,  8 //41cm連装砲
              ,117 //試製46cm連装砲
              ,  9 //46cm三連装砲
              ,128 //試製51cm連装砲
              /* 副砲 */
              ,135 //90mm単装高角砲
              , 11 //15.2cm単装砲
              ,134 //OTO 152mm三連装速射砲
              /* 魚雷 */
              , 13 //61cm三連装魚雷
              ,125 //61cm三連装(酸素)魚雷
              , 14 //61cm四連装魚雷
              , 15 //61cm四連装(酸素)魚雷
              , 58 //61cm五連装(酸素)魚雷
              /* 電探 */
              , 27 //13号対空電探
              ,106 //13号対空電探改
              , 28 //22号対水上電探
              , 88 //22号対水上電探改四
              , 30 //21号対空電探
              , 89 //21号対空電探改
              , 31 //32号対水上電探
              ,141 //32号対水上電探改
              /* ソナー */
              , 46 //九三式水中聴音機
              , 47 //三式水中探信儀
              ,149 //四式水中聴音機
              /* 爆雷 */
              , 44 //九四式爆雷投射機
              , 45 //三式爆雷投射機
              /* 対艦強化弾 */
              , 36 //九一式徹甲弾
              ,116 //一式徹甲弾
              /* 対空機銃 */
              , 39 //25mm連装機銃
              , 40 //25mm三連装機銃
              /* 高射装置 */
              ,120 //91式高射装置
              ,121 //94式高射装置
              /* 探照灯 */
              , 74 //探照灯
              ,140 //96式150cm探照灯
              ];

function header() {
    return [ "今日の改修工廠" ];
}

function begin() { }

function body(data) {
    var dayOfWeek = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
    return toComparable([ String(getSecondShip( dayOfWeek, data.getInfo().getId())) ]);
}

function end() { }

function getSecondShip( dayOfWeek, itemId){
    for(var i = 0;i < ID_LIST.length;i++){
        if(ID_LIST[i] == itemId){
            return func_obj[word + ID_LIST[i]](dayOfWeek);
        }
    }
    return NONE;
}

/* 小口径主砲 */

//12.7cm単装砲
func_obj.id_2 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return DEFAULT;
        case Calendar.MONDAY:    return DEFAULT;
        case Calendar.TUESDAY:   return DEFAULT;
        case Calendar.WEDNESDAY: return DEFAULT;
        case Calendar.THURSDAY:  return DEFAULT;
        case Calendar.FRIDAY:    return DEFAULT;
        case Calendar.SATURDAY:  return DEFAULT;
        default :                return ERROR;
    }
}

//12.7cm連装砲B型改二
func_obj.id_63 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return YUDACHI_R2 + SEP + AYANAMI_R2;
        case Calendar.TUESDAY:   return YUDACHI_R2 + SEP + AYANAMI_R2;
        case Calendar.WEDNESDAY: return YUDACHI_R2 + SEP + AYANAMI_R2;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//10cm高角砲+高射装置
func_obj.id_122 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return TERUDUKI;
        case Calendar.MONDAY:    return AKIDUKI;
        case Calendar.TUESDAY:   return AKIDUKI;
        case Calendar.WEDNESDAY: return AKIDUKI;
        case Calendar.THURSDAY:  return AKIDUKI + SEP + TERUDUKI;
        case Calendar.FRIDAY:    return TERUDUKI;
        case Calendar.SATURDAY:  return TERUDUKI;
        default :                return ERROR;
    }
}

/* 中口径主砲 */

//14cm単装砲
func_obj.id_4 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return DEFAULT;
        case Calendar.MONDAY:    return DEFAULT;
        case Calendar.TUESDAY:   return DEFAULT;
        case Calendar.WEDNESDAY: return DEFAULT;
        case Calendar.THURSDAY:  return DEFAULT;
        case Calendar.FRIDAY:    return DEFAULT;
        case Calendar.SATURDAY:  return DEFAULT;
        default :                return ERROR;
    }
}

//14cm連装砲
func_obj.id_119 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return YUBARI;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return YUBARI;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//15.2cm連装砲
func_obj.id_65 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NOSHIRO;
        case Calendar.MONDAY:    return NOSHIRO + SEP + YAHAGI;
        case Calendar.TUESDAY:   return YAHAGI;
        case Calendar.WEDNESDAY: return YAHAGI;
        case Calendar.THURSDAY:  return AGANO + SEP + YAHAGI;
        case Calendar.FRIDAY:    return AGANO + SEP + NOSHIRO;
        case Calendar.SATURDAY:  return AGANO + SEP + NOSHIRO;
        default :                return ERROR;
    }
}

//15.2cm連装砲改
func_obj.id_139 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return SAKAWA;
        case Calendar.MONDAY:    return SAKAWA;
        case Calendar.TUESDAY:   return SAKAWA;
        case Calendar.WEDNESDAY: return YAHAGI;
        case Calendar.THURSDAY:  return YAHAGI;
        case Calendar.FRIDAY:    return YAHAGI;
        case Calendar.SATURDAY:  return YAHAGI + SEP + SAKAWA;
        default :                return ERROR;
    }
}

//15.5cm三連装砲
func_obj.id_5 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return OYODO;
        case Calendar.MONDAY:    return OYODO;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return MOGAMI;
        case Calendar.SATURDAY:  return MOGAMI;
        default :                return ERROR;
    }
}

//20.3cm連装砲
func_obj.id_6 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return AOBA + SEP + KINUGASA;
        case Calendar.MONDAY:    return KINUGASA;
        case Calendar.TUESDAY:   return KINUGASA;
        case Calendar.WEDNESDAY: return KINUGASA;
        case Calendar.THURSDAY:  return AOBA + SEP + KINUGASA;
        case Calendar.FRIDAY:    return AOBA + SEP + KINUGASA;
        case Calendar.SATURDAY:  return AOBA + SEP + KINUGASA;
        default :                return ERROR;
    }
}

//20.3cm(2号)連装砲
func_obj.id_90 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MYOKO;
        case Calendar.MONDAY:    return MYOKO;
        case Calendar.TUESDAY:   return MYOKO;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//20.3cm(3号)連装砲
func_obj.id_50 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return MIKUMA;
        case Calendar.WEDNESDAY: return MIKUMA;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

/* 大口径主砲 */

//35.6cm連装砲
func_obj.id_7 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return FUSO;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return FUSO;
        case Calendar.SATURDAY:  return FUSO;
        default :                return ERROR;
    }
}

//38cm連装砲
func_obj.id_76 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return BISMARCK;
        case Calendar.FRIDAY:    return BISMARCK;
        case Calendar.SATURDAY:  return BISMARCK;
        default :                return ERROR;
    }
}

//38cm連装砲改
func_obj.id_114 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return BISMARCK;
        case Calendar.MONDAY:    return BISMARCK;
        case Calendar.TUESDAY:   return BISMARCK;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//381mm/50 三連装砲
func_obj.id_133 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ROMA;
        case Calendar.MONDAY:    return ROMA;
        case Calendar.TUESDAY:   return LITTORIO;
        case Calendar.WEDNESDAY: return LITTORIO;
        case Calendar.THURSDAY:  return LITTORIO;
        case Calendar.FRIDAY:    return LITTORIO;
        case Calendar.SATURDAY:  return ROMA;
        default :                return ERROR;
    }
}

//381mm/50 三連装砲改
func_obj.id_137 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return LITTORIO;
        case Calendar.MONDAY:    return LITTORIO;
        case Calendar.TUESDAY:   return ROMA;
        case Calendar.WEDNESDAY: return ROMA;
        case Calendar.THURSDAY:  return ROMA;
        case Calendar.FRIDAY:    return ROMA;
        case Calendar.SATURDAY:  return LITTORIO;
        default :                return ERROR;
    }
}

//41cm連装砲
func_obj.id_8 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MUTSU;
        case Calendar.MONDAY:    return MUTSU;
        case Calendar.TUESDAY:   return NAGATO;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return MUTSU;
        case Calendar.FRIDAY:    return NAGATO;
        case Calendar.SATURDAY:  return NAGATO;
        default :                return ERROR;
    }
}

//試製46cm連装砲
func_obj.id_117 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return YAMATO;
        case Calendar.MONDAY:    return YAMATO;
        case Calendar.TUESDAY:   return MUSASHI;
        case Calendar.WEDNESDAY: return MUSASHI;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//46cm三連装砲
func_obj.id_9 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MUSASHI;
        case Calendar.MONDAY:    return MUSASHI;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return YAMATO;
        case Calendar.SATURDAY:  return YAMATO;
        default :                return ERROR;
    }
}

//試製51cm連装砲
func_obj.id_128 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return YAMATO_R + SEP + MUSASHI_R;
        case Calendar.TUESDAY:   return YAMATO_R;
        case Calendar.WEDNESDAY: return MUSASHI_R;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

/* 副砲 */

//90mm単装高角砲
func_obj.id_135 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ROMA;
        case Calendar.MONDAY:    return LITTORIO;
        case Calendar.TUESDAY:   return LITTORIO;
        case Calendar.WEDNESDAY: return LITTORIO;
        case Calendar.THURSDAY:  return LITTORIO + SEP + ROMA;
        case Calendar.FRIDAY:    return ROMA;
        case Calendar.SATURDAY:  return ROMA;
        default :                return ERROR;
    }
}

//15.2cm単装砲
func_obj.id_11 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return AGANO + SEP + KONGO;
        case Calendar.MONDAY:    return AGANO + SEP + KONGO + SEP + YAMASHIRO;
        case Calendar.TUESDAY:   return AGANO + SEP + YAMASHIRO;
        case Calendar.WEDNESDAY: return YAMASHIRO;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return KONGO;
        default :                return ERROR;
    }
}

//OTO 152mm三連装速射砲
func_obj.id_134 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return LITTORIO + SEP + ROMA;
        case Calendar.MONDAY:    return ROMA;
        case Calendar.TUESDAY:   return LITTORIO;
        case Calendar.WEDNESDAY: return LITTORIO;
        case Calendar.THURSDAY:  return ROMA;
        case Calendar.FRIDAY:    return ROMA;
        case Calendar.SATURDAY:  return LITTORIO;
        default :                return ERROR;
    }
}

/* 魚雷 */

//61cm三連装魚雷
func_obj.id_13 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MURAKUMO;
        case Calendar.MONDAY:    return MURAKUMO;
        case Calendar.TUESDAY:   return MURAKUMO;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return FUBUKI;
        case Calendar.FRIDAY:    return FUBUKI;
        case Calendar.SATURDAY:  return FUBUKI;
        default :                return ERROR;
    }
}

//61cm三連装(酸素)魚雷
func_obj.id_125 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return FUBUKI_R2;
        case Calendar.FRIDAY:    return FUBUKI_R2;
        case Calendar.SATURDAY:  return FUBUKI_R2;
        default :                return ERROR;
    }
}

//61cm四連装魚雷
func_obj.id_14 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return DEFAULT;
        case Calendar.MONDAY:    return DEFAULT;
        case Calendar.TUESDAY:   return DEFAULT;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return DEFAULT;
        case Calendar.SATURDAY:  return DEFAULT;
        default :                return ERROR;
    }
}

//61cm四連装(酸素)魚雷
func_obj.id_15 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return OI + SEP + KITAKAMI;
        case Calendar.MONDAY:    return OI + SEP + KITAKAMI;
        case Calendar.TUESDAY:   return OI + SEP + KITAKAMI;
        case Calendar.WEDNESDAY: return OI + SEP + KITAKAMI;
        case Calendar.THURSDAY:  return OI + SEP + KITAKAMI;
        case Calendar.FRIDAY:    return OI + SEP + KITAKAMI;
        case Calendar.SATURDAY:  return OI + SEP + KITAKAMI;
        default :                return ERROR;
    }
}

//61cm五連装(酸素)魚雷
func_obj.id_58 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return SHIMAKAZE;
        case Calendar.THURSDAY:  return SHIMAKAZE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

/* 電探 */

//13号対空電探
func_obj.id_27 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return SHIGURE_R2 + SEP + ISUZU_R2;
        case Calendar.MONDAY:    return ISUZU_R2 + SEP + TERUDUKI;
        case Calendar.TUESDAY:   return AKIDUKI + SEP + TERUDUKI;
        case Calendar.WEDNESDAY: return AKIDUKI + SEP + TERUDUKI;
        case Calendar.THURSDAY:  return SHIGURE_R2 + SEP + AKIDUKI;
        case Calendar.FRIDAY:    return SHIGURE_R2 + SEP + ISUZU_R2;
        case Calendar.SATURDAY:  return SHIGURE_R2 + SEP + ISUZU_R2;
        default :                return ERROR;
    }
}

//13号対空電探改
func_obj.id_106 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return HATSUSHIMO_R2 + SEP + YUKIKAZE;
        case Calendar.MONDAY:    return YUKIKAZE;
        case Calendar.TUESDAY:   return YUKIKAZE;
        case Calendar.WEDNESDAY: return YUKIKAZE;
        case Calendar.THURSDAY:  return ISOKAZE_R;
        case Calendar.FRIDAY:    return ISOKAZE_R + SEP + HATSUSHIMO_R2;
        case Calendar.SATURDAY:  return ISOKAZE_R + SEP + HATSUSHIMO_R2;
        default :                return ERROR;
    }
}

//22号対水上電探
func_obj.id_28 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return HYUGA;
        case Calendar.MONDAY:    return HYUGA + SEP + YUGUMO;
        case Calendar.TUESDAY:   return YUGUMO;
        case Calendar.WEDNESDAY: return SHIMAKAZE;
        case Calendar.THURSDAY:  return SHIMAKAZE;
        case Calendar.FRIDAY:    return HYUGA + SEP + YUGUMO + SEP + SHIMAKAZE;
        case Calendar.SATURDAY:  return HYUGA + SEP + YUGUMO + SEP + SHIMAKAZE;
        default :                return ERROR;
    }
}

//22号対水上電探改四
func_obj.id_88 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MYOKO_R2 + SEP + HAGURO_R2;
        case Calendar.MONDAY:    return HAGURO_R2;
        case Calendar.TUESDAY:   return KONGO_R2;
        case Calendar.WEDNESDAY: return KONGO_R2;
        case Calendar.THURSDAY:  return MYOKO_R2 + SEP + KONGO_R2;
        case Calendar.FRIDAY:    return MYOKO_R2 + SEP + HAGURO_R2 + SEP + KONGO_R2;
        case Calendar.SATURDAY:  return MYOKO_R2 + SEP + HAGURO_R2;
        default :                return ERROR;
    }
}

//21号対空電探
func_obj.id_30 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ISE;
        case Calendar.MONDAY:    return ISE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return HYUGA;
        case Calendar.THURSDAY:  return HYUGA;
        case Calendar.FRIDAY:    return ISE + SEP + HYUGA;
        case Calendar.SATURDAY:  return ISE + SEP + HYUGA;
        default :                return ERROR;
    }
}

//21号対空電探改
func_obj.id_89 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return YAMATO;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return MUSASHI;
        case Calendar.WEDNESDAY: return MUSASHI;
        case Calendar.THURSDAY:  return YAMATO + SEP + MUSASHI;
        case Calendar.FRIDAY:    return YAMATO + SEP + MUSASHI;
        case Calendar.SATURDAY:  return YAMATO;
        default :                return ERROR;
    }
}

//32号対水上電探
func_obj.id_31 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return HYUGA;
        case Calendar.MONDAY:    return HYUGA;
        case Calendar.TUESDAY:   return HYUGA;
        case Calendar.WEDNESDAY: return ISE;
        case Calendar.THURSDAY:  return ISE;
        case Calendar.FRIDAY:    return ISE;
        case Calendar.SATURDAY:  return ISE;
        default :                return ERROR;
    }
}

//32号対水上電探改
func_obj.id_141 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ISE;
        case Calendar.MONDAY:    return ISE;
        case Calendar.TUESDAY:   return ISE;
        case Calendar.WEDNESDAY: return HYUGA;
        case Calendar.THURSDAY:  return HYUGA;
        case Calendar.FRIDAY:    return HYUGA;
        case Calendar.SATURDAY:  return HYUGA;
        default :                return ERROR;
    }
}

/* ソナー */

//九三式水中聴音機
func_obj.id_46 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return YUBARI + SEP + SHIGURE_R2 + SEP + KATORI_R;
        case Calendar.MONDAY:    return ISUZU_R2;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return SHIGURE_R2 + SEP + ISUZU_R2;
        case Calendar.FRIDAY:    return YUBARI + SEP + SHIGURE_R2 + SEP + ISUZU_R2 + SEP + KATORI_R;
        case Calendar.SATURDAY:  return YUBARI + SEP + SHIGURE_R2 + SEP + KATORI_R;
        default :                return ERROR;
    }
}

//三式水中探信儀
func_obj.id_47 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ISUZU_R2;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return YUBARI + SEP + ISUZU_R2;
        case Calendar.WEDNESDAY: return YUBARI + SEP + ISUZU_R2;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//四式水中聴音機
func_obj.id_149 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return AKIDUKI;
        case Calendar.MONDAY:    return KATORI_R;
        case Calendar.TUESDAY:   return KATORI_R;
        case Calendar.WEDNESDAY: return TERUDUKI;
        case Calendar.THURSDAY:  return ISUZU_R2;
        case Calendar.FRIDAY:    return ISUZU_R2;
        case Calendar.SATURDAY:  return ISUZU_R2;
        default :                return ERROR;
    }
}

/* 爆雷 */

//九四式爆雷投射機
func_obj.id_44 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return DEFAULT;
        case Calendar.THURSDAY:  return DEFAULT;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

//三式爆雷投射機
func_obj.id_45 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return NONE;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return ISUZU_R2;
        case Calendar.THURSDAY:  return ISUZU_R2;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return NONE;
        default :                return ERROR;
    }
}

/* 対艦強化弾 */

//九一式徹甲弾
func_obj.id_36 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return KIRISHIMA;
        case Calendar.MONDAY:    return KIRISHIMA;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return HIEI;
        case Calendar.THURSDAY:  return HIEI;
        case Calendar.FRIDAY:    return HIEI + SEP + KIRISHIMA;
        case Calendar.SATURDAY:  return HIEI + SEP + KIRISHIMA;
        default :                return ERROR;
    }
}

//一式徹甲弾
func_obj.id_116 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return KONGO;
        case Calendar.MONDAY:    return HARUNA;
        case Calendar.TUESDAY:   return HARUNA;
        case Calendar.WEDNESDAY: return HARUNA;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return KONGO;
        case Calendar.SATURDAY:  return KONGO;
        default :                return ERROR;
    }
}

/* 対空機銃 */

//25mm連装機銃
func_obj.id_39 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return ISUZU_R2;
        case Calendar.MONDAY:    return NONE;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return NONE;
        case Calendar.FRIDAY:    return NONE;
        case Calendar.SATURDAY:  return ISUZU_R2;
        default :                return ERROR;
    }
}

//25mm三連装機銃
func_obj.id_40 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MAYA_R2;
        case Calendar.MONDAY:    return ISUZU_R2;
        case Calendar.TUESDAY:   return ISUZU_R2 + SEP + MAYA;
        case Calendar.WEDNESDAY: return ISUZU_R2 + SEP + MAYA;
        case Calendar.THURSDAY:  return MAYA;
        case Calendar.FRIDAY:    return MAYA_R2;
        case Calendar.SATURDAY:  return MAYA_R2;
        default :                return ERROR;
    }
}

/* 高射装置 */

//91式高射装置
func_obj.id_120 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return MAYA + SEP + AKIDUKI + SEP + TERUDUKI;
        case Calendar.MONDAY:    return MAYA + SEP + AKIDUKI;
        case Calendar.TUESDAY:   return NONE;
        case Calendar.WEDNESDAY: return NONE;
        case Calendar.THURSDAY:  return TERUDUKI;
        case Calendar.FRIDAY:    return MAYA + SEP + AKIDUKI + SEP + TERUDUKI;
        case Calendar.SATURDAY:  return MAYA + SEP + AKIDUKI + SEP + TERUDUKI;
        default :                return ERROR;
    }
}

//94式高射装置
func_obj.id_121 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return AKIDUKI + SEP + TERUDUKI + SEP + FUBUKI_R2 + SEP + MAYA_R2;
        case Calendar.MONDAY:    return AKIDUKI + SEP + TERUDUKI;
        case Calendar.TUESDAY:   return AKIDUKI + SEP + TERUDUKI;
        case Calendar.WEDNESDAY: return AKIDUKI + SEP + TERUDUKI;
        case Calendar.THURSDAY:  return AKIDUKI + SEP + TERUDUKI + SEP + FUBUKI_R2 + SEP + MAYA_R2;
        case Calendar.FRIDAY:    return AKIDUKI + SEP + TERUDUKI + SEP + FUBUKI_R2 + SEP + MAYA_R2;
        case Calendar.SATURDAY:  return AKIDUKI + SEP + TERUDUKI + SEP + FUBUKI_R2 + SEP + MAYA_R2;
        default :                return ERROR;
    }
}

/* 探照灯 */

//探照灯
func_obj.id_74 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return JINTSU;
        case Calendar.MONDAY:    return AOBA + SEP + AYANAMI;
        case Calendar.TUESDAY:   return AOBA + SEP + AYANAMI;
        case Calendar.WEDNESDAY: return AOBA + SEP + AYANAMI;
        case Calendar.THURSDAY:  return AKATSUKI;
        case Calendar.FRIDAY:    return AKATSUKI + SEP + JINTSU;
        case Calendar.SATURDAY:  return AKATSUKI + SEP + JINTSU;
        default :                return ERROR;
    }
}

//96式150cm探照灯
func_obj.id_140 = function(dayOfWeek){
    switch(dayOfWeek){
        case Calendar.SUNDAY:    return HIEI;
        case Calendar.MONDAY:    return HIEI;
        case Calendar.TUESDAY:   return KIRISHIMA;
        case Calendar.WEDNESDAY: return KIRISHIMA;
        case Calendar.THURSDAY:  return KIRISHIMA;
        case Calendar.FRIDAY:    return HIEI + SEP + KIRISHIMA;
        case Calendar.SATURDAY:  return HIEI;
        default :                return ERROR;
    }
}