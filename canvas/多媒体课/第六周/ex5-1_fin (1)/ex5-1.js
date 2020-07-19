/*
	Function  :ex5-1
	Author    :zjvivi
	Build_Date:2019-10-8
	Version   :1.0
 */

//1. 公共变量声明块........................................................
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var iCanvasWidth=canvas.width,
	iCanvasHeight=canvas.height;


var id,
	lastTime = + new Date();
var lastDisp;
var INTERVAL=200;
var velocity=1;  
var w=0;
//2. 函数定义块...........................................................
//计算帧频
function calculateFPS(now){
	if(now==undefined) now = (+new Date());
	if(now > lastTime)
		fps = parseInt(1000 / (now - lastTime));
    lastTime = now;
	return fps;
}

//3. 事件注册块...........................................................

// 进度条绘制
function step(){
	
	ctx.clearRect(0,0 ,iCanvasWidth, iCanvasHeight);
	now= + new Date();
	// 基于时间的动画，控制进度条的增加值
	w += (velocity/calculateFPS(now))*(Math.PI/10);
	
	circle.eAngle=w;

	//绘制图形
	ctx.beginPath();
	drawLine(line,style,true,true)
	drawCircle(circle,style,true,false);
	ctx.closePath();

	// 计算实时的帧频
	ctx.save();
	
	// 时间间隔控制
	if(now-lastDisp>INTERVAL){
		text.text=calculateFPS(now);
		lastDisp=now;
	}
	else{
		calculateFPS(now);
	}
	//实时计算帧频
	calculateFPS(now);
	//文本绘制
	drawText(text,style,true);
	ctx.restore();
	//控制调用次数
	if(w<=2*Math.PI) id=setTimeout(step,1000/120);
	
	
}

//4. 初始化块............................................................

lastDisp = 0;

drawCircle(circle,style,true,true);
//设置线条终点坐标
line.x1=line.x0+circle.r;
line.y1=line.y0;
//设置圆终止弧度的初始值
circle.eAngle=0;
//设置文本大小
style.fontSize=50;
//设置帧频数值的显示位置
text.x=iCanvasWidth-100;
text.y=50;
//启动定时器
id=setTimeout(step,1000/58);

