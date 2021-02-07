/**
 * new
 * 
 * 1.新生成了一个对象
 * 2.链接到原型
 * 3.绑定this
 * 4.返回新对象
 */

function create(){
    let obj = new Object()
    let con = [].shift.call(arguments)
    //链接原型链 
    /*
        构造函数 new -> 实例对象 
        实例对象.__proto__ === 构造函数.prototype === 原型对象
    */
    obj.__proto__ = con.prototype
    let result = con.apply(obj,arguments)
    return typeof result === 'object' ? result : obj
}