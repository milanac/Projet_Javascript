var MapView = function (map) {
    View.call(this, {
            model: map || new MapModel()
        });
}
MapView.prototype.render = function () {
    canvasContext.save();
    canvasContext.drawImage(this.model.image, this.model.x, this.model.y);
    canvasContext.restore();
}