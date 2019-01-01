// 此为第 6 课的上课内容
// 主要内容
// 如何在网页中引入 JavaScript
// 什么是 DOM， 常用 DOM API 使用
// 什么是事件， 如何绑定事件



// html 树根，head,body树枝，树枝又有自己的树枝
// 浏览器内部，网页被表述成为一棵树，DOM，文档对象模型


// 什么叫 DOM API 使用，别人提供给你 用来做一些事情 的方式 就叫 API
// Application Programming Interface(接口)
// 微波炉 按钮，厂商给你提供的 接口; 如果不给你提供接口，你就没法使用它
// 浏览器能让我们访问页面，修改页面，是因为浏览器给我们提供了这个功能，
// 别人提供给你的功能就叫 API
// 做一个天气预报的应用，气象网站会给你提供 API
// API 就是你用来获取它的数据，或者进行一些操作的方式
// 新浪微博程序，新浪微博 给你提供 API
// API 你和对方交互数据的方式
// DOM API 用来操作 DOM 的 API ，是一系列函数
// DOM API 是浏览器提供给 JavaScript 操作 html 页面内元素的方式
// 简而言之，浏览器提供了一些 内置函数 来让我们操作页面(增删改查)
/* 比如注册id，它要求 至少 5个字符，而你输入了 3 个字符
   在以前，你就得 先把成果提交给 服务器，然后服务器 返回结果告诉你错了
   但现在 网页内部 用 JavaScript 先验证 用户名是否合法
   免得刷新页面*/



   document.title
   // 浏览器提供给我们修改 页面 title 的 API （浏览器给我们的功能）
   // 功能怎么实现，我们不知道，我们只关心它能做什么
   window.location.href
   // 看当前在哪 可以修改它 让文件跑 其他文件夹去


   // 什么是事件， 如何绑定事件
   // 响应一个事情发生了， 叫事件， 点击按钮 事件，就执行函数，响应用户输入的方式

   // 如何在网页中使用 JavaScript 代码
   // 写在 body 后面 结束之前




// 查找元素
// 查找元素用 document.querySelector() 函数
// 1. 元素标签   2. class 选择器 按类别 3. id 选择器
// 这个函数的参数是一个选择器 （和 CSS 选择器一样）

// 元素选择器
var body = document.querySelector('body')
// class 选择器，用的是 .类名
var form = document.querySelector('.login-form')
// id 选择器， 用的是 #id
var loginButton = document.querySelector('#id-button-login')
// log 出来看看
log(body, form, loginButton)

// id 命名方式
// id = 'id-input-login' ; id-标签名-功能； id="id-input-username" "id-input-password"
// 每个标签都可以有 class 和 id 这两个属性
// class 可以重复，id 不能重复
// 如果你觉得 某个 元素不好选择，那可能需要给这个元素 加 class 或者 id
// 整个页面中一定只有一个的，一般加个 id ；如页面只有一个登陆 按钮，就id



// 获取特定属性
var user = document.querySelector('#id-input-username')
var uservalue = user.getAttribute('value')  // 得到某元素
log('user value',uservalue)
// 不存在的属性会返回 null,不存在

//修改设置属性
user.setAttribute('value','name')
user.value = 'name'

// 删除属性
user.removeAttribute('type')

// 查询属性是否存在
log(user.hasAttributes())           // true
// 查询是否有 具体的属性
log(user.hasAttribute('value'))     // true    if(document.getAttribute)

// 获得所有属性
var attributes = user.attributes
log('所有属性',attributes)




// 操作元素（创建， 删除， 修改）

// 用document.createElement 函数创建一个元素
// to do 程序，在输入框里输入  吃饭  然后 就会用 这个函数 创建 一个新的标签（吃饭）添加到页面
var button = document.createElement('button')
// 用 innerHTML 设置属性
button.innerHTML = '注册用户'
// <button>注册用户</button>  光上面这两步 还不能把创建的元素添加到 页面中(还需要appenChild)

form.insertAdjacentHTML('afterend', '<button>注册用户</button>')
// 相当于上面的两步操作 ， 但是 是一个 块元素  括号里 第一个变量 决定 在form外 前(beforebegin)
// 还是 最后form外 后（afterend) 插入新元素 （这个操作更先进，在一个父级元素外插入新子元素）
// 插入 为子元素  在子元素的最前 afterbegin(在父元素里) 和 最后  beforeend 在子元素的最后
var h1 = document.createElement('h1')
h1.innerHTML = '注册'

// 修改  appendChild

// 用 appendChild 给一个元素添加一个子元素 (把树叶放到树枝上去)
// 这里我们给 .login-form 添加 刚创建好的 按钮
var form = document.querySelector('.login-form')
form.appendChild(button)
//运行结果  页面上多了一个 注册用户 按钮

var body = document.querySelector('body')
h1.appendChild(div)
// 运行结果  页面上 body 树枝上 多了一个 注册  h1 标题

// 删除元素 removeChild
var pwd = document.querySelector('#id-input-password')
form.removeChild(pwd)
pwd.parentElement.removeChild(pwd) // 找到父元素 再删除自己
pwd.remove() // 删除自己
// 相当于
// 运行结果 删除了页面上的密码框
// 只有父节点能删除元素


// 比较
document.getElementById()
document.getElementsByTagName()
document.getElementsByClass()
// 不方便  函数太多
document.querySelector()  // 根据 元素名 id 和 class  三种东西 一个函数（CSS 选择器可以组合）

// 这简便的方法是 jQuery 造出来的

var $ = jQuery
jQuery('.login-form')// 可以简化为 以下
$('.login-form')
// 相当于这么长 var form = document.querySelector('.login-form') 这么长一串
/* var $ = function(selector) {
    return  document.querySelector(selector)
}*/
// 可以自己进行封装



// 任何语言 的 核心知识 可能只有 10%，常用的可能就只有 20% ，有 80% 几乎用不着
// 没有太纠结 抠细节
// 解决问题  思路清晰  结构合理  就是好的程序
// 优秀把最重要的东西 掌握了   (先学最有用的，整体的收益是最高的)
// 学习 必须需要 一个 好的反馈  精神状态
// 信念，做一件事情，会得到好的回报的
// String(1) = '1' 把数字转成字符创的方式 有100种 ，我们只需了解最常用的一种
