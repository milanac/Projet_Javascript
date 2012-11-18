var CarController = function (view, model) {
    Controller.call(this, view, model);
    var _this = this.
    //Event Bindings
    pubsub.subscribe( "car/move", function (topics, data) {
        _this.model.setAttributes(data);
        _this.model.update();
    } );

}