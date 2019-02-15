// 直接用一个数组来初始化另一个数组

var nums =[];
for( var i = 0; i < 100; i++){
    nums[i] = i + 1;
}

var samenums = nums;
nums[0] = 400;

console.log(samenums[0]); // 400

// 问题：两者指向同一个引用，操作相互影响

// 深复制，将原数组的每一个元素都复制到新数组中
function copy(arr1, arr2){
    for( var i = 0; i < arr1.length; i++){
        arr2[i] = arr1[i];
    }
} // 执行操作的不返回值的，定义函数名的时候，用动作;

var nums = [];
for( var i = 0; i < 100; i++){
    nums[i] = i+1;
}

var samenums = [];
copy(nums, samenums);

nums[0] = 400;
console.log(samenums[0]); // 1

// 上述代码 google实现没有问题，Firefox实现有问题；
