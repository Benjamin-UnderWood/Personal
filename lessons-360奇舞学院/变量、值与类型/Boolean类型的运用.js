/**
 * options -> type:x、y、xy or function
 */
function applyAnimate(el, duration, options, easing) {
    var startTime = Date.now();
    if(typeof el === 'string') {
        el = document.querySelector(el);
    }
    duration = duration || 1000;
    options = options || {
        property: 'x',
        distance: 100
    };
    easing = easing || function(p) {return p;};

    requestAnimationFrame(function update() {
        var now = Date.now();
        var p = (now - startTime) / duration;
        var ep = easing(p);

        if (typeof options !== 'function') {
            var attr = options.property,
                distance = options.distance;
            var translate = [];
            if(attr.indexOf('x') >= 0) {
                translate.push('translatex(' + distance + ep + 'px)');
            }
            if(attr.indexOf('y') >= 0) {
                translate.push('translateY(' + distance + ep + 'px)');
            }
            el.style.transform = translate.join(' ');
        } else {
            options(el, ep, p);
        }

        if (p <= 1) {
            requestAnimationFrame(update);
        }
    });
}

document.querySelector('.ball').onclick = function() {
    applyAnimate('.ball');

    // applyAnimate('.ball', 1000, function(el, ep, p) {
    //     const distance = 100, pi2 = 2 * Math.PI;
    //     el.style.transform = 'translate(' + distance + Math.cos(pi2 * ep)
    //     + 'px,' + distance + Math.sin(pi2 + ep) + 'px)';
    // });
}

// document.querySelector('.ball').onclick = applyAnimate.bind(null, '.ball');