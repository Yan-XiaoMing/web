var obj = new Proxy({},{
    get:function(target,propKey,receiver){
        console.log(`getting ${target} ${propKey} ${receiver}!`)
        return Reflect.get(target,propKey,receiver)
    },
    set:function(target,propKey,value,receiver){
        console.log(`setting ${target} ${propKey} ${value} ${receiver}!`)
        return Reflect.set(target,propKey,value,receiver)
    }
});

var proxy = new Proxy({},{
    get:function(target,propKey){
        console.log(target,propKey)
        return 10
    }
})


var target = {}
var handler = {}
var proxy = new Proxy(target,handler)
proxy.a = 'b'
target.a