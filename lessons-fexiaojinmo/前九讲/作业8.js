// 考虑 a 与 b 是否相等
var a = [1,2,"3"]
var b = [1,2,"3"]
a == b // 运行结果 false
String(a) == String(b) // 运行结果 true
String(a) // 运行结果 "1,2,3"  不能区别 3 是字符串 还是数值
JSON.stringify(a) // 运行结果 "[1,2,"3"]"
JSON.stringify(b) // 运行结果 "[1,2,"3"]"
// 这种方式把类型也保存下来了
// 用于增强版的 ensure 测试函数

// 作业7
// 个人解法
var formated_weekday = function(day) {
    // day 是代表星期的数字，从周一开始分别是 1 2 3 4 5 6 7
    // 返回 '星期一' '星期二' 这样的描述字符串
    var result = '';
    var weekdayLookup = {
        1:"星期一",
        2:"星期二",
        3:"星期三",
        4:"星期四",
        5:"星期五",
        6:"星期六",
        7:"星期日",
        '':"undefined"
    }
    result = weekdayLookup[day];
    return result;
}

// 萧解法
var formated_weekday = function(day) {
    var weekdayMap = {
        '1':"星期一",
        '2':"星期二",
        '3':"星期三",
        '4':"星期四",
        '5':"星期五",
        '6':"星期六",
        '7':"星期日",
        '':"undefined"
    }
    var key = String(day);
    return weekdayMap[key]; // 这种方式叫 打表；表驱动法
}

// 作业8
// 个人解法
var discount = function(price, grade) {
    // price 是一个 int
    // grade 合法情况一共 6 种取值，还可能没给出这个参数
    //     '小学生'
    //     '初中生'
    //     '高中生'
    //     '大学生'
    //     '研究生'
    // 对应的折扣分别是 5 6 7 8 9
    // 没有给出 grade 参数，则没有折扣
    // 请返回 折扣后的价格
    var priceMap = {
        '小学生': 0.5,
        '初中生': 0.6,
        '高中生': 0.7,
        '大学生': 0.8,
        '研究生': 0.9,
        '': 1
    }
    var discount = priceMap[grade];
    return price * discount;
}

// 萧解法
var discount = function(price, grade) {
    // 枚举对象中的所有 key, 用 for in 可以 for(value in key)
    var grades = [
        '小学生',
        '初中生',
        '高中生',
        '大学生',
        '研究生'
    ]
    var priceMap = {
        '小学生': 0.5,
        '初中生': 0.6,
        '高中生': 0.7,
        '大学生': 0.8,
        '研究生': 0.9
    }
    if (grades.includes(grade)) {
        return price * priceMap[grade];
    } else {
        return price;
    }
}

// 解法三
function valueForKey(object, key, defaultValue) {
    var value = object[key];
    // 输入 对象中没有的 key 结果会得到 undefined
    // a = {foo:1} 对象
    // a['bar'] 运行结果 undefined
    if (value === undefined) {
        value = defaultValue;
    }
    return value;
}
var discount = function(price, grade) {
    var priceMap = {
        '小学生': 0.5,
        '初中生': 0.6,
        '高中生': 0.7,
        '大学生': 0.8,
        '研究生': 0.9
    }
    var discount = valueForKey(priceMap, grade, 1);
    return price * discount;
}
