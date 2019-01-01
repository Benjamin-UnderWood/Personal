for (var i = 0; i < 10; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i)
}
// 异步代码；setTimeout 函数执行的时候，外面环境的 i 已经是 10 了
// 输出 10 个 10

for (var i = 0; i < 10; i++){
    (function(j){
        setTimeout(function(){
            console.log(j);
        }, 1000 * j)
    })(i)
}
// 成功输出 0 1 2 3 4 5 6  7 8 9
// 通过IIFE，创造了一层作用域，这样setTimeout找j的时候，根据作用域链，就先查找到了这里注入的i。！！！！一层一层往外找
// setTimeout 函数执行的时候，能访问到每次迭代时被新作用域保护起来的i (保护起来的！！！)
// 在迭代内使用IIFE 会为每个迭代都生成一个 新的作用域 ，使得延迟函数的回调可以将新的
// 作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。

ES6
for(var i = 0; i < 10; i++){
    let j = i; // 是的，块作用域！没有函数级作用域(闭包)，直接是块作用域；
    setTimeout(function(){
        console.log(j)
    }, 1000 * j)
}
// 正常输出 0 - 9

for(let i = 0; i < 10; i++){
    setTimeout(function(){
        console.log(i)
    }, 1000 * i)
}
// 正常输出 0 - 9

// ES5 bind !!!!----------------------------------------------------------------
for(var i = 0; i < 10; i++) {
    setTimeout((function(j){
        console.log(j);
    }).bind(null, i), 1000 * i);
}
// 正常输出 0 - 9
// bind 作用之一就是 传递参数
// bind 可以传一部分参数进去；叫做部分调用函数；函数并未真正执行，但已经把i bind 进去了，
// 等function真正执行的时候，i 就是我们之前 bind 的 i (先传参，不立即执行)
