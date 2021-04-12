"use strict";
const WebSocketClient = require("./coinbase-pro-node/websocket");

function startTicker(coins, ratchets = [], io) {
  const websocket = new WebSocketClient(
    coins,
    undefined,
    {
      key: process.env.COINBASE_KEY,
      secret: process.env.COINBASE_SECRET,
      passphrase: process.env.COINBASE_PASSPHRASE,
    },
    {
      channels: ["ticker"],
    }
  );
  // ticker("BTC");
  websocket.on("message", (tickerData) => {
    const { type, time } = tickerData;
    const timeStamp = new Date(time).toLocaleString("en-US", {
      timeZone: "EST",
    });
    io.emit("ticker", { ...tickerData, timeStamp });
    if (type !== "ticker") return;
    ratchets.forEach((ratchet) => {
      ratchet.processTicker(tickerData);
    });
    // const priceFixed = parseFloat(price).toFixed(2);
    // const lastSizeFixed = parseFloat(last_size).toFixed(8);
    // const priceColor =
    //   side === "buy" ? chalk.green(priceFixed) : chalk.redBright(priceFixed);
    // console.log(time, PRICE_STR, priceColor, SIZE_STR, lastSizeFixed);
  });
  websocket.on("error", (err) => {
    console.log("err: ", err);
    /* handle error */
  });
  const dateStamp = new Date().toLocaleString("en-US", { timeZone: "EST" });
  websocket.on("open", () =>
    console.log("connected to coinbase at:", dateStamp)
  );
  websocket.on("close", (reason) => {
    /* ... */
    console.log(dateStamp, "closed, reason:", reason);
    websocket.connect();
  });
}
exports.startTicker = startTicker;
