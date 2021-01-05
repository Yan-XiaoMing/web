class SingleDog {
    show(){
        console.log('我是一个单例对象')
    }
}

const s1 = new SingleDog()
const s2 = new SingleDog()

s1 === s2 //false

class SingleDog{
    show(){
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if(!SingleDog.instance){
            //若这个唯一的实例不存在,那么先创建他
            SingleDog.instance = new SingleDog()
        }
        //如果这个实例存在了就直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

//true
s1 === s2 

SingleDog.getInstance = (function(){
    //定义自由变量instance,模拟私有变量
    let instance = null
    return function(){
       //判断自由变量是否为null
       if(!instance){
           //如果为null则new出唯一实例
           instance = new SingleDog()
       }
       return instance
    }
})()