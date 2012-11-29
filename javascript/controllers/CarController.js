var CarController = function (view, model) {
    Controller.call(this, view, model);
    var _this = this;
    //Event Bindings
    pubsub.subscribe( "car/move", function (topics, data) {
        _this._model.setAttributes(data);
        _this._model.update();
    } );


    pubsub.subscribe("car/finish_lap", function (topics, data) {
        console.log("FINISH A LAP");
    });

}