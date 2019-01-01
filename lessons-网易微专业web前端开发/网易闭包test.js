function add() {
    // 定义了局部变量 i
    var i = 0;
    // 返回了一个函数
    // 返回函数每次做 i++
    return function() {
        alert(i++);
    }
}

var f = add(); // 执行 add 返回一个函数
f(); // 执行返回的函数； 
// 运行结果 0
f();
// 运行结果 1;

// 若是 ++i，则上述结果分别为 1 ，2

// 若改成 i = i + 1
function add() {
    var i = 0;
    return function() {
        alert(i=i+1);
    }
}
var f = add(); 
f(); // 1
f(); // 2

// 闭包的应用
// 1.保存变量现场
// 错误
var addHandlers = function(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function() {
            alert(i);
        }
    }
}

// 正确，用到 闭包 的概念
var addHandlers = function(nodes) {
    var helper = function(i) {
        return function() {
            alert(i);
        }
    }

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i);
    }
}



// 2. 封装 
var observer = (function() {
    var observerList = [];
    return {
        add: function(obj) {
            observerList.push(obj);
        },
        empty: function() {
            observer = [];
        },
        getCount: function() {
            return observerList.length;
        },
        get: function() {
            return observerList;
        }
    }
})();


function A() {
    var count = 0;

    function B() {
        console.log('传入count', count)
        count ++;
        console.log('++后count', count);
    }

    return B;
}
var C = A(); 
C();
// 传入count 0 
// ++后count 1 
C();
// 传入count 1 
// ++后count 2
C();
// 传入count 2
// ++后count 3


function add() {
    var i; // 不会被回收一直保存在内存中。
    return function() {
        if(i == undefined) i = 0;
        i++;
        console.log(i);
    }
}

// 执行 add 返回一个函数
var f = add(); 
// 执行返回的函数； 
f(); 
// 运行结果 1
f();
// 运行结果 2

// 请问老师两次运行 f(), i的值(1 和 2)，是否只存在于 return 的函数体内，
// 它的外部词法作用域(add环境内) i 还是 undefine;
// 也就是说第一个 f() 调用后 i 的值保存在 return的 函数内，第二个 f() 调用时能访问到
// 第一个 f() 改变的 i的值

// 还是说每次 f() 调用后， i 的值都保存在 add环境内，然后每次 f() 调用再从外部词法作用域里查找呢

// 第二种情况(i 只被声明了一次，内部函数体里对 i 的修改能反映到外部环境)

// 相当于在全局环境中执行这段
var a = 0;
function b() {
    a++;
}
b();
a // 1

b();
a // 2

// 以此类推 一直能访问到 a ；因为 a 是全局变量被分配了内存；闭包其实和这个类似，只不过全局环境变成了 闭包外部作用域(要访问的变量也被分配了内存)


function add() {
    var i = 0; // 不会被回收一直保存在内存中。
    return function() {
        var j = 0;
        var m = i + j;
        console.log(m)
        j++;
    }
}

// 执行 add 返回一个函数
var f = add(); 
// 执行返回的函数； 
f(); 
// 运行结果0
f();
// 运行结果0

// 如果 j 不是在函数的词法作用域里定义的，事情将变得没有意义