var ItemBoxModel = function(id, x, y, spell) {
        var _this = this;
        var defaultImageModule = imageModule(this, './image/item_box.png', x, y);
        defaultImageModule();
        Model.call(this, {
            id: id,
            spell: spell,
            isOpen: false
        });
    }
ItemBoxModel.prototype = new Model();
ItemBoxModel.prototype.isCollisionWithCar = function(car) {
    return checkCollision(car, this, car.x, car.y, this.x + middleX, this.y + middleY);
};
ItemBoxModel.prototype.changeOpenAndPushEventIfCollision = function(car) {
    if(this.isCollisionWithCar(car)) {
        this.isOpen = true;
        pubsub.publish("itembox/collision", {
            id: this.id
        });
    }
};