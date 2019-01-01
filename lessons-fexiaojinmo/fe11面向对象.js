var log = function() {
    console.log.apply(console,arguments);
}

var obj = function (u ,p) {
    var o = {
        user: u,
        pwd: p
    }
    return o
}
var o1 = obj(123, 456)
o1 // {user: 123, pwd: 456}
var o2 = obj('gua', 456)
o2 // {user: "gua", pwd: 456}

'123'.length // 3
['a','b','d','f','df','sd',1].length // 7
// 虽然它们都拥有共同的 length 方法， 但它们的 length 却是不同的，只有自己能访问到

// Student 是类名， 一般首字母大写
// 类看起来就是一个函数而已
// 模板 蓝图 设计图 定义了 该类是什么样子的
var Student = function(name, height) {
    this.name = name;
    this.height = height;
}

// 生成出一个对象的实例 需要 对类 调用 new; 语法规定的
var s1 = new Student('gua', 169)
log('class, s1', s1.name, s1.height)

var s2 = new Student
s2 // Student {name: undefined, height: undefined}
// 此时继承了 类 拥有的属性， 值还得 看自己
s2.name = 'gua1'
s2.height = 174
s2 // Student {name: "gua1", height: 174}

// 可以通过这样的方式，造 N 多个这样的实例


// prototype
// 可以给类增加一些方法 (函数)
// 给类定义方法(想想标准库中 String 类的 length)
// prototype 在这里是一个套路， 上课会解释
// js 是一个 原型链 继承的语言
// 对象的函数 叫 方法
Student.prototype.greeting = function() {
    console.log(`hello, I'm ${this.name}`);
}
s1 // Student {name: "gua", height: 169}
这里 s1 并没有一个 function；但却可以调用 它，如下
存在 s1 隐藏的 __proto__ 里面
s1.greeting() // hello, I'm gua

// 给类的 prototype 定义的方法(属性)，类的所有实例都能访问到
// prototype 属性的值，不仅可以是个 函数(函数时候，就叫方法了)，可以是任意变量，如下
Student.prototype.class =  3;
s1.class // 3
s2.class // 3
// 3班是这个类的共同属性
// 虽然没有给 s1 s2 指定 class 的属性，但访问class的时候，却能得到一个值；
存在 s1 s2 隐藏的 __proto__ 里
// js 语言，查找一个对象的属性，如果找不到这个属性，它就会去自己的 prototype(原型) 上找
s2.__proto__ // 显示如下 ，有些项还能展开
{greeting: ƒ, class: 3, constructor: ƒ} // 直接显示
class: 3   // 间接显示
greeting :ƒ ()
constructor: ƒ (name, height)
__proto__: Object

s2 // 运行结果 如下 有些项还能展开
Student {name: "gua1", height: 174}  // 直接显示
height: 174
name: "gua1"
__proto__: // 间接显示
class: 3
greeting: ƒ ()
constructor: ƒ (name, height)
__proto__: Object
// 除非你自己设置一个 s1.class = 1, 否则它就会去到自己的原型上找数据

// 定义的时候 greeting方法 存在于 类的 prototype 里
Student.prototype.greeting = function() {
    console.log(`hello, I'm ${this.name}`);
}
// 但在实例中， s1 s2等中，greeting方法 函数 却存在于 实例的隐藏的 __proto__ 中

Student.prototype.update = function(name, height) {
    this.name = name;
    this.height = height;
}
s1.update('xiao', 169.98) // 方法 用来更新 信息
s1 // Student {name: "xiao", height: 169.98}



// 第二部分
// 给 内置的类 扩展方法
String.prototype.gua = function() {
    log('gua')
}
'123'.gua() // 'gau'
// 这个扩展是动态地 ，程序运行期间一直存在，除非给它移除
String.prototype.gua = undefined;
'123'.gua() // 报错，相当于一开始 什么也没定义 一样
'123'.adfd() // 报错

var a = 'abc'
a.length  // 3
a.length = 2
a.length // 3
// 因为 length 是方法 (函数),因此 得到的length 是与 量有关的，并且这个值被保护起来了

s1.greeting()
// hello, I'm xiao
s1.greeting() = 'hh'
// hello, I'm xiao 且报错 因为是函数, 这个值被保护起来了，改不动

// 但 name height class 什么的都可以更改 ，因为它们是属性，在原型里并没有包在函数里面



// 面向对象 oop 面向对象编程 优势 3 点

// 封装
// 多态
// 继承

// 主要是讲 封装
// 上面 greeting 和 updata 就是封装的例子
// 意思是说把一些操作做好， 对外部来说只需要 简单调用 即可
// 其实就是自己写函数 把复杂的过程 用函数 包装起来，别人只要拿到接口 API


// 类 主要的优势就是  可批量制造 object 和 可封装的方法， s1 s2 等直接调用 而不用再写其他函数
// this 比较复杂，
// if 的时候的类型， 不能用隐式， if(a) 这样是不行的， 必须明确

s1.greeting // 调用结果如下
function() {
    console.log(`hello, I'm ${this.name}`)
}
// this 代表谁一开始并不知道 只有在最终运行的时候 才知道 ---------------------------
s1.greeting() // 调用结果
// hello, I'm gua


var a = s1.greeting
a() // 调用结果
// hello, I'm  并没有name 失败
// 因为 this 是一个在运行时，才被确定
// this 代表调用这个函数的 . 前面的东西；也就是 s1.greeting()  .前面的 s1

var obj = function (u ,p) {
    var o = {
        user: u,
        pwd: p
    }
    return o
}
var o1 = obj(123, 456)
o1 // {user: 123, pwd: 456}
o1.name = 'guagua'
o1.hello = a; // 调用结果如下
ƒ () {
    console.log(`hello, I'm ${this.name}`);
}
o1.hello() // 调用结果如下
// hello, I'm guagua 成功了，因为 this 终于找到了一个对象 在函数的 .前面的 o1

// 很容易迷惑，其他语言都是写的时候就知道了 this 代表谁，而 JavaScript 是运行的时候才知道-------------------
// 因此 this 是个坑，容易出bug, 会造成很多问题

// this 只在函数内部生效，并且只对调用它的那个人生效
a // 调用结果如下
ƒ () {
    console.log(`hello, I'm ${this.name}`);
}
a()
// hello, I'm
var b = function() {
    log(this)
}
b() // 调用结果
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// b 的 this 是 window, 在 js 里所有前面没有 · 的东西
// 所有东西如果没有归属的话，那都属于 window
// 这里 window.b 就是 b
window.b // 调用结果
ƒ () {
    log(this)
}
b // 调用结果
ƒ () {
    log(this)
}
// 如果指定
window.name = 'gua';
// 那么
a() // 调用结果
// hello, I'm gua

// 相当于
window.a() // 调用结果
// hello, I'm gua   因为 this 终于找到了一个对象 在函数的 .前面的 window

// window 是最顶层的东西 我们所说的全局变量 实际上只是 window 的属性而已
c = 1
// 实际上定义的是
window.c = 1

var d = 12
d // 12
window.d  // 12
// 最外层的东西不管 var 不 var ，都在windowZ下面，因为它不是一个局部变量
// 但好像 var 了之后的不能销毁，没var 的可以销毁
// 在用var 声明变量时，JS解析器会默认把configurable设为false，所以它不能改名字，不能被删掉


var Student = function(name, height) {
    this.name = name;
    this.height = height;
}

Student.prototype.greeting = function() {
    log('hello from' + this.name)
}
// 两者的区别
// 在 function 设置属性值(普通值)；prototype 里设置方法(函数)

// 也能在 模板 里直接定义一个函数
var Student = function(name, height) {
    this.name = name;
    this.height = height;
    this.greeting = function() {
        log('hello from' + this.name)
    }
}

var s1 = new Student();
s1.greeting() // hello fromundefined
// 我们的确可以在 模板 里定义函数，不一定要在 prototype 里
// 因为 类 的任何一个属性，它是一个值 比如 name,还是一个函数 比如 greeting,是无所谓的

// 在 模板 里直接定义函数的缺陷
// 假如有 Student 的 N 多个 实例，那么这 N 多个 实例都会有 该函数f(),会多占内存
s1 // 运行结果
Student {name: undefined, height: undefined, greeting: ƒ}  函数会出现在每一个实例中

// 在 prototype 里定义函数 每个人用的 都是 prototype 的一个函数，就不会多占内存
var Student = function(name, height) {
    this.name = name;
    this.height = height;
}
Student.prototype.greeting = function() {
    log('hello from' + this.name)
}

var s1 = new Student();
s1.greeting() // hello fromundefined
s1 // 运行结果
Student {name: undefined, height: undefined}  函数没有直接出现在实例中，而是隐藏在 __proto__ 里面
height: undefined
name: undefined
__proto__:
greeting: ƒ ()
constructor: ƒ (name, height)
__proto__: Object

// 因此建议 通过函数(模板对象) 声明属性；方法 通过 prototype 来写
// 我们的确也可以在 prototype 里添加 属性 ，但不建议这样做；
// 因为在 prototype 添加属性，不会像在模板里定义那样直接显示(如 name height)调用即显示，而是隐藏在 __proto__ 里
Student.prototype.weight = this.weight
s1 // 运行结果
Student {name: undefined, height: undefined}
height: undefined
name: undefined
__proto__:  // 不直接显示  隐藏
 greeting: ƒ ()
weight: undefined              // 能在 s1 隐藏的 __proto__ 里 找到 weight 属性
constructor: ƒ (name, height)
__proto__: Object


// 函数的变量并不重要，因此无论给变量起什么名字，函数的结果是不会变的，变量只是用来传递数据的，重要的是输入的数据
// 除了函数自带的变量； event arguments 这种


// 用 new 函数名(参数)  初始化一个 类 的实例
// 赋值给s1， var s1 = new Student('gua', 174)
// 这时候 s1  引用  的是一个 Student 类型 (也就是对象 Student)；
// 实例 也称之为 对象


// 给实例设置属性不会影响模板， 通过模板创建出来的东西，继承了模板的属性和方法，但是却 可以继续扩展，如下
// s1.age = 24 给 实例 s2 加一个 age 属性； 这属于 js 提供给 我们的功能
