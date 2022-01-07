import Elem from "./Elem.js";

class Textbt extends Elem
{
	constructor() {
		super();
		this.n = 1;
	}

	fit() {
		console.log(this.parent);
		this.width = this.parent.offsetWidth;
		this.height = this.parent.offsetHeight;
		if (this.width > this.height * 2)
			this.height = this.width / 2;
		else
			this.width = this.height * 2;
	}

   setText(text) {
      this.text = text;
   }

   fit () {
      this.width = this.parent.offsetWidth - 1;
      this.height = this.width * 0.6;
   }

   sketch(s) {
		let width = Math.trunc(this.width * this.scale);
		let height = Math.trunc(this.height * this.scale);
		let canvas;
		let x = width * 0.5;
		let y = height * 0.5;
		let textColor = this.textColor;
      let text = this.text;
      let id = this.id;
      let background = this.background;
      const realbackground = this.background;
		s.setup = function () {
			canvas = s.createCanvas(width, height);
			canvas.class('textbutton');
         if (id != null)
            canvas.id(id);
			s.noLoop();
         canvas.mouseOver(function () {
            background = "black";
            textColor = "white";
				s.redraw();
         });
         canvas.mouseOut(function () {
            background = realbackground;
            textColor = "black";
				s.redraw();
         });
		}
		s.draw = function () {
			if (background != -1)
         	s.background(background);
			s.textAlign(s.CENTER);
         s.textWrap(s.WORD);
			s.fill(textColor);
			s.textSize(height * 25 / 100);
  			s.text(text, 0, height * 0.2, width, height);
		}
	}
}

export default Textbt;