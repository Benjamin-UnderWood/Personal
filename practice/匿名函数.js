// 传递高阶函数的时候，函数很短，可能就一行
// 如果去定义一个新函数，划不来，那就用匿名函数
// 匿名函数的意思是没有函数名，一般定义了就用
// 我们之前写的函数都是匿名函数，只不过把它赋值给了一个变量

// 匿名函数
var square = function(n) {
    return n * n;
}
// 非匿名函数，给函数取了名字叫 square
function square(n) {
    return n * n;
}

var process = function(array, processor) {
    var l = [];
    for (var i = 0; i < array.length; i++) {
        var a = array[i];
        // processor 调用成功， 要不然这里就没法继续
        var element = processor(a);
        l.push(element)
    }
    return l;
}

var array = [1.1, -2.2, 3.3];
var squareList = process(array,square);
console.log('squareList',squareList);
// [1.2100000000000002, 4.840000000000001, 10.889999999999999]

// 这就是匿名函数
var addList = process(array, function(n){
    return n + 1;
})
console.log('add list', addList)
// [2.1, -1.2000000000000002, 4.3]

var numbers = ['1', '3','34', '12']
filter(process(numbers,Number), function(n){
    return n % 2 == 1;
})
// [1, 3]
