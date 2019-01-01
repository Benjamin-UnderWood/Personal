// array 是一个数组
// processor 是一个函数， 注意， 这是一个函数， 所以可以调用
// 把 array 中的每个元素都用 processor 函数处理并返回一个新的 list;不用每个元素都 写已从
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
var stringList = process(array, String);
console.log('stringList', stringList);
// ["1.1", "-2.2", "3.3"]

var array = [1.1, -2.2, 3.3];
var intList = process(array, Math.floor);
console.log('intList', intList);
// [1, -3, 3]

// 自定义一个函数
var array = [1.1, -2.2, 3.3];
var listPlusOne = process(array,function(n){
    return n + 1;
})
console.log('listPlusOne', listPlusOne);

process(array, function(){
})
// [undefined, undefined, undefined]
// 这样也是不会出错的，函数不 return，相当于 return undefined；

// 过滤器 按条件筛选 成绩等
var filter = function(array,processor) {
    var l = [];
    for (var i = 0; i < array.length; i++) {
        var a = array[i];
        var condition = processor(a);
        if(condition) {
            l.push(a)
        }
    }
    return l;
}

filter([59,58,80,90,95],function(n){
    return n < 60;
})
// [59, 58]
