var ItemBoxModel = function (x, y, spell) {
    var _this = this;
    var defaultImageModule = imageModule(this,'./image/item_box.png', x, y);
        defaultImageModule();
        Model.call(this, {
            spell: spell,
            isOpen: false
        });
}
ItemBoxModel.prototype = new Model();
ItemBoxModel.prototype.isCollisionWithCar = function(car) {
    carImageData = GetImageData(car);
    thisImageData = GetImageData(this);
    return isPixelCollision(carImageData, car.x, car.y, thisImageData, this.x + middleX, this.y + middleY, false);
};