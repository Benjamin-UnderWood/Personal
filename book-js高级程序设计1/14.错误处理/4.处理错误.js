// js提供了两种处理错误的方式, BOM包含一个onerror事件处理函数, 这在window对象和图像对象上都有
// 同时ECMAScript定义了另外一个从JAVA借过来的try...catch结构, 来处理异常
// 1.取出错误信息
// onerror 事件处理函数提供了三种信息来确定错误确切的性质
// 错误信息——对于给定错误, 浏览器会显示同样的信息
// URL——在哪个文件中发生了错误
// 行号——给定URL中发生错误的行号
// 2.图像载入错误
// 3.处理语法错误
// onerror 事件处理函数不仅可以处理异常, 还能处理语法错误, 也只有它能处理
// 事件处理函数必须是页面中第一个出现的代码, 如果语法错误出现在设置事件处理 函数之前就出现, 事件处理函数就没用了
// 语法错误会完全停止代码的执行

// 4.2 try...catch
// ECMAScript 标准在try...catch语句中指定只能有个catch子句, 因为js是弱类型语言, 没办法指明catch子句中异常的特定类型
// 不管错误是什么类型都由同一个catch子句执行
// 1.嵌套try...catch语句
try {
	// eval('a' ++ 'b'); // cause error
} catch (oException) {
	alert('An exception occurred');
	try {
		var aErrors = new Array(1000000000000000000000); // causes error
	} catch (oException2) {
		alert('Another exception occurred');
	} finally {
		alert('All done');
	}
}
// 在这个例子中, 抛出第一个错误后, 立刻出现第一个警告框, 继续执行第一个catch子句, 由于尝试创建一个超大数组, 出现另一个错误
// 于是进入第二个catch子句, 并显示第二个警告框, 最后进入finally子句, 执行完毕

// 2.Error 对象
// 特性 name 错误类型的字符串; message 实际的错误信息
// Mozilla 提供一个fileName 特性来表示错误发生在哪一个文件中, 以及一个stack特性以包含到错误发生时的调用堆栈

// 3.判断错误类型
// 第一种使用Error对象的name
try {
	// eval('a' ++ 'b'); // cause error
} catch (oException) { // causes SyntaxError
	if(oException.name === 'SyntaxError') {
		alert('Syntax Error:' + oException.message);
	} else {
		alert('An unexpected error occurred: ' + oException.message);
	}
}

// 第二种使用instanceof 操作符, 并使用不同错误的类名
try {
	// eval('a' ++ 'b'); // cause error
} catch (oException) { // causes SyntaxError
	if(oException instanceof SyntaxError) {
		alert('Syntax Error:' + oException.message);
	} else {
		alert('An unexpected error occurred: ' + oException.message);
	}
}

// 4.抛出异常
// ES3 引入 throw 用于有目的的抛出异常
throw error_object;
// error_object 可以是字符串、数字、布尔值或者实际的对象
// throw 'An error occurred';
// throw 50067;
// throw true;
// throw new Object();

// 也可以抛出一个Error 对象,Error对象的构造函数只有一个参数, 错误信息
throw new Error('you tried to do something bad');
// 其他的Error子类也都可以使用
throw new SyntaxError('I don\'t like your syntax');
throw new TypeError();
throw new RangeError();
throw new EvalError();
throw new URIError();
throw new ReferenceError();

// 应用, 正常的执行不能继续时, 应该抛出一个异常
function addTwoNumbers(a, b) {
	if(arguments.length < 2) {
		throw new Error('Two numbers are required');
	} else {
		return a + b;
	}
}
// 上述代码函数要有两个数字作为参数才能正常工作, 如果没有传入两个参数,
// 那么函数就抛出表示计算不能完成的异常

// 开发人员抛出的异常和浏览器自身抛出的错误都在try...catch语句中捕获
// 以下代码可以捕获由开发人员抛出的异常
function addTwoNumbers(a, b) {
	if(arguments.length < 2) {
		throw new Error('Two numbers are required');
	} else {
		return a + b;
	}
}

try {
	result = addTwoNumbers(10);
} catch (oException) {
	alert(oException.message);
}

// 因为浏览器不生成Error对象(它总是生成一个较精确的Error对象, 比如RangeError)
// 所以区分浏览器抛出的错误和开发人员抛出的错误很简单
function addTwoNumbers(a, b) {
	if(arguments.length < 2) {
		throw new Error('Two numbers are required');
	} else {
		return a + b;
	}
}

try {
	result = addTwoNumbers(90, parseInt('z'));
} catch(oException) {
	if(oException instanceof SyntaxError) { // 浏览器
		alert('Syntax Error:' + oException.message);
	} else if(oException instanceof Error) { // 开发人员
		alert(oException.message);
	}
}
// 注意检查instanceof Error 必须是if语句中的最后一个条件, 因为所有其他错误类型类都继承于它
