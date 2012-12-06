var SpellView = function (model) {
    var _this = this;
    View.call(this,{
        model: model
    })

     document.documentElement.addEventListener('keydown', function(e) {
            if(_this.model.isOnPlayer) {
                e.preventDefault();
                var keyCode = e.keyCode;
                if(keyCode == 32) {
                    model.attack();
                }
            }

        }, false);
}
SpellView.prototype.render = function () {
    if (this.model.image) {
        canvasContext.save();
        canvasContext.translate(this.model.x + middleX, this.model.y + middleY);
            canvasContext.drawImage(this.model.image, -this.model.image.width * .5, -this.model.image.height * .5);
        canvasContext.restore();
    };
}