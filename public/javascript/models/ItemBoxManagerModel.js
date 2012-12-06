var ItemBoxManagerModel = function() {
        var _this = this;
        var spellModel = new SpellModel("./image/fake_item_box.png");
        var itemBoxModel1 = new ItemBoxModel(1, 190, -172, {view: new SpellView(spellModel), model: spellModel}),
            itemBoxModel2 = new ItemBoxModel(2, -411, -264, null),
            itemBoxModel3 = new ItemBoxModel(3, -249, -76, null),
            itemBoxModel4 = new ItemBoxModel(4, -135, -81, null),
            itemBoxModel5 = new ItemBoxModel(5, -163, -196, null),
            itemBoxModel6 = new ItemBoxModel(6, -13, 5, -81, null),
            view = new ItemBoxView(itemBoxModel1)
        new ItemBoxController(view, itemBoxModel1);
        Model.call(_this, {
            itemBoxes: [{
                view: view,
                model: itemBoxModel1
            }
            // }, {
            //     view: new ItemBoxView(itemBoxModel2),
            //     model: itemBoxModel2
            // }, {
            //     view: new ItemBoxView(itemBoxModel3),
            //     model: itemBoxModel3
            // }, {
            //     view: new ItemBoxView(itemBoxModel4),
            //     model: itemBoxModel4
            // }, {
            //     view: new ItemBoxView(itemBoxModel5),
            //     model: itemBoxModel5
            // }, {
            // {
            //     view: new ItemBoxView(itemBoxModel6),
            //     model: itemBoxModel6
             ]
        })
    }
ItemBoxManagerModel.prototype.checkIfCollisionWithCar = function(car) {
    itemBoxes = this.itemBoxes;
    for(var i = itemBoxes.length - 1; i >= 0; i--) {
        if (!itemBoxes[i].model.isOpen) {
            itemBoxes[i].model.changeOpenAndPushEventIfCollision(car);
        };
    };
}

ItemBoxManagerModel.prototype.getModelItemBoxById = function (id) {
    for(var i = itemBoxes.length - 1; i >= 0; i--) {
        if(itemBoxes[i].model.id == id){
            return itemBoxes[i];
        }
    };
    return null
}