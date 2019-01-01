// 别保存 this 的引用。使用箭头函数或 Function#bind。
// bad
function foo () {
	const self = this;
	return function () {
		console.log(self);
	}
}

// bad
function foo1() {
	const that = this;
	return function () {
		console.log(that);
	}
}

// good
function foo2() {
	return () => {
		console.log(this);
	}
}