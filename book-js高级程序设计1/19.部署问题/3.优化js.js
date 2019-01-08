// 创建桌面应用时, 大多数开发者并不需要太关心优化
// 在极大程度, 编译时都会进行优化: 所有的变量, 函数和对象等
// 都会被替换成只有处理器才能理解的符号指针
// 宏因为在编译时已被替换, 因此比函数调用更快. 模板可用来提高对象创建的速度
// js这方面不行, 因为它时作为源代码下载, 然后由浏览器对其进行解释(不是进行编译)
// 因此, js代码的速度被分割成两个部分: 下载时间和执行速度
// 1.下载时间
// 增加下载时间的关键是脚本所包含的字节数
// 一个关键数字是1160, 这是能放入单个TCP-IP包中的字节数,
// 最好能将每个js文件都保持在1160字节以下, 以获取最优的下载时间(测试)
// 1.1删除注释 1.2删除制表符和空格(制表符, 缩进)
// 1.3删除换行
// 如果由某些原因而不要删除换行, 则哟啊保证文件是Unix格式的, 而非windows格式
// Windows用两个字符表示换行(回车和新行, ASCII码分别为13和10), Unix仅使用一个
// 1.4 替换变量名
// 变量名对解释程序毫无意义, 只是对阅读代码的开发人员有意义
function doSomething(sName, sAge, sCity){alert(sName+sAge+sCity);}
function doSomething(a1, a2, a3){alert(a1+a2+a3);}
// 减少16个字符, 如果脚本的变量名都被替换成一两个字符长, 可以节约很多长度

// 1.5 ECMAScript Cruncher
// 为js进行文件最小化和变量名替换的最佳工具ESC, ESC是一个小巧的windows shell 脚本
// cscript ESC.wsf -1 [0-4] -ow outputfile.js inputfile1.js [inputfile2.js]
// cscript是Windows Shell 脚本解释程序, 文件名ESC.wsf是ESC的程序本身, 然后是压缩等级0-4
// 表示要进行的优化的等级, -ow选项表示下一个参数是优化后输出的文件名, 最后是要进行优化的文件, 一个或多个
// 四个优化等级
// 0 不改变脚本合并多个文件到一个文件
// 1 删除注释
// 2 除等级1外再删除额外的制表符和空格
// 3 除等级2外再删除换行
// 4 除等级3外再进行变量名替换
// 注意点, 如果某个js引用了另一个文件中的构造函数(比如StringBuffer类), 4级优化会把对构造函数的引用替换成无意义的名称
// 解决方法, 将两个文件合并成一个文件, 这样就可以保持构造函数的名称(ESC不会更改同一个文件中的构造函数名称、公用特性和公用方法名称)

// 1.6 其他减少字节数的方法
// 1.替换布尔值 true >> 1 节省3个字节 false>>0 节省4个字节
var bFound = false;
for (let i = 0, l = aTest.length; i < l; i++) {
	if(aTest[i] === vTest) {
		bFound = true;
	}
}

// 可以替换成
var bFound = 0;
for (let i = 0, l = aTest.length; i < l; i++) {
	if(aTest[i] === vTest) {
		bFound = 1;
	}
}

// 2.缩短否定检测
if(oTest !== undefined) {

}
if(oTest !== null) {

}
if(oTest !== false) {

}

// 可以替换为
if(!oTest) {

}
// 自动类型转换

// 1.7 使用数组和对象字面量
var aTest = new Array;
var aTest = [];

// 2 执行时间
// js整体性能的第二部分是运行脚本所需的时间
// js是一种解释性语言, 它的执行速度要远慢于编译型语言
// 比编译型C程序慢5000倍
// 比解释型Java慢100倍
// 比解释型Perl慢10倍

// 优化
// 2.1 关注范围
// 树状层次, 引用变量时js解释程序先在最近的范围内查找其是否存在, 没有就到上一层...知道window范围, 如果还没有则报错
// 每次解释程序到另一个范围内搜索变量都会影响执行速度, 本地范围内的变量比全局变量执行起来更快
// 解释程序在树种走的距离越短, 脚本运行越快
// 从js的范围中找到一个用于优化执行速度的方法很重要,
// 用简单的方法来帮助解释型程序快速定位变量
// 使用局部变量 var
function sayFirstName() {
	var sMyFirstName = 'Nicholas';
	alert(sMyFirstName);
}

function sayFistNameToo() {
	alert(sMyFirstName);
}

sayFirstName();
sayFistNameToo();

// 尝试运行这段代码, 第一个警告框显示后, 会发生错误, 因为第一个函数无法找到名为sMyFirstName的变量
// 这个变量时在 sayFirstName() 范围内创建的, 函数完成执行后就被销毁了

// 避免使用with语句

// 2.2 计算机科学基础
// 选择正确的算法
// 常数值, O(1), 包含真值常量, 数值常量——数字5和保存在变量中的数值
var iFive = 5;
var iSum = 10 + iFive;
alert(iSum);
// 10 iFive iSum 的获取都是常数值
// 存储在数组中的数值也是常数值
var aNumbers = [5, 10];
var iSum = aNumbers[0] + aNumbers[1];
alert(iSum);
// 3次O(1)算法

// 线性 O(n), 简单的搜索, 遍历数组, 直到找到结果
for (let i = 0, l = aNumbers.length; i < l; i++) {
	if(aNumbers[i] === 5) {
		alert('Found 5');
		break;
	}
}
// 这种算法很常见, 因为在数组中迭代是十分常见的技术
// 此外还有一种线性算法在JS中也常用, 命名特性查找~~~~~~~~~~~
// 命名特性就是对象的基本特性, 如Dog.name
// 尽管看上去它是位于给定对象中的变量, 但实际它是搜索对象中的 所有特性 以找到匹配名称的一个特性(ex.length)
// 因此最好用局部变量或数字索引的数组值来替代命名特性
var aValues = [1,2,3,4,5,6,7,8];

function testFunc() {
	for (let i = 0, l = aValues.length; i < l; i++) {
		alert(i + '/' + l + '=' + aValues[i]);
	}
}
// i < l中 i O(1)
// l = aValues.length 中的 aValues.length 线性 O(n)
// alert(i + '/' + l + '=' + aValues[i]); 中 i O(1), l O(1), aValues[i] O(1)
// 进行代码优化时, 记住这些算法, 下面是使用正确算法的基本规则
// 只要有可能就用局部变量或者数字索引的数组来替代命名特性
// 如果命名特性要多次使用, 就先将它的值存储在局部变量中, 以避免多次使用线性算法请求命名特性的值

// 反转循环
for (let i = 0; i < aValues.length; i++) {

}

for (let i = aValues.length - 1; i >= 0; i--) {

}
// 用常数0作为循环的控制语句以减少执行时间

// 翻转循环
var i = 0;
while(i < aValues.length) {
	//
	i++;
}

//
var i = 0;
do {
	//
	i++;
} while(i < aValues.length);

//
var i = aValues.length - 1;
do {
	//
	i--;
} while(i>=0);

//
var i = aValues.length - 1;
do {
	//
} while(--i>=0);

// 展开循环

// 优化if语句
// 如果预计某个数值一般在0 - 10之间,
if(iNum > 0 && iNum < 10) {

} else if (iNum > 9 && iNum < 20) {

} else if (iNum > 19 && iNum < 30) {

} else {
	// <= 0 || >=30
}
// 总是将最常见的情况放在第一个, 减少了进行多次测试才能遇到正确条件的情况
// 尽量减少else if 语句的数量, 并且将条件按照二叉搜索树的方式进行排列
if(iNum > 0) {
	if(iNum < 10) {

	} else {
		if(iNum < 20) {

		} else {
			if (iNum < 30) {

			} else {

			}
		}
	}
}
// 这看上去很复杂但由于考虑了很多代码潜在如何执行的情况, 所以执行得更快
// 因此测试数字范围时, 先在if条件中测试大于、小于或等于的情况, 然后使用一个else语句来处理其他的可能情况

// switch和if
// 超过两种情况时, 最好使用switch语句, 使用switch 来替代if, 最高可令速度快10倍

// 3.js陷井
// 避免字符串连接(不使用+, 使用StringBuffer)
// 优先使用内置方法(js内置方法时用C++或C之类的语言进行编译的, 运行起来比实时编译的JS快得多)
function power(iNum, n) {
	var iResult = iNum;

	for (let j = 0; j < n; j++) {
		iResult *= iNum;
	}

	return iResult;
}
// 尽管这个函数完全正确, 但是JS已经提供计算幂的方法 Math.pow()
// 最大的区别是Math.pow()是浏览器的一部分, 是由C++编译的, 要比自己写的power() 函数快很多很多

// 存储常用的值
oDiv1.style.left = document.body.clientWidth;
oDiv2.style.left = document.body.clientWidth;
// 将命名特性, 存到局部变量; 改写为
var iClientWidth = document.body.clientWidth;
oDiv1.style.left = iClientWidth;
oDiv2.style.left = iClientWidth;
// 两个线性操作变为一个

// 4. 最小化语句数
// 脚本语句越少, 执行所需的时间越短
// 减少语句数量的方法: 定义变量时, 处理迭代数字时, 使用数组和对象字面量时

// 定义多个变量
var iFive = 5;
var sColor = 'blue';
var aValues = [1, 2, 3];
var oDate = new Date();
// 改写为
var iFive = 5, sColor = 'blue', aValues = [1, 2, 3], oDate = new Date();

// 插入迭代子
// 使用迭代子(在不同位置上加减的值)时, 尽可能合并语句
var sName = aValues[i];
i++;
// 上两句只有一个目的, 第一行语句从 aValues 中获取一个值, 然后将其保存在变量 sName中
// 第二行语句对i进行迭代
// 合并成一条语句
var sName = aValues[i++];
// 完成了前面两条语句所完成的事, 因为增量操作是后置的, 这个语句的其他部分执行完毕才会执行i加一
// 出现类似情况时, 就要将迭代值的操作插到最后使用它的语句中

// 使用数组和对象字面量

// 5.节约使用DOM
// DOM处理是js最耗时的操作
// 不管是添加、删除或者其他对页面的DOM内部结构的更改, 都会导致明显地时间损耗
// 因为每次DOM操作都要更改页面对用户的表现,
// 意味着每次必须对整个页面进行重新计算以保证正确的进行渲染
// 解决这个问题的方法时尽可能对不在DOM文档中的元素进行DOM操作
var oUL = document.getElementById('ulItems');

for (let j = 0; j < 10; j++) {
	var oLi = document.createElement('li');
	oUL.appendChild(oLi);
	oLi.appendChild(document.createTextNode('Item' + i));
}

// 执行速度两大问题
// 第一个问题循环中oUL.appendChild()的调用, 每次执行后整个页面都要进行重新计算并重新渲染
// 第二个问题给列表添加文本节点也会造成页面的重新计算
// 因此每次运行循环都会造成两次页面的重新计算, 总计20次

// 解决, 列表的项目应该在文本节点添加后再添加, 另外可以用文档碎片来保存所有创建的列表项,
// 最后将其一次性添加到列表中
var oUL = document.getElementById('ulItems');
var oFragment = document.createDocumentFragment(); // DOM片段存在于内存中, 还没有安装上

for (let j = 0; j < 10; j++) {
	var oLI = document.createElement('li');
	oLI.appendChild(document.createTextNode('Item' + i));
	oFragment.appendChild(oLI);
}

oUL.appendChild(oFragment);

// 处理DOM文档时, 记住这个技巧, 如果要进行多次改动, 最好在直接应用到文档之前, 用文档碎片来保存改动

