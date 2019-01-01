// 引用不存在的东西 出现的错误  没有定义的变量 直接用
// Uncaught ReferenceError: XX is not defined

// 类型错误
// Uncaught TypeError: log is not a function

// 语法错误 {}*10
// Uncaught SyntaxError: Unexpected token *

// 最右边的 VM 指示错误出处

// 给字符串穿衣服
var i = '2 ';
console.log(`(${i})`); // 运行结果 (2 ) 看出它有空格了

// 二分法验证错误 更高效
