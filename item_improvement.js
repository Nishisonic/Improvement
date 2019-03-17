// Ver:3.0.1
// Author:Nishisonic

// script読み込み
load("script/utils.js")
load("script/ScriptData.js")

// import部分
IOUtils = Java.type("org.apache.commons.io.IOUtils")
BufferedReader = Java.type("java.io.BufferedReader")
InputStreamReader = Java.type("java.io.InputStreamReader")
HttpURLConnection = Java.type("java.net.HttpURLConnection")
StandardCharsets = Java.type("java.nio.charset.StandardCharsets")
Files = Java.type("java.nio.file.Files")
Paths = Java.type("java.nio.file.Paths")
StandardOpenOption = Java.type("java.nio.file.StandardOpenOption")
URI = Java.type("java.net.URI")
URL = Java.type("java.net.URL")
Calendar = Java.type("java.util.Calendar")
HashMap = Java.type("java.util.HashMap")
TimeZone = Java.type("java.util.TimeZone")
Collectors = Java.type("java.util.stream.Collectors")
HttpsURLConnection = Java.type("javax.net.ssl.HttpsURLConnection")
Ship = Java.type("logbook.internal.Ship")

data_prefix = "improvement_"

var VERSION = 3.01
var UPDATE_CHECK_URL = "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/update3.txt"
var FILE_URL_LIST = [
    "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/item_improvement.js",
    "https://raw.githubusercontent.com/Nishisonic/RemodelItem/master/itemstyle.js",
]
/** 保存場所 */
var EXECUTABLE_FILE_LIST = [
    "script/item_improvement.js",
    "script/itemstyle.js",
]

function header() {
    return ["二番艦"]
}

function begin() {
    if (!getData("items") || getData("items").size() === 0) {
        try {
            if (VERSION < Number(IOUtils.toString(URI.create(UPDATE_CHECK_URL), StandardCharsets.UTF_8))) {
                FILE_URL_LIST.forEach(function (file, i) {
                    IOUtils.write(IOUtils.toString(URI.create(file), StandardCharsets.UTF_8),
                        Files.newOutputStream(Paths.get(EXECUTABLE_FILE_LIST[i]),
                            StandardOpenOption.CREATE,
                            StandardOpenOption.TRUNCATE_EXISTING),
                        StandardCharsets.UTF_8)
                })
            }
        } catch (e) {}

        var url = new URL("https://raw.githubusercontent.com/TeamFleet/WhoCallsTheFleet-DB/master/db/items.nedb")
        var connection = HttpsURLConnection.class.cast(url.openConnection())
        connection.setRequestMethod("HEAD")
        connection.connect()
        if (connection.getResponseCode() === HttpURLConnection.HTTP_OK) {
            var reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"))
            var items = reader.lines().map(function (line) {
                return JSON.parse(line)
            }).filter(function (data) {
                return data.improvable
            }).collect(Collectors.groupingBy(function (data) {
                return data.id
            }))
            setTmpData("items", items)
        } else {
            setTmpData("items", new HashMap())
        }
    }
}

function body(data) {
    var dayOfWeek = Calendar.getInstance(TimeZone.getTimeZone("Asia/Tokyo")).get(Calendar.DAY_OF_WEEK)
    var items = getData("items")
    if (items.containsKey(data.info.id)) {
        var item = items.get(data.info.id)[0]
        var flatten = function (array) {
            return array.reduce(function (a, c) {
                return Array.isArray(c) ? a.concat(flatten(c)) : a.concat(c)
            }, [])
        }
        return toComparable([flatten(item.improvement.map(function (improvement) {
            return Array.prototype.concat.apply([], improvement.req.filter(function (data) {
                return data[0][dayOfWeek]
            }).map(function (data) {
                return data[1]
            }))
        })).map(function (id) {
            return id === false ? "任意二番艦" : Ship.get(id).fullName
        }).join(" / ")])
    }
    return toComparable([""])
}

function end() {}
