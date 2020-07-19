/*
 Function  :爱的战士游戏
 Author    :Quangy
 Build_Date:2016-12-22
 Version   :1.30
 */

//1. 公共变量声明块........................................................

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");


var objAudioOfBackGround = document.createElement("audio");
var objAudioOfCrash = document.createElement("audio");
var objAudioOfCrashPig = document.createElement("audio");
var objAudioOfSpeedUp = document.createElement("audio");
var objAudioOfWin = document.createElement("audio");
var objAudioOfFail = document.createElement("audio");
var objAudioOfBefore = document.createElement("audio");


var PIG_HP = 10,                                    // 生命值
    CHIEF_HP = 10;

var IMAGE_LENTH = 50;                                // 正方形图片每张边长 px
var RECT_HEIGHT = 70;                                // 单行图片每张高度 px


var DISTANCE = 300;                                 // A 与 B 开始时候的距离

var PIG_SPEED = 400;                                // 猪的速度
var CHIEF_SPEED = 210;                              // 酋长的速度
var WARRIOR_SPEED = 200;                            // 战士速度
var REPLE_SPEED = 1000;                             // 退后速度
var SILL_MINES = 30;                                // 使用技能后每次减少的速度
var SPEED_UP_MIX = 1000;                            // 加速最大速度


var STOP_TIME = 90;                                 // AB停止运动时间
var UNCONTROLL_TIME = 800;                          // BC 不可控制时间
var SILL_COOL_DOWN = 7 * 1000;                      // 加速技能冷却时间

var STOP_PERCENT = 0.6;                             // B 与 C触碰后百分比时间停止运动
var large = 3.5;                                    // 放大倍数

var currentFps = 0;                                 // 当前帧速率
var lastAnimation = 0;                              // 上一次绘制的时间
var AnimationInterval = 0;                          // 动画播放间隔
var ACTION_INTERVAL = 150;                          // 更新动作间隔


var startTime = 0;                                  // 开始时间
var endTime = 0;                                    // 结束时间

// 按键记录表
var keyLeft = false,
    keyRight = false,
    keyUp = false,
    keyDown = false;

var bIsStart = false;                               // 未开始
var bIsEnd = false;                                 // 结束
var bIsFirstTime = true;                            // 第一次
var bIsOpeningEnd = false;                          // 播放开场动画结束
var bIsHelp = false;                                // 播放帮助

var titlePosition = undefined;                      // 标题位置

var helpbox = undefined;                            // 帮助教程区域对象
var startbox = undefined;
var restartbox = undefined;

var nextbox = undefined;
var leapbox = undefined;
var prevebox = undefined;

var helpIndex = 0;

var background = new Image();
var title = new Image();

var startButton = new Image();
var restartButton = new Image();

var groundDetal = new Image();

var help = new Image();
var leap = new Image();
var next = new Image();
var preve = new Image();

var change = new Image();
var startGame = new Image();
var helpImg = [];

/**
 * 技能对象
 * @type {{lastUse: number, SKILL_COOL: number, SPEED_UP: number, isAble: sill.isAble, use: sill.use, addSpeed: sill.addSpeed}}
 */
var sill = {
    lastUse: 0,             // 上次使用
    SKILL_COOL: SILL_COOL_DOWN,  // 技能冷却时间
    SPEED_UP: 0,            // 没帧加速度
    /**
     * 技能是否可用
     * @returns {boolean}
     */
    isAble: function () {
        return ((+new Date) - this.lastUse) >= this.SKILL_COOL
    },
    /**
     * 使用技能
     */
    use: function () {
        if (this.isAble()) {
            this.lastUse = (+new Date);
            this.SPEED_UP = SPEED_UP_MIX;
            // 播放音效
            objAudioOfSpeedUp.play();
        }
    },
    /**
     * 返还加速
     * @returns {number}
     */
    addSpeed: function () {
        if (this.SPEED_UP > 0) {
            this.SPEED_UP -= SILL_MINES;
        }
        else {
            this.SPEED_UP = 0;
        }
        return this.SPEED_UP;
    }

    // drawSill: function (x, y) {
    //
    // }
};

/**
 * 动作执行构造器
 * @constructor
 */
var ActionExecute = function (name, model) {
    this.lastUpdate = 0;
    this.name = name || "";
    this.bIsEffect = model || false;
    this.execute = function (sprite, ctx, time) {
        var interval = this.bIsEffect ? ACTION_INTERVAL * 2 : ACTION_INTERVAL;
        if (time - this.lastUpdate > interval) {
            this.lastUpdate = time;
            sprite.painter.advance(sprite, this.bIsEffect);
        }
    }
};


/**
 * 移动执行器
 * @type {{execute: moveOfSprite.execute}}
 */
var moveOfSprite = {
    execute: function (sprite, ctx, time) {
        // console.log(sprite.name + "velocityX: " + sprite.velocityX);
        if (sprite.velocityX) sprite.left += sprite.velocityX;
        if (sprite.velocityY) sprite.top += sprite.velocityY;

        // 动画跟踪
        if (sprite.name === "pig") {
            objTouch.left = sprite.left;
            objTouch.top = sprite.top;
        } else if (sprite.name === "chief") {
            objWait.left = sprite.left;
            objWait.top = sprite.top;
        }
        else if (sprite.name === "warrior") {
            objLove.left = sprite.left;
            objLove.top = sprite.top;
        }
    }
};

/**
 * 关系型 工具类
 * @returns {RelationDeal}
 * @constructor
 */
var RelationDeal = function (bIsControllable) {
    this.lastCrashTime = -1;    // 上次撞击时间
    this.bIsControllable = bIsControllable || false; // 是否是可控制对象


    /**
     * 自动撞击处理 与 坐标位移量更新
     * @param spriteA   自动奔跑精灵
     * @param spriteB   自动追击精灵
     * @param now       时间
     */
    this.updateOfAB = function (spriteA, spriteB, now) {
        // 碰撞后忽略碰撞
        if (this.lastCrashTime < 0 && isCrashObject(spriteA, spriteB)) {
            this.lastCrashTime = now;
            spriteA.vector.x = spriteB.vector.x;
            spriteA.vector.y = spriteB.vector.y;
            // 改变为击退方向
            spriteB.vector.x *= -1;
            spriteB.vector.y *= -1;
            // 扣血
            spriteA.objHp.hurt();
            // 播放音效
            objAudioOfCrashPig.play();

            // 播放动画
            objTouch.visible = true;
        }

        if (this.lastCrashTime > 0 && now < this.lastCrashTime + STOP_TIME) {
            // 接触后 将精灵作为一个 A 精灵
            if (isTouchWall(spriteB)) changeVector(spriteB);
            updateDirectionOfA(spriteB, spriteB, REPLE_SPEED);
        }
        else {
            // 未接触 更新
            this.lastCrashTime = -1;
            if (isTouchWall(spriteB)) changeVector(spriteB);
            updateDirectionOfB(spriteA, spriteB);
            objTouch.visible = false;
        }
    };
    /**
     * 主动撞击处理 与 坐标位移量更新
     * @param spriteA   被撞击的精灵
     * @param spriteB   主动撞击的精灵
     * @param now       时间
     * @param relation  被撞击精灵的精灵关系
     */
    this.updateOfBC = function (spriteA, spriteB, now, relation) {

        if (this.bIsControllable) {     // 手动控制
            var angle = jungleMoveDirect();
            var v = WARRIOR_SPEED + sill.addSpeed();
            updateDirectionOfC(spriteB, angle, v);
        }

        // 检测B碰撞后忽略碰撞
        if (relation.lastCrashTime < 0 && this.lastCrashTime < 0 && this.bIsControllable && isCrashObject(spriteA, spriteB)) {
            this.lastCrashTime = now;
            this.bIsControllable = false;
            // 改变为击退方向
            spriteB.vector.x *= -1;
            spriteB.vector.y *= -1;
            spriteA.objHp.hurt();               // 扣血
            objAudioOfCrash.play();             // 播放音效

            objWait.visible = true;
            objLove.visible = true;

        }
        // 两者停止运动
        if (this.lastCrashTime > 0 && now < this.lastCrashTime + UNCONTROLL_TIME * STOP_PERCENT) {
            // 停止运动
            stopRun(spriteA);
            stopRun(spriteB);

        }
        else if (this.lastCrashTime > 0 && now < this.lastCrashTime + UNCONTROLL_TIME) {
            // 退后并且检测碰撞
            if (isTouchWall(spriteB)) changeVector(spriteB);
            updateDirectionOfA(spriteB, spriteB, REPLE_SPEED);
            // objLove.visible = false;
        }
        else {
            // 未接触 更新
            this.lastCrashTime = -1;
            // 回收控制权
            this.bIsControllable = true;
            objLove.visible = false;
            objWait.visible = false;
        }
    };

    return this;
};

/**
 * 通过图片相对位置建立一个图片对象
 * @param imageUrl 图片相对位置
 * @param bIsSingleLine 单行
 * @constructor
 */
var ImagePainter = function (imageUrl, bIsSingleLine) {
    this.image = new Image();	// 新建图片对象
    this.image.src = imageUrl;	// 添加图片地址
    this.cells = [];     // 播放数组
    this.lastIndex = {x: 0, y: 0};
    this.bIsSingleLine = bIsSingleLine || false;
    var q = this;
    /**
     * 图片加载完成后 装载 播放数组
     */
    this.image.onload = function () {
        var i;
        if (bIsSingleLine) {    // 单行动画
            var index = parseInt(q.image.height / RECT_HEIGHT);
            q.cells[0] = new Array(index);
            for (i = 0; i < index; i++) {
                q.cells[0][i] = {
                    x: 0,
                    y: i * RECT_HEIGHT
                }
            }
        } else {
            var col = parseInt(q.image.width / IMAGE_LENTH),
                row = parseInt(q.image.height / IMAGE_LENTH);
            // console.log("col: " + col + "\n" +"row: " + row);
            // 自动化装填数组;
            q.cells = new Array(row);
            for (i = 0; i < row; i++) {
                q.cells[i] = new Array(col);
                for (var j = 0; j < col; j++) {
                    q.cells[i][j] = {
                        x: j * IMAGE_LENTH,
                        y: i * IMAGE_LENTH
                    };
                }
            }
            // console.log(JSON.stringify( q.cells ));
        }
    };

    /**
     * 根据下一个移动方向确定 所选的图片
     * @param sprite
     * @returns {number}
     */
    this.chooseRow = function (sprite) {
        var row = 0;
        var x = sprite.velocityX,
            y = sprite.velocityY;
        if (sprite.painter.cells.length < 4 && sprite.painter.cells[0])  return 0;
        if (x == 0 && y < 0) row = 0;
        else if (x == 0 && y > 0) row = 1;
        else if (x < 0) row = 2;
        else if (x > 0) row = 3;

        return row;
    };
    /**
     * 显示 精灵对象的生命值
     * @param sprite
     */
    this.drawHp = function (sprite) {
        var name = sprite.name;
        if (name === "pig" || name === "chief") {
            ctx.save();
            ctx.rect(sprite.left, sprite.top, IMAGE_LENTH, IMAGE_LENTH);
            ctx.clip();
            var color = "green";
            if (name === "pig")
                color = "green";
            else if (name === "chief")
                color = "red";

            ctx.fillStyle = color;
            ctx.strokeRect(sprite.left, sprite.top, IMAGE_LENTH, IMAGE_LENTH / 5);

            var current = IMAGE_LENTH * (sprite.objHp.hp / sprite.objHp.HP);
            ctx.fillRect(sprite.left, sprite.top, current, IMAGE_LENTH / 5);

            ctx.restore();
        } else if (name === "warrior" && sill.isAble()) {   // 显示技能是否可用
            ctx.save();
            ctx.beginPath();
            ctx.arc(sprite.left + sprite.width - IMAGE_LENTH / 10, sprite.top + IMAGE_LENTH / 10, IMAGE_LENTH / 10, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    };

    this.paint = function (sprite, ctx) {
        if (this.image !== undefined && this.image.complete) {

            // if(this.bIsSingleLine)
            //     cell.this.
            var cell = this.cells[this.lastIndex.x][this.lastIndex.y];
            // 绘制图片
            if (this.bIsSingleLine)
                ctx.drawImage(this.image, cell.x, cell.y, sprite.width, sprite.height, sprite.left, sprite.top,
                    sprite.width * large, sprite.height * large);
            else
                ctx.drawImage(this.image, cell.x, cell.y, sprite.width, sprite.height, sprite.left, sprite.top,
                    sprite.width, sprite.height);
            // 显示 当前生命值
            this.drawHp(sprite);
        }
    };

    /**
     * 更新下一次绘制图片的位置
     * @param sprite
     * @param model
     */
    this.advance = function (sprite, model) {  // 用于更改一些参数 主要用于 execute
        if (model) {    // 播放动画
            this.lastIndex.x = 0;
            this.lastIndex.y = (this.lastIndex.y + 1) % this.cells[0].length;
        }
        else if (sprite.velocityX == 0 && sprite.velocityY == 0) {  // 停止状态
            this.lastIndex.y = 0;
        }
        else {
            // 根据移动方向确定 坐标
            this.lastIndex.x = this.chooseRow(sprite);
            // 循环
            this.lastIndex.y = (this.lastIndex.y + 1) % this.cells[0].length;
        }
    };
    return this;
};



var AB = new RelationDeal();        // AB 之间的关系类
var BC = new RelationDeal(true);    // BC 之间的关系类


var pigImgPainter = new ImagePainter("./images/pig.png");
var chiefImgPainter = new ImagePainter("./images/chief.png");
var warriorImgPainter = new ImagePainter("./images/warrior.png");
var loveImgPainter = new ImagePainter("./images/love.png");
var touchImgPainter = new ImagePainter("./images/touchFlag.png");
var waitImgPainter = new ImagePainter("./images/wait.png");
var goodImgPainter = new ImagePainter("./images/goodEnding.png", true);
var badImgPainter = new ImagePainter("./images/badEnding.png", true);


var objPig = new Sprite("pig", pigImgPainter, [new ActionExecute("pig"), moveOfSprite]);                // 被追捕对象
var objChief = new Sprite("chief", chiefImgPainter, [new ActionExecute("chief"), moveOfSprite]);         // 追捕对者象
var objWarrior = new Sprite("warrior", warriorImgPainter, [new ActionExecute("warrior"), moveOfSprite]);                // 操作对象

var objLove = new Sprite("love", loveImgPainter, [new ActionExecute("love", true), moveOfSprite]);
var objTouch = new Sprite("touch", touchImgPainter, [new ActionExecute("touch", true), moveOfSprite]);
var objWait = new Sprite("wait", waitImgPainter, [new ActionExecute("wait", true), moveOfSprite]);

var objGood = new Sprite("good", goodImgPainter, [new ActionExecute("good", true)]);
var objBad = new Sprite("bad", badImgPainter, [new ActionExecute("bad", true)]);


//2. 函数定义块...........................................................

/****************************************************************
 * 构造器                                                       *
 ****************************************************************/

/**
 * 向量构造器
 * @param x
 * @param y
 * @returns {vector}
 */
var vector = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * 淡入淡出特效
 * @param mol 选择绘制器模式 true 表示 img 其他表示 painter
 * @param src   绘制器或者 img
 * @param duration  持续时间
 * @param callback 回调函数
 * @returns {EffectFade}
 */
var EffectFade = function (mol, src, duration, callback) {
    var interval = 10;

    this.duration = duration || 1.75 * 1000;
    this._startTime = 0;
    // this.globalAlpha = inOut ? 0 : 1;
    this.painter = undefined;
    this.img = undefined;
    this._i = 1;
    // this._beforeDate = undefined;
    this._timeCounter = 0;
    this.globalAlpha = 0;

    if (mol) this.img = src;
    else    this.painter = src;

    // 用于内嵌
    var q = this;

    this.isTimeout = function () {
        if (q._startTime == 0) {
            q._startTime = (+new Date);
            // q._beforeDate = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        return q._timeCounter > q.duration;

    };
    /**
     * 淡入淡出
     */
    this.autoFade = function () {
        if (!q.isTimeout()) {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.putImageData(q._beforeDate, 0, 0);
            ctx.drawImage(background, 0, 0, background.width / 2, background.height / 2, 0, 0, canvas.width, canvas.height);

            ctx.globalAlpha = q.globalAlpha;
            q.draw();
            if (q.globalAlpha >= 1) q._i = -1;
            // console.log("Alpha: " + q.globalAlpha);
            q.globalAlpha += interval * 2 / q.duration * q._i;

            if (q.globalAlpha <= 0)
                q.globalAlpha = 0;
            else if (q.globalAlpha >= 1)
                q.globalAlpha = 1;

            ctx.restore();
            q._timeCounter += interval;
            setTimeout(q.autoFade, interval);
        } else {
            // 重新初始化
            q._i = 1;
            q._timeCounter = 0;
            q._startTime = 0;
            q._beforeDate = undefined;

            if (callback !== undefined) {
                callback();
            }
        }
    };

    /**
     * 选择绘制方式
     */
    this.draw = function () {
        if (this.img === undefined) this.painter();
        else
            drawCenter(this.img);
    };

    return this;
};


/**
 * 图片点击区域判定对象
 * @param x
 * @param y
 * @param w
 * @param h
 * @param bIsAble
 */
var box = function (x, y, w, h, bIsAble) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bIsAble = bIsAble || false;
    // this.bIsLarge = isLarge || false;
    var q = this;
    this.open = function () {
        q.bIsAble = true;
    };
    this.close = function () {
        q.bIsAble = false;
    };
    this.auto = function () {
        q.bIsAble = !q.bIsAble;
    };
    /**
     * 判定坐标是否在内部
     * @param local    可以为坐标 也可以为一个坐标对象
     * @param yy
     * @returns {*|boolean}
     */
    this.isInside = function (local, yy) {
        var x, y;
        if (yy === undefined) {
            x = local.x;
            y = local.y
        } else {
            x = local;
            y = yy;
        }
        // console.log(this.x+ " "+ this.w +"\n" + this.y+ " " +  this.h);
        return (this.bIsAble &&
        this.x < x && x < this.x + this.w &&
        this.y < y && y < this.y + this.h);
    };
};


/**
 * HP 对象构造器 通过名称构造对应的HP值
 * @param name
 * @returns {objHP}
 */
var objHP = function (name) {
    var tmp = 0;
    if (name === "pig")
        tmp = PIG_HP;
    else if (name === "chief")
        tmp = CHIEF_HP;

    this.hp = tmp;
    this.HP = tmp;
    this.name = name;
    this.isLive = function () {
        if (this.hp > 0)
            return true;
        else {
            this.hp = 0;
            return false;
        }
    };
    this.hurt = function () {
        if (this.isLive()) {
            this.hp--;
        }
    };

    this.recovery = function () {
        this.hp = this.HP;
    };

    return this;
};


/****************************************************************
 * 可执行函数                                                  *
 ****************************************************************/

/**
 * 坐标转化
 * @param x
 * @param y
 * @returns {{x: number, y: number}}
 */
var windowToCanvas = function (x, y) {
    var box = canvas.getBoundingClientRect();
    return {
        x: (x - box.left) * (canvas.width / box.width),
        y: (y - box.top) * (canvas.width / box.width)
    };
};


/**
 * 随机一个被追捕对象A的坐标
 * @param spriteA 被追捕对象pig
 * @param spriteB 追捕者chief
 * @returns {{x: *, y: *}}
 */
var randomPositionOfPig = function (spriteA, spriteB) {
    var dXStart = spriteB.width + DISTANCE;                                           // X可取最小值
    var dXRange = canvas.width - spriteB.width - DISTANCE - spriteA.width - dXStart;    // X可变动范围
    var dYStart = spriteB.height + DISTANCE;                                           // Y可取最小值
    var dYRange = canvas.height - spriteB.height - DISTANCE - spriteA.height - dYStart;// Y可变动范围

    // 给被追逐对象赋值
    var local = {
        x: dXStart + dXRange * Math.random(),
        y: dYStart + dYRange * Math.random()
    };
    spriteA.left = local.x;
    spriteA.top = local.y;
    return local;
};

/***
 * 根据被追捕对象A的坐标生成一个和他保持安全距离B坐标
 * @param spriteA   被追捕精灵对象
 * @param spriteB   追捕者精灵对象
 * @returns {{x: *, y: *}}
 */
var randomSafePositionOfChief = function (spriteA, spriteB) {
    var rA = calculateRadius(spriteA),
        rB = calculateRadius(spriteB);
    var r = rA + DISTANCE + rB;   // 两者初始的安全距离
    var angle = Math.random() * 360;
    var local = {
        x: spriteA.left + r * Math.cos(angle * Math.PI / 180),
        y: spriteA.top + r * Math.sin(angle * Math.PI / 180)
    };
    // 求圆形偏移量
    var dOffx = local.x < spriteA.left ? spriteB.width / 2 : -spriteB.width / 2;
    var dOffy = local.y < spriteA.top ? spriteB.height / 2 : -spriteB.height / 2;
    // 求解左上角坐标
    local.x += dOffx;
    local.y += dOffy;

    spriteB.top = local.y;
    spriteB.left = local.x;

    return local;
};

/***
 * 计算一个精灵对象的外接圆半径
 * @param sprite 精灵
 * @returns {number}
 */
var calculateRadius = function (sprite) {
    return Math.sqrt(Math.pow(sprite.width / 2, 2) + Math.pow(sprite.height / 2, 2));
};
/**
 * 清空canvas
 */
var clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 *  初始化精灵
 * @param sprite  要初始化的精灵对象
 * @param imgPainter    使用用来初始化 w/h 的图片绘制器
 */
var initSpriteByPainter = function (sprite) {
    var imgPainter = sprite.painter;
    if (sprite.painter && !sprite.bIsImageOk && imgPainter.image.complete) {

        console.log(sprite.name + "初始化中....");

        sprite.width = IMAGE_LENTH;
        sprite.height = IMAGE_LENTH;
        sprite.bIsImageOk = true;

        sprite.objHp = new objHP(sprite.name);

        console.log(sprite.name + "初始化完成");

        var name = sprite.name;
        if (name === "love" || name === "touch" || name === "wait") {
            sprite.visible = false;
        } else if (name === "good" || name === "bad") {
            sprite.width = imgPainter.image.width;
            sprite.height = RECT_HEIGHT;
            sprite.left = canvas.width / 2 - sprite.width / 2 * large;
            sprite.top = canvas.height / 3 - sprite.height / 2 * large;
        }
    }
};

/**
 * 更新当前帧速率
 * @returns {number}
 */
var updateFps = function () {
    var now = (+new Date);
    if (lastAnimation != 0) {
        AnimationInterval = now - lastAnimation;
        currentFps = 1000 / AnimationInterval;
    }
    lastAnimation = now;
    return currentFps;
};

/**
 * 获取精灵的外接圆
 * @param sprite 精灵对象
 * @returns {{x: *, y: *, radius: number}}
 */
var getCircle = function (sprite) {
    return {
        x: sprite.left + sprite.width / 2,
        y: sprite.top + sprite.height / 2,
        radius: calculateRadius(sprite)
    };
};

/**
 * 计算两个坐标的距离
 * @param objA
 * @param objB
 * @returns {number}
 */
var distance = function (objA, objB) {
    return Math.sqrt(Math.pow(objB.x - objA.x, 2) + Math.pow(objB.y - objA.y, 2));
};

/**
 * 更新B精灵的方向
 * @param spriteA 被追方
 * @param spriteB 追方
 */
var updateDirectionOfB = function (spriteA, spriteB) {

    if (AnimationInterval == 0)
        return;

    // 获取外接圆
    var objCircleA = getCircle(spriteA),
        objCircleB = getCircle(spriteB);

    // 更新方向向量
    spriteB.vector = {
        x: objCircleA.x - objCircleB.x,
        y: objCircleA.y - objCircleB.y
    };

    var x = spriteB.vector.x,
        y = spriteB.vector.y;

    var tmp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // 分母

    // 速度分量比
    var VofX = x / tmp,
        VofY = y / tmp;

    spriteB.velocityX = CHIEF_SPEED * VofX * (AnimationInterval / 1000);
    spriteB.velocityY = CHIEF_SPEED * VofY * (AnimationInterval / 1000);
};


/**
 * 更新A精灵的方向
 * @param spriteA 被追方
 * @param spriteB 追方
 * @param v       速度
 */
var updateDirectionOfA = function (spriteA, spriteB, v) {
    if (v === undefined) v = PIG_SPEED;
    if (spriteB.vector === undefined)    return;
    if (spriteA.vector === undefined)
        spriteA.vector = spriteB.vector;

    var x = spriteA.vector.x,
        y = spriteA.vector.y;
    var tmp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    // 速度分量比
    var VofX = x / tmp,
        VofY = y / tmp;
    spriteA.velocityX = v * VofX * (AnimationInterval / 1000);
    spriteA.velocityY = v * VofY * (AnimationInterval / 1000);
};

/**
 * 更新可控制精灵C
 * @param spriteC 精灵
 * @param angle   相对canvas的角度
 * @param v       速度
 */
var updateDirectionOfC = function (spriteC, angle, v) {
    v = v || WARRIOR_SPEED;
    // console.log(spriteC.left +" " + spriteC.top);
    if (angle == -1) {
        // 静止状态
        spriteC.velocityX = 0;
        spriteC.velocityY = 0;
        spriteC.vector = new vector(0, 0);
    }
    else if (angle == 0) {
        spriteC.velocityX = 0;
        spriteC.velocityY = -v * (AnimationInterval / 1000);
        spriteC.vector = new vector(0, 1);
    }
    else if (angle == 90) {
        spriteC.velocityX = v * (AnimationInterval / 1000);
        spriteC.velocityY = 0;
        spriteC.vector = new vector(1, 0);
    }
    else if (angle == 180) {
        spriteC.velocityX = 0;
        spriteC.velocityY = v * (AnimationInterval / 1000);
        spriteC.vector = new vector(0, -1);
    }
    else if (angle == 270) {
        spriteC.velocityX = -v * (AnimationInterval / 1000);
        spriteC.velocityY = 0;
        spriteC.vector = new vector(-1, 0);
    }
    else {
        // 计算弧度值
        angle = (Math.PI * 2) * (angle / 360) - Math.PI / 2;
        // 速度分量
        var VofX = v * Math.cos(angle),
            VofY = v * Math.sin(angle);
        spriteC.velocityX = VofX * (AnimationInterval / 1000);
        spriteC.velocityY = VofY * (AnimationInterval / 1000);
        spriteC.vector = new vector(Math.cos(angle), Math.sin(angle));
    }
};


/**
 * 判断向量属于哪一个象限
 * @param vector 向量 (x,y)
 * @returns {number}
 */
var jungleVectorBelong = function (vector) {
    if (vector === undefined)    return 0;
    var x = vector.x,
        y = vector.y;
    var tmp = 0;
    if (x == 0 && y > 0)
        tmp = 1;
    else if (x == 0 && y < 0)
        tmp = 5;
    else if (x > 0 && y == 0)
        tmp = 3;
    else if (x < 0 && y == 0)
        tmp = 7;
    else if (x > 0 && y > 0)
        tmp = 2;
    else if (x > 0 && y < 0)
        tmp = 4;
    else if (x < 0 && y > 0)
        tmp = 8;
    else if (x < 0 && y < 0)
        tmp = 6;

    return tmp;
};

/**
 * 判断该精灵是否将要碰到墙壁
 * @param sprite 精灵对象
 * @returns {boolean}
 */
var isTouchWall = function (sprite) {
    var x = sprite.left + sprite.velocityX,
        y = sprite.top + sprite.velocityY;
    var rectRight = x + sprite.width,
        rectBottom = y + sprite.height;

    return (x < 0 || y < 0 || rectBottom > canvas.height || rectRight > canvas.width);
};

/**
 * 判断连个精灵是否撞击
 * @param spriteA
 * @param spriteB
 * @returns {boolean}
 */
var isCrashObject = function (spriteA, spriteB) {
    var objCircleA = getCircle(spriteA),
        objCircleB = getCircle(spriteB);


    // // 预判撞击
    // objCircleB.x += spriteB.velocityX;
    // objCircleB.y += spriteB.velocityY;
    // objCircleA.x += spriteA.velocityX;
    // objCircleA.y += spriteA.velocityY;

    var dist = distance(objCircleA, objCircleB);


    return (dist <= IMAGE_LENTH * 0.78);

    // 投影法 存在误差 停用
    // var aX = spriteA.left + spriteA.velocityX,
    //     aY = spriteA.top + spriteA.velocityY,
    //     aR = aX + spriteA.width,
    //     aB = aY + spriteA.height;
    //
    // var bX = spriteB.left + spriteB.velocityX,
    //     bY = spriteB.top + spriteB.velocityY,
    //     bR = bX + spriteB.width,
    //     bB = bY + spriteB.height;
    //
    // return ((aX < bX && bX < aR) || (aX < bB && bB < aR)) && ( (aY < bY && bY < aB) || (aY < bB && bB < aB));

};


/**
 * 随机一个不碰撞向量
 * @param sprite 精灵
 */
var changeVector = function (sprite) {

    var x = sprite.left + sprite.velocityX,
        y = sprite.top + sprite.velocityY,
        r = x + sprite.width,
        b = y + sprite.height;
    // x 越界
    if (r > canvas.width) {
        x = canvas.width - sprite.width;
    } else if (x < 0) {
        x = 0;
    }
    // y 越界
    if (y < 0) {
        y = 0;
    } else if (b > canvas.height) {
        y = canvas.height - sprite.height;
    }
    // 恢复坐标
    sprite.left = x;
    sprite.top = y;

    var d = jungleVectorBelong(sprite.vector); // 判断象限
    // console.log(d);
    var ao = 0; // 旋转基础角度
    var LR = 0; // 随机左还是右
    if (d % 2 == 1) { // 与坐标系平行
        LR = parseInt(Math.random() * 10) % 2;
    }

    // 初始最小旋转角
    switch (d) {
        case 1:
            ao = LR ? 0 : 270;
            break;
        case 2:
            ao = 270;
            break;
        case 3:
            ao = LR ? 0 : 90;
            break;
        case 4:
            ao = 180;
            break;
        case 5:
            ao = LR ? 90 : 180;
            break;
        case 6:
            ao = 90;
            break;
        case 7:
            ao = LR ? 180 : 270;
            break;
        case 8:
            ao = 0;
            break;
    }

    var rd = (ao + Math.random() * 90);
    // console.log(rd + "°");
    var angle = (Math.PI * 2) * (rd / 360) - Math.PI / 2;
    // var length = Math.sqrt(Math.pow(sprite.vector.x, 2) + Math.pow(sprite.vector.y, 2));
    // 更新向量
    sprite.vector = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };

};


/**
 * 根据按键检测向量方向并且返回角度
 * @returns {number}  -1 表示 没有移动
 */
var jungleMoveDirect = function () {
    var angle = -1;
    if (keyUp && keyRight) {
        angle = 45;
    }
    else if (keyDown && keyRight) {
        angle = 90 + 45;
    }
    else if (keyDown && keyLeft) {
        angle = 180 + 45;
    }
    else if (keyUp && keyLeft) {
        angle = 270 + 45;
    }
    else if (keyUp) {
        angle = 0;
    }
    else if (keyRight) {
        angle = 90;
    }
    else if (keyDown) {
        angle = 180;
    }
    else if (keyLeft) {
        angle = 270;
    }

    // // 计算弧度值
    // angle = (Math.PI * 2) * (angle / 360) - Math.PI / 2;
    return angle;
};

/**
 * 停止运动
 * @param sprite
 */
var stopRun = function (sprite) {
    sprite.velocityX = 0;
    sprite.velocityY = 0;
};

/**
 * 图片是否加载完成
 * @returns {boolean}
 */
var isAllLoadReady = function () {
    // 帮助图片
    for(var i = 0 ; i < helpImg.length;i++){
        if(!helpImg[i].complete)    return false;
    }

    return background.complete && title.complete &&
        startButton.complete && leap.complete &&
        restartButton.complete && groundDetal.complete &&
        help.complete && next.complete;
};

/**
 * 重置精灵
 * @param sprite
 */
var reSetSprite = function (sprite) {

    sprite.left = 0;
    sprite.top = 0;
    sprite.objHp.recovery();
};

/**
 * 重置游戏标志 回复生命值
 */
var reSetFlag = function () {
    endTime = +new Date;
    bIsEnd = true;
    bIsStart = false;
    bIsFirstTime = true;
    sill.lastUse = 0;
};

/**
 * 界面上按钮 并且初始化对应的可点击区域
 */
var drawButton = function () {
    if (startButton.complete && help.complete && restartButton.complete) {
        ctx.drawImage(startButton, canvas.width / 2 - startButton.width / 2, canvas.height * 0.58, startButton.width, startButton.height);
        ctx.drawImage(help, canvas.width / 2 - help.width / 2, canvas.height * 0.58 + startButton.height + 10, help.width, help.height);

        startbox = startbox || new box(canvas.width / 2 - startButton.width / 2, canvas.height * 0.58, startButton.width, startButton.height, true);
        helpbox = helpbox || new box(canvas.width / 2 - help.width / 2, canvas.height * 0.58 + startButton.height + 10, help.width, help.height, true);

    }
};

/**
 * 开始界面入场动画
 */
var startOfAnimation = function () {
    // 绘制背景
    if (background.complete)
        ctx.drawImage(background, 0, 0, background.width / 2, background.height / 2, 0, 0, canvas.width, canvas.height);
    if (title.complete && titlePosition) {
        ctx.drawImage(title, titlePosition.x, titlePosition.y, title.width, title.height);
        if (titlePosition.y <= title.height / 4) {
            titlePosition.y += 3;
        }
    }

    if (titlePosition === undefined || titlePosition.y <= title.height / 4 || !startButton.complete)
        requestAnimationFrame(startOfAnimation);
    else {
        bIsOpeningEnd = true;
        drawButton();
    }
};

/**
 * 开始界面出场动画
 */
var startOfAnimationOut = function () {
    // 绘制背景
    if (background.complete)
        ctx.drawImage(background, 0, 0, background.width / 2, background.height / 2, 0, 0, canvas.width, canvas.height);
    if (titlePosition && titlePosition.y + title.height > 0) {
        titlePosition.y -= 5;
        ctx.drawImage(title, titlePosition.x, titlePosition.y, title.width, title.height);
    }

    if (titlePosition === undefined || titlePosition.y + title.height > 0)
        requestAnimationFrame(startOfAnimationOut);
    else {
        // 停止播放并且 重置
        titlePosition = {
            x: canvas.width / 2 - title.width / 2,
            y: -title.height
        };
        introductionFade.autoFade();
    }
};

// 特效
var introductionFade = new EffectFade(true, groundDetal, 5 * 1000, function () {
    drawAllScreen(background);
    changeFade.autoFade();
});
var changeFade = new EffectFade(true, change, 2.5 * 1000, function () {
    objAudioOfBefore.load();
    startGameFade.autoFade();
});
var startGameFade = new EffectFade(true, startGame, 1.75 * 1000, function () {
    requestAnimationFrame(mainAnimation);
});


/**
 * 全屏绘制图片
 * @param img
 */
var drawAllScreen = function (img) {
    if (img.complete)
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
};


var drawCenter = function (img) {
    if (img.complete) {
        ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2, img.width, img.height);
    }
};


/**
 * 背景绘制
 */
var drawBg = function () {
    if (background.complete)
        ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);

};


var playEnding = function () {
    clear();
    drawBg();
    objAudioOfBackGround.load();
    if (objPig.objHp.isLive()) {
        objAudioOfWin.play();
        objGood.update(ctx, (+new Date));
        objGood.paint(ctx);
    } else {
        objAudioOfFail.play();
        objBad.update(ctx, (+new Date));
        objBad.paint(ctx);
    }
    // 重新开始按钮
    ctx.drawImage(restartButton, canvas.width / 2 - restartButton.width / 2, canvas.height * 0.6 - restartButton.height / 2, restartButton.width, restartButton.height);
    restartbox = restartbox || new box(canvas.width / 2 - restartButton.width / 2, canvas.height * 0.6 - restartButton.height / 2, restartButton.width, restartButton.height,true);

    // 结束按钮可用时随时可以停止动画
    if (bIsEnd) {
        requestAnimationFrame(playEnding);
    } else {
        objAudioOfWin.load();
        objAudioOfFail.load();

        reSetSprite(objWarrior); //.objHp.recovery();
        reSetSprite(objChief); //.objHp.recovery();
        reSetSprite(objPig); // .objHp.recovery();
    }
};


var helpButton = function (mol) {
    var w = next.width,
        h = next.height;
    var interval = 40;
    switch (mol) {
        case 1:
            ctx.drawImage(leap, canvas.width - w * 2 - 2 * interval, canvas.height - h - interval, w, h);
            ctx.drawImage(next, canvas.width - w - interval, canvas.height - h- interval, w, h);
            leapbox = new box(canvas.width - w * 2 - 2 *interval, canvas.height - h- interval, w, h, true);
            nextbox = new box(canvas.width - w - interval, canvas.height - h- interval, w, h, true);
            if(prevebox) prevebox.close();
            break;
        case 2:
            ctx.drawImage(leap, canvas.width - w * 3 - interval*3, canvas.height - h- interval, w, h);
            ctx.drawImage(preve, canvas.width - w * 2 -interval*2, canvas.height - h- interval, w, h);
            ctx.drawImage(next, canvas.width - w - interval, canvas.height - h- interval, w, h);
            leapbox = new box(canvas.width - w * 3 - interval*3, canvas.height - h- interval, w, h, true);
            prevebox = new box(canvas.width - w * 2 - interval*2, canvas.height - h- interval, w, h, true);
            nextbox = new box(canvas.width - w - interval*2, canvas.height - h- interval,  w, h,true);
            break;
        case 3:
            ctx.drawImage(leap, canvas.width - w * 2 - interval*2, canvas.height - h- interval, w, h);
            ctx.drawImage(preve, canvas.width - w - interval, canvas.height - h- interval, w, h);
            if(nextbox) nextbox.close();
            leapbox = new box(canvas.width - w * 2 -interval*2, canvas.height - h- interval, w, h, true);
            prevebox = new box(canvas.width - w -interval, canvas.height - h- interval, w, h, true);
            break;
    }
};

/**
 * 播放帮助图片
 * @param mol
 */
var drawHelpImg = function (mol) {

    drawAllScreen(helpImg[helpIndex]);
    helpButton(mol);
};

/**
 * 通过坐标判断点击类型
 * @param local
 * @returns {number}
 */
var checkModel = function (local) {
    if (prevebox && prevebox.isInside(local) && helpIndex > 0) {
        helpIndex--;
    }
    else if (leapbox && leapbox.isInside(local)) {
        helpIndex = 0;
        bIsHelp = false;
        // 重置
        titlePosition = {
            x: canvas.width / 2 - title.width / 2,
            y: -title.height
        };
        startOfAnimation();
    }
    else if (nextbox && nextbox.isInside(local) && helpIndex <= helpImg.length) {
        helpIndex++;
    }

    var mol = -1;
    if(helpIndex == 0) mol = 1;
    else if( 0 < helpIndex && helpIndex < helpImg.length - 1)   mol = 2;
    else if(helpIndex == helpImg.length - 1)   mol = 3;

    return mol;
};

/**
 * 主要动画绘制函数
 */
var mainAnimation = function () {
    clear();

    // 初始化
    initSpriteByPainter(objPig);
    initSpriteByPainter(objChief);
    initSpriteByPainter(objWarrior);
    initSpriteByPainter(objLove);
    initSpriteByPainter(objTouch);
    initSpriteByPainter(objWait);
    initSpriteByPainter(objGood);
    initSpriteByPainter(objBad);


    // 更新帧频 相关
    updateFps();

    // 绘制背景
    drawBg();


    if (bIsFirstTime) {
        // 第一次随机位置
        bIsFirstTime = false;
        console.log("初始化位置...");
        randomPositionOfPig(objPig, objChief);
        randomSafePositionOfChief(objPig, objChief);
        objAudioOfBackGround.load();
        objAudioOfBackGround.play();

        objWarrior.left = canvas.width / 2 - objWarrior.width / 2;
        objWarrior.top = canvas.height / 2 - objWarrior.height / 2;
        startTime = +new Date;
    }

    // 等待图片加载完成 后绘制精灵
    if (objPig.bIsImageOk && objChief.bIsImageOk && objWarrior.bIsImageOk && AnimationInterval) {

        var now = (+new Date);
        // A与墙碰撞检测
        if (isTouchWall(objPig)) changeVector(objPig);
        if (isTouchWall(objWarrior)) changeVector(objWarrior);

        //酋长 与 猪之间的 位移坐标更新
        AB.updateOfAB(objPig, objChief, now);

        BC.updateOfBC(objChief, objWarrior, now, AB);
        // 更新下一次偏移量
        updateDirectionOfA(objPig, objChief);

        // 动画 + 移动
        objPig.update(ctx, (+new Date));
        objChief.update(ctx, (+new Date));
        objWarrior.update(ctx, (+new Date));

        // 特效更新
        objLove.update(ctx, (+new Date));
        objTouch.update(ctx, (+new Date));
        objWait.update(ctx, (+new Date));

        // 绘制
        objPig.paint(ctx);
        objChief.paint(ctx);
        objWarrior.paint(ctx);

        // 特效绘制
        objLove.paint(ctx);
        objWait.paint(ctx);
        objTouch.paint(ctx);
    }


    // 是否绘制下一帧判断
    if (objPig.objHp === undefined || objChief.objHp === undefined || objWarrior.objHp === undefined)
        requestAnimationFrame(mainAnimation);
    else if (objPig.objHp.isLive() && objChief.objHp.isLive())
        requestAnimationFrame(mainAnimation);
    else {
        objAudioOfBackGround.load();
        reSetFlag();
        playEnding();
    }

};

/**
 * 动画入口
 */
var ainimateEnter = function () {
    if (isAllLoadReady()) {
        objAudioOfBefore.load();
        objAudioOfBefore.play();
        startOfAnimation();
    }
    else
        setTimeout(ainimateEnter, 500);
};


//3. 事件注册块...........................................................

title.onload = function () {
    console.log("标题图片加载中...");

    titlePosition = {
        x: canvas.width / 2 - title.width / 2,
        y: -title.height
    };
    console.log("标题图片加载完成...");
};


background.onload = function () {
    console.log("背景图片加载中...");
    console.log("背景图片加载完成...");
};
// 按键监听
window.addEventListener("keydown", function (event) {

    // 兼容性
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // console.log(JSON.stringify(e.keyCode));

    switch (e.keyCode) {
        case 87:
        case 38:
            keyUp = true;
            break;
        case 83:
        case 40:
            keyDown = true;
            break;
        case 65:
        case 37:
            keyLeft = true;
            break;
        case 68:
        case 39:
            keyRight = true;
            break;
        case 13:
            if (bIsStart)
                sill.use();
            else if (bIsEnd) {
                bIsEnd = false;
                // 结束背景音乐
                objAudioOfBackGround.load();
                ainimateEnter();
            }
            else {
                if (bIsOpeningEnd) {
                    startOfAnimationOut();
                    bIsStart = true;
                    bIsOpeningEnd = false;
                }
            }
            //     keyEnter = true;
            break;
    }
    // e.preventDefault();
});

window.addEventListener("keyup", function (event) {

    // 兼容性
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // console.log(JSON.stringify(e.keyCode));

    switch (e.keyCode) {
        case 87:
        case 38:
            keyUp = false;
            break;
        case 83:
        case 40:
            keyDown = false;
            break;
        case 65:
        case 37:
            keyLeft = false;
            break;
        case 68:
        case 39:
            keyRight = false;
            break;
        case 13:
            // keyEnter = false;
            break;
    }
    // e.preventDefault();

});

canvas.addEventListener("click", function (e) {
    var local = windowToCanvas(e.clientX, e.clientY);
    if (!bIsHelp) { // 是否是帮助界面
        if (!bIsStart && !bIsEnd && startButton.complete) {

            if (startbox.isInside(local)) { // 开始游戏按钮
                // console.log("0 ok");
                bIsStart = true;
                startOfAnimationOut();
            }
            else if (helpbox.isInside(local)) { // 帮助按钮
                 // console.log("1 ok");
                drawHelpImg(1);
                bIsHelp = true;
            }
        }else if (bIsEnd) {  // 重新开始按钮
            // console.log(restartbox);
            // console.log(local);
            if (restartbox.isInside(local)) {
                bIsEnd = false;
                ainimateEnter();
            }
        }
    }else{
        var tmp = checkModel(local);    // 判断显示的帮助按钮类型
        drawHelpImg(tmp);               // 绘制
    }
    e.preventDefault();
});


//4. 初始化块............................................................

// 装填帮助教程图片数组
for (var i = 0; i < 5; i++) {
    helpImg[i] = new Image();
    helpImg[i].src = "./images/helpTips/" + i + ".png";
}


objAudioOfSpeedUp.style.display = "none";
objAudioOfBackGround.style.display = "none";
objAudioOfCrashPig.style.display = "none";
objAudioOfCrash.style.display = "none";
objAudioOfWin.style.display = "none";
objAudioOfFail.style.display = "none";
objAudioOfBefore.style.display = "none";

// 循环播放
objAudioOfFail.loop = "loop";
objAudioOfWin.loop = "loop";
objAudioOfBefore.loop= "loop";
objAudioOfBackGround.loop= "loop";

// 文件路径
background.src = "./images/background.png";
title.src = "./images/title.png";
startButton.src = "./images/startButton.png";
restartButton.src = "./images/restart.png";
groundDetal.src = "./images/groundDetal.png";


help.src = "./images/help.png";
leap.src = "./images/leap.png";
next.src = "./images/next.png";
change.src = "./images/change.png";
startGame.src = "./images/startGame.png";
preve.src = "./images/preve.png";

objAudioOfBackGround.src = "./audios/blackgroundMusic.mp3";
objAudioOfCrash.src = "./audios/crash2.wav";
objAudioOfCrashPig.src = "./audios/crashPig.wav";
objAudioOfSpeedUp.src = "./audios/HighSpeed.wav";
objAudioOfWin.src = "./audios/win.mp3";
objAudioOfFail.src = "./audios/fail.mp3";
objAudioOfBefore.src = "./audios/beforeStart.mp3";

ainimateEnter();