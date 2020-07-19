/*
	Functions  :ex8 绘图板
	Author    :严启铭
	Build_Date:2019-11-13
	Version   :1.0.8
 */
var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext("2d");

var offscreenTempCanvas = document.createElement('canvas');
var offscreenTempContext = offscreenTempCanvas.getContext("2d");

var lis = document.getElementsByTagName("li");

var panelShow = document.getElementById("textPanel");
var textContent = document.getElementById("content");
var textX = document.getElementById("x");
var textY = document.getElementById("y");

var flag = false;
var mouseStart={};
var mouseEnd={};
var TIPS_NUM = 8;
var canvasArrs=[];
var contextTips=[];

var getPhoto = document.getElementById("photo");

var flag = false;
var choose = 0;

var imageCamera = new Image();
imageCamera.src = "./camera.png";

var imageVideo = new Image();
imageVideo.src = "./video.png";

var imageColor = new Image();
imageColor.src = "./color.png";

var imageScissors = new Image();
imageScissors.src = "./scissors.png";

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;


/**
 * 画框框
 */
function loadRect() {
    var elem="";
    var tipsDiv=document.getElementById("tips");
    for(let i = 0;i<TIPS_NUM;i++){
        elem += "<canvas width='30' height='30' class='canvas_tips'></canvas>";
    }
    tipsDiv.innerHTML = elem;
    canvasArrs = document.getElementsByTagName("canvas");
    style.color = "black";

    for(index in canvasArrs){

        if(index<canvasArrs){
            contextTips[index]=canvasArrs[index].getContext('2d');
        }

        switch(index){

            case "0"://绘制线  
                contextTips[index].beginPath();
                contextTips[index].moveTo(3,28);
                contextTips[index].style = "black";
                contextTips[index].quadraticCurveTo(18,0,26,14);
                contextTips[index].stroke();
                contextTips[index].closePath();

                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);

                break;
        
            case "1": //绘制空心图标
                setRect();
                drawRect(contextTips[index],rect,style,false);
                restoreRect();
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);

                break;
    
            case "2"://绘制实心图标
                setRect();
                drawRect(contextTips[index],rect,style,true);
                restoreRect();
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                break;
    
            case "3"://绘制'T'
                text.text="T";
                text.x = canvasArrs[index].width/2;
                text.y = canvasArrs[index].height/2;
                style.color = "black";
                style.hAlign="center";
                style.vAlign="middle";
                style.fontSize = 14;
                drawText(contextTips[index],text,style,false);
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                break;
            case "4":
            //绘制照片的工具图标
                contextTips[index].drawImage(imageCamera,2,2);
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                break;
            case "5":
                contextTips[index].drawImage(imageVideo,2,2);
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                break;
            case "6":
                contextTips[index].drawImage(imageColor,2,2);
                canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                break;
            case "7":
                    contextTips[index].drawImage(imageScissors,2,2);
                    canvasArrs[index].addEventListener("mousedown",onCanvasTipsMousedown);
                    break;
        }
        
    }

}

/**
 * 事件监听
 */

imageCamera.onload = function () {
    loadRect();
}

imageVideo.onload = function() {
    loadRect();
}

imageColor.onload = function() {
    loadRect();
}

imageScissors.onload = function(){
    loadRect();
}

canvas.addEventListener("mousemove",onCanvasMousemove);

canvas.addEventListener('mousedown',onCanvasMousedown);

canvas.addEventListener('mouseup',onCanvasMouseup);


for(let i = 0 ;i<lis.length;i++){
	if(i<lis.length-1){
		// var color = "yellow";
		var color = "rgb("+(Math.random()*256)%255+","+(Math.random()*256)%255+","+(Math.random()*256)%255+")";
		lis[i].style.backgroundColor = color;
    }
    if(i!=lis.length-1){
        lis[i].addEventListener("click",getClickColor);
    }
    else if(i==lis.length-1){
        lis[lis.length-1].style.backgroundColor = "#fff";
        lis[lis.length-1].addEventListener("click",getClear);
    }
}

function onCanvasMousedown(event){
	mouseStart.x = event.clientX;
	mouseStart.y = event.clientY;
    mouseStart = windowToCanvas(canvas,mouseStart)
    curve.x0 = mouseStart.x;
    curve.y0 = mouseStart.y;
    rect.x = mouseStart.x;
    rect.y = mouseStart.y;
    if(choose==3){
        text.x = mouseStart.x;
        text.y = mouseStart.y;
        if(textContent.value==null){
            console.log(textContent.value);
            
            text.text = "text";
        }
        else{
            text.text = textContent.value;
        }
        // text.text = panelShow.value ||"text";
        textX.value = mouseStart.x;
        textY.value = mouseStart.y;
    }
    flag = true;
    offscreenContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    // offscreenTempContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    context.beginPath();

    // console.log("离屏");
}

function onCanvasMousemove(event){
    
	if(flag){
        // console.log(choose);        
        context.beginPath();
        mouseEnd.x = event.clientX;
        mouseEnd.y = event.clientY;
        // context.clearRect(0,0,canvas.width,canvas.height);
        mouseEnd = windowToCanvas(canvas,mouseEnd);    
        
        if(choose==0){
            curve.x1 = mouseEnd.x;
            curve.y1 = mouseEnd.y;
            drawCurve(context,curve,style,true);
            curve.x0 = curve.x1;
            curve.y0 = curve.y1;
	        // console.log(curve);
        }
        if(choose==1){
            // context.closePath();
            // console.log("choose==1");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
            rect.height = mouseEnd.y - mouseStart.y;
            rect.width = mouseEnd.x - mouseStart.x;
            drawRect(context,rect,style,false);
        }
        if(choose==2){
            // context.closePath();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
            rect.height = mouseEnd.y - mouseStart.y;
            rect.width = mouseEnd.x - mouseStart.x;
            drawRect(context,rect,style,true);  
        }
        if(choose==3){
            text.x = mouseEnd.x;
            text.y = mouseEnd.y;
            style.fontSize = 20;
            textX .value= mouseEnd.x;
            textY .value= mouseEnd.y;
            context.save();
            context.beginPath();
			context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(offscreenCanvas,0,0,canvas.width,canvas.height);
            drawText(context, text, style,true);
            context.closePath();
            context.restore();
        }
        if(choose == 7){
            rect.height = mouseEnd.y - mouseStart.y;
            rect.width = mouseEnd.x - mouseStart.x;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(offscreenCanvas,0,0,canvas.width,canvas.height);
            offscreenTempCanvas.width = rect.width;
            offscreenTempCanvas.height = rect.height;
            offscreenTempContext.drawImage(canvas, mouseStart.x, mouseStart.y, rect.width, rect.height,0,0,rect.width,rect.height);
            context.setLineDash([5,5]);
            drawRect(context,rect,style,false);
        }
	}
}

function onCanvasMouseup(event){
    flag = false;
	mouseEnd.x = event.clientX;
	mouseEnd.y = event.clientY;
	// console.log("mouseup: "+windowToCanvas(canvas,mouseEnd));
    mouseEnd = windowToCanvas(canvas,mouseEnd);
    // context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
    if(choose == 7){
        context.setLineDash([]);
        getPhoto.style.display = "inline-block";
        // var str = 
        // var strArray = [];
        // strArray = str.split(",");
        // str = strArray[1];
        console.log(offscreenTempCanvas.toDataURL());
        // console.log(str);

        getPhoto.src =  offscreenTempCanvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(offscreenCanvas,0,0,canvas.width,canvas.height);
    }
    else{
        getPhoto.style.display = "none";
    }
    offscreenContext.drawImage(canvas,0,0,canvas.width,canvas.height);
    context.beginPath();

}

function onCanvasTipsMousedown(event){
	for(i in canvasArrs){
		if(canvasArrs[i]===event.target){
			this.style.backgroundColor="#00EAFF"; //设置当前目标选中的颜色
			choose=i; 
			if(i==3){  
            	//文本框显示
                panelShow.style.display = "block";
            }
            else{
            	//文本框隐藏
                panelShow.style.display = "none";
                textX.value = "";
                textY.value = "";

            }
            if(i==4||i==6)
            {
                if(i==4){
                    console.log("彩色");
                    //显示图片
                    getPhoto.style.display = "inline-block";
                    getPhoto.src = canvas.toDataURL();
                }
                if(i==6){
                    console.log("黑白");
                    //显示黑白图片
                    getPhoto.style.display = "inline-block";
                    removeColor();
                    getPhoto.src = offscreenCanvas.toDataURL();
                } 
               
            }
            else{
            	//图片隐藏
                getPhoto.style.display = "none";
            }
            if(i == 5){
                controls.style.display = "block";
            }
            else{
                controls.style.display = "none";
            }

		}

		else{
			//没有被选中的背景还原成白色
			if(i<TIPS_NUM) canvasArrs[i].style.backgroundColor="#FFF";
		}
	}
	
}

function getClickColor() {
	style.color = this.style.backgroundColor;
	// console.log(style.color);
}

function getClear(){
    // console.log("clear");
    context.clearRect(0, 0, canvas.width, canvas.height);
    offscreenContext.clearRect(0, 0, canvas.width, canvas.height);
    textX.value = "";
    textY.value = "";
    video.style.display = "none";
}

function setRect() {
	style.color = "black";
	style.lineWidth = 1.5;
	rect.x = 4;
	rect.y = 7;
	rect.height = 16;
	rect.width = 22;
}	

function restoreRect() {
	rect.x = rect.y = rect.width = rect.height = 0;	
	style.color = "blue";
	style.width = 1;
}