JavaScript 允许给语言的基本类型扩充功能。

在第三章中，我们已经看到，通过给 Object.prototype 添加方法，可以让该方法对所有对象都可用

这样的的方式对 函数(对象) 、数组(对象)、字符串(对象)、数字(对象)、正则表达式和布尔值同样适用

举例来说，我们可以通过给 Function.ptototype 增加方法来使得该方法对所有函数可用：

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    // 这里的 键值对 不能使用点语法; 因为 name 是一个字符串！！！！
    // 回忆一下， 键值对的两种表示方法 key.value(简便表示); key['value'](其实这才是强大的)
    // 数组也是对象 array[1] 其实是 array['1']
    return this; // 好像不 return this 也行 ？？？？？？
}

通过给 Function.prototype 增加一个 method 方法，我们下次给(函数)对象增加方法的时候就
不必键入 prototype 这几个字符，省了一点麻烦

理解一下上述代码干的事情

首先，function Function 是一个函数(对象)的构造器函数，所有函数的原型 __prtoto__ 都是
Function.prototype;
因此在 Function.prototype 上定义的方法 method，所有 函数(对象) 都能访问到这个方法(拥有这个方法)；

// 举个例子
function foo(){} // 任意构建的函数
foo.__proto__ === Function.prototype // 任意构建的函数的原型都是 Function.prototype
// 运行结果 true

// 上面代码，相当于 foo = new Function(); foo 即为 Function 构造器函数的 一个实例

同理，我们的函数(对象) Object、 Number 等，也是 Function 构造器的实例，
它们的 __proto__ 原型也是 Function.prototype, 因而也能访问到原型对象上增加的方法(函数)

应用上面的 Function.prototype 的方法 method 做点事情
需求
JavaScript 没有专门的整数类型，但有时候确实只需要提取数字中的整数部分(JavaScript本身提供的
方法不好)
因此我们可以通过给 Numeber.prototype 增加一个 integer 方法来改善它。它会根据数字的正负
来判断是使用 Math.ceiling 还是 Math.floor

Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
})


// 内部实现过程
将 'integer' 与 function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
} 这两个参数传入到 method 方法(函数 function(name, func){
    this.prototype[name] = func;
    return this;
})里

得到如下结果; method里的 this 被绑定到 Function 构造器函数 的实例上 ，这里是 Number
    ...
    Number.prototype['integer'] = function() {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
    }
    return Number
    ...
    这两行相当于给 Numer.prototype 增加了一个方法后，又返回了 Number

--------------------------------------------------------------------------------
    (因为 number(数字，Number 实例) 与 Number.prototype 的连接(继承)关系，是通过 new操作符建立的
var num = new Number()) // 基本包装类型
    因此在这里，我们要 return 改变了 原型之后的 Number！！！！！！！！！！！！！！！！

    // 这里其实涉及到了 旧构造器 Number 旧Number.prototype 与 新构造器 Number 新Number.prototype
    // 如果不 return Number 的话，我们通过 new 旧构造器 Number 来创建实例的话， 实例还是
    // 连接到 原有的 旧Number.prototype 上
    // 造成这个问题的原因是， this.prototype[number] = func 定义在了函数里面而不是外面
    // prototype 是构造函数带有的一个属性 ！！！！！！！！！！！！！！！！！！！！！！
    // 因此返回 Number 也会得到修改后的 Number.prototype
--------------------------------------------------------------------------------
上面框中的话，有待验证准确性 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

也就是给 Numer 的原型对象上增加了一个方法 integer, Number 的实例(数字)都拥有这个方法
当这个方法数字调用时， this 被绑定到该对象(数字)

console.log((-10 / 3).integer()) // Math['ceil'](-10 / 3);写成这样就明白了 Math.ceil(-10 / 3)
// 运行结果 -3


// 检验一下 1
// 删除掉 return this
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    // return this;
}

Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
})

console.log((-10 / 3).integer()) // -3

// 未删除 return this
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
})

console.log((-10 / 3).integer()) // -3


// 如果方法是修改构造器中的属性呢？
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    // return this;
}

function Foo(){
    this.length = 1000;
}

var foo = new Foo();
foo.length; // 1000

Foo.method('chagngeLength', function(){
    this.length = 2000;
})

var foo1 = new Foo();
foo1.chagngeLength() //
foo1.length // 2000

foo.length  // 1000

有 return this 和 删除 return this 表现一致，说明有的函数功能是需要 返回值；而有的函数功能只是 操作值
这里加了 return this 只是为了让这个函数有一个返回值，而不是默认的返回值 undefined
--------------------------------------------------------------------------------
// 构造函数 原型 实例，三者之间相互联系，且实时更新(动态)，这是理解 原型继承的动态本质 的基础
// 实例 与 原型的连接是建立在 new 调用构造器函数的基础上(new调用是发生在重写原型之前和之后也很关键)
// 实例的原型 __prtoto__ 是构造器函数的属性 prototype
// 每个函数对象在创建时也随配有一个 prototype 属性(它的值是一个拥有 constructor 属性且
// constructor 属性的值为函数的对象)
--------------------------------------------------------------------------------
// 自己检验2 ； 操作函数的函数(在JavaScript中，函数也是对象，也有自带参数(arguments this参数))
// 理解 函数也是对象，有助于 函数式编程 (过程抽象，高级函数(处理函数的函数))
function addPrototypeProperty(func1, name, func2) {
    func1.prototype[name] = func2;
    // return func1;
}

// var Foo = new Function() // 这样写可以
function Foo(){}

var foo1 = new Foo();
foo1.sayName(); // TypeError: foo1.sayName is not a function

addPrototypeProperty(Foo, 'sayName', function(){
    return 'Haha';
})

var foo2 = new Foo();
foo2.sayName(); // 运行结果 "Haha"

不 return 也没关系

// 再测验
 function addProperty(obj, name, value) {
     obj[name] = value;
     // return obj;
 }

var a = {};
a.height // undefined

addProperty(a, 'height', 180);
a.height // 180

不 return 也没关系
// 函数可能有两种类型 ： 第一种返回值(常见)； 第二种是操作值(不常见，但很高级)；第二种可能不需要 return
// 或者说是 return undefined;
--------------------------------------------------------------------------------

其他 补充
试试不用 new ，而是用 var Child = Object.create(Parent); 直接重原型 (Parent 继承方法和属性)

// 检验1
function Parent(){};
var Child = Object.create(Parent);
Child.__proto__ === Parent; // true

//
function Foo(){};
Foo.prototype.sayName = function(){
    return 'Haha';
};

var foo = new Foo();
foo.sayName()  // "Haha"

var foo1 = Object.create(Foo.prototype);
foo1.sayName() // "Haha"

Foo.prototype.height = 180;

foo.height  // 180; 原型继承的动态性，即使 foo 是在原型方法被增加之前创建，它也能访问到该方法
foo1.height // 180

var foo2 = new Foo();
foo2.sayName() // "Haha"
foo2.height    // 180

var foo3 = Object.create(Foo.prototype);
foo3.sayName() // "Haha"
foo3.height    // 180

以上一切在我们的预料之内

再来看看重写原型对象前后，new方式创建对象 和 Object.create 方式创建对象有什么不同
// 检验2
function Foo(){}
Foo.prototype.sayName = function(){
    return 'Haha';
};

var foo = new Foo();
foo.sayName()  // "Haha"

var foo1 = Object.create(Foo.prototype);
foo1.sayName() // "Haha"

Foo.prototype = {
    constructor : Foo,
    sayName : function(){
        return '用对象字面量的方式重写了原型'
    }
}

foo.sayName()  // "Haha"
foo1.sayName() // "Haha"

var foo2 = new Foo();
foo2.sayName(); // "用对象字面量的方式重写了原型"

var foo3 = Object.create(Foo.prototype);
foo3.sayName(); // "用对象字面量的方式重写了原型"

通过检验1 和 检验2，我们发现，通过 new运算法方式创建对象 和 通过  Object.create 方式创建对象
两者表现一致； 难道 通过 Object.create 创建对象的目的就是为了 不去调用 构造器 吗；
--------------------------------------------------------------------------------

function Foo(name){
    this.name = name;
    this.height = 180;
};
Foo.prototype.sayHi = function(){
    return 'Hi';
};

var foo = new Foo('GeCan');
foo.constructor // function Foo()
foo.sayHi()     // "Hi"
foo.height      // 180;
foo.name        // "GeCan"

var foo1 = Object.create(Foo.prototype);
foo1.constructor // function Foo()
foo1.sayHi()     // "Hi"
foo1.height      // undefined
foo1.name        // undefined

上面的这些，算是 通过 new运算法方式创建对象 和 通过  Object.create 方式 两者表现上的区别
-------------------------------------------------------------------------------
