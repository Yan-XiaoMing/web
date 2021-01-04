/*
	Functions：期末上机考设计题
	Author：zjvivi
	Build-date：2019-12-22
	Version：1.0
*/
// 1、变量定义

var image=new Image();



var PIE_OFFSET=50,    //控制饼图偏移
	START_ANGLE=-Math.PI/3;   //饼图第一块的初始弧度

var RECT_COLOR="rgba(255,255,255,0.35)";  //矩形框颜色

//2、函数自定义区
function main(){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);
	context.save();
	context.globalAlpha = 0.5;
	context.fillStyle = "white";
	context.fillRect(10,10,canvas.width-20,canvas.height-20);
	context.restore();
	context.save();
	context.beginPath();
	context.translate(width/2,height/2);
	drawLine(line,style,true);
	if(line.x1<=50){
		line.x1+=1;
		line.y1-=Math.sqrt(3);
	}
	// console.log(line);
	context.restore();

	requestAnimationFrame(main);
}

//3、事件处理函数定义


//4、调用执行

canvas.addEventListener("click",function () {
	requestAnimationFrame(main);
});

image.onload = function(){
	context.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);
};


//初始设定
style.fontSize=20;
circle.x+=PIE_OFFSET;

rect.x=10;
rect.y=10;
rect.width=canvas.width-20;
rect.height=canvas.height-20;

text.x=100;
text.y=canvas.height/2;
style.hAlign="left";
style.vAlign="top";

image.src="./bg.jpg";
