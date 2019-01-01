// 给注释增加 FIXME 或 TODO 的前缀可以帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。这将有别于常见的注释，因为它们是可操作的。使用 FIXME -- need to figure this out 或者 TODO -- need to implement
// 使用 // FIXME: 标注问题
class Calculator {
	constructor() {
		// FIXME: should't use a global here
		total = 0;
	}
}

// 使用 // TODO: 标注问题的解决方式
class Calculator {
	constructor() {
		// TODO: total should be configurable by an options param
		this.total = 0;
	}
}