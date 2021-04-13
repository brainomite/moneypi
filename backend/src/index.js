"use strict";
const app = require("./app");

function start() {
  app.get("/", (req, res) => {
    res.send("It is I, money-pi");
  });

  app.listen(8080, () => {
    const hostname =
      process.env.NODE_ENV === "production" ? "moneypi.local" : "localhost";
    console.log(`listening on http://${hostname}:8080`);
  });
}

start();
