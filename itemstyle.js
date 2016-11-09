//Ver:2.1.4.9
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
			result += _getRemodelItemData(data,cal) + "\r\n";
		});
		result = result.substr(0, result.length - 2);
	} else {
		result += _getRemodelItemData(remodelItemData[String(word + itemId)],cal);
	}
	return result;
}

function _getRemodelItemData(itemData,cal){
	var df = new DecimalFormat("000");
	var df2 = new DecimalFormat("00");
	var itemName;
	try {
		itemName = Item.get(itemData.ID).getName();
	} catch(e) {
		itemName = itemData.ID;
	}
	var upgradeToItemName = "";
	var upgradeToItemStar = 0;
	var helperShip = itemData.helperShip[getDayOfWeek(cal.get(Calendar.DAY_OF_WEEK))].join(SEP);
	if(helperShip == NONE){
		helperShip = helperShip.substring(1,helperShip.length()); //改行を省く
		var sdf = new SimpleDateFormat("(次回はM月d日(E))");
		helperShip += sdf.format(getNextImprovementDate(itemData,cal).getTime()); //次の改修日を表示
	}
	var material = itemData.MATERIAL;
	var fuel    = df.format(material[0]|0);
	var ammo    = df.format(material[1]|0);
	var steel   = df.format(material[2]|0);
	var bauxite = df.format(material[3]|0);
	var star0to6Research = itemData.star0to6.RESEARCH;
	var star0to6Screw = itemData.star0to6.SCREW;
	var star0to6ConsumeName = "なし";
	var star0to6ConsumeNum = "";
	var star0to6NumOfPossesions = 0;
	if(itemData.star0to6.consumes != null){
		star0to6ConsumeName = Item.get(itemData.star0to6.consumes.ID).getName();
		star0to6ConsumeNum = itemData.star0to6.consumes.NUM;
		star0to6NumOfPossesions = GlobalContext.getItemMap().values().stream().filter(function(item){
			return item.slotitemId == itemData.star0to6.consumes.ID && item.level == 0;
		}).count();
	}
	var star6toMaxResearch = itemData.star6toMax.RESEARCH;
	var star6toMaxScrew = itemData.star6toMax.SCREW;
	var star6toMaxConsumeName = "なし";
	var star6toMaxConsumeNum = "";
	var star6toMaxNumOfPossesions = 0;
	if(itemData.star6toMax.consumes != null){
		star6toMaxConsumeName = Item.get(itemData.star6toMax.consumes.ID).getName();
		star6toMaxConsumeNum = itemData.star6toMax.consumes.NUM;
		star6toMaxNumOfPossesions = GlobalContext.getItemMap().values().stream().filter(function(item){
			return item.slotitemId == itemData.star6toMax.consumes.ID && item.level == 0;
		}).count();
	}
	var upgradeResearch = [" --","-- "];
	var upgradeScrew    = [" --","--  "];
	var upgradeConsumeName = "なし";
	var upgradeConsumeNum = "";
	var upgradeNumOfPossesions = 0;
	if(itemData.upgrade != null){
		upgradeResearch = itemData.upgrade.RESEARCH;
		upgradeScrew = itemData.upgrade.SCREW;
		if(itemData.upgrade.consumes != null){
			upgradeConsumeName = Item.get(itemData.upgrade.consumes.ID).getName();
			upgradeConsumeNum = itemData.upgrade.consumes.NUM;
			upgradeNumOfPossesions = GlobalContext.getItemMap().values().stream().filter(function(item){
				return item.slotitemId == itemData.upgrade.consumes.ID && item.level == 0;
			}).count();
		}
		upgradeToItemName = Item.get(itemData.upgrade.ID).getName();
		upgradeToItemStar = itemData.upgrade.STAR;
	}
	var row1 = " " + itemName + "→" + upgradeToItemName + (upgradeToItemStar != "0" ? "★" + (upgradeToItemStar == 10 ? "max" : "+" + upgradeToItemStar) : "") + "　";
	var row2 = " 二番艦:" + helperShip + "　";
	var row3 = " 燃料:" + fuel + " 弾薬:" + ammo + " 鋼材:" + steel + " ボーキ:" + bauxite + "　";
	var row4 = " 初期|開発:" + df2.format(star0to6Research[0]|0)   + "/" + df2.format(star0to6Research[1]|0)   + " 改修:" + df2.format(star0to6Screw[0]|0)   + "/" + df2.format(star0to6Screw[1]|0)   + " 消費:" + (star0to6Screw[1]   == "--  " ? "---" : star0to6ConsumeName   + (star0to6ConsumeNum   == "" ? "" : "*" + star0to6ConsumeNum + " (" + star0to6NumOfPossesions + ")　"));
	var row5 = " ★６|開発:" + df2.format(star6toMaxResearch[0]|0) + "/" + df2.format(star6toMaxResearch[1]|0) + " 改修:" + df2.format(star6toMaxScrew[0]|0) + "/" + df2.format(star6toMaxScrew[1]|0) + " 消費:" + (star6toMaxScrew[1] == "--  " ? "---" : star6toMaxConsumeName + (star6toMaxConsumeNum == "" ? "" : "*" + star6toMaxConsumeNum + " (" + star6toMaxNumOfPossesions + ")　"));
	var row6 = " ★Ｍ|";
	if(itemData.upgrade == null){
		row6 += "　　       ---装備更新不可---";
	} else {
		row6 += "開発:" + df2.format(upgradeResearch[0]|0)    + "/" + df2.format(upgradeResearch[1]|0)    + " 改修:" + df2.format(upgradeScrew[0]|0)    + "/" + df2.format(upgradeScrew[1]|0)    + " 消費:" + (upgradeScrew[1]    == "--  " ? "---" : upgradeConsumeName    + (upgradeConsumeNum    == "" ? "" : "*" + upgradeConsumeNum    + " (" + upgradeNumOfPossesions + ")　"));
	}
	return row1 + "\r\n" + row2 + "\r\n" + row3 + "\r\n" + row4 + "\r\n" + row5 + "\r\n" + row6 + "\r\n";
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
