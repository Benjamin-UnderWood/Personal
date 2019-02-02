const add = (a,b,c) => a + b + c;

console.log(add(1, 2, 3)); // 6

console.log(add(4, 5)); // 4 + 5 + undefined >> NaN

// 校验参数的函数
function __matchArgs__(fn) {
	return function (...args) {
		if(args.length !== fn.length) {
			throw RangeError('Arguments not match!');
		}
		return fn.apply(this, args);
	}
}

const add1 = __matchArgs__((a,b,c) => a + b + c);

console.log(add1(1, 2, 3)); // 6

console.log(add1(4, 5)); // RangeError: Arguments not match!