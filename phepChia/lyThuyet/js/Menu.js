import Elem from "./Elem.js";

class Menu extends Elem {
	draw() {
		this.drawMenu();
	}

	drawMenu() {
		let menu = this.elem;

		let two = new Two({
				fullscreen: true,
				autostart: true
			}).appendTo(document.body);

		let width = this.width;
		let height = this.height;
		let originx = this.prewidth + width / 2;
		let originy = this.preheight + height / 2;
				let d;
				if (width * 20 / 100 < height * 20 / 100)
						d = width * 20 / 100;
				else
						d = height * 20 / 100;
		let rect = two.makeRectangle(originx, originy, d, d);
		two.bind('update', function() {
			rect.rotation += 0.03;
		});
		return rect
	}
}

export default Menu;