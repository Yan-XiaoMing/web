/**
 * call()方法指定this值和若干个指定的参数值的前提下调用某个函数和方法
 */

//call实现第一版
Function.prototype.call1 = function(context){
    context.fn = this
    var args = []
    for(let i = 1,len = arguments.length;i<len;i++){
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call1(foo, 'kevin', 18); 
// kevin
// 18
// 1

/*
    call第二版 

    this 参数可以传 null，当为 null 的时候，视为指向 window
    函数是可以有返回值的！
*/

Function.prototype.call2 = function(context){
    var context = context || window
    context.fn = this

    var args = []
    for(let i = 1,len  = arguments.length;i<len;i++){
        args.push('arguments[' + i + ']')
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}


var value = 2;
var obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar.call2(null); // 2
console.log(bar.call2(obj, 'kevin', 18));

Function.prototype.myApply = (context,arr){
    var context = Object(context) || window
    context.fn = this
    var result
    if(!arr){
        result = context.fn()
    }
    else{
        var args = []
        for(let i = 0,len = arr.length;i<len;i++){
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result
}