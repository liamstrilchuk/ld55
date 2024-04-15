var Temple = /** @class */ (function () {
    function Temple(x, y, game) {
        this.blood = 0;
        this.spawnTimer = 0;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    Temple.prototype.update = function (delta) {
        this.spawnTimer -= delta;
        if (this.spawnTimer <= 0 && this.blood > 100) {
            this.spawnTimer = 600;
            this.game.robots.push(new Robot(this.x, this.y - 200, this.game));
        }
    };
    Temple.prototype.render = function () {
        this.game.ctx.fillStyle = "rgb(70, 70, 70)";
        this.game.ctx.fillRect(this.x - this.game.relativeX - 100, this.y - this.game.relativeY - 100, 200, 200);
        if (this.spawnTimer > 300) {
            var points = [
                [-50, -50],
                [50, -50],
                [50, 50],
                [-50, 50]
            ];
            var target = [0, -200];
            var colors = ["150, 50, 50", "170, 50, 50", "190, 50, 50", "210, 50, 50", "230, 50, 50"];
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                for (var i = 0; i < colors.length; i++) {
                    var startAlpha = 1 - Math.abs(this.spawnTimer - 600) / 300;
                    var endAlpha = 1 - (this.spawnTimer - 300) / 300;
                    this.game.ctx.strokeStyle = "rgba(" + colors[i] + ", " + Math.min(startAlpha, endAlpha) + ")";
                    this.game.ctx.lineWidth = (colors.length - i) * 2;
                    this.game.ctx.beginPath();
                    this.game.ctx.moveTo(this.x - this.game.relativeX + point[0], this.y - this.game.relativeY + point[1]);
                    this.game.ctx.lineTo(this.x - this.game.relativeX + target[0], this.y - this.game.relativeY + target[1]);
                    this.game.ctx.stroke();
                }
            }
        }
    };
    return Temple;
}());
