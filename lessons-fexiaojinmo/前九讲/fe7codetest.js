var log = function() {
    console.log.apply(console, arguments)
}

var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}

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

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// var lower = upper.toLowerCase() 转大写
//var code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'
var code = "HVOH KVWQV DOGGSG KWZZ PS RSOF"
// 双引号 比 单引号 好，这里
var lowercase1 = function(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        if (upper.includes(s[i])) {
            // 如果 s[i] 是大写字母，就给它转成小写
            var index = find(upper,s[i]);
            result += lower[index];
        } else {
            result += s[i];
            // 是小写或其他，那就直接 拼接上去 思路清晰
            // 由于 遍历是 从小到大 因此 每个操作都是 在正确位置
        }
    }
    return result;
}


var decode3 = function(s,shift) {
    var str = lowercase1(s);
    var result = '';
    for (var i = 0; i < str.length; i++) {
        if (lower.includes(str[i])) {
            var index = find(lower,str[i]);
            var next = (index + 26 - shift) % 26;
            result += lower[next];
            //result += decode2(str[i],shift)
        } else {
            result += str[i];
        }

    }
    return result;
}


/*var final = function() {
    var result = [];
    for (var i = 0; i < 26; i++) {
        var char = decode3(code,i);
        result.push(char);
    }
    return result;
}
final*/

// 写一个 得分 排序
var rank = function(wordList) {
    var score = 0;
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i];
        if(words.includes(word)) {
            // 句子中有多少单词 在 标准词库里
            score++;
        }
    }
    var r = score / wordList.length * 100
    r = Math.floor(r)
    log(`比率是 ${r}%`)
    return r
}

var decode4 = function(s) {
    for (var i = 1; i < lower.length; i++) {
        var result = decode3(s,i);
        log(result);
        var wordList = result.split(' ');
        // 把字符串转化成数组， 并且把空格删掉，使它成为一个单词列
        //log(`wordList ${wordList}`)
        //var score = rank(wordList);
        var r = rank(wordList);
        //log(`score ${score}`);
        /*if(score > 10) {
            log(result)
        }*/
    }
}
decode4(code)
