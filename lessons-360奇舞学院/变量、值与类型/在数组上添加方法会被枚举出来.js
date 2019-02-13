// 直接修改 Array.prototype 的代价
Array.prototype.remove = function(item) {
  var idx = this.indexOf(item);
  if(idx >= 0) {
    return this.splice(idx, 1)[0];
  }

  return null;
}

var arr = [1, 2, 3];
arr.remove(2);
console.log(arr); // [1, 3]

for (var i in arr) {
  if (!Number.isNaN(i - 0)) { // 减0 string 转化成 number
    console.log(i + ':' + arr[i]);
  } else {
    console.log(i + '是什么鬼');
  }
}

// '0:1'
// '1:3'
// 'remove是什么鬼'

arr.forEach(item => console.log(item)); // 1 3 forEach 不会把 remove 方法遍历出来

// 使用ES5的新特性 解决这个问题
Object.defineProperty(Array.prototype, 'remove', {
  value: function(item) {
    var idx = this.indexOf(item);
    if(idx >= 0) {
      return this.splice(idx, 1)[0];
    }

    return null;
  },

  // enumerable: true // 默认是false不可枚举
});

var arr = [1, 2, 3];
arr.remove(2);
console.log(arr);

for (var i in arr) {
  if (!Number.isNaN(i - 0)) { // 减0 string 转化成 number
    console.log(i + ':' + arr[i]);
  } else {
    console.log(i + '是什么鬼');
  }
}

// '0:1'
// '1:3' 