class World {
	public chunks: { [key: number]: Chunk };
	private game: Game;

	public parallaxLayers: { [key: string]: number[] }[] = [];

	constructor(game: Game) {
		this.chunks = {};
		this.game = game;

		this.createWorld();
	}

	private createWorld() {
		(noise as any).seed(Math.random());

		for (let x = -50; x < 50; x++) {
			this.chunks[x] = new Chunk(x, this.game, this.chunks[x - 1] || null);
		}

		for (let i = 0; i < 3; i++) {
			const layer: { [key: string]: number[] } = {};

			for (let x = -50 / (i + 2); x < 50 / (i + 2); x++) {
				layer[x] = [];

				for (let y = 0; y < 75; y++) {
					const h1 = Math.floor((noise as any).perlin2((x * 75 + y + i * 512) / (200 / (i + 1)), 0) * 500 / 4) * 4 - 100 * i;
					const h2 = Math.floor((noise as any).perlin2((x * 75 + y + i * 512) / (100 / (i + 1)), 123) * 500 / 4) * 4 - 100 * i;
					const h3 = Math.floor((noise as any).perlin2((x * 75 + y + i * 512) / (30 / (i + 1)), 123) * 500 / 4) * 4 - 100 * i;
					layer[x].push(Math.floor((h1 * 0.4 + h2 * 0.6 + h3 * 0.1) / 4) * 4);
				}
			}

			this.parallaxLayers.push(layer);
		}
	}

	public render() {
		for (let i = 2; i > -1; i--) {
			const layer = this.parallaxLayers[i];

			for (const pos in layer) {
				const realMinX = Number(pos) * 75 * 4 - this.game.relativeX / (i + 2);
				const realMaxX = (Number(pos) + 1) * 75 * 4 - this.game.relativeX / (i + 2);

				if (realMinX > this.game.ctx.canvas.width + 4 || realMaxX < -4) {
					continue;
				}

				this.game.ctx.fillStyle = `rgb(${160 + i * 20}, ${160 + i * 20}, ${160 + i * 20})`;
				this.game.ctx.beginPath();
				for (let x = 0; x < layer[pos].length; x++) {
					this.game.ctx.lineTo(
						(Number(pos) * 75 + x) * 4 - this.game.relativeX / (i + 2),
						layer[pos][x] - this.game.relativeY / (i + 2)
					);
					this.game.ctx.lineTo(
						(Number(pos) * 75 + x) * 4 - this.game.relativeX / (i + 2) + 4,
						layer[pos][x] - this.game.relativeY / (i + 2)
					);
				}
				this.game.ctx.lineTo(
					(Number(pos) * 75 + 76) * 4 - this.game.relativeX / (i + 2),
					this.game.ctx.canvas.height
				);
				this.game.ctx.lineTo(
					(Number(pos) * 75) * 4 - this.game.relativeX / (i + 2),
					this.game.ctx.canvas.height
				);

				this.game.ctx.fill();
			}
		}

		for (const pos in this.chunks) {
			const chunk = this.chunks[pos];

			const realMinX = chunk.x * 150 * 4 - this.game.relativeX;
			const realMaxX = (chunk.x + 1) * 150 * 4 - this.game.relativeX;

			if (realMinX > this.game.ctx.canvas.width + 200 || realMaxX < -200) {
				continue;
			}

			chunk.render(this.game.ctx, this.chunks[Number(pos) + 1]);
		}
	}

	public getHeightAtPos(x: number): number {
		x = Math.round(x);
		const chunkX = Math.floor(x / 600);
		if (!this.chunks[chunkX]) {
			return 0;
		}

		const chunk = this.chunks[chunkX];
		const tileX = Math.floor((x - chunkX * 600) / 4);

		return chunk.tileHeightData[tileX].height;
	}

	public setHeightAtPos(x: number, height: number): void {
		x = Math.round(x);
		const chunkX = Math.floor(x / 600);
		if (!this.chunks[chunkX]) {
			return;
		}

		const chunk = this.chunks[chunkX];
		const tileX = Math.floor((x - chunkX * 600) / 4);

		chunk.tileHeightData[tileX].height = height;
	}

	public getChunkAtPos(x: number): Chunk {
		const chunkX = Math.floor(x / 600);
		return this.chunks[chunkX] || null;
	}
}