const DASHES_ARRAY = [4, 4];
const BOTTOM_LINE_WIDTH = 3;
const SPACE_BEFORE_TEXT = 25;
const FONT_SIZE = 16;
const FONT_FAMILY = "Be Vietnam Pro";

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
    { size: FONT_SIZE, family: FONT_FAMILY }
  );
  const group = new Two.Group(differenceBar, line, text);
  group.translation.set(x, y);
  return group;
};

export default createDifferenceBar;
