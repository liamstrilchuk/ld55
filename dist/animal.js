var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Animal = /** @class */ (function () {
    function Animal(x, y, game) {
        this.velocityY = 0;
        this.framesSinceSwimming = 0;
        this.targetTime = 0;
        this.targetX = 0;
        this.health = 20;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    Animal.prototype.update = function (delta) {
        var _this = this;
        if (this.health <= 0) {
            return true;
        }
        this.targetTime -= delta;
        if (this.targetTime < 0) {
            this.targetTime = Math.random() * 120 + 60;
            this.targetX = this.x + Math.random() * 400 - 200;
        }
        var swimming = false;
        var lakeHeight = null;
        __spreadArray(__spreadArray([], this.game.world.getChunkAtPos(this.x).lakes, true), this.game.world.getChunkAtPos(this.x - 600).lakes, true).forEach(function (lake) {
            if (_this.x >= lake.from && _this.x <= lake.to) {
                swimming = _this.y > lake.maxLakeHeight;
                lakeHeight = lake.maxLakeHeight;
            }
        });
        var isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;
        if (this.targetX < this.x) {
            this.x -= (isInLake ? 1 : 2) * delta;
        }
        if (this.targetX > this.x) {
            this.x += (isInLake ? 1 : 2) * delta;
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
        return false;
    };
    Animal.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 20, this.y - this.game.relativeY - 20, 40, 20);
    };
    Animal.prototype.onHit = function () {
        var angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
        this.targetX = this.x - Math.cos(angle) * 400;
        this.targetTime = 240;
    };
    return Animal;
}());
