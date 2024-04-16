interface TileHeightInfo {
	height: number,
	spots: number[]
};

class Chunk {
	public x: number;
	public tileHeightData: TileHeightInfo[] = [];
	public trees: Tree[] = [];
	public shrubs: Shrub[] = [];
	public lakes: Lake[] = [];

	private game: Game;

	constructor(x: number, game: Game, prevChunk: Chunk) {
		this.x = x;
		this.game = game;

		this.createChunk(prevChunk);
	}

	private createChunk(prevChunk: Chunk) {
		for (let x = 0; x < 150; x++) {
			const h1 = Math.floor((noise as any).perlin2((this.x * 150 + x) / 200, 0) * 150 / 4) * 4;
			const h2 = Math.floor((noise as any).perlin2((this.x * 150 + x) / 50, 123) * 150 / 4) * 4;
			const spots: number[] = [Math.pow(100000, 0.45) - 4];

			for (let i = 0; i < 20; i++) {
				const spotY = Math.floor(Math.pow(Math.random() * 1000, 0.6) / 4) * 4;

				let isDuplicated = false;

				for (const spot of spots) {
					if (spot === spotY) {
						isDuplicated = true;
					}
				}

				if (isDuplicated) {
					continue;
				}

				spots.push(Math.floor(Math.pow(Math.random() * 100000, 0.45) / 4) * 4);
			}

			const overallHeight = (h1 * 0.7 + h2 * 0.3) * Math.min(Math.abs(x * 4 + this.x * 600) / 900, 1.5);

			this.tileHeightData.push({
				height: Math.floor(overallHeight / 4) * 4,
				spots: spots
			});
		}

		for (let i = 0; i < Math.random() * 8; i++) {
			const randomX = Math.floor(Math.random() * 150);
			const trueX = this.x * 600 + randomX * 4;
			const size = Math.floor(Math.pow(Math.random() * 60, 0.7)) + 5;
			let shouldContinue = true;
			for (const tree of [...(prevChunk ? prevChunk.trees : []), ...this.trees]) {
				if (Math.abs(tree.x - trueX) < (size + tree.size) * 5) {
					shouldContinue = false;
				}
			}
			if (shouldContinue) {
				this.trees.push(new Tree(trueX, this.tileHeightData[randomX].height, size, this.game));
			}
		}

		for (let i = 0; i < 100; i++) {
			const randomX = Math.floor(Math.random() * 150);
			const trueX = this.x * 600 + randomX * 4;
			let shouldContinue = true;
			for (const shrub of [...(prevChunk ? prevChunk.shrubs : []), ...this.shrubs]) {
				if (Math.abs(shrub.x - trueX) < 10) {
					shouldContinue = false;
				}
			}
			if (shouldContinue) {
				this.shrubs.push(new Shrub(trueX, this.tileHeightData[randomX].height, this.game));
			}
		}

		if (Math.random() < 0.5 && (!prevChunk || prevChunk.lakes.length === 0) && Math.abs(this.x) > 2) {
			const from = this.x * 600 + Math.floor(Math.random() * 150) * 4;
			const to = from + Math.floor(Math.random() * 100 + 20) * 4;
			this.lakes.push(new Lake(from, to, this.game));
		}
	}

	public render(ctx: CanvasRenderingContext2D, nextChunk: Chunk) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(50, 50, 50)";
		for (let x = 0; x < 150; x++) {
			if (this.x * 600 + x * 4 - this.game.relativeX > ctx.canvas.width + 4 || this.x * 600 + x * 4 - this.game.relativeX + 4 < -4) {
				continue;
			}

			ctx.lineTo(
				(this.x * 150 + x) * 4 - this.game.relativeX,
				this.tileHeightData[x].height - this.game.relativeY
			);
			ctx.lineTo(
				(this.x * 150 + x) * 4 - this.game.relativeX + 4,
				this.tileHeightData[x].height - this.game.relativeY
			);
		}
		ctx.lineTo(
			(this.x * 150 + 151) * 4 - this.game.relativeX,
			nextChunk.tileHeightData[0].height - this.game.relativeY
		);
		ctx.lineTo(
			(this.x * 150 + 151) * 4 - this.game.relativeX,
			this.game.ctx.canvas.height
		);
		ctx.lineTo(
			(this.x * 150) * 4 - this.game.relativeX,
			this.game.ctx.canvas.height
		);
		ctx.fill();

		this.shrubs.forEach(shrub => {
			shrub.render(ctx);
		});

		this.trees.forEach(tree => {
			tree.render(ctx);
		});

		this.lakes.forEach(lake => {
			lake.render();
		});
	}
}