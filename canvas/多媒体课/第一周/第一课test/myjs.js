var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawLove(canvas){

 
    ctx.beginPath();

    ctx.fillStyle="#E992B9";

    ctx.moveTo(75,40);

    ctx.bezierCurveTo(75,37,70,25,50,25);

    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);

    ctx.bezierCurveTo(20,80,40,102,75,120);

    ctx.bezierCurveTo(110,102,130,80,130,62.5);

    ctx.bezierCurveTo(130,62.5,130,25,100,25);

    ctx.bezierCurveTo(85,25,75,37,75,40);

    ctx.fill();

}

drawLove(canvas);

 

var butSave = document.getElementById("save");

butSave.onclick=function(){

    console.log("click");
    var svaeHref = document.getElementById("save_href");

    /*

     * 传入对应想要保存的图片格式的mime类型

     * 常见：image/png，image/gif,image/jpg,image/jpeg

     */

    var img = document.getElementById("save_img");

    var tempSrc = canvas.toDataURL("image/png");

    svaeHref.href=tempSrc;

    img.src=tempSrc; 

};