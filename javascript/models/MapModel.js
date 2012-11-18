var MapModel = function () {
    var _this = this;
    var defaultImageModule = imageModule(this,'./image/map.png',  canvas.width / 2 - 900 / 2, canvas.height / 2 - 623 / 2);
        defaultImageModule();
        Model.call(this, {});
}