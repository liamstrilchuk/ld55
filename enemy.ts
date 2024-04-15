class Enemy {
	public x: number;
	public y: number;
	public health: number;
	public velocityY: number = 0;
	public reloadTime: number = 0;
	public maxReloadTime: number = 60;

	private game: Game;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;
		this.health = 30;
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

		if (this.game.temple.x < this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestLeft > 80) {
			this.x -= 1.5 * delta;
		}

		if (this.game.temple.x > this.x && Math.abs(this.game.temple.x - this.x) > 130 && nearestRight > 90) {
			this.x += 1.5 * delta;
		}

		this.velocityY += 0.7 * delta;

		if (this.y + this.velocityY > this.game.world.getHeightAtPos(this.x)) {
			this.velocityY = 0;
			this.y = this.game.world.getHeightAtPos(this.x);
		} else {
			this.y += this.velocityY * delta;
		}

		this.reloadTime -= delta;
		if (this.reloadTime <= 0) {
			let min: Wall, minDist = Infinity;
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
		this.game.ctx.fillStyle = "rgb(70, 70, 70)";
		this.game.ctx.fillRect(this.x - this.game.relativeX - 10, this.y - this.game.relativeY - 40, 20, 40);
	}

	public onHit(): void {}
}