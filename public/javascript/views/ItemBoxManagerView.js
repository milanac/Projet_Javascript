var ItemBoxManagerView = function (model) {
    var _this = this;
    View.call(this, {
        model: model || new ItemBoxManagerModel()
    });
};
ItemBoxManagerView.prototype.render = function(){
    itemBoxes = this.model.itemBoxes;
    for (var i = itemBoxes.length - 1; i >= 0; i--) {
        itemBoxes[i].view.render();
    };
}