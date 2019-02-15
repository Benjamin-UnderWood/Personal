// 引用类型；操作互相影响
var foo = {
    age: 18,
    height: 174
}

var bar = foo;

bar.height = 180;

foo.height // 运行结果 180

// 基本类型;副本；操作不相互影响
var foo = 5;

var bar = foo;

var bar = 10;

bar // 10
foo // 5
