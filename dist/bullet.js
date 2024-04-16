var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            if (Math.abs(enemy.x - _this.x) < 20 && Math.abs((enemy.y - 20) - _this.y) < 30 && !_this.enemiesHit.includes(enemy)) {
                enemy.health -= 10;
                _this.enemiesHit.push(enemy);
                enemy.onHit();
                if (enemy.health <= 0) {
                    for (var i = 0; i < Math.ceil(10 / Math.pow(_this.game.wave, 0.5)); i++) {
                        var angle = Math.atan2(-_this.velY, -_this.velX) + Math.PI * 2 - Math.PI * Math.random();
                        _this.game.particles.push(new Blood(_this.x - _this.velX * delta, _this.y - _this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, _this.game));
                    }
                }
                else {
                    for (var i = 0; i < Math.ceil(3 / Math.pow(_this.game.wave, 0.3)); i++) {
                        var angle = Math.atan2(-_this.velY, -_this.velX) + Math.PI * 2 - Math.PI * Math.random();
                        _this.game.particles.push(new Blood(_this.x - _this.velX * delta, _this.y - _this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, _this.game));
                    }
                }
            }
        });
        return this.enemiesHit.length > 0;
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
var EnemyBullet = /** @class */ (function (_super) {
    __extends(EnemyBullet, _super);
    function EnemyBullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyBullet.prototype.update = function (delta) {
        var _this = this;
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        this.velY += this.drop * delta;
        if (this.y > this.game.world.getHeightAtPos(this.x)) {
            return true;
        }
        var hasHit = false;
        this.game.structures.forEach(function (structure) {
            if (Math.abs(structure.x - _this.x) > 50) {
                return;
            }
            if (structure instanceof Turret) {
                if (Math.abs(_this.x - structure.x) < Turret.width / 2) {
                    structure.health -= 10;
                    hasHit = true;
                }
                return;
            }
            for (var i = structure.pieces.length - 1; i > -1; i--) {
                var piece = structure.pieces[i];
                if (Math.sqrt(Math.pow((piece.x + 2 - _this.x), 2) + Math.pow((piece.y + 2 - _this.y), 2)) < 15) {
                    _this.game.particles.push(new Particle(piece.x, piece.y, Math.random() - 0.5, -Math.random(), _this.game, structure.pieces[i].color));
                    structure.pieces.splice(i, 1);
                    hasHit = true;
                }
            }
        });
        if (Math.abs(this.x - this.game.player.x) < 20 && Math.abs(this.y - this.game.player.y) < 64) {
            this.game.player.health -= 10;
            hasHit = true;
            if (this.game.player.health <= 0) {
                this.game.player.x = 0;
                this.game.player.y = -200;
                this.game.player.health = 100;
            }
        }
        return hasHit;
    };
    return EnemyBullet;
}(Bullet));
