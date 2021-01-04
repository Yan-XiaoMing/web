/*
    Function : ex
    Author : 严启铭
    Build-Date : 2019-9-16
    Version : 1.0

*/

/*
    var 的 五种常见类型
    var a; undifined
    string 
    object
    boolean
    number
*/

var canvas = document.getElementById("canvas"); //..获取id 为canvas的对象
var ctx = canvas.getContext('2d'); //提供canvas的api 二维绘图环境

var count = 0;

var WORDS = "欢迎光临";

// var hAlign=["left","right"];
// var vAlign=["top","bottom"];
// var position = [
//     {x:},
//     {},
//     {},
//     {}
// ]


var style = {
    fontSize: 60,
    fontFamily: "Arial",
    hAlign: "center",
    vAlign: "middle",
    color: "black"
}

ctx.font = style.fontSize + "px " + style.fontFamily;


var point1 = {

    x: canvas.width / 2,
    y: canvas.height / 2,
    movew: ctx.measureText(WORDS).width,
    color: "orange",
    x1: canvas.width / 2 - ctx.measureText(WORDS).width / 2,
    x2: canvas.width / 2 + ctx.measureText(WORDS).width / 2,

}

var circle = {
    x: canvas.width / 2,
    y: canvas.height / 2 + style.fontSize / 2 + 40,
    r: ctx.measureText(WORDS).width / 2,
    sAngle: 0,
    eAngle: Math.PI
}

function drawText(text, style, isFill) {

    // var str = ["欢","迎","光","临","欢迎光临"];

    ctx.font = style.fontSize + "px " + style.fontFamily;

    ctx.textAlign = style.hAlign;

    ctx.textBaseline = style.vAlign;

    if (isFill) {

        ctx.fillStyle = style.color;

        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // console.log(style.color);
        // console.log(style.font);
        // console.log(text);

    } else {
        ctx.strokeStyle = style.color;

        ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
    }

}

function onInterval() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawText(WORDS.charAt(count), style, true);
    // count++;
    // if (count <= WORDS.length) {
    //     setTimeout(onInterval, 500);
    // } else {
    //     drawText(WORDS, style, true);
    //     drawLineAndCircle(point1, style);
    // }
    // // if(count==WORDS.length){
    // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // //     setTimeout(onInterval, 500);
    // //     drawText(WORDS, style, true);
    // // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
}

function drawLineAndCircle(point, style) {

    ctx.moveTo(point.x1, point.y + style.fontSize / 2 + 20);

    ctx.lineTo(point.x2, point.y + style.fontSize / 2 + 20);

    ctx.strokeStyle = point.color;

    ctx.lineWidth = 5;

    ctx.stroke();

    ctx.moveTo(point.x1, point.y + style.fontSize / 2 + 40);

    ctx.lineTo(point.x2, point.y + style.fontSize / 2 + 40);

    ctx.strokeStyle = point.color;

    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);

    ctx.color = "orange";

    ctx.stroke();

   
    

    // console.log(point.x1,point.x2);
    // console.log("划线");

}



style.color = "orange"
onInterval();




//id = setInterval(onInterval,1000);
//id = setTimeout(onInterval,1000);