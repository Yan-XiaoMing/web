# 实验2

### 图片压缩方案

图片压缩采用的是convertio这款文件转换器[官网地址](https://convertio.co/zh/)十分好用并且免费，而且还有Chrome的官方插件十分的便捷,可以快捷的转化文件,这里采用的是将png和jpg转化为svg,
之后使用yarn add global svgo 这款插件将 svg图片进行再次的压缩。  

### 响应式方案
采用了flex布局完成了PC端的界面,PC端的实现过程就不再阐述,源码已经上交,对于移动端的适配采用的是@media媒体查询,缩放页面,观察弹性盒子的缩放情况,之后将flex-direction设置为column属性
使其垂直排列,再者是删除掉pc端一些细节且并不是十分重要的部分,优化并简化移动端的页面,增强用户体验,节约空间。