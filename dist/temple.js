var Temple = /** @class */ (function () {
    function Temple(x, y, game) {
        this.blood = 0;
        this.spawnTimer = 0;
        this.x = x;
        this.y = y;
        this.game = game;
        this.sprite = loadImage("assets/temple.png");
        var height = this.game.world.getHeightAtPos(this.x);
        for (var i = this.x - 92 * 2; i < this.x + 92 * 2; i += 4) {
            var dist = Math.min(Math.abs(i - (this.x - 92 * 2)), Math.abs(i - (this.x + 92 * 2)));
            var newHeight = Math.min(92, dist);
            this.game.world.setHeightAtPos(i, height - newHeight);
        }
    }
    Temple.prototype.update = function (delta) {
        this.spawnTimer -= delta;
        if (this.spawnTimer <= 0 && this.blood > 100 && this.game.robots.length < 3) {
            this.spawnTimer = 1200;
            this.game.robots.push(new Robot(this.x, this.y - 200, this.game));
        }
    };
    Temple.prototype.render = function () {
        this.game.ctx.drawImage(this.sprite, this.x - this.game.relativeX - this.sprite.width * 2, this.y - this.game.relativeY - this.sprite.height * 2 - 20, this.sprite.width * 4, this.sprite.height * 4);
        if (this.spawnTimer > 900) {
            var points = [
                [-108, -80],
                [102, -80],
                [102, -25],
                [-108, -25]
            ];
            var target = [0, -200];
            var colors = ["150, 50, 50", "170, 50, 50", "190, 50, 50", "210, 50, 50", "230, 50, 50"];
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                for (var i = 0; i < colors.length; i++) {
                    var startAlpha = 1 - Math.abs(this.spawnTimer - 1200) / 300;
                    var endAlpha = 1 - (this.spawnTimer - 900) / 300;
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
