"use strict";
const inquirer = require("inquirer");

async function getActiveOrders(client) {
  const allExistingOrders = await client.getOrders();
  const choices = allExistingOrders.map((order) => {
    const { product_id, side, price, size } = order;
    return {
      name: `product: ${product_id} side: ${side} price: ${price}, size: ${size}`,
      value: order,
    };
  });
  const selectedOrders = await inquirer.prompt([
    {
      message: "Select existing orders to manage",
      type: "checkbox",
      name: "orders",
      choices: choices,
    },
  ]);

  const activeOrders = selectedOrders.orders.map((orderDetail) => {
    const options = {
      client,
      trailBy: 20.0,
      stopLimitBuy: true,
      orderSpecifics: orderDetail,
    };
    return new RatchetCoin(options);
  });
  return activeOrders;
}
exports.getActiveOrders = getActiveOrders;
