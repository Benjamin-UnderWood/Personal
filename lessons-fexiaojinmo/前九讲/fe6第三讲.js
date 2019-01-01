// 事件
// 事件是用来处理响应的一个机制
// 这个响应可以来自于用户(点击，鼠标移动，滚动)，也可以来自于 浏览器
// 看动画 电影  无法交互，浏览网页 可以交互

// 下面的链接描述了所有事件，不过我们从最常用的事件学起， click 事件
//  https://developer.mozilla.org/en-US/docs/Web/Events

// click 事件
// 几乎所有元素都有，鼠标点击元素的时候， 产生一些效果（调用函数）

// 常用例子 给按钮添加一个 点击 的事件
// 1, 获得按钮
var loginButton = document.querySelector('#id-button-login')
// 2，声明一个函数，用于在按钮点击后执行
var clicked = function() {
    log('按钮被点击到了')
}
// 3， 添加事件，使用 addEventListener 函数， 它有两个参数 (绑定事件)
//     第一个是事件的名字， 第二个是事件发生后会被自动调用的函数
loginButton.addEventListener('click',clicked)
// 添加完成， 可以自己在浏览器试试



// 给多个元素 绑定同一个事件
// 选择多个元素使用函数 querySelectorAll
// 实现切换的功能 segmentcontrol  同时只能选中一个 (以前是radio button)
var buttons = document.querySelectorAll('.radio-button')
// 循环 遍历每个元素，并且绑定点击事件
for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.addEventListener('click',qiehuan)
    }

    var qiehuan = function(event){

        // 注意 这次我们直接定义了  函数  作为参数传递，这样做是合法的
        // 匿名函数
        // 另外， 我们增加了一个 event 参数
        // 浏览器会给事件响应函数传递一个参数，它代表了事件本身
        // 我们可以用 envet.target 取出响应事件的元素
        var self = event.target;

        // 有三个目标元素，有时候我需要知道 到底是哪个元素响应了 我们的事件
        // clearActive 函数是我们自己定义的
        // 目的是删除其他元素的 active class （删除背景红色，没点击时）
        clearActive()
            // 删除active类之后，再给 响应事件的元素(自己) 加一个类（active）
            self.classList.add('active')

    }

    var clearActive = function() {
        var active = document.querySelector('.active');
        if (active != null) {
            // 使用 classList 可以访问一个元素的所有 class
            // remove 可以删除一个 class
            active.classList.remove('active');
            // 实现切换的功能 segmentcontrol  同时只能选中一个 (以前是radio button)
        }
    }


// 关灯功能
// 正常情况 mask 类背景色黑色 但不透明度 为0，不显示黑色；再给它 加一个类 为不透明的 黑色，
// 用函数控制 这个不透明黑色 的类 在事件发生时 移出 或 添加 （达到 开关灯的效果）
// 绑事件 三部曲
var light = document.querySelector('#id-button-light')
var klgr = function() {
    var mask = document.querySelector('.mask');
    mask.classList.toggle('mask-active')
    // 浏览器 给我们提供 toggle 函数， 但也可以自己写一个 toggle 函数
    /*if (mask.classList.contains('mask-active')) {
        mask.classList.remove('mask-active')
        // 点击开关灯 按钮，如果此时mask遮罩 有 mask-activ(不透明) 类，就把它删了 （变亮）
    } else {
        mask.classList.add('mask-active')
        // 点击开关灯 按钮，如果此时mask遮罩 没有 mask-activ(不透明) 类，就把它加上 （变暗）
    }*/
}
light.addEventListener('click',klgr)
klgr()


// 自己写一个 toggle 函数
// 元素 有 ，就 移出; 元素 没有 ， 就添加
var toggle = function(element.cls) {
    if (element.classList.contains(cls)) {
        element.classList.remove(cls)
    } else {
        element.classList.add(cls)
    }
}
