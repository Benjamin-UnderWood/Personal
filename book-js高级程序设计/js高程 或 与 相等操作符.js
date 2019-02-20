
// 布尔操作符
// 逻辑运算

// 逻辑与(&&)
// 逻辑与（&&）操作可以应用于任何的操作类型，不仅仅是布尔值，
// 在有一个操作数不是布尔值的情况下，&&操作符就不一定返回布尔值：遵循下面规则：

// 1. 如果第一个操作数是对象(广义)，则返回第二个操作数
alert('GeCan' && null)      // null
alert('GeCan' && NaN)       // NaN
alert('GeCan' && 0)         // 0
alert('GeCan' && false)     // false
alert('GeCan' && 'GeCan')   // "GeCan"
alert('GeCan' && undefined) // undefined
alert('0' && 'GeCan')       // 'GeCan'
alert(1 && 'GeCan')         // 'GeCan'

// 2. 如果第二个操作数是对象，只有在第一个操作数求值为 true 的情况下才返回该对象
// 第一个操作数求值为 true；返回该对象
// 当第一个操作数是对象，也返回该对象(参考第一点)
alert(true && 'GeCan')      // 'GeCan'

否则直接返回第一个数(短路操作)
alert(null && 'GeCan')      // null
alert(NaN && 'GeCan')       // NaN
alert(0 && 'GeCan')         // 0
alert(false && 'GeCan')     // false
alert(undefined && 'GeCan') // undefined
alert('' && 'GeCan')        // '';

// 关于空字符串请注意
('' && 'GeCan') === "" // true
'' && 'GeCan' === ''   // ''

// 注意，当第一个操作数求值为 true, 但第二个操作数未定义时，会报错
alert(true && someUndefinedVariable) // error;someUndefinedVariable is not defined

// 3. 如果两个都是对象返回第二个

// 4.如果有一个操作数是 null, NaN，0，false 或 undefined，则返回 它们自己
// 第一种情况，这些操作符在第一个，参照上面第2条规则的第一点，直接返回它们自己(短路)；
// 第二种情况，这些操作符在第二个(第一个操作符求值为 true 之后)，也返回它们自己
alert(true && null)      // null
alert(true && NaN)       // NaN
alert(true && 0)         // 0
alert(true && false)     // false
alert(true && undefined) // undefined
alert(true && '')        // ''

// 上述规则总结，
// 逻辑与(&&) 看左边的值是真还是假,如果是真,返回的是右边的值,如果是假返回的是左边的值；
// (只有 false 、0、NaN、null、undefined、空字符串为假, 其余都是真)
// --------------------------------------------------------------------------------

// 逻辑或(||)
// 逻辑或(||) 和 逻辑与(&&) 的操作相类似只要有一个不是布尔值，||也不一定返回布尔值，遵循下面规则：
// 1. 第一个是对象，就返回第一个(短路)
alert('GeCan' || undefined) // "GeCan"
alert('GeCan' || 'KaiKai')  // "GeCan"

// 2. 第一个是 false, null, NaN ，0 或 undefined 或 ''，则返回第二个操作数；

// 第一个操作数求值结果为 false; 返回第二个操作数
alert(false || null)      // null
alert(false || NaN)       // NaN
alert(false || 0)         // 0
alert(false || false)     // false
alert(false || 'GeCan')   // "GeCan"
alert(false || undefined) // undefined

// 注意，当第一个操作数求值为 false，但第二个操作数未定义时，会报错
alert(false || someUndefinedVariable); // error; someUndefinedVariable is not defined

// 第一个是 null; 返回第二个操作数
alert(null || null)       // null
alert(null || NaN)        // NaN
alert(null || 0)          // 0
alert(null || false)      // false
alert(null || 'GeCan')    // "GeCan"
alert(null || undefined)  // undefined

// 第一个是 NaN; 返回第二个操作数
alert(NaN || NaN)         // NaN
alert(NaN || null)        // null
alert(NaN || 0)           // 0
alert(NaN || false)       // false
alert(NaN || 'GeCan')     // 'GeCan'
alert(NaN || undefined)   // undefined

// 第一个是 0；返回第二个操作数
alert(0 || null)          // null
alert(0 || NaN)           // NaN
alert(0 || 0)             // 0
alert(0 || false)         // false
alert(0 || 'GeCan')       // "GeCan"
alert(0 || undefined)     // undefined

// 第一个是 undefined; 返回第二个操作数
alert(undefined || null)       // null
alert(undefined  || NaN)       // NaN
alert(undefined || 0)          // 0
alert(undefined  || false)     // false
alert(undefined  || 'GeCan')   // "GeCan"
alert(undefined  || undefined) // undefined

// 第一个是 ''; 返回第二个操作数
alert('' || null)       // null
alert(''  || NaN)       // NaN
alert('' || 0)          // 0
alert(''  || false)     // false
alert(''  || 'GeCan')   // "GeCan"
alert('' || undefined)  // undefined

// 上述规则总结
// 逻辑或(||) 首先看左边的值是真还是假,如果是真,返回的是左边的值,如果是假返回的是右边的值
// (只有 false 、0、NaN、null、undefined、空字符串为假, 其余都是真)
// --------------------------------------------------------------------------------

// 因此关于 逻辑与(&&) 与 逻辑或(||) 只要记住下面两条规则就够了：

// 逻辑与(&&)
// 看左边的值是真还是假,如果是真,返回的是右边的值,如果是假返回的是左边的值；
// (只有 false 、0、NaN、null、undefined、空字符串为假, 其余都是真)

// 逻辑或(||)
// 看左边的值是真还是假,如果是真,返回的是左边的值,如果是假返回的是右边的值
// (只有 false 、0、NaN、null、undefined、空字符串为假, 其余都是真)
// --------------------------------------------------------------------------------

// 逻辑运算的应用
// 1. 利用逻辑或(||)
// 例子一 操作DOM
// 如果变量的值 不是 false, null, NaN ，0 或 undefined 或 ''，则传入该变量；
function addMessage(message){
    message = message || 'default message';

    var el = document.createElement('p');
    el.innerHTML = message;

    document.body.appendChild(el);
}

addMessage(); // 操作默认参数
addMessage('hello world') // 操作我们传入的参数

// 请注意 谨慎使用 || 填充默认值 ！！！
// 例子二
function Foo(value){
    value = value || 'default value';
    return value;
}

Foo() // 'default value' ；传递默认参数
Foo('你好') // '你好'

// 注意传入 false, null, NaN ，0 或 undefined 或 '' 等值，都会使用第二个默认参数！！！
// 然而实际上只有 undefined 这一种情况才应该被认为是用户没有指定其值，需要使用后备的默认值。

// 改进版本
function Foo(value){
    value = value !== undefined ? value : 'defaule value';
    return value;
}

// 通过这种方式给参数设置默认值，只有在传入 undefined，它的值才会被强制替换为默认值
Foo(undefined)  // "defaule value"

// 以下这些值，都不会被强制替换 (安全了许多！！！)
Foo('')     // ''
Foo(0)      // 0
Foo(NaN)    // NaN
Foo(null)   // null
Foo(false)  // false

// 补充 ES6 可以这样给参数设默认值
function Foo(value = 'default value'){
    return value;
}

// 替换为默认值
Foo(undefined)  // "default value"

// 没有替换；很安全
Foo('')     // ''
Foo(0)      // 0
Foo(NaN)    // NaN
Foo(null)   // null
Foo(false)  // false

// 2. 综合利用 逻辑与(&&) 和 逻辑或(||)
function whatDoesItDo(mood){
    return mood && "I like this" || "I don't like this";
}

// 当 mood 求值结果为 true, 返回 "I like this"（A来代替）
// 当 mood 求值结果为 false, 返回 "I dont like this"（B来代替）

// 当 mood 是对象(广义)，其也会显示 A。

// 有点 升级版三元运算符 的感觉


// --------------------------------------------------------------------------------
// 位运算
// | & (针对数值进行的运算)
// 程序中的所有数在计算机内存中都是以二进制的形式储存的。
// 位运算说穿了，就是直接对整数在内存中的二进制位进行操作。
// 比如，and运算本来是一个逻辑运算符，但整数与整数之间也可以进行and运算。
// 举个例子，6的二进制是110，11的二进制是1011，那么6 and 11的结果就是2，
// 它是二进制对应位进行逻辑运算的结果（0表示False，1表示True，空位都当0处理）。

// --------------------------------------------------------------------------------
// 相等操作符
// == 和 === (全等与不全等)；
// java中没有“===”号的比较，只有javascript中才有。
// 在javascript中：
// 先说 ===，这个比较简单。下面的规则用来判断两个值是否===相等：
// 1、如果类型不同，就[不相等]
// 2、如果两个都是数值，并且是同一个值，那么[相等]；
//     (！例外)的是，如果其中至少一个是NaN，那么[不相等]。（NaN === NaN (false)； 判断一个值是否是NaN，只能用isNaN()来判断）
// 3、如果两个都是字符串，每个位置的字符都一样，那么[相等]；否则[不相等]。
// 4、如果两个值都是true，或者都是false，那么[相等]。
// 5、如果两个值都引用同一个对象或函数，那么[相等]；否则[不相等]。
// 6、如果两个值都是null，或者都是undefined，那么[相等]。

// 再说 ==，根据以下规则：
// 1、如果两个值类型相同，进行 === 比较。
// 2、如果两个值类型不同，他们可能相等。根据下面规则进行类型转换再比较：
//     a、如果一个是null、一个是undefined，那么[相等]。
//     b、如果一个是字符串，一个是数值，把字符串转换成数值再进行比较。
//     c、如果任一值是 true，把它转换成 1 再比较；如果任一值是 false，把它转换成 0 再比较。
//         '0' == false // true
//         '0' == 0 // true
//     d、如果一个是对象，另一个是数值或字符串，把对象转换成基础类型的值再比较。---------
//         对象转换成基础类型，利用它的toString或者valueOf方法。
//         js核心内置类，会尝试 valueOf 先于 toString；
//         例外的是Date，Date利用的是toString转换。
//         非js核心的对象，另说（比较麻烦，我也不大懂）
//     e、任何其他组合，都[不相等]。
