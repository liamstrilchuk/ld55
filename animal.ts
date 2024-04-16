class Animal {
	public x: number;
	public y: number;
	public velocityY: number = 0;
	public framesSinceSwimming: number = 0;
	public targetTime: number = 0;
	public targetX: number = 0;
	public health: number = 20;
	private game: Game;

	public assets: { [key: string]: HTMLImageElement };
	public lastDir: string = Math.random() < 0.5 ? "left" : "right";

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;

		this.assets = {
			"left": loadImage("assets/animal1.png"),
			"right": loadImage("assets/animal2.png")
		};
	}

	public update(delta: number): boolean {
		if (this.health <= 0) {
			return true;
		}
		this.targetTime -= delta;

		if (this.targetTime < 0) {
			this.targetTime = Math.random() * 120 + 60;
			this.targetX = this.x + Math.random() * 400 - 200;
		}

		let swimming = false;
		let lakeHeight = null;

		[...this.game.world.getChunkAtPos(this.x).lakes, ...this.game.world.getChunkAtPos(this.x - 600).lakes].forEach((lake) => {
			if (this.x >= lake.from && this.x <= lake.to) {
				swimming = this.y > lake.maxLakeHeight;
				lakeHeight = lake.maxLakeHeight;
			}
		});

		const isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;

		if (this.targetX < this.x) {
			this.x -= (isInLake ? 1 : 2) * delta;
			this.lastDir = "left";
		}

		if (this.targetX > this.x) {
			this.x += (isInLake ? 1 : 2) * delta;
			this.lastDir = "right";
		}

		if ((!swimming && isInLake && this.framesSinceSwimming < 5) || swimming && this.framesSinceSwimming > 10) {
			for (let i = 0; i < 3; i++) {
				const angle = Math.PI + Math.random() * Math.PI;
				this.game.particles.push(new Particle(this.x, this.y, Math.cos(angle) * 2, Math.sin(angle) * 2, this.game, "rgb(0, 0, 200)"));
			}
		}

		this.framesSinceSwimming = swimming ? 0 : this.framesSinceSwimming + 1;

		if (!swimming) {
			this.velocityY += (isInLake ? 0.4 : 0.7) * delta;
		} else {
			this.velocityY -= Math.abs(lakeHeight - this.y) / 80 * delta;
			this.velocityY = Math.max(-1.5, this.velocityY);
		}

		if (this.y + this.velocityY > this.game.world.getHeightAtPos(this.x)) {
			this.velocityY = 0;
			this.y = this.game.world.getHeightAtPos(this.x);
		} else {
			this.y += this.velocityY * delta;
		}

		return false;
	}

	public render(): void {
		this.game.ctx.drawImage(this.assets[this.lastDir], this.x - this.game.relativeX - 24 * 1.5, this.y - this.game.relativeY - 14 * 3, 24 * 3, 14 * 3);
	}

	public onHit(): void {
		const angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
		this.targetX = this.x - Math.cos(angle) * 400;
		this.targetTime = 240;
	}
}