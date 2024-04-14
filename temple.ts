class Temple {
	public x: number;
	public y: number;
	private game: Game;
	public blood: number = 0;
	public spawnTimer: number = 0;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;
	}

	public update(delta: number): void {
		this.spawnTimer -= delta;

		if (this.spawnTimer <= 0 && this.blood > 100) {
			this.spawnTimer = 600;
			this.blood -= 100;
			this.game.robots.push(new Robot(this.x, this.y - 200, this.game));
		}
	}

	public render(): void {
		this.game.ctx.fillStyle = "rgb(70, 70, 70)";
		this.game.ctx.fillRect(this.x - this.game.relativeX - 100, this.y - this.game.relativeY - 100, 200, 200);

		if (this.spawnTimer > 300) {
			const points = [
				[-50, -50],
				[50, -50],
				[50, 50],
				[-50, 50]
			];

			const target = [0, -200];
			const colors = ["150, 50, 50", "170, 50, 50", "190, 50, 50", "210, 50, 50", "230, 50, 50"];

			for (const point of points) {
				for (let i = 0; i < colors.length; i++) {
					const startAlpha = 1 - Math.abs(this.spawnTimer - 600) / 300;
					const endAlpha = 1 - (this.spawnTimer - 300) / 300;
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