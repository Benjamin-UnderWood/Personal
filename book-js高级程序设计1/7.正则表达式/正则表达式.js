// 正则表达式是具有特殊语法的字符串, 用来表示指定字符或字符串在另一个字符串中出现的情况
// 功能: 删除字符串中的空格、验证信用卡的有效性
// JavaScript对正则表达式的支持是通过 RegExp 类实现的
// RegExp 可以带一个或两个参数
// 第一个参数(或只有一个参数)是描述需要进行匹配的模式字符串
// 如果还有第二个参数, 这个参数则指定了额外的处理指令

var reCat = new RegExp('cat'); // 第一个且区分大小写
var str = 'my cat is cute, my cat is small';
str = str.replace(reCat, 'dog');
console.log(str); // my dog is cute, my cat is small

var reCat1 = new RegExp('cat', 'g'); // 匹配所有出现的 cat 但区分大小写
var str1 = 'my cat is cute, my cat is small';
str1 = str1.replace(reCat1, 'dog');
console.log(str1); // my dog is cute, my dog is small

var reCat2 = new RegExp('cat', 'gi'); // 匹配所有出现的 cat 但区分大小写
var str2 = 'my Cat is cute, my Cat is small';
str2 = str2.replace(reCat2, 'dog');
console.log(str2); // my dog is cute, my dog is small

// 有些正则表达式字面量使用 Perl 风格的语法
var reCat3 = /cat/gi;
var str3 = 'my Cat is cute, my Cat is small';
str3 = str3.replace(reCat3, 'dog');
console.log(str3); // my dog is cute, my dog is small

// 1.1 使用 RegExp 对象
// - 判断某个字符串是否匹配指定的模式, 匹配, true
var sToMatch = 'cat';
var reCat4 = /cat/;
console.log(reCat4.test(sToMatch)); // true

// - RegExp 的 exec() 方法, 接受一个字符串参数, 返回一个数组
// 返回数组的第一个条目是第一个匹配, 其他都是反向引用
var sToMatch1 = 'a bat, a Cat, a fAt baT, a faT cat';
var reAt = /at/;
var arrMatches = reAt.exec(sToMatch1);
console.log(arrMatches);
// ["at", index: 3, input: "a bat, a Cat, a fAt baT, a faT cat", groups: undefined]

// 这里arrMatches只包含一个条目: 第一个 'at’ 的实例(bat)

// 如何获得某个模式所有出现?
// 使用 String 对象的 match() 方法; 它会包含在字符串中的所有匹配的数组
var sToMatch2 = 'a bat, a Cat, a fAt baT, a faT cat';
var reAt2 = /at/gi;
var arrMatches2 = sToMatch2.match(reAt2);
console.log(arrMatches2); // [ 'at', 'at', 'At', 'aT', 'aT', 'at' ]

// search() 字符串方法的行为与 indexOf() 有点类似, 但它使用一个RegExp对象而非仅仅一个子字符串
// search() 方法返回在字符串中出现的第一次匹配的位置
var sToMatch3 = 'a bat, a Cat, a fAt baT, a faT cat';
var reAt3 = /at/i; // /at/gi g无效
console.log(sToMatch3.search(reAt3)); // 3
// 输出 3, 因为'at'第一次在字符串中出现的位置是 3
// 全局匹配正则表达式(带参数g)在使用search()时不起作用

// 1.2 扩展的字符串方法
// -字符串方法replace()也可以接受 正则表达式 作为参数;
// 用另一个字符串(第二个参数)来替换某个字符串(第一个参数)的所有匹配
var sToChange = 'The sky is red.';
console.log(sToChange.replace('red', 'blue')); //

// 使用正则
var sToChange1 = 'The sky is red.';
var reRed = /red/;
console.log(sToChange1.replace(reRed, 'blue')); // The sky is blue.

// 也可以指定一个函数作为 replace() 的第二个参数; 这个函数可以 接受一个参数, 即匹配了的文本,
// 并返回应当进行替换的文本
var sToChange2 = 'The sky is red. The sky is red.';
var reRed2 = /red/;
var sResultText = sToChange2.replace(reRed2, function(sMatch) {
	console.log(sMatch);
	return 'blue';
});

console.log(sResultText); // The sky is blue. The sky is red.
// 这个例子中, 在函数中的sMatch的值总为'red'(因为这是唯一匹配的模式)
// 'red'的首次出现被替换为函数的返回值'blue';
// 函数加上正则表达式处理文本替换的能力是十分强大的, ----------------------------------
// 可以让你使用所有JavaScript的功能来决定什么才是替换文本-----------------------------

// -第二种方法是split(); 它可以将字符串分割成一系列子串并通过一个数组将它们返回
var sColor = 'red,blue,yellow,green';
var arrColors = sColor.split(','); // split at each comma
console.log(arrColors); // [ 'red', 'blue', 'yellow', 'green' ]
// 使用正则表达式
var sColor2 = 'red,blue,yellow,green';
var reComma = /,/;
var arrColors2 = sColor2.split(reComma);
console.log(arrColors2);

// 2 简单模式
// 2.1 元字符
// 元字符是正则表达式语法的一部分; 下面是正则表达式用到的所有元字符
// ( [ \ ^ $ | ) ? * + .
// 任何时候要在正则表达式中使用这些元字符, 都必须对它们进行转义
// ex 匹配一个问号
var reQMark = /\?/;
// 或者这样
var reQMark1 = new RegExp('\\?'); // 必须是两个斜杠
// 当正则表达式以第二种形式表示时, 所有的反斜杠都必须用两个反斜杠来替换
// 因为JavaScript字符串解析器会按照翻译 \n 的方式来翻译 \? ; 因此需要双重转义

// 2.1 使用特殊字符
// 直接使用字符表示它们本身, 也可以使用它们的ASCII码或者Unicode代码指定字符
// 要使用ASCII来表示一个字符, 必须指定一个两位的十六进制代码, 并在前面加上 \x
// ex 字符b的ASCII码为98, 等于十六进制的62, 因此, 字符b可以表示为 \x62
var sColor3 = 'blue';
var reB = /\x62/;
console.log(reB.test(sColor)); // true

// 用八进制代替十六进制指定字符代码, 直接在反斜杠后跟上八进制, b可以表示为 \142
var sColor4 = 'blue';
var reB4 = /\142/;
console.log(reB4.test(sColor4)); // true

// 如果要使用Unicode表示字符, 必须指定字符串的四位的十六进制表示形式; b 62 >> 0062
var sColor5 = 'blue';
var reB5 = /\u0062/;
console.log(reB5.test(sColor5)); // true

// 删除字符串中的所有换行符(常用于处理用户输入的文本)
var sStringWithNewLines = 'i\n love\n you';
console.log(sStringWithNewLines);
var sNewString = sStringWithNewLines.replace(/\n/g, '');
console.log(sNewString); // iloveyou

// 2.3 字符类
// 1.简单类 simple class
// 要匹配字符a、b和c [abc]
// ex 假设想匹配'bat' 'cat' 'fat'
var sToMatch5 = 'a bat, a Cat, a fAt baT, a faT cat';
var reBatCatFat = /[bcf]at/gi;
var arrMatches5 = sToMatch5.match(reBatCatFat);
console.log(arrMatches5); // [ 'bat', 'Cat', 'fAt', 'baT', 'faT', 'cat' ]

// 也可以在简单类(或其他字符类)中包含特殊字符; 下面把字符b替换成它的Unicode形式
var sToMatch6 = 'a bat, a Cat, a fAt baT, a faT cat';
var reBatCatFat6 = /[\u0062cf]at/gi;
var arrMatches6 = sToMatch6.match(reBatCatFat6);
console.log(arrMatches6); // [ 'bat', 'Cat', 'fAt', 'baT', 'faT', 'cat' ]

// 2.负向类 negation class
// 有时候除了特定的一些字符, 可能会想要匹配所有的字符;
// 使用负向类, 可以指定要排除的字符；
// [^ab]表示匹配除了a和b的所有字符; 脱字符号(^)告诉正则表达式字符不能匹配后面跟着的字符
// ex 只想获取包含at但不能以b或c开头单词
var sToMatch7 = 'a bat, a Cat, a fAt baT, a faT cat';
var reBatCatFat7 = /[^bc]at/gi;
var arrMatches7 = sToMatch7.match(reBatCatFat7);
console.log(arrMatches7); // [ 'fAt', 'faT' ]

// 3.范围类 range class
// 字符类仍然要求输入所有包含或者排除的字符; 假设要匹配所有的字母表中的字符, 又不想逐个输入;
// 这种场景可以使用范围类; 指定从a到z之间的范围 [a-z], 表示从a到z
var sToMatch8 = 'num1, num2, num3, num4, num5, num6, num7, num8, num9';
var reOneToFour8 = /num[1-4]/gi;
var arrMatches8 = sToMatch8.match(reOneToFour8);
console.log(arrMatches8); // [ 'num1', 'num2', 'num3', 'num4' ]

// 也可以使用负向范围类, 这样可以排除给定范围内的所有字符
var sToMatch9 = 'num1, num2, num3, num4, num5, num6, num7, num8, num9';
var reOneToFour9 = /num[^1-4]/gi;
var arrMatches9 = sToMatch9.match(reOneToFour9);
console.log(arrMatches9); // [ 'num5', 'num6', 'num7', 'num8', 'num9' ]

// 4.组合类 combination class
// 组合类是由几种其他的类组合而成的字符类
// ex 要匹配所有从a~m的字母以及从1~4的数字, 以及一个换行符, 那么要用到的类应该这样: [a-m1-4\n]
// JavaScript不支持某些其他正则表达式实现中的联合类(union class)和交叉类(intersection class)
// 这意味着不能有类似[a-m[p-z]]或者[a-m[^b-e]]

// 5.预定义类
// 由于某些模式会反复用到, 所以可以使用一组预定义类让我们更方便地指定复杂类
// .     [^\n\r]               除了换行和回车之外的任意字符
// \d    [0-9]                 数字字符
// \D    [^0-9]                非数字字符
// \s    [\t\n\x0B\f\r]        空白字符
// \S    [^\t\n\x0B\f\r]       非空白字符
// \w    [a-zA-Z_0-9]          单词字符(所有的字母、所有的数字和下划线)
// \W    [^a-zA-Z_0-9]         非单词字符

// 使用预定义类可以明显地使模式匹配变得简单
// ex 假设想匹配3个数字, 不用预定义类, 代码是这样的
var sToMatch10 = '567 9838 abc';
var reThreeNums10 = /[0-9][0-9][0-9]/;
console.log(reThreeNums10.test(sToMatch10)); // true
var arrMatches10 = sToMatch10.match(reThreeNums10);
console.log(arrMatches10); // [ '567', index: 0, input: '567 9838 abc' ] 匹配第一个 没有g
// 有 g [ '567', '983' ]

// 使用\d, 正则表达式变得更加明了
var sToMatch11 = '567 9838 abc';
var reThreeNums11 = /\d\d\d/;
console.log(reThreeNums11.test(sToMatch11)); // true

// 2.4 量词 quantifier
// 量词可以指定某个特定模式出现的次数; 可以指定硬性数量(ex某个字符应该出现三次), 也可以指定软性数量(ex这个字符至少应该出现一次)
// 1.简单量词
// ?               出现零次或一次
// *               任意次
// +               至少出现一次
// {n}             一定出现n次
// {n, m}          出现n次到m次之间
// {n,}            至少出现n次

var sToMatch12 = 'bread, read, red';
var reBreadReadOrRed12 = /b?rea?d/g;
var arrMatches12 = sToMatch12.match(reBreadReadOrRed12);
console.log(arrMatches12); // [ 'bread', 'read', 'red' ]

// 也可以写成这样
var sToMatch13 = 'bread, read, red';
var reBreadReadOrRed13 = /b{0,1}rea{0,1}d/g;
var arrMatches13 = sToMatch13.match(reBreadReadOrRed13);
console.log(arrMatches13); // [ 'bread', 'read', 'red' ]

// a* <=> a{0,}
// a? <=> a{0,1}
// a+ <=> a{1,}

// 量词也可以和字符类一起使用
var sToMatch14 = 'bead、baed、beed、baad、bad、bed';
var reBeadBaedBeedBaadBadBed14 = /b[ae]+d/g; // /b[ae]{1,}d/g /b[ae]{1,2}d/g
var arrMatches14 = sToMatch14.match(reBeadBaedBeedBaadBadBed14);
console.log(arrMatches14); // [ 'bead', 'baed', 'beed', 'baad', 'bad', 'bed' ]

// 2.贪婪的、惰性的和支配性的量词
// 贪婪量词
// 先看整个字符串是不是一个匹配。如果没有发现匹配，它去掉最后字符串中的最后一个字符，并再次尝试。
// 如果还是没有发现匹配，那么再次去掉最后一个字符串，这个过程会一直重复直到发现一个匹配或者字符串不剩任何字符。
// 简单量词都是贪婪量词
// 惰性量词
// 先看字符串中的第一个字母是不是一个匹配，如果单独着一个字符还不够，就读入下一个字符，组成两个字符的字符串。
// 如果还没有发现匹配，惰性量词继续从字符串中添加字符直到发现一个匹配或者整个字符串都检查过也没有匹配。
// 惰性量词和贪婪量词的工作方式恰好相反
// 支配量词
// 只尝试匹配整个字符串。如果整个字符串不能产生匹配，不做进一步尝试
var sToMatch15 = "abbbaabbbaaabbb1234";
var re1 = /.*bbb/g;
console.log(re1.test(sToMatch15)); // true
var arrMatches15 = sToMatch15.match(re1);
console.log(arrMatches15); // [ 'abbbaabbbaaabbb' ]  匹配尽可能多的字符 从后往前
// . 点代表的是任意字符, b 也包括在内, 因此 'abbbaabbbaaa' 匹配表达式 .* 的部分, 'bbb'匹配表达式中bbb的部分

// 贪婪量词的工作过程可以这样表示：
// a)abbbaabbbaaabbb1234
// b)abbbaabbbaaabbb123
// c)abbbaabbbaaabbb12
// d)abbbaabbbaaabbb1
// e)abbbaabbbaaabbb //true
// 可以看到，贪婪量词在取得一次匹配后就会停止工作，虽然我们加了'g'(全局匹配)

var re2 = /.*?bbb/g;
var arrMatches16 = sToMatch15.match(re2);
console.log(arrMatches16); // [ 'abbb', 'aabbb', 'aaabbb' ]  匹配尽可能少的字符 从前往后

// 惰性量词的工作过程可以这样表示：
// a)a
// b)ab
// c)abb
// d)abbb //保存结果，并从下一个位置重新开始
//
// e)a
// f)aa
// g)aab
// h)aabb
// j)aabbb //保存结果，并从下一个位置重新开始
//
// e)a
// e)aa
// e)aaa
// e)aaab
// e)aaabb
// e)aaabbb  //保存结果，并从下一个位置重新开始

// var re3 = /.*+bbb/g; // 由于JS是不支持支配量词的
re3.test('abbbaabbbaaabbb1234'); // false - no match
// 因为支配量词仅做一次测试, 如果这个测试失败, 就得不到结果

// 有逗号时
// var sToMatch15 = "abbbaabbbaaabbb1234, bbb";
// var re1 = /.*bbb/g;
// console.log(re1.test(sToMatch15)); // true
// var arrMatches15 = sToMatch15.match(re1);
// console.log(arrMatches15); // [ 'abbbaabbbaaabbb' ]  匹配尽可能多的字符

// var sToMatch15 = "abbbaabbbaaabbb1234, bbb";
// var re2 = /.*?bbb/g;
// var arrMatches16 = sToMatch15.match(re2);
// console.log(arrMatches16); // [ 'abbb', 'aabbb', 'aaabbb', '1234, bbb' ]

// var sToMatch15 = "abbbaabbbaaabbb1234, bbq";
// var re1 = /.*bbb/g;
// console.log(re1.test(sToMatch15)); // true
// var arrMatches15 = sToMatch15.match(re1);
// console.log(arrMatches15); // [ 'abbbaabbbaaabbb' ]  匹配尽可能多的字符

// 3 复杂模式
// 复杂模式不仅仅由字符串和量词组成, 也可以由分组、反向引用、前瞻和其他一些强大的正则表达式组成
// 3.1 分组
// 特定的字符序列可以重复它们自身, 要处理字符序列, 正则表达式支持分组功能
// 分组是通过用一系列包括包围一系列字符、字符类以及量词来使用的;
// 例如假设想匹配字符串'dogdog', 使用目前的知识, 表达式只能写成这样
var reDogDog = /dogdog/g;

// 分组重写表达式
var reDogDog2 = /(dog){2}/g;

var re11 = /(dog)?/; // 0次或者1次
var re222 = /(dog)*/; // 任意次
var re33 = /(dog)+/; // 至少一次

// 通过混合使用字符、字符类和量词, 可以实现一些相当复杂的分组
var sToMatch17 = 'ba,da,bad,dad,baba,dada,badbad,daddad';
var re = /([bd]ad?)+/g; // /([bd]ad?){1,}/g /([bd]ad?){1,2}/g
var arrMatches17 = sToMatch17.match(re);
console.log(arrMatches17); // [ 'ba', 'da', 'bad', 'dad', 'baba', 'dad', 'badbad', 'daddad' ]

// 也可将分组放在分组中间
var sToMatch18 = 'mom, mom and dad';
var reMom = /(mom( and dad)?)/g; // /(mom( and dad)?)+/g
var arrMatches18 = sToMatch18.match(reMom);
console.log(arrMatches18); // [ 'mom', 'mom and dad' ]
// 这个表达式要求'mom'是必须的, 但是字符串' and dad'可以出现零次或一次; 分组还可以用来弥补js所缺乏的一些语言功能
// js trim功能
var reExtraSpace = /^\s*\+(.*?)\s+$/;
// 表达式 .* 就是单个字符匹配任意次，即贪婪匹配。 表达式 .*? 是满足条件的情况只匹配一次，即最小匹配.
// 贪婪量词、惰性量词
// *限定符是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个?就可以实现非贪婪或最小匹配。

// 定义自己的trim()方法

String.prototype.trim = function() {
	var reExtraSpace = /^\s+(.*?)\s+$/;
	return this.replace(reExtraSpace, '$1');
};
var sTest = '  this is a test  ';
console.log(`[${sTest.trim()}]`); // [this is a test]
// 用[]给字符串穿衣服, 能轻易看出是否修剪掉了空白

// 3.2 反向引用
// 存储在分组中的特殊值, 我们称之为 反向引用
var sToMatch = '#123456789';
var reNumbers = /#(\d+)/;
reNumbers.test(sToMatch);
console.log(RegExp.$1); // 123456789
//

// 可以直接在定义分组表达式中包含反向引用, 这可以通过使用特殊转义序列\1、\2等等实现
var sToMatch = 'dogdog';
var reDogDog = /(dog)\1/;
console.log(reDogDog.test(sToMatch)); // 'true'
// 正则表达式首先创建dog的组, 然后又被特殊转义序列\1引用, 使得这个正则表达式等同于/dogdog/

// 反向引用可以用在String对象的replace()方法中, 这通过使用特殊字符序列$1、$2等等
// 来实现
// ex 调换字符串中的两个单词的顺序 '1234 5678' >>> '5678 1234'
var sToChange = '1234 5678';
var re = /(\d{4})(\d{4})/;
var sNew = sToChange.replace(re, '$2 $1');
console.log(sNew);
// 此例中, 正则表达式有两个分组, 每一个分组有四个数字, 在replace()方法的第二个
// 参数中, $2等同于'5678', 而$1等同于'1234', 对应于它们在正则表达式中出现的顺序

// $1,$2...是表示的小括号里的内容
// $1是第一个小括号里的 ,$2是第2个小括号里的
// 比如 /gai([\w]+?)over([\d]+)/
// 匹配 gainover123
// $1= 括号里的 n
// $2= 第2个括号里的 123

// 3.3 候选
// 要对同一个表达式同时匹配'red'和'black'? 这些单词完全没有相同的字符, 这样就要
// 写两个不同的表达式, 分别对两个字符串进行匹配
var sToMatch1 = 'red';
var sToMatch2 = 'black';
var reRed = /red/;
var reBlack = /black/;
console.log(reRed.test(sToMatch1) || reBlack.test(sToMatch1)); // true
console.log(reRed.test(sToMatch2) || reBlack.test(sToMatch2)); // true

// 虽然完成任务, 但是十分冗长;
// 使用另一种方式, 正则表达式的候选操作符

// 候选操作符和ESMAScript的二进制异或一样, 是一个管道符(|), 它放在两个单独的模式之间
var sToMatch1 = 'red';
var sToMatch2 = 'black';
var reRedOrBlack = /(red|black)/;
console.log(reRedOrBlack.test(sToMatch1)); // true
console.log(reRedOrBlack.test(sToMatch2)); // true
// 两个备选项放在一个分组中, 不管哪个被匹配了, 都会存在RegExp $1 中以备将来使用
// (同时也可以在表达式中使用\1). 在第一个测试中, RegExp.$1 等于'red', 在第二个中
// 等于'blue'

var sToMatch1 = 'red';
var sToMatch2 = 'black';
var sToMatch3 = 'green';
var reRedOrBlack = /(red|black|green)/;
console.log(reRedOrBlack.test(sToMatch1));
console.log(reRedOrBlack.test(sToMatch2));
console.log(reRedOrBlack.test(sToMatch3));

// OR模式在事件中一种通常的用法是从用户输入删除不合适的单词, 这对于在线论坛来说非常重要
// 通过针对这些敏感单词使用OR模式和replace()方法, 则很方便地在帖子发布之前去掉敏感内容
var reBadWords = /badword|anotherbadword/gi;
var sUerInput = 'This is a string using badword1 and badword2';
var sFinalText = sUerInput.replace(reBadWords, '****');
console.log(sFinalText);
// This is a string using ****1 and ****2

var reBadWords = /badword|anotherbadword/gi;
var sUerInput = 'This is a string using badword1 and badword2';
var sFinalText = sUerInput.replace(reBadWords, function (sMatch) {
	return sMatch.replace(/./g, '*'); // 任意字符(除去换行和回车之外)
});
console.log(sFinalText);
// This is a string using *******1 and *******2

// 3.4 非捕获性分组
// 创建反向引用的分组, 称之为 捕获性分组;
// 同时还有一种非捕获性分组, 它不会创建反向分组
// 在较长的正则表达式中, 存储反向引用会降低匹配速度, 通过使用非捕获性分组, 仍然
// 可以拥有与匹配字符串序列同样的能力, 而无需存储结果的开销
// 如果要创建一个非捕获性分组, 只要在左括号的后面加上一个问号和一个紧跟的冒号
var sToMatch = '#123456789';
var reNum = /#(?:\d+)/;
reNum.test(sToMatch); // true
console.log(RegExp.$1); // ''; 没有捕获到
// 这个例子的最后一行代码输出一个空字符串, 因为该分组是非捕获性的
// 因为如此, replace() 方法就不能通过RegExp.$x变量来使用任何反向引用,
// 或在正则表达式中使用它

// test
var sToMatch = '#123456789';
var reNumbers = /#(?:\d+)/;
console.log(sToMatch.replace(reNumbers, 'abcd$1'));
// 这段代码输出'abcd$1' 而不是 'abcd123456789'
// 因为'$1'在这里并不被看成一个反向引用, 而直接翻译成字符

// 正则表达式常用的方式——去掉文本中所有的HTML标签, 尤其是在论坛和BBS上,
// 这可以防止游客在他们的发帖中插入恶意或无意错误的HTML
var reTag = /<(?:.|\s)>/;
// 这里使用非捕获性分组是因为在小于号和大于号之间出现的内容并不重要(这些都是要被删除的)

// 可以使用这个模式给String对象创建自己的 stripeHTML() 方法
String.prototype.stripHTML = function () {
	var reTag = /<(?:.|\s)*?>/g;
	return this.replace(reTag, '');
};

// 使用
var sTest = '<b>This would be bold</b>';
console.log(sTest.stripHTML());

// 3.5 前瞻
// 希望当某个特定的字符分组出现在另一个字符串之前时, 才去捕获它, 这时需要使用前瞻
// 前瞻(lookahead)告诉正则表达式运算器向前看一些字符而不移动其位置;
// 同样存在正向前瞻和负向前瞻, 正向前瞻检查的是接下来出现的是不是某个特定字符集,
// 而负向前瞻则是检查接下来的不应该出现的特定字符集
// 创建正向前瞻要将模式放在(?= 和 ) 之间. 注意这不是分组, 虽然它也用到括号
// 事实上, 分组不会考虑前瞻的存在
var sToMatch1 = 'bedroom';
var sToMatch2 = 'bedding';
var reBed = /(bed(?=room))/;
console.log(reBed.test(sToMatch1)); // true
console.log(reBed.test(sToMatch2)); // false
console.log(RegExp.$1); // 'bed'
// reBed只匹配后面跟着'room'的'bed', 因此它能匹配sToMatch而不能匹配sToMatch2
// 用表达式测试sToMatch1后, 这段代码输出RegExp.$1的内容是'bed'
// 而不是'bedroom'. 模式的'room'的部分是包含在前瞻中的, 所以没有作为分组的一部分返回

// 负向前瞻 将模式放在(?! 和 )之间, 匹配 bedding 而不是 bedroom
var sToMatch1 = 'bedroom';
var sToMatch2 = 'bedding';
var reBed = /(bed(?!room))/;
console.log(reBed.test(sToMatch1)); // false
console.log(reBed.test(sToMatch2)); // true
console.log(RegExp.$1); // 'bed'
// 这里, 表达式变成只匹配后面不跟着'room'的'bed', 所以模式匹配'bedding'而不是'bedroom'

// 3.6 边界
// ^     行开头
// $     行结尾
// \b    单词的边界
// \B    非单词的边界
// 假设想查找一个单词, 但它只出现在行尾, 可以使用$来表示它
// \ 这是引用符，用来将这里列出的这些元字符当作普通的字符来进行匹配。
// 例如正则表达式\$被用来匹配美元符号，而不是行尾，类似的，正则表达式\.用来匹配点字符，而不是任何字符的通配符
var sToMatch = 'Important word is tha last one.';
var reLastWord = /(\w+)\.$/; // 一个至少一个字符的单词并且以.结尾
reLastWord.test(sToMatch);
console.log(RegExp.$1); // one
// 在一行结束之前出现的跟着句号的一个或多个单词字符

// 还可以容易获取到一行的第一个单词, 使用脱字符号(^)
var sToMatch = 'Important word is tha last one.';
var reFirstWord = /^(\w+)/; // 一个至少一个字符的单词并且行首
reFirstWord.test(sToMatch);
console.log(RegExp.$1); // Important

// 这个例子也可以用单词边界实现
var sToMatch = 'Important word is tha last one.';
var reFirstWord = /^(.+?)\b/; // 惰性
reFirstWord.test(sToMatch);
console.log(RegExp.$1); // Important
// 正则表达式用惰性量词来制定在单词边界之前就可以出现任何字符, 并且可以出现一次或多次(字符),
// 如果使用贪婪量词, 表达式就匹配整个字符串(因为可以包含空白)

// 使用单词边界可以方便地从字符串中抽取单词
var sToMatch = 'First second third fourth fifth sixth';
var reWords = /\b(\S+?)\b/g;
var arrWords = sToMatch.match(reWords); // ["First", "second", "third", "fourth", "fifth", "sixth"]
// 注意行的开始和行的结束, 通常由^和$表示位置, 对应地也认为是单词的边界, 所以'First' 'sixth'也在结果中

// 这并非唯一的获取句子中所有单词的方法
// 更加简单的方法是使用单词字符类(\w)
var sToMatch = 'First second third fourth fifth sixth';
var reWords = /(\w+)/g;
var arrWords = sToMatch.match(reWords); // ["First", "second", "third", "fourth", "fifth", "sixth"]

// 3.7 多行模式
// 行边界的开始和结束的匹配
// 单行模式显而易见, 多行呢? 可以使用split()方法将字符串分割成行与行的数组, 但就是得对每一行单独进行正则表达式测试
var sToMatch = 'First second\nthird fourth\nfifth sixth';
var reLastWordOnLine = /(\w+)$/g;
var arrWords = sToMatch.match(reLastWordOnLine); // sixth
// 唯一包含的匹配是 'sixth', 因为只有它在字符串的结尾处,然而 有两个换行符, 'second' 与 'fourth'
// 也应该返回; 这就是引入多行模式的原因

// 要指定多行模式, 只要在正则表达式后面添加一个m选项, 这会让$边界匹配换行符(\n)以及字符串真正的结尾
var sToMatch = 'First second\nthird fourth\nfifth sixth';
var reLastWordOnLine = /(\w+)$/gm;
var arrWords = sToMatch.match(reLastWordOnLine); // ["second", "fourth", "sixth"]

// 多行模式同样也会改变^边界的行为, 这时他会匹配换行符之后的位置(以及字符串真正的开头)
var sToMatch = 'First second\nthird fourth\nfifth sixth';
var reFirstWordOnLine = /^(\w+)/gm;
var arrWords = sToMatch.match(reFirstWordOnLine); // ["First", "third", "fifth"]


// ^是正则表达式匹配字符串开始位置, 可以看到在以^开始的正则, 只从左边第一个字符匹配
// 如果没匹配到, 那整个匹配就是失败的
var sToMatch19 = 'http://blog.seetiny.com';
var re19 = /^blog/;
var arrMatches19 = sToMatch19.match(re19);
console.log(arrMatches19); // null
console.log(sToMatch19.replace(re19, 'jimmy')); // http://blog.seetiny.com

var sToMatch20 = 'http://blog.seetiny.com';
var re20 = /^http/;
var arrMatches20 = sToMatch20.match(re20);
console.log(arrMatches20); // [ 'http', index: 0, input: 'http://blog.seetiny.com' ]
console.log(sToMatch20.replace(re20, 'jimmy')); // jimmy://blog.seetiny.com

// $
var sToMatch21 = 'http://blog.seetiny.com';
var re21 = /com$/;
var arrMatches21 = sToMatch21.match(re21);
console.log(arrMatches21); // [ 'com', index: 20, input: 'http://blog.seetiny.com' ]
console.log(sToMatch21.replace(re21, 'jimmy')); // http://blog.seetiny.jimmy

var sToMatch22 = 'http://blog.seetiny.com';
var re22 = /iny$/;
var arrMatches22 = sToMatch22.match(re22);
console.log(arrMatches22); // null
console.log(sToMatch22.replace(re22, 'jimmy')); // http://blog.seetiny.com

// 同时使用^和$
var sToMatch23 = 'http://blog.seetiny.com';
var re23 = /^iny$/;
var arrMatches23 = sToMatch23.match(re23);
console.log(arrMatches23); // null
console.log(sToMatch23.replace(re23, 'jimmy')); // http://blog.seetiny.com

var sToMatch24 = 'http://blog.seetiny.com';
var re24 = /^http:\/\/blog.seetiny.com$/;
var arrMatches24 = sToMatch24.match(re24);
console.log(arrMatches24); // [ 'http://blog.seetiny.com', index: 0, input: 'http://blog.seetiny.com' ]
console.log(sToMatch24.replace(re24, 'jimmy')); // jimmy

// ^和$用处非常多，常见的就是使用sublime编辑给每行文本开始和技术加引号，括号逗号什么的，非常方便
// 例如有一堆字符串要写SQL插入到数据库(行首, 行尾)
// 85353001071
// 85353001071
// 85959001280
// 81106513888
// 81106513888
// 81106513888
// 81106513888
// 81106514054
// 81106514054
// 非常简单的就能处理成下面的样子
// ("85353001071",
// 	"85353001071",
// 	"85959001280",
// 	"81106513888",
// 	"81106513888",
// 	"81106513888",
// 	"81106513888",
// 	"81106514054",
// 	"81106514054")

// 7.4 理解RegExp对象
// js中每个正则表达式都是一个对象, 同其他的对象一样
// RegExp实例和构造函数都有属性, 两者的属性在创建模式和进行测试时都会发生改变
// 7.4.1
// global——Boolean值, 表示g(全局选项)是否已经设置
// ignoreCase——Boolean值, 表示i(忽略大小写选项)是否已经设置
// lastIndex——整数, 代表下次匹配将会从哪个字符位置开始(只有当使用exec()或test()函数才会填入,否则为0)
// multiline——Boolean值, 表示m(多行模式选项)是否已经设置
// source——正则表达式的源字符串形式, ex/[ba]*/的source将返回"[ba]*"

// 一般不会使用global、ignoreCase、multiline和source属性,因为一般之前就已经知道了这些数据
var reTest = /[ba]*/i;
console.log(reTest.global); // false
console.log(reTest.ignoreCase); // true
console.log(reTest.multiline); // false
console.log(reTest.source); // [ba]*

// 真正有用的属性是lastIndex, 它可以告诉你正则表达式在某个字符串中停止之前, 查找了多远
var sToMatch = 'bbq is short for barbecue';
var reB = /b/g;
reB.exec(sToMatch);
console.log(reB.lastIndex); // 1
reB.exec(sToMatch);
console.log(reB.lastIndex); // 2
reB.exec(sToMatch);
console.log(reB.lastIndex); // 18
reB.exec(sToMatch);
console.log(reB.lastIndex); // 21
// reB查找的是, 当它首次检测sToMatch时, 它发现在第一个位置——也就是位置0, 是b; 因此, lastIndex属性被
// 设置成1, 再次调用exec() 时就从这个地方开始执行; 再次调用exec(), 表达式在位置1又发现了b, 于是将
// lastIndex设置为2, 第三次调用, 发现b在位置17, 于是又将lastIndex设置为18, 如此继续

// 如果想从头匹配可以将lastIndex设置为0
var sToMatch = 'bbq is short for barbecue';
var reB = /b/g;
reB.exec(sToMatch);
console.log(reB.lastIndex); // 1
reB.lastIndex = 0;
reB.exec(sToMatch);
console.log(reB.lastIndex); // 1 又从头开始匹配

// 7.4.2 静态属性
// input          $_    最后用于匹配的字符串(传递给exec()或test()的字符串)
// lastMatch      $&    最后匹配的字符
// lastParen      $+    最后匹配的分组
// leftContext    $`    在上次匹配的前面的子串
// rightContext   $'    在上次匹配之后的子串
// multiline      $*    用于指定是否所有的表达式都使用多行模式的布尔值
// 这些属性可以告诉你关于刚使用的exec() 或 test() 完成的匹配的一些特定信息
var sToMatch = 'this has been a short, short summer';
var reShort = /(s)hort/g;
reShort.test(sToMatch);
console.log(RegExp.input);        // this has been a short, short summer
console.log(RegExp.leftContext);  // this has been a
console.log(RegExp.rightContext); // , short summer
console.log(RegExp.lastMatch);    // short
console.log(RegExp.lastParen);    // s
// 使用
// input属性总是等于测试用的字符串
// RegExp.leftContext 包含第一个实例'short'之前的所有字符,
// 同时 RegExp.rightContext 包含第一个实例'short'之后的所有字符
// lastMatch的属性包含最后匹配整个正则表达式的字符串, 也就是'short'
// lastParen 属性包含最后匹配的分组, 这里是's'
// 也可以使用这些属性的短名字, 并且对其中大部分名字必须使用方括号标记, 因为有些名字在ECMAScript的语法中不合法
var sToMatch = 'this has been a short, short summer';
var reShort = /(s)hort/g;
reShort.test(sToMatch);
console.log(RegExp.$_);       // this has been a short, short summer
console.log(RegExp["$`"]);    // this has been a
console.log(RegExp["$'"]);    // , short summer
console.log(RegExp["$&"]);    // short
console.log(RegExp["$+"]);    // s

// 每次执行exec()或test()时, 所有属性(除multiline外)都会被重新设置
var sToMatch1 = 'this has been a short, short summer';
var sToMatch2 = 'this has been a long, long summer';
var reShort = /(s)hort/g;
var reLong = /(l)ong/g;

reShort.test(sToMatch1);
console.log(RegExp.$_);       // this has been a short, short summer
console.log(RegExp["$`"]);    // this has been a
console.log(RegExp["$'"]);    // , short summer
console.log(RegExp["$&"]);    // short
console.log(RegExp["$+"]);    // s

reShort.test(sToMatch2);
console.log(RegExp.$_);       // this has been a long, long summer
console.log(RegExp["$`"]);    // this has been a
console.log(RegExp["$'"]);    // , long summer
console.log(RegExp["$&"]);    // long
console.log(RegExp["$+"]);    // l

// 这里第二个正则表达式reLong, 是在reShort之后使用的, 所有的RegExp属性都设成新的值

// 而multiline属性不同于其他属性, 不依赖于最后一次执行的匹配
// 相反它可以设置所有的正则表达式的m选项
var sToMatch = 'First second\n third fourth\nfifth sixth';
var reLastWordOnLine = /(\w+)$/g;
RegExp.multiline = true;
var arrWords = sToMatch.match(reLastWordOnLine); //["sixth"]
// 大部分浏览器不支持, 还是换成 /(\w+)$/gm
var sToMatch = 'First second\n third fourth\nfifth sixth';
var reLastWordOnLine = /(\w+)$/gm;
var arrWords = sToMatch.match(reLastWordOnLine); // ["second", "fourth", "sixth"]

// 5 常用模式
// 正则表达式常用来在发送数据到服务器之前对用户的输入进行验证
// Web上最常见的几种用于测试的模式是
// 日期
// 信用卡号
// URL
// E-mail地址

// 5.1 验证日期
var reDate = /\d{1,2}\/\d{1,2}\/\d{4}/;
console.log(reDate.test('6/13/2004'));  // true
console.log(reDate.test('25/06/2004')); // true
// 55/44/2004
// 天数
var reDay = /[0-3]?[0-9]/;
// 32 - 39 也会匹配
var reDay1 = /0[1-9]|[12][0-9]|3[01]/; // 几乎没有漏洞
//月份
var reMonth = /0[1-9]|1[0-2]/;

// 将日期限制在1900-2099年之间, 考虑到2099年来的那一天, 用这些代码的系统肯定已经被放进垃圾箱了
var reYear = /19|20\d{2}/;
// 这个模式声明, 年份必须以19或者20开头, 后面跟两个数字

// ?: 是 不想被捕获的时候使用 可以提高程序执行速度
var reDate1 = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
// 注意整个模式是将日期的每个部分放入非捕获性分组中, 这是为了确保可选项不会互相冲突; 当然, 如果需要, 也可以使用捕获性分组

// 最后, 使用一个函数来检测日期是否有效, 通过把正则表达式包装成函数 isValidDate() 并进行测试
function isValidDate(sText) {
	var reDate = /(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[0-2])\/(?:19|20\d{2})/;
	return reDate.test(sText);
}
// 调用
console.log(isValidDate('5/5/2004'));  // true
console.log(isValidDate('10/12/2009'));// true
console.log(isValidDate('6/13/2000')); // false

// 5.2 验证信用卡号
// 为避免再返回服务器, 可以创建一些简单的模式来判断一个信用卡号是否有效, 前端验证
// MasterCard 的信用卡号开始; 信用卡16位, 前两个数字必须是51-55之间的数字
var reMasterCard = /^5[1-5]\d{14}$/;
// 脱字符和美元符, 表示输入字符串的开头和结尾以保证匹配整个字符串, 而不仅仅是它的一部分
// 问题, 每四个数码之间有空格或短横 5555-5555-5555-5555
var reMasterCard = /^5[1-5]\d{2}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}$/;
// 真正检验信用卡号, 用到Luhn算法
// Luhn算法是验证唯一标示符的方法, 常常用来验证信用卡号
// 然而, 必须从用户输入中抽取出数字, 才能将数字应用于这个算法, 因此必须加入捕获性分组
var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;

function isValidMasterCard(sText) {
	var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;

	if (reMasterCard.test(sText)) {
		var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;

		// Luhn algorithm here

	} else {
		return false;
	}
}

// Luhn 算法有四步, 第一步是从卡号的最后一个数字开始, 并逆向地逐个将奇数位置(1、3等)的数字相加
function luhnCheckSum(sCardNum) {
	var iOddSum = 0;
	var bIsOdd = true;

	for (let i = sCardNum.length - 1; i >= 0; i--) {
		var iNum = parseInt(sCardNum.charAt(i));

		if(bIsOdd) {
			iOddSum += iNum;
		}

		bIsOdd = !bIsOdd;
	}
}

// 第二步是将偶数位置的数字相加
// 且必须先将数字乘以2, 然后如果结果是两位数, 必须将两个位上的数字相加, 然后将结果加入到总和中
function luhnCheckSum(sCardNum) {
	var iOddSum = 0;
	var iEvenSum = 0;
	var bIsOdd = true;

	for (let i = sCardNum.length - 1; i >= 0; i--) {
		var iNum = parseInt(sCardNum.charAt(i));
		if(bIsOdd) {
			iOddSum += iNum;
		} else {
			iNum = iNum * 2;
			if(iNum > 9) {
				iNum = eval(iNum.toString().split('').join('+'));// eval 用于计算含表达式的字符串
			}
			iEvenSum += iNum;
		}

		bIsOdd = !bIsOdd;
	}
}
// 字符串传给eval(), 可以将字符串翻译为代码并执行(这样"1+2"就返回3)

// 最后一步将两个总和(奇数部分和偶数部分)相加并对结果取模(余数), 如果数字是合法的, 那么结果应该可以被10整除
function luhnCheckSum(sCardNum) {
	var iOddSum = 0;
	var iEvenSum = 0;
	var bIsOdd = true;

	for (let i = sCardNum.length - 1; i >= 0; i--) {
		var iNum = parseInt(sCardNum.charAt(i));
		if(bIsOdd) {
			iOddSum += iNum;
		} else {
			iNum = iNum * 2;
			if(iNum > 9) {
				iNum = eval(iNum.toString().split('').join('+'));// eval 用于计算含表达式的字符串
			}
			iEvenSum += iNum;
		}

		bIsOdd = !bIsOdd;
	}

	return ((iEvenSum + iOddSum) % 10 === 0);
}

// 把这个方法加入到验证函数
function isValidMasterCard(sText) {
	var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;

	if (reMasterCard.test(sText)) {
		var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;

		// Luhn algorithm here
		return luhnCheckSum(sCardNum);

	} else {
		return false;
	}
}

// 至于其他类的信用卡号, 必须了解管理这些卡号的规则
// Visa卡号可能13位或16位, 且首位数字总是4,
var reVisa = /^(4\d{12}(?:\d{3})?)$/;
function isValidVisa(sText) {
	var reVisa = /^(4\d{12}(?:\d{3})?)$/;

	if(reVisa.test(sText)) {
		return luhnCheckSum(RegExp.$1);
	} else {
		return false;
	}
}

// 7.5.3 验证电子邮件地址
// RFC2822
// 格式 字符串 + @ + 字符串
// @前至少有一个字符, 其后至少有三个字符, 这三个字符中第二个必须是个句号(a@a.b有效, a@a无效, a@a.无效)
var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)+\w+$/;
function isValidEmail(sText) {
	var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
	return reEmail.test(sText);
}

// 正则表达式以非捕获性分组(?:\w+\.?)开始, 告诉你至少一个单词字符可以跟零个或一个句号, 这部分可以出现任意次(a.b.c.d), 星号
// \w+@保证@之前至少有一个单词字符, 然后紧跟一个非捕获性分组(?:\w+\.), 它可以出现一次或多次, 所以使用加号,
// 表达式最后一部分是\w+$, 表示一行的最后字符必须是一个单词字符, 因此'john@doe.'地址不合法

// 7.6 小结
// 正则表达式 Perl风格和RegExp构造函数
// 字符字面量 >> 字符类、量词和分组
// 高级正则表达技巧 候选项、前瞻、边界和多行模式
// 应用 删除多余空格和不必要的HTML, 验证日期、信用卡号和电子邮件地址