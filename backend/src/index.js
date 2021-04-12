"use strict";
require("dotenv").config();
const AuthenticatedClient = require("./coinbase-pro-node/authenticated");
const {
  coinStopEntryTrail,
  coinStopLossTrail,
} = require("./helpers/coinOrders");
const ETH_USD = "ETH-USD";
const BTC_USD = "BTC-USD";
const { getPassphrase } = require("./helpers/getPassphrase");
const { getActiveOrders } = require("./getActiveOrders");
const { startTicker } = require("./startTicker");

const app = require("express")();
const http = require("http").createServer(app);

async function start() {
  await new Promise((resolve) => {
    http.listen(8080, () => {
      console.log("listening on http://moneypi:8080");
      resolve();
    });
  });
  await getPassphrase();
  const client = new AuthenticatedClient(
    process.env.COINBASE_KEY,
    process.env.COINBASE_SECRET,
    process.env.COINBASE_PASSPHRASE
  );

  const io = require("socket.io")(http, { cors: { origin: true } });

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
  });
  // const ethSell = new RatchetCoin(authenticated, 20, ETH_USD, 1, false);

  // const btcSell = coinStopLossTrail(client, 1000, 0.2, BTC_USD, io);

  // const ethBuy = coinStopEntryTrail(client, 10, 1, ETH_USD);
  // const btcBuy = coinStopEntryTrail(client, 1000, 0.05, BTC_USD, io);
  startTicker([ETH_USD, BTC_USD], [], io);
  console.log("loaded");
}

start();
