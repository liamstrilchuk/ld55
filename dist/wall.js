var Wall = /** @class */ (function () {
    function Wall(x, y, game) {
        this.pieces = [];
        this.x = x;
        this.y = y;
        this.game = game;
        this.createWall();
    }
    Wall.prototype.createWall = function () {
        for (var col = 0; col < 11; col++) {
            for (var row = 0; row < 30; row++) {
                var color = "rgb(120, 80, 80)";
                if ((row % 3 === 2) || (row % 6 >= 0 && row % 6 <= 1 && col % 4 === 2) || (row % 6 >= 3 && row % 6 <= 4 && col % 4 === 0)) {
                    color = "rgb(90, 50, 50)";
                }
                var addTime = Math.floor(Math.random() * 60) + 2;
                this.pieces.push(new WallPiece(this.x + col * 4, this.y - row * 4, 4, 4, color, addTime, this.game));
            }
        }
    };
    Wall.prototype.update = function () {
        var _this = this;
        if (this.pieces.length < 11 * 30 / 3) {
            this.pieces.forEach(function (piece) {
                _this.game.particles.push(new Particle(piece.x, piece.y, Math.random() * 2 - 1, Math.random() * 2 - 1, _this.game, piece.color));
            });
            return true;
        }
        return false;
    };
    Wall.prototype.render = function () {
        this.pieces.forEach(function (piece) { return piece.render(); });
        this.game.ctx.fillStyle = "rgb(50, 50, 50)";
        this.game.ctx.fillRect(this.x - this.game.relativeX, this.y - this.game.relativeY + 4, Wall.width + 1, 50);
    };
    Wall.width = 44;
    Wall.height = 120;
    Wall.cost = 50;
    return Wall;
}());
var WallPiece = /** @class */ (function () {
    function WallPiece(x, y, width, height, color, addTime, game) {
        this.startX = 0;
        this.startY = 0;
        this.framesLived = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.game = game;
        this.color = color;
        this.addTime = addTime;
    }
    WallPiece.prototype.render = function () {
        if (this.addTime > 0) {
            this.addTime--;
            if (this.addTime <= 0) {
                this.startX = this.game.player.x;
                this.startY = this.game.player.y - 20;
            }
            return;
        }
        var x = this.startX + (this.x - this.startX) * Math.min(60, this.framesLived - this.addTime) / 60;
        var y = this.startY + (this.y - this.startY) * Math.min(60, this.framesLived - this.addTime) / 60;
        this.framesLived++;
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(x - this.game.relativeX, y - this.game.relativeY, this.width + 1, this.height + 1);
    };
    return WallPiece;
}());
