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

export default AgeBarController;
