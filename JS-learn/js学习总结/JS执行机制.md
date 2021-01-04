# JS执行机制

先来段噩梦,如果下面的能准确清晰的说出结果并且知道为什么可以跳过了。

```javascript
setTimeout(function(){
    console.log('定时器开始了')
});

new Promise(function(resolve){
    console.log('马上执行for循环')
    for(var i = 0;i< 10000;i++){
        i == 99 && resolve()
    }
}).then(function(){
    console.log('执行then')
})
console.log('代码执行结束')
```

如果不懂,那就认认真真来看完吧。

### 关于JavaScript

首先我们都先要清楚一个事情,JS是一门**`单线程`** 语言。JS的所有的所谓的”多线程“都是用单线程来模拟出来得到的。



### 事件循环

JS是单线程，那么所有的任务都需要好好排队一个一个来。那就好比我们看一个网页,假如们看一个淘宝的活动页，难道所有的文字都需要等最上面一张张图片显示了才能看到吗？

答案无疑是否定的。

聪明的程序员把任务分为了两类:

* 同步任务
* 异步任务

当打开网站的时候,网页的渲染其实就是一大堆的同步任务。比如页面骨架和页面元素的渲染。而像加载网页的图片或者视频这种消耗资源耗时高的则是异步任务。

下面放一个盗来的图更加清晰的说明:

![img](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上图大概想表述的信息如下:

* 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。

* 当指定的事情完成时，Event Table会将这个函数移入Event Queue。

* 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。

* 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

说了很多不如一段代码来的直接

```javascript
let data = []
$.ajax({
    url:www.baidu.com,
    data,
    success:()=>{
        console.log('发送成功!')
    }
})
console.log('代码执行结束')
```

上面的代码大概流程是这样的:

* ajax作为异步任务进入了Event Table 并 注册了回调函数`success`
* 执行`console.log('代码执行结束')`
* ajax事件完成，回调函数`success`进入Event Queue。
* 主线程从Event Queue读取回调函数`success`并执行

通过这个例子应该有了一定的初步的了解,下面就来深入一下，看看**setTimeout**



### setTimeout

这个函数想必都很清楚，第一眼看到我们就知道了他是可以异步延时执行。我们经常用它完成一些定时器的操作。

但用的多了就会暴露出各种各样的问题。比如你定了延时3s却延时了5 - 6s才得到执行,亦或者定了延时0s希望它立即执行，但却还是没有被立即执行。

看一个例子:

```javascript
setTimeout(()=>{
    console.log('延时3s')
    task()
},3000)
console.log('执行console')
//执行console
//延时3s
//task()
```

根据我们知道的知识,`setTimeout`是异步的,所以会先执行：`执行console`这个同步任务。

再看一个

```javascript
setTimeout(() => {
    task()
},3000)

sleep(10000000)
```

我们如果执行函数却会发现，task()需要开始运行的时间远远的超过了3s。

这个时候们重新来理解一下setTimeout执行的过程

* `task()`进入Event Table并注册,计时开始。

* 执行`sleep`函数，很慢，非常慢，计时仍在继续。

* 3秒到了，计时事件`timeout`完成，`task()`进入Event Queue，但是`sleep`也太慢了吧，还没执行完，只好等着。

* `sleep`终于执行完了，`task()`终于从Event Queue进入了主线程执行。

所以像`setTimeout(fn,0)`这样的代码，它的真正的含义是:

指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行

> 关于`setTimeout`要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。

什么?你说上面的**不够变态**?

那下面来点更变态的。

### setInterval

说完了`setTimeout`，当然不能错过它的孪生兄弟`setInterval`

对于执行顺序来说，`setInterval`会每隔指定的时间将注册的函数置入Event Queue，如果前面的任务耗时太久，那么同样需要等待。

对于`setInterval(fn,ms)`来说，我们已经知道不是每过`ms`秒会执行一次`fn`，而是每过`ms`秒，会有`fn`进入Event Queue。一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**。

这句话很关键我下面放3遍

>一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**。
>
>一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**。
>
>一旦**`setInterval`的回调函数`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了**。

传统的说完了,再来说说`Promise`

### Promise与process.nextTick(callback)

> process是node里面的浏览器内没有这个环境

Promise的基本定义和功能就不再提了,如果还不清晰可以看一下[阮老师的ES6](https://es6.ruanyifeng.com/#docs/promise)

而process.nextTick 就是在事件循环的下一次循环中调用`callback`回调函数。

除了上面说的同步任务和异步任务,再来说说更细致的定义:

* macro-task(宏任务) 通常包括整体代码scrpit、setTimeout、setInterval
* micro-task(微任务) 包括: Promise、process.nextTick

不同类型的任务会进入对应的Event Queue ，比如`setTimeout`和`setInterval`会进入相同的Event Queue。



事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。......无数次循环

下面解释一开始的那一段代码

```javascript
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```

* 这段代码作为宏任务，进入主线程。

* 先遇到`setTimeout`，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)

* 接下来遇到了`Promise`，`new Promise`立即执行，`then`函数分发到微任务Event Queue。

* 遇到`console.log()`，立即执行。

* 整体代码script作为第一个宏任务执行结束，看看有哪些微任务？发现了`then`在微任务Event Queue里面，执行。

* 第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中`setTimeout`对应的回调函数，立即执行。

  结束。

事件循环，宏任务，微任务的关系如图：

![img](https://user-gold-cdn.xitu.io/2017/11/21/15fdcea13361a1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 最后

来一段终极代码看看自己到底懂了多少吧！

```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

//1 7 6 8 2 4 3 5 9 11 10 12
```

要不知道为什么的话就连麦吧哈哈。