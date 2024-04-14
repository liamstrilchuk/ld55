var Enemy = /** @class */ (function () {
    function Enemy(x, y, game) {
        this.velocityY = 0;
        this.x = x;
        this.y = y;
        this.game = game;
        this.health = 30;
    }
    Enemy.prototype.update = function (delta) {
        if (this.health <= 0) {
            return true;
        }
        if (this.game.temple.x < this.x && Math.abs(this.game.temple.x - this.x) > 130) {
            this.x -= 1.5 * delta;
        }
        if (this.game.temple.x > this.x && Math.abs(this.game.temple.x - this.x) > 130) {
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
        return false;
    };
    Enemy.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 10, this.y - this.game.relativeY - 40, 20, 40);
    };
    Enemy.prototype.onHit = function () { };
    return Enemy;
}());
