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

const numbers = {
	"0": [
		" 000 ",
		"0   0",
		"0   0",
		"0   0",
		"0   0",
		"0   0",
		" 000 "
	],
	"1": [
		" 1 ",
		"11 ",
		" 1 ",
		" 1 ",
		" 1 ",
		" 1 ",
		"111"
	],
	"2": [
		" 222 ",
		"2   2",
		"    2",
		"   2 ",
		"  2  ",
		" 2   ",
		"22222"
	],
	"3": [
		" 333 ",
		"3   3",
		"    3",
		"  33 ",
		"    3",
		"3   3",
		" 333 "
	],
	"4": [
		"   4 ",
		"  44 ",
		" 4 4 ",
		"4  4 ",
		"44444",
		"   4 ",
		"   4 "
	],
	"5": [
		"55555",
		"5    ",
		"5    ",
		"5555 ",
		"    5",
		"5   5",
		" 555 "
	],
	"6": [
		" 666 ",
		"6    ",
		"6    ",
		"6666 ",
		"6   6",
		"6   6",
		" 666 "
	],
	"7": [
		"77777",
		"    7",
		"   7 ",
		"  7  ",
		" 7   ",
		"7    ",
		"7    "
	],
	"8": [
		" 888 ",
		"8   8",
		"8   8",
		" 888 ",
		"8   8",
		"8   8",
		" 888 "
	],
	"9": [
		" 999 ",
		"9   9",
		"9   9",
		" 9999",
		"    9",
		"    9",
		" 999 "
	],
	":": [
		"    ",
		" 00 ",
		" 00 ",
		"    ",
		" 00 ",
		" 00 ",
		"    "
	]
};

class Message {
	public message: string;
	private game: Game;

	public tiles: number[][] = [];

	constructor(message: string, xPos: number, yPos: number, size: number, color: string, game: Game) {
		this.message = message;
		this.game = game;

		this.createTiles(xPos, yPos, size, color);
	}

	private createTiles(xPos: number, yPos: number, size: number, color: string) {
		for (let i = 0; i < this.message.length; i++) {
			const fontLetter = letters[this.message[i].toUpperCase()];

			while (this.tiles.length < fontLetter.length) {
				this.tiles.push([]);
			}

			for (let row = 0; row < fontLetter.length; row++) {
				for (let col = 0; col < fontLetter[row].length; col++) {
					this.tiles[row].push(fontLetter[row][col] === " " ? 0 : 1);
					
					if (fontLetter[row][col] !== " ") {
						const particle = new FontParticle(col, row, 0, 0, size, this.game, color);
						particle.startX = this.tiles[row].length * size + Math.random() * 300 - 150 + xPos;
						particle.startY = row * size - yPos + Math.random() * 300 - 150;
						particle.endY = row * size - yPos;
						particle.endX = this.tiles[row].length * size + xPos;
						particle.fadeAfter = (this.tiles[row].length * size + row * size) / 3;
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