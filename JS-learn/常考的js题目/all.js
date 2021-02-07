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
