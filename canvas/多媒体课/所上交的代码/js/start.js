var canvas = document.createElement('canvas');
var backgroundContainer = document.getElementById("backgroundContainer");
var avengersMp3 = document.getElementById("avengers");

backgroundContainer.appendChild(canvas);
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.left = "0";
canvas.style.top = "0";
// context.fillRect(0, 0, canvas.width, canvas.height);

var pair3RingRotateAnimate = new Pair3RingRotateAnimate(1000, 150, 35, 5, "#fff");
var pair3RingRotateAnimate2= new Pair3RingRotateAnimate(1000, 150, 35, 5, "#FF6699");
var ringImage = new RingImage({x: 0, y: 0}, 150, 35);
var scaleRingAnimate = new ScaleAnimate(ringImage, 1000);
var titleInAnimate = new TextInAnimate("zjvivi final", 300, 70);
var firstBGImage = new Image();
var firstBGText = new Image();
var secondBGText = new Image();
var secondBGImage = new Image();
firstBGImage.src = "./images/startTranslate.jpg";
firstBGText.src = "./images/firstBG.png";
secondBGImage.src = "./images/occupyVillages.jpg";
secondBGText.src = "./images/secondBG.png";

pair3RingRotateAnimate2.draw();
window.onclick=function(){
    // avengersMp3.volume = 0;
        avengersMp3.play();

    requestNextAnimationFrame(main);
};


var step1 = false
    , step2 = false
    , step3 = false
    , step4 = false
    , step5 = false
    , step6 = false
    , step7 = false
    , stepFirstBackground = false
    , stepFirInToOut = false;

var flag1 = true,
    flag2 = true,
    flag3 = true,
    flag4 = true,
    fadeOut1 = true,
    fadeOut2 = true,
    fadeOut3 = true;



function main() {
    if (avengersMp3.paused) {
        avengersMp3.volume = 0.4;
        // avengersMp3.play();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillRect(0, 0, canvas.width, canvas.height);
    step1 = pair3RingRotateAnimate.draw();
    if (step1) step2 = scaleRingAnimate.draw();
    if (step2) {
        if (titleInAnimate.inOut === false) {
            step3 = titleInAnimate.drawIn();
            if (step3) {
                titleInAnimate.resetAttribute();
            }
        } else {
            step4 = titleInAnimate.drawOut();

        }
    }
    if (step4&&flag3) {
        if (flag2) {
            context.globalAlpha = 0;
            flag2 = false;
        }
        if (!step5) {
            step5 = fadeInImage()==true?true:false;
        }
        else {
            setTimeout(fadeOutImage1,5000);
        }
        context.drawImage(firstBGImage, canvas.width / 2 - firstBGImage.width / 2, 50);
        context.drawImage(firstBGText, canvas.width / 2 - firstBGText.width / 2, 50 + firstBGImage.height + 35);
    }
    if(step6){
        if(flag3){
            context.globalAlpha = 0;
            flag3 = false;
        }
        if (!step7) {
            step7 = fadeInImage()==true?true:false;
        }
        else {
            setTimeout(fadeOutImage2,5000);
        }
        context.drawImage(secondBGImage, canvas.width / 2 - firstBGImage.width / 2, 50);
        context.drawImage(secondBGText, canvas.width / 2 - firstBGText.width / 2, 50 + firstBGImage.height + 35);
    }

    if (fadeOut3){
        requestNextAnimationFrame(main);
    }
    else{
        oprarteRedArmy();
    }
}


function fadeInImage() {
    console.log(context.globalAlpha);
    console.log(context.globalAlpha.toFixed(4)<1);
    if (context.globalAlpha < 1) {
        context.globalAlpha += 0.004;
        context.globalAlpha = context.globalAlpha.toFixed(4);
    }
    else {
        return true;
    }
}

function fadeOutImage1() {
    if(fadeOut1){
        if (context.globalAlpha > 0) {
        context.globalAlpha -= 0.004;
        context.globalAlpha = context.globalAlpha.toFixed(4);
        }
        else{
            step6 = true;
            fadeOut1 = false;
        }
    }

}

function fadeOutImage2() {
    console.log("else");
    if(fadeOut2){
        if (context.globalAlpha > 0) {
        context.globalAlpha -= 0.004;
        context.globalAlpha = context.globalAlpha.toFixed(4);
        }
        else{
            step7 = true;
            fadeOut2 = false;
            fadeOut3 = false;
        }
    }

}

/**
 * 绘制旋转环形动画
 */
function Pair3RingRotateAnimate(duration, radius, ringWidth, speed, color) {

    this.startTime = null;
    this.radius = radius ? radius : 150;
    this.ringWidth = ringWidth ? ringWidth : 25;
    this.color = color ? color : "#fff";

    this.rotateAngle = 0;
    this.speed = speed ? speed : 3;
    var ANGLE = Math.PI * 2;
    var interval = 45;
    this.cnt = 0;
    this.plus = 1;
    this.finish = false;

    this.draw = function () {
        if (this.finish) return true;

        var centerPoint = center();
        if (!this.startTime) this.startTime = Date.now();
        context.save();
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.lineWidth = this.ringWidth;

        // 旋转画布
        context.translate(centerPoint.x, centerPoint.y);
        this.rotateAngle = (this.rotateAngle + this.speed) % 360;
        context.rotate(ANGLE * (this.rotateAngle / 360));

        context.beginPath();
        context.arc(0, 0, this.radius, ANGLE * ((50 - this.cnt) / 360), ANGLE * ((100 + this.cnt) / 360));
        context.stroke();
        context.closePath();

        context.beginPath();
        context.arc(0, 0, this.radius, ANGLE * ((170 - this.cnt) / 360), ANGLE * ((220 + this.cnt) / 360));
        context.stroke();
        context.closePath();

        context.beginPath();
        context.arc(0, 0, this.radius, ANGLE * ((290 - this.cnt) / 360), ANGLE * ((340 + this.cnt) / 360));
        context.stroke();
        context.closePath();

        if (Date.now() - this.startTime >= duration) {
            if (this.cnt > interval) {
                this.cnt = interval;
                this.finish = true;
            }
            else {
                this.cnt++;
            }
        }
        // if(this.cnt >  interval) this.plus = -1;
        // if(this.cnt < 0) this.plus = 1;
        // this.cnt = this.cnt + this.plus;
        context.restore();

    };

}

/**
 * 绘制带加速放大的
 * @param drawer 绘制对象
 */
function ScaleAnimate(drawer, duration, delay) {
    this.plus = -0.02;
    this.a = 0.007;
    this.scale = 1;
    this.duration = duration ? duration : 3000;
    this.delay = delay ? delay : 0;
    this.drawer = drawer;
    this.finish = false;

    this.startedTime = null;
    this.costTime = 0;
    // 绘制
    this.draw = function () {
        if (this.finish) return true;
        if (this.startedTime == null) this.startedTime = Date.now();
        this.costTime = Date.now() - this.startedTime;
        // 延迟时间
        if (this.costTime > (this.duration + this.delay)) this.finish = true;
        else if (this.costTime > this.delay) {
            // 缩小
            if (this.scale < 0.9) this.plus = -this.plus;
            this.scale += this.plus;
            // 带加速的放大
            if (this.scale > 1) {
                this.scale += this.a;
                this.a = this.a + 0.02;
            }

        }
        // 缩放绘制
        enlarge(this.scale, this.drawer);
    };
}

/**
 * 放大圆环
 */
function enlarge(scale, drawer) {
    var centerPoint = center();
    context.save();
    context.translate(centerPoint.x, centerPoint.y);
    context.scale(scale, scale);
    drawer.draw();
    context.restore();
}

/**
 * 绘制环形
 */
function RingImage(centerPoint, radius, ringWidth, color) {

    this.ringWidth = ringWidth;
    this.color = color ? color : "#fff";
    this.centerPoint = centerPoint;
    this.radius = radius;

    this.draw = function () {
        context.save();
        context.strokeStyle = this.color;
        context.lineWidth = this.ringWidth;
        context.beginPath();
        context.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        context.restore();
    };
}

/**
 * 文本淡入淡出效果
 */
function TextInAnimate(text, duration, fontSize, x, y) {
    this.alpha = 0;
    duration = duration ? duration : 300;
    this.fontSize = fontSize;
    this.alphaInterval = 1 / duration;
    this.centerPoint = center();
    this.finish = false;
    this.text = text ? text : "zjvivi final";
    this.inOut = false;
    this.x = x;
    this.y = y;

    this.drawIn = function (drawCenterPoint) {
        drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.centerPoint;
        // console.log(drawCenterPoint);
        context.save();
        if (this.alpha > 1) this.finish = true;
        else {
            context.globalAlpha = this.alpha;
            this.alpha += this.alphaInterval;
        }
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold " + this.fontSize + "px Arial";
        context.fillText(this.text, drawCenterPoint.x, drawCenterPoint.y);
        context.restore();
        return this.finish;
    };

    this.resetAttribute = function () {
        this.finish = false;
        this.inOut = true;
        return true;
    };
    this.drawOut = function (point) {
        drawPoint = point ? point : this.centerPoint;
        context.save();
        if (this.alpha < 0.05) {
            this.finish = true;
            return true;
        } else {
            context.globalAlpha = this.alpha;
            this.alpha -= this.alphaInterval;
            // console.log(this.alpha);
        }
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold " + this.fontSize + "px Arial";
        context.fillText(this.text, drawPoint.x, drawPoint.y);
        context.restore();
        return this.finish;
    };
}


function oprarteRedArmy() {
    $("#redArmyShow").fadeIn(5000);
    setTimeout(function () {
        $("#redArmyShow").fadeOut(5000, function () {
            window.location.href = "./html/index.html"
        });
    }, 3000)
}


/**
 * 获取中心点
 */
function center() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2
    }
}


/**
 * 窗口自适应
 */
window.addEventListener('resize', function () {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
});
