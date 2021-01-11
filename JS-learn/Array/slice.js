function testSlice() {
  console.log(arguments);
  let array = Array.prototype.slice.call(arguments, 1);
  console.log(array);
}

testSlice("a", "b", "c");

var arr1 = [1, 2, 3];
var arr2 = [2, 3, 4];

console.log(arr1.concat(arr2));

/**
 * slice()
 * 该方法不会改变原数组
 * 从数组中返回指定元素
 * 
 * start(require):规定从何处开始选取,如果为负数则从数组尾部开始计算
 * end(optional):规定从何处结束,若没有指定则到最后
 */
