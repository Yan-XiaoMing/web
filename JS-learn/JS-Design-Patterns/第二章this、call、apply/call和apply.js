/*Function.prototype.call 和Function.prototype.apply作用一模
一样，区别仅在于传入参数形式的不同。*/

/**
 * apply 接受两个参数，第一个参数指定了函数体内this 对象的指向，第二个参数为一个带下
标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传
递给被调用的函数
 */

var func = function(a,b,c){
    alert([a,b,c]);
}

func.apply(null,[ 1, 2, 3 ]);


/**
 * call 传入的参数数量不固定，跟apply 相同的是，第一个参数也是代表函数体内的this 指向，
从第二个参数开始往后，每个参数被依次传入函数：
 */
var func = function(a,b,c){
    alert([ a, b, c ]);
};

func.call(null,1,2,3)

//严格模式下 null 会指向null 否则会 指向默认的宿主对象 在浏览器中 是 window

//call 和 apply 的用途

//1. 改变this 指向

var obj1 = {
    name:'sven'
}
var obj2 = {
    name:'anne'
}

window.name = 'window'

var getName = function(){
    alert(this.name)
}

getName()//window

getName.call(obj1)//sven

getName.call(obj2)//anne

