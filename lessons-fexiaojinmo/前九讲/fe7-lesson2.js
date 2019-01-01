// 高阶函数 是 js 提供的一种方法


// 有时候要传递高阶函数的时候， 函数很短， 可能就一行
// 如果去定义一个函数有人觉得划不来， 就想了一个偷懒的办法
// 那就是匿名函数
// 匿名函数的意思是没有函数名， 一般定义了就用

// 实际上我们之前写的函数都是匿名函数， 只不过把它赋值给了一个变量而已  好好体会
// function 构建函数的方式 是一种匿名函数

// 例子
// 定义一个 square 函数求平方
var square = function(n) {
    return n * n;
}
// C 语言也是这样定义的  几乎所有语言都是这样的

function square(n) {
    return n * n;
}
// 这种方法就不是一个匿名函数， 它定义了函数的名字 suqare

// 读取 excle 表格并按一定方式 转化成 数组

// Number 字符串转化为 数值 标准库
var process = function(array, processor) {
    /*
    array 是一个数组
    processor 是一个函数， 注意， 这是一个函数， 所以可以调用

    把 array 中的每个元素都用 process 函数处理并返回一个新的 list
    */
    var l = []
    for (var i = 0; i < array.length; i++) {
        var a = array[i]
        // process 必须能调用成功，否则这里就跪了
        var element = processor(a);
        // 拿函数(可能会变，处理的方式不同; 或者解析到这，还待定，后面知道) 对原有 的数组元素(不变) 进行操作
        l.push(element);
        // 插入 element
        }
        return l;
}
var filter = function(array,processor) {
    var l = [];
    for (var i = 0; i < array.length; i++) {
        var a = array[i];
        // processor 必须调用成功 否则这里无效
        var condition = processor(a);
        // 将 a 放入 processor 函数 (判断作用的函数)
        if (condition) {
            l.push(a);
        }
    }
    return l;
}

var numbers = ['1','3','34','12']
var odds = filter(process(numbers, Number),function(n) {
    return n % 2 == 1;
})

var sum = function(array) {
    var s = 0;
    for (var i = 0;i < array.length;i++) {
        var n = array[i];
        s += n;
    }
    return s;
}

sum(odds)
// 通过 process 和 filter 组合实现很多 很棒的函数
// process 针对于 数组 进行 处理，当有多个形参时就不能用
// 定义函数的时候的参数 就是 形参； 使用函数时候， 传递给函数的参数就是 实参

// arrary.map(String) 转化为 字符串
var array = [1,2,3];
array.map(String)

// 用程序 操控 网页,编程
