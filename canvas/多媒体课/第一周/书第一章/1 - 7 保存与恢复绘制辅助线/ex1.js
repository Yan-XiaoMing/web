var canvas = document.getElementById("canvas"); //..获取id 为canvas的对象
var context = canvas.getContext('2d'); //提供canvas的api 二维绘图环境
function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width,canvas.height);
}
function restoreDrawingSurface() {

    context.putImageData(drawingSurfaceImageData, 0, 0); 
    
}
canvas.onmousedown = function (e) {

    saveDrawingSurface();

};
canvas.onmousemove = function (e) {

    //var loc = windowToCanvas(e);

    if(dragging){
        restoreDrawingSurface();
        if(guidewires){
            drawGuidewires(mousedown.x,mousedown.y);
        }
    }

};

canvas.onmouseup = function(e){
    restoreDrawingSurface();
}
