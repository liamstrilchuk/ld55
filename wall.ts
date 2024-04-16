class Wall {
	static readonly width = 44;
	static readonly height = 120;
	static readonly cost = 50;

	public x: number;
	public y: number;
	private game: Game;
	public pieces: WallPiece[] = [];

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;

		this.createWall();
	}

	private createWall(): void {
		for (let col = 0; col < 11; col++) {
			for (let row = 0; row < 30; row++) {
				let color = "rgb(120, 80, 80)";
				if ((row % 3 === 2) || (row % 6 >= 0 && row % 6 <= 1 && col % 4 === 2) || (row % 6 >= 3 && row % 6 <= 4 && col % 4 === 0)) {
					color = "rgb(90, 50, 50)";
				}
				const addTime = Math.floor(Math.random() * 60) + 2;
				this.pieces.push(new WallPiece(
					this.x + col * 4, this.y - row * 4, 4, 4,
					color, addTime, this.game
				));
			}
		}
	}

	public update(): boolean {
		if (this.pieces.length < 11 * 30 / 3) {
			this.pieces.forEach((piece) => {
				this.game.particles.push(new Particle(piece.x, piece.y, Math.random() * 2 - 1, Math.random() * 2 - 1, this.game, piece.color));
			});
			
			return true;
		}

		return false;
	}

	public render(): void {
		this.pieces.forEach((piece) => piece.render());

		this.game.ctx.fillStyle = "rgb(50, 50, 50)";
		this.game.ctx.fillRect(this.x - this.game.relativeX, this.y - this.game.relativeY + 4, Wall.width + 1, 50);
	}
}

class WallPiece {
	public startX: number = 0;
	public startY: number = 0;
	public x: number;
	public y: number;
	public framesLived: number = 0;
	public color: string;
	public addTime: number;
	public width: number;
	public height: number;
	private game: Game;

	constructor(x: number, y: number, width: number, height: number,color: string, addTime: number, game: Game) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.game = game;
		this.color = color;
		this.addTime = addTime;
	}

	public render(): void {
		if (this.addTime > 0) {
			this.addTime--;
			if (this.addTime <= 0) {
				this.startX = this.game.player.x;
				this.startY = this.game.player.y - 20;
			}
			return;
		}
		const x = this.startX + (this.x - this.startX) * Math.min(60, this.framesLived - this.addTime) / 60;
		const y = this.startY + (this.y - this.startY) * Math.min(60, this.framesLived - this.addTime) / 60;
		this.framesLived++;

		this.game.ctx.fillStyle = this.color;
		this.game.ctx.fillRect(x - this.game.relativeX, y - this.game.relativeY, this.width + 1, this.height + 1);
	}
}