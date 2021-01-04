var img = new Image();
var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
var battlefieldClassicAudio = document.getElementById("battlefieldClassic");
var indexInfo = document.getElementById("indexInfo");
var gameStart = document.getElementById("gameStart");
var sprites = [],
    bullets = [],
    guoArmyNum = 1,
    count = 0,
    user = null,
    bulletSpeed = 17,
    redArmyWidth = 32,
    redArmyHeight = 32,
    guoArmyWidth = 32,
    guoArmyHeight = 32,
    bulletWidth = 15,
    bulletHeight = 30;
var redArmy = [
    {x: 0, y: 0, w: 32, h: 32},
    {x: 0, y: 0, w: 32, h: 32},
    {x: 25, y: 0, w: 32, h: 32},
    {x: 25, y: 0, w: 32, h: 32}
];
Array.prototype.foreach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback.apply(this[i]);
    }
};
var stage = {
    init: function () {
        var current = this;
        indexInfo.style.display = "block";
        gameStart.addEventListener("click", function () {
            if ((battlefieldClassicAudio.paused || battlefieldClassicAudio.ended)) {
                battlefieldClassicAudio.play();
            }
            indexInfo.style.display = "none";
            current.addAllElement();
        }, false);
    },
    userDead: function () {
        while (context.globalAlpha > 0) {
            context.globalAlpha -= 0.0002;
            context.globalAlpha = context.globalAlpha.toFixed(4);
        }
        $(".setBackground").fadeOut(3000, function () {
            console.log("out");
            window.location.href="./end.html";
            battlefieldClassicAudio.ended;
        })
        // window.location.href
    },
    addAllElement: function () {

        for (var i = 0; i < 200; i++) {//场上最多存在200个精灵对象子弹
            var bullet = new Sprite("bullet", bulletPainter, bulletBehavior);
            bullet.isSeen = false;
            bullets.push(bullet);
        }

        for (let i = 0; i < guoArmyNum; i++) {
            let x = Math.random() * (canvas.width - 2 * redArmyWidth) + redArmyWidth;//jieshi
            let y = Math.random() * canvas.height - canvas.height;
            let guoArmy = new Sprite("guoArmy", guoArmyPainter, guoArmyBehavior);
            guoArmy.x = x;
            guoArmy.y = y;
            sprites.push(guoArmy);
        }

        img.src = "../images/redshot.png";
        user = new Sprite("redArmy", new SpriteSheetPainter(redArmy, img), redArmyBehavior);
        user.x = canvas.width / 2;
        user.y = canvas.height - (redArmyHeight / 2 + 10);
        sprites.push(user);
    },

    update: function () {
        if ((battlefieldClassicAudio.paused || battlefieldClassicAudio.ended)) {
            battlefieldClassicAudio.play();
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        bullets.foreach(function () {
            var bullet = this;
            sprites.foreach(function () {
                var guoArmy = this;
                if (guoArmy.name === "guoArmy" && guoArmy.isSeen && bullet.isSeen&&bullet.isEnemy) {//红军打敌人，当子弹命中减去伤害血量
                    let distance = Math.sqrt(Math.pow(bullet.x - guoArmy.x, 2) + Math.pow(bullet.y - guoArmy.y, 2));
                    if (distance < (redArmyWidth / 2 + bullet.width / 2)) {
                        bullet.isSeen = false;
                        guoArmy.initAttr -= 100;
                        if (guoArmy.initAttr <= 0) {
                            guoArmy.isSeen = false;
                            count += guoArmy.level ;
                        }
                    }
                }
            });
            if (bullet.isSeen) {
                if (!bullet.isEnemy && user.isSeen) {//敌人的子弹
                    let distance = Math.sqrt(Math.pow(bullet.x - user.x, 2) + Math.pow(bullet.y - user.y, 2));
                    if (distance < (redArmyWidth / 2 + 6)) {//设定子弹最半径为7
                        user.isSeen = false;
                        bullet.isSeen = false;
                        stage.userDead();
                    }
                }
                this.paint();
            }
        });
        sprites.foreach(function () {
            if (this.name === "guoArmy" && user.isSeen) {
                var distance = Math.sqrt(Math.pow(this.x - user.x, 2) + Math.pow(this.y - user.y, 2));
                if (distance < redArmyWidth/2+guoArmyWidth/2) {//红军与国军碰撞检测
                    user.isSeen = false;
                    this.isSeen = false;
                    stage.userDead(user);
                }
            }
            this.paint();
        });
    },
    loop: function () {//requestNextAnimationFrame(fun=>loop)循环  动画
        var current = this;
        this.update();//stage update 不断更新场景
        requestNextAnimationFrame(function () {
            current.loop();   //自我循环
        });
    },
    start: function () {
        this.init();//开始时候先对场景初始化
        this.loop();//初始化完成后不断循环调用
    }
};

function getKeyDown(e, isTrue) {
    switch (e.keyCode) {
        case 37:
            user.moveLeft = isTrue;
            break;
        case 38:
            user.moveUp = isTrue;
            break;
        case 39:
            user.moveRight = isTrue;
            break;
        case 40:
            user.moveDown = isTrue;
            break;
        case 88:
            user.fire = isTrue;
            break;
        case 90:
            user.turnLeft = isTrue;
            break;
        case 67:
            user.turnRight = isTrue;
            break;
    }
}
window.onkeydown = function (e) {
    getKeyDown(e, true);
};
window.onkeyup = function (e) {
    getKeyDown(e, false);
};

stage.start();
