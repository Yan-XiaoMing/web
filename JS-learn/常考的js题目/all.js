/**
 * 1.
 * 
 * delete 不会删掉原型链上的属性
 */
function Person(name){
    this.name = name
}
Person.prototype.name = 'default'
var li = new Person('li')
console.log(li.name)
li.name = undefined
console.log(li.name)
delete li.name
console.log(li.name) //default

/**
 * 2.
 */
console.log((function(){}) instanceof Object, typeof null)

/**
 * 3.
 */
function foo(a, b) {
    arguments[1] = 2
    console.log(arguments)
    alert(b) 
}
foo(1)

/**
 * 4.
 * 
 * false,true,false,false
 * 
 * this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。
 */
const bar = {}
function foo(){
    console.log(this === bar)
}
const bingo = foo.bind({})
foo()
foo.apply(bar)
bingo()
bingo.apply(bar)

/**
 * 5.
 * promise
 */
let s = ""
var delay_print_first = function(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            s += 'First'
            return resolve(s)
        },1000)
    })
}
var delay_print_second = function(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            s += 'Second'
            return resolve(s)
        },1000)
    })
}
var delay_print_third = function(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            s += 'Third'
            return resolve(s)
        },1000)
    })
}
var async_status = async function(ms){
    try{
        var first = await  delay_print_first(s)
        var second = await  delay_print_second(s)
        var third = await  delay_print_third(s)
        console.log(first)
        console.log(second)
        console.log(third)
        console.log(s)
        return s
    }catch(err){
        console.error(err)
        return Promise.reject(err)
    }
}

async_status().then((res)=>{
    console.log(res)
}).catch((err) => {
    console.log(err)
})