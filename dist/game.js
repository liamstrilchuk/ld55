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
        this.ctx = ctx;
        this.world = new World(this);
        for (var pos in this.world.chunks) {
            this.world.chunks[pos].lakes.forEach(function (lake) { return lake.createLake(); });
        }
        this.player = new Player(0, this.world.getHeightAtPos(0), this);
        this.temple = new Temple(-100, this.world.getHeightAtPos(-100) - 70, this);
        new Message("start game", this);
        for (var i = 0; i < 10; i++) {
            this.enemies.push(new Enemy(100 + 50 * i, this.world.getHeightAtPos(100 + 50 * i), this));
        }
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
        this.bullets.forEach(function (bullet) {
            bullet.render();
        });
        this.robots.forEach(function (robot) {
            robot.render();
        });
        this.particles.forEach(function (particle) {
            particle.render();
        });
        this.enemies.forEach(function (enemy) {
            enemy.render();
        });
        this.animals.forEach(function (animal) {
            animal.render();
        });
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "left";
        this.ctx.fillText("FPS: " + Math.round(1000 * 60 / (this.lastFrameTimes[this.lastFrameTimes.length - 1] - this.lastFrameTimes[0])), 10, 10);
    };
    Game.prototype.addEventListeners = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            _this.keys[event.key.toLowerCase()] = true;
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
