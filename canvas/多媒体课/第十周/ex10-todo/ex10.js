/*
	Function  :企鹅绘制（由于音频被chrome最新版默认无交互下禁音，本次案例请在firefox中打开调试）
	Author    :xxx
	Build_Date:2019-11-3
	Version   :1.0
 */

//1. 公共变量声明块........................................................

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

var offscreenCanvas = document.createElement('canvas');
var offscreenContext = canvas.getContext("2d");

var iCanvasWidth=canvas.width,
	iCanvasHeight=canvas.height;

var offCanvasWidth = offscreenCanvas.width,
	offCanvasHeight = offscreenCanvas.height;

var imgBg=new Image(),
	imgPenguin=new Image();

var mousePoint={};

imgBg.src = "./bg.png";
imgPenguin.src = "./penguin.png";

var iCount=1;
var alpha=0.05;

var tempImage;
var penguinFlag,step;
var drawSmallPenguin = new DrawSmallPenguin(2000);

penguinFlag = step = false;

// var imgSprite=new Image();
// var BG_WIDTH=800,
// 	BG_HEIGHT=576,
// 	BG_TOP=0,
// 	P_WIDTH=130,
// 	P_HEIGHT=270,
// 	P_TOP=577;
//2. 函数定义块...........................................................

//左上冰(230,230)
//右下冰(710,510)
function DrawSmallPenguin(duration) {//对象函数(第七周作业造好的轮子嘿嘿嘿)

	this.imgAlpha = 0;
    duration = duration ? duration : 150;
    this.alphaInterval = 1 / duration;
    this.finish = false;
    this.draw = function () {
		
        if (this.finish) {
            return true;
        }
        context.save();
        if (this.imgAlpha > 0.1) this.finish = true;
        else {
            context.globalAlpha = this.imgAlpha;
            this.imgAlpha += this.alphaInterval;
        }
		context.drawImage(imgPenguin,230,230,imgPenguin.width*0.2,imgPenguin.height*0.2);        
		context.restore();
		return this.finish;
    };
	
}

function drawImageOnCanvas(image,sx,sy,sw,sh,dx,dy,dw,dh) {//目前没使用写了个垃圾不好用的函数

	if(dw==null||dh==null){//三参
		context.drawImage(image, dx, dy);
		console.log("三参");
	}
	else if((dw!=null&&dh!=null)&&(sw==null||sx==null||sy==null||sh==null)){//5参
		context.drawImage(image, dx, dy, dw, dh);
		console.log("五参");
	}
	else{//9参
		context.drawImage(Image,sx,sy,sw,sh,dx,dy, dw, dh);
		console.log("九参");
	}

}

function getLocation(event) {
	mousePoint.x = event.clientX;
	mousePoint.y = event.clientY;
	console.log(mousePoint.x,mousePoint.y);

}

function startSmallPenguin(){
	drawSmallPenguin.draw();
	window.requestAnimationFrame(startSmallPenguin);
}

function penguinStart() {
		// console.log("开始");
		
		context.save();
		context.beginPath();
		context.shadowOffsetX = -5;
		// 阴影的y偏移
		context.shadowOffsetY = -5;
		context.shadowBlur = 5;
		context.shadowColor = 'rgba(0,0,0,0.5)';
		context.drawImage(imgPenguin, 630, 410, imgPenguin.width*0.5, imgPenguin.height*0.5);	
		context.closePath();
		context.restore();
		step = true;
		if(step){
			console.log(step);
			window.requestAnimationFrame(startSmallPenguin);		
		}
}




//3. 事件注册块...........................................................
function onSetTimeout(){
	setTimeout(penguinStart,3000);	//3秒以后开始
}

imgBg.onload = function () {//背景进来了就绘制
	context.drawImage(imgBg,0,0,iCanvasWidth,iCanvasHeight);
}

imgPenguin.onload = function () {
	onSetTimeout();//企鹅进来就准备开始
	
}

canvas.addEventListener("click",getLocation);




//4. 初始化块............................................................

onSetTimeout();

