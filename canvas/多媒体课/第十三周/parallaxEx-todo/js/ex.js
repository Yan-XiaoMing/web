/*
 * Copyright (C) 2012 David Geary. This code is from the book
 * Core HTML5 Canvas, published by Prentice-Hall in 2012.
 *
 * License:
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * The Software may not be used to create training material of any sort,
 * including courses, books, instructional videos, presentations, etc.
 * without the express written consent of David Geary.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

var canvas = document.getElementById('canvas'),   
    context = canvas.getContext('2d'),
    controls = document.getElementById('controls'),
    animateButton = document.getElementById('animateButton'),
    //声明图像Image对象
    tree = new Image(),
    nearTree = new Image(),
    grass = new Image(),
    grass2 = new Image(),
    sky = new Image(),

    paused = true,
    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps=60,
    //不同图层图像的偏移量
    skyOffset = 0,
    grassOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,

    //设置不同图层的速度，越远速度越小
    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 75;

// Functions.....................................................

function erase() {
   context.clearRect(0,0,canvas.width,canvas.height);
}

function draw() {
   context.save();
   //计算每帧里的天空图像的偏移量并累加
   //偏移量=天空运动速度（SKY_VELOCITY）/帧频（fps）
   //若超过canvas宽度，则重置为0
   skyOffset = skyOffset < canvas.width ?
               skyOffset + SKY_VELOCITY/fps : 0;

   //填空1:参照上方填空偏移量来计算绿草、远处的树（tree）、近处的树（nearTree)偏移量
   grassOffset = grassOffset<canvas.width?grassOffset+ GRASS_VELOCITY/fps:0;

   treeOffset = treeOffset<canvas.width?treeOffset+FAST_TREE_VELOCITY/fps:0;

   nearTreeOffset = nearTreeOffset<canvas.width?nearTreeOffset+TREE_VELOCITY/fps:0;

   //绘制天空
   context.save();
   context.translate(-skyOffset, 0);
   context.drawImage(sky, 0, 0);
   context.drawImage(sky, sky.width-2, 0);
   context.restore();

   //绘制远处的绿树
   context.save();
   context.translate(-treeOffset, 0);
   context.drawImage(tree, 100, 240);
   context.drawImage(tree, 1100, 240);
   context.drawImage(tree, 400, 240);
   context.drawImage(tree, 1400, 240);
   context.drawImage(tree, 700, 240);
   context.drawImage(tree, 1700, 240);
   context.restore();

   //绘制近处的绿树
   context.save();
   context.translate(-nearTreeOffset, 0);
   context.drawImage(nearTree, 250, 220);
   context.drawImage(nearTree, 1250, 220);
   context.drawImage(nearTree, 800, 220);
   context.drawImage(nearTree, 1800, 220);
   context.restore();

   //绘制最近的绿草
   context.save();
   context.translate(-grassOffset, 0);

   context.drawImage(grass, 0, canvas.height-grass.height);

   context.drawImage(grass, grass.width-5,
                     canvas.height-grass.height);

   context.drawImage(grass2, 0, canvas.height-grass2.height);

   context.drawImage(grass2, grass2.width,
                     canvas.height-grass2.height);
   context.restore();

}

function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}

function animate(now) {
   if (now === undefined) {
      now = +new Date;   //计算得到当前时间的整数值
   }
   //帧频调用
   fps = calculateFps(now);

   //播放状态下重绘帧图像
   if (!paused) {
     erase();
	   draw();
   }

   //填空3:调用动画函数
   requestNextAnimationFrame(animate);
}

// Event handlers................................................

animateButton.onclick = function (e) {
   paused = !paused;  //切换播放/暂停状态
   if (paused) {
      animateButton.value = 'Animate';
   }
   else {
      animateButton.value = 'Pause';
   }
};

// Initialization................................................

context.font = '48px Helvetica';

//设置图像对象的图像来源
tree.src = 'images/smalltree.png';
nearTree.src = 'images/tree-twotrunks.png';
grass.src = 'images/grass.png';
grass2.src = 'images/grass2.png';
sky.src = 'images/sky.png';

//填空图像加载完毕后，开始动画
sky.onload = function (e) {
   draw();
   //调用动画函数
   requestNextAnimationFrame(animate);
};


