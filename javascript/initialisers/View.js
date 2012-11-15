var View = function () {
    var _this = this;
     if (View.initialized !== true) {
        View.prototype = {
            init: function (model) {
                _this.model = model;
            },
           render: function (argument) {
                console.log(model);
           }
        }
        View.initialized = true;
    }
}