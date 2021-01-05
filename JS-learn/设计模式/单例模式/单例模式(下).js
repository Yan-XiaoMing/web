//静态方法版
class Storage{
    static getInstance(){
        //判断是否已经new过1个实例
        if(!Storage.instance){
            Storage.instance = new Storage()
        }
        return Storage.instance
    }
    getItem(key){
        return localStorage.getItem(key)
    }
    setItem(key,value){
        return localStorage.setItem(key,value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name','李雷')
//李雷
storage1.getItem('name')
//李雷
storage2.getItem('name')

storage1 === storage2 //true

//闭包版
//先实现一个基础的StorageBase类,把getItem和setItem方法放在原型链上
function StorageBase(){}

StorageBase.prototype.getItem = function(key){
    return localStorage.getItem(key)
}

StorageBase.prototype.setItem = function(key,value){
    return localStorage.setItem(key,value)
}

//以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function(){
    let instance = null
    return function(){
        //判断自由变量是否null
        if(!instance){
            //如果为null则new出唯一的实例
            instance = new StorageBase()
        }
        return instance
    }
})()

//这里其实不用new Storage的形式调用,直接Storage()也会有一样的效果
const storage1 = new Storage()
const storage2 = new Storage()

storage1.setItem('name','李雷')
//李雷
storage1.getItem('name')
//李雷
storage2.getItem('name')

//返回true
storage1 === storage2