/**
 * JavaScript 的this 总是指向一个对象，而具体指向哪个对象是在
    运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。
 */
/**
 * this 的指向大致可以分为以下4 种。
    作为对象的方法调用。
    作为普通函数调用。
    构造器调用。
    Function.prototype.call 或Function.prototype.apply 调用。
 */

//1.作为对象方法调用
var obj = {
    a: 1,
    getA: function () {
        alert(this === obj)
        alert(this.a)
    }
}
obj.getA()

//2. 作为普通函数调用

window.name = 'globalName';

var getName = function(){
  return this.name
}
console.log(getName())

//或者

window.name = 'globalName'

var myObject = {
  name:'sven',
  getName: function(){
    return this.name
  }
}

var getName = myObject.getName;
console.log(getName())

//3. 构造器调用
var MyClass = function(){
  this.name = 'sven'
}

var obj = new MyClass();
alert(obj.name)

