function Event(sender) {
    this._senders = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function(listener) {
        this._listeners.push(listener);
    },
    notify: function(args) {
        var index;

        for(index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }

};

function (i) {
    return function () {
        alert(i);
    }
}

