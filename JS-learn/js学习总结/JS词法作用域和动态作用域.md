# 词法作用域和动态作用域 

### 作用域

 作用域是程序源代码中定义变量的区域。

作用域就是确定当前执行代码对变量的访问权限

JS采用的是词法作用域,也就是静态作用域

### 静态作用域与动态作用域

js是词法作用域，函数的作用域在函数定义的时候就决定了

```js
var value = 1

function foo(){
    console.log(value)
}

function bar(){
    var value = 2
    foo()
}

bar()  
```



那什么是动态作用域?  -比如bash

```bash
value=1
function foo () {
    echo $value;
}
function bar () {
    local value=2;
    foo;
}
bar //2
```



> **《JavaScript权威指南》**: JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置