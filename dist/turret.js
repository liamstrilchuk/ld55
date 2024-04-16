var Turret = /** @class */ (function () {
    function Turret(x, y, game) {
        this.pieces = [];
        this.health = 100;
        this.direction = 0;
        this.reloadTime = 60;
        this.maxReloadTime = 60;
        this.x = x;
        this.y = y;
        this.game = game;
        this.createTurret();
    }
    Turret.prototype.createTurret = function () {
        var matrix = [
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 0, 0],
            [1, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 0, 0, 0],
            [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
            [0, 0, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ];
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 0) {
                    continue;
                }
                this.pieces.push(new WallPiece(this.x + j * 2, this.y - (matrix.length - i) * 2, 2, 2, matrix[i][j] === 1 ? "rgb(90, 50, 50)" : "rgb(120, 80, 80)", Math.floor(Math.random() * 60) + 1, this.game));
            }
        }
    };
    Turret.prototype.update = function () {
        var _this = this;
        if (this.health <= 0) {
            this.pieces.forEach(function (piece) {
                _this.game.particles.push(new Particle(piece.x, piece.y, Math.random() * 2 - 1, Math.random() * 2 - 1, _this.game, piece.color));
            });
            return true;
        }
        this.reloadTime--;
        var minDist = Infinity, minEnemy = null;
        this.game.enemies.forEach(function (enemy) {
            var dist = Math.abs(_this.x - enemy.x);
            if (dist < minDist) {
                minDist = dist;
                minEnemy = enemy;
            }
        });
        if (!minEnemy && ((this.direction === 0 && this.game.temple.x > this.x) || (this.direction === 1 && this.game.temple.x < this.x))) {
            this.direction = 1 - this.direction;
            this.pieces.forEach(function (piece) {
                if (piece.y < _this.y - 34) {
                    piece.x = 48 - (piece.x - _this.x) + _this.x;
                }
            });
        }
        if (!minEnemy || minDist > 300) {
            return false;
        }
        if (this.direction === 0 && minEnemy.x < this.x || this.direction === 1 && minEnemy.x > this.x) {
            this.direction = 1 - this.direction;
            this.pieces.forEach(function (piece) {
                if (piece.y < _this.y - 34) {
                    piece.x = 48 - (piece.x - _this.x) + _this.x;
                }
            });
        }
        if (this.reloadTime <= 0) {
            var angle = Math.atan2((minEnemy.y - 20) - (this.y - Turret.height + 8), minEnemy.x - this.x) + Math.random() * Math.PI / 16 - Math.PI / 32;
            this.reloadTime = this.maxReloadTime;
            this.game.bullets.push(new Bullet(this.x + (this.direction === 0 ? Turret.width : 0), this.y - Turret.height + 8, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
        }
        return false;
    };
    Turret.prototype.render = function () {
        this.pieces.forEach(function (p) { return p.render(); });
        this.game.ctx.fillStyle = "rgb(50, 50, 50)";
        this.game.ctx.fillRect(this.x - this.game.relativeX, this.y - this.game.relativeY, Wall.width + 1, 50);
    };
    Turret.width = 48;
    Turret.height = 66;
    Turret.cost = 100;
    return Turret;
}());
