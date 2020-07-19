var legend = ["优秀", "良好", "中等", "及格", "不及格"];
var data = [20, 40, 20, 10, 10];
var colors = ["#1a9641", "#a6d96a", "#fdae61", "#fda9a3", "#d7191c"];
var sum;
var RECT_MARGIN = 15,
	TEXT_OFFSET = 50,
	PIE_OFFSET = 50,
	LINE_OFFSET = 8,
	START_ANGLE = -Math.PI / 2;
var ctxAs = 0;

//函数自定义区
function drawColorRect() {
	rect.x = RECT_MARGIN;
	rect.y = RECT_MARGIN;
	rect.width = RECT_MARGIN * 2;
	rect.height = RECT_MARGIN;
	text.x = rect.x + rect.width + RECT_MARGIN;
	style.hAlign = "left";
	style.vAlign = "top";

	for (var i = 1; i <= colors.length; i++) {

		rect.y += RECT_MARGIN + rect.height;
		style.color = colors[i - 1];
		drawRect(rect, style, true);

		text.y = rect.y;
		style.fontSize = 12;

		text.text = legend[i - 1];
		drawText(text, style, true);
	}

}

function cvsAm(){
	// context.clearRect(120, 0, canvas.width-80, canvas.height);
	context.save();
	context.globalAlpha=ctxAs;
	drawColorCircle();
	context.restore();
	ctxAs+=0.1;
//     setTimeout(cvsAm,1000);	    
}

function sum() {
	var sum = 0;
	for (var i = 0; i < data.length; i++) {
		sum += data[i];
	}
	return sum;
}

// function drawColorCircle() {
// 	circle.sAngle = START_ANGLE;
// 	circle.eAngle = circle.sAngle;
// 	for (var i = 0; i <colors.length; i++) {
// 		circle.sAngle = circle.eAngle;
		
// 		style.color = colors[i];
// 		text.text = legend[i];
// 		line.x1 = line.x0 + Math.cos(circle.sAngle) * circle.r;
// 		line.y1 = line.y0 + Math.sin(circle.sAngle) * circle.r;
// 		circle.eAngle = circle.sAngle+data[i]/sum*2*Math.PI;

// 		context.beginPath();
// 		context.globalAlpha=0;
// 		drawLine(line, style, true);
// 		context.globalAlpha=1;
// 		drawCircle(circle,style,true);
// 		context.closePath();

// 		var tempAngle = circle.sAngle + (circle.eAngle-circle.sAngle)/2; 
		
// 		context.beginPath()
// 		line.x1 = line.x0 + Math.cos(tempAngle) * (circle.r+20);
// 		line.y1 = line.y0 + Math.sin(tempAngle) * (circle.r+20);
		
// 		drawLine(line, style, true);
// 		if(tempAngle>START_ANGLE&&tempAngle<(START_ANGLE+Math.PI)){
// 			line.x0 = line.x1;
// 			line.y0 = line.y1;
// 			line.x1 = line.x0+10;
// 			text.x = line.x0 + 10;
// 			text.y = line.y0;
// 			text.hAlign = "left";
// 			text.vAlign = "top";
// 		}
// 		else{
// 			line.x0 = line.x1;
// 			line.y0 = line.y1;
// 			line.x1 = line.x0-10;
// 			text.x = line.x0 - 50;
// 			text.y = line.y0;
// 			text.hAlign = "right";
// 			text.vAlign = "top";
// 		}
// 		drawLine(line, style, true);
// 		drawText(text,style,true);
// 		// line.x0 = line.x1;
// 		// line.y0 = line.y1
// 		// line.x1 = line.x0 +10;
// 		// drawLine(line, style, true);

// 		line.x0 =  canvas.width / 2;
// 		line.y0 = canvas.height/2;
// 		context.closePath();
		
// 	}
// }

var d = new Date();
console.log(d);
d.getFullYear();



function drawColorCircle() {
	context.clearRect(120, 0, canvas.width-80, canvas.height);
	context.save();
	context.globalAlpha=ctxAs;
	circle.sAngle = START_ANGLE;
	circle.eAngle = circle.sAngle;
	for (var i = 0; i <colors.length; i++) {
		circle.sAngle = circle.eAngle;
		
		style.color = colors[i];
		text.text = legend[i];
		line.x1 = line.x0 + Math.cos(circle.sAngle) * circle.r;
		line.y1 = line.y0 + Math.sin(circle.sAngle) * circle.r;
		circle.eAngle = circle.sAngle+data[i]/sum*2*Math.PI;

		context.beginPath();
		// context.globalAlpha=0;
		drawLine(line, style, false);
		context.globalAlpha=ctxAs;
		drawCircle(circle,style,true);
		context.closePath();

		var tempAngle = circle.sAngle + (circle.eAngle-circle.sAngle)/2; 
		
		context.beginPath()
		line.x1 = line.x0 + Math.cos(tempAngle) * (circle.r+20);
		line.y1 = line.y0 + Math.sin(tempAngle) * (circle.r+20);
		
		drawLine(line, style, true);
		if(tempAngle>START_ANGLE&&tempAngle<(START_ANGLE+Math.PI)){
			line.x0 = line.x1;
			line.y0 = line.y1;
			line.x1 = line.x0+10;
			text.x = line.x0 + 10;
			text.y = line.y0;
			text.hAlign = "left";
			text.vAlign = "top";
		}
		else{
			line.x0 = line.x1;
			line.y0 = line.y1;
			line.x1 = line.x0-10;
			text.x = line.x0 - 50;
			text.y = line.y0;
			text.hAlign = "right";
			text.vAlign = "top";
		}
		drawLine(line, style, true);
		drawText(text,style,true);
		// line.x0 = line.x1;
		// line.y0 = line.y1
		// line.x1 = line.x0 +10;
		// drawLine(line, style, true);

		line.x0 =  canvas.width / 2;
		line.y0 = canvas.height/2;
		context.closePath();
		
	}
	ctxAs+=0.1;
	context.restore();
	setTimeout(drawColorCircle,1000);	
}



//事件处理函数定义




//调用执行
drawColorRect();
sum = sum();
// drawColorCircle();
// drawColorCircle();
cvsAm();
