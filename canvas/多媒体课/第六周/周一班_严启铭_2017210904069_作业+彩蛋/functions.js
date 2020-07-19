/*
	Functions：图形绘制方法
	buildDate：2019-10-8
	Author：zjvivi
	version：1.0
*/

// 1、变量定义
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//图形对象定义
var circle = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	r: canvas.width / 4,
	sAngle: 0,
	eAngle: Math.PI * 2,
	clockWise: false
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
	x0: canvas.width / 2,
	y0: canvas.height / 2,
	x1: 0,
	y1: 0
};
var text = {
	text: "hello world!",
	x: canvas.width / 2,
	y: canvas.height / 2
};
var rect = {
	x: 0,
	y: 0,
	width: 100,
	height: 100
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
	context.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle, circle.clockWise);
	context.lineWidth = style.lineWidth;
	if (!isFill) {
		context.strokeStyle = style.color;
		context.stroke();
	} else {
		context.fillStyle = style.color;
		context.fill();
	}
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

	context.moveTo(line.x0, line.y0);
	context.lineTo(line.x1, line.y1);
	context.lineWidth = style.lineWidth;
	if (isFill) {
		context.strokeStyle = style.color;
		context.stroke();
	}
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
	context.font = style.fontSize + "px " + style.fontFamily;
	context.textAlign = style.hAlign;
	context.textBaseline = style.vAlign;
	context.lineWidth = style.lineWidth;
	context.translate(text.x, text.y);

	textSize.width = context.measureText(text.text).width;
	textSize.height = style.fontSize;

	if (isFill) {
		context.fillStyle = style.color;
		context.fillText(text.text, 0, 0);
	} else {
		context.strokeStyle = style.color;
		context.strokeText(text.text, 0, 0);
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
	context.beginPath();
	
	context.lineWidth = style.lineWidth;

	context.rect(rect.x, rect.y, rect.width, rect.height);
	if (isFill) {
		context.fillStyle = style.color;
		context.fill();
	} else {
		context.strokeStyle = style.color;
		context.stroke();
	}
	context.closePath();
	context.restore();

}