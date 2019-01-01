var log =function(){
    console.log.apply(console,arguments)
}
// log 函数
var ensure = function(condition,message) {
    if (!condition) {
        log('测试失败', message);
    }
}
// ensure 函数
//ex.
var s = '  1';
console.log(s[0] == '');  // 运行结果 false
console.log(s[0] == ' '); // 运行结果 true
// 说明字符串里的 空格 也算


// 删除字符串中的左侧空字符
// '  gua' 变成 'gua'； ' gua  ' 变成 'gua  '； '' 变成 ''； '    ' 输出 'gua'
var strip_left = function(s) {
    var l = s.length;
    var s1 = s;
    if(l == 0) {
        return '';
    }else {
        for (var i = 0; i < l; i++) {
            if (s[i] == ' ') {
                 s1 = s.slice(i+1);
            }else {
                break;
            }
        }
            if(s1.length == 0){
                return '';
            }else {
                return s1;
            }
        }
}
// 自己写的程序， 通过测试

var test_strip_left = function() {
    ensure(strip_left('  gua') === 'gua', 'strip_left 测试1')
    ensure(strip_left(' gua  ') === 'gua  ', 'strip_left 测试2')
    ensure(strip_left('') === '', 'strip_left 测试3')
    ensure(strip_left('    ') == '', 'strip_left 测试4')
}
test_strip_left()
// 测试

// 萧 解法
//  01234 (下标)
// '  gua'
// '  gua'.slice(2) = gua
var strip_left = function(s) {
    var l = s.length;
    for (var i = 0; i < l; i++) {
        var char = s[i];
        // 把查询结果 赋给 char
        if (char != ' ') {
            //看看 char 是否为 空字符
            log('break, i is ',i)
            break;
        }
    }
    // 这里程勋很明确，循环就是为了找到一个下标(i) ,使得 字符不为空格
    s = s.slice(i);
    // 出到循环外面再切，思路更简单（循环保存了 i 下标，拿出来用）  好好体会
    log('循环结束 i is', i)
    return s;
}
//strip_left('    ')  4个空格 注意 '循环结束 i is', 4(i=3 ,i = i+1)
var test_strip_left = function() {
    ensure(strip_left('  gua') === 'gua', 'strip_left 测试1')
    ensure(strip_left(' gua  ') === 'gua  ', 'strip_left 测试2')
    ensure(strip_left('') === '', 'strip_left 测试3')
    ensure(strip_left('    ') == '', 'strip_left 测试4')
}
test_strip_left()

// 写测试 帮助我们 检查 程序 漏考虑的情况 不可能有完美的程序
// 这里 for 和 if 不会阻止 i 跑出来(在程序内)； for 循环中的 var 的 i 还可以拿来用
// 只有函数 才有作用域 for while if 没有作用域
// 写循环 不要去改变 循环的条件 （这里不要在循环里处理 s， 出了循环之后 ，再去处理s



// 作业 5
// 10 分钟做不出就看提示
// s 是字符串，检查 s 是否只包含空格
// 返回 布尔值 如果只包含空格，true; 否则 false;
var is_space = function(s) {
    var l = s.length;
    var result = true;
    for (var i = 0; i < l; i++) {
        var char = s[i];
        if (char !== ' ') {
            result = false;
            // 不要出现太多的 return;
        }
    }
    return result;
}
s = '   '      // true
log(is_space(s))
s = '  dog'    // false
s = 'dog   '   // false


// 作业6
// s 是字符串 检查 s 中是否只包含数字 并返回 bool
// 注意， 看上面的资料， 介绍了一个 include 函数
var is_digit = function(s) {
    var digits = '1234567890'
    var result = true;
    for (var i = 0; i < s.length; i++) {
        var char = s[i];
        if (!digits.includes(char)) {
            var result = false;
        }
    }
    return result;
}


var test_is_digit = function() {
    ensure(is_digit('12  456') === false, 'strip_left 测试1')
    ensure(is_digit('12gua') === false, 'strip_left 测试2')
    ensure(is_digit('123456') === true, 'strip_left 测试3')
    ensure(is_digit('1.2') === false, 'strip_left 测试3')
}
test_is_digit ()

// 作业1
/* n 是 int 类型， width 是 int 类型，把 n 的位数变成 width 那么长， 并往右对齐，
   不足部分用 0 补齐， 注意返回的是 string 类型 */
   var zfill = function(n,width) {

   }
