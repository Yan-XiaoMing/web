/**
 * 从设计模式的角度讲，原型模式是用于创建对象的一种模式
 * 找到一个对象，然后通过克隆来创建一个一模一样的对象
 *
 * 如果需要一个跟某个对象一模一样的对象，就可以使用原型模式。
 */

var Plane = function () {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
};

var plane = new Plane()
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create(plane)
console.log(clonePlane);

//不支持Object.create 方法的浏览器中，则可以使用以下代码：
Object.create = Object.create || function(obj){
    var F = function(){};
    F.prototype = obj;
    return new F()
}