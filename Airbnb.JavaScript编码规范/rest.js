// bad
function concatenateAll() {
	const args = Array.prototype.slice.call(arguments); // 转化为数组
	return args.join('');
}

// good
function concatenateAll(...args) {
	return args.join('');
}