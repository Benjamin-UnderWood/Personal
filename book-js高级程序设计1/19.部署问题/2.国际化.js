// 1.使用js检测语言
var sLang = navigator.language || navigator.browserLanguage; // 后面是IE
// 用这段代码可以判断正在浏览页面的用户的浏览器是否有不支持的语言设置, 并采取
// 合适的动作, 比如将访客重定向到另一个合适的页面
if(sLang.toLowerCase() === 'fr') {
	document.location.replace('index_fr.htm');
}

// 2.策略
// 不使用硬编码
alert('The date you entered is incorrect');
// 改成
var sIncorrectDateMessage = 'The date you entered is incorrect';
// more code here
alert(sIncorrectDateMessage);
// 其他国际化字符串也应该与这个变量放在一起, 这样即可在同一个地方修改任何字符串

// 处理国际化字符串的最佳做法是, 将字符串放入不同的js代码中
// 支持的每种语言都有单独的js文件
// Strings_en.js
// Strings_de.js
// Strings_fr.js
// 然后用服务端的逻辑来确保包含正确的文件, 在PHP中可以这样
$supported = array('en', 'de', 'fr');
if (in_array($lang, $supported)) { // 比js更加语义化
	$filename = 'String_$lang.js';
} else {
	$filename = 'String_en.js';
}

// <script type="text/javascript"
//         src="script/<?php echo $filename ?>"></script>
// $lang变量包含要使用的语言, 在受支持的数组($supported)中寻找与其匹配的项
// 如果支持这个语言, 就载入相应的js文件
// 这确保为给定语言使用了正确的js字符串值, 同时, 如果遇到不支持的语言, 则设置
// 为默认语言('兜底', 保证代码的健壮性)

// 3字符串的思考
// ES第一版引入Unicode字符(数量65000个, 而ASCII为128个), 有效保证ECMASCript
// 可以处理任意一种语言的字符串
// 3.1.Unicode
// Unicode为了给处理世界上存在的所有字符提供统一的编码
// 在Unicode之前, 每种语言都有自己的编码, 意味着同样的代码在不同的语言中可能表示不同的字符
// Unicode将字符表示为一个16位数字, 可容纳超过65000个字符, 这使其成为实现国际化
// 的理想解决方案; 此外前128个Unicode字符其实就是原来的128个ASCII字符, 这也使得兼容老的
// 英语应用更简单
// 3.2 在js中表示的形式
// 所有Unicode字符,包括ASCII, 在Unicode中都表示为四位十六进制数值, 前面加上一个\u表示
// 这是一个Unicode字符;
// \u002d\u0031  -1
// \u0030         0
// \u0031         1
// ...
// \u0031\u0030   10
// \u0031\u0035   15
// \u0040         @
// \u0041         A
// \u0042         B
// \u0043         C
// \u0044         D
// \u0045         E
// \u0046         F
// \u0047         G
// \u0048         H
// \u0049         I
// \u004a         J
// \u004b         K
// \u004c         L
// \u004d         M
// \u004e         N
// \u004f         O
// \u0050         P
// \u005a         Z

// \u0045是E的Unicode形式(使用ASCII的方式表示为\x45)
// 这种表示方法可以用在js的注释及字符串中, 就像使用特殊字符\n一样
alert('\u0048\u0045\u004C\u004C\u004F \u0057\u004F\u0052\u004C\u0044');
// 运行结果弹出包含文字 'HELLO WORLD'
// 使用Unicode字符集, 可以创建任何语言的消息; 尽管这种消息的纯文本对人来说并不是可读的,
// 但它是唯一可以处理其他语言的多字节字符的方法

// 3.3 浏览器和操作系统支持
// js可显示和理解Unicode字符,并不代表操作系统也可以
// 为什么只需关注浏览器支持的web开发者, 还需要关心这个问题
// 这是因为js使用了一些操作系统的功能来完成这个任务
// 使用alert()、confirm()或者prompt()时, 实际上使用操作系统的对话框,
// 除非客户端操作系统已安装了多语言支持, 否则最后看到的是内容乱七八糟的对话框
// 对操作系统对话框使用国际化支持时, 当心这些问题, 处理分布式Web应用时, 最好能为用提示
// 这个限制, 在公用网站上, 最好完全避免使用这些对话框

// 3.4 防止错误的字符串
// <% String sJspHeSaidHi = "He said, \"hi.\""; %>
// <script type="text/javascript">
	var sJavaScriptHeSaidHi = "<%= sJspHeSaidHi %>";
	alert(sJavaScriptHeSaidHi);
// <script>
// 输出到浏览器中的结果
// <script type="text/javascript">
// 	var sJavaScriptHeSaidHi = "He said, "hi."";
// 	alert(sJavaScriptHeSaidHi);
// <script>
// 问题: 从JSP输出的字符串中包含了引号, 这在js中会导致错误(双引号里的双引号)
// 这是用js输出字符串的国际化网页中经常会出现的错误
// 如果字符串要被输入到js代码中, 必须当心包含在其中的引号, 处理该问题的最佳方法
// 在输出到js之前, 先替换字符串中的引号
// <% String sJspHeSaidHi = "He said, \"hi.\""; %>
// <script type="text/javascript">
// var sJavaScriptHeSaidHi = "<%= sJspHeSaidHi.replace("\\\"","\\\"") %>";
// alert(sJavaScriptHeSaidHi);
// <script>
// 用Java的replaceAll()将所有的双引号替换成反斜杠加双引号, 第一个参数是正则表达式的
// 字符串表示形式(正则表达式字符串必须进行双重转义, 因此\"要变成\\\")
// 第二个参数虽然看起来一样, 但它不是正则表达式而是普通的字符串
// "He said, \"hi.\"" >>> "He said, \\\"hi.\\\""
// 输出到js后, 得到合法的字符串
// <script type="text/javascript">
// var sJavaScriptHeSaidHi = "He said, \"hi.\"";
// alert(sJavaScriptHeSaidHi);
// <script>

// 5. 使用双引号
// 国际化时, 单引号遇到问题比双引号更频繁, 因此只使用双引号来表示字符串被认为是最佳的
