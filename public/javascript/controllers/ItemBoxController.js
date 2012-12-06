var ItemBoxController = function (view, model) {
    Controller.call(this, view, model);
    var _this = this;
    //Event Bindings
    pubsub.subscribe( "itembox/collision", function (topics, data) {
        playerModel.setSpell(itemBoxManagerModel.getModelItemBoxById(data.id).model.spell);
    } );

}