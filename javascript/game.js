    var car, map;
    var canvas = document.createElement("canvas");

    var canvasContext = canvas.getContext("2d");

    var playAnimation = true;

    // Keyboard Variables
    var leftKey = 37;
    var upKey = 38;
    var rightKey = 39;
    var downKey = 40;

    function resizeCanvas() {
        canvas.width = document.width -20;
        canvas.height = document.height - 20;
    }

    function Car(src, x, y) {
        this.image = new Image();
        this.image.src = src;

        this.x = x;
        this.y = y;
        this.angle = 90;

        this.topSpeed = 12;
        this.friction = 0.8;
        this.speed = 0;
        this.rotationStep = 4;
        this.speedStep = 2;

        this.left = false;
        this.forward = false;
        this.right = false;
        this.backward = false;
    }

    function Map(src, x, y) {
        this.image = new Image();
        this.image.src = src;

        this.x = x;
        this.y = y
    }

    function initObjects() {
        car = new Car('./image/car.png', (canvas.width / 2) + 300, (canvas.height / 2)+ 150);
        map = new Map('./image/map.png', canvas.width/2-900/2, canvas.height/2-623/2);
    }

    function drawObjects() {
        canvasContext.save();
        canvasContext.translate(car.x, car.y);
        canvasContext.rotate(car.angle * Math.PI / 180);
        canvasContext.drawImage(car.image, -24 * .5, -35 * .5);
        canvasContext.restore();
    }

    function drawMap() {
        canvasContext.save();
        canvasContext.drawImage(map.image, map.x, map.y);
        canvasContext.restore();
    }

    function clearCanvas() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.beginPath();
    }

    function initGame() {
        initObjects();
        drawObjects();
        updateStage();
    }

    function detectCollision() {
        var data = canvasContext.getImageData(car.x, car.y, 1, 1).data;
        if(data[0] == 226 && data[1] == 226 && data[2] == 226) {
            car.speedStep = 2;
            car.maxSpeed = 7
        } else {
            car.speedStep = 0.5;
            car.maxSpeed = 1;
        }
        data = null;
    }

    function updateStageObjects() {

        car.speed *= car.friction;
        if(car.forward) {

            if(car.speed < car.topSpeed) {
                car.speed += car.speedStep;
            }
        }
        if(car.backward) {
            if(car.speed > -car.topSpeed) {
                car.speed -= car.speedStep;
            }
        }
        if(car.left) {
            car.angle -= car.rotationStep * (car.speed / 3);
        }
        if(car.right) {
            car.angle += car.rotationStep * (car.speed / 3);
        }
        car.speedX = Math.sin(car.angle * (Math.PI / 180)) * car.speed;
        car.speedY = Math.cos(car.angle * (Math.PI / 180)) * car.speed * -1;
        if((car.x + car.speedX) > canvas.width) {
            car.x = canvas.width; //- (car.x + car.speedX);
        } else {
            if((car.x + car.speedX) < 10) {
                car.x = 10;
            } else {
                car.x += car.speedX;
            }
        }

        if((car.y + car.speedY) > canvas.height) {
            car.y = canvas.height;
        } else {
            if((car.y + car.speedY) < 2) {
                car.y = 2;
            } else {
                car.y += car.speedY;
            }
        }
    }

    function updateStage() {
        clearCanvas();
        updateStageObjects();
        drawMap();
        detectCollision();
        drawObjects();

        if(playAnimation) {
            setTimeout(updateStage, 25);
        }
    }

    document.documentElement.addEventListener('keydown', function(e) {
        e.preventDefault();
        var keyCode = e.keyCode;

        if(keyCode == leftKey) {
            car.left = true;
        } else if(keyCode == upKey) {
            car.forward = true;
        } else if(keyCode == rightKey) {
            car.right = true;
        } else if(keyCode == downKey) {
            car.backward = true;
        }
    }, false);
    document.documentElement.addEventListener('keyup', function(e) {
        e.preventDefault();
        var keyCode = e.keyCode;
        if(keyCode == leftKey) {
            car.left = false;
        } else if(keyCode == upKey) {
            car.forward = false;
        } else if(keyCode == rightKey) {
            car.right = false;
        } else if(keyCode == downKey) {
            car.backward = false;
        }
    }, false);

    window.onresize = resizeCanvas;
    window.onload = function() {
        resizeCanvas();
        document.body.appendChild(canvas);
        initGame();
    }