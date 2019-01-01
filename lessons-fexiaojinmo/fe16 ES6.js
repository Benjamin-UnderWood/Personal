ES6 新东西

let
const
模板字符串
Set 类型(集合)  学习Python
Map 类型
...
类似 Python 的解包
函数默认参数
可变参数
箭头函数
新增函数
--------------------------------------------------------------------------------
let
let 就是限制作用域在 {} 内的 var; 消除了 变量污染 的问题; 块级作用域
for (let i = 0; i < 3; i++) {
    console.log(i) // 可以访问 分别是 0  1 2
}

console.log(i) // 不可以访问
// undefined

for (var i = 0; i < 3; i++) {
    console.log(i);
}
console.log(i); // 可以访问; var 是函数级作用域

if(true) {
    var a = 1;
    console.log(a);
}
console.log(a);
// 输出 1 1

if(true) {
    let a = 1;
    console.log(a); // 可以访问
}
console.log(a); // a is not defined


--------------------------------------------------------------------------------
const (常量)
const 用来声明一个不可赋值的变量；只能引用，不能改变；把一些重要的东西，写死，不让改
变量的值只能在声明的时候赋予
const 变量也可以是函数；变量只是对值取了一个名字而已，函数也是值；在js中函数是一个对象

const a = 1;
a = 2; // 错误
// Assignment to constant variable.

const a;
a = 1; // 错误 赋值只能在声明时
// Missing initializer in const declaration 语法错误


const arr = [1,2]; -------------------------------------------------------------
arr.push(3)
arr
// [1, 2, 3]
不能改变对 arr 的引用，但是可以对它进行操作
arr 不能被赋值，这个变量arr 指向 [1,2]这个数组，这一关系不能被改变
变量名 arr 不能被改；但是变量名指向的东西及这个数组，可以被改(增 添等操作);

const name = 'gua';
const v = 100;
像这种指向的是 字符串、 数字，本身就是一个常量，那就不能被更改了

--------------------------------------------------------------------------------
Set
Set 在其他语言里面称为集合
是一种和 Array 相似的数据结构
不同之处在于，Set 中的元素都是不重复的
用法如下

var s = new Set();

add 方法添加元素，和 push 一样
s.add(1);
s.add(2);
// Set(2) {1, 2}

has 方法检查元素是否在 set 中; 类似于 数组的 includes
s.has(1) // true
s.has(3) // false

size 属性相当于 length
s.size //2

delete 方法删除一个元素
var s = new Set(); // new 是一个操作符；生产一个新的对象；集合必须这样创建
s.add(1);
s.add(2);

s.delete(1) // true ；表明删除成功
s // Set(1) {2}

相比于数组的 delete ; 删完但是 留有 empty 占位置
var arr = [3, 5, 6];
delete arr[1];
arr; // (3) [3, empty, 6]

相比于数组的 splice ;增删元素的方法; 类似
var nums = [0, 9, 8];
nums.splice(1, 1);
nums;// (2) [0, 8]

var m = new Set([1, 2, 3, 4, 5]) // 类数组 加中括号
m // Set(5) {1, 2, 3, 4, 5}

var n = new Set([1, 2, 3, 4, 5, 1, 2, 3, 4])
n // Set(5) {1, 2, 3, 4, 5}
集合中的元素都是不重复的

Set Date XML HTTP Request  内置的类

Set 目前还没实现的方法，交集，并集，差集，自己可以去实现
Set 类型的主要作用是去重，我们作业中做过的 union 等函数都是 set 的标配函数

--------------------------------------------------------------------------------
Map
Map 和 Object 很相似
在其他语言中 通常会有 dict 和 object 两种数据结构; 哈希表 Java，字典 pathyon
现在 js 也有独立的 dict 那就是 Map

用法如下
var m = new Map()

set 方法增加一个值
m.set('name', 'gua')

get 属性得到一个值
m.get('name')

类似 object 中
let o = {};
o.name = 'gua';
o.name

let mm = new Map()
mm.set('gua', function(){/*do something*/});
// Map(1) {"gua" => ƒ}
m.get('gua');
m.get('gau')();

其他语言字典调用函数的时候，要把字典传给函数，js是默认传的；所以js中字典和对象没什么区别

--------------------------------------------------------------------------------
... 叫扩展符号,作用是 把数组解开成单独的元素;  其他语言也有这样的方法
var a1 = [1, 2, 3]
var a2 = [...a1, 4]
a2 // 结果是 [1, 2, 3, 4]

var a3 = [...a1]
a3 // 结果是 [1, 2, 3]

... 可以用来传参数!!!!!!!!!!!!
var a1 = [1, 2, 3]
console.log(...a1)
// 结果是 1 2 3
相当于 console.log(1, 2, 3) // 1 2 3 解开数组成参数并传递给函数
类似于 console.log.apply(null, a1) // console.log.apply(window, a1); apply 传数组


看个例子-------------------------------------------------------------------------
function foo(sth) {
    console.log(this.a, sth);
}

var obj = {a: 10};

var args = [3]

foo.apply(obj, args) // 10 3
// obj 传入 this (向 foo 函数中)
// args 传入 参数 (向 foo 函数中)

假如我要传想手动传入参数呢？
function foo(sth) {
    console.log(this.a, sth);
}

var obj = {a: 10};

// 增加一个新函数，能手动传入参数；
var bar = function() {
    return foo.apply(obj, arguments);
    // arguments 为函数自带的参数;
    // obj 沿着 作用域链 一层一层，从内往外找，最终在 window 找到
}

bar(3)// 10 3

把 obj 放入函数；----------------------------------------------------------------
function foo(sth) {
    console.log(this.a, sth);
}

var bar = function() {
    var obj = {a: 10};
    return foo.apply(obj, arguments);
    // arguments 为函数自带的参数;
    // obj 沿着作用域链，在自身函数内就找到了
}

bar(3)// 10 3
--------------------------------------------------------------------------------
解包
解包是其他语言(Python) 中学过来的特性， 见下方例子
var [a, b] = [1, 2]
a b 分别被赋值为 1 2

相当于下面的老代码
var arr = [1, 2]
var a = arr[0]
var b = arr[1]
使用这个语法可以一行代码给多个变量赋值
所以也就可以一行代码交换变量值
[a, b] = [b, a]
用法如下
var [a, b] = [1, 2]// a 1 b 2
[a, b] = [b, a]// a 2 b 1

var [a, b, ...c] = [1, 2, 3, 4]
a// 1
b// 2
c// [3,4]
--------------------------------------------------------------------------------
函数默认参数
函数默认参数我们之前已经直接用过了， 不再讲

可变参数
用 ... 语法可以实现可变长度的参数，多余的参数会被放进 args 数组中--------------------
args 是任意的变量名

var foo = function(a, ...args) {
    console.log(a, args.length);
}

foo(1, 2, 3, 4); // 运行结果 1 3

--------------------------------------------------------------------------------
箭头函数
箭头函数就是匿名函数定义的简化版， 宣称能使得代码更简洁
箭头函数的 this 值是绑定了的 (解决了 this 绑定的问题) -----------------------------
箭头函数没有 arguments 对象
如果要多参数，必须用 ...

语法如下
(参数1， 参数2) => { 语句 }
(参数1， 参数2) => 语句 ;如果只有一句语句，可以省略花括号
上面两行相当于下面这函数
function(参数1， 参数2) {
    return 语句
}

如果只有一个参数，圆括号可省略
// (参数1) => { 语句 }
//  参数1  => { 语句 }

如果没有参数，必须使用圆括号
() => { 语句 }

例子
var a1 = [1, 2, 3]
// 下面两个等价
var a2 = a1.map(function(n) {
    return n * n;
}) // 运行结果 [1, 4, 9]

var a3 = a1.map( n => n * n)
// 运行结果 [1, 4, 9]

说明
n => n * n  箭头函数
两者功能等价
function(n) {
    return n * n;
}


// jQuery 数组的函数默认有 map 这个函数； Python 有map

--------------------------------------------------------------------------------
新增函数
新增函数 例如 includes (我们已经在用了)
