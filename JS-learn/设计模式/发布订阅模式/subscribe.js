let pubSub = {
    list:{},
    subscribe:function(key,fn){//订阅
        if(!this.list[key]){
            this.list[key] = []
        }
        this.list[key].push(fn)
    },
    publish:function(){//发布
        let arg = arguments
        console.log(arg)
        let key = [].shift.call(arg)
        console.log('key: '+key)
        let fns = this.list[key]
        if(!fns || fns.length <= 0){
            return false
        }
        for(let i = 0;i<fns.length;i++){
            fns[i].apply(this,arg)
        }
    },
    unSubscibe(key){//取消订阅
        delete this.list[key]
    }
}

pubSub.subscribe('name',(name)=>{
    console.log('your name is '+name)
})

pubSub.subscribe('sex',(sex)=>{
    console.log('your sex is '+sex)
})

pubSub.publish('name', 'ttsy1');  // your name is ttsy1
pubSub.publish('sex', 'male');  // your sex is male
pubSub.unSubscribe('name');
console.log(pubSub.list)