//Ver:2.3.5
//Author:Nishisonic

//script読み込み
load("script/utils.js");
load("script/ScriptData.js");
load("script/remodelItem.js");

//Import部分
Arrays             = Java.type("java.util.Arrays");
Calendar           = Java.type("java.util.Calendar");
DecimalFormat      = Java.type("java.text.DecimalFormat");
IntStream          = Java.type("java.util.stream.IntStream");
ObjectArrayType    = Java.type("java.lang.Object[]");
TimeZone           = Java.type("java.util.TimeZone");
Event              = Java.type("org.eclipse.swt.widgets.Event");
FillLayout         = Java.type("org.eclipse.swt.layout.FillLayout");
Label              = Java.type("org.eclipse.swt.widgets.Label");
Listener           = Java.type("org.eclipse.swt.widgets.Listener");
Point              = Java.type("org.eclipse.swt.graphics.Point");
Shell              = Java.type("org.eclipse.swt.widgets.Shell");
SimpleDateFormat   = Java.type("java.text.SimpleDateFormat");
Stream             = Java.type("java.util.stream.Stream");
SWT                = Java.type("org.eclipse.swt.SWT");
SWTResourceManager = Java.type("org.eclipse.wb.swt.SWTResourceManager");
TableItem          = Java.type("org.eclipse.swt.widgets.TableItem");
AppConstants       = Java.type("logbook.constants.AppConstants");
GlobalContext      = Java.type("logbook.data.context.GlobalContext");
Item               = Java.type("logbook.internal.Item");
ItemInfoDto        = Java.type("logbook.dto.ItemInfoDto");
ReportUtils        = Java.type("logbook.util.ReportUtils");

data_prefix = "remodelItem_";

var remodelItemIndex = - 1;

function begin(header) {
    IntStream.range(0,header.length).forEach(function(i){
        if (header[i].equals("二番艦")) {
            remodelItemIndex = i;
        }
    })
}

var tip = null;
var label = null;

function create(table, data, index) {
    // 装備
    var items = data[0].get();

    var item = new TableItem(table, SWT.NONE);

    item.setData(items);

    // 偶数行に背景色を付ける
    if ((index % 2) != 0) {
        item.setBackground(SWTResourceManager.getColor(AppConstants.ROW_BACKGROUND));
    }

    item.setText(ReportUtils.toStringArray(data));

    var TableListener = new Listener({
        handleEvent : function(event) {
               switch (event.type) {
                case SWT.Dispose:
                case SWT.KeyDown:
                case SWT.MouseMove: {
                    if (tip == null) break;
                     tip.dispose();
                      tip = null;
                      label = null;
                      break;
                }
                case SWT.MouseHover: {
                    var point = new Point(event.x, event.y);
                    var _item = table.getItem(point);
                    if (_item != null && isRemodelItem(_item.data.info.id) && getColumnIndex(point,_item) == remodelItemIndex) {
                            if (tip != null && !tip.isDisposed()) tip.dispose();
                           tip = new Shell(table.getShell(), SWT.ON_TOP | SWT.TOOL);
                        tip.setLayout(new FillLayout());
                        label = new Label (tip, SWT.NONE);
                        label.setData ("_TABLEITEM", item);
                        label.setText (getRemodelItemData(_item.data.info.id,Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo"))));
                        label.addListener (SWT.MouseExit, LabelListener);
                        label.addListener (SWT.MouseDown, LabelListener);
                        var size = tip.computeSize (SWT.DEFAULT, SWT.DEFAULT);
                        //var rect = _item.getBounds (remodelItemIndex);
                        var pt = table.toDisplay (event.x, event.y);
                        tip.setBounds (pt.x + 15, pt.y + 5, size.x, size.y);
                        tip.setVisible (true);
                       }
                }
            }
        }
    });

    var LabelListener = new Listener({
        handleEvent : function(event){
            var _label = Label.class.cast(event.widget);
            var shell1 = label.getShell();
            switch (event.type){
                case SWT.MouseDown:
                    var e = new Event();
                    e.item = TableItem.class.cast(_label.getData("_TABLEITEM"));
                    table.notifyListeners(SWT.Selection, e);
                    shell1.dispose();
                    table.setFocus();
                    break;
                case SWT.MouseExit:
                    shell1.dispose();
                    break;
            }
        }
    });

    if(getData("set") == null){
        table.setToolTipText("");
        table.addListener(SWT.Dispose, TableListener);
        table.addListener(SWT.KeyDown, TableListener);
        table.addListener(SWT.MouseMove, TableListener);
        table.addListener(SWT.MouseHover, TableListener);
        setTmpData("set",true);
    }

    return item;
}

function end() { }

function isRemodelItem(itemId,dayOfWeek){
    return remodelItemData[String(word + itemId)] != null && remodelItemData[String(word + itemId)].helperShip[getDayOfWeek(dayOfWeek)] != NONE;
}

function getRemodelItemData(itemId,cal){
    var result = "";
    if(remodelItemData[String(word + itemId)].MATERIAL === undefined){
        Arrays.stream(Java.to(remodelItemData[String(word + itemId)].upgrade,ObjectArrayType)).forEach(function(data){
            result += _getRemodelItemData(itemId,data,cal) + "\n";
        });
        result = result.substr(0, result.length - 2);
    } else {
        result += _getRemodelItemData(itemId,remodelItemData[String(word + itemId)],cal);
    }
    return result.replace(/&/g,'&&');
}

function _getRemodelItemData(itemId,itemData,cal){
    var df = new DecimalFormat("000");
    var df2 = new DecimalFormat("00");
    var itemName = getItemName(itemId);
    var upgradeToItemName = "";
    var upgradeToItemStar = 0;
    var helperShip = itemData.helperShip[getDayOfWeek(cal.get(Calendar.DAY_OF_WEEK))].join(SEP).replace(/\n/,"");
    var sdf = new SimpleDateFormat("\n [次回はM月d日(E)");
    var nextImprovementDate = getNextImprovementDate(itemData,cal);
    helperShip += sdf.format(nextImprovementDate.getTime()) + " 二番艦:" + itemData.helperShip[getDayOfWeek(nextImprovementDate.get(Calendar.DAY_OF_WEEK))].join(SEP) + "]"; //次の改修日を表示
    var material = itemData.MATERIAL;
    var fuel    = df.format(material[0]|0);
    var ammo    = df.format(material[1]|0);
    var steel   = df.format(material[2]|0);
    var bauxite = df.format(material[3]|0);
    var star0to6Research = itemData.star0to6.RESEARCH;
    var star0to6Screw = itemData.star0to6.SCREW;
    var star0to6Consumes = [];
    if(itemData.star0to6 != null){
        star0to6Research = itemData.star0to6.RESEARCH;
        star0to6Screw = itemData.star0to6.SCREW;
        if(itemData.star0to6.consumes != null){
            if(itemData.star0to6.consumes instanceof Array){
                for(var i in itemData.star0to6.consumes){
                    var star0to6ConsumeName = getItemName(itemData.star0to6.consumes[i].ID);
                    var star0to6ConsumeNum = itemData.star0to6.consumes[i].NUM;
                    var star0to6NumOfPossesions = isItem(itemData.star0to6.consumes[i].ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                        return item.slotitemId == itemData.star0to6.consumes[i].ID && item.level == 0;
                    }).count() : "?";
                    star0to6Consumes.push({name:star0to6ConsumeName,num:star0to6ConsumeNum,pos:star0to6NumOfPossesions});
                }
            } else {
                var star0to6ConsumeName = getItemName(itemData.star0to6.consumes.ID);
                var star0to6ConsumeNum = itemData.star0to6.consumes.NUM;
                var star0to6NumOfPossesions = isItem(itemData.star0to6.consumes.ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                    return item.slotitemId == itemData.star0to6.consumes.ID && item.level == 0;
                }).count() : "?";
                star0to6Consumes.push({name:star0to6ConsumeName,num:star0to6ConsumeNum,pos:star0to6NumOfPossesions});
            }
        } else {
            star0to6Consumes.push({name:"なし",num:"",pos:0});
        }
    }
    var star6toMaxResearch = itemData.star6toMax.RESEARCH;
    var star6toMaxScrew = itemData.star6toMax.SCREW;
    var star6toMaxConsumes = [];
    if(itemData.star6toMax != null){
        star6toMaxResearch = itemData.star6toMax.RESEARCH;
        star6toMaxScrew = itemData.star6toMax.SCREW;
        if(itemData.star6toMax.consumes != null){
            if(itemData.star6toMax.consumes instanceof Array){
                for(var i in itemData.star6toMax.consumes){
                    var star6toMaxConsumeName = getItemName(itemData.star6toMax.consumes[i].ID);
                    var star6toMaxConsumeNum = itemData.star6toMax.consumes[i].NUM;
                    var star6toMaxNumOfPossesions = isItem(itemData.star6toMax.consumes[i].ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                        return item.slotitemId == itemData.star6toMax.consumes[i].ID && item.level == 0;
                    }).count() : "?";
                    star6toMaxConsumes.push({name:star6toMaxConsumeName,num:star6toMaxConsumeNum,pos:star6toMaxNumOfPossesions});
                }
            } else {
                var star6toMaxConsumeName = getItemName(itemData.star6toMax.consumes.ID);
                var star6toMaxConsumeNum = itemData.star6toMax.consumes.NUM;
                var star6toMaxNumOfPossesions = isItem(itemData.star6toMax.consumes.ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                    return item.slotitemId == itemData.star6toMax.consumes.ID && item.level == 0;
                }).count() : "?";
                star6toMaxConsumes.push({name:star6toMaxConsumeName,num:star6toMaxConsumeNum,pos:star6toMaxNumOfPossesions});
            }
        } else {
            star6toMaxConsumes.push({name:"なし",num:"",pos:0});
        }
    }
    var upgradeResearch = [" --","-- "];
    var upgradeScrew    = [" --","--  "];
    var upgradeConsumes = [];
    var upgradeToItemName;
    var upgradeToItemStar;
    if(itemData.upgrade != null){
        upgradeResearch = itemData.upgrade.RESEARCH;
        upgradeScrew = itemData.upgrade.SCREW;
        if(itemData.upgrade.consumes != null){
            if(itemData.upgrade.consumes instanceof Array){
                for(var i in itemData.upgrade.consumes){
                    var upgradeConsumeName = getItemName(itemData.upgrade.consumes[i].ID);
                    var upgradeConsumeNum = itemData.upgrade.consumes[i].NUM;
                    var upgradeNumOfPossesions = isItem(itemData.upgrade.consumes[i].ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                        return item.slotitemId == itemData.upgrade.consumes[i].ID && item.level == 0;
                    }).count() : "?";
                    upgradeConsumes.push({name:upgradeConsumeName,num:upgradeConsumeNum,pos:upgradeNumOfPossesions});
                }
            } else {
                var upgradeConsumeName = getItemName(itemData.upgrade.consumes.ID);
                var upgradeConsumeNum = itemData.upgrade.consumes.NUM;
                var upgradeNumOfPossesions = isItem(itemData.upgrade.consumes.ID) ? GlobalContext.getItemMap().values().stream().filter(function(item){
                    return item.slotitemId == itemData.upgrade.consumes.ID && item.level == 0;
                }).count() : "?";
                upgradeConsumes.push({name:upgradeConsumeName,num:upgradeConsumeNum,pos:upgradeNumOfPossesions});
            }
        } else {
            upgradeConsumes.push({name:"なし",num:"",pos:0});
        }
        upgradeToItemName = Item.get(itemData.upgrade.ID).getName();
        upgradeToItemStar = itemData.upgrade.STAR;
    }
    var row1 = " " + itemName + "→" + upgradeToItemName + (upgradeToItemStar != "0" ? "★" + (upgradeToItemStar == 10 ? "max" : "+" + upgradeToItemStar) : "") + "　";
    var row2 = " 二番艦:" + helperShip + "　";
    var row3 = " 燃料:" + fuel + " 弾薬:" + ammo + " 鋼材:" + steel + " ボーキ:" + bauxite + "　";
    var row4 = toFormatInfo(" 初期|",star0to6Research,star0to6Screw,star0to6Consumes);
    var row5 = toFormatInfo(" ★６|",star6toMaxResearch,star6toMaxScrew,star6toMaxConsumes);
    var row6;
    if(itemData.upgrade == null){
        row6 = " ★Ｍ|　　       ---装備更新不可---";
    } else {
        row6 = toFormatInfo(" ★Ｍ|",upgradeResearch,upgradeScrew,upgradeConsumes);
    }
    return row1 + "\n" + row2 + "\n" + row3 + "\n" + row4 + "\n" + row5 + "\n" + row6 + "\n";
}

function getColumnIndex(pt,item){
    var columns = item.getParent().getColumnCount();
    return IntStream.range(0,columns).filter(function(index){
        var rect = item.getBounds(index);
        return pt.x >= rect.x && pt.x < rect.x + rect.width;
    }).findFirst().orElse(-1);
}

function getNextImprovementDate(itemData,cal){
    var calendar = cal.clone();
    return Stream.iterate(1,function(i){return i;}).limit(7).map(function(i){
        calendar.roll(Calendar.DAY_OF_YEAR ,true);
        return calendar;
    }).filter(function(c){
        return itemData.helperShip[getDayOfWeek(c.get(Calendar.DAY_OF_WEEK))] != NONE;
    }).findFirst().orElse(null);
}

function getItemName(id){
    try {
        return Item.get(id).getName();
    } catch(e) {
        switch(id){
            case NE_ENGINE        : return "ネ式エンジン";
            case NEW_GUN_MOUNT    : return "新型砲熕兵装資材";
            case SKILLED          : return "熟練搭乗員";
            case NEW_MODEL_AERIAL : return "新型航空兵装資材";
            case ACTION_REPORT    : return "戦闘詳報";
            default               : return id;
        }
    }
}

function isItem(id){
    return Item.get(id) instanceof ItemInfoDto;
}

function toFormatInfo(prefix,research,screw,consumes){
    var df = new DecimalFormat("000");
    var df2 = new DecimalFormat("00");
    var result = prefix;
    result += "開発:" + df2.format(research[0]|0) + "/" + df2.format(research[1]|0);
    result += " 改修:" + df2.format(screw[0]|0) + "/" + df2.format(screw[1]|0);
    result += " 消費:";
    if(screw[1] == "--  "){
        result += "---";
    } else {
        for(var i in consumes){
            result += consumes[i].name;
            if(consumes[i].num != ""){
                result += "*" + consumes[i].num + " (" + consumes[i].pos + ")";
            }
            if(i < consumes.length - 1){
                result += ",";
            } else {
                result += "　";
            }
        }
    }
    return result;
}
