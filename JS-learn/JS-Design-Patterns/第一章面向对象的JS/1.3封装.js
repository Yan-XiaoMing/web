/*
    在许多语言的对象系统中，封装数据是由语法解析来实现的，这些语言也许提供了private、
    public、protected 等关键字来提供不同的访问权限。
    但JavaScript 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，
    而且只能模拟出public 和private 这两种封装性。
*/

var myObject = (function(){
  var __name = 'sven';
  return {
    getName:function(){
      return __name
    }
  }
})();

console.log(myObject.getName())
console.log(myObject.__name)