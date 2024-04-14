var Robot = /** @class */ (function () {
    function Robot(x, y, game) {
        this.velX = 0;
        this.velY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.targetTimer = 240;
        this.reloadTime = 0;
        this.maxReloadTime = 60;
        this.modeChangeTimer = 0;
        this.mode = "patrol";
        this.x = x;
        this.y = y;
        this.game = game;
        this.setNewTarget();
    }
    Robot.prototype.setNewTarget = function () {
        this.targetX = Math.random() * 1000 - 500;
        this.targetY = this.game.world.getHeightAtPos(this.targetX) - 250;
    };
    Robot.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 10, this.y - this.game.relativeY - 10, 20, 20);
        if (this.modeChangeTimer > 0) {
            this.game.ctx.textAlign = "center";
            this.game.ctx.fillText(this.mode, this.x - this.game.relativeX, this.y - this.game.relativeY - 20);
        }
    };
    Robot.prototype.update = function (delta) {
        var _this = this;
        var distX = this.targetX - this.x;
        var distY = this.targetY - this.y;
        var angle = Math.atan2(distY, distX);
        this.velX = Math.max(-4, Math.min(4, this.velX + Math.cos(angle) * 0.1));
        this.velY = Math.max(-1, Math.min(1, this.velY + Math.sin(angle) * 0.1));
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        if (this.mode === "patrol") {
            this.targetTimer -= delta;
            if (this.targetTimer <= 0) {
                this.setNewTarget();
                this.targetTimer = 240;
            }
        }
        else {
            this.targetX = this.game.player.x;
            this.targetY = this.game.world.getHeightAtPos(this.targetX) - 250;
        }
        this.modeChangeTimer -= delta;
        this.reloadTime -= delta;
        if (this.reloadTime <= 0) {
            var min_1, minDist_1 = Infinity;
            this.game.enemies.forEach(function (enemy) {
                var dist = Math.sqrt(Math.pow((_this.x - enemy.x), 2) + Math.pow((_this.y - enemy.y), 2));
                if (dist < minDist_1) {
                    minDist_1 = dist;
                    min_1 = enemy;
                }
            });
            if (!min_1 || minDist_1 > 350) {
                return false;
            }
            var angle_1 = Math.atan2((min_1.y - 20) - this.y, min_1.x - this.x);
            this.game.bullets.push(new Bullet(this.x, this.y, Math.cos(angle_1) * 10, Math.sin(angle_1) * 10, 0, this.game));
            this.reloadTime = this.maxReloadTime;
        }
        return false;
    };
    return Robot;
}());
