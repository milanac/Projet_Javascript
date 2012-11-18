var CarModel = function() {
        var _this = this;
        var defaultImageModule = imageModule(this,'./image/car.png', (canvas.width / 2) + 300, (canvas.height / 2) + 150);
        defaultImageModule();
        Model.call(this, {
            angle: 90,
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
    }

   // TODO: découler pour map et car
    // TODO: ajouter Model.prototype.init.apply(this)