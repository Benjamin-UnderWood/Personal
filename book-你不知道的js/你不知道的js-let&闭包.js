- let

var foo = true;

if (foo) {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}

console.log(bar);// ReferenceError
/**
 *let 关键字可以将变量绑定到所在的任意作用域中（通常是{ .. } 内部）。换句话说，let
 *为其声明的变量隐式地了所在的块作用域。 ---------------------------------------
 */
/**
 *用let 将变量附加在一个已经存在的块作用域上的行为是隐式的。在开发和修改代码的过
 *程中，如果没有密切关注哪些块作用域中有绑定的变量，并且习惯性地移动这些块或者将
 *其包含在其他的块中，就会导致代码变得混乱。
 */

 // 为块作用域显式地创建块可以部分解决这个问题，使变量的附属关系变得更加清晰！！！！！！

 var foo = true;

 if (foo) {
    { // <-- 显式的快
        let bar = foo * 2;
        bar = something( bar );
        console.log( bar );
    }
}

console.log( bar ); // ReferenceError

/**
 *只要声明是有效的，在声明中的任意位置都可以使用{ .. } 括号来为let 创建一个用于绑
 *定的块。在这个例子中，我们在if 声明内部显式地创建了一个块，如果需要对其进行重
 *构，整个块都可以被方便地移动而不会对外部if 声明的位置和语义产生任何影响。 ！！！！！！
 */

 // 另一个 作用域 有用之处，垃圾收集 ！！！！！！！！！！！！！！！！！！！！！！！！！
/**
 *为变量显式声明块作用域，并对变量进行本地绑定是非常有用的工具，可以把它添加到你
 *的代码工具箱中了。
 */

-提升
a = 2;

var a;

console.log(a); // 2



console.log(a);

var a = 2;

// 输出 undefined

/**
 *包括 变量和函数 在内的所有声明都会  在任何代码被执行前  首先被处理。
 *
 *当你看到var a = 2; 时，可能会认为这是一个声明。但JavaScript 实际上会将其看成两个
 *声明：var a; 和a = 2;。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在
 *原地等待执行阶段。
 */
// 第一个代码片段以如下形式处理：

var a;

a = 2;

console.log( a );
// 第一部分是编译，第二部分是执行

// 第二部分代码片段是按照以下流程处理的

var a;

console.log( a );

a = 2;

// 因此，打个比方，这个过程就好像 变量和函数声明 从它们在代码中出现的位置被“移动”
// 到了最上面。这个过程就叫作提升。换句话说，先有蛋（声明）后有鸡（赋值）。



// 只有声明本身会被提升，而 赋值或其他运行逻辑 会留在原地。 ！！！！！！！！！！！！！
// 如果提升改变了代码执行的顺序，会造成非常严重的破坏。

foo();

function foo() {
    console.log( a ); // undefined
    var a = 2;
}

// foo 函数的声明（这个例子还包括实际函数的隐含值）被提升了，因此第一行中的调用可
// 以正常执行。
// 这段代码会被理解成下面的形式

function foo() {
    var a;
    console.log( a ); // undefined
    a = 2;
}

foo();

// 函数声明被提升了，函数内部的变量声明也被 提升 了

// 函数声明会被提升，但是 函数表达式 却不会被提升。!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

foo(); // 不是ReferenceError, 而是TypeError!

var foo = function bar() {
// ...
};

/**这段程序中的 变量标识符foo() 被提升并分配给所在作用域（在这里是全局作用域），因此
 *foo() 不会导致ReferenceError。但是foo 此时并没有赋值（如果它是一个 函数声明 而不
 *是 函数表达式，那么就会赋值）。foo() 由于对undefined 值进行函数调用而导致非法操作，!!!!!!
 *因此抛出TypeError 异常。
 */
 // 第二段代码相当于

 var foo;

 foo();

 foo = function bar() {
 // ...
}; // 函数表达式，将匿名函数 赋给 一个变量，变量会提升，但是 函数体没有提升

 // 即使是具名的函数表达式，名称标识符(foo)在赋值之前也无法在所在作用域中使用： ！！！！！！



foo(); // TypeError

bar(); // ReferenceError

var foo = function bar() {
// ...
};

// 这个代码片段经过提升后，实际上会被理解为以下形式：

var foo;

foo(); // TypeError

bar(); // ReferenceError

foo = function() {
    // var bar = ...self...
// ...
}






// -闭包

for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
// 我们对这段代码行为的预期是分别输出数字1~5，每秒一次，每次一个
// 但这段代码在实际运行时会以每秒一次的频率输出五次6

// 延迟函数的回调会在循环结束时才执行。事实上，
// 当定时器运行时即使每个迭代中执行的是setTimeout(.., 0)，所有的回调函数依然是在循
// 环结束后才会被执行，因此会每次输出一个6 出来。

// 这里引伸出一个更深入的问题，代码中到底有什么缺陷导致它的行为同语义所暗示的不一 !!!!!!!!
// 致呢？

/**缺陷是我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个i 的副本。但是 !!!!!!
 *根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中分别定义的，
 *但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i。
 */

(function() {
    for (var i=1; i<=5; i++) {
        (function() {
            setTimeout( function timer() {
                console.log( i );
            }, i*1000 );
        })();
    }
})()

// 这样不行,仍旧输出五个 6
/**虽然现在显然拥有更多的词法作用域了。--------------------------------------------
 *的确每个延迟函数都会将IIFE 在每次迭代中创建的作用域封闭起来。 !!!!!!!!!!!!!!!!!!!!
 *如果作用域是空的，那么仅仅将它们进行封闭是不够的。
 *仔细看一下，我们的IIFE 只是一个什么都没有的空作用域。
 */

(function() {
    for (var i=1; i<=5; i++) {
        (function() {
            var j = i; // 创建自己的变量，用来在每个迭代中储存 i；每次都声明
            // console.log('j1 is', j)
            setTimeout( function timer() {
                console.log( j );
            }, j*1000 );
        })();
    }
})()

// 正常工作，分别输出数字1~5

// 对这段代码进行一些改进

(function() {
    for (var i=1; i<=5; i++) {
        (function(j) { // 依赖注入 等同于 var j = i;
            setTimeout( function timer() {
                console.log( j );
            }, j*1000 );
        })(i);
    }
})()

// 正常工作，分别输出数字1~5

/**这个函数在定义时的词法作用域以外的地方被调用。闭包 使得函数可以继续访问 定义时 的
 *词法作用域。---------------------------------------------------------访问状态
 */
 // 这里的 j 就是我们函数在定义时的 新的 词法作用域；就算之后访问，也能访问到定义时的词法作用域； 若是没有会一层一层往外找

/**在迭代内使用IIFE 会为每个迭代都生成一个 新的作用域 ，使得延迟函数的回调可以将 新的
 *作用域 封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。
 */

-let
// let 声明，可以用来劫持块作用域，并且在这个块作用域中声明一个变量。 ！！！！！！！！！！！
// 本质上这是将一个块转换成一个可以被关闭的作用域

for (var i=1; i<=5; i++) {
    let j = i; // 是的，闭包的块作用域！
    setTimeout( funtion timer() {
        console.log( j );
    }, j*1000 );
}

// 正常工作，分别输出数字1~5
/**
 *但是，这还不是全部！for 循环头部的 let 声明还会有一个特殊的行为。-----------------
 *这个行为指出变量在循环过程中 不止被声明一次    ，每次迭代都会声明。-------------------
 *随后的每个迭代都会使用上一个迭代结束时的值来 初始化 这个变量。-----------------------
 */

for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
/**
 *块作用域和闭包联手便可天下无敌。不知道你是什么情况，
 *反正这个功能让我成为了一名快乐的JavaScript 程序员。
 */

-模块
/**还有其他的代码模式利用闭包的强大威力，但从表面上看，它们似乎与回调无关。下面一
 *起来研究其中最强大的一个：模块。
 */
function foo() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join( " ! " ) );
    }
}

/**正如在这段代码中所看到的，这里并没有明显的闭包，只有两个私有数据变量something
 *和another，以及doSomething() 和doAnother() 两个内部函数，它们的词法作用域（而这
 *就是闭包）也就是foo() 的内部作用域。
 */

 function CoolModule() {
     var something = "cool";
     var another = [1, 2, 3];

     function doSomething() {
         console.log( something );
     }

     function doAnother() {
         console.log( another.join( " ! " ) );
     }

     return {
         doSomething: doSomething, // 也可以把函数直接写这里， 但不介意；因为这样的话，相当于 每次都创建一遍函数，不划算！！！
         // 函数指向同一个 栈中的对象
         doAnother: doAnother
     };
 }

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// 这个模式在JavaScript 中被称为模块。最常见的实现模块模式的方法通常被称为   模块暴露，
// 这里展示的是其变体。

var foo = (function CoolModule(id) {
    function change() {
        // 修改公共API
        publicAPI.identify = identify2;
    }

    function identify1() {
        console.log( id );
    }

    function identify2() {
        console.log( id.toUpperCase() );
    }

    var publicAPI = {
        change: change,
        identify: identify1
    };

    return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

/**通过在模块实例的内部保留对公共API 对象的内部引用，可以从内部对模块实例进行修
 *改，包括添加或删除方法和属性，以及修改它们的值。
 */
