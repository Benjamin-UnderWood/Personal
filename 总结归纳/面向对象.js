// 创建对象的方式
// 1.对象字面量方式
var gecan = {
    "age": 24,
    "height": 178
}
    // 1.1访问
    gecan.age // 24
    gecan["height"] // 178
    // 当属性是一个合法的JavaScript标识符且不是保留字，用.表示法代替[]方法来检索对象包含的值

    // 用||运算符来填充默认值
    var weight = gecan.weight || "unknown";

    // 尝试从 undefined 的成员属性中取值会导致 TypeError 异常，可以通过 && 短路操作来避免报错
    gecan.hobby                          // undefined
    gecan.hobby.music                    // throw"TypeError"
    gecan.hobby && gecan.hobby.music     // undefined

    // 1.2 更新
    // 对象里的值可以通过赋值来更新，如果属性名已经存在于对象，那么这个属性的值就会被替换
    gecan.age = 25;    // 更新
    // 如果对象没有那个属性名，那么该属性就会被扩充到对象中
    gecan.weight = 160 // 扩充

    // 1.3 引用
    var kaikai = gecan;
    kaikai.hobby = "LOL";
    var hobby = gecan.hobby;
    hobby // "LOL"

    // 对象通过引用来传递，它们永远不会被复制
    // 这里 kaikai 与 gecan 是指向同一个对象的引用，所以他俩的hobby一样

    // 1.4 原型
    // 所有通过对象字面量创建的对象都连接到 Object.prototype 原型对象 ,它是 JavaScript 中的标配对象
    // 因为所有的对象，都是通过 function Object() 构造函数，构造出来的

    // 当你创建一个新对象时，可以选择某个对象作为它的原型
    var another_gecan = Object.create(gecan);
    another_gecan.age = 23; // 更新age
    gecan.age // 24; 非引用类型的原型属性，实例(对象)改变时，不会触及对象的原型

    gecan.friends = ['wangwei', 'zhouxiaodan'];
    another_gecan.friends // [ "wangwei", "zhouxiaodan" ]
    // 原型关系是一种动态；对象的实例在原型方法被增加之前创建，在原型方法增加之后，也能访问到
    // 添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见

    another_gecan.friends.push('yuanyuan');
    gecan.friends // [ "wangwei", "zhouxiaodan", "yuanyuan" ]
    // 引用类型的原型属性被所有实例共享，实例(对象)改变时，会触及对象的原型

    // 原型连接只有在检索值的时候才被用到。如果我们尝试去获取对象的某个属性值，但该对象没有
    // 此属性名，那么js会试着从原型对象中获取属性值，如果那个原型对象 也没有该属性，那么再
    // 从它的原型中寻找，以此类推，一直到终点 Object.prototype。如果想要的属性完全不存在于
    // 原型链中，那么结果就是 undefined 值。这个过程称为委托。这样的查找就是原型链查找

    // Object.create 方法的实现
    Object.create = function(o) {
        function F(){};
        // var F = function(){};
        F.prototype = o;
        return new F();
    }

    // 1.5反射
    // 检查对象并确定对象有什么属性，只需要试着去检索该属性并验证取得的值；typeof操作符
    // 对确定属性的类型很有帮助
    // typeof
    typeof gecan.age // number
    // 原型链中的任何属性都会产生值
    typeof gecan.toString       // function; toString 是Object.prototype的方法
    typeof gecan.constructor    // function

    // 我们更多关注的是对象的数据属性；获取数据，过滤函数
    // hasOwnProperty 检查对象拥有独有的属性，不会检查原型链(返回布尔值)
    gecan.hasOwnProperty('height')         // true
    gecan.hasOwnProperty('constructor')    // false

    // 1.6 枚举
    // for-in
    // 遍历对象的所有可枚举属性；包括对象中的属性和原型链上的属性；屏蔽了原型中 不可枚举 的属性也可以
    // for-in 属性名出现的顺序是不确定的

    // 遍历对象的属性，不包括原型链上的属性(排除你不想要的函数值)
    // Object.keys
    // 遍历对象所有可枚举的属性，不包括原型链上的属性
    // Object.getOwnPropertyNames
    // 遍历对象中所有属性，可枚举 + 不可枚举；不包括原型链上的属性

    for (var prop in gecan) {
        console.log("gecan." + prop + " = " + gecan[prop]);
    }
    gecan.age = 24
    gecan.height = 178
    gecan.hobby = LOL
    gecan.friends = wangwei,zhouxiaodan,yuanyuan

    // for-in 遍历数组时会出现奇奇怪怪的东西
    var a = [1, 2, 3]
    a.name = 'arr';
    for (var prop in a) {
        console.log("a." + prop + " = " + a[prop]);
    }
    a.0 = 1
    a.1 = 2
    a.2 = 3
    a.name = arr // 奇怪的东西

    // 判断属性是否在原型中
    !obj.hasOwnProperty(prop) && prop in obj

    // 1.7 删除
    // delete 不会触及原型链中的任何对象
    // 删除对象的属性会让来自原型链中的属性透现出来
    another_gecan.age // 23
    delete another_gecan.age;
    another_gecan.age // 24 !!!

    // 1.8 减少全局变量的污染
    // 最小化全局变量的方法是为你的应用只创建一个唯一的全局变量
    var MYAPP = {};
    MYAPP.gecan = {
        "age": 24,
        "height": 178,
        "hobby": {
            music: 'light',
            game: 'LOL'
        },
        "friends": ['wangwei','zhouxiaodan','yuanyuan']
    }

    MYAPP.anotherObj = {
        // property here...
    }

    // 只要把全局性的资源都纳入一个名称空间下，你的程序就不容易与其他应用程序、组件或类库之间
    // 发生冲突

    // 另外，闭包也可以进行信息隐藏，它是另外一种有效减少全局污染的方法
// 2.new
