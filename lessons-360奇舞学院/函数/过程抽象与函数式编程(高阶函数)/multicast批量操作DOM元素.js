function multicast(fn) {
    return function(list, ...args) {
        if(list && list.length !== null) {
            return Array.from(list).map(item => fn.apply(this, [item, ...args]));
        } else {
            return fn.apply(this, [list, ...args]);
        }
    }
}

function setColor(el, color) {
    return el.style.color = color;
}

setColor = multicast(setColor);

var list = document.querySelectorAll("li:nth-child(2n+1)");
serColor(list, "red");