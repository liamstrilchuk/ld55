var World = /** @class */ (function () {
    function World(game) {
        this.parallaxLayers = [];
        this.chunks = {};
        this.game = game;
        this.createWorld();
    }
    World.prototype.createWorld = function () {
        noise.seed(Math.random());
        for (var x = -50; x < 50; x++) {
            this.chunks[x] = new Chunk(x, this.game, this.chunks[x - 1] || null);
        }
        for (var i = 0; i < 3; i++) {
            var layer = {};
            for (var x = -50 / (i + 2); x < 50 / (i + 2); x++) {
                layer[x] = [];
                for (var y = 0; y < 75; y++) {
                    var h1 = Math.floor(noise.perlin2((x * 75 + y + i * 512) / (200 / (i + 1)), 0) * 500 / 4) * 4 - 100 * i;
                    var h2 = Math.floor(noise.perlin2((x * 75 + y + i * 512) / (100 / (i + 1)), 123) * 500 / 4) * 4 - 100 * i;
                    var h3 = Math.floor(noise.perlin2((x * 75 + y + i * 512) / (30 / (i + 1)), 123) * 500 / 4) * 4 - 100 * i;
                    layer[x].push(Math.floor((h1 * 0.4 + h2 * 0.6 + h3 * 0.1) / 4) * 4);
                }
            }
            this.parallaxLayers.push(layer);
        }
    };
    World.prototype.render = function () {
        for (var i = 2; i > -1; i--) {
            var layer = this.parallaxLayers[i];
            for (var pos in layer) {
                var realMinX = Number(pos) * 75 * 4 - this.game.relativeX / (i + 2);
                var realMaxX = (Number(pos) + 1) * 75 * 4 - this.game.relativeX / (i + 2);
                if (realMinX > this.game.ctx.canvas.width + 4 || realMaxX < -4) {
                    continue;
                }
                this.game.ctx.fillStyle = "rgb(" + (160 + i * 20) + ", " + (160 + i * 20) + ", " + (160 + i * 20) + ")";
                this.game.ctx.beginPath();
                for (var x = 0; x < layer[pos].length; x++) {
                    this.game.ctx.lineTo((Number(pos) * 75 + x) * 4 - this.game.relativeX / (i + 2), layer[pos][x] - this.game.relativeY / (i + 2));
                    this.game.ctx.lineTo((Number(pos) * 75 + x) * 4 - this.game.relativeX / (i + 2) + 4, layer[pos][x] - this.game.relativeY / (i + 2));
                }
                this.game.ctx.lineTo((Number(pos) * 75 + 76) * 4 - this.game.relativeX / (i + 2), this.game.ctx.canvas.height);
                this.game.ctx.lineTo((Number(pos) * 75) * 4 - this.game.relativeX / (i + 2), this.game.ctx.canvas.height);
                this.game.ctx.fill();
            }
        }
        for (var pos in this.chunks) {
            var chunk = this.chunks[pos];
            var realMinX = chunk.x * 150 * 4 - this.game.relativeX;
            var realMaxX = (chunk.x + 1) * 150 * 4 - this.game.relativeX;
            if (realMinX > this.game.ctx.canvas.width + 200 || realMaxX < -200) {
                continue;
            }
            chunk.render(this.game.ctx, this.chunks[Number(pos) + 1]);
        }
    };
    World.prototype.getHeightAtPos = function (x) {
        x = Math.round(x);
        var chunkX = Math.floor(x / 600);
        if (!this.chunks[chunkX]) {
            return 0;
        }
        var chunk = this.chunks[chunkX];
        var tileX = Math.floor((x - chunkX * 600) / 4);
        return chunk.tileHeightData[tileX].height;
    };
    World.prototype.setHeightAtPos = function (x, height) {
        x = Math.round(x);
        var chunkX = Math.floor(x / 600);
        if (!this.chunks[chunkX]) {
            return;
        }
        var chunk = this.chunks[chunkX];
        var tileX = Math.floor((x - chunkX * 600) / 4);
        chunk.tileHeightData[tileX].height = height;
    };
    World.prototype.getChunkAtPos = function (x) {
        var chunkX = Math.floor(x / 600);
        return this.chunks[chunkX] || null;
    };
    return World;
}());
