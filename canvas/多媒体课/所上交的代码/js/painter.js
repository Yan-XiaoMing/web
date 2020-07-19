guoArmyPainter = {
    paint: function (sprite) {
        var imgTank = new Image();
        var imgguoArmy = new Image();
        var imageTank2 = new Image();
        imgTank.src = '../images/tank.png';
        imageTank2.src = '../images/tank2.png';
        imgguoArmy.src = '../images/guoArmy.png';
        switch (sprite.level) {
            case 1:
                context.drawImage(imgguoArmy, 0, 0, redArmyWidth, redArmyHeight, -redArmyWidth / 2, -redArmyHeight / 2, redArmyWidth, redArmyHeight);
                break;

            case 2:
                context.drawImage(imgTank, 0, 0, redArmyWidth, redArmyHeight, -redArmyWidth / 2, -redArmyHeight / 2, redArmyWidth, redArmyHeight);
                break;

            case 3:
                context.drawImage(imageTank2, 0, 0, redArmyWidth, redArmyHeight, -redArmyWidth / 2, -redArmyHeight / 2, redArmyWidth, redArmyHeight);
                break;
        }
    },
};

bulletPainter = {
    paint: function (sprite) {
        let img = new Image();
        img.src = '../images/bullet.png';
        if (sprite.isEnemy) {
            context.drawImage(img, -bulletWidth / 2, -bulletHeight / 2, bulletWidth, bulletHeight);
        } else {
            let random = Math.random();
            context.beginPath();
            ;
            if (random < 0.2) {
                context.fillStyle = '#FF3EFF';
            } else if (random >= 0.2 && random < 0.4) {
                context.fillStyle = '#FF0000';

            } else if (random >= 0.4 && random < 0.6) {
                context.fillStyle = '#FF0088';

            } else if (random >= 0.6 && random < 0.8) {
                context.fillStyle = '#0066FF';

            } else {
                context.fillStyle = '#BBFF00';
            }
            context.arc(0, 0, 6, 0, 2 * Math.PI);
            context.fill();
        }
    },
};
