6.2 创建对象
6.2.1  工厂模式
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    };
    return o;
}

var person1 = createPerson('Nicholas', 29, 'Software Engineer');
var person2 = createPerson('Greg', 27, 'Doctor');

//存在问题 没有类的概念

--------------------------------------------------------------------------------
6.2.2 构造函数模式
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    };
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

构造函数的主要问题，每个方法都要在每个实例上重新创建一遍。
从逻辑角度讲，此时的构造函数也可以这样定义

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function('alert(this.name)');
}

从这个角度来看构造函数，更容易明白每个 person 实例都包含一个不同的 Function 实例的本质
以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍相同，
因此不同实例上的同名函数是不相等的，看下面代码

alert(person1.sayName == person2.sayName);// false

创建两个完成同样任务的 Function 实例的确没有必要，这样来改进这段代码

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName() {
    alert(this.name);
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

alert(person1.sayName == person2.sayName); // true

在上述代码中，我们把 sayName() 函数的定义转义到了构造函数外部，而在构造函数内，我们将 sayName
属性设置成等于全局的 sayName 函数。由于 sayName  包含的是一个指向函数的 指针，因此 person1
和 person2 对象就共享了在全局作用域中定义的同一个 sayName() 函数。

解决了两个函数做同一件事的问题，新问题：在全局作用域中定义的函数实际上只能被某个对象调用，
这让全局作用域有点名不符实。更让人无法接受的是：如果对象需要定义很多方法，那么就要定义
很多个全局函数，于是我们这个自定义个的引用类型就丝毫没有封装性可言了。好在，这些问题可以
通过使用原型模式来解决

--------------------------------------------------------------------------------
6.2.3 原型模式
我们创建的每个函数都有一个 prototype(原型) 属性，这个属性是一个指针，指向一个对象，而
这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。prototype 就是通过调用
构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有实例共享它所包含的
属性和方法。不必再构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中

function Person() {
}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function() {
    alert(this.name);
};

var person1 = new Person();
person1.sayName(); // 'Nicholas'

var person2 = new Person();
person2.sayName(); // 'Nicholas'

alert(person1.sayName == person2.sayName); // true

1. 理解原型对象
创建了自定义的构造函数后，其原型对象默认只会取得 constructor属性；至于其他方法，则都是
从 Object 继承而来的。当构造函数创建一个新实例后，该实例的内部将包含一个指针(内部属性)，
指向构造函数的原型对象。ECMA-262 第五版 管这个指针叫 [[prototype]] 。 也即浏览器每个
对象上都支持的一个属性 __proto__;

明确一点，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间

- isPrototypeOf()
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true

- getPrototypeOf()
ES5 增加了一个新方法， Object.getPrototypeOf()，在所有支持的实现中，这个方法返回
[[Prototype]] 的值
alert(Object.getPrototypeOf(person1) == Person.prototype);
alert(Object.getPrototypeOf(person1).name); // 'Nicholas'

使用 Object.getPrototypeOf() 可以方便地取得一个对象的原型，而这在利用原型实现继承的情况
下是非常重要的

原型链 搜索
每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。从对象实例
本身开始，接着搜索指针指向的原型对象，直到找到为止。

屏蔽原型中的属性

person1.name = 'Greg';
alert(person1.name); // 'Greg' 来自实例
alert(person2.name); // 'Nicholas' 来自原型

使用 delete 操作符可以完全删除实例属性，从而能重新访问原型中的属性

delete person1.name;
alert(person1.name); // 'Nicholas' 来自原型

我们使用 delete 操作符删除了 person1.name ，之前他保存的值屏蔽了同名的原型属性，把它
删除后，就恢复了对原型中 name 属性的连接

- hasOwnProperty()
hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中(浏览器里显示的位置)；
这个方法是从 Object 继承来的，只在给定属性存在于对象实例中，才会返回 true

alert(person1.hasOwnProperty('name')); // false

person1.name = 'Greg';
alert(person1.name); // 'Greg' 来自实例
alert(person1.hasOwnProperty('name')); // true

alert(person2.name); // 'Nicholas' 来自原型
alert(person2.hasOwnProperty('name')); // false

delete person1.name;
alert(person1.name); // 'Nicholas' 来自原型
alert(person1.hasOwnProperty('name')) // false

通过使用 hasOwnProperty() 方法，什么时候访问的是实例属性，什么时候访问的是原型属性就
一清二楚。

2. 原型与 in 操作符
有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在
通过对象能够访问给定属性时返回 true ，无论该属性存在于实例中还是原型中。

alert(person1.hasOwnProperty('name')); // false
alert('name' in person1); // true

person1.name = 'Greg';
alert(person1.name); // 'Greg' 来自实例
alert(person1.hasOwnProperty('name')); // true
alert('name' in person1); // true

alert(person2.name); // 'Nicholas' 来自原型
alert(person2.hasOwnProperty('name')); // false
alert('name' in person2); // true

delete person1.name;
alert(person1.name); // 'Nicholas' 来自原型
alert(person1.hasOwnProperty('name')) // false
alert('name' in person1); // true

判断该属性到底是存在于对象中，还是存在于原型中

function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}
// 不存在与实例， 存在于原型中

由于 in 操作符只要通过对象能够访问到属性就返回 true，hasOwnProperty() 只在属性存在于
实例中才返回 true ，因此只要 in 操作符返回 true 而 hasOwnProperty() 返回 false， 就
可以确定属性是原型中的属性

var person = new Person();
alert(hasPrototypeProperty(person, 'name')); // true

person.name = 'Greg';
alert(hasPrototypeProperty(person, 'name')); // false

在这里，name 属性先是存在于原型中，因此 hasPrototypeProperty() 返回 true 。 当在实例
中重写 name 属性后，该属性就存在于实例中了，因此 hasPrototypeProperty() 返回 false 。
即使原型中仍有 name 属性，但由于现在实例中也有这个属性，因此原型中的 name 属性就用不到了

枚举
for-in 循环
在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的(enumerated) 属性，其中
既包括存在于实例中的属性，也包括存在于原型中的属性。 屏蔽了原型中不可枚举属性(即将
[[Enumerable]] 标记为 false 的属性)的 实例属性 也会在 for-in 循环中返回，因为根据规定，
所有开发人员定义的属性都是可枚举的(IE8 及更早的版本例外)

IE 早期版本的实现中存在一个 bug，即屏蔽不可枚举属性的实例属性不会出现在 for-in 循环中

var o = {
    toString : function() {
        return 'My Object';
    }
};

for (var prop in o){
    if (prop == 'toString') {
        alert('Found toString');  // 在 ie 中不会显示; bug
    }
}

当以上代码运行时，应该会显示一个警告框，表明找到了 toString() 方法。这里的对象 o 定义了
一个名为 toString() 的方法， 该方法屏蔽了原型(Object.prototype)中(不可枚举) 的 toString()
方法。在 IE 中由于其实现认为原型的 toString() 方法被打上了值为 false 的 [[Enumerable]]
标记，因此应该跳过该属性，结果我们就不会看到警告框。该 bug 会影响默认不可枚举的所有属性和方法，
包括： hasOwnProperty() 、 propertyIsEnumerable()、 toLocaleString() 、 toString() 和
valueOf() 。 ES5 也将 constructor和 prototype 属性的 [[Enumerable]] 特性设置为 false,
但并不是所有浏览器都照此实现
--------------------------------------------------------------------------------

Object.keys()方法
要取得对象上所有 可枚举 的实例属性，使用 Object.keys() 方法
接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组

var keys = Object.keys(Person.prototype);
alert(keys); // 'name, age, job, sayName'

对比 用 for-in
for (var prop in Person.prototype){
    alert(prop) // 'name, age, job, sayName'
}

var p1 = new Person();
p1.name = 'Rob';
p1.age = 31;

var p1keys = Object.keys(p1);
alert(p1keys); // 'name, age'

对比 用 for-in
for (var prop in p1){
    alert(prop) // 'name, age, job, sayName'
}

这里变量 keys 中将保存一个数组，数组中的字符串'name'、'age'、'job'、'sayName'。这个
顺序也是它们在 for-in 循环中出现的顺序。如果通过 Person 的实例调用，则 Object.keys()
返回的数组只包含 'name' 和 'age' 这两个实例属性

如果你想得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames() 方法

var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys); // 'constructor, name, age, job, sayName'

注意结果中包含了不可枚举的 constructor属性。 Object.keys() 和 Object.getOwnPropertyNames()
方法都可以用来替代 for-in 循环。

3. 更简单的原型语法--------------------------------------------------------------

前面的例子，每添加一个属性和方法就要敲一遍 Person.prototype 。
为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性
和方法的对象字面量来重写整个原型对象，如下面代码

function Person() {
}

Person.prototype = {
    name : 'Nicholas',
    age : 29,
    job : 'Software Engineer',
    sayName : function() {
        alert(this.name);
    }
}
// 相当于用 Object 构造函数重新创建了一个实例

上述代码，我们将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。
最终结果相同，但有一个例外: constructor属性不再指向 Person 了。

前面介绍，每创建一个函数，就会同时创建它的 Prototype 对象，这个对象也会自动获得
constructor属性。而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，因此
constructor属性也就变成了新对象的constructor 属性 (指向 Object 构造函数，也就是function Object())，
不再指向Person 函数。此时，尽管 instanceof 操作符还能返回正确地结果
但通过 constructor已经无法确定对象的类型了-----------------------------------------

var friend = new Person();

alert(friend instanceof Object); // true
alert(friend instanceof Person); // true
alert(friend.constructor == Person) // false
alert(friend.constructor == Object) // true

在此，用 instanceof 操作符测试 Object 和 Person 仍然返回 true, 但constructor 属性则
等于 Object 而不等于 Person 了。如果 constructor的值真的很重要，可以像下面这样特意将它
设置回适当的值

function Person() {
}

Person.prototype = {
    constructor : Person, // 这很重要-------------------------------------------
    name : 'Nicholas',
    age : 29,
    job : 'Software Engineer',
    sayName : function() {
        alert(this.name);
    }
}

以上代码特意包含了一个 constructor属性，并将它的值设置为 Person,从而确保了通过该属性
能够访问到适当的值
注意，以这种方式重设 constructor属性会导致它的[[Enumerable]] 特性设置为 true (可枚举)
默认情况下，原生的constructor属性是不可枚举的--------------------------------------

因此，为了避免上述这种情况。可以使用 Object.defineProperty()

function Person() {
}

Person.prototype = {
    name : 'Nicholas',
    age : 29,
    job : 'Software Engineer',
    sayName : function() {
        alert(this.name);
    }
};

// 重设构造函数， 只适用于 ES5 兼容的浏览器----------------------------------------
Object.defineProperty(Person.prototype, 'constructor', {
    Enumerable : false, // 写死
    value : Person
});

4. 原型的动态性------------------------------------------------------------------
由于在原型中查找值的过程是一次搜素，因此我们对原型对象所做的任何修改都能立即从实例上
反映出来 —— 即使是先创建了实例后修改原型也照样如此

var friend = new Person();

Person.prototype.sayHi = function() {
    alert('hi');
};

friend.sayHi(); // 'hi' (没有问题！)

即使 friend 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法。这是由于
实例与原型 之间的 松散连接关系。
当我们调用 friend.sayHi() 时，首先会在实例中搜索名为 sayHi 的属性，在没找到的情况下，
会继续搜索原型。因为实例与原型之间的连接是一个 指针 ，而非一个副本，因此就可以在原型中
找到新的 sayHi 属性并返回保存在那里的函数！！！！！！！！！！！！！！！！！！！！！！！

尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是
重写这个原型对象，那情况就不一样了。

我们知道，调用构造函数时会为实例添加一个指向最初原型的[[Prototype]] 指针，而把原型修改
为另外一个对象就等于切断了构造函数与最初原型(对象)之间的联系。

记住，实例中的指针仅指向原型，而不指向构造函数！！！！！！！！！！！！！！！！！！！！！

function Person(){
}

var friend = new Person();

Person.prototype = {
    constructor: Person,
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName: function() {
        alert(this.name);
    }
}

friend.sayName(); // TypeError: friend.sayName is not a function

我们先创建了 Person 的一个实例，然后又重写了其原型对象。然后在调用 friend.sayName() 时，
发生错误。因为 friend 指向的原型(最初的那个)中不包含以该名字命名的属性。

重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；它们引用的仍然是
最初的原型

5. 原生对象的原型
原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式
创建的。所有原生引用类型(Object、Array、String，等等) 都在其构造函数的原型上定义了方法

在 Array.prototype 中可以找到 sort() 方法，在 String.prototype 中可以找到 substring()
方法

alert(typeof Array.prototype.sort); // 'function'
alert(typeof String.prototype.substring); // 'function'

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且可以定义新方法。可以像修改自定义
对象的原型那样修改原生对象的原型，因此可以随时添加方法。比如

String.prototype.startsWith = function(text) {
    return this.indexOf(text) == 0;
}

var msg = 'Hello world';
alert(msg.startsWith('Hello')); // true

当前环境中的所有字符串都可以调用它。由于 msg 是字符串，而且后台会调用 String 基本包装函数
创建这个字符串，因此通过 msg 就可以调用 startsWith() 方法

我们不推荐在程序中修改原生对象的原型

6. 原型对象的问题----------------------------------------------------------------
缺点：省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。
最大的问题：是由于原型模式共享的本性导致的。

原型中所有的属性被很多实例共享，这种共享对于函数非常适合。对于那些包含基本值的属性到也说
的过去(可以通过在实例上添加一个同名属性，隐藏(屏蔽)原型中的对象属性)

然而对于包含引用类型值的属性来说，问题就很突出--------------------------------------
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function Person() {
}

Person.prototype = {
    constructor: Person,
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    friends: ['Shelby', 'Court'], // -------------------------------------------
    sayName: function() {
        alert(this.name);
    }
}

var person1 = new Person();
var person2 = new Person();

person1.friends.push('Van'); // ------------------------------------------------

alert(person1.friends); // 'Shelby', 'Court', 'Van'
alert(person2.friends); // 'Shelby', 'Court', 'Van'
alert(person1.friends === person2.friends); // true

在此，Person.prototype 对象有一个名为 friends 的属性，该属性包含一个字符串数组。然后，
创建了 Person 的两个实例。

接着，修改了 person1.friends 引用的数组，向数组中添加了一个字符串。由于friends数组存在
于 Person.prototype 而非 person1 中，所以刚刚的修改也会通过 person2.friends
(与person1.friends 指向同一个数组) 反映出来。(实例都指向 构造函数的原型，因此原型中的
属性和方法是共享的；改动其中的属性和方法，所有实例都可见和改动；实例与原型之间的连接是
一个指针，而非副本)

但是实例一般都是要有属于自己的全部属性的，而不是相互影响，所以这个问题很突出。这也是我们
很少看到有人 单独使用原型模式 的原因。！！！！！！！！！！！！！！！！！！！！！！！！！

补充 修改 prototype 中的方法;实例之间操作相互不影响---------------------------------
person1.sayName = function() {
    alert('name');
}

person1.sayName(); // name
person2.sayName(); // 'Nicholas'

对比用 Object.create 创建对象
var person1 = Object.create(Person.prototype);
var person2 = Object.create(Person.prototype);

person1.friends.push('Van'); // ------------------------------------------------

alert(person1.friends); // 'Shelby', 'Court', 'Van'
alert(person2.friends); // 'Shelby', 'Court', 'Van'
alert(person1.friends === person2.friends); // true


--------------------------------------------------------------------------------
6.2.4 组合使用构造函数和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。

构造函数模式属性用于定义实例的属性，
而原型模式用于定义 方法和共享的属性；

结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的 引用，最大限度地节省
了内存。

另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。

function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
    constructor: Person,
    sayName: function() {
        alert(this.name);
    }
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

person1.friends.push('Van');

alert(person1.friends); // 'Shelby', 'Court', 'Van'
alert(person2.friends); // 'Shelby', 'Court'
alert(person1.friends === person2.friends); // false
alert(person1.sayName === person2.sayName); // true

实例指针指向的是原型，而不是构造器，因此在构造函数中定义实例的属性，操作相互之间不影响；
解决了之前在原型中定义遇到的问题；-------------------------------------------------

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor和
方法 sayName() 则是在原型中定义的。而修改了 person1.friends，并不会影响到
person2.friends，因为它们分别引用了不同的数组

这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种
创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式!!!!!!!!!!!!!!!!!

--------------------------------------------------------------------------------
6.2.5 动态原型模式
有其他 OO 语言经验的开发者在看到独立的构造函数和原型时，很可能会感到非常困惑。

动态原型模式正是致力于解决这个问题的一个方案，它把所有信息都封装在了构造函数中，而通过
在构造函数中初始化原型(仅在必要的情况下)，又保持了同时使用构造函数和原型的优点。

换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型(首次调用之后
方法就生效了；就不再需要初始化)

function Person(name, age, job){

    // 属性
    this.name = name;
    this.age = age;
    this.job = job;

    // 方法
    if(typeof this.sayName != 'function') {
        Person.prototype.sayName = function() {
            alert(this.name);
        };
    }
}

var friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName();

注意构造函数代码中的方法部分。这里只在 sayName() 方法不存在的情况下，才会将它添加到原型中。

这段代码只会在初次调用构造函数时才会执行。此后，原型已经完成初始化，不需要再做什么修改了

不过要记住，这里对原型所做的修改，能够立即在所有实例中得到反映。(实例指针指向原型)因此，
可以说非常完美。其中，if 语句检查的可以是初始化(原型)之后应该存在的 任何一个 属性和方法——不必
用一大堆 if 语句检查每个属性和每个方法；只要检查其中一个即可。

对于采用这种模式创建的对象，还可以使用 instanceof 操作符确定它的类型(确定它是否属于哪个类)

注意
使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果在已经创建了实例的
情况下重写原型，那么就会切断现有实例与新原型之间的联系。-----------------------------

--------------------------------------------------------------------------------
6.2.6 寄生构造函数模式
通常，在前述的几种模式都不适用的情况下，可以使用寄生(parasitic)构造函数模式。

这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的的代码，然后再返回
新创建的对象；但从表面上看，这个函数又很像典型的构造函数。

function Person(name, age, job) {
    var o = new Object(); // var o = {};
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    };
    return o;
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
person1.sayName(); // 'Nicholas'

person1.name // 'Nicholas'

在这个例子中，Person 函数创建了一个新对象，并以相应的属性和方法初始化该对象，然后又返回
了这个对象。除了使用 new操作符并把使用的包装函数叫做构造函数之外，这个模式跟 工厂模式
其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数末尾
添加一个 return 语句，可以重新调用构造函数时返回的值

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的
特殊数组。由于不可以直接修改 Array 构造函数，因此可以使用这个模式--------------------

function SpecialArray() {
    // 创建数组
    var values = new Array(); // var values = [];

    // 添加值
    values.push.apply(values, arguments);// 传参

    // 添加方法(在前面绑定 push 的前提下)
    values.toPipedString = function() {
        return this.join('|');
    };

    // 返回数组
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
alert(colors.toPipedString()); // red|blue|green

在这个例子中，我们创建了一个名叫 SpecialArray 的构造函数。在这个函数内部，首先创建了
一个数组，然后 push() 方法 (用构造函数接收到的所有参数) 初始化了数组的值！！！ 随后，
又给数组实例添加了一个 toPipedString() 方法，该方法返回以竖线分隔的数组值。最后将数组
以函数值的形式返回。接着，我们调用了 SpecialArray 构造函数，向其中传入了用于初始化数组
的值，此后又调用了 toPipedString() 方法

关于寄生构造函数模式，有一点需要说明：首先，返回的对象 与构造函数 或者 与构造函数的原型属性
之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，
不能依赖 instanceof 操作符来确定对象类型(没有类的概念)。

由于存在上述问题，我们建议在可以使用其他模式的情况下，不要使用这种模式！！！


--------------------------------------------------------------------------------
6.2.7 稳妥构造函数模式
稳妥对象，指的是没有公共属性，而且其方法也不引用 ths 的对象。

稳妥对象最适合在一些安全的环境中(这些环境禁止使用 this 和 new)，或者在防止数据被
其他应用程序(如 Mashup程序)改动时使用

稳妥构造函数遵循与寄生构造函数类似的模式。有两点不同：
一是新创建对象的实例方法不引用 this；
而是不使用 new操作符调用构造函数

function Person(name, age, job){

    // 创建要返回的对象
    var o = new Object();

    // 可以在这里定义私有变量和函数

    // 添加方法
    o.sayName = function() {
        alert(name);
    };

    // 返回对象
    return o;
}

注意，在以这种模式创建的对象中，除了使用 sayName() 方法外，没有其他办法访问 name 的值
可以像下面这样使用稳妥的 Person 构造函数

var friends = Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); // 'Nicholas'

这样，变量 friend 中保存的是一个稳妥对象，而除了调用 sayName() 方法外，没有别的方式
可以访问其数据成员。

即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中
的原始数据。

稳妥构造函数模式提供的这种安全性，使得他非常适合在某些安全执行环境——如 ADsafe 和 Caja
提供的环境下使用

与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此
instanceof 操作符对这种对象也没有意义

--------------------------------------------------------------------------------
6.3 继承
继承是 OO 语言中的最为人津津乐道的概念。
许多 OO 语言都支持两种继承方式：接口继承 和 实现继承。
接口继承只继承方法签名，而实现继承则继承实际的方法。
如前所述，由于函数没有签名，在ES 中无法实现接口继承。
ES只支持实现继承，而且其实现继承主要是 依靠原型链 来实现的

6.3.1 原型链
ES 描述了 原型链 的概念，并将 原型链 作为实现继承的主要方法。其基本思想是让一个引用类型
继承另一个引用类型的属性和方法

构造函数、原型和实例的关系
    每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针
    实例都包含一个指向原型对象的内部指针

假如我们让 原型对象 等于 另一个类型的实例，
    此时的原型对象将包含一个 指向另一个原型的 指针，
    相应地，另一个原型中也包含这一个指向另一个构造函数的指针

假如另一原型又是另一个类型的实例，那么上述关系依然成立。
如此层层递进，就构成了实例与原型的链条。这就是原型链的基本概念

实现原型链有一种基本模式，其代码如下

function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
}

function SubType(){
    this.subproperty = false;
}

// 继承了 SuperType
SubType.prototype = new SuperType();
// 每创建一个函数(SuperType)，就会同时创建它的 Prototype 对象，
// 这个对象也会自动获得 constructor属性；指回 SuperType；
// 而实例的 constructor 也是通过继承原型得来的

SubType.prototype.getSubValue = function(){
    return this.subproperty;
}

var instance = new SubType();
alert(instance.getSuperValue()); // true

// instance 在原型链上找到了 getSuperValue 方法；并在原型上找到 property 属性！！！

要注意 instance.constructor 现在指向的是 SuperType，这是因为原来的subType.prototype
被重写的缘故(看实例在重写原型之前，还是之后；之前就跟着老原型走，之后就跟着新原型走)

通过实行原型链，本质上扩展了前面介绍的原型搜索机制；
--------------------------------------------------------------------------------
// 自己检验1
function Foo(){}
Foo.prototype.property = '属性值'

var foo = new Foo();
foo.property // '属性值'
--------------------------------------------------------------------------------
// 自己检验2
function Foo(){}
var foo = new Foo();

function Bar(){}
Foo.prototype = new Bar(); // 相当于重写了 Foo 的原型对象；
// 切断了现有原型与任何之前已经存在的对象实例(foo)之间的联系；它们(foo)引用的仍然是最初的原型;

Foo.prototype.property = '属性值'

foo.property // undefined

var foo1 = new Foo();
foo1.property // "属性值"
// 新的实例，连接到(指向)重写的 Foo 的原型对象上， 因此拥有 property 属性
--------------------------------------------------------------------------------
// 自己检验3
function Foo(){}
Foo.prototype.constructor // Foo

var foo = new Foo()
foo.constructor // Foo

function Bar(){};
Foo.prototype = new Bar(); // 重写 Foo 原型
Foo.prototype.constructor // Bar

foo.constructor // Foo; foo实例在重写 原型之前 定义的，因此指向的是原来的 原型

var foo1 = new Foo();
foo1.constructor // Bar; foo1 实例在重写 原型之后定义的，因此指向的是 重写的原型
// 而结果是 Bar 也说明了 constructor 属性也是继承原型而来的，而与构造器无直接关系
--------------------------------------------------------------------------------
// 自己检验4
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
}

function SubType(){
    this.subproperty = false;
}

SubType.prototype.prop = 'SubType原有原型的属性值'

var instance1 = new SubType();
instance1.prop // "SubType原有原型的属性值"
instance1.subproperty // false

SubType.prototype = new SuperType(); // 重写SubType原型

SubType.prototype.getSubValue = function(){
    return this.subproperty;
}

var instance2 = new SubType();
alert(instance2.getSuperValue()); // true
instance2.getSubValue() // false
instance2.subproperty  //false
instance2.subproperty  // false

instance2.prop // undefined;重写原型之后的实例，访问不到原来原型的属性；切断了

instance1.getSuperValue() // instance1.getSuperValue is not a function
// 重写原型之前的实例，访问不到重写原型之后，原型的方法
instance1.getSubValue() // instance1.getSubValue is not a function

以上一切说明，重写原型，会切断原有实例(重写原型之前的实例)与现有原型之间的联系，
也会切断现有实例(重写原型之后的实例)与原有原型之间的联系；

但是，原有实例和现有实例 与 构造函数之间的 联系一直都在(在构造函数里的定义的属性还是能访问到的)
(构造函数里的基本类型值与引用类型值，实例之间操作相互不影响！！！！！！)
说明从构造函数到实例是一个复制过程，实例相互之间不影响

写在构造函数中
function Foo(){
    this.age = 5;
    this.name = 'GeCan';
    this.friends = ['XiaoDan','Kaikai'];
}

var foo1 = new Foo();
foo1.age // 5
foo1.age = 15; // 屏蔽原型属性
foo1.age // 15

foo1.friends // [ "XiaoDan", "Kaikai" ]
foo1.friends.push('WangWei');
foo1.friends // [ "XiaoDan", "Kaikai", "WangWei" ]

var foo2 = new Foo();
foo2.age // 5 未改变
foo2.friends // [ "XiaoDan", "Kaikai" ] 未改变

--------------------------------------------------------------------------------
写在原型上
function Foo(){}
Foo.prototype.age = 5;
Foo.prototype.name = 'GeCan';
Foo.prototype.friends = ['XiaoDan','Kaikai'];
Foo.prototype.sayName = function(){
    return this.name;
}

var foo1 = new Foo();
foo1.age // 5
foo1.age = 15; // 屏蔽原型属性
foo1.age // 15

foo1.friends // [ "XiaoDan", "Kaikai" ]
foo1.friends.push('WangWei');
foo1.friends // [ "XiaoDan", "Kaikai", "WangWei" ]

// 看看原型中 发生的变化
Foo.prototype.friends // [ "XiaoDan", "Kaikai", "WangWei" ] 改变了！！！！！！！！！！

foo1.sayName(); // "GeCan"
foo1.sayName = function(){
    return 'Haha'
}
foo1.sayName(); // "Haha"

var foo2 = new Foo();
foo2.age // 5 未改变
foo2.friends // [ "XiaoDan", "Kaikai", "WangWei" ] 改变了！！！！！！！！！

foo2.sayName() // "GeCan"

以上代码说明了，定义在原型上的方法和属性，基本类型值不会受影响，但是引用类型值实例之间操作是
会相互影响的(函数不会受影响！！！)

这更说明了，实例与构造器是复制(副本)的做法(费内存)；实例与原型是引用，关联，委托的做法(省内存)

--------------------------------------------------------------------------------
// 自己检验 6
function Foo(){}

Foo.prototype.age = 5;
Foo.prototype.name = 'GeCan';
Foo.prototype.friends = ['XiaoDan','Kaikai'];
Foo.prototype.sayName = function(){
    return this.name;
}

像上面这样对原型的操作，是直接改变 堆内存 中(实例引用、指向的)原型；并不会切断实例与原型
之间的联系；(这也解释了之前说的 原型的动态性)

原型动态性(在实例定义之后，再在原型上定义方法，实例依然能访问到)
实例与原型 之间的 松散连接关系。
当我们调用 方法 时，首先会在实例中搜索名为 方法 的属性，在没找到的情况下，
会继续搜索原型。

因为实例与原型之间的连接是一个 指针 ，而非一个副本，因此就可以在原型中
找到新的  方法 属性并返回保存在那里的函数！！！！！！！！！！！！！！！！！！！！！！！

尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是
重写这个原型对象，那情况就不一样了。

我们知道，调用构造函数时会为实例添加一个指向最初原型的[[Prototype]] 指针，而把原型修改
为另外一个对象就等于切断了构造函数与最初原型(对象)之间的联系。(重写原型，相当于调用 Object
构造函数，重新创建了一个对象实例，因此constructor指向了 Object)

记住，实例中的指针仅指向原型，而不指向构造函数！！！！！！！！！！！！！！！！！！！！！

function Foo(){}

Foo.prototype = {
    age: 5,
    name: 'GeCan',
    friends: ['XiaoDan','Kaikai'],
    sayName: function(){
        return this.name;
    }
}

像这样重写原型对象，是不行的；这样会切断了构造函数与最初原型之间的联系，也切断了新定义的实例
与最初原型之间的联系，原有的实例与现在的原型也没联系。

--------------------------------------------------------------------------------
回到书本
6.3.1
1 别忘记默认的原型
所有 引用类型 默认都继承了 Object，而这个继承也是通过原型链实现的；
(数值、布尔值、null、undefined等基本类型值不算)

这也正是所有自定义类型都会继承 toString() 、 valueOf() 等默认方法的根本原因

2. 确定原型和实例的关系
通过两种方式确定 原型和实例 之间的关系
    第一种方式 instanceof 操作符
    只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回 true

    alert(instance instanceof Object); // true
    alert(instance instanceof SuperType); // true
    alert(instance instanceof SubType); // true

由于原型链的关系，我们可以说 instance 是Object、SuperType或SubTyep中任何一个类型的实例

    第二种方式 isPrototypeOf() 方法
    同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型
    alert(Object.prototype.isPrototypeOf(instance)); //true
    alert(SuperType.prototype.isPrototypeOf(instance)); //true
    alert(SubType.prototype.isPrototypeOf(instance)); //true

3. 谨慎地定义方法
 子类型有时候需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法。
 但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后

function SuperType(){
 this.peoperty = true;
}

SuperType.prototype.getSubValue = function(){
 return this.property;
}

function SubType() {
 this.subproperty = false;
}

// 继承了 SuperType
subType.prototype = new SuperType();

// 添加新方法
subType.prototype.getSubValue = function(){
 return this.subproperty;
}

// 重写超类型中的方法
SubType.prototype.getSuperValue = function(){
    return false;
}

var instance = new SubType();
alert(instance.getSuperValue()); // false

当通过 SubType 的实例调用 getSuperValue() 时，调用的是重新定义的方法(覆盖)；
但通过 SuperType 的实例调用 getSuperValue()时，还会继续调用原来的那个方法(函数不会受影响，
只有当引用类型值改动，才会改变原型中的引用类型值)

也就是我们之前说的
    定义在原型上的方法和属性，基本类型值不会影响，但是引用类型值实例之间操作是
    会相互影响的(函数不会受影响！！！)

这里要注意的是必须要在用 SuperType 的实例替换原型后，再定义这两个方法
如果在重写原型之前定义方法，重写原型后，会切断实例与原有原型的连接，因此不能访问到
方法，会报错

还有一点，需要注意，即在通过原型链实现继承时，不能使用对象字面量创建原型方法
因为这样会重写原型链(指向 Object.prototype)

function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

// 继承了 SuperType
SubType.prototype = new SuperType();

// 使用字面量添加新方法，会导致上一行代码无效
// 原本上一行代码，是指向 SuperType 的原型
SubType.prototype = {
    getSubValue: function(){
        return this.subproperty;
    },

    someOtherMethod: function(){
        return false;
    }
};

// 上述代码 相当于 SubType.prototype = new Object(); 重写了原型
// SubType.prototype.getSubValue ...
// subType.prototype.someOtherMethod...
// 因此 指向了 Object 的原型，改变了原型链

var instance = new SubType();
alert(instance.getSuperValue()); // 找不到这个方法 会报错  error

--------------------------------------------------------------------------------
自己检验
function Foo(){}
Foo.prototype.sayName = function(){
    return '初始原型';
}

var foo1 = new Foo();
foo1.sayName() //'初始原型'

// new方式 重写原型； 切断了新实例与原有原型的连接
function Bar(){}
Foo.prototype = new Bar();
var foo2 = new Foo();
foo2.sayName(); // error 报错；找不到这个方法

Bar.prototype.sayName = function(){
    return '第一次重写的原型';
}

var foo3 = new Foo();
foo3.sayName() // '第一次重写的原型'

// 覆盖重写原型后定义的方法
Foo.prototype.sayName = function(){
    return '覆盖了新原型的方法'
}

var foo4 = new Foo();
foo4.sayName() // '覆盖了新原型的方法'

// 覆盖原型的方法，并不影响其他实例调用这个方法；
// 其他实例还会继续调用(覆盖前)原来的那个方法
var bar = new Bar();
bar.sayName() // '第一次重写的原型'

// 对象字面量方式 重写原型对象； 切断了新实例与原有原型的连接
Foo.prototype = {
    getHeight: function(){
        return '高度是2m'
    },
    getWeight: function(){
        return '重量是1kg'
    }
}
// 相当于 Foo.property = new Object(); 然后再定义方法...

var foo5 = new Foo();
foo5.sayName() // error报错；找不到这个方法
// 原有的实例 还是 连接到 原有的原型
foo4.sayName() //'覆盖了新原型的方法'

Foo.prototype.__proto__ == Object.prototype // true

// 另外，在构造器函数里定义的属性，比较好理解，变化没这么多

-------------------------------------------------------------------------------
4. 原型链的问题
原型链虽然很强大，可以用它来实现继承，但也存在一些问题。
最主要的问题，来自包含引用类型值的原型！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

前面介绍过，原型中的包含 引用类型值 的原型属性会被所有实例共享；(因而实例之间操作后会相互影响)
这也正是为什么要在构造函数中，而不是原型对象中定义属性的原因

在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是原型的实例属性也就顺理成章
地变成了现在的原型属性了 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

function SuperType(){
    this.colors = ['red', 'blue', 'green'];
}

function SubType(){}

// 继承了 SuperType
SubType.prototype = new SuperType();
// 此时，有了 SubType.prototype.colors = ['red', 'blue', 'green']； 调用构造器后实例会获得属性

var instance1 = new SubType();
instance1.colors.push('black');
alert(instance1.colors); //  [ "red", "blue", "green", "black" ]

var instance2 = new SubType();
alert(instance2.colors); // [ "red", "blue", "green", "black" ]

// 以上代码说明了 实例改变在原型上定义的 引用类型值 会影响其他实例(引用类型的原型属性会被所有个实例共享)；

// 对比 以前的; 实例之间的操作并不会影响 在构造器中定义的属性
function SuperType(){
    this.colors = ['red', 'blue', 'green'];
}

var instance1 = new SuperType();
instance1.colors.push('white');
console.log(instance1.colors); // [ "red", "blue", "green", "white" ]

var instance2 = new SuperType();
console.log(instance2.colors); // [ "red", "blue", "green" ]

SuperType 每个实例都会有包含自己数组的 colors 属性(且覆盖不能相互影响)；
当 SubType 通过原型链继承了 SuperType 之后， SubType.prototype 就变成了 SuperType 的
一个实例， 因此(new调用后) 它也拥有了一个它 自己 的 colors属性(构造器的副本) ——
就相当于创建了一个 SubType.prototype.colors 属性一样

就会导致之前我们说过的 原型上包含引用类型值的属性会被所有实例共享的问题
上面例子中，instance1 对 instance.colors 修改， instance2 也能反映出来(说明 SubType.prototype.colors 被改了)
但实际上，我们不希望看到这种结果。我们不希望实例间相互影响

// 自己检验 1
基本类型值的复制
var a = 1;
var b = a;
console.log(b) // 2

b = 2;
console.log(a) // 1

// 字符串也如上

引用类型值的复制
var a = [1, 2]
var b = a;
console.log(b) // [1, 2]

b.push(3);
console.log(a) // [1, 2, 3]

原型链的第二个问题
    在创建子类型的实例时，不能向超类型的构造函数传递参数！！！
    实际上，应该说是没有办法在不影响所有实例对象的情况下，给超类型的构造函数传递参数

// 原来实例定义时，可以向父类型的构造函数传递参数
function Foo(name){
    this.name = name;
}

var foo1 = new Foo('GeCan');
console.log(foo1.name); // 'GeCan'

var foo2 = new Foo('Kaikai');
console.log(foo2.name); // 'Kaikai'


// 改成超类型
function Foo(){}

function Bar(name){
    this.name = name;
}

Foo.prototype = new Bar('Kaikai');

var foo1 = new Foo();
console.log(foo1.name) // 'Kaikai'

var foo2 = new Foo();
console.log(foo2.name) // 'Kaikai'

foo2.name = 'GeCan';
console.log(foo1.name) // 'Kaikai'; 字符串是基本类型值

上述代码在创建子类型实例时，并不能直接向超类型构造函数传递参数！！！！！！！！！！！！！
其实是说不能像原来那样独立传参数了；

因为传参数发生在 将 Bar 实例赋给 Foo.prototype 这个过程，这里赋值是什么，那所有子类型实例
的属性的值 都是这个参数了
