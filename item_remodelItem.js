//Ver:1.0.3
//Author:Nishisonic
//LastUpdate:2015/09/16

load("script/utils.js");
Calendar = Java.type("java.util.Calendar");

var YUDACHI_R2    = "夕立改二";
var AYANAMI_R2    = "綾波改二";
var DEFAULT       = "デフォルト";
var SEPARATOR     = ",";
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

function header() {
	return [ "今日の改修工廠" ];
}

function begin() { }

function body(data) {
	var result = "";
	switch(Calendar.getInstance().get(Calendar.DAY_OF_WEEK)){
		case Calendar.SUNDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = TERUDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 65: //15.2cm連装砲
					result = NOSHIRO;
					break;
				case 139: //15.2cm連装砲改
					result = SAKAWA;
					break;
				case 5: //15.5cm三連装砲
					result = OYODO;
					break;
				case 6: //20.3cm連装砲
					result = AOBA + SEPARATOR + KINUGASA;
					break;
				case 90: //20.3cm(2号)連装砲
					result = MYOKO;
					break;
				/* 大口径主砲 */
				case 7: //35.6cm連装砲
					result = FUSO;
					break;
				case 114: //38cm連装砲改
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = ROMA;
					break;
				case 137: //381mm/50 三連装砲改
					result = LITTORIO;
					break;
				case 8: //41cm連装砲
					result = MUTSU;
					break;
				case 117: //試製46cm連装砲
					result = YAMATO;
					break;
				case 9: //46cm三連装砲
					result = MUSASHI;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = ROMA;
					break;
				case 11: //15.2cm単装砲
					result = AGANO + SEPARATOR + KONGO;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = LITTORIO + SEPARATOR + ROMA;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = MURAKUMO;
					break;
				case 14: //61cm四連装魚雷
					result = DEFAULT;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = SHIGURE_R2 + SEPARATOR + ISUZU_R2;
					break;
				case 106: //13号対空電探改
					result = HATSUSHIMO_R2 + SEPARATOR + YUKIKAZE;
					break;
				case 28: //22号対水上電探
					result = HYUGA;
					break;
				case 88: //22号対水上電探改四
					result = MYOKO_R2 + SEPARATOR + HAGURO_R2;
					break;
				case 30: //21号対空電探
					result = ISE;
					break;
				case 89: //21号対空電探改
					result = YAMATO;
					break;
				case 31: //32号対水上電探
					result = HYUGA;
					break;
				case 141: //32号対水上電探改
					result = ISE;
					break;
				/* ソナー */
				case 46: //九三式水中聴音機
					result = YUBARI;
					break;
				case 47: //三式水中探信儀
					result = ISUZU_R2;
					break;
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = KIRISHIMA;
					break;
				case 116: //一式徹甲弾
					result = KONGO;
					break;
				/* 対空機銃 */
				case 39: //25mm連装機銃
					result = ISUZU_R2;
					break;
				case 40: //25mm三連装機銃
					result = MAYA_R2;
					break;
				/* 高射装置 */
				case 120: //91式高射装置
					result = MAYA + SEPARATOR + AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + FUBUKI_R2 + SEPARATOR + MAYA_R2 + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = JINTSU;
					break;
				case 140: //96式150cm探照灯
					result = HIEI;
					break;
			}
			break;
		case Calendar.MONDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 63: //12.7cm連装砲B型改二
					result = YUDACHI_R2 + SEPARATOR + AYANAMI_R2;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = AKIDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 119: //14cm連装砲
					result = YUBARI;
					break;
				case 65: //15.2cm連装砲
					result = NOSHIRO + SEPARATOR + YAHAGI;
					break;
				case 139: //15.2cm連装砲改
					result = SAKAWA;
					break;
				case 5: //15.5cm三連装砲
					result = OYODO;
					break;
				case 6: //20.3cm連装砲
					result = KINUGASA;
					break;
				case 90: //20.3cm(2号)連装砲
					result = MYOKO;
					break;
				/* 大口径主砲 */
				case 114: //38cm連装砲改
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = ROMA;
					break;
				case 137: //381mm/50 三連装砲改
					result = LITTORIO;
					break;
				case 8: //41cm連装砲
					result = MUTSU;
					break;
				case 117: //試製46cm連装砲
					result = YAMATO;
					break;
				case 9: //46cm三連装砲
					result = MUSASHI;
					break;
				case 128: //試製51cm連装砲
					result = YAMATO_R + SEPARATOR + MUSASHI_R;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = LITTORIO;
					break;
				case 11: //15.2cm単装砲
					result = AGANO + SEPARATOR + KONGO + SEPARATOR + YAMASHIRO;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = ROMA;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = MURAKUMO;
					break;
				case 14: //61cm四連装魚雷
					result = DEFAULT;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = ISUZU_R2;
					break;
				case 106: //13号対空電探改
					result = YUKIKAZE;
					break;
				case 28: //22号対水上電探
					result = HYUGA + SEPARATOR + YUGUMO;
					break;
				case 88: //22号対水上電探改四
					result = HAGURO_R2;
					break;
				case 30: //21号対空電探
					result = ISE;
					break;
				case 31: //32号対水上電探
					result = HYUGA;
					break;
				case 141: //32号対水上電探改
					result = ISE;
					break;
				/* ソナー */
				case 46: //九三式水中聴音機
					result = ISUZU_R2;
					break;
				/* 爆雷 */
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = KIRISHIMA;
					break;
				case 116: //一式徹甲弾
					result = HARUNA;
					break;
				/* 対空機銃 */
				case 40: //25mm三連装機銃
					result = ISUZU_R2 + SEPARATOR + MAYA_R2;
					break;
				/* 高射装置 */
				case 120: //91式高射装置
					result = MAYA + SEPARATOR + AKIDUKI;
					break;
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AOBA + SEPARATOR + AYANAMI;
					break;
				case 140: //96式150cm探照灯
					result = HIEI;
					break;
			}
			break;
		case Calendar.TUESDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 63: //12.7cm連装砲B型改二
					result = YUDACHI_R2 + SEPARATOR + AYANAMI_R2;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = AKIDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 65: //15.2cm連装砲
					result = YAHAGI;
					break;
				case 139: //15.2cm連装砲改
					result = SAKAWA;
					break;
				case 6: //20.3cm連装砲
					result = KINUGASA;
					break;
				case 90: //20.3cm(2号)連装砲
					result = MYOKO;
					break;
				case 50: //20.3cm(3号)連装砲
					result = MIKUMA;
					break;
				/* 大口径主砲 */
				case 114: //38cm連装砲改
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = LITTORIO;
					break;
				case 137: //381mm/50 三連装砲改
					result = ROMA;
					break;
				case 8: //41cm連装砲
					result = NAGATO;
					break;
				case 117: //試製46cm連装砲
					result = MUSASHI;
					break;
				case 128: //試製51cm連装砲
					result = YAMATO_R;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = LITTORIO;
					break;
				case 11: //15.2cm単装砲
					result = AGANO + SEPARATOR + YAMASHIRO;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = LITTORIO;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = MURAKUMO;
					break;
				case 14: //61cm四連装魚雷
					result = DEFAULT;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = AKIDUKI;
					break;
				case 106: //13号対空電探改
					result = YUKIKAZE;
					break;
				case 28: //22号対水上電探
					result = YUGUMO;
					break;
				case 88: //22号対水上電探改四
					result = KONGO_R2;
					break;
				case 89: //21号対空電探改
					result = MUSASHI;
					break;
				case 31: //32号対水上電探
					result = HYUGA;
					break;
				case 141: //32号対水上電探改
					result = ISE;
					break;
				/* ソナー */
				case 47: //三式水中探信儀
					result = YUBARI + SEPARATOR + ISUZU_R2;
					break;
				/* 爆雷 */
				/* 対艦強化弾 */
				case 116: //一式徹甲弾
					result = HARUNA;
					break;
				/* 対空機銃 */
				case 40: //25mm三連装機銃
					result = ISUZU_R2 + SEPARATOR + MAYA + SEPARATOR + MAYA_R;
					break;
				/* 高射装置 */
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AOBA + SEPARATOR + AYANAMI;
					break;
				case 140: //96式150cm探照灯
					result = KIRISHIMA;
					break;
			}
			break;
		case Calendar.WEDNESDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 63: //12.7cm連装砲B型改二
					result = YUDACHI_R2 + SEPARATOR + AYANAMI_R2;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = AKIDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 65: //15.2cm連装砲
					result = YAHAGI;
					break;
				case 139: //15.2cm連装砲改
					result = YAHAGI;
					break;
				case 6: //20.3cm連装砲
					result = KINUGASA;
					break;
				case 50: //20.3cm(3号)連装砲
					result = MIKUMA;
					break;
				/* 大口径主砲 */
				case 133: //381mm/50 三連装砲
					result = LITTORIO;
					break;
				case 137: //381mm/50 三連装砲改
					result = ROMA;
					break;
				case 117: //試製46cm連装砲
					result = MUSASHI;
					break;
				case 128: //試製51cm連装砲
					result = MUSASHI_R;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = LITTORIO;
					break;
				case 11: //15.2cm単装砲
					result = YAMASHIRO;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = LITTORIO;
					break;
				/* 魚雷 */
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				case 58: //61cm五連装(酸素)魚雷
					result = SHIMAKAZE;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = AKIDUKI;
					break;
				case 106: //13号対空電探改
					result = YUKIKAZE;
					break;
				case 28: //22号対水上電探
					result = SHIMAKAZE;
					break;
				case 88: //22号対水上電探改四
					result = KONGO_R2;
					break;
				case 30: //21号対空電探
					result = HYUGA;
					break;
				case 89: //21号対空電探改
					result = MUSASHI;
					break;
				case 31: //32号対水上電探
					result = ISE;
					break;
				case 141: //32号対水上電探改
					result = HYUGA;
					break;
				/* ソナー */
				case 47: //三式水中探信儀
					result = YUBARI + SEPARATOR + ISUZU_R2;
					break;
				/* 爆雷 */
				case 44: //九四式爆雷投射機
					result = DEFAULT;
					break;
				case 45: //三式爆雷投射機
					result = ISUZU_R2;
					break;
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = HIEI;
					break;
				case 116: //一式徹甲弾
					result = HARUNA;
					break;
				/* 対空機銃 */
				case 40: //25mm三連装機銃
					result = ISUZU_R2 + SEPARATOR + MAYA + SEPARATOR + MAYA_R;
					break;
				/* 高射装置 */
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AOBA + SEPARATOR + AYANAMI;
					break;
				case 140: //96式150cm探照灯
					result = KIRISHIMA;
					break;
			}
			break;
		case Calendar.THURSDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 119: //14cm連装砲
					result = YUBARI;
					break;
				case 65: //15.2cm連装砲
					result = AGANO + SEPARATOR + YAHAGI;
					break;
				case 139: //15.2cm連装砲改
					result = YAHAGI;
					break;
				case 6: //20.3cm連装砲
					result = AOBA + SEPARATOR + KINUGASA;
					break;
				/* 大口径主砲 */
				case 76: //38cm連装砲
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = LITTORIO;
					break;
				case 137: //381mm/50 三連装砲改
					result = ROMA;
					break;
				case 8: //41cm連装砲
					result = MUTSU;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = LITTORIO + SEPARATOR + ROMA;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = ROMA;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = FUBUKI + SEPARATOR + FUBUKI_R;
					break;
				case 125: //61cm三連装(酸素)魚雷
					result = FUBUKI_R2;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				case 58: //61cm五連装(酸素)魚雷
					result = SHIMAKAZE;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = SHIGURE_R2 + SEPARATOR + AKIDUKI;
					break;
				case 106: //13号対空電探改
					result = ISOKAZE_R;
					break;
				case 28: //22号対水上電探
					result = SHIMAKAZE;
					break;
				case 88: //22号対水上電探改四
					result = MYOKO_R2 + SEPARATOR + KONGO_R2;
					break;
				case 30: //21号対空電探
					result = HYUGA;
					break;
				case 89: //21号対空電探改
					result = YAMATO + SEPARATOR + MUSASHI;
					break;
				case 31: //32号対水上電探
					result = ISE;
					break;
				case 141: //32号対水上電探改
					result = HYUGA;
					break;
				/* ソナー */
				/* 爆雷 */
				case 44: //九四式爆雷投射機
					result = DEFAULT;
					break;
				case 45: //三式爆雷投射機
					result = ISUZU_R2;
					break;
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = HIEI;
					break;
				/* 対空機銃 */
				case 40: //25mm三連装機銃
					result = MAYA + SEPARATOR + MAYA_R;
					break;
				/* 高射装置 */
				case 120: //91式高射装置
					result = TERUDUKI;
					break;
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + FUBUKI_R2 + SEPARATOR + MAYA_R2 + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AKATSUKI;
					break;
				case 140: //96式150cm探照灯
					result = KIRISHIMA;
					break;
			}
			break;
		case Calendar.FRIDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = TERUDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 65: //15.2cm連装砲
					result = AGANO + SEPARATOR + NOSHIRO;
					break;
				case 139: //15.2cm連装砲改
					result = YAHAGI;
					break;
				case 5: //15.5cm三連装砲
					result = MOGAMI;
					break;
				case 6: //20.3cm連装砲
					result = AOBA + SEPARATOR + KINUGASA;
					break;
				/* 大口径主砲 */
				case 7: //35.6cm連装砲
					result = FUSO;
					break;
				case 76: //38cm連装砲
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = LITTORIO;
					break;
				case 137: //381mm/50 三連装砲改
					result = ROMA;
					break;
				case 8: //41cm連装砲
					result = NAGATO;
					break;
				case 9: //46cm三連装砲
					result = YAMATO;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = ROMA;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = ROMA;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = FUBUKI + SEPARATOR + FUBUKI_R;
					break;
				case 125: //61cm三連装(酸素)魚雷
					result = FUBUKI_R2;
					break;
				case 14: //61cm四連装魚雷
					result = DEFAULT;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = SHIGURE_R2 + SEPARATOR + ISUZU_R2;
					break;
				case 106: //13号対空電探改
					result = ISOKAZE_R + SEPARATOR + HATSUSHIMO_R2;
					break;
				case 28: //22号対水上電探
					result = HYUGA +SEPARATOR + YUGUMO + SEPARATOR + SHIMAKAZE;
					break;
				case 88: //22号対水上電探改四
					result = MYOKO_R2 + SEPARATOR + HAGURO_R2 + SEPARATOR + KONGO_R2;
					break;
				case 30: //21号対空電探
					result = ISE + SEPARATOR + HYUGA;
					break;
				case 89: //21号対空電探改
					result = YAMATO + SEPARATOR + MUSASHI;
					break;
				case 31: //32号対水上電探
					result = ISE;
					break;
				case 141: //32号対水上電探改
					result = HYUGA;
					break;
				/* ソナー */
				case 46: //九三式水中聴音機
					result = YUBARI + SEPARATOR + ISUZU_R2;
					break;
				/* 爆雷 */
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = HIEI + SEPARATOR + KIRISHIMA;
					break;
				case 116: //一式徹甲弾
					result = KONGO;
					break;
				/* 対空機銃 */
				case 39: //25mm連装機銃
					result = ISUZU_R2;
					break;
				case 40: //25mm三連装機銃
					result = MAYA_R2;
					break;
				/* 高射装置 */
				case 120: //91式高射装置
					result = MAYA + SEPARATOR + AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + FUBUKI_R2 + SEPARATOR + MAYA_R2 + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AKATSUKI + SEPARATOR + JINTSU;
					break;
				case 140: //96式150cm探照灯
					result = HIEI + SEPARATOR + KIRISHIMA;
					break;
			}
			break;
		case Calendar.SATURDAY:
			switch(data.getInfo().getId()){
				/* 小口径主砲 */
				case 2: //12.7cm連装砲
					result = DEFAULT;
					break;
				case 122: //10cm連装高角砲+高射装置
					result = TERUDUKI;
					break;
				/* 中口径主砲 */
				case 4: //14cm単装砲
					result = DEFAULT;
					break;
				case 65: //15.2cm連装砲
					result = AGANO + SEPARATOR + NOSHIRO;
					break;
				case 139: //15.2cm連装砲改
					result = YAHAGI + SEPARATOR + SAKAWA;
					break;
				case 5: //15.5cm三連装砲
					result = MOGAMI;
					break;
				case 6: //20.3cm連装砲
					result = AOBA + SEPARATOR + KINUGASA;
					break;
				/* 大口径主砲 */
				case 7: //35.6cm連装砲
					result = FUSO;
					break;
				case 76: //38cm連装砲
					result = BISMARCK;
					break;
				case 133: //381mm/50 三連装砲
					result = ROMA;
					break;
				case 137: //381mm/50 三連装砲改
					result = LITTORIO;
					break;
				case 8: //41cm連装砲
					result = NAGATO;
					break;
				case 9: //46cm三連装砲
					result = YAMATO;
					break;
				/* 副砲 */
				case 135: //90mm単装高角砲
					result = ROMA;
					break;
				case 11: //15.2cm単装砲
					result = KONGO;
					break;
				case 134: //OTO 152mm三連装速射砲
					result = LITTORIO;
					break;
				/* 魚雷 */
				case 13: //61cm三連装魚雷
					result = FUBUKI + SEPARATOR + FUBUKI_R;
					break;
				case 125: //61cm三連装(酸素)魚雷
					result = FUBUKI_R2;
					break;
				case 14: //61cm四連装魚雷
					result = DEFAULT;
					break;
				case 15: //61cm四連装(酸素)魚雷
					result = OI + SEPARATOR + KITAKAMI;
					break;
				/* 電探 */
				case 27: //13号対空電探
					result = SHIGURE_R2 + SEPARATOR + ISUZU_R2;
					break;
				case 106: //13号対空電探改
					result = ISOKAZE_R + SEPARATOR + HATSUSHIMO_R2;
					break;
				case 28: //22号対水上電探
					result = HYUGA +SEPARATOR + YUGUMO + SEPARATOR + SHIMAKAZE;
					break;
				case 88: //22号対水上電探改四
					result = MYOKO_R2 + SEPARATOR + HAGURO_R2;
					break;
				case 30: //21号対空電探
					result = ISE + SEPARATOR + HYUGA;
					break;
				case 89: //21号対空電探改
					result = YAMATO;
					break;
				case 31: //32号対水上電探
					result = ISE;
					break;
				case 141: //32号対水上電探改
					result = HYUGA;
					break;
				/* ソナー */
				case 46: //九三式水中聴音機
					result = YUBARI + SEPARATOR + ISUZU_R2;
					break;
				/* 爆雷 */
				/* 対艦強化弾 */
				case 36: //九一式徹甲弾
					result = HIEI + SEPARATOR + KIRISHIMA;
					break;
				case 116: //一式徹甲弾
					result = KONGO;
					break;
				/* 対空機銃 */
				case 39: //25mm連装機銃
					result = ISUZU_R2;
					break;
				case 40: //25mm三連装機銃
					result = MAYA_R2;
					break;
				/* 高射装置 */
				case 120: //91式高射装置
					result = MAYA + SEPARATOR + AKIDUKI + SEPARATOR + TERUDUKI;
					break;
				case 121: //94式高射装置
					result = AKIDUKI + SEPARATOR + FUBUKI_R2 + SEPARATOR + MAYA_R2 + SEPARATOR + TERUDUKI;
					break;
				/* 探照灯 */
				case 74: //探照灯
					result = AKATSUKI + SEPARATOR + JINTSU;
					break;
				case 140: //96式150cm探照灯
					result = HIEI;
					break;
			}
			break;
		default :
			break;
	}
	return [String(result)];
}

function end() { }
