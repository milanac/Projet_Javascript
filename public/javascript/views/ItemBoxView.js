var ItemBoxView = function(itembox) {
        var _this = this;
        View.call(this, {
            model: itembox,
        })
    }
ItemBoxView.prototype = new View()
ItemBoxView.prototype.render = function() {
    if(!this.model.isOpen) {
        canvasContext.save();
        canvasContext.translate(this.model.x + middleX, this.model.y + middleY);
        canvasContext.drawImage(this.model.image, -this.model.image.width * .5, -this.model.image.height * .5);
        canvasContext.restore();
    };

}