// js是动态语言，this是由函数求值时的调用者决定的。C++静态语言

// 匿名函数的执行环境具有全局性，this通常指向window。-------------------------------

// 当然，通过call()、bind()、apply()改变函数执行环境的情况下，this会指向其它对象。

学习this 的第一步是明白this 既不指向函数自身也不指向函数的词法作用域，你也许被
这样的解释误导过，但其实它们都是错误的。

this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

var b = 2;
var obj={
  a: function (prop) {
    return function(obj1, obj2) {
      console.log(this.b); // window
    }
  },
  b: 123
}

obj.a()() // 2

// this不指向函数自身也不指向函数的词法作用域--------------------------------------
// 可以看到，即使是在obj这个环境中调用newFunc所存储的匿名函数，匿名函数内的this仍然是指向全局的。
js语言精粹 上，称这样的调用为 函数调用模式

// 在 obj 内 第一个函数被保存为对象的一个 属性 a,我们称它为方法
// 像下面这样是 以方法的形式调用 a
obj.a()
当一个方法被调用时，this (参数)被绑定到该对象(这很容易理解，因为方法是对象的方法嘛)
因此在 第一个函数内的 this 就是 obj

但第二个函数 是个匿名函数，并非一个对象的属性，那么它就是被当做一个函数(而非一个方法)来调用的(因而
它没有绑定到 obj 对象上，而是被绑定到全局对象，我们需要手动去矫正，使得第二个函数内部的 this 仍然绑定到 外部函数的this(也就是 obj)上，
从而共享 a 方法对对象 obj 的访问权)

// 可以把外部作用域中的this保存在一个闭包能够访问到的变量内，来解决这个问题。
var obj={
  a: function (prop) {
    let that = this;//----------------------------------------------------------
    return function(obj1, obj2) {
      console.log(that.b);
    }
  },
  b: 123
}

obj.a()() // 123

// 注： this和arguments都存在这个问题，如果想访问作用域中arguments参数，------------
// 必须将该对象的引用保存到另一个 闭包能访问的变量中 (类似于上面这样的操作手法)。


// 例子2
function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

Point2D.prototype.showLength = function() {
    var length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    console.log(length);
}

Point2D.prototype.showLengthAsync = function() {
    var self = this;//----------------------------------------------------------

    setTimeout(function(){//-----------------------------------------------------
        self.showLength();//-----------------------------------------------------
        // 直接写成 this.showLength();调用不到外面的 this,你调用的是 function 自己的this
        // 由于 setTimeout 是一个callback 函数，且调用的时候没有指定 this，所以调用的时候
        // this 是一个 global 的环境；我们调用不到 Point2D的this
        // 所以ES5里得把外部作用域中的this保存在一个 闭包能够访问到的变量self 内，来解决这个问题(通过变量的传递)
    }, 1000);
}


// 将上述代码改成这样也行
// Point2D.prototype.showLengthAsync = function() {
//     setTimeout(() => {
//         this.showLength(); // 方法二 箭头函数 内部没有 this,所以能够直接调用外部作用域的this
//     }, 1000);
// }

var x = 30, y = 40;
var p = new Point2D(3, 4);

var f = Point2D.prototype.showLength;

f(); // 50  f里调用 showLength ,它的 this 是global对象； 隐式丢失；
setTimeout(p.showLength, 500); // 50 ; 参数传递，隐式赋值，也会出现丢失；调用的showLength，this 全局 ！！！！！！！！！！
// 上面 p.showLength 依然是函数调用模式，因为它并非一个对象的属性
p.showLength()// 5;毫无疑问，new ,this 绑定的是新创建的对象;
p.showLengthAsync(); // 5

setTimeout(p.showLength.bind(p), 500) // 5；把 this 硬绑定到 p 上；调用的showLength，this绑定在p上！！！！！！！！！！！！！！

--------------------------------------------------------------------------------
// 自己检验1
function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

Point2D.prototype.showLength = function() {
    var length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    console.log(length);
}

Point2D.prototype.showLengthAsync = function() {
    // var self = this;
    setTimeout(function(){
        this.showLength();// ---------------------------------------------------
        // 回调函数并非一个对象的属性，因而它被当做一个函数来调用，this不会绑定到外部函数的 this 上，而是绑到全局对象
    }, 1000);
}

var p = new Point2D(3, 4);

p.showLengthAsync(); // 等待大约1000ms之后(回调函数)抛出以下结果
// TypeError: this.showLength is not a function

// 原因setTimeout函数里，直接写成 this，它是调用不到外部的this的；调用的是自己的this,但是
// 自己又没有这个 showLength的方法，所以抛出错误

--------------------------------------------------补充
// 我们来看看 setTimeout 外部的this，和它内部的 this
function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

Point2D.prototype.showLength = function() {
    var length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    console.log(length);
}

Point2D.prototype.showLengthAsync = function() {
    console.log('outerThis',this);
    setTimeout(function(){
        console.log('innerThis', this)
    }, 1000);
}

var p = new Point2D(3, 4);

p.showLengthAsync(); // 运行结果

outerThis  Object { x: 3, y: 4 } //调用时，this 绑定到实例 p
innerThis  Window // 由于 setTimeout 是一个callback函数，且调用的时候并没有指定this，因此 this 是 global
// 然后 window 也并没有 showLength 方法，所以抛出错误
-------------------------------------------------补充

// 将 setTimeout 外部作用域的this, 保存在一个闭包能访问到的变量 self 内
function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

Point2D.prototype.showLength = function() {
    var length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    console.log(length);
}

Point2D.prototype.showLengthAsync = function() {
    var self = this; //---------------------------------------------------------
    setTimeout(function(){
        console.log('self', self)
        self.showLength();// 闭包能访问到其上下文环境，因而能访问到 self变量-----
    }, 1000);
}

var p = new Point2D(3, 4);

p.showLengthAsync(); // 运行结果 过 1000ms左右 之后显示

self  Object { x: 3, y: 4 } // 成功将 setTimeout 外部的 this 访问到
5

// 将上述代码改成这样也行 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Point2D.prototype.showLengthAsync = function() {
//     setTimeout(() => {
//         this.showLength(); // 方法二 箭头函数 内部没有 this,所以能够直接调用外部作用域(上下文)的this！！！！！！
//     }, 1000);
// }
// 运行结果 也是 5

--------------------------------------------------------------------------------
// 自己检验2
var b = 2;
var obj={
  a: function (prop) {
    return function(obj1, obj2) {
      console.log(this.b); // window;匿名函数的执行环境具有全局性，this通常指向window(没有指定this的情况下)
      // 属于函数调用模式，因为第二个函数并非一个对象的方法，以此模式调用，this绑定到全局对象
    }
  },
  b: 123
}

obj.a()() // 2

// 可以把外部作用域中的this保存在一个 闭包能够访问到的变量 内，来解决这个问题。
var b = 2;
var obj={
    a: function (prop) {
        console.log('this', this);
        let that = this; // !!!!!!!
        return function(obj1, obj2) {
            console.log(that.b); // !!!!!!!
        }
    },
    b: 123
}

obj.a()() // 调用结果

this  Object { a: a(), b: 123 }
123

--------------------------------------------------------------------------------
// 自己检验3
var myObject = {
    foo: 'bar',
    func: function() {
        var self = this; // this 是一个对象，self复制了this，所以它们指向同一个对象
        console.log(this.foo);
        console.log(self.foo);

        (function() {
            console.log(this.foo);// 匿名函数this指向window
            console.log(self.foo);
        }());
    }
};

myObject.func();
// bar bar undefined bar

// 第一个 this.foo 输出 bar，因为当前 this 指向对象 myObject
// 第二个 self.foo 输出 bar，因为 self 是 this 的副本，同指向 myObject 对象
// 第三个 this.foo 输出 undefined，因为这个 IIFE(立即执行函数表达式) 中的 this 指向 window
// 匿名函数的执行环境具有全局性，this 通常指向 window (IIFE为匿名函数；匿名函数在 函数表达式 和 回调函数中 常见)
// 第四个 IIFE 作用域处于 myObject.func 的作用域中，本作用域找不到 self 变量，沿着作用域链
// 向上查找，从包含它的父函数中找到了指向 myObject 对象的 self
