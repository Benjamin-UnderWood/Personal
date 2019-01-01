var log = function() {
    console.log.apply(console,arguments);
}
//求数组的和
var sum = function(array) {
    //先设置一个变量来存和
    var s = 0;
    //遍历数组
    var length = array.length; //提高代码运行效率
    for (var i = 0; i < length; i++) {
        //用变量n保存元素值
        var n = array[i];
        //累加到变量s
        s = s + n ;
    }
    //循环结束，现在s李阿敏存的是数组中所有元素的和了
    return s ;
}

/*var a = [1,2,3,4]
log('sum',sum(a))*/

//测试，预先写好的一个函数，调用我们的函数，来测试是否正确
var ensure = function(condition,message) {
    if (!condition) {
        console.log(message);
    }
}
//ensure是一个通用的函数
var testSum = function() {
    var numbers = [1,2,3,4];
    var value = 10;
    ensure(value === sum(numbers),'sum 错误')
    ensure(1 == sum([1]),'sum 1 错误')
}
//一个函数就得有一个匹配的测试
testSum()

/*var a = [1,2,3,4]
log('sum',sum(a))*/

//求数组的乘积
var product = function(array) {
    var s = 1;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        var n = array[i];
        s = s * n ;
        //缩写是如下形式
        //s*=n
    }
    return s;
}

/*var a = [1,2,3,4]
log('product',product(a))*/

var testProduct = function() {
    ensure(product([1,2,3]) === 6,'test product 1')
    ensure(product([1,2,0]) === 0,'test product 2')
}

testProduct()

//作业2
//返回一个数的绝对值
var abs = function(n) {
    if (n<0) {
        return -n
    }else {
        return n
    }
}
/*var abs = function(n) {
      var value = 0;
      if (n<0) {
        value = -n;
      }else {
        value = n;
      }
      return value
}*/ //只输出一个return

var testAbs = function() {
    ensure(abs(0) === 0,'abs 0 错误')
    ensure(abs(-6) === 6,'abs -6 错误')
    ensure(abs(5) === 5,'abs 5 错误')
}

testAbs()

//作业3
//参数是一只包含数字的array
//求array中所有数字的平均数
//函数定义是
var average = function(array) {
    var s = 0;
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        s = s + n;
    }
    var length = array.length;
    var value = s/length;
    return value;
}

/*var a = [1,2,3,4]
log('average',average(a))*/

var testAverage = function() {
    ensure(average([1,2,3]) === 2,'test average 1');
}

testAverage()

//作业4
//参数是一个只包含数字的array
//求array中最小的数字
//函数定义是
var min = function(array) {
    var s = array[0];
    for (var i = 0; i < array.length; i++) {
        var n = array[i];
        if (n < s) {
            s = n;
        }
    }
    return s;
}

/*var a = [1,2,3];
log(min(a));*/

var testMin = function() {
    ensure(min([1,2,3]) === 1,'test min 1')
    ensure(min([-1,-2,3]) === -2,'test min 2')
}

testMin()

//作业5
/*
参数是一个数字n
返回以下序列的结果
1-2+3-4+5...n
*/
/*var sum1 = function(array) {
    var s1 = 0;
    var s2 = 0;
    for (var i = 0; i < array.length; i++) {
        if (i%2 === 0) {
            var n = array[i];
            var s1 = s1 + n;
        }else {
            var m = array[i];
            var s2 = s2 - m;
        }
    }
    var value = s1 + s2;
    return value;
}

var a = [1,2,3,4,5];
log(sum1(a))*/
var sum1 = function(n) {
    var s1 = 0;
    var s2 = 0;
    for (var i = 0; i < n; i++) {
        if (i%2 === 0) {
            var s1 = s1 + (i + 1);
        }else {
            var s2 = s2 - (i + 1);
        }
    }
    var value = s1 + s2;
    return value;
}

log(sum1(3))

var testSum1 = function() {
    ensure(sum1(5) === 3 ,'teseSum1 1')
    ensure(sum1(3) === 2 ,'teseSum1 2')
}

testSum1()

//作业6
/*
参数是一个数字n
返回以下序列的结果
1+2-3+4-...n
*/ //转化为： 2+(-1+2-3+4-...n)
var sum2 = function(n) {
    var s1 = 1;
    var s2 = 0;
    if(n > 1){
        for (var i = 1; i < n; i++) {
            if (i%2 === 0) {
                var s1 = s1 - (i + 1);
                //s1 = 1，开始
            } else {
                var s2 = s2 + (i + 1);
            }
        }
        var s = s1 + s2;
        return s;
    }else{
        return 1;
    }
}

log(sum2(6))
log(sum2(1))

//方法2 推荐
var sum2 = function(n) {
    var s1 = 0;
    var s2 = 0;
    for (var i = 1; i < (n+1); i++) {
        if (i%2 === 0) {
            s1 = s1 + i;
        }else {
            s2 = s2 - i;
        }
    }
    var s = s1 + s2 +2;
    return s;
}
/*log(sum2(5))
log(sum2(1))*/

var testSum2 = function() {
    ensure(sum2(4) === 4,'testSum2 1');
    ensure(sum2(6) === 6,'testSum2 2');
}

testSum2()

//作业7
//实现 fac 函数
//接受一个参数 n
//返回 n 的阶乘 ，1 * 2 * 3 * ...* n
var fac = function(n) {
    var s = 1;
    for (var i = 1; i < (n + 1); i++) {
        s = s * i
    }
    return s;
}

log(fac(5))
log(fac(1))
log(fac(2))

//作业8
//实现apply函数
//参数如下
//op 是 string 类型，值是'+' '-' '*' '/' 其中一种
//a b分别是2个数字
//根据 op 对 a b 运算 并返回结果（加减乘除）
var apply = function(op, a, b) {
    if(op == '+') {
        return a + b;
    }
    else if (op == '-') {
        return a - b;
    }
    else if (op == '*') {
        return a * b;
    }
    else if (op == '/') {
        return a / b;
    }
}

/*作业9
实现 applyList 函数
op 是 '+' '-' '*' '/' 其中一种
oprands 是一个只包含数字的 list
根据 op 对 oprands 中的元素进行运算并返回结果
例如， 下面的调用返回 -4
var n = applyList('-', [3,4,2,1])
log(n)
//结果是 4 ，用第一个数字减去所有的数字
*/
var applyList = function(op, oprands) {
    var length = oprands.length;
    if(op == '+') {
        var s1 = 0;
        for (var i = 0; i < length; i++) {
            s1 = s1 + oprands[i];
        }
        return s1
    }
    else if (op == '-') {
        var s2 = oprands[0] + oprands [0]
        //第一个数不能减
        for (var i = 0; i < length; i++) {
            s2 = s2 - oprands[i];
        }
        return s2;
    }
    else if (op == '*') {
        var s3 = 1;
        for (var i = 0; i < length; i++) {
            s3 = s3 * oprands[i];
        }
        return s3;
    }
    else if (op == '/') {
        var s4 = oprands[0] * oprands[0];
        //第一个数不能除
        for (var i = 0; i < length; i++) {
            s4 = s4 / oprands[i];
        }
        return s4;
    }
}

log(applyList('/',[2,4,8]))
log(applyList('-',[2,4,8]))

//['+',1,2,3,4] expression类型
var applyList = function(expression) {
    var op = expression[0];
    var oprands = expression.slice(1);
    //切片 得到 oprands
    var length = oprands.length;
    if(op == '+') {
        var s1 = 0;
        for (var i = 0; i < length; i++) {
            s1 = s1 + oprands[i];
        }
        return s1
    }
    else if (op == '-') {
        var s2 = oprands[0] + oprands [0]
        //第一个数不能减
        for (var i = 0; i < length; i++) {
            s2 = s2 - oprands[i];
        }
        return s2;
    }
    else if (op == '*') {
        var s3 = 1;
        for (var i = 0; i < length; i++) {
            s3 = s3 * oprands[i];
        }
        return s3;
    }
    else if (op == '/') {
        var s4 = oprands[0] * oprands[0];
        //第一个数不能除
        for (var i = 0; i < length; i++) {
            s4 = s4 / oprands[i];
        }
        return s4;
    }
}

log(applyList(['/',2,4,8]))
log(applyList(['-',2,4,8]))

/*
作业10
实现 applyCompare 函数
参数如下
expression 是一个 array(数组)，包含了 3 个元素
第一个元素是 op, 值是 '>' '<' '==' 其中之一
剩下两个元素分别是 2 个数字
根据 op 对数字运算并返回结果(结果是 true 或 false)
*/
var applyCompare = function(expression) {
    var op = expression[0];
    var a = expression[1];
    var b = expression[2];
    //所设的新变量，与函数的变量之间的关系
    if (op == '>') {
        if (a > b) {
            return true;
        } else {
            return false;
        }
    }
    else if (op == '<') {
        if (a < b) {
            return true;
        } else {
            return false;
        }
    }
    else if (op == '==') {
        if (a == b) {
            return true;
        } else {
            return false;
        }
    }
}

//注意 比较运算自带结果 true或者false
var applyCompare = function(expression) {
    var op = expression[0];
    var a = expression[1];
    var b = expression[2];
    //所设的新变量，与函数的变量之间的关系
    //用中间变量接住，消除重复
    if (op == '>') {
        return a > b;
    }
    else if (op == '<') {
        return a < b;
    }
    else if (op == '==') {
        return a == b;
    }
}

log(applyCompare(['>',1,2]))

/*作业11
实现 applyOps 函数
参数如下
expression 是一个 array
expression 中第一个元素是上面几题中的 op, 剩下的元素是和 op 对应的值
根据 expression 运算并返回结果
*/
var applyOps = function(expression) {
    var op = expression[0];
    if (op == '+'||op == '-'||op == '*'||op == '/') {
        //条件 加减乘除 写成四条 而不是 op == 加减乘除
        return applyList(expression);
    } else {
        return applyCompare(expression);
    }
}



log(applyOps(['-', 2, 4, 8]));
log(applyOps(['>', 2, 1]))
