// let 和 const 被赋予了一种称为 暂时性死区
function example() {
	console.log(a); // => throws a ReferenceError
	console.log(typeof a); // => throws a ReferenceError
	const a = true;
}

// 匿名函数表达式的变量会被提升, 但函数内容并不会
function example() {
	console.log(anonymous); // => undefined

	anonymous(); // => TypeError anonymous is not a function

	var anonymous = function () {
		console.log('anonymous function expression');
	}
}

// 命名的函数表达式的变量名会被提升, 但函数名和函数内容并不会
function example() {
	console.log(named); // => undefined

	named(); // => TypeError named is not a function

	superPower(); // => ReferenceError superPower is not defined

	var named = function superPower() {
		console.log('Flying');
	};

	superPower(); // => ReferenceError superPower is not defined
}

// the same is true when the function name
// is the same as the variable name.
function example() {
	console.log(named); // => undefined

	named(); // => TypeError named is not a function

	var named = function named() { // 第二个named并不能影响什么
		console.log('named');
	}
}

// 函数声明的名称和函数体都会被提升
function example() {
	superPower(); // => Flying

	function superPower() {
		console.log('Flying');
	}
}