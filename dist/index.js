var canvas, ctx, game;
window.addEventListener("load", function () {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    game = new Game(ctx);
    game.start();
});
function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}
