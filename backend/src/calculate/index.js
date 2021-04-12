const ten_thousand = 10000000;
/**
 *
 * @param {number} price current btc price
 * @param {number} spendAmount amount to spend
 * @param {number} fee fee percent
 */
function calculateBTCQuantity(price, spendAmount, fee) {
  return getBtcTo7ThDigit(spendAmount / (price + price * fee));
}

module.exports = calculateBTCQuantity;

/**
 * will get the 7th digit
 * @param {number} proposedBtc btc to round down
 * @returns
 */
function getBtcTo7ThDigit(proposedBtc) {
  return Math.round(proposedBtc * ten_thousand) / ten_thousand;
}

// const moreOf = math.fraction(0.66272577),
//   lessOf = math.fraction(0.66272568);

// const dif = math.subtract(moreOf, lessOf);
// console.log("dif: ", dif);
// const final = math.format(dif, {
//   notation: "fixed",
//   precision: 8,
//   fraction: "decimal",
// });
// console.log("final: ", getBtcTo8ThDigit(final));
