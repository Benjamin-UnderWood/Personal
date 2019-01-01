// 输出到终端（要在浏览器打开检查器的终端才能看到）
console.log(line)
// 用自己的 log
var log = function(){
    console.log(arguments);
}
//在js中函数里面有一个特殊的变量，叫arguments
//它保存了函数所有的参数，这是套路
//虽然没有定义参数，但它包含了所有的参数
//在js中，函数声明的时候可以不声明参数，依然可以使用参数,这是在所有语言中比较特殊的
log(1)
log("debug","hello")

var echo = function(a,b){
    console.log(a,b);
}
echo (1,2)//控制台输出1 2
echo (1)//控制台输出1 undefined；undefined就是未定义，表示没有的东西
echo ()//控制台输出 undefined undefined；就是两个都没有
echo (1,2,3)//控制台输出 1 2；没用到第三个参数
var echo = function(a,b){
    console.log(a,b,arguments);
}
echo (1,2)//控制台输出1 2 Arguments;Arguments是 0:1 1:2（第一位1，第二位2）
echo (1,2，3,4)//控制台输出1 2 Arguments;Arguments是 0:1 1:2 2:3 3:4


//选择结构与比较、逻辑的运算

var log = function(){
    console.log.apply(console,arguments);
}
//console.log(arguments);语句执行后，控制台会显示Arguments；而console.log.apply(console,arguments);则不会
var grade = 3;
if (grade<7){
    log("小学生");
}

//if else
if(1>2){
    log("条件成立")
}else{
    log("条件不成立")
}
//多个if else，有一个执行了其他都不会执行；选择控制
var grade = 8
if(grade<7){
    log("小学生")
}else if(grade<10){
    log("初中生")
}else{
    log("高中生")
}
//求绝对值
var n = 3
if (n<0){
    n = -n
}//if在条件为true的时候执行
n
//判断奇数偶数
var log = function() {
    console.log.apply(console,arguments);
}
var n = 1
if (n%2 === 0){
    log('偶数')
}else{
    log('奇数')
}
//条件  比较运算与逻辑操作 结果是一个布尔值 （true false)
//if 是根据这个值来决定执行的语句的
//===严格相等 类型 和 值都一样 ；其他语言不用这样（弱类型语言的缘故）
//==相等 1==1 true 1=="1" true JS弱类型语言 强制帮你转化类型
//!=不等 1!="1" false
//!==严格不等于 1!=="1" true
//<小于
//>大于
//<=小于等于
//>=大于等于
//编程风格和编码规范 追求  让别人看得懂的代码
//运算符右边空一格 缩进四个空格 换行 对齐 软件格式化 代码


//逻辑操作 与 或 非(取反)
if (用户名存在&&密码验证成功){
    登录成功
}else{
    登录失败
}
//注意 比较运算和逻辑操作的结果都是bool（布尔值） 结果是true和false
//非
!(1==1) 结果是false//(1==1是成立的,非是取反，因此false) !优先级比较低


//函数返回值
//1.函数不仅可以合并操作重复性的代码，2.还可以通过计算得到一个结果，结果就是返回值
//函数可以有返回值，也可以没有返回值
//返回值的意思是函数调用的结果是一个值，可以被赋值给变量
//函数调用得到的结果 就是函数的返回值
//ex 定义一个函数add ,接受 a b两个参数
var log = function() {
    console.log.apply(console,arguments);
}
var add = function(a,b){
    //用return语句来得到一个返回值
    //函数执行到return的时候 就结束了
    return a + b//调用函数，通过return得到结果，结果就是一个数值
}
log('add函数的返回值',add(1,2))
var number = add(1,3)//返回值的意思是函数调用的结果是一个值(也即add(1,3)是一个数值，也就是函数的返回值)，可以被赋值给变量;
//若不加var，则会定义一个全局变量，如果在一个函数里定义一个全局变量，那么它在函数外面的所有地方都能访问到;需要尽量避免
log('add函数的返回值number',number)
//运行结果 add函数的返回值 3
//add函数的返回值number 4

//使用函数来求绝对值
var log = function() {
    console.log.apply(console,arguments);
}
var abs = function(n) {
    if(n<0) {
        n = -n;
    }
    return n;
}
log(abs(0));//调用abs(0)得到值0
log(abs(-8));//调用函数abs(8)得到值8
log(abs(3));//调用函数abs(3)得到值3
//运行结果 0 8 3

//函数执行遇到return 就结束了
var log = function() {
    console.log.apply(console,arguments);
}
var minus = function(a,b){
    return a - b
    log('这一句是不会被执行的，因为return的时候函数就留结束了')
}
minus()
//返回值是一个NaN
minus(1,2)
//运行结果 -1

//ex  使用函数检查一个数字是否为奇数
var isOdd = function(n) {
    if(n%2!=0){
        return true
    }else{
        return false
    }
}
log(isOdd(1))
log(isOdd(2))
log(isOdd(3))
//输出结果 true false true

//练习，实现isEven函数，偶数返回True，奇数返回False
var log = function() {
    console.log.apply(console,arguments);
}

var isEven = function(n) {
    if(n%2===0){
        return true
    }else{
        return false
    }
}
log(isEven(1))
log(isEven(2))
log(isEven(3))
//返回结果false true false
//注意比较运算里相等是 ===

//返回两个参数中较小的一个
var min = function(a,b){
    if (a<b){
        return a
    }else{
        return b
    }
}
log(min(1,2))
log(min(-10,-15))





//标准库
//库 是一个编程术语  意思是一系列函数的集合
//（求绝对值的函数，可以自己写，也可以用库，库别人写好的函数集合直接给你用）
//标准库 也是一个术语  指的是语言自带的库 每个人拿到语言就可以使用这个标准库
//JS文档（以MDN为例，MDN JavaScript，standard objects,函数用法得看文档）
//我们可以用标准库实现很多功能
//例如，标准数学库可以这样用
//得到一个随机小数（0-1之间）
Math.random()
//求正弦  弧度 角度
Math.sin(3.14/180*30)
Math.sin(Math.PI/180*30)//PI是一个无理数，计算机存储数据的元器件容量是有限的，因此PI只能是一个近似数据
//伪随机数，非天然随机，是算出来的随机，符合随机的性质，但来源不是随机的


//css的使用
内联（inline style attribute) <h1 style=..>
<head>标签内的<style>标签
<link>标签中的外联

//三种主要的选择器
元素选择器
id选择器
class选择器

样式的优先级（从高到低）
！important
内联式
<style>中的样式
link中的样式

选择器优先级（从高到低）
！important
内联样式
id选择器
class选择器
元素选择器

盒模型
内容
padding
border
margin

元素定位position
static relative absolute fixed
非static元素可以用top left bottom right属性来设置坐标
relative是相对定位；本来属于你的位置还存在，现在相对于本来的位置进行一些位移；E=MC2 —— E=MC²（relative,top为负，font-size 变小）
该属于relative原来的位置，还是它的，只是显示到别的地方去了
absolute完全绝对定位，忽略其他所有东西，往上浮动到非static的元素；别人看不到它，它自己来；会随页面滚动
fixed 基于window的绝对定位，不随页面滚动改变

dispaly属性
block inline inline-block
