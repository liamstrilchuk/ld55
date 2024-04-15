var Game = /** @class */ (function () {
    function Game(ctx) {
        this.relativeX = 0;
        this.relativeY = 0;
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.mouseDown = false;
        this.lastFrameTime = Date.now();
        this.lastXPositions = [];
        this.lastYPositions = [];
        this.lastFrameTimes = [];
        this.bullets = [];
        this.particles = [];
        this.enemies = [];
        this.robots = [];
        this.animals = [];
        this.structures = [];
        this.buildMenuOpen = false;
        this.wave = 1;
        this.score = 0;
        this.waveTimer = 3600;
        this.ctx = ctx;
        this.world = new World(this);
        for (var pos in this.world.chunks) {
            this.world.chunks[pos].lakes.forEach(function (lake) { return lake.createLake(); });
        }
        this.player = new Player(0, this.world.getHeightAtPos(0), this);
        this.temple = new Temple(-100, this.world.getHeightAtPos(-100) - 70, this);
        new Message("start game", 0, 300, 5, "rgb(200, 70, 70)", this);
        // for (let i = 0; i < 10; i++) {
        // 	this.enemies.push(new Enemy(100 + 50 * i, this.world.getHeightAtPos(100 + 50 * i), this));
        // }
        for (var i = 0; i < 15; i++) {
            var x = Math.random() * 5000 - 2500;
            this.animals.push(new Animal(x, this.world.getHeightAtPos(x), this));
        }
    }
    Game.prototype.update = function () {
        var _this = this;
        var diff = Date.now() - this.lastFrameTime;
        this.lastFrameTime = Date.now();
        this.lastFrameTimes.push(this.lastFrameTime);
        if (this.lastFrameTimes.length > 60) {
            this.lastFrameTimes.shift();
        }
        var delta = diff / (1000 / 60);
        this.player.update(delta);
        this.lastXPositions.push(this.player.x);
        this.lastYPositions.push(this.player.y);
        if (this.lastXPositions.length > 15) {
            this.lastXPositions.shift();
        }
        if (this.lastYPositions.length > 15) {
            this.lastYPositions.shift();
        }
        var xAvg = this.lastXPositions.reduce(function (a, b) { return a + b; }) / this.lastXPositions.length;
        var yAvg = this.lastYPositions.reduce(function (a, b) { return a + b; }) / this.lastYPositions.length;
        this.relativeX = Math.floor(xAvg - this.ctx.canvas.width / 2);
        this.relativeY = Math.floor(yAvg - this.ctx.canvas.height * 2 / 3);
        this.bullets.forEach(function (bullet) {
            if (bullet.update(delta)) {
                _this.bullets.splice(_this.bullets.indexOf(bullet), 1);
            }
        });
        this.enemies.forEach(function (enemy) {
            if (enemy.update(delta)) {
                _this.enemies.splice(_this.enemies.indexOf(enemy), 1);
            }
        });
        this.robots.forEach(function (robot) {
            if (robot.update(delta)) {
                _this.robots.splice(_this.robots.indexOf(robot), 1);
            }
        });
        this.particles.forEach(function (particle) {
            if (particle.update(delta)) {
                _this.particles.splice(_this.particles.indexOf(particle), 1);
            }
        });
        this.animals.forEach(function (animal) {
            if (animal.update(delta)) {
                _this.animals.splice(_this.animals.indexOf(animal), 1);
            }
        });
        this.structures.forEach(function (structure) {
            if (structure.update()) {
                _this.structures.splice(_this.structures.indexOf(structure), 1);
            }
        });
        this.waveTimer -= delta;
        if (this.waveTimer <= 0) {
            this.wave++;
            this.waveTimer = 3600;
        }
        this.temple.update(delta);
        this.render();
        window.requestAnimationFrame(this.update.bind(this));
    };
    Game.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "rgb(220, 220, 220)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.world.render();
        this.temple.render();
        this.player.render();
        this.robots.forEach(function (robot) {
            robot.render();
        });
        this.enemies.forEach(function (enemy) {
            enemy.render();
        });
        this.animals.forEach(function (animal) {
            animal.render();
        });
        this.structures.forEach(function (structure) {
            structure.render();
        });
        this.bullets.forEach(function (bullet) {
            bullet.render();
        });
        this.particles.forEach(function (particle) {
            particle.render();
        });
        if (this.buildMenuOpen) {
            this.ctx.strokeStyle = "rgb(100, 100, 100)";
            this.ctx.lineWidth = 8;
            this.ctx.beginPath();
            this.ctx.arc(this.ctx.canvas.width / 2, this.ctx.canvas.height * 2 / 3 - 20, 100, 0, Math.PI * 2);
            this.ctx.stroke();
            var dist = Math.sqrt(Math.pow((this.mousePos.x - (this.ctx.canvas.width / 2 - 100)), 2) +
                Math.pow((this.mousePos.y - this.ctx.canvas.height * 2 / 3 + 20), 2));
            this.ctx.fillStyle = "rgb(90, 90, 90)";
            this.ctx.beginPath();
            this.ctx.arc(this.ctx.canvas.width / 2 - 100, this.ctx.canvas.height * 2 / 3 - 20, dist < 25 ? 30 : 25, 0, Math.PI * 2);
            this.ctx.fill();
            if (dist < 25) {
                var color = this.temple.blood >= 50 ? "rgb(70, 200, 70)" : "rgb(200, 70, 70)";
                this.drawNumber("50", this.ctx.canvas.width / 2 - 115, this.ctx.canvas.height * 2 / 3 - 30, color, 3);
            }
        }
        if (this.selectedStructure) {
            var mouseX = this.getMouseTileX();
            var height = this.world.getHeightAtPos(mouseX);
            var canPlace = this.canPlaceStructure(mouseX);
            this.ctx.fillStyle = "rgba(70, 70, 70, " + (canPlace ? 0.7 : 0.3) + ")";
            this.ctx.fillRect(mouseX - this.relativeX, height - this.relativeY - this.selectedStructure.height, this.selectedStructure.width, this.selectedStructure.height);
        }
        this.drawNumber(this.temple.blood.toString(), 10, 20, "rgb(200, 70, 70)", 5);
        this.ctx.font = "12px Times";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("FPS: " + Math.round(1000 * 60 / (this.lastFrameTimes[this.lastFrameTimes.length - 1] - this.lastFrameTimes[0])), 10, 10);
        this.ctx.textAlign = "center";
        this.ctx.font = "bold 50px Courier";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Wave " + this.wave, this.ctx.canvas.width / 2, 50);
        var minutes = Math.floor(this.waveTimer / 3600);
        var seconds = Math.floor((this.waveTimer % 3600) / 60);
        this.ctx.font = "bold 30px Courier";
        this.ctx.fillStyle = "rgb(90, 40, 40)";
        this.ctx.fillText(minutes + ":" + (seconds < 10 ? "0" : "") + seconds, this.ctx.canvas.width / 2, 85);
    };
    Game.prototype.drawNumber = function (text, x, y, color, size) {
        this.ctx.fillStyle = color;
        var column = 0;
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var char = text_1[_i];
            for (var row = 0; row < numbers[char].length; row++) {
                for (var col = 0; col < numbers[char][row].length; col++) {
                    if (numbers[char][row][col] !== " ") {
                        this.ctx.fillRect(x + column * size + col * size, y + row * size, size, size);
                    }
                }
            }
            column += numbers[char][0].length + 1;
        }
    };
    Game.prototype.getMouseTileX = function () {
        return Math.floor((this.mousePos.x + this.relativeX) / 4) * 4 - Math.floor(this.selectedStructure.width / 4) * 2;
    };
    Game.prototype.canPlaceStructure = function (xPos) {
        var structureInWay = false;
        this.structures.forEach(function (structure) {
            if (Math.abs(structure.x - xPos) < 50) {
                structureInWay = true;
            }
        });
        return Math.abs(xPos - this.relativeX - this.ctx.canvas.width / 2) < 300 && !structureInWay;
    };
    Game.prototype.addEventListeners = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            _this.keys[event.key.toLowerCase()] = true;
            if (event.key.toLowerCase() === "e") {
                if (_this.selectedStructure) {
                    _this.selectedStructure = null;
                }
                else {
                    _this.buildMenuOpen = !_this.buildMenuOpen;
                }
            }
        });
        window.addEventListener("keyup", function (event) {
            _this.keys[event.key.toLowerCase()] = false;
        });
        window.addEventListener("mousemove", function (event) {
            _this.mousePos = { x: event.clientX, y: event.clientY };
        });
        window.addEventListener("mousedown", function () {
            _this.mouseDown = true;
            _this.onMouseDown();
        });
        window.addEventListener("mouseup", function () {
            _this.mouseDown = false;
        });
    };
    Game.prototype.onMouseDown = function () {
        var _this = this;
        if (this.selectedStructure) {
            var mouseX = this.getMouseTileX();
            var height = this.world.getHeightAtPos(mouseX);
            var canPlace = this.canPlaceStructure(mouseX);
            if (canPlace) {
                if (this.temple.blood >= this.selectedStructure.cost) {
                    this.structures.push(new this.selectedStructure(mouseX, height, this));
                    this.temple.blood -= this.selectedStructure.cost;
                    this.selectedStructure = null;
                }
                else {
                    new Message("not enough blood", this.player.x - 200, 150, 2, "rgb(200, 70, 70)", this);
                }
            }
            return;
        }
        if (this.buildMenuOpen) {
            var dist1 = Math.sqrt(Math.pow((this.mousePos.x - (this.ctx.canvas.width / 2 - 100)), 2) +
                Math.pow((this.mousePos.y - this.ctx.canvas.height * 2 / 3 + 20), 2));
            if (dist1 < 25) {
                this.selectedStructure = Wall;
                this.buildMenuOpen = false;
            }
            return;
        }
        this.robots.forEach(function (robot) {
            if (Math.abs(robot.x - _this.mousePos.x - _this.relativeX) < 30 && Math.abs(robot.y - _this.mousePos.y - _this.relativeY) < 30) {
                robot.mode = robot.mode === "patrol" ? "follow" : "patrol";
                robot.modeChangeTimer = 60;
            }
        });
    };
    Game.prototype.start = function () {
        this.addEventListeners();
        this.update();
    };
    return Game;
}());
