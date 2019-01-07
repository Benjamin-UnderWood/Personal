// 1 使用警告框
function test_function() {
	alert('Entering function');

	var iNumber1 = 5;
	var iNumber2 = 10;

	alert('Before calculation');
	var iResult = iNumber1 + iNumber2;
	alert('After calculation.');

	alert('Leaving funciton');
}

// 缺点, 大量清扫工作; 死循环, 不断弹出警告框; 最好对小代码段使用警告框进行调试

// 2 使用JAVA控制台 console 法

// 3 js控制台

// 4 抛出自定义错误
function divide(iNum1, iNum2) {
	return iNum1.valueOf() / iNum2.valueOf();
}

// 这个函数是基于一些假设的, 1 传入两个参数 2. 假设两个参数都是数字
// 如果未遵守, divide('a') 最后就会出现类似undefined is not an object 或者 iNum2 has no properties
// 加入一些更确切的错误信息, 问题就会变得更加清晰
function divide(iNum1, iNum2) {
	if (arguments.length !==2) {
		throw new Error('divide() requires two arguments');
	} else if (typeof iNum1 !== 'number' || typeof iNum2 !== 'number') {
		throw new Error('divide() requires two numbers for arguments');
	}

	return iNum1.valueOf() / iNum2.valueOf();
}
// 错误信息给你足够的信息使得调试更加简单

// 因为这些代码总是要先检查错误, 然后抛出异常, 所以很多开发人员会创建自己的assert()函数
// 很多编程语言都内置了 assert() 方法, 其实自己创建也很方便
function assert(bCondition, sErrorMessage) {
	if(!bCondition) {
		throw new Error(sErrorMessage);
	}
}

function divide(iNum1, iNum2) {
	assert(arguments.length === 2, 'divide() requires two arguments');
	assert(typeof iNum1 === 'number' && typeof iNum2 === 'number', 'divide() requires two numbers for arguments');

	return iNum1.valueOf() / iNum2.valueOf();
}

// 5.5 js校验器
// jslint