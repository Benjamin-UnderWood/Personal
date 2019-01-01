// 数据类型
// Number
// String
// Boolean
// Object
// Null
// Undefined
// 函数也是一个值
// 为一个变量赋值就创建了一个变量
// js 中，变量只是对值的一个引用
// 比如下面， 分别把 3 个不同类型的值给变量 a
// typeof 判断变量的类型 不用括号


// 浮点数
// 带小数点的数叫浮点数(float)
// 1.0 和 1 是不一样的
// 看看以下表达式的结果
// 5/2 2.5 浮点数 (某些语言会得到整数)
// 5/2.0
// 5.0/2

// 如果只有一个 0 ,则可以省略
// 5/.2   25
// 5/2    2.5
// 不要这么做，这样不好
// 程序 清晰易懂


// 多行字符串 又称为 模板字符串
// 使用反引号， 键盘左上角 波浪线 ``
var a = `多
行
字符串`
// 带换行符的


// 转义符  双引号里面的双引号   "\"" ,"\t" Tab  "\n"  enter键 (转义符号 不占长度)
// "\t"只占一个长度
// \\  表示一个反斜杠 \  ,  \' 单引号
// log('I\'a\tm \n\ngood\n')  每个字符 占 1 bit  就算一个tab键 显示很宽 但它仍占 一个字符
var log = function() {
    console.log.apply(console,arguments)
}



// 高阶函数  重要

// 实际上概念很简单 ——  函数可以作为参数传递 !!!  函数待定
// 就是可能怎么处理数据的方法还不确定 或者 有很多 处理数据的方法
// 有什么用呢？ 灵活性高，舒适度佳
// 其他语言 没有高阶函数  那样的语言 就得先定义好一个 函数 然后再别的函数里调用它
// 不能随时方便的去用 ; 这里的好处是 函数不会出现在我们的函数里，我们的函数里的函数是一个变量
// ex String 函数是用来把数据转换成 string 类型的一个函数
log('string', String(6.3))
// string 把 其他类型 的数据 ，转成一个 字符串 注意 S 大写
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

// 创建一个 array, 包含 3 个 number
var array = [1.1, -2.2, 3.3]

// String 内置函数
var stringList = process(array, String); // array 与 String 函数为 process 的两个变量
log('stringList',stringList)
// 把数组中的 数字 转化成了 字符串；其他不变
// 得到 ['1.1', '-2.2', '3.3']


// Math.floor 可以把一个小数向下取整
// 注意 Math.floor() 是一个 函数调用之后的返回值...
var intilist = process(array,Math.floor)
// 得到[1, -3, 3]

// 自定义一个函数
process(array,function(n){
    return n + 1
})
// 得到 [2.1, -1.2000000000000002, 4.3]


process(array, function(){
})
// (3) [undefined, undefined, undefined]
// 一个函数 不 return 就会返回 undefined



// filter 过滤器  过滤 符合条件的 放入新数组   按条件筛选
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

filter([59, 12, 60, 100],function(n){
    return n < 60
    // 比较 语句 ，自己 返回 判断结果(布尔值)
})

// 自己写一个函数 把 1-1000 中所有 能被 3 整除的数 都打印出来
// beginning 的方法 给数组赋值
var nums = [];
for ( var i=0; i<100 ;i++){
    nums[i]= i+1;
}

// 得到数组 [1,2,3...,1000]
var s = [];
for (var i = 1; i <= 1000; i++) {
    s.push(i) ;
}
// 结尾函数 其实会保存一个 s.push(1000) 即 1000的值；

// 创建过滤器
var filter = function(array,processor) {
    var l = [];
    for (var i = 0;i < array.length;i++) {
        var a = array[i];
        var condition = processor(a);
        if (condition) {
            l.push(a);
        }
    }
    return l;
}

// 过滤函数
var threemul =  function(n){
    return n % 3 == 0;
}

// 调用
filter(s,threemul)


// 自己写一个函数 把 1-100 中 所有的数 都翻倍
// 创建一个 1-100 数组
var nums = [];
for (var i = 0; i < 100; i++) {
    nums[i] = i + 1;
}

// 创建 函数
 var l = []; // 不能写在循环里面 (要不然最后 数组里只有最后一个值  好好体会)
 var process = function(array, processor) {
     for (var i = 0; i < array.length; i++) {
         var a = array[i];
         //var l = []; 不能写在这里 好好体会
         var element = processor(a);
         l.push(element);
     }
     return l;
 }

 // 处理 原来变量 的函数
 var doublenum = function(n) {
     return 2*n
 }

 // 调用函数
 process(nums,doublenum);

// 递归 阶乘
var fac = function(n) {
    // 如果 n 是 0， 则返回 1
    // 这是递归终止的条件， 必须要有， 否则无限递归了
    if(n == 0) {
        return 1
    }else {
        // 如果 n 不为 0 ，则返回 n * fac(n-1)
        // 这时候 n 是已知的， fac(n-1) 需要计算
        // 于是代码进入下一重世界开始计算
        return n * fac(n-1)
    }
}

// 对数组进行整体性操作
//当把一个数组赋给另一个数组时，只是为另一个数组增加了一个新的引用。当通过原引用修改数组的值时，
//另外一个引用也会感知到这个变化。即新数组仍旧指向原来的数组。
var nums =[];
for( var i=0;i<100;i++ ){
    num[i]= i+1;
}
var samenums =nums;
nums[0]=400;
console.log(samenums[0]); // 400

//一个更好的方案是采用深复制，将原数组的每一个元素都复制到新数组中。
function copy(arr1,arr2){
    for(i=0;i<arr1.length;i++){
        arr2[i]=arr1[i];
    }
}

var nums =[];
for(i=0;i<100;i++ ){
    nums[i]= i+1;
}

var samenums =[];
copy(nums,samenums);

nums[0]=400;
console.log(samenums[0]); // 1

/*从数组的中间位置添加或删除元素
采用splice()方法插入或删除元素，需要提供以下三个参数
-起始索引(希望开始添加元素的地方)
-需要删除的元素个数，添加元素时此项为0
-想要添加进数组的元素 */
//添加元素
// 区别于 slice
var nums = [1,2,3,4,5,6]
nums.splice(3,0,1,0,2);
nums
//运行结果 [1, 2, 3, 1, 0, 2, 4, 5, 6]
var nums = [1,3]
nums.splice(2,0,1,0,2);
nums
// 运行结果 [1, 3, 1, 0, 2]


//删除元素
var nums = [1,2,3,4,5,6]
nums.splice(2,3);
nums
// 运行结果  [1, 2, 6]
var nums = [1,2]
nums.splice(1,1) // nums.splice(1,2)  多删除了也没用
nums
// 运行结果 [1]
var nums = [1,2,3]
nums.splice(1,2)
nums
// 运行结果 [2]
