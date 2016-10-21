//Ver:2.0.9++
//Author:Nishisonic

//script読み込み
load("script/utils.js");
load("script/ScriptData.js");
load("script/remodelItem.js");

//Import部分
Arrays             = Java.type("java.util.Arrays");
Calendar           = Java.type("java.util.Calendar");
IntStream          = Java.type("java.util.stream.IntStream");
ObjectArrayType    = Java.type("java.lang.Object[]");
TimeZone           = Java.type("java.util.TimeZone");
Event              = Java.type("org.eclipse.swt.widgets.Event");
FillLayout         = Java.type("org.eclipse.swt.layout.FillLayout");
Label              = Java.type("org.eclipse.swt.widgets.Label");
Listener           = Java.type("org.eclipse.swt.widgets.Listener");
Point              = Java.type("org.eclipse.swt.graphics.Point");
Shell              = Java.type("org.eclipse.swt.widgets.Shell");
SWT                = Java.type("org.eclipse.swt.SWT");
SWTResourceManager = Java.type("org.eclipse.wb.swt.SWTResourceManager");
TableItem          = Java.type("org.eclipse.swt.widgets.TableItem");
AppConstants       = Java.type("logbook.constants.AppConstants");
GlobalContext      = Java.type("logbook.data.context.GlobalContext");
Item               = Java.type("logbook.internal.Item");
ReportUtils        = Java.type("logbook.util.ReportUtils");
RGB                = Java.type("org.eclipse.swt.graphics.RGB");

data_prefix = "remodelItem_";
var remodelItemIndex = - 1;
		  
function begin(header) {
	IntStream.range(0,header.length).forEach(function(i){
		if (header[i].equals("二番艦")) {
			remodelItemIndex = i;
		}
	})
}

function getItemIconColor(iconid) {
	switch(iconid){
		case  1: return new RGB(255,204,204); //小口径主砲
		case  2: return new RGB(255,204,204); //中口径主砲
		case  3: return new RGB(255,204,204); //大口径主砲
		case  4: return new RGB(255,255,153); //副砲
		case  5: return new RGB(153,204,255); //魚雷
		case  6: return new RGB(204,255,204); //艦上戦闘機
		case  7: return new RGB(255,204,204); //艦上爆撃機
		case  8: return new RGB(153,204,255); //艦上攻撃機
		case  9: return new RGB(255,204,102); //艦上偵察機
		case 10: return new RGB(204,255,204); //水上機
		case 11: return new RGB(255,204,102); //電探
		case 12: return new RGB(204,255,204); //対空強化弾
		case 13: return new RGB(255,204,204); //対艦強化弾
		case 14: return new RGB(255,255,255); //応急修理要員
		case 15: return new RGB(204,255,204); //対空機銃
		case 16: return new RGB(204,255,204); //高角砲
		case 17: return new RGB(204,255,255); //爆雷
		case 18: return new RGB(204,255,255); //ソナー
		case 19: return new RGB(255,204,102); //機関部強化
		case 20: return new RGB(204,255,102); //上陸用舟艇
		case 21: return new RGB(204,255,204); //オートジャイロ
		case 22: return new RGB(204,255,255); //対潜哨戒機
		case 23: return new RGB(204,204,255); //追加装甲
		case 24: return new RGB(255,204,102); //探照灯
		case 25: return new RGB(238,238,238); //簡易輸送部材
		case 26: return new RGB(221,204,187); //艦艇修理施設
		case 27: return new RGB(255,204,102); //照明弾
		case 28: return new RGB(204,187,255); //司令部施設
		case 29: return new RGB(221,204,187); //航空要員
		case 30: return new RGB(154,205, 50); //高射装置
		case 31: return new RGB(247,129,129); //対地装備
		case 32: return new RGB(204,255,204); //水上艦要員
		case 33: return new RGB(204,255,204); //大型飛行艇
		case 34: return new RGB(255,255,255); //戦闘糧食
		case 35: return new RGB( 96,215,168); //補給物資
		case 36: return new RGB(204,255,102); //特型内火艇
		case 37: return new RGB(204,255,204); //陸上攻撃機
		case 38: return new RGB(204,255,204); //陸上攻撃機
		default: return new RGB(255,255,255); //例外
	}
}

var tip = null;
var label = null;

function create(table, data, index) {
	// 装備
	var items = data[0].get();
	
	var item = new TableItem(table, SWT.NONE);

	item.setData(items);

	item.setBackground(SWTResourceManager.getColor(getItemIconColor(items.info.type3)));
	
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
						label.setText (getRemodelItemData(_item.data.info.id));
						label.addListener (SWT.MouseExit, LabelListener);
						label.addListener (SWT.MouseDown, LabelListener);
						label.setBackground(SWTResourceManager.getColor(getItemIconColor(_item.data.info.type3)));
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

function isRemodelItem(itemId){
	var dayOfWeek = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo")).get(Calendar.DAY_OF_WEEK);
	return remodelItemData[String(word + itemId)] != null && remodelItemData[String(word + itemId)].helperShip[getDayOfWeek(dayOfWeek)] != NONE;
}

function getRemodelItemData(itemId){
	var result = "";
	var num = (function(id){
		switch(itemId){
			case 121: //94式高射装置
			case  46: //九三式水中聴音機
				return 2;
			default :
				return 1;
		}
	})(itemId);
	if(num > 1){
		Arrays.stream(Java.to(remodelItemData[String(word + itemId)].upgrade,ObjectArrayType)).forEach(function(data){
			result += _getRemodelItemData(data) + "\r\n";
		});
		result = result.substr(0, result.length - 2);
	} else {
		result += _getRemodelItemData(remodelItemData[String(word + itemId)]);
	}
	return result;
}

function prefix(num,digits){
	var s = String(num);
	if(digits - s.length() > 0){
		s = rept("0",digits - s.length()) + s;
	}
	return s;
}

function rept(str,cnt){
	var result = "";
	IntStream.range(0,cnt).forEach(function(i){
		result += str;
	});
	return result;
}

function _getRemodelItemData(itemData){
	var itemName;
	try {
		itemName = Item.get(itemData.ID).getName();
	} catch(e) {
		itemName = itemData.ID;
	}
	var upgradeToItemName = "";
	var upgradeToItemStar = 0;
	var sunday    = itemData.helperShip.SUNDAY != NONE;
	var monday    = itemData.helperShip.MONDAY != NONE;
	var tuesday   = itemData.helperShip.TUESDAY != NONE;
	var wednesday = itemData.helperShip.WEDNESDAY != NONE;
	var thursday  = itemData.helperShip.THURSDAY != NONE;
	var friday    = itemData.helperShip.FRIDAY != NONE;
	var saturday  = itemData.helperShip.SATURDAY != NONE;
	var dayOfWeek = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo")).get(Calendar.DAY_OF_WEEK);
	var helperShip = itemData.helperShip[getDayOfWeek(dayOfWeek)].join(SEP);
	var material = itemData.MATERIAL;
	var fuel    = prefix(material[0],3);
	var ammo    = prefix(material[1],3);
	var steel   = prefix(material[2],3);
	var bauxite = prefix(material[3],3);
	var star0to6Research = itemData.star0to6.RESEARCH;
	var star0to6Screw = itemData.star0to6.SCREW;
	var star0to6ConsumeName = "なし";
	var star0to6ConsumeNum = "";
	if(itemData.star0to6.consumes != null){
		try {
			star0to6ConsumeName = Item.get(itemData.star0to6.consumes.ID).getName();
		} catch(e) {
			star0to6ConsumeName = itemData.star0to6.consumes.ID;
		}
		star0to6ConsumeNum = itemData.star0to6.consumes.NUM;
	}
	var star6toMaxResearch = itemData.star6toMax.RESEARCH;
	var star6toMaxScrew = itemData.star6toMax.SCREW;
	var star6toMaxConsumeName = "なし";
	var star6toMaxConsumeNum = "";
	if(itemData.star6toMax.consumes != null){
		try {
			star6toMaxConsumeName = Item.get(itemData.star6toMax.consumes.ID).getName();
		} catch(e) {
			star6toMaxConsumeName = itemData.star6toMax.consumes.ID;
		}
		star6toMaxConsumeNum = itemData.star6toMax.consumes.NUM;
	}
	var upgradeResearch = [" --","-- "];
	var upgradeScrew    = [" --","--  "];
	var upgradeConsumeName = "なし";
	var upgradeConsumeNum = "";
	if(itemData.upgrade != null){
		upgradeResearch = itemData.upgrade.RESEARCH;
		upgradeScrew = itemData.upgrade.SCREW;
		if(itemData.upgrade.consumes != null){
			try {
				upgradeConsumeName = Item.get(itemData.upgrade.consumes.ID).getName();
			} catch(e) {
				upgradeConsumeName = itemData.upgrade.consumes.ID;
			}
			upgradeConsumeNum = itemData.upgrade.consumes.NUM;
		}
		try{
			upgradeToItemName = Item.get(itemData.upgrade.ID).getName();
		} catch(e) {
			upgradeToItemName = itemData.upgrade.ID;
		}
		upgradeToItemStar = itemData.upgrade.STAR;
	}
	var row1 = " " + itemName + "→" + upgradeToItemName + (upgradeToItemStar != "0" ? "★" + (upgradeToItemStar == 10 ? "max" : "+" + upgradeToItemStar) : "") + "　";
	var row2 = " 二番艦:" + helperShip + "　";
	var row3 = " 燃料:" + fuel + " 弾薬:" + ammo + " 鋼材:" + steel + " ボーキ:" + bauxite + "　";
	var row4 = " 初期|開発:" + prefix(star0to6Research[0],2)   + "/" + prefix(star0to6Research[1],2)   + " 改修:" + prefix(star0to6Screw[0],2)   + "/" + prefix(star0to6Screw[1],2)   + " 消費:" + (star0to6Screw[1]   == "--  " ? "---" : star0to6ConsumeName   + (star0to6ConsumeNum   == "" ? "" : "*") + star0to6ConsumeNum   + "　");
	var row5 = " ★６|開発:" + prefix(star6toMaxResearch[0],2) + "/" + prefix(star6toMaxResearch[1],2) + " 改修:" + prefix(star6toMaxScrew[0],2) + "/" + prefix(star6toMaxScrew[1],2) + " 消費:" + (star6toMaxScrew[1] == "--  " ? "---" : star6toMaxConsumeName + (star6toMaxConsumeNum == "" ? "" : "*") + star6toMaxConsumeNum + "　");
	var row6 = " ★Ｍ|開発:" + prefix(upgradeResearch[0],2)    + "/" + prefix(upgradeResearch[1],2)    + " 改修:" + prefix(upgradeScrew[0],2)    + "/" + prefix(upgradeScrew[1],2)    + " 消費:" + (upgradeScrew[1]    == "--  " ? "---" : upgradeConsumeName    + (upgradeConsumeNum    == "" ? "" : "*") + upgradeConsumeNum    + "　");
	return row1 + "\r\n" + row2 + "\r\n" + row3 + "\r\n" + row4 + "\r\n" + row5 + "\r\n" + row6 + "\r\n";
}

function getColumnIndex(pt,item){
	var columns = item.getParent().getColumnCount();
	return IntStream.range(0,columns).filter(function(index){
		var rect = item.getBounds(index);
		return pt.x >= rect.x && pt.x < rect.x + rect.width;
	}).findFirst().orElse(-1);
}