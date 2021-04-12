const calc = require(".");

it("sums numbers", () => {
  const expected = 0.6627257;
  const actual = calc(52628.0, 35000, 0.0035);
  expect(actual).toEqual(expected);
});
