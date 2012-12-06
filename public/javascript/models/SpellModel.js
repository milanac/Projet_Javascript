var SpellModel = function (src) {
    var defaultImageModule = imageModule(this, src, 450, 280);
        defaultImageModule();
        Model.call(this,  {
            isOnPlayer: false
        });
}
SpellModel.prototype = new Model()
SpellModel.prototype.attack = function() {
    new VideoModel.lance();
    this.isOnPlayer.false;
};