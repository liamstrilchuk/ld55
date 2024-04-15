var Enemy = /** @class */ (function () {
    function Enemy(x, y, game) {
        this.velocityY = 0;
        this.reloadTime = 0;
        this.maxReloadTime = 60;
        this.x = x;
        this.y = y;
        this.game = game;
        this.health = 30;
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
        if (this.game.temple.x < this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestLeft > 80) {
            this.x -= 1.5 * delta;
        }
        if (this.game.temple.x > this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestRight > 90) {
            this.x += 1.5 * delta;
        }
        this.velocityY += 0.7 * delta;
        if (this.y + this.velocityY > this.game.world.getHeightAtPos(this.x)) {
            this.velocityY = 0;
            this.y = this.game.world.getHeightAtPos(this.x);
        }
        else {
            this.y += this.velocityY * delta;
        }
        this.reloadTime -= delta;
        if (this.reloadTime <= 0) {
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
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 10, this.y - this.game.relativeY - 40, 20, 40);
    };
    Enemy.prototype.onHit = function () { };
    return Enemy;
}());
