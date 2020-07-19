/*
	Function  :Progress bar
	Author    :xxxx
	Build_Date:2019-11-18
	Version   :0
	Remarks   :1、完成前先查看demo视频的效果
			   2、本题共有10空，完成后删除“======x========”的字样
	           3、js文件名的“todo”改成自己的名字拼音首字母缩写 
 */

//1. 公共变量声明块........................................................

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var iCanvasWidth = canvas.width,
	iCanvasHeight = canvas.height;


// 用于进度条
var iCount = 1;
var progressbar = {
	w: iCanvasWidth - 20,
	h: 30,
	x: iCanvasWidth / 2,
	y: iCanvasHeight / 2
};
var id,
	lastTime = +new Date(),
	dispFps;
var lastDisp;
var INTERVAL = 300;
var velocity = 100;
var w = 0;
var progressTxt = "";

var alpha = 0.1;

var RECT_COLOR = "blue";
var TEXT_COLOR = "white";
var FPS_COLOR = "orange";

var paused = false;

//用于蓝天白云
var FADE_OUT_TIME = 300; //自定义淡出时间单位毫秒;

var treeBig = new Image(),
	treeSmall = new Image(),
	grassLight = new Image(),
	grassDeep = new Image();
	sun = new Image();
sky = new Image();

var skyOffset = 0,
	grassOffset = 0,
	treeOffset = 0,
	bigTreeOffset = 0,

	TREE_VELOCITY = 20,
	BIG_TREE_VELOCITY = 35,
	SKY_VELOCITY = 10,
	GRASS_VELOCITY = 60;

var audio = document.getElementById("audio");

//2. 函数定义块...........................................................
// 帧频fps的定义为：1000（ms）/每帧之间时间差，帧频要取整
function calculateFPS(now) {
	// 2、设置当前时间戳
	if (now == undefined) now = +new Date;
	if (now > lastTime)
		// 3、帧频计算
		fps = 1000 / (now - lastTime);
	lastTime = now;
	// 4、返回帧频结果
	return fps;
}


// 进度条绘制
function step() {

	context.clearRect(0, 0, iCanvasWidth, iCanvasHeight);

	// 5、设置当前时间戳
	now = +new Date;

	// 6、控制进度条的增加值=速度velocity（像素/秒）/fps
	w += velocity / calculateFPS(now);

	// 7、绘制填充矩形progressbar
	context.fillStyle = RECT_COLOR;
	context.fillRect(progressbar.x, progressbar.y, w, progressbar.h);



	// 8、每隔INTERVAL时间后，计算帧频
	if (now - lastDisp > INTERVAL) {
		dispFps = calculateFPS(now);
		progressTxt = parseInt((w / progressbar.w) * 100) + "%";
		lastDisp = now;
	} else {
		calculateFPS(now);
	}

	// 9、根据demo效果，用填充文本方法在在合适位置绘制帧频的具体数字和进度百分比
	drawProgressText(progressTxt);

	// 10、当矩形递增的实际长度w值小于矩形的目标长度时，继续执行动画；若进度条绘制完成，则停止当前操作
	if (w < progressbar.w) {
		requestNextAnimationFrame(step);
	} else {
		context.clearRect(0, 0, iCanvasWidth, iCanvasHeight);

		context.fillRect(progressbar.x, progressbar.y, w, progressbar.h);
		drawProgressText("100%");
		console.log("play");
		audio.play();
		
		setTimeout(drawSkyFadeIn, 500);
	}

}

function drawProgressText(progressTxt) {
	context.save();
	context.textAlign = "right";
	context.textBaseline = "bottom";
	context.font = "bold " + progressbar.h + "px Arial";
	context.fillStyle = "orange";
	context.textAlign = 'left';
	context.textBaseline = 'middle';
	dispFps = parseInt(dispFps);
	var temp = context.measureText(dispFps).width;

	context.fillText(dispFps, progressbar.w - temp, progressbar.y - progressbar.h / 2);
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = "bold " + progressbar.h / 2 + "px Arial";
	context.fillStyle = "white";
	context.fillText(progressTxt, progressbar.x + w / 2, progressbar.y + progressbar.h / 2);
	context.restore();
}

function drawSkyFadeIn() {
	context.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
	context.globalAlpha = alpha;
	context.drawImage(sky, 0, 0);

	context.drawImage(sun, canvas.width - sun.width,0);
	

	context.drawImage(treeSmall, 100, 240);
	context.drawImage(treeSmall, 400, 240);
	context.drawImage(treeSmall, 700, 240);

	context.drawImage(treeBig, 250, 220);
	context.drawImage(treeBig, 800, 220);



	context.drawImage(grassLight, 0, canvas.height - grassLight.height);
	context.drawImage(grassLight, grassLight.width - 5, canvas.height - grassLight.height);

	context.drawImage(grassDeep, 0, canvas.height - grassDeep.height);
	context.drawImage(grassDeep, grassDeep.width, canvas.height - grassDeep.height);


	alpha += 1 / FADE_OUT_TIME;
	if (alpha <= 1) {
		requestNextAnimationFrame(drawSkyFadeIn);
	} else {
		setTimeout(animate, 3500);
	}
}

function drawTreeGrass() {
	context.save();

	skyOffset = skyOffset < iCanvasWidth ?
		skyOffset + SKY_VELOCITY / calculateFPS(now) : 0;

	grassOffset = grassOffset < iCanvasWidth ?
		grassOffset + GRASS_VELOCITY / calculateFPS(now) : 0;

	treeOffset = treeOffset < iCanvasWidth ?
		treeOffset + TREE_VELOCITY / calculateFPS(now) : 0;

	bigTreeOffset = bigTreeOffset < iCanvasWidth ?
		bigTreeOffset + BIG_TREE_VELOCITY / calculateFPS(now) : 0;

	context.save();
	context.translate(-skyOffset, 0);
	context.drawImage(sky, 0, 0);
	context.drawImage(sky, sky.width - 2, 0);
	context.restore();

	context.drawImage(sun, canvas.width - sun.width,0);


	context.save();
	context.translate(-treeOffset, 0);
	context.drawImage(treeSmall, 100, 240);
	context.drawImage(treeSmall, 1100, 240);
	context.drawImage(treeSmall, 400, 240);
	context.drawImage(treeSmall, 1400, 240);
	context.drawImage(treeSmall, 700, 240);
	context.drawImage(treeSmall, 1700, 240);
	context.restore();

	context.save();
	context.translate(-bigTreeOffset, 0);
	context.drawImage(treeBig, 250, 220);
	context.drawImage(treeBig, 1250, 220);
	context.drawImage(treeBig, 800, 220);
	context.drawImage(treeBig, 1800, 220);
	context.restore();

	context.save();
	context.translate(-grassOffset, 0);

	context.drawImage(grassLight, 0, canvas.height - grassLight.height);

	context.drawImage(grassLight, grassLight.width - 5,
		canvas.height - grassLight.height);

	context.drawImage(grassDeep, 0, canvas.height - grassDeep.height);

	context.drawImage(grassDeep, grassDeep.width,
		canvas.height - grassDeep.height);
	context.restore();

	// requestNextAnimationFrame(drawTreeGrass);

}

function animate() {

	if (!paused) {
		drawTreeGrass();
	 }
  
	 requestNextAnimationFrame(animate);
	
}

function state() {
	
	paused = paused ? false : true;
	if(!paused){
		audio.play();
	}
	else{
		audio.pause();
	}

}

//3. 事件注册块...........................................................
canvas.addEventListener("click",state);
//4. 初始化块............................................................
progressbar.x -= progressbar.w / 2;
progressbar.y -= progressbar.h / 2
lastDisp = 0;

context.fillStyle = "green";
sky.src = "images/sky.png";
treeBig.src = "images/tree-twotrunks.png";
treeSmall.src = "images/smalltree.png";
grassLight.src = "images/grass.png";
grassDeep.src = "images/grassDeep.png";
sun.src = "images/sun.png";

requestNextAnimationFrame(step);	
