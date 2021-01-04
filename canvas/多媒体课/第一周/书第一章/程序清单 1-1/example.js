var canvas = document.getElementById("canvas");
var test = document.getElementById("testjs");
function myHandler(event) {
    console.log(event.target);
}
test.onclick = myHandler;
/**@type{CanvasRenderingContext2D}*/
var context = canvas.getContext('2d');
context.font = "38pt Arial";
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';
context.fillText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);
context.strokeText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);