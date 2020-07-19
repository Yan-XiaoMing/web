/*
	Function:flag
	Author:xxx
	BuildDate:2019-9-30
	Version:0.1
*/

var canvas=document.getElementById("myCanvas");
// var ctx=canvas.getContext("2d");
var context=canvas.getContext("2d");


var WORDS="欢迎光临";
var index=0;
var id=0;


var point={
	x:canvas.width/2,
	y:canvas.height/2
};

var circlePoint={
	x:0,
	y:0
}
// var inCircle = {
// 	r:150
// }
// var ourCircle = {
// 	R:300
// }

//～～～～～～～～～～～～～～～～～ functions ～～～～～～～～～～～～～～～～～～～～～～～～
function createStyle(){
	//声明要使用的属性
	var Style = new Object;
	Style.color = "yellow",
	Style.isFill = true;
	Style.lineWidth = "1px";
	return Style;
}


function drawStar( context , r , R , circlePoint , rot , style){
	context.beginPath();
	for( var i = 0 ; i < 5 ; i ++){
		context.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + circlePoint.x,
					- Math.sin((18+72*i - rot )/180*Math.PI) * R + circlePoint.y);
					context.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + circlePoint.x ,
					- Math.sin((54+72*i - rot )/180*Math.PI) * r + circlePoint.y);
	}
	context.closePath();

	context.lineWidth = style.lineWidth;
	if(!style.isFill){
		context.strokeStyle = style.color;
		context.stroke();
	}
	else{
		context.fillStyle = style.color;
		context.fill();
	}


	
	
}
var Style = createStyle();
// context.translate(point.x, point.y);
// drawStar(context,inCircle.r,ourCircle.R,circlePoint,Math.PI/2,Style);
//大星
context.save();
context.translate(150,150);
drawStar(context,35,86,circlePoint,-Math.PI/2,Style);
context.restore();
//小星1
context.save();
context.translate(280,50);//先平移,再缩放,最后旋转。
context.scale(0.4, 0.4);
context.rotate(-Math.PI /4);
drawStar(context,35,86,circlePoint,-Math.PI/2,Style);
context.restore();
//小星2
context.save();
context.translate(350,110);//先平移,再缩放,最后旋转。
context.scale(0.4, 0.4);
context.rotate(-Math.PI /2);
drawStar(context,35,86,circlePoint,-Math.PI/2,Style);
context.restore();
//小星3
context.save();
context.translate(350,200);//先平移,再缩放,最后旋转。
context.scale(0.4, 0.4);
drawStar(context,35,86,circlePoint,-Math.PI/2,Style);
context.restore();
//小星4
context.save();
context.translate(270,270);//先平移,再缩放,最后旋转。
context.scale(0.4, 0.4);
context.rotate(-Math.PI /4);
drawStar(context,35,86,circlePoint,-Math.PI/2,Style);
context.restore();











