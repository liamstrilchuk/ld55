var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Player = /** @class */ (function () {
    function Player(x, y, game) {
        this.velocityY = 0;
        this.wasHoldingLastFrame = false;
        this.holdingTime = 0;
        this.blood = 0;
        this.framesSinceSwimming = 0;
        this.lastDir = "right";
        this.health = 100;
        this.x = x;
        this.y = y;
        this.game = game;
        this.assets = {
            right: [
                loadImage("assets/player1.png")
            ],
            left: [
                loadImage("assets/player2.png")
            ]
        };
    }
    Player.prototype.render = function () {
        this.game.ctx.drawImage(this.assets[this.lastDir][0], this.x - this.game.relativeX - 20, this.y - this.game.relativeY - 64, 40, 64);
    };
    Player.prototype.update = function (delta) {
        var _this = this;
        var swimming = false;
        var lakeHeight = null;
        __spreadArray(__spreadArray([], this.game.world.getChunkAtPos(this.x).lakes, true), this.game.world.getChunkAtPos(this.x - 600).lakes, true).forEach(function (lake) {
            if (_this.x >= lake.from && _this.x <= lake.to) {
                swimming = _this.y > lake.maxLakeHeight;
                lakeHeight = lake.maxLakeHeight;
            }
        });
        var isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;
        if (this.game.keys["a"] && this.x > -8000) {
            this.x -= (isInLake ? 2 : 4) * delta;
            this.lastDir = "left";
        }
        if (this.game.keys["d"] && this.x < 8000) {
            this.x += (isInLake ? 2 : 4) * delta;
            this.lastDir = "right";
        }
        if (this.game.keys[" "] && !swimming && this.velocityY === 0) {
            this.velocityY = -10;
        }
        if ((!swimming && isInLake && this.framesSinceSwimming < 5) || swimming && this.framesSinceSwimming > 10) {
            for (var i = 0; i < 3; i++) {
                var angle = Math.PI + Math.random() * Math.PI;
                this.game.particles.push(new Particle(this.x, this.y, Math.cos(angle) * 2, Math.sin(angle) * 2, this.game, "rgb(0, 0, 200)"));
            }
        }
        this.framesSinceSwimming = swimming ? 0 : this.framesSinceSwimming + 1;
        if (!swimming) {
            this.velocityY += (isInLake ? 0.4 : 0.7) * delta;
        }
        else {
            this.velocityY -= Math.abs(lakeHeight - this.y) / 80 * delta;
            this.velocityY = Math.max(-1.5, this.velocityY);
        }
        if (this.y + this.velocityY > this.game.world.getHeightAtPos(this.x)) {
            this.velocityY = 0;
            this.y = this.game.world.getHeightAtPos(this.x);
        }
        else {
            this.y += this.velocityY * delta;
        }
        if (this.game.mouseDown) {
            this.holdingTime += delta;
        }
        if (this.wasHoldingLastFrame && !this.game.mouseDown) {
            var dir = Math.atan2(this.game.mousePos.y - this.y + this.game.relativeY, this.game.mousePos.x - this.x + this.game.relativeX);
            this.game.bullets.push(new Bullet(this.x, this.y - 30, Math.cos(dir) * Math.min(this.holdingTime + 15, 40) / 2, Math.sin(dir) * Math.min(this.holdingTime + 15, 40) / 2, 0.1, this.game));
            this.holdingTime = 0;
        }
        if (this.wasHoldingLastFrame && !this.game.mouseDown) {
            this.holdingTime = 0;
        }
        var templeDist = Math.sqrt(Math.pow((this.game.temple.x - this.x), 2) + Math.pow((this.game.temple.y - this.y), 2));
        if (templeDist < 250 && this.blood > 0) {
            this.blood--;
            var angle = Math.atan2(this.game.temple.y - this.y, this.game.temple.x - this.x) + Math.PI / 6 - Math.PI / 3 * Math.random();
            var particle = new Blood(this.x, this.y - 20, Math.cos(angle) * 5, Math.sin(angle) * 5, this.game);
            particle.emittedByPlayer = true;
            this.game.particles.push(particle);
        }
        this.wasHoldingLastFrame = this.game.mouseDown;
    };
    return Player;
}());
