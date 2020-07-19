Sprite = function (spriteName, painter, behaviors) {
    if (spriteName !== undefined) {
        this.name = spriteName;
    } else {
        this.name = null;
    }
    if (painter !== undefined) {
        this.painter = painter;
    } else {
        this.painter = null;
    }
    if (behaviors !== null) {
        this.behaviors = behaviors;
    } else {
        this.behaviors = null;
    }
    this.initAttr = 80;
    this.isSeen = true;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveRight = false;
    this.moveDown = false;
    switch (this.name) {
        case 'redArmy':
            this.y = 0;
            this.x = 0;
            this.width = 32;
            this.height = 32;
            this.turnAngle = 0;
            this.turnSpeed = 0.08;
            this.turnLeft = false;
            this.turnRight = false;
            this.fire = false;
            this.isEnemy = true;
            this.firePerFrame = 50;
            this.speedX = 5;
            this.speedY = 5;
            break;
        case 'guoArmy':
            this.y = 0;
            this.x = 0;
            this.width = 32;
            this.height = 32;
            this.isEnemy = false;
            this.level = 1;
            this.speed = 1;
            this.turnAngle = Math.PI;
            this.offset = Math.PI/2;
            if (Math.random() > 0.5) {
                this.XAngle = Math.random() * 0.03;
            } else {
                this.XAngle = -Math.random() * 0.03;
            }
            break;
        case 'bullet':
            this.y = 0;
            this.x = 0;
            this.width = 15;
            this.height = 30;
            this.width = bulletWidth;
            this.isEnemy = true;
    }
};

Sprite.prototype = {
    paint: function () {//先更新再绘制
        this.update();//对精灵对象定义的子弹，红军，敌人进行更新
        if (this.painter !== undefined && this.isSeen) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.turnAngle);
            this.painter.paint(this);
            context.restore();
        }
    },
    update: function () {
        if (this.behaviors) {
            this.behaviors.execute(this);
        }
    }
};
/**
 * 获取红军精灵对象尺寸
 * @returns {{width: *, height: *}}
 */
getRedArmySize = function () {
    return {
        width: redArmyWidth,
        height: redArmyHeight,
    };
};

