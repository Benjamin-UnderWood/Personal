// 字符串
//  => this.reviewScore = 9;
// bad
const totalScore = this.reviewScore + '';

// good
const totalScore1 = String(this.reviewScore);

// 对数字使用 parseInt 转换, 并带上类型转换的基数
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val2 = +inputValue;

// bad
const val3 = inputValue >> 0;

// bad
const val4 = parseInt(inputValue);

// good
const val5 = Number(inputValue);

// good
const val6 = parseInt(inputValue, 10);

// 如果因为某些原因 parseInt 成为你所做的事的瓶颈而需要使用位操作解决性能问题时，留个注释说清楚原因和你的目的
// good
/**
 * 使用 parseInt 导致我的程序变慢，
 * 改成使用位操作转换数字快多了。
 */
const val7 = inputValue >> 0;

// 注: 小心使用位操作运算符。数字会被当成 64 位值，但是位操作运算符总是返回 32 位的整数（参考）。位操作处理大于 32 位的整数值时还会导致意料之外的行为。关于这个问题的讨论。最大的 32 位整数是 2,147,483,647
// 2147483647 >> 0 //=> 2147483647
// 2147483648 >> 0 //=> -2147483648
// 2147483649 >> 0 //=> -2147483647