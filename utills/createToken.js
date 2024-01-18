const jwt = require("jsonwebtoken");
const {SECRET_TOKEN} = process.env
const createToken = (id) => {
  return jwt.sign({ id }, SECRET_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};


module.exports = createToken

// creating jwt token that can be stored in the clients browser