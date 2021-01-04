# 计算属性

### **对于**任何复杂逻辑，都应当使用计算属性。

### 计算属性缓存 和 方法对比
```
<p>Reversed message: "{{ reversedMessage() }}"</p>

// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

比如下面的样例计算属性不会再更新,因为Date.now()不是响应式依赖:
```
computed:{
    now:function(){
        return Date.now()
    }
}
```

### 计算属性 对比 侦听属性
侦听属性。当你有一些数据需要随着其它数据变动而变动时，很容易滥用 watch  
通常更好的做法是使用计算属性而不是命令式的 watch 回调
```
<div id="demo">{{fullName}}</div>

//watch版本
var vm = new Vue({
    el:'#demo',
    data:{
        firstName:'Foo',
        lastName:'Bar',
        'fullName':'Foo Bar'
    },
    watch:{
        firstName:function(val){
            this.fullName = val + ' ' +this.lastName
        },
        lastName:function(val){
            this.fullName = this.firstName + ' ' + val
        }
    }
})

//计算属性版本
var vm = new Vue({
    el:'#demo',
    data:{
        firstName:'Foo',
        lastName:'Bar',
        'fullName':'Foo Bar'
    },
    computed:{
        fullName:function(){
            return this.firstName + ' ' + this.lastName
        }
    }
})
```

### 计算属性的setter
计算属性默认只有 getter，在需要时你也可以提供一个 setter：
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

# 侦听器
计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。  
当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。