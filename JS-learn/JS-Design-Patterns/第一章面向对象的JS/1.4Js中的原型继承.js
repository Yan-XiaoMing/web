//JS中的原型编程的基本规则
/**
 * 所有的数据都是对象。
 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
 对象会记住它的原型。
 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
 */

//1.所有的数据都是对象
/**
 * JavaScript 中的根对象是Object.prototype 对象。Object.prototype 对象是一个空的
    对象。我们在JavaScript 遇到的每个对象，实际上都是从Object.prototype 对象克隆而来的，
    Object.prototype 对象就是它们的原型。
 */
var obj1 = new Object();
var obj2 = {};

console.log(Object.getPrototypeOf(obj1) === Object.prototype);
console.log(Object.getPrototypeOf(obj2) === Object.prototype);

//2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它

function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name
}

var a = new Person('sven')

console.log(a.name)
console.log(a.getName())
console.log(Object.getPrototypeOf(a) === Person.prototype)

//JavaScript 中没有类的概念
/**
 * 在这里Person 并不是类，而是函数构造器，JavaScript 的函数既可以作为普通函数被调用，
也可以作为构造器被调用。当使用new 运算符来调用函数时，此时的函数就是一个构造器。 用
new 运算符来创建对象的过程，实际上也只是先克隆Object.prototype 对象，再进行一些其他额
外操作的过程。
 */


//3. 对象会记住它的原型
/**
 * JavaScript 的真正实现来说，其实并不能说对象有
原型，而只能说对象的构造器有原型。对于“对象把请求委托给它自己的原型”这句话，更好
的说法是对象把请求委托给它的构造器的原型。

JavaScript 给对象提供了一个名为__proto__的隐藏属性，某个对象的__proto__属性默认会指
向它的构造器的原型对象，即{Constructor}.prototype。
 */

//4. 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

//模拟继承

/**
  * 1. 尝试遍历对象b 中的所有属性，但没有找到name 这个属性。
    2. 查找name 属性的请求被委托给对象b 的构造器的原型，它被b.__proto__ 记录着并且指向
    B.prototype，而B.prototype 被设置为一个通过new A()创建出来的对象。
    3. 在该对象中依然没有找到name 属性，于是请求被继续委托给这个对象构造器的原型
    A.prototype。
    4. 在A.prototype 中找到了name 属性，并返回它的值。
  */

var A = function () {};
A.prototype = {
    name: 'sven'
}

var B = function () {}
B.prototype = new A()

var b = new B();
console.log(b.name) // sven

//原型链并不是无限长的
//构造器原型Object.prototype