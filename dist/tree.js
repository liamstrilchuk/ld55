var Tree = /** @class */ (function () {
    function Tree(x, y, size, game) {
        this.widths = [];
        this.x = x;
        this.y = y;
        this.size = size;
        this.game = game;
        this.createTree();
    }
    Tree.prototype.createTree = function () {
        for (var i = 0; i < this.size; i++) {
            this.widths.push(Math.pow(this.size, 0.7) - Math.pow(i, 0.35));
        }
        for (var i = 0; i < Math.min(this.size / 5, 4); i++) {
            this.widths.push(this.size * (0.2 + i * 0.2));
        }
        this.widths.push(this.size);
        for (var i = 0;; i++) {
            if (this.widths[this.widths.length - 1] < 1) {
                break;
            }
            this.widths.push(this.widths[this.widths.length - 1] - Math.random() * 0.6);
        }
        for (var i = this.size; i < this.widths.length; i++) {
            this.widths[i] += Math.sqrt(Math.random() * 8);
        }
    };
    Tree.prototype.render = function (ctx) {
        ctx.fillStyle = "rgb(50, 50, 50)";
        for (var i = -3; i < this.widths.length; i++) {
            ctx.fillRect(this.x - Math.floor(this.widths[Math.max(i, 0)]) * 4 - this.game.relativeX, this.y - i * 4 - this.game.relativeY, Math.floor(this.widths[Math.max(i, 0)]) * 8, 5);
        }
    };
    return Tree;
}());
var Shrub = /** @class */ (function () {
    function Shrub(x, y, game) {
        this.points = [[0, 1]];
        this.x = x;
        this.y = y;
        this.game = game;
        this.recursivelyAdd(this.points[0]);
    }
    Shrub.prototype.recursivelyAdd = function (point) {
        var rand = Math.random();
        if ((rand < 0.3 || this.points.length > 10) && this.points.length > 2) {
            return;
        }
        else if (rand < 0.6) {
            this.points.push([point[0], point[1] + 1]);
            this.recursivelyAdd(this.points[this.points.length - 1]);
        }
        else if (rand < 0.75) {
            this.points.push([point[0] + 1, point[1] + 1]);
            this.recursivelyAdd(this.points[this.points.length - 1]);
        }
        else if (rand < 0.9) {
            this.points.push([point[0] - 1, point[1] + 1]);
            this.recursivelyAdd(this.points[this.points.length - 1]);
        }
        else if (rand < 0.93 && point[1] > 4) {
            var color = Math.floor(Math.random() * 3);
            this.points.push([point[0] - 1, point[1] + 1, color]);
            this.points.push([point[0], point[1] + 1, color]);
            this.points.push([point[0] + 1, point[1] + 1, color]);
            this.points.push([point[0] - 1, point[1] + 2, color]);
            this.points.push([point[0], point[1] + 2, color]);
            this.points.push([point[0] + 1, point[1] + 2, color]);
            this.points.push([point[0], point[1] + 3, color]);
            this.points.push([point[0], point[1], color]);
        }
        else {
            this.points.push([point[0] + 1, point[1] + 1]);
            this.recursivelyAdd(this.points[this.points.length - 1]);
            this.points.push([point[0] - 1, point[1] + 1]);
            this.recursivelyAdd(this.points[this.points.length - 1]);
        }
    };
    Shrub.prototype.render = function (ctx) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            ctx.fillStyle = "rgb(50, 50, 50)";
            if (point.length === 3) {
                switch (point[2]) {
                    case 0:
                        ctx.fillStyle = "rgb(200, 200, 50)";
                        break;
                    case 1:
                        ctx.fillStyle = "rgb(50, 100, 200)";
                        break;
                    case 2:
                        ctx.fillStyle = "rgb(150, 50, 200)";
                        break;
                }
            }
            ctx.fillRect(this.x - point[0] * 4 - this.game.relativeX, this.y - point[1] * 4 - this.game.relativeY, 4, 4);
        }
    };
    return Shrub;
}());
