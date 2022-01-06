import Elem from "./Elem.js";

class Textbx extends Elem
{
	constructor() {
		super();
		this.n = 1;
      this.w = 1;
      this.h = 1;
		this.margintop = 0;
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

   setScale(w, h) {
      this.w = w;
      this.h = h;
   }

	setMargintop(margintop) {
		this.margintop = margintop;
	}

   fit () {
      this.width = this.parent.offsetWidth * this.w;
      this.height = this.width * this.h;
   }

   sketch(s) {
		let width = this.width * this.scale;
		let height = this.height * this.scale;
		let canvas;
		let x = width * 0.5;
		let y = height * 0.5;
		let textColor = this.textColor;
      let text = this.text;
      let id = this.id;
      let background = this.background;
      const realbackground = this.background;
		let scaleText = this.scaleText;
		let margintop = this.margintop;
		s.setup = function () {
			canvas = s.createCanvas(width, height);
			canvas.class('textbutton');
         if (id != null)
            canvas.id(id);
		}
		s.draw = function () {
         if (background != -1)
         	s.background(background);
			s.textAlign(s.CENTER);
         s.textWrap(s.WORD);
			s.fill(textColor);
			s.textSize(height * scaleText);
  			s.text(text, 0, margintop, width, height);
		}
	}
}

export default Textbx;