-this
-调用位置
// 调用位置就是函数在代码中被调用的位置（而不是声明的位置）
// 只有仔细分析调用位置才能回答这个问题：这个this 到底引用的是什么？

function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    console.log( "baz" );
    bar(); // <-- bar 的调用位置
}

function bar() {
    // 当前调用栈是 baz -> bar
    // 因此，当前调用位置在 baz 中
    console.log( "bar" );
    foo(); // <-- foo 的调用位置
}

function foo() {
    // debugger; // 浏览器调试工具查看 调用栈; 设置断点 或者 插入 debugguer;
    // 当前调用栈是baz -> bar -> foo
    // 因此，当前调用位置在 bar 中
    console.log( "foo" );
}

baz(); // <-- baz 的调用位置

/**运行代码时，调试器会在那个位置 (debugger) 暂停，同时会展示当前位置的
 *函数调用列表，这就是你的调用栈。因此，如果你想要分析this 的绑定，使用开
 *发者工具得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。
 */

// 运行结果
baz
bar
foo

示例
必须被某个对象拥有或者包含;也就是说 this 必须要有所指向；要不然没法调用
a. 默认绑定
function bar() {
    console.log('bar被调用');
    a = 100; // 写在函数外面也没事，因为是全局变量；
    // window.a= 100; 这里的 a 被 window 包含，this.a即window.a, this指向window
    // 写成 var a = 100; 结果就会显示 undefined ，因为找不到包含a的对象！！！！！
    foo();
}

function foo() {
    console.log('foo被调用');
    console.log(this.a);
}

bar();
// 运行结果
bar被调用
foo被调用
100
--------------------------------------------------------------------------------
b. 隐式绑定
function bar() {
    console.log('bar被调用');
    var object = { // 可以 不加var，全局调用
        a: 200,
        foo: foo
    } // 如果 object 写在外面也没事，也能在函数里访问到，只是变成了全局变量
    // 这里 this.a 即 object.a，a 被 函数里的 object 所包含，this指向函数里的 object
    object.foo()
}

function foo() {
    console.log('foo被调用');
    console.log(this.a);
}

bar();
// 运行结果
bar被调用
foo被调用
200

--------------------------------------------------------------------------------
- 绑定规则
// 1.默认绑定
// 最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

function foo() {
    console.log( this.a );
}

var a = 2; // 相当于 window.a

foo(); // 2

/**你应该注意到的第一件事是，声明在全局作用域中的变量（比如var a = 2）就是全局对
 *象的一个同名属性。它们本质上就是同一个东西，并不是通过复制得到的，就像一个硬币
 *的两面一样。
 *接下来我们可以看到当调用foo() 时，this.a 被解析成了全局变量a。为什么？因为在本
 *例中， 函数调用时应用了this 的默认绑定，因此this 指向全局对象。
 *那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看foo() 是如何调
 *用的。在代码中，foo() 是直接使用 不带任何修饰的函数 引用进行调用的，因此只能使用
 *默认绑定，无法应用其他规则。----------------------------------------------------
 */

/**注意 如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this 会
 *绑定到 undefined：
 */
function foo() {
    "use strict";
    console.log( this.a );
}

var a = 2;

foo(); // TypeError: this is undefined

/**这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只
 *有foo() 运行在非strict mode 下时，默认绑定才能绑定到全局对象；严格模式下与foo()
 *的调用位置无关：---------------------------------------------------------------
 */

function foo() {
    console.log( this.a );
}

var a = 2;

(function(){
    "use strict";

    foo(); // 2
})();
/**通常来说你不应该在代码中混合使用strict mode 和non-strict mode。整个
 *程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程
 *度和你的代码有所不同，因此一定要注意这类兼容性细节。
 */

// var s  = function() {} ; (function(){}) 函数表达式可以 匿名，不会出错
// funciton() {} 函数声明不能 匿名，报错 Uncaught SyntaxError: Unexpected token {

--------------------------------------------------------------------------------
2. 隐式绑定
/**
 *另一条需要考虑的规则是 调用位置是否有上下文对象 ，或者说是否 被某个对象拥有或者包
 *含，不过这种说法可能会造成一些误导。
 */
看 this 的调用位置是否有 上下文对象(比如我们找 this.a，那就看调用位置有没有包含a的对象;修饰


 function foo() {
     console.log( this.a );
 }

 var obj = {
     a: 2,
     foo: foo
 };

 var a = "oops, global";// 被隐式绑定规则 给拦截了，不会绑到 window.a上了

 obj.foo(); // 2；带修饰 的函数调用
/**当foo() 被调用时，它的落脚点指向obj 对象。当函数引---------------------------
 *用有 上下文对象 时，隐式绑定规则会把函数调用中的this 绑定到这个上下文对象。因为调
 *用foo() 时this 被绑定到obj，因此this.a 和obj.a 是一样的。
 */

 function foo() {
     console.log( this.a );
 }

 var obj = {
     // a: 2,
     foo: foo
 };

 obj.foo(); // undefined ; 找不到 a

// 对象属性 引用链中只有最顶层或者说 最后一层会影响调用位置 。举例来说：
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42 调用位置发生在那里

进一步理解调用位置
function foo() {
    console.log(this.a);
}

var a = 'ggggg';

var bar = function() {
    var obj = {
        a: 10,
    	foo: foo
	};
	foo();// 调用位置----------------------;未被包含！！！！！
}

bar();// ggggg

再看下面
function foo() {
    console.log(this.a);
}

var a = 'ggggg';

var bar = function() {
    var obj = {
        a: 10,
    	foo: foo //调用位置--------------------
	};
	obj.foo();
}

bar();// 10

再看下面
function foo() {
    console.log(this.a);
}

var a = 'ggggg';

var obj = {
    a: 10,
    foo: foo //调用位置--------------------
};

var bar = function() {
	obj.foo();
}

bar();// 10


调用栈
var a = 'hahaha';


function baz(n) {
    console.log( "baz被调用" );
    dict = {
        a : n,
        foo : foo
    }
    bar();
}

function bar() {
    console.log('bar被调用');
    var obj = {
        a : dict.foo() ,
        foo : foo
    };
    obj.foo(); // undefined;
    console.log(obj.foo(), 1, dict.foo())
}

function foo() {
    console.log('foo被调用');
    console.log(this.a);
}

baz(1);
// 运行结果 一行一行 按顺序执行下来
baz被调用
bar被调用
foo被调用
1
foo被调用
undefined // 注意  dict.foo() 调用完即销毁
foo被调用
undefined // 注意  dict.foo() 调用完即销毁
foo被调用
1
undefined 1 undefined // console.log(obj.foo(),dict.foo()) 留下的

再看
var a = 'hahaha';


function baz(n) {
    console.log( "baz被调用" );
    dict = {
        a : n,
        foo : foo
    }
    bar();
}

function bar() {
    console.log('bar被调用');
    var obj = {
        a : 100 ,
        foo : foo
    };
    obj.foo();
    console.log(obj.foo(), 1, dict.foo())
}

function foo() {
    console.log('foo被调用');
    console.log(this.a);
}

baz(1);
// 运行结果
baz被调用
bar被调用
foo被调用
100 // 优先指向 object.a 而不是 window.a
foo被调用
100
foo被调用
1
undefined 1 undefined // console.log(obj.foo(),dict.foo()) 留下的;console.log传入参数时候 调用obj.foo()、dict.foo()，但调用完毕即销毁
--------------------------------------------------------------------------------

隐式丢失
/**一个最常见的this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，
 *从而把this 绑定到全局对象或者undefined 上，取决于是否是严格模式。
 */

 function foo() {
     console.log( this.a );
 }
 var obj = {
     a: 2,
     foo: foo
 };

 var bar = obj.foo; // 函数别名！引用的是 foo 函数本身；相当于 var bar = foo;------
// 指针

 var a = "oops, global"; // a 是全局对象的属性

 bar(); // "oops, global"

/**虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的
 *bar() 其实是一个不带 任何修饰 的函数调用，因此应用了默认绑定; 这里相当于 还是 foo()
 */
 // 改成这样
 function foo() {
     console.log( this.a );
 }

 var obj = {
     a: 2,
     foo: foo
 };

 var bar = obj; // 引用类型

 var a = "oops, global"; // a 是全局对象的属性

 bar.foo(); // 2

// 回调函数中--------------------------------------------------------------------
--------------------------------------------------------------------------------

function foo() {
    // 当前调用栈 doFoo > for
    // 当前调用位置 doFoo
    console.log( this.a );
}

function doFoo(fn) {
    // fn 其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
// 调用位置没有绑定对象，因此this绑到 window上
/**
 *参数传递 其实就是一种隐式赋值， 因此我们传入函数时也会被隐式赋值，所以结果和上一
 *个例子一样。
 */

// 如果把函数传入语言内置的函数而不是传入你自己声明的函数，会发生什么呢？结果是一
// 样的，没有区别：
function foo() {
    // 当前调用栈 setTimeout > for
    // 当前调用位置 setTimeout
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global";

setTimeout( obj.foo, 100 ); // "oops, global"

// JavaScript 环境中内置的setTimeout() 函数实现和下面的伪代码类似：
function setTimeout(fn,delay) {-------------------------------------------------
    // 等待delay 毫秒
    fn();
}

/**
 *就像我们看到的那样，回调函数丢失this 绑定是非常常见的。除此之外，还有一种情
 *况this 的行为会出乎我们意料：调用回调函数的函数可能会修改this。在一些流行的
 *JavaScript 库中事件处理器常会把回调函数的this 强制绑定到触发事件的DOM 元素上。
 *这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。遗憾的是，这些工具
 *通常无法选择是否启用这个行为。
 */

/**
 *无论是哪种情况，this 的改变都是意想不到的，实际上你无法控制回调函数的执行方式，
 *因此就没有办法控制会影响绑定的调用位置。之后我们会介绍如何通过固定this 来修复
 *（这里是双关，“修复”和“固定”的英语单词都是fixing）这个问题。
*/

--------------------------------------------------------------------------------
-显式绑定
/**在分析 隐式绑定 时，我们必须在一个对象内部包含一个指向函数的属性，
 *并通过这个属性间接引用函数，从而把this 间接（隐式）绑定到这个对象上
 */

 // 如果我们不想在对象内部包含函数引用，而想在某个对象上强制调用函数，该怎么做呢？-----
 call(..) 和apply(..) 方法
/**
 *这两个方法是如何工作的呢？它们的第一个参数是一个对象，它们会把这个对象绑定到
 *this，接着在调用函数时指定这个this。因为你可以直接指定this 的绑定对象，因此我
 *们称之为显式绑定
 */
function foo() {
    console.log( this.a );
}

var obj = {
    a:2
};

foo.call( obj ); // 2

// 通过foo.call(..)，我们可以在调用foo 时强制把它的this 绑定到obj 上。

function foo() {
    console.log( this.a );
}
var a = 10;

var obj = {
    a:2
};

foo.call(window);// 10
foo.call(); // 10
foo.call(this);// 10 this默认绑到 window 上

可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。
1. 硬绑定
// 但是显式绑定的一个变种可以解决这个问题。

function foo() {
    console.log( this.a );
}

var obj = {
    a:2
};

var bar = function() {
    foo.call( obj );// 2
};

bar(); // 2

setTimeout( bar, 100 ); // 2

// 硬绑定的bar 不可能再修改它的this
bar.call( window ); // 2

/**
 *我们来看看这个变种到底是怎样工作的。我们创建了函数bar()，并在它的内部手动调用
 *了foo.call(obj)，因此强制把foo 的this 绑定到了obj。无论之后如何调用函数bar，它
 *总会手动在obj 上调用foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。
 */

// 硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值：
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a:2
};

var bar = function() {
    return foo.apply( obj, arguments );-----------------------------------------
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5


// 另一种使用方法是创建一个可以重复使用的辅助函数：

function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}
// 简单的辅助绑定函数  -----------------用apply实现bind---------------------------
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    };
}

var obj = {
    a:2
};

var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3; 每次调用 bar 它都会进行 把 foo 强制绑定到 obj 上

console.log( b ); // 5

由于硬绑定是一种非常常用的模式，所以在ES5 中提供了内置的方法Function.prototype.bind，
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a:2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3

console.log( b ); // 5

-bind()
bind(..) 会返回一个硬编码的新函数，它会把参数设置为this 的上下文并调用原始函数。

2. API调用的“上下文”
第三方库的许多函数，以及JavaScript 语言和宿主环境中许多新的内置函数，都提供了一
个可选的参数，通常被称为“上下文”（context），其作用和bind(..) 一样，确保你的回调
函数  使用指定的this。-----------------------------------------------------------
举例来说：
function foo(el) {
    console.log( el, this.id );
}

var obj = {
    id: "awesome"
};

// 调用foo(..) 时把this 绑定到obj

[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
// forEach 方法也可以接受第二个参数，用来绑定回调函数的 this 关键字

// 看如下例子
function foo(el) {
    console.log( el, this.id );
}

var obj = {
    id: "awesome"
};

var id = 'handsome';

[1, 2, 3].forEach(foo);// 运行结果如下
"handsome"
"handsome"
"handsome"
第二个参数默认是 window, 相当于以下
[1, 2, 3].forEach(foo, window);
// 注意如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this 会绑定到undefined：

这些函数比如 forEach 实际上就是通过call(..) 或者apply(..) 实现了显式绑定，这样你可以少些一些
代码。(函数自带这绑定功能了)----------但有时候这也是坑，把人搞迷糊了---------------------


--------------------------------------------------------------------------------
补充
// this 动态作用域的东西 如何让它变成 静态作用域
// bind 将 this 绑定到某个对象；一绑上，调用就从绑定对象那调用, 即使在全局作用域中
// 而 call apply 只是动态地将 this 绑定到某个对象上；只是调用时候绑定
window.color = "red";

var o = { color: "blue" };

function sayColor(){
   console.log(this.color);
}

sayColor.call(o); // blue  -----------------------直接运行得到结果 blue;调用函数
sayColor.apply(o); // blue  -----------------------直接运行得到结果 blue;调用函数

sayColor.bind(o); // function sayColor() ---------直接运行得到结果是要绑的函数；绑定函数的 this，arguments
// bind 之后是一个函数，可用于回调函数；而 call 之后是一个 值；----------------------
// setInterval(slider.slideNext.bind(slider), 1500);

var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue----------------------------------必须赋值给一个变量，再调用

o.color = 'yellow'

sayColor.call(o); // yellow ---------------------------call每次都要绑定一下
sayColor.apply(o);// yellow ---------------------------apply每次都要绑定一下

objectSayColor();// yellow ----------------------只绑定一次，以后每次调用，this都生效的

/**
 *在这里，sayColor()调用 bind() 并传入对象o，创建了objectSayColor()函数。
 *objectSayColor()函数的 this 值等于o，因此 即使是在全局作用域中调用这个函数 ，也会看到"blue"。
 *而以往，在全局作用域中调用函数，this默认绑定到 window 上
 */

--------------------------------------------------------------------------------
 -查看this
function add(a, b){console.log(this)}
function sub(a, b){console.log(this)}
​
add(1,2);
// 运行结果 "Window"
​
sub(1,2);
// 运行结果 "Window"
​
add.call(sub, 1, 2);
// 运行结果"sub(a, b)"
// function sub();把this 从 add 绑到 sub
​
sub.apply(add, [1, 2]);
// 运行结果"add(a, b)"
// function add();把this 从 sub 绑到 add

例子
function foo(sth) {
    console.log(this.a, sth);
}

var b = {a: 10};

var bar = function() {
    return foo.apply(obj, arguments)
    // obj 将 foo 的 this指向 obj
    // arguments 将 bar 的参数，传给 foo
}

bar(3); // 10 3

--------------------------------------------------------------------------------
new 绑定
我们首先需要澄清一个非常常见的关于JavaScript 中函数和对象的误解。

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new初始化类时会调用类中的
的构造函数。通常的形式是这样的：
something = new MyClass(..);

// JavaScript 也有一个new操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开
// 发者都认为JavaScript 中new的机制也和那些语言一样。
然而，JavaScript 中new的机制实际上和面向类的语言完全不同。

首先我们重新定义一下JavaScript 中的“构造函数”。在JavaScript 中，构造函数只是一些
使用new操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，
它们甚至都不能说是一种特殊的函数类型，它们只是被new操作符调用的普通函数而已。

// 举例来说，思考一下Number(..) 作为构造函数时的行为，ES5.1 中这样描述它：
/**
 *15.7.2　Number 构造函数
 *当Number 在 new 表达式中被调用时，它是一个构造函数：它会初始化新创建的
 *对象。
 */
所以，包括内置对象函数（比如Number(..)，详情请查看第3 章）在内的所有函数都可
以用new来调用，这种 函数调用 被称为 构造函数调用 。这里有一个重要但是非常细微的区
别：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作--------------------
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行[[ 原型]] 连接。
3. 这个新对象会绑定到函数调用的this。// 原构造函数中的 this 指向了实例
4. 如果函数没有返回其他对象，那么new表达式中的 函数调用 会自动返回这个新对象。

我们现在关心的是第1 步、第3 步、第4 步，所以暂时跳过第2 步，第5 章会详细介绍它。
function foo(a) {
    this.a = a;
}

var bar = new foo(2);

console.log( bar.a ); // 2

再看一例
function Animal(name, age) {
    this.name = name;
    this.age = age;
}

var animal = new Animal('gua', 24);

animal // Animal {name: "gua", age: 24}; 第四步

再看一例
function Animal(name, age) {
    this.name = name;
    this.age = age;
	return 100;// 有返回值
}

var animal = new Animal('gua', 24);
animal // Animal {name: "gua", age: 24};

Animal('helen', 20);// 返回 100

使用new来 调用 foo(..) 时，我们会构造一个新对象并把它绑定到foo(..)调用中的this上。
new是最后一种可以影响 函数调用 时this 绑定行为的方法，我们称之为new绑定

--------------------------------------------------------------------------------
优先级
我们已经了解了函数调用中this 绑定的四条规则，你需要做的就是找到函数的调用位
置并判断应当应用哪条规则；

如果某个调用位置可以应用多条规则该怎么办？
为了解决这个问题就必须给这些规则设定优先级。

默认绑定的优先级是四条规则中最低的-------------------------------------------------

隐式绑定和显式绑定哪个优先级更高？-------------------------------------------------
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

现在我们需要搞清楚new绑定和隐式绑定的优先级谁高谁低：--------------------------------
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};
obj1.foo( 2 );// 传参数----------------------------------------------------------
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 ); // 传参数 ---------------------------------------------
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );----------------------------------------------------
console.log( obj1.a ); // 2
console.log( bar.a ); // 4

可以看到new绑定比隐式绑定优先级高--------------------------------------------------

是new绑定和显式绑定谁的优先级更高呢？----------------------------------------------
new和 call/apply 无法一起使用，因此无法通过new foo.call(obj1) 来直接进行测试。

我们可以使用硬绑定来测试它俩的优先级

// 在看代码之前先回忆一下硬绑定是如何工作的。Function.prototype.bind(..) 会创建一个
// 新的包装函数，这个函数会忽略它当前的this 绑定（无论绑定的对象是什么），并把我们
// 提供的对象绑定到this 上。

// 这样看起来硬绑定（也是显式绑定的一种）似乎比new绑定的优先级更高，无法使用new
// 来控制this 绑定。
我们看看是不是这样：
function foo(something) {
    this.a = something;
}

var obj1 = {};
var bar = foo.bind( obj1 );

bar( 2 );// obj1.a //2 硬绑定之后一直存在；而call apply则是调用时存在(显式绑定)；

console.log( obj1.a ); // 2

var baz = new bar(3);

console.log( obj1.a ); // 2
console.log( baz.a ); // 3

/**
 *bar 被硬绑定到obj1 上，但是new bar(3) 并没有像我们预计的那样把obj1.a
 *修改为3。相反，new 修改了硬绑定（到obj1 的）调用bar(..) 中的this。因为使用了
 *new 绑定，我们得到了一个名字为baz 的新对象，并且baz.a 的值是3。
 */

之所以要在new中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用
new进行初始化时就可以只传入其余的参数。--------------------------------------------
bind(..) 的功能之一就是可以把除了第一个参数（第一个参数用于绑定this）之外的
其他参数都传给下层的函数（这种技术称为“部分应用”，是“柯里化”的一种）。举例来说：

function foo(p1,p2) {
    this.val = p1 + p2;
}

// 之所以使用null 是因为在本例中我们并不关心硬绑定的this 是什么
// 反正使用new 时this 会被修改
var bar = foo.bind( null, "p1" ); // 把参数传给 下层函数
var baz = new bar( "p2" );

baz.val; // p1p2

--------------------------------------------------------------------------------
判断this

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的
顺序来进行判断：

1. 函数是否在new 中调用（new 绑定）？如果是的话this 绑定的是新创建的对象。
var bar = new foo()
2. 函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。
var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。
var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到
全局对象。
var bar = foo()

对于正常的函数调用来说，理解了这些知识你就可以明白this 的绑定原理了

--------------------------------------------------------------------------------
绑定例外
