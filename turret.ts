class Turret {
	static readonly width = 48;
	static readonly height = 66;
	static readonly cost = 100;
	
	public x: number;
	public y: number;
	private game: Game;
	public pieces: WallPiece[] = [];
	public health: number = 100;
	public direction: number = 0;
	public reloadTime: number = 60;
	public maxReloadTime: number = 60;

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;

		this.createTurret();
	}

	private createTurret(): void {
		const matrix = [
			[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
			[0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,1,0,1,1,1,1,1,0],
			[0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,1],
			[1,2,2,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,1],
			[0,1,1,1,2,2,2,2,2,2,2,1,2,1,2,2,1,0,1,1,1,1,1,0],
			[0,0,0,1,1,2,2,2,2,2,2,1,2,2,1,1,1,0,0,0,0,0,0,0],
			[0,0,0,0,1,2,2,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,0,0,0,1,2,2,2,2,2,2,1,0,0,1,1,1,0,0,0,0],
			[1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,0,0,0],
			[1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1,0,0,0],
			[1,2,1,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,1,2,1,0,0,0],
			[0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0],
			[0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
			[0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,1,0,0,0,0],
			[0,0,1,1,1,1,1,1,2,2,2,2,1,2,2,1,2,2,1,0,0,0,0,0],
			[0,0,0,2,2,2,2,2,1,2,2,2,1,2,2,1,2,2,1,0,0,0,0,0],
			[0,0,1,1,1,1,1,2,2,1,2,2,2,1,1,2,2,2,1,0,0,0,0,0],
			[0,0,1,2,2,2,2,1,2,2,1,2,2,2,2,2,2,2,1,0,0,0,0,0],
			[0,0,1,2,2,2,2,2,1,2,2,1,2,2,2,2,2,2,1,0,0,0,0,0],
			[0,1,2,2,2,2,2,2,2,1,2,2,1,1,1,1,1,1,2,1,0,0,0,0],
			[0,1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,0,0,0,0],
			[0,0,1,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,1,0,0,0,0,0],
			[0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
		];

		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				if (matrix[i][j] === 0) {
					continue;
				}
				this.pieces.push(new WallPiece(
					this.x + j * 2, this.y - (matrix.length - i) * 2, 2, 2,
					matrix[i][j] === 1 ? "rgb(90, 50, 50)" : "rgb(120, 80, 80)",
					Math.floor(Math.random() * 60) + 1, this.game
				));
			}
		}
	}

	public update(): boolean {
		if (this.health <= 0) {
			this.pieces.forEach((piece) => {
				this.game.particles.push(new Particle(piece.x, piece.y, Math.random() * 2 - 1, Math.random() * 2 - 1, this.game, piece.color));
			});

			return true;
		}

		this.reloadTime--;
		let minDist = Infinity, minEnemy: Enemy = null;

		this.game.enemies.forEach((enemy) => {
			const dist = Math.abs(this.x - enemy.x);
			if (dist < minDist) {
				minDist = dist;
				minEnemy = enemy;
			}
		});

		if (!minEnemy && ((this.direction === 0 && this.game.temple.x > this.x) || (this.direction === 1 && this.game.temple.x < this.x))) {
			this.direction = 1 - this.direction;

			this.pieces.forEach((piece) => {
				if (piece.y < this.y - 34) {
					piece.x = 48 - (piece.x - this.x) + this.x;
				}
			});
		}

		if (!minEnemy || minDist > 300) {
			return false;
		}

		if (this.direction === 0 && minEnemy.x < this.x || this.direction === 1 && minEnemy.x > this.x) {
			this.direction = 1 - this.direction;

			this.pieces.forEach((piece) => {
				if (piece.y < this.y - 34) {
					piece.x = 48 - (piece.x - this.x) + this.x;
				}
			});
		}

		if (this.reloadTime <= 0) {
			const angle = Math.atan2((minEnemy.y - 20) - (this.y - Turret.height + 8), minEnemy.x - this.x) + Math.random() * Math.PI / 16 - Math.PI / 32;
			this.reloadTime = this.maxReloadTime;
			this.game.bullets.push(new Bullet(
				this.x + (this.direction === 0 ? Turret.width : 0), this.y - Turret.height + 8,
				Math.cos(angle) * 10, Math.sin(angle) * 10, 0, this.game
			))
		}

		return false;
	}

	public render(): void {
		this.pieces.forEach(p => p.render());

		this.game.ctx.fillStyle = "rgb(50, 50, 50)";
		this.game.ctx.fillRect(this.x - this.game.relativeX, this.y - this.game.relativeY, Wall.width + 1, 50);
	}
}