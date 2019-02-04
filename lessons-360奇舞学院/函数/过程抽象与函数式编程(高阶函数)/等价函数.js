function __equal__(fn) {
    return function(...args) {
        return fn.apply(this, args);
    }
}

function add(x, y) {
    return x + y;
}

add = __equal__(add);

console.log(add(3, 4)); // 7

let obj = {
    x: 1,
    y: 2,
    add: function() {
        return this.x + this.y;
    }
}

let objAdd = __equal__(obj.add);

console.log(objAdd.call(obj)); // 3

// 等价函数的意义
function __equal__(fn) {
    // 插入内容, 做点事情
    return function(...args) {
        // 插入内容, 做点事情
        return fn.apply(this, args);
    }
}

// 等价函数的应用 拦截和监控
function __watch__(fn) {
    return function f(...args) {
        if(f.before) {
            f.before(this, ...args);
        }

        let ret = fn.apply(this, args);
        if(f.after) {
            f.after(this, ret, ...args);
        }

        return ret;
    }
}

$ = __watch__($);

$.after = function(thisObj, retVal) {
    if(retVal.css) {
        retVal.css = __watch__(retVal.css);
        retVal.css.before = function() {
            console.log('不推荐使用 .css, 建议使用.addClass');
        }
    }
}

let el = $('#datalist > li');

el.css('color', 'red');
// 不会对代码执行结果有影响(不修改原来的函数), 只是在控制台打印出提醒
// 等价函数, watch方法把jQuery的$拦截, $选择器返回包装好的DOM, 然后看DOM有没有css方法, 
// 如果有的话, 那么就在控制台里打出警告; 但不会影响jQuery的任何功能
// 这就是利用过程抽象, 高阶函数去拦截某个函数的执行过程, 而不会去直接直接修改函数

// 修改 性能优化 ? 改变了代码执行的时机 
function __watch__(fn) {
    return function f(...args) {
        let blocked = false;
        if(f.before) {
            blocked = f.before(this, ...args) === true; // 如果是返回true, 则会阻塞默认行为
        }

        if(!blocked) {
            let ret = fn.apply(this, args);
            if(f.after) {
                f.after(this, ret, ...args);
            }

            return ret;
        }
    }
}

$ = __watch__($);

$.after = function(thisObj, retVal) {
    if(retVal.css) {
        let _origin = retVal.css;
        retVal.css = __watch__(origin);
        retVal.css.before = function(target, ...args) {
            requestAnimationFrame(() => {
                // 用 requestAnimationFrame 优化性能
                _origin.apply(target, args);
            });

            // 返回 true, 阻止默认行为
            return true;
        }
    }
}

// 将所有的css由同步变为异步, 然后把它放入requestAnimationFrame调用, 
// 在浏览器渲染的过程中去修改这个css样式,去减少浏览器
// 不会影响实际效果, 但改变了css设置的时机

let el = $('#datalist > li');

el.css('color', 'red');

