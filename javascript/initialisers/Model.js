var Model = function (attributes) {
    if(attributes){
        for(property in attributes){
            this[property] = attributes[property];
        }
    }

    var _this = this;
     if (Model.initialized !== true) {
        Model.prototype = {

        }
        Model.initialized = true;
    }
    this.init();
}