class Bullet {
	public x: number;
	public y: number;
	public velX: number;
	public velY: number;
	public drop: number;
	private game: Game;
	private enemiesHit: (Enemy | Animal)[] = [];

	constructor(x: number, y: number, velX: number, velY: number, drop: number, game: Game) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.drop = drop;
		this.game = game;
	}

	public update(delta: number): boolean {
		this.x += this.velX * delta;
		this.y += this.velY * delta;

		this.velY += this.drop * delta;

		if (this.y > this.game.world.getHeightAtPos(this.x)) {
			for (let i = 0; i < 10; i++) {
				const angle = Math.atan2(-this.velY, -this.velX) + Math.PI / 6 - Math.PI / 3 * Math.random();
				this.game.particles.push(new Particle(this.x - this.velX * delta, this.y - this.velY * delta, Math.cos(angle) * 5, Math.sin(angle) * 5, this.game));
			}
			return true;
		}

		[...this.game.enemies, ...this.game.animals].forEach((enemy) => {
			if (Math.abs(enemy.x - this.x) < 10 && Math.abs((enemy.y - 20) - this.y) < 20 && !this.enemiesHit.includes(enemy)) {
				enemy.health -= 10;
				this.enemiesHit.push(enemy);
				enemy.onHit();

				if (enemy.health <= 0) {
					for (let i = 0; i < 15; i++) {
						const angle = Math.atan2(-this.velY, -this.velX) + Math.PI * 2 - Math.PI * Math.random();
						this.game.particles.push(new Blood(this.x - this.velX * delta, this.y - this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, this.game));
					}
				} else {
					for (let i = 0; i < 4; i++) {
						const angle = Math.atan2(-this.velY, -this.velX) + Math.PI * 2 - Math.PI * Math.random();
						this.game.particles.push(new Blood(this.x - this.velX * delta, this.y - this.velY * delta, Math.cos(angle) * 2, Math.sin(angle) * 3, this.game));
					}
				}
			}
		});

		return false;
	}

	public render(): void {
		this.game.ctx.fillStyle = "rgb(70, 70, 70)";
		this.game.ctx.save();
		this.game.ctx.translate(this.x - this.game.relativeX, this.y - this.game.relativeY);
		this.game.ctx.rotate(Math.atan2(this.velY, this.velX));
		this.game.ctx.fillRect(-15, -2, 30, 4);
		this.game.ctx.restore();
	}
}