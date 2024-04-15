class Game {
	public ctx: CanvasRenderingContext2D;
	public world: World;
	public player: Player;
	public temple: Temple;

	public relativeX: number = 0;
	public relativeY: number = 0;

	public keys: { [key: string]: boolean } = {};
	public mousePos: { x: number, y: number } = { x: 0, y: 0 };
	public mouseDown: boolean = false;

	public lastFrameTime: number = Date.now();
	public lastXPositions: number[] = [];
	public lastYPositions: number[] = [];

	public lastFrameTimes: number[] = [];
	public bullets: Bullet[] = [];
	public particles: Particle[] = [];
	public enemies: Enemy[] = [];
	public robots: Robot[] = [];
	public animals: Animal[] = [];
	public structures: Wall[] = [];

	public buildMenuOpen: boolean = false;
	public selectedStructure: typeof Wall;
	public wave: number = 1;
	public score: number = 0;
	public waveTimer: number = 3600;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.world = new World(this);

		for (let pos in this.world.chunks) {
			this.world.chunks[pos].lakes.forEach((lake) => lake.createLake());
		}

		this.player = new Player(0, this.world.getHeightAtPos(0), this);
		this.temple = new Temple(-100, this.world.getHeightAtPos(-100) - 70, this);
		new Message("start game", 0, 300, 5, "rgb(200, 70, 70)", this);

		// for (let i = 0; i < 10; i++) {
		// 	this.enemies.push(new Enemy(100 + 50 * i, this.world.getHeightAtPos(100 + 50 * i), this));
		// }

		for (let i = 0; i < 15; i++) {
			const x = Math.random() * 5000 - 2500;
			this.animals.push(new Animal(x, this.world.getHeightAtPos(x), this));
		}
	}

	public update() {
		const diff = Date.now() - this.lastFrameTime;
		this.lastFrameTime = Date.now();
		this.lastFrameTimes.push(this.lastFrameTime);
		if (this.lastFrameTimes.length > 60) {
			this.lastFrameTimes.shift();
		}
		const delta = diff / (1000 / 60);
		this.player.update(delta);

		this.lastXPositions.push(this.player.x);
		this.lastYPositions.push(this.player.y);

		if (this.lastXPositions.length > 15) {
			this.lastXPositions.shift();
		}

		if (this.lastYPositions.length > 15) {
			this.lastYPositions.shift();
		}

		const xAvg = this.lastXPositions.reduce((a, b) => a + b) / this.lastXPositions.length;
		const yAvg = this.lastYPositions.reduce((a, b) => a + b) / this.lastYPositions.length;

		this.relativeX = Math.floor(xAvg - this.ctx.canvas.width / 2);
		this.relativeY = Math.floor(yAvg - this.ctx.canvas.height * 2/3);

		this.bullets.forEach((bullet) => {
			if (bullet.update(delta)) {
				this.bullets.splice(this.bullets.indexOf(bullet), 1);
			}
		});

		this.enemies.forEach((enemy) => {
			if (enemy.update(delta)) {
				this.enemies.splice(this.enemies.indexOf(enemy), 1);
			}
		});

		this.robots.forEach((robot) => {
			if (robot.update(delta)) {
				this.robots.splice(this.robots.indexOf(robot), 1);
			}
		});

		this.particles.forEach((particle) => {
			if (particle.update(delta)) {
				this.particles.splice(this.particles.indexOf(particle), 1);
			}
		});

		this.animals.forEach((animal) => {
			if (animal.update(delta)) {
				this.animals.splice(this.animals.indexOf(animal), 1);
			}
		});

		this.structures.forEach((structure) => {
			if (structure.update()) {
				this.structures.splice(this.structures.indexOf(structure), 1);
			}
		});

		this.waveTimer -= delta;

		if (this.waveTimer <= 0) {
			this.wave++;
			this.waveTimer = 3600;
		}

		this.temple.update(delta);
		this.render();

		window.requestAnimationFrame(this.update.bind(this));
	}

	public render() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.fillStyle = "rgb(220, 220, 220)";
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.world.render();
		this.temple.render();
		this.player.render();

		this.robots.forEach((robot) => {
			robot.render();
		});

		this.enemies.forEach((enemy) => {
			enemy.render();
		});

		this.animals.forEach((animal) => {
			animal.render();
		});

		this.structures.forEach((structure) => {
			structure.render();
		});

		this.bullets.forEach((bullet) => {
			bullet.render();
		});

		this.particles.forEach((particle) => {
			particle.render();
		});

		if (this.buildMenuOpen) {
			this.ctx.strokeStyle = "rgb(100, 100, 100)";
			this.ctx.lineWidth = 8;
			this.ctx.beginPath();
			this.ctx.arc(this.ctx.canvas.width / 2, this.ctx.canvas.height * 2/3 - 20, 100, 0, Math.PI * 2);
			this.ctx.stroke();

			const dist = Math.sqrt(
				(this.mousePos.x - (this.ctx.canvas.width / 2 - 100)) ** 2 +
				(this.mousePos.y - this.ctx.canvas.height * 2/3 + 20) ** 2
			);

			this.ctx.fillStyle = "rgb(90, 90, 90)";
			this.ctx.beginPath();
			this.ctx.arc(this.ctx.canvas.width / 2 - 100, this.ctx.canvas.height * 2/3 - 20, dist < 25 ? 30 : 25, 0, Math.PI * 2);
			this.ctx.fill();

			if (dist < 25) {
				const color = this.temple.blood >= 50 ? "rgb(70, 200, 70)" : "rgb(200, 70, 70)";
				this.drawNumber("50", this.ctx.canvas.width / 2 - 115, this.ctx.canvas.height * 2/3 - 30, color, 3);
			}
		}

		if (this.selectedStructure) {
			const mouseX = this.getMouseTileX();
			const height = this.world.getHeightAtPos(mouseX);
			const canPlace = this.canPlaceStructure(mouseX);

			this.ctx.fillStyle = `rgba(70, 70, 70, ${canPlace ? 0.7 : 0.3})`;
			this.ctx.fillRect(
				mouseX - this.relativeX,
				height - this.relativeY - this.selectedStructure.height,
				this.selectedStructure.width,
				this.selectedStructure.height
			);
		}

		this.drawNumber(this.temple.blood.toString(), 10, 20, "rgb(200, 70, 70)", 5);

		this.ctx.font = "12px Times";
		this.ctx.fillStyle = "black";
		this.ctx.fillText("FPS: " + Math.round(1000 * 60 / (this.lastFrameTimes[this.lastFrameTimes.length - 1] - this.lastFrameTimes[0])), 10, 10);

		this.ctx.textAlign = "center";
		this.ctx.font = "bold 50px Courier";
		this.ctx.fillStyle = "black";
		this.ctx.fillText("Wave " + this.wave, this.ctx.canvas.width / 2, 50);

		const minutes = Math.floor(this.waveTimer / 3600);
		const seconds = Math.floor((this.waveTimer % 3600) / 60);

		this.ctx.font = "bold 30px Courier";
		this.ctx.fillStyle = "rgb(90, 40, 40)";
		this.ctx.fillText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, this.ctx.canvas.width / 2, 85);
	}

	private drawNumber(text: string, x: number, y: number, color: string, size: number): void {
		this.ctx.fillStyle = color;
		let column = 0;
		for (let char of text) {
			for (let row = 0; row < numbers[char].length; row++) {
				for (let col = 0; col < numbers[char][row].length; col++) {
					if (numbers[char][row][col] !== " ") {
						this.ctx.fillRect(x + column * size + col * size, y + row * size, size, size);
					}
				}
			}
			column += numbers[char][0].length + 1;
		}
	}

	private getMouseTileX(): number {
		return Math.floor((this.mousePos.x + this.relativeX) / 4) * 4 - Math.floor(this.selectedStructure.width / 4) * 2;
	}

	private canPlaceStructure(xPos: number): boolean {
		let structureInWay = false;
		this.structures.forEach((structure) => {
			if (Math.abs(structure.x - xPos) < 50) {
				structureInWay = true;
			}
		});

		return Math.abs(xPos - this.relativeX - this.ctx.canvas.width / 2) < 300 && !structureInWay;
	}

	private addEventListeners() {
		window.addEventListener("keydown", (event: KeyboardEvent) => {
			this.keys[event.key.toLowerCase()] = true;

			if (event.key.toLowerCase() === "e") {
				if (this.selectedStructure) {
					this.selectedStructure = null;
				} else {
					this.buildMenuOpen = !this.buildMenuOpen;
				}
			}
		});

		window.addEventListener("keyup", (event: KeyboardEvent) => {
			this.keys[event.key.toLowerCase()] = false;
		});

		window.addEventListener("mousemove", (event: MouseEvent) => {
			this.mousePos = { x: event.clientX, y: event.clientY };
		});

		window.addEventListener("mousedown", () => {
			this.mouseDown = true;
			this.onMouseDown();
		});

		window.addEventListener("mouseup", () => {
			this.mouseDown = false;
		});
	}

	private onMouseDown(): void {
		if (this.selectedStructure) {
			const mouseX = this.getMouseTileX();
			const height = this.world.getHeightAtPos(mouseX);
			const canPlace = this.canPlaceStructure(mouseX);

			if (canPlace) {
				if (this.temple.blood >= this.selectedStructure.cost) {
					this.structures.push(new this.selectedStructure(mouseX, height, this));
					this.temple.blood -= this.selectedStructure.cost;
					this.selectedStructure = null;
				} else {
					new Message("not enough blood", this.player.x - 200, 150, 2, "rgb(200, 70, 70)", this);
				}
			}
			return;
		}

		if (this.buildMenuOpen) {
			const dist1 = Math.sqrt(
				(this.mousePos.x - (this.ctx.canvas.width / 2 - 100)) ** 2 +
				(this.mousePos.y - this.ctx.canvas.height * 2/3 + 20) ** 2
			);

			if (dist1 < 25) {
				this.selectedStructure = Wall;
				this.buildMenuOpen = false;
			}

			return;
		}

		this.robots.forEach((robot) => {
			if (Math.abs(robot.x - this.mousePos.x - this.relativeX) < 30 && Math.abs(robot.y - this.mousePos.y - this.relativeY) < 30) {
				robot.mode = robot.mode === "patrol" ? "follow" : "patrol";
				robot.modeChangeTimer = 60;
			}
		});
	}

	public start() {
		this.addEventListeners();
		this.update();
	}
}