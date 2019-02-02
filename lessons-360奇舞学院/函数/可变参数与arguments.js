// 无论传入多少参数, 都进行累加
function add() {
	// var args = [].slice.call(arguments);
	// var args = Array.prototype.slice.call(arguments);
	// var args = Array.prototype.slice.call(arguments, 1); 从第二个参数开始转成数组
	let args = Array.from(arguments);

	return args.reduce((a, b) => a +b);
}

console.log(add(1, 2, 3, 4));

// JavaScript 函数设计中经常会让参数允许有不同的类型
// el是一个对象(选择器)/字符串 property 是对象/字符串
function setStyle(el, property, value) {
	if(typeof el === 'string') {
		el = document.querySelector(el);
	}

	if(typeof property === 'object') {
		for (var key in property) {
			setStyle(el , key, property[key]);
		}
	} else {
		el.style[property] = value;
	}
}

setStyle('div', 'color', 'red');

setStyle('div', {
	'fontSize': '32px',
	'background': 'white'
});

// 设计API时, 会赋给函数不同的参数, 把基础的参数列表作为函数的声明, 实际使用的时候有不同的类型, 这就是JavaScript很灵活的地方
// 设计可变参数的API