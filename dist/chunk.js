var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
var Chunk = /** @class */ (function () {
    function Chunk(x, game, prevChunk) {
        this.tileHeightData = [];
        this.trees = [];
        this.shrubs = [];
        this.lakes = [];
        this.x = x;
        this.game = game;
        this.createChunk(prevChunk);
    }
    Chunk.prototype.createChunk = function (prevChunk) {
        for (var x = 0; x < 150; x++) {
            var h1 = Math.floor(noise.perlin2((this.x * 150 + x) / 200, 0) * 150 / 4) * 4;
            var h2 = Math.floor(noise.perlin2((this.x * 150 + x) / 50, 123) * 150 / 4) * 4;
            var spots = [Math.pow(100000, 0.45) - 4];
            for (var i = 0; i < 20; i++) {
                var spotY = Math.floor(Math.pow(Math.random() * 1000, 0.6) / 4) * 4;
                var isDuplicated = false;
                for (var _i = 0, spots_1 = spots; _i < spots_1.length; _i++) {
                    var spot = spots_1[_i];
                    if (spot === spotY) {
                        isDuplicated = true;
                    }
                }
                if (isDuplicated) {
                    continue;
                }
                spots.push(Math.floor(Math.pow(Math.random() * 100000, 0.45) / 4) * 4);
            }
            var overallHeight = (h1 * 0.7 + h2 * 0.3) * Math.min(Math.abs(x * 4 + this.x * 600) / 900, 1.5);
            this.tileHeightData.push({
                height: Math.floor(overallHeight / 4) * 4,
                spots: spots
            });
        }
        for (var i = 0; i < Math.random() * 8; i++) {
            var randomX = Math.floor(Math.random() * 150);
            var trueX = this.x * 600 + randomX * 4;
            var size = Math.floor(Math.pow(Math.random() * 60, 0.7)) + 5;
            var shouldContinue = true;
            for (var _a = 0, _b = __spreadArray(__spreadArray([], (prevChunk ? prevChunk.trees : []), true), this.trees, true); _a < _b.length; _a++) {
                var tree = _b[_a];
                if (Math.abs(tree.x - trueX) < (size + tree.size) * 5) {
                    shouldContinue = false;
                }
            }
            if (shouldContinue) {
                this.trees.push(new Tree(trueX, this.tileHeightData[randomX].height, size, this.game));
            }
        }
        for (var i = 0; i < 100; i++) {
            var randomX = Math.floor(Math.random() * 150);
            var trueX = this.x * 600 + randomX * 4;
            var shouldContinue = true;
            for (var _c = 0, _d = __spreadArray(__spreadArray([], (prevChunk ? prevChunk.shrubs : []), true), this.shrubs, true); _c < _d.length; _c++) {
                var shrub = _d[_c];
                if (Math.abs(shrub.x - trueX) < 10) {
                    shouldContinue = false;
                }
            }
            if (shouldContinue) {
                this.shrubs.push(new Shrub(trueX, this.tileHeightData[randomX].height, this.game));
            }
        }
        if (Math.random() < 0.5 && (!prevChunk || prevChunk.lakes.length === 0) && Math.abs(this.x) > 2) {
            var from = this.x * 600 + Math.floor(Math.random() * 150) * 4;
            var to = from + Math.floor(Math.random() * 100 + 20) * 4;
            this.lakes.push(new Lake(from, to, this.game));
        }
    };
    Chunk.prototype.render = function (ctx, nextChunk) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(50, 50, 50)";
        for (var x = 0; x < 150; x++) {
            if (this.x * 600 + x * 4 - this.game.relativeX > ctx.canvas.width + 4 || this.x * 600 + x * 4 - this.game.relativeX + 4 < -4) {
                continue;
            }
            ctx.lineTo((this.x * 150 + x) * 4 - this.game.relativeX, this.tileHeightData[x].height - this.game.relativeY);
            ctx.lineTo((this.x * 150 + x) * 4 - this.game.relativeX + 4, this.tileHeightData[x].height - this.game.relativeY);
        }
        ctx.lineTo((this.x * 150 + 151) * 4 - this.game.relativeX, nextChunk.tileHeightData[0].height - this.game.relativeY);
        ctx.lineTo((this.x * 150 + 151) * 4 - this.game.relativeX, this.game.ctx.canvas.height);
        ctx.lineTo((this.x * 150) * 4 - this.game.relativeX, this.game.ctx.canvas.height);
        ctx.fill();
        this.shrubs.forEach(function (shrub) {
            shrub.render(ctx);
        });
        this.trees.forEach(function (tree) {
            tree.render(ctx);
        });
        this.lakes.forEach(function (lake) {
            lake.render();
        });
    };
    return Chunk;
}());
