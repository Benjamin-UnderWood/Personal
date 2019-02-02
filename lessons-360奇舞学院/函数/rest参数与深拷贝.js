let add = (...args) => args.reduce((a, b) => a + b);

console.log(add(1, 2, 3, 4)); // 10

console.log(add.length); // 0; rest 参数不计算在function.length里的
/**
 * @param {Object} des 被拷贝对象
 * @param {Object} src 目标对象
 * */
function deepCopy(des, src) {
	if(!src || typeof src !== 'object') {
		return des;
	}

	for (var key in src) {
		let obj = src[key];
		if(obj && typeof obj === 'object') {
			des[key] = des[key] || {};
			deepCopy(des[key], obj);
		} else {
			des[key] = src[key];
		}
	}

	return des;
}

console.log(deepCopy({a: {}}, {a: {b: 2}}));

function merge(des, ...objs) {
	return [des, ...objs].reduce((a, b) => deepCopy(a, b));
}

console.log(merge({x: 1}, {y: 2}, {z: 3}));

// ES5 模拟 rest 参数
function __rest__(fn) {
	var len = fn.length;
	return function () {
		var args = [].slice.call(arguments, 0, len - 1); // [1, 2, 3]
		var rest = [].slice.call(arguments, len - 1); // [4]

		return fn.apply(this, args.concat([rest]));
	}
}

var add = __rest__(function(args) { // __rest__将args展开
	return args.reduce(function(a, b) {
		return a + b;
	})
});

console.log(add(1, 2, 3, 4));