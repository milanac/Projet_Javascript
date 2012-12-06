var canvas = document.createElement("canvas"),
    canvasContext = canvas.getContext("2d"),
    middleX, middleY, number_map = 0,
    finish = false;
resizeCanvas();
var firstCarModel = {
    src: './image/car.png',
    x: (canvas.width / 2) + 300,
    y: (canvas.height / 2) + 150
},
    redCarModel = {
        src: './image/car-yellow.png',
        x: (canvas.width / 2) + 350,
        y: (canvas.height / 2) + 150
    };
var myCarModel = new CarModel(firstCarModel.src, firstCarModel.x, firstCarModel.y),
    hisCarModel = new CarModel(redCarModel.src, redCarModel.x, redCarModel.y),
    mapModel = new MapModel(),
    zonesModel = new ZonesModel(canvas.width / 2, canvas.width / 2),
    zonesView = new ZonesView(zonesModel),
    myCarView = new CarView(myCarModel, true),
    hisCarView = new CarView(hisCarModel, false),
    myCarController = new CarController(myCarView, myCarModel),
    mapView = new MapView(mapModel),
    playAnimation = false,
    state = 1,
    itemBoxManagerModel = new ItemBoxManagerModel();
itemBoxManagerView = new ItemBoxManagerView(itemBoxManagerModel), playerModel = new PlayModel(), playerView = new PlayerView(playerModel);

function resizeCanvas() {
    canvas.width = document.width - 20;
    canvas.height = document.height - 20;
    middleX = canvas.width / 2;
    middleY = canvas.height / 2;

}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();
}

function updateStage() {
    clearCanvas();
    itemBoxManagerModel.checkIfCollisionWithCar(myCarModel);
    mapView.render();
    zonesModel.passOnMyZones(myCarModel);
    myCarModel.update();
    myWebSockets.sendMessage(myCarModel.getRelativeCoordonate());
    itemBoxManagerView.render();
    zonesView.render();
    myCarView.render();
    hisCarView.render();
    playerView.render();
    // if(playAnimation) {
    //     setTimeout(updateStage, 25);
    // }
}

function checkIfGo() {
    if(state == 2) {
        selectorFirst("#waiting").style.opacity = 0;
        playAnimation = true;
        updateStage();
    };
    if(finish) {
        state == 3;
        if(number_map == 3) {
            var name = prompt("Please enter your name", "Roger?");
            $.ajax({
                url: window.location.host + "/record",
                type: 'get',
                data: {
                    name: name
                },
                success: function(data) {
                    var r = confirm(data.text);
                    if(r == true) {
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                }
            });
        } else {
            var r = confirm("You Loose!");
            if(r == true) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    }
}

window.onresize = resizeCanvas;
window.onload = function() {
    //init Game
    myWebSockets.connect(window.location.host + "/");
    resizeCanvas();
    selectorFirst("#waiting").style.opacity = 1;
    document.body.appendChild(canvas);
    setTimeout(updateStage, 1000);
}