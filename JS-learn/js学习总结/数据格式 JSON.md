# 数据格式 JSON

**背景**

第一代web服务很大程度上是以XML为基础的，以服务期间通信为主要特征。随着轻量级数据格式json的诞生，以它巧但描述能力不差、网络传输数据更快的优点逐渐取代XML

**JSON对象**

json对象有两种方法：stringify()和parse()。这两种方法分别可以将javascript序列化为JSON字符串，以及将JSON解析为原生javascript值。

在**序列化javascript对象**时，所有函数和原型对象都会有意地在结果中忽略。此外，值为undefined的任何属性也会跳过。

```javascript
let book={
title:"hhh",
authors:["hby","yqm"],
edition:4,
year:2017,
price:undefined,
getBook(){
    return this.title;
          },
}
let jsonText=JSON.stringify(book);
console.log(jsonText);
{"title":"hhh","authors":["hby","yqm"],"edition":4,"year":2017}
```