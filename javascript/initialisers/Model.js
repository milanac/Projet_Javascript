var Model = function (attributes) {
    if(attributes){
        for(property in attributes){
            this[property] = attributes[property];
        }
    }
}