
    var canvas = document.createElement('canvas');
    var backgroundContainer = document.getElementById("backgroundContainer");

    canvas.style.zIndex = "-1";

    backgroundContainer.appendChild(canvas);
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    context.fillRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(main);

    var pair3RingRotateAnimate = new Pair3RingRotateAnimate(1000, 150, 35, 5, "#fff");
    var ringImage = new RingImage({x: 0, y: 0}, 150, 35);
    var scaleRingAnimate = new ScaleAnimate(ringImage, 1000);
    var textInAnimate = new TextInAnimate("生 命 意 义 在 于 运 动 ！", 150, 70);

    var step1 = false
        , step2 = false
        , step3 = false;


    function main() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);


        step1 = pair3RingRotateAnimate.draw();
        if (step1) step2 = scaleRingAnimate.draw();
        if (step2) step3 = textInAnimate.draw();
        if(step3){
            window.location.href = "./index.html";
            return;
        }


        window.requestAnimationFrame(main);
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
        var interval = 25 + 20;
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
                else this.cnt++;
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
     * 文本淡入效果
     */
    function TextInAnimate(text, duration, fontSize, isClean) {

        this.textAlpha = 0;
        duration = duration ? duration : 300;
        this.fontSize = fontSize;
        this.alphaInterval = 1 / duration;
        this.centerPoint = center();
        this.finish = false;
        this.text = text ? text : "Hello";
        this.isClean = false;

        this.clean = function () {
            this.isClean = true;
        };

        this.draw = function (drawCenterPoint) {
            if (this.finish && this.isClean) return true;
            drawCenterPoint = drawCenterPoint ? drawCenterPoint : this.centerPoint;
            console.log(drawCenterPoint);
            context.save();
            if (this.textAlpha > 1) this.finish = true;
            else {
                context.globalAlpha = this.textAlpha;
                this.textAlpha += this.alphaInterval;
            }
            context.fillStyle = "#fff";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "bold " + this.fontSize + "px Arial";
            context.fillText(this.text, drawCenterPoint.x, drawCenterPoint.y);
            context.restore();
            return this.finish;
        };
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
