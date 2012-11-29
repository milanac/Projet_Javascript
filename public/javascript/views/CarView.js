var CarView = function(car) {
        var _this = this;
        View.call(this, {
            model: car || new CarModel()
        });

        // Keyboard Variables
        var leftKey = 37;
        var upKey = 38;
        var rightKey = 39;
        var downKey = 40;

        document.documentElement.addEventListener('keydown', function(e) {
            e.preventDefault();
            var keyCode = e.keyCode;
            if(keyCode == leftKey) {
                pubsub.publish("car/move", {
                    left: true
                });
            } else if(keyCode == upKey) {
                pubsub.publish("car/move", {
                    forward: true
                });
            } else if(keyCode == rightKey) {
                pubsub.publish("car/move", {
                    right: true
                });
            } else if(keyCode == downKey) {
                pubsub.publish("car/move", {
                    backward: true
                });
            }
        }, false);

        document.documentElement.addEventListener('keyup', function(e) {
            e.preventDefault();
            var keyCode = e.keyCode;
            if(keyCode == leftKey) {
                pubsub.publish("car/move", {
                    left: false
                });
            } else if(keyCode == upKey) {
                pubsub.publish("car/move", {
                    forward: false
                });
            } else if(keyCode == rightKey) {
                pubsub.publish("car/move", {
                    right: false
                });
            } else if(keyCode == downKey) {
                pubsub.publish("car/move", {
                    backward: false
                });
            }
        }, false);
    }

CarView.prototype.render = function() {
    canvasContext.save();
    canvasContext.translate(this.model.x, this.model.y);
    canvasContext.rotate(this.model.angle * Math.PI / 180);
    canvasContext.drawImage(this.model.image, -24 * .5, -35 * .5);
    canvasContext.restore();
}