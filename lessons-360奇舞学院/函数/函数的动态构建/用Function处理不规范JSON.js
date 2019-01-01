// 处理不规范的 json

var brokenJSON = `{
    a: 1,
    b: 2,
    c: 'message',
}`;

function parseData(data){
    return (new Function('return ' + data))();
    // new Function 动态地构造一个函数
}

try{
    console.log(JSON.parse(brokenJSON));
}catch(ex){
    console.log(ex.message);
    console.log(parseData(brokenJSON));
}

// 例子
let add = new Function('x', 'y', 'return x+y'); // 和用声明的方式写 add 函数一样
add(1, 2); // 3

// 正常情况很少这么用，动态生成，优化，性能有问题；且有安全问题，别人可以通过注入的方式攻击你的系统

// 比直接用 eval 方式会好；