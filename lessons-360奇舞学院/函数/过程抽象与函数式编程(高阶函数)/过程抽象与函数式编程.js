// 过程抽象的定义
// 纯函数(不包含异步, 加入函数里有异步了, 那么每次对函数做相同的输入, 结果很可能不一样)
// 等价函数
// 举例说明
// 过程抽象与函数式编程(forEach map filter 等替代 for; length(arr) 替代 arr.length)
// 过程抽象与数据抽象的区别  开门与门

// 数据抽象的思路
// define: f -> dataFormF = f(data)
// define: g -> result = g(dataFormF) 

// 过程抽象的思路
// define: f -> dataFormF = f(data)
// define: g -> k = g(f), result = k(data);

// 过程抽象, 把函数当值传入另一个函数, 以此达到处理函数的目的

// 纯函数
// 什么是纯函数 ?
// 一个函数如果输入参数确定, 如果输出结果是唯一确定的, 那么它就是纯函数
// 纯函数的好处 ?
// 无状态、无副作用、幂等、无关时序
// 容易并行操作, 无关执行顺序; 但非纯函数, 时序就很重要, 先执行后执行必须分清楚

function add(x, y) {
    return x + y;
} // 纯函数

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
} // 随机函数; 非纯函数, 但是是一个没有副作用的函数, 因为它不会去改变外部的环境

let count = 0;
function addCount() {
    count++;
} // 非纯函数; 每次调用函数, count值不一样; 

function setBgColor() {
    document.body.backgroundColor = color;
} // 非纯函数; dom 在浏览器里, 也属于外部环境; 因此该函数操作了外部环境
// ex.后面有段代码, 如果color是green, 则执行一段逻辑;
// 但在前面调用了 setBgColor 将颜色改成 red, 那么那段逻辑就不会执行了, 因此会影响到整个程序的执行

function __reduce__(fn) {
    return function(...args) {
        return args.reduce((a, b) => fn(a, b));
    }
} // 过程抽象, 纯函数

// 过程抽象提升函数纯度f

