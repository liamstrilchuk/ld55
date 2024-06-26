class Particle {
	public x: number;
	public y: number;
	public velX: number;
	public velY: number;
	public game: Game;
	public color: string;

	constructor(x: number, y: number, velX: number, velY: number, game: Game, color?: string) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.game = game;
		this.color = color || "rgb(50, 50, 50)";
	}

	public update(delta: number): boolean {
		this.x += this.velX * delta;
		this.y += this.velY * delta;

		this.velY += 0.2 * delta;

		if (this.y > this.game.world.getHeightAtPos(this.x)) {
			return true;
		}

		return false;
	}

	public render(): void {
		this.game.ctx.fillStyle = this.color;
		this.game.ctx.fillRect(Math.floor((this.x - this.game.relativeX - 2) / 4) * 4, Math.floor((this.y - this.game.relativeY - 2) / 4) * 4, 4, 4);
	}
}

class Blood extends Particle {
	public emittedByPlayer: boolean = false;
	public goingToEnemy: Enemy = null;

	public update(delta: number): boolean {
		this.x += this.velX * delta;
		this.y += this.velY * delta;

		if (this.goingToEnemy !== null) {
			const angle = Math.atan2(this.goingToEnemy.y - 20 - this.y, this.goingToEnemy.x - this.x);
			this.velX += Math.cos(angle) * 0.3;
			this.velY += Math.sin(angle) * 0.3;
			const dist = Math.sqrt((this.goingToEnemy.x - this.x) ** 2 + (this.goingToEnemy.y - this.y) ** 2);

			if (dist < 20) {
				return true;
			}
		}

		if (this.emittedByPlayer) {
			const angle = Math.atan2(this.game.temple.y - this.y, this.game.temple.x - this.x);
			this.velX += Math.cos(angle) * 0.3;
			this.velY += Math.sin(angle) * 0.3;
			const templeDist = Math.sqrt((this.game.temple.x - this.x) ** 2 + (this.game.temple.y - this.y) ** 2);

			if (templeDist < 100) {
				this.game.temple.blood += 1;
				return true;
			}
		}

		const dist = Math.sqrt((this.game.player.x - this.x) ** 2 + (this.game.player.y - this.y) ** 2);

		if (dist < 20 && !this.emittedByPlayer && !this.goingToEnemy) {
			this.game.player.blood += 1;
			return true;
		}

		if (dist < 50 && !this.emittedByPlayer && !this.goingToEnemy) {
			const angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
			this.velX += Math.cos(angle) * 0.3;
			this.velY += Math.sin(angle) * 0.3;
		} else if (!this.goingToEnemy) {
			this.velY += 0.15 * delta;
		}

		if (this.y > this.game.world.getHeightAtPos(this.x) && !this.emittedByPlayer) {
			this.y = this.game.world.getHeightAtPos(this.x);
			this.velY = 0;
			this.velX *= 0.5;
		}

		return false;
	}

	public render(): void {
		this.game.ctx.fillStyle = "rgb(200, 70, 70)";
		this.game.ctx.fillRect(this.x - this.game.relativeX - 3, this.y - this.game.relativeY - 3, 6, 6);
	}
}

class FontParticle extends Particle {
	public startX: number;
	public startY: number;
	public endX: number;
	public endY: number;
	private framesLived: number = 0;
	private hasUpdated: boolean = false;
	private framesOnGround: number = 0;
	public fadeAfter: number = 0;
	public size: number;

	constructor(x: number, y: number, velX: number, velY: number, size: number, game: Game, color?: string) {
		super(x, y, velX, velY, game, color);

		this.size = size;
	}

	public update(delta: number): boolean {
		this.framesLived += 1;
		if (this.framesLived <= 60) {
			this.x = this.startX + (this.endX - this.startX) * Math.min(this.framesLived, 30) / 30;
			this.y = this.startY + (this.endY - this.startY) * Math.min(this.framesLived, 30) / 30;
		}

		if (this.framesLived > 120 + this.fadeAfter && this.game.started) {
			if (!this.hasUpdated) {
				this.velX = Math.random() * 2;
				this.velY = Math.random() * -2;
				this.hasUpdated = true;
			}
			this.x += this.velX * delta;
			this.y += this.velY * delta;
	
			this.velY += 0.2 * delta;
	
			if (this.y > this.game.world.getHeightAtPos(this.x)) {
				this.y = this.game.world.getHeightAtPos(this.x);
				this.velY = 0;
				this.velX *= 0.5;
				this.framesOnGround += delta;
				if (this.framesOnGround > 60) {
					return true;
				}
			}
		}

		return false;
	}

	public render(): void {
		this.game.ctx.fillStyle = this.color;
		this.game.ctx.fillRect(this.x - this.game.relativeX - this.size / 2, this.y - this.game.relativeY - this.size / 2, this.size + 1, this.size + 1);
	}
}