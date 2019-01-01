arguments 参数

当函数被调用时，会得到一个'免费'配送的参数，那就是 arguments 数组。函数可以通过此参数
访问所有被它调用时传递给它的参数列表，包括哪些没有被分配给函数声明时定义的形式参数的多余参数
(传入实参比形参多时)；

这使得编写一个无需指定参数个数的函数成为可能！！！！！！！！！！！

构造一个将大量的值相加的函数

注意该函数内部定义的变量 sum 不会与函数外部定义的 sum 产生冲突 ！！！！！！！！

该函数只会看到内部的那个变量

var sum = function() {
    var i, sum = 0;
    for(i = 0; i < arguments.length; i += 1){
        sum += arguments[i];
    }
    return sum;
}

console.log(sum(4, 8, 15, 16, 23, 42)); // 108
// 类似于 遍历数组 并累加

这不是一个特别有用的模式。在第 6 章中，我们会看到如何给数组添加一个相似的方法来达到
同样的效果

因为语言的一个设计错误，arguments 并不是一个真正的数组。它只是一个'类似数组(array-like)'
的对象。arguments 拥有一个 length 属性，但它没有任何数组的方法

// 补充 关于函数声明 与 函数表达式 变量提升

函数声明； 函数名与函数一起提升
console.log(pp (1)) // 1

function pp(i) {
    return i;
}

函数表达式
console.log(pure(1)) // error;pure is not a function

var pure = function(i) {
    return i;
}

// 第二个例子
console.log(pure) // undefined

var pure = function(i) {
    return i;
}

console.log(pure) // function pure()
