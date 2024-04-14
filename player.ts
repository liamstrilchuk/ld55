class Player {
	public x: number;
	public y: number;

	public velocityY: number = 0;
	private game: Game;

	public wasHoldingLastFrame: boolean = false;
	public holdingTime: number = 0;
	public blood: number = 0;
	public framesSinceSwimming: number = 0;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;

		this.game = game;
	}

	public render() {
		this.game.ctx.fillStyle = "rgb(70, 70, 70)";
		this.game.ctx.fillRect(this.x - this.game.relativeX - 10, this.y - this.game.relativeY - 40, 20, 40);
	}

	public update(delta: number) {
		let swimming = false;
		let lakeHeight = null;

		[...this.game.world.getChunkAtPos(this.x).lakes, ...this.game.world.getChunkAtPos(this.x - 600).lakes].forEach((lake) => {
			if (this.x >= lake.from && this.x <= lake.to) {
				swimming = this.y > lake.maxLakeHeight;
				lakeHeight = lake.maxLakeHeight;
			}
		});

		const isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;

		if (this.game.keys["a"]) {
			this.x -= (isInLake ? 2 : 4) * delta;
		}

		if (this.game.keys["d"]) {
			this.x += (isInLake ? 2 : 4) * delta;
		}

		if (this.game.keys[" "] && !swimming && this.velocityY === 0) {
			this.velocityY = -10;
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

		if (this.game.mouseDown) {
			this.holdingTime += delta;
		}

		if (this.wasHoldingLastFrame && !this.game.mouseDown && this.holdingTime > 10) {
			const dir = Math.atan2(this.game.mousePos.y - this.y + this.game.relativeY, this.game.mousePos.x - this.x + this.game.relativeX);
			this.game.bullets.push(new Bullet(
				this.x, this.y - 30,
				Math.cos(dir) * Math.min(this.holdingTime, 30) / 2,
				Math.sin(dir) * Math.min(this.holdingTime, 30) / 2,
				0.1, this.game
			));
			this.holdingTime = 0;
		}

		if (this.wasHoldingLastFrame && !this.game.mouseDown) {
			this.holdingTime = 0;
		}

		const templeDist = Math.sqrt((this.game.temple.x - this.x) ** 2 + (this.game.temple.y - this.y) ** 2);
		if (templeDist < 250 && this.blood > 0) {
			this.blood--;
			const angle = Math.atan2(this.game.temple.y - this.y, this.game.temple.x - this.x) + Math.PI / 6 - Math.PI / 3 * Math.random();
			const particle = new Blood(this.x, this.y - 20, Math.cos(angle) * 5, Math.sin(angle) * 5, this.game);
			particle.emittedByPlayer = true;
			this.game.particles.push(particle);
		}

		this.wasHoldingLastFrame = this.game.mouseDown;
	}
}