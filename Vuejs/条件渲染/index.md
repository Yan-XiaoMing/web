# 条件渲染
## v-if
指令表达式为true的时候被渲染
有if就有else
v-if v-else-if v-else
```
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else-if>Oh yes</h1>
<h1 v-else>Oh no</h1>
```
v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。  

### 用 key 管理可复用的元素
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
## v-show
```
<h1 v-show="ok">ok</h1>
```

### 前端面试题之v-if和v-show的区别

1. v-show是css切换，v-if是完整的销毁和重新创建。
2. 使用 频繁切换时用v-show，运行时较少改变时用v-if
3. v-if=‘false’ v-if是条件渲染，当false的时候不会渲染

**官方的解释**  
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。  
v-if 是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块  

v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。