// 不要使用 iterators. 使用高阶函数例如map() 和 reduce() 替代 for-of
// 为什么？这加强了我们不变的规则。处理纯函数的回调值更易读，这比它带来的副作用更重要
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
	sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach( num => sum += num);
sum === 15;

// best
const sum = number.reduce((total, num) => total + num, 0);
sum === 15;