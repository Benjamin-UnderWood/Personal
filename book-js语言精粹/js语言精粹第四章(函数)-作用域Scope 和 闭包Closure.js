作用域

作用域控制着变量与参数的可见性及生命周期。
对于程序员来讲，这是一项重要的服务，因为它减少了名称冲突，并且提供了自动内存管理

var foo = function() {
    var a = 3, b = 5;

    var bar = function() {
        var b = 7, c = 11;
        // 此时 a 为 3， b 为 7，c 为 11

        a += b + c;
        // 此时 a 为 21， b  为 7， c 为 11
    }；

    // 此时 a 为 3， b 为 5， 而 c 还未定义

    bar();

    // 此时 a 为 21， b 为 5；
}

大多数类 C 语言语法的语言都拥有块级作用域，在一个代码块中(括在一对花括号中的一组语句)
定义的所有比那里在代码块的外部是不可见的。定义在代码块中的变量在代码块执行结束后会被
释放掉。这是件好事

糟糕的是，尽管 JavaScript 的代码块语法貌似支持块级作用域，但实际上 JavaScript 并不支持。
这个混淆之处可能成为错误之源。

JavaScript 确实有 函数作用域。那意味着定义在函数中的参数和变量在函数外部是不可见的，
而在一个函数内部任何位置定义的变量，在该函数内部任何地方都可见

很多现代语言都推荐尽可能延迟声明变量。而用在 JavaScript 上的话却会成为糟糕的建议，
因为它缺少块级作用域(延迟声明也无济于事)。所以，最好的做法是在函数体的顶部声明函数中
可能用到的所有变量
--------------------------------------------------------------------------------

闭包
Closure

作用域的好处是内部函数可以访问定义它们(定义的位置)的外部函数的参数和变量 (除了 this 和 arguments)!!!!!
这太美妙了

内部函数拥有比它的外部函数更长的生命周期！！！！！！！！！！！！！！！！！！！！！！！！

var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
console.log(myObject.value); // 1

myObject.increment();
console.log(myObject.value); // 3

对于上面的 myObject 对象，它拥有一个 value 属性和一个 increment 方法；
假定我们希望保护该值不会被非法更改(银行密码) // 上面的 value 属性很容易就修改了，
// 比如在对象外部，随意更改 value 属性， myObject.value = 1;
// 那么再访问 myObject 的 value 属性就不是原来的值了

和以对象字面量形式去初始化 myObject 不同，我们通过 调用一个函数的形式去初始化
myObject， 该函数会返回一个对象字面量。// 新定义对象的方法

函数里定义了一个 value 变量。该变量对 increment 和 getValue  方法总是可用的
但 函数的作用域 使得它对其他的程序是不可见的

var myObject = (function(){
    var value = 0;

    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    }
}())

console.log(myObject);

Object {
    increment: increment(),
    getValue: getValue()
}

我们并没有把一个函数赋值给 myObject。 我们是把调用给你该函数后返回的结果赋值给它。
注意最后一行的()。 该函数返回一个包含 两个方法 的对象(不再有直接拥有 value 属性，密码；
也就说无法通过直接更改 myObject，来达到非法更改的目的了)，并且这些方法继续享有访问 value
变量的特权。---------------------------------------------------------------------
// 补充
之前看到立即执行函数最后一个()可以写外面
(function () {
      console.log("A cozy nest is ready");
})();


//
var Quo = function(string) {
    this.status = string;
};

Quo.prototype.get_status = function() {
    return this.status;
};

var myQuo = new Quo('confused');

console.log(myQuo.get_status()); // 'confused'

myQuo.status = 'undertand';

console.log(myQuo.get_status()); // 'undertand'

上面两句说明了， prototype 里的 this 是直接绑定到实例上，而不是绑到构造器上

// 写的清楚一些

function Foo(){
    this.height = 180;
}

Foo.prototype.get_height = function() {
    return this.height;
};

var foo = new Foo();
foo.get_height() // 180

foo.height = 190;
foo.get_height() // 190

以上代码更加说明， prototype 中的 this 被绑定到实例上了；

--------------------------------------------------------------------------------

var Quo = function(string) {
    this.status = string;
};

Quo.prototype.get_status = function() {
    return this.status;
};

var myQuo = new Quo('confused');

console.log(myQuo.get_status());

上述代码中的 Quo 构造器产生一个带有 status 属性 和 get_status 方法的对象，但看起来
并不是十分有趣。

为什么要用一个 get_status 方法去访问你本可以直接访问到的属性呢？

如果 status 是私有属性，它才是更有意义的。所以让我们来定义另一种形式的 quo 函数来做此事

// 创建一个名为 quo 的构造函数
// 它构造出带有 get_status 方法和 status 私有属性的一个对象
var quo = function(status) {
    return {
        get_status:function() {
                return status;
        }
    };
};

// 构造一个 quo '实例'(更应该叫对象)

var myQuo = quo('amazad');
console.log(myQuo.get_status()); // amazad

对象(用户)的 status 属性(密码)输入进函数以后，只有通过对象(用户)的 get_status 方法才能获得该属性(密码)
这个很神奇！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

当我们调用 quo 时，它返回包含 get_status 方法的一个新对象。该对象的一个引用-----------(复制，初始化变量 myQuo)
保存在 myQuo 中。

即使 quo (函数)已经返回了，但 get_status 方法仍然享有访问 quo 对象的 statues 属性的特权(
    内部函数拥有比它的外部函数更长的生命周期
)

get_status 方法并不是访问该参数的一个副本，它访问的就是该参数本身！！！！！！！！！！！
这是可能的，因为 该函数(内部函数)可以访问 它被创建时所处的上下文环境，这被称为闭包！！！

闭包，内部函数可以访问 它被创建(定义)时所处的上下文环境(记录当时的状态，当时定义的那瞬间)
(定义时的作用域)

让我们来看一个更有用的例子

// 定义一个函数，它设置一个 DOM 节点为黄色，然后把它渐变为白色

var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toStirng(16); // 转化成 16 进制的字符串
        node.style.backgroundColor = '#FFFF' +  hex + hex;
        if(level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    }
    setTimeout(step, 100);
}

我们调用 fade 把document.body 作为参数传递给它(HTML<body>标签所创建的节点)，
fade 函数设置 level 为1,。它定义了一个 step 函数；接着调用 setTimeout, 并传递
step 函数和一个时间(100 ms) 给它。然后返回， fade 函数结束
