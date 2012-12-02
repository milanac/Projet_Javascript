var CarModel = function(src, x, y) {
        var _this = this;
        var defaultImageModule = imageModule(this, src, x, y);
        defaultImageModule();
        Model.call(this, {
            id: null,
            angle: 0,
            topSpeed: 10,
            friction: 0.8,
            speed: 0,
            rotationStep: 3,
            speedStep: 1.5,
            left: false,
            forwar: false,
            backward: false,
            speedX : 0,
            speedY: 0
        });

    }
    CarModel.prototype = new Model();
    CarModel.prototype.update = function () {
        this.speed *= this.friction;
        if(this.forward) {

            if(this.speed < this.topSpeed) {
                this.speed += this.speedStep;
            }
        }
        if(this.backward) {
            if(this.speed > -this.topSpeed) {
                this.speed -= this.speedStep;
            }
        }
        if(this.left) {
            this.angle -= this.rotationStep * (this.speed / 3);
        }
        if(this.right) {
            this.angle += this.rotationStep * (this.speed / 3);
        }
        this.speedX = Math.sin(this.angle * (Math.PI / 180)) * this.speed;
        this.speedY = Math.cos(this.angle * (Math.PI / 180)) * this.speed * -1;
        if((this.x + this.speedX) > canvas.width) {
            this.x = canvas.width; //- (this.x + this.speedX);
        } else {
            if((this.x + this.speedX) < 10) {
                this.x = 10;
            } else {
                this.x += this.speedX;
            }
        }

        if((this.y + this.speedY) > canvas.height) {
            this.y = canvas.height;
        } else {
            if((this.y + this.speedY) < 2) {
                this.y = 2;
            } else {
                this.y += this.speedY;
            }
        }
        this.detectCollision();
    }

   CarModel.prototype.detectCollision = function () {
        var data = canvasContext.getImageData(this.x, this.y, 1, 1).data;
        if(data[0] == 226 && data[1] == 226 && data[2] == 226) {
            this.speedStep = 1.5;
            this.topSpeed = 10;
        } else {
            if(data[0] == 196 && data[1] == 196 && data[2] == 196) {
                this.speedStep = 1;
                this.topSpeed =  9;
            } else {
                this.speedStep = 0.5;
                this.topSpeed = 4;
            }

        }
        data = null;
   }

   CarModel.prototype.getRelativeCoordonate = function () {
        var relativeX, relativeY;
        relativeX = this.x - middleX;
        relativeY = this.y - middleY;
       return {id: this.id, x: relativeX, y: relativeY, angle: this.angle};
   }
   CarModel.prototype.initialiseGoodId = function(src, x, y, id){
    var defaultImageModule = imageModule(this, src, x, y);
        defaultImageModule();
    this.id = id;
   }