function setColor(el, color) {
    el.style.color = color;
}

// function setColors(els, color) {
//     Array.from(els).maps(el => setColor(el, color));
// }

function __multi__(fn) {
    return function (arrayLike, ...args) {
        return Array.from(arrayLike).map(item => fn(item, ...args));
    }
} // 纯函数

let setColors = __multi__(setColor);

setColors(document.querySelectorAll('#datalist > li'), 'red');

// 非纯函数单元测试, 要构造出上下文环境(DOM) 
// 纯函数单元测试, 只要测试其功能是否正常即可

// 测试纯函数
function add(x, y) {
    return x + y;
}

add_new = __multi__(add);
console.log(add_new([1, 2], 3)); // [4, 5]
console.log(add_new([1, 2, 3], 3)); // [4, 5, 6]