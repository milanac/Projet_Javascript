var ItemBoxView = function (itembox) {
    var _this = this;
    Model.call(this, {
        model: itembox,
    })
}
ItemBoxView.prototype = new View()
ItemBoxView.prototype.render = function () {
    canvasContext.save();
    canvasContext.translate(this.model.x + middleX, this.model.y + middleY);
    canvasContext.drawImage(this.model.image, -45 * .5, -57 * .5);
    canvasContext.restore();
}