//Ver:2.3.6
//Author:Nishisonic

load("script/utils.js");
load("script/remodelItem.js");
Calendar = Java.type("java.util.Calendar");
TimeZone = Java.type("java.util.TimeZone");
IOUtils = Java.type("org.apache.commons.io.IOUtils")
URI = Java.type("java.net.URI")
StandardCharsets = Java.type("java.nio.charset.StandardCharsets")
Files = Java.type("java.nio.file.Files")
Paths = Java.type("java.nio.file.Paths")
StandardOpenOption = Java.type("java.nio.file.StandardOpenOption")

/** バージョン */
var VERSION = 2.36
/** バージョン確認URL */
var UPDATE_CHECK_URL = "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/update.txt"
/** ファイルの場所 */
var FILE_URL = [
    "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/item_remodelItem.js",
    "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/itemstyle.js",
    "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/remodelItem.js",
]
/** 保存場所 */
var EXECUTABLE_FILE = [
    "script/item_remodelItem.js",
    "script/itemstyle.js",
    "script/remodelItem.js",
]

function header(){
    return [ "二番艦" ];
}

function begin(){
    updateFile()
}

function body(data){
    var dayOfWeek = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo")).get(Calendar.DAY_OF_WEEK);
    return toComparable([ getSecondShip( dayOfWeek, data.getInfo().getId()) ]);
}

function end(){ }

//2番艦を取得します
function getSecondShip(dayOfWeek, itemId){
    try{
        //安定のリフレクション
        return remodelItemData[String(word + itemId)].helperShip[getDayOfWeek(dayOfWeek)].join(SEP);
    }catch(e){
        return "\n改修不可";
    }
}

/**
 * ファイルをアップデートします
 */
function updateFile() {
    try {
        if (VERSION < Number(IOUtils.toString(URI.create(UPDATE_CHECK_URL), StandardCharsets.UTF_8))) {
            FILE_URL.forEach(function(file,i){
                IOUtils.write(IOUtils.toString(URI.create(file), StandardCharsets.UTF_8), Files.newOutputStream(Paths.get(EXECUTABLE_FILE[i]), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING), StandardCharsets.UTF_8)
            });
        }
    } catch (e) {
        print("File Update Failed.")
        e.printStackTrace()
    }
}
