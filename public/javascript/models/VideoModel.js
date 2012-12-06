var VideoModel = function () {
    Model.call(this, {});
}
VideoModel.prototype = new Model()
VideoModel.prototype.lance= function () {
    console.log("lance");
}