var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'
// 偏移而来
var find = function(s1,s2) {
    var len = s1.length;
    if (s1.includes(s2)) {
        for (var i = 0; i < len; i++) {
            var str = s1[i];
            if (str == s2) {
                return i;
            }
        }
    }
    return -1;
}

var decode = function(code,shift) {
    var result = '';
    for (var i = 0; i < code.length; i++) {
        if(upper.includes(code[i])) {
            // 找出 原有的序号 别遗漏了 
            var currentindex = find(upper,code[i]);
            var index = (currentindex + 26 - shift) % 26;
            result += upper[index];
        } else {
            result += code[i];
        }
    }
    return result;
}

var final = function() {
    var result = [];
    for (var i = 0; i < 25; i++) {
        var char = decode(code,i + 1);
        result.push(char);
    }
    return result;
}

final()
