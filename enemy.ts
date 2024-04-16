class Enemy {
	public x: number;
	public y: number;
	public health: number;
	public velocityY: number = 0;
	public reloadTime: number = 0;
	public maxReloadTime: number = 60;
	public suckBloodTimer: number = 30;
	public framesSinceSwimming: number = 0;
	public lastDir: string = "left";

	private game: Game;
	public assets: { [key: string]: HTMLImageElement };

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;
		this.health = 30;
		this.assets = {
			"left": loadImage("assets/enemy2.png"),
			"right": loadImage("assets/enemy1.png")
		};
	}

	public update(delta: number): boolean {
		if (this.health <= 0) {
			return true;
		}

		let nearestLeft = Infinity, nearestRight = Infinity;

		this.game.structures.forEach((structure) => {
			if (structure.x > this.x && structure.x - this.x < nearestRight) {
				nearestRight = structure.x - this.x;
			}

			if (structure.x < this.x && this.x - structure.x < nearestLeft) {
				nearestLeft = this.x - structure.x;
			}
		});

		let swimming = false;
		let lakeHeight = null;

		[...this.game.world.getChunkAtPos(this.x).lakes, ...this.game.world.getChunkAtPos(this.x - 600).lakes].forEach((lake) => {
			if (this.x >= lake.from && this.x <= lake.to) {
				swimming = this.y > lake.maxLakeHeight;
				lakeHeight = lake.maxLakeHeight;
			}
		});

		const isInLake = lakeHeight !== null && Math.abs(lakeHeight - this.y) < 10;

		if (this.game.temple.x < this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestLeft > 80) {
			this.x -= (isInLake ? 0.75 : 1.5) * delta;
			this.lastDir = "left";
		}

		if (this.game.temple.x > this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestRight > 90) {
			this.x += (isInLake ? 0.75 : 1.5) * delta;
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

		this.suckBloodTimer -= delta;
		if (this.suckBloodTimer <= 0 && Math.abs(this.x - this.game.temple.x) < 150 && this.game.temple.blood > -30) {
			this.game.temple.blood -= 1;
			const particle = new Blood(this.game.temple.x, this.game.temple.y, 0, 0, this.game);
			particle.goingToEnemy = this;
			this.game.particles.push(particle);
			this.suckBloodTimer = 30;
		}

		this.reloadTime -= delta;
		if (this.reloadTime <= 0) {
			const playerDist = Math.abs(this.x - this.game.player.x);
			if (playerDist < 400) {
				const angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
				this.game.bullets.push(new EnemyBullet(this.x, this.y - 20, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
				this.reloadTime = this.maxReloadTime;
				return false;
			}

			let min: Wall | Turret, minDist = Infinity;
			this.game.structures.forEach((structure) => {
				if (Math.abs(structure.x - this.x) < minDist) {
					min = structure;
					minDist = Math.abs(structure.x - this.x);
				}
			});

			if (!min || !min.pieces.length) {
				return false;
			}

			const rand = Math.floor(Math.random() * min.pieces.length);			

			if (minDist < 500) {
				const angle = Math.atan2(min.pieces[rand].y - this.y + 20, min.pieces[rand].x - this.x);
				this.game.bullets.push(new EnemyBullet(this.x, this.y - 20, Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game));
				this.reloadTime = this.maxReloadTime;
			}
		}

		return false;
	}

	public render(): void {
		this.game.ctx.drawImage(this.assets[this.lastDir], this.x - this.game.relativeX - 20, this.y - this.game.relativeY - 64, 40, 64);
	}

	public onHit(): void {}
}