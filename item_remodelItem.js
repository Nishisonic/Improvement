//Ver:2.0.0
//Author:Nishisonic

load("script/utils.js");
load("script/remodelItem.js");
Calendar = Java.type("java.util.Calendar");
Item = Java.type("logbook.internal.Item");

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
        //安定のリフレクション
        return remodelItemData[String(word + itemId)].helperShip[getDayOfWeek(dayOfWeek)].join(SEP);
    }catch(e){
        return NONE;
    }
}
