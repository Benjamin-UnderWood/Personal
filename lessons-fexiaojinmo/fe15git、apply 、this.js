// 此为第 15 课的上课内容
//
// 今天上课的主要内容有
//
// log 的要素
// git 和 github
// js 的一些高级内容 bind apply call
// 前端 CSS 框架 Bootstrap 和 Pure
//

// 第一部分 调试错误
/*
log 的要素
  1, 确保代码执行
  2, 打印所有能打印的变量
JavaScript 经常性强制转换 数据类型 最好我们还是自己确定过 类型 再往下code
log('element', element, element+1, typeof element) // length
add(element+1)
流水线  一步一步  找到出错的那一步
字符串 打印出来的 和 真实的可能不一样  有空格
给字符串穿衣服
var i = '2 '
console.log(`(${i})`) // 运行结果 (2 ) 看出它有空格了
var i = '  '
console.log(i)    // 运行结果 空的 ；看不出有没有值
console.log(`(${i})`)   // 运行结果 (  )；看出来是有值的
二分法验证错误 更高效



// 第二部分 git
git 软件 只能在终端下用的  是命令行软件
gitup desktop 图形化 软件 方便使用
存代码的文件夹  叫仓库
github 网站使用方法参考如下链接
https://www.zhihu.com/question/20070065/answer/79557687
安装 github desktop 必须使用群文件中的离线安装包
安装后必须注册 github 账号才能使用
discard changes // 更改之后 且把文件 惯例，单单在文件里没法 ctrl z，此时可以去 右键
changes, 选择 discard changes 命令，再打开文件，更改就被删除了，文件恢复我们想要的样子
完成一个函数提交一次， 确保我们每一步都是对的， 改动在哪也能知道

创建分支
树分支 你在一个分支上 做的事情 不会影响 另一个分支 不同分支之间可以合并
create new branch //创建分支后 分支的代码 独立于 master
同事1 换皮肤功能
同事2 继续开发原来的功能
同事2 ....
// 在分支上写完之后，可以将分支合并进 master，然后可以关掉分支，与比人不相互干扰

同时做程序，几十个文件不可能一个人写，(windows 五千万行代码)
一个人一辈子 500百万行代码 每多写一行垃圾代码 就少写一行好代码


// 第三部分 css框架
这是两个比较流行的 CSS 框架(别人帮你写好你直接拿来就可以用的 CSS 文件)

Bootstrap 官网如下
http://getbootstrap.com/
简易教程如下(先随便看看)
http://www.runoob.com/bootstrap/bootstrap-tutorial.html
LeetCode 纯 Bootstrap 网站


Pure 官网如下
http://purecss.io/
moz 火狐
ms 微软 -ms-text-size-adjust: 100%;
webkit  chrome 和 苹果(safair) 浏览器  -webkit-text-size-adjust: 100%; 浏览器引擎核心(内核 ) webkit
href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"  直接引用 或 下载使用
在 pure 基础上根据自己需要修改


// 第三部分 js 的一些高级内容 bind apply call
this 动态作用域的东西 如何让它变成 静态作用域

var o = {
    foo: 1,
    bar: function(){
        return this.foo
    }
}

o.bar() //运行结果 1

var a = o.bar
a()  // 运行结果 undefined  this作用域变量 找不到 this 了

// 让它 变成静态 作用域 bind
绑定 在 o 上
bind 就是把 this 绑到 它的参数上
var b = o.bar.bind(o)  此时 b 是一个函数 function(){return this.foo}
b()  //运行结果 1
o.foo = 12
b()  //运行结果 12
因为 函数的 this 被绑定到了 o 上 ，调用 b 的时候 不再是 window.b 而是 o.b





// apply  call 用来  动态  改变 this
var log = function(){
    // apply 做了两件事情, 1 是绑定 this 绑到第一个参数  console 上
    // 2 是把数组参数解开传给函数
    console.log.apply(console, arguments) //  相当于 console.log.apply(this, arguments)？？
    // 调用 log 函数, this 是 cosnole
    // arguments 是一个数组, 但是作为参数 传递给 log 函数
    log(1, 2, 3)
    arguments = [1, 2, 3]
    // console.log([1, 2, 3]) 不相当于
    // apply 把数组中的每一个元素 作为独立的参数 返给这个函数
    // console.log(1, 2, 3) 相当于

    // call 和 apply 一模一样几乎
    // 区别只在于传递参数的方式  call 参数写死
    console.log.apply(console, [1, 2, 3, 4])
    console.log.call(console, 1, 2, 3, 4)
}
*/
