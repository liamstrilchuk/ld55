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

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.world = new World(this);

		for (let pos in this.world.chunks) {
			this.world.chunks[pos].lakes.forEach((lake) => lake.createLake());
		}

		this.player = new Player(0, this.world.getHeightAtPos(0), this);
		this.temple = new Temple(-100, this.world.getHeightAtPos(-100) - 70, this);
		new Message("start game", this);

		for (let i = 0; i < 10; i++) {
			this.enemies.push(new Enemy(100 + 50 * i, this.world.getHeightAtPos(100 + 50 * i), this));
		}

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

		this.bullets.forEach((bullet) => {
			bullet.render();
		});

		this.robots.forEach((robot) => {
			robot.render();
		});

		this.particles.forEach((particle) => {
			particle.render();
		});

		this.enemies.forEach((enemy) => {
			enemy.render();
		});

		this.animals.forEach((animal) => {
			animal.render();
		});

		this.ctx.fillStyle = "black";
		this.ctx.textAlign = "left";
		this.ctx.fillText("FPS: " + Math.round(1000 * 60 / (this.lastFrameTimes[this.lastFrameTimes.length - 1] - this.lastFrameTimes[0])), 10, 10);
	}

	private addEventListeners() {
		window.addEventListener("keydown", (event: KeyboardEvent) => {
			this.keys[event.key.toLowerCase()] = true;
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