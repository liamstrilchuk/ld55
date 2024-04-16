var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Enemy = /** @class */ (function () {
    function Enemy(x, y, game) {
        this.velocityY = 0;
        this.reloadTime = 0;
        this.maxReloadTime = 60;
        this.suckBloodTimer = 30;
        this.framesSinceSwimming = 0;
        this.lastDir = "left";
        this.x = x;
        this.y = y;
        this.game = game;
        this.health = 30;
        this.assets = {
            "left": loadImage("assets/enemy2.png"),
            "right": loadImage("assets/enemy1.png")
        };
    }
    Enemy.prototype.update = function (delta) {
        var _this = this;
        if (this.health <= 0) {
            return true;
        }
        var nearestLeft = Infinity, nearestRight = Infinity;
        this.game.structures.forEach(function (structure) {
            if (structure.x > _this.x && structure.x - _this.x < nearestRight) {
                nearestRight = structure.x - _this.x;
            }
            if (structure.x < _this.x && _this.x - structure.x < nearestLeft) {
                nearestLeft = _this.x - structure.x;
            }
        });
        var swimming = false;
        var lakeHeight = null;
        __spreadArray(__spreadArray([], this.game.world.getChunkAtPos(this.x).lakes, true), this.game.world.getChunkAtPos(this.x - 600).lakes, true).forEach(function (lake) {
            if (_this.x >= lake.from && _this.x <= lake.to) {
                swimming = _this.y > lake.maxLakeHeight;
                lakeHeight = lake.maxLakeHeight;
            }
        });
        var isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;
        if (this.game.temple.x < this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestLeft > 80) {
            this.x -= (isInLake ? 0.75 : 1.5) * delta;
            this.lastDir = "left";
        }
        if (this.game.temple.x > this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestRight > 90) {
            this.x += (isInLake ? 0.75 : 1.5) * delta;
            this.lastDir = "right";
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
        this.suckBloodTimer -= delta;
        if (this.suckBloodTimer <= 0 && Math.abs(this.x - this.game.temple.x) < 150 && this.game.temple.blood > -30) {
            this.game.temple.blood -= 1;
            var particle = new Blood(this.game.temple.x, this.game.temple.y, 0, 0, this.game);
            particle.goingToEnemy = this;
            this.game.particles.push(particle);
            this.suckBloodTimer = 30;
        }
        this.reloadTime -= delta;
        if (this.reloadTime <= 0) {
            var playerDist = Math.abs(this.x - this.game.player.x);
            if (playerDist < 400) {
                var angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
                this.game.bullets.push(new EnemyBullet(this.x, this.y - 20, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
                this.reloadTime = this.maxReloadTime;
                return false;
            }
            var min_1, minDist_1 = Infinity;
            this.game.structures.forEach(function (structure) {
                if (Math.abs(structure.x - _this.x) < minDist_1) {
                    min_1 = structure;
                    minDist_1 = Math.abs(structure.x - _this.x);
                }
            });
            if (!min_1 || !min_1.pieces.length) {
                return false;
            }
            var rand = Math.floor(Math.random() * min_1.pieces.length);
            if (minDist_1 < 500) {
                var angle = Math.atan2(min_1.pieces[rand].y - this.y + 20, min_1.pieces[rand].x - this.x);
                this.game.bullets.push(new EnemyBullet(this.x, this.y - 20, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
                this.reloadTime = this.maxReloadTime;
            }
        }
        return false;
    };
    Enemy.prototype.render = function () {
        this.game.ctx.drawImage(this.assets[this.lastDir], this.x - this.game.relativeX - 20, this.y - this.game.relativeY - 64, 40, 64);
    };
    Enemy.prototype.onHit = function () { };
    return Enemy;
}());
