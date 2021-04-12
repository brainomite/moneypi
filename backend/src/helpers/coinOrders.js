const RatchetCoin = require("../RatchetBtc");

/**
 * Creates a trailing dollar stop loss of a coin
 * @param {AuthenticatedClient} client the client to place orders with
 * @param {number} trailBy the dollar amount to trail byType
 * @param {number} size the quantity of coin for the orderSpecifics
 * @returns {RatchetCoin}
 */
function coinStopLossTrail(client, trailBy, size, coin, io) {
  return coinTrail(client, trailBy, size, coin, false, io);
}

/**
 * Creates a trailing dollar stop entry of a coin
 * @param {AuthenticatedClient} client the client to place orders with
 * @param {number} trailBy the dollar amount to trail byType
 * @param {number} size the quantity of coin for the orderSpecifics
 * @returns {RatchetCoin}
 */
function coinStopEntryTrail(client, trailBy, size, coin, io) {
  return coinTrail(client, trailBy, size, coin, true, io);
}

function coinTrail(client, trailBy, size, product_id, stopLimitBuy, io) {
  return new RatchetCoin({
    client,
    trailBy,
    stopLimitBuy,
    io,
    orderSpecifics: { size, product_id },
  });
}

module.exports = { coinStopEntryTrail, coinStopLossTrail };
