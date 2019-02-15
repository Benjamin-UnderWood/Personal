var log = function() {
    console.log.apply(console,arguments);
}
// 第一部分 bind
var o = {
    foo: 1,
    bar: function(){
        return this.foo
    }
}
o.bar() //运行结果 1

var a = o.bar
a()     // 运行结果 undefined  this作用域变量 找不到 this 了

// 让它 变成静态 作用域 bind

// 绑定 在 o 上
// bind 就是把 this 绑到 它的参数上
var b = o.bar.bind(o) // 此时 b 是一个函数 function(){return this.foo}
b()  // 运行结果 1
o.foo = 12
b()  // 运行结果 12
// 因为 函数的 this 被绑定到了 o 上 ，调用 b 的时候 不再是 window.b 而是 o.b


// 第二部分 apply
// JavaScript OOP 中， 我们经常会这样定义
function Cat() {
}
// 乏味重复地给 prototype 添加多个属性
// Cat.prototype.food = 'fish';
// Cat.prototype.say = function() {
//     alert('i love' + this.food);
// }

// 有效的给 prototype 添加属性方式：将prototype设置为新对象
Cat.prototype = {
    food: 'fish',
    say: function() {
        alert('i love' + this.food)
    }
}
var cat = new Cat();
console.log(cat.constructor)
// 手动将prototype设置为新对象有一个关键的副作用：它删除了constructor属性！
// 按理说 cat.constructor 应该是 ƒ Cat() {}
// 要解决这个问题 只要在将 prototype手动设置为新对象时，记得定义constructor属性
Cat.prototype = {
    constructor: Cat, // 注意这条 增加上去
    food: 'fish',
    say: function() {
        alert('i love' + this.food)
    }
}

// 重写以上代码  -------------------
function Cat() {
}
Cat.prototype = {
    constructor: Cat, // 注意这条 增加上去
    food: 'fish',
    say: function() {
        alert('i love' + this.food)
    }
}

var blackCat = new Cat();
blackCat.say() // 弹出 i lovefish

// 但是如果我们有一个对象 whiteDog = {food:"bone"},我们不想对它重新定义say方法，
// 那么我们可以通过call或apply 调用 blackCat 的 say 方法：
whiteDog = {food: "bone"};
// whiteDog.say(); // whiteDog.say is not a function
blackCat.say.call(whiteDog);
whiteDog.say(); // 弹出 i lovebone

// 可以看出call和apply是为了动态改变this而出现的，当一个object没有某个方法，但是其他对象的有，
// 我们可以借助call或apply用其它对象的方法来操作。

// apply 应用
// 通过document.getElementsByTagName选择的dom 节点是一种类似array的array。
// 它不能应用 Array下的 push,pop 等方法。
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
