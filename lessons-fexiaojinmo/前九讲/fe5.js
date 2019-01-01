//break 语句
//continue语句
//object(对象)
//递归

var log = function(){
    console.log.apply(console,arguments);
}

var n = 1
var sum = 0
while(n <= 100) {
    if(n % 2 == 1){
        sum = sum + n
    }
    n++
}
log('1 到 100 的奇数和是',sum)
//2500

var n = 1
var sum = 0
while( n<= 100) {
    if(n % 2 == 0){
        sum = sum +  n
    }
    n++
}
log(sum)
//2550

//break语句 可以终止循环
var i = 0
while(i < 10) {
    log('while 中的 break 语句')
    // break 语句执行后，循环就结束了
    break
    // 因此 i += 1 这一句是不会被执行的
    i += 1;
}

log('break 结束的 i 值',i)

// continue 语句可以跳过单次循环
var i = 0
while(i < 10) {
    i += 1
    if(i % 2 == 0){
        break
        //打断后，循环就没了
    }
    log('while 中的 continue 语句',i)
}
//运行结果

var i = 0
while(i < 10) {
    // 一定要记住改变循环条件， 否则会无限循环
    i += 1
    // 如果 i 是偶数， 则 continue 跳过这次循环
    if(i % 2 == 0){
        continue
        //打断后，跳过，重新执行循环
    }
    log('while 中的 continue 语句',i)
}
/*运行结果
while 中的 continue 语句 1
while 中的 continue 语句 3
while 中的 continue 语句 5
while 中的 continue 语句 7
while 中的 continue 语句 9
*/
//只有1 3 5 7 9 被 log 出来了
//因为 i 是偶数的时候， 循环体中剩下的部分被跳过了

object 对象 尤其重要！！！
// object  对象是一个非常重要的存储数据的类型
// object 和 array 是最重要的两个存储数据的工具
//
// array 通过数字下标来访问元素
// object 通过 key(键) 来访问元素

//数组存储信息，有缺陷 ，当增加或减少 信息时，顺序会变化； 指代不明确，不能快速知道 array[n] 具体是什么属性
var info = ['gua', 24, 174, 90]
// 中括号 字符串 数值

//对象存储信息 ，好用
// 花括号 创建一个对象{}
//JS 对象也被称为 字典
//字典(后台JAVA PHP 它们不一定了解JS的对象，但说字典就明白了)
//字典的值是成对出现的，由冒号分开
//左边的是 key(键)， 几乎所有情况下，都是字符串， 这也是它的主要用途
var taoer = {
    //key: value
    'name': 'gua',
    'age': 24,
    'height': 174,
    'score': 90,
}

log('object', taoer)

//增添一组 key 和 value
taoer['a b c'] = 1
log(taoer)
//运行结果
{name: "gua", age: 24, height: 174, score: 90, a b c: 1}

//访问(读取/使用) object 中的元素
//通过 [] 语法可以用 key 得到 value
log(taoer['name'])

//还可以用  点语法  来访问元素
//有限制
log(taoer.name)
//运行结果 'gua'
log(taoer.a b c)
//错误 ，因为有 空格 不能用这种方法访问
log(taoer['a b c'])
//运行结果 1


var k = 'name';
log(taoer[k])
//运行结果 gua

log(taoer.k)
//运行结果 undefined  把k当做了字符串 而不是 变量 ，因此访问不到（因为 taoer  里没有 k 这个value)

//增加 修改 object 中的元素
//
//创建一个新的对象来使用
//注意  对象的 key 可以省略引号

var gua = {
    name: 'xiaogua',
    height: 169,
}

// 增加一个元素
gua['sex'] = '男'
log('object增加', gua)
log('object增加', gua['sex'])

gua.score = 100
//点语法也能增加 一个key
//log(gua)  运行结果
//{name: "xiaogua", height: 169, sex: "男", score: 100}

//修改一个元素
gua.name = 'gua'

//删除元素
delete gua.sex
//运行结果 {name: "gua", height: 169, score: 100}

//对象的属性可以是一个函数
gua.hello = function(){
    log('hello gua')
}
//运行结果 {name: "gua", height: 169, score: 100, hello: ƒ}
//注意 其中 hello: f()
//可以调用这个函数
gua.hello()
//运行结果  hello gua
gua.hello
//运行结果
ƒ (){
    log('hello gua')
}
