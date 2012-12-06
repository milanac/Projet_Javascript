var PlayerView = function (model) {
    View.call(this,{
        model: model
    })
}
PlayerView.prototype.render = function () {
    if(this.model.spell){
        this.model.spell.view.render();
    }
    canvasContext.save();
    canvasContext.translate(this.model.block.x + middleX, this.model.block.y + middleY);
        canvasContext.drawImage(this.model.block.image, -this.model.block.image.width * .5, -this.model.block.image.height * .5);
    canvasContext.restore();
}