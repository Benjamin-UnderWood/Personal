function __reduce__(...fnList) {
    return function(...args) {
        if(fnList.length <= 0) return;
        fnList[0] = fnList[0].apply(this, args);

        return fnList.reduce((a, b) => b.call(this, a));
    }
}

function __pipe__(...fnList) {
    return function(...args) {
        var fn = fnList.reduceRight((a, b) =>
                                    (...args) => b.apply(this, [...args, a]));
        
        return fn.apply(this, args);
    }
}

function add(x, y) {
    return x + y;
}

function double(x) {
    return 2 * x;
}

var foo = __reduce__(add, double, double, double);

console.log(foo(1, 2)); // 24

function taskA(x, next) {
    console.log(`task a: ${x}`);
    next(); 
}

function taskB(next) {
    console.log('task b');
    next();
}

function taskC() {
    console.log('task c');
}

var foo2 = __pipe__(taskA, taskB, taskC);

foo2(10);
// "task a: 10"
// "task b"
// "task c"

// pipe 支持异步, reduce 是同步的
// pipe 与 express 里的 connect 类似
function taskA(x, next) {
    console.log(`task a: ${x}`);
    // next(); 
    setTimeout(next, 2000); 
}

let app = {
    use: __pipe__ // __pipe__ 为 express 的核心代码
}

app.use(function(req, res, next) {
    
});
