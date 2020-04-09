# GILTUI UI

## 1. [GILTUI UI框架官方文档](https://hungeraibin.github.io/GILTUI/)
- 此项目是是我对VUE学习过程中的总结和成果，欢迎大家积极参与讨论
- 

## 2. 项目简介
- GILTUI 是基于VUE2.0的UI框架，提供一些常用的基本轮子组件，
- 组件设计学习参考ElementUI、Ant Design的设计，提供舒服的使用方法
- 初期使用Parcel构建打包，后期改用vue-cli3重新搭建项目
- 尝试学习并使用Chai、Mocha、Karma进行单元测试，部分更新为Vue Test Utils
- 尝试学习并使用Travis CI进行持续集成
- 尝试学习并使用VuePress编写友好的文档

## 4. 使用项目
```
npm install --save-dev gilt
```

```js
import {Button} from 'gilt'
import Vue from 'vue'
new Vue({
  el: '#app',
  components: {
    'g-button': Button
  }
})
```

## 5. 查看源码
- 下载项目
```bash
git clone git@github.com:hungeraibin/GILTUI.git
```

- 安装依赖
```bash
npm install
```

- 启动服务
```bash
npm run serve
```

## 6. 联系我们 
- email：hungeraibin@gmail.com
- QQ：1149299088
- 微信：AI_Bin_W