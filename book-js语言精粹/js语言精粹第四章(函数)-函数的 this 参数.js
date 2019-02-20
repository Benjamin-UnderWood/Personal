// 第 4 章 函数

// 调用

// 调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。
// 除了声明时定义的形式参数，每个函数还接受两个附加的参数： this 和 arguments
// 参数 this 在面向对象编程中非常重要，它的值取决于调用的模式

// 在 JavaScript 中一共有 4 中调用模式
//     方法调用模式
//     函数调用模式
//     构造器调用模式
//     apply 调用模式
// 这些模式在如何初始化 关键参数 this 上存在差异

// 1. 方法调用模式

// 当一个函数被保存为对象的一个属性时，我们称它为一个方法。
// 当一个方法被调用时， this 被绑定到该对象。

// 如果调用表达式包含一个提取属性的动作 (即包含一个 .表达式 或 [subscript]下标表达式)，
// 那么它就被当做一个方法来调用。

// 创建 myObject 对象，它有一个 value 属性和一个 increment 方法
// increment 方法接受一个可选的参数。如果参数不是数字，那么默认使用数字 1

var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}

myObject.increment();
// document.writeln(myObject.value);
console.log(myObject.value); // 1

myObject.increment(2);
console.log(myObject.value); // 3

// 方法可以使用 this 访问自己所属的对象，所以它能从对象中取值或对对象进行修改。
// this (参数)到对象的绑定发生在调用的时候。 这个'超级' 延迟绑定(very late binding)使得
// 函数可以对 this 高度复用。通过 this 可取得它们所属对象的上下文的方法称为 公共方法(public method)
// --------------------------------------------------------------------------------

// 2. 函数调用模式
// 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的
var add = function(a, b) {
    return a + b;
}

var sum = add(3, 4);
console.log(sum) // sum 的值为 7

// 以此模式调用函数时， this 被绑定到全局对象。这是语言设计上的一个错误。
// 倘若语言设计正确，那么当内部函数被调用时，this(参数) 应该绑定到外部函数的 this 变量。

// 这个设计错误的后果就是方法不能利用内部函数来帮助它工作，因为内部函数的 this 被绑定了
// 错误的值(参数被绑定初始化错误的值)，所以不能共享该方法对对象的访问权。

// 幸运的是，有一个很容易的解决方法：如果该方法定义一个变量并给它赋值为 this, 那么内部函数
// 就可以通过那个变量访问到 this 。按照约定，我们把那个变量命名为 that (或 self)

// 给 myObject 增加一个 double 方法

myObject.double = function() {
    var that = this; // 解决方法

    var helper = function() {
        that.value = add(that.value, that.value);
    };

    helper(); // 以函数的形式调用 helper
};

// 以方法的形式调用 double

myObject.double();
console.log(myObject.value); // 6; 在上面 myObject.value 已经是 3 的基础上
// --------------------------------------------------------------------------------

// 3. 构造器调用模式

// JavaScript 是一门基于 原型继承 的语言。这意味着对象可以直接从其他对象继承属性
// 该语言是无类型的

// 这偏离了当今编程语言的主流风格。当今大多数语言都是基于类的而语言。尽管原型继承极富表现力，
// 但它并未被广泛理解。JavaScript 本身对它原型的本质也缺乏信心，所以它提供了一套和
// 基于类的语言类似的对象构建语法。有类型化语言编程经验的程序员们很少有愿意接受 原型继承 的，
// 并且认为借鉴类型化语言的语法模糊了这门语言真实的原型本质。真实两边都不讨好

// 如果在一个函数前面带上 new来调用，那么背地里将会创建一个连接到该函数 prototype 成员的新对象，
// 同时 this 会被绑定到那个新对象上

// new前缀也会改变 return 语句的行为。我们将会在后面看到更多的相关内容

// 创建一个名为 Quo 的构造器函数。它构造一个带有 status 属性的对象
var Quo = function(string) {
    this.status = string;
} // 其实 这相当于一个 模板，'不存在'的东西，真正存在的是 复制出来的 实例，这些属性什么的也是 实例对象的属性！！！

// 给 Quo 的所有实例提供一个名为 get_status 的公共方法
Quo.prototype.get_status = function() {
    return this.status;
}

// 构造一个 Quo 实例
var myQuo = new Quo('confused'); // 原型上的 this 绑定到实例上

console.log(myQuo.get_status())  // 'confused'

// 一个函数，如果创建的目的就是希望结合 new前缀来调用，那它就被称为 构造器函数。按照约定，它们
// 保存在以大写格式命名的变量里。

// 如果调用构造器函数时没有在前面加上 new，可能会发生非常糟糕的事情，既没有编译时警告，
// 也没有运行时警告，所以大写约定非常重要

// 构造器函数是被设计成结合 new运算符一起使用的函数。new运算符基于该函数的原型创建一个新对象，
// 并且把该对象绑定到该函数隐含的this参数上。如果你忽略使用 new，新的对象不会被创建，并且
// this会被绑定到全局对象上。这是一个严重的错误
// (JSLint 强制约定构造器函数必须以首字母大写的形式命名。JSLint 不期望看到一个首字母大写的
// 函数在没有前置 new的情况下被调用，JSLint也不期望看到与 new连用的函数名不是以大写字母开头的)
// new与大写字母开头的函数名一定要一起出现
// --------------------------------------------------------------------------------

// 4. Apply 调用某事

// 因为 JavaScript 是一门函数式的面向对象编程语言，所以函数可以拥有方法

// apply 方法让我们构建一个参数数组传递给调用函数。它也允许我们选择 this 的值。apply方法
// 接受两个参数，第1个是要绑定给 this 的值，第2个就是一个参数数组

var add = function(a, b) {
    return a + b;
}

// 构造一个包含两个数字的数组，并将它们相加
var array = [3, 4];
var sum = add.apply(null, array); // sum 值为 7

// 构造一个包含 status 成员的对象
var statusObject = {
    status:'A-OK'
};

// statusObject 并没有继承自 Quo.prototype, 但我们可以在 statusObject 上调用 get_status 方法，
// 尽管 statusObject 本身并没有一个 get_status 的方法。

var status = Quo.prototype.get_status.apply(statusObject); // 'A-OK'
