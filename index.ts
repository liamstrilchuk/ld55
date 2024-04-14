let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game;

window.addEventListener("load", () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	game = new Game(ctx);

	game.start();
});