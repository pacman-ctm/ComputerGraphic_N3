import AgeBarController from "./age-bar-controller.js";
import createDifferenceBar from "./create-difference-bar.js";

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
const firstColor = "#e07a5f";
const secondColor = "#81b29a";
const parentAge = new AgeBarController(
  two,
  x,
  y - 60,
  "Tuổi phụ huynh",
  PARENT_INIT_AGE,
  firstColor,
  secondColor,
  CHILD_INIT_AGE
);
const childAge = new AgeBarController(
  two,
  x,
  y + 60,
  "Tuổi con",
  CHILD_INIT_AGE,
  secondColor,
  secondColor,
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
