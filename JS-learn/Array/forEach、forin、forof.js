/**
 * for...in
 * for ... in 为 循环可枚举对象设计的
 * 不推荐使用for ... in 循环数组
 * 因为数组的index跟普通对象属性不一样,是重要的数值序列指标
 * 并且是key为字符串
 */

var obj = {a:1,b:2,c:3}
for(let prop in obj){
    console.log('obj.'+prop+"="+obj[prop])
}

/**
 * forEach JavaScript 5
 * 写法简单了很多,但是不能使用return和break
 */
const myArray = [1,2,3]
myArray.forEach(function(value){
    console.log(value)
})


/**
 * for ... of JavaScript6
 * 弥补了forEach 和 for...in的短板
 * 并且可以循环很多东西
 */