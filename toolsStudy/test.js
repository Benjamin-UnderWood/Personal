var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

// 最小化使用全局变量的方法之一是为你的应用只创建一个唯一的全局变量
var MYAPP = {};
// 该变量此时变成了你的应用的容器：
MYAPP.stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"   
}
MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }    
}


// 借用构造函数继承 call
function SuperType(name) {
    this.name = name;
}

function SubType(name, age) {
    // 继承
    SuperType.call(this, name);
    // 实例属性
    this.age = age;
}

var instance = new SubType('Gecan', 24);
instance.name // "Gecan"
instance.age  // 24



// 组合继承 call + prototype 
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
}

// 继承属性
function SubType(name, age){
    // 继承属性(继承的)
    SuperType.call(this.name);        // 第一次调用父构造函数
    // 实例属性(自己的)
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();       // 第二次调用父构造函数
SubType.prototype.constructor = SubType;   // 修正

// 自己方法
SubType.prototype.sayAge = function() {
    alert(this.age);
}

var instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
alert(instance1.color);     // red blue green
instance1.sayName();        // Nicholas
instance1.sayAge();         // 29

var instance2 = new SubType('Greg', 2);
alert(instance2.colors);    // red blue green black (不受instance1操作的影响)
instance2.sayName();        // Greg
instance2.sayAge();         // 27
   

// 原型式继承
function object(o) {
    function F(){};
    F.prototype = o;
    return new F();
}


// 解耦应用逻辑 / 事件处理程序
function handleKeyPress(event) {
    event = EventUtil.getEvent(event);
    if(event.keyCode = 13) { // Enter
        var target = EventUtil.getTarget(event);
        var value = 5 * parseInt(target.value);
        if (value > 10) {
            document.getElementById('error-msg').style.display = 'block';
        }
    }
}

// >>>> 数据层;应用逻辑，不依赖任何事件处理程序逻辑
function validateValue(value) {
    var value = 5 * parseInt(value);
    if (value > 10) {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function handleKeyPress(event) {
    event = EventUtil.getEvent(event);
    if(event.keyCode == 13) {
        var target = EventUtil.getTarget(event);
        validateValue(target.value);
    }
}



// 命名空间
// 创建全局对象
var Wrox = {};

// 为 Professional JavaScript 创建命名空间
Wrox.ProJS = {};

// 将书中用到的对象附加上去
Wrox.ProJS.EventUtil = {}; // code
Wrox.ProJS.CookieUtil = {} // code


// 字符常量
function validateValue(value) {
    if (!value) {
        alert('Invalid value');
        location.href = '/errors/invalid.php';
    }
}

// >>>>>>
var Constants = {
    INVALID_VALUE_MSG:'Invalid value',
    INVALID_VALUE_URL:'/erros/invalid.php'
}

function validate(value) {
    if (!value) {
        alert(Constants.INVALID_VALUE_MSG);
        location.href = Constants.INVALID_VALUE_URL;
    }
}

// map
var s = [1, 2, 3, 4]
var m = s.map(function(item, idx, array){
    return item * 2;
})
m // [ 2, 4, 6, 8 ]


// filter
var nums = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1]

var filterResult = nums.filter(function(item, index, array){
    return (item > 2);
})

console.log(filterResult) //  [ 3, 4, 5, 5, 4, 3 ]


// Set 集合
var s = new Set();
s.add(1);
s.add(2);
// Set [ 1, 2 ]


var book = {
    "title": "Professional JavaScript",
    "authors": [
    "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
    };
    var jsonText = JSON.stringify(book);
    var bookCopy = JSON.parse(jsonText, function(key, value){
    if (key == "releaseDate"){
    return new Date(value);
    } else {
    return value;
    }
});
alert(bookCopy.releaseDate.getFullYear());


// 数组 concat
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
// c 变成 ['a', 'b', 'c', 'x', 'y', 'z', true];

// 变量私有
function Person(firstName, lastName, age)
{
    // 私有变量
    var _firstName = firstName;
    var _lastName = lastName;

    // 公共变量
    this.age = age;

    // 方法
    this.getName = function() {
        return(firstName + '' + lastName);
    };
    this.sayHello = function() {
        return (`Hello, I'm${firstName} ${lastName}`);
    }
}

// 变量私有 this 法








