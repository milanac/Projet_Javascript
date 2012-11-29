var Model = function(attributes) {
        if(attributes) {
            for(property in attributes) {
                this[property] = attributes[property];
            }
        }
    }
    Model.prototype.setAttributes = function(attributes) {
        if(attributes) {
            for(property in attributes) {
                this[property] = attributes[property];
            }
        }
    };
