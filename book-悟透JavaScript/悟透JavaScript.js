JavaScript 函数

JavaScript里的代码也是一种数据，同样可以被任意赋值和修改的，而它的值就是代码的逻辑。
只是，与一般数据不同的是，函数是可以被调用执行的。

不过，如果JavaScript函数仅仅只有这点道行的话，
这与C++的函数指针，DELPHI的方法指针，C#的委托相比，又有啥稀奇嘛！
然而，JavaScript函数的神奇之处还体现在另外两个方面：
一是函数function类型本身也具有对象化的能力，
二是函数function与对象 object超然的结合能力。

--------------------------------------------------------------------------------
奇妙的对象

先来说说函数的对象化能力。

任何一个函数都可以为其动态地添加或去除属性，这些属性可以是简单类型，可以是对象，
也可以是其他函数。也就是说，函数具有对象的全部特征，你完全可以把函数当对象来用。
其实，函数就是对象，只不过比一般的对象多了一个括号“()”操作符，这个操作符用来执行函数的逻辑。
即，函数本身还可以被调用，一般对象却不可以被调用，除此之外完全相同。请看下面的代码：

function Sing()
{
    with(arguments.callee)
      alert(author + "：" + poem);
};
Sing.author = "李白";
Sing.poem = "汉家秦地月，流影照明妃。一上玉关道，天涯去不归";
Sing();
Sing.author = "李战";
Sing.poem = "日出汉家天，月落阴山前。女儿琵琶怨，已唱三千年";
Sing();

在这段代码中，Sing函数被定义后，又给Sing函数 动态地 增加了author和poem属性。
将author和poem属性设为不同的作者和诗句，在调用Sing()时就能显示出不同的结果。
这个示例用一种诗情画意的方式，让我们理解了JavaScript函数就是对象的本质，也感受到了JavaScript语言的优美。

--------------------------------------------------------------------------------
再看一下代码
var anObject = {};  //一个对象
anObject.aProperty = "Property of object";  //对象的一个属性
anObject.aMethod = function(){alert("Method of object")}; //对象的一个方法
//主要看下面：
alert(anObject["aProperty"]);   //可以将对象当数组以 属性名 作为下标来访问属性
anObject["aMethod"]();          //可以将对象当数组以 方法名 作为下标来调用方法
for( var s in anObject)         //遍历对象的所有属性和方法进行 迭代化 处理
alert(s + " is a " + typeof(anObject[s]));

同样对于function类型的对象也是一样
var aFunction = function() {};  //一个函数
aFunction.aProperty = "Property of function";  //函数的一个属性
aFunction.aMethod = function(){alert("Method of function")}; //函数的一个方法
//主要看下面：
alert(aFunction["aProperty"]);   //可以将函数当数组以 属性名 作为下标来访问属性
aFunction["aMethod"]();          //可以将函数当数组以 方法名 作为下标来调用方法
for( var s in aFunction)         //遍历函数的所有属性和方法进行 迭代化 处理
alert(s + " is a " + typeof(aFunction[s]));

是的，对象和函数可以象数组一样，用属性名或方法名作为下标来访问并处理。
那么，它到底应该算是数组呢，还是算对象？

我们知道，数组应该算是线性数据结构，线性数据结构一般有一定的规律，适合进行统一的批量迭代操作等，有点像波。
而对象是离散数据结构，适合描述 分散的和个性化 的东西，有点像粒子。因此，我们也可以这样问：JavaScript里的对象到底是波还是粒子？

如果存在对象量子论，那么答案一定是：波粒二象性！

因此，JavaScript里的 函数和对象 既有 对象的特征 也有 数组的特征。
这里的数组被称为“字典”，一种可以任意伸缩的 名称值对儿 的集合。
其实， object和function的内部实现就是一个字典结构，但这种字典结构却通过严谨而精巧的语法表现出了丰富的外观。
正如量子力学在一些地方用粒子来解释和处理问题，而在另一些地方却用波来解释和处理问题。
你也可以在需要的时候，自由选择用 对象还是数组 来解释和处理问题。
只要善于把握JavaScript的这些奇妙特性，就可以编写出很多简洁而强大的代码来。

--------------------------------------------------------------------------------
放下对象

我们再来看看function与object的超然结合吧
在面向对象的编程世界里，数据与代码的有机结合就构成了对象的概念。
自从有了对象，编程世界就被划分成两部分，一个是对象内的世界，一个是对象外的世界。
对象天生具有自私的一面，外面的世界未经允许是不可访问对象内部的。
对象也有大方的一面，它对外提供属性和方法，也为他人服务。
不过，在这里我们要谈到一个有趣的问题，就是“对象的自我意识”。

可能对许多程序员来说，这的确是第一次听说。
不过，请君看看C++、C#和Java的this，DELPHI的self，还有VB的me，或许你会恍然大悟！当然，也可能只是说句“不过如此”而已。

然而，就在对象将世界划分为内外两部分的同时，对象的“自我”也就随之产生。
“自我意识”是生命的最基本特征！正是由于对象这种强大的生命力，才使得编程世界充满无限的生机和活力。

JavaScript中也有this，但这个this却与C++、C#或Java等语言的this不同。
一般编程语言的this就是对象自己，而 JavaScript的this却并不一定！
this可能是我，也可能是你，可能是他，反正是我中有你，你中有我，
这就不能用原来的那个“自我”来理解 JavaScript这个this的含义了。
为此，我们必须首先放下原来对象的那个“自我”。

function WhoAmI() {  //定义一个函数WhoAmI
    alert("I'm " + this.name + " of " + typeof(this));
};

WhoAmI(); //此时是this当前这段代码的全局对象，在浏览器中就是window对象，其name属性为空字符串。输出：I'm of object

var BillGates = {name: "Bill Gates"};
BillGates.WhoAmI = WhoAmI;  // 将 函数WhoAmI 作为 BillGates的方法。
BillGates.WhoAmI();         // 此时的this是BillGates。输出：I'm Bill Gates of object

var SteveJobs = {name: "Steve Jobs"};
SteveJobs.WhoAmI = WhoAmI;  // 将函数WhoAmI作为SteveJobs的方法。
SteveJobs.WhoAmI();         // 此时的this是SteveJobs。输出：I'm Steve Jobs of object

WhoAmI.call(BillGates);     // 直接将BillGates作为this，调用WhoAmI。输出：I'm Bill Gates of object
WhoAmI.call(SteveJobs);     // 直接将SteveJobs作为this，调用WhoAmI。输出：I'm Steve Jobs of object

BillGates.WhoAmI.call(SteveJobs);   // 将SteveJobs作为this，却调用BillGates的WhoAmI方法。输出：I'm Steve Jobs of object
SteveJobs.WhoAmI.call(BillGates);   // 将BillGates作为this，却调用SteveJobs的WhoAmI方法。输出：I'm Bill Gates of object

WhoAmI.WhoAmI = WhoAmI;     // 将WhoAmI函数设置为自身的方法。
WhoAmI.name = "WhoAmI";
WhoAmI.WhoAmI();            // 此时的this是WhoAmI函数自己。输出：I'm WhoAmI of function!!!!!!!!!!!!!!!!!!!!

({name: "nobody", WhoAmI: WhoAmI}).WhoAmI();    // 临时创建一个匿名对象并设置属性后调用WhoAmI方法。输出：I'm nobody of object!!!!

从上面的代码可以看出，同一个函数可以从不同的角度来调用，this并不一定是函数本身所属的对象。
this只是在任意对象和function元素结合时的一个概念，是种结合比起一般对象语言的默认结合更加灵活，显得更加超然和洒脱。

在JavaScript函数中，你只能把this看成当前要服务的“这个”对象。
this是一个特殊的内置参数，根据this参数，您可以访问到“这个”对象的属性和方法，
但却不能给this参数赋值。在一般对象语言中，方法体代码中的this可以省略的，成员默认都首先是“自己”的。
但JavaScript却不同，由于不存在“自我”，当访问“这个”对象时，this不可省略！

JavaScript提供了传递this参数的多种形式和手段，其中，象BillGates.WhoAmI()和SteveJobs.WhoAmI()这种形式，
是传递this参数最正规的形式，此时的this就是函数所属的对象本身。而大多数情况下，
我们也几乎很少去采用那些借花献佛的调用形式。
但只我们要明白JavaScript的这个“自我”与其他编程语言的“自我”是不同的，
这是一个放下了的“自我”，这就是JavaScript特有的世界观。

--------------------------------------------------------------------------------
对象素描
字面量

其实，JSON就是JavaScript对象最好的 序列化 形式，它比 XML 更简洁也更省空间。
对象可以作为一个 JSON形式的字符串，在网络间自由传递和交换信息。
而当需要将这个JSON字符串变成一个 JavaScript对象 时，只需要使用 eval 函数这个强大的 数码转换引擎，
就立即能得到一个JavaScript内存对象。
正是由于JSON的这种简单朴素的天生丽质，才使得她在AJAX舞台上成为璀璨夺目的明星。

-------------------------------------------------------------------------------
构造对象

function MyFunc() {};         //定义一个空函数
var anObj = new MyFunc();  //使用new操作符，借助MyFun函数，就创建了一个对象

其实，可以把上面的代码改写成这种等价形式：
function MyFunc(){};
var anObj = {};     //创建一个对象
MyFunc.call(anObj); //将anObj对象作为 this指针 调用MyFunc函数

我们就可以这样理解，JavaScript先用new操作符创建了一个对象，
紧接着就将这个对象作为 this参数 调用了后面的函数。
其实，JavaScript内部就是这么做的，而且任何函数都可以被这样调用！！！！！！！！！！！！
但从 “anObj = new MyFunc()” 这种形式，我们又看到一个熟悉的身影，
C++和C#不就是这样创建对象的吗？原来，条条大路通灵山，殊途同归啊！

君看到此处也许会想，我们为什么不可以把这个MyFunc当作构造函数呢？
恭喜你，答对了！JavaScript也是这么想的！请看下面的代码：

function Person(name){ //带参数的构造函数
   this.name = name;   //将参数值赋给给this对象的属性
   this.SayHello = function() { //给this对象定义一个SayHello方法。
       alert("Hello, I'm " + this.name);
   };
};

function Employee(name, salary){ //子构造函数
    Person.call(this, name);     //将 this 传给父构造函数
    this.salary = salary;        //设置一个this的salary属性
    this.ShowMeTheMoney = function() { //添加ShowMeTheMoney方法。
        alert(this.name + " $" + this.salary);
    };
};

var BillGates = new Person("Bill Gates");   //用Person构造函数创建BillGates对象
var SteveJobs = new Employee("Steve Jobs", 1234);  //用Empolyee构造函数创建SteveJobs对象

BillGates.SayHello();   //显示：I'm Bill Gates
SteveJobs.SayHello();   //显示：I'm Steve Jobs
SteveJobs.ShowMeTheMoney();   //显示：Steve Jobs $1234

alert(BillGates.constructor == Person);  //显示：true
alert(SteveJobs.constructor == Employee);  //显示：true

alert(BillGates.SayHello == SteveJobs.SayHello); //显示：false； new Function

这段代码表明，函数不但可以当作构造函数，而且还可以带参数，还可以为对象添加成员和方法。
其中的第9行，Employee构造函数又将自己接收的this作为参数调用Person构造函数，
这就是相当于调用基类的构造函数。第21、22行还表明这样一个意思：BillGates是由Person构造的，
而SteveJobs是由Employee构造的。对象内置的constructor属性还指明了构造对象所用的具体函数！

其实，如果你愿意把函数当作“类”的话，她就是“类”，因为她本来就有“类”的那些特征
难道不是吗？她生出的儿子各个都有相同的特征，而且构造函数也与类同名嘛！

但要注意的是，用构造函数操作this对象创建出来的每一个对象，不但具有 各自的 成员数据，而且还具有 各自的 方法数据.
换句话说，方法的代码体(体现函数逻辑的数据)在每一个对象中都存在一个副本。
尽管每一个代码副本的逻辑是相同的，但对象们确实是各自保存了一份代码体。(new Function ,创造出一个个副本)
上例中的最后一句说明了这一实事，这也解释了JavaScript中的函数就是对象的概念。

同一类的对象各自有一份方法代码显然是一种浪费。(代码复用)----------------------------
在传统的对象语言中，方法函数并不象JavaScript那样是个 对象概念。
即使也有象函数指针、方法指针或委托那样的变化形式，但其实质也是对同一份代码的 引用。一般的对象语言很难遇到这种情况。

 不过，JavaScript语言有大的灵活性。我们可以先定义一份唯一的方法函数体，
 并在构造this对象时使用这唯一的函数对象作为其方法，就能共享方法逻辑。例如：

function SayHello() {     // 先定义一份SayHello函数代码
   alert("Hello, I'm " + this.name);
};

function Person(name) {   // 带参数的构造函数
   this.name = name;      // 将参数值赋给给this对象的属性
   this.SayHello = SayHello;  //给this对象SayHello方法赋值为前面那份SayHello代码。
};

var BillGates = new Person("Bill Gates");   // 创建BillGates对象
var SteveJobs = new Person("Steve Jobs");   // 创建SteveJobs对象

alert(BillGates.SayHello == SteveJobs.SayHello); //显示：true

其中，最后一行的输出结果表明两个对象确实共享了一个函数对象
虽然，这段程序达到了共享了一份方法代码的目的，但却不怎么优雅。
因为，定义SayHello方法时反映不出其与Person类的关系。(sayHello 名义上作为方法，但实际是一个全局函数)

--------------------------------------------------------------------------------
显然，JavaScript早想到了这一问题，她的设计者们为此提供了一个有趣的prototype概念 (代码复用)

初看原型
prototype源自法语，软件界的标准翻译为“原型”，代表事物的初始形态，也含有模型和样板的意义。
JavaScript中的prototype概念恰如其分地反映了这个词的内含，我们不能将其理解为C++的prototype那种预先声明的概念。

JavaScript的所有function类型的对象都有一个prototype属性。这个prototype属性本身又是一个object类型的对象，
因此我们也可以给这个prototype对象添加任意的属性和方法。
既然prototype是对象的“原型”，那么由该函数构造出来的对象应该都会具有这个“原型”的特性。
事实上，在构造函数的prototype上定义的 所有属性和方法，都是可以通过 其构造的对象 直接访问和调用的。
也可以这么说，prototype提供了一群 同类对象共享属性和方法的机制。

function Person(name)
{
   this.name = name;   //设置对象属性，每个对象 各自一份属性数据
};

Person.prototype.SayHello = function()  // 给Person函数的prototype添加SayHello方法。
{
   alert("Hello, I'm " + this.name);
}

var BillGates = new Person("Bill Gates");   //创建BillGates对象
var SteveJobs = new Person("Steve Jobs");   //创建SteveJobs对象

BillGates.SayHello();   // 通过BillGates对象直接调用到SayHello方法
SteveJobs.SayHello();   // 通过SteveJobs对象直接调用到SayHello方法

alert(BillGates.SayHello == SteveJobs.SayHello); //因为两个对象是共享prototype的SayHello，所以显示：true

程序运行的结果表明，构造函数的prototype上定义的方法确实可以通过对象直接调用到，而且代码是共享的。
显然，把方法设置到prototype的写法显得优雅多了，尽管调用形式没有变，但逻辑上却体现了方法与类的关系，相对前面的写法，更容易理解和组织代码。

那么，对于多层次类型的构造函数情况又如何呢？

function Person(name)   //基类构造函数
{
     this.name = name;
};

Person.prototype.SayHello = function()  //给基类构造函数的prototype添加方法
{
     alert("Hello, I'm " + this.name);
};

function Employee(name, salary) //子类构造函数
{
    Person.call(this, name);    //调用基类构造函数 ------------------------------
    this.salary = salary;
};

Employee.prototype = new Person();  // 建一个基类的对象作为子类原型的原型，这里很有意思------

Employee.prototype.ShowMeTheMoney = function()  //给子类添构造函数的prototype添加方法
{
    alert(this.name + " $" + this.salary);
};

var BillGates = new Person("Bill Gates");   //创建基类Person的BillGates对象
var SteveJobs = new Employee("Steve Jobs", 1234);   //创建子类Employee的SteveJobs对象

BillGates.SayHello();       //通过对象直接调用到prototype的方法
SteveJobs.SayHello();       //通过子类对象直接调用基类prototype的方法，关注！
SteveJobs.ShowMeTheMoney(); //通过子类对象直接调用子类prototype的方法

alert(BillGates.SayHello == SteveJobs.SayHello); //显示：true，表明prototype的方法是共享的

这段代码的第17行，构造了一个基类的对象，并将其设为子类构造函数的prototype，这是很有意思的。
这样做的目的就是为了第28行，通过子类对象也可以直接调用基类prototype的方法。为什么可以这样呢？

原来，在JavaScript中，prototype不但能让对象共享自己财富，而且prototype还有寻根问祖的天性，
从而使得先辈们的遗产可以代代相传。当从一个对象那里读取属性或调用方法时，
如果该对象自身不存在这样的属性或方法，就会去自己关联的prototype对象那里寻找；
如果prototype没有，又会去prototype自己关联的前辈prototype那里寻找，直到找到或追溯过程结束为止。

在JavaScript内部，对象的属性和方法追溯机制是通过所谓的prototype链来实现的。
当用new操作符构造对象时，也会同时将构造函数的prototype对象指派给新创建的对象，成为该对象内置的原型对象
对象内置的原型对象应该是对外不可见的，尽管有些浏览器(如Firefox)可以让我们访问这个内置原型对象，但并不建议这样做。
内置的原型对象本身也是对象，也有自己关联的原型对象，这样就形成了所谓的原型链。

在原型链的最末端，就是Object构造函数prototype属性指向的那一个原型对象。这个原型对象是所有对象的最老祖先，
这个老祖宗实现了诸如toString等所有对象天生就该具有的方法。其他内置构造函数，如 Function, Boolean, String,
Date 和 RegExp 等的prototype都是从这个老祖宗传承下来的，
但他们各自又定义了自身的属性和方法，从而他们的子孙就表现出各自宗族的那些特征。!!!!!!!!!

这不就是“继承”吗？是的，这就是“继承”，是JavaScript特有的“原型继承”。

“原型继承”是慈祥而又严厉的。原形对象将自己的属性和方法无私地贡献给孩子们使用，也并不强迫孩子们必须遵从，
允许一些顽皮孩子按自己的兴趣和爱好独立行事。从这点上看，原型对象是一位慈祥的母亲。
然而，任何一个孩子虽然可以我行我素，但却不能动原型对象既有的财产，
因为那可能会影响到其他孩子的利益。从这一点上看，原型对象又象一位严厉的父亲。我们来看看下面的代码就可以理解这个意思了：

function Person(name)
{
    this.name = name;
};

Person.prototype.company = "Microsoft"; //原型的属性

Person.prototype.SayHello = function()  //原型的方法
{
    alert("Hello, I'm " + this.name + " of " + this.company);
};

var BillGates = new Person("Bill Gates");
BillGates.SayHello();   // 由于继承了原型的东西，规规矩矩输出：Hello, I'm Bill Gates of Microsoft

var SteveJobs = new Person("Steve Jobs");
SteveJobs.company = "Apple";    // 设置自己的company属性，掩盖了原型的company属性
SteveJobs.SayHello = function() // 实现了自己的SayHello方法，掩盖了原型的SayHello方法
{
    alert("Hi, " + this.name + " like " + this.company + ", ha ha ha ");
};

SteveJobs.SayHello();   // 都是自己覆盖的属性和方法，输出：Hi, Steve Jobs like Apple, ha ha ha

BillGates.SayHello();   // SteveJobs的覆盖没有影响原型对象，BillGates还是按老样子输出

对象可以 掩盖 原型对象的那些属性和方法，一个构造函数原型对象也可以 掩盖 上层构造函数原型对象既有的属性和方法。
这种 掩盖 其实只是在对象自己身上创建了新的属性和方法，只不过这些属性和方法与原型对象的那些 同名而已 。!!!!!!!!!(没有重载)
JavaScript就是用这简单的掩盖机制实现了对象的“多态”性，与静态对象语言的 虚函数和重载(override) 概念不谋而合。！！！！！！！
(多态，可以为 同一个属性和方法  编写不同的定义)

js 没有重载
ECMAScript 函数不能像传统意义上那样实现重载。而在其他语言（如Java）中，可以为一个函数
编写两个定义，只要这两个定义的签名（接受的参数的类型和数量）不同即可。如前所述，ECMAScirpt
函数没有签名，因为其参数是由包含零或多个值的 数组 来表示的。而没有函数签名，真正的重载是不可
能做到的。

如果在ECMAScript 中定义了两个名字相同的函数，则该名字只属于后定义的函数。请看下面的例子：
function addSomeNumber(num){
return num + 100;
}
function addSomeNumber(num) {
return num + 200;
}
var result = addSomeNumber(100); //300

在此，函数addSomeNumber()被定义了两次。第一个版本给参数加100，而第二个版本给参数加
200。由于后定义的函数覆盖了先定义的函数，因此当在最后一行代码中调用这个函数时，返回的结果
就是300。
如前所述，通过检查传入函数中参数的类型和数量并作出不同的反应，可以模仿方法的重载。

原型链的亮点：动态扩展基类的功能特性-----------------------------------------------
然而，比静态对象语言更神奇的是，我们可以随时给原型对象动态添加新的属性和方法，从而动态地扩展基类的功能特性.(由于松散连接，原型链的存在)
这在静态对象语言中是很难想象的。!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function Person(name)
{
    this.name = name;
};

Person.prototype.SayHello = function()  //建立对象前定义的方法
{
    alert("Hello, I'm " + this.name);
};

var BillGates = new Person("Bill Gates");   //建立对象

BillGates.SayHello();

Person.prototype.Retire = function()    //建立对象后再动态扩展原型的方法
{
    alert("Poor " + this.name + ", bye bye!");
};

BillGates.Retire(); // 动态扩展的方法即可被先前建立的对象立即调用

阿弥佗佛，原型继承竟然可以玩出有这样的法术！

--------------------------------------------------------------------------------
原型扩展

想必君的悟性极高，可能你会这样想：如果在JavaScript内置的那些如Object和Function等函数的prototype上添加些新的方法和属性，
是不是就能扩展JavaScript的功能呢？

在 AJAX 技术迅猛发展的今天，许多成功的 AJAX 项目的 JavaScript运行库 都大量扩展了 内置函数的prototype功能。
比如微软的 ASP.NET AJAX，就给这些 内置函数及其 prototype 添加了大量的新特性，从而增强了JavaScript的功能。

我们来看一段摘自 MicrosoftAjax.debug.js 中的代码：

String.prototype.trim = function String$trim() {
    if (arguments.length !== 0) throw Error.parameterCount();
    return this.replace(/^\s+|\s+$/g, '');// 选择头部和尾部所有的空白
}

这段代码就是给内置String函数的prototype扩展了一个trim方法，于是所有的String类对象都有了trim方法了
有了这个扩展，今后要去除字符串两段的空白，就不用再分别处理了，因为任何字符串都有了这个扩展功能，只要调用即可，真的很方便。
(代码高度复用)

当然，几乎很少有人去给Object的prototype添加方法，因为那会影响到所有的对象，除非在你的架构中这种方法的确是所有对象都需要的。

// 闭包
前两年，微软在设计AJAX类库的初期，用了一种被称为“闭包”(closure)的技术来模拟“类”。其大致模型如下：

function Person(firstName, lastName, age)
{
    //私有变量：
    var _firstName = firstName;
    var _lastName = lastName;

    //公共变量:
    this.age = age;

    //方法：
    this.getName = function()
    {
       return(firstName + " " + lastName);
    };
    this.SayHello = function()
    {
       alert("Hello, I'm " + firstName + " " + lastName);
    };
    // 由于闭包，方法能访问到私有变量(函数定义时的上下文)！！！！！！！！！！！！！！！
};

var BillGates = new Person("Bill", "Gates", 53);
var SteveJobs = new Person("Steve", "Jobs", 53);

BillGates.SayHello();
SteveJobs.SayHello();
alert(BillGates.getName() + " " + BillGates.age);
alert(BillGates.firstName);     //这里不能访问到私有变量

很显然，这种模型的类描述特别象C#语言的描述形式，
在一个构造函数里依次定义了 私有成员、公共属性和可用的方法，显得非常优雅嘛。！！！！！！！！！！！
特别是“闭包”机制可以模拟对私有成员的保护机制，做得非常漂亮。！！！！！！！！！！

所谓的“闭包”，就是 在构造函数体内定义另外的函数 作为 目标对象(实例) 的方法函数，
而这个对象的方法函数反过来 引用外层外层函数体中的临时变量(原本使用完就会销毁)。

这使得只要目标对象在生存期内始终能保持其方法，就能 间接保持原构造函数体当时用到的临时变量值。！！！！！！！

尽管最开始的构造函数调用已经结束，临时变量的名称 也都消失了，但在 目标对象的方法内(函数) 却始终能引用到该变量的值，而且该值只能通这种方法来访问。！！！！！！

即使再次调用相同的构造函数，但只会生成新对象和方法(一个个副本)，新的临时变量只是对应新的值，和上次那次调用的是各自独立的。的确很巧妙！

闭包存在的问题-------------------------------------------------------------------
但是前面我们说过，给每一个对象设置一份方法是一种很大的浪费。!!!!!!!!!!!!!!!!!!!!!!!
还有，“闭包”这种间接保持变量值的机制，往往会给JavaSript的垃圾回收器制造难题。
特别是遇到对象间复杂的循环引用时，垃圾回收的判断逻辑非常复杂。
无独有偶，IE浏览器早期版本确实存在JavaSript 垃圾回收 方面的 内存泄漏 问题。
再加上“闭包”模型在性能测试方面的表现不佳，微软最终放弃了“闭包”模型，而改用“原型”模型。正所谓“有得必有失”嘛。


原型模型需要一个构造函数来定义对象的成员，而方法却依附在该构造函数的原型上。大致写法如下：

//定义构造函数
function Person(name)
{
   this.name = name;   //在构造函数中定义成员
};

//方法定义到构造函数的prototype上
Person.prototype.SayHello = function()
{
   alert("Hello, I'm " + this.name);
};

//子类构造函数-------------------------------------------------------------------
function Employee(name, salary)
{
   Person.call(this, name);    // 调用上层构造函数
   this.salary = salary;       // 扩展的成员
};

//子类构造函数首先需要用上层构造函数来建立prototype对象，实现继承的概念--------------
Employee.prototype = new Person()   //只需要其prototype的方法，此对象的成员没有任何意义！

//子类方法也定义到构造函数之上
Employee.prototype.ShowMeTheMoney = function()
{
   alert(this.name + " $" + this.salary);
};

var BillGates = new Person("Bill Gates");
BillGates.SayHello();

var SteveJobs = new Employee("Steve Jobs", 1234);
SteveJobs.SayHello();
SteveJobs.ShowMeTheMoney();

原型类模型虽然不能模拟真正的 私有变量 ，而且也要分两部分来定义类，显得不怎么“优雅”。------------
(Employee 没有 this.name = name 了，name 变的私有了)
不过，对象间的方法是共享的，不会遇到垃圾回收问题，而且性能优于“闭包”模型。正所谓“有失必有得”嘛。

在原型模型中，为了实现类继承，必须首先将子类构造函数的prototype设置为一个父类的对象实例。
创建这个父类对象实例的目的就是为了构成原型链，以起到共享上层原型方法作用。
但创建这个实例对象时，上层构造函数也会给它设置对象成员，这些对象成员对于继承来说是没有意义的。！！！！！！！！！
虽然，我们也没有给构造函数传递参数，但确实创建了若干没有用的成员(来自Person构造器的属性)，尽管其值是undefined，这也是一种浪费啊。
(可以用 Employee.prototype = Object.create(Person.prototype) 寄生模式来代替 Employee.prototype = new Person() 解决这个问题 )

--------------------------------------------------------------------------------
原型真谛

在理解这些语法甘露之前，我们需要重新再回顾一下 JavaScript构造对象 的过程。
我们已经知道，用 var anObject = new aFunction() 形式创建对象的过程实际上可以分为三步：
第一步是建立一个新对象；
第二步将该对象内置的原型对象 设置为(指向) 构造函数prototype 引用的 那个原型对象(原型链)；SupType.prototype
第三步就是将该对象作为 this 参数调用构造函数，完成成员设置等初始化工作。
对象建立之后，对象上的任何访问和操作都只与对象自身及其原型链上的那串对象有关，与构造函数再扯不上关系了
(构造函数只是提供一个蓝本，复制完就没它事情了，那些属性都是实例的属性)。
换句话说，构造函数只是在创建对象时起到 介绍(委托)原型对象 和 初始化对象 两个作用。！！！！！！！！！！！

那么，我们能否自己定义一个对象来当作原型，并在这个原型上描述类，然后将这个原型设置给新创建的对象，将其当作对象的类呢？
我们又能否将这个原型中的一个方法当作构造函数，去初始化新建的对象呢？例如，我们定义这样一个原型对象：

var Person = {  //定义一个对象来作为原型类
    Create: function(name, age) { //这个当构造函数
        this.name = name;
        this.age = age;
    },

    SayHello: function() {//定义方法
        alert("Hello, I'm " + this.name);
    },
    HowOld: function() {  //定义方法
        alert(this.name + " is " + this.age + " years old.");
    }
};

这个 JSON形式 的写法多么象一个C#的类啊！既有 构造函数，又有 各种方法。
如果可以用某种形式来创建对象，并将对象的内置的原型设置为 上面这个“类”对象，不就相当于创建该类的对象了吗？
但遗憾的是，我们几乎不能访问到对象内置的原型属性！尽管有些浏览器可以访问到对象的内置原型，
但这样做的话就只能限定了用户必须使用那种浏览器。这也几乎不可行。

那么，我们可不可以通过一个函数对象来做媒介，利用该函数对象的 prototype 属性来 中转 这个原型，
并用 new操作符 传递给新建的对象呢？

其实，象这样的代码就可以实现这一目标：

function anyfunc(){};           //定义一个函数躯壳
anyfunc.prototype = Person;     //将原型对象放到中转站prototype
var BillGates = new anyfunc();  //新建对象的内置原型将是我们期望的原型对象

不过，这个anyfunc函数只是一个躯壳，在使用过这个躯壳之后它就成了多余的东西了，
而且这和直接使用构造函数来创建对象也没啥不同，有点不爽。

可是，如果我们将这些代码写成一个 通用函数，而那个 函数躯壳 也就成了 函数内的函数，
这个内部函数不就可以在 外层函数 退出作用域后自动消亡吗？
而且，我们可以将原型对象作为通用函数的参数，让通用函数返回创建的对象。我们需要的就是下面这个形式：

function New(aClass, aParams) {  //通用创建函数
    function new_() {            //定义临时的中转函数壳
       aClass.Create.apply(this, aParams);   //调用原型中定义的的构造函数，中转构造逻辑及构造参数
       // 调用 Person 原型中定义的构造函数，中转构造逻辑 及 构造参数
    };

    new_.prototype = aClass;     //准备中转原型对象
    return new new_();           //返回建立最终建立的对象
};

var Person = {      //定义的类
    Create: function(name, age) {
        this.name = name;
        this.age = age;
    },

    SayHello: function() {
        alert("Hello, I'm " + this.name);
    },

    HowOld: function() {
        alert(this.name + " is " + this.age + " years old.");
    }
};

var BillGates = New(Person, ["Bill Gates", 53]);  //调用通用函数创建对象，并以数组形式传递构造参数
BillGates.SayHello();
BillGates.HowOld();

alert(BillGates.constructor == Object);     // 输出：true

这里的通用函数New()就是一个“语法甘露”！这个语法甘露不但中转了原型对象，还中转了构造函数逻辑及构造参数。

有趣的是，每次创建完对象退出 New函数作用域 时，临时的new_函数对象 会被自动释放。
由于new_的prototype属性被设置为新的原型对象，其原来的原型对象和new_构造器之间就已解开了 引用链，!!!!!!!!!!!!!!!!(相当于重写了 new_prototype; 将一个对象赋给它)
临时函数及其 原来的原型对象 都会被正确回收了。上面代码的最后一句证明，新创建的对象的constructor属性返回的是Object函数。
其实新建的对象自己及其(新)原型(aClass)里没有constructor属性，那返回的只是最顶层原型对象的构造函数，即Object。！！！！！！！！！！！！！！！(原型链)
(原来 new_.prototype.constructor 应该是 new_() )
(但由于 new_.prototype = aClass; 相当于重写了 prototype ，因此 constructor 也继承了 aClass(在这里是Person)的 constructor)

function Foo(){};
var foo1 = new Foo();

Foo.prototype.constructor === Foo // true; 函数一创建，就会有 prototype 属性(原型)，且原型 constructor 指回构造函数
foo1.constructor === Foo // true; constructor 继承原型的;(自己没有这个属性，要是自己有就会覆盖原型的；就是一属性而已)

var bar = {};
Foo.prototype = bar; // 重写原型;

Foo.prototype.constructor === Foo // false
foo1.constructor === Foo // true； foo1 是在重写原型之前创建的，跟着原来的原型走

var foo2 = new Foo();
foo2.constructor === Foo // false

Foo.prototype.constructor === Object; // true
foo2.constructor === Object; // true (原型链查找)

// 补充
道格拉斯·克罗克福德 原型式继承
这种方法没有使用严格意义上的构造函数
借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

function object(o) {
    function F(){};
    F.prototype = o;
    return new F();
}

var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push ('Barbie');

alert(person.friends); //'Shelby', 'Court', 'Van', 'Rob', 'Barbie'
问题 prototype 引用类型所有实例共享(会修改)


// 将 道格拉斯与《悟透js》结合----------------------------------------------------
function object(o, args) { // 传入 args 数组
    function F(){
        o.Create.apply(this, args);
    };
    F.prototype = o;
    return new F();
}

// 传入参数
// function object(o, ...args) { // rest，将参数转化成数组形式传到args变量中;
//     function F(){
//         o.Create.apply(this, args);
//     };
//     F.prototype = o;
//     return new F();
// }
// var person1 = object(person, 'Gecan', 24);

var person = {
    Create: function(name, age) {
        this.name = name;
        this.age = age;
    },

    sayName: function() {
        console.log(`Hi, ${this.name}`);
    },

    sayAge: function() {
        console.log(`${this.age}`);
    }
};

var person1 = object(person, ['Gecan', 24]);
person1.sayName(); // Hi, Gecan
person1.sayAge(); // 24
alert(person1.constructor === Object); // true

var person2 = object(person, ['KaiKai', 23]);
person2.sayName(); // Hi, KaiKai
person2.sayAge(); // 23
--------------------------------------------------------------------------------
ES5 通过新增 Object.create() 方法规范化了原型式继承

var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = Object.create(person); // ---------------------------------
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var anotherPerson = Object.create(person); // ---------------------------------
anotherPerson.name = 'Linda';
anotherPerson.friends.push('Barbie');

alert(person.friends); //'Shelby', 'Court', 'Van', 'Rob', 'Barbie' (问题)
--------------------------------------------------------------------------------

接着《悟透 JavaScript》
当然，这个代码仅仅展示了“语法甘露”的概念。我们还需要多一些的语法甘露，
才能实现用简洁而优雅的代码书写类层次及其继承关系。好了，我们再来看一个更丰富的示例吧：

//语法甘露：
var object = {              //定义小写的 object 基本类，用于实现最基础的方法等
    isA: function(aType) {  //一个判断类与类之间以及对象与类之间关系的基础方法
        var self = this;
        while(self) {
            if (self == aType) return true;
            self = self.Type;
        };
        return false;
    }
};

function Class(aBaseClass, aClassDefine) {    //创建类的函数，用于声明类及继承关系
    function class_() {                       //创建类的临时函数壳
        this.Type = aBaseClass;               //我们给每一个类约定一个Type属性，引用其继承的类
        for(var member in aClassDefine)
        this[member] = aClassDefine[member];  //复制类的全部定义到当前创建的类
    };
    class_.prototype = aBaseClass;
    return new class_();
};

function New(aClass, aParams) {               //创建对象的函数，用于任意类的对象创建
    function new_() {                         //创建对象的临时函数壳
        this.Type = aClass;                   //我们也给每一个对象约定一个Type属性，据此可以访问到对象所属的类
        if (aClass.Create)
        aClass.Create.apply(this, aParams);   //我们约定所有类的构造函数都叫Create，这和DELPHI比较相似
    };
    new_.prototype = aClass;
    return new new_();
};

//语法甘露的应用效果：
var Person = Class( object, {
                    Create: function(name, age) {//派生至object基本类
                                this.name = name;
                                this.age = age;
                              },
                    SayHello: function() {
                                  alert("Hello, I'm " + this.name + ", " + this.age + " years old.");
                              }
                    });

var Employee = Class(Person, {   //派生至Person类，是不是和一般对象语言很相似？
                    Create: function(name, age, salary) {
                                Person.Create.call(this, name, age);  //调用基类的构造函数
                                this.salary = salary;
                            },
                    ShowMeTheMoney: function() {
                                        alert(this.name + " $" + this.salary);
                            }
                    });

var BillGates = New(Person, ["Bill Gates", 53]);
var SteveJobs = New(Employee, ["Steve Jobs", 53, 1234]);
BillGates.SayHello();
SteveJobs.SayHello();
SteveJobs.ShowMeTheMoney();

var LittleBill = New(BillGates.Type, ["Little Bill", 6]);   //根据BillGate的类型创建LittleBill
LittleBill.SayHello();

alert(BillGates.isA(Person));       //true
alert(BillGates.isA(Employee));     //false
alert(SteveJobs.isA(Person));       //true
alert(Person.isA(Employee));        //false
alert(Employee.isA(Person));        //true

“语法甘露”不用太多，只要那么一点点，就能改观整个代码的易读性和流畅性，从而让代码显得更优雅。
有了这些语法甘露，JavaScript就很像一般对象语言了，写起代码了感觉也就爽多了！
令人高兴的是，受这些甘露滋养的JavaScript程序效率会更高。因为其原型对象里既没有了毫无用处的那些 对象级 的成员，
而且还不存在constructor属性体，少了与构造函数间的牵连，但依旧保持了方法的共享性。
这让JavaScript在追溯原型链和搜索属性及方法时，少费许多工夫啊。
我们就把这种形式称为“甘露模型”吧！其实，这种“甘露模型”的原型用法才是符合prototype概念的本意，才是的JavaScript原型的真谛！
想必微软那些设计AJAX架构的工程师看到这个甘露模型时，肯定后悔没有早点把AJAX部门从美国搬到咱中国的观音庙来，
错过了观音菩萨的点化。当然，我们也只能是在代码的示例中，把Bill Gates当作对象玩玩，
真要让他放弃上帝转而皈依我佛肯定是不容易的，机缘未到啊！如果哪天你在微软新出的AJAX类库中看到这种甘露模型，那才是真正的缘分！

编程的快乐
在软件工业迅猛发展的今天，各式各样的编程语言层出不穷，新语言的诞生，旧语言的演化，似乎已经让我们眼花缭乱。
为了适应面向对象编程的潮流，JavaScript语言也在向完全面向对象的方向发展，
新的JavaScript标准已经从语义上扩展了许多面向对象的新元素。与此相反的是，
许多静态的对象语言也在向JavaScript的那种简洁而幽雅的方向发展。
例如，新版本的C#语言就吸收了JSON那样的简洁表示法，以及一些其他形式的JavaScript特性。

我们应该看到，随着RIA(强互联应用)的发展和普及，AJAX技术也将逐渐淡出江湖，
JavaScript也将最终消失或演化成其他形式的语言。但不管编程语言如何发展和演化，
编程世界永远都会在“数据”与“代码”这千丝万缕的纠缠中保持着无限的生机。
只要我们能看透这一点，我们就能很容易地学习和理解软件世界的各种新事物。
不管是已熟悉的过程式编程，还是正在发展的函数式编程，
以及未来 量子纠缠态 的大规模 并行式编程，我们都有足够的法力来化解一切复杂的难题。
