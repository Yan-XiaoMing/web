var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width,canvas.height);


var step1 = false,
    step2 = false,
    step3 = false,
    step4 = false;

var start1 = false,
    start2 = false,
    start3 = false,
    start4 = false;

var imyu = new Image();
imyu.src = "./image/yu.jpeg";

var imfoot = new Image();
imfoot.src = "./image/tizuqiu.jpeg";

var imrun = new Image();
imrun.src = "./image/run.jpeg";

var imwinner = new Image();
imwinner.src = "./image/dalishi.jpeg";

var runWidth, runHeight, yuWidth, yuHeight, footWidth, footHeight;

var drawRun = new DrawRun(150);
var drawYu = new DrawYu(150);
var drawFootBall = new DrawFootBall(150);
var drawWinner = new DrawWinner(150);



/**
 * 颜色数组
 */
var colorArray = [
    '#97A7F8',
    '#C957CA',
    '#76E2FE',
    '#9933FF',
    '#99FF66'
];


/**
 * 鼠标位置
 */
var mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}


/**
 * 辅助函数
 */
function randomIntFromRange(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function randomDoubleFromRange(low, high) {
    return Math.random() * (high - low + 1) + low;
}

function randomColors(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}



/**
 * 绘图部分
 */

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.theta = randomDoubleFromRange(0, 2 * Math.PI);
    this.speed = 0.05;
    this.distance = randomIntFromRange(30, 50);
    this.dragSpeed = 0.05;
    this.lastMouse = {
        x: x,
        y: y
    };

    this.draw = function (lastPosition) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }

    /**
     * 拖拽
     */

    this.update = function () {
        let lastPosition = {
            x: this.x,
            y: this.y
        }

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.dragSpeed;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.dragSpeed;

        this.x = this.lastMouse.x + Math.cos(this.theta) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.theta) * this.distance;

        this.theta += this.speed;
        this.draw(lastPosition);
    }
}

let particles;

function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        let color = randomColors(colorArray);
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, 2.5, color));
    }
}

function animate() {
    // requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i of particles) {
        i.update();
    }
}

function DrawRun(duration, isClean) {
    this.imgAlpha = 0;
    duration = duration ? duration : 150;
    this.alphaInterval = 1 / duration;
    this.getPoint = getCenter();
    this.finish = false;
    this.isClean = false;
    this.Clean = function () {
        this.isClean = true;
    };
    this.draw = function (drawCenterPoint) {
        if (this.finish && this.isClean) {
            return true;
        }
        drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.getPoint;

        context.save();
        if (this.imgAlpha > 1) this.finish = true;
        else {
            context.globalAlpha = this.imgAlpha;
            this.imgAlpha += this.alphaInterval;
        }
        // console.log(this.imgAlpha);

        var pattern = context.createPattern(imrun, "no-repeat");
        context.fillStyle = pattern;
        context.translate(0, 86);
        context.fillRect(0, 0, imrun.width, imrun.height);
        // console.log(imrun.width, imrun.height);

        context.restore();
        return this.finish;
    };
}

function DrawYu(duration, isClean) {
    this.imgAlpha = 0;
    duration = duration ? duration : 150;
    this.alphaInterval = 1 / duration;
    this.getPoint = getCenter();
    this.finish = false;
    this.isClean = false;
    this.Clean = function () {
        this.isClean = true;
    };
    this.draw = function (drawCenterPoint) {
        if (this.finish && this.isClean) {
            return true;
        }
        drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.getPoint;
        context.save();
        if (this.imgAlpha > 1) this.finish = true;
        else {
            context.globalAlpha = this.imgAlpha;
            this.imgAlpha += this.alphaInterval;
        }
        var pattern = context.createPattern(imyu, "repeat");
        context.fillStyle = pattern;
        context.translate(runWidth, 86);
        context.fillRect(0, 0, imyu.width, imyu.height);
        context.restore();
        return this.finish;
    };
}

function DrawFootBall(duration, isClean) {
    this.imgAlpha = 0;
    duration = duration ? duration : 150;
    this.alphaInterval = 1 / duration;
    this.getPoint = getCenter();
    this.finish = false;
    this.isClean = false;
    this.Clean = function () {
        this.isClean = true;
    };
    this.draw = function (drawCenterPoint) {
        if (this.finish && this.isClean) {
            return true;
        }
        drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.getPoint;
        context.save();
        if (this.imgAlpha > 1) this.finish = true;
        else {
            context.globalAlpha = this.imgAlpha;
            this.imgAlpha += this.alphaInterval;
        }
        // console.log(this.imgAlpha);
        var pattern = context.createPattern(imfoot, "no-repeat");
        context.fillStyle = pattern;
        context.translate(runWidth+yuWidth, 86);
        context.fillRect(0, 0, imfoot.width, imfoot.height);
        // console.log(imyu.width, imyu.height);
        context.restore();
        return this.finish;
    };
}
function DrawWinner(duration, isClean) {
    this.imgAlpha = 0;
    duration = duration ? duration : 150;
    this.alphaInterval = 1 / duration;
    this.getPoint = getCenter();
    this.finish = false;
    this.isClean = false;
    this.Clean = function () {
        this.isClean = true;
    };
    this.draw = function (drawCenterPoint) {
        if (this.finish && this.isClean) {
            return true;
        }
        drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.getPoint;
        context.save();
        if (this.imgAlpha > 1) this.finish = true;
        else {
            context.globalAlpha = this.imgAlpha;
            this.imgAlpha += this.alphaInterval;
        }
        // console.log(this.imgAlpha);
        var pattern = context.createPattern(imwinner, "no-repeat");
        context.fillStyle = pattern;
        context.translate(runWidth+yuWidth+footWidth+50, 86);
        context.fillRect(0, 0, imwinner.width, imwinner.height);
        // console.log(imyu.width, imyu.height);
        context.restore();
        return this.finish;
    };
}

function getCenter() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2
    }
}

/**
 * 事件监听
 */
window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

imrun.onload = function () {
    runWidth = imrun.width;
    runHeight = imrun.height;

    start1 = true;
    console.log("run就绪");
    if (start1 && start2&&start3) {
        console.log("run");

        window.requestAnimationFrame(main);
    }
};
imyu.onload = function () {
    yuWidth = imyu.width;
    yuHeight = imyu.height;
    start2 = true;
    console.log("yu就绪");

    if (start1 && start2&&start3) {
        console.log("yu");
        window.requestAnimationFrame(main);
    }
}
imfoot.onload = function () {
    footWidth = imyu.width;
    footHeight = imyu.height;
    start3 = true;
    console.log("zu就绪");

    if (start1 && start2&&start3) {
        console.log("zu");
        window.requestAnimationFrame(main);
    }
}
imwinner.onload = function(){
    start4 = true;
    console.log("winner就绪");
    if (start1 && start2&&start3&&start4) {
        console.log("winner");
        window.requestAnimationFrame(main);
    }
}


function drawCircle() {
    context.beginPath();
    context.arc(0, 0, 100, 0, Math.PI * 2, true);
    context.stroke();
}

init();

function main() {
    context.clearRect(0, 0, context.width, context.height);
    context.fillStyle='white';
    context.fillRect(0, 0, context.width, context.height);

    // a.draw();
    step1 = drawRun.draw();
    console.log(step1);
    if (step1) {
        step2 = drawYu.draw();
        // console.log("画羽");
        // console.log("step3: "+step3);
    }
    if(step2){
        step3 = drawFootBall.draw();
    }
    if(step3){
        step4 = drawWinner.draw();
    }
    animate();

    window.requestAnimationFrame(main);
}
// drawCircle();