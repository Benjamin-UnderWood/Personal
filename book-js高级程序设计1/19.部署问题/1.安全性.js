// 1 同源策略
// 协议相同、端口相同、域名相同
// p2p.wrox.com 不能访问 www.wrox.com, 两者域名不同(尽管从技术上将前者是后者的子域)
// 2 规则特例
// 一般逻辑认为www.wrox.com 与 p2p2.wrox.com属于同一个域,
// 开发人员认同这个看法并提供了允许这种通讯的方法
// 只要在每个子域的页面中加入一行脚本就可以达到这个目的
document.domain = 'wrox.com';
// 简单的一行代码即可消除js通讯的安全阻碍, 不过只能将domain设置为已经存在于URL中的一个值
// 因此 www.wrox.com 中的页面不能将 domain 设置为mozilla.org, 这与同源策略相违背

// 2.弹出式窗口阻拦工具会将所有并非因与用户交互而出现的弹出式窗口阻拦, 也就是说不能在load
// 与unload之类的事件中打开新的窗口, 弹出窗口的操作只能放在click和keypress之类的事件中
// 某些弹出式窗口阻拦工具不管有没有用户交互都会阻止弹出
// 如何判断弹出的窗口已被阻止
// window.open() 函数一般会返回新创建的窗口的引用, 如果窗口被屏蔽, window.open()会返回null
var oWindow = window.open('page.html', 'mywindow');

if(oWindow === null) {
	alert('your popup blocker won\'t allow you access to this window.');
} else {
	// continue on
}

// 对于一些工具, 会造成js错误, 而不会返回null, 因此最好在window.open()调用周围加上try...catch块