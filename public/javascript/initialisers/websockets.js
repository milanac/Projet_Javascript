var myWebSockets = {};
(function(q) {
    var ws, id
    var receptEvent = function(msg) {
            var data = JSON.parse(msg.data);
            if(data.id) {
                id = data.id;
            };
            if(data.car_id) {
                if(data.car_id == 2) {
                    myCarModel.initialiseGoodId(redCarModel.src, redCarModel.x, redCarModel.y, data.car_id);
                    hisCarModel.initialiseGoodId(firstCarModel.src, firstCarModel.x, firstCarModel.y, 1);
                } else {
                    myCarModel.initialiseGoodId(firstCarModel.src, firstCarModel.x, firstCarModel.y, data.car_id);
                    hisCarModel.initialiseGoodId(redCarModel.src, redCarModel.x, redCarModel.y, 2);
                }

            }
            if(data.state){
                state = data.state
            }
            if(data.evented){
                if(data.evented.id && hisCarModel.id == data.evented.id){
                    // console.log(data.evented);
                    // car = getCarById(data.evented.id);
                    hisCarModel.setAttributes(data.evented);
                }
            }
        }

    var close = function(argument) {
            alert("socket close");
        }

    var openned = function(){
        setInterval(checkIfGo, 25);
    }

    q.connect = function(link_to_ws) {
        ws = new WebSocket('ws://' + link_to_ws);
        ws.onmessage = receptEvent;
        ws.onclose = close;
        ws.onopen = openned;
    }

    q.sendMessage = function(data) {
        if(ws) {
            var sending = JSON.stringify({
                id: id,
                evented: data
            });
            ws.send(sending);
        } else {
            console.log("Need to connect");
        }
    }
}(myWebSockets))