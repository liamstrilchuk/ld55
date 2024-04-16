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
var Particle = /** @class */ (function () {
    function Particle(x, y, velX, velY, game, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.game = game;
        this.color = color || "rgb(50, 50, 50)";
    }
    Particle.prototype.update = function (delta) {
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        this.velY += 0.2 * delta;
        if (this.y > this.game.world.getHeightAtPos(this.x)) {
            return true;
        }
        return false;
    };
    Particle.prototype.render = function () {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(Math.floor((this.x - this.game.relativeX - 2) / 4) * 4, Math.floor((this.y - this.game.relativeY - 2) / 4) * 4, 4, 4);
    };
    return Particle;
}());
var Blood = /** @class */ (function (_super) {
    __extends(Blood, _super);
    function Blood() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emittedByPlayer = false;
        _this.goingToEnemy = null;
        return _this;
    }
    Blood.prototype.update = function (delta) {
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        if (this.goingToEnemy !== null) {
            var angle = Math.atan2(this.goingToEnemy.y - 20 - this.y, this.goingToEnemy.x - this.x);
            this.velX += Math.cos(angle) * 0.3;
            this.velY += Math.sin(angle) * 0.3;
            var dist_1 = Math.sqrt(Math.pow((this.goingToEnemy.x - this.x), 2) + Math.pow((this.goingToEnemy.y - this.y), 2));
            if (dist_1 < 20) {
                return true;
            }
        }
        if (this.emittedByPlayer) {
            var angle = Math.atan2(this.game.temple.y - this.y, this.game.temple.x - this.x);
            this.velX += Math.cos(angle) * 0.3;
            this.velY += Math.sin(angle) * 0.3;
            var templeDist = Math.sqrt(Math.pow((this.game.temple.x - this.x), 2) + Math.pow((this.game.temple.y - this.y), 2));
            if (templeDist < 100) {
                this.game.temple.blood += 1;
                return true;
            }
        }
        var dist = Math.sqrt(Math.pow((this.game.player.x - this.x), 2) + Math.pow((this.game.player.y - this.y), 2));
        if (dist < 20 && !this.emittedByPlayer && !this.goingToEnemy) {
            this.game.player.blood += 1;
            return true;
        }
        if (dist < 50 && !this.emittedByPlayer && !this.goingToEnemy) {
            var angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
            this.velX += Math.cos(angle) * 0.3;
            this.velY += Math.sin(angle) * 0.3;
        }
        else if (!this.goingToEnemy) {
            this.velY += 0.15 * delta;
        }
        if (this.y > this.game.world.getHeightAtPos(this.x) && !this.emittedByPlayer) {
            this.y = this.game.world.getHeightAtPos(this.x);
            this.velY = 0;
            this.velX *= 0.5;
        }
        return false;
    };
    Blood.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(200, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 3, this.y - this.game.relativeY - 3, 6, 6);
    };
    return Blood;
}(Particle));
var FontParticle = /** @class */ (function (_super) {
    __extends(FontParticle, _super);
    function FontParticle(x, y, velX, velY, size, game, color) {
        var _this = _super.call(this, x, y, velX, velY, game, color) || this;
        _this.framesLived = 0;
        _this.hasUpdated = false;
        _this.framesOnGround = 0;
        _this.fadeAfter = 0;
        _this.size = size;
        return _this;
    }
    FontParticle.prototype.update = function (delta) {
        this.framesLived += 1;
        if (this.framesLived <= 60) {
            this.x = this.startX + (this.endX - this.startX) * Math.min(this.framesLived, 30) / 30;
            this.y = this.startY + (this.endY - this.startY) * Math.min(this.framesLived, 30) / 30;
        }
        if (this.framesLived > 120 + this.fadeAfter && this.game.started) {
            if (!this.hasUpdated) {
                this.velX = Math.random() * 2;
                this.velY = Math.random() * -2;
                this.hasUpdated = true;
            }
            this.x += this.velX * delta;
            this.y += this.velY * delta;
            this.velY += 0.2 * delta;
            if (this.y > this.game.world.getHeightAtPos(this.x)) {
                this.y = this.game.world.getHeightAtPos(this.x);
                this.velY = 0;
                this.velX *= 0.5;
                this.framesOnGround += delta;
                if (this.framesOnGround > 60) {
                    return true;
                }
            }
        }
        return false;
    };
    FontParticle.prototype.render = function () {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.x - this.game.relativeX - this.size / 2, this.y - this.game.relativeY - this.size / 2, this.size + 1, this.size + 1);
    };
    return FontParticle;
}(Particle));
