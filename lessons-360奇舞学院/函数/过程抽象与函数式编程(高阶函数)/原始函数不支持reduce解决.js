// 等价函数的应用 假设: 原始的函数不支持 reduce
function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

console.log(add(1, add(2, 3)), // 6
    mul(1, mul(2, mul(3, 4))), // 24
    concat([1, 2], concat([3, 4], [5, 6]))); // [1, 2, 3, 4, 5, 6]
// 不支持reduce, 只能一步一步累积

// 方案1: 改写三个方法
function add(...args) {
    return args.reduce((x, y) => x + y);
}

function mul(...args) {
    return args.reduce((x, y) => x * y);
}

function concat(...args) {
    return args.reduce((arr1, arr2) => arr1.concat(arr2));
}

console.log(add(1, 2, 3), // 6
    mul(1, 2, 3, 4), // 4
    concat([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
// 需要修改原始方法

// 方案2: 包装为reduce
function reduce(fn, ...args) {
    return args.reduce(fn);
} // 高阶函数

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

console.log(reduce(add, 1, 2, 3), // 6
    reduce(mul, 1, 2, 3, 4), // 4
    reduce(concat, [1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
// 不需要改原始方法, 但是要改程序里所有调用到它的方法, 加reduce...

// 方案3: bind 一下 (不用修改调用它的方法)
function reduce(fn, ...args) {
    return args.reduce(fn);
} // 高阶函数

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

add = reduce.bind(null, add); // 先传入第一个参数(原函数), 后面执行函数的时候, 再传入其他参数(原来的形参)
mul = reduce.bind(null, mul);
concat = reduce.bind(null, concat);

console.log(add(1, 2, 3), // 6
    mul(1, 2, 3, 4), // 4
    concat([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
// bind 延迟调用, 逐步传参

// 方案4: 函数变换(过程抽象) 不用bind
function __reduce__(fn) {
    return function(...args) {
        return args.reduce(fn.bind(this)); // 重点
    }
}

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

add = __reduce__(add);
mul = __reduce__(mul);
concat = __reduce__(concat);

console.log(add(1, 2, 3), // 6
    mul(1, 2, 3, 4), // 4
    concat([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]

// 方案5: 支持异步
function __reduce__(fn, async) {
   if(async) {
       return function(...args) {
           return args.reduce((a, b) => {
                return Promise.resolve(a).then((v) => fn.call(this, v, b));
           });
       }
   } else {
       return function(...args) {
            return args.reduce(fn.bind(this));
       }
   }
}

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function asyncAdd(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${x} + ${y} = ${x + y}`);
            resolve(x + y);
        }, 1000); // 1s 之后计算, 而非立即计算
    })
}

add = __reduce__(add);
mul = __reduce__(mul);
concat = __reduce__(concat);

console.log(add(1, 2, 3), // 6
    mul(1, 2, 3, 4), // 4
    concat([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]

asyncAdd = __reduce__(asyncAdd, true);
asyncAdd(1, 2, 3, 4, 5, 6).then((v) => console.log(v)); // 清晰展示累加的过程