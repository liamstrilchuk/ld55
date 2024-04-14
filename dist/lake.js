var Lake = /** @class */ (function () {
    function Lake(from, to, game) {
        this.maxLakeHeight = 0;
        this.from = from;
        this.to = to;
        this.game = game;
    }
    Lake.prototype.createLake = function () {
        var minimumHeight = 0;
        for (var x = this.from; x < this.to; x += 4) {
            var height = this.game.world.getHeightAtPos(x);
            minimumHeight = Math.max(minimumHeight, height);
        }
        this.maxLakeHeight = minimumHeight + 8;
        for (var x = this.from; x < this.to; x += 4) {
            var height = this.game.world.getHeightAtPos(x);
            var dist = Math.min(Math.abs(x - this.from), Math.abs(x - this.to)) * 10;
            this.game.world.setHeightAtPos(x, Math.floor((Math.random() * 3 + height + Math.pow(dist, 0.6)) / 4) * 4);
        }
        var startChunk = this.game.world.getChunkAtPos(this.from);
        var endChunk = this.game.world.getChunkAtPos(this.to);
        for (var i = startChunk.shrubs.length - 1; i > -1; i--) {
            var shrub = startChunk.shrubs[i];
            if (shrub.x >= this.from && shrub.x <= this.to) {
                startChunk.shrubs.splice(i, 1);
            }
        }
        for (var i = startChunk.trees.length - 1; i > -1; i--) {
            var tree = startChunk.trees[i];
            if (tree.x >= this.from && tree.x <= this.to) {
                startChunk.trees.splice(i, 1);
            }
        }
        if (endChunk) {
            for (var i = endChunk.shrubs.length - 1; i > -1; i--) {
                var shrub = endChunk.shrubs[i];
                if (shrub.x >= this.from && shrub.x <= this.to) {
                    endChunk.shrubs.splice(i, 1);
                }
            }
            for (var i = endChunk.trees.length - 1; i > -1; i--) {
                var tree = endChunk.trees[i];
                if (tree.x >= this.from && tree.x <= this.to) {
                    endChunk.trees.splice(i, 1);
                }
            }
        }
    };
    Lake.prototype.render = function () {
        for (var x = this.from; x < this.to; x += 4) {
            var height = this.game.world.getHeightAtPos(x);
            if (height <= this.maxLakeHeight) {
                continue;
            }
            this.game.ctx.fillStyle = "rgb(50, 50, 220)";
            this.game.ctx.fillRect(x - this.game.relativeX, height - this.game.relativeY, 5, this.maxLakeHeight - height);
        }
    };
    return Lake;
}());
