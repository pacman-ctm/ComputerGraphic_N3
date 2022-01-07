import Elem from "./Elem.js";

class Candy extends Elem
{
	constructor() {
		super();
		this.n = 1;
		this.background = "pink";
	}

	fit() {
		this.width = this.parent.offsetWidth;
		this.height = this.parent.offsetHeight;
		if (this.width < this.height * 2)
			this.height = this.width / 2;
		else
			this.width = this.height * 2;
	}

   sketch(s) {
		let n = this.n;
		let width = this.width * this.scale;
		let height = this.height * this.scale;
		let r1 = width * 40 / 100;
		let r2 = height * 60 / 100;
		let canvas;
		let x = width * 0.5;
		let y = height * 0.5;
		let h = s.random(0, 360);
		let textColor = this.textColor;
		let boxed = false;
		let background = this.background;
		s.setup = function () {
			canvas = s.createCanvas(width, height);
			s.colorMode(s.HSB, 180, 100, 100);
			// s.frameRate(5);
			s.noStroke();
			s.noLoop();
			canvas.class('candy');
			canvas.mouseClicked (function () {
				if (boxed) {
					boxed = false;
					s.clear();
					s.redraw();
				}
				else {
					boxed = true;
					s.background(background);
					s.redraw();
				}
			});
			canvas.mouseOver(function () {
				if (!boxed) {
					s.background(background);
					s.redraw();
				}
         });
         canvas.mouseOut(function () {
				if (!boxed) {
            	s.clear();
					s.redraw();
				}
         });
		}
		s.draw = function () {
			s.textAlign(s.RIGHT);
			s.fill(textColor);
			s.textSize(width * 40 / 100);
  			s.text(String(n), x*1.05, y * 1.5);
			s.translate(x/2, y*2);
			s.rotate(-1);
			for (let d=0; d<r1 && d<r2;++d) {
				s.fill(h, 90, 90);
				s.ellipse(x, y, r1-d, r2-d);
				h = (h + 10) % 360;
			}
		}
	}

	setnCandy(n=1) {
		this.n = n;
	}
}

export default Candy;