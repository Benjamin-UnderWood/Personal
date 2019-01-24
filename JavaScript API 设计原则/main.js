// 一. 接口的流畅性
// 1. 简单
// 操作元素的css属性,
document.querySelector('#id').style.color = 'red';
// 封装
function a(selector, color) {
	document.querySelectorAll(selector)[0].style.color = color;
}
a('#a', 'red');
// 从几十个字母长长的一行到简简单单的一个函数调用，体现了api简单易用

// 2.可阅读性
function letSomeElementChangeColor(selector, color) {
	document.querySelectorAll(selector)[0].style.color = color;
}

// 3.减少记忆成本 >> 简易性
function setColor(selector, color) {
	document.querySelectorAll(selector)[0].style.color = color;
}

// 4.可延伸
// 所谓延伸就是指函数的使用像流水一样按照书写的顺序执行形成执行链条:
document.getElementById('id').style.color = 'red';
document.getElementById('id').style.fontSize = '12px';
document.getElementById('id').style.backgourdColor = 'pink';
// 再次封装两个函数 setFontSize, setbackgroundColor;
// id元素每次都需要重新获取，影响性能，失败；每次都需要添加新的方法 失败 每次还要调用这些方法，还是失败

// 可延伸的函数
function GetElement(selector) {
	this.style = document.querySelectorAll(selector)[0].style;
}
// 可以将style拆出来, css方法
GetElement.prototype.color = function(color) {
	this.style.color = color;
	return this; // important
};

GetElement.prototype.background = function (backgroundColor) {
	this.style.backgroundColor = backgroundColor;
	return this; // important
};

GetElement.prototype.fontSize = function(fontSize) {
	this.style.fontSize = fontSize;
	return this;
};

// 调用
var el = new GetElement('#id');
el.color('red').background('pink').fontSize('12px');
// 它体现了以上的多种原则，简单，易读，易记，链式写法，多参处理

// nightmare
document.getElementById('id').style.color = 'red';
document.getElementById('id').style.fontSize = '12px';
document.getElementById('id').style.backgourdColor = 'pink';

// dream
$('id').css({color:'red', fontSize:'12px', backgroundColor:'pink'});

// 二、一致性
// 1. 接口的一致性
// 命名这点事：既要短，又要自描述，最重要的是保持一致性
// “在计算机科学界只有两件头疼的事：缓存失效和命名问题”

// Nightmare
setColor();
letBackground();
changeFontSize();
makeDisplay();

// dream
setColor();
setBackground();
setFontSize();
// set...
// 尽量地保持代码风格和命名风格，使人读你的代码像是阅读同一个人写的文章一样

// 三、参数的处理
// 1.参数的类型
// 判断参数的类型为你的程序提供稳定的保障
function assert(bCondition, sErrorMessage) {
	if(!bCondition) {
		throw new Error(sErrorMessage);
	}
}
/**
 * @param color {String}
 */
function setColor(color) {
	// if(typeof color !== 'string') return; // 或者报错
	assert(typeof color === 'string', 'param color must be type of string');
	document.querySelectorAll(selector)[0].style.color = color;
}

// 2.使用json方式传参
// 使用json的方式传值很多好处，它可以给参数命名，可以忽略参数的具体位置，可以给参数默认值等等
// 下面这种糟糕的情况:
function fn(param1, param2, param3, paramN) {
}

// 你必须对应地把每一个参数按照顺序传入，否则你的方法就会偏离你预期去执行, 不够安全和灵活

// 正确的做法
function fn(json) {
	// 为必须的参数设置默认值
	extend({
		param1: 'default',
		param2: 'default',
		param3: 'default',
		paramN: 'default'
	}, json)
}
// 这段函数代码，即便你不传任何参数进来，他也会预期运行。因为在声明的时候，你会根据具体的业务决定参数的缺省值

// 四、可扩展性
// 软件设计最重要的原则之一：永远不修改接口，只扩展它！
// 可扩展性同时会要求接口的职责单一，多职责的接口很难扩展
// Nightmare
function set(selector, color) {
	document.querySelectorAll(selector).style.color = color;
}

// 无法扩展该函数, 如果需要改变字体的大小的话，
// 只能修改此函数，在函数后面填加改变字体大小的代码

// Dream
function set(selector, color) {
	var el = document.querySelectorAll(selector);
	el.style.color = color;
	return el;
}

// 如果需要设置字体大小, 可以在此函数上扩展
function setUpdate(selector, color, fontSize) {
	var el = selector(selector, color);
	el.style.fontSize = fontSize;
	return el;
}
// 修改后的function是返回了元素对象，使得下次需要改变时再次得到返回值做处理

// 2. this的运用
// 可扩展性还包括对this的以及call和apply方法的灵活运用：
function sayBonjour() {
	alert(this.a);
}

var obj = {};
obj.a = 1;
obj.say = sayBonjour;
obj.say(); // 1

// or
sayBonjour.call(obj);// 1
sayBonjour.apply(obj); // 1

// 五、对错误的处理
// 1.预见错误
//
// 可以用 类型检测 typeof 或者try…catch。
// typeof 会强制检测对象不抛出错误，对于未定义的变量尤其有用

// 大多数开发者不希望出错了还需要自己去找带对应得代码，
// 最好方式是直接在console中输出，告诉用户发生了什么事情。我们可以用到浏览器的输出
// api:console.log/warn/error。你还可以为自己的程序留些后路: try…catch

function error(a) {
	if(typeof a !== 'string') {
		console.log('param a must be type of string');
	}
}

function error() {
	try{
		// some code excucete here maybe throw wrong
	} catch (e) {
		console.warn(e);
	}
}

// 六、可预见性
// 可预见性为程序接口提供健壮性，为保证你的代码顺利执行，必须为它考虑到非正常预期的情况。
// 我们看下不可以预见的代码和可预见的代码的区别用之前的setColor

// nightmare
function set(selector, color) {
	document.getElementById(selector).style.color = color;
}

//dream
zepto.init = function (selector, context) {
	var dom;
	// If nothing given, return an empty Zepto collection

	if (!selector)
	{
		return selector;
	}

	// Optimize for string selectors
	else if (typeof selector === 'string')
	{
		selector = selector.trim();
		// If it's a html fragment, create nodes from it
		// Note: In both Chrome 21 and Firefox 15, DOM error 12
		// is thrown if the fragment doesn't begin with <
		if (selector[0] === '<' && fragmentRE.test(selector))
		{
			dom = zepto.fragment(selector, RegExp.$1, context);
			selector = null;
		}
		// If there's a context, create a collection on that context first, and select
		// nodes from there
		else if (context !== undefined) return $(context).find(selector);
		// If it's a CSS selector, use it to select nodes.
		else dom = zepto.qsa(document, selector);
	}

	// If a function is given, call it when the DOM is ready
	else if (isFunction(selector))
	{
		return $(document).ready(selector);
	}

	// If a Zepto collection is given, just return it
	else if (zepto.isZ(selector))
	{
		return selector;
	}

	else
	{
		// normalize array if an array of nodes is given
		if (isArray(selector)) dom = compact(selector);
		// Wrap DOM nodes.
		else if (isObject(selector))
		{
			dom = [selector];
			selector = null;
		}
		// If it's a html fragment, create nodes from it
		else if (fragmentRE.test(selector))
		{
			dom = zepto.fragment(selector.trim(), RegExp.$1, context);
			selector = null;
		}
		// If there's a context, create a collection on that context first, and select
		// nodes from there
		else if (context !== undefined) return $(context).find(selector);
		// And last but no least, if it's a CSS selector, use it to select nodes.
		else dom = zepto.qsa(document, selector)
	}

	// create a new Zepto collection from the nodes found
	return zepto.Z(dom, selector)
};
// 以上是zepto的源码，可以看见，作者在预见传入的参数时做了很多的处理。其实可预见性是为程序提供了若干的入口，无非是一些逻辑判断而已
// 总之，可预见性真正需要你做的事多写一些对位置实物的参数。把外部的检测改为内部检测
// 使得使用的人用起来舒心放心开心

// 七、注释和文档的可读性
// 一个最好的接口是不需要文档我们也会使用它，
// 但是往往接口量一多和业务增加，接口使用起来也会有些费劲。
// 所以接口文档和注释是需要认真书写的。注释遵循简单扼要地原则，
// 给多年后的自己也给后来者看

function commentary() {
	//如果你定义一个没有字面意义的变量时，最好为它写上注释：a：没用的变量，可以删除
	var a;

	//在关键和有歧义的地方写上注释，犹如画龙点睛：路由到hash界面后将所有的数据清空结束函数
	return go.Navigate('hash', function(){
		data.clear();
	});
}

