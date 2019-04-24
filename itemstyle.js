// Ver:3.0.3
// Author:Nishisonic

// script読み込み
load("script/utils.js")
load("script/ScriptData.js")

// import部分
Calendar = Java.type("java.util.Calendar")
TimeZone = Java.type("java.util.TimeZone")
IntStream = Java.type("java.util.stream.IntStream")
SWT = Java.type("org.eclipse.swt.SWT")
Font = Java.type("org.eclipse.swt.graphics.Font")
Point = Java.type("org.eclipse.swt.graphics.Point")
GridData = Java.type("org.eclipse.swt.layout.GridData")
GridLayout = Java.type("org.eclipse.swt.layout.GridLayout")
Composite = Java.type("org.eclipse.swt.widgets.Composite")
Label = Java.type("org.eclipse.swt.widgets.Label")
Listener = Java.type("org.eclipse.swt.widgets.Listener")
Shell = Java.type("org.eclipse.swt.widgets.Shell")
TableItem = Java.type("org.eclipse.swt.widgets.TableItem")
SWTResourceManager = Java.type("org.eclipse.wb.swt.SWTResourceManager")
AppConstants = Java.type("logbook.constants.AppConstants")
GlobalContext = Java.type("logbook.data.context.GlobalContext")
ReportUtils = Java.type("logbook.util.ReportUtils")
SwtUtils = Java.type("logbook.util.SwtUtils")
Item = Java.type("logbook.internal.Item")
Ship = Java.type("logbook.internal.Ship")

data_prefix = "improvement_"

var secondShipIndex = -1

function begin(header) {
    secondShipIndex = IntStream.range(0, header.length).filter(function (i) {
        return header[i].equals("二番艦")
    }).findFirst().orElse(-1)
}

var tip = null

function create(table, data, index) {
    // 装備
    var items = data[0].get()
    var item = new TableItem(table, SWT.NONE)
    item.setData(items)
    // 偶数行に背景色を付ける
    if ((index % 2) != 0) {
        item.setBackground(SWTResourceManager.getColor(AppConstants.ROW_BACKGROUND))
    }
    item.setText(ReportUtils.toStringArray(data))
    if (ReportUtils.toStringArray(data)[secondShipIndex].indexOf("次回") >= 0) {
        item.setForeground(secondShipIndex, SWTResourceManager.getColor(128, 128, 128))
    }

    var TableListener = new Listener({
        handleEvent: function (event) {
            switch (event.type) {
                case SWT.Dispose:
                case SWT.KeyDown:
                case SWT.MouseMove:
                    {
                        if (tip === null) break
                        tip.dispose()
                        tip = null
                        label = null
                        break
                    }
                case SWT.MouseHover:
                    {
                        var point = new Point(event.x, event.y)
                        var tableItem = table.getItem(point)
                        var itemList = getData("items")
                        if (tableItem !== null && getColumnIndex(point, tableItem) === secondShipIndex && itemList.get(tableItem.data.info.id)) {
                            var item = itemList.get(tableItem.data.info.id)[0]
                            if (!item.improvable) break

                            if (tip !== null && !tip.isDisposed()) tip.dispose()
                            tip = new Shell(table.getShell(), SWT.ON_TOP | SWT.TOOL)
                            tip.setLayout(SwtUtils.makeGridLayout(1, 0, 0, 5, 5))

                            item.improvement.forEach(function (data, index) {
                                if (index > 0) {
                                    var space = new Composite(tip, SWT.NULL)
                                    space.setLayoutData(new GridData(GridData.FILL_BOTH))
                                    space.setLayout(SwtUtils.makeGridLayout(1, 0, 0, 0, 3))
                                }

                                var itemNameComposite = new Composite(tip, SWT.NULL)
                                itemNameComposite.setLayoutData(new GridData(GridData.FILL_BOTH))
                                itemNameComposite.setLayout(SwtUtils.makeGridLayout(3, 0, 0, 0, 0))

                                var nameLabel = new Label(itemNameComposite, SWT.NONE)
                                nameLabel.setText(Item.get(tableItem.data.info.id).name)
                                nameLabel.setFont(SWTResourceManager.getFont("Meiryo UI", 11, SWT.NORMAL))
                                var upgrade = data.upgrade
                                if (upgrade) {
                                    var arrowLabel = new Label(itemNameComposite, SWT.NONE)
                                    arrowLabel.setText(" ▶ ")
                                    arrowLabel.setFont(SWTResourceManager.getFont("Meiryo UI", 11, SWT.NORMAL))
                                    var updateNameLabel = new Label(itemNameComposite, SWT.NONE)
                                    updateNameLabel.setText(Item.get(upgrade[0]).name)
                                    updateNameLabel.setFont(SWTResourceManager.getFont("Meiryo UI", 11, SWT.NORMAL))
                                }

                                var dayOfWeek = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo")).get(Calendar.DAY_OF_WEEK) - 1

                                var shipNamesComposite = new Composite(tip, SWT.NULL)
                                shipNamesComposite.setLayoutData(new GridData(GridData.FILL_BOTH))
                                shipNamesComposite.setLayout(SwtUtils.makeGridLayout(1, 0, 0, 0, 0))
                                var shipNames = new Label(shipNamesComposite, SWT.NONE)
                                shipNames.setText(flatten(Array.prototype.concat.apply([], data.req.filter(function (req) {
                                    return req[0][dayOfWeek]
                                }).map(function (req) {
                                    return req[1]
                                }))).map(function (id) {
                                    return id === false ? "任意二番艦" : Ship.get(id).fullName
                                }).join(" / "))
                                shipNames.setFont(SWTResourceManager.getFont("Meiryo UI", 9, SWT.NORMAL))

                                var nextShipNames = new Label(shipNamesComposite, SWT.NONE)
                                var nextDayOfWeek = Array.apply(null, new Array(7)).map(function (_, i) {
                                    return (i + dayOfWeek + 1) % 7
                                }).filter(function (d) {
                                    return data.req.some(function (req) {
                                        return req[0][d]
                                    })
                                })[0]
                                var dayOfWeekString = ["日", "月", "火", "水", "木", "金", "土"]
                                var nextDate = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo"))
                                nextDate.add(Calendar.DAY_OF_MONTH, (nextDayOfWeek - dayOfWeek))
                                nextShipNames.setText("次回(" + dayOfWeekString[nextDayOfWeek] + "):" + flatten(Array.prototype.concat.apply([], data.req.filter(function (req) {
                                    return req[0][nextDayOfWeek]
                                }).map(function (req) {
                                    return req[1]
                                }))).map(function (id) {
                                    return id === false ? "任意二番艦" : Ship.get(id).fullName
                                }).join(" / "))
                                nextShipNames.setFont(SWTResourceManager.getFont("Meiryo UI", 9, SWT.NORMAL))
                                nextShipNames.setForeground(SWTResourceManager.getColor(128, 128, 128))
                                shipNamesComposite.pack()

                                var resourceComposite = new Composite(tip, SWT.NULL)
                                resourceComposite.setLayoutData(new GridData(GridData.FILL_VERTICAL))
                                resourceComposite.setLayout(SwtUtils.makeGridLayout(11, 0, 0, 0, 0))
                                resourceComposite.setFont(SWTResourceManager.getFont("Meiryo UI", 8, SWT.NORMAL))
                                var materialTextLabel = new Label(resourceComposite, SWT.NONE)
                                materialTextLabel.setText("必要資材")
                                var materialLabel = new Label(resourceComposite, SWT.NONE)
                                var gridData = new GridData(GridData.FILL_BOTH)
                                gridData.horizontalSpan = 10
                                materialLabel.setLayoutData(gridData)
                                var materialNames = ["燃", "弾", "鋼", "ボ"]
                                materialLabel.setText(materialNames.map(function (text, i) {
                                    return text + ": " + data.resource[0][i] + "   "
                                }).join(""))

                                var texts = ["★+0 ~ ★+6", "★+6 ~ MAX", "更新"]
                                texts.forEach(function (text, i, array) {
                                    var title = new Label(resourceComposite, SWT.NONE)
                                    title.setText(text + "  ")
                                    title.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING))

                                    if (i === array.length - 1 && !data.upgrade) {
                                        var none = new Label(resourceComposite, SWT.NONE)
                                        none.setText("-")
                                        var gridData = new GridData(GridData.FILL_BOTH)
                                        gridData.horizontalSpan = 10
                                        none.setLayoutData(gridData)
                                    } else {
                                        var developmentTitle = new Label(resourceComposite, SWT.NONE)
                                        developmentTitle.setText("開発: ")
                                        developmentTitle.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING))
                                        var development = new Label(resourceComposite, SWT.NONE)
                                        development.setText(data.resource[i + 1][0])
                                        development.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_CENTER))
                                        var developmentSlash = new Label(resourceComposite, SWT.NONE)
                                        developmentSlash.setText(" / ")
                                        developmentSlash.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING))
                                        var development2 = new Label(resourceComposite, SWT.NONE)
                                        development2.setText(data.resource[i + 1][1])
                                        development2.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_CENTER))

                                        var improvementTitle = new Label(resourceComposite, SWT.NONE)
                                        improvementTitle.setText("  改修: ")
                                        improvementTitle.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING))
                                        var improvement = new Label(resourceComposite, SWT.NONE)
                                        improvement.setText(data.resource[i + 1][2])
                                        improvement.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_CENTER))
                                        var improvementSlash = new Label(resourceComposite, SWT.NONE)
                                        improvementSlash.setText(" / ")
                                        improvementSlash.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING))
                                        var improvement2 = new Label(resourceComposite, SWT.NONE)
                                        improvement2.setText(data.resource[i + 1][3])
                                        improvement2.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_CENTER))

                                        var itemLabelComposite = new Composite(resourceComposite, SWT.NULL)
                                        itemLabelComposite.setLayoutData(new GridData(GridData.FILL_BOTH))
                                        itemLabelComposite.setLayout(SwtUtils.makeGridLayout(1, 0, 0, 6, 0))
                                        var itemLabel = new Label(itemLabelComposite, SWT.NONE)
                                        itemLabel.setText(toResourceItem(data.resource[i + 1]).map(function (array) {
                                            if (isNaN(array[0])) {
                                                return array[0] + " x" + array[1]
                                            }
                                            return Item.get(array[0]).name + " x" + array[1]
                                        }).join("\n"))
                                        var possessionComposite = new Composite(resourceComposite, SWT.NULL)
                                        possessionComposite.setLayoutData(new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_BEGINNING))
                                        possessionComposite.setLayout(SwtUtils.makeGridLayout(1, 0, 0, 0, 0))
                                        var possessionLabel = new Label(possessionComposite, SWT.NONE)
                                        possessionLabel.setText(toResourceItem(data.resource[i + 1]).map(function (array) {
                                            if (isNaN(array[0])) {
                                                return ""
                                            }
                                            return "(所持: " + GlobalContext.getItemMap().values().stream().filter(function (item) {
                                                return item.slotitemId === array[0] && item.level === 0
                                            }).count() + " )"
                                        }).join("\n"))
                                    }
                                })
                            })

                            tip.pack()
                            var pt = table.toDisplay(event.x, event.y)
                            tip.setBounds(pt.x + 15, pt.y + 5, tip.size.x, tip.size.y)
                            tip.setVisible(true)
                        }
                    }
            }
        }
    })

    if (getData("set") == null) {
        table.setToolTipText("")
        table.addListener(SWT.Dispose, TableListener)
        table.addListener(SWT.KeyDown, TableListener)
        table.addListener(SWT.MouseMove, TableListener)
        table.addListener(SWT.MouseHover, TableListener)
        setTmpData("set", true)
    }

    return item
}

function end() {}

function getColumnIndex(pt, item) {
    var columns = item.getParent().getColumnCount()
    return IntStream.range(0, columns).filter(function (index) {
        var rect = item.getBounds(index)
        return pt.x >= rect.x && pt.x < rect.x + rect.width
    }).findFirst().orElse(-1)
}

function flatten(array) {
    return array.reduce(function (a, c) {
        return Array.isArray(c) ? a.concat(flatten(c)) : a.concat(c)
    }, [])
}

function toResourceItem(array) {
    if (array.length === 6) {
        if (array[4] !== null && array[4] > 0) {
            return [
                [array[4], array[5]]
            ]
        }
    } else if (array.length === 5) {
        return array[4].map(function (value) {
            if (value[0] === null || value[0] === 0) {
                return null
            } else if (String(value[0]).indexOf("consumable_") > -1) {
                return [toMasterItemString(Number(value[0].replace("consumable_", ""))), value[1]]
            }
            return [value[0], value[1]]
        }).filter(function (value) {
            return value !== null
        })
    }
    return []

    function toMasterItemString(id) {
        switch (id) {
            case 1:
                return "高速修復材"
            case 2:
                return "高速建造材"
            case 3:
                return "開発資材"
            case 4:
                return "改修資材"
            case 5:
                return ""
            case 6:
                return ""
            case 7:
                return ""
            case 8:
                return ""
            case 9:
                return ""
            case 10:
                return "家具箱（小）"
            case 11:
                return "家具箱（中）"
            case 12:
                return "家具箱（大）"
            case 13:
                return ""
            case 14:
                return ""
            case 15:
                return ""
            case 16:
                return ""
            case 17:
                return ""
            case 18:
                return ""
            case 19:
                return ""
            case 20:
                return ""
            case 21:
                return ""
            case 22:
                return ""
            case 23:
                return ""
            case 24:
                return ""
            case 25:
                return ""
            case 26:
                return ""
            case 27:
                return ""
            case 28:
                return ""
            case 29:
                return ""
            case 30:
                return ""
            case 31:
                return "燃料"
            case 32:
                return "弾薬"
            case 33:
                return "鋼材"
            case 34:
                return "ボーキサイト"
            case 35:
                return ""
            case 36:
                return ""
            case 37:
                return ""
            case 38:
                return ""
            case 39:
                return ""
            case 40:
                return ""
            case 41:
                return ""
            case 42:
                return ""
            case 43:
                return ""
            case 44:
                return "家具コイン"
            case 45:
                return ""
            case 46:
                return ""
            case 47:
                return ""
            case 48:
                return ""
            case 49:
                return "ドック開放キー"
            case 50:
                return "応急修理要員"
            case 51:
                return "応急修理女神"
            case 52:
                return "特注家具職人"
            case 53:
                return "母港拡張"
            case 54:
                return "給糧艦「間宮」"
            case 55:
                return "書類一式＆指輪"
            case 56:
                return "艦娘からのチョコ"
            case 57:
                return "勲章"
            case 58:
                return "改装設計図"
            case 59:
                return "給糧艦「伊良湖」"
            case 60:
                return "プレゼント箱"
            case 61:
                return "甲種勲章"
            case 62:
                return "菱餅"
            case 63:
                return "司令部要員"
            case 64:
                return "補強増設"
            case 65:
                return "試製甲板カタパルト"
            case 66:
                return "戦闘糧食"
            case 67:
                return "洋上補給"
            case 68:
                return "秋刀魚"
            case 69:
                return "秋刀魚の缶詰"
            case 70:
                return "熟練搭乗員"
            case 71:
                return "ネ式エンジン"
            case 72:
                return "お飾り材料"
            case 73:
                return "設営隊"
            case 74:
                return "新型航空機設計図"
            case 75:
                return "新型砲熕兵装資材"
            case 76:
                return "戦闘糧食(特別なおにぎり)"
            case 77:
                return "新型航空兵装資材"
            case 78:
                return "戦闘詳報"
            case 79:
                return "海峡章"
            case 80:
                return "Xmas Select Gift Box"
            case 81:
                return "捷号章"
            case 82:
                return "捷号章"
            case 83:
                return "捷号章"
            case 84:
                return "捷号章"
            case 85:
                return "お米"
            case 86:
                return "梅干"
            case 87:
                return "海苔"
            case 88:
                return "お茶"
            case 89:
                return "鳳翔さんの夕食券"
            default:
                return "不明"
        }
    }
}
