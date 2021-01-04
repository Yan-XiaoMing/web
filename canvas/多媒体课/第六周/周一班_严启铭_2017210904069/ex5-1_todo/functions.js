/*
	Functions：图形绘制方法
	buildDate：2019-10-8
	Author：xxx
	version：0
*/

// 1、变量定义
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
// var x = width/2;
// var y = height/2;
var Fill = true;

//图形对象定义
//请根据图形方法定义，补充对象属性
var circle = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 100
};
var style = {
	color: "blue",
	fontSize: 20,
	lineWidth: 1,
	fontFamily: "Arial",
	hAlign: "center",
	vAlign: "middle"
};
var line = {

	startx: canvas.width / 2,
	starty: canvas.height / 2,
	endx: canvas.width / 2 + 50,
	endy: canvas.height / 2 + 50

};
var text = {
	x: canvas.width / 2,
	y: canvas.height / 2
};
var rect = {
	x: canvas.width / 2,
	y: canvas.height / 2
};


//2、图形方法定义


/*
	Function：drawCircle（画圆/扇形/圆弧）
	Params：circle对象（圆心、半径、起始弧度、绘制方向）
			style对象（线宽、线条描边或填充色）
			isFill（是否填充）
	Returns：none
	Author：xxx
	version：0
*/
function drawCircle(circle, style, isFill) {
	context.save();
	context.translate(circle.x, circle.y);

	// if(isFill){
	// 	context.fillStyle=style.colorW;
	// }
	context.fillStyle = style.colorB;

	context.arc(0, 0, circle.radius, 0 * Math.PI, 2 * Math.PI);
	context.fill();
	
	// context.arc(circle.x, circle.y, circle.radius, (2-angle)*Math.PI,false);	
	// context.fill();
	context.restore();
}

/*
	Function：drawLine（画线）
	Params：line对象（起始点坐标、终止点坐标）
			style对象（线宽、线条描边或填充色）
			isFill（是否填充）
	Returns：none
	Author：xxx
	version：0
*/
function drawLine(line, style, isFill) {

	context.save();
	context.translate(line.x, line.y);

	if (isFill) {
		context.fillStyle = style.colorW;
	}

	// context.moveTo(0, 0);
	// context.lineTo(50 ,50);

	context.restore();

}

/*
	Function：drawText（绘制文本）
	Params：text对象（文本内容、起始点坐标）
			style对象（字体大小、字体、线宽、文本描边或填充色、文本起始点位置、文本起始点坐标）
			isFill（是否填充）
	Returns：文本大小对象（宽度、高度）
	Author：xxx
	version：0
*/
function drawText(text, style, isFill) {
	var textSize = {};
	context.save();
	context.translate(text.x, text.y);

	if (isFill) {
		context.fillStyle = style.colorW;
	}

	context.restore();
	return textSize;
}

/*
	Function：drawRect（绘制矩形）
	Params：rect对象（起始点坐标、矩形宽度、高度）
			style对象（线宽、描边或填充色）
			isFill（是否填充）
	Returns：none
	Author：xxx
	version：0
*/
function drawRect(rect, style, isFill) {
	context.save();
	context.translate(rect.x, rect.y);

	if (isFill) {
		context.fillStyle = style.colorW;
	}
	context.restore();


}
console.log(width,height);
console.log(circle.x,circle.y);

drawCircle(circle, style, true);