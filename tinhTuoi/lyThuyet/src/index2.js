class AgeBarController {
  static RATIO = window.innerWidth / 1920;
  static LENGTH_PER_AGE = 15 * AgeBarController.RATIO;
  static BAR_WIDTH = 50;
  static SPACE_AFTER_TEXT = 50;
  static FONT_SIZE = 30;

  #age;
  #divisor;
  #two;
  #x;
  #y;
  #primaryColor;
  #secondaryColor;
  #text;
  #bar;

  constructor(two, x, y, age, primaryColor, secondaryColor, divisor = 1) {
    this.#age = age;
    this.#divisor = divisor;
    this.#two = two;
    this.#x = x;
    this.#y = y;
    this.#primaryColor = primaryColor;
    this.#secondaryColor = secondaryColor;
    this.#text = two.makeText(age, x, y, {
      size: AgeBarController.FONT_SIZE,
      alignment: "left",
      weight: 700,
      fill: primaryColor,
    });
    this.#bar = this.#makeBar(age, divisor);
  }

  #makeRectPart = (index, partWidth, lastPartWidth = undefined) => {
    const width = lastPartWidth || partWidth;
    const rect = this.#two.makeRectangle(
      index * partWidth + width / 2,
      0,
      width,
      AgeBarController.BAR_WIDTH
    );
    rect.noStroke().fill =
      index % 2 === 0 ? this.#primaryColor : this.#secondaryColor;
    return rect;
  };

  #makeBar = () => {
    const numOfParts = Math.floor(this.#age / this.#divisor);
    const partWidth = this.#divisor * AgeBarController.LENGTH_PER_AGE;
    const lastPartWidth =
      (this.#age % this.#divisor) * AgeBarController.LENGTH_PER_AGE;

    const group = this.#two.makeGroup(
      Array.from(Array(numOfParts), (_, i) => this.#makeRectPart(i, partWidth))
    );
    if (lastPartWidth)
      group.add(this.#makeRectPart(numOfParts, partWidth, lastPartWidth));
    group.translation.set(this.#x + AgeBarController.SPACE_AFTER_TEXT, this.#y);
    return group;
  };

  setAge = (age, divisor = undefined) => {
    this.#divisor = divisor || this.#divisor + (age - this.#age);
    this.#age = age;
    this.#text.value = Math.floor(age);
    this.#bar.remove();
    this.#bar = this.#makeBar();
  };

  add = (delta) => this.setAge(this.#age + delta);

  get age() {
    return this.#age;
  }

  get endX() {
    return (
      this.#x +
      AgeBarController.SPACE_AFTER_TEXT +
      this.#age * AgeBarController.LENGTH_PER_AGE
    );
  }
}

const DASHES_ARRAY = [4, 4];
const BOTTOM_LINE_WIDTH = 3;
const SPACE_BEFORE_TEXT = 25;
const FONT_SIZE = 16;

const createDifferenceBar = (x, y, width, height, message) => {
  const differenceBar = new Two.Rectangle(0, 0, width, height).noFill();
  differenceBar.dashes = DASHES_ARRAY;
  const boundingBox = differenceBar.getBoundingClientRect();
  const line = new Two.Line(
    boundingBox.left,
    boundingBox.bottom - 1,
    boundingBox.right,
    boundingBox.bottom - 1
  );
  line.linewidth = BOTTOM_LINE_WIDTH;
  const text = new Two.Text(
    message,
    boundingBox.left + (boundingBox.right - boundingBox.left) / 2,
    boundingBox.bottom + SPACE_BEFORE_TEXT,
    { size: FONT_SIZE }
  );
  const group = new Two.Group(differenceBar, line, text);
  group.translation.set(x, y);
  return group;
};

const MAX_AGE = 80;
const PARENT_INIT_AGE = 22;
const CHILD_INIT_AGE = 1;
const YEAR_SLIDER_INIT_VALUE = 8;

const two = new Two({ fullscreen: true }).appendTo(document.body);

const x =
  (two.width -
    MAX_AGE * AgeBarController.LENGTH_PER_AGE -
    AgeBarController.SPACE_AFTER_TEXT) /
  2;
const y = two.height / 2;
const parentAge = new AgeBarController(
  two,
  x,
  y - 50,
  PARENT_INIT_AGE,
  "red",
  "blue",
  CHILD_INIT_AGE
);
const childAge = new AgeBarController(
  two,
  x,
  y + 50,
  CHILD_INIT_AGE,
  "blue",
  "blue",
  CHILD_INIT_AGE
);

const differenceBar = createDifferenceBar(
  childAge.endX + (parentAge.endX - childAge.endX) / 2,
  y + 25,
  parentAge.endX - childAge.endX - 1.5,
  150,
  `Khoảng cách ${PARENT_INIT_AGE - CHILD_INIT_AGE} tuổi không đổi`
);
two.scene.children.splice(0, 0, differenceBar);

let targetAge = PARENT_INIT_AGE;

const setAbsoluteAge = () => {
  const newChildAge = targetAge - (PARENT_INIT_AGE - CHILD_INIT_AGE);
  parentAge.setAge(targetAge, newChildAge);
  childAge.setAge(newChildAge, newChildAge);
};

two.on("update", () => {
  const delta = 0.5;
  if (parentAge.age < targetAge) {
    parentAge.add(delta);
    childAge.add(delta);
    if (parentAge.age > targetAge) setAbsoluteAge();
  } else if (parentAge.age > targetAge) {
    parentAge.add(-delta);
    childAge.add(-delta);
    if (parentAge.age < targetAge) setAbsoluteAge();
  }
  differenceBar.translation.x =
    childAge.endX + (parentAge.endX - childAge.endX) / 2;
});
two.play();

const yearSlider = document.querySelector("#year-slider");
const indicator = document.querySelector("#indicator");

yearSlider.max = MAX_AGE - PARENT_INIT_AGE;
yearSlider.value = YEAR_SLIDER_INIT_VALUE;
indicator.textContent = yearSlider.value;
targetAge = PARENT_INIT_AGE + parseInt(yearSlider.value);

yearSlider.addEventListener("input", (event) => {
  event.preventDefault();
  targetAge = PARENT_INIT_AGE + parseInt(event.target.value);
  indicator.textContent = event.target.value;
});
