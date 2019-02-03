function __delay__(time, fn) {
    return function() {
        var self = this,
            args = [].slice.call(arguments),
            callback;

        if(fn.length < args.length) {
            callback = args[args.length - 1];
            args.length--;
        }

        setTimeout(function() {
            var ret = fn.apply(this, args);
            callback && callback(ret);
        }, time);
    }
}

function add(x, y) {
    return x + y;
}

add = __delay__(500, add);

add(10, 20, r => console.log(r));

function output(msg) {
    console.log(msg);
}

output = __delay__(1500, output);

function __pipe__() {
    var fnList = [].slice.call(arguments);
    return fnList.reduceRight((a, b) => () => b(a));
}

var outputOneByOne = __pipe__(output.bind(null, 'message 1'),
                              output.bind(null, 'message 2'),
                              output.bind(null, 'message 3'),
                              output.bind(null, 'message 4'));

outputOneByOne();