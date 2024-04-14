var canvas, ctx, game;
window.addEventListener("load", function () {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game = new Game(ctx);
    game.start();
});
