class Temple {
	public x: number;
	public y: number;
	private game: Game;
	public blood: number = 0;
	public spawnTimer: number = 0;
	public sprite: HTMLImageElement;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;
		this.sprite = loadImage("assets/temple.png");

		const height = this.game.world.getHeightAtPos(this.x);

		for (let i = this.x - 92 * 2; i < this.x + 92 * 2; i += 4) {
			const dist = Math.min(Math.abs(i - (this.x - 92 * 2)), Math.abs(i - (this.x + 92 * 2)));
			const newHeight = Math.min(92, dist);
			this.game.world.setHeightAtPos(i, height - newHeight);
		}
	}

	public update(delta: number): void {
		this.spawnTimer -= delta;

		if (this.spawnTimer <= 0 && this.blood > 100 && this.game.robots.length < 3) {
			this.spawnTimer = 1200;
			this.game.robots.push(new Robot(this.x, this.y - 200, this.game));
		}
	}

	public render(): void {
		this.game.ctx.drawImage(this.sprite, this.x - this.game.relativeX - this.sprite.width * 2, this.y - this.game.relativeY - this.sprite.height * 2 - 20, this.sprite.width * 4, this.sprite.height * 4);

		if (this.spawnTimer > 900) {
			const points = [
				[-108, -80],
				[102, -80],
				[102, -25],
				[-108, -25]
			];

			const target = [0, -200];
			const colors = ["150, 50, 50", "170, 50, 50", "190, 50, 50", "210, 50, 50", "230, 50, 50"];

			for (const point of points) {
				for (let i = 0; i < colors.length; i++) {
					const startAlpha = 1 - Math.abs(this.spawnTimer - 1200) / 300;
					const endAlpha = 1 - (this.spawnTimer - 900) / 300;
					this.game.ctx.strokeStyle = `rgba(${colors[i]}, ${Math.min(startAlpha, endAlpha)})`;
					this.game.ctx.lineWidth = (colors.length - i) * 2;
					this.game.ctx.beginPath();
					this.game.ctx.moveTo(this.x - this.game.relativeX + point[0], this.y - this.game.relativeY + point[1]);
					this.game.ctx.lineTo(this.x - this.game.relativeX + target[0], this.y - this.game.relativeY + target[1]);
					this.game.ctx.stroke();
				}
			}
		}
	}
}