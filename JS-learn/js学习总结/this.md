# 从ECMAScript规范理解this 

JS在执行代码的时候会创建其对应的时执行上下文

对于每个执行上下文 都有对应的三个属性

* 变量对象 (`Variable object`,VO)
* 作用域链
* this

## ECMAScript 5.1

> http://yanhaijing.com/es5/#115

ECMAScript 规范中有一种存在于规范中的类型,它的作用是用来描述语言底层行为逻辑

而其中的`Reference`类型与 `this`的指向有密切关联

### 什么是Reference？

`Reference`类型是用来解释 **delete**、**typeof** 以及赋值等操作行为的

尤大的话:

> 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。