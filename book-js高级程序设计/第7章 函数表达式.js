// 定义函数的方式有两种：一种是函数声明，另一种就是函数表达式
// 函数声明
function functionName(arg0, arg1, arg2) {
	//函数体
}

console.log(functionName.name); // 'functionName'

// 关于函数声明，它的一个重要特征就是函数声明提升（function declaration hoisting），
// 意思是在执行代码之前会先读取函数声明!!!
// 这就意味着可以把函数声明放在调用它的语句后面
sayHi();
function sayHi() {
	console.log('Hi');
}

// 第二种创建函数的方式是使用函数表达式。函数表达式有几种不同的语法形式。下面是最常见的一
// 种形式。
var functionName = function(arg0, arg1, arg2){
//函数体
};

// 这种形式看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量functionName。
// 这种情况下创建的函数叫做匿名函数（anonymous function），因为function 关键字后面没有标识符。
// （匿名函数有时候也叫拉姆达函数。）匿名函数的name 属性是空字符串

// 函数表达式与其他表达式一样，在使用前必须先赋值。以下代码会导致错误
sayHi(); //错误：函数还不存在
var sayHi = function(){
	alert("Hi!");
};

// 不要这样做
if(condition){
	function sayHi(){
		alert("Hi!");
	}
} else {
	function sayHi(){
		alert("Yo!");
	}
}

//可以这样做
var sayHi;
if(condition){
	sayHi = function(){
		alert("Hi!");
	};
} else {
	sayHi = function(){
		alert("Yo!");
	};
}
// 不同的函数会根据condition 被赋值给sayHi

// 能够创建函数再赋值给变量，也就能够把函数作为其他函数的值返回
function createComparisonFunction(propertyName) {

	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if (value1 < value2){
			return -1;
		} else if (value1 > value2){
			return 1;
		} else {
			return 0;
		}
	};

}

// createComparisonFunction()就返回了一个匿名函数。返回的函数可能会被赋值给一个变量，
// 或者以其他方式被调用；不过，在createComparisonFunction()函数内部，它是匿名的。在把函数
// 当成值来使用的情况下，都可以使用匿名函数

// 1.递归
function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}
// 这是一个经典的递归阶乘函数。虽然这个函数表面看来没什么问题，但下面的代码却可能导致它出错
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //出错！

// 以上代码先把factorial()函数保存在变量anotherFactorial 中，然后将factorial 变量设
// 置为null，结果指向原始函数的引用只剩下一个。但在接下来调用anotherFactorial()时，由于必
// 须执行factorial()，而factorial 已经不再是函数，所以就会导致错误。在这种情况下，使用arguments.
// callee 可以解决这个问题
function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num - 1);
	}
}

// 加粗的代码显示，通过使用arguments.callee 代替函数名，可以确保无论怎样调用函数都不会
// 出问题。因此，在编写递归函数时，使用arguments.callee 总比使用函数名更保险

// 但在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会导致错误

// 不过，可以使用命名函数表达式来达成相同的结果。例如：
var factorial = (function f(num){
	if (num <= 1){
		return 1;
	} else {
		return num * f(num-1);
	}
});

// 以上代码创建了一个名为f()的命名函数表达式，然后将它赋值给变量factorial。即便把函数
// 赋值给了另一个变量，函数的名字f 仍然有效，所以递归调用照样能正确完成。这种方式在严格模式和
// 非严格模式下都行得通。

// 2 闭包
// 闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数
function createComparisonFunction(propertyName) {

	return function(object1, object2){
		var value1 = object1[propertyName]; // 1
		var value2 = object2[propertyName]; // 2

		if (value1 < value2){
			return -1;
		} else if (value1 > value2){
			return 1;
		} else {
			return 0;
		}
	};
}
// 在这个例子中，1、2两行代码是内部函数（一个匿名函数）中的代码，这两行代码访问了外部
// 函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可
// 以访问变量propertyName。之所以还能够访问这个变量，
// 是因为内部函数的作用域链中包含createComparisonFunction()的作用域。 !!!
// 要彻底搞清楚其中的细节，必须从理解函数被调用的时候都会发生什么入手

// 当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。
// 然后，使用arguments 和其他命名参数的值来初始化函数的活动对象（activation object）。但在作用域
// 链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位...
// 直至作为作用域链终点的全局执行环境

// 在函数执行过程中，为读取和写入变量的值，就需要在作用域链中查找变量
function compare(value1, value2){
	if (value1 < value2){
		return -1;
	} else if (value1 > value2){
		return 1;
	} else {
		return 0;
	}
}
var result = compare(5, 10);

// 当调用compare()时，会
// 创建一个包含arguments、value1 和value2 的活动对象。全局执行环境的变量对象（包含result
// 和compare）在compare()执行环境的作用域链中则处于第二位

// 后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像
// compare()函数这样的局部环境的变量对象，则只在函数执行的过程中存在
// 在创建compare()函数时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的[[Scope]]属性中
// 当调用compare()函数时，会为函数创建一个执行环境，然后通过复制函数的[[Scope]]属性中的对
// 象构建起执行环境的作用域链。
// 此后，又有一个活动对象（在此作为变量对象使用）被创建并被推入执行环境作用域链的前端
// 对于这个例子中compare()函数的执行环境而言，其作用域链中包含两个变量对象：本地活动对象和全局变量对象
// 显然，作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象
// 无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，
// 当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。

// 但是，闭包的情况又有所不同
// 在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。
// 因此，在createComparisonFunction()函数内部定义的匿名函数的作用域链中，实际上将会包含外部
// 函数createComparisonFunction()的活动对象
var compare = createComparisonFunction('name');
var result = compare({ name: "Nicholas" }, { name: "Greg" });
// 在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含
// createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在
// createComparisonFunction()中定义的所有变量
// 更为重要的是，createComparisonFunction()
// 函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象
// 换句话说，当createComparisonFunction()函数返回后，其执行环境的作用域链会被销毁，但它的活
// 动对象仍然会留在内存中；直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁

//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
// 首先，创建的比较函数被保存在变量compareNames 中。而通过将compareNames 设置为等于null
// 解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域
// （除了全局作用域）也都可以安全地销毁了

// 7.2.1 闭包与变量
// 作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值
// 别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量
function createFunctions(){
	var result = [];

	for (var i=0; i < 10; i++){
		result[i] = function(){
			return i; // i 不稳定
		};
	}

	return result;
}

// 这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返自己的索引值，即位置0 的函数
// 返回0，位置1 的函数返回1，以此类推。但实际上，每个函数都返回10。因为每个函数的作用域链中
// 都保存着createFunctions() 函数的活动对象， 所以它们引用的都是同一个变量i 。当
// createFunctions()函数返回后，变量i 的值是10，此时每个函数都引用着保存变量i 的同一个变量
// 对象，所以在每个函数内部i 的值都是10
function createFunctions(){
	var result = [];

	for (var i=0; i < 10; i++){
		result[i] = function(num){ // 传参相当于声明一个变量num
			return function(){ // 会引用外部匿名函数的活动对象
				return num;
			};
		}(i);
	}

	return result;
}
// 在重写了前面的createFunctions()函数后，每个函数就会返回各自不同的索引值了。在这个版
// 本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋
// 给数组。这里的匿名函数有一个参数num，也就是最终的函数要返回的值。在调用每个匿名函数时，我
// 们传入了变量i。由于函数参数是按值传递的，所以就会将变量i 的当前值复制给参数num。而在这个
// 匿名函数内部，又创建并返回了一个访问num 的闭包。这样一来，result 数组中的每个函数都有自己
// num 变量的一个副本，因此就可以返回各自不同的数值了

// 2.2 关于this对象
var name = "The Window";

var object = {
	name : "My Object",

	getNameFunc : function(){
		return function(){
			return this.name;
		};
	}
};

alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
// 这个例子返回的字符串是"The Window"，即全局name 变量的值。为什么匿名函数没
// 有取得其包含作用域（或外部作用域）的this 对象呢？

// 每个函数在被调用时都会自动取得两个特殊变量：this 和arguments
// 内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量
// 不过，把外部作用域中的this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了
var name = "The Window";

var object = {
	name : "My Object",

	getNameFunc(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

alert(object.getNameFunc()()); //"My Object"

// arguments 也存在同样的问题。如果想访问作用域中的arguments 对
// 象，必须将对该对象的引用保存到另一个闭包能够访问的变量中

// 在几种特殊情况下，this 的值可能会意外地改变
var name = 'The Window';

var object = {
	name : "My Object",
	getName: function(){
		return this.name;
	}
};

object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)(); //"The Window"，在非严格模式下
// 第二行代码在调用这个方法前先给它加上了括号。虽然加上括号之后，就好像只
// 是在引用一个函数，但this 的值得到了维持，因为object.getName 和(object.getName)的定义
// 是相同的。第三行代码先执行了一条赋值语句，然后再调用赋值后的结果。因为这个赋值表达式的值是
// 函数本身

// 2.3 内存泄漏
// 由于IE9 之前的版本对JScript 对象和COM 对象使用不同的垃圾收集例程
// 因此闭包在IE 的这些版本中会导致一些特殊的问题
// 具体来说，如果闭包的作用域链中保存着一个HTML 元素，那么就意味着该元素将无法被销毁
function assignHandler(){
	var element = document.getElementById("someElement");
	element.onclick = function(){
		alert(element.id);
	};
}

// 以上代码创建了一个作为element 元素事件处理程序的闭包，而这个闭包则又创建了一个循环引
// 用（事件将在第13 章讨论）。由于匿名函数保存了一个对assignHandler()的活动对象的引用，因此
// 就会导致无法减少element 的引用数。只要匿名函数存在，element 的引用数至少也是1，因此它所
// 占用的内存就永远不会被回收

// 不过，这个问题可以通过稍微改写一下代码来解决
function assignHandler(){
	var element = document.getElementById("someElement");
	var id = element.id;

	element.onclick = function(){
		alert(id);
	};

	element = null;
}

// 在上面的代码中，通过把element.id 的一个副本保存在一个变量中，并且在闭包中引用该变量消
// 除了循环引用。但仅仅做到这一步，还是不能解决内存泄漏的问题。必须要记住：闭包会引用包含函数
// 的整个活动对象，而其中包含着element。即使闭包不直接引用element，包含函数的活动对象中也
// 仍然会保存一个引用。因此，有必要把element 变量设置为null。这样就能够解除对DOM 对象的引
// 用，顺利地减少其引用数，确保正常回收其占用的内存

// 3 模仿块级作用域
// avaScript 没有块级作用域的概念。这意味着在块语句中定义的变量，实际上是在包含
// 函数中而非语句中创建的
function outputNumbers(count){
	for (var i=0; i < count; i++){
		alert(i);
	}
	alert(i); //计数
}
// 在Java、C++等语言中，变量i
// 只会在for 循环的语句块中有定义，循环一旦结束，变量i 就会被销毁。可是在JavaScrip 中，变量i
// 是定义在ouputNumbers()的活动对象中的，因此从它有定义开始，就可以在函数内部随处访问它。即
// 使像下面这样错误地重新声明同一个变量，也不会改变它的值

function outputNumbers(count){
	for (var i=0; i < count; i++){
		alert(i);
	}
	var i; //重新声明变量
	alert(i); //计数
}
// JavaScript 从来不会告诉你是否多次声明了同一个变量；遇到这种情况，它只会对后续的声明视而不
// 见（不过，它会执行后续声明中的变量初始化）。匿名函数可以用来模仿块级作用域并避免这个问题。

// 用作块级作用域（通常称为私有作用域）的匿名函数的语法如下所示
(function() {
	// 这里是块级作用域
})();
// 以上代码定义并立即调用了一个匿名函数。将函数声明包含在一对圆括号中，表示它实际上是一个
// 函数表达式。而紧随其后的另一对圆括号会立即调用这个函数

// function(){
// //这里是块级作用域
// }(); //出错！

// 是因为JavaScript 将function 关键字当作一个函数声明的开始，而函
// 数声明后面不能跟圆括号

// 函数表达式的后面可以跟圆括号。要将函数声明转换成函数表达式，
// 只要像下面这样给它加上一对圆括号即可
(function(){
	//这里是块级作用域
})();

// 无论在什么地方，只要临时需要一些变量，就可以使用私有作用域
function outputNumbers(count){
	(function () {
		for (var i=0; i < count; i++){
			alert(i);
		}
	})();
	alert(i); //导致一个错误！
}
// 在这个重写后的outputNumbers()函数中，我们在for 循环外部插入了一个私有作用域
// 在匿名函数中定义的任何变量，都会在执行结束时被销毁

// 这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数
// 这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函
// 数执行完毕，就可以立即销毁其作用域链了

// 4.私有变量
// 严格来讲，JavaScript 中没有私有成员的概念；所有对象属性都是公有的。不过，倒是有一个私有
// 变量的概念
// 任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量
// 私有变量包括函数的参数、局部变量和在函数内部定义的其他函数
function add(num1, num2){
	var sum = num1 + num2;
	return sum;
}
// 在这个函数内部，有3 个私有变量：num1、num2 和sum
// 在函数内部可以访问这几个变量，但在函数外部则不能访问它们。

// 如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。
// 而利用这一点，就可以创建用于访问私有变量的公有方法

// 有权访问私有变量和私有函数的公有方法称为特权方法（privileged method）
// 有两种在对象上创建特权方法的方式
// 第一种是在构造函数中定义特权方法，基本模式如下
function MyObject(){ // 不传参的, 私有变量内部自己定义, 始终不变

	//私有变量和私有函数
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}

	//特权方法
	this.publicMethod = function (){ // 缺点 方法不复用, 占内存; 闭包占内存
		privateVariable++;
		return privateFunction();
	};

}
// 对这个例子而言，变量privateVariable 和函数privateFunction()只能通过特
// 权方法publicMethod()来访问。
// 在创建MyObject 的实例后，除了使用publicMethod()这一个途
// 径外，没有任何办法可以直接访问privateVariable 和privateFunction()

// 利用私有和特权成员，可以隐藏那些不应该被直接修改的数据，例如：
function Person(name){ // 传参的, 私有变量是传参, 在每一个实例中都不同

	this.getName = function(){
		return name;
	};

	this.setName = function (value) {
		name = value;
	};
}

var person = new Person("Nicholas");
alert(person.getName()); //"Nicholas"
person.setName("Greg");
alert(person.getName()); //"Greg"
// 以上代码的构造函数中定义了两个特权方法：getName()和setName()。这两个方法都可以在构
// 造函数外部使用，而且都有权访问私有变量name。但在Person 构造函数外部，没有任何办法访问name。

// 不过，在构造函数中定义特权方法也有一个缺点，那就是你必须使用构造函数模式来达到这个目的
// 构造函数模式的缺点是针对每个实例都会创建同样一组新方法，而使用静态私有变量来实现特权方
// 法就可以避免这个问题

// 4.1 静态私有变量
(function(){

	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction(){
		return false;
	}

	//构造函数
	MyObject = function(){
	};

	//公有/特权方法
	MyObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};

})();

// 需要注意的是，这个模式在定义构造函数时并没有使用函数声明，而是
// 使用了函数表达式。函数声明只能创建局部函数，但那并不是我们想要的。出于同样的原因，我们也没
// 有在声明MyObject 时使用var 关键字。记住：初始化未经声明的变量，总是会创建一个全局变量。
// 因此，MyObject 就成了一个全局变量，能够在私有作用域之外被访问到。但也要知道，在严格模式下
// 给未经声明的变量赋值会导致错误。

(function () {
	var name = "";
	Person = function (value) {
		name = value;
	};
	Person.prototype.getName = function () {
		return name;
	};
	Person.prototype.setName = function (value) {
		name = value;
	};
})();

var person1 = new Person("Nicholas");
alert(person1.getName()); //"Nicholas"
person1.setName("Greg"); // 闭包使其保持改动外部函数活动对象的能力
alert(person1.getName()); //"Greg"
var person2 = new Person("Michael");
alert(person1.getName()); //"Michael"
alert(person2.getName()); //"Michael"
// 这个例子中的Person 构造函数与getName()和setName()方法一样，都有权访问私有变量name。
// 在这种模式下，变量name 就变成了一个静态的、由所有实例共享的属性。也就是说，在一个实例上调
// 用setName()会影响所有实例。而调用setName()或新建一个Person 实例都会赋予name 属性一个
// 新值。结果就是所有实例都会返回相同的值。

// 以这种方式创建静态私有变量会因为使用原型而增进代码复用，但每个实例都没有自己的私有变
// 量。到底是使用实例变量，还是静态私有变量，最终还是要视你的具体需求而定。

// 4.2 模块模式
// 前面的模式是用于为自定义类型创建私有变量和特权方法的
// 而道格拉斯所说的模块模式（module pattern）则是为单例创建私有变量和特权方法
var singleton = {
	name: value,
	method() {
		//这里是方法的代码
	}
};
// 模块模式通过为单例添加私有变量和特权方法能够使其得到增强
var singleton = function(){

	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction(){
		return false;
	}

	//特权/公有方法和属性
	return {
		publicProperty: true,
		publicMethod : function(){
			privateVariable++;
			return privateFunction();
		}
	};
}();
// 这个模块模式使用了一个返回对象的匿名函数。在这个匿名函数内部，首先定义了私有变量和函数。
// 然后，将一个对象字面量作为函数的值返回。返回的对象字面量中只包含可以公开的属性和方法。
// 由于这个对象是在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。
// 从本质上来讲，这个对象字面量定义的是单例的公共接口

// 这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的,ex
var application = function(){

	//私有变量和函数
	var components = [];

	//初始化
	components.push(new BaseComponent());

	//公共
	return {
		getComponentCount(){
			return components.length;
		},
		registerComponent(component){
			if (typeof component === "object"){
				components.push(component);
			}
		}
	};
}();
// 在Web 应用程序中，经常需要使用一个单例来管理应用程序级的信息。这个简单的例子创建了一
// 个用于管理组件的application 对象。在创建这个对象的过程中，首先声明了一个私有的components
// 数组，并向数组中添加了一个BaseComponent 的新实例（在这里不需要关心BaseComponent 的代码，我
// 们只是用它来展示初始化操作）。而返回对象的getComponentCount()和registerComponent()方法，都
// 是有权访问数组components 的特权方法。前者只是返回已注册的组件数目，后者用于注册新组件

// 4.3 增强的模块模式
// 有人进一步改进了模块模式，即在返回对象之前加入对其增强的代码。这种增强的模块模式适合那
// 些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况
var singleton = function(){

	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction(){
		return false;
	}

	//创建对象
	var object = new CustomType();

	//添加特权/公有属性和方法
	object.publicProperty = true;
	object.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};

	//返回这个对象
	return object;
}();

// 如果前面演示模块模式的例子中的application 对象必须是BaseComponent 的实例，那么就可
// 以使用以下代码
var application = function () {

	//私有变量和函数
	var components = new Array();

	//初始化
	components.push(new BaseComponent());

	//创建application 的一个局部副本
	var app = new BaseComponent();

	//公共接口
	app.getComponentCount = function () {
		return components.length;
	};

	app.registerComponent = function (component) {
		if (typeof component === "object") {
			components.push(component);
		}
	};

	//返回这个副本
	return app;
}();
// 在这个重写后的应用程序（application）单例中，首先也是像前面例子中一样定义了私有变量。主
// 要的不同之处在于命名变量app 的创建过程，因为它必须是BaseComponent 的实例
// 这个实例实际上是application 对象的局部变量版。
// 此后，我们又为app 对象添加了能够访问私有变量的公有方法

// 最后一步是返回app 对象，结果仍然是将它赋值给全局变量application。

