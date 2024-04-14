var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Bullet = /** @class */ (function () {
    function Bullet(x, y, velX, velY, drop, game) {
        this.enemiesHit = [];
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.drop = drop;
        this.game = game;
    }
    Bullet.prototype.update = function (delta) {
        var _this = this;
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        this.velY += this.drop * delta;
        if (this.y > this.game.world.getHeightAtPos(this.x)) {
            for (var i = 0; i < 10; i++) {
                var angle = Math.atan2(-this.velY, -this.velX) + Math.PI / 6 - Math.PI / 3 * Math.random();
                this.game.particles.push(new Particle(this.x - this.velX * delta, this.y - this.velY * delta, Math.cos(angle) * 5, Math.sin(angle) * 5, this.game));
            }
            return true;
        }
        __spreadArray(__spreadArray([], this.game.enemies, true), this.game.animals, true).forEach(function (enemy) {
            if (Math.abs(enemy.x - _this.x) < 10 && Math.abs((enemy.y - 20) - _this.y) < 20 && !_this.enemiesHit.includes(enemy)) {
                enemy.health -= 10;
                _this.enemiesHit.push(enemy);
                enemy.onHit();
                if (enemy.health <= 0) {
                    for (var i = 0; i < 15; i++) {
                        var angle = Math.atan2(-_this.velY, -_this.velX) + Math.PI * 2 - Math.PI * Math.random();
                        _this.game.particles.push(new Blood(_this.x - _this.velX * delta, _this.y - _this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, _this.game));
                    }
                }
                else {
                    for (var i = 0; i < 4; i++) {
                        var angle = Math.atan2(-_this.velY, -_this.velX) + Math.PI * 2 - Math.PI * Math.random();
                        _this.game.particles.push(new Blood(_this.x - _this.velX * delta, _this.y - _this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, _this.game));
                    }
                }
            }
        });
        return false;
    };
    Bullet.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.save();
        this.game.ctx.translate(this.x - this.game.relativeX, this.y - this.game.relativeY);
        this.game.ctx.rotate(Math.atan2(this.velY, this.velX));
        this.game.ctx.fillRect(-15, -2, 30, 4);
        this.game.ctx.restore();
    };
    return Bullet;
}());
