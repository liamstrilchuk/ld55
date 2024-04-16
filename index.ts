let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game;

window.addEventListener("load", () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.imageSmoothingEnabled = false;

	game = new Game(ctx);

	game.start();
});

function loadImage(src: string): HTMLImageElement {
	const img = new Image();
	img.src = src;
	return img;
}