"use strict";
const inquirer = require("inquirer");

async function getPassphrase() {
  const { password } = await inquirer.prompt([
    {
      type: "password",
      message: "Enter a masked password",
      name: "password",
      mask: "*",
    },
  ]);

  process.env.COINBASE_PASSPHRASE = password;
}
exports.getPassphrase = getPassphrase;
