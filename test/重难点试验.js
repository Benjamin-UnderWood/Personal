// 绑定 this

function add(){
    return (this.x + this.y);
};

var x = 20, y = 30;

add(); // 50

var obj = {
    x: 2,
    y: 3
};

var newAdd = add.bind(obj);

newAdd(); // 5

add.call(obj); // 5

add.apply(obj); // 5

// bind 与 回调函数 结合使用
setTimeout(add.bind(obj), 1000);  // 运行没有结果????????????????????????????????????????

// 在setTimeout中你是拿不到返回值的，你可以用Promise来wrap一下

// 改成这样
function add(){
    console.log(this.x + this.y);
};

var obj = {
    x: 2,
    y: 3
};

setTimeout(add.bind(obj), 1000);  // 运行结果 5

// bind 与 回调函数 结合使用

function foo(){
    console.log(this.a);
}

var obj = {
    a: 2
}

setTimeout(foo.bind(obj), 1000); // 2

// 传递参数

function add2(x, y){
    return x + y;
}

add2(1, 1); // 2

var newAdd2 = function(){
    return add2.apply(this, arguments);
}

newAdd2(2, 4); // 6

var newAdd3 = function(a, b){
    return add2.call(this, a, b);
}

newAdd3(5, 10); // 15


var newAdd33 = function(){
    return add2.call(this, ...arguments); // ...用来传参数; 解开数组成参数并传递给函数;
}

newAdd33(8, 9); // 17


var newAdd4 = add2.bind(this, 100);
newAdd4(200); // 300


// 归并 reduce(对数组有效)； ...args 为真数组 !!!!!!!!!!!!!!!!!!!!!!!!
let add = (...args) => args.reduce((a, b) => a + b);
console.log(add(1, 2, 3, 4)); // 10
console.log(add.length); // 0; ...args 不计入 function.length;

// 方法二 将类数组 arguments 转为真数组再进行归并操作
// let add = (arguments) => Array.from(arguments).reduce((a, b) => a + b); 这样写读不出数组来

function add(){
    // let args = [].slice.call(arguments); // 将类数组转为真数组的原始方法
    let args = Array.from(arguments);

    return args.reduce((a, b) => a + b);
}

console.log(add(10, 20, 30, 40)); // 100


// 闭包; 回调函数

for(var i=0; i<5; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i) // 1000 * i 非异步
    console.log(i); 
}

// 分别输出主线程 0 1 2 3 4 ；再输出异步任务 5 5 5 5 5；与预期不符

// 闭包 使得回调函数 具有访问其外部环境的能力 (访问到 var j = i)
for(var i=0; i<5; i++) {
    (function(){
        var j = i;
        setTimeout(function(){
            console.log(j);
        }, 1000 * j) 
    })()
    console.log(i); 
}

// 分别输出主线程 0 1 2 3 4 ；再输出异步任务 0 1 2 3 4；与预期相符

// 改进 依赖注入
for(var i=0; i<5; i++) {
    (function(j){
        setTimeout(function(){
            console.log(j);
        }, 1000 * j) 
    })(i)
    console.log(i); 
}

// 分别输出主线程 0 1 2 3 4 ；再输出异步任务 0 1 2 3 4；与预期相符

// let 块级作用域
for(var i=0; i<5; i++) {
    let j = i;
    setTimeout(function(){
        console.log(j);
    }, 1000 * j);
    console.log(i); 
}

// 分别输出主线程 0 1 2 3 4 ；再输出异步任务 0 1 2 3 4；与预期相符

// 改进 for 循环 let；每个迭代重新定义i，且以上一次定义的值来初始化i
for(let i=0; i<5; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i);
    console.log(i); 
}

// 分别输出主线程 0 1 2 3 4 ；再输出异步任务 0 1 2 3 4；与预期相符


// setTimeout 返回值的问题
setTimeout(function(){
    return 1;
}, 1000)

//运行无结果 在setTimeout中你是拿不到返回值的(可以用Promise来wrap一下)

setTimeout(function(){
    console.log(1);
}, 1000)

// 运行结果 1

// 匿名函数 this that
var b = 33;

var obj = {
    a: function(){
        setTimeout(function(){
            console.log(this.b) // 匿名函数 this 指向 window
        }, 1000)
    },
    b: 10
}

obj.a() // 33

// 改进
var b = 33;

var obj = {
    a: function(){
        var that = this;
        setTimeout(function(){
            console.log(that.b) // 查找 that 变量
        }, 1000)
    },
    b: 10
}

obj.a() // 10

// 利用bind
var b = 33;

var obj = {
    a: function(){
        setTimeout(function(){
            console.log(this.b) // 匿名函数 this 指向 window
        }.bind(obj), 1000)
    },
    b: 10
}

obj.a() // 10


// bind 绑定 和 传参 功能
var a = 10;

var obj = {
    a: 33
}

function add(x, y){
    console.log(this.a, x + y);
}

// 例子一
var add1 = add.bind(obj, 1, 2); // 将函数绑定到 obj，手动传入参数 1， 2
add1(); // 33 3

// 例子二
var b = [1, 2];
add.apply(obj, b); // 33 3; 绑定this 和 传入参数 都很灵活；

add.call(obj, ...b); // 33 3; ES6 rest ... 展开数组

// 例子三
var newAdd = function(){
    // return add.apply(obj, arguments);
    return add.call(obj, ...arguments); 
}

newAdd(1, 2); // 33 3


// 看看rest ...; 用 ... 语法可以实现可变长度的参数，多余的参数会被放进 args 数组中
var foo = function(a, ...args) {
    console.log(a, args.length);
}

foo(1, 2, 3, 4); // 1 3