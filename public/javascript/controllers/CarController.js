var CarController = function (view, model) {
    Controller.call(this, view, model);
    var _this = this;
    //Event Bindings
    pubsub.subscribe( "car/move", function (topics, data) {
        _this._model.setAttributes(data);
        _this._model.update();
    } );


    pubsub.subscribe("car/finish_lap", function (topics, data) {
        number_map += 1;
        if (number_map == 3) {
            myWebSockets.sendMessage(null, "finish");
        };
        selectorFirst("#number_map").textContent = number_map;
    });

}