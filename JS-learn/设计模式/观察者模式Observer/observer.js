/*
    观察者模式指的是一个对象(Subject)维持一系列依赖于它的对象(Observer),
    当有关状态发生变化的时候
    Subject对象通知一系列的Observer对象进行更新
*/

/*
    观察者模式中,Subject对象拥有添加、删除和通知一系列的Observer的方法
    而Observer对象拥有更新方法等

    Subject对象添加了一系列的Observer对象之后,Subject对象则维持着这一系列
    Observer对象,当有关状态发生变更的时候Subject对象则会通知这一系列的Observer对象
    进行更新
*/

function Subject(){
    this.observers = []
}

Subject.prototype = {
    add:function(observer){
        this.observers.push(observer)
    },
    remove:function(observer){
        var observers = this.observers
        for(var i = 0;i<observers.length;i++){
            if(observers[i] === observer){
                observers.splice(i,1)
            }
        }
    },
    noyify:function(){
        var observers = this.observers
        for(let i = 0;i<observers.length;i++){
            observers[i].update()
        }
    }
}

function Observer(name){
    this.name = name
}

Observer.prototype = {
    update:function(){//更新
        console.log('my name is '+this.name)
    }
}

var sub = new Subject()

var obs1 = new Observer('ttsy1')
var obs2 = new Observer('ttsy2')

sub.add(obs1)
sub.add(obs2)
sub.remove(obs2)
sub.noyify()