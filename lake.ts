class Lake {
	public from: number;
	public to: number;
	private game: Game;
	public maxLakeHeight: number = 0;

	constructor(from: number, to: number, game: Game) {
		this.from = from;
		this.to = to;
		this.game = game;
	}

	public createLake(): void {
		let minimumHeight = 0;

		for (let x = this.from; x < this.to; x += 4) {
			const height = this.game.world.getHeightAtPos(x);
			minimumHeight = Math.max(minimumHeight, height);
		}

		this.maxLakeHeight = minimumHeight + 8;

		for (let x = this.from; x < this.to; x += 4) {
			const height = this.game.world.getHeightAtPos(x);
			const dist = Math.min(Math.abs(x - this.from), Math.abs(x - this.to)) * 10;

			this.game.world.setHeightAtPos(x, Math.floor((Math.random() * 3 + height + Math.pow(dist, 0.6)) / 4) * 4);
		}

		const startChunk = this.game.world.getChunkAtPos(this.from);
		const endChunk = this.game.world.getChunkAtPos(this.to);

		for (let i = startChunk.shrubs.length - 1; i > -1; i--) {
			const shrub = startChunk.shrubs[i];

			if (shrub.x >= this.from && shrub.x <= this.to) {
				startChunk.shrubs.splice(i, 1);
			}
		}

		for (let i = startChunk.trees.length - 1; i > -1; i--) {
			const tree = startChunk.trees[i];

			if (tree.x >= this.from && tree.x <= this.to) {
				startChunk.trees.splice(i, 1);
			}
		}

		if (endChunk) {
			for (let i = endChunk.shrubs.length - 1; i > -1; i--) {
				const shrub = endChunk.shrubs[i];

				if (shrub.x >= this.from && shrub.x <= this.to) {
					endChunk.shrubs.splice(i, 1);
				}
			}

			for (let i = endChunk.trees.length - 1; i > -1; i--) {
				const tree = endChunk.trees[i];

				if (tree.x >= this.from && tree.x <= this.to) {
					endChunk.trees.splice(i, 1);
				}
			}
		}
	}

	public render(): void {
		for (let x = this.from; x < this.to; x += 4) {
			const height = this.game.world.getHeightAtPos(x);

			if (height <= this.maxLakeHeight) {
				continue;
			}

			this.game.ctx.fillStyle = "rgb(50, 50, 220)";
			this.game.ctx.fillRect(x - this.game.relativeX, height - this.game.relativeY, 5, this.maxLakeHeight - height);
		}
	}
}