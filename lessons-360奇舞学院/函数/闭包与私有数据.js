var MyClass = (function(){
    var privateData = 'privateData';

    function Class(){ // Class 用法？？？----------------------------------------
        this.publicData = 'publicData';
    }

    Class.prototype.getData = function(){
        return privateData;
    }
    // this.getData = function(){...} 会有问题；相当于每次都创建了一个 function，而且不相同

    return Class;
})();

var myObj = new MyClass();

console.log([myObj.publicData, myObj.privateData, myObj.getData()]);
// 运行结果  ["publicData", undefined, "privateData" ]

// privateData 在函数级作用域里，外边的环境(MyClass函数体里)访问不到它

// 上面这个是使用IIFE的模式，形成一个函数级作用域。

// 也可以都改成let、const放在{}里面，形成块级作用域。

let Class;
{
    let privateData = 'privateData';

    Class = function() {
        this.publicData = 'publicData';
    }

    Class.prototype.getData = function() {
        return privateData;
    }
};

var myObj = new Class();

console.log([myObj.publicData, myObj.privateData, myObj.getData()]);
// 运行结果  ["publicData", undefined, "privateData" ]

// 两种写法的目的, 都是为了把privateData保护起来, 只暴露能访问其的方法