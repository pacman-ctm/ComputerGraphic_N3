class Elem {
	constructor(width=0, height=0) {
		this.width = width;
		this.height = height;
		this.sketch = this.sketch.bind(this);
		this.textColor = 0;
		this.scale = 1;
		this.background = -1;
		this.scaleText = 1;
	}

	setParent(id) {
		this.parent = document.getElementById(id);
	}

	setScale(scale) {
		this.scale = scale;
	}

	setTextColor(color) {
		this.textColor = color;
	}

	setHeight(height) {
		this.height = height;
	}

	setId(id) {
		this.id = id;
	}

	setScaleText(scale) {
		this.scaleText = scale;
	}

	setBackground(color) {
		this.background = color;
	}

	truncEdge() {
		this.width = Math.trunc(this.width);
		this.height = Math.trunc(this.height);
	}

	fitParent(id) {
		this.setParent(id);
		this.fit();
		this.truncEdge();
	}

	fit() {
		this.width = this.parent.offsetWidth;
		this.height = this.parent.offsetHeight;
	}

	sketch(s) {
		let width = this.width;
		let height = this.height;
		s.setup = function () {
			let canvas = s.createCanvas(width, height);
		}
		s.draw = function () {
			s.background('red');
			s.noFill();
		}
		// s.windowResized = function() {
		// 	s.resizeCanvas(windowWidth, windowHeight);
		// }
	}
	draw() {
		if (this.parent != null)
			this.pic = new p5(this.sketch, this.parent);
		else
			this.pic = new p5(this.sketch);
	}
};

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
			s.frameRate(5);
			s.noStroke();
			canvas.class('candy');
			canvas.mouseClicked (function () {
				if (boxed) {
					boxed = false;
					s.clear();
				}
				else {
					boxed = true;
					s.background(background);
				}
			});
			canvas.mouseOver(function () {
            s.background(background);
         });
         canvas.mouseOut(function () {
				if (!boxed)
            	s.clear();
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
};

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
         canvas.mouseOver(function () {
            background = "black";
            textColor = "white";
         });
         canvas.mouseOut(function () {
            background = realbackground;
            textColor = "black";
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

let so_bi_chia = 32;
let so_chia = 4;
let thuong = Math.trunc(so_bi_chia/so_chia);

function render() {
	let enter = new Textbx();
	enter.setScale(1, 0.01);
	enter.fitParent("content");

	let candytitle = new Textbx();
	candytitle.setScale(0.5, 0.25);
	candytitle.fitParent("content");
	candytitle.setBackground("white");
	candytitle.setScaleText(0.3);
	candytitle.setText("Chia "+String(so_bi_chia)+" viên kẹo ra làm "+String(so_chia)+" phần bằng nhau");
	candytitle.draw();

	let candy = new Candy();
	candy.fitParent("content");
	candy.setnCandy(so_bi_chia);
	candy.setScale(0.3);
	candy.setTextColor('orange');
	candy.draw();

	enter.draw();

	if (so_chia == 0) {
		let candytitle2 = new Textbx();
		candytitle2.setScale(1, 0.5);
		candytitle2.fitParent("content");
		candytitle2.setMargintop(candytitle2.height * 0.13);
		candytitle2.setScaleText(0.2);
		candytitle2.setText("Oh, "+String(so_bi_chia)+" không thể chia cho 0");
		candytitle2.draw();
		return;
	}

	thuong = Math.trunc(so_bi_chia/so_chia);

	let candytitle2 = new Textbx();
	candytitle2.setScale(0.2, 0.3);
	candytitle2.fitParent("content");
	candytitle2.setScaleText(0.4);
	candytitle2.setText("Ở mỗi phần có "+String(thuong)+" viên kẹo");
	candytitle2.draw();

	let candy2 = new Candy();
	candy2.fitParent("content");
	candy2.setScale(0.2);
	candy2.setnCandy(thuong);
	candy2.setTextColor('green');
	for (let i=0;i<so_chia;++i) {
		switch (i % 4) {
			case (0): candy2.setBackground('blue'); break;
			case (1): candy2.setBackground('yellow'); break;
			case (2): candy2.setBackground('purple'); break;
			case (3): candy2.setBackground('cyan'); break;
		};
		candy2.draw();
	}

	enter.draw();

	let candytitle3 = new Textbx();
	candytitle3.setScale(0.2, 0.3);
	candytitle3.fitParent("content");
	candytitle3.setScaleText(0.4);
	candytitle3.setText("Và còn dư "+String(so_bi_chia % so_chia)+" viên kẹo");
	candytitle3.draw();
	let candy3 = new Candy();
	candy3.fitParent("content");
	candy3.setScale(0.2);
	candy3.setnCandy(so_bi_chia % so_chia);
	candy3.setTextColor('red');
	candy3.draw();
}

function reRender() {
	const content = document.getElementById("content");
	while (content.firstChild) {
		content.removeChild(content.lastChild);
	}
	render();
}

render();

let button = new Textbt();
button.fitParent("incCandy");
button.setBackground("blue");
button.setText("Tăng tổng số kẹo");
button.draw();

button.fitParent("desCandy");
button.setBackground("cyan");
button.setText("Giảm tổng số kẹo");
button.draw();

button.fitParent("incDiv");
button.setBackground("red");
button.setText("Tăng số phần cần chia");
button.draw();

button.fitParent("desDiv");
button.setBackground("green");
button.setText("Giảm số phần cần chia");
button.draw();

button.fitParent("nextPage");
button.setBackground("yellow");
button.setText("Làm bài tập thôi nào");
button.draw();

button.fitParent("prevPage");
button.setBackground("orange");
button.setText("Quay lại trang chủ");
button.draw();

document.getElementById('incCandy').addEventListener("click", function () {
	++so_bi_chia;
	reRender();
});

document.getElementById('desCandy').addEventListener("click", function () {
	if (so_bi_chia > 0) {
		--so_bi_chia;
		reRender();
	}
});

document.getElementById('incDiv').addEventListener("click", function () {
	++so_chia;
	reRender();
});

document.getElementById('desDiv').addEventListener("click", function () {
	if (so_chia > 0) {
		--so_chia;
		reRender();
	}
});

document.getElementById('nextPage').addEventListener("click", function () {
	location.href = "../baiTap/chia_b1.html";
});

document.getElementById('prevPage').addEventListener("click", function () {
	location.href = "../../index.html";
});