class Robot {
	public x: number;
	public y: number;
	private game: Game;

	public velX: number = 0;
	public velY: number = 0;

	public targetX: number = 0;
	public targetY: number = 0;

	public targetTimer: number = 240;
	public reloadTime: number = 0;
	public maxReloadTime: number = 60;

	public modeChangeTimer: number = 0;
	public mode: "patrol" | "follow" = "patrol";
	public asset: HTMLImageElement;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;

		this.setNewTarget();
		this.asset = loadImage("assets/robot1.png");
	}

	private setNewTarget(): void {
		this.targetX = Math.random() * 2000 - 1000;
		this.targetY = this.game.world.getHeightAtPos(this.targetX) - 250;
	}

	public render(): void {
		this.game.ctx.drawImage(this.asset, this.x - this.game.relativeX - 19 * 2, this.y - this.game.relativeY - 18 * 1, 38 * 2, 18 * 2);

		if (this.modeChangeTimer > 0) {
			this.game.ctx.font = "12px Times";
			this.game.ctx.textAlign = "center";
			this.game.ctx.fillText(this.mode, this.x - this.game.relativeX, this.y - this.game.relativeY - 20);
		}
	}

	public update(delta: number): boolean {
		const distX = this.targetX - this.x;
		const distY = this.targetY - this.y;

		const angle = Math.atan2(distY, distX);

		this.velX = Math.max(-4, Math.min(4, this.velX + Math.cos(angle) * 0.1));
		this.velY = Math.max(-1, Math.min(1, this.velY + Math.sin(angle) * 0.1));

		this.x += this.velX * delta;
		this.y += this.velY * delta;

		if (this.mode === "patrol") {
			this.targetTimer -= delta;
			if (this.targetTimer <= 0) {
				this.setNewTarget();
				this.targetTimer = 240;
			}
		} else {
			this.targetX = this.game.player.x;
			this.targetY = this.game.world.getHeightAtPos(this.targetX) - 250;
		}

		this.modeChangeTimer -= delta;
		this.reloadTime -= delta;
		if (this.reloadTime <= 0) {
			let min: Enemy, minDist = Infinity;

			this.game.enemies.forEach((enemy) => {
				const dist = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
				if (dist < minDist) {
					minDist = dist;
					min = enemy;
				}
			});

			if (!min || minDist > 350) {
				return false;
			}

			const angle = Math.atan2((min.y - 20) - this.y, min.x - this.x) + Math.random() * Math.PI / 8 - Math.PI / 16;
			this.game.bullets.push(new Bullet(this.x, this.y, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
			this.reloadTime = this.maxReloadTime;
		}

		return false;
	}
}