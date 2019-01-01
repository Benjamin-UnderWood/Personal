var log = function() {
    console.log.apply(console, arguments)
}

var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}

// 作业 1
// 返回 单个元素 在 字符串中 的 下标；用于大小写转换，一 1转换;
// 函数作用 是 返回下标
var a = 'abcd'
var b ='a'
a[0] == b// a[0] == b[0] (a[0] is a Sting)
// 自己解法
var find = function(s1, s2) {
    /*
    s1 s2 都是 string
    但 s2 的长度是 1

    返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
    */
    var l = s1.length
    var result = -1;
    for (var i = 0; i < l; i++) {
        // 目的是找到 一个 i 使得 s1[i] == s2; 效率低 必须循环(不管存不存在)
        var char = s1[i];
        if (char == s2) {
            result = i;
            break;
        }
    }
    return result;
}
// 测试函数
var test_find = function() {
    ensure(find(" dad ","a") === 2, '测试1失败')
    ensure(find(" sd","a") === -1, '测试2失败')
    ensure(find("145 "," ") === 3, '测试3失败')
    ensure(find("d5wd","5") === 1, '测试4失败')
}
test_find()

// 老师解法
var find = function(s1, s2) {
    var len = s1.length
    if(s1.includes(s2)) {
        // 先判断 是否 包含 ，再去找，如果不包含,就不用for 循环；直接 返回 -1;效率
        //更高
        for (var i = 0; i < len; i++) {
            var str = s1[i]
            if (str == s2) {
                // log("i 的值:",i) return 后就跳出循环 返回一个i值 注意
                return i
            }
        }
    }
    //log(-1)
    return -1
}

var s1 = 'abcdefgh'
var s2 = 'c'
find(s1,s2)
/*
下面给出一个例子作为后面作业的参考
返回字符串的小写形式的函数
注意, 这里假设了 s 字符串全是大写字母
*/
// 这里是两个字符串, 包含了大写字母和小写字母
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var lowercase = function(s) {
    // 初始化一个空字符串
    var result = ""
    for (var i = 0; i < s.length; i++) {
        // 注意, 这个 find 是你要实现的函数
        var index = find(upper, s[i])
        // 字符串可以用加号拼接, 不明白可以 log 一下
        result += lower[index]
    }
    return result
}

lowercase('SDEW')

var test_lowercase = function() {
    ensure(lowercase('SDEW') === 'sdew','测试1失败')
}
test_lowercase()



// 自己 测验
var list = [1]
var a = '123'
list.push(a[0])
list
 // 返回 [1, "1"] 注意数组 能push 字符串不能

var Chinese = '一二三四五六七八九'; // 未定义 无效

// 1.定义 find 函数，用于返回 在字符串中的 index
var find = function(s1,s2) {
    var len = s1.length;
    if (s1.includes(s2)) {
        for (var i = 0; i < len; i++) {
            var str = s1[i];
            if (str == s2) {
                return i;
            }
        }
    }
    return -1;
}

// 测试函数
var test_find = function() {
    ensure(find(" dad ","a") === 2, '测试1失败');
    ensure(find(" sd","a") === -1, '测试2失败');
    ensure(find("145 "," ") === 3, '测试3失败');
    ensure(find("d5wd","5") === 1, '测试4失败');
}
test_find()


// 2. 数字 转译成 字母
var Numbers = '123456789';
var Letters = 'abcdefghi';

var NumsToLetts = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(Numbers,s[i]);
        // 搞清楚 谁包含谁 该注意的地方 注意(抓易错的重点)
        result += Letters[index];
        // 字符  用 拼接
        // list.push(Wordse[index]) 无效; 要是是数组 才能 push
    }
    return result;
}
// 测试
var test_NumsToLetts = function() {
    ensure(NumsToLetts('123') === 'abc','测试1失败');
    ensure(NumsToLetts('985211') === 'ihebaa','测试2失败');
}
test_NumsToLetts()



/*
作业 2

定义一个函数
参数是一个字符串 s
返回大写后的字符串
注意, 假设 s 字符串全是小写字母

注意, 自行实现测试函数
*/
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var uppercase = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(lower,s[i]);
        result += upper[index];
    }
    return result;
}

var test_uppercase = function() {
    ensure(uppercase('abc') === 'ABC','error1');
    ensure(uppercase('ggij') === 'GGIJ','error1')
}
test_uppercase()



/*
作业 3

实现 lowercase1
它能正确处理带 大写字母 的字符串s
返回 小写字母 的字符串
*/
'CDaiNdn'   转化  'cdaindn'
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}

var test_lowercase1 = function() {
    ensure(lowercase1('ABC') === 'abc','error1');
    ensure(lowercase1('GgiNj') === 'gginj','error2')
}
test_lowercase1()


/*
作业 4

实现 uppercase1
它能正确处理带 大写字母 的字符串
小写变大写
*/
'acmGlYx'     'ACMLGLYX'

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var uppercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (lower.includes(s[i])) {
            // 如果 是小写 那就变 大写
            var index = find(lower,s[i]);
            result +=  upper[index];
        } else {
            // 如果 不是小写 那就直接 拼接
            result += s[i];
        }
    }
    return result;
}

var test_uppercase1 = function() {
    ensure(uppercase1('dadEG') === 'DADEG','测试1失败')
    ensure(uppercase1('wWedaaLo') === 'WWEDAALO','测试2失败')
}
test_uppercase1()



/*
作业 5
实现一个叫 凯撒加密 的加密算法, 描述如下
对于一个字符串, 整体移位, 就是加密
以右移 1 位为例
原始信息 'afz' 会被加密为 'bga'
实现 encode1 函数, 把明文加密成密码并返回
右移 1 位

注意, 假设字符串一定只包含小写字符
*/
//  考虑 溢出 比如 超过了给定的范围  9 + 1 =0
'dhy' 'eiz'
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// lower.length = 26; indexmax = 25;
var encode1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(lower,s[i]);
        var next = (index + 1) % 26;
        // index 25 的时候是特殊的；下一个是 0；单单 +1 无法解决；
        // 分类 也能解决；但是 不统一
        result += lower[next];
    }
    return result;
}

var test_encode1 = function() {
    ensure(encode1('afz') === 'bga', "encode1测试1")
    ensure(encode1('crp') === 'dsq', "encode1测试2")
}
test_encode1()

/*
作业 6
实现 decode1 函数, 把作业 5 加密的密码解密为明文并返回
*/
'eiz' 'dhy'
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 注意  a  转译的结果是  z
var decode1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(lower,s[i]);
        var next = (index + 25) % 26;
        // index 0 的时候是特殊的；下一个是 25；单单 -1 无法解决；
        // 注意 该类问题 总是拿 数组的长度 来取余数
        // 分类 也能解决；但是 不统一
        result += lower[next];
    }
    return result;
}

var test_decode1 = function() {
    ensure(decode1('bga') === 'afz', "encode1测试1")
    ensure(decode1('dsq') ==='crp', "encode1测试2")
}
test_decode1()



/*
作业 7
实现 encode2
多了一个参数 shift 表示移的位数
*/

var encode2 = function(s,shift) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(lower,s[i]);
        var next = (index + shift) % 26;
        result += lower[next];
    }
    return result;
}

var test_encode2 = function() {
    ensure(encode2('afz',1) === 'bga', "encode1测试1")
    ensure(encode2('mxc',5) === 'rch', "encode1测试2")
}
test_encode2()

/*
作业 8
实现 decode2
多了一个参数 shift 表示移的位数
*/

var decode2 = function(s,shift) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var index = find(lower,s[i]);
        var next = (index + 26 - shift) % 26;
        // var Nextindex = ( Curentindex + shift ) %  len;
        // 注意 该类问题 总是拿 数组的长度 来取余数  循环
        // 分类 也能解决；但是 不统一
        result += lower[next];
    }
    return result;
}

var test_decode2 = function() {
    ensure(decode2('afz',1) === 'zey', "encode1测试1")
    ensure(decode2('mxc',5) === 'hsx', "encode1测试2")
}
test_decode2()


/*
作业 9
实现 encode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样
*/
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 将 大写的 转化成 小写的
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}



var encode3 = function(s,shift) {
    str = lowercase1(s)
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (lower.includes(str[i])) {
            // 如果是 字母
            var index = find(lower,str[i]);
            var next = (index + shift) % 26;
            result += lower[next];
            // 也可以直接调用 encode2 result += encode2(str[i],shift)
        }else {
            result += str[i];
            // 如果不是 字母， 就直接  拼接上去
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}

var test_encode3 = function() {
    ensure(encode3('5465WD4afz',1) === '5465xe4bga', "encode1测试1")
    ensure(encode3(' 5~m@365!xc',5) === ' 5~r@365!ch', "encode1测试2")
}
test_encode3()


/*
作业 10
实现 decode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样
*/
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 将 大写的 转化成 小写的
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}


var decode3 = function(s,shift) {
    var str = lowercase1(s);
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (lower.includes(str[i])) {
            /*var index = find(lower,str[i]);
            var next = (index + 26 - shift) % 26;
            result += lower[next];*/
            result += decode2(str[i],shift)
        } else {
            result += str[i];
        }

    }
    return result;
}

var test_decode3 = function() {
    ensure(decode3('W2玩儿3af$%(SD)z',1) === 'v2玩儿3ze$%(rc)y', "encode1测试1")
    ensure(decode3('mW嗲2+*/.,xDW3c',5) === 'hr嗲2+*/.,syr3x', "encode1测试2")
}
test_decode3()



/*
作业 11
知乎有一个求助题, 破译密码的
链接在此
https://www.zhihu.com/question/28324597
这一看就是凯撒加密...
如果没思路, 可看本文件最后的提示
我把密码放在下面, 请解出原文
*/

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// var lower = upper.toLowerCase() 转大写
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}

var code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'

var decode3 = function(s,shift) {
    var str = lowercase1(s);
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (lower.includes(str[i])) {
            /*var index = find(lower,str[i]);
            var next = (index + 26 - shift) % 26;
            result += lower[next];*/
            result += decode2(str[i],shift)
        } else {
            result += str[i];
        }

    }
    return result;
}
/*var final = function() {
    var result = [];
    for (var i = 0; i < 26; i++) {
        var char = decode3(code,i);
        result.push(char);
    }
    return result;
}*/

//final()

// 写一个 得分 排序
var rank = function(wordList) {
    var score = 0;
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i];
        if(words.includes(word)) {
            score++;
        }
    }
    return score;
}

var decode4 = function(s) {
    for (var i = 0; i < lower.length; i++) {
        var result = decode3(s,i);
        var wordList = result.split(' ');
        var score = rank(wordList);
        log('score', score);
        if(score > 10) {
            log(result);
        }
    }
}
decode4(code)
// 知乎 解法
/*function rot_n_ch(n, ch) {
    var cc = ch.charCodeAt(0);
    if (cc > 90) return ch; // Z
    if (cc < 65) return ch; // A
    var cc2 = cc + n;
    if (cc2 > 90) cc2 -= 26;
    if (cc2 < 65) cc2 += 26;
    return String.fromCharCode(cc2);
}
function rot_n_str(n, str) {
    var rot_n = rot_n_ch.bind(this, n);
    return [].slice.call(str, 0).map(rot_n).join('');
}
var rot_minus_11 = rot_n_str.bind(this, -11);
var rot_minus_3  = rot_n_str.bind(this, -3);

var cypher = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX';
console.log(11, rot_minus_11(cypher));
console.log(3,  rot_minus_3(cypher));*/

// 翻译一篇文章 并加密  写博客
// 相信未来
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var poem =
`
If by life you were deceived
Don't be dismal, don't be wild
In the day of grief, be mild
Merry days will come, believe
Heart is living in tomorrow
Present is dejected here
In a moment, passes sorrow
That which passes will be dear
`

var FindRow = function(s) {
    var array = [];
    // 像这种定义 不能放在 循环里
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            console.log(`i ${i}`)
            for (var j = i + 1 ; j < s.length; j++) {
                if ((poem[j] == '\n')) {
                    // 回车键
                    console.log(`j ${j}`)
                    var str = s.slice(i,j);
                    console.log(`str ${str}`)
                    array.push(str);
                    //console.log(array)
                    break;
                    // 找到一个 j 之后马上打断 j循环，接着继续 i 循环
                }
            }
        }
    }
    return array;
}
// FindRow(poem) 结果是一个包含 8条 字符串的数组；
// 从前 往后切 ，最后一个会有问题 不存在 j 了

var find = function(s1,s2) {
    var len = s1.length;
    if (s1.includes(s2)) {
        for (var i = 0; i < len; i++) {
            var str = s1[i];
            if (str == s2) {
                return i;
            }
        }
    }
    return -1;
}
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写或其他，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}
var uppercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (lower.includes(s[i])) {
            // 如果 是小写 那就变 大写
            var index = find(lower,s[i]);
            result +=  upper[index];
        } else {
            // 如果 不是小写 那就直接 拼接
            result += s[i];
        }
    }
    return result;
}

var encode = function(s,shift) {
    str = lowercase1(s)
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (lower.includes(str[i])) {
            // 如果是 字母
            var index = find(lower,str[i]);
            var next = (index + shift) % 26;
            result += lower[next];
            // 也可以直接调用 encode2 result += encode2(str[i],shift)
        }else {
            result += str[i];
            // 如果不是 字母， 就直接  拼接上去
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}

var encode1 = function(s) {
    var n = FindRow(s);
    var result = '';
    for (var i = 0; i < n.length; i++) {
        var shift =  Math.floor(Math.random() * (25 - 0 + 1) + 0);
        // 随机数
        var str = '\n' + encode(n[i],shift) ;
        // 第一条字符串 i = 0; 重新加在 前面 加上换行符
        result += uppercase1(str);
    }
    return result;
}
encode1(poem)
