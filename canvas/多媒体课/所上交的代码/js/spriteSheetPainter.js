/**
 * 精灵表绘制器
 * @param redArmyArray
 * @param spriteSheet
 * @constructor
 */
SpriteSheetPainter = function (redArmyArray, spriteSheet) {
    if (redArmyArray !== null) {
        this.redArmyArray = redArmyArray;
    } else {
        this.redArmyArray = [];
    }
    this.arrayIndex = 0;//当前的精灵表中的精灵动作
    this.dateCount = null;
    this.isShoting = false;//是否处于开火状态,对精灵表做处理
    this.spriteSheet = spriteSheet;
};
/**
 *
 * @type {{paint: SpriteSheetPainter.paint, advance: SpriteSheetPainter.advance}}
 */
SpriteSheetPainter.prototype = {
    advance: function () {
        // console.log(this);
        if (this.isShoting) {
            this.arrayIndex++;
            if (this.arrayIndex === this.redArmyArray.length) {
                this.arrayIndex = 0;
                this.isShoting = false;
            }
        }
    },
    paint: function (sprite) {
        if (this.dateCount === null) {
            this.dateCount = new Date();
        } else {
            var newDate = new Date();
            var timeCount = newDate - this.dateCount;
            if (timeCount > sprite.firePerFrame) {//tsa>开火频率就更新
                this.advance();
                this.dateCount = newDate;
            }
        }
        let redArmyDataArray = this.redArmyArray[this.arrayIndex];
        context.drawImage(this.spriteSheet, redArmyDataArray.x, redArmyDataArray.y, redArmyDataArray.w, redArmyDataArray.h, -redArmyWidth / 2, -redArmyHeight / 2, redArmyDataArray.w, redArmyDataArray.h);
    },
};
