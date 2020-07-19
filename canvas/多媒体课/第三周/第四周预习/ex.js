var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width,
    height = canvas.height,
    radius = width / 2,
    temp = width / 200;

function drawCircleAndNumber() {

    context.save();

    context.translate(radius, radius);

    context.beginPath();

    context.lineWidth = 5 * temp;

    context.arc(0, 0, radius - context.lineWidth / 2, 0, Math.PI*2 , false);

    context.stroke();

    var numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    numbers.map(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (radius - 22 * temp);
        var y = Math.sin(rad) * (radius - 22 * temp);
        switch (i) {
            case 0:
                context.fillStyle = '#FF44AA ';
                break;
            case 1:
                context.fillStyle = '#FF3333 ';
                break;
            case 2:
                context.fillStyle = '#FFAA33 ';
                break;
            case 3:
                context.fillStyle = '#33FF33 ';
                break;
            case 4:
                context.fillStyle = '#33FFDD ';
                break;
            case 5:
                context.fillStyle = '#33FFFF ';
                break;
            case 6:
                context.fillStyle = '#33CCFF ';
                break;
            case 7:
                context.fillStyle = '#5599FF';
                break;
            case 8:
                context.fillStyle = '#5555FF  ';
                break;
            case 9:
                context.fillStyle = '#9955FF  ';
                break;
            case 10:
                context.fillStyle = '#B94FFF  ';
                break;
            case 11:
                context.fillStyle = '#FF3EFF ';
                break;

        }
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 18 * temp + 'px Arial';
        context.fillText(number, x, y);

        // context.restore();
        
    });

    for (var i = 0; i < 60; i++) {//画外围分钟的刻度
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (radius - 10 * temp);
        var y = Math.sin(rad) * (radius - 10 * temp);
        context.beginPath();
        if (i % 5 == 0) {
            context.fillStyle = '#000000';
        } else {
            context.fillStyle = '#cccccc';
        }
        context.arc(x, y, temp*1.5, Math.PI * 2, false);
        context.fill();
        context.closePath();  
    }
    context.restore();
    
    
    
}
function drawRadialGradient() {

    context.save();
    context.beginPath();
    context.translate(radius, radius);
    context.arc(0, 0, radius - context.lineWidth / 2, 2*Math.PI, false);
    
    var grd = context.createRadialGradient(0, 0, temp, 0, 0, radius - context.lineWidth / 2);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.3, "#CCBBFF");
    grd.addColorStop(0.6, "#FFCCCC");
    grd.addColorStop(1, "#FFFF33");
    context.fillStyle = grd;
    // context.fillRect(0,0,100,100);
    context.fill();
    context.restore();
    

}
function drawHour(hour,minute) {
    
    context.save();
    context.translate(radius, radius);
    context.beginPath();
    var hourAngle = 2 * Math.PI / 12 * hour;
    var minuteAngle = 2 *Math.PI/12/60*minute;
    context.rotate(hourAngle+minuteAngle);
    context.lineWidth= 5*temp;
    context.moveTo(0, 15* temp);
    context.lineTo(0, -radius/3-10);
    context.lineCap='round';    
    context.stroke();   
    context.restore();
     
}
function drawMinute(minute) {
    context.save();
    context.translate(radius, radius);
    context.beginPath();
    var minuteAngle = 2*Math.PI/60*minute;
    context.rotate(minuteAngle);
    context.lineWidth = 3 * temp;
    context.moveTo(0,15*temp);
    context.lineTo(0, -radius/2 - 50);
    context.lineCap='round';
    context.stroke();
    context.restore();    
}
function drawSecond(second) {
    context.save();
    context.translate(radius, radius);
    context.beginPath();
    var secondAngle = 2*Math.PI/60*second;
    context.rotate(secondAngle);
    context.lineWidth=2*temp;
    context.moveTo(0, 15 * temp);
    context.lineTo(0,-radius/6*5);
    context.lineCap='butt';
    // context.fillStyle='red';
    // context.fill();
   context.strokeStyle='red';
   context.stroke();
   
    context.restore();
    
}

function drawCenter() {
    context.save();
    context.beginPath();
    context.translate(radius, radius);
    context.arc(0, 0, temp, Math.PI * 2, false);//画钟表的中心点
    context.fillStyle = 'white';
    context.fill();
    context.restore();
}



function run() {
    
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawRadialGradient();
    drawCircleAndNumber();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawCenter();
    setTimeout(run,1000);
    
}

run();

