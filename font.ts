const letters = {
	"A": [
		"  AAAAAAAAA  ",
		" AAAAAAAAAAA ",
		"AAAAAAAAAAAAA",
		"AAAAA   AAAAA",
		"AAAAA   AAAAA",
		"AAAAAAAAAAAAA",
		"AAAAAAAAAAAAA",
		"AAAAA   AAAAA",
		"AAAAA   AAAAA",
		"AAAAA   AAAAA",
		"AAAAA   AAAAA",
		"AAAAA   AAAAA"
	],
	"B": [
		" BBBBBBBBBB  ",
		"BBBBBBBBBBBB ",
		"BBBBBBBBBBBBB",
		"BBBBB   BBBBB",
		"BBBBB   BBBBB",
		"BBBBBBBBBBBB ",
		"BBBBBBBBBBBB ",
		"BBBBB   BBBBB",
		"BBBBB   BBBBB",
		"BBBBBBBBBBBBB",
		"BBBBBBBBBBBB ",
		" BBBBBBBBBB  "
	],
	"C": [
		"  CCCCCCCCC  ",
		" CCCCCCCCCCC ",
		"CCCCCCCCCCCCC",
		"CCCCC    CCCC",
		"CCCC     CCCC",
		"CCCC         ",
		"CCCC         ",
		"CCCC     CCCC",
		"CCCCC    CCCC",
		"CCCCCCCCCCCCC",
		" CCCCCCCCCCC ",
		"  CCCCCCCCC  "
	],
	"D": [
		" DDDDDDDDD  ",
		"DDDDDDDDDDD ",
		"DDDDDDDDDDDD",
		"DDDD   DDDDD",
		"DDDD    DDDD",
		"DDDD    DDDD",
		"DDDD    DDDD",
		"DDDD    DDDD",
		"DDDD   DDDDD",
		"DDDDDDDDDDDD",
		"DDDDDDDDDDD ",
		" DDDDDDDDD  "
	],
	"E": [
		" EEEEEEEEEEE",
		"EEEEEEEEEEEE",
		"EEEEEEEEEEEE",
		"EEEE        ",
		"EEEE        ",
		"EEEEEEEEEE  ",
		"EEEEEEEEEE  ",
		"EEEE        ",
		"EEEE        ",
		"EEEEEEEEEEEE",
		"EEEEEEEEEEEE",
		" EEEEEEEEEEE"
	],
	"F": [
		" FFFFFFFFFFF",
		"FFFFFFFFFFFF",
		"FFFFFFFFFFFF",
		"FFFF        ",
		"FFFF        ",
		"FFFFFFFFFF  ",
		"FFFFFFFFFF  ",
		"FFFF        ",
		"FFFF        ",
		"FFFF        ",
		"FFFF        ",
		"FFFF        "
	],
	"G": [
		"  GGGGGGGGG  ",
		" GGGGGGGGGGG ",
		"GGGGGGGGGGGGG",
		"GGGGG    GGGG",
		"GGGGG    GGGG",
		"GGGGG        ",
		"GGGGG        ",
		"GGGGG  GGGGGG",
		"GGGGG   GGGGG",
		"GGGGGGGGGGGGG",
		" GGGGGGGGGGG ",
		"  GGGGGGGGG  "
	],
	"H": [
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHHHHHHHHH",
		"HHHHHHHHHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH",
		"HHH    HHH"
	],
	"I": [
		"IIIIIIIII",
		"IIIIIIIII",
		"IIIIIIIII",
		"   III   ",
		"   III   ",
		"   III   ",
		"   III   ",
		"   III   ",
		"   III   ",
		"IIIIIIIII",
		"IIIIIIIII",
		"IIIIIIIII"
	],
	"J": [
		"      JJJJ",
		"      JJJJ",
		"      JJJJ",
		"      JJJJ",
		"      JJJJ",
		"      JJJJ",
		"      JJJJ",
		"JJJ   JJJJ",
		"JJJ   JJJJ",
		"JJJJJJJJJJ",
		"JJJJJJJJJJ",
		" JJJJJJJJJ"
	],
	"K": [
		"KKKK   KKKK",
		"KKKK  KKKK ",
		"KKKK KKKK  ",
		"KKKKKKKK   ",
		"KKKKKKK    ",
		"KKKKKK     ",
		"KKKKKK     ",
		"KKKKKKK    ",
		"KKKKKKKK   ",
		"KKKK KKKK  ",
		"KKKK  KKKK ",
		"KKKK   KKKK",
	],
	"L": [
		" LLL        ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLL       ",
		"LLLLLLLLLLLL",
		"LLLLLLLLLLLL",
		" LLLLLLLLLL ",
	],
	"M": [
		"MMMM     MMMM",
		"MMMMM   MMMMM",
		"MMMMMM MMMMMM",
		"MMMMMMMMMMMMM",
		"MMMMMMMMMMMMM",
		"MMMM MMM MMMM",
		"MMMM  M  MMMM",
		"MMMM     MMMM",
		"MMMM     MMMM",
		"MMMM     MMMM",
		"MMMM     MMMM",
		"MMMM     MMMM",
	],
	"N": [
		"NNNN    NNNN",
		"NNNNN   NNNN",
		"NNNNNN  NNNN",
		"NNNNNNN NNNN",
		"NNNNNNNNNNNN",
		"NNNN NNNNNNN",
		"NNNN  NNNNNN",
		"NNNN   NNNNN",
		"NNNN    NNNN",
		"NNNN    NNNN",
		"NNNN    NNNN",
		"NNNN    NNNN",
	],
	"O": [
		"  OOOOOOO  ",
		" OOOOOOOOO ",
		"OOOOOOOOOOO",
		"OOOO   OOOO",
		"OOOO   OOOO",
		"OOOO   OOOO",
		"OOOO   OOOO",
		"OOOO   OOOO",
		"OOOO   OOOO",
		"OOOOOOOOOOO",
		" OOOOOOOOO ",
		"  OOOOOOO  ",
	],
	"P": [
		" PPPPPPPPP  ",
		"PPPPPPPPPPP ",
		"PPPPPPPPPPPP",
		"PPPP   PPPPP",
		"PPPP   PPPPP",
		"PPPPPPPPPPP ",
		"PPPPPPPPPPP ",
		"PPPP        ",
		"PPPP        ",
		"PPPP        ",
		"PPPP        ",
		"PPPP        ",
	],
	"Q": [
		"  QQQQQQQ   ",
		" QQQQQQQQQ  ",
		"QQQQQQQQQQQ ",
		"QQQQ   QQQQ ",
		"QQQQ   QQQQ ",
		"QQQQ   QQQQ ",
		"QQQQ   QQQQ ",
		"QQQQ   QQQQ ",
		"QQQQ   QQQQ ",
		"QQQQQQQQQQQ ",
		" QQQQQQQQQ  ",
		"  QQQQQQQQQQ",
	],
	"R": [
		"RRRRRRRRR  ",
		"RRRRRRRRRR ",
		"RRRRRRRRRRR",
		"RRRR   RRRR",
		"RRRR   RRRR",
		"RRRRRRRRRR ",
		"RRRRRRRRRR ",
		"RRRR  RRRR ",
		"RRRR   RRRR",
		"RRRR   RRRR",
		"RRRR    RRR",
		"RRRR    RRR",
	],
	"S": [
		"  SSSSSSS  ",
		" SSSSSSSSS ",
		"SSSSSSSSSSS",
		"SSSS       ",
		"SSSS       ",
		" SSSSSSSSS ",
		"  SSSSSSSSS",
		"       SSSS",
		"       SSSS",
		"SSSSSSSSSSS",
		" SSSSSSSSS ",
		"  SSSSSSS  ",
	],
	"T": [
		"TTTTTTTTTTTTT",
		"TTTTTTTTTTTTT",
		"TTTTTTTTTTTTT",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
		"     TTT     ",
	],
	"U": [
		" UU      UU ",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUU    UUUU",
		"UUUUUUUUUUUU",
		"UUUUUUUUUUUU",
		" UUUUUUUUUU ",
	],
	"V": [
		"VVV       VVV",
		"VVV       VVV",
		"VVV       VVV",
		"VVV       VVV",
		"VVV       VVV",
		" VVV     VVV ",
		"  VVV   VVV  ",
		"   VVV VVV   ",
		"    VVVVV    ",
		"    VVVVV    ",
		"     VVV     ",
		"     VVV     ",
		"     VVV     ",
	],
	"W": [
		"WWW     WWW",
		"WWW     WWW",
		"WWW     WWW",
		"WWW     WWW",
		"WWW     WWW",
		"WWW  W  WWW",
		"WWW WWW WWW",
		"WWWWWWWWWWW",
		"WWWWWWWWWWW",
		"WWWW W WWWW",
		"WWW     WWW",
		"WWW     WWW",
	],
	"X": [
		"XXX     XXX",
		"XXX     XXX",
		" XXX   XXX ",
		"  XXX XXX  ",
		"   XXXXX   ",
		"    XXX    ",
		"    XXX    ",
		"   XXXXX   ",
		"  XXX XXX  ",
		" XXX   XXX ",
		"XXX     XXX",
		"XXX     XXX",
	],
	"Y": [
		"YYY    YYY",
		"YYY    YYY",
		" YYY  YYY ",
		"  YYYYYY  ",
		"   YYYY   ",
		"    YY    ",
		"    YY    ",
		"    YY    ",
		"    YY    ",
		"    YY    ",
		"    YY    ",
		"    YY    ",
	],
	"Z": [
		"ZZZZZZZZZZZZ",
		"ZZZZZZZZZZZZ",
		"        ZZZZ",
		"       ZZZZ ",
		"      ZZZZ  ",
		"     ZZZZ   ",
		"    ZZZZ    ",
		"   ZZZZ     ",
		"  ZZZZ      ",
		" ZZZZ       ",
		"ZZZZZZZZZZZZ",
		"ZZZZZZZZZZZZ",
	],
	" ": [
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        "
	]
};

class Message {
	public message: string;
	private game: Game;

	public tiles: number[][] = [];

	constructor(message: string, game: Game) {
		this.message = message;
		this.game = game;

		this.createTiles();
	}

	private createTiles() {
		for (let i = 0; i < this.message.length; i++) {
			const fontLetter = letters[this.message[i].toUpperCase()];

			while (this.tiles.length < fontLetter.length) {
				this.tiles.push([]);
			}

			for (let row = 0; row < fontLetter.length; row++) {
				for (let col = 0; col < fontLetter[row].length; col++) {
					this.tiles[row].push(fontLetter[row][col] === " " ? 0 : 1);
					
					if (fontLetter[row][col] !== " ") {
						const particle = new FontParticle(col, row, 0, 0, this.game);
						particle.startX = this.tiles[row].length * 10 + Math.random() * 500 - 250;
						particle.startY = row * 10 - 500 + Math.random() * 500 - 250;
						particle.endY = row * 10 - 500;
						particle.endX = this.tiles[row].length * 10;
						particle.fadeAfter = (this.tiles[row].length * 10 + row * 10) / 3;
						this.game.particles.push(particle);
					}
				}
			}

			for (let row = 0; row < fontLetter.length; row++) {
				this.tiles[row].push(0);
			}
		}
	}
}