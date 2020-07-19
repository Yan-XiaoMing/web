/**
 * 红军所有的动作行为
 * @type {{redArmyShot: redArmyShot, addRedBullet: addRedBullet, execute: execute}[]}
 */
redArmyBehavior = {
    execute: function (sprite) {//判断红军的位置进行移动旋转以及判断不超出边界
        if (sprite.moveUp) {
            if (sprite.y >= redArmyHeight / 2) {//y（x）为红军中心点，这样判断刚刚好可以让精灵贴边
                sprite.y = sprite.y - sprite.speedY;
            }
        }
        if (sprite.moveLeft) {
            if (sprite.x >= redArmyWidth / 2) {//同理
                sprite.x = sprite.x - sprite.speedX;
            }
        }
        if (sprite.moveRight) {
            if (sprite.x <= canvas.width - redArmyWidth / 2) {//同理
                sprite.x = sprite.x + sprite.speedX;
            }
        }
        if (sprite.moveDown) {
            if (sprite.y <= canvas.height - redArmyHeight / 2) {//同理
                sprite.y = sprite.y + sprite.speedY;
            }
        }
        if (sprite.turnLeft) {
            sprite.turnAngle -= sprite.turnSpeed;
        }
        if (sprite.turnRight) {
            sprite.turnAngle += sprite.turnSpeed;
        }
        if (sprite.fire && !sprite.painter.isShoting) {//执行小人切枪换子弹,可以开枪并且没在开枪的时候，开枪动画执行时等时间戳
            sprite.painter.isShoting = true;
            this.redArmyShot(sprite);//
        }
    },
    redArmyShot: function (sprite) {
        this.addRedBullet(sprite, sprite.turnAngle);
        let shotAudio = document.getElementById("shot");
        if (shotAudio.paused || shotAudio.ended) {
            shotAudio.play();
        }
    },
    addRedBullet: function (sprite, angle) {
        for (let i = 0; i < bullets.length; i++) {
            if (!bullets[i].isSeen) {
                bullets[i].isEnemy = true;
                bullets[i].x = sprite.x;
                bullets[i].y = sprite.y;
                bullets[i].turnAngle = angle;
                bullets[i].speedX = bulletSpeed * Math.sin(-bullets[i].turnAngle);
                bullets[i].speedY = bulletSpeed * Math.cos(-bullets[i].turnAngle);
                bullets[i].isSeen = true;
                break;
            }
        }
    },
};


/**
 * 敌人所有的动作和行为
 * @type {{guoArmyShot: guoArmyBehavior.guoArmyShot, addguoBullet: guoArmyBehavior.addguoBullet, execute: guoArmyBehavior.execute}}
 */
guoArmyBehavior =
    {
        execute: function (sprite) {
            if (sprite.y > canvas.height || !sprite.isSeen) {
                let randomType = Math.random();
                if (count >= 3 && count < 6) {
                    sprite.initAttr = 150;
                    if (randomType < 0.2) {
                        sprite.level = 2;
                        sprite.initAttr = 200;
                    }
                } else if (count >= 6 && count < 14) {
                    sprite.initAttr = 250;
                    if (randomType < 0.3) {
                        sprite.level = 2;
                        sprite.initAttr = 300;
                    }
                    if (randomType < 0.2) {
                        sprite.level = 3;
                        sprite.initAttr = 300;
                    }
                } else if (count >= 14) {
                    if (randomType < 0.3) {
                        sprite.level = 2;
                        sprite.initAttr = 400;
                    }
                    if (randomType < 0.35) {
                        sprite.level = 3;
                        sprite.initAttr = 500;
                    }
                }
                sprite.isSeen = true;
                sprite.x = canvas.width / 2;
                sprite.XAngle = Math.random() > 0.5 ? -Math.random() * 0.05 : Math.random() * 0.05;
                sprite.y = Math.random() * canvas.height - canvas.height;
            }
            if (sprite.y > 0) {//敌人开枪的概率，等级越高开枪概率越高
                let numShot = sprite.level === 1 ? 0.005 : 0.03;
                let randomShot = Math.random();
                if (randomShot < numShot) {
                    this.guoArmyShot(sprite);
                }
            }
            sprite.y += sprite.speed;
            sprite.x += 2 * Math.sin(sprite.offset);
            // console.log(sprite.XAngle,sprite.offset);
            sprite.offset += sprite.XAngle;

        },
        guoArmyShot: function (sprite) {
            this.addguoBullet(sprite, sprite.turnAngle);
        },
        addguoBullet: function (sprite, angle) {
            for (let i = 0; i < bullets.length; i++) {
                if (!bullets[i].isSeen) {
                    bullets[i].isEnemy = false;
                    bullets[i].x = sprite.x;
                    bullets[i].y = sprite.y;
                    bullets[i].turnAngle = angle;
                    let bulletSpeed = 5;
                    bullets[i].speedX = bulletSpeed * Math.sin(-bullets[i].turnAngle);
                    bullets[i].speedY = bulletSpeed * Math.cos(-bullets[i].turnAngle);
                    bullets[i].isSeen = true;
                    break;
                }
            }
        },
    };


/**
 * 子弹所有的动作行为
 * @type {{execute: execute}[]}
 */
bulletBehavior =
    {
        execute: function (sprite) {//每次子弹的移动
            sprite.x -= sprite.speedX;
            sprite.y -= sprite.speedY;
            //超出边界不可见
            if (sprite.x < -bulletWidth / 2 || sprite.y < -bulletHeight / 2 || sprite.x > canvas.width + bulletWidth / 2 || sprite.y > canvas.height + bulletHeight / 2) {
                sprite.isSeen = false;
            }
        }
    };





