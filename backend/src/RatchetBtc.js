const chalk = require("chalk");

const PRICE_STR = chalk.yellowBright("price:");
const SIZE_STR = chalk.yellowBright("Size:");
const LIMIT = "limit";
class RatchetCoin {
  /**
   *@param {Object} config
   * @param {AuthenticatedClient} config.client coinbase pro authenticated client
   * @param {number} config.trailBy the trail
   * @param {boolean} config.stopLimitBuy true if its a limit buy and should
   * @param {object}  config.orderSpecifics
   * @param {string} config.orderSpecifics.productID coinbase product id
   * @param {number} config.orderSpecifics.quantity of coins ratchet
   */
  constructor({
    client,
    trailBy,
    stopLimitBuy,
    orderSpecifics: {
      size: quantity,
      product_id: productID,
      id = null,
      price = null,
    },
    io,
  }) {
    this.client = client;
    this.currentOrderId = id;
    this.initialOrderPlaced = !!id;
    this.inMiddleOfPlacingOrder = false;
    this.productID = productID;
    this.quantity = parseFloat(quantity);
    this.stopLimitBuy = stopLimitBuy;
    this.trailBy = trailBy;
    this.io = io;
    if (!price) {
      this.price = price;
    } else {
      const orderPrice = parseFloat(price);
      this.price = stopLimitBuy ? orderPrice + trailBy : orderPrice - trailBy;
    }
  }

  _productIdDoesNotMatch(productId) {
    return this.productID !== productId;
  }

  _createStopLossAt(sellAt) {
    const price = sellAt.toString();
    return {
      size: this.quantity.toString(),
      price,
      side: "sell",
      product_id: this.productID,
      stop: "loss",
      type: LIMIT,
      stop_price: price,
    };
  }

  _createStopEntryAt(buyAt) {
    const price = buyAt.toString();
    return {
      size: this.quantity.toString(),
      price,
      side: "buy",
      product_id: this.productID,
      stop: "entry",
      type: LIMIT,
      stop_price: price,
    };
  }

  _priceShouldRatchet(newPrice) {
    const { price } = this;
    if (price === null) return true;
    return this.stopLimitBuy ? newPrice < price : newPrice > price;
  }

  /**
   *
   * @param {Object} tickerData
   * @param {string} tickerData.product_id
   * @param {string} tickerData.price
   * @returns
   */
  async processTicker({ product_id, price: tickerPrice }) {
    if (this._productIdDoesNotMatch(product_id)) return;
    const currentPrice = parseFloat(tickerPrice);
    const { inMiddleOfPlacingOrder, trailBy, stopLimitBuy, client } = this;
    if (this._priceShouldRatchet(currentPrice) && !inMiddleOfPlacingOrder) {
      this.price = currentPrice;
      this.inMiddleOfPlacingOrder = true;
      try {
        await this._cancelExistingOrder();
        const adjustedPrice = stopLimitBuy
          ? currentPrice + trailBy
          : currentPrice - trailBy;
        const orderData = stopLimitBuy
          ? this._createStopEntryAt(adjustedPrice)
          : this._createStopLossAt(adjustedPrice);
        const newOrder = await client.placeOrder(orderData);
        this._orderPlaced(newOrder);
        this._printOrder(adjustedPrice);
      } catch (e) {
        console.log("e: ", e.message);
      }
      this.inMiddleOfPlacingOrder = false;
    }
  }
  _printOrder(price) {
    const fixedPrice = price.toFixed(2);
    const coin = chalk.blueBright(this.productID);
    const { quantity, currentOrderId, productId } = this;
    console.log(
      currentOrderId,
      coin,
      new Date(),
      PRICE_STR,
      fixedPrice,
      SIZE_STR,
      quantity
    );
    this.io.emit("order-data", {
      coin: productId,
      date: new Date(),
      fixedPrice,
      quantity,
      id: currentOrderId,
    });
  }
  _orderPlaced(order) {
    this.initialOrderPlaced = true;
    this.currentOrderId = order.id;
  }
  async _cancelExistingOrder() {
    const { initialOrderPlaced, currentOrderId } = this;
    if (initialOrderPlaced) await this.client.cancelOrder(currentOrderId);
  }
}

module.exports = RatchetCoin;
