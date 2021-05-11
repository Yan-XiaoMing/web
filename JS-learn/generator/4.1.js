var x = 1
function foo(){
    x++;
    bar()
    console.log("x:",x)
}

function bar(){
    x++
}

foo()

function *foo(){
    x++;
    yield;
    console.log('x:',x)
}

function bar(){
    x++
}

var it = foo()
it.next()

//迭代消息传递
function *foo(x){
    var y = x * (yield)
    return y
}

var it = foo(6)
it.next()

var res =  it.next(7)
console.log(res)

