var MapView = function (map) {
    View.call(this, {
            model: map || new MapModel()
        });
}
MapView.prototype.render = function () {
    canvasContext.save();
    canvasContext.drawImage(model.image, model.x, model.y);
    canvasContext.restore();
}