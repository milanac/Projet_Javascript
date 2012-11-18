var View = function(attributes) {
        if(attributes) {
            for(property in attributes) {
                this[property] = attributes[property];
            }
        }
        var _this = this;
    }

View.prototype = {
    render: function(argument) {
        console.log(model);
    }
}