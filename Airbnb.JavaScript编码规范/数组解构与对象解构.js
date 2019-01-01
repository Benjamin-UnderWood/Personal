const ary = [1, 2, 3, 4];
const [first, second] = ary;
console.log(first, second);

// 需要回传多个值时，使用对象解构，而不是数组解构
// 为什么？增加属性或者改变排序不会改变调用时的位置
// bad
function processInput(input) {
	// then a miracle occurs
	return [left, right, top, bottom];
}

// 调用时需要考虑回调数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
	// then a miracle occurs
	return { left, right, top, bottom };
}

// 调用时只选择需要的数据
const { left, right } = processInput(input);