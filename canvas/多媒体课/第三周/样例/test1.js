/*
	Function:test1
	Author:zjvivi
	BuildDate:2019-9-16
	Version:1.0
*/

var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");


var WORDS="欢迎光临";
var index=0;
var id=0;

function drawWords(str){
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "orange";
	ctx.fillText(str, canvas.width/2, canvas.height/2);
	
}

function onInterval(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if(index>=WORDS.length) {
		
		drawWords(WORDS);
	}
	else{
		drawWords(WORDS.charAt(index));
		id=setTimeout(onInterval,500);

	}

	index++;
}

drawWords(WORDS);
id=setTimeout(onInterval,1000);
