/*
  请填写版权信息
*/
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    controls = document.getElementById('controls'),
    animateButton = document.getElementById('animateButton'),
    paused = true;
   
//引用图像的大小
var GRASS_HEIGHT=52,
    GRASS_WIDTH=1005,
    TREE_WIDTH=137,
    TREE_HEIGHT=165,
    NEARTREE_WIDTH=224,
    NEARTREE_HEIGHT=224,
    SKY_WIDTH=1024,
    SKY_HEIGHT=512;

var audio=document.getElementById("bgAudio");  //获取音频

//定义滚动行为对象
//此处是5个精灵共用一个行为对象，也可以分开写，仅作参考
var scroll={
  lastUpdate: [0,0,0,0,0],
  offset : [0,0,0,0,0],
  VELOCITY : [8,20,40,75,75],
  sprites:["skySprite","treeSprite","nearTreeSprite","grassSprite","grass2Sprite"],

  execute: function (sprite, context, time) {
    var i=-1;
    i=this.sprites.indexOf(sprite.name);
    
    if(i==-1) return;
    
    this.offset[i] = this.offset[i] < canvas.width ?
               this.offset[i] + this.VELOCITY[i]/(1000 / (time - this.lastUpdate[i])) : 0;
   
    sprite.left=-this.offset[i];
    this.lastUpdate[i]=time;
  }
}

//1、图像绘制器声明
var skyPainter= new ImagePainter("./images/sky.png"),
    grassPainter= new ImagePainter("./images/grass.png"),
    grass2Painter= new ImagePainter("./images/grass2.png"),
    treePainter= new ImagePainter("./images/smalltree.png"),
    nearTreePainter= new ImagePainter("./images/tree-twotrunks.png");

//2、精灵声明
var skySprite= new Sprite("skySprite",skyPainter,[scroll]),
    grassSprite= new Sprite("grassSprite",grassPainter,[scroll]),
    grass2Sprite= new Sprite("grass2Sprite",grass2Painter,[scroll]),
    treeSprite= new Sprite("treeSprite",treePainter,[scroll]),
    nearTreeSprite= new Sprite("nearTreeSprite",nearTreePainter,[scroll]);

// Functions.....................................................

function erase(context) {
   context.clearRect(0,0,canvas.width,canvas.height);
}
function initSprite(sprite){
  //初始化时显示图像
  switch(sprite.name){
    case "skySprite":
      sprite.width=SKY_WIDTH;
      sprite.height=SKY_HEIGHT;
      sprite.left=0;
      sprite.top=0;
      sprite.paint(ctx); 
      
      break;
    case "treeSprite":
      sprite.left=100;
      sprite.top=240;
      sprite.width=TREE_WIDTH;
      sprite.height=TREE_HEIGHT;
      sprite.paint(ctx);
      for(i=1;i<=5;i++){
        sprite.left+=300;
        sprite.paint(ctx);
      }
      break;
    case "nearTreeSprite":
      sprite.left=250;
      sprite.width=NEARTREE_WIDTH;
      sprite.height=NEARTREE_HEIGHT;
      sprite.top=220;
      sprite.paint(ctx);
      for(i=1;i<=3;i++){
        sprite.left+=550;
        sprite.paint(ctx);
      }
      
      break;
    case "grassSprite":
      sprite.left=0;
      sprite.width=GRASS_WIDTH;
      sprite.height=GRASS_HEIGHT;
      sprite.top=canvas.height-sprite.height;
      sprite.paint(ctx);
      
      break;
    case "grass2Sprite":
      sprite.left=0;
      sprite.width=GRASS_WIDTH;
      sprite.height=GRASS_HEIGHT;
      sprite.top=canvas.height-sprite.height;
      sprite.paint(ctx);
      break;
  }
  
}

//初始化
function init() {
  initSprite(treeSprite);
  initSprite(nearTreeSprite);
  initSprite(grassSprite);
  initSprite(grass2Sprite);
}

//动画函数
function animate(now) {
   if (now === undefined) {
      now = +new Date;
   }

   if (!paused) {
      erase(ctx);
      //3、调用精灵
      drawRoles(skySprite,now);
      drawRoles(treeSprite,now);
      drawRoles(nearTreeSprite,now);
      drawRoles(grassSprite,now);
      drawRoles(grass2Sprite,now);
   }

   requestNextAnimationFrame(animate);
}

function drawRoles(sprite,now){
 
  switch(sprite.name){
    case "skySprite":
      sprite.update(ctx,now);
      sprite.paint(ctx);
      sprite.left+=skySprite.width-2;
      sprite.paint(ctx);
      break;
    case "treeSprite":
      sprite.update(ctx,now);
      sprite.paint(ctx);
      for(i=1;i<=5;i++){
        sprite.left+=300;
        sprite.paint(ctx);
      }
      
      break;
    case "nearTreeSprite":
      sprite.update(ctx,now);
      sprite.paint(ctx);
      for(i=1;i<=3;i++){
        sprite.left+=550;
        sprite.paint(ctx);
      }
      
      break;
    case "grassSprite":
      sprite.update(ctx,now);
      sprite.paint(ctx);
      sprite.left+=sprite.width-5;
      sprite.paint(ctx);
      break;
    case "grass2Sprite":
      sprite.update(ctx,now);
      sprite.paint(ctx);
      sprite.left+=sprite.width;
      sprite.paint(ctx);
      break;
  }
  
}

// Event handlers................................................

animateButton.onclick = function (e) {
   paused = ! paused;
   if (paused) {
      animateButton.value = 'Animate';
      audio.pause();
   }
   else {
      animateButton.value = 'Pause';
      audio.play();
   }

};

// Initialization................................................
lastTime= + new Date();
initSprite(skySprite);
setTimeout(init,300);
requestNextAnimationFrame(animate);

