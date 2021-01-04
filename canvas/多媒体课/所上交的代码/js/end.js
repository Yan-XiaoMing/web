var canvas = document.createElement('canvas');
var backgroundContainer = document.getElementById("backgroundContainer");
var ronghuaMp3 = document.getElementById("ronghua");

canvas.style.zIndex = "-1";

backgroundContainer.appendChild(canvas);
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.left = "0";
canvas.style.top = "0";
context.fillRect(0, 0, canvas.width, canvas.height);

var endtext1 = new Image();
var endtext2 = new Image();
var icon = new Image();
var china = new Image();
endtext1.src = "../images/endtext1.png";
endtext2.src = "../images/endtext2.png";
icon.src = "../images/icon.jpg";
china.src = "../images/china.jpg";

window.onclick = function () {

    ronghuaMp3.play();
    setTimeout( function () {
        // console.log("1")
        window.requestAnimationFrame(main);
    },10000);

};


var step1 = true
    , step2 = false
    , step3 = false
    , step4 = false
    , step5 = false
    , step6 = false
    , step7 = false
    , step8 = false;


var flag1 = true,
    flag2 = true,
    flag3 = true,
    flag4 = true,
    flag5 = true,
    fadeOut1 = true,
    fadeOut2 = true,
    fadeOut3 = true,
    fadeOut4 = true;


function main() {
    if (ronghuaMp3.paused) {
        ronghuaMp3.volume = 0.4;

    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (step1 && flag3) {
        if (flag2) {
            context.globalAlpha = 0;
            flag2 = false;
        }
        if (!step2) {
            step2 = fadeInImage() === true;
        } else {
            setTimeout(fadeOutImage1, 15000);
        }
        context.drawImage(endtext1, canvas.width / 2 - endtext1.width / 2, 10);

    }
    if (step3 && flag4) {
        if (flag3) {
            context.globalAlpha = 0;
            flag3 = false;
        }
        if (!step4) {
            step4 = fadeInImage() === true;
        } else {
            setTimeout(fadeOutImage2, 15000);
        }
        context.drawImage(endtext2, canvas.width / 2 - endtext2.width / 2, 30);
    }
    if (step5 && flag5) {
        if (flag4) {
            context.globalAlpha = 0;
            flag4 = false;
        }
        if (!step6) {
            step6 = fadeInImage() === true;
        } else {
            setTimeout(fadeOutImage3, 6000);
        }

        context.drawImage(china, 115, 150, 600, 400);
        context.drawImage(icon, 800, 150, 600, 400);
    }

    if (fadeOut4) {
        window.requestAnimationFrame(main);
    }
    else{
        // var temp = 0.4;
        // while (ronghuaMp3.volume>=0){
        //     var temp = 80;
        //     while(temp>=0){
        //         temp-=1;
        //     }
        //     ronghuaMp3.volume -=0.1;
        // }
        window.location.href="../html/fontshow.html";
    }

}


function fadeInImage() {
    if (context.globalAlpha < 1) {
        context.globalAlpha += 0.001;
        context.globalAlpha = context.globalAlpha.toFixed(4);
    } else {
        return true;
    }
}

function fadeOutImage1() {
    if (fadeOut1) {
        if (context.globalAlpha > 0) {
            context.globalAlpha -= 0.02;
            context.globalAlpha = context.globalAlpha.toFixed(4);
        } else {
            step3 = true;
            fadeOut1 = false;
        }
    }

}

function fadeOutImage2() {
    console.log("else");
    if (fadeOut2) {
        if (context.globalAlpha > 0) {
            context.globalAlpha -= 0.02;
            context.globalAlpha = context.globalAlpha.toFixed(4);
        } else {
            step5 = true;
            fadeOut2 = false;
        }
    }

}

function fadeOutImage3() {
    if (fadeOut3) {
        if (context.globalAlpha > 0) {
            context.globalAlpha -= 0.002;
            context.globalAlpha = context.globalAlpha.toFixed(4);
        } else {
            step7 = true;
            fadeOut3 = false;
            fadeOut4 = false;
        }
    }

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
