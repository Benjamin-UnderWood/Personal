// for in
// for(key in akeys)
// for-in 语句是一种精准的迭代语句，可以用来 枚举 对象的属性
// for (property in expression) statement

// —— 事件处理函数
// 在特定事件发生时调用特定的js代码
// 用来处理响应的一个机制
// 响应来自于 用户(点击、鼠标移动等) 与 浏览器(文件下载完了、图片加载好了等)
// onclick 点击某链接触发动作(里面有一个叫 return false 的函数，用于阻止浏览器默认行为发生)
// blur 失去焦点 (一个页面中只有一个焦点，可以用tab键切换);blur 要委托,得加 true(addEventListener的第三个参数)；--------------------
// focus 让元素拥有焦点;可以交互的东西可以有焦点
// event 有很多属性，浏览器提供
// KeyboardEvent {isTrusted: true, key: "Enter", code: "Enter", location: 0, ctrlKey: false, …} an>​
// MouseEvent {isTrusted: true, screenX: 40, screenY: 134, clientX: 40, clientY: 43, …}
// 主要用到的就是 event 的 target属性
// 阻止 行为的 默认事件 发生  preventDefault
// element.addEventListener('keydown',function(){event.preventDefault()})
// 对比于 onclick 的 return false; onclick 是 标签的一个属

// —— DOM
// 属性: 标签名 tagName 大写
// 获得特定属性
// 操作属性的时候, 必须所选对象已经是存在的 (坑)
// .getAttribute('property')
// .attribute('property')
// element.property

// 获得元素
// document.getElementById('id')
// document.elementById('id')

// 操作元素 (创建，删除，修改)
// 创建元素
// document.createElement
// 父元素
// element.parentElement
// 子元素
// element.parentElement.children
// 添加元素
// 父元素.appendChild('子元素')
// 删除元素
// 父元素.removeChild('子元素')
// 子元素.parentElement.removeChild('子元素')
// 子元素.remove();
// element.childNodes 得到包含父级元素的全部子元素的数组
// childNodes 属性
// 在已有元素前插入一个新元素
// parentElement.insertBefore(newELement, targetElement);
// insertAfter 函数,在现有元素后插入一个新元素
function insertAfter(newElement, targetElement) {

    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }

}

// —— HTML-DOM
// innerText 直接获取元素节点所包含的 文本;只获得文本
// innerHTML 设置父节点的值(粗糙) 文本、标签不分开； 插入内容成段，插入一段html；替换，无序
// innerHTML 会把原有的值给替换掉;且 只能 element.innerHTML = '';它不是一个函数

// nodeValue 获取文本; 需要深入到文本节点那一层;(p元素本身的nodeValue属性是一个空值);
// innerText 获取文本作用于包含文本的元素节点;
// nodeValue DOM提供,用来得到（和设置）一个节点的值;（不仅仅是文本）含空格
// innerText 仅仅打印元素节点所包含的纯文本信息; 不含空格

// 插入元素
// 父元素.insertAdjacentHTML('afterend',插入内容)  插入内容成段,插入一段html 常用
// 位置有四种 beforebegin,afterend,afterbegin,beforeend;
// document.title 修改页面的title(浏览器提供的API)
// window.location.href 查看当前在哪；网址

// classList 得到class数组
// element.classList.add('class'); 给元素增加一个class
// element.classList.remove('class'); 给元素移除一个class
// 将共同拥有某个类的一些元素 移除 这个类
var clearActive = function() {

    var hasclass = document.querySelectorAll('.class');
    if (hasclass) {
        hasclass.classList.remove('class');
    }

};
// className 属性，
// element.className 得到元素的class 属性
// element.className = value; ex 'inreo' 设置(替换)一个元素的 class 属性
// element.className += ' intro' 追加class属性; 字符前空格
function addClass(element,value) {

    if(!element.className) {
        element.className = value;
    } else { // 追加
        element.className = element.className + ' ' + value;
    }

}

// —— .classList.toggle 方法
// mask.classList.toggle('mask-active'); 有'mask-active'类删除, 没有就加上
// 自定义函数
var toggleClass = function(element, className) {

    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }

};

// 追加指定元素节点的下一个元素节点的类
function styleElementSiblings(tag, theclass) {

    var elems = document.getElementsByTagName(tag);
    var elem;
    for (var i = 0; i < elems.length; i++) {
        elem = getNextElement(elems[i].nextSibling);
        addClass(elem, theclass)
    }

}

// —— window 方法
// window.prompt() 弹出框，输入什么，就会在控制台打出什么
// $0在控制台输入$0可以选择到当前选中的元素
// localStorage 浏览器提供的存储功能 用来存储字符串数据
// localStorage.name = 'gua' 存储
// localStorage.name 访问
// localStorage.removeItem('name') 删除
// 大小限制 5M;每个网页 5M

var s = JSON.stringify([1, 2, 3]);
localStorage.a = s;
// 运行
console.log(localStorage.a); // "[1,2,3]"

var s1 = JSON.stringify([1, 2, 3]);
localStorage.setItem(a1, s1);
// 运行
localStorage.getItem(a1); // "[1,2,3]"
localStorage.removeItem('a1'); //移除要带引号
console.log(localStorage.a1); // undefined

// 不是所有属性都有 HTML-DOM
// current_link.getAttribute('accesskey') 正确；
// current_link.accesskey 错误；(坑)
// 各节点之间的关系信息 家族树
// parentNode、nextSibling(下一个兄弟元素节点)、previousSibling、childNodes、firstChild 和 lastChild
// 元素本身的信息
// nodeType(数字) nodeName(标签) p...属性
// style 属性
// element.style.property 可以是color等，但不能是 font-family (加减号是保留字符) fontFamily

// window BOM
// 在页面加载时调用的函数
// HTML 文档全部加载完毕时，会触发一个事件
// 当文档被加载到浏览器窗口里，document 对象又是 window 对象的一个属性
// 当window对象触发 onload 事件时，document对象已经存在；此时 DOM 模型完整，各DOM方法正常工作
//
// window.onload onload事件处理函数
// window.onload = func; 将函数添加到 onload事件
function addLoadEvent(func) {

    var oldonload = window.onload;
    if (typeof window.onload !== 'function'){
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }

}
// window.open(url, windowName, [windowFeatures]) 打开新窗口
// window.open(winURL, '_blank') 打开新标签

// —— 绑定事件
// Object.addEventListener('click',func(){})
// 还有一个 第三个参数 useCapture; 决定什么阶段处理事件; 默认是false(冒泡)
// 冒泡 微软公司; 事件捕获 网景公司
// 一个事件的传递过程包含三个阶段: 捕获阶段,目标阶段,冒泡阶段;
// 鼠标点击的节点, 是目标阶段; 若有事件处理程序, 则执行该程序, 这里不论 useCapture 为true还是false
// 正常情况 从外往里传，走到最里，再从里往外传(先 capture 再 冒泡)；capture阶段，true，则执行；冒泡，false则执行
// 某个响应 在第一个阶段处理事件，还是第二阶段处理事件，就是 false 和 true 来决定的；
// 阻止冒泡 点id3,就希望这个 click 事件只有 id3 才有,不再冒泡一层一层往外传
// Object.addEventListener('click',func(event){event.cancelBubble = true;})
// 在冒泡阶段，如果不希望事件继续往上传播，例如，冒泡的p的时候就停止传播，
// 那么，可以在p的事件回调函数里面这么写：
function onClickFn (event) {
    // code here
    event.stopPropagation();
}

// —— 冒泡路径 从里往外 一层一层传递
// path:Array(8)
// 0:button.todo-done
// 1:div.todo-cell.done
// 2:div#id-div-container
// 3:div.main
// 4:body
// 5:html
// 6:document
// 7:Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}

// target:button.todo-done

// —— 关键字
// this 关键字: 这个对象('指自己')
// typeof 关键字: 验证操作符时一个字符串、数值、函数、布尔值还是对象

// —— 保留字
// 以后可能成为关键字
// new实际不需要, 造JS造出来的
// while
// if
// for

// —— 操作符
// new
// var d = new Date()

// —— 通配符
// 获取某对象(父级元素)包含多少元素节点 '*'
// element.getElementsByTagName('*').length;

// —— 模板字符串又称多行字符串; 使用反引号
let a = `
	i
	am
	good`;

// —— 转义符 \
// '\n' 回车符 '\t' Tab键;'\\'反斜杠; 长度算一个键 '\t\n\n\n\t'.length 5; 每个字符占1bit
// tab键显示很宽但仍只占一个字符

// —— 下一个节点 与 下一个元素节点 (坑)
// element.nextSibling 下一个节点
// 找到元素节点调用自身(找到为止，要是没有就null)
function getNextElement(node) {

    if(node.nodeType === 1) { // 1为元素节点
        return node;
    }

    if (node.nextSibling) {
        return getNextElement(node.nextSibling); // 递归
    }

    return null;
}

// —— 元素 标签
// 元素的属性 contenteditable='true'
// <span contenteditable='true'>${td}</span> 代表内容可以编辑
// 以前只有input元素可以编辑, 现在任何一个元素都可以通过这种方式进行编辑

// ——API
// 应用编程接口
// 电饭煲的按钮；提供按钮，让你和它交互

// —— Cookie
// JavaScript利用Cookie保存页面状态信息

// —— jQuery
// 1.选择器
// .querySelector('') 可选择 id '#id'; class '.class'; <p> 元素(标签) 'p'  css高级选择器
// 2.查询具体的属性是否存在
// element.hasAttribute('')
// element.hasAttributes() // 查询元素是否有属性
// 3.删除某个属性
// element.removeAttribute('')
// 4.获得所有属性 (区别于获得特定属性)
var attributes = element.attributes;
// 简便选择器
// var $ = jQuery；
// 载入 jquery
// <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>

// —— 编译指示
// use strict 脚本启用 严格模式

// —— 图片 Web 格式，小

// —— apply(), call()

// —— 标准库; [native code] 控制台里函数体看不到, C++写的，浏览器帮你实现的
// —— toLowerCase() 转化成小写
// —— replace
// javascript的replace函数在替换数据时, 默认只替换第一个。
// 如果在替换的时候加上; / 替换内容 /g 就能实现全部替换 正则
// string.replace(' ', '') // 后者替代前者把字符串中的空字符 删掉
// var a = 'a b c d';
// a.replace(' ', ''); // 运行结果"ab c d"只替换第一个
// 'a b c d'.replace(/ /g, ''); // 运算结果"abcd"全局替换

// —— String
// String() 可以把任何东西转化为字符串, 对数组也行

// 给字符串穿衣服
// var i = '2 '
// console.log(`(${i})`) // 运行结果 (2 ) 看出它有空格了

// 上面两种方法有时候, 用于输出更好, 有时候String在实际开发中有很多问题

// var todos = ['吃饭', '喝水', '上课']
// String(todos)
// 运行结果 "吃饭,喝水,上课"
// var todos = ['吃,饭', '喝,水', '上,课']--------------------------------------------------------------------------------
// String(todos)
// 运行结果 "吃,饭,喝,水,上,课"
// 上述这种情况就无法还原回数组了; 有缺陷; 应该用序列化与反序列化

// —— localStorage
// —— 序列化与反序列化; 把数据存到硬盘中, 防止程序挂掉, 数据丢失. 硬盘断电保持数据
// 存储数据的过程叫做 持久化
// 存储的时候把 array 转化为字符串
// 读取的时候把字符串转化为 array
var s2 = JSON.stringify([1,2,3,4]);
log('序列化后的字符串', typeof s2, s2); // 运行结果: 序列化后的字符串 string [1,2,3,4]
var a2 = JSON.parse(s2)
log('反序列化后的字符串', typeof a2, a2); // 运行结果: 反序列化后的字符串 object (4) [1, 2, 3, 4]

var s3 = JSON.stringify(['吃,饭', '喝,水', '上,课']);
log(s3); // 运行结果："["吃,饭","喝,水","上,课"]" // 完美保存原来的格式
JSON.parse(s3); // 运行结果 (3) ["吃,饭", "喝,水", "上,课"]

// JSON.stringify({'name': 'gua["gua"]'}) 只有遇到双引号,才会特殊.要转义
// 运行结果 "{"name":"gua[\"gua\"]"}"
// JSON 双引号
// 传递数据的标准格式JSON; 以前是XML标签的方式来存储传递数据
// 页面上的数据，转化成 JSON; 传到服务器, 服务器再把JSON格式解析成自己语言(后台语言)所需的格式
// 同一种东西，在不同语言里的格式不一样

// —— bug
// 很多情况下报 Unexpected token u in JSON at position 0 错误，是因为JSON.parse 解析的数据为undefined

// —— Number
// 把字符串转化成数字

// [1,2,3].map(String) // ["1", "2", "3"]

// —— segmentcontrol
// 同时只能选中一个

// —— 时间
// setTimeout函数
// 经过多长时间后才开始执行第一个参数所给出的函数
// setTimeout('function', interval) 函数名 + 毫秒单位的时间间隔
// clearTimeout 函数取消'等待执行'队列里的某个函数; 必须把setTimeout函数的返回值赋值给一个变量
var variable = setTimeout(fn, interval);
clearTimeout(variable);

var variable1 = setInterval(fn, interval); // 每隔多少秒执行函数
clearInterval(variable1); // 清除

// 获得当前日期
var currentTime = function() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    return `${month}/${date} ${hours}:${minutes}:${seconds}`;
};

// 时间不足 10 位补 0方案
(function() {

    // 创建补0函数
    function addZero(s) {
        return s < 10 ? '0' + s: s;
    }

    //创建、格式化时间函数
    var younger_time = function(time) {

        time = new Date(time);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();

        //写入时间格式为 xxxx-xx-xx
        document.getElementById("div_ID").innerHTML = year + '-' + addZero(month) + '-' + addZero(day);

    };

	//服务器时间（毫秒为单位）
    younger_time(ServerTime * 1000);

})();

// 获取时间戳 精确到秒
var timestamp1 = Date.parse(new Date());

// 方法二 精确到毫秒
var timestamp2 = (new Date()).valueOf();
var timestamp3 = new Date().getTime();

// 时间戳转化为时间
function timetrans(date){

    date = new Date(date); // (date*1000); 如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());

    return Y+M+D+h+m+s;

}

// —— 数组
// push 往数组后添加一个元素
// split 字符串生成数组
// 把一个字符串分成两或多部分
var array = string.split(character); // 根据分隔符把一个字符串分为两或多部分的一种便捷方式

var href = '#domsters';
href.split('#'); // ["", "domsters"]

var c = '123';
c.split('2'); // ["1", "3"]

// 根据空格将字符串转成数组
// —— join
const aa = 'hello';
const bb = 'world';
const cc = '!';
console.log([aa, bb, cc].join(' ')); // "hello world !" 之间都空一下
console.log([aa, bb, cc].join('')); // 相当于字符串拼接

aa.split('').reverse().join(''); //字符串转数组，倒序，数组再转回字符串

// splice(a,b) 从数组某个元素起增删多少个元素;
// —— splice 增 删 元素
// var nums = [1,2,3,4,5,6]
// nums.splice(3,0,1,0,2);
// nums //运行结果 [1, 2, 3, 1, 0, 2, 4, 5, 6]

// var nums = [1,3]
// nums.splice(2,0,1,0,2);
// nums // 运行结果 [1, 3, 1, 0, 2]

//删除元素
// var nums = [1,2,3,4,5,6]
// nums.splice(2,3);
// nums // 运行结果  [1, 2, 6]

// var nums = [1,2]
// nums.splice(1,1)
// nums.splice(1,2) 多删除了也没用
// nums 运行结果 [1]

// —— array 方法
// slice  切片工具
// splice
// .includes 数组 字符串 包含
var aaa = [1,2,3];
aaa.includes(1); // 运行结果 true
var aaaa = '123';
aaaa.includes('1'); // 运行结果true

// .contains 元素是否包含某个类
element.classList.contains('classvalue');

// delete arr[i] 只删除值, 但数组长度不变, 原来数组的索引也保持不变, 此时 arr[i] 变成 undefined
// arr.splice(i, 1) 这种方式数组长度相应改变,但是原来的数组索引也相应改变 (坑)
var ary = ['a','b','c'];
ary.splice(1, 1, 'd', 'e'); // d,e两个元素就被加入数组arr
console.log(ary); // ["a", "d", "e", "c"]

// —— 字符串转化为 数值
parseInt('39 steps'); // 转化为 39
parseFloat(string); // 浮点数

// 当把一个数组赋给另一个数组时, 只是为另一个数组增加了一个新的引用. 当通过原引用修改数组的值时，另外一个引用也会感知到这个变化.
// 即新数组仍旧指向原来的数组.(坑)
var numbers = [];
for( var ii=0; ii<100; ii++ ){
	numbers[ii]= ii + 1;
}

var sameNumbers = numbers; // 引用
numbers[0] = 400;
console.log(sameNumbers[0]); // 400

// —— 深度复制
// 对一个数组的某个值改变, 不会影响复制的数组的值;
function copy(arr1,arr2) {

    for (var i = 0; i < array.length; i++) {
        arr2[i] = arr1[i];
    }

}

// 创建 新数组
var nums =[];
for(var i=0;i<100;i++ ){
    nums[i]= i+1;
}

var samenums =[];
// 深度复制 数组
copy(nums,samenums);

nums[0]=400;
console.log(samenums[0]); // 1

// —— shift 注意最后一位的处理
// 循环数组的偏移可归纳为与一个循环的长度去找关系
var nextIndex = ( curentIndex + shift ) % length;

// —— 函数 与 函数调用
// Math.floor 是一个函数；Math.floor() 是函数调用之后的一个值，不是一个函数

// —— Math 方法
// Math.sqrt(c) 开平方
// Math.ceil(number)  可以返回一个不小于number的值的一个整数
// Math.floor(number)  可以返回一个不大于number的值的一个整数
// Math.round(number) 任意浮点数 舍入为与之最接近的整数

// —— 高阶函数 (抽象)
// 函数可以作为参数 传递; 灵活性，舒适度佳
// 把array中的每个元素都用processor函数处理并返回一个新的 list; 不用每个元素都写一遍运算过程
// 出入数组, 函数两个变量; 函数可以是自定义的, 也可以是自带的
 var process = function(ary, processor) {

     var newAry = [];
     for (var i = 0; i < ary.length; i++) {
         var a = ary[i];
         // processor调用成功, 要不然这里就没法继续
         var element = processor(a);
	     newAry.push(element)
     }

     return newAry;

 };

// 过滤器 按条件过滤 元素
 var filter = function(ary, processor) {

     var newAry = [];
     for (var i = 0; i < ary.length; i++) {
         var a = ary[i];
         // 此处 processor函数能返回一个布尔值
         var isTrue = processor(a);
         if(isTrue) {
	         newAry.push(a);
         }
     }

     return newAry;

 };

//  —— 函数调用
//  实参数大于形参，超出的参数，不会配给形参的名称
//  形参数大于实参，没有对应实参的形参会被赋值为 undefined
//  所有函数调用都会传递两个隐式参数: arguments 和 this
//  arguments 参数，类数组结构 (可使用length，下标)
//  this参数，适合称作调用上下文

// each jQuery 提供遍历数组 的方法
//  each 是一方法(函数), 迭代器；我们不知道它有什么 参数; 就用arguments去查看
var $tdCell = $('.td-cell');
$tdCell.each(function() {
	console.log(arguments);
});
// 运行结果 [0, div.td-cell] [1, div.td-cell] // 数组中第一个为index, 第二个为element

// 分析得到它有两个参数index和element(注意 本质上函数的参数写不写都不重要;参数只是一种属性,重要的是函数值;而且arguments里面包含参数的信息了)
$tdCell.each(function(i, e) {
    console.log(i, e);
});

// data-* 浏览器提供的特殊功能, 给任何标签挂上自定义数据, 都用data-名字的方式
// ex data-id自己创建一个属性来存数据
// 如何取这些自定义数据

// DOM API 得到 data; 通过 dataset 方法
// html <div class="td-cell" data-id="401">
// $('.td-cell')[0].dataset.id 运行结果"401", 是个string

// jQuery API得到data; 通过data方法
// $($('.td-cell')[0]).data('id') 运行结果 401, 是个数字

// —— JavaScript没有重载

//  —— 递归
//  简言之，就是一个函数调用本身或者两个函数之间相互调用
// 终止条件
// 阶乘 n! = n * (n-1)!
// 当 n = 0, 阶乘为1;
 var fac = function(n) {

     if (n === 0) {
         return 1;
     } else {
         return n * fac(n - 1); // 递归
     }

 };

// 把当前状态保存下来，进行下一次调用，
// 当那个函数(后面的函数)返回之后, 才进行当前的函数

// 斐波那契数列
// —— debug log函数
var log = function() {
    console.log.apply(console, arguments);
};

// —— 回调函数

// —— 测试函数
// 单元测试，给每个单元写测试，出了问题好找
// 写测试可以促进你思考, 没思考到的方面
var ensure = function(condition, message) {
    if(!condition){
        console.log('测试失败', message);
    }
};

// 加强版 测试  可以看到 两个字 分别是 什么
function ensureEqual(a, b, message) {
    if (a !== b) {
        log(`***测试失败, ${a} 不等于 ${b}, ${message}`);
    }
}

// 考虑 a 与 b 是否相等
// var a = [1,2,"3"]
// var b = [1,2,"3"]
// a == b // 运行结果 false

// String(a) == String(b) // 运行结果 true
// String(a) // 运行结果 "1,2,3" 不能区别 3 是字符串 还是数值

// JSON.stringify(a) // 运行结果 "[1,2,"3"]"
// JSON.stringify(b) // 运行结果 "[1,2,"3"]"
// 这种方式把类型也保存下来了, 用于增强版的 ensure 测试函数

// —— 主函数
// 其他编程语言有主函数概念, 先执行主函数, 但JS并没有, 我们需要自己设置一个主函数
// var __main = function() {}

// —— Object 对象
// 存储数据的类型(还有一个array);被称为字典; 数据结构的一种哈希表(字典); 散列
// 键值对(值可以是任意类型); 增删不影响其他; 用字符串来存储数据
// 数组存在对应不清晰的问题, 增或删某条内容, 会引起其他内容的顺序变化
// 花括号创建对象; 点语法访问/中括号访问; 当key被赋给一个变量时, 不能用点语法(会误认为属性)!!!
var taoer = {
    name : 'gau',
    height: 174,
};

// 声明变量 并赋值
var lennon = {};
lennon.name = 'Jhon';
lennon.year = 1940;
lennon.living = false;
// 简洁语法
var lennon1 = {
    name : 'Jhon',
    year : 1940,
    living: false
};

// 删除对象的数据; 删除是一个特殊的语法(会有坑)
// delete lennon.name
// delete todoList[index]; 删掉元素的值, 但留下 undefined
// 应该用 splice 删除
// todoList.splice(index, 1) 得到的是删除项 注意

// —— 对象 类
// 对象就是类，类就是对象
// 类是面向对象编程模式的创建对象的一个概念

// —— 使用对象进行查找值
// 对象和字典一样，可以用来存储键/值对. 如果你的数据跟对象一样, 你可以用对象来查找你想要的值, 而不是使用switch或if/else语句
var formated_weekday = function(day) {

    // day 是代表星期的数字，从周一开始分别是 1 2 3 4 5 6 7
    // 返回 '星期一' '星期二' 这样的描述字符串
    var weekdayMap = {
        '1': "星期一",
        '2': "星期二",
        '3': "星期三",
        '4': "星期四",
        '5': "星期五",
        '6': "星期六",
        '7': "星期日",
        '':  "undefined",
    };
    var key = String(day);

    return weekdayMap[key]; // 这种方式叫打表; 表驱动法

};

formated_weekday(3); // "星期三"

function valueForKey(object, key, defaultValue) {

    var value = object[key];
    if (value === undefined) {
        value = defaultValue;
    }

    return value;

}

var discount = function(price, grade) {

    var priceMap = {
        'xiaoxue': 0.5,
        'chuzhong': 0.6,
        'gaozhong': 0.7,
        'daxue': 0.8,
        'yanjiu': 0.9
    };
    var dis = valueForKey(priceMap, grade, 1);

    return price * dis;

};

// —— 枚举
// JavaScript 没有枚举
// 比如, 实际并没有
// 用object去模仿枚举的功能; 定义数据格式
var EventType = {
    blur: 'blur',
    click: 'click',
};
// 用的时候 EventType.blur  EventType.click
// 这样输入时, 有补全(基于语法的补全), 可以被程序提示, 不容易出错, 可以自定义; 其他语言由枚举

// —— isPrototypeOf
// duck自Bird构造函数继承其prototype. 你可以使用isPrototypeOf方法显示此关系：
// Bird.prototype.isPrototypeOf(duck); // true

// —— hasOwnProperty
function Bird(name) {
    this.name = name; // own property
}
Bird.prototype.numLegs = 2; // prototype property

var duck = new Bird("Donald");
duck.hasOwnProperty('name'); // true 实例自己的属性

// 迭代 own property 和 prototype property
for (let property in duck) {

      if(duck.hasOwnProperty(property)) {
		ownProps.push(property);
      } else {
		prototypeProps.push(property);
      }

}

// ——instanceof
// 任何时候, 一个构造函数创建一个新的对象, 该对象会被认为是它的构造函数的一个instance
function Bird1() {

	this.name = "Albert";
	this.color = "blue";
	this.numLegs = 2; //"this"在构造函数内总是引用正在创建的对象

}

var crow = new Bird1("Alexis", "black");
console.log(crow instanceof Bird1); // => true

var dog1 = Object.create(Bird1);
console.log(dog1.__proto__ === Bird1); // true
console.log(dog1 instanceof Bird.constructor); // true;

function Animal2(){}
console.log(Animal2.constructor === Function); // true

// ——constructor
// constructor属性是对创建实例的构造函数的引用
// 用 constructor 找出它是什么对象
function joinBirdFraternity(candidate) {

	// if (candidate.constructor === Bird) { // if statement can be simplified
	// 	return true;
	// } else {
	// 	return false;
	// }

	return candidate.constructor === Bird;
}

// 由于constructor属性可以被覆盖（这将在接下来的两个挑战中讨论），
// 因此通常最好是使用instanceof 方法来检查对象类型。

// ex 实例的constructor和对象原型的constructor是同一个
	function Test(){}
	Test.prototype.constructor; // ƒ Test(){}
	// var test = new Test()​;
	test.constructor; // ƒ Test(){}
	console.log(Test.prototype.constructor === test.constructor ); // true

// ——继承
function Animal() {}
Animal.prototype = {

	constructor: Animal,
	describe: function() {
	     console.log("我的名字是" + this.name);
	}

};

var dog = Object.create(Animal.prototype);
dog.name = 'Alien';
dog.describe(); // 我的名字是Alien

// 原型继承与Mixin继承
// 原型
var Dog = function(obj) {
    this.feet = 4;
};

var along = new Dog();
console.log(along.feet); //4

// Mixin 其实就是个函数; 我们自己也可以实现, 不叫这个么名字
var feetMixin = function(obj) {
    obj.feet = 4;
};

var along1 = {};
feetMixin(along1);
console.log(along1.feet); //4

// —— Object.keys ???

// —— null
// null 代表不存在；

// —— 全局变量
// 隐式声明的全局变量, 可以被删除
// x = 42;
// 显示声明的全局变量, 不能被删除, 该属性不可配置
// var x = 42;

// 《代码大全》
// —— 变量命名
// 长时间使用的变量尽量详细点, 在函数内部的最顶层
// 临时用的, 可以简短点(首字母), 在函数的for里面等

// —— 函数名命名
// toggleClass 动词 + 名词; 函数的目的不是为了得到一个值, 而是一个 动作; 执行动作
// indexOfElement 名词; 函数的目的是为了返回值; 返回数据

// —— 标注
// /* */ 标注会有bug   /* /* */*/ 标注套'标注' 就会有问题(坑)

// —— jQurey
// jQuery 选择器, 无论如何选出来都是一个数组, 哪怕选出来什么都没有也是一个数组
// 其实不是数组, 是jquery对象
// 选一个没有的东西, 结果会出现 []  (注意)

// —— Ajax
// —— encodeURIComponent // 将目标值编码成URL安全的字符串, 会把有歧义的字符转成对应的ASCII编码
