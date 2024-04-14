class Tree {
	public x: number;
	public y: number;
	public size: number;
	private game: Game;

	public widths: number[] = [];

	constructor(x: number, y: number, size: number, game: Game) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.game = game;

		this.createTree();
	}

	private createTree(): void {
		for (let i = 0; i < this.size; i++) {
			this.widths.push(Math.pow(this.size, 0.7) - Math.pow(i, 0.35));
		}

		for (let i = 0; i < Math.min(this.size / 5, 4); i++) {
			this.widths.push(this.size * (0.2 + i * 0.2));
		}
		this.widths.push(this.size);

		for (let i = 0; ; i++) {
			if (this.widths[this.widths.length - 1] < 1) {
				break;
			}
			this.widths.push(this.widths[this.widths.length - 1] - Math.random() * 0.6);
		}

		for (let i = this.size; i < this.widths.length; i++) {
			this.widths[i] += Math.sqrt(Math.random() * 8);
		}
	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "rgb(50, 50, 50)";
		for (let i = -3; i < this.widths.length; i++) {
			ctx.fillRect(this.x - Math.floor(this.widths[Math.max(i, 0)]) * 4 - this.game.relativeX, this.y - i * 4 - this.game.relativeY, Math.floor(this.widths[Math.max(i, 0)]) * 8, 5);
		}
	}
}

class Shrub {
	public x: number;
	public y: number;
	private game: Game;
	private points: number[][] = [ [0, 1] ];

	constructor(x: number, y: number, game: Game) {
		this.x = x;
		this.y = y;
		this.game = game;

		this.recursivelyAdd(this.points[0]);
	}

	private recursivelyAdd(point: number[]): void {
		const rand = Math.random();

		if ((rand < 0.3 || this.points.length > 10) && this.points.length > 2) {
			return;
		} else if (rand < 0.6) {
			this.points.push([point[0], point[1] + 1]);
			this.recursivelyAdd(this.points[this.points.length - 1]);
		} else if (rand < 0.75) {
			this.points.push([point[0] + 1, point[1] + 1]);
			this.recursivelyAdd(this.points[this.points.length - 1]);
		} else if (rand < 0.9) {
			this.points.push([point[0] - 1, point[1] + 1]);
			this.recursivelyAdd(this.points[this.points.length - 1]);
		} else if (rand < 0.93 && point[1] > 4) {
			const color = Math.floor(Math.random() * 3);
			this.points.push([point[0] - 1, point[1] + 1, color]);
			this.points.push([point[0], point[1] + 1, color]);
			this.points.push([point[0] + 1, point[1] + 1, color]);
			this.points.push([point[0] - 1, point[1] + 2, color]);
			this.points.push([point[0], point[1] + 2, color]);
			this.points.push([point[0] + 1, point[1] + 2, color]);
			this.points.push([point[0], point[1] + 3, color]);
			this.points.push([point[0], point[1], color]);
		} else {
			this.points.push([point[0] + 1, point[1] + 1]);
			this.recursivelyAdd(this.points[this.points.length - 1]);
			this.points.push([point[0] - 1, point[1] + 1]);
			this.recursivelyAdd(this.points[this.points.length - 1]);
		}
	}

	public render(ctx: CanvasRenderingContext2D): void {
		for (let point of this.points) {
			ctx.fillStyle = "rgb(50, 50, 50)";
			if (point.length === 3) {
				switch (point[2]) {
					case 0:
						ctx.fillStyle = "rgb(200, 200, 50)";
						break;
					case 1:
						ctx.fillStyle = "rgb(50, 100, 200)";
						break;
					case 2:
						ctx.fillStyle = "rgb(150, 50, 200)";
						break;
				}
			}
			ctx.fillRect(this.x - point[0] * 4 - this.game.relativeX, this.y - point[1] * 4 - this.game.relativeY, 4, 4);
		}
	}
}