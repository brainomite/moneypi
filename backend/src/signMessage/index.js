const crypto = require("crypto");
const { COINBASE_SECRET } = process.env;
const BASE_64 = "base64";

/**
 * generate a signature
 * @param {string} requestPath a path like "/order"
 * @param {object} theBody the body that'll be signed
 * @param {string} method http method to
 * @returns {string}
 */
function signIt(requestPath, theBody, method) {
  const timestamp = Date.now() / 1000;
  const body = JSON.stringify(theBody);
  // create the prehash string by concatenating required parts
  const what = timestamp + method + requestPath + body;
  // decode the base64 secret
  const key = Buffer.from(COINBASE_SECRET, BASE_64);
  // create a sha256 hmac with the secret
  const hmac = crypto.createHmac("sha256", key);
  // sign the require message with the hmac
  // and finally base64 encode the result
  return hmac.update(what).digest(BASE_64);
}

module.exports = signIt;
