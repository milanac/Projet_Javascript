var myWebSockets = {};
(function(q) {
    var ws, id
    var receptEvent = function(dataString) {
            var data = JSON.parse(dataString);
            if(data.id) {
                id = data.id;
            };
        }

    var close = function(argument) {
            alert("socket close");
        }

    q.connect = function(link_to_ws) {
        ws = new WebSocket('ws://' + link_to_ws);
        ws.onmessage = receptEvent;
        ws.onclose = closed
    }

    q.sendMessage = function(data) {
        if(ws) {
            var sending = JSON.stringify({
                id: id,
                msg: data
            });
            ws.send(sending);
        } else {
            console.log("Need to connect");
        }
    }
}(websockets))