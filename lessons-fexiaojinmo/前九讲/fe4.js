 //debug (调试/除错)
 //array string
 //array 可以存储很多元素，每个元素的孩子、类型都不用相同
 //array 数组 列表
 //使用[]符号，每个元素都用逗号分隔
var a = [1,3,4,5]
//现在a是一个array，拥有4个元素
//可以用.length 得到列表array的长度
//值可以用变量接住
var length = a.length
log(length)

var log = function() {
    console.log.apply(console,arguments);
}
var a = [1,3,4,5]
log('求array的长度',a.length)
//访问元素
//对于数组中的每个元素，可以通过下标（就是元素在列表中的序号，从0开始）
//下标访问语法是[] 中括号
log('用下标访问array中的元素')
log(a[0])
log(a[1])
log(a[2])
log(a[3])
//运行结果 1 3 4 5
log(a[4])
//运行结果 undefined 这个东西不存在 未定义

//手动访问元素是低效的
//可以用循环来访问元素，这个过程叫 遍历
//这里我们引入了一个新的语法，for循环
var log = function() {
    console.log.apply(console,arguments);
}
var a = [1,3,4,5]
log('循环访问array所有元素')
length = a.length;
for(var i = 0;i < length;i++) {
    log(a[i])
}//循环初始值， 循环条件 ，循环执行完之后执行i++ 循环体 （不会忘记i++)
//for循环 更加适用于  你知道终止条件 i<n
//上面的循环等价于下面的while循环
var i = 0;
while(i < length) {
    log(a[i]);
    i++
}//while循环不知道条件改变，当什么怎么样就怎么样
//运行结果 循环访问array所有元素  1 3 4 5

//向已经存在的array中添加新元素
//可以用列表的push函数往列表末尾插入一个元素
//并且，这个新元素可以是任意类型，这里是一个字符串
//array是JS内置的数据类型，有push这个方法

a.push('新元素')//.的含义，我要对a做一个什么函数，这个函数是属于a的,JS中 很多类型都有自己的函数
log(a)
//运行结果 [1,3,4,5,'新元素']

//题目，给定一个只包含数字的array
//题目，得到列表中最小的元素(比大小)
var a = [3,9,2,0,8]
var min = a[0]
for (var i = 0; i < a.length; i++) {
    var n = a[i]
    if (n < min) {
        min = n //当n更小，就把min给替换掉，这样保证min始终是最小的
    }
}
log(min)

//字符串 用单引号或者双引号，引起来的
//字符串 相当于一个数组（看做），但是数组中的每一个元素都是单个的字符
//数组的一些操作，比如去下标，都可以应用在字符串上
//字符串操作
//字符串可以判断相等、判断是否包含、相加、取字符串
//判断相等或者包含
log('good' == 'good')
log('good' == 'bad')
log('good' != 'bad')
log('impossible'.includes('possible'))
log('believe'.includes('lie'))
 //通过拼接得到一个新字符串
log('very' + 'good')
log('very ' + 'good')//空格有效
//得到一个你想要的字符串有很多种方式
//但是现在有更现代的方式，ES6的模板字符串 JS的标准ES
//用法如下
var name = 'gua'
var a = `${name},你好`//给一个变量赋值，用模板字符串 拼凑成一个新的字符串
log(a)
var a = `尊贵的vip会员，${name}，你好`
log(a)
//相当于别的语言的format（格式化）函数
//hello 尊贵的QQ会员 xxx 这个字符串就是通过上述的方式拼出来的，因为每个人的身份都不一样
//用+号也能拼字符串，但当变量有很多个的时候，会特别繁琐，容易出错
//模板字符串，让你代码更清晰易读

//字符串 相当于一个数组（看做），但是数组中的每一个元素都是单个的字符，也可以用数字下标访问
var s = 'iamgood'
log(s[0])
log(s[1])
log(s[2])
//运行结果 i a  m
log(s[6])
//运行结果undefined
for (var i = 0; i < s.length; i++) {
    log(s[i])
}
//字符串可以切片，当然，array也可以这样切片
//有一个数组 班上所有人成绩  从大到小排序  要得到排名前十的学生
//要生成一个新的array 存了0-9 手动或循环都可以做
//js给我们提供了一个函数来做 这样的事
//.slice(开始下标，结束下标) 切片
s.slice(0,3)
//运行结果 iam(未取到[3],也就是第四个字符) 闭区间 开区间 0,1,2
s.slice(1,3)
//运行结果 am （1,2） 一共有end - start个元素被取出来
s.slice(2)
//运行结果 mgood 只给一个开始的下标，那就会取到底，包括最后一个
s.slice(100)
//运行结果是 "" 一个空字符串 并不会出错 切不到而已
//JavaScript不会让你的程序经常性的出错，它能自己解决就自己解决了  
