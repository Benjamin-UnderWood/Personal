// call
function Point2D(x, y) {
    this.x = x;
    this.y = y;
}

Point2D.prototype.getLength = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

var p = new Point2D(1, 1);

console.log(p.getLength()); // 1.4142135623730951

var obj = {x:3, y:4};

console.log(p.getLength.call(obj)); // 5

// 例子2 Array.from 的替代方案
function foo(){
    var args = [].slice.call(arguments);

    console.log(Array.isArray(arguments));// false
    console.log(Array.isArray(args));// true
}

foo(); // false true

// apply
// call后面接受原始参数，apply后面接受数组(传入函数的参数)

// 翻转函数参数
function __reverseArgs__(fn){
    return function(){
        // 把新的函数(要返回的函数)的参数给拿出来，变成数组，然后 reverse，再传入原始的函数
        var args = [].slice.call(arguments);

        return fn.apply(this, args.reverse());
    }
}

function foo(){
    console.log(Array.from(arguments));
}

var foo2 = __reverseArgs__(foo);

foo2(1, 2, 3, 4); // [ 4, 3, 2, 1 ]

// call 与 bind
function setBodyState(state){
    document.body.calssName = state;
}

setBodyState.call(null, 'state1'); // 瞬间设置成 state1 状态了；

setTimeout(setBodyState.bind(null, 'state2'), 1500); // 1500ms左右后，回调 bind函数，才变成状态 state2

// call 立即执行(函数调用)； bind 返回 绑定对象和参数后 的 函数，不立即执行，需要调用
// 调用 bind 的方式，把 bind 赋给一个新的变量，再调用这个变量；或者 回调 函数中，执行

// 例子2
function add(x, y){
    return x + y;
}

console.log(add.call(null, 1, 2)); // 里面立即执行；3

console.log(add.apply(null, [1, 2])) // 里面立即执行 3
// apply 传入数组，并把数组解开，再传入函数


console.log(add.bind(null, 1, 2)) // 里面执行结果 function add()
// bind 得到一个 function

let add2 = add.bind(null, 1, 2); // 一次性传完参数;但不立即执行(需要调用)
console.log(add2()); // 3

let add3 = add.bind(null) // 不传参数
console.log(add3(1, 2)) // 3

let add4 = add.bind(null, 1) // 部分传参
console.log(add4(2)) // 3

let add5 = add.bind(null, 1) // 部分传参
console.log(add4(2, 3)) // 3 ;多传参数也不会出错

// bind 部分调用的函数；如果传完参数，也是延迟调用
