**插值**   
无论何时，绑定的数据对象上 msg property 发生了改变，插值处的内容都会更新。
```html
<span>Message:{{msg}}</span>
```

通过[v-once](https://cn.vuejs.org/v2/api/#v-once)也能执行一次性地插值，当数据改变时，插值处的内容不会更新
```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

**插入HTML**
只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。
```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

Vue.js 都提供了完全的 JavaScript 表达式支持。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

每个绑定都只能包含单个表达式，所以下面的例子都不会生效。
```
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

可以用方括号括起来的 JavaScript 表达式作为一个指令的参数
```
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
```
attributeName 会被作为一个 JavaScript 表达式进行动态求值

**修饰符**  
修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
```
<form v-on:submit.prevent="onSubmit">...</form>
```
**缩写**

`v-bind`
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

`v-on`
```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

