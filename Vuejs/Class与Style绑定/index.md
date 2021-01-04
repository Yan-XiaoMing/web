# 绑定HTML Class
## 对象语法

传给`v-bind:class`对象，从而动态切换class
```
<div v-bind:class="{active:isActive}"></div>
```
v-bind:class 指令也可以与普通的 class attribute 共存。
```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

data: {
  isActive: true,
  hasError: false
}
```
result:
```
<div class="static active"></div>
```
如果 `hasError` 的值为 true，class 列表将变为 `"static active text-danger"`

也可以通过对象和计算属性来绑定
```js
data: {
  classObject: {
    isActive: true,
    error: null
  }
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

## 逻辑性添加(官方把它称为数组语法)我自己觉得叫这个更合理一些

三目运算
这样写将始终添加 errorClass，但是只有在 isActive 是 true 时才添加 activeClass。
```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
``` 

也可以使用对象的方式来改写上的指令
```
<div v-bind:class="[{active:isActive},errorClass]"></div>
```

## 组件上的用法

```
Vue.component('my-component',{
    template:'<p class="foo bar">Hi!MIAI-FE</p>'
})
<my-component class="test"></my-component>

渲染结果如下:

<p class="foo bar test">Hi!MIAI-FE</p>
```

