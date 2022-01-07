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
			s.noLoop();
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

export default Elem;