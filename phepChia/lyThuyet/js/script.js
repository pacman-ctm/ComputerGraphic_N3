import Elem from "./Elem.js";
import Candy from "./Candy.js";
import Textbt from "./Textbutton.js";
import Textbx from "./Textbox.js";

let so_bi_chia = 32;
let so_chia = 4;
let thuong = Math.trunc(so_bi_chia/so_chia);

let enter = new Textbx();
let candytitle = new Textbx();
let candy = new Candy();
let candytitle2 = new Textbx();
let candy2 = new Candy();
let candytitle3 = new Textbx();
let candy3 = new Candy();

function render() {
	enter.setScale(1, 0.01);
	enter.fitParent("content");

	candytitle.setScale(0.5, 0.25);
	candytitle.fitParent("content");
	candytitle.setBackground("white");
	candytitle.setScaleText(0.3);
	candytitle.setText("Chia "+String(so_bi_chia)+" viên kẹo ra làm "+String(so_chia)+" phần bằng nhau");
	candytitle.draw();

	candy.fitParent("content");
	candy.setnCandy(so_bi_chia);
	candy.setScale(0.3);
	candy.setTextColor('orange');
	candy.draw();

	enter.draw();

	if (so_chia == 0) {
		candytitle2.setScale(1, 0.5);
		candytitle2.fitParent("content");
		candytitle2.setMargintop(candytitle2.height * 0.13);
		candytitle2.setScaleText(0.2);
		candytitle2.setText("Oh, "+String(so_bi_chia)+" không thể hết cho 0");
		candytitle2.draw();
		return;
	}

	thuong = Math.trunc(so_bi_chia/so_chia);

	candytitle2.setScale(0.2, 0.3);
	candytitle2.fitParent("content");
	candytitle2.setMargintop(candytitle2.height * 0.13);
	candytitle2.setScaleText(0.4);
	candytitle2.setText("Ở mỗi phần có "+String(thuong)+" viên kẹo");
	candytitle2.draw();

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

	candytitle3.setScale(0.2, 0.3);
	candytitle3.fitParent("content");
	candytitle3.setScaleText(0.4);
	candytitle3.setText("Và còn dư "+String(so_bi_chia % so_chia)+" viên kẹo");
	candytitle3.draw();

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
	location.href = "../../menu.html";
});