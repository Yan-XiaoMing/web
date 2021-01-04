/**
 * bind()
 * bind方法会创建一个新函数,当这个新函数被调用的时候,
 * bind()的第一个参数将作为它运行时的this,
 * 之后的一序列参数会在传递的实参前传入作为它的参数
 */

//测试样例
var foo = {
    value:1
}



/*
    bind
    1. 返回一个函数
    2. 可以传入参数
*/

//bind 第一版
Function.prototype.bind1 = function(context) {
    var self = this
    return function(){
        return self.apply(context)
    }
}

function bar(){
    return this.value
}
var bindFoo = bar.bind1(foo)
console.log(bindFoo())

//bind 第二版 可以传入参数
function bar(name,age){
    console.log(this.value)
    console.log(name)
    console.log(age)
}

Function.prototype.bind2 = function(context){
    var self = this
    //获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments,1)

    return function(){
        //这个时候的arguements是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context,args.concat(bindArgs))      
    }
}