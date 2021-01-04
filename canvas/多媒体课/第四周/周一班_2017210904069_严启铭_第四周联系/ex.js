var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width,
height = canvas.height;
radius = width/2;

function drawCircle() {

    context.save();

    context.translate(radius, radius);

    context.beginPath();

    context.moveTo(0,0);
    context.lineTo(width / 3,0 );
    context.arc(0, 0, width / 3, 0, Math.PI * 2/8, false);
    context.lineTo(0,0);
    var grd = context.createLinearGradient(0, 0, width/2,height/2);
    grd.addColorStop(0, 'red');
    grd.addColorStop(0.13, 'orange');
    grd.addColorStop(0.26, 'yellow');
    grd.addColorStop(0.39, 'green');
    grd.addColorStop(0.52, 'blue');
    grd.addColorStop(0.6, 'cyan');
    grd.addColorStop(0.8, 'purple');
    
    context.fillStyle = "orange";
    context.fill();
    context.stroke();
    context.restore();
}

function drawText(){
    context.font='18px Arial';
    var nTextWidth = context.measureText("扇形").width;
    var x = canvas.width - nTextWidth;
    var y = height - 5;
    context.fillText("扇形", x, y);
}

drawCircle();
drawText();