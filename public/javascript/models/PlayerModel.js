var PlayModel = function () {
    var blockImage = {};
    moduleBlockImage = imageModule(blockImage, './image/block.png', 450, 280);
    moduleBlockImage();
    Model.call(this,{
        block : blockImage,
        spell: undefined
    })
}
PlayModel.prototype.setSpell = function (spell) {
    if (!this.spell) {
        this.spell = spell
        this.spell.model.isOnPlayer =true;
    };
}