柯里化

var add = function(a, b) {
    return (a + b);
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Function.method('curry', function(){
    var args = Array.from(arguments), that = this;
    return function() {
        return that.apply(null, args.concat(Array.from(arguments)));
    };
});

var add1 = add.curry(1);
console.log(add1(6)); // 7

// 上述代码的内部实现
...
Function.prototype['curry'] = function() { // 没有指定参数个数(由于 arguments 的存在）
// 函数可以通过 arguments 来访问所有它 被调用时 传递给它的参数列表(包括那些 没有被分配 给 函数声明时
// 定义的 形式参数 的多余参数。这使得编写一个无须指定参数个数的函数成为可能)
    var args = Array.from(arguments), that = this; // 这个 arguments 是 curry 函数的 参数；
    return function() {
        return that.apply(null, args.concat(Array.from(arguments)));
    };
    return Function;
}
...

add.curry(1) // 相当于调用了 add 的 curry 方法

在 curry 函数内部发生了以下过程

...
// curry 函数被作为 add对象(函数) 方法调用时， arguments 为 [1](类数组)；this 绑定到该对象 add
// 调用 add.curry(1) 会返回如下 的函数
{
    var args = Array.from(1), that = add;
    return function() { // 返回这个函数
        add.apply(null, [1].concat(Array.from(arguments))); // 这个 arguments 是 curry 函数返回的(内部)函数的 参数；
    }
}

...

var add1 = add.curry(1)
add1(6)

相当于运行以下过程
...
add.apply(null, [1].concat([6])); // 7
...
